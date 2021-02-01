// - Дана textarea.
// В неё вводится текст.
// Сделайте так, чтобы после захода на эту страницу через некоторое время, введенный текст остался в textarea.

// let txt = document.getElementById("txt");

// txt.oninput = (ev) => {
//    localStorage.setItem("key", ev.target.value);
// }
// txt.value = localStorage.getItem("key");


// - Дана форма с инпутами, текстареа, чекбоксами, радио кнопочками, селектами и тп.
// Пользователь вводит какие-то данные и закрывает страницу (не факт, что он заполнил всю форму).
// Сделайте так, чтобы при следующем заходе на страницу введенные им ранее данные стояли на своих местах.
// Сделайте ваш скрипт как можно более универсальным.

// const form = document.getElementById("form");

// saveNewValue(form);
// function save(form) {
//    saveToStorage(form);
// }

// function saveToStorage(form) {
//    for (let i = 0; i < form.length; i++) {
//       const element = form[i];
//       if (element.type === "checkbox"||element.type === "radio") {
//          if (element.checked) {
//             element.value = "true"
//          } else {
//             element.value = "false"
//          }
//       }
//       localStorage.setItem(element.id, element.value);
//    }
// }


// function saveNewValue() {
//    for (let i = 0; i < localStorage.length; i++) {
//       let element = form[i];
//       form[i].value = localStorage.getItem(element.id);
//       if (element.value === "true") {
//             form[i].checked = 'chek';
//             console.log(form[i].checked );
//       }  
//    }
// }


// -Дан текстареа. В него можно ввести данные, нажать кнопку сохранить и они фикисруются (в хранилище), затем поредактировать их, затем еще поредактировать и возможно еще.....
// Требование  хранить историю своих изменений (даже после перезагрузки страницы).
// Сверху над текстареа должны появится стрелочки, с помощью которых можно перемещаться по истории (не забудьте!чекпоинт истории - нажатеи кнопки сохранить).

// let txt = document.getElementById("txt");
// let left = document.getElementById("left");
// let right = document.getElementById("right");
// let save = document.getElementById("save");

// save.onclick = function () {
//    localStorage.setItem(localStorage.length + 1, txt.value)
// }

// left.onclick = function () {
//    let index;
//    for (const key in localStorage) {
//       if (localStorage.getItem(key) === txt.value) {
//          index = key;
//       }
//    }
//    if (index > 1) {
//       txt.value = localStorage.getItem(index - 1);
//    }
// }

// right.onclick = function () {
//    let index;
//    for (const key in localStorage) {
//       if (localStorage.getItem(key) === txt.value) {
//          index = key;
//       }
//    }
//    if (index<localStorage.length) { 
//       txt.value = localStorage.getItem(+index + 1);
//    }
// }



// - Реализуйте записную книгу, хранящую данные в локальном хранилище.
// Данные которые надо сохранять  ФИО, номер, почта, фирма, отдел, день рождения
// Данные вводить через соответсвующую форму.
// --Каждому контакту добавить кнопку для удаления контакта.
// --Каждому контакту добавить кнопку редактироваиня. При нажати на нее появляется форма, в которой есть все необходимые инпуты для редактирования, которые уже заполнены данными объекта

const form = document.forms.form;
const content = document.getElementById("content");
let masUser = {};

form.save.onclick = function (ev) {
   // ev.preventDefault();
   let userr = {...masUser};
   masUser = {};
   for (let i = 0; i < form.length; i++) {
      const element = form[i];
      if (element.name&&element.type !== "submit") {
         userr[element.name] = element.value;
      }
   }
   if (!userr.id) {
      userr.id = new Date().getTime();
   }
   saveToLokalStoreag(userr);
}

function saveToLokalStoreag(user) {
   if (localStorage.hasOwnProperty("USER_ARR")) {
      const storejUser = JSON.parse(localStorage.getItem("USER_ARR"));
      const find = storejUser.find((value) => {return value.id === user.id});
      if (find) {
         const filter = storejUser.filter((value) => { return value.id !== user.id });
         filter.push(user);
         localStorage.setItem("USER_ARR", JSON.stringify(filter));
      } else {
         storejUser.push(user);
         localStorage.setItem("USER_ARR",JSON.stringify(storejUser));
      }
   } else {
      localStorage.setItem("USER_ARR",JSON.stringify([user]));
   }
}
getUsetToLocalstoreg();
function getUsetToLocalstoreg() {
   if (localStorage.hasOwnProperty("USER_ARR")) {
      let users = JSON.parse(localStorage.getItem("USER_ARR"));
      for (const user of users) {
         createBlockUser(user);
      }
   }
}
function createBlockUser(user) {
   let cart = document.createElement("div");
   content.appendChild(cart);
   let flag = true;
   for (const key in user) {
      if (flag === true) {         
         let name = document.createElement("h3");
         name.innerText = key + " : " + user[key];
         cart.appendChild(name);
         flag = false;
      } else {
         let param = document.createElement("p");
         param.innerText = key + " : " + user[key];
         cart.appendChild(param);
      }
   }
   cart.style = "width: 300px; border: 1px solid green; float: left"
   let btn1 = document.createElement("button");
   btn1.innerText = "Edit";
   let btn2 = document.createElement("button");
   btn2.innerText = "Delete";

   btn1.onclick = function () {
      editUser(user.id);
   }
   btn2.onclick = function () {
      deleteUser(user.id);
   }
   cart.appendChild(btn1);
   cart.appendChild(btn2);

   return cart;
}

function deleteUser(id) {
   let resultArr = JSON.parse(localStorage.getItem("USER_ARR"));
   let filter = resultArr.filter((user) => { return user.id !== id });
   localStorage.setItem("USER_ARR", JSON.stringify(filter));
   location.reload();
}
function editUser(id) {
   let resultArr = JSON.parse(localStorage.getItem("USER_ARR"));
   let user = resultArr.find((user) => { return user.id === id });
   for (let i = 0; i < form.length; i++) {
      const element = form[i];
      if (element.name&&element.type !== "submit") {
         for (const key in user) {
            if (element.name === key) {
               element.value = user[key];
            }
         }
      }
   }
   masUser = user;
}