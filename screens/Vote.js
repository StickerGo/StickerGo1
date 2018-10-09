import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
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
      vote: '',
    };
    this.selectImage = this.selectImage.bind(this);
    this.vote = this.vote.bind(this);
    this.voteAgain = this.voteAgain.bind(this);
  }

  async componentDidMount() {
    const roomId = this.props.roomId;
    try {
      await this.props.getPlayersinRoom(roomId);
      await this.props.getNumPlayers(roomId);
      for (let i = 0; i < this.props.playersInRoom.length; i++) {
        await this.props.getImages(this.props.playersInRoom[i]);
      }
    } catch (error) {
      console.log('there was an error!!!', error);
    }
  }

  selectImage(id) {
    this.setState({ vote: id });
  }

  async voteAgain(id) {
    await this.vote(id);
  }

  async vote(playerId) {
    const ref = await db
      .database()
      .ref('rooms')
      .child(this.props.roomId)
      .child('players')
      .child(playerId)
      .child('votes')
      .transaction(function (votes) {
        return (votes || 0) + 1;
      });
  }

  render() {
    const imagesArray = this.props.images;
    const vote = this.state.vote;

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
                  let imageStyling = styles.unselectedImageStyle;
                  if (vote === image.id) {
                    imageStyling = styles.selectedImageStyle;
                  }
                  return (
                    <TouchableOpacity
                      key={image.id}
                      onPress={() => this.selectImage(image.id)}
                    >
                      <Image
                        key={image.id}
                        source={{ isStatic: true, uri: image.url }}
                        style={imageStyling}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.voteButton}
                onPress={() => {
                  this.voteAgain(this.state.vote);
                  this.props.navigation.navigate('WinnerWaiting');
                }}
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
