// Initialize Firebase
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDUdWZoymDbBVeyOb2OZ_ODtEfvRY9K49U",
    authDomain: "note-pad-94bfe.firebaseapp.com",
    databaseURL: "https://note-pad-94bfe.firebaseio.com",
    projectId: "note-pad-94bfe",
    storageBucket: "note-pad-94bfe.appspot.com",
    messagingSenderId: "499106226086",
    appId: "1:499106226086:web:468d4c548c8e6e88c57967",
    measurementId: "G-SGBB9RZCNE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
//
// db.collection('memo').get().then((snapshot) => {
//  console.log(snapshot.docs);
// });

db.collection('memo').get().then((snapshot) => {
 console.log(snapshot.docs);
 snapshot.docs.forEach(doc => {
  console.log(doc.data())
 })
});

const memoList = document.querySelector("#memo-list");
const form = document.querySelector("#add-memo-form");
//this is where we grab the form, fill in data into the form.
//listen for a submit event and then fire off the data to firestore.
function renderMemo(doc) {
 //diff elements
 let li = document.createElement("li");
 let name = document.createElement("span");
 let desc = document.createElement("span");
 // let edit = document.createElement("div");
 let edit = document.createElement("button");
 edit.appendChild(document.createTextNode("update"));
  edit.className += "editClass";
 li.appendChild(edit);
   let cross = document.createElement("div");

// This line of code below attaches "data-id" to add the Auto ID   firebase will generate.
// we are doing this so that in future we can easily get a particular doc and manipulate it.
 li.setAttribute("data-id", doc.id);
 name.textContent = doc.data().name;
 desc.textContent = doc.data().desc;
 // edit.textContent = "edit";
 cross.textContent = "x";
 li.appendChild(name);
 li.appendChild(desc);
 // li.appendChild(edit);
 li.appendChild(cross);
 memoList.appendChild(li);
}

//saving data
form.addEventListener("submit", e => {
 e.preventDefault();
 db.collection("memo").add({
  name: form.name.value,
  desc: form.desc.value
 });
 form.name.value = "";
 form.desc.value = "";
});


//to delete
function renderMemo(doc) {
 let li = document.createElement("li");
 let name = document.createElement("span");
 let desc = document.createElement("span");
  // let edit = document.createElement("div");
  let edit = document.createElement("button");
  edit.appendChild(document.createTextNode("update"));
    edit.className += "editClass";
  li.appendChild(edit);
 let cross = document.createElement("div");

 li.setAttribute("data-id", doc.id);
 name.textContent = doc.data().name;
 desc.textContent = doc.data().desc;
 edit.textContent = "update";
 cross.textContent = "x";
 li.appendChild(name);
 li.appendChild(desc);
 li.appendChild(edit);
 li.appendChild(cross);
 memoList.appendChild(li);

// editing input
// edit.addEventListener('click', () => this.edit(desc));

  edit.addEventListener('click', (ev) => {
  let field = ev.target;
  field.contentEditable = field.contentEditable === true ? false: true;
});

// edit(li){
//   li.disable = !li.disabled;
// }

// deleting data
cross.addEventListener("click", e => {
 e.stopPropagation();
 let id = e.target.parentElement.getAttribute("data-id");
//find a doc on the dom
 db.collection("memo")
 .doc(id)
 .delete();
 });


}

//  real time listener
db.collection("memo")
.orderBy("desc")
.onSnapshot(snapshot => {
// We also rendered data in real-time using
 let changes = snapshot.docChanges();
 changes.forEach(change => {
  if (change.type == "added") {
  renderMemo(change.doc);
 } else if (change.type == "removed") {
 let li = memoList.querySelector("[data-id=" + change.doc.id + "]");
 memoList.removeChild(li);
  }
 });
});

// edit.addEventListener('click', () => this.edit(input));
