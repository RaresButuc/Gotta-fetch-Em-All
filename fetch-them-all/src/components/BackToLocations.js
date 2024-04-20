import React from "react";

function BackToLocations({ getBack }) {
  return (
    <div>
      <button onClick = {getBack} className = 'backToLocations'>Back to Locations</button>
    </div>
  );
}

export default BackToLocations;