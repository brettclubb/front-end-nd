let movesCounter = 0;
let starsCounter = 0; 
const movesContainer = document.querySelector('.moves');
const starsContainer = document.querySelector('.stars');
const restartContainer = document.querySelector('.restart');
restartContainer.addEventListener('click', restartGame);

/*
 * Create a list that holds all of your cards
 */
let deckOfCards = [
    'diamond', 'diamond',
    'paper-plane-o', 'paper-plane-o',
    'anchor', 'anchor',
    'bolt', 'bolt',
    'cube', 'cube',
    'leaf', 'leaf',
    'bicycle', 'bicycle',
    'bomb', 'bomb'
];

let openedCards = [];

// Initial game load
restartGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function restartGame(){
    movesCounter = 0;
    refreshMoveCounter();

    const shuffledDeck = shuffle(deckOfCards);
    const cardContainer = document.querySelector('.deck');

    const tempDiv = document.createElement('div');

    for(let card of shuffledDeck){
        const listItem = document.createElement('li');
        listItem.className = "card";

        const iconElement = document.createElement('i');
        iconElement.className = "fa fa-" + card;

        listItem.appendChild(iconElement);
        tempDiv.appendChild(listItem);
    }

    cardContainer.addEventListener('click', cardClick);
    cardContainer.innerHTML = tempDiv.innerHTML;
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex; //5

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex); //2
        currentIndex -= 1; //4
        temporaryValue = array[currentIndex]; //4
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function cardClick(event){
    if(event.target.classList.contains('card'))
        showCard(event.target);
 }

 function showCard(card){
    card.className = "card open show";
    addCardToOpenList(card);
    //addCardToOpenList(card);
 }

 function matchCards(){
    for(let card of openedCards){
        card.className = "card match";
    }
    openedCards = [];
 }

 function noMatches(){
    for(let card of openedCards){
        card.className = "card";
    }
    openedCards = [];
 }

 function gameWon(){
    alert("FINAL SCORE \n" + "Moves: " + movesCounter);
 }

 function incrementMoveCounter(){
    movesCounter++;
    refreshMoveCounter();
 }

 function refreshMoveCounter(){
    movesContainer.innerHTML = movesCounter;
 }

 function addCardToOpenList(card){
     const cardName = card.querySelector('.fa');
     openedCards.push(card);
     if(openedCards.length > 1){
         if(openedCards[0].querySelector('.fa').className === openedCards[1].querySelector('.fa').className){
             matchCards();
         } else{
             setTimeout(function() { noMatches(); }, 1000);
         }
         incrementMoveCounter();
     }
 }