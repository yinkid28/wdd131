// filtered-temples.js
// Temple data array with all required temples
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-view-787204-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Additional temples (3+ more as required)
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple7.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 40500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/3-Rome-Temple-2190090.jpg"
    },
    {
        templeName: "Provo City Center",
        location: "Provo, Utah, United States",
        dedicated: "2016, March, 20",
        area: 85084,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/400x250/provo-city-center-temple-1572517-wallpaper.jpg"
    },
    {
        templeName: "Preston England",
        location: "Preston, England",
        dedicated: "1998, June, 7",
        area: 69630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/preston-england/400x250/preston-england-temple-lds-130635-wallpaper.jpg"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53997,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo_japan_temple_night_1075606_wallpaper.jpg"
    }
];

// Filter configurations
const filterConfig = {
    home: {
        title: "Home",
        filter: () => true
    },
    old: {
        title: "Old",
        filter: (temple) => {
            const year = new Date(temple.dedicated).getFullYear();
            return year < 1900;
        }
    },
    new: {
        title: "New",
        filter: (temple) => {
            const year = new Date(temple.dedicated).getFullYear();
            return year > 2000;
        }
    },
    large: {
        title: "Large",
        filter: (temple) => temple.area > 90000
    },
    small: {
        title: "Small",
        filter: (temple) => temple.area < 10000
    }
};

// DOM elements
const templeGrid = document.getElementById('temple-grid');
const filterTitle = document.getElementById('filter-title');
const navLinks = document.querySelectorAll('nav a[data-filter]');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Create temple card HTML
function createTempleCard(temple) {
    return `
        <article class="temple-card">
            <img 
                src="${temple.imageUrl}" 
                alt="${temple.templeName} Temple"
                loading="lazy"
                width="400"
                height="250"
            >
            <div class="temple-info">
                <h3 class="temple-name">${temple.templeName}</h3>
                <div class="temple-details">
                    <div class="detail-item">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${temple.location}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Dedicated:</span>
                        <span class="detail-value">${temple.dedicated}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Area:</span>
                        <span class="detail-value">${temple.area.toLocaleString()} sq ft</span>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// Display temples based on filter
function displayTemples(filterKey = 'home') {
    const config = filterConfig[filterKey];
    const filteredTemples = temples.filter(config.filter);
    
    // Update filter title
    filterTitle.textContent = config.title;
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.filter === filterKey);
    });
    
    // Display temples or no results message
    if (filteredTemples.length === 0) {
        templeGrid.innerHTML = `
            <div class="no-temples">
                <h3>No temples match the current filter</h3>
                <p>Try selecting a different filter option.</p>
            </div>
        `;
    } else {
        templeGrid.innerHTML = filteredTemples.map(createTempleCard).join('');
    }
}

// Mobile menu toggle functionality
function toggleMobileMenu() {
    navMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
}

// Event listeners for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filterKey = e.target.dataset.filter;
        displayTemples(filterKey);
        
        // Close mobile menu if open
        if (navMenu.classList.contains('show')) {
            toggleMobileMenu();
        }
    });
});

// Hamburger menu event listener
hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('show')) {
            toggleMobileMenu();
        }
    }
});

// Footer date functions
function updateFooter() {
    const copyrightYear = document.getElementById('currentYear');
    const lastModified = document.getElementById('lastModified');
    
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
    
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}

// Initialize the page
function init() {
    updateFooter();
    displayTemples('home');
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);