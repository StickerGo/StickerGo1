import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';
import { stylesContest } from '../styles/componentStyles';

export default class Contest extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('Winner')}
            title="Submit Vote"
            color="white"
          />
        </View>
        ) }
      </View>
    );
  }
}

const styles = stylesContest;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   buttonContainer: {
//     margin: 20,
//   },
//   alternativeLayoutButtonContainer: {
//     margin: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });
