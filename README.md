# aitrios-sdk-deserialization-sample

## Contents <!-- omit in toc -->
- [概要](#概要)
  - [データ変換の流れ](#データ変換の流れ)
  - [制限事項](#制限事項)
- [チュートリアル](#チュートリアル)
- [ドキュメント](#ドキュメント)
  - [機能仕様書](#機能仕様書)
- [サポート](#サポート)
- [参照](#参照)
- [商標](#商標)

## 概要
このリポジトリは、Console Access Libraryを使用して取得した推論結果を利用可能な形式に変換するソースコードと、その使い方のサンプルコードを格納したリポジトリです。<br>
Console Access Libraryを使用して取得した推論結果はSerializeされているため、利用可能なデータ形式にDeserializeする必要があります。<br>

取得した推論結果はBase64でEncodeされているためDeserializeする前にDecodeする必要があります。<br>

### データ変換の流れ
Console Access Libraryを使用して取得した推論結果を、利用可能なデータ形式にする流れは以下の通りになります。

- 取得した推論結果がPPLを経由して出力されていた場合　　　　　　　　　　　　　

    1. Console Access Libraryを使用し、推論結果を取得する
    2. Base64でDecodeする
    3. Deserializeを行い推論結果を取得する

手順の詳細については[チュートリアル](#チュートリアル)を参照してください。

### 制限事項

#### チュートリアルの対象データについて
チュートリアルでは、PPLから出力された推論結果を取得する方法について解説しています。<br>
PPL以外から出力された推論結果の取得方法は対象外となります。

#### チュートリアルの対象環境について
チュートリアルで解説するソースコード生成手順はLinux環境のみが対象となります。

#### サポートしている言語について
リポジトリに格納しているソースコードは、PythonとTypeScriptに対応しています。

詳細は、 [「Cloud SDK Deserialize サンプル チュートリアル」](https://developer.aitrios.sony-semicon.com/development-guides/tutorials/cloud-sdk/CloudSDK_Tutorial_DeserializeSample_ja.adoc)の「はじめに」を参照してください。

## チュートリアル
チュートリアルとして、Deserialize用のコード自動生成手順と、生成されたコードの利用方法について記載しています。
詳細は[「Cloud SDK Deserialize サンプル チュートリアル」](https://developer.aitrios.sony-semicon.com/development-guides/tutorials/cloud-sdk/CloudSDK_Tutorial_DeserializeSample_ja.adoc)を参照してください。

## ドキュメント
### 機能仕様書
- Deserialize
    - [Cloud SDK Deserialize サンプル 機能仕様書](./docs/development-docs/CloudSDK_FuncSpec_DeserializeSample_ja.pdf)

## サポート
- [Contact us](https://developer.aitrios.sony-semicon.com/contact-us/)

## 参照
- [aitrios-sdk-console-access-lib-python](https://github.com/SonySemiconductorSolutions/aitrios-sdk-console-access-lib-python)
- [aitrios-sdk-console-access-lib-ts](https://github.com/SonySemiconductorSolutions/aitrios-sdk-console-access-lib-ts)

## 商標
- [Read This First](https://developer.aitrios.sony-semicon.com/development-guides/documents/manuals/)
