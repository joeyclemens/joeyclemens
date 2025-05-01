// Define word sets for each day
let wordSets = {
    "2024-09-16": ["antibiotic", "cardiology", "dermatology", "endoscopy", "pathology", "ultrasound", "syringe", "x-ray", "nebulizer", "dialysis", "incubator", "inhaler", "injection", "analyser", "hoist", "surgery", "theatre", "maternity", "mortuary", "inpatients", "outpatients", "anesthesia", "biopsy", "catheter", "ct scan", "diagnosis", "emergency room", "epidural", "glucose monitor", "gurney", "health record", "hygiene", "iv drip", "lab test", "mri", "nurse", "ophthalmology", "orthopedics", "pediatrician", "prescription", "radiology", "rehabilitation", "stethoscope", "sphygmomanometer", "thermometer", "transfusion", "ventilator", "vaccination", "vital signs", "wellness", "wound care", "admission", "allergy", "asthma", "chronic disease", "cpr", "diagnostic test", "emergency", "endocrinology", "euthanasia", "gastroenterology", "hematology", "infection control", "neurobiology", "oncology", "orthotics", "palliative care", "pharmacy", "rehab", "sanitation", "telemedicine"],
    "2025-05-01": ["inception", "titanic", "avatar", "jurrasic park", "the matrix", "interstellar", "star wars", "casablanca", "the terminator", "mad max", "jaws", "rocky", "gladiator", "the godfather", "pulp fiction", "the dark knight", "the lord of the rings", "the silence of the lambs", "forrest gump", "back to the future", "die hard", "shawshank redemption", "the lion king", "goodfellas", "fight club", "pirates of the caribbean", "the avengers", "spider-man", "schindler's list", "the departed", "indiana jones", "black panther", "eternal sunshine of the spotless mind", "la la land", "django unchained", "the prestige", "toy story", "saving private ryan", "alien", "aliens", "blade runner", "the big lebowski", "fargo", "apollo 13", "a beautiful mind", "the social network", "the hangover", "the wolf of wall street", "american beauty", "a clockwork orange", "no country for old men", "whiplash", "her", "the grand budapest hotel", "get out", "the green mile", "inglourious basterds", "the great gatsby", "silver linings playbook", "gravity", "the king's speech", "mad max: fury road", "ex machina", "logan", "arrival", "the shape of water", "joker", "parasite", "1917", "knives out", "once upon a time in hollywood", "bohemian rhapsody", "a star is born", "it", "wonder woman", "zootopia", "inside out", "frozen", "guardians of the galaxy", "dr. strange", "thor: ragnarok", "captain marvel", "mission: impossible - fallout", "john wick", "deadpool", "the hateful eight", "the irishman", "the martian"],
    "2024-07-03": ["afghanistan", "albania", "algeria", "argentina", "australia", "austria", "bangladesh", "belgium", "brazil", "canada", "chad", "chile", "china", "colombia", "denmark", "egypt", "finland", "france", "germany", "greece", "hungary", "india", "iran", "ireland", "italy", "japan", "kenya", "mexico", "morocco", "netherlands", "nigeria", "norway", "pakistan", "poland", "russia", "spain", "sweden", "thailand", "turkey", "vietnam", "andorra", "angola", "armenia", "azerbaijan", "belarus", "bolivia", "bosnia and herzegovina", "botswana", "brunei", "bulgaria", "cambodia", "cameroon", "central african republic", "cyprus", "czech republic", "dominican republic", "east timor", "equatorial guinea", "estonia", "fiji", "gabon", "gambia", "georgia", "ghana", "grenada", "guatemala", "guyana", "haiti", "honduras", "iceland", "indonesia", "jordan", "kuwait", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", "luxembourg", "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", "mauritania", "mauritius", "moldova", "monaco", "mongolia", "montenegro", "mozambique", "namibia", "nauru", "nepal", "new zealand", "nicaragua", "niger", "north korea", "north macedonia", "palau", "panama", "papua new guinea", "paraguay", "peru", "rwanda", "san marino", "saudi arabia", "senegal", "serbia", "seychelles", "sierra leone", "singapore", "slovakia", "slovenia", "solomon islands", "somalia", "south africa", "south korea", "south sudan", "sudan", "suriname", "sweden", "switzerland", "syria", "tanzania", "togo", "tonga", "trinidad and tobago", "tunisia", "turkmenistan", "tuvalu", "uganda", "ukraine", "united arab emirates", "united kingdom", "united states", "uruguay", "uzbekistan", "vanuatu", "yemen", "zambia", "zimbabwe"],
   
    // Add more sets for each day as needed
};

// Function to get words for the current day
function getWordsForCurrentDay() {
    const themes = [
        { words: ["inception", "titanic", "avatar", "jurrasic park", "the matrix", "interstellar", "star wars", "casablanca", "the terminator", "mad max", "jaws", "rocky", "gladiator", "the godfather", "pulp fiction", "the dark knight", "the lord of the rings", "the silence of the lambs", "forrest gump", "back to the future", "die hard", "shawshank redemption", "the lion king", "goodfellas", "fight club", "pirates of the caribbean", "the avengers", "spiderman", "schindler's list", "the departed", "indiana jones", "black panther", "eternal sunshine of the spotless mind", "la la land", "django unchained", "the prestige", "toy story", "saving private ryan", "alien", "aliens", "blade runner", "the big lebowski", "fargo", "apollo 13", "a beautiful mind", "the social network", "the hangover", "the wolf of wall street", "american beauty", "a clockwork orange", "no country for old men", "whiplash", "her", "the grand budapest hotel", "get out", "the green mile", "inglourious basterds", "the great gatsby", "silver linings playbook", "gravity", "the king's speech", "mad max: fury road", "ex machina", "logan", "arrival", "the shape of water", "joker", "parasite", "1917", "knives out", "once upon a time in hollywood", "bohemian rhapsody", "a star is born", "it", "wonder woman", "zootopia", "inside out", "frozen", "guardians of the galaxy", "dr. strange", "thor: ragnarok", "captain marvel", "mission: impossible - fallout", "john wick", "deadpool", "the hateful eight", "the irishman", "the martian"], theme: "Movies" },
        { words: ["afghanistan", "albania", "algeria", "argentina", "australia", "austria", "bangladesh", "belgium", "brazil", "canada", "chad", "chile", "china", "colombia", "denmark", "egypt", "finland", "france", "germany", "greece", "hungary", "india", "iran", "ireland", "italy", "japan", "kenya", "mexico", "morocco", "netherlands", "nigeria", "norway", "pakistan", "poland", "russia", "spain", "sweden", "thailand", "turkey", "vietnam", "andorra", "angola", "armenia", "azerbaijan", "belarus", "bolivia", "bosnia and herzegovina", "botswana", "brunei", "bulgaria", "cambodia", "cameroon", "central african republic", "cyprus", "czech republic", "dominican republic", "east timor", "equatorial guinea", "estonia", "fiji", "gabon", "gambia", "georgia", "ghana", "grenada", "guatemala", "guyana", "haiti", "honduras", "iceland", "indonesia", "jordan", "kuwait", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", "luxembourg", "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", "mauritania", "mauritius", "moldova", "monaco", "mongolia", "montenegro", "mozambique", "namibia", "nauru", "nepal", "new zealand", "nicaragua", "niger", "north korea", "north macedonia", "palau", "panama", "papua new guinea", "paraguay", "peru", "rwanda", "san marino", "saudi arabia", "senegal", "serbia", "seychelles", "sierra leone", "singapore", "slovakia", "slovenia", "solomon islands", "somalia", "south africa", "south korea", "south sudan", "sudan", "suriname", "sweden", "switzerland", "syria", "tanzania", "togo", "tonga", "trinidad and tobago", "tunisia", "turkmenistan", "tuvalu", "uganda", "ukraine", "united arab emirates", "united kingdom", "united states", "uruguay", "uzbekistan", "vanuatu", "yemen", "zambia", "zimbabwe"], theme: "Countries" }
    ];
    
    // Randomly select a theme
    const randomIndex = Math.floor(Math.random() * themes.length);
    const selectedTheme = themes[randomIndex];
    const words = selectedTheme.words; // Get words for the selected theme

    // Set theme header based on the selected theme
    let themeHeader = document.getElementById("themeHeader");
    themeHeader.innerText = `The Theme is: ${selectedTheme.theme}`;

    // Display the words (assuming you have a function to display them)
    displayWords(words);

    return words;
}

function displayWords(words) {
    const wordContainer = document.getElementById("word");
    wordContainer.innerHTML = words.join(", "); // Display words as a comma-separated list
}

// Define words array using words for the current day
let words = getWordsForCurrentDay();

// Array to keep track of used words
let usedWords = [];

// Select a random word from the array
let randomWord = getRandomWord();

// Display the shuffled word
displayWord(shuffleWord(randomWord));

// Initialize or load score from localStorage
let scoreData = localStorage.getItem('scoreData');
let score = 0;
if (scoreData) {
    scoreData = JSON.parse(scoreData);
    if (Date.now() - scoreData.timestamp < 24 * 60 * 60 * 1000) {
        score = scoreData.score;
    } else {
        localStorage.removeItem('scoreData');
    }
}

// Display initial score
updateScore();

// Function to get a random word from the array
function getRandomWord() {
    // If all words have been used, reset the usedWords array
    if (usedWords.length === words.length) {
        usedWords = [];
    }
    let newRandomWord;
    do {
        newRandomWord = words[Math.floor(Math.random() * words.length)];
    } while (usedWords.includes(newRandomWord)); // Keep selecting new word until it's not a repeat
    usedWords.push(newRandomWord); // Add the new word to usedWords array
    return newRandomWord;
}

// Function to display the shuffled word
function displayWord(word) {
    let wordToDisplay = word;
    if (word !== "Game Over") {
        wordToDisplay = shuffleWord(word);
    }
    document.getElementById("word").innerText = wordToDisplay;
}

// Function to shuffle letters of the word
function shuffleWord(word) {
    return word.split('').sort(function(){return 0.5-Math.random()}).join('');
}

// Function to update score
function updateScore() {
    document.getElementById("score").innerText = `Score: ${score}`;
}

// Function to check if the input is a valid anagram
function checkAnagram() {
    let userInput = document.getElementById("userInput").value.toLowerCase().trim(); // Trim whitespace

    if (userInput === randomWord) {
        document.getElementById("result").innerText = "Correct!";
        document.getElementById("correctSound").play();
        score++;
        updateScore();
        document.body.style.backgroundColor = "#4CAF50"; // Green color
        randomWord = getRandomWord();
        displayWord(shuffleWord(randomWord));
        document.getElementById("userInput").value = "";
    } else {
        document.getElementById("result").innerText = "Incorrect, try again.";
        document.getElementById("incorrectSound").play();
        document.body.style.backgroundColor = "#FF5733"; // Red color
    }

    // Check if all words have been used
    if (usedWords.length === words.length) {
        displayFinalScore();
        handleGameOver(); // Call handleGameOver when all words are exhausted
    }
}

// Function to display the final score
function displayFinalScore() {
    const finalScoreElement = document.getElementById("finalScore");
    finalScoreElement.innerText = `Your final score is: ${score}`;
    finalScoreElement.style.display = "block"; // Show the final score
}

// Function to reset the game
function resetGame() {
    if (score !== 0) {
        // Show the modal with the final score
        document.getElementById("modalScore").innerText = score;
        document.getElementById("scoreModal").style.display = "block";
    } else {
        // Start a new game directly if score is 0
        startNewGame();
    }
}

// Function to start a new game
function startNewGame() {
    score = 0;
    usedWords = [];
    words = getWordsForCurrentDay(); // Reset words
    randomWord = getRandomWord();
    displayWord(shuffleWord(randomWord));
    updateScore();
    document.getElementById("finalScore").style.display = "none"; // Hide final score
    closeModal(); // Close the modal when starting a new game
}

// Function to close the modal
function closeModal() {
    document.getElementById("scoreModal").style.display = "none";
}

// Function to skip the current word
function skipWord() {
    // Decrement the score by 1
    score--;
    // Update the score display
    updateScore();
    // Get a new random word
    randomWord = getRandomWord();
    // Display the new shuffled word
    displayWord(shuffleWord(randomWord));
    // Clear the input field
    document.getElementById("userInput").value = "";
    // Clear the result message
    document.getElementById("result").innerText = "";
    
    // Check if all words have been used
    if (usedWords.length === words.length) {
        displayWord("Game Over");
        handleGameOver(); // Call handleGameOver when all words are exhausted
    }
}

function confirmReset() {
    var confirmation = confirm("Are you sure you want to reset the score?");
    if (confirmation) {
        resetScore();
    } else {
        // Do nothing or provide feedback to the user if needed
    }
}

// Function to reset the score to 0
function resetScore() {
    // Reset the score to 0
    score = 0;
    // Update the score display
    updateScore();
    // Clear the localStorage
    localStorage.removeItem('scoreData');
}

document.addEventListener("DOMContentLoaded", function() {
    // JavaScript code for handling the modal
    // Get the help modal
    var modal = document.getElementById("helpModal");
  
    // Get the help button that opens the modal
    var helpBtn = document.getElementById("helpButton");
  
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  
    // When the user clicks the button, open the modal 
    helpBtn.onclick = function() {
      modal.style.display = "block";
    }
  
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // Check if game over flag is set and date is today
    let gameOverData = localStorage.getItem('gameOverData');
    if (gameOverData) {
        gameOverData = JSON.parse(gameOverData);
        const today = new Date();
        const storedDate = new Date(gameOverData.timestamp);
        if (today.toDateString() === storedDate.toDateString()) {
            // Game over, disable input field and skip button
            document.getElementById("userInput").disabled = true;
            document.getElementById("skipButton").disabled = true;
        }
    }
});

// Function to handle midnight reset
function handleMidnightReset() {
    const now = new Date();
    const resetTime = new Date(now);
    resetTime.setHours(23, 59, 0, 0); // Set to 11:59 PM
    const timeUntilReset = resetTime - now;

    // Schedule next reset at 11:59 PM
    setTimeout(() => {
        // Clear localStorage to reset game state
        localStorage.removeItem('gameOverData');
    }, timeUntilReset);
}

// Function to handle game over
function handleGameOver() {
    // Store game over flag and current date
    localStorage.setItem('gameOverData', JSON.stringify({ gameOver: true, timestamp: Date.now() }));
    
    // Disable input field and skip button
    document.getElementById("userInput").disabled = true;
    document.getElementById("skipButton").disabled = true;

    // Handle midnight reset
    handleMidnightReset();
}

// Function to detect if the device is mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Log device type for debugging
console.log("Is mobile device: ", isMobileDevice());

// Only apply custom cursor if the device is not mobile
if (!isMobileDevice()) {
    document.addEventListener("DOMContentLoaded", function() {
        // Create a new image element for the custom cursor
        var customCursor = document.createElement("img");
        customCursor.src = "custom-cursor.png"; // Ensure you have the correct path to the cursor image
        customCursor.style.position = "fixed";
        customCursor.style.pointerEvents = "none"; // Ensure the cursor doesn't interfere with clicks
        customCursor.style.zIndex = "9999"; // Make sure the cursor appears above other elements
        customCursor.style.width = "32px"; // Adjust the width and height as needed
        customCursor.style.height = "32px";

        // Add the custom cursor to the body
        document.body.appendChild(customCursor);

        // Update the position of the custom cursor to follow the mouse movement
        document.addEventListener("mousemove", function(event) {
            customCursor.style.left = event.clientX + "px";
            customCursor.style.top = event.clientY + "px";
        });
    });
} else {
    console.log("Custom cursor is disabled on mobile devices.");
}

document.addEventListener('DOMContentLoaded', function () {
    // Find the form element
    const form = document.getElementById('scoreForm');

    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Customized prompt message
        const teamName = prompt("Please enter your Team Name/Name and submit your score:");

        // Check if the team name is not empty and user clicked OK
        if (teamName && teamName.trim() !== '') {
            // Get score
            let scoreValue = score;

            // Set score and team name in hidden input fields
            document.getElementById("scoreInput").value = scoreValue;
            document.getElementById("teamNameInput").value = teamName.trim();

            // Submit the form
            this.submit();
        } else {
            // If team name is empty or user clicked Cancel, inform them and do nothing
            alert("Back to the Anagrams you go...");
        }
    });
});
