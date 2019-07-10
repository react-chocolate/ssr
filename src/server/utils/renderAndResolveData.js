import React from 'react';
import { StaticRouter, Route } from 'react-router-dom';
import loadable from '@loadable/component';
// import App from '../../app/App';
// import { DataProvider } from '../../shared/DataContext';

export default async ({ location, context, serverResolvers, routes }) => {
  location = location.substr(1, location.length - 1);

  let serverData = undefined;
  let actualRoute = undefined;

  if (location === '') {
    actualRoute = 'index';
  } else if (routes.find(route => route === location)) {
    actualRoute = routes.find(route => route === location);
  } else if (routes['404']) {
    actualRoute = '404';
  } else {
    console.error('Configura tu página 404 en src/pages/404.js');
    actualRoute = '404';
    routes['404'] = { Component: <p>404</p> };
  }

  const route = require('../../pages/' + actualRoute);
  const RouteComponent = route.Component;
  
  if (
    route
    && route.data !== undefined
    && !!route.data.fromServer
  ) {
    const resolver = serverResolvers(route.data.resolver);
    serverData = await resolver();
  }

  const jsx = (
    <StaticRouter location={location} context={context}>
      {/* <DataProvider initialData={serverData}>
        <App />
      </DataProvider> */}

      <h2>{JSON.stringify(serverData)}</h2>

      {routes.map(route => (
        <Route
          key={route}
          exact={true}
          path={route === 'index' ? '/' : route}
          render={() => {
            if (route === actualRoute) return <RouteComponent />;
            // return <p>{route}</p>;
            return loadable(() => import(`../../pages/${route}`), {
              loading: <p>Loading {route}...</p>,
              ssr: false,
            });
          }}
        />
      ))}
    </StaticRouter>
  );

  return {
    serverData,
    jsx,
  };
};
