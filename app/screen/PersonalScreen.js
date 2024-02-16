import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";

class PersonalScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { height: 90 },
    headerTitleStyle: {
      color: "white",
    },
    title: "Thông tin cá nhân",
  });

  componentDidMount() {}

  render() {
    return <View />;
  }
}

export default PersonalScreen;
