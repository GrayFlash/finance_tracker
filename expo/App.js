// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Home from './screens/Home';
import Profile from './screens/Profile';
// import WelcomeForm from './screens/welcome_form';
import Camera from './screens/camera';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const stackDesignHead = {
	title: "Home", 
	headerTintColor:"black",
	headerStyle:{ 
		backgroundColor:"white"
	}
}

const stackDesignHeadForHome = {
		title: "Home", 
		headerTintColor:"black",
        headerStyle:{ 
        	backgroundColor:"white"
		},
		headerRight: () => (
            <ProfileButton />
        ),
}

function App(props) {
  return (
    <View style={styles.container}>
      {/* <WelcomeForm/> */}
      {/* <Home /> */}
      <Camera/>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={stackDesignHeadForHome}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{...stackDesignHead, title:"Profile"}}
        />
      </Stack.Navigator> */}
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

function ProfileButton() {
	const navigation = useNavigation();
	return (
		<TouchableOpacity 
			style={{marginRight: 10, padding: 10, backgroundColor: "pink", borderRadius: 500}}
			onPress={()=> navigation.navigate("Profile")}
		>
			<Text style={{textAlign: "center"}}>Profile</Text>
		</TouchableOpacity>
	);	
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
