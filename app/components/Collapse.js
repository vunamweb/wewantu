import * as React from "react";
import { View, StyleSheet } from "react-native";

import ListView from "../components/ListView";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: -1,
    };
  }

  componentDidMount = () => {
    /*this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        // Logic to handle when the screen comes into focus (navigated back)
        console.log('Screen focused again:', payload);
        this.setState({ activeIndex: -1 });
        // You can perform actions or update state upon returning to this screen
      }
    );*/
  };

  componentWillUnmount() {
    // Don't forget to unsubscribe when the component unmounts
    /*if (this.didFocusSubscription) {
      this.didFocusSubscription.remove();
    }*/
  }

  render() {
    let col = this.props.col != null ? this.props.col : "2";

    return (
      <View style={[style.view1, this.props.style]}>
        {/* List Product */}
        <View style={style.view2}>
          <ListView
            data={this.props.data}
            renderItem={this.props.renderItem}
            col={this.props.col}
          />
          {/* END */}
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  view1: {
    marginTop: 30,
    width: "100%",
  },

  view2: {
    marginLeft: -20,
    marginRight: -20,
  },
});
