import Expo, { AR } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import React from 'react';
import { Text, View } from 'react-native';
//console.disableYellowBox = true;

import { View as GraphicsView } from 'expo-graphics';

export default class LinkScreen extends React.Component {
  static url = 'screens/LinkScreen.js';
  render() {
    return (
      <View style={{ flex: 1 }}>
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
    const material = new THREE.MeshPhongMaterial({
      map: await ExpoTHREE.loadAsync(require('../assets/images/robot-dev.png')),
    });

    // Combine our geometry and material
    this.cube = new THREE.Mesh(geometry, material);
    // Place the box 0.4 meters in front of us.
    this.cube.position.z = -0.4;
    // Add the cube to the scene
    this.scene.add(this.cube);
    this.scene.add(new THREE.AmbientLight(0xffffff));
  };

  onResize = ({ x, y, scale, width, height }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = () => {
    this.renderer.render(this.scene, this.camera);
  };
}
