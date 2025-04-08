//
import React, { useState } from 'react';

const DistanceMatrix = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [distanceKm, setDistanceKm] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = '43aca55071d54f1ba2340acfd77eef87'; // Replace with your key

  const calculateDistance = async () => {
    if (!from || !to) return;

    setLoading(true);
    setDistanceKm(null);

    try {
      const geo = async (place) => {
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(place)}&apiKey=${API_KEY}`
        );
        const data = await res.json();
        return data.features[0]?.geometry?.coordinates;
      };

      const [fromCoords, toCoords] = await Promise.all([geo(from), geo(to)]);

      if (!fromCoords || !toCoords) {
        setDistanceKm('Invalid location');
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://api.geoapify.com/v1/routematrix?apiKey=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'drive',
            sources: [{ location: fromCoords }],
            targets: [{ location: toCoords }],
          }),
        }
      );

      const data = await res.json();
      const distanceInMeters = data.sources_to_targets[0][0].distance;
      const distanceInKm = (distanceInMeters / 1000).toFixed(2);
      setDistanceKm(distanceInKm);
    } catch (error) {
      console.error('Error:', error);
      setDistanceKm('Error calculating distance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Distance Calculator</h2>

      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={calculateDistance}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Calculate
      </button>

      {loading && <p className="text-gray-500">Calculating...</p>}
      {distanceKm && !loading && (
        <p className="text-green-600 font-semibold">
          Distance: {distanceKm} km
        </p>
      )}
    </div>
  );
};

export default DistanceMatrix;

const API_KEY = 'YOUR_GEOAPIFY_API_KEY'; // Replace with your key

async function getDistanceInKm(from, to) {
  try {
    // Get coordinates for both locations
    const getCoords = async (place) => {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(place)}&apiKey=${API_KEY}`
      );
      const data = await res.json();
      return data.features[0]?.geometry?.coordinates; // [lon, lat]
    };

    const [fromCoords, toCoords] = await Promise.all([getCoords(from), getCoords(to)]);

    if (!fromCoords || !toCoords) {
      throw new Error('Invalid location provided.');
    }

    // Fetch distance using routematrix
    const res = await fetch(
      `https://api.geoapify.com/v1/routematrix?apiKey=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'drive',
          sources: [{ location: fromCoords }],
          targets: [{ location: toCoords }],
        }),
      }
    );

    const data = await res.json();
    const meters = data.sources_to_targets[0][0].distance;
    const km = (meters / 1000).toFixed(2);

    return km;
  } catch (error) {
    console.error('Error getting distance:', error);
    return null;
  }
}

