import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

const screens = {
    Home: {
        screen: Home
    },
    Profile: {
        screen:  Profile
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);