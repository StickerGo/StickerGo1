import Expo, { LinearGradient } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Platform,
  AppState,
  Text,
  View,
  Alert,
} from 'react-native';
import db from '../reducer/firebase';
import { getOnePrompt } from '../reducer/promptReducer';
import { connect } from 'react-redux';
import Timer from './Timer';
// import { stylesHome } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';
import { ColorWheel } from 'react-native-color-wheel';
var hsl = require('hsl-to-hex');

console.disableYellowBox = true;

const isAndroid = Platform.OS === 'android';
function uuidv4() {
  //https://stackoverflow.com/a/2117523/4047926
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class Home extends Component {
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
      .child(`/${this.props.player.id}/draw`)
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
    this.props.getOnePrompt(this.props.player.roomId);

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
            >
              {this.props.prompt}
            </Text>
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

          <Timer
            style={styles.timer}
            navigation={this.props.navigation}
            navigateTo="CameraView"
            screenshot={this.saveImage}
          />
          <View style={styles.container}>
            <ColorWheel
              initialColor="#000000"
              onColorChange={color => {
                const colorFound = this.findColor(color).split('#')[1];
                const strokeColor = '0x' + colorFound;
                this.setState({ strokeColor });
              }}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.undoButton}
              onPress={() => {
                this.sketch.undo();
              }}
            >
              <Text style={styles.buttonText}>undo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                if (this.state.image === null) {
                  return Alert.alert(
                    `No ${this.props.prompt}?`,
                    'Need your beyootiful drawing ;)',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false }
                  );
                }
                this.saveImage();
                const id = this.props.player.id;
                this.props.navigation.navigate('CameraView');
              }}
            >
              <Text style={styles.buttonText}>DONE</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = stylesDefault;

const mapStateToProps = state => {
  return {
    player: state.players.player,
    prompt: state.prompts.prompt,
    roomId: state.rooms.room.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOnePrompt: roomId => dispatch(getOnePrompt(roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
