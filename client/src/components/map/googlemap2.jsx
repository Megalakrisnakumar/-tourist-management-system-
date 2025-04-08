import React from 'react';

export default function Googlemap2() {
    const mapsrc = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d248698.7445449097!2d80.20918701936309!3d13.104388458795455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1stour%20!5e0!3m2!1sen!2sin!4v1744155097252!5m2!1sen!2sin";

    return (
        <div>
            <iframe
                src={mapsrc}
                width="100%"
                height="550"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}
