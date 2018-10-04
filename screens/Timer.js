import Expo from 'expo';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import db from '../reducer/firebase';
import { stylesDefault } from '../styles/componentStyles';
import TimerMixin from 'react-timer-mixin';
console.disableYellowBox = true;

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.reduceOnSecond = this.reduceOnSecond.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.state = {
      intervalID: null,
      countdown: 60,
      displayedMinutes: '',
      displayedSeconds: '',
    };
  }

  componentDidMount() {
    this.startCountdown();
  }

  renderMinChange(number = this.state.countdown) {
    const minutes = Math.floor(number / 60);
    const seconds = number % 60;
    const displayedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    const displayedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

    this.setState({
      countdown: number - 1,
      displayedMinutes,
      displayedSeconds,
    });
  }
  reduceOnSecond() {
    this.renderMinChange(this.state.countdown);
  }
  startCountdown() {
    this.renderMinChange();
    this.setState({
      intervalID: setInterval(this.reduceOnSecond, 1000),
    });
  }
  // componentWillUnmount() {
  //   this.clearInterval();
  // }
  //
  // getTime() {
  //   this.clearInterval = setInterval(() => {
  //     this.setState({
  //       countdown: this.state.countdown - 1000,
  //     });
  //   }, 1000);
  //   return this.state.countdown / 1000;
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Time: {this.state.displayedMinutes}:{this.state.displayedSeconds}
        </Text>
      </View>
    );
  }
}

const styles = stylesDefault;
