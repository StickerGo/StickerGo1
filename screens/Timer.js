import Expo from 'expo';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { stylesDefault } from '../styles/componentStyles';
console.disableYellowBox = true;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.reduceOnSecond = this.reduceOnSecond.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.intervalID = null;
    this.state = {
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
    if (!this.props.isFocused) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    } else if (number > 0) {
      this.setState({
        countdown: number - 1,
        displayedMinutes,
        displayedSeconds,
      });
    } else {
      this.props.screenshot();
      this.props.navigation.navigate(this.props.navigateTo);
    }
  }

  reduceOnSecond() {
    this.renderMinChange(this.state.countdown);
  }

  startCountdown() {
    this.renderMinChange();
    this.intervalID = setInterval(this.reduceOnSecond, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.displayedSeconds <= 10 &&
        this.state.displayedMinutes !== '01' ? (
          <Text style={styles.timerRed}>
            Time: {this.state.displayedMinutes}:{this.state.displayedSeconds}
          </Text>
        ) : (
          <Text style={styles.timer} adjustsFontSizeToFit>
            Time: {this.state.displayedMinutes}:{this.state.displayedSeconds}
          </Text>
        )}
      </View>
    );
  }
}

export default withNavigationFocus(Timer);

const styles = stylesDefault;
