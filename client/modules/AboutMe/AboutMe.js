import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Style
import styles from './AboutMe.css';

class AboutMe extends Component {
  render() {
    return (
      <div>
        <h2>Tobiasz Łoś</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

AboutMe.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutMe);
