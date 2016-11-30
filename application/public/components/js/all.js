/*=========================================================================== 

This document contains the main javascript for the event planner application

============================================================================*/

/*=========================================================================== 

Google Geolocate API 

============================================================================*/

// This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
      var placeSearch, autocomplete;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };
      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('geo-address')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);

        // object created to populate different address field when field is active
        autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('diff-geo-address'), { types: [ 'geocode' ] });
        autocomplete2.addListener('place_changed', function() {
          fillInAddress();
        });
      }

      function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
      }

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      };

// this is the firefox prompt for geolocation, necessary for some firefox versions 



/*=========================================================================== 

Google Geolocate API end

============================================================================*/

/*=========================================================================== 

Progress Bar

============================================================================*/

// Set up the logic to change the progress bar
// originally derived from the instructor notes on : https://classroom.udacity.com/nanodegrees/nd802/parts/8021345401/modules/555574864975460/lessons/5243991811/concepts/54564686870923
// sets up the progress bar main
var progressBar = document.querySelector('paper-progress');

// updated progress bar when ship to a different address is ticked
var progressBarDiffAddress = document.querySelector('#progress-diff-address');

// initiates the progress tracker function

function ProgressTracker (inputs, progressBar) {
  var self = this;
  this.progressBar = progressBar;
  this.inputs = inputs;

  this.inputs.forEach(function (input) {
    input.element = document.querySelector(input.selector);
    input.added = false;
    input.isValid = null;

    input.element.oninput = function () {
      input.isValid = self.determineStatus(input);
      self.adjustProgressIfNecessary(input);
    };
  });
};

ProgressTracker.prototype = {
  determineStatus: function (input) {
    var isValid = false;
    
    if (input.element.value.length > 0) {
      isValid = true;
    } else {
      isValid = false;
    }

    try {
      isValid = isValid && input.element.validate();
    } catch (e) {
      console.log(e);
    }
    return isValid;
  },
  adjustProgressIfNecessary: function (input) {
    var newAmount = this.progressBar.value;

    if (input.added && !input.isValid) {
      newAmount = newAmount - input.amount;
      input.added = false;
    } else if (!input.added && input.isValid) {
      newAmount = newAmount + input.amount;
      input.added = true;
    }
    this.progressBar.value = newAmount;
  }
};

var inputs = [
  {
    selector: '#loginEmail',
    amount: 50
  }, {
    selector: '#loginPassword',
    amount: 50
  }
];

var inputsDiff = [
  {
    selector: '#user-diffname',
    amount: 50
  }, {
    selector: '#diff-geo-address',
    amount: 50
  }  
];

var progressTracker = new ProgressTracker(inputs, progressBar);

/*=========================================================================== 

Progress Bar end

============================================================================*/

/*=========================================================================== 

Different Address (will have to be changed to fit both optional fields)

============================================================================*/

// JavaScript code for the different address field activation and associated functions
function diffAddressCheck() {

// Selects our Queries
  var checkContainer = document.getElementById('diff-address');
  var normalProgressBar = document.querySelector('#progress-normal');
  var diffAddressContainer = document.querySelector('#diff-address-container');
  var diffAddressProgress = document.querySelector('#progress-diff-address');

// checks the form's paper-check element's state
  checkContainer.addEventListener('change', function (e) {
  
// if the check's parent element is 'active' run this if statement
    if (this.active) {
      diffAddressContainer.classList.add("active");
      diffAddressProgress.classList.add("active");
      normalProgressBar.classList.add("inactive");
      var progressTrackerNewAddress = new ProgressTracker(inputsDiff, progressBarDiffAddress);
    } 

// otherwise check for these classes and remove if present
    else {
      diffAddressContainer.classList.remove("active");
      diffAddressProgress.classList.remove("active");
      normalProgressBar.classList.remove("inactive");
    }
  })
} 
      //loads this function on window load
window.addEventListener("load", diffAddressCheck, false);
/*=========================================================================== 

Different Address end

============================================================================*/

/*=========================================================================== 

MVC start - migrate all code into an MVC structure if possible

============================================================================*/

