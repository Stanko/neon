import React from "react";


export default function SliderControl({ 
  setValue, 
  ...props
}) {
  return (
    <input 
      { ...props }
      type="range"
      onChange={ setValue }
      className="SliderControl" 
    />
  );
}