"use strict";

const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector(".btn-clear");
const itemFilter = document.querySelector(".form-input-filter");

// local storage item name
const nameOfShoppingList = "my_shopping_list";

function displayItems() {
  const itemsToDisplay = getItemsFromStorage(nameOfShoppingList);
  itemsToDisplay.forEach((item) => {
    createNewDomItem(item);
  });

  // check amount of items gt zero
  checkUI();
}

function addItem(event) {
  // prevent sending form action
  event.preventDefault();

  // input field for item
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // create new Item as DOM Element
  createNewDomItem(newItem);

  // add item to local storage
  addItemToStorage(newItem);

  // check UI for amount of items in the list
  checkUI();

  // reset input field for item
  itemInput.value = "";
}

function createNewDomItem(newItem) {
  const itemName = document.createTextNode(newItem);
  const liElement = createAnotherElement("li", null);
  liElement.appendChild(itemName);
  const btnElement = createButton("remove-item btn-link text-red");
  const iconElement = createIcon("fa-solid fa-xmark");
  btnElement.append(iconElement);
  liElement.appendChild(btnElement);
  itemList.appendChild(liElement);
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
  const hasItems = document.querySelector("#item-list li") !== null;
  const displayValue = hasItems ? "block" : "none";
  clearBtn.style.display = displayValue;
  itemFilter.style.display = displayValue;
}

function filterItems(event) {
  const text = event.target.value.toLowerCase();
  document.querySelectorAll("#item-list li").forEach((item) => {
    const itemName = item.textContent.toLowerCase();
    item.style.display = itemName.includes(text) ? "flex" : "none";
  });
}

function addItemToStorage(newItem) {
  const shoppingList = getItemsFromStorage(nameOfShoppingList);
  shoppingList.push(newItem);
  localStorage.setItem(nameOfShoppingList, JSON.stringify(shoppingList));
}

function getItemsFromStorage(key) {
  if (typeof key !== "string") {
    throw new Error("The key must be a string");
  }
  return JSON.parse(localStorage.getItem(key)) || [];
}

function init() {
  // initial load when DOM is loaded
  // Event-Listeners
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
}

init();
