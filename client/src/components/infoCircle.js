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
      <div className="infoCircle">
        <div>
          {this.props.title}
        </div>
        <div>
          {this.props.info}
        </div>
      </div>
    );
  }
}

InfoCircle.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
};

export default InfoCircle;
