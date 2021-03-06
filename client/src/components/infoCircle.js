import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './infoCircle.css';

/**
 * Component that will display covid cases in a circle
 * @return {InfoCircle}
 */
class InfoCircle extends Component {
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
      <div className={'infoCircle animate'}
        style={{width: (10+this.props.data.index),
          height: (10+this.props.data.index)}}>
        {/* <div>
          {this.props.data.location}
        </div>
        <div>
          {this.props.data.cases}
        </div> */}
      </div>
    );
  }
}

InfoCircle.propTypes = {
  data: PropTypes.object,
};

export default InfoCircle;
