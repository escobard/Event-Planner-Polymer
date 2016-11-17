function notePlaceholder(argument) {
	var noteTitle = document.querySelector('input.na-note');
	var noteText = document.querySelector('textarea.iron-autogrow-textarea');
	noteTitle.placeholder = "Enter your note's title";
	noteText.placeholder = "What's this note about?";
}
window.addEventListener("load", notePlaceholder, false);