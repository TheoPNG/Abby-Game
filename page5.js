
/*
 * The Daily Owle - A Wordle-Inspired Game
 * Copyright (c) 2025 Theodore Wilson
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for more details.
 *
 * Wordle is a trademark of The New York Times Company. 
 * This project is an independent implementation and is not affiliated with or endorsed by The New York Times.
 */
const date = new Date();
document.getElementById("row0").style.gap = "8px";
document.getElementById("row01").style.gap = "8px";
document.getElementById("row02").style.gap = "8px";
document.getElementById("row03").style.gap = "8px";
function getFormattedDate() {
    const today = new Date();
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };
    return today.toLocaleDateString('en-US', options).replace(/,/g, '').trim();
}
async function isRealWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.ok) {
        const data = await response.json();
        return data && data.length > 0;
    } else {
        return false;
    }
}

letter = ['D', 'R', 'E', 'A', 'M'];

selectedRow = 1;
const runLetter = async (letter) => {
    if (letter == "Enter") {
        const fullElements = document.getElementsByClassName("full");

        if (fullElements.length !== 4) {
            alert("Please fill in all the letters");
        } else if (document.getElementById("HELLO") == null) {
            alert("Please fill in all the letters");
        }

        const word = Array.from(fullElements).map(el => el.innerHTML).join("") + document.getElementById("HELLO").innerHTML;

        const isValid = await isRealWord(word);


        if (isValid && fullElements.length == 4) {
            checkSubmission();
        } else {
            alert("Not a valid word, try again!");
        }
    } else if (/^[a-zA-Z]$/.test(letter)) {
        document.getElementById(`${selectedRow}current-key`).innerHTML = letter;

        if (document.getElementById(`${selectedRow}current-key`) != null) {
            og = document.getElementById(`${selectedRow}current-key`);
            document.getElementById(`${selectedRow}current-key`).innerHTML = letter.toUpperCase();
            document.getElementById(`${selectedRow}current-key`).id = "HELLO";

            if (og.nextElementSibling.id != "last") {
                og.nextElementSibling.id = `${selectedRow}current-key`;
            } else {
                og.nextElementSibling.id = `${selectedRow}current-key`;
            }
            document.getElementById("HELLO").className += " full";
            document.getElementById("HELLO").classList.remove('letter');
            document.getElementById("HELLO").removeAttribute("id");

        }

    } else if (letter == "Backspace") {


        if (document.getElementById(`HELLO`) != null) {
            currentActive = document.getElementById(`HELLO`);
            currentActive.innerHTML = "";
            currentActive.id = `${selectedRow}current-key`;
        } else {
            currentActive = document.getElementById(`${selectedRow}current-key`);

            currentActive.previousElementSibling.innerHTML = "";
            currentActive.previousElementSibling.id = `${selectedRow}current-key`;
            currentActive.removeAttribute("id");
        }


    };
}


document.addEventListener("keydown", async function (event) {
        runLetter(event.key);
    }

);

