import Expo, { AR } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import React from 'react';
import { Text, View, PanResponder, Button } from 'react-native';
import db from '../reducer/firebase';

//console.disableYellowBox = true;
import TouchableView from './TouchableView';

import { View as GraphicsView } from 'expo-graphics';

export default class LinkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.getParam('userId'),
      image: '',
      photo: '',
    };
  }
  saveImage() {
    const photo = this.state.photo;

    db.database()
      .ref('players')
      .child(`/${this.props.navigation.getParam('userId')}/photo`)
      .set(photo.photo);
  }

  screenShot = async () => {
    const options = {
      format: 'jpg', /// PNG because the view has a clear background
      quality: 0.1, /// Low quality works because it's just a line
      result: 'file',
    };
    /// Using 'Expo.takeSnapShotAsync', and our view 'this.sketch' we can get a uri of the image
    const photo = await Expo.takeSnapshotAsync(this._container, options);

    this.setState({
      photo: { photo },
      // strokeWidth: Math.random() * 30 + 10,
      // strokeColor: Math.random() * 0xffffff,
    });
    this.saveImage();
    this.props.navigation.navigate('Settings', { userId: this.state.userId })
  };
  render() {
    return (
      <View
        style={{ flex: 1 }}
        ref={view => {
          this._container = view;
        }}
      >
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
        <Button color={'white'} title="Capture" onPress={this.screenShot} />
      </View>
    );
  }

  getImage() {
    let userId = this.state.userId;

    let newImage;
    db.database()
      .ref('players')
      .child(userId)
      .child('draw')
      .on('value', function (snapshot) {
        newImage = snapshot.val();
      });

    return newImage;
  }

  componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true);
    // ThreeAR.suppressWarnings();
    const image = this.getImage();
    this.setState({ image });
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

    const material = new THREE.SpriteMaterial({
      map: await ExpoTHREE.loadAsync(this.state.image),
    });
    material.transparent = true;

    // Combine our geometry and material
    this.sprite = new THREE.Sprite(material);
    // Place the box 0.4 meters in front of us.
    this.sprite.position.z = -5;
    // this.sprite.rotateOnWorldAxis()

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

    for (let hit of hitTest) {
      const { worldTransform } = hit;
      this.scene.remove(this.sprite);

      const image = this.state.image;

      const material = new THREE.SpriteMaterial({
        map: await ExpoTHREE.loadAsync(image),
      });
      material.transparent = true;

      // Combine our geometry and material
      this.sprite = new THREE.Sprite(material);
      // Place the box 0.4 meters in front of us.
      this.sprite.position.z = -5;
      // this.sprite.rotateOnWorldAxis()

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
