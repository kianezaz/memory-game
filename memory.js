/* 
 Instead of appending img to innerHTML for each distinct img, can make an array of team names
 and pull the names out of array when appending using `${teamName}_Logo.png`
*/

// Add images for each team
let teams = ["Celtics", "Nets", "Knicks", "76ers", "Raptors", "Bulls", "Cavaliers", "Pistons", 
            "Pacers", "Bucks", "Hawks", "Hornets", "Heat", "Magic", "Wizards", "Nuggets", 
            "Timberwolves", "Thunder", "Blazers", "Jazz", "Warriors", "Clippers", "Lakers", 
            "Suns", "Kings", "Mavericks", "Rockets", "Grizzlies", "Pelicans", "Spurs"];
let cardAmount;
let cards = [];
let currentAttemptCards = [];
let collectedCards = [];
let startTime;
let endTime;

function numberOfCards(number) {
    cardAmount = number;
    let startModal = document.getElementById("start-modal");
    startModal.classList.remove("active");
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
    startGame();
}

function createCards() {
    for (let i = 0; i < cardAmount/2; i++) {
        for (let j = 0; j < 2; j++) {
            let card = document.createElement("button");
            card.classList.add("card", `_${cardAmount}`);
            card.addEventListener("click", flipCard);
            card.hasEvent = true;
            card.teamName = teams[i];
            cards.push(card);
        }
        /*
        let card = document.createElement("button");
        card.classList.add("card", `_${cardAmount}`);
        card.addEventListener("click", flipCard);
        card.hasEvent = true;
        let j;
        if (i % 2 == 0) {j = i}
        else {j = i - 1}
        card.teamName = teams[Math.floor(j)];
        cards.push(card);
        */
    }
    shuffleArray(cards);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function flipCard() {
    if (this.flipped == false) {
        this.flipped = true;
        this.style.fontSize = "0px";
        let img = document.createElement("img");
        img.src = `${this.teamName}_Logo.png`;
        img.setAttribute("class", "teamLogo");
        this.img = img;
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
        if (this.img != null) {
            this.img.remove();
        }
    }
}

function userAttempt() {
    let card1 = currentAttemptCards[0];
    let card2 = currentAttemptCards[1];
    for (let card of cards) {
        if (card.hasEvent = true) {
            card.removeEventListener("click", flipCard);
        }
    }
    setTimeout(function() {
        if (card1.img.src === card2.img.src) {
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
            if (collectedCards.length == cardAmount) {
                openCongratsModal();
            }
        }
        else {
            console.log("No match");
            currentAttemptCards[0].style.fontSize = "larger";
            card1.img.remove();
            currentAttemptCards[1].style.fontSize = "larger";
            card2.img.remove();
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

function stopTime() {
    endTime = new Date();
    let timeElapsed = endTime - startTime;
    let totalSeconds = timeElapsed / 1000;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.round(totalSeconds - (minutes * 60));
    return {minutes, seconds};
}

function openCongratsModal() {
    timeElapsed = stopTime();
    for (card of cards) {
        card.style.visibility = "visible";
    }
    let congratsModal = document.getElementById("congrats-modal");
    let overlay = document.getElementById("overlay");
    let modalBody = document.getElementById("congrats-modal-body");
    let attemptCount = document.getElementById("attempts").getAttribute("count");
    modalBody.innerHTML = "You finished in " + attemptCount + " attempts <br><br> in " + timeElapsed.minutes + 
                            " minutes " + timeElapsed.seconds + " seconds";
    congratsModal.classList.add("active");
    overlay.classList.add("active");
}

function closeCongratsModal() {
    let congratsModal = document.getElementById("congrats-modal");
    congratsModal.classList.remove("active");
    let attempts = document.getElementById("attempts");
    attempts.innerHTML = "";
    let cardsCollected = document.getElementById("cardsCollected");
    cardsCollected.innerHTML = "";
    resetGame();
}

function closeRulesModal() {
    let rulesModal = document.getElementById("rules-modal");
    let startModal = document.getElementById("start-modal");
    rulesModal.classList.remove("active");
    startModal.classList.add("active");
}


function openRulesModal() {
    let startModal = document.getElementById("start-modal");
    startModal.classList.remove("active");
    let rulesModal = document.getElementById("rules-modal");
    rulesModal.classList.add("active");
}

function startGame() {
    let attempts = document.getElementById("attempts");
    attempts.innerHTML = "Attempts: 0";
    let cardsCollected = document.getElementById("cardsCollected");
    cardsCollected.innerHTML = "Cards collected: 0/" + cardAmount;
    shuffleArray(teams);
    createCards();
    for (card of cards) {
        document.getElementById("main").appendChild(card);
    }
    startTime = new Date();
}

function resetGame() {
    for (i = cards.length - 1; i >= 0; i--) {
        let removed = cards.pop();
        removed.remove();
        collectedCards.pop();
    }
    let attempts = document.getElementById("attempts");
    attempts.setAttribute("count", 0);
    let cardsCollected = document.getElementById("cardsCollected");
    cardsCollected.setAttribute("count", 0);
    let startModal = document.getElementById("start-modal");
    startModal.classList.add("active");
}

