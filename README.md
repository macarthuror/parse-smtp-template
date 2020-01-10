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
  <a href="https://github.com/macarthuror/parse-smtp-template">
    <img src="logo.png" alt="Logo" width="80" height="80" />
  </a>

  <h3 align="center">Parse SMTP Template</h3>

  <p align="center">
    An easy way to send email templates via SMTP with your <a href="https://github.com/parse-community/parse-server">Parse Server</a>!
    <br />
    <b>(Multi Language Support)</b>
    <br />
    <a href="https://badge.fury.io/js/parse-smtp-template"><img src="https://badge.fury.io/js/parse-smtp-template.svg" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/parse-smtp-template"><img src="https://img.shields.io/npm/dt/parse-smtp-template.svg" alt="total downloads" /></a>
    <a href="https://www.npmjs.com/package/parse-smtp-template"><img src="https://img.shields.io/npm/dm/parse-smtp-template.svg" alt="monthly downloads" /></a>
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
  * [Simple template](#simple-template)
  * [Multi template](#multi-template)
  * [Multi language](#multi-language)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This is a module made it for Parse Server and an easy solution to send emails via SMTP with templates in HTML, also with the posibility of use a multi language support for your templates.

We recomend you to use the [Cerberus](https://github.com/TedGoas/Cerberus) project for the email templates.

( if you know about other templates you can added )

### Built With

* [Nodemailer](https://nodemailer.com)



<!-- GETTING STARTED -->
## Getting Started

This module is a very simple solution and because of that you can get it up and running in a few minutes.

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
2. In your Parse Server add the configuration of the emailAdapter and fill the requeriments to connect with your email account

```js
var api = new ParseServer({
    ...
    emailAdapter: {
        module: 'parse-smtp-template',
        options: {
            port: 587,
            host: "smtp.mail.com",
            user: "name@domain.com",
            password: "SecurePassword",
            fromAddress: 'app@domain.com'
        }
    }
})
```
> Now is ready to use!

--
<br />

3. (Optional) Config your email template 

**In this module you can choise to use a simple template (1 template for bouth emails) or multiTemplate (1 template per type of email)
If you want to use the multi Language mode you need to set up the multi languaje mode.**

---
<!-- USAGE EXAMPLES -->
## Usage
Use it, it´s very easy 😎😃👌

### Simple template

This template is used to send bouth email (password recovery and email confirmation)

The templates have access to 6 parameters :
* link
* btn
* body
* username 
* appName
* subject
* options (optional)

To use it you only need to write `${parameter}` on the template

**IMPORTANT** -- **All the HTML file need to use only double quotes to avoid problems**
---
If you want a custome template is necessary to select the correct file.
In this example we are gonna use `template.html`

index.js
```js
emailAdapter: {
  module: 'parse-smtp-template',
  options: {
    ...
    template: true,
    templatePath: "views/templates/template.html",

    // Custome options to your emails
    // You can add more options if you need
    passwordOptions: {
        subject: "Password recovery",
        body: "Custome pasword recovery email body",
        btn: "Recover your password"
        /* --EXTRA PARAMETERS--
        others: {
          extraParameter
        }
        */
    },
    confirmOptions: {
        subject: "E-mail confirmation",
        body: "Custome email confirmation body",
        btn: "confirm your email"
    },
  }
}

```
> To use the extra parameters please use `${options.extraParameter}`


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
```html
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
> You can look up the template by default to get a better understanding

--
### Multi template

This option is a better way to customize your emails because you are able to use a different template per type of email.

This template have access to 7 parameters:
* user _(all the info of the User object)_
* link
* appName
* subject
* body
* btn
* options (optional)

The __options__ parameter needs to have _subject, body_ and _btn_ like minimun


index.js
```js
emailAdapter: {
  module: 'parse-smtp-template',
  options: {
    ...
    multiTemplate: true,
    confirmTemplatePath: "views/templates/confirmTemplate.html",
    passwordTemplatePath: "views/templates/passwordTemplate.html",

    // Custome options to your emails
    // You can add as much as you need
    passwordOptions: {
        subject: "Password recovery",
        body: "Custome pasword recovery email body",
        btn: "Recover your password"
        /* --EXTRA PARAMETERS--
        others: {
          extraParameter
        }
        */
    },
    confirmOptions: {
        subject: "E-mail confirmation",
        body: "Custome email confirmation body",
        btn: "confirm your email"
    },
  }
}
```
> To use the extra parameters please use ${options.extraParameter}

--
### Multi language

To be able to use Multi language is necesary set true `multiTemplate` and `multiLang`.

**Also in necessary to add a column called _lang_ in your User object** 

The _lang_ column and the object needs to have the same value.

index.js
```js
emailAdapter: {
  module: 'parse-smtp-template',
  options: {
    ...
    multiTemplate: true,
    confirmTemplatePath: "views/templates/confirmTemplate.html",
    passwordTemplatePath: "views/templates/passwordTemplate.html",
    multiLang: true,
    multiLangPass: {
      es: {
        subject: "Recuperación de Contraseña",
        body: "Cuerpo del correo de recuperación de contrseña",
        btn: "recupera tu contraseña"
        /* --EXTRA PARAMETERS--
        others: {
          extraParameter
        }
        */
      },
      en: {
        subject: "Password recovery",
        body: "Password recovery email body",
        btn: "Recover your password"
      },
      fr: {
        subject: "Récupération du mot de passe",
        body: "Corps de l'e-mail de récupération de mot de passe",
        btn: "récupérer votre mot de passe"
      }
    },

    multiLangConfirm: {
      es: {
        subject: "Confirmación de Correo",
        body: "Cuerpo del correo de confirmación de correo",
        btn: "confirma tu correo"
      },
      en: {
        subject: "E-mail confirmation",
        body: "Mail confirmation email body",
        btn: "confirm your email"
      },
      fr: {
        subject: "Mail de confirmation",
        body: "Courriel de confirmation du corps de l'e-mail",
        btn: "confirmez votre email"
      }
    },

    // Default options if the lang of the user isn´t in some of the multiLanguage objects
    passwordOptions: {
        subject: "Password recovery",
        body: "Custome pasword recovery email body",
        btn: "Recover your password"
        /* --EXTRA PARAMETERS--
        others: {
          extraParameter
        }
        */
    },
    confirmOptions: {
        subject: "E-mail confirmation",
        body: "Custome email confirmation body",
        btn: "confirm your email"
    },
  }
}
```
---
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