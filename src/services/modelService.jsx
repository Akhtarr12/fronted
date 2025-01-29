import * as tf from "@tensorflow/tfjs"

let model

export const loadModel = async () => {
  model = await tf.loadLayersModel("/model/model.json")
}

export const predict = async (imageData) => {
  if (!model) await loadModel()

  const tensor = tf.browser.fromPixels(imageData).resizeBilinear([224, 224]).expandDims(0).div(255.0)

  const prediction = await model.predict(tensor).data()
  const result = prediction[0] > 0.5 ? "Potentially Malignant" : "Likely Benign"
  const confidence = prediction[0] > 0.5 ? prediction[0] : 1 - prediction[0]

  return { result, confidence }
}

