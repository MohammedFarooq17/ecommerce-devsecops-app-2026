const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const products = [
    { id: 1, name: 'Laptop', price: 55000 },
    { id: 2, name: 'Smartphone', price: 25000 },
    { id: 3, name: 'Headphones', price: 2000 },
    { id: 4, name: 'Smart Watch', price: 5000 }
];

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ShopZone - Online Shopping</title>

<style>

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #f5f6fa;
    color: #202124;
}

.topbar {
    background: #172337;
    color: white;
    padding: 16px 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    flex-wrap: wrap;
}

.logo {
    font-size: 30px;
    font-weight: 800;
    font-style: normal;
    color: #ffca28;
    letter-spacing: -1px;
}

.search {
    display: flex;
    flex: 1;
    max-width: 650px;
    background: white;
    border-radius: 7px;
    overflow: hidden;
}

.search input {
    width: 100%;
    padding: 14px 17px;
    border: none;
    outline: none;
    font-size: 15px;
}

.search button {
    padding: 0 25px;
    border: none;
    background: #ffca28;
    color: #172337;
    font-weight: bold;
    cursor: pointer;
}

.cart-button {
    background: #ffca28;
    color: #172337;
    border: none;
    padding: 13px 20px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    font-size: 15px;
}

.categories {
    background: white;
    display: flex;
    justify-content: center;
    gap: 38px;
    padding: 17px;
    box-shadow: 0 3px 12px rgba(0,0,0,0.06);
    flex-wrap: wrap;
}

.categories button {
    background: none;
    border: none;
    font-weight: 600;
    cursor: pointer;
    color: #333;
    font-size: 14px;
}

.categories button:hover {
    color: #2874f0;
}

.hero {
    margin: 25px auto;
    width: 92%;
    padding: 65px 45px;
    border-radius: 14px;
    color: white;
    background: linear-gradient(115deg, #101d42, #2455a4, #168caa);
    box-shadow: 0 10px 30px rgba(20,50,100,0.16);
}

.hero h1 {
    font-size: 40px;
    margin-bottom: 15px;
    line-height: 1.2;
}

.hero p {
    font-size: 18px;
    margin-bottom: 25px;
    color: #e7efff;
}

.hero button {
    background: #ffca28;
    color: #172337;
    padding: 14px 28px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    font-size: 15px;
}

.container {
    width: 92%;
    margin: 35px auto;
}

.section-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    gap: 12px;
}

.section-heading h2 {
    font-size: 26px;
    color: #172337;
}

.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 22px;
}

.product {
    background: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    border: 1px solid #edf0f4;
    box-shadow: 0 4px 15px rgba(0,0,0,0.045);
    transition: transform 0.2s, box-shadow 0.2s;
}

.product:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.10);
}

.product img {
    width: 100%;
    height: 190px;
    object-fit: contain;
    margin-bottom: 18px;
}

.product h3 {
    margin-bottom: 12px;
    font-size: 19px;
    color: #202124;
}

.price {
    color: #16833b;
    font-size: 23px;
    font-weight: bold;
    margin: 13px 0;
}

.rating {
    display: inline-block;
    background: #e8f5e9;
    color: #26733b;
    font-size: 13px;
    padding: 6px 10px;
    border-radius: 20px;
}

.product button {
    background: #ffca28;
    color: #202124;
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    font-size: 15px;
    margin-top: 8px;
}

.product button:hover {
    background: #f5b800;
}

.cart-section {
    background: white;
    padding: 25px;
    border-radius: 12px;
    margin-top: 40px;
    border: 1px solid #edf0f4;
    box-shadow: 0 4px 15px rgba(0,0,0,0.04);
}

.cart-section h2 {
    margin-bottom: 20px;
    color: #172337;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid #eee;
    gap: 10px;
}

.cart-item button {
    padding: 7px 12px;
    border: none;
    border-radius: 5px;
    background: #ffe8e8;
    color: #c62828;
    cursor: pointer;
}

.cart-total {
    text-align: right;
    font-size: 22px;
    font-weight: bold;
    margin-top: 22px;
    color: #16833b;
}

footer {
    margin-top: 50px;
    background: #172337;
    color: white;
    padding: 35px 20px;
    text-align: center;
    line-height: 1.9;
}

