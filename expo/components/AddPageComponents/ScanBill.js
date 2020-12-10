import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import BottomSheet from 'reanimated-bottom-sheet';
import ManualAdd from './timepassForm';
import {TouchableOpacity} from 'react-native-gesture-handler';
 
export default function ScanBill() {

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {

        console.log("Camera Button is Pressed!!");

        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result);
        }

        sheetRef.current.snapTo(1)
    };

    const clickImage = () => {
        console.log("Take photo is pressed");
        setImage(null);
        sheetRef.current.snapTo(1);
    }
    
    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={clickImage}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
                <Text style={styles.panelButtonTitle}>Choose From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => 
                { 
                    sheetRef.current.snapTo(1);
                    console.log("Cancel is clicked")
                }}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
      );
    
    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const sheetRef = React.useRef(null);
    let fall = new Animated.Value(1);
 
    return (
        <View style={{flex: 1}} >
            <BottomSheet
                ref={sheetRef}
                snapPoints={[250, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />

            <Animated.View style={{
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <TouchableOpacity onPress={() => {sheetRef.current.snapTo(0); console.log("Bottom sheet is called")}} >
                    <View style={styles.cameraButton}>
                        <Text style={{color: "black", textAlign: "center"}}>
                            Scan your Bill
                        </Text>
                    </View>
                </TouchableOpacity>
                {image && 
                    <Image source={{ uri: image.uri }} 
                            style={{
                                width: 200,
                                height: 50,
                                resizeMode: 'stretch',
                                alignSelf: "center",
                                margin: 10,
                            }} />
                }
                <ManualAdd />
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    cameraButton : {
        backgroundColor: "#BEC1D2", 
        marginTop: 10,
        padding: 12, 
        marginHorizontal: 8,
        borderRadius:8,
    },
    panel: {
        padding: 30,
        backgroundColor: '#F5F7F9',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    header: {
        backgroundColor: 'white',
        borderColor: "#D3D3D3",
        shadowColor: 'black',
        shadowOffset: {width: -10, height: -3},
        shadowRadius: 5,
        shadowOpacity: 0.4,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    panelTitle: {
        fontSize: 20,
        height: 35,
        marginBottom: 5,
    },
    panelButton: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#BEC1D2',
        alignItems: 'center',
        marginVertical: 6,
    },
    panelButtonTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
})