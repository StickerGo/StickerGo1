import React, { Component } from 'react';
import {
  Button,
  TouchableOpacity,
  View,
  Picker,
  Text,
  TextInput,
} from 'react-native';
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
      id: Math.floor(Math.random() * 100000 + 1).toString(),
      numPlayers: this.state.pickval,
      status: 'open',
      winnerId: '',
      promptForRoom: prompt,
      players: {},
      joined: 1,
    };
    this.props.generateRoom(roomInfo);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nonButtonContainer}>
          <View style={styles.container}>
            <Text style={styles.text}>Enter your name</Text>
            <TextInput
              style={styles.textEnter}
              placeholder="your name here"
              onChangeText={text => {
                this.setState(previousState => {
                  return { typedText: text };
                });
              }}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>How many players?</Text>
            <Picker
              selectedValue={this.state.pickval}
              style={styles.twoPickers}
              itemStyle={styles.twoPickerItems}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ pickval: itemValue })
              }
            >
              <Picker.Item label="1" value="" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
            </Picker>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.getRoom();
              this.props.navigation.navigate('RoomCode', {
                name: this.state.typedText,
              });
            }}
          >
            <Text style={styles.buttonText}>Get Code</Text>
          </TouchableOpacity>
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
