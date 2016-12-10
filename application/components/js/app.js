/*=========================================================================== 

This document contains the main javascript for the event planner application

============================================================================*/

/*=========================================================================== 

MVC start

============================================================================*/

/*=========================================================================== 

  Model

  ============================================================================*/

  // most data is held externally in firebase and within the polymer dom files
  
  Model = {};

  /*=========================================================================== 

  View

  ============================================================================*/
    // selects view elements
  View = {

    // button elements
    rButton : document.getElementById("registerButton"),
    lButton : document.getElementById("loginButton"),
    lFormButton : document.getElementById("signInPw"),
    lFormRegButton : document.getElementById("accountReg"),
    pInfo : document.getElementById('personalInfo'),
    gInfo : document.getElementById('guestInfo'),

    // container elements
    loginContainer : document.querySelector('#logIn'),
    regContainer : document.querySelector('#registrationForm'),
    regInputContainer : document.querySelector('.regInput'),
    pInfoContainer : document.querySelector('#personalInfoContainer'),
    eventOptContainer: document.querySelector('#eventOptionalContainer'),

    // Progress Bars 
    progressBar : document.querySelector('paper-progress'),
    loginProgressBar : document.querySelector('#progressLogin'),
    regProgressBar : document.querySelector('#progress-reg'),
    regProgressBarOpt : document.querySelector('#progress-reg-optional'),
    eventLogin : document.querySelector('event-login-pw'),
    
    // Progress Bar Inputs
    inputs : [
      {
        selector: '#loginEmail',
        amount: 50
      }, {
        selector: '#loginPassword',
        amount: 50
      }
    ],

    // registration form inputs
    inputsReg : [
      {
        selector: '#regUserName',
        amount: 25
      }, {
        selector: '#regEmail',
        amount: 25
      }, {
        selector: '#regPassword',
        amount: 25
      }, {
        selector: '#regSecondPass',
        amount: 25
      }    
    ],

    // registration form inputs
    inputsRegOpt : [
      {
        selector: '#reg-occupation',
        amount: 25
      }, {
        selector: '#reg-birthday',
        amount: 25
      }, {
        selector: '#reg-appuse',
        amount: 25
      }, {
        selector: '#diff-geo-address',
        amount: 25
      }    
    ]
  
  };    

  /*=========================================================================== 

  Controller Objects

  ============================================================================*/

  function Controller(){
    this._checkboxActivate();
  };
    
    // checks if checkbox is checked then activates container
    function checkboxActivate(checkButton, checkContainer) {
      checkButton.addEventListener('change', function () {
        if (this.active) {
          checkContainer.classList.add("active");
        } 
        else {
          checkContainer.classList.remove("active");
        };
      });
    }; 

    // checkboxActivate objects
    pCheckbox = new checkboxActivate(View.pInfo, View.pInfoContainer);
    gCheckbox = new checkboxActivate(View.gInfo, View.eventOptContainer);

    // creates the constructor extension for the login progress
    // review prototypes again to figure out the correct functionality to hide progress bars
    function ProgressHide(button, aContainer, aProgress) {

    // following function extended from following stackoverflow post: http://stackoverflow.com/questions/14188654/detect-click-outside-element-vanilla-javascript
      document.addEventListener('click', function(event){
        var isClickInside = aContainer.contains(event.target);
        var buttonClick = button.contains(event.target);
          if (!isClickInside) {
            aProgress.classList.remove('active');
          } 
          else if(buttonClick) {
            aProgress.classList.remove('active');
          }
          else {
            aProgress.classList.add('active');
          }
      });
    };

    logProgressHide: new ProgressHide(View.lButton, View.loginContainer, View.loginProgressBar);
    regProgressHide: new ProgressHide(View.rButton, View.regInputContainer, View.regProgressBar);
    regOptProgressHide: new ProgressHide(View.pInfo, View.pInfoContainer, View.regProgressBarOpt);

    // progress tracker init
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

    // progress tracker value check
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

    // creates logic objects
    // login bar progress tracker
    var progressTracker = new ProgressTracker(View.inputs, View.progressBar);

    // registration progress tracker
    var progressBarReg = new ProgressTracker(View.inputsReg, View.regProgressBar);

    // registration optional progress tracker
    var progressBarRegOpt = new ProgressTracker(View.inputsRegOpt, View.regProgressBarOpt);
  
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
            (document.getElementById('event-address')),
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

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
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

  /*=========================================================================== 

  Google Geolocate API end

  ============================================================================*/

  /*=========================================================================== 

  Controller end

  ============================================================================*/

/*=========================================================================== 

MVC end

============================================================================*/