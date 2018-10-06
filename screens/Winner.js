import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import {
  Alert,
  AppRegistry,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
// import { stylesWinner } from '../styles/componentStyles';
import { connect } from 'react-redux';
import { getWinner } from '../reducer/playerReducer';
import { stylesDefault } from '../styles/componentStyles';

class Winner extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      name: 'name',
    };
  }
  componentDidMount() {
    this.props.getTheWinner(this.props.room.winnerId);
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#192f6a', 'cadetblue', 'lightpink']}
          style={styles.linearGradientstyle}
        >
          <Text />
          <Text style={styles.text}>Winner is: </Text>
          {this.props.winner && (
            <View style={styles.nonButtonContainer}>
              <Text style={styles.text}>{this.props.winner.name}</Text>
              <Image
                style={styles.image}
                source={{ uri: this.props.winner.photo }}
              />
            </View>
          )}
          <Text />

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Waiting')}
            >
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

// <Text style={styles.heading2}>{this.props.winner}</Text>

const mapStateToProps = state => {
  return {
    room: state.rooms.room,
    winner: state.players.winner,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTheWinner: winnerId => dispatch(getWinner(winnerId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Winner);

// const styles = stylesWinner;
const styles = stylesDefault;
