#!/usr/bin/node

// 1. Variables (let & const - no var!)
const addBtn = document.getElementById('add-btn');
const inputField = document.querySelector('#item-input');
const list = document.querySelector('#item-list');

// 2. The Logic: Function to add a new item
function addItem() {
    const value = inputField.value;

    if (value.trim() !== "") {
        // Create an element
        const li = document.createElement('li');
        li.textContent = value;

        // Add to the DOM
        list.appendChild(li);

        // Clear input
        inputField.value = "";
    } else {
        alert("Please write something first!");
    }
}

// 3. Event Listener (The 'Action')
addBtn.addEventListener('click', addItem);