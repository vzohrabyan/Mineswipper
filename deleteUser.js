import { delUser } from "./getURL.js";
export function deleteUser (cardNum) {
    const users = JSON.parse(window.localStorage.getItem("users"));
    const  updatedUsers = users.filter(user => {
        return user.id != cardNum;
    });
    const  deletedUser = users.filter(user => {
        return user.id == cardNum;
    });
    delUser(updatedUsers, deletedUser);
}