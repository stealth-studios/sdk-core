<div align="center">

# StealthSDK Core

_Seamlessly deploy sophisticated intelligences into dynamic game worlds._

[![CI](https://github.com/stealth-studios/sdk-core/actions/workflows/ci-backend.yaml/badge.svg)](https://github.com/stealth-studios/sdk-core/actions/workflows/ci-backend.yaml)
[![License](https://img.shields.io/github/license/stealth-studios/sdk-core)](https://github.com/stealth-studios/sdk-core/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@stealthstudios/sdk-core)](https://www.npmjs.com/package/@stealthstudios/sdk-core)
[![npm downloads](https://img.shields.io/npm/dm/@stealthstudios/sdk-core)](https://www.npmjs.com/package/@stealthstudios/sdk-core)

<p align="center">
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#contribution">Contribute</a>
</p>

### Supported Platforms

<p align="center">
    <img src="https://img.shields.io/badge/Roblox-000000?logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIiA/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgd2lkdGg9IjI2NyIgaGVpZ2h0PSIyNjciIHZpZXdCb3g9IjAgMCAyNjcgMjY3IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGRlc2M+Q3JlYXRlZCB3aXRoIEZhYnJpYy5qcyAzLjYuNjwvZGVzYz4KPGRlZnM+CjwvZGVmcz4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAtMTg1LjUgMjQ4LjA1KSIgaWQ9ImJhY2tncm91bmRyZWN0IiAgPgo8cmVjdCBzdHlsZT0ic3Ryb2tlOiBub25lOyBzdHJva2Utd2lkdGg6IDE7IHN0cm9rZS1kYXNoYXJyYXk6IG5vbmU7IHN0cm9rZS1saW5lY2FwOiBidXR0OyBzdHJva2UtZGFzaG9mZnNldDogMDsgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjsgc3Ryb2tlLW1pdGVybGltaXQ6IDQ7IGZpbGw6IG5vbmU7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiICB4PSItNTAiIHk9Ii01MCIgcng9IjAiIHJ5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgLz4KPC9nPgo8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDM2Ljc2IDQxMy4yOCkiIGlkPSJzdmdfMiIgID4KPHBvbHlsaW5lIHN0eWxlPSJzdHJva2U6IHJnYigyNTUsMjU1LDI1NSk7IHN0cm9rZS13aWR0aDogMDsgc3Ryb2tlLWRhc2hhcnJheTogbm9uZTsgc3Ryb2tlLWxpbmVjYXA6IGJ1dHQ7IHN0cm9rZS1kYXNob2Zmc2V0OiAwOyBzdHJva2UtbGluZWpvaW46IG1pdGVyOyBzdHJva2UtbWl0ZXJsaW1pdDogNDsgZmlsbDogbm9uZTsgZmlsbC1ydWxlOiBub256ZXJvOyBvcGFjaXR5OiAxOyIgIHBvaW50cz0iLTguNywtMTIuNTkgLTEzLjUyLC0yMC43NCAtMTIuNDEsLTIxLjExIC0xMS42NywtMjEuNDggLTEwLjU2LC0yMS40OCAtOC43LC0yMS40OCAtNy4yMiwtMjEuNDggLTUuNzQsLTIxLjQ4IC01LC0yMS4xMSAtMy41MiwtMjAuNzQgLTIuNzgsLTIwLjc0IC0yLjA0LC0yMC4zNyAtMi4wNCwtMjAuMzcgLTAuOTMsLTE5LjI2IDAuMTksLTE4LjUyIDAuOTMsLTE3Ljc4IDEuNjcsLTE2LjY3IDIuNDEsLTE1LjU2IDMuMTUsLTE0LjgxIDMuNTIsLTEzLjcgMy44OSwtMTIuNTkgOC43LDQuODEgOS40NCw3Ljc4IDEwLjkzLDE0LjA3IDExLjY3LDE2LjY3IDEyLjA0LDE3Ljc4IDEyLjQxLDE4Ljg5IDEzLjE1LDIwLjM3IDEzLjE1LDIxLjExIDEzLjUyLDIxLjExIDEzLjUyLDIxLjQ4ICIgLz4KPC9nPgo8ZyB0cmFuc2Zvcm09Im1hdHJpeCg0LjM5IDAgMCA0LjM5IDEzMy41OCAxMzMuNjEpIiAgPgo8cGF0aCBzdHlsZT0ic3Ryb2tlOiBub25lOyBzdHJva2Utd2lkdGg6IDE7IHN0cm9rZS1kYXNoYXJyYXk6IG5vbmU7IHN0cm9rZS1saW5lY2FwOiBidXR0OyBzdHJva2UtZGFzaG9mZnNldDogMDsgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjsgc3Ryb2tlLW1pdGVybGltaXQ6IDQ7IGZpbGw6IHJnYigyNTUsMjU1LDI1NSk7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiICB0cmFuc2Zvcm09IiB0cmFuc2xhdGUoLTczLjEzLCAtMjYuODgpIiBkPSJNIDU3LjYgMCBMIDQ2LjI2IDQyLjQgbCA0Mi40IDExLjM1IEwgMTAwIDExLjM1IFogbSAxMS4yIDE5LjQ3IGwgMTEuODMgMy4xNyBsIC0zLjE3IDExLjgzIGwgLTExLjg0IC0zLjE3IHoiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KPC9nPgo8L3N2Zz4=" alt="Roblox">
    <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
</p>

</div>

## ✨ Features

- 🤖 **Multi-Model Support** - Seamlessly integrate with OpenAI, Anthropic, DeepSeek, and more
- 🔌 **Extensible Architecture** - Built to be extended with comprehensive documentation and examples
- 🎮 **Cross-Platform** - First-class support for Roblox and JavaScript, with more platforms coming soon
- 🚀 **Quick Setup** - Get up and running in seconds with our simple setup process
- 💬 **Flexible Conversations** - Support for one-on-one, group, and persistent conversations

## 🚀 Getting Started

Ready to begin? Check out our [Getting Started Guide](https://google.com/docs/get-started) to launch your first AI conversation in minutes!

## 🤝 Contribution

We welcome contributions from the community! Before contributing, please:

- Review our code guidelines
- Check existing issues or create a new one
- Submit a pull request with your improvements

Found a bug or have a suggestion? [Open an issue](https://github.com/stealth-studios/sdk-core/issues/new) and let us know!
