import React from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  AsyncStorage,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
} from 'react-native';



// Row data (hard-coded)
const rows = [
  { id: 0, text: 'View' },
  { id: 1, text: 'Text' },
  { id: 2, text: 'Image' },
  { id: 3, text: 'ScrollView' },
  { id: 4, text: 'ListView' },
]

export default class AddObservationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  renderRow = (rowData) => {
    return (
      <Text style={styles.row}>
        {rowData.text}
      </Text>
    )
  }

  onClickListener = (viewId) => {
    this._saveData();
  }

  _saveData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore:species', this.state.species);
    } catch (error) {
      console.log("Error saving data" + error);
    }
    try {
      await AsyncStorage.setItem('@MySuperStore:rarity', this.state.rarity);
    } catch (error) {
      console.log("Error saving data" + error);
    }
    try {
      await AsyncStorage.setItem('@MySuperStore:notes', this.state.notes);
    } catch (error) {
      console.log("Error saving data" + error);
    }
    try {
      await AsyncStorage.setItem('@MySuperStore:timeStamp', this.state.timeStamp);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/birb.jpg')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>
              Local Birdwatching Association
            </Text>
          </View>
          <View style={styles.addObservationContainer}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                placeholder="Species"
                underlineColorAndroid='transparent'
                onChangeText={(species) => this.setState({ species })} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                placeholder="Rarity"
                underlineColorAndroid='transparent'
                onChangeText={(rarity) => this.setState({ rarity })} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                placeholder="Notes"
                underlineColorAndroid='transparent'
                onChangeText={(notes) => this.setState({ notes })} />
            </View>
            <View>
              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('Save')}>
                <Text style={styles.loginText}>Save</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('Cancel')}>
                <Text style={styles.loginText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>


    );
  }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  addObservationContainer: {
    alignItems: 'center',
    marginTop: 100,
  }

});
