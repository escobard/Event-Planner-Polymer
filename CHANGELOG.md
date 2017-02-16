** Changelog for Event Planning Application

v1.20
- service worker functionality fixed.
- all polymer files and dependencies are now stored in a single file, index.html.
- fixed firefox and other browser usage, only works with production version not dev version due to how polymer components render with shadowDOM

v1.10
- fixing application areas that instructors requested:
- Event form optional field is now only the optional message, all other fields are required. (completed)
- Event times cannot be in the past, and end time cannot have times before the start date (completed)
- Name must be required on the sign up form (completed)
- All fields except for additional messages to guest must be required in the event form (completed)
- The autofocus attribute must be added to the first input in each state (completed)

v0.99
- prototype to fix packaging error
- prototype to fix mobile issues

v0.97
- refactored code further
- tested mobile, browser, and live testing
- packaged, cleaned up gulp production, tested public concat
- added responsive styles

v0.95
- event denied creation unless all required fills are valid
- cleaned up gulp and parse production files

v0.9
- added final CSS styles
- refactorred JS into polymer framework
- fixed progress bar functionality
- refactored custom JS into MVC framework, using OOJS practices
- fixed most JS errors
- fixed login / registration not automatically authenticating with promises
- revised form error and placeholder to better match application logic

v0.8
- added registration form javascript logic
- added some more CSS fixes
- finalized password validation, and registration validation
- finalized event inputs and validation
- finalized progress bar logic for login / registration

v0.7
- added progress bars for login / reg forms.
- cleaned up login / reg form CSS
- re-structured login JS logic into MVC

v0.6
- added proper login functions

v0.5
- added validation for registration and login form
- added some css style fixes
- added unique toolbar
- fixed registration field bugs

v0.4
- added optional field values to the MVC

v0.3
- added email / password validation
- disabled google login for now
- base function and styles for registration form

v0.2
- base function and styles created for event-planner templates
- refactor of files needs to be cleaned up
- gulp workspace kinks further worked out, need more work 

V0.1
- base version created.
- gulp workspace created (still working out kinks)