/*=========================================================================== 

MVC end

============================================================================*/
importScripts('../bower_components/platinum-sw/service-worker.js');
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '../bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ],
  navigateFallback: '../../index.html'
};

    /*=========================================================================== 

    Validation

    ============================================================================*/
    var vName = document.getElementById('valname');
    var vEmail = document.getElementById('valemail');
    var vPass = document.getElementById('valpass');
    var vSecondPass = document.getElementById('valspass');
    var vSubmit = document.getElementById('valsubmit');
     // constructor object to join form validation issues
    function checkErrors(){

      // creates the array storing validation errors
      this.errors = [];

    }

    checkErrors.prototype = {

      // pushes all found errors into the errors array
      add: function (error){
        this.errors.push(error)
      },

      // checks all found errors together
      check: function() {
        var valmessage = "";
        switch (this.errors.length) {
          case 0:
          break;
          case 1:
          valmessage = "Please review the following error: " + this.errors[0];
          break;
          default:
          valmessage = "Please review the following errors: " + this.issues.join(" ,");
          break;
        }
        return valmessage;
      }
    }; 
    // begins checking registration form validation
    vSubmit.onclick = function formValidation(){

      // sets the variables to check input values
      var name = vName.value;
      var email = vEmail.value;
      var password = vPass.value;
      var secondPassword = vSecondPass.value;

      // checks for issues for each input 
      var nameErrors = new checkErrors();
      var emailErrors = new checkErrors();
      var passwordErrors = new checkErrors();
      var secondPasswordErrors = new checkErrors();

      // checks name validation
      // IMPORTANT to reuse validation in different places, try to add the arguments for each check function to the input value and the error object, for example:
      // function checkName(input, errorObject);
      // or more specific example for name check: function checkName(name, nameErrors);
      // this way, the functions can be re-used for the events
      // Test this method out after checking that validation does actually work
      function checkName() {
        // if password length is less than 16
        if (name.length < 2) {

        // add the following message to his objects issues array
          nameErrors.add("fewer than 2 characters");
        } 
        // if name length is over 100
        else if (name.length > 40) {
          nameErrors.add("greater than 40 characters");
        }
        // if name value does not (or !) match one symbol
        if (name.match(/[\!\@\#\$\%\^\&\*]/g)) {
          nameErrors.add("must not contain a symbol (!, @, #, $, %, ^, &, *)");
        }
        // if name has a number
        if (name.match(/\d/g)) {
          nameErrors.add("must not contain a number");
        }
        // if password does not have alphanumerical characters, numbers, or the allowed symbols
        var illegalChars = name.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)

        if (illegalChars) {
        // adds a function for each found illegal character, and adds it to the issues array, which then returns an issue message for each illegal charcater
          illegalChars.forEach(function (illegalChar) {
            nameErrors.add("includes illegal character: " + illegalChar);
          });
        }
        };

      // checks email validation
      function checkEmail() {
        // if email length is less than 16
        if (email.length < 7) {

        // add the following message to his objects issues array
          emailErrors.add("fewer than 8 characters");
        } 
        // if email value does not match @ symbol
        if (!email.match(/\@/g)) {
          emailErrors.add("must contain @ symbol");
        }
        // if password does not have a lowercase later
        if (!email.match(/\./g)) {
          emailErrors.add("must contain domain identifier (.com, .ca, .org, etc.)");
        }
        // if password does not have alphanumerical characters, numbers, or the allowed symbols
        var illegalChars = email.match(/[^A-z\@\.]/g)

        if (illegalChars) {
        // adds a function for each found illegal character, and adds it to the issues array, which then returns an issue message for each illegal charcater
          illegalChars.forEach(function (illegalChar) {
            emailErrors.add("includes illegal character: " + illegalChar);
          });
        }
      };

      // checks password validation 
      function checkPassword() {
        // if password length is less than 16
        if (password.length < 8) {

        // add the following message to his objects issues array
          passwordErrors.add("fewer than 8 characters");
        } 
        // if password length is over 100
        else if (password.length > 30) {
          passwordErrors.add("greater than 30 characters");
        }
        // if password value does not (or !) match one symbol
        if (!password.match(/[\!\@\#\$\%\^\&\*]/g)) {
          passwordErrors.add("must contain a symbol (!, @, #, $, %, ^, &, *)");
        }
        // if password does not have a number
        if (!password.match(/\d/g)) {
          passwordErrors.add("must contain a number");
        }
        // if password does not have a lowercase later
        if (!password.match(/[a-z]/g)) {
          passwordErrors.add("must contain a lowercase letter");
        }
        // if password does not have an uppercase letter
        if (!password.match(/[A-Z]/g)) {
          passwordErrors.add("must contain an uppercase letter");
        }
        // if password does not have alphanumerical characters, numbers, or the allowed symbols
        var illegalChars = password.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)

        if (illegalChars) {
        // adds a function for each found illegal character, and adds it to the issues array, which then returns an issue message for each illegal charcater
          illegalChars.forEach(function (illegalChar) {
            passwordErrors.add("includes illegal character: " + illegalChar);
          });
        }
      };


      // retrieves all issues 
      var nameErrorsCheck = nameErrors.check()
      var emailErrorsCheck = emailErrors.check()
      var passwordErrorsCheck = passwordErrors.check()
      var secondPasswordErrorsCheck = secondPasswordErrors.check()

      // sets the custom validity for each of the input's errors
      rName.setCustomValidity(nameErrorsCheck);
      rEmail.setCustomValidity(emailErrorsCheck);
      rPass.setCustomValidity(passwordErrorsCheck);
      rSecondPass.setCustomValidity(secondPasswordErrorsCheck);

      // checks to confirm all inputs are validated
      if (nameErrorsCheck.length + emailErrorsCheck.length + passwordErrorsCheck.length + secondPasswordErrorsCheck.length === 0) {
        alert("Your account has been created!");
      }
    };

    
    /*=========================================================================== 

    Validation end 

    ============================================================================*/