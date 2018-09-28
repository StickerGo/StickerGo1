import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';

let counter = 1;

export default class Waiting extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        {counter === 0 ? (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Start"
            />
            {counter++}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.props.navigation.navigate('Contest')}
              title="Go to Vote"
              color="#841584"
            />
            {counter--}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
