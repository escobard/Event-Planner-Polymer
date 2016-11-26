/*=========================================================================== 

Validation

============================================================================*/
	rName.setCustomValidity();
	rEmail.setCustomValidity();
	rPass.setCustomValidity();
	rSecondPass.setCustomValidity();
// begins checking registration form validation
function formValidation(){

	// sets the variables to check input values
	var name = rName.value;
	var email = rEmail.value;
	var password = rPass.value;
	var secondpassword = rSecondPass.value;

	// checks for issues for each input 
	var nameErrors = new checkErrors();
	var emailErrors = new checkErrors();
	var passwordErrors = new checkErrors();
	var spasswordErrors = new checkErrors();

	// checks password requirements
	function checkPassword() {
		// if password length is less than 16
    if (password.length < 8) {

    // add the following message to his objects issues array
      passwordIssues.add("fewer than 8 characters");
    } 
    // if password length is over 100
    else if (password.length > 30) {
      passwordIssues.add("greater than 30 characters");
    }
    // if password value does not (or !) match one symbol
    if (!password.match(/[\!\@\#\$\%\^\&\*]/g)) {
      passwordIssues.add("must contain a symbol (!, @, #, $, %, ^, &, *)");
    }
    // if password does not have a number
    if (!password.match(/\d/g)) {
      passwordIssues.add("must contain a number");
    }
    // if password does not have a lowercase later
    if (!password.match(/[a-z]/g)) {
      passwordIssues.add("must contain a lowercase letter");
    }
    // if password does not have an uppercase letter
    if (!password.match(/[A-Z]/g)) {
      passwordIssues.add("must contain an uppercase letter");
    }
    // if password does not have alphanumerical characters, numbers, or the allowed symbols
    var illegalChars = password.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)

    if (illegalChars) {
    // adds a function for each found illegal character, and adds it to the issues array, which then returns an issue message for each illegal charcater
      illegalChars.forEach(function (illegalChar) {
        passwordIssues.add("includes illegal character: " + illegalChar);
      });
    }
	};

	// checks that password match
	if (password === spassword && password.length > 0) {
		checkPassword();
	}else {
		spasswordIssues.add("Password must be exact!");
	};

	// retrieves all issues 
	var nameErrorsCheck = nameErrors.check();
	var emailErrorsCheck = emailErrors.check();
	var passwordErrorsCheck = passwordErrors.check();
	var spasswordErrorsCheck = spasswordErrors.check();

	// sets the custom validity for each of the input's errors
	rName.setCustomValidity(nameErrorsCheck);
	rEmail.setCustomValidity(emailErrorsChec);
	rPass.setCustomValidity(passwordErrorsCheck);
	rSecondPass.setCustomValidity(spasswordErrorsCheck);

	// checks to confirm all inputs are validated
	if (nameErrorsCheck.lentgh + emailErrorsCheck.length + passwordErrorsCheck.lengt + spasswordErrorsCheck.length === 0) {
		alert("Your account has been created!");
	}
};

// constructor object to join form validation issues
function checkErrors(){

	// creates the array storing validation errors
	this.errors = [];

}

checkIssues.prototype = {

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