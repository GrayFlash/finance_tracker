import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { person } from "./data/dummyPerson";
import {AppLoading} from 'expo';
import {useFonts} from 'expo-font';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const Drawer = createDrawerNavigator();
function HomePage({navigation}) {
  return (
    <Home/>
  );
}

function ProfilePage() {
  return (
    <Profile/>
  );
}

function App(props) {
  let [fontsLoaded] = useFonts({
    'GothamBlack': require('./assets/fonts/Gotham-Black.otf'),
    'GothamBold': require('./assets/fonts/Gotham-Bold.otf'),
    'GothamMedium': require('./assets/fonts/GothamMedium.ttf'),
    'GothamLight': require('./assets/fonts/GothamLight.ttf'),
    'GothamThin': require('./assets/fonts/Gotham-Thin.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {/* <WelcomeForm/> */}
      {/* <Camera/> */}
     <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
    </Drawer.Navigator>
    </View>
  );
}

export default()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
