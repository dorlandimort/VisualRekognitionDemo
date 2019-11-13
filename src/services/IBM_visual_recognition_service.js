class IBMVisualRecognition {
  constructor() {
    if (!IBMVisualRecognition.instance) {
      const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
      this.visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: process.env.VR_IAM_API_KEY
      });
      IBMVisualRecognition.instance = this;
      this.classifierIds = ['DefaultCustomModel_434742869'];
      this.threshold = 0.2;
    }
    return IBMVisualRecognition.instance;
  }

  getClassification(imageFile) {
    const params = {
      images_file: imageFile,
      classifier_ids: this.classifierIds,
      threshold: this.threshold
    };
    return new Promise((resolve, reject) => {
      this.visualRecognition.classify(params, function(err, response) {
        if (err) {
          reject(error);
        } else {
          resolve(IBMVisualRecognition.getBestClassification(response));
        }
      });
    });
  }

  static getBestClassification(classifications) {
    const classes = classifications.images[0].classifiers[0].classes;
    let bestClassIndex = Object.keys(classes).reduce((index, currentIndex) => {
      return Number(classes[index].score) > Number(classes[currentIndex].score)
        ? index
        : currentIndex;
    });
    return classes[bestClassIndex];
  }
}

const instance = new IBMVisualRecognition();
Object.freeze(instance);

module.exports = instance;
