import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './infoCircle.css';

/**
 * Component that will display covid cases in a circle
 * @return {InfoBox}
 */
class InfoBox extends Component {
  /**
      * Constructor for the InfoCircle components
      * Takes title text and info text as props
      * @param {*} props
      */
  constructor(props) {
    super(props);
  }

  /**
     * Renders a circle with relevant information from the area's cases
     * @return {void}
     */
  render() {
    return (
      <div className={'infoBox'}>
        <div>
          {this.props.data.location}
        </div>
        <div>
          {'Cases: ' + this.props.data.cases}
        </div>
        <div>
          {'Deaths: ' + this.props.data.deaths}
        </div>
      </div>
    );
  }
}

InfoBox.propTypes = {
  data: PropTypes.object,
};

export default InfoBox;
