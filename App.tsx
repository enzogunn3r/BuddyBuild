import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/screens/HomeScreen';
import MatchScreen from './src/screens/MatchScreen';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import config from './src/aws-exports';
import ProfileScreen from './src/screens/ProfileScreen';
import { useEffect } from 'react';
//import { DataStore } from 'aws-amplify/datastore';
//import { Hub, ConsoleLogger } from 'aws-amplify/utils'
import './src/models';

Amplify.configure(config);


const App = () => {

  const [activeScreen, setActiveScreen] = useState('HOME')

  const activeColor = '#F76C6B';
  const color = '#b5b5b5';

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.pageContainer}>

        <View style={styles.topNavigation}>
          <Pressable onPress={() => setActiveScreen('HOME')}>
            <Fontisto name="tinder" size={30} color={activeScreen == 'HOME' ? activeColor : color} />
          </Pressable>

          <MaterialCommunityIcons name="star-four-points" size={30} color={color} />

          <Pressable onPress={() => setActiveScreen('CHAT')}>
            <Ionicons name="ios-chatbubbles" size={30} color={activeScreen == 'CHAT' ? activeColor : color} />
          </Pressable>

          <Pressable onPress={() => setActiveScreen('PROFILE')}>
            <FontAwesome name="user" size={30} color={activeScreen == 'PROFILE' ? activeColor : color} />
          </Pressable>

        </View>
        {activeScreen == 'HOME' && <HomeScreen />}
        {activeScreen == 'CHAT' && <MatchScreen />}
        {activeScreen == 'PROFILE' && <ProfileScreen />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    flex: 1,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  }
})

export default withAuthenticator(App);