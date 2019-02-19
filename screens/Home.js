import React, { Component } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import { stylesDefault } from '../styles/componentStyles';
import { LinearGradient, Asset } from 'expo';

// Image.prefetch('https://media.giphy.com/media/4Zqfoq9gQl0gHuowmc/giphy.gif')
// Image.prefetch('https://media.giphy.com/media/9JgeNOiRwsvbg9RVsq/giphy.gif')

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }

  async componentDidMount() {
    const drawingBear = Asset.fromModule(
      require('../assets/images/drawing_bear.gif')
    ).downloadAsync();
    const loadingBear = Asset.fromModule(
      require('../assets/images/loading_bears.gif')
    );
    await Promise.all([drawingBear, loadingBear]);
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
              source={require('../assets/images/drawing_bear.gif')}
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
              <Text style={styles.buttonTextHome}>Create</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="cadetblue"
              style={styles.button}
              onPress={() => this.props.navigation.navigate('JoinRoom')}
            >
              <Text style={styles.buttonTextHome}>Join</Text>
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
