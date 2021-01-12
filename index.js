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