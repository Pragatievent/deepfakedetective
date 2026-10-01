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
    
    // Explicitly close mobile sidebar when navigating
    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('app-sidebar');
        sidebar.classList.remove('mobile-open');
        document.body.classList.remove('sidebar-active');
    }

    window.scrollTo(0, 0);
}

// Mobile Hamburger Menu Toggle
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

// Multi-Slot Video Challenge Verification Logic (3 Slots)
const videoChallengeAnswers = {
    1: 'fake', // Clip 1: The Celebrity Face-Swap (AI Fake)
    2: 'real', // Clip 2: The Robotic Stare / Broadcast (Real)
    3: 'fake'  // Clip 3: The Audio Delay (AI Fake)
};

const videoChallengeExplanations = {
    1: 'Correct! 🎯 This is a Face-Swap deepfake. Notice the subtle blurring or skin-tone mismatch along the jawline.',
    2: 'Correct! 🎯 Well spotted! Natural movement, consistent lighting, textures, and background details indicate that this is real footage.',
    3: 'Correct! 🎯 Great observation! Small inconsistencies in movement, appearance, lighting, and background can reveal AI-generated content.'
};

function checkVideoSlot(slotNumber, userChoice) {
    const feedbackEl = document.getElementById(`video-feedback-${slotNumber}`);
    const correctAnswer = videoChallengeAnswers[slotNumber];

    if (userChoice === correctAnswer) {
        feedbackEl.style.color = 'var(--success)';
        feedbackEl.innerHTML = videoChallengeExplanations[slotNumber];
    } else {
        feedbackEl.style.color = 'var(--danger)';
        feedbackEl.innerHTML = 'Incorrect. ❌ It’s easy to be fooled! AI videos can look realistic. Check faces, movement, hands, lighting, shadows, and frame-to-frame consistency carefully.';
    }
}

// Interactive Quiz Logic with Score & Progress Tracking
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
    const progressEl = document.getElementById('quiz-progress');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const nextBtn = document.getElementById('next-btn');

    if (currentQuizIndex < quizData.length) {
        const currentData = quizData[currentQuizIndex];
        if (progressEl) progressEl.innerHTML = `Question ${currentQuizIndex + 1} of ${quizData.length} &bull; Current Score: ${score}`;
        if (questionEl) questionEl.innerHTML = currentData.question;
        if (optionsEl) optionsEl.innerHTML = '';
        if (nextBtn) nextBtn.style.display = 'none';

        currentData.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.innerText = option;
            btn.onclick = () => selectQuizOption(index, currentData.correct);
            optionsEl.appendChild(btn);
        });
    } else {
        if (progressEl) progressEl.innerHTML = `Quiz Completed! 🎉`;
        if (questionEl) questionEl.innerHTML = `Final Evaluation Score: ${score} / ${quizData.length}`;
        if (optionsEl) optionsEl.innerHTML = `<p style="text-align:center; font-weight:600; color:var(--success);">Great job testing your synthetic media literacy!</p>`;
        if (nextBtn) nextBtn.style.display = 'none';
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

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuizIndex++;
    loadQuiz();
}

// Survey persistence & email deduplication logic
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

let submittedEmails = [];

// Load stored survey data and emails on startup
function loadStoredSurveyData() {
    const savedData = localStorage.getItem('deepfakeSurveySummary');
    const savedEmails = localStorage.getItem('deepfakeSubmittedEmails');

    if (savedData) {
        surveyDataSummary = JSON.parse(savedData);
    }
    if (savedEmails) {
        submittedEmails = JSON.parse(savedEmails);
    }
    renderSurveyStats();
}

function renderBarChart(title, dataObj, total) {
    let html = `<div style="margin-bottom: 1.5rem;"><p style="font-weight: 600; color: var(--text-main); margin-bottom: 0.5rem;">${title}</p>`;
    for (let key in dataObj) {
        let count = dataObj[key];
        let pct = total > 0 ? Math.round((count / total) * 100) : 0;
        html += `
            <div style="margin-bottom: 0.3rem; font-size: 0.85rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                    <span>${key}</span><span>${count} (${pct}%)</span>
                </div>
                <div class="chart-bar-container">
                    <div class="chart-bar-fill" style="width: ${pct}%;"></div>
                </div>
            </div>
        `;
    }
    html += `</div>`;
    return html;
}

function renderSurveyStats() {
    const total = surveyDataSummary.totalSubmissions;
    const statsEl = document.getElementById('result-stats');
    if (!statsEl) return;

    if (total === 0) {
        statsEl.innerHTML = `No responses recorded yet. Be the first to submit via the Survey Form!`;
        return;
    }

    statsEl.innerHTML = `
        <p style="font-size: 1.1rem; font-weight: bold; color: var(--accent); margin-bottom: 1rem;">Total Community Submissions: ${total}</p>
        <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1rem 0;">
        ${renderBarChart('Age Demographics', surveyDataSummary.ages, total)}
        ${renderBarChart('Occupation', surveyDataSummary.occupations, total)}
        ${renderBarChart('1. Heard of deepfakes?', surveyDataSummary.q1, total)}
        ${renderBarChart('2. Encountered AI content online?', surveyDataSummary.q2, total)}
        ${renderBarChart('3. Can identify a deepfake?', surveyDataSummary.q3, total)}
        ${renderBarChart('4. Checked source of suspicious posts?', surveyDataSummary.q4, total)}
        ${renderBarChart('5. Most encountered AI content type?', surveyDataSummary.q5, total)}
        ${renderBarChart('6. Believe deepfakes can be used for scams?', surveyDataSummary.q6, total)}
        ${renderBarChart('7. Want to learn more about identifying AI?', surveyDataSummary.q7, total)}
    `;
}

function submitSurvey(event) {
    event.preventDefault();
    
    const email = document.getElementById('survey-email').value.trim().toLowerCase();
    const age = document.getElementById('survey-age').value;
    const occupation = document.getElementById('survey-occupation').value;
    const q1 = document.getElementById('survey-q1').value;
    const q2 = document.getElementById('survey-q2').value;
    const q3 = document.getElementById('survey-q3').value;
    const q4 = document.getElementById('survey-q4').value;
    const q5 = document.getElementById('survey-q5').value;
    const q6 = document.getElementById('survey-q6').value;
    const q7 = document.getElementById('survey-q7').value;

    // Check if email has already submitted
    if (submittedEmails.includes(email)) {
        alert('⚠️ This email address has already submitted the survey. Each email is allowed only one submission.');
        return;
    }

    if (email && age && occupation && q1 && q2 && q3 && q4 && q5 && q6 && q7) {
        // Record email
        submittedEmails.push(email);
        localStorage.setItem('deepfakeSubmittedEmails', JSON.stringify(submittedEmails));

        // Update counts
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

        // Save persistently to localStorage
        localStorage.setItem('deepfakeSurveySummary', JSON.stringify(surveyDataSummary));

        alert('Thank you for submitting your survey response!');

        document.getElementById('community-survey').reset();
        renderSurveyStats();
        switchSection('survey-results');
    }
}

// Initialize Quiz and Stored Survey Data on load
window.onload = function() {
    loadQuiz();
    loadStoredSurveyData();
};
