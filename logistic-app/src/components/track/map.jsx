import React from "react";


//google map setting
export default function Map({map}) {

  return (
    <div className="google-map-code">
      <iframe
        src={map}
        style={{ border: 0, width: "100%", height: "100%" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Showing location of the parcel"
      ></iframe>
    </div>
  );
}
 
