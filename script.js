// script.js

document.addEventListener('DOMContentLoaded', function() {
    const flashcardForm = document.getElementById('flashcard-form');
    const flashcardsContainer = document.getElementById('flashcards-container');
    const flashcardsCounter = document.getElementById('flashcards-counter');

    let flashcards = [];
    let editIndex = -1;

    // Add or Edit flashcard
    flashcardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const question = document.getElementById('question').value;
        const answer = document.getElementById('answer').value;
        const category = document.getElementById('category').value;
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

        if (question && answer) {
            const flashcard = {
                question,
                answer,
                category,
                tags
            };

            if (editIndex === -1) {
                flashcards.push(flashcard);
            } else {
                flashcards[editIndex] = flashcard;
                editIndex = -1;
            }

            updateFlashcards();
            flashcardForm.reset();
        }
    });

    // Update flashcards display
    function updateFlashcards() {
        flashcardsContainer.innerHTML = '';
        flashcards.forEach((flashcard, index) => {
            const flashcardElement = document.createElement('div');
            flashcardElement.className = 'flashcard';
            flashcardElement.innerHTML = `
                <div class="question">${flashcard.question}</div>
                <div class="answer">${flashcard.answer}</div>
                <div class="controls">
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </div>
            `;
            flashcardElement.addEventListener('click', function() {
                this.classList.toggle('revealed');
            });
            
            // Edit button functionality
            flashcardElement.querySelector('.edit-button').addEventListener('click', function(e) {
                e.stopPropagation();
                document.getElementById('question').value = flashcard.question;
                document.getElementById('answer').value = flashcard.answer;
                document.getElementById('category').value = flashcard.category;
                document.getElementById('tags').value = flashcard.tags.join(', ');
                editIndex = index; // Set the index for editing
            });

            // Delete button functionality
            flashcardElement.querySelector('.delete-button').addEventListener('click', function(e) {
                e.stopPropagation();
                flashcards.splice(index, 1); // Remove the flashcard from the array
                updateFlashcards(); // Update the display
            });

            flashcardsContainer.appendChild(flashcardElement);
        });
        flashcardsCounter.textContent = `Total Flashcards: ${flashcards.length}`;
    }
});

