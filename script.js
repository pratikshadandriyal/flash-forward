document.addEventListener('DOMContentLoaded', () => {
    const flashcardForm = document.getElementById('flashcard-form');
    const flashcardsContainer = document.getElementById('flashcards-container');
    const flashcardsCounter = document.getElementById('flashcards-counter');

    flashcardForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const questionInput = document.getElementById('question');
        const answerInput = document.getElementById('answer');

        const question = questionInput.value;
        const answer = answerInput.value;

        if (question && answer) {
            addFlashcard(question, answer);
            saveFlashcard(question, answer);

            questionInput.value = '';
            answerInput.value = '';
        }
    });

    function addFlashcard(question, answer) {
        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');
        flashcard.innerHTML = `
            <div class="question">${question}</div>
            <div class="answer">${answer}</div>
            <div class="controls">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        flashcard.querySelector('.question').addEventListener('click', () => {
            flashcard.classList.toggle('revealed');
        });
        flashcard.querySelector('.edit').addEventListener('click', () => {
            editFlashcard(flashcard, question, answer);
        });
        flashcard.querySelector('.delete').addEventListener('click', () => {
            deleteFlashcard(flashcard, question);
        });
        flashcardsContainer.appendChild(flashcard);
        updateCounter();
    }

    function editFlashcard(flashcard, oldQuestion, oldAnswer) {
        const newQuestion = prompt('Edit the question:', oldQuestion);
        const newAnswer = prompt('Edit the answer:', oldAnswer);
        if (newQuestion && newAnswer) {
            flashcard.querySelector('.question').textContent = newQuestion;
            flashcard.querySelector('.answer').textContent = newAnswer;
            updateFlashcardInStorage(oldQuestion, newQuestion, newAnswer);
        }
    }

    function deleteFlashcard(flashcard, question) {
        if (confirm('Are you sure you want to delete this flashcard?')) {
            flashcard.remove();
            deleteFlashcardFromStorage(question);
            updateCounter();
        }
    }

    function saveFlashcard(question, answer) {
        const flashcards = getFlashcards();
        flashcards.push({ question, answer });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        updateCounter();
    }

    function updateFlashcardInStorage(oldQuestion, newQuestion, newAnswer) {
        const flashcards = getFlashcards();
        const index = flashcards.findIndex(flashcard => flashcard.question === oldQuestion);
        if (index !== -1) {
            flashcards[index] = { question: newQuestion, answer: newAnswer };
            localStorage.setItem('flashcards', JSON.stringify(flashcards));
        }
    }

    function deleteFlashcardFromStorage(question) {
        let flashcards = getFlashcards();
        flashcards = flashcards.filter(flashcard => flashcard.question !== question);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

    function getFlashcards() {
        const flashcards = localStorage.getItem('flashcards');
        return flashcards ? JSON.parse(flashcards) : [];
    }

    function loadFlashcards() {
        const flashcards = getFlashcards();
        flashcards.forEach(flashcard => {
            addFlashcard(flashcard.question, flashcard.answer);
        });
    }

    function updateCounter() {
        const flashcards = getFlashcards();
        flashcardsCounter.textContent = `Total Flashcards: ${flashcards.length}`;
    }

    loadFlashcards();
});