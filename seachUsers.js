export function searchUsers () {
    const users = JSON.parse(window.localStorage.getItem("users"));
    console.log(users);
    const allUsers = document.querySelectorAll(".user");
    document.querySelector(".not-found").style.display = "none";
    allUsers.forEach(user => {
        user.style.display = "none";
    })
    const wrong = document.querySelector('.warning');
    const userInput = document.querySelector(".search-input");
    const value = userInput.value.trim();
    const trimedInput = value.toLowerCase().split(' ').join('');
    if (!value) {
      userInput.style.border = "1px solid red";
      wrong.style.display = "block";
    } else {
        wrong.style.display = "none";
        userInput.style.border = "1px solid #000";
    }
    let notFound = true;
    users.forEach(user => {
        const trimedUser = user.name.toLowerCase().split(' ').join('');
        const trimedUsername = user.username.toLowerCase().split(' ').join('');
        if(trimedUser.includes(trimedInput.toLowerCase()) || trimedUsername.includes(trimedInput.toLowerCase())) {
            const foundedUser = document.querySelector(`.searchedCard-${user.id}`);
            document.querySelector(".reload").style.display = "block";
            foundedUser.parentNode.parentNode.style.display = "block";
            notFound = false;
        } 
      });
      if (notFound) {
            document.querySelector(".reload").style.display = "block";
            document.querySelector(".not-found").style.display = "block";      
      }
}

