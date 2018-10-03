import { StyleSheet } from 'react-native';

export const stylesCreate = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  joinButtonContainer: {
    margin: 80,
    backgroundColor: '#00BFFF',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  createButtonContainer: {
    margin: 80,
    backgroundColor: '#40E0D0',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'grey',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const stylesRoom = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 80,
    backgroundColor: '#00BFFF',
    height: 40,
    justifyContent: 'center',
    width: 100,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textEnter: {
    height: 40,
    width: '70%',
    margin: 20,
    marginTop: 80,
    padding: 10,
    borderColor: '#40E0D0',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  twoPickers: {
    width: 30,
    height: 80,
    marginLeft: 20,
    borderColor: '#40E0D0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  twoPickerItems: {
    height: '95%',
    width: '90%',
    color: 'black',
    backgroundColor: 'white',
    borderColor: '#40E0D0',
    fontSize: 16,
  },
  text: {
    // alignSelf: 'center',
    // fontWeight: 'bold',
    fontSize: 16,
  },
});
export const stylesRoomCode = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 80,
    backgroundColor: '#00BFFF',
    height: 40,
    justifyContent: 'center',
    width: 120,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textEnter: {
    height: 40,
    width: 100,
    margin: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'grey',
  },
});
export const stylesHome = StyleSheet.create({
  container: {
    flex: 4,
  },
  sketch: {
    flex: 1,
    borderColor: '#40E0D0',
    borderWidth: 3,
    backgroundColor: 'white',
  },
  sketchContainer: {
    padding: 20,
    height: '100%',
    width: '100%',
  },
  image: {
    flex: 1,
  },
  label: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 0,
  },
  undoButton: {
    zIndex: 1,
    width: 70,
    height: 40,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: '#CD5C5C',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  saveButton: {
    zIndex: 1,
    width: 70,
    height: 40,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: '#40E0D0',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export const stylesWaiting = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8BFD8',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    margin: 80,
    backgroundColor: '#00BFFF',
    height: 40,
    justifyContent: 'center',
    width: 120,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
});

export const stylesContest = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 80,
    backgroundColor: '#00BFFF',
    height: 40,
    justifyContent: 'center',
    width: 120,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const stylesWinner = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 80,
    backgroundColor: '#00BFFF',
    height: 40,
    justifyContent: 'center',
    width: 120,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textEnter: {
    height: 40,
    width: 100,
    margin: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
