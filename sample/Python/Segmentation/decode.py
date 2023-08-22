"""
Copyright 2023 Sony Semiconductor Solutions Corp. All rights reserved.

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
from src.Python.Segmentation.SmartCamera import SemanticSegmentationTop


def decode():
    # parse json
    if Path('sample/Segmentation_encoded.json').is_symlink():
        print('Can\'t open symbolic link file.')
        return
    with open('sample/Segmentation_encoded.json', 'r', encoding='utf-8') as json_file:
        buf = json.load(json_file)

    # Base64 decode
    if 'O' in buf['Inferences'][0]:
        buf_decode = base64.b64decode(buf['Inferences'][0]['O'])
    else:
        print('not inference result in this data')
        if Path('decoded_result_Segmentation.json').is_symlink():
            print('Can\'t open symbolic link file.')
            return
        with open('decoded_result_Segmentation.json', 'w', encoding='utf-8') as file:
            json.dump(buf, file, ensure_ascii=False, indent=4)
        print('write file : decoded_result_Segmentation.json')
        return

    # Deserialize
    ppl_out = SemanticSegmentationTop.SemanticSegmentationTop.GetRootAsSemanticSegmentationTop(buf_decode, 0)
    seg_data = ppl_out.Perception()

    # generate json
    buf['Inferences'][0].pop('O')
    buf['Inferences'][0]['height'] = seg_data.Height()
    buf['Inferences'][0]['width'] = seg_data.Width()
    if seg_data.ClassIdMapLength() != 0:
        buf['Inferences'][0]['class_id_map'] = seg_data.ClassIdMapAsNumpy().tolist()
    else:
        buf['Inferences'][0]['class_id_map'] = []
    buf['Inferences'][0]['num_class_id'] = seg_data.NumClassId()
    buf['Inferences'][0]['score_map'] = []
    if seg_data.ScoreMapLength() != 0:
        list = seg_data.ScoreMapAsNumpy().tolist()
        for data in list:
            buf['Inferences'][0]['score_map'].append(round(data, 6))

    if Path('decoded_result_Segmentation.json').is_symlink():
        print('Can\'t open symbolic link file.')
        return
    with open('decoded_result_Segmentation.json', 'w', encoding='utf-8') as file:
        json.dump(buf, file, ensure_ascii=False, indent=4)
    print('write file : decoded_result_Segmentation.json')


if __name__ == '__main__':
    decode()
