// import React from 'react';
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Expo, { WebBrowser } from 'expo';

// import { MonoText } from '../components/StyledText';
// import ExpoPixi from 'expo-pixi';
// export default class HomeScreen extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };

//   onChange = async ({ width, height }) => {
//     const options = {
//       format: 'png', /// PNG because the view has a clear background
//       quality: 0.1, /// Low quality works because it's just a line
//       result: 'file',
//       height,
//       width,
//     };
//     const uri = await Expo.takeSnapshotAsync(this.sketch, options);
//   };

//   render() {
//     const color = 0x0000ff;
//     const width = 5;
//     const alpha = 0.5;
//     return (
//       <View style={styles.container}>
//         <Text>Hello</Text>
//         <ExpoPixi.Sketch
//           strokeColor={color}
//           strokeWidth={width}
//           strokeAlpha={alpha}
//         />
//         <ExpoPixi.Sketch
//           ref={ref => (this.sketch = ref)}
//           onChange={this.onChange}
//         />
//         <ScrollView
//           style={styles.container}
//           contentContainerStyle={styles.contentContainer}
//         >
//           <View style={styles.getStartedContainer}>
//             <Text style={styles.getStartedText}>
//               Change this text and your app will automatically reload. Are you
//               sure?
//             </Text>
//           </View>

//           <View style={styles.helpContainer}>
//             <TouchableOpacity
//               onPress={this._handleHelpPress}
//               style={styles.helpLink}
//             >
//               <Text style={styles.helpLinkText}>
//                 Help, it didn’t automatically reload!
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>

//         <View style={styles.tabBarInfoContainer}>
//           <Text style={styles.tabBarInfoText}>
//             This is a tab bar. You can edit it in:
//           </Text>

//           <View
//             style={[styles.codeHighlightContainer, styles.navigationFilename]}
//           >
//             <MonoText style={styles.codeHighlightText}>
//               navigation/MainTabNavigator.js
//             </MonoText>
//           </View>
//         </View>
//       </View>
//       // <View styles={styles.container}>
//       //   <Text> Hello</Text>
//       //   <ExpoPixi.Sketch
//       //     strokeColor={color}
//       //     strokeWidth={width}
//       //     strokeAlpha={alpha}
//       //   />
//       //   <ExpoPixi.Sketch
//       //     ref={ref => (this.sketch = ref)}
//       //     onChange={this.onChange}
//       //   />
//       //   <Expo.GLView
//       //     style={{ flex: 1 }}
//       //     onContextCreate={async context => {
//       //       const app = ExpoPixi.application({ context });
//       //       const sprite = await ExpoPixi.spriteAsync(
//       //         'http://i.imgur.com/uwrbErh.png'
//       //       );
//       //       app.stage.addChild(sprite);
//       //     }}
//       //   />

//       // </View>
//     );
//   }

//   _maybeRenderDevelopmentModeWarning() {
//     if (__DEV__) {
//       const learnMoreButton = (
//         <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
//           Learn more
//         </Text>
//       );

//       return (
//         <Text style={styles.developmentModeText}>
//           Development mode is enabled, your app will be slower but you can use
//           useful development tools. {learnMoreButton}
//         </Text>
//       );
//     } else {
//       return (
//         <Text style={styles.developmentModeText}>
//           You are not in development mode, your app will run at full speed.
//         </Text>
//       );
//     }
//   }

//   _handleLearnMorePress = () => {
//     WebBrowser.openBrowserAsync(
//       'https://docs.expo.io/versions/latest/guides/development-mode'
//     );
//   };

//   _handleHelpPress = () => {
//     WebBrowser.openBrowserAsync(
//       'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
//     );
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });

import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import {
  Image,
  Button,
  Platform,
  AppState,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const isAndroid = Platform.OS === 'android';
function uuidv4() {
  //https://stackoverflow.com/a/2117523/4047926
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default class App extends Component {
  state = {
    image: null,
    strokeColor: Math.random() * 0xffffff,
    strokeWidth: Math.random() * 30 + 10,
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

  // onChangeAsync = async () => {
  //   const { uri } = await this.sketch.takeSnapshotAsync();

  //   this.setState({
  //     image: { uri },
  //     strokeWidth: Math.random() * 30 + 10,
  //     strokeColor: Math.random() * 0xffffff,
  //   });
  // };
   onChangeAsync = async ({ width, height }) => {
    const options = {
      format: 'png', /// PNG because the view has a clear background
      quality: 0.1, /// Low quality works because it's just a line
      result: 'file',
      height,
      width
    };
    /// Using 'Expo.takeSnapShotAsync', and our view 'this.sketch' we can get a uri of the image
    const uri = await Expo.takeSnapshotAsync(this.sketch, options);
    this.setState({
          image: { uri },
          strokeWidth: Math.random() * 30 + 10,
          strokeColor: Math.random() * 0xffffff,
        });
  };

  onReady = () => {
    console.log('ready!');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
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
            <View style={styles.label}>
              <Text>Canvas - draw here</Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.label}>
              <Text>Snapshot</Text>
            </View>
            <Image style={styles.image} source={this.state.image} />
          </View>
        </View>
        <Button
          color={'blue'}
          title="undo"
          style={styles.button}
          onPress={() => {
            this.sketch.undo();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketch: {
    flex: 1,
  },
  sketchContainer: {
    height: '50%',
  },
  image: {
    flex: 1,
  },
  imageContainer: {
    height: '50%',
    borderTopWidth: 4,
    borderTopColor: '#E44262',
  },
  label: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  button: {
    // position: 'absolute',
    // bottom: 8,
    // left: 8,
    zIndex: 1,
    padding: 12,
    minWidth: 56,
    minHeight: 48,
  },
});
