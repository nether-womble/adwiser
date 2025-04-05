document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentStep = 1;
    const totalSteps = 4;
    const examsByMajor = {
        'Computer Science': ['GRE', 'GATE', 'AWS Certification', 'Microsoft Certification', 'Google Cloud Certification'],
        'Engineering': ['GRE', 'GATE', 'FE Exam', 'PE Exam', 'TOEFL'],
        'Business': ['GMAT', 'CAT', 'CFA', 'TOEFL', 'Financial Modeling Certification'],
        'Medicine': ['USMLE', 'NEET PG', 'PLAB', 'IELTS', 'MCAT'],
        'Law': ['LSAT', 'Bar Exam', 'CLAT', 'IELTS', 'TOEFL'],
        'Arts': ['GRE', 'TOEFL', 'Portfolio Assessment', 'IELTS', 'Creative Writing Test'],
        'default': ['GRE', 'TOEFL', 'IELTS', 'CAT', 'GMAT', 'Other']
    };
    
    // Elements
    const form = document.getElementById('graduateForm');
    const progressBar = document.getElementById('formProgress');
    const addSubjectBtn = document.getElementById('addSubject');
    const subjectContainer = document.getElementById('subjectContainer');
    const examOptions = document.getElementById('examOptions');
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
    
    // Add subject button event
    addSubjectBtn.addEventListener('click', function() {
        const subjectEntry = document.createElement('div');
        subjectEntry.className = 'subject-entry';
        subjectEntry.innerHTML = `
            <input type="text" placeholder="Subject Name" class="subject-name" required>
            <input type="text" placeholder="Grade/Mark" class="subject-grade" required>
            <button type="button" class="remove-subject" aria-label="Remove subject">
                <i class="fas fa-times"></i>
            </button>
        `;
        subjectContainer.appendChild(subjectEntry);
        
        // Add event listener to the remove button
        const removeBtn = subjectEntry.querySelector('.remove-subject');
        removeBtn.addEventListener('click', function() {
            subjectContainer.removeChild(subjectEntry);
        });
    });
    
    // Next button event
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Validate current step
            if (validateStep(currentStep)) {
                // Special handling for step 2 to populate exam options based on major
                if (currentStep === 2) {
                    const major = document.getElementById('major').value;
                    populateExamOptions(major);
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
        
        // Reset subject entries to just one
        subjectContainer.innerHTML = `
            <div class="subject-entry">
                <input type="text" placeholder="Subject Name" class="subject-name" required>
                <input type="text" placeholder="Grade/Mark" class="subject-grade" required>
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
        const requiredFields = currentStepEl.querySelectorAll('input[required], textarea[required]');
        
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
    
    function populateExamOptions(major) {
        examOptions.innerHTML = '';
        
        // Get list of exams based on major or use default
        const exams = examsByMajor[major] || examsByMajor['default'];
        
        // Create checkbox for each exam
        exams.forEach(exam => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="exam-${exam.toLowerCase().replace(/\s+/g, '-')}" name="exams" value="${exam}">
                <label for="exam-${exam.toLowerCase().replace(/\s+/g, '-')}">${exam}</label>
            `;
            examOptions.appendChild(checkboxItem);
        });
    }
    
    function collectFormData() {
        const formData = {
            basicInfo: {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value
            },
            education: {
                college: document.getElementById('college').value,
                major: document.getElementById('major').value,
                graduationYear: document.getElementById('graduationYear').value
            },
            academics: {
                subjects: [],
                cgpa: document.getElementById('cgpa').value
            },
            futureGoals: {
                careerObjectives: document.getElementById('careerGoals').value,
                exams: [],
                otherExam: document.getElementById('otherExam').value
            }
        };
        
        // Collect subjects
        const subjectEntries = document.querySelectorAll('.subject-entry');
        subjectEntries.forEach(entry => {
            const subjectName = entry.querySelector('.subject-name').value;
            const subjectGrade = entry.querySelector('.subject-grade').value;
            
            if (subjectName && subjectGrade) {
                formData.academics.subjects.push({
                    name: subjectName,
                    grade: subjectGrade
                });
            }
        });
        
        // Collect selected exams
        const selectedExams = document.querySelectorAll('input[name="exams"]:checked');
        selectedExams.forEach(exam => {
            formData.futureGoals.exams.push(exam.value);
        });
        
        return formData;
    }
});