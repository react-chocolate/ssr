const routes = [];

function importAll (context) {
  context.keys().forEach(key => {
    const routeName = key.substr(2, key.length - 5); // ./lalala.js -> lalala
    const routeContent = context(key);
    routes.push({
      Component: routeContent.Component,
      data: routeContent.data,
      config: routeContent.config,
      name: routeName,
    });
  });
}

importAll(require.context('../pages', false, /\.js$/));

console.log(routes)