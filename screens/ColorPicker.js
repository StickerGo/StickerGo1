import Expo, { LinearGradient } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { TouchableOpacity, Platform, AppState, Text, View } from 'react-native';
import db from '../reducer/firebase';
import { getOnePrompt } from '../reducer/promptReducer';
import { connect } from 'react-redux';
import Timer from './Timer';
// import { stylesHome } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';
import { ColorWheel } from 'react-native-color-wheel';
var hsl = require('hsl-to-hex');

console.disableYellowBox = true;

export default class ColorPicker extends Component {
  state = {
    image: null,
    // strokeColor: Math.random() * 0xffffff,
    // strokeWidth: Math.random() * 30 + 10,
    strokeColor: 0x00bfff,
    strokeWidth: 20,
    lines: [
      {
        points: [
          { x: 300, y: 300 },
          { x: 600, y: 300 },
          { x: 450, y: 600 },
          { x: 300, y: 300 },
        ],
        color: 0xff00ff,
        alpha: 1,
        width: 10,
      },
    ],
    appState: AppState.currentState,
  };

  saveImage = () => {
    const draw = this.state.image;

    db.database()
      .ref('players')
      .child(`/true/draw`)
      .set(draw.uri);
  };

  handleAppStateChangeAsync = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (isAndroid && this.sketch) {
        this.setState({
          appState: nextAppState,
          id: uuidv4(),
          lines: this.sketch.lines,
        });
        return;
      }
    }
    this.setState({ appState: nextAppState });
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeAsync);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChangeAsync);
  }

  onChangeAsync = async ({ width, height }) => {
    const options = {
      format: 'png', /// PNG because the view has a clear background
      quality: 0.1, /// Low quality works because it's just a line
      result: 'file',
      height,
      width,
    };
    /// Using 'Expo.takeSnapShotAsync', and our view 'this.sketch' we can get a uri of the image
    const uri = await Expo.takeSnapshotAsync(this.sketch, options);
    this.setState({
      image: { uri },
      // strokeWidth: Math.random() * 30 + 10,
      // strokeColor: Math.random() * 0xffffff,
    });
  };

  onReady = () => {
    console.log('ready!');
  };

  findColor(color) {
    return hsl(
      Math.round(color.h),
      Math.round(color.s),
      Math.round(color.v / 2)
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#192f6a', 'cadetblue', 'lightpink']}
          style={styles.linearGradientstyleDraw}
        >
          <View style={styles.nonButtonContainer}>
            <Text style={styles.challengeText}>Your Challenge:</Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.challenge}
            />
            <View style={styles.sketchContainer}>
              <ExpoPixi.Sketch
                ref={ref => (this.sketch = ref)}
                style={styles.sketch}
                strokeColor={this.state.strokeColor}
                strokeWidth={this.state.strokeWidth}
                strokeAlpha={1}
                onChange={this.onChangeAsync}
                onReady={this.onReady}
              />
            </View>
          </View>
          <View style={styles.container}>
            <ColorWheel
              initialColor="#000000"
              onColorChange={color => {
                const colorFound = this.findColor(color).split('#')[1];
                console.log('colorFound is', colorFound);
                const strokeColor = '0x' + colorFound;
                console.log('strokecolor is', strokeColor);
                this.setState({ strokeColor });
              }}
              style={{
                width: 150,
                height: 150,
              }}
              thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = stylesDefault;
