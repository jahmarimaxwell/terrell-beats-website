import React, { useState, useEffect } from "react";
import beats from "../../beats";
import MusicBlock from "../music/MusicBlock";

export default function mainPage() {
    return (
    <>
      <img className="cover" src="src/assets/TrellSettaz-logo.png"></img>

      <div className="information-container">
        <h1 className="info-title">Why Choose TrendSettaz?</h1>
        <h3 className="information">
          The ultimate platform for music creators 
          and buyers to connect and transact seamlessly.</h3>
      </div>

      <div className="purpose-container">

        <div className="purpose">
          <h3 className="purpose-title">Upload & Sell</h3>
          <p className="purpose-info">
            Upload your beats, instrumentals, and samples. 
            Set your own prices and licensing terms.</p>
        </div>

        <div className="purpose">
          <h3 className="purpose-title">Preview & Buy</h3>
          <p className="purpose-info">
            Browse thousands of tracks with instant preview. 
            Buy and download immediately with proper licensing.</p>
        </div>

        <div className="purpose">
          <h3 className="purpose-title">Track Success</h3>
          <p className="purpose-info">
            Monitor your earnings, track performance, 
            and grow your music business with detailed analytics.</p>
        </div>
      </div>
      
      <div className="music-display">
            {beats.map((beat) => (
              <MusicBlock
                key={beat.title}
                beat={beat}
              />
            ))}
        </div>
    </>
  );
}