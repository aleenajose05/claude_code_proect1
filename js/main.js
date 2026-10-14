// Shared header, footer, cart drawer and per-page rendering for Kadha.

const CART_KEY = "kadha-cart";

const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");
const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
const fromPrice = (p) => Math.min(...p.sizes.map((s) => s.price));
const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

/* ---------- Cart (stored in localStorage, falls back to memory) ---------- */

let memoryCart = [];

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return memoryCart;
  }
}

function saveCart(cart) {
  memoryCart = cart;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    /* storage unavailable — keep in memory */
  }
  renderCart();
}

function addToCart(id, ml, qty = 1) {
  const cart = loadCart();
  const line = cart.find((l) => l.id === id && l.ml === ml);
  if (line) line.qty += qty;
  else cart.push({ id, ml, qty });
  saveCart(cart);
  openCart();
}

function changeQty(index, delta) {
  const cart = loadCart();
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart(cart);
}

function cartLines() {
  return loadCart()
    .map((l) => {
      const p = findProduct(l.id);
      const size = p && p.sizes.find((s) => s.ml === l.ml);
      return p && size ? { ...l, product: p, price: size.price } : null;
    })
    .filter(Boolean);
}

function renderCart() {
  const lines = cartLines();
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.price, 0);

  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
    el.hidden = count === 0;
  });

  const body = document.querySelector("#cart-items");
  if (!body) return;

  if (!lines.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty — every story starts somewhere.</p>
        <a class="btn btn-outline" href="shop.html">Browse perfumes</a>
      </div>`;
  } else {
    body.innerHTML = lines
      .map(
        (l, i) => `
      <div class="cart-line">
        <img src="${l.product.image}" alt="${l.product.name}">
        <div>
          <a href="product.html?id=${l.product.id}" class="cart-line-name">${l.product.name}</a>
          <p class="muted">${l.ml} ml · ${formatPrice(l.price)}</p>
          <div class="qty">
            <button type="button" aria-label="Decrease quantity" onclick="changeQty(${i}, -1)">−</button>
            <span>${l.qty}</span>
            <button type="button" aria-label="Increase quantity" onclick="changeQty(${i}, 1)">+</button>
          </div>
        </div>
        <strong>${formatPrice(l.qty * l.price)}</strong>
      </div>`
      )
      .join("");
  }

  document.querySelector("#cart-total").textContent = formatPrice(total);
  const shipNote = document.querySelector("#cart-ship");
  const remaining = 1999 - total;
  shipNote.textContent =
    total === 0 ? "" : remaining > 0 ? `Add ${formatPrice(remaining)} more for free shipping` : "You've unlocked free shipping ✦";
  document.querySelector("#checkout-btn").disabled = !lines.length;
}

function openCart() {
  document.body.classList.add("cart-open");
}
function closeCart() {
  document.body.classList.remove("cart-open");
}

/* ---------- Shared layout ---------- */

function renderLayout() {
  const page = document.body.dataset.page;
  const link = (href, label, key) =>
    `<a href="${href}" class="${page === key ? "active" : ""}">${label}</a>`;

  document.querySelector("#site-header").innerHTML = `
    <div class="announce">Free shipping on orders above ₹1,999 · Complimentary sample with every order</div>
    <nav class="nav container">
      <button class="menu-btn" type="button" aria-label="Open menu" onclick="document.body.classList.toggle('menu-open')">
        <span></span><span></span><span></span>
      </button>
      <a href="index.html" class="logo">Kadha<small>Every perfume has a story to tell</small></a>
      <div class="nav-links">
        ${link("index.html", "Home", "home")}
        ${link("shop.html", "Shop", "shop")}
        ${link("index.html#finder", "Find Your Scent", "")}
        ${link("about.html", "Our Story", "about")}
        ${link("contact.html", "Contact", "contact")}
      </div>
      <button class="cart-btn" type="button" onclick="openCart()" aria-label="Open cart">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
        <span class="cart-count" data-cart-count hidden>0</span>
      </button>
    </nav>`;

  document.querySelector("#site-footer").innerHTML = `
    <div class="container footer-grid">
      <div>
        <a href="index.html" class="logo logo-light">Kadha<small>Every perfume has a story to tell</small></a>
        <p class="footer-about">Handcrafted perfumes inspired by memories, places and the quiet moments in between.</p>
      </div>
      <div>
        <h4>Shop</h4>
        <a href="shop.html">All perfumes</a>
        <a href="shop.html?gender=Women">For her</a>
        <a href="shop.html?gender=Men">For him</a>
        <a href="shop.html?gender=Unisex">Unisex</a>
      </div>
      <div>
        <h4>Kadha</h4>
        <a href="about.html">Our story</a>
        <a href="index.html#finder">Fragrance finder</a>
        <a href="contact.html">Contact</a>
        <a href="contact.html#faq">FAQ</a>
      </div>
      <div>
        <h4>Help</h4>
        <a href="contact.html#faq">Shipping &amp; returns</a>
        <a href="contact.html#faq">Privacy policy</a>
        <a href="contact.html#faq">Terms of service</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© ${new Date().getFullYear()} Kadha Perfumes. All rights reserved.</span>
      <span>Instagram · Facebook · Pinterest</span>
    </div>`;

  const drawer = document.createElement("div");
  drawer.innerHTML = `
    <div class="cart-overlay" onclick="closeCart()"></div>
    <aside class="cart-drawer" aria-label="Shopping cart">
      <div class="cart-head">
        <h3>Your Cart</h3>
        <button type="button" class="icon-btn" onclick="closeCart()" aria-label="Close cart">✕</button>
      </div>
      <div id="cart-items" class="cart-items"></div>
      <div class="cart-foot">
        <p id="cart-ship" class="muted"></p>
        <div class="cart-total"><span>Subtotal</span><strong id="cart-total">₹0</strong></div>
        <button id="checkout-btn" class="btn btn-full" type="button" onclick="checkout()">Checkout</button>
      </div>
    </aside>`;
  document.body.append(...drawer.children);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });
  document.querySelectorAll(".nav-links a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("menu-open"))
  );

  renderCart();
}

function checkout() {
  // Placeholder until a payment provider (e.g. Razorpay or Stripe) is connected.
  saveCart([]);
  document.querySelector("#cart-items").innerHTML = `
    <div class="cart-empty">
      <p class="serif big">Thank you.</p>
      <p>Your order has been placed — a new chapter is on its way.</p>
    </div>`;
}

/* ---------- Product card ---------- */

function productCard(p) {
  return `
    <article class="card">
      <a href="product.html?id=${p.id}" class="card-img">
        <img src="${p.image}" alt="${p.name} perfume bottle" loading="lazy">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      </a>
      <div class="card-body">
        <p class="eyebrow">${p.family} · ${p.gender}</p>
        <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <p class="card-hook">${p.hook}</p>
        <div class="card-foot">
          <span>From <strong>${formatPrice(fromPrice(p))}</strong></span>
          <span class="rating" title="${p.rating} out of 5">${stars(p.rating)} <small>(${p.reviews})</small></span>
        </div>
        <button type="button" class="btn btn-outline btn-full" onclick="addToCart('${p.id}', ${p.sizes[1].ml})">
          Add ${p.sizes[1].ml} ml to cart
        </button>
      </div>
    </article>`;
}

/* ---------- Home ---------- */

function initHome() {
  const featured = ["velvet-haze", "monsoon-canopy", "autumn-letters"].map(findProduct);
  document.querySelector("#featured-stories").innerHTML = featured
    .map(
      (p, i) => `
      <article class="story ${i % 2 ? "story-reverse" : ""} reveal">
        <div class="story-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
        <div class="story-text">
          <p class="eyebrow">Chapter ${["I", "II", "III"][i]} · ${p.family}</p>
          <h3>${p.name}</h3>
          <p class="story-hook">“${p.hook}”</p>
          <p>${p.story[1]}</p>
          <a href="product.html?id=${p.id}" class="btn">Read the full story</a>
        </div>
      </article>`
    )
    .join("");

  document.querySelector("#mood-list").innerHTML = Object.entries(MOODS)
    .map(([key, label]) => `<a class="mood" href="shop.html?mood=${key}">${label}</a>`)
    .join("");

  document.querySelector("#bestsellers").innerHTML = PRODUCTS.map(productCard).join("");

  initQuiz();

  document.querySelector("#newsletter").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.innerHTML = `<p class="serif big">Welcome to the story. Your first chapter arrives soon.</p>`;
  });
}

function initQuiz() {
  const box = document.querySelector("#quiz");
  const scores = {};
  let step = 0;

  function show() {
    if (step >= QUIZ.length) return result();
    const item = QUIZ[step];
    box.innerHTML = `
      <p class="eyebrow">Question ${step + 1} of ${QUIZ.length}</p>
      <h3>${item.q}</h3>
      <div class="quiz-options">
        ${item.a.map((a, i) => `<button type="button" class="quiz-opt" data-i="${i}">${a.label}</button>`).join("")}
      </div>`;
    box.querySelectorAll(".quiz-opt").forEach((btn) =>
      btn.addEventListener("click", () => {
        item.a[btn.dataset.i].score.forEach((id) => (scores[id] = (scores[id] || 0) + 1));
        step++;
        show();
      })
    );
  }

  function result() {
    const bestId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const p = findProduct(bestId);
    box.innerHTML = `
      <div class="quiz-result">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <p class="eyebrow">Your story is</p>
          <h3>${p.name}</h3>
          <p class="story-hook">“${p.hook}”</p>
          <div class="btn-row">
            <a href="product.html?id=${p.id}" class="btn">Discover ${p.name}</a>
            <button type="button" class="btn btn-outline" id="quiz-restart">Take it again</button>
          </div>
        </div>
      </div>`;
    box.querySelector("#quiz-restart").addEventListener("click", () => {
      step = 0;
      Object.keys(scores).forEach((k) => delete scores[k]);
      show();
    });
  }

  show();
}

/* ---------- Shop ---------- */

function initShop() {
  const params = new URLSearchParams(location.search);
  const state = {
    family: params.get("family") || "",
    gender: params.get("gender") || "",
    mood: params.get("mood") || "",
    sort: "featured"
  };

  const chips = (name, values, labels = {}) =>
    [["", "All"], ...values.map((v) => [v, labels[v] || v])]
      .map(
        ([v, l]) =>
          `<button type="button" class="chip ${state[name] === v ? "on" : ""}" data-filter="${name}" data-value="${v}">${l}</button>`
      )
      .join("");

  function render() {
    document.querySelector("#filter-family").innerHTML = chips("family", FAMILIES);
    document.querySelector("#filter-gender").innerHTML = chips("gender", GENDERS);
    document.querySelector("#filter-mood").innerHTML = chips("mood", Object.keys(MOODS), MOODS);

    let list = PRODUCTS.filter(
      (p) =>
        (!state.family || p.family === state.family) &&
        (!state.gender || p.gender === state.gender) &&
        (!state.mood || p.moods.includes(state.mood))
    );
    if (state.sort === "price-asc") list = [...list].sort((a, b) => fromPrice(a) - fromPrice(b));
    if (state.sort === "price-desc") list = [...list].sort((a, b) => fromPrice(b) - fromPrice(a));
    if (state.sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    document.querySelector("#result-count").textContent =
      `${list.length} ${list.length === 1 ? "perfume" : "perfumes"}`;
    document.querySelector("#shop-grid").innerHTML = list.length
      ? list.map(productCard).join("")
      : `<p class="empty">No perfumes match these filters yet. <button type="button" class="link-btn" id="clear-filters">Clear filters</button></p>`;

    document.querySelectorAll("[data-filter]").forEach((b) =>
      b.addEventListener("click", () => {
        state[b.dataset.filter] = b.dataset.value;
        render();
      })
    );
    const clear = document.querySelector("#clear-filters");
    if (clear)
      clear.addEventListener("click", () => {
        state.family = state.gender = state.mood = "";
        render();
      });
  }

  document.querySelector("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  render();
}

/* ---------- Product ---------- */

function initProduct() {
  const id = new URLSearchParams(location.search).get("id");
  const p = findProduct(id) || PRODUCTS[0];
  document.title = `${p.name} — Kadha`;

  const bar = (label, value) => `
    <div class="meter">
      <span>${label}</span>
      <div class="meter-track"><div class="meter-fill" style="width:${value * 20}%"></div></div>
    </div>`;

  document.querySelector("#product").innerHTML = `
    <nav class="crumbs"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <span>${p.name}</span></nav>
    <div class="product-grid">
      <div class="product-img">
        <img src="${p.image}" alt="${p.name} perfume bottle">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-info">
        <p class="eyebrow">${p.type} · ${p.family} · ${p.gender}</p>
        <h1>${p.name}</h1>
        <p class="rating">${stars(p.rating)} <small>${p.rating} · ${p.reviews} reviews</small></p>
        <p class="story-hook">“${p.hook}”</p>
        <p class="price" id="price">${formatPrice(p.sizes[1].price)}</p>

        <p class="label">Size</p>
        <div class="sizes">
          ${p.sizes
            .map(
              (s, i) =>
                `<button type="button" class="size ${i === 1 ? "on" : ""}" data-ml="${s.ml}" data-price="${s.price}">${s.ml} ml</button>`
            )
            .join("")}
        </div>

        <div class="buy-row">
          <div class="qty qty-lg">
            <button type="button" id="qty-dec" aria-label="Decrease quantity">−</button>
            <span id="qty">1</span>
            <button type="button" id="qty-inc" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="btn" id="add-btn">Add to cart</button>
        </div>

        <ul class="perks">
          <li>Free shipping above ₹1,999</li>
          <li>Complimentary sample with every order</li>
          <li>Easy 7-day returns on unopened bottles</li>
        </ul>

        <div class="profile">
          ${bar("Longevity", p.profile.longevity)}
          ${bar("Projection", p.profile.projection)}
          <div class="profile-tags"><span>Season: ${p.season}</span><span>Best worn: ${p.time}</span></div>
        </div>
      </div>
    </div>

    <section class="product-story">
      <div>
        <p class="eyebrow">The story</p>
        <h2>Every bottle begins with a memory</h2>
        ${p.story.map((para) => `<p>${para}</p>`).join("")}
      </div>
      <div class="pyramid">
        <p class="eyebrow">Fragrance notes</p>
        <div class="tier tier-top"><h4>Top</h4><p>${p.notes.top.join(" · ")}</p></div>
        <div class="tier tier-heart"><h4>Heart</h4><p>${p.notes.heart.join(" · ")}</p></div>
        <div class="tier tier-base"><h4>Base</h4><p>${p.notes.base.join(" · ")}</p></div>
      </div>
    </section>`;

  let ml = p.sizes[1].ml;
  let qty = 1;
  document.querySelectorAll(".size").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".size").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      ml = Number(b.dataset.ml);
      document.querySelector("#price").textContent = formatPrice(Number(b.dataset.price));
    })
  );
  const setQty = (n) => {
    qty = Math.max(1, n);
    document.querySelector("#qty").textContent = qty;
  };
  document.querySelector("#qty-dec").addEventListener("click", () => setQty(qty - 1));
  document.querySelector("#qty-inc").addEventListener("click", () => setQty(qty + 1));
  document.querySelector("#add-btn").addEventListener("click", () => addToCart(p.id, ml, qty));

  document.querySelector("#related").innerHTML = PRODUCTS.filter((x) => x.id !== p.id)
    .slice(0, 4)
    .map(productCard)
    .join("");
}

/* ---------- Contact ---------- */

function initContact() {
  document.querySelector("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.innerHTML = `<p class="serif big">Thank you for writing to us.</p><p>We'll reply within one working day.</p>`;
  });
}

/* ---------- Scroll reveal ---------- */

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("visible"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Boot ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "shop") initShop();
  if (page === "product") initProduct();
  if (page === "contact") initContact();
  initReveal();
});
