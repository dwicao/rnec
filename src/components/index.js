import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import ExitConfirm from '../ExitConfirm';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <ExitConfirm>
        <Home />
      </ExitConfirm>
    );
  }
}
