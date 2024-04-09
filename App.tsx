import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet,} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import MatchScreen from './src/screens/MatchScreen';


const App = () => {

  const onSwipeLeft = (user) => {
    console.warn("swipe left", user.name)
  };

  const onSwipeRight = (user) => {
    console.warn("swipe right", user.name)
  };

  return (
    <View style={styles.pageContainer}>
      <MatchScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    flex: 1,
  },
})

export default App;