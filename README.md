# Kadha — Every perfume has a story to tell

A multipage website for **Kadha**, a perfume brand. It's built with plain HTML, CSS and JavaScript, so there's no build step and nothing to install.

## Pages

| Page | File | What's on it |
| --- | --- | --- |
| Home | `index.html` | Hero, brand promises, featured stories, shop by mood, bestsellers, fragrance-finder quiz, reviews, newsletter |
| Shop | `shop.html` | All perfumes with filters (fragrance family, for her/him/unisex, mood) and sorting |
| Product | `product.html?id=…` | Story, notes pyramid, longevity/projection, size picker, add to cart, related perfumes |
| Our Story | `about.html` | Brand story and photo gallery |
| Contact | `contact.html` | Contact form, details and FAQ |

The slide-out cart is on every page and is saved in the browser (`localStorage`).

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Editing

- **Products, prices, stories and notes:** `js/data.js`
- **Colours and fonts:** the variables at the top of `css/style.css`
- **Images:** `images/`

Prices, reviews and contact details are placeholder content. Checkout is a demo until a payment provider such as Razorpay or Stripe is connected.
