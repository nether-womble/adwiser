document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentStep = 1;
    const totalSteps = 5;
    const certificationsByField = {
        'Computer Science': ['AWS Solutions Architect', 'Google Cloud Professional', 'Microsoft Azure Expert', 'Certified Information Systems Security Professional (CISSP)', 'Certified Data Scientist'],
        'Engineering': ['Professional Engineer (PE)', 'Project Management Professional (PMP)', 'Six Sigma Black Belt', 'Certified Quality Engineer', 'LEED Certification'],
        'Business': ['Chartered Financial Analyst (CFA)', 'Certified Public Accountant (CPA)', 'Financial Risk Manager (FRM)', 'Certified Management Accountant (CMA)', 'Supply Chain Professional (CSCP)'],
        'Medicine': ['Board Certification', 'Advanced Cardiac Life Support (ACLS)', 'Fellowship Certification', 'Clinical Research Certification', 'Healthcare Management'],
        'Law': ['Bar Association', 'Patent Law Certification', 'International Law Certification', 'Tax Law Specialization', 'Environmental Law Certification'],
        'Physics': ['Radiation Safety Officer', 'Nuclear Regulatory Commission Certification', 'Medical Physics Certification', 'Data Analysis Certification', 'High Performance Computing'],
        'Psychology': ['Licensed Clinical Psychologist', 'Certified Cognitive Behavioral Therapist', 'Neuropsychology Certification', 'School Psychology Certification', 'Industrial-Organizational Psychology'],
        'default': ['Project Management Professional (PMP)', 'Leadership Certification', 'Data Analysis', 'Specialized Technical Certification', 'Teaching Certification']
    };
    
    // Elements
    const form = document.getElementById('postGradForm');
    const progressBar = document.getElementById('formProgress');
    const addPublicationBtn = document.getElementById('addPublication');
    const publicationContainer = document.getElementById('publicationContainer');
    const certificationOptions = document.getElementById('certificationOptions');
    const successMessage = document.getElementById('successMessage');
    const startOverBtn = document.getElementById('startOver');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Initialize form
    updateProgressBar();
    showStep(currentStep);
    
    // Dark mode toggle
    darkModeToggle.addEventListener('click', function() {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        
        // Toggle icon
        const icon = darkModeToggle.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Add publication button event
    addPublicationBtn.addEventListener('click', function() {
        const publicationEntry = document.createElement('div');
        publicationEntry.className = 'publication-entry';
        publicationEntry.innerHTML = `
            <input type="text" placeholder="Publication/Research Title" class="publication-title" required>
            <select class="publication-type">
                <option value="Journal">Journal Article</option>
                <option value="Conference">Conference Paper</option>
                <option value="Book">Book/Book Chapter</option>
                <option value="Thesis">Thesis/Dissertation</option>
                <option value="Other">Other Research</option>
            </select>
            <button type="button" class="remove-publication" aria-label="Remove publication">
                <i class="fas fa-times"></i>
            </button>
        `;
        publicationContainer.appendChild(publicationEntry);
        
        // Add event listener to the remove button
        const removeBtn = publicationEntry.querySelector('.remove-publication');
        removeBtn.addEventListener('click', function() {
            publicationContainer.removeChild(publicationEntry);
        });
    });
    
    // Next button event
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Validate current step
            if (validateStep(currentStep)) {
                // Special handling for step 3 to step 4 transition
                if (currentStep === 3) {
                    // Get research area to suggest relevant certifications
                    const field = document.getElementById('postgrad_field').value;
                    // We'll use this in step 5, save to sessionStorage
                    sessionStorage.setItem('research_field', field);
                }
                
                // Special handling for step 4 to step 5 transition
                if (currentStep === 4) {
                    const field = sessionStorage.getItem('research_field') || '';
                    populateCertificationOptions(field);
                }
                
                currentStep++;
                showStep(currentStep);
                updateProgressBar();
            }
        });
    });
    
    // Previous button event
    const prevButtons = document.querySelectorAll('.prev-btn');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentStep--;
            showStep(currentStep);
            updateProgressBar();
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Here you would normally collect and submit the data
            // For this demo, we'll just show the success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Log form data (for demonstration)
            const formData = collectFormData();
            console.log('Form submitted with data:', formData);
        }
    });
    
    // Start over button
    startOverBtn.addEventListener('click', function() {
        form.reset();
        currentStep = 1;
        showStep(currentStep);
        updateProgressBar();
        form.style.display = 'block';
        successMessage.style.display = 'none';
        sessionStorage.removeItem('research_field');
        
        // Reset publication entries to just one
        publicationContainer.innerHTML = `
            <div class="publication-entry">
                <input type="text" placeholder="Publication/Research Title" class="publication-title" required>
                <select class="publication-type">
                    <option value="Journal">Journal Article</option>
                    <option value="Conference">Conference Paper</option>
                    <option value="Book">Book/Book Chapter</option>
                    <option value="Thesis">Thesis/Dissertation</option>
                    <option value="Other">Other Research</option>
                </select>
            </div>
        `;
    });
    
    // Helper functions
    function showStep(step) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // Show current step
        document.getElementById(`step${step}`).classList.add('active');
    }
    
    function updateProgressBar() {
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function validateStep(step) {
        const currentStepEl = document.getElementById(`step${step}`);
        const requiredFields = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
        
        let valid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--error-color)';
                valid = false;
            } else {
                field.style.borderColor = 'var(--border-color)';
            }
        });
        
        return valid;
    }
    
    function populateCertificationOptions(field) {
        certificationOptions.innerHTML = '';
        
        // Create normalized field name for matching
        const normalizedField = field.trim().toLowerCase();
        let matchedField = 'default';
        
        // Try to find a matching field category
        for (const category in certificationsByField) {
            if (normalizedField.includes(category.toLowerCase())) {
                matchedField = category;
                break;
            }
        }
        
        // Get list of certifications based on field or use default
        const certifications = certificationsByField[matchedField] || certificationsByField['default'];
        
        // Create checkbox for each certification
        certifications.forEach(cert => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="cert-${cert.toLowerCase().replace(/[\s()]/g, '-')}" name="certifications" value="${cert}">
                <label for="cert-${cert.toLowerCase().replace(/[\s()]/g, '-')}">${cert}</label>
            `;
            certificationOptions.appendChild(checkboxItem);
        });
    }
    
    function collectFormData() {
        const formData = {
            basicInfo: {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value
            },
            undergraduateEducation: {
                institution: document.getElementById('undergrad_college').value,
                major: document.getElementById('undergrad_major').value,
                graduationYear: document.getElementById('undergrad_year').value,
                gpa: document.getElementById('undergrad_gpa').value
            },
            postGraduateEducation: {
                degreeType: document.getElementById('postgrad_type').value,
                institution: document.getElementById('postgrad_institution').value,
                field: document.getElementById('postgrad_field').value,
                researchAreas: document.getElementById('research_areas').value
            },
            academicAchievements: {
                publications: [],
                honors: document.getElementById('academic_honors').value
            },
            futureGoals: {
                careerPath: document.getElementById('career_path').value,
                researchInterests: document.getElementById('future_research').value,
                certifications: [],
                otherCertification: document.getElementById('other_certification').value
            }
        };
        
        // Collect publications
        const publicationEntries = document.querySelectorAll('.publication-entry');
        publicationEntries.forEach(entry => {
            const title = entry.querySelector('.publication-title').value;
            const type = entry.querySelector('.publication-type').value;
            
            if (title) {
                formData.academicAchievements.publications.push({
                    title: title,
                    type: type
                });
            }
        });
        
        // Collect selected certifications
        const selectedCertifications = document.querySelectorAll('input[name="certifications"]:checked');
        selectedCertifications.forEach(cert => {
            formData.futureGoals.certifications.push(cert.value);
        });
        
        return formData;
    }
});