import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import renderAndResolveData from './utils/renderAndResolveData';
import getHTML from './utils/getHTML';

const router = Router();

// const routes = [];

// fs.readdirSync('src/pages')
// .forEach(fileName => {
//   const file = require('../pages/' + fileName);
//   routes.push({
//     component: file.Component,
//     data: file.data,
//     config: file.config,
//     fileName,
//   });
// })

const routes = [];

function importAll (context) {
  context.keys().forEach(key => {
    const routeName = key.substr(2, key.length - 5); // ./lalala.js -> lalala
    routes.push(routeName);
  });
}

importAll(require.context('../pages', false, /\.js$/));

router.get('*', async (req, res) => {
  const fs = require('fs');
  
  // El servidor no hace lazy loading, los "stats" son para el navegador...
  // https://github.com/juandc/BancoBebe/blob/master/srcold/server/front.js#L12
  const browserStatsFile = path.resolve('./build/public/loadable-stats.json');
  const browserExtractor = new ChunkExtractor({
    statsFile: browserStatsFile,
    publicPath: '/public/',
  });
  
  // ROUTER + DATA
  const location = req.url;
  const context = {};

  const serverResolvers = dataType => {
    const resolvers = {
      [dataType]: () => new Promise(resolve => {
        setTimeout(() => {
          resolve('home data from server' + dataType);
        }, 300);
      }),
    };
    return resolvers[dataType];
  };

  const { jsx, serverData } = await renderAndResolveData({
    serverResolvers,
    location,
    context,
    routes,
  });

  // Redirects
  if (context.url) {
    res.writeHead(301, { Location: context.url });
    res.end();
  }

  // Loadable Components
  const jsxWithCollectedChunks = browserExtractor.collectChunks(jsx);
  const scriptTags = browserExtractor.getScriptTags();
  const content = renderToString(jsxWithCollectedChunks);

  const html = getHTML({
    content,
    scriptTags,
    serverData,
    routes,
  });

  res.set('content-type', 'text/html');
  res.end(html);
})

export default router;
