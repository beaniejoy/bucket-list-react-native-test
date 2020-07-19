import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Bucket extends Component {
  static defaultProps = {
    info: {
      id: 0,
      bucket: "버킷리스트 항목",
      completed: false,
    },
  };

  state = {
    // 눌렀을 때 editing 값을 true로 설정
    // 기존에 텍스트 형태로 보여주던 값들을 input 형태로 보여주도록 합니다.
    editing: false,
    // input 값을 담기 위해서 각 필드를 위한 값도 설정
    bucket: "",
  };

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleToggleCompleted = () => {
    const { info, onToggleCompleted } = this.props;
    onToggleCompleted(info.id);
  };

  // 이 부분은 TextInput 차원에서 처리를 해주기에 불필요한 코드
  // handleChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  componentDidUpdate(prevProps, prevState) {
    // editing 값이 바뀔 때 처리 할 로직
    // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
    // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      // editing 값이 false -> true 로 전환 될 때
      // info 의 값을 state 에 넣어준다
      this.setState({
        bucket: info.bucket,
      });
    }

    if (prevState.editing && !this.state.editing) {
      // editing 값이 true -> false 로 전환 될 때
      onUpdate(info.id, {
        bucket: this.state.bucket,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
    if (
      !this.state.editing &&
      !nextState.editing &&
      nextProps.info === this.props.info
    ) {
      return false;
    }
    // 나머지 경우엔 리렌더링함
    return true;
  }

  render() {
    const { editing } = this.state;

    if (editing) {
      // 수정모드
      return (
        <View style={styles.bucket}>
          <View style={styles.bucketText}>
            <TextInput
              placeholder={this.state.bucket}
              autoCorrect={false}
              value={this.state.bucket}
              onChangeText={(bucket) => this.setState({ bucket })}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={this.handleToggleEdit}>
              <MaterialCommunityIcons
                style={styles.bucketUpdateBtn}
                size={30}
                name="check-bold"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleRemove}>
              <MaterialCommunityIcons
                style={styles.bucketDelBtn}
                size={30}
                name="delete-outline"
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const { id, bucket, completed } = this.props.info;

    return (
      <View style={styles.bucket}>
        <View style={styles.bucketText}>
          <TouchableOpacity
            style={styles.bucketCheckbox}
            onPress={this.handleToggleCompleted}
          >
            {/* 완료, 미완료 bucketlist 각각 style 따로 지정  */}
            {completed ? (
              <MaterialCommunityIcons
                size={20}
                name="checkbox-marked-circle-outline"
              />
            ) : (
              <MaterialCommunityIcons
                size={20}
                name="checkbox-blank-circle-outline"
              />
            )}
          </TouchableOpacity>
          {completed ? (
            <Text style={styles.bucketDone}>{bucket}</Text>
          ) : (
            <Text>{bucket}</Text>
          )}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.handleToggleEdit}>
            <MaterialCommunityIcons
              style={styles.bucketUpdateBtn}
              size={30}
              name="pencil"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleRemove}>
            <MaterialCommunityIcons
              style={styles.bucketDelBtn}
              size={30}
              name="delete-outline"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bucket: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  bucketCheckbox: {
    marginRight: 5,
  },
  bucketText: {
    flexDirection: "row",
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
  bucketDelBtn: {
    color: "#777",
  },
  bucketUpdateBtn: {
    color: "#777",
  },
  bucketDone: {
    textDecorationLine: "line-through",
  },
  btnContainer: {
    flexDirection: "row",
  },
});
