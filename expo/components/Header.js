import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default function Header({ props, viewMode, NavbarButtonHandler }) {
    return (
        <View>
            {<NavigationBar viewMode={viewMode} NavbarButtonHandler={NavbarButtonHandler}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    MainHeadingView : {
        flex: 1, 
        flexDirection: 'row', 
        paddingHorizontal: 24, 
        alignItems: 'center',
        marginRight: 24,
    }, 
});
