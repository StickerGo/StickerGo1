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

  async componentDidMount() {
    const roomId = this.props.roomId;
    await this.props.getPlayersinRoom(roomId);
  }

  findPlayerImage = () => {
    const playersInRoom = this.props.playersInRoom;
    const arrOfImages = playersInRoom.map(async player => {
      try {
        const dbImages = await db
          .database()
          .ref('players')
          .child(player)
          .child('photo')
          .once('value');
        console.log('what the hell', dbImages.val());
        return dbImages.val();
      } catch (err) {
        console.error('THERE IS SOMETHING WRONG IN ARRAYOFIMAGES', err);
      }
    });
    console.log('arrofimages', arrOfImages);
    return arrOfImages;
  };

  render() {
    return (
      <View style={styles.container}>
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
  //
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
    roomId: state.rooms.room.id,
    playersInRoom: state.rooms.playersInRoom,
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
