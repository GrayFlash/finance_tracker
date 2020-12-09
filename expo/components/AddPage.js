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


export default function AddSection() {
    return (
        <ScrollView style={styles.mainAddSection} contentContainerStyle={{ flexGrow: 1 }}>   

            {/*
                <TouchableOpacity>
                <View style=
                    {styles.cameraButton}>
                    <Text style={{color: "black", textAlign: "center"}}>
                        Camera
                    </Text>
                </View>
                </TouchableOpacity>
            */}
            
            <CameraButton />
            
            {
                // Date
                // Categories
                // Amount
                // Product Name

                // Description
            } 
            
            <View>
                <Text>Product Name</Text>
                <TextInput 
                    style={styles.inputField}
                    placeholder="Product Name" 
                />

                <Text> Category</Text>
                <TextInput 
                    style={styles.inputField}
                    placeholder="Product Name" 
                />

                <Text>Amount</Text>
                <TextInput 
                    style={styles.inputField}
                    placeholder="Product Name" 
                />

                <Text>Date</Text>
                <TextInput 
                    style={styles.inputField}
                    placeholder="Product Name" 
                />

                <Text>Description</Text>
                <TextInput 
                    style={styles.inputField}
                    placeholder="Product Name" 
                />
                <TouchableOpacity>
                    <Button title="Add"/>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
} 

const styles = StyleSheet.create({
    mainAddSection : {
        marginTop: 20, 
        marginHorizontal: 24,
    },   
    inputField : {
        backgroundColor: "pink",
        padding: 20,
    },
});
