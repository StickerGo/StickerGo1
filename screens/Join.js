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
import { connect } from 'react-redux';
import { FBAddPlayer } from '../reducer/playerReducer';

class Join extends React.Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      pickval: 2,
      name: 'Enter name',
      code: '',
      id: '',
    };
    this.addPlayer = this.addPlayer.bind(this);
  }

  componentDidMount() {
    const randomNum = Math.floor(Math.random() * 1000 + 1);
    //once we connect with the room generator, add to id
    const id = randomNum;
    this.setState({ id: id });
  }

  addPlayer(name) {
    console.log('setting the state!', this.state);
    console.log('in the addPlayer function', name);
    this.props.addAPlayer({
      name,
      id: name + this.state.id,
      draw: '',
      photo: '',
      roomId: this.state.code,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textEnter}
          placeholder="Enter your name"
          onChangeText={text => {
            this.setState({
              name: text,
            });
          }}
        />
        <Text />
        <TextInput
          style={styles.textEnter}
          placeholder="Enter room code"
          onChangeText={text => {
            this.setState({
              code: text,
            });
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              this.addPlayer(this.state.name);
              this.props.navigation.navigate('Home', {
                userId: this.state.name + this.state.id,
                roomId: this.state.code,
              });
            }}
            title="Start"
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
    width: 75,
    borderRadius: 10,
    overflow: 'hidden',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
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
    padding: 10,
    borderColor: '#40E0D0',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    players: state.players,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAPlayer: player => dispatch(FBAddPlayer(player)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
