import Expo, { AR } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import React from 'react';
import { PanResponder, Animated, Text, View } from 'react-native';
import * as firebase from 'firebase';
//console.disableYellowBox = true;

import { View as GraphicsView } from 'expo-graphics';

export default class LinkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
  }
  static url = 'screens/LinkScreen.js';
  componentWillMount() {
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),
    });
  }
  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle, { width: '100%', height: '100%' }]}
        >
          <GraphicsView
            style={{ flex: 2 }}
            onContextCreate={this.onContextCreate}
            onRender={this.onRender}
            onResize={this.onResize}
            isArEnabled
            isArRunningStateEnabled
            isArCameraStateEnabled
            arTrackingConfiguration={AR.TrackingConfigurations.World}
          />
        </Animated.View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>😮 Works with any size viewport, try rotating your phone.</Text>
        </View>
      </View>
    );
  }

  componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
  }

  onContextCreate = props => {
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);
    this.commonSetup(props);
  };

  commonSetup = async ({ gl, scale: pixelRatio, width, height }) => {
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height,
    });

    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
    const geometry = new THREE.PlaneGeometry(0.1, 0.1);
    // Simple color material
    // const material = new THREE.MeshPhongMaterial({
    //   map: await ExpoTHREE.loadAsync(
    //     'https://icon2.kisspng.com/20180206/que/kisspng-pokxe9mon-pikachu-ash-ketchum-pokxe9mon-i-choose-pikachu-png-transparent-image-5a797c2eb062f1.6659726115179110867225.jpg'
    //   ),
    // });
    // const material = new THREE.MeshPhongMaterial({
    //   map: await ExpoTHREE.loadAsync(require('../assets/images/robot-dev.png')),
    // });
    // const material = new THREE.MeshPhongMaterial({
    //   map: await ExpoTHREE.loadAsync(image),
    // });
    // const material = new THREE.SpriteMaterial({
    //   map: await ExpoTHREE.loadAsync(image),
    // });
    function getImage() {
      let newImage;
      firebase
        .database()
        .ref('/')
        .on('value', function(snapshot) {
          newImage = snapshot.val();
        });
      return newImage.image.uri;
    }
    const image = getImage();

    const material = new THREE.MeshPhongMaterial({
      map: await ExpoTHREE.loadAsync(image),
    });
    material.transparent = true;

    // Combine our geometry and material
    this.sprite = new THREE.Mesh(geometry, material);
    // Place the box 0.4 meters in front of us.
    this.sprite.position.z = -5;
    console.log('in the commonSetup', this.sprite.position);
    // Add the cube to the scene
    this.scene.add(this.sprite);
    this.scene.add(new THREE.AmbientLight(0xffffff));
  };

  onResize = ({ x, y, scale, width, height }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = () => {
    if (this.sprite) {
      // console.log('camera position', this.camera.position);
      this.sprite.position.z = this.sprite.position.z + this.camera.position.z;
    }
    this.renderer.render(this.scene, this.camera);
  };
}
