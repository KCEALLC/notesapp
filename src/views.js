import moment from 'moment';
import { getFilters } from './filters';
import { sortNotes, getNotes } from './notes'

// Generate the DOM structure for a note
const generateNoteDOM =  (note) => {
	// set a const to create new div, span and button
	const  noteEl = document.createElement('a');
	const textEl = document.createElement('p');
	const statusEl = document.createElement('p');

	// Show generic message title if no note exists.
	if (note.title.length > 0) {
		// Set textContent of noteEl
		textEl.textContent = note.title;
	} else {
		// Set note to text string to display no existent title.
		textEl.textContent = 'Unnamed note';

	}
	textEl.classList.add('list-ite__title');
	noteEl.appendChild(textEl);
	// Append textEl

	noteEl.appendChild(textEl);
	noteEl.classList.add('list-item');

	//Setup the link
	noteEl.setAttribute('href', `/edit.html#${note.id}`);

	// Setup status message
	statusEl.textContent = generatedLastEdited(note.updatedAt);
	statusEl.classList.add('list-item__subtitle');
	noteEl.appendChild(statusEl);

	return noteEl
};

// function to render notes
const renderNotes =  () => {
	const  notesEl = document.querySelector('#notes');
	const filters = getFilters();
	const notes = sortNotes(filters.sortBy);
	// Limit notes to those that pass out filters
	const filteredNotes = notes.filter( (note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

	// Clear notes targeting notes div and setting innerHTML to empty
	notesEl.innerHTML = '';
	// console.log(filteredNotes);

	if (filteredNotes.length > 0) {
		filteredNotes.forEach((note) => {
			const noteEl = generateNoteDOM(note);
			// Render note.title and append to body
			notesEl.appendChild(noteEl);

		})
	} else {
		const emptyMessage = document.createElement('p');
		emptyMessage.textContent = 'No notes to show';
		emptyMessage.classList.add('empty-message');
		notesEl.appendChild(emptyMessage);
	}

};

const initializeEditPage = (noteId) => {
	// Event handlers for selectors title, body and remove note elements
	const titleElement = document.querySelector('#note-title');
	const bodyElement = document.querySelector('#note-body');
	const dateElement = document.querySelector('#last-edited');
	// Get an array of notes.
	const notes = getNotes();
// See if note id matches a note. If not we redirect them.
	const note = notes.find((note) => note.id === noteId);

// validation to see if id is matched.. Truthy / Falsy
	if (!note) {
		location.assign(`/index.html`)
	}

// add query selector for note-title and note-body
	titleElement.value = note.title;
	bodyElement.value = note.body;
// Set initial value on page load
	dateElement.textContent = generatedLastEdited(note.updatedAt);
};

// generate the last edited note
const generatedLastEdited =  (timestamp) =>` Last edited ${moment(timestamp).fromNow()}`;

export { generateNoteDOM, renderNotes, generatedLastEdited, initializeEditPage };