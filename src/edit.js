import { initializeEditPage, generatedLastEdited } from './views';
import { updateNote, removeNote } from './notes';
// Event handlers for selectors title, body and remove note elements
const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note');
const dateElement = document.querySelector('#last-edited');

// Get the complete hash of the notes using substring method.
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

// Title add event listener
titleElement.addEventListener('input', (e) => {
	const note = updateNote(noteId, {
		title: e.target.value
	});
	dateElement.textContent = generatedLastEdited(note.updatedAt);

});

//Body Element event handler
bodyElement.addEventListener('input', (e) => {
	const note = updateNote(noteId, {
		body: e.target.value
	});
	dateElement.textContent = generatedLastEdited(note.updatedAt);
});

//Remove button click event handler
removeElement.addEventListener('click', (e) => {
	removeNote(noteId);
	location.assign('/index.html');
});

// Add event listener to the window document.
window.addEventListener('storage', (e) => {
	if (e.key === 'notes') {
		initializeEditPage(noteId);
	}
});