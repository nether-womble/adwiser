document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signInForm');
    const educationSelect = document.getElementById('education');
    const dynamicFieldsContainer = document.getElementById('dynamicEducationFields');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    // Dark mode toggle functionality
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Handle education level change
    educationSelect.addEventListener('change', function() {
        generateEducationFields(this.value);
    });
    
    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
        
        if (validateForm()) {
            const formData = collectFormData();
            console.log('Form submitted successfully!', formData);
            
            // Here you would typically send data to a server
            // For this example, just reset the form but keep dynamic fields
            const educationValue = educationSelect.value;
            alert('Sign in successful!');

            const educationLevel = formData.education.level;
            switch (educationLevel) {
                case 'middleSchool':
                    window.location.href = '../Middle School/middleschool.html';
                    break;
                case 'highSchool':
                    window.location.href = '../High School/highschool.html';
                    break;
                case 'underGraduate':
                    window.location.href = '../Under Graduate/undergraduate.html';
                    break;
                case 'graduate':
                    window.location.href = '../Graduate/graduate.html';
                    break;
                case 'postGraduate':
                    window.location.href = '../Post Graduate/postgrad.html';
                    break;
                default:
                    alert('Unknown education level selected.');
            }
            
            // Reset form but keep dark mode setting
            form.reset();
            educationSelect.value = educationValue;
            generateEducationFields(educationValue);
        }
    });
    
    // Generate education fields based on selected education level
    function generateEducationFields(educationLevel) {
        dynamicFieldsContainer.innerHTML = '';
        
        const fieldSet = document.createElement('div');
        fieldSet.className = 'nested-field';
        
        switch(educationLevel) {
            case 'middleSchool':
                fieldSet.innerHTML = `
                    <div class="form-group">
                        <label for="schoolClass">Class</label>
                        <select id="schoolClass" name="schoolClass" required>
                            <option value="" selected disabled>Select your class</option>
                            <option value="6">Class 6</option>
                            <option value="7">Class 7</option>
                            <option value="8">Class 8</option>
                            <option value="9">Class 9</option>
                            <option value="10">Class 10</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="schoolName">School Name</label>
                        <input type="text" id="schoolName" name="schoolName" placeholder="Enter your school name" required>
                    </div>
                `;
                break;
                
            case 'highSchool':
                fieldSet.innerHTML = `
                    <div class="form-group">
                        <label for="schoolClass">Class</label>
                        <select id="schoolClass" name="schoolClass" required>
                            <option value="" selected disabled>Select your class</option>
                            <option value="11">Class 11</option>
                            <option value="12">Class 12</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="schoolName">School Name</label>
                        <input type="text" id="schoolName" name="schoolName" placeholder="Enter your school name" required>
                    </div>
                `;
                break;
                
            case 'underGraduate':
                fieldSet.innerHTML = `
                    <div class="form-group">
                        <label for="collegeName">College Name</label>
                        <input type="text" id="collegeName" name="collegeName" placeholder="Enter your college name" required>
                    </div>
                    <div class="form-group">
                        <label for="courseName">Course</label>
                        <input type="text" id="courseName" name="courseName" placeholder="E.g., B.Sc Computer Science" required>
                    </div>
                    <div class="form-group">
                        <label for="yearOfStudy">Year of Study</label>
                        <select id="yearOfStudy" name="yearOfStudy" required>
                            <option value="" selected disabled>Select your year</option>
                            <option value="1">First Year</option>
                            <option value="2">Second Year</option>
                            <option value="3">Third Year</option>
                            <option value="4">Fourth Year</option>
                        </select>
                    </div>
                `;
                break;
                
            case 'graduate':
                fieldSet.innerHTML = `
                    <div class="form-group">
                        <label for="universityName">University Name</label>
                        <input type="text" id="universityName" name="universityName" placeholder="Enter your university name" required>
                    </div>
                    <div class="form-group">
                        <label for="graduationDegree">Degree</label>
                        <input type="text" id="graduationDegree" name="graduationDegree" placeholder="E.g., Masters in Computer Science" required>
                    </div>
                    <div class="form-group">
                        <label for="specialization">Specialization</label>
                        <input type="text" id="specialization" name="specialization" placeholder="Enter your specialization" required>
                    </div>
                `;
                break;
                
            case 'postGraduate':
                fieldSet.innerHTML = `
                    <div class="form-group">
                        <label for="graduationDetails">Graduation Details</label>
                        <input type="text" id="graduationDetails" name="graduationDetails" placeholder="E.g., MBA from XYZ University" required>
                    </div>
                    <div class="form-group">
                        <label for="postGraduationDegree">Post Graduation Degree</label>
                        <input type="text" id="postGraduationDegree" name="postGraduationDegree" placeholder="E.g., Ph.D. in Economics" required>
                    </div>
                    <div class="form-group">
                        <label for="researchTopic">Research Topic/Area</label>
                        <input type="text" id="researchTopic" name="researchTopic" placeholder="Enter your research topic or area" required>
                    </div>
                `;
                break;
        }
        
        dynamicFieldsContainer.appendChild(fieldSet);
    }
    
    // Validate form fields
    function validateForm() {
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        // Validate education selection
        const education = educationSelect.value;
        if (education === '') {
            showError('education', 'Please select your education level');
            isValid = false;
        } else {
            // Validate dynamic fields based on education selection
            const dynamicInputs = dynamicFieldsContainer.querySelectorAll('input, select');
            dynamicInputs.forEach(input => {
                if (input.required && input.value.trim() === '') {
                    showError(input.id, `${input.previousElementSibling.textContent} is required`);
                    isValid = false;
                }
            });
        }
        
        // Validate contact number
        const contactNumber = document.getElementById('contactNumber').value.trim();
        if (contactNumber === '') {
            showError('contactNumber', 'Contact number is required');
            isValid = false;
        } else if (!isValidPhoneNumber(contactNumber)) {
            showError('contactNumber', 'Please enter a valid contact number');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Collect all form data into a structured object
    function collectFormData() {
        const formData = {
            name: document.getElementById('name').value.trim(),
            education: {
                level: educationSelect.value
            },
            contactNumber: document.getElementById('contactNumber').value.trim(),
            email: document.getElementById('email').value.trim(),
            rememberMe: document.getElementById('rememberMe').checked
        };
        
        // Collect dynamic education fields
        const dynamicInputs = dynamicFieldsContainer.querySelectorAll('input, select');
        dynamicInputs.forEach(input => {
            formData.education[input.id] = input.value.trim();
        });
        
        return formData;
    }
    
    // Helper functions
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        input.classList.add('error');
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        input.parentNode.appendChild(errorMessage);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhoneNumber(phone) {
        // This is a basic validation - customize as needed for your region
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        return phoneRegex.test(phone);
    }
});