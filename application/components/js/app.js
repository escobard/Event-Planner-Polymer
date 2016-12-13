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
  
  Model = {

    // button elements
    rButton : document.getElementById("registerButton"),
    lButton : document.getElementById("loginButton"),
    lFormButton : document.getElementById("signInPw"),
    lFormRegButton : document.getElementById("accountReg"),
    pInfo : document.getElementById("personalInfo"),
    gInfo : document.getElementById("guestInfo"),

    // container elements
    loginContainer : document.querySelector('#logIn'),
    regContainer : document.querySelector('#registrationForm'),
    regInputContainer : document.querySelector('.regInput'),
    pInfoContainer : document.querySelector('#personalInfoContainer'),
    eventOptContainer: document.querySelector('#eventOptionalContainer'),

    // progress ars 
    loginProgressBar : document.querySelector('#progressLogin'),
    regProgressBar : document.querySelector('#progress-reg'),
    regProgressBarOpt : document.querySelector('#progress-reg-optional'),

     // progress ar inputs arrays
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

  View

  ============================================================================*/
    
  View = {

  // generates view elements
  
  // generates checkbox constructor objects
  pCheckbox : new Controller()._checkboxActivate(Model.pInfo, Model.pInfoContainer),
  gCheckbox : new Controller()._checkboxActivate(Model.gInfo, Model.eventOptContainer),

  // progressState constructor objects
  logProgressHide: new Controller()._ProgressState(Model.lButton, Model.loginContainer, Model.loginProgressBar),
  regProgressHide: new Controller()._ProgressState(Model.rButton, Model.regInputContainer, Model.regProgressBar),
  regOptProgressHide: new Controller()._ProgressState(Model.pInfo, Model.pInfoContainer, Model.regProgressBarOpt),

  // registration progress tracker constructor objects
  progressTracker : new Controller()._ProgressTracker(Model.inputs, Model.loginProgressBar),
  progressBarReg : new Controller()._ProgressTracker(Model.inputsReg, Model.regProgressBar),
  progressBarRegOpt : new Controller()._ProgressTracker(Model.inputsRegOpt, Model.regProgressBarOpt),
  
  };    

  /*=========================================================================== 

  Controller Objects

  ============================================================================*/

  function Controller(){

    // function to activate checkbox containers
    this._checkboxActivate = function (checkButton, checkContainer) {
      checkButton.addEventListener('change', function () {
        if (this.active) {
          checkContainer.classList.add("active");
        } 
        else {
          checkContainer.classList.remove("active");
        };
      });
    };

    // function to manage progress bar states
    this._ProgressState = function (button, aContainer, aProgress) {

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

    // function to manage progress bar updates - originally from High Conversion Forms course
    this._ProgressTracker = function (inputs, progressBar) {
      var self = this;
      this.progressBar = progressBar;
      this.inputs = inputs;

      this.inputs.forEach(function (input) {
        input.element = document.querySelector(input.selector);
        input.added = false;
        input.isValid = null;

        input.element.oninput = function () {
          input.isValid = self._determineStatus(input);
          self._adjustProgressIfNecessary(input);
        };
      });

      this._determineStatus = function (input) {
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
      };

      this._adjustProgressIfNecessary = function (input) {
        var newAmount = this.progressBar.value;

        if (input.added && !input.isValid) {
          newAmount = newAmount - input.amount;
          input.added = false;
        } else if (!input.added && input.isValid) {
          newAmount = newAmount + input.amount;
          input.added = true;
        }
        this.progressBar.value = newAmount;
      };
    };

  };

  /*=========================================================================== 

  Controller end

  ============================================================================*/

/*=========================================================================== 

MVC end

============================================================================*/