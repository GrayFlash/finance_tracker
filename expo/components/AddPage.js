import React from 'react';
import { 
    StyleSheet, 
    Text,
    View, 
    ScrollView,
    TextInput,
    TouchableOpacity, 
    Button
} from 'react-native';
import CameraButton from './AddPageComponents/CameraButton';
import ScanBill from './AddPageComponents/ScanBill';
import ManualAdd from './AddPageComponents/timepassForm';


export default function AddSection() {
    return (
        <ScrollView style={styles.mainAddSection} contentContainerStyle={{ flexGrow: 1 }}>   
            
            {/*<CameraButton />*/} 

            <ScanBill />
            
            {/*<ManualAdd />*/}

        </ScrollView>
    );
} 

const styles = StyleSheet.create({
    mainAddSection : {
        marginTop: 20, 
        marginHorizontal: 24,
    },
});
