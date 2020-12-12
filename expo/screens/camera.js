import React, { useState, Component } from 'react'
import { Button, Image, Text, StyleSheet, View } from 'react-native'
//import ImagePicker from 'react-native-image-crop-picker';
//import ProgressCircle from 'react-native-progress/Circle';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
//import axios from 'axios';

const DEFAULT_HEIGHT = 600;
const DEFAULT_WITH = 400;
const defaultPickerOptions = {
    cropping: true,
    height: 600,
    width: 400,
    base64:true
};

// const Vision = require('@google-cloud/vision');
// const vision = Vision();

const cloudVision  = 'https://vision.googleapis.com/v1/images:annotate?key=' + cv2;

export default function Camera () {
    
    const [isLoading, setIsLoading ] = useState(false);
    const [progress, setProgress ] = useState(0);
    const [imgSrc, setImgSrc ] = useState(null);
    const [text, setText ] = useState('');

    //const ocrSpace = require('ocr-space-api-wrapper')

    const textFromImage = async(src) => {
      let body = JSON.stringify({
        requests: [
          {
            features: [
            { type: "TEXT_DETECTION" },
              { type: "DOCUMENT_TEXT_DETECTION"}
              
            ],
            image: {
              source: {
                imageUri: src
              }
            }
          }
        ]
      });
      let response = await fetch(
        cloudVision,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let res = await response.json();
        var texts = [];
        var y=0;
        console.log("Starting with text")
        console.log(res.responses[0].fullTextAnnotation.text)
    }

    const imageFromGallery = async(options = defaultPickerOptions) => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(granted){
            try {
                const image = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Image,
                    allowsEditing: true,
                    quality: 1
                  });
                //console.log(image.path)
                let name = image.uri.split(".")
                let newfile = {
                  uri:image.uri,
                  type:`test/${name[3]}`,
                  name:`test.${name[3]}`
                }
                handleUpload(newfile);
                //await textFromImage(image);
            } catch(err){
                if (err.message !== 'User cancelled image selection') {
                    console.error(err);
                }
            }
        } else{
                Alert.alert("you need to give permissions!")
        }

    };

    const imageFromCamera = async() => {

        const {granted} = await Permissions.askAsync(Permissions.CAMERA);
        if(granted){
            try {
                const image = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Image,
                    allowsEditing: true,
                    quality: 1
                  });
                //setImgSrc(image.path);
                let name = image.uri.split(".")
                let newfile = {
                  uri:image.uri,
                  type:`test/${name[3]}`,
                  name:`test.${name[3]}`
                }
                handleUpload(newfile);
                //await textFromImage(image);
            } catch(err){
                if (err.message !== 'User cancelled image selection') {
                    console.error(err);
                }
            }
        } else{
            Alert.alert("you need to give permissions!")
        }
    };

    const handleUpload = (image) =>{
      const data = new FormData()
      data.append('file', image)
      data.append('upload_preset', 'OCR_InOut')
      data.append("cloud_name", "graystack")
      console.log(image)
      fetch("https://api.cloudinary.com/v1_1/graystack/image/upload",{
        method:"post",
        body:data
      }).then(res=>res.json())
      .then(data=>{
        console.log(data.secure_url)
        textFromImage(data.secure_url)
        //return(data.secure_url)
      })
    }
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Tesseract OCR example</Text>
          <Text style={styles.instructions}>Select an image source:</Text>
          <View style={styles.options}>
            <View style={styles.button}>
              <Button
                disabled={isLoading}
                title="Camera"
                onPress={() => {
                  imageFromCamera();
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                disabled={isLoading}
                title="Gallery"
                onPress={() => {
                  imageFromGallery();
                }}
              />
            </View>
          </View>
          {imgSrc && (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={imgSrc} />
              {isLoading ? (
                <ProgressCircle showsText progress={progress} />
              ) : (
                <Text>{text}</Text>
              )}
            </View>
          )}
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      },
      button: {
        marginHorizontal: 10,
      },
      imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        marginVertical: 15,
        height: DEFAULT_HEIGHT / 2.5,
        width: DEFAULT_WITH / 2.5,
      },
      title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
    });