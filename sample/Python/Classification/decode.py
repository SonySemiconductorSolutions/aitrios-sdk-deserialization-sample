"""
Copyright 2022 Sony Semiconductor Solutions Corp. All rights reserved.

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
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
from src.Python.Classification import classification_top


def decode():
    # parse json
    with open('sample/Classification_encoded.json', 'r', encoding='utf-8') as json_file:
        buf = json.load(json_file)

    # Base64 decode
    if 'O' in buf['Inferences'][0]:
        buf_decode = base64.b64decode(buf['Inferences'][0]['O'])
    else:
        print('not inference result in this data')
        with open('decoded_result_Classification.json', 'w', encoding='utf-8') as file:
            json.dump(buf, file, ensure_ascii=False, indent=4)
        print('write file : decoded_result_Classification.json')
        return

    # Deserialize
    ppl_out = classification_top.ClassificationTop.GetRootAsClassificationTop(buf_decode, 0)
    cls_data = ppl_out.Perception()
    res_num = cls_data.ClassificationListLength()
    print('NumOfDetections:' + str(res_num))

    # generate json
    buf['Inferences'][0].pop('O')
    for i in range(res_num):
        cls_list = cls_data.ClassificationList(i)
        buf['Inferences'][0][str(i + 1)] = {}
        buf['Inferences'][0][str(i + 1)]['C'] = cls_list.ClassId()
        buf['Inferences'][0][str(i + 1)]['P'] = cls_list.Score()

    with open('decoded_result_Classification.json', 'w', encoding='utf-8') as file:
        json.dump(buf, file, ensure_ascii=False, indent=4)
    print('write file : decoded_result_Classification.json')


if __name__ == '__main__':
    decode()
