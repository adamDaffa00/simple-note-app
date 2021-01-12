const recycleBin = {
  template: `
  <div>
      <nav class="navbar">
       <input type="search" name="search" placeholder="cari catatan yang dibuang" class="search" id="search">
      </nav>
      <section class="list-note list-note-trash hide-list-note">
        <ul>
         <li v-for='note in notes'>
           <h2> <a href="#" class="note-items"> {{note.title}} </a></h2>
           <p> {{note.content}} </p>
           <router-link :to='"/bin/" + note.id' class="read-note"> selengkapnya <i class="fas fa-arrow-right"> </i>
           </router-link>
           <div class="edit-note">
            <button v-on:click="deleteNote(note.id)"> <i class="fas fa-trash"></i></button>
           </div>
         </li>
        </ul>
      </section>
      <empty-list class="empty-list">
      </empty-list>
      <div class="back">
        <router-link to="/"> <i class="fas fa-arrow-circle-left"></i> </router-link>
      </div>
  </div>
  `,
  created (){
   this.displayDeletedNote();
   
  },
  data() {
    return {
      notes: []
    };
  },
  methods: {
    getNote(){
      let notes;
      if(localStorage.getItem('note-deleted') == null){
        notes = [];
      }else{
        notes = JSON.parse(localStorage.getItem('note-deleted'));
      }
      return notes;
    },
    displayDeletedNote(){
      const deletedNote = this.getNote();
      this.notes = deletedNote;
    },
    deleteNote(id){
     const deletedNote = this.getNote();
     deletedNote.forEach((note,index) => {
       if(note.id === id) {
         deletedNote.splice(index,1);
       }
     });
     localStorage.setItem('note-deleted',JSON.stringify(deletedNote));
     this.displayDeletedNote();
    }
  }
};

const renderData = {
  template: `
    <div class="note-content-modal show-modal">
      <div class="modal-topbar">
        <router-link :to='"/bin"'><i class="fas fa-chevron-left"></i></router-link>
        <button><i class="fas fa-edit"></i></button>
      </div>
      <div>
        <input type="text" disabled v-model="note.title" id="" class="note-title">
        <textarea disabled class="note-content" data-autoresize>{{ note.content }}</textarea>
      </div>
    </div>
 `,
 data() {
   return {
     note: {}
   };
 },
 created(){
   this.render();
 },
 methods: {
   getNote(){
    let notes;
    if(localStorage.getItem('note-deleted') == null){
        notes = [];
    }else{
      notes = JSON.parse(localStorage.getItem('note-deleted'));
     }
     return notes;
   },
   render(){
      const id = this.$route.params.id;
      const deletedNote = this.getNote();    
      deletedNote.forEach(item => {
        if(item.id == id){
          this.note = item;
        }
      });
   }
 }
};

const home = {
  template: `
  <h1> selamat datang </h1>
  `
};

const note = {
  props: ['notes'],
  template: `
  <div>
    <div class="navbar">
      <div v-on:click="showMenu" class="hamburger-menu">
        <i class="fas fa-bars"></i>
      </div>
      
      <div class='menu' >
        <ul class="navigation">
          <li><a href="index.html">all note <i class="fas fa-sticky-note"></i> </a></li>
          <li><router-link to="/bin"> trash <i class="fas fa-trash"></i> </router-link>
         </ul>
        <ul class="tags">
          <li><a href="#"> <i class="fas fa-hashtag"></i>tag1 </a></li>
          <li><a href="#"> <i class="fas fa-hashtag"></i>tag2 </a></li>
          <li><a href="#"> <i class="fas fa-hashtag"></i>tag3 </a></li>
        </ul>
        <div class="footer-nav">
          <a href="#"> about </a>           
        </div>
       </div>
       <input type="search" name="search" placeholder="cari catatan" class="search" id="search">
       <button v-on:click='$emit("appear-field")' class="add"> <span> tambah catatan </span>  <i class="fas fa-plus"></i></button>
      </div>
      
      <template v-if="notes.length">
        <section class="list-note">
          <ul>
           <li v-for='(item,i) of notes'>
             <h2> <a href="#" class="note-items"> {{item.title}} </a></h2>
             <p> {{item.content}} </p>
             <button class="read-note" v-on:click="$emit('detail-note',item)"> selengkapnya <i class="fas fa-arrow-right"> </i></button>
             <div class="edit-note">
               <button v-on:click="$emit('hapus-list',item.id,item)"> <i class="fas fa-trash"></i></button>
             </div>
           </li>
          </ul>
        </section>
      </template>
      
      <div v-else class="empty-list">
        <p> tidak ada catatan </p>
      </div>
     
      <div class="modal-field-section">
        <div class="field-topbar">
          <div class="back-icon">
            <button v-on:click="$emit('hide-textfield',event)" id="cancel"> <i class="fas fa-chevron-left"></i> </button>
          </div>
          <div class="setting-icon">
            <button id="add-new" v-on:click="createNote"> <i class="fas fa-check"></i> </button>
            <button id="clear" v-on:click="clearField"> <i class="fas fa-trash"></i> </button>
          </div>
        </div>
        <div class="field-text">
          <h1> <input type="text" class="title" id="title" placeholder="judul" v-model='note.title'> </h1>
          <textarea id="textarea" placeholder="ketik catatan" v-model='note.content' data-autoresize rows="2"></textarea>
        </div>
      </div>
      
    </div>
  `,
  data() {
    return {
      note: {
        id: null,
        title: null,
        content: null
      }
    };
  },
  methods: {
    createNote: function(){
      const dataNote = {
        id: uuidv4(),
        title: this.note.title,
        content: this.note.content
      };
      this.$emit('add-note',dataNote);
   
      this.note.title = null;
      this.note.content = null;
    },
    showMenu: function() {
      this.$el.querySelector('.menu').classList.toggle('toggle-menu');
    },
    clearField: function(){
      this.note.title = null;
      this.note.content = null;
    }
  }
};


Vue.component('detail-note',{
  props: ['note'],
  template: `
    <div>
      <div class="modal-topbar">
        <button v-on:click='closeModalNote'><i class="fas fa-chevron-left"></i></button>
        <button><i class="fas fa-edit"></i></button>
      </div>
      <div>
        <input type="text" disabled v-model="note.title" id="" class="note-title">
        <textarea disabled class="note-content" data-autoresize>{{ note.content }}</textarea>
      </div>
    </div>
  `,
  methods: {
    closeModalNote: function(){
      this.$el.classList.remove('show-modal');
    }
  }
});

const NotFound = {
  template: '<p> halaman tidak ditemukan </p>'
};