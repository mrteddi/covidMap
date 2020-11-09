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
   * Changes a infoCircle into new style
   */
  changeType() {
    const tmp = !this.props.data.type;
    this.setState({
      type: tmp,
    });
  }
  /**
     * Renders a circle with relevant information from the area's cases
     * @return {void}
     */
  render() {
    return (
      <div className={this.props.data.type ? 'infoBox' : 'infoCircle'}>
        <div>
          {this.props.data.location}
        </div>
        <div>
          {this.props.data.cases}
        </div>
      </div>
    );
  }
}

InfoCircle.propTypes = {
  data: PropTypes.object,
};

export default InfoCircle;
