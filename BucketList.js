import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Bucket from "./Bucket.js";

export default class BucketList extends Component {
  static defaultProps = {
    list: [],
    onToggleCompleted: () => console.warn("onToggleCompleted not defined"),
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined')
  };

  //변화가 필요하지 않을 때는 render 함수가 호출되지 않도록
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  // state와 props를 잘 알아야 부모와 자식간 데이터 교류를 잘 할 수 있다.
  render() {
    const { data, onToggleCompleted, onRemove, onUpdate } = this.props;
    const list = data.map((bucket) => (
      <Bucket
        key={bucket.id}
        info={bucket}
        onToggleCompleted={onToggleCompleted}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    ));

    return <View style={styles.container}>{list}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
});
