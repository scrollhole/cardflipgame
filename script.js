const cards = document.querySelectorAll(".card"),
timeTag = document.querySelectorAll(".time b"),
flipsTag = document.querySelectorAll(".flips b"),
refreshBtn = document.querySelectorAll(".details button");

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCards = 0;
let disabledDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer(){
    if(timeLeft <= 0){
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}){
    if(!isPlaying){
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disabledDeck && timeLeft > 0){
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne){
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disabledDeck = true;
        let cardOneIcon = cardOne.querySelector(".back-view i").classList.value;
        cardTwoIcon = cardTwo.querySelector(".back-view i").classList.value;
        matchCards(cardOneIcon, cardTwoIcon);
    }
}

function matchCards(icon1, icon2){
    if(icon1 === icon2){
        matchedCards++;
        if(matchedCards == 6 && timeLeft > 0){
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disabledDeck = false;
    }

    setTimeout(() =>{
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() =>{
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disabledDeck = false;
    }, 1200);

}

function shuffleCards(){
    timeLeft = maxTime;
    flips = matchedCards = 0;
    cardOne = cardTwo = ""
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disabledDeck = isPlaying = false;

    let arr = ["bx-heart", "bxs-heart", "bx-game", "bxs-game", "bxs-ghost", "bx-ghost"];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) =>{
        card.classList.remove("flip");
        let iconTag = card.querySelector(".back-view i");
        setTimeout(()=>{
            iconTag.classList.value = `bx ${arr[index]}`;
        }, 500);
        card.addEventListener("click", flipCard);
    });

}

shuffleCards();

refreshBtn.addEventListener("click", shuffleCards);

cards.forEach(card =>{
    card.addEventListener("click", flipCard);
});


