import React from "react";
import { StyleSheet, View, Text } from "react-native";
import BucketInput from "./BucketInput";
import BucketList from "./BucketList";

export default class App extends React.Component {
  state = {
    id: 0,
    buckets: [],
  };

  handleCreate = (data) => {
    console.log(data);

    const newBucket = {
      id: ++this.state.id,
      bucket: data.bucket,
      completed: false,
    };

    this.setState((prevState) => ({
      buckets: [newBucket, ...prevState.buckets],
    }));

    console.log("Updated Bucket List: ", this.state.buckets);
  };

  handleToggleCompleted = (id) => {
    const { buckets } = this.state;
    this.setState({
      buckets: buckets.map(
        (bucket) =>
          id === bucket.id
            ? (bucket.completed = !bucket.completed) // completed를 반대 값으로 지정
            : bucket.completed // 아니면 기존 값 유지
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Bucket List</Text>
        <BucketInput handleCreate={this.handleCreate} />
        <BucketList
          data={this.state.buckets}
          onToggleCompleted={this.handleToggleCompleted}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 50,
    backgroundColor: "#EEE",
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20,
  },
});
