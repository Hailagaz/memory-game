class MemoryGame {
    constructor(selector, delay = 1000) {
        this.cardsContainer = document.querySelector(selector);
        //this.cardsContainer = document.querySelector('.js-cards');
        this.cards = Array.from(this.cardsContainer.children);
        this.flippedCards = [];
        this.delay = delay;

        this.cards.forEach(card => {
            //card.addEventListener('click', game.flip.bind(game, card));
            card.addEventListener('click', () => {
                this.flip(card);
            });
        });
        this.rearrangeCards(true);
    }

    rearrangeCards(isStart) {
        this.cards.forEach(card => {
            const randomNumber = Math.floor(Math.random() * this.cards.length) + 1;

            card.classList.remove('has-match');
            if (isStart) {
                card.style.order = `${randomNumber}`;
            } else {
                setTimeout(() => {
                    card.style.order = `${randomNumber}`;
                }, 400);
            }

        })
    }

    validateCards() {
        const [firstCard, secondCard] = this.flippedCards;

        this.cardsContainer.classList.add('no-event');

        if (firstCard.dataset.animal === secondCard.dataset.animal) {
            firstCard.classList.replace('flipped', 'has-match');
            secondCard.classList.replace('flipped', 'has-match');

            this.flippedCards = [];

            setTimeout(() => {
                const allHaveMatches = this.cards.every(card => (
                    card.classList.contains('has-match')
                ));

                this.cardsContainer.classList.remove('no-event');

                if (allHaveMatches) {
                    this.rearrangeCards();
                }
            }, this.delay);
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');

                this.flippedCards = [];

                this.cardsContainer.classList.remove('no-event');
            }, this.delay);
        }
    }

    flip(selectedCard) {
        selectedCard.classList.add('flipped');

        this.flippedCards.push(selectedCard);

        if (this.flippedCards.length === 2) {
            this.validateCards();
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const game = new MemoryGame('.js-cards');

    // game.cards.forEach(card => {
    //     //card.addEventListener('click', game.flip.bind(game, card));
    //     card.addEventListener('click', () => {
    //         game.flip(card);
    //     });
    // });
});
