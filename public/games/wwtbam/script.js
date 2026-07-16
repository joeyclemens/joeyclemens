const questions = [
    {
        question: "What sort of animal is Walt Disney's Dumbo?" ,
        options: ["Deer", "Rabbit", "Elephant", "Donkey"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: 0
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: 1
    },
    {
        question: "A character named Ralph is elected leader of a group of boys at the beginning of which book?",
        options: [" Lord of the Flies", "A Clockwork Orange", "The Jungle Book", "Brave New World"],
        correctAnswer: 0
    },
    

    {
        question: "In which town is the Royal Shakespeare Theatre Situated?",
        options: ["Ashton-under-Lyne", "Berwick-upon-Tweed", "Newcastle-upon-Tyne", "Stratford-upon-Avon"],
        correctAnswer: 3
    }
    ,

    {
        question: "What is the name of the character played by Daisy Ridley in ‘Star Wars: The Rise of Skywalker’?",
        options: ["Doh", "Rey", "Leia", "Amadea"],
        correctAnswer: 1
    }
    ,
{
        question: "The young of which creature is known as a squab?",
        options: ["Salmon", "Horse", "Pigeon", "Octopus"],
        correctAnswer: 2
    },

    {
        question: "Which country is home to the ancient city of Petra?",
        options: ["Egypt", "Jordan", "Iran", "Turkey"],
        correctAnswer: 1
    }
    ,

    {
        question: "In Greek mythology, what was left in Pandora's box?",
        options: ["Faith", "Hope", "Charity", "Justice"],
        correctAnswer: 1
    }
    ,

    {
        question: "In which Rocky film did we first hear Survivors 'Eye of the Tiger'?",
        options: ["Rocky", "Rocky II", "Rocky III", "Rocky IV"],
        correctAnswer: 2
    }
    ,

    
    {
        question: "What is the Celsius equivalent of 77 degrees Fahrenheit?",
        options: ["15", "20", "25", "30"],
        correctAnswer: 2
    }
    ,

    {
        question: "'Nephelococcygia' is the practice of doing what?",
        options: ["Finding shapes in clouds", "Sneezing with your eyes open", "Breaking glass with your voice", "Swimming in freezing water"],
        correctAnswer: 0
    }
    ,

    {
        question: "Who was the first man to travel into space twice?",
        options: [" Vladimir Titov", "Michael Collins", "Gus Grissom", "Yuri Gagarin"],
        correctAnswer: 2
    }
    ,

    {
        question: "Which programming language was developed by James Gosling at Sun Microsystems?",
        options: ["Python", "C++", "Java", "Ruby"],
        correctAnswer: 2
    }
    ,

    {
        question: "On February 22, 1989, what group won the first Grammy award for the Best Hard Rock/Metal Performance?",
        options: ["Metallica", "AC/DC", "Alice Cooper", "Jethro Tull"],
        correctAnswer: 3
    }
];

const prizeAmounts = [
    "£100", "£200", "£300", "£500", "£1,000",
    "£2,000", "£4,000", "£8,000", "£16,000", "£32,000",
    "£64,000", "£125,000", "£250,000", "£500,000", "£1,000,000"
];

let currentQuestionIndex = 0;
let currentPrizeIndex = 0;
let fiftyFiftyUsed = false;

function displayQuestion() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const currentQuestion = questions[currentQuestionIndex];

    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option';
        optionEl.textContent = `${String.fromCharCode(65 + index)}: ${option}`;
        optionEl.addEventListener('click', () => checkAnswer(index));
        optionsEl.appendChild(optionEl);
    });

    document.getElementById('fiftyFifty').disabled = fiftyFiftyUsed;
}

function displayPrizeList() {
    const prizeListEl = document.getElementById('prizeList');
    prizeListEl.innerHTML = '';

    prizeAmounts.forEach((prize, index) => {
        const prizeItemEl = document.createElement('div');
        prizeItemEl.className = 'prize-item';
        if (index === currentPrizeIndex) {
            prizeItemEl.classList.add('active');
        }
        prizeItemEl.textContent = prize;
        prizeListEl.insertBefore(prizeItemEl, prizeListEl.firstChild);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');

    options.forEach(option => option.style.pointerEvents = 'none');

    if (selectedIndex === currentQuestion.correctAnswer) {
        options[selectedIndex].classList.add('correct');
        currentPrizeIndex++;
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
                displayPrizeList();
            } else {
                endGame(true);
            }
        }, 1500);
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[currentQuestion.correctAnswer].classList.add('correct');
        setTimeout(() => endGame(false), 1500);
    }
}

function endGame(won) {
    const quizEl = document.querySelector('.quiz');
    const prizeWon = won ? '£1,000,000' : prizeAmounts[Math.max(0, currentPrizeIndex - 1)];
    quizEl.innerHTML = `
        <h1>Game Over</h1>
        <p>${won ? 'Congratulations! You won £1,000,000!' : `You won ${prizeWon}`}</p>
    `;
}

function restartGame() {
    currentQuestionIndex = 0;
    currentPrizeIndex = 0;
    fiftyFiftyUsed = false;
    displayQuestion();
    displayPrizeList();
}

function useFiftyFifty() {
    if (fiftyFiftyUsed) return;

    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    const correctIndex = currentQuestion.correctAnswer;

    let removedCount = 0;
    let i = 0;
    while (removedCount < 2 && i < options.length) {
        if (i !== correctIndex) {
            options[i].style.visibility = 'hidden';
            removedCount++;
        }
        i++;
    }

    fiftyFiftyUsed = true;
    document.getElementById('fiftyFifty').disabled = true;
}

// Initialize the game
displayQuestion();
displayPrizeList();

// Add event listener for the 50:50 button
document.getElementById('fiftyFifty').addEventListener('click', useFiftyFifty);
