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
   * Function that pulls data from disease.sh API and prepares it for use
   * @param {array} locArray
   */
  initData( locArray ) {
    console.log(locArray);
    let index = 0;
    const tmp = [];
    locArray.forEach((location) => {
      location['type'] = 1;
      location['index'] = index;
      index++;
      tmp.push(location);
    });

    const sorted = tmp.sort( (a, b) => {
      return a['cases'] - b['cases'];
    });

    for ( let i = 0; i < sorted.length; i++ ) {
      sorted[i]['index'] = i;
    }

    this.setState({
      locations: tmp,
    });
  }

  /**
   * Catch the main component mounting, so cases data can be
   * downloaded on page load
   */
  componentDidMount() {
    fetch(`/api/getStateData?date="2020-11-07"`)
        .then( (res) => res.json() )
        .then( (res) => {
          this.initData(res);
        });
  }

  /**
   * Handles a click of infoCircle component
   * @param {object} key
   * @param {object} childProps
   * @return {void}
   */
  handleClick(key, childProps) {
    console.log(childProps.data);
    const tmp = !childProps.data.type;

    const tmp2 = this.state.locations;
    tmp2[childProps.data.index]['type'] = tmp;
    this.setState({
      locations: tmp2,
    });
  }

  /**
   * @param {object} e
   */
  dateSelect(e) {
    if ( e.key === 'Enter' ) {
      fetch(`/api/getStateData?date="${e.target.value}"`)
          .then( (res) => res.json() )
          .then( (res) => {
            this.initData(res);
          });
    }
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
            defaultZoom={5}
            onChildClick={this.handleClick.bind(this)}
          >
            { this.state.locations.map( (location) =>
              <InfoCircle
                lat = {location['lat']}
                lng = {location['lng']}
                key = {location['id']}
                data = {location}
              />,
            )}
          </GoogleMapReact>
          <input onKeyDown={ (e) => this.dateSelect(e) }/>
        </div>
      </div>
    );
  }
}

export default App;
