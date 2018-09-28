import Expo, { AR } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import React from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
//console.disableYellowBox = true;
import TouchableView from './TouchableView';

import { View as GraphicsView } from 'expo-graphics';

export default class LinkScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableView
          style={{ flex: 1 }}
          shouldCancelWhenOutside={false}
          onTouchesBegan={this.onTouchesBegan}
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
        </TouchableView>
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

    const material = new THREE.SpriteMaterial({
      map: await ExpoTHREE.loadAsync(image),
    });
    material.transparent = true;

    // Combine our geometry and material
    this.sprite = new THREE.Sprite(material);
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
    this.renderer.render(this.scene, this.camera);
  };

  // Called when `onPanResponderGrant` is invoked.
  onTouchesBegan = async ({ locationX: x, locationY: y }) => {
    if (!this.renderer) {
      return;
    }

    // Get the size of the renderer
    const size = this.renderer.getSize();

    // Invoke the native hit test method
    const { hitTest } = await AR.performHitTest(
      {
        x: x / size.width,
        y: y / size.height,
      },
      // Result type from intersecting a horizontal plane estimate, determined for the current frame.
      AR.HitTestResultTypes.HorizontalPlane
    );

    // Traverse the test results
    for (let hit of hitTest) {
      const { worldTransform } = hit;
      // If we've already placed a cube, then remove it
      if (this.cube) {
        this.scene.remove(this.cube);
      }

      // Create a new cube
      const geometry = new THREE.BoxGeometry(0.0254, 0.0254, 0.0254);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
      });
      this.cube = new THREE.Mesh(geometry, material);
      // Add the cube to the scene
      this.scene.add(this.cube);

      // Disable the matrix auto updating system
      this.cube.matrixAutoUpdate = false;

      /*
      Parse the matrix array: ex:
        [
          1,0,0,0,
          0,1,0,0,
          0,0,1,0,
          0,0,0,1
        ]
      */
      const matrix = new THREE.Matrix4();
      matrix.fromArray(worldTransform);

      // Manually update the matrix
      this.cube.applyMatrix(matrix);
      this.cube.updateMatrix();
    }
  };
}
