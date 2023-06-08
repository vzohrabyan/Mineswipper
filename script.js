class Minesweeper {
    constructor() {
        this.state = {
            board: []
        };
        this.minute = 0;
        this.second = 0;
        if (!window.localStorage.getItem("recordEasy")
            || !window.localStorage.getItem("recordMedium")
            || !window.localStorage.getItem("recordHard")
            || !window.localStorage.getItem("recordExtreme")
            || !window.localStorage.getItem("recordCustom")
        ) {
            this.recordEasy = window.localStorage.setItem("recordEasy", 0);
            this.recordMedium = window.localStorage.setItem("recordMedium", 0);
            this.recordHard = window.localStorage.setItem("recordHard", 0);
            this.recordExtreme = window.localStorage.setItem("recordExtreme", 0);
            this.recordCustom = window.localStorage.setItem("recordCustom", 0);
        } else {            
            this.recordEasy = window.localStorage.getItem("recordEasy");
            this.recordMedium = window.localStorage.getItem("recordMedium");
            this.recordHard = window.localStorage.getItem("recordHard");
            this.recordExtreme = window.localStorage.getItem("recordExtreme");
            this.recordCustom = window.localStorage.getItem("recordCustom");
        }
    }

    createNestedArrays(n) {
        var result = [];
        document.querySelector('.box').style.display = "block";
        document.querySelector('.play').style.display = "none";
        for (var i = 0; i < n; i++) {
            var measureArray = Array(n).fill(null);
            result.push(measureArray);
          }
          this.state.board = result;
      
          return result;
        }

    main(scale,bombs) {
        this.createNestedArrays(scale);
        this.drawBoard(bombs);      
        this.dropBombs(bombs);
        this.dropFields();
        this.restartGame();
        this.cron = setInterval(() => { this.timer(bombs); }, 1000);
        this.deviceMain(bombs);
    }

    drawBoard(bombCount) {
        const board = document.querySelector('.board');
        board.innerHTML = "";
        for (let i = 0; i < this.state.board.length; i++) {
          const row = document.createElement('div');
          board.appendChild(row);
          row.classList = `row-${i}`;
          for (let j = 0; j < this.state.board[i].length; j++) {
            const field = document.createElement('div');
            field.classList = 'field';
            field.style.backgroundImage = "url('./Assets/Minesweeper_unopened_square.svg.png')";
            field.setAttribute('data-row', i);
            field.setAttribute('data-col', j);
            field.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                if (field.lastChild.style.display !== "none") {
                    this.markField(event)
                }
            }
            );
            field.addEventListener('click', (event) => {
                if (field.lastChild.style.display !== "none") {
                    this.checkField(event, bombCount);
                }
            }
            );
            row.appendChild(field);
          }
        }
        for (let i = 0; i < this.state.board.length; i++) {
            for (let j = 0; j < this.state.board[i].length; j++) {
                if (!this.state.board[i][j]) {
                    let count = 0;
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (x === 0 && y === 0) continue; 
                            const neighborRow = i + x;
                            const neighborCol = j + y;
                            if (
                                neighborRow >= 0 &&
                                neighborRow < this.state.board.length &&
                                neighborCol >= 0 &&
                                neighborCol < this.state.board[i].length
                            ) {
                                if (this.state.board[neighborRow][neighborCol] === 'bombed') {
                                    count++;
                                }
                            }
                        }
                    }
    
                    if (count > 0) {
                        this.state.board[i][j] = count;
                    } else {
                        this.state.board[i][j] = null;
                    }
                }
            }
        }
        this.dropFields();
    }
    dropBombs(bombs) {
        for (let i = 0; i < bombs; i++) {
            const randomRowIndex = Math.floor(Math.random() * this.state.board.length);
            const randomColIndex = Math.floor(Math.random() * this.state.board.length);
            this.state.board[randomRowIndex][randomColIndex] = 'bombed';
        }
        this.drawBoard(bombs);
    }
    dropFields() {
        for (let i = 0; i < this.state.board.length; i++) {
                let lose = document.querySelector(".lose-modal");
                let win = document.querySelector('.win-modal');
                let record = document.querySelector('.record');
                let row = document.querySelector(`.row-${i}`);
            if (lose.style.display == "block" || win.style.display == "block" || record.style.display == "flex") {
                for (let j = 0; j < this.state.board[i].length; j++) {
                    let innerText = this.state.board[i][j];
                    if (innerText === 'bombed') {
                        row.childNodes[j].innerHTML = '<img src="./Assets/favicon.ico">';           
                        row.childNodes[j].style.backgroundImage = "url('./Assets/38ea1d17441d4ac.png')"
                        
                    } else {
                        if (innerText) {
                            row.childNodes[j].innerHTML =  `<p class="number">${this.state.board[i][j]}</p>`;
                            row.childNodes[j].style.backgroundImage = "url('./Assets/38ea1d17441d4ac.png')";                     
                        } else {
                            row.childNodes[j].innerHTML =  `<p class="empty"></p>`;
                            row.childNodes[j].style.backgroundImage = "url('./Assets/38ea1d17441d4ac.png')";   
                        }
                    }
                }
            } else {
            for (let j = 0; j < this.state.board[i].length; j++) {
                let innerText = this.state.board[i][j];
                if (this.state.board[i][j] === 'bombed') {
                    row.childNodes[j].innerHTML = '<img src="./Assets/favicon.ico">';           
                    row.childNodes[j].style.backgroundImage = "url('./Assets/38ea1d17441d4ac.png')";
                    row.childNodes[j].innerHTML += '<img class="default" src="./Assets/Minesweeper_unopened_square.svg.png">';
                    
                } else {
                    if (innerText) {
                        row.childNodes[j].innerHTML =  `<p class="number">${this.state.board[i][j]}</p>`;
                        row.childNodes[j].innerHTML += '<img class="default" src="./Assets/Minesweeper_unopened_square.svg.png">';
                        row.childNodes[j].style.backgroundImage = "url('./Assets/38ea1d17441d4ac.png')";                  
                    } else {
                        row.childNodes[j].innerHTML =  `<p class="empty"></p>`;
                        row.childNodes[j].innerHTML += '<img class="default" src="./Assets/Minesweeper_unopened_square.svg.png">';
                        row.childNodes[j].style.backgroundImage = "url('./Assets/38ea1d17441d4ac.png')";   
                    }
                }
            }
            }
        }
    }
    checkField(event, bombs) {
        const clickedField = event.target;
        clickedField.style.display = "none";
        const row = clickedField.parentNode.dataset.row;
        const col = clickedField.parentNode.dataset.col;
        if (this.state.board[row][col] == 'bombed') {
            document.querySelector(".play-modal").style.display = "none";
            document.querySelector(".lose-modal").style.display = "block";
            clearInterval(this.cron);
            document.querySelector(".again").style.display = "block";
            document.querySelector(".board-modal").style.display = "block";
            this.dropFields();
        } else if (clickedField.parentNode.firstChild.classList[0] === "empty") {
            this.openNeighboringFields(row, col);
        }
      
        const remainingFields = document.querySelectorAll('.default:not([style*="display: none"])');
      
        if (remainingFields.length === document.querySelectorAll('.field img[src="./Assets/favicon.ico"]').length) {
            document.querySelector(".play-modal").style.display = "none";
            document.querySelector(".win-modal").style.display = "block";
            this.dropFields();
            clearInterval(this.cron);
            if (bombs == 8 && (this.recordEasy > (this.minute * 60 + this.second) || this.recordEasy == 0)) {
                localStorage.setItem("recordEasy",(this.minute * 60 + this.second));
                document.querySelector(".record").innerHTML = `<p>You have a New Record Youhou!!!!</p>
                <p> ${this.minute} minutes ${this.second} seconds!!!</p>`
                document.querySelector(".record").style.display = "flex";
                document.querySelector(".win-modal").style.display = "none";
                document.querySelector(".record-modal").style.display = "block";
                this.dropFields();
                document.querySelector(".result").style.width = "100px";
                setTimeout(() => {
                    document.querySelector(".record").style.display = "none";
                }, 3000);
            } else if (bombs == 10 && (this.recordMedium > (this.minute * 60 + this.second) || this.recordMedium == 0)) {
                localStorage.setItem("recordMedium",(this.minute * 60 + this.second));
                document.querySelector(".record").innerHTML = `<p>You have a New Record Youhou!!!!</p>
                <p> ${this.minute} minutes ${this.second} seconds!!!</p>`
                document.querySelector(".record").style.display = "flex";
                document.querySelector(".win-modal").style.display = "none";
                document.querySelector(".record-modal").style.display = "block";
                this.dropFields();
                document.querySelector(".result").style.width = "100px";
                setTimeout(() => {
                    document.querySelector(".record").style.display = "none";
                }, 3000);
            } else if (bombs == 40 && (this.recordHard > (this.minute * 60 + this.second) || this.recordHard == 0)) {
                localStorage.setItem("recordHard",(this.minute * 60 + this.second));
                document.querySelector(".record").innerHTML = `<p>You have a New Record Youhou!!!!</p>
                <p> ${this.minute} minutes ${this.second} seconds!!!</p>`
                document.querySelector(".record").style.display = "flex";
                document.querySelector(".win-modal").style.display = "none";
                document.querySelector(".record-modal").style.display = "block";
                this.dropFields();
                document.querySelector(".result").style.width = "100px";
                setTimeout(() => {
                    document.querySelector(".record").style.display = "none";
                }, 3000);
            } else if (bombs == 180 && (this.recordExtreme > (this.minute * 60 + this.second) || this.recordExtreme == 0)) {
                localStorage.setItem("recordExtreme",(this.minute * 60 + this.second));
                document.querySelector(".record").innerHTML = `<p>You have a New Record Youhou!!!!</p>
                <p> ${this.minute} minutes ${this.second} seconds!!!</p>`
                document.querySelector(".record").style.display = "flex";
                document.querySelector(".win-modal").style.display = "none";
                document.querySelector(".record-modal").style.display = "block";
                this.dropFields();
                document.querySelector(".result").style.width = "100px";
                setTimeout(() => {
                    document.querySelector(".record").style.display = "none";
                }, 3000);
            } else if (bombs == 150 && (this.recordCustom > (this.minute * 60 + this.second) || this.recordCustom == 0)) {
                localStorage.setItem("recordCustom",(this.minute * 60 + this.second));
                document.querySelector(".record").innerHTML = `<p>You have a New Record Youhou!!!!</p>
                <p> ${this.minute} minutes ${this.second} seconds!!!</p>`
                document.querySelector(".record").style.display = "flex";
                document.querySelector(".win-modal").style.display = "none";
                document.querySelector(".record-modal").style.display = "block";
                this.dropFields();
                document.querySelector(".result").style.width = "100px";
                setTimeout(() => {
                    document.querySelector(".record").style.display = "none";
                }, 3000);
            }
            document.querySelector(".board-modal").style.display = "block";
            document.querySelector(".won").style.display = "block";
            this.dropFields();
        }
    }

    openNeighboringFields(row, col) {
        const clickedRow = document.querySelector(`.row-${row}`);
        if (!clickedRow) {
            return;
        }
      
        const clickedField = clickedRow.childNodes[col];
        if (!clickedField) {
            return;
        }
      
        for (let x = -1; x <= 1; x++) {
            const neighborRow = Number(row) + x;
            if (neighborRow < 0 || neighborRow >= this.state.board.length) {
                continue;
            }
          
            const neighborFields = document.querySelectorAll(`.row-${neighborRow} .field`);
            for (let y = -1; y <= 1; y++) {
                const neighborCol = Number(col) + y;
                if (neighborCol < 0 || neighborCol >= this.state.board[neighborRow].length) {
                    continue;
                }
              
                const neighborField = neighborFields[neighborCol];
                const neighborValue = this.state.board[neighborRow][neighborCol];
                if (neighborField.lastChild.style.display !== "none") {
                    neighborField.lastChild.style.display = "none";
                    if (neighborValue === null) {
                        this.openNeighboringFields(neighborRow, neighborCol);
                    }
                }
            }
        }
    }
    
    
      markField(event) {
        const clickedField = event.target;
        clickedField.style.display = "none";
        const img = document.createElement('img');
        img.classList = 'mark';
        img.src = "./Assets/png-transparent-minesweeper-computer-icons-bing-maps-video-game-mines-miscellaneous-game-angle.png"
        clickedField.parentNode.appendChild(img);
      }
      restartGame() {
        document.addEventListener("keydown", function(event) {
            if (event.key === "r" || event.keyCode === 82) {
                location.reload();
            }
          });
          
    }

    timer(bombsCount) {
        this.second++;
        if (this.second == 60) {
            this.second = 0;
            this.minute++;
        }
        document.querySelector('.minute').innerText = returnData(this.minute);
        document.querySelector('.second').innerText = returnData(this.second);
        

        function returnData(input) {
            return input >= 10 ? input : `0${input}`;
        }

        if (this.minute == 1 && bombsCount == 8 ||
            this.minute == 3 && bombsCount == 10 ||
            this.minute == 5 && bombsCount == 40 ||
            this.minute == 10 && bombsCount == 180 ||
            this.minute == 15 && bombsCount == 150
            ) {
            document.querySelector(".play-modal").style.display = "none";
            document.querySelector(".lose-modal").style.display = "block";
            clearInterval(this.cron);
            document.querySelector(".again").innerHTML += `  Your limit is over`;
            document.querySelector(".again").style.display = "block";
            document.querySelector(".again").style.fontSize = "20px";
            document.querySelector(".board-modal").style.display = "block";
            this.dropFields();
        }
    }
    recordInfo() {
        if (this.recordEasy != 0) {
                document.querySelector(".play").innerHTML = `
                <div class="record-main">
                    <a href="./index.html">Back</a>
                    <h3>Easy</h3>
                    <p>Your Record is ${parseInt(this.recordEasy / 60)} minutes ${this.recordEasy % 60} seconds</p>
                </div>
                `
        } else {
            document.querySelector(".play").innerHTML = `
            <div class="record-main">
                <a href="./index.html">Back</a>
                <h3>Easy</h3>
                <p>You don't have record yet</p>
                <p>Play for New Records ))))</p>
            </div>
            `
        }
        if (this.recordMedium != 0) {
            document.querySelector(".record-main").innerHTML += `
                <h3>Medium</h3>
                <p>Your Record is ${parseInt(this.recordMedium / 60)} minutes ${this.recordMedium % 60} seconds</p>
            `
        } else {
            document.querySelector(".record-main").innerHTML += `
                <h3>Medium</h3>
                <p>You don't have record yet</p>
                <p>Play for New Records ))))</p>
            `
        }
        if (this.recordHard != 0) {
            document.querySelector(".record-main").innerHTML += `
                <h3>Hard</h3>
                <p>Your Record is ${parseInt(this.recordHard / 60)} minutes ${this.recordHard % 60} seconds</p>
            `
        } else {
            document.querySelector(".record-main").innerHTML += `
                <h3>Hard</h3>
                <p>You don't have record yet</p>
                <p>Play for New Records ))))</p>
            `
        }
        if (this.recordExtreme != 0) {
            document.querySelector(".record-main").innerHTML += `
                <h3>Extreme</h3>
                <p>Your Record is ${parseInt(this.recordExtreme / 60)} minutes ${this.recordExtreme % 60} seconds</p>
            `
        } else {
            document.querySelector(".record-main").innerHTML += `
                <h3>Extreme</h3>
                <p>You don't have record yet</p>
                <p>Play for New Records ))))</p>
            `
        }
        if (this.recordCustom != 0) {
            document.querySelector(".record-main").innerHTML += `
                <h3>Custom</h3>
                <p>Your Record is ${parseInt(this.recordCustom / 60)} minutes ${this.recordCustom % 60} seconds</p>
            `
        } else {
            document.querySelector(".record-main").innerHTML += `
                <h3>Custom</h3>
                <p>You don't have record yet</p>
                <p>Play for New Records ))))</p>
            `
        }
    }
    deviceMain (bombsCount) {
        let limit = 0;
        switch (bombsCount) {
            case 8:
                limit = 1
                break;
            case 10:
                    limit = 3
                    break;
            case 40:
                limit = 5
                break;
            case 180:
                limit = 10
                break;
            case 150:
                limit = 15
                break;
            default: 0
                break;
        }
        navigator.getBattery().then((x) => {
            const res = `${x.level * 100}`;
            document.querySelector('nav').innerHTML = `
                <span class="bombsCount">${bombsCount} bombs</span>
                <span style="color: red;">limit ${limit} minute</span>
                <div>
                    <div class="internet">
                        <span>${navigator.connection.effectiveType}</span>
                        <img src="./Assets/wifi.png">
                    </div>
                    <div class="battery">
                        <span>${res}</span>
                        <img src="./Assets/battery-black-silhouette.png">
                    </div>
                </div>
            `
          });
          
    }
}
//restartGame();openNeighboringFields(row, col);drawBoard-ic shat qich

const minesweeper = new Minesweeper();