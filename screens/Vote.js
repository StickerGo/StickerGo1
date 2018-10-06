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
import { LinearGradient } from 'expo';

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
    const roomId = this.props.roomId;
    console.log('what is room id in vote', roomId);
    this.props.getPlayersinRoom(roomId);
  }

  render() {
    console.log('ROOM ID IN ROOM CODE', this.props.roomId);
    // const roomId = this.props.navigation.getParam('roomId');
    // let [objects] = this.props.getPlayersinRoom(roomId);
    // let array = [];
    // for (let player in objects) {
    //   array.push(objects[player]);
    // }
    // let photos = [];
    // array.map(players => photos.push(players.name));
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#192f6a', 'cadetblue', 'lightpink']}
          style={styles.linearGradientstyle}
        >
          <ScrollView style={styles.nonButtonContainer}>
            {/*array.map(players => (
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
          ))*/}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Winner')}
            >
              <Text style={styles.buttonText}>Submit vote</Text>
            </TouchableOpacity>
          </View>
          ) }
        </LinearGradient>
      </View>
    );
  }
}

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
