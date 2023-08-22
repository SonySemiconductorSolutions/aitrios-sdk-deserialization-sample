"""
Copyright 2022, 2023 Sony Semiconductor Solutions Corp. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

import os
import sys
import base64
import json
from pathlib import Path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
from src.Python.ObjectDetection.SmartCamera import ObjectDetectionTop
from src.Python.ObjectDetection.SmartCamera import BoundingBox
from src.Python.ObjectDetection.SmartCamera import BoundingBox2d


def decode():
    # parse json
    if Path('sample/ObjectDetection_encoded.json').is_symlink():
        print('Can\'t open symbolic link file.')
        return
    with open('sample/ObjectDetection_encoded.json', 'r', encoding='utf-8') as json_file:
        buf = json.load(json_file)

    # Base64 decode
    if 'O' in buf['Inferences'][0]:
        buf_decode = base64.b64decode(buf['Inferences'][0]['O'])
    else:
        print('not inference result in this data')
        if Path('decoded_result_ObjectDetection.json').is_symlink():
            print('Can\'t open symbolic link file.')
            return
        with open('decoded_result_ObjectDetection.json', 'w', encoding='utf-8') as file:
            json.dump(buf, file, ensure_ascii=False, indent=4)
        print('write file : decoded_result_ObjectDetection.json')
        return

    # Deserialize
    ppl_out = ObjectDetectionTop.ObjectDetectionTop.GetRootAsObjectDetectionTop(buf_decode, 0)
    obj_data = ppl_out.Perception()
    res_num = obj_data.ObjectDetectionListLength()
    print('NumOfDetections:' + str(res_num))

    # generate json
    buf['Inferences'][0].pop('O')
    for i in range(res_num):
        obj_list = obj_data.ObjectDetectionList(i)
        union_type = obj_list.BoundingBoxType()
        if union_type == BoundingBox.BoundingBox.BoundingBox2d:
            bbox_2d = BoundingBox2d.BoundingBox2d()
            bbox_2d.Init(obj_list.BoundingBox().Bytes, obj_list.BoundingBox().Pos)
            buf['Inferences'][0][str(i + 1)] = {}
            buf['Inferences'][0][str(i + 1)]['class_id'] = obj_list.ClassId()
            buf['Inferences'][0][str(i + 1)]['score'] = round(obj_list.Score(), 6)
            buf['Inferences'][0][str(i + 1)]['left'] = bbox_2d.Left()
            buf['Inferences'][0][str(i + 1)]['top'] = bbox_2d.Top()
            buf['Inferences'][0][str(i + 1)]['right'] = bbox_2d.Right()
            buf['Inferences'][0][str(i + 1)]['bottom'] = bbox_2d.Bottom()

    if Path('decoded_result_ObjectDetection.json').is_symlink():
        print('Can\'t open symbolic link file.')
        return
    with open('decoded_result_ObjectDetection.json', 'w', encoding='utf-8') as file:
        json.dump(buf, file, ensure_ascii=False, indent=4)
    print('write file : decoded_result_ObjectDetection.json')


if __name__ == '__main__':
    decode()
