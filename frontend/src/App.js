import React, { Component } from 'react';
import Main from './components/Main';
require('../styles/App.css');
require('../styles/Login.css');

class App extends Component {
  render() {
    return (
      <Main />
    )
  }
}
App.defaultProps = {
};
export default App;
