// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('main section');
    
    // Learning style sliders
    const styleSliders = document.querySelectorAll('.style-item input[type="range"]');
    
    // Interest tags
    const interestTags = document.querySelectorAll('.tag');
    
    // Career path selector
    const careerPathSelect = document.getElementById('career-path');
    
    // Prerequisites checker
    const courseCheckSelect = document.getElementById('course-check');
    const checkBtn = document.getElementById('check-btn');
    const prerequisitesResults = document.getElementById('prerequisites-results');
    
    // Sample course data for populating the table
    const coursesData = [
        { code: 'CS 1101', name: 'Introduction to Programming', semester: 'Fall 2022', grade: 'A', credits: 4 },
        { code: 'MATH 2410', name: 'Calculus I', semester: 'Fall 2022', grade: 'A-', credits: 4 },
        { code: 'CS 2201', name: 'Data Structures', semester: 'Spring 2023', grade: 'A', credits: 4 },
        { code: 'CS 2210', name: 'Discrete Structures', semester: 'Spring 2023', grade: 'B+', credits: 3 },
        { code: 'CS 3420', name: 'Introduction to Machine Learning', semester: 'Fall 2023', grade: 'A', credits: 4 },
        { code: 'MATH 3300', name: 'Linear Algebra', semester: 'Fall 2023', grade: 'B+', credits: 3 },
        { code: 'CS 3810', name: 'Database Systems', semester: 'Spring 2024', grade: 'A-', credits: 4 },
        { code: 'CS 3500', name: 'Algorithms', semester: 'Spring 2024', grade: 'B+', credits: 4 }
    ];
    
    // Sample prerequisites data
    const prerequisitesData = {
        'cs4520': {
            title: 'CS 4520 - Advanced Machine Learning',
            status: 'warning',
            prerequisites: [
                { code: 'CS 3420', name: 'Introduction to Machine Learning', status: 'complete', grade: 'A' },
                { code: 'MATH 3300', name: 'Linear Algebra', status: 'complete', grade: 'B+' },
                { code: 'STAT 4100', name: 'Advanced Statistics', status: 'missing' }
            ],
            recommendation: 'You need to complete STAT 4100 - Advanced Statistics before enrolling in CS 4520. This course is offered in the upcoming Fall semester.'
        },
        'cs4720': {
            title: 'CS 4720 - Computer Graphics',
            status: 'warning',
            prerequisites: [
                { code: 'CS 3500', name: 'Algorithms', status: 'complete', grade: 'B+' },
                { code: 'MATH 3300', name: 'Linear Algebra', status: 'complete', grade: 'B+' },
                { code: 'MATH 2420', name: 'Calculus II', status: 'missing' }
            ],
            recommendation: 'You need to complete MATH 2420 - Calculus II before enrolling in CS 4720. This course is offered every semester.'
        },
        'cs5330': {
            title: 'CS 5330 - Computer Vision',
            status: 'warning',
            prerequisites: [
                { code: 'CS 3420', name: 'Introduction to Machine Learning', status: 'complete', grade: 'A' },
                { code: 'MATH 3300', name: 'Linear Algebra', status: 'complete', grade: 'B+' },
                { code: 'CS 4520', name: 'Advanced Machine Learning', status: 'missing' }
            ],
            recommendation: 'You need to complete CS 4520 - Advanced Machine Learning before enrolling in CS 5330. Note that CS 4520 itself has prerequisites you have not yet fulfilled.'
        },
        'cs4610': {
            title: 'CS 4610 - Computer Networks',
            status: 'success',
            prerequisites: [
                { code: 'CS 2201', name: 'Data Structures', status: 'complete', grade: 'A' },
                { code: 'CS 3500', name: 'Algorithms', status: 'complete', grade: 'B+' }
            ],
            recommendation: 'You have completed all prerequisites for CS 4610. You are eligible to enroll in this course.'
        },
        'cs5620': {
            title: 'CS 5620 - Big Data Analytics',
            status: 'warning',
            prerequisites: [
                { code: 'CS 3420', name: 'Introduction to Machine Learning', status: 'complete', grade: 'A' },
                { code: 'CS 3810', name: 'Database Systems', status: 'complete', grade: 'A-' },
                { code: 'CS 4520', name: 'Advanced Machine Learning', status: 'missing' }
            ],
            recommendation: 'You need to complete CS 4520 - Advanced Machine Learning before enrolling in CS 5620. Note that CS 4520 itself has prerequisites you have not yet fulfilled.'
        }
    };
    
    // Career path data
    const careerPathData = {
        'data-science': {
            title: 'Data Science Career Path',
            description: 'A career in Data Science involves analyzing complex data sets to find patterns and insights that drive business decisions. This path combines statistics, mathematics, and programming skills.',
            skills: [
                { name: 'Statistics', status: 'complete' },
                { name: 'Python Programming', status: 'complete' },
                { name: 'Machine Learning', status: 'in-progress' },
                { name: 'SQL & Databases', status: 'complete' },
                { name: 'Data Visualization', status: 'missing' },
                { name: 'Big Data Technologies', status: 'missing' }
            ],
            courses: [
                { code: 'CS 4520', name: 'Advanced Machine Learning' },
                { code: 'DS 3300', name: 'Data Visualization Techniques' },
                { code: 'CS 5620', name: 'Big Data Analytics' }
            ]
        },
        'software-engineering': {
            title: 'Software Engineering Career Path',
            description: 'Software Engineering focuses on designing, developing, and maintaining software systems. This path emphasizes programming skills, system design, and software development methodologies.',
            skills: [
                { name: 'Object-Oriented Programming', status: 'complete' },
                { name: 'Data Structures & Algorithms', status: 'complete' },
                { name: 'Web Development', status: 'in-progress' },
                { name: 'Database Design', status: 'complete' },
                { name: 'Software Testing', status: 'missing' },
                { name: 'DevOps', status: 'missing' }
            ],
            courses: [
                { code: 'CS 4400', name: 'Software Engineering' },
                { code: 'CS 4500', name: 'Software Testing and QA' },
                { code: 'CS 5200', name: 'Distributed Systems' }
            ]
        },
        'cybersecurity': {
            title: 'Cybersecurity Career Path',
            description: 'Cybersecurity focuses on protecting systems, networks, and programs from digital attacks. This path combines computer science knowledge with specialized security skills.',
            skills: [
                { name: 'Network Fundamentals', status: 'in-progress' },
                { name: 'Operating Systems Security', status: 'missing' },
                { name: 'Cryptography', status: 'missing' },
                { name: 'Security Protocols', status: 'missing' },
                { name: 'Ethical Hacking', status: 'missing' },
                { name: 'Digital Forensics', status: 'missing' }
            ],
            courses: [
                { code: 'CS 4610', name: 'Computer Networks' },
                { code: 'CS 4670', name: 'Computer Security' },
                { code: 'CS 5660', name: 'Advanced Cybersecurity' }
            ]
        },
        'ai-specialist': {
            title: 'AI Specialist Career Path',
            description: 'AI Specialists develop systems that can perform tasks that typically require human intelligence. This path focuses on machine learning, neural networks, and AI applications.',
            skills: [
                { name: 'Machine Learning', status: 'in-progress' },
                { name: 'Deep Learning', status: 'missing' },
                { name: 'Natural Language Processing', status: 'missing' },
                { name: 'Computer Vision', status: 'missing' },
                { name: 'AI Ethics', status: 'missing' },
                { name: 'Reinforcement Learning', status: 'missing' }
            ],
            courses: [
                { code: 'CS 4520', name: 'Advanced Machine Learning' },
                { code: 'CS 5510', name: 'Deep Learning' },
                { code: 'CS 5540', name: 'Natural Language Processing' }
            ]
        },
        'web-development': {
            title: 'Web Development Career Path',
            description: 'Web Developers create and maintain websites and web applications. This path covers both front-end and back-end development technologies and frameworks.',
            skills: [
                { name: 'HTML/CSS', status: 'complete' },
                { name: 'JavaScript', status: 'complete' },
                { name: 'Front-end Frameworks', status: 'in-progress' },
                { name: 'Back-end Development', status: 'in-progress' },
                { name: 'Database Integration', status: 'complete' },
                { name: 'Web Security', status: 'missing' }
            ],
            courses: [
                { code: 'CS 4550', name: 'Web Development' },
                { code: 'CS 4640', name: 'Programming Languages for the Web' },
                { code: 'CS 5600', name: 'Advanced Web Applications' }
            ]
        },
        'mobile-development': {
            title: 'Mobile Development Career Path',
            description: 'Mobile Developers create applications for mobile devices. This path covers app development for iOS, Android, or cross-platform solutions.',
            skills: [
                { name: 'Mobile UI/UX Design', status: 'in-progress' },
                { name: 'iOS/Swift Development', status: 'missing' },
                { name: 'Android/Kotlin Development', status: 'missing' },
                { name: 'Cross-Platform Development', status: 'missing' },
                { name: 'Mobile Security', status: 'missing' },
                { name: 'App Store Deployment', status: 'missing' }
            ],
            courses: [
                { code: 'CS 4720', name: 'Mobile App Development' },
                { code: 'CS 4750', name: 'iOS Programming' },
                { code: 'CS 4760', name: 'Android Programming' }
            ]
        },
        'product-design': {
            title: 'Product Design Career Path',
            description: 'Product Designers create user-centered digital products. This path combines technical skills with design principles and user experience research.',
            skills: [
                { name: 'UI/UX Design', status: 'in-progress' },
                { name: 'Prototyping', status: 'in-progress' },
                { name: 'User Research', status: 'missing' },
                { name: 'Interaction Design', status: 'missing' },
                { name: 'Visual Design', status: 'missing' },
                { name: 'Usability Testing', status: 'missing' }
            ],
            courses: [
                { code: 'CS 4800', name: 'Human-Computer Interaction' },
                { code: 'DES 3200', name: 'User Experience Design' },
                { code: 'DES 4100', name: 'Product Design Studio' }
            ]
        }
    };
    
    // Initialize the page
    function init() {
        // Initialize courses table
        populateCoursesTable();
        
        // Set up event listeners
        setupEventListeners();
        
        // Check if user prefers dark mode
        checkUserPreference();
    }
    
    // Populate courses table with data
    function populateCoursesTable() {
        const coursesTable = document.getElementById('courses-table').getElementsByTagName('tbody')[0];
        
        coursesData.forEach(course => {
            const row = coursesTable.insertRow();
            
            const codeCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const semesterCell = row.insertCell(2);
            const gradeCell = row.insertCell(3);
            const creditsCell = row.insertCell(4);
            
            codeCell.textContent = course.code;
            nameCell.textContent = course.name;
            semesterCell.textContent = course.semester;
            gradeCell.textContent = course.grade;
            creditsCell.textContent = course.credits;
        });
    }
    
    // Set up all event listeners
    function setupEventListeners() {
        // Theme toggle event listener
        themeToggle.addEventListener('change', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', themeToggle.checked);
        });
        
        // Navigation event listeners
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Hide all sections
                sections.forEach(section => {
                    section.classList.remove('active-section');
                });
                
                // Show target section
                document.getElementById(targetId).classList.add('active-section');
                
                // Update active navigation
                document.querySelectorAll('.sidebar li').forEach(item => {
                    item.classList.remove('active');
                });
                link.parentElement.classList.add('active');
            });
        });
        
        // Learning style slider event listeners
        styleSliders.forEach(slider => {
            const valueDisplay = slider.nextElementSibling;
            slider.addEventListener('input', () => {
                valueDisplay.textContent = slider.value;
            });
        });
        
        // Interest tags event listeners
        interestTags.forEach(tag => {
            tag.addEventListener('click', () => {
                tag.classList.toggle('selected');
            });
        });
        
        // Career path selector event listener
        careerPathSelect.addEventListener('change', () => {
            updateCareerPath(careerPathSelect.value);
        });
        
        // Prerequisites check button event listener
        checkBtn.addEventListener('click', () => {
            if (courseCheckSelect.value) {
                checkPrerequisites(courseCheckSelect.value);
            }
        });
    }
    
    // Check user preference for dark/light mode
    function checkUserPreference() {
        const darkMode = localStorage.getItem('darkMode');
        
        if (darkMode === 'true') {
            themeToggle.checked = true;
            body.classList.add('dark-mode');
        }
    }
    
    // Update career path details
    function updateCareerPath(pathId) {
        const pathData = careerPathData[pathId];
        const careerPathDetails = document.querySelector('.career-path-details');
        
        if (pathData) {
            let skillsHTML = '';
            pathData.skills.forEach(skill => {
                skillsHTML += `
                <li>
                    <span class="skill">${skill.name}</span>
                    <span class="status ${skill.status}">${capitalizeFirstLetter(skill.status)}</span>
                </li>`;
            });
            
            let coursesHTML = '';
            pathData.courses.forEach(course => {
                coursesHTML += `
                <li>
                    <span class="course-code">${course.code}</span>
                    <span class="course-name">${course.name}</span>
                </li>`;
            });
            
            careerPathDetails.innerHTML = `
                <h3>${pathData.title}</h3>
                <div class="path-description">
                    <p>${pathData.description}</p>
                </div>
                
                <div class="recommended-skills">
                    <h4>Recommended Skills</h4>
                    <ul class="skills-list">
                        ${skillsHTML}
                    </ul>
                </div>
                
                <div class="recommended-courses">
                    <h4>Recommended Courses</h4>
                    <ul class="course-list">
                        ${coursesHTML}
                    </ul>
                </div>
            `;
        }
    }
    
    // Check prerequisites for a course
    function checkPrerequisites(courseId) {
        const courseData = prerequisitesData[courseId];
        
        if (courseData) {
            let prerequisitesHTML = '';
            courseData.prerequisites.forEach(prereq => {
                let statusDisplay = '';
                if (prereq.status === 'complete') {
                    statusDisplay = `Completed (${prereq.grade})`;
                } else {
                    statusDisplay = 'Not Completed';
                }
                
                prerequisitesHTML += `
                <div class="prerequisite-item ${prereq.status}">
                    <i class="fas fa-${prereq.status === 'complete' ? 'check' : 'times'}-circle"></i>
                    <div class="prereq-info">
                        <span class="prereq-code">${prereq.code}</span>
                        <span class="prereq-name">${prereq.name}</span>
                    </div>
                    <div class="prereq-status">${statusDisplay}</div>
                </div>`;
            });
            
            prerequisitesResults.innerHTML = `
                <h3>Prerequisites Analysis</h3>
                <div class="course-title">${courseData.title}</div>
                
                <div class="status-summary">
                    <div class="status-box ${courseData.status}">
                        <i class="fas fa-${courseData.status === 'success' ? 'check' : 'exclamation'}-triangle"></i>
                        <span>${courseData.status === 'success' ? 'Prerequisites Met' : 'Missing Prerequisites'}</span>
                    </div>
                </div>
                
                <div class="prerequisites-list">
                    ${prerequisitesHTML}
                </div>
                
                <div class="recommendation">
                    <h4>Recommendation</h4>
                    <p>${courseData.recommendation}</p>
                </div>
            `;
        }
    }
    
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        if (string === 'complete') return 'Complete';
        if (string === 'in-progress') return 'In Progress';
        if (string === 'missing') return 'Missing';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Call init function when DOM is loaded
    init();
});