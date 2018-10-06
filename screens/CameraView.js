import Expo, { AR, LinearGradient } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import db from '../reducer/firebase';
import { stylesDefault } from '../styles/componentStyles';
import TouchableView from './TouchableView';
import Timer from './Timer';
import { connect } from 'react-redux';
import { View as GraphicsView } from 'expo-graphics';
console.disableYellowBox = true;

class LinkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.position = new THREE.Vector3();
    this.aim = new THREE.Vector3();
    this.state = {
      userId: '',
      image: '',
      photo: '',
      sizeChanger: 5,
    };
    this.increaseSize = this.increaseSize.bind(this);
    this.decreaseSize = this.decreaseSize.bind(this);
    this.saveImage = this.saveImage.bind(this);
  }
  saveImage() {
    const photo = this.state.photo;

    db.database()
      .ref('players')
      .child(`/${this.props.player.id}/photo`)
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
      <View style={styles.container}>
        <LinearGradient
          colors={['#192f6a', 'cadetblue', 'lightpink']}
          style={styles.linearGradientstyle}
        >
          <View style={styles.nonButtonContainer}>
            <TouchableView
              style={{ flex: 5, width: 300, height: 400 }}
              shouldCancelWhenOutside={false}
              onTouchesBegan={this.onTouchesBegan}
            >
              <GraphicsView
                ref={view => {
                  this._container = view;
                }}
                onContextCreate={this.onContextCreate}
                onRender={this.onRender}
                onResize={this.onResize}
                isArEnabled
                // isArRunningStateEnabled
                isArCameraStateEnabled
                arTrackingConfiguration={AR.TrackingConfigurations.World}
              />
            </TouchableView>
            <Timer
              style={{ flex: 1 }}
              navigation={this.props.navigation}
              navigateTo="VoteScreen"
              screenshot={this.screenShot}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.tinyButton}
              onPress={this.decreaseSize}
            >
              <Text style={styles.buttonText}>size--</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.screenShot();
                this.props.navigation.navigate('VoteScreen');
              }}
            >
              <Text style={styles.buttonText}>capture!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tinyButton}
              onPress={this.increaseSize}
            >
              <Text style={styles.buttonText}>size++</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  getImage() {
    let playerId = this.props.player.id;

    let newImage;
    db.database()
      .ref('players')
      .child(playerId)
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
    console.log('width is', width);
    console.log('height is', height);
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

const mapStateToProps = state => {
  return {
    roomId: state.rooms.room.id,
    player: state.players.player,
  };
};

export default connect(mapStateToProps)(LinkScreen);

const styles = stylesDefault;
