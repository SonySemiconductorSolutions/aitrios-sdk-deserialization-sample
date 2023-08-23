# aitrios-sdk-deserialization-sample

## Contents <!-- omit in toc -->
- [Overview](#overview)
  - [Data conversion flow](#data-conversion-flow)
  - [Restrictions](#restrictions)
- [Getting Started](#getting-started)
- [Tutorials](#tutorials)
- [Documentation](#documentation)
  - [Functional Specifications](#functional-specifications)
- [Get support](#get-support)
- [See also](#see-also)
- [Trademark](#trademark)
- [Versioning](#versioning)
- [Branch](#branch)

## Overview
This repository contains source code that converts inference results gotten using the "**Console Access Library**" into a usable format, as well as sample code for how to use it. <br>
Inference results gotten using the "**Console Access Library**" have been serialized and must be deserialized into a usable data format. <br>

Inference results gotten is encoded in Base64 and must be decoded before deserializing. <br>

### Data conversion flow
The flow for converting inference results gotten using the "**Console Access Library**" into a usable data format is as follows.

- If the gotten inference results were output from "**PPL**"

    1. Get inference results using the "**Console Access Library**"
    2. Decode in Base64
    3. Deserialize and get inference results

See the [Tutorials](#tutorials) for details of the procedure.

### Restrictions

#### Target data for the tutorial
The tutorial explains how to get inference results output from "**PPL**".<br>
It does not cover how to get inference results output from "**non-PPL**".

#### Target environment for the tutorial
How to generate the source code explained in the tutorial is for Linux environments only.

#### Supported languages
The source code stored in the repository supports Python and TypeScript.

See the "Introduction" in the ["**Cloud SDK Deserialize Sample Tutorial**"](./docs/development-docs/CloudSDK_Tutorial_DeserializeSample.adoc) for details.

## Getting Started
See the ["**SDK Getting Started**"](https://developer.aitrios.sony-semicon.com/en/file/download/sdk-getting-started/).

## Tutorials
The tutorial explains how to generate automatically source code for deserialize and how to use the generated code.
See the ["**Cloud SDK Deserialize Sample Tutorial**"](./docs/development-docs/CloudSDK_Tutorial_DeserializeSample.adoc) for details.

## Documentation
### Functional Specifications
- Deserialize
    - ["**Cloud SDK Deserialize Sample Functional Specifications**"](./docs/development-docs/CloudSDK_FuncSpec_DeserializeSample.adoc)

## Get support
- [Contact us](https://developer.aitrios.sony-semicon.com/en/contact-us-en)

## See also
- [aitrios-sdk-console-access-lib-python](https://github.com/SonySemiconductorSolutions/aitrios-sdk-console-access-lib-python)
- [aitrios-sdk-console-access-lib-ts](https://github.com/SonySemiconductorSolutions/aitrios-sdk-console-access-lib-ts)
- ["**Developer Site**"](https://developer.aitrios.sony-semicon.com/en)

## Trademark
- ["**Read This First**"](https://developer.aitrios.sony-semicon.com/en/documents/read-this-first)

## Versioning

This repository aims to adhere to Semantic Versioning 2.0.0.

## Branch

See the "**Release Note**" from [**Releases**] for this repository.

Each release is generated in the main branch. Pre-releases are generated in the develop branch. Releases will not be provided by other branches.

## Security

Before using Codespaces, please read the Site Policy of GitHub and understand the usage conditions. 
