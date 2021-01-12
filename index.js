/**
const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.menu');
const clearBtn = document.querySelector('#clear');
const cancelBtn = document.querySelector('#cancel');
const addNewNoteBtn = document.querySelector('#add-new');
const addBtn = document.querySelector('.add');
const textfield = document.querySelector('.modal-field-section');
const emptyList = document.querySelector('.empty-list');
let noteAdded = false,titleInput,textareaInput;

// listener
navbar.clickEvent = showMenu;
navbar.clickAddBtn = showTextField;
navbar.DirectBtn = directPage;
cancelBtn.addEventListener('click',cancel);
addNewNoteBtn.addEventListener('click',addNote);

// toggle menu function
function showMenu(e){
  navbar.menu.classList.toggle('toggle-menu');
}

// show field text
function showTextField(){
  if(!noteAdded)
    textfield.classList.add('show-modal');
    noteAdded = true;
}

function directPage (){
  window.location = 'recycle-bin.html';
}

function displayNoteList(){
  let noteObj = getNote('note');
  noteObj.forEach(note => addNoteList(note));
}

function addNoteList(note){
  const uListEl = noteList.querySelector('note-list');
  // tampilkan wadah list dan sembunyikan list kosong
  emptyList.classList.add('hide-empty-list');
  noteList.classList.remove('hide-list-note');
  // tampilkan list ke wadah
  uListEl.Notes = note;
}

// render localNote
document.addEventListener('DOMContentLoaded',displayNoteList);

// menambahkan catatan ke dalam list
function addNote(){
   titleInput = document.getElementById('title');
   textareaInput = document.getElementById('textarea');
  // cek apakah field text kosong 
  if (titleInput.value.length != 0) {
    if(textareaInput.value == ''){
      alert('anda belum mengisi catatan');
    }
    else{
     // block kode 
     const newNote = new Note(titleInput.value,textareaInput.value);
     clear.addEventListener('click', () => {
       clearFieldText();
     });
     addLocalNotes(newNote,'note');
     addNoteList(newNote);
     clearFieldText();
    }
  }else{
    alert('anda belum mengisi judul');
  }
}


function clearFieldText(){
   titleInput.value = ''; 
   textareaInput.value = '';
}

// Fungsi untuk tombol cancel pada tedt field
function cancel(e){
  if(noteAdded){
     e.target.parentElement.parentElement.parentElement.parentElement.classList.remove('show-modal');
  }
  noteAdded = false;
}

// auto resize text area 
function addAutoResize() {
  document.querySelectorAll('[data-autoresize]').forEach(function (element) {
    element.style.boxSizing = 'border-box';
    var offset = element.offsetHeight - element.clientHeight;
    element.addEventListener('input', function (event) {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + offset + 'px';
    });
    element.removeAttribute('data-autoresize');
  });
}
addAutoResize();
**/


let app = new Vue({
  el: '.container',
  router,
  data: {
    noteAdded: false,
    notes: [],
    deletedNote: [],
    modalContent: null
  },
  components: {
    'home': home
  },
  created (){
   noteRef.on('value',this.resultData,this.errorData)
  },
  methods: {
    showTextField: function(){
     const modal = this.$el.querySelector('.modal-field-section');
     if(!this.noteAdded){
        modal.classList.add('show-modal');
     }
     this.noteAdded = true;
    },
    cancel: function(e){
     if(this.noteAdded){
        this.$el.querySelector(".modal-field-section").classList.remove('show-modal');
     }
     this.noteAdded = false;
    },
    // adding note
    addNote: function(data){
      noteRef.push({
        judul: data.title,
        content: data.content
      });
    },
    clearNote: function(id,item){
     database.ref('catatan/'+ id).remove()

     this.addLocalNotes(item)
    },
    // modal
    modalDetail: function(note){
     this.modalContent = note;
     this.$el.querySelector('.note-content-modal').classList.add('show-modal');
    },
    resultData: function(data){
      this.notes = [];
      data.forEach(note => {
      const dataNote = {
          id: note.key,
          title: note.val().judul,
          content: note.val().content
        }
     this.notes.push(dataNote)      
      })
    },
    errorData: function(error){
      console.log(error)
    },
    getNote: function(){
      let notes;
      if(localStorage.getItem('note-deleted') == null){
        notes = []
      }else{
        notes = JSON.parse(localStorage.getItem('note-deleted'))
      }
      return notes
    },
    addLocalNotes: function(objNote){
      let notes = this.getNote()
      notes.push(objNote)
      this.deletedNote = localStorage.setItem('note-deleted',JSON.stringify(notes))
    }
  } 
});