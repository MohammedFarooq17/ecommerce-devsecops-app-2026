cd /home/ec2-user/ecommerce-devsecops-app
cat > server.js <<'EOF'
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
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: Arial, sans-serif;
    background: #f1f3f6;
    color: #212121;
}

.topbar {
    background: #2874f0;
    color: white;
    padding: 15px 6%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
}

.logo {
    font-size: 27px;
    font-weight: bold;
    font-style: italic;
}

.search {
    display: flex;
    flex: 1;
    max-width: 550px;
}

.search input {
    width: 100%;
    padding: 12px;
    border: none;
    outline: none;
    border-radius: 4px 0 0 4px;
    font-size: 15px;
}

.search button {
    padding: 12px 20px;
    border: none;
    background: #ffca28;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
}

.cart-button {
    background: white;
    color: #2874f0;
    border: none;
    padding: 12px 18px;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
}

.categories {
    background: white;
    display: flex;
    justify-content: center;
    gap: 35px;
    padding: 17px;
    box-shadow: 0 2px 5px #ddd;
    flex-wrap: wrap;
}

.categories button {
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    color: #333;
    font-size: 14px;
}

.categories button:hover { color: #2874f0; }

.hero {
    margin: 22px auto;
    width: 92%;
    padding: 55px 35px;
    border-radius: 10px;
    color: white;
    background: linear-gradient(110deg, #172b75, #2874f0, #00bcd4);
}

.hero h1 { font-size: 36px; margin-bottom: 12px; }
.hero p { font-size: 17px; margin-bottom: 20px; }

.hero button {
    background: #ffca28;
    color: #222;
    padding: 13px 25px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
}

.container {
    width: 92%;
    margin: 25px auto;
}

.section-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
}

.section-heading h2 { font-size: 24px; }

.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
}

.product {
    background: white;
    border-radius: 8px;
    padding: 18px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    transition: transform 0.2s;
}

.product:hover { transform: translateY(-5px); }

.product img {
    width: 100%;
    height: 175px;
    object-fit: contain;
    margin-bottom: 15px;
}

.product h3 { margin-bottom: 10px; font-size: 18px; }

.price {
    color: #16833b;
    font-size: 21px;
    font-weight: bold;
    margin: 12px 0;
}

.rating {
    color: #388e3c;
    font-size: 13px;
}

.product button {
    background: #ff9f00;
    color: white;
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
}

.product button:hover { background: #fb8c00; }

.cart-section {
    background: white;
    padding: 22px;
    border-radius: 8px;
    margin-top: 30px;
}

.cart-section h2 { margin-bottom: 15px; }

.cart-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    gap: 10px;
}

.cart-total {
    text-align: right;
    font-size: 20px;
    font-weight: bold;
    margin-top: 18px;
}

footer {
    margin-top: 40px;
    background: #172337;
    color: white;
    padding: 28px;
    text-align: center;
}

@media(max-width: 600px) {
    .topbar { padding: 15px; }
    .search { order: 3; flex-basis: 100%; }
    .hero { padding: 35px 22px; }
    .hero h1 { font-size: 27px; }
    .categories { gap: 18px; }
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
