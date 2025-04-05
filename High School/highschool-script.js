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

// Stream selection handling
const streamSelect = document.getElementById('stream');
const scienceSection = document.getElementById('scienceSection');
const commerceSection = document.getElementById('commerceSection');
const humanitiesSection = document.getElementById('humanitiesSection');

streamSelect.addEventListener('change', function() {
    // Hide all stream sections first
    scienceSection.classList.add('hidden');
    commerceSection.classList.add('hidden');
    humanitiesSection.classList.add('hidden');
    
    // Show the selected stream section
    if (this.value === 'science') {
        scienceSection.classList.remove('hidden');
        // Reset other stream fields
        resetSectionFields(commerceSection);
        resetSectionFields(humanitiesSection);
    } else if (this.value === 'commerce') {
        commerceSection.classList.remove('hidden');
        // Reset other stream fields
        resetSectionFields(scienceSection);
        resetSectionFields(humanitiesSection);
    } else if (this.value === 'humanities') {
        humanitiesSection.classList.remove('hidden');
        // Reset other stream fields
        resetSectionFields(scienceSection);
        resetSectionFields(commerceSection);
    }
});

// Function to reset fields in a section
function resetSectionFields(section) {
    const selects = section.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0;
    });
}

// Form submission handling
const studentForm = document.getElementById('studentForm');
const confirmation = document.getElementById('confirmation');
const summary = document.getElementById('summary');
const returnBtn = document.getElementById('returnBtn');

studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check if stream is selected and validate required fields based on stream
    const selectedStream = streamSelect.value;
    if (!selectedStream) {
        alert("Please select your stream.");
        return;
    }
    
    // Validate stream-specific required fields
    let isValid = true;
    if (selectedStream === 'science') {
        isValid = validateStreamSection(scienceSection);
    } else if (selectedStream === 'commerce') {
        isValid = validateStreamSection(commerceSection);
    } else if (selectedStream === 'humanities') {
        isValid = validateStreamSection(humanitiesSection);
    }
    
    if (!isValid) {
        return;
    }
    
    // Collect all form data
    const formData = new FormData(studentForm);
    let responseHTML = '<h3>Your Responses:</h3><ul>';
    
    // Format questions and answers for summary
    const questions = {
        'name': 'What is your name?',
        'class': 'Which class are you in?',
        'stream': 'Which stream are you studying?',
        // Science subjects
        'physicsMarks': 'What are your marks in Physics?',
        'chemistryMarks': 'What are your marks in Chemistry?',
        'mathsMarks': 'What are your marks in Mathematics?',
        'biologyMarks': 'What are your marks in Biology?',
        'scienceTargetExam': 'Which entrance exam are you targeting?',
        // Commerce subjects
        'bstMarks': 'What are your marks in Business Studies?',
        'accountsMarks': 'What are your marks in Accountancy?',
        'economicsMarks': 'What are your marks in Economics?',
        'commerceTargetExam': 'Which professional certification are you targeting?',
        // Humanities subjects
        'historyMarks': 'What are your marks in History?',
        'politicalScienceMarks': 'What are your marks in Political Science?',
        'geographyMarks': 'What are your marks in Geography?',
        'humanitiesTargetExam': 'Which competitive exam are you targeting?',
        // Common questions
        'futureGoals': 'What are your future career goals?',
        'studyHours': 'How many hours do you study per day?'
    };
    
    // Format values for better display
    const formatValue = (name, value) => {
        // Format class
        if (name === 'class') {
            return `Class ${value}`;
        }
        
        // Format stream
        if (name === 'stream') {
            const streams = {
                'science': 'Science',
                'commerce': 'Commerce',
                'humanities': 'Humanities'
            };
            return streams[value] || value;
        }
        
        // Format study hours
        if (name === 'studyHours') {
            const hours = {
                'less2': 'Less than 2 hours',
                '2-4': '2-4 hours',
                '4-6': '4-6 hours',
                'more6': 'More than 6 hours'
            };
            return hours[value] || value;
        }
        
        // Format target exams
        if (name.includes('TargetExam')) {
            const exams = {
                // Science
                'jee': 'JEE (Engineering)',
                'neet': 'NEET (Medical)',
                'kvpy': 'KVPY',
                'bitsat': 'BITSAT',
                // Commerce
                'ca': 'CA (Chartered Accountant)',
                'cma': 'CMA (Cost Management Accountant)',
                'cfa': 'CFA (Chartered Financial Analyst)',
                'cs': 'CS (Company Secretary)',
                'mba': 'MBA',
                // Humanities
                'upsc': 'UPSC (Civil Services)',
                'law': 'Law Entrance (CLAT/AILET)',
                'massCommunication': 'Mass Communication Entrance',
                'hotelManagement': 'Hotel Management Entrance',
                'other': 'Other'
            };
            return exams[value] || value;
        }
        
        return value;
    };
    
    // Add education level which is pre-selected
    responseHTML += `<li><strong>Education Level:</strong> High School</li>`;
    
    // Build the summary HTML based on selected stream
    for (const [name, value] of formData.entries()) {
        // Skip hidden field and empty values
        if (name === 'educationLevel' || value === '' || value === 'notApplicable') {
            continue;
        }
        
        // For science stream, only show science-related fields
        if (selectedStream === 'science' && 
            (name.includes('bst') || name.includes('accounts') || name.includes('economics') || 
             name.includes('history') || name.includes('political') || name.includes('geography') ||
             name.includes('commerceTarget') || name.includes('humanitiesTarget'))) {
            continue;
        }
        
        // For commerce stream, only show commerce-related fields
        if (selectedStream === 'commerce' && 
            (name.includes('physics') || name.includes('chemistry') || name.includes('maths') || name.includes('biology') || 
             name.includes('history') || name.includes('political') || name.includes('geography') ||
             name.includes('scienceTarget') || name.includes('humanitiesTarget'))) {
            continue;
        }
        
        // For humanities stream, only show humanities-related fields
        if (selectedStream === 'humanities' && 
            (name.includes('physics') || name.includes('chemistry') || name.includes('maths') || name.includes('biology') || 
             name.includes('bst') || name.includes('accounts') || name.includes('economics') ||
             name.includes('scienceTarget') || name.includes('commerceTarget'))) {
            continue;
        }
        
        if (questions[name]) {
            responseHTML += `<li><strong>${questions[name]}</strong> ${formatValue(name, value)}</li>`;
        }
    }
    
    responseHTML += '</ul>';
    
    // Display the summary
    summary.innerHTML = responseHTML;
    studentForm.classList.add('hidden');
    confirmation.classList.remove('hidden');
    
    // Scroll to the top of the confirmation
    window.scrollTo(0, 0);
});

// Validate required fields in a stream section
function validateStreamSection(section) {
    const selects = section.querySelectorAll('select');
    let isValid = true;
    
    selects.forEach(select => {
        // Skip "Not Applicable" options
        if (select.name === 'mathsMarks' || select.name === 'biologyMarks' || 
            select.name === 'historyMarks' || select.name === 'politicalScienceMarks' || 
            select.name === 'geographyMarks') {
            return;
        }
        
        if (select.value === '') {
            isValid = false;
            select.style.borderColor = 'red';
        } else {
            select.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert("Please fill in all required fields for your selected stream.");
    }
    
    return isValid;
}

// Return button functionality
returnBtn.addEventListener('click', function() {
    confirmation.classList.add('hidden');
    studentForm.classList.remove('hidden');
    studentForm.reset();
    
    // Hide all stream sections
    scienceSection.classList.add('hidden');
    commerceSection.classList.add('hidden');
    humanitiesSection.classList.add('hidden');
});