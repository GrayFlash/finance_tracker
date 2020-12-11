// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Profile from './screens/Profile';
// import WelcomeForm from './screens/welcome_form';

export default function App() {
  return (
    <View>
      {/* <WelcomeForm/> */}
      {/* <Home /> */}
      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
