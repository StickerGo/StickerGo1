import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  CheckBox,
  InlineImage,
} from 'react-native';
//import { stylesContest } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';
import { connect } from 'react-redux';
import db from '../reducer/firebase';
import { getPlayersinRoom } from '../reducer/roomReducer';

class Contest extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      photos: [],
      image: '',
    };
  }

  componentDidMount() {
    const roomId = this.props.navigation.getParam('roomId');
    console.log('what is room id in vote', roomId);
    this.props.getPlayersinRoom(roomId);
  }

  render() {
    // const roomId = '-LO-g12iBdup0TnqFhuC';
    const roomId = this.props.navigation.getParam('roomId');
    let [objects] = this.props.getPlayersinRoom(roomId);
    let array = [];
    for (let player in objects) {
      array.push(objects[player]);
    }
    let photos = [];
    array.map(players => photos.push(players.name));
    return (
      <View style={styles.container}>
        <ScrollView>
          {array.map(players => (
            <Image
              key={players.name}
              source={{
                uri: players.photo,
              }}
              style={{
                width: 500,
                height: 500,
                resizeMode: 'cover',
                aspectRatio: 1.0,
              }}
            />
          ))}
        </ScrollView>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Winner')}
          >
            <Text style={styles.buttonText}>Submit vote</Text>
          </TouchableOpacity>
        </View>
        ) }
      </View>
    );
  }
}

//const styles = stylesContest;
const styles = stylesDefault;

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

const mapStateToProps = state => {
  return {
    players: state.players.players,
    roomSize: state.rooms.room.numPlayers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getAll: () => dispatch(getAllPlayers()),
    getPlayersinRoom: roomId => dispatch(getPlayersinRoom(roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contest);
