import uuidv4 from 'uuid/v4';
import moment from 'moment';
let notes = [];

// Read existing data from local storage
const loadNotes = () => {
	const notesJSON = localStorage.getItem('notes');

	try {
		// CHECK data using truthy / falsy
		return notesJSON ? JSON.parse(notesJSON) : [];
	} catch (e) {
		return [];
	}

};

// We save the new array to LS. Pass in notes and use JSON.stringify to convert obj to string.
const savedNotes =  () =>{
	localStorage.setItem('notes', JSON.stringify(notes));
};

// Expose notes from module
const getNotes = () => notes;

const createNote = () => {
	// Create timestamp for notes using moment
	const timestamp = moment().valueOf();
	const id = uuidv4();
	notes.push({
		id: id,
		title: '',
		body: '',
		createdAt: timestamp,
		updatedAt: timestamp
	});
	savedNotes();

	return id;
};

// Remove a note from the list and takes the arg id
const removeNote =  (id) =>{
	const noteIndex = notes.findIndex( (note) => note.id === id);

	if (noteIndex > -1) {
		notes.splice(noteIndex, 1);
		savedNotes();
	}
};

// Render application notes by one of three ways
const sortNotes =  (sortBy) => {
	if (sortBy === 'byEdited') {
		return notes.sort((a, b) => {
			if (a.updatedAt > b.updatedAt) {
				return -1
			} else if (a.updatedAt < b.updatedAt) {
				return 1
			} else {
				return 0
			}
		})
	} else if (sortBy === 'byCreated') {
		return notes.sort((a, b) => {
			if (a.createdAt < b.createdAt) {
				return 1
			} else {
				return 0
			}
		})
	} else if (sortBy === 'alphabetical') {
		return notes.sort((a, b) => {
			if (a.title.toLowerCase() < b.title.toLowerCase()) {
				return -1
			} else if (a.title.toLowerCase() > b.title.toLowerCase()) {
				return 1
			} else {
				return 0
			}
		})
	} else {
		return notes
	}
};


// Update notes
const updateNote = (id, updates) => {
	const note = notes.find((note) => note.id === id);

	if (!note) {
		return
	}

	if (typeof updates.title === 'string') {
		note.title = updates.title;
		note.updatedAt = moment().valueOf()
	}

	if (typeof updates.body === 'string') {
		notes.body = updates.body;
		note.updatedAt = moment().valueOf();
	}

	savedNotes();
	return note;
};

// Call the function to populate the notes.
notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote }