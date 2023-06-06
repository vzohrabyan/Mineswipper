import { drawUsers } from "./drawUsers.js";
import { searchUsers } from "./seachUsers.js";
import { addUser } from "./addUsers.js";
const url = "https://jsonplaceholder.typicode.com";
export async function postUser(user) {
    try {
        await fetch(`${url}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          const users = JSON.parse(window.localStorage.getItem("users"));
          users.push(user);
          window.localStorage.setItem("users", JSON.stringify(users));
      } catch (error) {
        throw new Error(error)
    }
    drawUsers()
}
export async function delUser(users, user) {
  try {
      await fetch(`${url}/users/${user.id}`, {
          method: "DELETE",
        });
        window.localStorage.setItem("users", JSON.stringify(users));
        drawUsers();
    } catch (error) {
      throw new Error(error)
  }
}
async function getUsers (data) {
    try {
        const response = await fetch(`${url}/users`, {
            method: "GET"
        });
        if (data) {
          data = await response.json();
          window.localStorage.setItem("users", JSON.stringify(data));
          drawUsers()
        } else {
          drawUsers();

        }
    } catch (error) {
      throw new Error(error)
  }
}

document.querySelector(".search").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchUsers()
    }
  });

document.querySelector(".search-button").addEventListener("click", () => {
    searchUsers()
  });

document.querySelector(".add-button").addEventListener("click", (event) => {
    addUser(event)
  });


getUsers();