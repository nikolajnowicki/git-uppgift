import { ToBuy } from "./models/ListItem";

const addBtn = document.getElementById("add-button") as HTMLButtonElement;
const shopField = document.getElementById("name") as HTMLInputElement;
const listContainer = document.getElementById("list") as HTMLElement;

let list: ToBuy[] = [];