@media(max-width: 600px) {
    .topbar {
        padding: 15px;
        gap: 14px;
    }

    .logo {
        font-size: 25px;
    }

    .search {
        order: 3;
        flex-basis: 100%;
    }

    .hero {
        padding: 38px 24px;
    }

    .hero h1 {
        font-size: 28px;
    }

    .hero p {
        font-size: 15px;
    }

    .categories {
        gap: 18px;
    }

    .section-heading h2 {
        font-size: 21px;
    }

    .container {
        width: 94%;
    }

    .products {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
    }

    .product {
        padding: 12px;
    }

    .product img {
        height: 125px;
    }

    .product h3 {
        font-size: 16px;
    }

    .price {
        font-size: 18px;
    }
}

</style>
</head>

<body>

<header class="topbar">
    <div class="logo">ShopZone</div>

    <div class="search">
        <input id="searchInput" type="text"
               placeholder="Search for products, brands and more...">
        <button onclick="renderProducts()">Search</button>
    </div>

    <button class="cart-button" onclick="document.getElementById('cartSection').scrollIntoView({behavior:'smooth'})">
        🛒 Cart (<span id="cartCount">0</span>)
    </button>
</header>

<nav class="categories">
    <button onclick="filterCategory('All')">All Products</button>
    <button onclick="filterCategory('Laptop')">Laptops</button>
    <button onclick="filterCategory('Smartphone')">Mobiles</button>
    <button onclick="filterCategory('Headphones')">Headphones</button>
    <button onclick="filterCategory('Smart Watch')">Smart Watches</button>
</nav>

<section class="hero">
    <h1>Big Shopping Days Are Here!</h1>
    <p>Discover amazing products at great prices.</p>
    <button onclick="document.getElementById('productSection').scrollIntoView({behavior:'smooth'})">
        Shop Now
    </button>
</section>

<main class="container" id="productSection">
    <div class="section-heading">
        <h2>Best Deals For You</h2>
        <span>Explore our collection</span>
    </div>

    <div class="products" id="products"></div>

    <section class="cart-section" id="cartSection">
        <h2>🛒 Your Shopping Cart</h2>
        <div id="cartItems">Your cart is empty.</div>
        <div class="cart-total" id="cartTotal">Total: ₹0</div>
    </section>
</main>

<footer>
    <h3>ShopZone</h3>
    <p>Online Shopping Made Easy</p>
    <p>© 2026 ShopZone. All rights reserved.</p>
</footer>

<script>
const products = ${JSON.stringify(products)};

const images = {
    1: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    2: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    3: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    4: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
};

let cart = [];
let selectedCategory = 'All';

function renderProducts() {
    const search = document.getElementById('searchInput').value.toLowerCase();

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search);
        const matchesCategory =
            selectedCategory === 'All' || product.name === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    document.getElementById('products').innerHTML = filtered.length
        ? filtered.map(product => \`
            <div class="product">
                <img src="\${images[product.id]}" alt="\${product.name}"
                     onerror="this.src='https://placehold.co/300x200?text=Product'">
                <h3>\${product.name}</h3>
                <div class="rating">★ 4.5 | Great choice</div>
                <p class="price">₹\${product.price.toLocaleString('en-IN')}</p>
                <button onclick="addToCart(\${product.id})">Add to Cart</button>
            </div>
        \`).join('')
        : '<p>No products found.</p>';
}

function filterCategory(category) {
    selectedCategory = category;
    renderProducts();
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    document.getElementById('cartCount').textContent = cart.length;

    document.getElementById('cartItems').innerHTML = cart.length
        ? cart.map((item, index) => \`
            <div class="cart-item">
                <span>\${item.name} - ₹\${item.price.toLocaleString('en-IN')}</span>
                <button onclick="removeFromCart(\${index})">Remove</button>
            </div>
        \`).join('')
        : 'Your cart is empty.';

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cartTotal').textContent =
        'Total: ₹' + total.toLocaleString('en-IN');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('searchInput').addEventListener('input', renderProducts);
renderProducts();
</script>

</body>
</html>
    `);
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`E-commerce application running on port ${PORT}`);
});
