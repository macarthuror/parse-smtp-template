<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better please fork the repo and create a pull request or simple open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for build-url, contributors-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Build Status][build-shield]][build-url]
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="logo.png" alt="Logo" width="80" height="80" />
  </a>

  <h3 align="center">Parse SMTP Template</h3>

  <p align="center">
    An easy way to send email templates via SMTP with your <a href="https://github.com/parse-community/parse-server">Parse Server</a>!
    <br />
    <br />
    <a href="https://github.com/macarthuror/parse-smtp-template/issues">Report Bug</a>
    ·
    <a href="https://github.com/macarthuror/parse-smtp-template/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This is a module maded it for Parse Server and an easy solution to send emails via SMTP with templates in HTML.

We recomend to use the [Cerberus](https://github.com/TedGoas/Cerberus) for the email templates.

### Built With

* [Nodemailer](https://nodemailer.com)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Install the package

npm
```sh
npm i parse-smtp-template
```
yarn
```sh
yarn add parse-smtp-template
```
2. In your Parse Server add the configuration of your email account

```
var api = new ParseServer({
    ...
    emailAdapter: {
        module: 'parse-smtp-template',
        options: {
            port: 587,
            host: "smtp.mail.com",
            user: "name@domain.com",
            password: "SecurePassword",
            fromAddress: 'app@domain.com',

            // Optional Parameters
            template: true,
            templatePath: "views/templates/main.html",
            passwordSubject: "A custom password recovery Subject",
            confirmSubject: "A custom email confirmation Subject"
        }
    }
})
```
> Now is ready to use it!

3. (Optional) Config your email template 

The templates have access to 4 parameters to send
* link
* username
* appName
* subject

To use it you only need to write ${parameter} to use it on the email

**IMPORTANT** -- **All the HTML file need to use only double quotes to avoid problems**

<!-- USAGE EXAMPLES -->
## Usage

To use a custome template is necessary to select the correct file.
In this example we are gonna use `template.html``

index.js
```
emailAdapter: {
  module: 'parse-smtp-template',
  options: {
    ...
    template: true,
    templatePath: "views/templates/template.html"
  }
}

```
directory
```
project
│   index.js   
│
└─ views
│   └─ templates
│       └─ template.html
|
└─ node_modules
|
```
`template.html`
```
...
<tr>
  <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
  <h1 style="margin: 0 0 10px; font-size: 25px; line-height: 30px; color: #333333; font-weight: normal;">  ${subject}  </h1>
  <br>
  <ul style="padding: 0; margin: 0; list-style-type: disc;">
  <li style="margin:0 0 10px 30px;" class="list-item-first">App name: <b>  ${appName}  </b></li>
  <li style="margin:0 0 10px 30px;">Username: <b>  ${username}  </b></li>
  <li style="margin: 0 0 10px 30px;">link:</li>
  <li style="margin: 0 0 0 30px;" class="list-item-last">  ${link}  </li>
  </ul>
  </td>
</tr>
...
```
> You can look up the template is by default in the templates folder to get a better understanding

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/macarthuror/parse-smtp-template/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Arturo Ortega - [@MacarthurOr](https://twitter.com/MacarthurOr) - arturo.ortegaro@gmail.com

Project Link: [https://github.com/macarthuror/parse-smtp-template](https://github.com/macarthuror/parse-smtp-template)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Cerberus](https://github.com/TedGoas/Cerberus)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[build-shield]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square
[build-url]: #
[contributors-shield]: https://img.shields.io/badge/contributors-1-orange.svg?style=flat-square
[contributors-url]: https://github.com/macarthuror/parse-smtp-template/graphs/contributors
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://choosealicense.com/licenses/mit
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ortegaarturo
[product-screenshot]: https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/screenshot.png