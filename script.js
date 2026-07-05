// 1. Mock Data: Initial cars to display if the database is empty
const defaultCars = [
    {
        id: 1,
        title: "2021 Toyota Camry SE",
        brand: "Toyota",
        price: 24500,
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "2019 Honda Civic Sport",
        brand: "Honda",
        price: 19800,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "2022 Mercedes-Benz C300",
        brand: "Mercedes",
        price: 42000,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80"
    }
];

// 2. Load cars from localStorage, or use defaults if empty
let cars = JSON.parse(localStorage.getItem('marketplaceCars')) || defaultCars;

// DOM Elements
const carGrid = document.getElementById('carGrid');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const sellModal = document.getElementById('sellModal');
const sellForm = document.getElementById('sellForm');
const brandFilter = document.getElementById('brandFilter');
const priceFilter = document.getElementById('priceFilter');
const applyFiltersBtn = document.getElementById('applyFilters');

// 3. Function to display cars in the HTML grid
function displayCars(carsToRender) {
    carGrid.innerHTML = ""; // Clear existing UI cards
    
    if (carsToRender.length === 0) {
        carGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>No cars match your search.</p>";
        return;
    }

    carsToRender.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.title}" onerror="this.src='https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'">
            <div class="car-info">
                <h3>${car.title}</h3>
                <p class="car-price">$${Number(car.price).toLocaleString()}</p>
            </div>
        `;
        carGrid.appendChild(carCard);
    });
}

// 4. Filter Logic
function handleFilters() {
    const selectedBrand = brandFilter.value;
    const maxPrice = Number(priceFilter.value);

    const filtered = cars.filter(car => {
        const matchesBrand = selectedBrand === 'all' || car.brand.toLowerCase() === selectedBrand.toLowerCase();
        const matchesPrice = !maxPrice || car.price <= maxPrice;
        return matchesBrand && matchesPrice;
    });

    displayCars(filtered);
}

// 5. Modal Popup Controls
openModalBtn.addEventListener('click', () => sellModal.style.display = 'flex');
closeModalBtn.addEventListener('click', () => sellModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === sellModal) sellModal.style.display = 'none';
});

// 6. Handling the Form Submission (Adding a new car)
sellForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page reload

    // Create a new car object from form values
    const newCar = {
        id: Date.now(), // Generate unique ID
        title: document.getElementById('carTitle').value,
        brand: document.getElementById('carBrand').value,
        price: Number(document.getElementById('carPrice').value),
        image: document.getElementById('carImage').value
    };

    // Add to our main array and save to local storage
    cars.push(newCar);
    localStorage.setItem('marketplaceCars', JSON.stringify(cars));

    // Refresh display, clear form, and close modal
    displayCars(cars);
    sellForm.reset();
    sellModal.style.display = 'none';
});

// Event Listeners for Filters
applyFiltersBtn.addEventListener('click', handleFilters);

// Run on page load
displayCars(cars);