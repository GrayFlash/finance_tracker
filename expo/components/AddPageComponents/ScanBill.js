import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import BottomSheet from 'reanimated-bottom-sheet';
import ManualAdd from './timepassForm';
import {TouchableOpacity} from 'react-native-gesture-handler';
//import key from './CloudVision';
//import predict from '../../ML/index';

// tf = require('@tensorflow/tfjs')
// knnClassifier = require('@tensorflow-models/knn-classifier');

// const model = tf.loadLayersModel('file://model');
// const classifier = knnClassifier.create();

const cv2 ="AIzaSyA6vM73Bi9Tfy5-thhOo6SQ11EShJ9Neg8";

const cloudVision  = 'https://vision.googleapis.com/v1/images:annotate?key=' + cv2;

export default function ScanBill({categoriesData, people}) {

    const [image, setImage] = useState(null);

    const updateUserData = async(total) =>{
        fetch("http://9776686554bd.ngrok.io/updatePerson",{
            method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:_id,
                    name: people.name,
                    income: people.income,
                    savings: people.savings,
                    targetToSave: people.targetToSave,
                    thisMonthStatus: people.thisMonthStatus,
                    totalExpenses: people.totalExpenses+total
                })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Details of ${people.name} has been updated`)
        })
        .catch(err=>{
            Alert.alert("Some Error")
            console.log(err)
        })
    }

    const updateCategoryExpense = async(total, category) =>{
        for(i in categoriesData){
            if(categoriesData[i].name === category){
                fetch("http://9776686554bd.ngrok.io/updateCategory",{
                    method:"post",
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            id:categoriesData[i]._id,
                            name: categoriesData[i].name,
                            icon: categoriesData[i].icon,
                            color: categoriesData[i].color,
                            totalExpenseInThis: categoriesData[i].totalExpenseInThis + total
                        })
                })
                .then(res=>res.json())
                .then(data=>{
                    Alert.alert(`Details of ${people.name} has been updated`)
                })
                .catch(err=>{
                    Alert.alert("Some Error")
                    console.log(err)
        })
            }
        }
    }

    // const predict = async (name) => {
    //     t = [...name];
    //     for(i=0;i<name.length;i++){
    //         t[i]=t[i].charCodeAt();
    //         if(t[i]>=65 && t[i]<=90)t[i]+=32;
    //         else if(t[i]>=97 && t[i]<=122)t[i]+=0;
    //         else t[i]=96;
    //         t[i]-=96;
    //     }
    //     for(i=name.length;i<100;i++){
    //         t[i]=0;
    //     }
    //     return classifier.predictClass(model.predict(tf.tensor(t,[1,100]))).then((obj) => {
    //         return obj;
    //     });
    // }
    
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [total, setTotal] = useState(0);
    
    const addExpense = async(te, ca, to) => {
        fetch('http://9776686554bd.ngrok.io/addExpense',{
            method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title: te,
                    category: ca,
                    total: to
                })
        })
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
        console.log(res)
          var texts = [];
          var y=0;
          console.log("Starting with text")
          //console.log(res.responses[0].fullTextAnnotation.text)
          let x = await res.responses[0].fullTextAnnotation.text;
          console.log(x);
          console.log(typeof x);
          var k = x.split("\n");
          let arr = [];
          var flag = 1;
          var count = 0;
          var lastStr = 0;
          var lastString = "";
          var lastNum = 0;
          var lastNumber = 0;
          var diff = 0;
          for(var i in x.split("\n")){
              //console.log(k[i]);
              var words = k[i].split(" ");
              if(words.length === 1 && flag===1){
                  count ++;
              }else{
                  flag = 0;
                  for(var y in words){
                      //console.log(y);
                      if(lastStr === 0 && isNaN(words[y])){
                          lastStr = 1;
                          lastNum = 0;
                          lastString = words[y];
                          diff = 0;
                      }else if(lastNum === 0 && !isNaN(words[y])){
                          lastNum = 1;
                          lastNumber = parseFloat(words[y]);
                      }else if(lastStr === 1 && isNaN(words[y]) && lastNum===0){
                        lastString = lastString+" "+words[y];
                      }else if(lastStr === 1 && isNaN(words[y]) && lastNum===1){
                        arr.push(lastString, lastNumber);
                        lastStr = 0;
                        lastNum = 0;
                      }
                      diff++;
                  }
              }
              //console.log('\n');
          }
          var total = 0;
          console.log("done");
          console.log(arr.length);
          var te = "";
          for(var i=0; i< arr.length; i++){
              console.log(arr[i]);
              if(i%2==0){
                  setTitle(arr[i]);
                  te  = arr[i];
                  //var pre = await predict(title);
                  //console.log(pre);
                  setCategory("food");
              }else{
                  total += arr[i];
                  setTotal(arr[i]);
                  await addExpense(te, "Food", arr[i]);
              }
          }
          await updateUserData(total);
          await updateCategoryExpense(total);

      }

    
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
                handleUpload(newfile);
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
                handleUpload(newfile);
            }
        } else {
            Alert.alert('Access denied')
        }

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
                        <Text style={{color: "white", textAlign: "center", fontWeight: 'bold', fontSize: 16}}>
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
                <ManualAdd people={people} categoriesData={categoriesData} />
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    cameraButton : {
        backgroundColor: "#666666",
        marginTop: 10,
        padding: 14, 
        marginHorizontal: 12,
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
        fontSize: 22,
        height: 35,
        marginBottom: 5,
    },
    panelButton: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#666666',
        alignItems: 'center',
        marginVertical: 6,
    },
    panelButtonTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
})