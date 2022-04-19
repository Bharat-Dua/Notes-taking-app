// This is notes taking app which does it takes the notes from your local Storage and display it which is you can easily Add,delete,search notes
// Display all the notes
showNotes();
// Add note button
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    // it's checking the condition that if there is any  notes in local storage
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
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
            <h5 class="card-title">  ${element.title}</h5>
            <p class="card-text">${element.text}</p>
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
// Search function
let search = document.getElementById("searchTxt");
search.addEventListener("input", () => {
  let inputVal = search.value.toLowerCase();
  let notesCard = document.getElementsByClassName("noteCard");
  Array.from(notesCard).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
