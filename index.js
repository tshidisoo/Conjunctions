// Quiz functionality
class ConjunctionQuiz {
    constructor() {
        this.totalQuestions = 20;
        this.currentScore = 0;
        this.answeredQuestions = 0;
        this.isQuizCompleted = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateProgress();
    }
    
    bindEvents() {
        // Check answers button
        document.getElementById('checkAnswers').addEventListener('click', () => {
            this.checkAllAnswers();
        });
        
        // Reset quiz button
        document.getElementById('resetQuiz').addEventListener('click', () => {
            this.resetQuiz();
        });
        
        // Listen for answer changes
        this.bindAnswerEvents();
    }
    
    bindAnswerEvents() {
        // Select dropdowns
        const selects = document.querySelectorAll('.answer-select');
        selects.forEach(select => {
            select.addEventListener('change', () => {
                this.updateProgress();
            });
        });
        
        // Radio buttons
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateProgress();
            });
        });
    }
    
    updateProgress() {
        const answered = this.getAnsweredCount();
        const progress = (answered / this.totalQuestions) * 100;
        
        document.getElementById('progress').style.width = progress + '%';
        this.answeredQuestions = answered;
    }
    
    getAnsweredCount() {
        let count = 0;
        
        // Count filled selects
        const selects = document.querySelectorAll('.answer-select');
        selects.forEach(select => {
            if (select.value !== '') count++;
        });
        
        // Count checked radios
        const radioGroups = ['q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20'];
        radioGroups.forEach(groupName => {
            const checked = document.querySelector(`input[name="${groupName}"]:checked`);
            if (checked) count++;
        });
        
        return count;
    }
    
    checkAllAnswers() {
        if (this.answeredQuestions < this.totalQuestions) {
            alert(`Please answer all questions! You have answered ${this.answeredQuestions} out of ${this.totalQuestions} questions.`);
            return;
        }
        
        this.currentScore = 0;
        const questions = document.querySelectorAll('.question');
        
        questions.forEach((question, index) => {
            const correctAnswer = question.dataset.answer;
            let userAnswer = '';
            let isCorrect = false;
            
            // Check select answers (questions 1-10)
            if (index < 10) {
                const select = question.querySelector('.answer-select');
                userAnswer = select.value;
                isCorrect = userAnswer === correctAnswer;
            } 
            // Check radio answers (questions 11-20)
            else {
                const questionNum = `q${index + 1}`;
                const checkedRadio = question.querySelector(`input[name="${questionNum}"]:checked`);
                if (checkedRadio) {
                    userAnswer = checkedRadio.value;
                    isCorrect = userAnswer === correctAnswer;
                }
            }
            
            // Apply visual feedback
            question.classList.remove('correct', 'incorrect');
            if (isCorrect) {
                question.classList.add('correct');
                this.currentScore++;
            } else {
                question.classList.add('incorrect');
                // Show correct answer for incorrect responses
                this.showCorrectAnswer(question, correctAnswer, index);
            }
        });
        
        this.showResults();
        this.isQuizCompleted = true;
        
        // Update score display
        document.getElementById('score').textContent = `${this.currentScore}/${this.totalQuestions}`;
    }
    
    showCorrectAnswer(question, correctAnswer, index) {
        // Remove any existing correct answer display
        const existingCorrect = question.querySelector('.correct-answer');
        if (existingCorrect) {
            existingCorrect.remove();
        }
        
        // Add correct answer display
        const correctDiv = document.createElement('div');
        correctDiv.className = 'correct-answer';
        correctDiv.style.cssText = `
            margin-top: 10px;
            padding: 8px 12px;
            background: #e6fffa;
            border: 1px solid #38b2ac;
            border-radius: 5px;
            color: #234e52;
            font-weight: bold;
        `;
        correctDiv.textContent = `Correct answer: ${correctAnswer}`;
        question.appendChild(correctDiv);
    }
    
    showResults() {
        const resultsDiv = document.getElementById('results');
        const finalScoreDiv = document.getElementById('finalScore');
        const feedbackDiv = document.getElementById('feedback');
        
        // Calculate percentage
        const percentage = Math.round((this.currentScore / this.totalQuestions) * 100);
        
        // Display score
        finalScoreDiv.textContent = `${this.currentScore}/${this.totalQuestions} (${percentage}%)`;
        
        // Apply score styling and feedback
        finalScoreDiv.className = '';
        if (percentage >= 90) {
            finalScoreDiv.classList.add('score-excellent');
            feedbackDiv.innerHTML = `
                <p>🌟 <strong>Excellent work!</strong> You have mastered conjunctions!</p>
                <p>Your understanding of <em>with, and, or, because, but</em> is outstanding. Keep up the great work!</p>
            `;
        } else if (percentage >= 70) {
            finalScoreDiv.classList.add('score-good');
            feedbackDiv.innerHTML = `
                <p>👍 <strong>Good job!</strong> You have a solid understanding of conjunctions.</p>
                <p>Review the incorrect answers to strengthen your knowledge of when to use each conjunction.</p>
            `;
        } else {
            finalScoreDiv.classList.add('score-needs-improvement');
            feedbackDiv.innerHTML = `
                <p>📚 <strong>Keep practicing!</strong> Conjunctions need more attention.</p>
                <p>Focus on understanding the different purposes: <br>
                • <strong>with</strong> = accompaniment/manner <br>
                • <strong>and</strong> = addition/joining <br>
                • <strong>or</strong> = choice/alternative <br>
                • <strong>because</strong> = reason/cause <br>
                • <strong>but</strong> = contrast/opposition</p>
            `;
        }
        
        // Show results section
        resultsDiv.classList.remove('hidden');
        
        // Scroll to results
        resultsDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    resetQuiz() {
        // Reset score and progress
        this.currentScore = 0;
        this.answeredQuestions = 0;
        this.isQuizCompleted = false;
        
        // Reset all select dropdowns
        const selects = document.querySelectorAll('.answer-select');
        selects.forEach(select => {
            select.value = '';
        });
        
        // Reset all radio buttons
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;
        });
        
        // Remove all visual feedback
        const questions = document.querySelectorAll('.question');
        questions.forEach(question => {
            question.classList.remove('correct', 'incorrect');
            
            // Remove correct answer displays
            const correctAnswer = question.querySelector('.correct-answer');
            if (correctAnswer) {
                correctAnswer.remove();
            }
        });
        
        // Hide results
        document.getElementById('results').classList.add('hidden');
        
        // Reset displays
        document.getElementById('score').textContent = '0/20';
        document.getElementById('progress').style.width = '0%';
        
        // Scroll to top
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
        
        // Show success message
        this.showTemporaryMessage('Quiz reset successfully! Start again.', 'success');
    }
    
    showTemporaryMessage(message, type = 'info') {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        // Set background color based on type
        if (type === 'success') {
            messageDiv.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        } else if (type === 'error') {
            messageDiv.style.background = 'linear-gradient(135deg, #f56565, #e53e3e)';
        } else {
            messageDiv.style.background = 'linear-gradient(135deg, #4299e1, #3182ce)';
        }
        
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        // Animate in
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
}

