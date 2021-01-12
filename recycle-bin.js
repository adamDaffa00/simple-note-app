const trashNote = document.querySelector('.list-note-trash');
const emptyTrashlist = document.querySelector('.empty-list');
// local storage for junk notes
document.addEventListener('DOMContentLoaded',renderJunkNote);
function renderJunkNote(){
  let trashNoteList = trashNote.querySelector('note-list');
  let value = getNote('junk-note');
  trashNote.classList.remove('hide-list-note');
  emptyTrashlist.classList.add('hide-empty-list');
  value.forEach(note => {
    trashNoteList.Notes = note;
  });
}