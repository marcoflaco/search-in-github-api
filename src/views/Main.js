import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import useRepositories from '../hooks/useRepositories';
import { LanguageFilter } from '../components/LanguageFilter';
import RepositoryList from '../components/RepositoryList';
import { updateHistory } from '../utils/localStorageHistory';

export default function MainView() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { repositories, isLoading, error, fetchRepositories } =
    useRepositories();
  const [sortBy, setSortBy] = useState();
  const [items, setItems] = useState(repositories);
  const [languageFilter, setLanguageFilter] = useState();
  const [firstVisit, setFirstVisit] = useState(true);

  // trigger search if the url or sortby values change
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      fetchRepositories(urlQuery, sortBy);
    }
  }, [searchParams, sortBy, fetchRepositories]);

  // display the results based on the language filter
  useEffect(() => {
    const filteredItems = languageFilter
      ? repositories.filter((repo) => repo.language === languageFilter)
      : repositories;
    setItems(filteredItems);
  }, [repositories, languageFilter]);

  const triggerSearch = (e) => {
    e.preventDefault();
    updateHistory(query);
    setSearchParams({ q: query });
    setFirstVisit(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-brand btn btn-link icon-header"
            onClick={handleLogoClick}
          >
            <i className="bi-github"></i> Github Search
          </button>
          <form className="d-flex mb-2 mb-md-0" role="search">
            <input
              className="form-control me-2"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <button className="btn btn-outline-success" onClick={triggerSearch}>
              Search
            </button>
          </form>
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mt-2 mt-md-0">
            <div className="form-group mb-2 mb-md-0 mr-2">
              <button
                className="btn btn-primary mr-2"
                onClick={() => navigate('/search-history')}
              >
                View Search History
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isLoading && <div className="alert alert-info">Loading...</div>}
      {!isLoading && error && <div className="alert alert-danger">Error</div>}
      {!isLoading && !error && repositories.length === 0 && (
        <div className="alert alert-info">
          {firstVisit ? 'Welcome to the Github Search!' : 'No results'}
        </div>
      )}
      {!isLoading && !!repositories.length && (
        <>
          <div className="row">
            <div className="col-md-3 mt-3">
              <LanguageFilter
                repositories={repositories}
                selectedLanguage={languageFilter}
                languageChange={(lang) => setLanguageFilter(lang)}
              />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-2">
                  <div className="my-3">
                    <select
                      className="form-control sort-drop"
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="">Sort By</option>
                      <option value="stars">Stars</option>
                      <option value="forks">Forks</option>
                    </select>
                  </div>
                </div>
              </div>
              <RepositoryList items={items} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
