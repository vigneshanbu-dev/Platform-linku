# Creator Product Hub

This project is a lightweight Linktree-style storefront for a YouTube creator who wants:

- A homepage with multiple featured products.
- A dedicated product page for each item.
- Multiple affiliate links on every product page.
- A YouTube review button so visitors can watch the related video before buying.
- A `+` button to add more products directly from the UI.

## What is built

- Homepage hero section tailored for a creator storefront.
- Product cards for items like an iron box, kitchen products, or fashion products.
- Product detail view powered by URL hash routes such as `#/product/iron-box-pro`.
- Shopping link buttons for stores like Amazon, Flipkart, Myntra, Ajio, and Croma.
- Add-product side panel that stores new products in local browser storage.

## Notes before using it

- Replace the placeholder YouTube links with your real channel or review URLs.
- Replace the placeholder store URLs with your actual affiliate links.
- Added products are stored in the browser through `localStorage`, so they stay available on the same browser.

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```
# Platform-linku
