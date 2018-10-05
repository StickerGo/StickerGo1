import Expo, { AR } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import React from 'react';
import {
  Text,
  View,
  PanResponder,
  Button,
  TouchableOpacity,
} from 'react-native';
import db from '../reducer/firebase';
import { stylesDefault } from '../styles/componentStyles';
console.disableYellowBox = true;
import TouchableView from './TouchableView';
import Timer from './Timer';

import { View as GraphicsView } from 'expo-graphics';

export default class LinkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.position = new THREE.Vector3();
    this.aim = new THREE.Vector3();
    this.state = {
      userId: this.props.navigation.getParam('userId'),
      image: '',
      photo: '',
      sizeChanger: 5,
    };
    this.increaseSize = this.increaseSize.bind(this);
    this.decreaseSize = this.decreaseSize.bind(this);
  }
  saveImage() {
    const photo = this.state.photo;

    db.database()
      .ref('players')
      .child(`/${this.props.navigation.getParam('userId')}/photo`)
      .set(photo.photo);
  }
  increaseSize() {
    this.setState({
      sizeChanger: this.state.sizeChanger - 1,
    });
  }
  decreaseSize() {
    this.setState({
      sizeChanger: this.state.sizeChanger + 1,
    });
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
        <Timer navigation={this.props.navigation} navigateTo="Vote" />
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={this.decreaseSize}>
            <Text style={styles.buttonText}>-size</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.screenShot}>
            <Text style={styles.buttonText}>capture!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.increaseSize}>
            <Text style={styles.buttonText}>+size</Text>
          </TouchableOpacity>
        </View>
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
      .on('value', function(snapshot) {
        newImage = snapshot.val();
      });
    return newImage;
  }

  componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
    const image = this.getImage();
    this.setState({ image });
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

    const material = new THREE.SpriteMaterial({
      map: await ExpoTHREE.loadAsync(this.state.image),
    });
    material.transparent = true;

    // Combine our geometry and material
    this.sprite = new THREE.Sprite(material);
    // Place the box 0.4 meters in front of us.
    this.sprite.position.z = -5;

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
    this.camera.getWorldPosition(this.position);
    this.camera.getWorldDirection(this.aim);
    this.aim.normalize();
    if (this.sprite) {
      this.sprite.position.x =
        this.position.x + this.aim.x * this.state.sizeChanger;
      this.sprite.position.y =
        this.position.y + this.aim.y * this.state.sizeChanger;
      this.sprite.position.z =
        this.position.z + this.aim.z * this.state.sizeChanger;
    }
    this.renderer.render(this.scene, this.camera);
  };

  onTouchesBegan = async ({ locationX: x, locationY: y }) => {
    if (!this.renderer) {
      return;
    }
    this.aim.normalize();
    if (this.sprite) {
      this.sprite.position.x =
        this.position.x + this.aim.x * this.state.sizeChanger;
      this.sprite.position.y =
        this.position.y + this.aim.y * this.state.sizeChanger;
      this.sprite.position.z =
        this.position.z + this.aim.z * this.state.sizeChanger;
    }
  };
}

const styles = stylesDefault;
