import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import InfoCircle from './components/infoCircle.js';
import googleAPI from './key.json';
import './App.css';

/**
 * Main React Component
 * @return {void}
 */
class App extends Component {
  /**
     * Constructor for main component. Will store all
     * information needed to display cases
     */
  constructor() {
    super();
    this.state = {
      locations: [],
    };
  }

  /**
   * Catch the main component mounting, so cases data can be
   * downloaded on page load
   */
  componentDidMount() {
    fetch(`/api/getStateData`)
        .then( (res) => res.json() )
        .then( (res) => {
          console.log(res);
          res.forEach((location) => {
            const tmp = this.state.locations;
            tmp.push(location);
            this.setState({
              locations: tmp,
            });
          });
        });
  }
  /**
   * Render Google Map and iterate through each case
   * and display information
   * @return {void}
   */
  render() {
    return (
      <div className="App">
        <div style={{width: '100%', height: '800px'}}>
          <GoogleMapReact
            bootstrapURLKeys={{key: googleAPI.key}}
            defaultCenter={{lat: 38.3862206, lng: -121.2647843}}
            defaultZoom={11}
          >
            {this.state.locations.map( (location) =>

              <InfoCircle
                lat = {location['lat']}
                lng = {location['lng']}
                title = {location['location']}
                info = {location['cases']}
                key= {location['updated']}
              />,
            )}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
