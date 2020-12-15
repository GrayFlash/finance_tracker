import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, Platform, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function CameraButton() {
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
  };

  return (
    <View>
        <TouchableOpacity onPress={pickImage} >
            <View style={styles.cameraButton}>
                <Text style={{color: "black", textAlign: "center",fontFamily: 'GothamMedium'}}>
                    Camera
                </Text>
            </View>
        </TouchableOpacity>
        {image && 
        <Image source={{ uri: image.uri }} 
                style={{
                    width: image.width,
                    height: image.height,
                    resizeMode: 'stretch',
                    alignSelf: "center",
                    margin: 10,
                }} />}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    cameraButton : {
        backgroundColor: "#BEC1D2", 
        padding: 24, 
        borderRadius:10,
    },
})