
const container = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const cartContainer = document.getElementById('cartContainer');
const cartSection = document.getElementById('cart');

// 🕒 Live DateTime
function updateDateTime() {
  document.getElementById('datetime').textContent = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
}
setInterval(updateDateTime, 1000);
updateDateTime();

// 🔥 Sub Filter Dropdown
const subFilter = document.createElement('select');
subFilter.id = 'subFilter';
subFilter.innerHTML = `
  <option value="all">All</option>
  <option value="boys">Boys</option>
  <option value="girls">Girls</option>
`;
subFilter.style.display = 'none';
document.querySelector('.sidebar').appendChild(subFilter);

// 🛍️ Product Data
let allProducts = [];

async function loadAllCategories() {
  const categories = ['electronics', 'toy', 'grocery', 'furniture', 'dress'];
  allProducts = [];

  for (const cat of categories) {
    const file = `data/${cat}.json`;
    try {
      const res = await fetch(file);
      const data = await res.json();
      const items = (data.items || []).map((item, i) => ({
        id: i + 100 + allProducts.length,
        title: item.name || item.title,
        price: item.price,
        delete: item.delete,
        type: item.type,
        rating: item.rating,
        img: item.img,
        material: item.material,
        category: cat,
        sub: item.sub || '',
      }));
      allProducts.push(...items);
    } catch (e) {
      console.error(`Error loading ${file}:`, e);
    }
  }

  renderProducts(allProducts);
}

// 🧠 Render Filtered Products
function renderProducts(list) {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;
  const selectedSub = subFilter.value;

  let filtered = list.filter(p =>
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(searchTerm) &&
    (selectedSub === 'all' || p.sub === selectedSub)
  );

  subFilter.style.display = list.some(p => p.sub) ? 'block' : 'none';

  container.innerHTML = '';
  filtered.forEach((p, i) => {
    const c = document.createElement('div');
    c.className = 'card';
    c.innerHTML = `
      <div class="product-card effect-10">
        <img src="${p.img}" alt="${p.title}" />
      </div>
      <h4>${p.title}</h4>
      ${p.type ? `<div class="type">${p.type}</div>` : ''}
      ${p.material ? `<div class="material">${p.material}</div>` : ''}
      <div class="price">
        ${p.delete ? `<del class="delete">₹${p.delete}</del>` : ''} ₹${p.price}
      </div>
      <div class="rating">⭐ ${p.rating}</div>
      <div class="actions">
        <button onclick="addToCart('${p.title}', ${p.price} )">Add to Cart</button>
      </div>
    `;

    container.appendChild(c);
    setTimeout(() => c.classList.add('visible'), 100 * i);
  });
}

// 🛒 SHOPPING CART LOGIC
const cart = {}; // { title: { price, qty } }

function addToCart(name, price) {
   alert(`Add to cart " ${name} " --> ${price}`)
  if (!cart[name]) {
    
    cart[name] = { price, qty: 1 };
  } else {
    
    cart[name].qty++;
  }
  renderCart();
}

function increaseQty(name) { 
  cart[name].qty++;
  renderCart();
}

function decreaseQty(name) {
  if (cart[name].qty > 1) {
    cart[name].qty--;
  } else {
    delete cart[name];
  }
  renderCart();
}

function removeItem(name) {
  delete cart[name];
  renderCart();
}

function renderCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  Object.keys(cart).forEach(name => {
    const item = cart[name];
    total += item.qty * item.price;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span id="cart-name"><b>${name}</b>₹${item.price}</span>
      <button onclick="decreaseQty('${name}')">-</button>
      Qty: ${item.qty}
      <button onclick="increaseQty('${name}')">+</button>
      <button class="remove-btn" onclick="removeItem('${name}')">Remove All</button>
    `;
    cartContainer.appendChild(div);
  });

  const totalDiv = document.getElementById('total');
  totalDiv.textContent = `Total: ₹${total}`;
}

function toggleCart() {
  cartSection.classList.toggle('show-cart');
}

// 🔄 Filter Event Listeners
searchInput.addEventListener('input', () => renderProducts(allProducts));
categorySelect.addEventListener('change', () => renderProducts(allProducts));
subFilter.addEventListener('change', () => renderProducts(allProducts));

// 🔃 Load Data on First Load
loadAllCategories();
// new update for login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (data.success) {
      alert(`Welcome, ${data.user.name}!`);
      document.getElementById('loginPage').style.display = 'none';
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Server error. Please try again.");
    console.error(err);
  }
});
