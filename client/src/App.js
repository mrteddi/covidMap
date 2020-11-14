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
      caseNumbers: [],
      minNum: 0,
      maxNum: 0,
    };
  }

  //   const [selectedLocation, setSelectedLocation ] = React.useState('');

  /**
   * Catch the main component mounting, so cases data can be
   * downloaded on page load
   */
  componentDidMount() {
    fetch(`/api/getStateData?date="2020-11-07"`)
        .then( (res) => res.json() )
        .then( (res) => {
          let index = 0;
          res.forEach((location) => {
            const tmp = this.state.locations;
            location['type'] = 1;
            location['index'] = index;
            index++;
            tmp.push(location);
            this.setState({
              locations: tmp,
            });
          });
        })
        .then( (res) => {
          const tmp = this.state.locations;

          const sorted = tmp.sort( (a, b) => {
            return a['cases'] - b['cases'];
          });

          for ( let i = 0; i < sorted.length; i++ ) {
            sorted[i]['index'] = i;
          }

          this.setState({
            locations: sorted,
          });
        });
  }

  /**
   *
   */
  handleChange() {
    console.log( this );
  }

  /**
   * Handles a click of infoCircle component
   * @param {object} key
   * @param {object} childProps
   * @return {void}
   */
  handleClick(key, childProps) {
    console.log(childProps);
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
            console.log(res);
            let index = 0;
            res.forEach((location) => {
              const tmp = this.state.locations;
              location['type'] = 0;
              location['index'] = index;
              index++;
              tmp.push(location);
              this.setState({
                locations: tmp,
              });
            });
          });
    }
  }

  /**
   * a
   * @param {obj} locs
   * @return {InfoCircle}
   */
  dot(locs) {
    // const [dotType, setdotType] = React.useState('');
    // setdotType('hello');
    // console.log( dotType );
    return (
      this.state.locations.map( (location) =>
        <InfoCircle
          lat = {location['lat']}
          lng = {location['lng']}
          key = {location['id']}
          // updateInfo = {this.handleChange}
          data = {location}
        />,
      )
    );
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
            {/* {this.dot(this.state.locations)} */}
            { this.state.locations.map( (location) =>
              <InfoCircle
                lat = {location['lat']}
                lng = {location['lng']}
                key = {location['id']}
                // updateInfo = {this.handleChange}
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
