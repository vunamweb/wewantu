import React, { Fragment, Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  Alert,
  AppRegistry,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import TextInput from "../components/TextInput";
import Text from "../components/Paragraph";
import Href from "./Href";

import styles from "../../app/style/style";
import functions from "../../app/function/function";
import FlatListViewNormal from "../../app/components/library/FlatListViewNormal";

var imgDelete = <Icon name="trash-o" size={15} color="#898166" />;

class TextInputHobbies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: null,
      listWord: [],
    };
  }

  add = (word) => {
    if(word != '') {
        var listWord = this.state.listWord;

        listWord.push(word);
    
        this.setState({ listWord: listWord, description: null });
    }
  };

  delete = (index) => {
    var listWord = this.state.listWord;

    listWord.splice(index, 1);

    this.setState({ listWord: listWord });
  };

  renderItem = ({ item, index }) => (
    <Href style={styles.touchableOpacityBottom} onPress={() => null}>
      <Text>{item}</Text>
    </Href>
  );

  render() {
    var display = (this.state.description != null) ? 'flex' : 'none';

    return (
      <View style={[styles.fullWith]}>
        <TextInput
          {...this.props}
          onChangeText={(value) => this.setState({ description: value })}
          value={this.state.description}
        />
        <Href style={[style.viewAddWord, { display: display }]} onPress={() => this.add(this.state.description)}>
          <Text>{this.state.description}</Text>
        </Href>
        <View style={[styles.flexRow, style.viewTextList]}>
          {this.state.listWord.map((item, index) => {
            return (
              <View style={[styles.flexRow, style.textList]}>
                <Href onPress={() => this.delete(index)} style={style.delete}>{imgDelete}</Href>
                <Text>{item}</Text>
              </View>
            );
          })}
        </View>
        {/*<FlatListViewNormal
          style={style.container}
          data={this.state.listWord}
          renderItem={this.renderItem}
          horizontal={true}
    />*/}
      </View>
    );
  }
}

const style = StyleSheet.create({
  viewTextList: {
    marginBottom: 60,
    flexWrap: 'wrap'
  },

  textList: {
    marginTop: 10,
    marginRight: 20,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },

  delete: {
    marginTop: 5,
    marginRight: 5
  },

  viewAddWord: {
    width: '100%',
    borderColor: '#ccc',
    borderRadius: 5,
    height: 50,
    paddingTop: 10,
    paddingLeft: 10,
    borderWidth: 1,
  } 

});

export default TextInputHobbies;