// Enhanced features
class QuizEnhancements {
    constructor(quiz) {
        this.quiz = quiz;
        this.init();
    }
    
    init() {
        this.addKeyboardSupport();
        this.addHelpTooltips();
        this.addSmoothScrolling();
    }
    
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Enter key to check answers
            if (e.key === 'Enter' && e.ctrlKey) {
                document.getElementById('checkAnswers').click();
            }
            
            // Escape key to reset
            if (e.key === 'Escape' && this.quiz.isQuizCompleted) {
                document.getElementById('resetQuiz').click();
            }
        });
    }
    
    addHelpTooltips() {
        // Add help text for conjunctions
        const helpText = {
            'with': 'Shows accompaniment, manner, or what something contains',
            'and': 'Joins similar ideas, shows addition or combination',
            'or': 'Shows choice or alternative between options',
            'because': 'Gives a reason or cause for something',
            'but': 'Shows contrast, opposition, or unexpected result'
        };
        
        // Add tooltips to select options
        const selects = document.querySelectorAll('.answer-select');
        selects.forEach(select => {
            const options = select.querySelectorAll('option');
            options.forEach(option => {
                if (helpText[option.value]) {
                    option.title = helpText[option.value];
                }
            });
        });
    }
    
    addSmoothScrolling() {
        // Smooth scroll between sections
        const sections = document.querySelectorAll('.quiz-section');
        sections.forEach((section, index) => {
            const heading = section.querySelector('h2');
            if (heading) {
                heading.style.cursor = 'pointer';
                heading.addEventListener('click', () => {
                    section.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                });
            }
        });
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new ConjunctionQuiz();
    const enhancements = new QuizEnhancements(quiz);
    
    // Add welcome message
    setTimeout(() => {
        quiz.showTemporaryMessage('Welcome to the Conjunction Quiz! Good luck! 🍀', 'info');
    }, 1000);
});