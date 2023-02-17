/*
 * Copyright 2022 Sony Semiconductor Solutions Corp. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { flatbuffers } from 'flatbuffers'
import { SmartCamera } from '../../../src/TypeScript/Classification/ClassificationGenerated'
import jsonFile from '../../Classification_encoded.json'

const fs = require('fs')

type InferencesResult = {
    'T': string,
    'O'?: string,
    [prop: string]: any
}

type outputResult = {
    'DeviceID': string
    'ModelID': string
    'Image': boolean
    'Inferences': InferencesResult[]
}

type Inference = {
    'C': number,
    'P': number
}

function main () {
  const resultJson:outputResult = jsonFile

  // Base64 decode
  let decodedData:Buffer
  if ('O' in resultJson.Inferences[0]) {
    decodedData = Buffer.from(resultJson.Inferences[0].O, 'base64')
  } else {
    console.log('not inference result in this data')
    if (fs.existsSync('./decoded_result_ObjectDetection.json')
        && fs.lstatSync('./decoded_result_ObjectDetection.json').isSymbolicLink()) {
      console.log('Can\'t open symbolic link file.')
      return
    }
    fs.writeFileSync('./decoded_result_Classification.json', JSON.stringify(resultJson, null, 4))
    console.log('write file : decoded_result_Classification.json')
    return
  }

  // Deserialize
  const pplOut = SmartCamera.ClassificationTop.getRootAsClassificationTop(new flatbuffers.ByteBuffer(decodedData))
  const readclassData = pplOut.perception()
  const resNum = readclassData.classificationListLength()
  console.log('NumOfDetections:' + String(resNum))

  // generate JSON
  delete resultJson.Inferences[0].O
  for (let i = 0; i < resNum; i++) {
    const clsList = readclassData.classificationList(i)
    const res : Inference = {
      C: Number(clsList.classId()),
      P: Number(clsList.score())
    }
    const inferenceKey = String(i + 1)
    resultJson.Inferences[0][inferenceKey] = res
  }

  if (fs.existsSync('./decoded_result_ObjectDetection.json')
      && fs.lstatSync('./decoded_result_ObjectDetection.json').isSymbolicLink()) {
    console.log('Can\'t open symbolic link file.')
    return
  }
  fs.writeFileSync('./decoded_result_Classification.json', JSON.stringify(resultJson, null, 4))
  console.log('write file : decoded_result_Classification.json')
}

main()
