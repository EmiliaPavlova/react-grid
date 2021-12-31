import { useState, useEffect } from 'react';
import CompanyDetails from '../../containers/CompanyDetails/companyDetails';
import { mapCountryData } from '../../containers/HomePage/homePage';
import './search.css';

export default function Search({ onSearch, results }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (results) {
      setShowSuggestions(true);
    }
  }, [results])

  const closeSuggestions = () => {
    setShowSuggestions(false);
    setSearchString('');
  }

  const closeDetails = () => setShowDetails(false);

  const openDetails = (index) => {
    setSelectedCountry(mapCountryData(results[index]));
    setShowDetails(true);
  }

  const renderSuggestionsPopup = (results) => {
    if (results && results.status === 404) {
      return (
        <div className='suggestions_wrapper'>No results found</div>
      )
    }
    return (
      <div className='suggestions_wrapper'>
        {results && results.map((country, index) => {
          return <div key={index} onClick={() => openDetails(index)}>{country.name.common}</div>
        })}
      </div>
    )
  }

  return (
    <>
      {showDetails && <CompanyDetails
        closePopup={closeDetails}
        selectedCountry={selectedCountry}
      />}
      <div className='search_wrapper'>
        <input
          placeholder='Search'
          name='search'
          value={searchString}
          autoComplete='off'
          onChange={(e) => setSearchString(e.target.value)}
          onKeyUp={(e) => onSearch(e.target.value)}
        />
        <div className='suggestions_close' onClick={closeSuggestions}>&#10006;</div>
        {showSuggestions && renderSuggestionsPopup(results)}
      </div>
    </>
  )
};
