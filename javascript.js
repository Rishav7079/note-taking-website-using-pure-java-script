console.log("hello i am project");
showNotes();
let btn = document.getElementById("addBtn");
btn.addEventListener("click", function () {
  let lsnotes = localStorage.getItem("lsnotes");
  let textintextarea = document.getElementById("addTxt");
  let noteTitle = document.getElementById("noteTitle");
  if (lsnotes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(lsnotes);
  }
  myObj = {
    title: noteTitle.value,
    notetxt: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("lsnotes", JSON.stringify(notesObj));
  textintextarea.value = "";
  noteTitle.value = "";
  // console.log(notesObj);
  showNotes();
});
function showNotes() {
  let lsnotes = localStorage.getItem("lsnotes");
  if (lsnotes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(lsnotes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class="card-text"  > ${element.notetxt}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let divNotes = document.getElementById("notes");
  if (notesObj.length != 0) {
    divNotes.innerHTML = html;
  } else {
    divNotes.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

function deleteNote(index) {
  let lsnotes = localStorage.getItem("lsnotes");
  if (lsnotes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(lsnotes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("lsnotes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputval = search.value;
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(inputval)) {
      element.style.display = "block";
      // console.log(cardTxt);
    } else {
      element.style.display = "none";
    }
  });
  // console.log(inputval);
});
