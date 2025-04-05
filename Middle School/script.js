// Theme switcher functionality
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const moonIcon = document.querySelector('.fa-moon');

// Check for saved user preference, if any
if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    
    if (localStorage.getItem('theme') === 'dark') {
        toggleSwitch.checked = true;
    }
}

// Function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

// Event listener for theme switch
toggleSwitch.addEventListener('change', switchTheme, false);

// Form submission handling
const studentForm = document.getElementById('studentForm');
const confirmation = document.getElementById('confirmation');
const summary = document.getElementById('summary');
const returnBtn = document.getElementById('returnBtn');

studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect all form data
    const formData = new FormData(studentForm);
    let responseHTML = '<h3>Your Responses:</h3><ul>';
    
    // Format questions and answers for summary
    const questions = {
        'name': 'What is your name?',
        'mathMarks': 'What are your marks in Math?',
        'scienceMarks': 'What are your marks in Science?',
        'socialScienceMarks': 'What are your marks in Social Science?',
        'englishMarks': 'What are your marks in English?',
        'expertise': 'If you have expertise in any subject, select an area:',
        'futureCareer': 'What do you want to be when you grow up?',
        'hobbies': 'What are your hobbies?',
        'studyHours': 'How many hours do you study per day?',
        'motivation': 'What motivates you to study?'
    };
    
    // Format values for better display
    const formatValue = (name, value) => {
        // Format expertise
        if (name === 'expertise') {
            const expertiseAreas = {
                'none': 'None',
                'advancedProblemSolving': 'Advanced Problem Solving',
                'creativeWriting': 'Creative Writing',
                'codingProgramming': 'Coding & Programming',
                'researchAnalysis': 'Research & Analysis'
            };
            return expertiseAreas[value] || value;
        }
        
        // Format study hours
        if (name === 'studyHours') {
            const hours = {
                'less1': 'Less than 1 hour',
                '1-2': '1-2 hours',
                '2-3': '2-3 hours',
                'more3': 'More than 3 hours'
            };
            return hours[value] || value;
        }
        
        return value;
    };
    
    // Build the summary HTML
    for (const [name, value] of formData.entries()) {
        if (questions[name]) {
            responseHTML += `<li><strong>${questions[name]}</strong> ${formatValue(name, value)}</li>`;
        }
    }
    
    // Add education level which is pre-selected
    responseHTML += `<li><strong>Education Level:</strong> Middle School</li>`;
    
    responseHTML += '</ul>';
    
    // Display the summary
    summary.innerHTML = responseHTML;
    studentForm.classList.add('hidden');
    confirmation.classList.remove('hidden');
    
    // Scroll to the top of the confirmation
    window.scrollTo(0, 0);
});

// Return button functionality
returnBtn.addEventListener('click', function() {
    confirmation.classList.add('hidden');
    studentForm.classList.remove('hidden');
    studentForm.reset();
});