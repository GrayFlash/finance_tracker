import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default function Header({ props, viewMode, NavbarButtonHandler }) {
    return (
        <View>
            <View style={styles.MainHeadingView}>
                <Text style={styles.MainHeadingText}>My Expenses</Text>

                {/* BUTTON FOR STACK NAVIGATION */}
                <TouchableOpacity 
                    style={{margin: 120, padding: 10, backgroundColor: "pink", marginTop: 160, borderRadius: 500}}
                    onPress={()=> props.navigation.navigate("Profile")}
                >
                    <Text style={{textAlign: "center"}}>Profile</Text>
                </TouchableOpacity>

            </View>

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
        paddingTop: 10
    },
    MainHeadingText : {
        fontSize: 22, 
        lineHeight: 30, 
        color: 'black', 
        fontWeight: 'bold', 
        marginLeft: 0,
        marginTop: 30,
    }   
});
