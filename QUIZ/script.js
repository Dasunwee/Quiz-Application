const questions = [
  {
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "HighText Transfer Protocol",
      "HyperText Transmission Protocol",
      "Hyperlink Transfer Protocol"
    ],
    correct: 0,
    explanation: "HTTP stands for HyperText Transfer Protocol, which is used for communication between web browsers and servers."
  },
  {
    question: "What is the primary purpose of an IP address?",
    options: [
      "Identify devices on a network",
      "Encrypt data",
      "Provide faster internet speeds",
      "Store website data"
    ],
    correct: 0,
    explanation: "An IP address uniquely identifies devices on a network and enables communication between them."
  },
  {
    question: "Which programming language is primarily used for web development?",
    options: ["Python", "JavaScript", "C++", "Swift"],
    correct: 1,
    explanation: "JavaScript is widely used to create interactive features on websites."
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Styling System",
      "Cascading Sheet Styles"
    ],
    correct: 0,
    explanation: "CSS stands for Cascading Style Sheets and is used to style HTML elements."
  },
  {
    question: "What is a firewall in network security?",
    options: [
      "A type of antivirus software",
      "A hardware device to speed up the internet",
      "A system to prevent unauthorized access",
      "A tool to optimize computer performance"
    ],
    correct: 2,
    explanation: "A firewall is used to monitor and control incoming and outgoing network traffic to prevent unauthorized access."
  },
  {
    question: "Which of the following is a relational database?",
    options: ["MongoDB", "Oracle", "Redis", "Neo4j"],
    correct: 1,
    explanation: "Oracle is a relational database management system (RDBMS) that uses structured query language (SQL)."
  },
  {
    question: "What is the function of DNS?",
    options: [
      "Store website data",
      "Convert domain names to IP addresses",
      "Encrypt internet traffic",
      "Enhance download speed"
    ],
    correct: 1,
    explanation: "DNS (Domain Name System) translates human-readable domain names into IP addresses used by computers."
  },
  {
    question: "Which of the following is an operating system?",
    options: ["Python", "MySQL", "Linux", "HTML"],
    correct: 2,
    explanation: "Linux is an open-source operating system used for a variety of devices and servers."
  },
  {
    question: "What does IDE stand for in software development?",
    options: [
      "Integrated Development Environment",
      "Internet Development Engine",
      "Integrated Data Exchange",
      "Intelligent Design Execution"
    ],
    correct: 0,
    explanation: "IDE stands for Integrated Development Environment, which provides tools for coding, debugging, and testing software."
  },
  {
    question: "Which of the following is a cybersecurity threat?",
    options: ["Firewall", "Phishing", "Cloud Storage", "Compiler"],
    correct: 1,
    explanation: "Phishing is a type of cybersecurity attack where attackers deceive users into providing sensitive information."
  },
  {
    question: "What is the purpose of an API?",
    options: [
      "Connect different software applications",
      "Optimize computer performance",
      "Encrypt data for security",
      "Manage server resources"
    ],
    correct: 0,
    explanation: "An API (Application Programming Interface) allows different software applications to communicate with each other."
  },
  {
    question: "Which of these is an example of cloud storage?",
    options: ["Dropbox", "RAM", "SSD", "BIOS"],
    correct: 0,
    explanation: "Dropbox is a cloud storage service that allows users to save and access files online."
  },
  {
    question: "What does IoT stand for?",
    options: [
      "Internet of Tools",
      "Integration of Technology",
      "Internet of Things",
      "Internet of Transactions"
    ],
    correct: 2,
    explanation: "IoT stands for Internet of Things, which refers to the interconnected network of devices that communicate over the internet."
  },
  {
    question: "What is the purpose of version control in software development?",
    options: [
      "To backup data",
      "To track changes in code",
      "To manage servers",
      "To encrypt code"
    ],
    correct: 1,
    explanation: "Version control systems like Git help developers track and manage changes to their codebase over time."
  },
  {
    question: "What is the role of a router in networking?",
    options: [
      "Store data",
      "Connect different networks",
      "Secure a network",
      "Optimize internet speed"
    ],
    correct: 1,
    explanation: "A router connects different networks and directs data packets between them."
  }
];


let currentQuestionIndex = 0;
let score = 0;
let attemptsLeft = 3;
let quizStarted = false;
let timer;
let timeLeft = 300;  // 5 minutes in seconds
let userAnswers = []; // To store user's answers

function startQuiz() {
  if (!quizStarted) {
    quizStarted = true;
    document.getElementById("start").hidden = true;
    document.getElementById("quiz").hidden = false;
    document.getElementById("next").disabled = false;
    document.getElementById("prev").disabled = true;
    document.getElementById("end").hidden = false;
    document.getElementById("attempts").innerText = `Attempts Left: ${attemptsLeft}`;
    showQuestion();
    startTimer();
  }
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question-number").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  document.getElementById("question").innerText = question.question;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type='radio' name='answer' value='${index}' id='option${index}'><label for='option${index}'>${option}</label>`;
    answers.appendChild(li);
  });

  // Hide result and explanation initially
  document.getElementById("result").hidden = true;
  document.getElementById("explanation").hidden = true;
}

function nextQuestion() {
  const selectedOption = document.querySelector("input[name='answer']:checked");
  if (!selectedOption) {
    alert("Please select an answer before proceeding.");
    return;
  }

  const answer = parseInt(selectedOption.value);
  userAnswers[currentQuestionIndex] = answer; // Store the user's answer

  // Show feedback whether the answer was correct or incorrect
  const resultMessage = document.getElementById("result");
  const explanationMessage = document.getElementById("explanation");

  if (answer === questions[currentQuestionIndex].correct) {
    score++;
    resultMessage.innerText = "Correct!";
  } else {
    resultMessage.innerText = "Wrong!";
  }

  // Set the explanation message
  explanationMessage.innerText = questions[currentQuestionIndex].explanation;
  
  // Show feedback and explanation
  resultMessage.hidden = false;
  explanationMessage.hidden = false;

  // After showing feedback and explanation, delay before moving to the next question
  setTimeout(function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }

    // Hide the explanation and result for the next question
    resultMessage.hidden = true;
    explanationMessage.hidden = true;
  }, 2000); // 2 seconds delay to allow user to read feedback and explanation
}


function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up! The quiz has ended.");
      endQuiz();
    }
  }, 1000); // Update every second
}

function endQuiz() {
  clearInterval(timer); // Stop the timer when quiz ends
  document.getElementById("quiz").hidden = true;
  document.getElementById("next").disabled = true;
  document.getElementById("prev").disabled = true;
  document.getElementById("submit").hidden = false;
  document.getElementById("score").hidden = false;
  document.getElementById("score-value").innerText = `${score} out of ${questions.length}`;
  attemptsLeft--;
  if (attemptsLeft > 0) {
    alert(`You have ${attemptsLeft} attempt(s) left.`);
    resetQuiz();
  } else {
    alert("You have used all attempts. Thank you for participating!");
  }
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizStarted = false;
  document.getElementById("start").hidden = false;
  document.getElementById("quiz").hidden = true;
  document.getElementById("score").hidden = true;
  document.getElementById("submit").hidden = true;
  document.getElementById("time").innerText = "300"; // Reset timer to 5 minutes
}

function initializeQuiz() {
  document.getElementById("quiz").hidden = true;
  document.getElementById("score").hidden = true;
  document.getElementById("submit").hidden = true;
  document.getElementById("end").hidden = true;
  document.getElementById("start").hidden = false;
}

window.onload = initializeQuiz;
