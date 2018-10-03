import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
//import { stylesCreate } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    this.props.navigation.navigate('Room');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nonButtonContainer}>
          <Text style={styles.heading}>StickerGo</Text>
          <Text style={styles.text}>go STICK it!</Text>
          <Image
            style={styles.image}
            source={{
              uri: 'https://media.giphy.com/media/26tPgy93ssTeTTSqA/giphy.gif',
            }}
          />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('CreateRoom');
            }}
          >
            <Text style={styles.buttonText}>Create a Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('JoinRoom')}
          >
            <Text style={styles.buttonText}>Join a Room</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// const styles = stylesCreate;
const styles = stylesDefault;

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);
