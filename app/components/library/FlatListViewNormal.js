import React, { Fragment, Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

export default class FlatListViewNormal extends Component {
  // constructor(props){
  //     super(props);
  // }

  render() {
    return (
      <FlatList
        contentContainerStyle={this.props.style}
        data={this.props.data}
        renderItem={this.props.renderItem}
        horizontal={this.props.horizontal}
      />
    )
  };
}
