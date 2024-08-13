import React from "react";



export default function Map({map}) {

  return (
    <div className="google-map-code">
      <iframe
        src={map}
        width="600"
        height="450"
        style={{border:0}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
 
