'use strict';

const React = require('react');

const PropTypes = require('prop-types');

const {
  Text,
  Color
} = require('ink');

const App = ({
  name
}) => React.createElement(Text, null, "Hello, ", React.createElement(Color, {
  green: true
}, name));

App.propTypes = {
  name: PropTypes.string
};
App.defaultProps = {
  name: 'Stranger'
};
module.exports = App;