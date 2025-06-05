// Product mapping for display names
const productNames = {
    "smartphone": "Smartphone Pro Max",
    "laptop": "UltraBook Elite",
    "tablet": "Tablet Air Plus",
    "smartwatch": "Smart Watch Series X",
    "headphones": "Wireless Headphones Premium",
    "speaker": "Bluetooth Speaker Pro",
    "camera": "Digital Camera 4K",
    "gaming-console": "Gaming Console Next Gen"
};

// Function to get URL parameters
function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const formData = {};
    
    for (const [key, value] of params) {
        if (key === 'features') {
            // Handle multiple checkbox values
            if (!formData[key]) {
                formData[key] = [];
            }
            formData[key].push(value);
        } else {
            formData[key] = value;
        }
    }
    
    return formData;
}

// Function to display review details
function displayReviewDetails() {
    const formData = getUrlParameters();
    const reviewDetailsContainer = document.getElementById('reviewDetails');
    
    if (Object.keys(formData).length === 0) {
        reviewDetailsContainer.innerHTML = '<p>No review data found.</p>';
        return;
    }
    
    let detailsHTML = '';
    
    // Product Name
    if (formData.productName) {
        const productDisplayName = productNames[formData.productName] || formData.productName;
        detailsHTML += `
            <div class="summary-item">
                <span class="summary-label">Product:</span>
                <span class="summary-value">${productDisplayName}</span>
            </div>
        `;
    }
    
    // Rating
    if (formData.rating) {
        const stars = '★'.repeat(parseInt(formData.rating)) + '☆'.repeat(5 - parseInt(formData.rating));
        detailsHTML += `
            <div class="summary-item">
                <span class="summary-label">Rating:</span>
                <span class="summary-value rating-stars">${stars} (${formData.rating}/5)</span>
            </div>
        `;
    }
    
    // Installation Date
    if (formData.installDate) {
        const date = new Date(formData.installDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        detailsHTML += `
            <div class="summary-item">
                <span class="summary-label">Installation Date:</span>
                <span class="summary-value">${formattedDate}</span>
            </div>
        `;
    }
    
    // Features
    if (formData.features && formData.features.length > 0) {
        const featuresFormatted = formData.features.map(feature => {
            return feature.charAt(0).toUpperCase() + feature.slice(1).replace('-', ' ');
        }).join(', ');
        
        detailsHTML += `
            <div class="summary-item">
                <span class="summary-label">Useful Features:</span>
                <span class="summary-value">${featuresFormatted}</span>
            </div>
        `;
    }
    
    // Written Review
    if (formData.writtenReview && formData.writtenReview.trim() !== '') {
        detailsHTML += `
            <div class="summary-item">
                <span class="summary-label">Written Review:</span>
                <span class="summary-value">${formData.writtenReview}</span>
            </div>
        `;
    }
    
    // User Name
    if (formData.userName && formData.userName.trim() !== '') {
        detailsHTML += `
            <div class="summary-item">
                <span class="summary-label">Reviewer:</span>
                <span class="summary-value">${formData.userName}</span>
            </div>
        `;
    }
    
    reviewDetailsContainer.innerHTML = detailsHTML;
}

// Function to update and display review counter
function updateReviewCounter() {
    // Get current count from localStorage (simulating a counter)
    let currentCount = parseInt(localStorage.getItem('reviewCount') || '0');
    currentCount += 1;
    
    // Update localStorage
    localStorage.setItem('reviewCount', currentCount.toString());
    
    // Display the count
    const counterElement = document.getElementById('reviewCounter');
    if (counterElement) {
        counterElement.textContent = currentCount;
    }
}

// Function to update last modified date
function updateLastModified() {
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const now = new Date();
        const formattedDate = now.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        lastModifiedElement.textContent = formattedDate.replace(',', '');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayReviewDetails();
    updateReviewCounter();
    updateLastModified();
});