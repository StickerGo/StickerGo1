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
import { LinearGradient } from 'expo';
import {
  getPlayersinRoom,
  getImages,
  getNumPlayers,
} from '../reducer/roomReducer';

class Contest extends Component {
  _onPressButton() { }
  constructor() {
    super();
    this.state = {
      photos: [],
      image: '',
    };
  }

  async componentDidMount() {
    const roomId = this.props.roomId;
    try {
      await this.props.getPlayersinRoom(roomId);
      await this.props.getNumPlayers(roomId);
      console.log('do we have the players?', this.props.playersInRoom);
      for (let i = 0; i < this.props.playersInRoom.length; i++) {
        await this.props.getImages(this.props.playersInRoom[i]);
      }
      console.log('did we get the images???', this.props.images);
    } catch (error) {
      console.log('there was an error!!!', error);
    }
  }

  render() {
    const imagesArray = this.props.images;
    console.log('hello?');
    console.log('imagesArray', imagesArray);
    if (imagesArray.length > 0) {
      return (
        <View style={styles.container}>
          <LinearGradient
            colors={['cadetblue', 'lightpink']}
            style={{ flex: 8, padding: 40 }}
          >
            <View style={styles.scrollContainer}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {imagesArray.map(image => {
                  return (
                    <Image
                      key={image}
                      source={{ isStatic: true, uri: image }}
                      style={{
                        width: 300,
                        height: 300,
                        margin: 10,
                        padding: 30,

                        alignSelf: 'center',
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.voteButton}
                onPress={() => this.props.navigation.navigate('Winner')}
              >
                <Text style={styles.startButtonText}>Submit vote</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Waiting For All Players</Text>
        </View>
      );
    }
  }
}

const styles = stylesDefault;

const mapStateToProps = state => {
  return {
    players: state.players.players,
    roomSize: state.rooms.room.numPlayers,
    roomId: state.rooms.room.id,
    playersInRoom: state.rooms.playersInRoom,
    images: state.rooms.images,
    numOfPlayers: state.rooms.num,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPlayersinRoom: roomId => dispatch(getPlayersinRoom(roomId)),
    getImages: playerIds => dispatch(getImages(playerIds)),
    getNumPlayers: roomId => dispatch(getNumPlayers(roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contest);
