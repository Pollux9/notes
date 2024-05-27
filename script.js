let arrayText = [];
let z = 0;
let noteCount = 0;
let notesList = document.getElementById("notes-list");

showStorage();
function showStorage() {
  let contatore = localStorage.getItem("contoNote");
  for (let i = 0; i < contatore; i++) {
    let noteContainer = document.createElement("div");
    noteContainer.className = "note-container";
    notesList.prepend(noteContainer);

    let note = document.createElement("div");
    note.className = "note";
    noteContainer.appendChild(note);

    let noteLeft = document.createElement("div");
    noteLeft.className = "note-left";
    note.appendChild(noteLeft);

    let noteRight = document.createElement("div");
    noteRight.className = "note-right";
    note.appendChild(noteRight);

    let textarea = document.createElement("textarea");
    textarea.setAttribute("placeholder", "Nota...");
    textarea.className = "textarea";
    noteLeft.appendChild(textarea);
    textarea.innerHTML = localStorage.getItem(`savedText${i}`) || '';

    let saveIcon = document.createElement("i");
    saveIcon.className = "fi fi-rr-disk";
    noteRight.appendChild(saveIcon);

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fi fi-rr-trash";
    noteRight.appendChild(deleteIcon);

    noteCount = contatore;

    noteRight.addEventListener("click", function(e) {
      if (e.target.className === "fi fi-rr-disk") {
        window.alert("Nota salvata");
        localStorage.setItem(`savedText${i}`, textarea.value);
      } else if (e.target.className === "fi fi-rr-trash") {
        noteCount--;
        localStorage.removeItem(`savedText${i}`);
        if(noteCount == 0){
          localStorage.clear();
        }
        console.log(noteCount);
        localStorage.setItem("contoNote", noteCount);
        e.target.parentElement.parentElement.parentElement.remove();
      }
    });
  }
}

const createBtn = document.getElementById("create-btn");
createBtn.addEventListener("click", () => {

  noteCount++;
  console.log(noteCount);
  localStorage.setItem("contoNote", noteCount);

  let noteContainer = document.createElement("div");
  noteContainer.className = "note-container";
  notesList.prepend(noteContainer);

  let note = document.createElement("div");
  note.className = "note";
  noteContainer.appendChild(note);

  let noteLeft = document.createElement("div");
  noteLeft.className = "note-left";
  note.appendChild(noteLeft);

  let noteRight = document.createElement("div");
  noteRight.className = "note-right";
  note.appendChild(noteRight);

  let textarea = document.createElement("textarea");
  textarea.setAttribute("placeholder", "Nota...");
  textarea.className = "textarea";
  noteLeft.appendChild(textarea);

  let saveIcon = document.createElement("i");
  saveIcon.className = "fi fi-rr-disk";
  noteRight.appendChild(saveIcon);

  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fi fi-rr-trash";
  noteRight.appendChild(deleteIcon);

  noteRight.addEventListener("click", function(e) {
    if (e.target.className === "fi fi-rr-disk") {
      window.alert("Nota salvata");
      localStorage.setItem(`savedText${noteCount-1}`, textarea.value);
    } else if (e.target.className === "fi fi-rr-trash") {
      noteCount--;
      localStorage.removeItem(`savedText${i}`);
      for (let j = i + 1; j < contatore; j++) {
        const currentNote = localStorage.getItem(`savedText${j}`);
        localStorage.setItem(`savedText${j - 1}`, currentNote);
      }
      localStorage.removeItem(`savedText${contatore - 1}`);
      localStorage.setItem("contoNote", contatore - 1); 
      if(noteCount == 0){
        localStorage.clear();
      }
      console.log(noteCount);
      localStorage.setItem("contoNote", noteCount);
      e.target.parentElement.parentElement.parentElement.remove();
    }
  });
});