import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from 'axios';



const getCoordinates = async (address) => {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: address,
                    format: 'json',
                    limit: 1 // Return only the first result
                }
            }
        );

        if (response.data.length > 0) {
            const { lat, lon } = response.data[0];

            console.log(`Latitude: ${lat}, Longitude: ${lon}`);
            return {lat,lon}
        } else {
            console.error('Location not found!');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
};

// Example Usage



const MapComponent = (props) => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);

    const touristSpots = [
        { name: 'Marina Beach', lat: 13.0604, lng: 80.2495, description: 'Popular Beach' },
        { name: 'Valluvar Kottam', lat: 13.0674, lng: 80.2785, description: 'Historical Monument' },
        // CMWSSB Division 106, Zone 8 Anna Nagar, Chennai, Tamil Nadu, 600001, India

    ];

  

   

    useEffect(() => {
        const newMap = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://demotiles.maplibre.org/style.json',
            center: [80.2707, 13.0827],
            zoom: 12
        });

        touristSpots.forEach((spot) => {
            new maplibregl.Marker({ color: 'blue' }) 
                .setLngLat([spot.lng, spot.lat])
                .setPopup(new maplibregl.Popup().setHTML(`<b>${spot.name}</b><br>${spot.description}`))
                .addTo(newMap);
        });

        setMap(newMap);

        return () => newMap.remove();
    }, []);

    // Fetch Nearby Attractions
    const fetchNearbyAttractions = async (lat, lng) => {
        try {
            const query = `[out:json];
                node(around:1000,${lat},${lng})[tourism];
                out;`;

            const response = await axios.get(
                `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
            );

            const attractions = response.data.elements.map((place) => ({
                name: place.tags.name || "Unknown Attraction",
                lat: place.lat,
                lng: place.lon
            }));

            // Add Nearby Attraction Markers
            attractions.forEach((place) => {
                new maplibregl.Marker({ color: 'green' }) 
                    .setLngLat([place.lng, place.lat])
                    .setPopup(new maplibregl.Popup().setHTML(`<b>${place.name}</b>`))
                    .addTo(map);
            });
        } catch (error) {
            console.error('Error fetching nearby attractions:', error);
        }
    };

    // Trigger Nearby Attraction Fetch for Specific Spot
    useEffect(() => {
        if (map) {
            touristSpots.forEach((spot) => {
                fetchNearbyAttractions(spot.lat, spot.lng);
            });
        }
    }, [map]);

    return <div ref={mapContainer} style={{ height: '50vh', width: '100%' }} />;
};




export default MapComponent;
