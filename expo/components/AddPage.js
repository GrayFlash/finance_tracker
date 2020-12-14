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

export default function AddSection({ categoriesData, people}) {
    return (
        <ScrollView style={styles.mainAddSection}>   
            
            <ScanBill categoriesData={categoriesData} people={people} />
            
        </ScrollView>
    );
} 

const styles = StyleSheet.create({
    mainAddSection : {
        marginTop: 10, 
        marginHorizontal: 24,
    },
});
