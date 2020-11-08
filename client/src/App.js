import React from 'react';
import GoogleMapReact from 'google-map-react';
import InfoCircle from './components/infoCircle.js';
import './App.css';

/**
 * Main React Component
 * @return {void}
 */
function App() {
  return (
    <div className="App">
      <div style={{width: '100%', height: '800px'}}>
        <GoogleMapReact
          defaultCenter={{lat: 38.3862206, lng: -121.2647843}}
          defaultZoom={11}
        >
          <InfoCircle
            lat = {38.3862206}
            lng = {-121.2647843}
            title = "California"
            info = "1234"
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
