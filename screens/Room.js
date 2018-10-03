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
import db from '../reducer/firebase';
import { getAllPrompts } from '../reducer/promptReducer';
import { createRoom } from '../reducer/roomReducer';
import { connect } from 'react-redux';
// import { stylesRoom } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';
console.disableYellowBox = true;

class Room extends React.Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      pickval: 2,
      typedText: 'Enter name',
      playerId: '',
    };
    this.getRoom = this.getRoom.bind(this);
  }
  componentDidMount() {
    this.props.getAllPrompts();
  }
  getRoom() {
    const prompt = this.props.prompts[
      Math.floor(Math.random() * this.props.prompts.length)
    ];
    const roomInfo = {
      numPlayers: this.state.pickval,
      status: 'open',
      winnerId: '',
      promptForRoom: prompt,
    };
    this.props.generateRoom(roomInfo);
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
            onPress={() => {
              this.getRoom();
              this.props.navigation.navigate('RoomCode', {
                name: this.state.typedText,
              });
            }}
            title="Get Code"
            color="white"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    prompts: state.prompts.prompts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPrompts: () => dispatch(getAllPrompts()),
    generateRoom: roomInfo => dispatch(createRoom(roomInfo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);

// const styles = stylesRoom;
const styles = stylesDefault;
