import React, { Component } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class BucketInput extends Component {
  state = {
    bucket: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.handleCreate(this.state);

    this.setState({
      bucket: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder="당신의 버킷리스트는 무엇인가요? 추가해보세요!"
            autoCorrect={false}
            value={this.state.bucket}
            onChangeText={(bucket) => this.setState({bucket})}
          />
          <TouchableOpacity onPressOut={this.handleSubmit}>
            <MaterialCommunityIcons
              style={styles.addBtn}
              size={30}
              name="plus-circle"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputText: {
    flex: 1,
  },
  addBtn: {
    color: "#4169E1",
  },
});

export default BucketInput;
