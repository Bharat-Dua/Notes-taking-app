console.log("this is fire");
showNotes();

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  //   console.log(notes);
  showNotes();
});
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
        <div id="notes" class="row container-fluid">
        <div class="card my-3 mx-3 noteCard" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title"> Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button onclick = "deleteNotes(this.id)"  id = "${index}" class="btn btn-primary" >Delete Note </button>
             
          </div>
        </div>
    </div>
        `;
  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show here click on "Add notes" to show the notes`;
  }
}
// Delete function
function deleteNotes(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
