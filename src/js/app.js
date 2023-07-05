class Quiz {
    constructor(root) {
        this.root = root;
        this.prevButton = this.root.querySelector('.quiz__button');
        this.nextButton = this.root.querySelector('.quiz__button_accent');
        this.slides = this.root.querySelectorAll('.quiz__left-dynamic-content');
        this.cards = this.root.querySelectorAll('.quiz__slide-card');
        this._activeSlide = 0;

        this.updateButtons();
        this.updateSlides();
        this.bindListeners();
    }

    get activeSlide() {
        return this._activeSlide;
    }

    set activeSlide(value) {
        if(value < 0) {
            return;
        }
        if(value >= this.cards.length) {
            return;
        }
        this._activeSlide = value;
    }

    updateButtons() {
        if(this.isFirstSlide()) {
            this.prevButton.classList.add('quiz__button_disabled');
        }
        else {
            this.prevButton.classList.remove('quiz__button_disabled');
        }

        if(this.isLastSlide()) {
            this.nextButton.innerText = 'Узнать результат';
        }
        else {
            this.nextButton.innerText = 'Вперёд';
        }
    }

    isFirstSlide() {
        return this.activeSlide == 0;
    }

    isLastSlide() {
        return this.activeSlide == this.slides.length - 1;
    }
    
    clear() {
        this.slides.forEach((slide) => {
            slide.classList.remove('quiz__left-dynamic-content_prev');
            slide.classList.remove('quiz__left-dynamic-content_active');
            slide.classList.remove('quiz__left-dynamic-content_next');
        })

        this.cards.forEach((card) => {
            card.classList.remove('quiz__slide-card_prev');
            card.classList.remove('quiz__slide-card_active');
            card.classList.remove('quiz__slide-card_next');
        })
    }

    updateSlides() {
        this.clear();
        this.slides[this.activeSlide].classList.add('quiz__left-dynamic-content_active');
        if(!this.isFirstSlide()) {
            this.slides[this.activeSlide - 1].classList.add('quiz__left-dynamic-content_prev');
        }
        if(!this.isLastSlide()) {
            this.slides[this.activeSlide + 1].classList.add('quiz__left-dynamic-content_next');
        }

        this.cards[this.activeSlide].classList.add('quiz__slide-card_active');
        if(!this.isFirstSlide()) {
            this.cards[this.activeSlide - 1].classList.add('quiz__slide-card_prev');
        }
        if(!this.isLastSlide()) {
            this.cards[this.activeSlide + 1].classList.add('quiz__slide-card_next');
        }
    }

    bindListeners() {
        this.nextButton.addEventListener('click', (event) => {
            this.activeSlide++;
            this.updateButtons();
            this.updateSlides();
        })
        this.prevButton.addEventListener('click', (event) => {
            this.activeSlide--;
            this.updateButtons();
            this.updateSlides();
        })
    }
}

const quizNode = document.querySelector('#quiz');

if(quizNode) {
    new Quiz(quizNode);
}