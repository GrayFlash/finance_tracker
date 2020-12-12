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
require('react-native-fs');
const cloudVisionKey = "AIzaSyDIviFUBChk1fvMniYXTXv5B0Xr9P2skXE";
const cv2 = "AIzaSyBR7OI7zisf4dLImjmpXCqisAAbCJ4GpF8";

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
      let respo = await response.json();
      var res = JSON.parse(respo);
      //console.log(res);
        var texts = [];
        var y=0;
        console.log("Starting with text")
        for (var i in res.fullTextAnnotations){
            console.log(0);
            var temp = i.description;
            //console.log(i);
            console.log(temp);

            texts[y] = temp;
            y ++;
        }
        console.log(y);
        for(var i=0; i<y; i++){
            console.log(texts[i]);
        }
    //   //let res = responseJson;
    //   console.log("Start Detection...");
    //   var line = -1;
    //   var sentences = [];
    //   var sentencesBounds = [];
    //   var s = "";
    //   var endx = 0, endXMin, endXMax, startx = 0, startxcount = 0, startXMax;

    //   // 1. define farthest right x coordinate
    //   for(var i in res){
    //     if(i == 0) continue;
    //     var bounds = res[i].bounds;
    //     endx = Math.max(endx,Math.max(res[i].bounds[1].x,res[i].bounds[3].x)); // get the farthest right x coordinate
    //   }
      
    //   endXMin = endx - thresholdXPct*endx/100; // calculate threshold for x

    //   // 2. construct sentence line by line.
    //   var lastbounds;
    //   for(var i in res){
    //     if(i == 0) continue;
    //     var bounds = res[i].bounds;
    //     var thisavg = (bounds[2].y+bounds[3].y)/2;
    //     if(line < 0) line = thisavg;

    //     // check if the middle of the 'word' is within the line threshold
    //     if(Math.abs(thisavg - line) <= threshold){  
    //       s += " "+res[i].desc; // within the threshold, add to line with 'space delimited'
    //     } 
    //     else{ // beyond threshold
    //       var avgendx = (lastbounds[1].x+lastbounds[3].x)/2;
        
    //       if(avgendx >= endXMin){ // assume a new line, pushing the old sentence to the list.
    //         sentences.push(s); 
    //         sentencesBounds.push(bounds);
    //       }
    //       s = res[i].desc; // create new line
    //       startx += bounds[0].x;
    //       startxcount++;
    //     }
    //     line = thisavg;
    //     lastbounds = bounds;
    //   } 
      
    //   startx /= startxcount;
    //   startXMax = startx+thresholdXPct*startx/100;
    //   var result = [];
      
    //   // 3. getting the 'last price' - from the rightest part of sentence and traverse to the left.
    //   for(var j in sentences){
    //     var sr = sentences[j].split(" ");
    //     console.log("--> setence is ",sentences[j]);
    //     console.log("---->sr is ",sr);

        
    //     var numCandidate = "";
    //     var checkBefore = true;

    //     // going from right to left
    //     for (var iBack= sr.length; iBack--; iBack <=0 ) {
    //       var word = sr[iBack].trim();
          
    //       // google vision 'cuts' word by space (?), so sometime we see the amount 2, 000 is cut into 
    //       // 2 words, need to join this into a number.
    //       if (word.startsWith(',') || word.startsWith('.')) {  
    //         word = word.replace(/,/g,"");
    //         var num = Number(word);
    //         if (!num) {
    //           console.log('------>stop at word: '+word);
    //           break; // end -- not an umber;
    //         } else {
    //           numCandidate = word+numCandidate;
    //           console.log('------> numCandidate is: ', numCandidate);
    //           checkBefore = true;
    //           continue;
    //         }

    //       } else if (word.endsWith(',') || word.endsWith('.')) {
    //           word = word.replace(/,/g,"");
    //           var num = Number(word);
    //           if (!num) {
    //             console.log('------>stop at word: '+word);
    //             break; // end -- not an umber;
    //           } else {
    //             numCandidate = word+numCandidate;
    //             console.log('------> numCandidate is: ', numCandidate);
    //             checkBefore = false;
    //             continue;
    //           }
    //       } else if (checkBefore) {
    //           word = word.replace(/,/g,"");
    //           var num = Number(word);
    //           if (!num) {
    //             console.log('------>stop at word: '+word);
    //             break; // end -- not an umber;
    //           } else {
    //             numCandidate = word+numCandidate;
    //             console.log('------> numCandidate is: ', numCandidate);
    //             checkBefore = false;
    //             continue;
    //           }
    //       } else {
    //         console.log('------>stop at word: '+word);
    //         break;
    //       }
         
    //     }

    //     console.log("------>candidate is ",numCandidate);

    //     // 4. construct the result. return is list of number and bounds (last word bounds).
    //     // bounds are needed to 'highlight' the part in the UI
    //     var num = Number(numCandidate);
    //     if(!num || num < 100){
    //       if(result.length == 0 || num < 100)continue;
    //     }  else {
    //       result.push ( 
    //         { 'number': Number(numCandidate),
    //           'bounds': sentencesBounds[j]
    //         }
    //       );
    //     }
    //   }

    //   result = { 'textDetectionResult': result };

    //   console.log("result ",JSON.stringify(result));
    //   console.log("End Detection...");
    //   callback(result);
      
  
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