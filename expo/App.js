import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Stock from './screens/Stock';
import Crypto from './screens/Crypto';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AppLoading} from 'expo';
import {useFonts} from 'expo-font';

const navigationOptions = {
	headerStyle: {
	  backgroundColor: '#000',
	  height: 50,
	  justifyContent: 'flex-end',
	  elevation: 0,
	},
	headerTitleStyle: {
	  color: '#FFFFFF',
	  justifyContent: 'flex-end',
	},
	headerTintColor: '#FFFFFF',
  };

const Drawer = createDrawerNavigator();

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
			<Drawer.Navigator>
				<Drawer.Screen name="Home" component={Home} />
				<Drawer.Screen name="Profile" component={Profile} />
				<Drawer.Screen name="Market Today" component={Stock} />
				<Drawer.Screen name="Cryptocurrency" component={Crypto} />
			</Drawer.Navigator>
		</View>
	);
}

export default()=>{
	return(
		<NavigationContainer>
			<App/>
		</NavigationContainer> 
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
