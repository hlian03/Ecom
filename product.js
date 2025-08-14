
//  GLOBAL VARIABLES 
// Store all products and currently displayed products
let allProducts = [];
let currentProducts = [];

//  FETCH PRODUCTS FROM JSON FILE 
// Function to load products from external JSON file
async function fetchProductsFromJSON() {
    try {
        // Fetch data from the external JSON file
        const response = await fetch('product.json');
        
        // Check if the response is working
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the JSON data
        const data = await response.json();
        
        // Return the products array
        return data.products;
        
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// ===== HTML GENERATION FUNCTIONS =====
// Function to create HTML for a single product
function createProductHTML(product) {
    return `
        <div class="product-item" data-id="${product.id}"> 
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h2>${product.name}</h2>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p><strong>Description:</strong></p>
            <p class="product-description">${product.description}</p>
        </div>
    `;
}

// Function to render products to the grid
function renderProducts(products) {
    const productGrid = document.getElementById('product-grid');
    
    if (products.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; font-size: 1.5em; padding: 50px;">No products found.</p>';
        return;
    }

    productGrid.innerHTML = products.map(product => createProductHTML(product)).join('');
}

//  MAIN LOADING FUNCTION 
// Function to load and display all products
async function loadProducts() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    try {
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        
        allProducts = await fetchProductsFromJSON();
        currentProducts = [...allProducts];
        
        loadingElement.style.display = 'none';
        renderProducts(currentProducts);
        
    } catch (error) {
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = 'Failed to load products. Please try again later.';
        console.error('Error loading products:', error);
    }
}

//  SEARCH AND FILTER FUNCTIONS for product serach // 
// Search functionality
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    let filteredProducts = allProducts;
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    currentProducts = filteredProducts;
    renderProducts(currentProducts);
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    currentProducts = [...allProducts];
    renderProducts(currentProducts);
}

// Sort by price
function sortByPrice() {
    const sorted = [...currentProducts].sort((a, b) => a.price - b.price);
    currentProducts = sorted;
    renderProducts(currentProducts);
}

//  EVENT LISTENERS AND INITIALIZATION 
// Add event listener for Enter key in search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Load products when page loads
    loadProducts();
});


