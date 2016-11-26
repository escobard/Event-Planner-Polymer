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