import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Wrapper, Button } from 'react-native';

import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <Button
        title="Go to Profile"
        onPress={() => this.props.navigation.navigate('ShowNear')}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
