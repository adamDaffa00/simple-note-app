// note class
class Note {
  constructor(title, content){
    this.title = title;
    this.content = content;
  }
}

// note localStorage
function getNote(key){
  let notes;
  if(localStorage.getItem(key) == null){
    notes = [];
  }else{
    notes = JSON.parse(localStorage.getItem(key));
  }
  return notes;
}

function addLocalNotes(note,key){
  const notes = getNote(key);
  notes.push(note);
  localStorage.setItem(key,JSON.stringify(notes));
}

function removeNote(title,key){
  let notes = getNote(key);
  notes.forEach((item,index) => {
    if(title == item.title ){
      notes.splice(index,1);
    }
  });
  localStorage.setItem(key,JSON.stringify(notes));
}