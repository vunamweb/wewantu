import React, {Component} from 'react';

import { createAppContainer } from 'react-navigation';

import router from './app/function/router';

import './app/config/config';

const AppNavigator = router.initNavigarion();

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
       <AppContainer/>
    )
  }
}
