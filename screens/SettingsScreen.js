import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View, Text, Image } from 'react-native';
import db from '../reducer/firebase';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }

  getImage() {
    let newImage;
    db.database()
      .ref('players')
      .child(this.props.navigation.getParam('userId'))
      .child('photo')
      .on('value', function (snapshot) {
        newImage = snapshot.val();
      });
    return (
      <Image
        style={{ flex: 1, width: '100%', resizeMode: 'contain' }}
        source={{ isStatic: true, uri: newImage }}
      />
    );
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >
        <Text>Naaaaaaame</Text>
        {this.getImage()}
      </View>
    );
  }
}
