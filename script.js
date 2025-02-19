"use strict";

const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector(".btn-clear");
const itemFilter = document.querySelector(".form-input-filter");

function addItem(event) {
  // prevent sending form action
  event.preventDefault();

  // input field for item
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // create new Item
  const itemName = document.createTextNode(newItem);
  const liElement = createAnotherElement("li", null);
  liElement.appendChild(itemName);
  const btnElement = createButton("remove-item btn-link text-red");
  const iconElement = createIcon("fa-solid fa-xmark");
  btnElement.append(iconElement);
  liElement.appendChild(btnElement);
  itemList.appendChild(liElement);

  // set item to local storage
  setToLocalStorage(newItem, liElement);
  console.log(itemList.innerHTML);

  // reset input field for item
  itemInput.value = "";

  // check UI for amount of items in the list
  checkUI();
}

function createIcon(className) {
  const icon = document.createElement("icon");
  icon.className = className;
  return icon;
}

function createButton(className) {
  const btn = document.createElement("button");
  btn.className = className;
  return btn;
}

function createAnotherElement(elementName, className) {
  let element;
  if (elementName) {
    element = document.createElement(elementName);
  }
  if (className) {
    element.className = className;
  }
  return element;
}

function createIcon(className) {
  const icon = document.createElement("icon");
  icon.className = className;
  return icon;
}

function removeItem(event) {
  const clickedElement = event.target.parentElement;
  if (clickedElement.classList.contains("remove-item")) {
    // confirm is a window method
    if (confirm("Are you shure?")) {
      clickedElement.parentElement.remove();
    }
  }

  // check UI for amount of items in the list
  checkUI();
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // check UI for amount of items in the list
  checkUI();
}

function checkUI() {
  // It´s neccessary to check here in the local scope (every time)
  if (document.querySelectorAll("#item-list li").length > 0) {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  } else {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  }
}

function filterItems(event) {
  const text = event.target.value.toLowerCase();
  const shoppingItems = document.querySelectorAll("#item-list li");
  shoppingItems.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function setToLocalStorage(key, value) {
  if (value && key && typeof key === "string") {
    const stringifiedItem = JSON.stringify(value);
    localStorage.setItem(key, stringifiedItem);
    console.info(`write ${stringifiedItem} to local storage`);
  } else {
    console.info("Please try again with correct key-value pair");
  }
}

function getFromLocalStorage(getItem) {
  let parsedItem;
  if (getItem && typeof itemToStore === "string") {
    const itemFromStorage = localStorage.getItem(getItem);
    parsedItem = JSON.parse(itemFromStorage);
  } else {
    throw Error("Please try to get an item");
  }
  return parsedItem;
}

// Event-Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
