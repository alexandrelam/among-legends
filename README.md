<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://raw.githubusercontent.com/alexandrelam/among-legends/readme/assets/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Among Legends</h3>

  <p align="center">
    Best discord bot to play the new League custom game mode : Among Legends
    <br />
    <a href="https://github.com/alexandrelam/among-legends/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/alexandrelam/among-legends/">View Demo</a>
    ·
    <a href="https://github.com/alexandrelam/among-legends/issues">Report Bug</a>
    ·
    <a href="https://github.com/alexandrelam/among-legends/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![amonglegend1](https://user-images.githubusercontent.com/25727549/137308783-49b73228-b92e-40db-a0ce-919f699b41d3.gif)

This self-hosted bot allows you to play Among Legends with your friends on your discord server!

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [DiscordJs](https://discordjs.guide/#before-you-begin)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

You need the latest version of npm to run the server (>= node 16)

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/alexandrelam/among-legends
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up bot on discord developer portal ([guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html))
4. Adding bot to server ([guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html))
5. Enter your API in `.env` file
   ```js
   CLIENT_ID=
   GUILD_ID=
   TOKEN=
   ```
6. Register all the commands with `node deploy-commands.js`
7. Launch the server using `node .`

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [] Better leaderboard
- [] Persistant database with Firebase
- [] Bug fixes

See the [open issues](https://github.com/alexandrelam/among-legends/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GPL-3.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Alexandre LAM - alexandrelam@outlook.com

Project Link: [https://github.com/alexandrelam/among-legends](https://github.com/alexandrelam/among-legends)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/alexandrelam/among-legends.svg?style=for-the-badge
[contributors-url]: https://github.com/alexandrelam/among-legends/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/alexandrelam/among-legends.svg?style=for-the-badge
[forks-url]: https://github.com/alexandrelam/among-legends/network/members
[stars-shield]: https://img.shields.io/github/stars/alexandrelam/among-legends.svg?style=for-the-badge
[stars-url]: https://github.com/alexandrelam/among-legends/stargazers
[issues-shield]: https://img.shields.io/github/issues/alexandrelam/among-legends.svg?style=for-the-badge
[issues-url]: https://github.com/alexandrelam/among-legends/issues
[license-shield]: https://img.shields.io/github/license/alexandrelam/among-legends.svg?style=for-the-badge
[license-url]: https://github.com/alexandrelam/among-legends/blob/main/LICENSE 
