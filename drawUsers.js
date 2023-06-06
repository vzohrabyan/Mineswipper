import { deleteUser } from "./deleteUser.js";
export function drawUsers () {
    const users = JSON.parse(window.localStorage.getItem("users"));
    document.querySelectorAll("input").forEach(input => {
        input.value = ""
    })
    const users_parent = document.querySelector(".users");
    users_parent.innerHTML = "";
    let cardColor = 0;
    users.forEach(user => {
        const user_container = document.createElement("div");
        user_container.classList = `user`;
        if (cardColor > 9) {
            cardColor = 0;
        }
        user_container.innerHTML = `
        <div class="front-part">
            <div class="contents searchedCard-${user.id}  card-${++cardColor}">
                <div class="picture"><img src="./Assets/user.png"></div>
                <h1>${user.name}</h1>
                <h4>UserName: ${user.username}</h4>
            </div>
        </div>
        <div class="back-part">
            <div class="contents searchedCard-${user.id} card-${cardColor}">
                <div class="delete-button" id="${user.id}"><img src="./Assets/close.png"></div>
                <div class="address-info">
                    <h3>Address</h3>
                    <p><b>City:</b> ${user.address.city}</p>
                    <p><b>Street:</b> ${user.address.street}</p>
                    <p><b>Suite:</b> ${user.address.suite}</p>
                </div>
                <div class="company-info">
                    <h3>Company</h3>
                    <p><b>Name:</b> ${user.company.name}</p>
                    <p><b>Catch Phrase:</b> ${user.company.catchPhrase}</p>
                    <p><b>BS:</b> ${user.company.bs}</p>
                </div>
                <div class="contacts-info">
                    <div class="email"><img src="./Assets/email.png"><span>${user.email}</span></div>
                    <div class="phone"><img src="./Assets/phone.png"><span>${user.phone}</span></div>
                    <div class="website"><img src="./Assets/globe.png"><a href=${"http://" + user.website}>${user.website}</a></div>
                </div>
            </div>
        </div>      
        `
        users_parent.appendChild(user_container);
    });  
    const deleteButton = document.querySelectorAll(".delete-button");
    deleteButton.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {
            document.querySelector(".delete").style.display = "flex";
            document.querySelector(".no-button").addEventListener("click", () => {
                document.querySelector(".delete").style.display = "none";
                return;
            });
            document.querySelector(".yes-button").addEventListener("click", () => {
                document.querySelector(".delete").style.display = "none";
                deleteUser(deleteButton.id);
            })
        });
    })
} 
    
    