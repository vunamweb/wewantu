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
var imgEdit = <Icon name="edit" size={15} color="#898166" />;

class TextInputHobbies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: null,
      listWord: [],
      displayEdit: 'none',
      positionEdit: 0,
      textEdit: null
    };
  }

  componentDidMount = () => {
    var hobbies;

    try {
      hobbies = (global.commonData.user.another.hobbies != null) ? JSON.parse(global.commonData.user.another.hobbies) : [];

      this.setState({ listWord: hobbies });
    } catch (error) {
      console.log(error);
    }
  };

  add = (word) => {
    if (word != "") {
      var listWord = this.state.listWord;

      listWord.push(word);

      var obj = {};

      try {
        obj.hobbies = JSON.stringify(listWord);
        obj.user_id = global.commonData.user.user_id;

        global.commonData.user.another.hobbies = JSON.stringify(listWord);
      } catch (error) {
        console.log(error);
      }

      functions.updateUser(this, obj, 7);

      this.setState({ listWord: listWord, description: null });
    }
  };

  edit = () => {
    var listWord = this.state.listWord;

    try {
      listWord.map((item, index) => {
        if (index == this.state.positionEdit)
          listWord[index] = this.state.textEdit;
      })
    } catch (error) {
      console.log(error);
    }

    var obj = {};

    try {
      obj.hobbies = JSON.stringify(listWord);
      obj.user_id = global.commonData.user.user_id;

      global.commonData.user.another.hobbies = JSON.stringify(listWord);
    } catch (error) {
      console.log(error);
    }

    functions.updateUser(this, obj, 7);

    this.setState({ listWord: listWord, displayEdit: 'none' });
  };

  delete = (index) => {
    var listWord = this.state.listWord;

    listWord.splice(index, 1);

    var obj = {};

    try {
      obj.hobbies = JSON.stringify(listWord);
      obj.user_id = global.commonData.user.user_id;

      global.commonData.user.another.hobbies = JSON.stringify(listWord);
    } catch (error) {
      console.log(error);
    }

    functions.updateUser(this, obj, 7);

    this.setState({ listWord: listWord });
  };

  setEdit = (position) => {
    let display = (this.state.displayEdit == 'none') ? 'flex' : 'none';
    let textEdit = null;

    var listWord = this.state.listWord;

    try {
      listWord.map((item, index) => {
        if (index == position)
          textEdit = item;
      })
    } catch (error) {
      console.log(error);
    }

    this.setState({ displayEdit: display, positionEdit: position, textEdit: textEdit })
  }

  renderItem = ({ item, index }) => (
    <Href style={styles.touchableOpacityBottom} onPress={() => null}>
      <Text>{item}</Text>
    </Href>
  );

  render() {
    var display = this.state.description != null ? "flex" : "none";

    return (
      <View style={[styles.fullWith]}>
        <TextInput
          {...this.props}
          onChangeText={(value) => this.setState({ description: value })}
          value={this.state.description}
        />
        <Href
          style={[style.viewAddWord, { display: display }]}
          onPress={() => this.add(this.state.description)}
        >
          <Text>{this.state.description}</Text>
          <Icon style={style.send} name="send" size={24} color="#898166" />
        </Href>
        <Href
          style={[style.viewEditWord, { display: this.state.displayEdit }]}
          onPress={() => this.edit()}
        >
          <TextInput
            onChangeText={(value) => this.setState({ textEdit: value })}
            value={this.state.textEdit}
            bgFocus="white"
            bgBlur="#3f3f3f"
          />
          <Icon style={style.save} name="save" size={24} color="#898166" />
        </Href>
        <View style={[styles.flexRow, style.viewTextList]}>
          {this.state.listWord.map((item, index) => {
            return (
              <View style={[styles.flexRow, style.textList]}>
                <Href onPress={() => this.delete(index)} style={style.delete}>
                  {imgDelete}
                </Href>
                <Href onPress={() => this.setEdit(index)} style={style.delete}>
                  {imgEdit}
                </Href>
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
    flexWrap: "wrap",
  },

  textList: {
    marginTop: 10,
    marginRight: 20,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },

  delete: {
    marginTop: 5,
    marginRight: 5,
  },

  viewAddWord: {
    width: "100%",
    borderColor: "#ccc",
    borderRadius: 5,
    height: 50,
    paddingTop: 10,
    paddingLeft: 10,
    borderWidth: 1,
  },

  viewEditWord: {
    width: "100%",
    height: 50,
    paddingTop: 10,
    paddingLeft: 10,
  },

  send: {
    position: "absolute",
    right: 10,
    top: 10,
  },

  save: {
    position: "absolute",
    right: 10,
    top: 15,
  },
});

export default TextInputHobbies;
