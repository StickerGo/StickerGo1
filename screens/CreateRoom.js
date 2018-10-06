import React from 'react';
import {
  TouchableOpacity,
  View,
  Picker,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import { getAllPrompts } from '../reducer/promptReducer';
import { createRoom } from '../reducer/roomReducer';
import { connect } from 'react-redux';
import { stylesDefault } from '../styles/componentStyles';

class Room extends React.Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      pickval: 2,
      name: '',
      nameEntered: true,
    };
    this.getRoom = this.getRoom.bind(this);
  }
  componentDidMount() {
    this.props.getAllPrompts();
  }

  getRoom() {
    if (!this.state.name) {
      this.setState({ nameEntered: false });
    } else {
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
      this.props.navigation.navigate('RoomCode', {
        name: this.state.name,
      });
    }
  }
  render() {
    return (
      <ScrollView style={styles.joinOrCreateRoomContainer}>
        <View style={styles.nonButtonContainer}>
          <View style={styles.container}>
            {this.state.nameEntered === false && <Text>Name required</Text>}
            <Text style={styles.text}>Enter your name</Text>
            <TextInput
              style={styles.textEnter}
              placeholder="your name here"
              onChangeText={text => {
                this.setState(previousState => {
                  return { name: text };
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
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
            </Picker>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              this.getRoom();
            }}
          >
            <Text style={styles.startButtonText}>get code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
