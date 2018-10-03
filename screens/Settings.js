import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View, Text, Image } from 'react-native';
import { stylesDefault } from '../styles/componentStyles';
import { connect } from 'react-redux';
//CREATE A WAY TO CHANGE PAINT COLOR IN REDUCER
import { adjustColor } from '../reducer/playerReducer';

class Settings extends React.Component {
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;

    return (
      <View style={styles.container}>
        <Text>Name: {this.props.player.name}</Text>
        <Text>RoomId: {this.props.player.roomId}</Text>
        <Text>Prompt: {this.props.room.promptForRoom}</Text>
        <Text>Edit canvas paint color to:</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.players.player,
    room: state.rooms.room,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeColor: newColor => dispatch(adjustColor(newColor)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

const styles = stylesDefault;
