import Expo, { AR } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import React from 'react';
import { Text, View, PanResponder } from 'react-native';
import db from '../reducer/firebase';

//console.disableYellowBox = true;
import TouchableView from './TouchableView';

import { View as GraphicsView } from 'expo-graphics';

export default class LinkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.navigation.getParam('userId'),
    };
  }

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
      </View>
    );
  }

  componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true);
    // ThreeAR.suppressWarnings();
  }

  onContextCreate = props => {
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Vertical);
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

    // let newImage;
    // function getImage(userId) {
    //   db.database()
    //     .ref('players')
    //     .child(userId)
    //     .on('value', function(snapshot) {
    //       newImage = snapshot.val();
    //       console.log('image file ', newImage.draw);
    //     });
    //   return newImage.draw;
    // }
    function getImage() {
      let newImage;
      db.database()
        .ref('/')
        .on('value', function(snapshot) {
          newImage = snapshot.val();
        });
      return newImage.image.uri;
    }

    const image = getImage();
    // const image = getImage(this.props.navigation.getParam('userId'));
    const material = new THREE.SpriteMaterial({
      map: await ExpoTHREE.loadAsync(image),
    });
    material.transparent = true;

    // Combine our geometry and material
    this.sprite = new THREE.Sprite(material);
    // Place the box 0.4 meters in front of us.
    this.sprite.position.z = -5;
    // this.sprite.rotateOnWorldAxis()
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

  onTouchesBegan = async ({ locationX: x, locationY: y }) => {
    if (!this.renderer) {
      return;
    }

    const size = this.renderer.getSize();
    const { hitTest } = await AR.performHitTest(
      {
        x: x / size.width,
        y: y / size.height,
      },

      AR.HitTestResultTypes.existingPlane
    );
    function getImage() {
      let newImage;
      db.database()
        .ref('/')
        .on('value', function(snapshot) {
          newImage = snapshot.val();
        });
      return newImage.image.uri;
    }
    for (let hit of hitTest) {
      const { worldTransform } = hit;
      this.scene.remove(this.sprite);

      const image = getImage();

      const material = new THREE.SpriteMaterial({
        map: await ExpoTHREE.loadAsync(image),
      });
      material.transparent = true;

      // Combine our geometry and material
      this.sprite = new THREE.Sprite(material);
      // Place the box 0.4 meters in front of us.
      this.sprite.position.z = -5;
      // this.sprite.rotateOnWorldAxis()
      console.log('in the commonSetup', this.sprite.position);
      // Add the cube to the scene
      this.scene.add(this.sprite);
      this.scene.add(new THREE.AmbientLight(0xffffff));
      const matrix = new THREE.Matrix4();
      matrix.fromArray(worldTransform);

      // Manually update the matrix
      this.sprite.applyMatrix(matrix);
      this.sprite.updateMatrix();
    }
  };
}
