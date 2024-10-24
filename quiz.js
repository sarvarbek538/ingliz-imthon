// 30 ta savol
const questions = [
    { question: "What is the capital of England?", answer: "London" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What color is the sky on a clear day?", answer: "Blue" },
    { question: "What is the opposite of 'big'?", answer: "Small" },
    { question: "How many days are there in a week?", answer: "7" },
    { question: "What is the first letter of the English alphabet?", answer: "A" },
    { question: "What do bees make?", answer: "Honey" },
    { question: "What is the name of our planet?", answer: "Earth" },
    { question: "How many legs does a spider have?", answer: "8" },
    { question: "What is the color of a banana?", answer: "Yellow" },
    { question: "What is 5 - 3?", answer: "2" },
    { question: "What do you use to write on paper?", answer: "Pen" },
    { question: "How many months are in a year?", answer: "12" },
    { question: "What is the opposite of 'hot'?", answer: "Cold" },
    { question: "How many hours are there in a day?", answer: "24" },
    { question: "What animal is known as man's best friend?", answer: "Dog" },
    { question: "What color are apples?", answer: "Red" },
    { question: "What number comes after 9?", answer: "10" },
    { question: "What do cows drink?", answer: "Water" },
    { question: "What is the color of grass?", answer: "Green" },
    { question: "What is 3 x 3?", answer: "9" },
    { question: "What is the opposite of 'up'?", answer: "Down" },
    { question: "What do we breathe?", answer: "Air" },
    { question: "What is the fourth day of the week?", answer: "Thursday" },
    { question: "What do fish live in?", answer: "Water" },
    { question: "What fruit is orange in color?", answer: "Orange" },
    { question: "What is 10 divided by 2?", answer: "5" },
    { question: "What do you use to eat soup?", answer: "Spoon" },
    { question: "What color are lemons?", answer: "Yellow" },
    { question: "How many fingers are on one hand?", answer: "5" }
];

let score = 0;

function displayQuestions() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = ''; // Savol bo'shlig'ini tozalash

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <p><strong>${index + 1}. </strong> ${q.question}</p>
            <input type="text" id="answer${index}" placeholder="Your answer" required>
        `;
        questionContainer.appendChild(questionDiv);
    });
}

document.getElementById('submitQuiz').addEventListener('click', function() {
    score = 0;

    questions.forEach((q, index) => {
        const userAnswer = document.getElementById(`answer${index}`).value;

        if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
            score++;
        }
    });

    const name = localStorage.getItem('name');
    const phone = localStorage.getItem('phone');

    alert(`${name}, you scored ${score} out of ${questions.length}`);
    sendResultsToBot(name, phone, score);
});

function sendResultsToBot(name, phone, score) {
    const botToken = '7818104445:AAFZz4_kbDvzEaBWDnf7qupPY1EHsJL7xHE';
    const chatId = '6206221012';

    // Faqat natijani yuboradigan xabar
    const message = `Name: ${name}\nPhone: ${phone}\nScore: ${score}/${questions.length}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log("Message sent successfully");
            } else {
                console.log("Error sending message");
            }
        })
        .catch(error => console.log(error));
}

window.onload = displayQuestions;