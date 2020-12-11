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
import ScanBill from './AddPageComponents/ScanBill';
import ScanBill_testing from './AddPageComponents/testing';

export default function AddSection() {
    return (
        <ScrollView style={styles.mainAddSection} contentContainerStyle={{ flexGrow: 1 }}>   
            
            <ScanBill />
            
        </ScrollView>
    );
} 

const styles = StyleSheet.create({
    mainAddSection : {
        marginTop: 20, 
        marginHorizontal: 24,
    },
});