const checkSubmission = async () => {
    // document.getElementById('HELLO').classList.remove('letter');
    document.getElementById('HELLO').classList.add('b5');
    document.getElementById('HELLO').className += "full";
    var els = document.getElementsByClassName('full'),
        i = els.length;
    while (i--) {
        els[i].className += ' COMPLETED';
        els[i].classList.remove('full');
    }

    count = 0;
    var list = document.getElementById(`row${selectedRow}`).children,
        h = list.length;

    var hasBeen = [false, false, false, false, false];

    for (let i = 0; i < h; i++) {
        let activeChoice = list[i].innerHTML;

        let newColor;
        if (!letter.includes(activeChoice)) {
            list[i].style.setProperty("--new-bg", 'rgba(0, 0, 0, 0.29)');
            await sleep(200);
            list[i].classList.add('flip-wrong');
            document.getElementById(activeChoice.toLocaleLowerCase()).className = "key k-wrong"
        } else if (letter[i] == activeChoice) {
            newColor = "rgb(20, 50, 120)";
            await sleep(200);
            document.getElementById(activeChoice.toLocaleLowerCase()).className = "key k-correct"
            console.log(list[i].className)
            if(list[i].className.includes("b1")) {
                list[i].style.setProperty("--new-bg-image", 'url("./photos/row-5-column-1.png")');
            }
            else if(list[i].className.includes("b2")) {
                list[i].style.setProperty("--new-bg-image", 'url("./photos/row-5-column-2.png")');
            }
            else if(list[i].className.includes("b3")) {
                list[i].style.setProperty("--new-bg-image", 'url("./photos/row-5-column-3.png")');
            }
            else if(list[i].className.includes("b4")) {
                list[i].style.setProperty("--new-bg-image", 'url("./photos/row-5-column-4.png")');
            }
            else if(list[i].className.includes("b5")) {
                list[i].style.setProperty("--new-bg-image", 'url("./photos/row-5-column-5.png")');
            }
            else if(list[i].className.includes("b6")) {
                list[i].style.setProperty("--new-bg-image", 'url("./photos/row-5-column-6.png")');
            }
            list[i].classList.add('flip');
            count++;
        } else if (activeChoice != list[letter.indexOf(activeChoice)].innerHTML && !hasBeen[letter.indexOf(activeChoice)]) {

            await sleep(200);
            list[i].style.setProperty("--new-bg", 'rgba(251, 255, 40, 0.74)');
            list[i].classList.add('flip-unsure');
            document.getElementById(activeChoice.toLocaleLowerCase()).className = "key k-close"
            hasBeen[letter.indexOf(activeChoice)] = true;
            
        } else {
            list[i].style.setProperty("--new-bg", 'rgba(0, 0, 0, 0.29)');
            await sleep(200);
            list[i].classList.add('flip-wrong');
            document.getElementById(activeChoice.toLocaleLowerCase()).className = "key k-wrong"

        }


        


        // list[i].classList.add("flip");

        await sleep(100);
    }

    document.getElementById("HELLO").id = "";
    selectedRow++;

    if (count == 5) {
        win();
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function launchConfetti() {
    document.getElementById('continue').style.display = "flex";
}
async function win() {
    if(document.getElementById(`${selectedRow}current-key`)){
        document.getElementById(`${selectedRow}current-key`).id = "NOTHING";
    }
    
    // document.getElementById('row1').classList.add('flip');
    for (box of document.getElementById('row2').children){
        box.innerHTML = "";
        box.classList = "letter";
    }
    await sleep(50);
   
   
    await sleep(50);
   


    await sleep(50);
    for (box of document.getElementById('row1').children){
        if(box.className.includes("b1")) {
           box.style.setProperty("--new-bg-image", 'url("./photos/row-5-column-1.png")');
        }
        else if(box.className.includes("b2")) {
             box.style.setProperty("--new-bg-image", 'url("./photos/row-5-column-2.png")');
        }
        else if(box.className.includes("b3")) {
            box.style.setProperty("--new-bg-image", 'url("./photos/row-5-column-3.png")');
        }
        else if(box.className.includes("b4")) {
            box.style.setProperty("--new-bg-image", 'url("./photos/row-5-column-4.png")');
        }
        else if(box.className.includes("b5")) {
            box.style.setProperty("--new-bg-image", 'url("./photos/row-5-column-5.png")');
        }
        else if(box.className.includes("b6")) {
            box.style.setProperty("--new-bg-image", 'url("./photos/row-5-column-6.png")');
        }
        await sleep(100);
        box.classList.add('flip');
        console.log(box)
        box.innerHTML = "";
        box.style.setProperty("filter", 'blur(0px)');
        box.classList.add("no-blur");
        // box.style.fiter = "";
        // box.style.removeAttribute("filter");
        // box.style.setProperty("border", '5px solid red')
        
    }
    document.getElementById('row1').style.gap = "8px";
    
    
    await sleep(100);
    launchConfetti();
}