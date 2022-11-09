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
// automatically generated by the FlatBuffers compiler, do not modify

import { flatbuffers } from 'flatbuffers'
/**
 * @constructor
 */
export namespace SmartCamera{
export class GeneralClassification {
  bb: flatbuffers.ByteBuffer|null = null

  bb_pos:number = 0
  /**
 * @param number i
 * @param flatbuffers.ByteBuffer bb
 * @returns GeneralClassification
 */
  __init (i:number, bb:flatbuffers.ByteBuffer):GeneralClassification {
    this.bb_pos = i
    this.bb = bb
    return this
  };

  /**
 * @param flatbuffers.ByteBuffer bb
 * @param GeneralClassification= obj
 * @returns GeneralClassification
 */
  static getRootAsGeneralClassification (bb:flatbuffers.ByteBuffer, obj?:GeneralClassification):GeneralClassification {
    return (obj || new GeneralClassification()).__init(bb.readInt32(bb.position()) + bb.position(), bb)
  };

  /**
 * @returns number
 */
  classId ():number {
    const offset = this.bb!.__offset(this.bb_pos, 4)
    return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0
  };

  /**
 * @returns number
 */
  score ():number {
    const offset = this.bb!.__offset(this.bb_pos, 6)
    return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0
  };

  /**
 * @param flatbuffers.Builder builder
 */
  static startGeneralClassification (builder:flatbuffers.Builder) {
    builder.startObject(2)
  };

  /**
 * @param flatbuffers.Builder builder
 * @param number classId
 */
  static addClassId (builder:flatbuffers.Builder, classId:number) {
    builder.addFieldInt32(0, classId, 0)
  };

  /**
 * @param flatbuffers.Builder builder
 * @param number score
 */
  static addScore (builder:flatbuffers.Builder, score:number) {
    builder.addFieldFloat32(1, score, 0.0)
  };

  /**
 * @param flatbuffers.Builder builder
 * @returns flatbuffers.Offset
 */
  static endGeneralClassification (builder:flatbuffers.Builder):flatbuffers.Offset {
    const offset = builder.endObject()
    return offset
  };

  static createGeneralClassification (builder:flatbuffers.Builder, classId:number, score:number):flatbuffers.Offset {
    GeneralClassification.startGeneralClassification(builder)
    GeneralClassification.addClassId(builder, classId)
    GeneralClassification.addScore(builder, score)
    return GeneralClassification.endGeneralClassification(builder)
  }
}
}
/**
 * @constructor
 */
export namespace SmartCamera{
export class ClassificationData {
  bb: flatbuffers.ByteBuffer|null = null

  bb_pos:number = 0
  /**
 * @param number i
 * @param flatbuffers.ByteBuffer bb
 * @returns ClassificationData
 */
  __init (i:number, bb:flatbuffers.ByteBuffer):ClassificationData {
    this.bb_pos = i
    this.bb = bb
    return this
  };

  /**
 * @param flatbuffers.ByteBuffer bb
 * @param ClassificationData= obj
 * @returns ClassificationData
 */
  static getRootAsClassificationData (bb:flatbuffers.ByteBuffer, obj?:ClassificationData):ClassificationData {
    return (obj || new ClassificationData()).__init(bb.readInt32(bb.position()) + bb.position(), bb)
  };

  /**
 * @param number index
 * @param SmartCamera.GeneralClassification= obj
 * @returns SmartCamera.GeneralClassification
 */
  classificationList (index: number, obj?:SmartCamera.GeneralClassification):SmartCamera.GeneralClassification|null {
    const offset = this.bb!.__offset(this.bb_pos, 4)
    return offset ? (obj || new SmartCamera.GeneralClassification()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null
  };

  /**
 * @returns number
 */
  classificationListLength ():number {
    const offset = this.bb!.__offset(this.bb_pos, 4)
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0
  };

  /**
 * @param flatbuffers.Builder builder
 */
  static startClassificationData (builder:flatbuffers.Builder) {
    builder.startObject(1)
  };

  /**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset classificationListOffset
 */
  static addClassificationList (builder:flatbuffers.Builder, classificationListOffset:flatbuffers.Offset) {
    builder.addFieldOffset(0, classificationListOffset, 0)
  };

  /**
 * @param flatbuffers.Builder builder
 * @param Array.<flatbuffers.Offset> data
 * @returns flatbuffers.Offset
 */
  static createClassificationListVector (builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
    builder.startVector(4, data.length, 4)
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i])
    }
    return builder.endVector()
  };

  /**
 * @param flatbuffers.Builder builder
 * @param number numElems
 */
  static startClassificationListVector (builder:flatbuffers.Builder, numElems:number) {
    builder.startVector(4, numElems, 4)
  };

  /**
 * @param flatbuffers.Builder builder
 * @returns flatbuffers.Offset
 */
  static endClassificationData (builder:flatbuffers.Builder):flatbuffers.Offset {
    const offset = builder.endObject()
    return offset
  };

  static createClassificationData (builder:flatbuffers.Builder, classificationListOffset:flatbuffers.Offset):flatbuffers.Offset {
    ClassificationData.startClassificationData(builder)
    ClassificationData.addClassificationList(builder, classificationListOffset)
    return ClassificationData.endClassificationData(builder)
  }
}
}
/**
 * @constructor
 */
export namespace SmartCamera{
export class ClassificationTop {
  bb: flatbuffers.ByteBuffer|null = null

  bb_pos:number = 0
  /**
 * @param number i
 * @param flatbuffers.ByteBuffer bb
 * @returns ClassificationTop
 */
  __init (i:number, bb:flatbuffers.ByteBuffer):ClassificationTop {
    this.bb_pos = i
    this.bb = bb
    return this
  };

  /**
 * @param flatbuffers.ByteBuffer bb
 * @param ClassificationTop= obj
 * @returns ClassificationTop
 */
  static getRootAsClassificationTop (bb:flatbuffers.ByteBuffer, obj?:ClassificationTop):ClassificationTop {
    return (obj || new ClassificationTop()).__init(bb.readInt32(bb.position()) + bb.position(), bb)
  };

  /**
 * @param SmartCamera.ClassificationData= obj
 * @returns SmartCamera.ClassificationData|null
 */
  perception (obj?:SmartCamera.ClassificationData):SmartCamera.ClassificationData|null {
    const offset = this.bb!.__offset(this.bb_pos, 4)
    return offset ? (obj || new SmartCamera.ClassificationData()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null
  };

  /**
 * @param flatbuffers.Builder builder
 */
  static startClassificationTop (builder:flatbuffers.Builder) {
    builder.startObject(1)
  };

  /**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset perceptionOffset
 */
  static addPerception (builder:flatbuffers.Builder, perceptionOffset:flatbuffers.Offset) {
    builder.addFieldOffset(0, perceptionOffset, 0)
  };

  /**
 * @param flatbuffers.Builder builder
 * @returns flatbuffers.Offset
 */
  static endClassificationTop (builder:flatbuffers.Builder):flatbuffers.Offset {
    const offset = builder.endObject()
    return offset
  };

  /**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset offset
 */
  static finishClassificationTopBuffer (builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
    builder.finish(offset)
  };

  static createClassificationTop (builder:flatbuffers.Builder, perceptionOffset:flatbuffers.Offset):flatbuffers.Offset {
    ClassificationTop.startClassificationTop(builder)
    ClassificationTop.addPerception(builder, perceptionOffset)
    return ClassificationTop.endClassificationTop(builder)
  }
}
}