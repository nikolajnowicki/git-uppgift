export class ToBuy {
  constructor(public name: string, public done: boolean) {}
}

const addBtn = document.getElementById("add-button") as HTMLButtonElement;
const shopField = document.getElementById("name") as HTMLInputElement;
const listContainer = document.getElementById("list") as HTMLElement;

let list: ToBuy[] = [];

const savedList = localStorage.getItem("shoppingList");
if (savedList) {
  list = JSON.parse(savedList);
  renderList();
}

addBtn.addEventListener("click", () => {
  const itemName = shopField.value.trim();
  if (itemName !== "") {
    list.push(new ToBuy(itemName, false));
    saveList();
    renderList();
    shopField.value = "";
  }
});

export function renderList() {
  listContainer.innerHTML = "";
  const completedItems: ToBuy[] = [];
  const incompleteItems: ToBuy[] = [];
  for (const item of list) {
    if (item.done) {
      completedItems.push(item);
    } else {
      incompleteItems.push(item);
    }
  }
  const sortedList = incompleteItems.concat(completedItems);
  for (const item of sortedList) {
    const listItem = document.createElement("li");
    listItem.classList.add("shopping-item"); // add the class name "shopping-item"
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.done;
    checkbox.addEventListener("change", () => {
      item.done = checkbox.checked;
      saveList();
      renderList();
    });
    const label = document.createElement("label");
    label.textContent = item.name;
    if (item.done) {
      listItem.classList.add("done");
    }
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.addEventListener("click", () => {
      toggleItem(item);
      saveList();
      renderList();
    });
    listContainer.appendChild(listItem);
  }
}

export function toggleItem(item: ToBuy) {
  if (item.done) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  } else {
    item.done = true;
  }
}

export function saveList() {
  localStorage.setItem("shoppingList", JSON.stringify(list));
}
