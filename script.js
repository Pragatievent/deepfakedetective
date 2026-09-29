// Navigation & Section Switching Logic
function switchSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Explicitly close mobile sidebar when navigating (instead of toggling)
    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('app-sidebar');
        sidebar.classList.remove('mobile-open');
        document.body.classList.remove('sidebar-active');
    }

    window.scrollTo(0, 0);
}

// Mobile Hamburger Menu Toggle (Only used when clicking the ☰ button)
function toggleMobileSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    sidebar.classList.toggle('mobile-open');
    document.body.classList.toggle('sidebar-active');
}

// Multi-Slot Image Challenge Verification Logic (3 Slots)
const imageChallengeAnswers = {
    1: 'fake', // Slot 1: Executive Portrait (AI Fake)
    2: 'real', // Slot 2: Scenic Landscape (Real)
    3: 'fake'  // Slot 3: Food Dish Closeup (AI Fake)
};

const imageChallengeExplanations = {
    1: 'Correct! 🎯 Notice asymmetrical earrings and blurred background edges typical of generative models.',
    2: 'Correct! 🎯 This is an authentic photograph with natural optical depth and lighting.',
    3: 'Correct! 🎯 Notice the distorted cutlery geometry and unnatural texture blending common in synthetic food generation.'
};

function checkImageSlot(slotNumber, userChoice) {
    const feedbackEl = document.getElementById(`feedback-${slotNumber}`);
    const correctAnswer = imageChallengeAnswers[slotNumber];

    if (userChoice === correctAnswer) {
        feedbackEl.style.color = 'var(--success)';
        feedbackEl.innerHTML = imageChallengeExplanations[slotNumber];
    } else {
        feedbackEl.style.color = 'var(--danger)';
        feedbackEl.innerHTML = 'Incorrect. ❌ Analyze the fine textures, lighting, and edges closer!';
    }
}

// Interactive Quiz Logic
const quizData = [
    {
        question: "What neural network architecture is most commonly associated with generating realistic fake faces?",
        options: ["GANs (Generative Adversarial Networks)", "SQL Databases", "TCP/IP Protocol", "SMTP Mail Servers"],
        correct: 0
    },
    {
        question: "Which of the following is a classic indicator of an audio deepfake?",
        options: ["Mechanical robotic humming", "Unnatural breathing pauses or missing background room tone", "Crystal clear sound quality always", "Extremely loud volume"],
        correct: 1
    },
    {
        question: "What is 'The Liar's Dividend'?",
        options: ["Financial payouts given to whistleblowers", "When real media evidence is dismissed as a deepfake", "A tax on AI software companies", "An algorithm reward"],
        correct: 1
    }
];

let currentQuizIndex = 0;
let score = 0;

function loadQuiz() {
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const nextBtn = document.getElementById('next-btn');

    if (currentQuizIndex < quizData.length) {
        const currentData = quizData[currentQuizIndex];
        questionEl.innerHTML = `Question ${currentQuizIndex + 1}: ${currentData.question}`;
        optionsEl.innerHTML = '';
        nextBtn.style.display = 'none';

        currentData.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.innerText = option;
            btn.onclick = () => selectQuizOption(index, currentData.correct);
            optionsEl.appendChild(btn);
        });
    } else {
        questionEl.innerHTML = `Quiz Completed! 🎉`;
        optionsEl.innerHTML = `<p>Your Score: ${score} out of ${quizData.length}</p>`;
        nextBtn.style.display = 'none';
    }
}

function selectQuizOption(selectedIndex, correctIndex) {
    const optionsEl = document.getElementById('quiz-options');
    const buttons = optionsEl.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (i === correctIndex) {
            buttons[i].style.backgroundColor = 'var(--success)';
        } else if (i === selectedIndex) {
            buttons[i].style.backgroundColor = 'var(--danger)';
        }
    }

    if (selectedIndex === correctIndex) {
        score++;
    }

    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuizIndex++;
    loadQuiz();
}

// Initialize Quiz on load
window.onload = function() {
    loadQuiz();
};

