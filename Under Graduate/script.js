document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('undergradForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const majorInput = document.getElementById('major');
    const yearSelect = document.getElementById('year');
    const strengthsContainer = document.getElementById('strengths');
    const selectedStrengthsInput = document.getElementById('selectedStrengths');
    const successMessage = document.getElementById('successMessage');
    
    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const majorError = document.getElementById('majorError');
    const yearError = document.getElementById('yearError');
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Handle dark mode toggle
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Handle academic strengths selection
    strengthsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('subject-card')) {
            e.target.classList.toggle('selected');
            updateSelectedStrengths();
        }
    });
    
    // Update hidden input with selected strengths
    function updateSelectedStrengths() {
        const selectedCards = document.querySelectorAll('.subject-card.selected');
        const selectedValues = Array.from(selectedCards).map(card => card.dataset.subject);
        selectedStrengthsInput.value = selectedValues.join(',');
    }
    
    // Form validation functions
    function validateFullName() {
        if (!fullNameInput.value.trim()) {
            fullNameError.style.display = 'block';
            return false;
        }
        fullNameError.style.display = 'none';
        return true;
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
            return false;
        }
        emailError.style.display = 'none';
        return true;
    }
    
    function validateMajor() {
        if (!majorInput.value.trim()) {
            majorError.style.display = 'block';
            return false;
        }
        majorError.style.display = 'none';
        return true;
    }
    
    function validateYear() {
        if (!yearSelect.value) {
            yearError.style.display = 'block';
            return false;
        }
        yearError.style.display = 'none';
        return true;
    }
    
    // Add input event listeners for real-time validation
    fullNameInput.addEventListener('input', validateFullName);
    emailInput.addEventListener('input', validateEmail);
    majorInput.addEventListener('input', validateMajor);
    yearSelect.addEventListener('change', validateYear);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Run all validations
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isMajorValid = validateMajor();
        const isYearValid = validateYear();
        
        // If all validations pass
        if (isFullNameValid && isEmailValid && isMajorValid && isYearValid) {
            // For demonstration, we'll just show the success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // In a real application, you would submit the form data here
            console.log('Form submitted with data:', {
                fullName: fullNameInput.value,
                email: emailInput.value,
                major: majorInput.value,
                gpa: document.getElementById('gpa').value,
                year: yearSelect.value,
                favoriteSubject: document.getElementById('favoriteSubject').value,
                strengths: selectedStrengthsInput.value,
                careerGoals: document.getElementById('careerGoals').value
            });
        }
    });
});