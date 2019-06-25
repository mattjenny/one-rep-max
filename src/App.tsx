import React from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';

import { AppRouter } from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
