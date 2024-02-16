import React, { Component } from "react";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

class ChangePasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { height: 90 },
    headerTitleStyle: {
      color: "white",
    },
    title: "Đổi mật khẩu",
  });

  componentDidMount() {}

  render() {
    return <View>Change password</View>;
  }
}

export default ChangePasswordScreen;