// Survey submission & aggregated results handling
let surveyDataSummary = {
    totalSubmissions: 0,
    ages: { "under 18": 0, "18 - 20": 0, "21 - 25": 0, "above 25": 0 },
    occupations: { "Student": 0, "Working": 0, "Other": 0 },
    q1: { "Yes": 0, "No": 0, "Not Sure": 0 },
    q2: { "Yes": 0, "No": 0, "Not Sure": 0 },
    q3: { "Yes": 0, "No": 0, "Not Sure": 0 },
    q4: { "Yes": 0, "No": 0, "Not Sure": 0 },
    q5: { "Image": 0, "Audio": 0, "Text": 0, "Not Sure": 0 },
    q6: { "Yes": 0, "No": 0, "Not Sure": 0 },
    q7: { "Yes": 0, "No": 0, "Not Sure": 0 }
};

function submitSurvey(event) {
    event.preventDefault();
    
    const age = document.getElementById('survey-age').value;
    const occupation = document.getElementById('survey-occupation').value;
    const q1 = document.getElementById('survey-q1').value;
    const q2 = document.getElementById('survey-q2').value;
    const q3 = document.getElementById('survey-q3').value;
    const q4 = document.getElementById('survey-q4').value;
    const q5 = document.getElementById('survey-q5').value;
    const q6 = document.getElementById('survey-q6').value;
    const q7 = document.getElementById('survey-q7').value;

    if (age && occupation && q1 && q2 && q3 && q4 && q5 && q6 && q7) {
        surveyDataSummary.totalSubmissions++;
        surveyDataSummary.ages[age]++;
        surveyDataSummary.occupations[occupation]++;
        surveyDataSummary.q1[q1]++;
        surveyDataSummary.q2[q2]++;
        surveyDataSummary.q3[q3]++;
        surveyDataSummary.q4[q4]++;
        surveyDataSummary.q5[q5]++;
        surveyDataSummary.q6[q6]++;
        surveyDataSummary.q7[q7]++;

        alert('Thank you for submitting your survey response!');

        const statsEl = document.getElementById('result-stats');
        statsEl.innerHTML = `
            <p><strong>Total Submissions:</strong> ${surveyDataSummary.totalSubmissions}</p>
            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1rem 0;">
            <p><strong>Demographics Breakdown:</strong><br>
            • Age: Under 18 (${surveyDataSummary.ages["under 18"]}) | 18-20 (${surveyDataSummary.ages["18 - 20"]}) | 21-25 (${surveyDataSummary.ages["21 - 25"]}) | Above 25 (${surveyDataSummary.ages["above 25"]})<br>
            • Occupation: Student (${surveyDataSummary.occupations["Student"]}) | Working (${surveyDataSummary.occupations["Working"]}) | Other (${surveyDataSummary.occupations["Other"]})</p>
            
            <p><strong>1. Heard of deepfakes:</strong> Yes (${surveyDataSummary.q1.Yes}) | No (${surveyDataSummary.q1.No}) | Not Sure (${surveyDataSummary.q1["Not Sure"]})</p>
            <p><strong>2. Encountered AI content:</strong> Yes (${surveyDataSummary.q2.Yes}) | No (${surveyDataSummary.q2.No}) | Not Sure (${surveyDataSummary.q2["Not Sure"]})</p>
            <p><strong>3. Can identify a deepfake:</strong> Yes (${surveyDataSummary.q3.Yes}) | No (${surveyDataSummary.q3.No}) | Not Sure (${surveyDataSummary.q3["Not Sure"]})</p>
            <p><strong>4. Checked source of suspicious post:</strong> Yes (${surveyDataSummary.q4.Yes}) | No (${surveyDataSummary.q4.No}) | Not Sure (${surveyDataSummary.q4["Not Sure"]})</p>
            <p><strong>5. Most encountered type:</strong> Image (${surveyDataSummary.q5.Image}) | Audio (${surveyDataSummary.q5.Audio}) | Text (${surveyDataSummary.q5.Text}) | Not Sure (${surveyDataSummary.q5["Not Sure"]})</p>
            <p><strong>6. Deepfakes used for scams:</strong> Yes (${surveyDataSummary.q6.Yes}) | No (${surveyDataSummary.q6.No}) | Not Sure (${surveyDataSummary.q6["Not Sure"]})</p>
            <p><strong>7. Want to learn more:</strong> Yes (${surveyDataSummary.q7.Yes}) | No (${surveyDataSummary.q7.No}) | Not Sure (${surveyDataSummary.q7["Not Sure"]})</p>
        `;

        document.getElementById('community-survey').reset();
        switchSection('survey-results');
    }
}
