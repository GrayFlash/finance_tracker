const { data } = require('@tensorflow/tfjs');

tf = require('@tensorflow/tfjs-node');
knnClassifier = require('@tensorflow-models/knn-classifier');
fs = require('fs')
const model = tf.sequential();
model.add(tf.layers.embedding({inputDim:100,outputDim:64}));
const classifier = knnClassifier.create();
let points;
fs.readFile('dat.json',{flag:'r'},(err,data) => {points = JSON.parse(data + "[0,0]]");addEx();});
const addExample = (name,id) => {
    t = [...name];
    for(i=0;i<name.length;i++){
        t[i]=t[i].charCodeAt();
        if(t[i]>=65 && t[i]<=90)t[i]+=32;
        else if(t[i]>=97 && t[i]<=122)t[i]+=0;
        else t[i]=96;
        t[i]-=96;
    }
    for(i=name.length;i<100;i++){
        t[i]=0;
    }
    fs.writeFile('dat.json',JSON.stringify([t,id])+',',{flag:'a'},(err)=>{});
    classifier.addExample(model.predict(tf.tensor(t,[1,100])),id)
}

const addEx = () => {
    for(i=0;i<points.length;i++)
    try{
        classifier.addExample(model.predict(tf.tensor(points[i][0],[1,100])),points[i][1]);
    }catch(err){console.log('err');}
    predict('bourbon biscuit').then((obj)=>console.log(obj));
predict('fromal shirt').then((obj)=>console.log(obj));
predict('frying pan').then((obj)=>console.log(obj));
predict('amul butter').then((obj)=>console.log(obj));
predict('clinic plus shampoo').then((obj)=>console.log(obj));
model.save('file://model')
}

const predict = async (name) => {
    t = [...name];
    for(i=0;i<name.length;i++){
        t[i]=t[i].charCodeAt();
        if(t[i]>=65 && t[i]<=90)t[i]+=32;
        else if(t[i]>=97 && t[i]<=122)t[i]+=0;
        else t[i]=96;
        t[i]-=96;
    }
    for(i=name.length;i<100;i++){
        t[i]=0;
    }
    return classifier.predictClass(model.predict(tf.tensor(t,[1,100]))).then((obj) => {
        return obj;
    });
}
