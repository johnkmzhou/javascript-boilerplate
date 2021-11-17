# Projects Landing Page

## Getting Started

**Setup:**

1. run `npm install`
2. add `TUTORIAL_URL` in .env file.
3. run `npm start`
4. open a browser and go to `http://localhost:8080`

**Basic configuration:**

1. Eleventy -> `./.eleventy.js`
2. Tailwind -> `./tailwind.config.js`

CSS is built via PostCSS and based on `./src/_includes/css/_page.css`. Building CSS gets triggered by `./src/css/page.11ty.js`. Note that SVGs from FontAwesome are combined into a sprite in `./src/spriter.js` to reduce payload size.

To avoid having to use a JavaScript bundler, all JavaScript code currently reside in `./src/_includes/js.njk`.

**Change static content:**

For development, images are stored in `./src/static/images/`. Request images as they are not commited to the repository.
