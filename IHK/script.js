// Declare variables to hold the question and answer elements
const question = document.getElementById('question');
const answer = document.getElementById('answer');


// Variable to store the questions and answers loaded from the JSON
let questionsData = [];

// Fetch the questions from the JSON file
fetch('json.json')
    .then(response => response.json()) // Parse the JSON data
    .then(data => {
        if (data && Array.isArray(data)) {
            questionsData = data; // Store the fetched data into the questionsData array
            displayRandomQuestion(); // Display a random question immediately when the page loads
            //displayAnswer();
        } else {
            console.error('Error: No data found or data is not an array');
        }
    })
    .catch(error => console.error('Error:', error)); // Handle any errors in the fetch request

// Function to display a random question
function displayRandomQuestion() {
    // Generate a random index based on the length of the questionsData array
    const randomIndex = Math.floor(Math.random() * questionsData.length);
    const selectedQuestion = questionsData[randomIndex];

    // Extract the question and answer fields from the selected object
    const questionText = Object.values(selectedQuestion)[0];
    const answerText = Object.values(selectedQuestion)[1];

    // Set the inner HTML of the question and answer elements
    question.innerHTML = questionText;
    answer.innerHTML = answerText;
    answer.style.display = 'none'; // Ensure the answer is hidden initially
}

function displayAnswer(){
   //var paragraph = document.getElementById('answer');
    answer.style.display = 'block'; // Change display property to 'block' to show it
}
// Add event listener to the button
//document.getElementById('myButton').onclick = displayAnswer;
document.getElementById('myButton').addEventListener('click', displayAnswer);

