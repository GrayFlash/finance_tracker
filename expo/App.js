// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Profile from './screens/Profile';
// import WelcomeForm from './screens/welcome_form';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const stackDesignHead = {
          title: "Home", 
          headerTintColor:"black",
          headerStyle:{ 
          backgroundColor:"white"
      }
}

function App() {
  return (
    <View style={styles.container}>
      {/* <WelcomeForm/> */}
      {/* <Home /> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={stackDesignHead}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{...stackDesignHead, title:"Profile"}}
        />
      </Stack.Navigator>
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
