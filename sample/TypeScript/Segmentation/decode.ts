/*
 * Copyrigh 2023 Sony Semiconductor Solutions Corp. All rights reserved.
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
import * as flatbuffers from 'flatbuffers'
import { SmartCamera } from '../../../src/TypeScript/Segmentation/semantic_segmentation'
import jsonFile from '../../Segmentation_encoded.json'

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

function main () {
  const resultJson:outputResult = jsonFile

  // Base64 decode
  let decodedData:Buffer
  if ('O' in resultJson.Inferences[0]) {
    decodedData = Buffer.from(resultJson.Inferences[0].O, 'base64')
  } else {
    console.log('not inference result in this data')
    if (fs.existsSync('./decoded_result_Segmentation.json') &&
        fs.lstatSync('./decoded_result_Segmentation.json').isSymbolicLink()) {
      console.log('Can\'t open symbolic link file.')
      return
    }
    fs.writeFileSync('./decoded_result_Segmentation.json', JSON.stringify(resultJson, null, 4))
    console.log('write file : decoded_result_Segmentation.json')
    return
  }

  // Deserialize
  const pplOut = SmartCamera.SemanticSegmentationTop.getRootAsSemanticSegmentationTop(new flatbuffers.ByteBuffer(decodedData))
  const readSegData = pplOut.perception()

  // generate JSON
  delete resultJson.Inferences[0].O
  const classIdMap = []
  const scoreMap = []
  for (let i = 0; i < readSegData.classIdMapLength(); i++) {
    classIdMap.push(readSegData.classIdMap(i))
  }
  for (let j = 0; j < readSegData.scoreMapLength(); j++) {
    scoreMap.push(Math.round(readSegData.scoreMap(j) * 1000000) / 1000000)
  }
  resultJson.Inferences[0].height = Number(readSegData.height())
  resultJson.Inferences[0].width = Number(readSegData.width())
  resultJson.Inferences[0].class_id_map = classIdMap
  resultJson.Inferences[0].num_class_id = Number(readSegData.numClassId())
  resultJson.Inferences[0].score_map = scoreMap

  if (fs.existsSync('./decoded_result_Segmentation.json') &&
      fs.lstatSync('./decoded_result_Segmentation.json').isSymbolicLink()) {
    console.log('Can\'t open symbolic link file.')
    return
  }
  fs.writeFileSync('./decoded_result_Segmentation.json', JSON.stringify(resultJson, null, 4))
  console.log('write file : decoded_result_Segmentation.json')
}

main()
