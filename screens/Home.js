import React, { Component } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import { stylesDefault } from '../styles/componentStyles';
import { LinearGradient } from 'expo';

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
        <LinearGradient
          colors={['#192f6a', 'cadetblue', 'lightpink']}
          style={styles.linearGradientstyleHome}
        >
          <View style={styles.nonButtonContainer}>
            <Text style={styles.heading}>StickerGo</Text>

            <Image
              style={styles.image}
              source={{
                uri:
                  'https://media.giphy.com/media/4Zqfoq9gQl0gHuowmc/giphy.gif',
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              underlayColor="cadetblue"
              onPress={() => {
                this.props.navigation.navigate('CreateRoom');
              }}
            >
              <Text style={styles.buttonText}>create room</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="cadetblue"
              style={styles.button}
              onPress={() => this.props.navigation.navigate('JoinRoom')}
            >
              <Text style={styles.buttonText}>join room</Text>
            </TouchableHighlight>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

// const styles = stylesCreate;
const styles = stylesDefault;

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);
