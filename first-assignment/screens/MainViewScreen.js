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
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Button } from 'react-native';
import { MonoText } from '../components/StyledText';
import {
  StackNavigator,
} from 'react-navigation';

let timestamp = new Date().toString();
const observations = [
  { id: 0, species: 'Birb1', rarity: 'common', notes: 'note1', timestamp: timestamp },
  { id: 1, species: 'Birb2', rarity: 'common', notes: 'note1', timestamp: timestamp },
  { id: 2, species: 'Birb3', rarity: 'common', notes: 'note1', timestamp: timestamp },
  { id: 3, species: 'Birb4', rarity: 'common', notes: 'note1', timestamp: timestamp },

]


// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id

// DataSource template object
const ds = new ListView.DataSource({ rowHasChanged })


export default class MainViewScreen extends React.Component {
  componentWillMount(){
    this._retrieveData();
    Alert.alert('Species: ' + this.state.species + '\n' +
    'Rarity: ' + this.state.rarity + '\n' +
    'Notes: ' + this.state.notes + '\n' + 
    'Timestamp: ' + this.state.timeStamp
    );
}
  static navigationOptions = {
    header: null,
  };

  state = {
    dataSource: ds.cloneWithRows(observations)
  }

  renderRow = (rowData) => {
    return (
      <Text style={styles.row}>
        {rowData.id} | {rowData.species} | {rowData.rarity} | {rowData.notes} | {rowData.timestamp}
      </Text>
    )
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
          <Text>
            
            Local Birdwatch Organisation
          </Text>
  
          </View>


          <View>
            <Button
              onPress={() => navigate('AddObservation')}
              title="Add Observation"
              color="#841584"
              accessibilityLabel="Add Observation Button"
            />

          </View>

          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </ScrollView>
      </View >
    );
  }

  
  _retrieveData = async () => {
    try {
      const speciesValue = await AsyncStorage.getItem('@MySuperStore:species');
      this.setState({species: speciesValue});
     } catch (error) {
      Alert.alert("Error retrieving data " + error);
    }
    try {
      const rarityValue = await AsyncStorage.getItem('@MySuperStore:rarity');
      this.setState({rarity: rarityValue});
     } catch (error) {
      Alert.alert("Error retrieving data " + error);
    }
    try {
      const notesValue = await AsyncStorage.getItem('@MySuperStore:notes');
      this.setState({notes: notesValue});
     } catch (error) {
      Alert.alert("Error retrieving data " + error);
    }
    try {
      const timeStampValue = await AsyncStorage.getItem('@MySuperStore:timeStamp');
      this.setState({timeStamp: timeStampValue});
     } catch (error) {
      Alert.alert("Error retrieving data " + error);
    }
    
    
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
});
