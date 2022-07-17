import React from "react";
import PropTypes from "prop-types";

const Text = props => {
    const { className, text } = props;
  
    return <h1 className={className}>{text}</h1>;
  };
  
  Text.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired
  };
  
  export default Text;