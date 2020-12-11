


const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();

async function app() {
  console.log('Loading mobilenet..');
  net = await mobilenet.load();
  console.log('Successfully loaded model');
  const webcam = await tf.data.webcam(webcamElement);
  const addExample = async classId => {
    const img = await webcam.capture();
    const activation = net.infer(img, true);
    classifier.addExample(activation, classId);
    console.log('example added');
    img.dispose();
  };
  document.getElementById('phone').addEventListener('click', () => addExample(0));
  document.getElementById('mouse').addEventListener('click', () => addExample(1));
  document.getElementById('face').addEventListener('click', () => addExample(2));

  while (true) {
    if (classifier.getNumClasses() > 0) {
      const img = await webcam.capture();
      const activation = net.infer(img, 'conv_preds');
      const result = await classifier.predictClass(activation);

      const classes = ['A', 'B', 'C'];
      document.getElementById('console').innerText = `
        prediction: ${classes[result.label]}\n
        probability: ${result.confidences[result.label]}
      `;
      img.dispose();
    }

    await tf.nextFrame();
  }
}

app();
