import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View, Text, Image } from 'react-native';
import db from '../reducer/firebase';

function getImage() {
  let newImage;
  db.database()
    .ref('players')
    .on('value', function(snapshot) {
      newImage = snapshot.val();
      console.log('retrieved from firebase', newImage.image.uri);
    });
  return (
    <Image
      style={{ flex: 1, width: '100%', resizeMode: 'contain' }}
      source={{ isStatic: true, uri: newImage.image.uri }}
    />
  );
}

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

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
          backgroundColor: '#000',
        }}
      >
        <Text>Naaaaaaame</Text>
        {getImage()}
      </View>
    );
  }
}
