import { postUser } from "./getURL.js";
export function addUser(event) {
    const users = JSON.parse(window.localStorage.getItem("users"));
    event.preventDefault();
    const onlyInputs = document.querySelectorAll('form input');
    const newUser = {};
    newUser.id = users[users.length - 1].id + 1
    const newUserCompanyInfo = {};
    const requeste = document.querySelector(".success");
    const newUserAddressInfo = {};
    let state = true;
    onlyInputs.forEach(info => {
        if (info.value.trim() == "") {
            state = false;
            info.style.border = "red solid 1px";
            const warning = document.querySelector(".missed-place");
            warning.innerHTML = "<p>There are missing places, please correct them</p>"
        }else if (info.type == "email") {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.value)) {
                return true;
            } else {
                info.title="Please enter a valid email address";
                info.style.border = "red solid 1px";
                state = false;
            }
        } 
        else {
            info.style.border = "#000 solid 1px";
        }
    })
    onlyInputs.forEach(info => {
        let key = info.placeholder.toLowerCase();
        if (info.placeholder == "Catch Phrase") {
            key = "catchPhrase";
        }
        users.forEach(user => {
                if (user.username === info.value && key === "username") {
                    requeste.innerHTML = `
                        <img src="./Assets/cross.png">
                        <p>Have already registered with this username</p>
                    `;
                    const loading = document.querySelector(".loading");
                    loading.style.display = "flex";
                    setTimeout(() => {
                        loading.style.display = "none";
                    }, "6000");
                    info.style.border = "red solid 1px";
                    state = false;
                    return;
                } else if (user.phone === info.value && key === "phone" && state) {
                    requeste.innerHTML = `
                        <img src="./Assets/cross.png">
                        <p>Have already registered with this phone</p>
                    `;
                    const loading = document.querySelector(".loading");
                    loading.style.display = "flex";
                    setTimeout(() => {
                        loading.style.display = "none";
                    }, "6000");
                    info.style.border = "red solid 1px";
                    state = false;
                } else if (user.email === info.value && key === "email" && state) {
                    requeste.innerHTML = `
                        <img src="./Assets/cross.png">
                        <p>Have already registered with this email</p>
                    `;
                    const loading = document.querySelector(".loading");
                    loading.style.display = "flex";
                    setTimeout(() => {
                        loading.style.display = "none";
                    }, "6000");
                    info.style.border = "red solid 1px";
                    state = false;
                } else if (user.website === info.value && key === "website" && state) {
                    requeste.innerHTML = `
                        <img src="./Assets/cross.png">
                        <p>Have already registered with this website</p>
                    `;
                    const loading = document.querySelector(".loading");
                    loading.style.display = "flex";
                    setTimeout(() => {
                        loading.style.display = "none";
                    }, "6000");
                    info.style.border = "red solid 1px";
                    state = false;
                }
        })
    })
        if (state) {
            requeste.innerHTML = `
                        <img src="./Assets/free-icon-check-mark-5299035.png">
                        <p>Your request has been sent, if everything goes well, it will be posted</p>
                    `;
            onlyInputs.forEach(info => {
                info.style.border = "black solid 1px";
                let key = info.placeholder.toLowerCase();
                if (info.placeholder == "Catch Phrase") {
                    key = "catchPhrase";
                }
            info.style.border = "#000 solid 1px";
            const warning = document.querySelector(".missed-place");
            warning.innerHTML = "";
            if (info.id == "company") {
                newUserCompanyInfo[key] = info.value.trim();
                newUser["company"] = newUserCompanyInfo;
            } else if(info.id == "address") {
                newUserAddressInfo[key] = info.value.trim();
                newUser["address"] = newUserAddressInfo;
            } else {
                newUser[key] = info.value.trim();
            }
        })
            const loading = document.querySelector(".loading");
            loading.style.display = "flex";
            setTimeout(() => {
                loading.style.display = "none";
            }, "6000");
        postUser(newUser)
        } 
}

