import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../utils/localStorageHistory';

export default function HistoryView() {
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    setSearchHistory(getHistory());
  }, []);

  const navigateToResultsView = (query, index) => {
    const newSearchHistory = [...searchHistory];
    newSearchHistory.splice(index, 1);
    setSearchHistory(newSearchHistory);

    navigate({ pathname: '/', search: `?q=${query}` });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="my-4">Search History</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            {searchHistory.map((query, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{query}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => navigateToResultsView(query, index)}
                >
                  View Results
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
