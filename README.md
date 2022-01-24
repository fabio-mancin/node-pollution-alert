[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <a href="https://github.com/fabio-mancin/node-pollution-alert">
    <img src="src/static/pollution.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">City Pollution</h3>

  <p align="center">
    Alert others about polluted places around you.
    <br />
    <a href="https://github.com/fabio-mancin/node-pollution-alert"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/fabio-mancin/node-pollution-alert">View Demo</a>
    ·
    <a href="https://github.com/fabio-mancin/node-pollution-alert/issues">Report Bug</a>
    ·
    <a href="https://github.com/fabio-mancin/node-pollution-alert/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
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
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

![Pollution Alert Screenshot](src/static/screenshot.png)

### Built With

* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [LeafletJS](https://leafletjs.com/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  
  ```sh
  npm install npm@latest -g
  ```

* MySQL: you need a working MySQL server. Installation varies depending on your OS, check out [MySQL](https://www.mysql.com/).

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/fabio-mancin/node-pollution-alert.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Fill out `.env.example` with your MySQL username and password and rename it to `.env`.

4. Run database creation and migrations via the provided script

    ```sh
    npm run setup
    ```

## Usage

You can run the local development version via

  ```sh
  npm run dev
  ```

Or go in production mode via

  ```sh
  npm run prod
  ```

You can also run some tests, but beware: the provided basic ones (mostly http request tests) pass most the times but there are cases when they time out for no reason I could find.

  ```sh
  npm test
  ```

You can get less verbose tests by uncommenting `logging: false` in `config/config.js`

The app itself is quite self explanatory: you enter form data and the app adds a marker on the map with the provided informations; username name and title are optional.

The authentication system is fake, it just checks if a user exists with that name or creates one.

## Roadmap

See the [open issues](https://github.com/fabio-mancin/node-pollution-alert/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Fabio Mancin - [@Fabio__Mancio](https://twitter.com/Fabio__Mancio) - fabio.mancin90@gmail.com - [fabiomancin.dev](https://www.fabiomancin.dev)

Project Link: [https://github.com/fabio-mancin/node-pollution-alert](https://github.com/fabio-mancin/node-pollution-alert)

## Acknowledgements

* Icons made by [Wanicon](https://www.flaticon.com/authors/wanicon) from [FlatIcon]([www.flaticon.com](https://www.flaticon.com/))
* [start2impact]https://www.start2impact.it)

[contributors-shield]: https://img.shields.io/github/contributors/fabio-mancin/node-pollution-alert.svg?style=for-the-badge
[contributors-url]: https://github.com/fabio-mancin/node-pollution-alert/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/fabio-mancin/node-pollution-alert.svg?style=for-the-badge
[forks-url]: https://github.com/fabio-mancin/node-pollution-alert/network/members
[stars-shield]: https://img.shields.io/github/stars/fabio-mancin/node-pollution-alert.svg?style=for-the-badge
[stars-url]: https://github.com/fabio-mancin/node-pollution-alert/stargazers
[issues-shield]: https://img.shields.io/github/issues/fabio-mancin/node-pollution-alert.svg?style=for-the-badge
[issues-url]: https://github.com/fabio-mancin/node-pollution-alert/issues
[license-shield]: https://img.shields.io/github/license/fabio-mancin/node-pollution-alert.svg?style=for-the-badge
[license-url]: https://github.com/fabio-mancin/node-pollution-alert/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/fabio-mancin
