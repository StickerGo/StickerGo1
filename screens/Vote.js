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

export default class Contest extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      photos: [],
      image: '',
    };
  }

  getPlayersinRoom() {
    let temp = [];
    const players = db
      .database()
      .ref('players')
      .orderByChild('roomId')
      .equalTo(this.props.navigation.getParam('roomId'))
      .on('value', function(snapshot) {
        temp.push(snapshot.val());
      });
    return temp;
  }

  render() {
    // const roomId = '-LO-g12iBdup0TnqFhuC';
    const roomId = this.props.navigation.getParam('roomId');
    let [objects] = this.getPlayersinRoom();
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
