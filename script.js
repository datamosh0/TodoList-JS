const completeBtn = document.getElementsByClassName("complete");
const removeBtn = document.getElementsByClassName("remove");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const modalInsert = document.querySelector(".modalContent");
const modalInput = document.querySelector(".modalInput");
const code = document.getElementsByTagName("code");
const cancelBtn = document.querySelector(".cancelBtn");
const textId = document.getElementsByClassName("todoTxt");
const error = document.querySelector(".error");
const todos = document.querySelector(".todos");
const inputMsg = document.querySelector(".inputMsg");
const todo = document.getElementsByClassName("todo");

const completeLogic = (e) => {
  if (
    !e.target.parentElement.parentElement
      .querySelector(".todoTxt")
      .classList.contains("crossOut")
  ) {
    e.target.parentElement.parentElement
      .querySelector(".todoTxt")
      .classList.add("crossOut");
  } else {
    e.target.parentElement.parentElement
      .querySelector(".todoTxt")
      .classList.remove("crossOut");
  }
};

const removeLogic = (e) => {
  if (modal.classList.contains("hidden")) modal.classList.remove("hidden");
  let str =
    e.target.parentElement.parentElement.querySelector(".todoTxt").innerText;

  modalInsert.insertAdjacentHTML(
    "afterbegin",
    `<code class="code" id="${str}">Type "${str}"</code>`
  );
};

for (let i = 0; i < completeBtn.length; i++) {
  completeBtn[i].addEventListener("click", function (e) {
    completeLogic(e);
  });
}

for (let i = 0; i < removeBtn.length; i++) {
  removeBtn[i].addEventListener("click", function (e) {
    removeLogic(e);
  });
}

const closeModal = () => {
  modal.classList.add("hidden");
  modal.querySelector(".code").remove();
  modalInput.value = "";
  if (error) error.remove();
};

closeBtn.addEventListener("click", function () {
  closeModal();
});

inputMsg.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    addItem();
  }
});

modalInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    cancelBtn.onclick();
  }
});

const checkCancel = () => {
  let input = modalInput.value;
  let todoCode = code[0].id;
  let foundEl = "";
  for (let i = 0; i < textId.length; i++) {
    if (textId[i].textContent == todoCode) foundEl = textId[i].parentElement;
  }
  let todosList = JSON.parse(localStorage.getItem("todosList"));

  if (input == todoCode) {
    const index = todosList.indexOf(todoCode);
    if (index > -1) {
      todosList.splice(index, 1);
    }
    localStorage.setItem("todosList", JSON.stringify(todosList));

    foundEl.remove();
    closeModal();
  } else {
    modalInsert.insertAdjacentHTML(
      "beforeend",
      "<div class='error'>Incorrect</div>"
    );
  }
};

const addItem = () => {
  let str = inputMsg.value;
  if (str == "") return;
  todos.insertAdjacentHTML(
    "afterbegin",
    `<span class="todo">
  <div class="todoTxt">${str}</div>
  <div class="buttons">
    <image
      src="svgs/todo-done-svgrepo-com.svg"
      class="complete"
    ></image>
    <image src="svgs/remove-svgrepo-com.svg" class="remove"></image>
  </div>
</span>`
  );
  inputMsg.value = "";
  let newBtn1 = todo[0].children[1].children[0];
  let newBtn2 = todo[0].children[1].children[1];
  newBtn1.addEventListener("click", function (e) {
    completeLogic(e);
  });
  newBtn2.addEventListener("click", function (e) {
    removeLogic(e);
  });
  let index = todos.children.length;

  let todosList = JSON.parse(localStorage.getItem("todosList"));
  todosList.push(str);
  localStorage.setItem("todosList", JSON.stringify(todosList));
};

const insertLocallyStored = () => {
  let todosList = JSON.parse(localStorage.getItem(`todosList`));
  for (let i = 0; i < todosList.length; i++) {
    todos.insertAdjacentHTML(
      "afterbegin",
      `<span class="todo" id=${i}>
    <div class="todoTxt">${todosList[i]}</div>
    <div class="buttons">
      <image
        src="svgs/todo-done-svgrepo-com.svg"
        class="complete"
      ></image>
      <image src="svgs/remove-svgrepo-com.svg" class="remove"></image>
    </div>
  </span>`
    );
    inputMsg.value = "";
    let newBtn1 = todo[0].children[1].children[0];
    let newBtn2 = todo[0].children[1].children[1];
    newBtn1.addEventListener("click", function (e) {
      completeLogic(e);
    });
    newBtn2.addEventListener("click", function (e) {
      removeLogic(e);
    });
  }
};
insertLocallyStored();
