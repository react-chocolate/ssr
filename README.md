# @react-chocolate/ssr
React SSR routing with intelligent data resolvers.

## "MVP"

1. Primer paso: un servidor en express.js que haga render de un array de componentes con react-router y loadable-components para que la ruta inicial cargue desde el servidor y el resto bajo demanda usando lazy loading.
2. Segundo paso: la configuración del array de rutas debe incluir una sección de datos especificando si estos cargan desde el servidor, cliente, ambos, el que primero cargue o ninguno. Para tener consistencia entre el servidor y el navegador los datos del servidor se guardan en window.__INITIAL_DATA__ que se consume desde un componente Provider (`<Store initialData:{ pages:{ [page.name]: pageData} }>`) que, finalmente, se consume en los componentes de cada ruta del array.
3. Tercer paso: definir el siguiente paso.
