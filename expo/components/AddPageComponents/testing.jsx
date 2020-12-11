import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {Camera} from 'expo-camera'
let camera: Camera
import BottomSheet from 'reanimated-bottom-sheet';
import ManualAdd from './timepassForm';
import {TouchableOpacity} from 'react-native-gesture-handler';
 
export default function ScanBill_testing() {

    const [image, setImage] = useState(null);
    const [startCamera, setStartCamera] = React.useState(false)
    const [previewVisible, setPreviewVisible] = React.useState(false)
    const [capturedImage, setCapturedImage] = React.useState(null)
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
    const [flashMode, setFlashMode] = React.useState('off')

    const __startCamera = async () => {
        console.log("Inside __startCamera");
        const {status} = await Camera.requestPermissionsAsync()
        console.log(status)
        if (status === 'granted') {
        setStartCamera(true)
        } else {
        Alert.alert('Access denied')
        }
        sheetRef.current.snapTo(1)
        console.log("Outside __startCamera");
    }

    const __takePicture = async () => {
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        //setStartCamera(false)
        setCapturedImage(photo)
    }
    
    const __savePhoto = () => {}

    const __retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        __startCamera()
    }

    const __handleFlashMode = () => {
        if (flashMode === 'on') {
        setFlashMode('off')
        } else if (flashMode === 'off') {
        setFlashMode('on')
        } else {
        setFlashMode('auto')
        }
    }

    const __switchCamera = () => {
        if (cameraType === 'back') {
        setCameraType('front')
        } else {
        setCameraType('back')
        }
    }

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
    
    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={__startCamera}>
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
                flex: 1,
                backgroundColor: '#fff',
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

                {startCamera && 
                    <View
                    style={{
                        flex: 1,
                        width: '100%'
                    }}
                    >
                    {previewVisible && capturedImage ? (
                        <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
                    ) : (
                        <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={{flex: 1}}
                        ref={(r) => {
                            camera = r
                        }}
                        >
                        <View
                            style={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: 'transparent',
                            flexDirection: 'row'
                            }}
                        >
                            <View
                            style={{
                                position: 'absolute',
                                left: '5%',
                                top: '10%',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                            >
                            <TouchableOpacity
                                onPress={__handleFlashMode}
                                style={{
                                backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                                borderRadius: 4,
                                height: 25,
                                width: 25
                                }}
                            >
                                <Text
                                style={{
                                    fontSize: 20
                                }}
                                >
                                ⚡️
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={__switchCamera}
                                style={{
                                marginTop: 20,
                                borderRadius: 4,
                                height: 25,
                                width: 25
                                }}
                            >
                                <Text
                                style={{
                                    fontSize: 20
                                }}
                                >
                                {cameraType === 'front' ? '🤳' : '📷'}
                                </Text>
                            </TouchableOpacity>
                            </View>
                            <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                flexDirection: 'row',
                                flex: 1,
                                width: '100%',
                                padding: 20,
                                justifyContent: 'space-between'
                            }}
                            >
                            <View
                                style={{
                                alignSelf: 'center',
                                flex: 1,
                                alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                onPress={__takePicture}
                                style={{
                                    width: 70,
                                    height: 70,
                                    bottom: 0,
                                    borderRadius: 50,
                                    backgroundColor: '#fff'
                                }}
                                />
                            </View>
                            </View>
                        </View>
                        </Camera>
                    )}
                        </View>
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

const CameraPreview = ({photo, retakePicture, savePhoto}) => {
    console.log('sdsfds', photo)
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={{
                  width: 130,
                  height: 40,
  
                  alignItems: 'center',
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={savePhoto}
                style={{
                  width: 130,
                  height: 40,
  
                  alignItems: 'center',
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  save photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }