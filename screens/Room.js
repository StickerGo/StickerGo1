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

export default class Room extends React.Component {
  _onPressButton() { }
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
            <Picker.Item label="#" value="" style={{ backgroundColor: 'white' }} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 80,
    backgroundColor: '#00BFFF',
    height: 40,
    justifyContent: 'center',
    width: 100,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'stretch'
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textEnter: {
    height: 40,
    width: '70%',
    margin: 20,
    marginTop: 80,
    padding: 10,
    borderColor: '#40E0D0',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  twoPickers: {
    width: 30,
    height: 80,
    marginLeft: 20,
    borderColor: '#40E0D0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  twoPickerItems: {
    height: '95%',
    width: '90%',
    color: 'black',
    backgroundColor: 'white',
    borderColor: '#40E0D0',
    fontSize: 16
  },
  text: {
    // alignSelf: 'center',
    // fontWeight: 'bold',
    fontSize: 16,
  },
});
