import React from "react";
import "./Spinner.css"; // CSS file for the spinner

export default function Spinner({ size = 40, color = "#3498db" }){
    const spinnerStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${size / 10}px`, // Dynamically set the border thickness
        borderTopColor: color, // Spinner color
      };
    
      return <div className="spinner" style={spinnerStyle}></div>;
};
