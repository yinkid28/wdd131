// Product array for display purposes
const products = [
    { id: "smartphone", name: "Smartphone Pro Max" },
    { id: "laptop", name: "UltraBook Elite" },
    { id: "tablet", name: "Tablet Air Plus" },
    { id: "smartwatch", name: "Smart Watch Series X" },
    { id: "headphones", name: "Wireless Headphones Premium" },
    { id: "speaker", name: "Bluetooth Speaker Pro" },
    { id: "camera", name: "Digital Camera 4K" },
    { id: "gaming-console", name: "Gaming Console Next Gen" }
];

function getProductName(id) {
    const product = products.find(p => p.id === id);
    return product ? product.name : id;
}

function getStarRating(rating) {
    const stars = '☆'.repeat(parseInt(rating));
    return `<span class="rating-stars">${stars}</span>`;
}

function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getFeaturesList(features) {
    if (!features || features.length === 0) return 'None selected';
    
    const featureMap = {
        'durability': 'Durability',
        'ease-of-use': 'Ease of Use',
        'performance': 'Performance',
        'design': 'Design'
    };
    
    if (typeof features === 'string') {
        features = [features];
    }
    
    return features.map(feature => featureMap[feature] || feature).join(', ');
}

function displayReviewDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const reviewDetails = document.getElementById('reviewDetails');
    
    const productName = urlParams.get('productName');
    const rating = urlParams.get('rating');
    const installDate = urlParams.get('installDate');
    const features = urlParams.getAll('features');
    const writtenReview = urlParams.get('writtenReview');
    const userName = urlParams.get('userName');

    let detailsHTML = '';

    if (productName) {
        detailsHTML += `
            <div class="summary-item">
                <div class="summary-label">Product:</div>
                <div class="summary-value">${getProductName(productName)}</div>
            </div>
        `;
    }

    if (rating) {
        detailsHTML += `
            <div class="summary-item">
                <div class="summary-label">Rating:</div>
                <div class="summary-value">${getStarRating(rating)} (${rating}/5)</div>
            </div>
        `;
    }

    if (installDate) {
        detailsHTML += `
            <div class="summary-item">
                <div class="summary-label">Installation Date:</div>
                <div class="summary-value">${formatDate(installDate)}</div>
            </div>
        `;
    }

    detailsHTML += `
        <div class="summary-item">
            <div class="summary-label">Useful Features:</div>
            <div class="summary-value">${getFeaturesList(features)}</div>
        </div>
    `;

    if (writtenReview) {
        detailsHTML += `
            <div class="summary-item">
                <div class="summary-label">Written Review:</div>
                <div class="summary-value">"${writtenReview}"</div>
            </div>
        `;
    }

    if (userName) {
        detailsHTML += `
            <div class="summary-item">
                <div class="summary-label">Reviewer:</div>
                <div class="summary-value">${userName}</div>
            </div>
        `;
    }

    reviewDetails.innerHTML = detailsHTML;
}

function updateReviewCounter() {
    // Get current count from localStorage
    let reviewCount = parseInt(localStorage.getItem('reviewCount')) || 0;
    
    // Increment the count
    reviewCount++;
    
    // Store the updated count
    localStorage.setItem('reviewCount', reviewCount.toString());
    
    // Display the count
    document.getElementById('reviewCounter').textContent = reviewCount;
}

function updateLastModified() {
    const lastModifiedElement = document.getElementById('lastModified');
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayReviewDetails();
    updateReviewCounter();
    updateLastModified();
});