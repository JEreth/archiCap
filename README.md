[![MIT License][license-shield]][license-url] [![Netlify Status](https://api.netlify.com/api/v1/badges/746c09b5-a33e-435a-aceb-df892fbadabf/deploy-status)](https://app.netlify.com/sites/archicap/deploys)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)  

# <img src="src/assets/logo_color.png" alt="Archicap" width="250">

> Capability-based IT System Architecture Development

This is a tool that supports building reasonable IT architectures. For this is facilitates capability-based thinking which helps to ensure business-oriented architecture decisions.

Web-Version can be found here https://archicap.netlify.com/

Checkout the related projects:
* https://archicap-formulator.netlify.com/ A capability formulator
* https://github.com/uni-stuttgart-wi1/analytics-capabilities-collection A collection of analytics capabilities

[![forthebadge](https://forthebadge.com/images/badges/built-with-science.svg)](https://forthebadge.com)

<!-- TABLE OF CONTENTS -->
## Table of Contents
* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
* [Contribute](#contribute)

<!-- ABOUT THE PROJECT -->
## About The Project

This is a tool that supports building reasonable IT architectures. For this is facilitates capability-based thinking which helps to ensure business-oriented architecture decisions.

The tool is part of an ongoing research project at the University of Stuttgart (https://www.uni-stuttgart.de/en) Department for Information Systems I (https://www.bwi.uni-stuttgart.de/en/dept7/)

It is published under MIT license (https://choosealicense.com/licenses/mit)

You can find the source code on Github: https://github.com/JEreth/archiCap

If you have any questions or notes please use the github page for interaction.


<!-- GETTING STARTED -->
## Getting Started

### Using archiCap as an architectural decision support

To get going you should first be aware that there are thee use cases that might be relevant for you:

1. Greenfield: You want to achieve some business capabilities and ask your self which components fit.
    - If this is the case you might only want to define your capabilities  and use some of the predefined components and patterns. 
2. Brownfield: You have a legacy IT landscape that you analyze in order to identify possible capabilities.
    - If this is the case you might only want to define your components and use some of the predefined capabilities. 
3. Benchmark: You have a legacy IT landscape and some capabilities and want to check which components are relevant and which might be redundant.
    - If this is the case feel free to use any of the predefined elements and add you own if necessary. 

You can simply use the **Wizard** to define your personal setup and then use the **Stage** to explore your possibilities.

You can always edit your environment in **My Profile*

### Add a new predefined environment to archiCap

This tools provides the flexibility to save and load a set of predefined elements that serve as a collection in certain scenarios.
It is for example possible to define possible elements for a use case such as *the Internet of Things* and then save all the relations
of components, patterns and capabilities. Later, any user can load this setup and adjust it to his own needs.

For this you can define the following elements in the left *configuration* sections.

- [x] **Categories** are helpers to structure you architecture. You can for instance use them as component categories 
(e.g. Databases, Front-End Tools etc.) or to define layers in your architecutre (e.g. data management, data processing etc.)

- [x] **Components** are abstract system types. It is important to understand that this are not concrete products, but more
types of products, e.g. relational database and not MySQL.

- [x] **Products** are concrete implementations of components. It is possible that there are more than one product to one component,
e.g. MySQL and PostreSQL for relational databases. 

- [x] **Patterns** are combinations of components that usually occur together in order to provide a certain set
of functions, e.g. edge processing, event logs and stream processing are often used together to build a so-called event hub.

- [x] **Capabilities** constitute the business link (i.e. the actual reason why a component is used) and the possibilities that
are enabled by a component, e.g. *distribution of event-driven data to multiple receivers* for an event log.

### Other features

- [x] **Export/Import** of your setup

<!-- Contribute -->
## Contribute

Feel free to contribute to this project. If you have any question or if you want to report a bug, please use the GitHub issue board.

If you contribute to the source, please fork this project and trigger a pull request with a good description of what you did.

<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://choosealicense.com/licenses/mit
