#!/usr/bin/node

// 1. Elementləri seçirik (Selection)
const addBtn = document.getElementById('add-btn');
const inputField = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear-all');

/**
 * Yeni tapşırıq əlavə edən funksiya
 */
function addItem() {
  const text = inputField.value;

  // Boşluq yoxlaması (Condition)
  if (text.trim() === '') {
    alert('Please enter a task!');
    return;
  }

  // A. Yeni 'li' elementi yaradırıq
  const li = document.createElement('li');
  
  // B. Tapşırıq mətnini daxil edirik
  const taskText = document.createElement('span');
  taskText.textContent = text;
  li.appendChild(taskText);

  // C. Üstündən xətt çəkmə funksiyası (Toggle completion)
  taskText.addEventListener('click', function () {
    if (taskText.style.textDecoration === 'line-through') {
      taskText.style.textDecoration = 'none';
      li.style.opacity = '1';
    } else {
      taskText.style.textDecoration = 'line-through';
      li.style.opacity = '0.5';
    }
  });

  // D. "Sil" (Delete) düyməsini yaradırıq
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn');
  
  // E. Silmə hadisəsini əlavə edirik
  deleteBtn.addEventListener('click', function () {
    li.remove();
  });

  // F. Düyməni 'li'-yə, 'li'-ni isə siyahıya əlavə edirik
  li.appendChild(deleteBtn);
  itemList.appendChild(li);

  // İnputu təmizləyirik
  inputField.value = '';
}

// 2. Düymələrə hadisə dinləyicisi (Event Listeners) əlavə edirik
addBtn.addEventListener('click', addItem);

// "Enter" düyməsi ilə əlavə etmək üçün
inputField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addItem();
  }
});

// Bütün siyahını təmizləmək
clearBtn.addEventListener('click', function () {
  if (confirm('Are you sure you want to clear all tasks?')) {
    itemList.innerHTML = '';
  }
});