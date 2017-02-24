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

  // generates view elements
  
  // generates checkbox constructor objects
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
    regProgressBarOpt : document.querySelector('#progress-reg-optional')

  };
  /*=========================================================================== 

  Controller Objects

  ============================================================================*/

  function Controller(){

    // function to activate checkbox containers
    this._checkboxActivate = function (checkButton, checkContainer) {
      if (checkButton == null) {return}
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
    if (aContainer == null) {return}
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
        if (input.element == null) {return}
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
  
  Controller.prototype.objects = {
  pCheckbox : new Controller()._checkboxActivate(View.pInfo, View.pInfoContainer),
  gCheckbox : new Controller()._checkboxActivate(View.gInfo, View.eventOptContainer),

  // progressState constructor objects
  logProgressHide: new Controller()._ProgressState(View.lButton, View.loginContainer, View.loginProgressBar),
  regProgressHide: new Controller()._ProgressState(View.rButton, View.regInputContainer, View.regProgressBar),
  regOptProgressHide: new Controller()._ProgressState(View.pInfo, View.pInfoContainer, View.regProgressBarOpt),

  // registration progress tracker constructor objects
  progressTracker : new Controller()._ProgressTracker(Model.inputs, View.loginProgressBar),
  progressBarReg : new Controller()._ProgressTracker(Model.inputsReg, View.regProgressBar),
  progressBarRegOpt : new Controller()._ProgressTracker(Model.inputsRegOpt, View.regProgressBarOpt)
  };
  /*=========================================================================== 

  Controller end

  ============================================================================*/

/*=========================================================================== 

MVC end

============================================================================*/