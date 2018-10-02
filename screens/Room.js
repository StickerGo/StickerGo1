import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  View,
  Picker,
  Text,
  TextInput,
} from 'react-native';
import { stylesRoom } from '../styles/componentStyles';

export default class Room extends React.Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      pickval: 2,
      typedText: 'Enter name',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textEnter}
          placeholder="Enter your name"
          onChangeText={text => {
            this.setState(previousState => {
              return { typedText: text };
            });
          }}
        />
        <Text />
        <View style={styles.pickerContainer}>
          <View>
            <Text style={styles.text}>How many players?</Text>
          </View>
          <Picker
            selectedValue={this.state.pickval}
            style={styles.twoPickers}
            itemStyle={styles.twoPickerItems}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ pickval: itemValue })
            }
          >
            <Picker.Item
              label="#"
              value=""
              style={{ backgroundColor: 'white' }}
            />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('RoomCode')}
            title="Get Code"
            color="white"
          />
        </View>
      </View>
    );
  }
}

const styles = stylesRoom;
