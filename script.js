// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = this.getAttribute('href');
        if (target !== '#') {
            e.preventDefault();
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.projects-preview, .about').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Add active state to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function () {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

console.log('My Land Property and Developers - Website Loaded Successfully');

// ==========================================
// PROJECT MANAGEMENT SYSTEM (CMS)
// ==========================================

// 1. Initial Default Data (If nothing in storage)
const DEFAULT_PROJECTS = [
    {
        id: '1',
        title: 'Turbat Valley',
        description: 'Premium plots in prime location with all modern amenities including 24/7 security, parks, and community center.',
        price: 'From PKR 2.5M',
        status: 'Available',
        image: '5.jpeg',
        plots: {
            'A1': 'sold', 'A2': 'sold', 'A3': 'available', 'A4': 'available', 'A5': 'reserved', 'A6': 'available', 'A7': 'sold', 'A8': 'available',
            'B1': 'available', 'B2': 'sold', 'B3': 'available', 'B4': 'reserved', 'B5': 'available', 'B6': 'available', 'B7': 'sold', 'B8': 'reserved',
            'C1': 'available', 'C2': 'available', 'C3': 'sold', 'C4': 'available', 'C5': 'available', 'C6': 'sold', 'C7': 'available', 'C8': 'available',
            'D1': 'sold', 'D2': 'available', 'D3': 'available', 'D4': 'available', 'D5': 'reserved', 'D6': 'available', 'D7': 'available', 'D8': 'sold'
        }
    }
];

// 2. Data Access Layer
const DB = {
    // Get all projects
    getProjects: function () {
        const stored = localStorage.getItem('projectsData');
        if (!stored) {
            this.saveProjects(DEFAULT_PROJECTS);
            return DEFAULT_PROJECTS;
        }
        return JSON.parse(stored);
    },

    // Get single project by ID
    getProject: function (id) {
        const projects = this.getProjects();
        return projects.find(p => p.id === id);
    },

    // Save entire projects array
    saveProjects: function (projects) {
        localStorage.setItem('projectsData', JSON.stringify(projects));
    },

    // Add or Update a project
    saveProject: function (project) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === project.id);

        if (index >= 0) {
            // Update existing
            projects[index] = project;
        } else {
            // Add new
            projects.push(project);
        }
        this.saveProjects(projects);
    },

    // Delete a project
    deleteProject: function (id) {
        const projects = this.getProjects();
        const filtered = projects.filter(p => p.id !== id);
        this.saveProjects(filtered);
    }
};

// 3. Helper: Get Plot Layout (Grid Structure)
function getPlotLayout() {
    return [
        { id: 'A1' }, { id: 'A2' }, { id: 'A3' }, { id: 'A4' }, { id: 'A5' }, { id: 'A6' }, { id: 'A7' }, { id: 'A8' },
        { id: 'B1' }, { id: 'B2' }, { id: 'B3' }, { id: 'B4' }, { id: 'B5' }, { id: 'B6' }, { id: 'B7' }, { id: 'B8' },
        { type: 'road' },
        { id: 'C1' }, { id: 'C2' }, { id: 'C3' }, { id: 'C4' }, { id: 'C5' }, { id: 'C6' }, { id: 'C7' }, { id: 'C8' },
        { id: 'D1' }, { id: 'D2' }, { id: 'D3' }, { id: 'D4' }, { id: 'D5' }, { id: 'D6' }, { id: 'D7' }, { id: 'D8' }
    ];
}

// Initialize
DB.getProjects();
