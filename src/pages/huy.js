import React from 'react';

export const HomePage = props => {
  // <h2>{JSON.stringify(props.data)}</h2>
  return (
    <h3>Hey</h3>
  );
};

export { HomePage as Component };

const data = {
  fromServer: true,
  fromBrowser: 'always',
  resolver: 'HEY_DATA',
};
export { data };

const config = { slug: '/' };
export { config };
