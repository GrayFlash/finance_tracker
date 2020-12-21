import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, LogBox } from 'react-native';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import ManualAdd from './ManualAdd';
import RenderProducts from './RenderProducts';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ScanBill({ categoriesData, people, AddProductSaveButtonHandler, ScanBillDoneButtonHandler }) {

    const [image, setImage] = useState(null);
    const [scannedData, setScannedData] = useState(false); 

    const doneButtonHandler = (productList, totalExpenseForUser) => {
        ScanBillDoneButtonHandler(productList, totalExpenseForUser);
        setImage(null);
        setScannedData(null);
    }

        /** Main ML code */

    const ocr_with_py = async (src) => {
        console.log("Inside ocr_with_py");
        fetch("http://c6f7c5517705.ngrok.io/image_ocr",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                src: src
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log("This is inside ocr_with_py method :");
            console.log(data)
            setScannedData(data);
        })
        .catch(err=>{
            console.log(err);
            Alert.alert("Some Error while processing the image.")
        })
    }

    const handleUpload = async(image) =>{
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
          ocr_with_py(data.secure_url)
        })
    }

        /** Main ML code END */


        /** ScanBill Buttons */

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();

        LogBox.ignoreLogs(['Functions are not valid as a React child']);
    }, []);

    const pickImage = async () => {
        console.log("Chooose from Gallery is Pressed!!");

        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        console.log(status);
        
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
            });
        
            console.log(result);
    
            if (!result.cancelled) {
                setImage(result);
                let name = result.uri.split(".")
                let newfile = {
                  uri:result.uri,
                  type:`test/${name[3]}`,
                  name:`test.${name[3]}`
                }
                await handleUpload(newfile);
            }
        } else {
            Alert.alert('Access denied')
        }

        sheetRef.current.snapTo(1)
    };

    const clickImage = async () => {
        console.log("Take photo is pressed");

        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        console.log(status)

        if (status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            })
        
            console.log(result);
    
            if (!result.cancelled) {
                setImage(result);
                let name = result.uri.split(".")
                let newfile = {
                  uri:result.uri,
                  type:`test/${name[3]}`,
                  name:`test.${name[3]}`
                }
                await handleUpload(newfile);
            }
        } else {
            Alert.alert('Access denied')
        }

        sheetRef.current.snapTo(1);
    }

        /** ScanBill Buttons END */
    
        /** BottomSheet Methods  */

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
 
        /** BottomSheet END  */

    return (
        <ScrollView style={{flex: 1}} >
            <BottomSheet
                ref={sheetRef}
                snapPoints={[250, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />

            { scannedData ? (
                <RenderProducts doneButtonHandler={doneButtonHandler} scannedData={scannedData} />
            ) : (
                <Animated.View style={{ opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}>
                    
                    <TouchableOpacity onPress={() => { console.log("Bottom sheet is called"); sheetRef.current.snapTo(0);}} >
                        <View style={styles.cameraButton}>
                            <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamBold', fontSize: 16}}>
                                Scan your Bill
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <ManualAdd  categoriesData={categoriesData}
                                people={people}
                                AddProductSaveButtonHandler={AddProductSaveButtonHandler} 
                    />
                    
                </Animated.View>
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cameraButton : {
        backgroundColor: "#666666",
        padding: 14, 
        marginHorizontal: 14,
        borderRadius:8,
    },
    panel: {
        padding: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    header: {
        backgroundColor: '#F5F7F9',
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
        height: 0,
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    panelTitle: {
        fontSize: 18,
        fontFamily: 'GothamBold',
        height: 35,
        marginBottom: 5,
    },
    panelButton: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#666666',
        alignItems: 'center',
        marginVertical: 6,
    },
    panelButtonTitle: {
        fontSize: 12,
        fontFamily: 'GothamMedium',
        color: 'white',
    },
})