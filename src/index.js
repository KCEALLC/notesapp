import { createNote } from "./notes";
import {setFilters } from './filters';
import { renderNotes } from './views';

renderNotes();

// Add event Listener to button with ID
document.querySelector('#create-note').addEventListener('click', (e) => {
	const id =createNote();
	// We re-redirect users to edit page url
	location.assign(`/edit.html#${id}`);


});

// Search event listener
document.querySelector('#search-text').addEventListener('input',  (e) => {
	setFilters({
		searchText: e.target.value

	});
	renderNotes();
	//console.log(e.target.value);
});

// Select dropdown. Change filter and re-render the notes list
document.querySelector('#filter-by').addEventListener('change', (e) => {
	//console.log(e.target.value);
	setFilters({
		sortBy: e.target.value
	});
	// Render notes
	renderNotes();
});

// Add event listener for window storage event and render notes.
window.addEventListener('storage',  (e) => {
	if(e.key === 'notes') {
		renderNotes();
	}
});

