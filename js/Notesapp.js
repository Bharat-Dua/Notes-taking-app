// add note function
// display notes function
// get notes from storage
// delete notes
// search notes
displayNotes();
function addNote() {
  const addTitle = document.getElementById("noteTitle").value.trim();
  const addTxt = document.getElementById("noteDescription").value.trim();
  if (addTitle === "" || addTxt === "") {
    alert("Please enter both title and description before adding.");
    return;
  }

  const notesObj = getNotesFromStorage();
  const newNote = {
    title: addTitle,
    text: addTxt,
  };
  notesObj.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  displayNotes();
  // Clear input fields after creating a note
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteDescription").value = "";
}

function getNotesFromStorage() {
  const notes = localStorage.getItem("notes") || [];
  return JSON.parse(notes);
}
function displayNotes() {
  const notesObj = getNotesFromStorage();
  console.log(notesObj);
  const notesElem = document.getElementById("notes");
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
      <div class="card my-3 mx-3 noteCard" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button onclick="deleteNotes(${index})" class="btn btn-primary">Delete Note</button>
        </div>
      </div>
    `;
  });

  if (notesObj.length !== 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show here. Click on "Add notes" to show the notes.`;
  }
}
function deleteNotes(index) {
  const notesObj = getNotesFromStorage();
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  displayNotes();
}
function searchNotes() {
  const term = document.getElementById("searchTxt").value.toLowerCase();
  const notesCard = document.getElementsByClassName("noteCard");
  Array.from(notesCard).forEach((element) => {
    const cardTxt = element
      .getElementsByTagName("p")[0]
      .innerText.toLowerCase();
    element.style.display = !cardTxt.includes(term) ? "none" : "block";
  });
}
displayNotes();
// Add event listener for adding a new note

document.getElementById("addBtn").addEventListener("click", addNote);
document.getElementById("searchTxt").addEventListener("input", searchNotes);
