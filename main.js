document.addEventListener('DOMContentLoaded', function() {
  const addForm = document.querySelector(".add");
  const searchInput = document.querySelector('.search input');
  const list = document.querySelector(".todos");
  const addButton = document.querySelector(".custom-btn");

  let editIndex = null;

  // Add or edit todo
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = addForm.add.value.trim();
    
    if (!todoText) return;

    const items = list.children;

    if (editIndex !== null) {
      // Edit existing todo
      const item = items[editIndex];
      item.querySelector("span").textContent = todoText;
      addButton.textContent = "Add Todo";
      editIndex = null;
    } else {
      // Add new todo
      const li = document.createElement("li");
      li.className = "list";
      li.innerHTML = `
        <span>${todoText}</span>
        <div>
          <i class="fas fa-check complete"></i>
          <i class="fas fa-edit edit"></i>
          <i class="far fa-trash-alt delete"></i>
        </div>
      `;
      list.appendChild(li);
    }

    addForm.reset();
  });

  // Handle all todo interactions
  list.addEventListener("click", function(e) {
    const item = e.target.closest(".list");
    if (!item) return;

    // Delete todo
    if (e.target.classList.contains("delete")) {
      item.remove();
      return;
    }

    // Edit todo
    if (e.target.classList.contains("edit")) {
      const text = item.querySelector("span").textContent;
      addForm.add.value = text;
      addButton.textContent = "Edit Todo";
      editIndex = Array.from(list.children).indexOf(item);
      return;
    }

    // Complete todo (click anywhere on the item or the checkmark)
    if (e.target.classList.contains("complete") || e.target === item || e.target === item.querySelector('span')) {
      item.classList.toggle("completed");
    }
  });

  // Search functionality
  searchInput.addEventListener("input", function() {
    const searchTerm = this.value.trim().toLowerCase();
    const allTodos = list.querySelectorAll('.list');
    
    allTodos.forEach(todo => {
      const todoText = todo.querySelector('span').textContent.toLowerCase();
      const isMatch = searchTerm === '' || todoText.includes(searchTerm);
      todo.style.display = isMatch ? 'flex' : 'none';
    });
  });
});