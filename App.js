import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/NavigationService';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer/root';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  render() {
    // if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
    //   return (
    //     <Provider store={store}>
    //       <AppLoading
    //         startAsync={this._loadResourcesAsync}
    //         onError={this._handleLoadingError}
    //         onFinish={this._handleFinishLoading}
    //       />
    //     </Provider>
    //   );
    // } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </View>
      </Provider>
    );
    //   }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
