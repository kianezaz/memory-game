/* 
 Instead of appending img to innerHTML for each distinct img, can make an array of team names
 and pull the names out of array when appending using `${teamName}_Logo.png`
*/
let cards = [];
let currentAttemptCards = [];
let collectedCards = [];

function createCards() {
    console.log(cards.length);
    for (let i = 0; i < 8; i++) {
        let card = document.createElement("button");
        card.setAttribute("class", "card");
        card.addEventListener("click", flipCard);
        card.hasEvent = true;
        let label = document.createTextNode(`Card ${i + 1}`);
        card.appendChild(label);
        if (i < 2) {card.teamName = "Warriors";}
        else if (i < 4) {card.teamName = "Lakers"}
        else if (i < 6) {card.teamName = "Bucks";}
        else if (i < 8) {card.teamName = "76ers";}
        cards.push(card);
    }
}

function shuffleCards() {
    for (card of cards) {
        card.value = Math.random();
    }
    cards.sort(function(a,b) {return a.value - b.value});
}

function flipCard() {
    if (this.flipped == false) {
        this.flipped = true;
        this.style.fontSize = "0px";
        let img = document.createElement("img");
        img.src = `${this.teamName}_Logo.png`;
        img.setAttribute("class", "teamLogo");
        img.setAttribute("id", `${this.value}`);
        this.appendChild(img);
        currentAttemptCards.push(this);
        console.log(currentAttemptCards.length);
        this.removeEventListener("click", flipCard);
        this.hasEvent = false;
        if (currentAttemptCards.length == 2) {
            userAttempt();
        }
    }
    else {
        this.flipped = false;
        this.style.fontSize = "larger";
        let img = document.getElementById(`${this.value}`);
        if (img != null) {
            img.remove();
        }
    }
}

function userAttempt() {
    let img1 = document.getElementById(`${currentAttemptCards[0].value}`);
    let img2 = document.getElementById(`${currentAttemptCards[1].value}`);
    for (let card of cards) {
        if (card.hasEvent = true) {
            card.removeEventListener("click", flipCard);
        }
    }
    setTimeout(function() {
        if (img1.src === img2.src) {
            collectedCards.push(currentAttemptCards[0]);
            collectedCards.push(currentAttemptCards[1]);
            currentAttemptCards[0].style.visibility = "hidden";
            currentAttemptCards[1].style.visibility = "hidden";
            console.log("Match!");
            for (let card of cards) {
                card.addEventListener("click", flipCard);
            }
            let cardsCollected = document.getElementById("cardsCollected");
            let count = parseInt(cardsCollected.getAttribute("count"));
            count += 2;
            cardsCollected.innerHTML = "Cards collected: " + count + "/8";
            cardsCollected.setAttribute("count", count);
            currentAttemptCards = [];
            if (collectedCards.length == 8) {
                openCongratsModal();
            }
        }
        else {
            console.log("No match");
            currentAttemptCards[0].style.fontSize = "larger";
            img1.remove();
            currentAttemptCards[1].style.fontSize = "larger";
            img2.remove();
            currentAttemptCards = [];
            for (let card of cards) {
                card.addEventListener("click", flipCard);
            }
        }
            let attempts = document.getElementById("attempts");
            let attemptNumber = parseInt(attempts.getAttribute("count"));
            attemptNumber++;
            attempts.innerHTML = "Attempts: " + attemptNumber;
            attempts.setAttribute("count", attemptNumber);
    }, 1500)
}

function openCongratsModal() {
    for (card of cards) {
        card.style.visibility = "visible";
    }
    let modal = document.getElementById("modal");
    let overlay = document.getElementById("overlay");
    modal.classList.add("active");
    overlay.classList.add("active");
}

function closeCongratsModal() {
    let modal = document.getElementById("modal");
    let overlay = document.getElementById("overlay");
    modal.classList.remove("active");
    overlay.classList.remove("active");
    resetGame();
}

function displayRules() {
    let newWindow = window.open("","Memory Game Rules", "width = 500, height = 500");
    newWindow.document.write("<h3>The objective of the game is to match two cards with each other in the least number of attempts as possible.</h3><li></li>");
    newWindow.focus();
}

function startGame() {
    createCards();
    shuffleCards();
    for (card of cards) {
        document.getElementById("main").appendChild(card);
    }
}

function resetGame() {
    for (i = cards.length - 1; i >= 0; i--) {
        let removed = cards.pop();
        removed.remove();
        collectedCards.pop();
    }
    let attempts = document.getElementById("attempts");
    attempts.setAttribute("count", 0);
    attempts.innerHTML = "Attempts: " + attempts.getAttribute("count");
    let cardsCollected = document.getElementById("cardsCollected");
    cardsCollected.setAttribute("count", 0);
    cardsCollected.innerHTML = "Cards collected: " + cardsCollected.getAttribute("count") + "/8";
    startGame();
}

window.onload = startGame();