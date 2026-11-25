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
        <html>
        <head>
            <title>My E-Commerce Store</title>
            <style>
                body { font-family: Arial; text-align: center; background: #f4f4f4; }
                .product { background: white; margin: 15px auto; padding: 15px; width: 300px; border-radius: 8px; }
                button { padding: 10px; background: #007bff; color: white; border: none; cursor: pointer; }
            </style>
        </head>
        <body>
            <h1>Welcome to My E-Commerce Store</h1>
            <h2>Available Products</h2>
            <div id="products"></div>
            <h2>Shopping Cart</h2>
            <ul id="cart"></ul>
            <script>
                let cart = [];
                const products = ${JSON.stringify(products)};

                products.forEach(product => {
                    document.getElementById('products').innerHTML +=
                        '<div class="product"><h3>' + product.name +
                        '</h3><p>Price: ₹' + product.price +
                        '</p><button onclick="addToCart(' + product.id +
                        ')">Add to Cart</button></div>';
                });

                function addToCart(id) {
                    const product = products.find(item => item.id === id);
                    cart.push(product);
                    document.getElementById('cart').innerHTML =
                        cart.map(item => '<li>' + item.name + ' - ₹' +
                        item.price + '</li>').join('');
                }
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
