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
        <ScrollView style={styles.mainAddSection} contentContainerStyle={{ flexGrow: 1 }}>   
            
            <ScanBill categoriesData={categoriesData} people={people} />
            
        </ScrollView>
    );
} 

const styles = StyleSheet.create({
    mainAddSection : {
        marginTop: 20, 
        marginHorizontal: 24,
    },
});
