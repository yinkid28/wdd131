// Product array as specified in requirements
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

// Populate product select options
function populateProducts() {
    const select = document.getElementById('productName');
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

// Update last modified date
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

// Enhanced rating system with visual feedback
function setupRatingSystem() {
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const ratingLabels = document.querySelectorAll('.rating-group label');

    ratingInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            // Reset all labels
            ratingLabels.forEach(label => {
                label.style.color = '#ddd';
            });
            
            // Highlight selected rating and all previous ones
            for (let i = 0; i <= index; i++) {
                ratingLabels[i].style.color = '#9a8300';
            }
        });
    });

    // Add hover effects
    ratingLabels.forEach((label, index) => {
        label.addEventListener('mouseenter', () => {
            // Highlight hovered rating and all previous ones
            for (let i = 0; i <= index; i++) {
                ratingLabels[i].style.color = '#9a8300';
            }
        });

        label.addEventListener('mouseleave', () => {
            // Reset to current selection
            const checkedInput = document.querySelector('input[name="rating"]:checked');
            ratingLabels.forEach(l => l.style.color = '#ddd');
            
            if (checkedInput) {
                const checkedIndex = Array.from(ratingInputs).indexOf(checkedInput);
                for (let i = 0; i <= checkedIndex; i++) {
                    ratingLabels[i].style.color = '#9a8300';
                }
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateProducts();
    updateLastModified();
    setupRatingSystem();
});