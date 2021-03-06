const {loadNuxt, build} = require('nuxt');

const {app, server} = require('./app');
const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

async function start () {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start');

  // Render every route with Nuxt.js
  app.use(nuxt.render);

  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt);
  }

  // Listen the server
  server.listen(port, '0.0.0.0', () => {
    console.log(`Запущен: http://localhost:${port}`);
  });
}

start();
