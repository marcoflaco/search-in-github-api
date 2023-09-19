import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './views/Main';
import HistoryView from './views/History';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/search-history" element={<HistoryView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
