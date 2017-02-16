# Event Planner - Polymer
This repository contains all my own programming project files, notes, and associated files for the [Udacity -Senior Web Developer Nanodegree - By Google - Project 1](https://www.udacity.com/course/object-oriented-javascript--ud015) course with [Udacity](https://www.udacity.com/). 

## Project Criteria
This application was created as an Event Planner, with a special focus on form validation, and application responsive display on all devices. The application must allow someone to name their event, search for a host location (using a location API like Foursquare), set the capacity of the event, the start and end times, and input a description of the event.

### Additional Features
- Home-screen installable.
- Google Geolocation.
- Firebase JSON data get / post. 
- Firebase Authentication user login / account creation.

## Demo

![desktop image](https://onlinedevelopers.ca/udacity/event-planner/components/img/read-me/proj1-collage.jpg)

[To view the application live click here] (https://onlinedevelopers.ca/udacity/event-planner/)

To download, please follow the instructions below.

## Installation

To install and run this locally on your computer, please use these commands:

Install Global Dependencies:
```
$ npm install -g bower
$ npm install -g firebase-tools 
```

Clone the repository from: 
```
$ git clone https://github.com/escobard/udacity-srwebdev-project1-event-signup.git
```

Install NPM dependencies:
```
$ npm install
```

Install bower components:
```
$ bower install
```

## Usage

```
$ gulp serve
```

To publish, minimize, and compile components for production use:

```
$ gulp public
```

## Most Recent Update - v1.10
- fixing application areas that instructors requested:
- Event form optional field is now only the optional message, all other fields are required. (completed)
- Event times cannot be in the past, and end time cannot have times before the start date (completed)
- Name must be required on the sign up form (completed)
- All fields except for additional messages to guest must be required in the event form (completed)
- The autofocus attribute must be added to the first input in each state (completed)

## To Do's
- Fix application faulty service worker functionality.
- Get rid of obsolete commentary in code.
- Update pipeline to vulcanize and compress components correctly.
- Display the login form on application landing.
- Add google login functionality.
- Refactor all code into Polymer for cleaner scalability. 

## Known Bugs
- Application height is bugged under certain circumstances in Chrome version 54+

## Libraries, Frameworks

[Polymer](https://codelabs.developers.google.com/codelabs/polymer-firebase-pwa/index.html?index=..%2F..%2Findex#0)

[Firebase](https://codelabs.developers.google.com/codelabs/polymer-firebase-pwa/index.html?index=..%2F..%2Findex#0)

[Google Labs Note App Tutorial](https://codelabs.developers.google.com/codelabs/polymer-firebase-pwa/index.html?index=..%2F..%2Findex#0)

## Tutorials

[Building High Conversion Web Tools - By Google] (https://www.udacity.com/course/building-high-conversion-web-forms--ud890) 

[Web Tooling & Automation - By Google] (https://www.udacity.com/course/web-tooling-automation--ud892)

Various stack overflow posts, and other internet tutorials referenced in my commits. 

## Contribution

Feel free to contribute to this repository. All files in this repository are protected under the MIT license, but feel free to contribute, fork, star, or share this application as you see fit.

For commercial or educational use, please paste a link to this repository to give proper credit.

## License
As of October 31st, 2016, these files are open for all to use and contribute to. This repository is protected under the [MIT License](http://choosealicense.com/licenses/mit/).