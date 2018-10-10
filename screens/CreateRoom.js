import React from 'react';
import {
  TouchableOpacity,
  View,
  Picker,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import { getAllPrompts } from '../reducer/promptReducer';
import { createRoom } from '../reducer/roomReducer';
import { connect } from 'react-redux';
import { stylesDefault } from '../styles/componentStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Room extends React.Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      pickval: 2,
      typedText: '',
      playerId: '',
      name: '',
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
    this.props.navigation.navigate('RoomCode', {
      name: this.state.name,
    });
  }
  render() {
    let checkName = this.state.typedText.trim() !== '';
    let checkChar = /^[a-zA-Z]*$/g.test(this.state.typedText);
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.joinOrCreateRoomContainer}
      >
        <DismissKeyboard>
          <View style={styles.joinOrCreateRoomContainer}>
            <View style={styles.nonButtonContainerCreate}>
              <View style={styles.container}>
                <Text style={styles.textCreateName}>Enter your name</Text>
                <TextInput
                  style={styles.textEnter}
                  placeholder="Your Name"
                  onChangeText={text => {
                    this.setState(previousState => {
                      return { typedText: text };
                    });
                  }}
                />

                {checkName &&
                  !checkChar && (
                    <Text style={styles.buttonText}>Letters Only</Text>
                  )}
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
                  if (!checkName) {
                    return Alert.alert(
                      'Who are you?',
                      'Name Required',
                      [
                        {
                          text: 'OK',
                          onPress: () => console.log('OK Pressed'),
                        },
                      ],
                      { cancelable: false }
                    );
                  }
                  if (checkName && checkChar) {
                    this.setState(state => {
                      return { name: this.typedText };
                    });
                    this.getRoom();
                    this.props.navigation.navigate('RoomCode', {
                      name: this.state.typedText,
                    });
                  }
                }}
              >
                <Text style={styles.startButtonText}>get code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </DismissKeyboard>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    prompts: state.prompts.prompts,
    player: state.players.player,
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

const styles = stylesDefault;
