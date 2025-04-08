export default function GoogleMap({ place }) {
    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`;
  
    return (
      <div className="w-full h-[450px]">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          style={{ border: 0,height:"400px" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
        ></iframe>
      </div>
    );
  }
  