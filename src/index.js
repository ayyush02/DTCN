import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('Compiled successfully!');
console.log('You can now view your app in the browser.');
console.log('  Local:            http://localhost:3000');
console.log('  On Your Network:  http://192.168.1.100:3000');
console.log('Note that the development build is not optimized.');
console.log('To create a production build, use npm run build.');