import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class Main extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('yertegi', () => Main);
