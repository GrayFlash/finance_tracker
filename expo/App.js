import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { person } from "./data/dummyPerson";
import {AppLoading} from 'expo';
import {useFonts} from 'expo-font';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const Stack = createStackNavigator();

const stackDesignHeadForProfile = {
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
      {/* <Home /> */}
      {/* <Camera/> */}
       <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={stackDesignHeadForHome}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{...stackDesignHeadForProfile, title:"Profile"}}
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

function ProfileButton() {
  const navigation = useNavigation();
  let personData = person;
  console.log(personData);
	return (
		<TouchableOpacity 
			style={{marginRight: 10, padding: 0, backgroundColor: "#F5F5F5", borderRadius: 500}}
			onPress={()=> navigation.navigate("Profile", {personData})}
		>
      <Image 
          style={{
          width: 28,
          height: 28,
          borderRadius: 5,
          tintColor: "black"
        }} source={require('./assets/icons/user.png')} />
		</TouchableOpacity>
	);	
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
