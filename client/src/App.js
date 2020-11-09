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
    fetch(`/api/getStateData?date="2020-11-07"`)
        .then( (res) => res.json() )
        .then( (res) => {
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

  /**
   *
   */
  handleChange() {
    // this.type = 1;
    // this.setState({
    //   type: 1,
    // });
  }

  /**
   * Handles a click of infoCircle component
   * @param {object} key
   * @param {object} childProps
   * @return {void}
   */
  handleClick(key, childProps) {
    // console.log(key);
    // console.log(childProps);
    // const tmp = !childProps.data.type;
    childProps.updateInfo();
    // console.log(this);
    // tmp2[childProps.data.index] = tmp;
    // this.setState({
    //   locations: tmp2,
    // });
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
            onChildClick={this.handleClick}
          >
            {this.state.locations.map( (location) =>

              <InfoCircle
                lat = {location['lat']}
                lng = {location['lng']}
                key = {location['id']}
                updateInfo = {this.handleChange}
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
