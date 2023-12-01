import 'react-app-polyfill/ie11';
import * as React from 'react';

import * as ReactDOM from 'react-dom';
import { usePaywall } from 'react-nami';
import { PaywallProvider } from 'react-native-web-nami-sdk';

import { Component } from './src/component';

const App = () => {
  const { state, actions } = usePaywall('4a2f6dbf-e684-4d65-a4df-0488771c577d');
  console.log(state, 'usePaywall');

  return (
    <PaywallProvider state={state} actions={actions}>
      <div>
        <Component />
      </div>
    </PaywallProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
