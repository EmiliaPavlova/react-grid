import React, { useState, useEffect, useRef } from 'react';
import spinner from '../../assets/loading.gif';
import Header from '../../components/Header/header';
import Grid from '../../components/Grid/grid';
import CompanyDetails from '../CompanyDetails/companyDetails';
import './homePage.css';

const url = 'https://restcountries.com/v3.1/all';
const urlSearch = 'https://restcountries.com/v3.1/name/';

export const mapCountryData = (country) => {
  return ([
    { label: 'Flag', source: country.flag },
    { label: 'Name', source: country.name.common},
    { label: 'Capital', source: country.capital && country.capital.join(', ')},
    { label: 'Continents', source: country.continents.join(', ')},
    { label: 'Currencies', source: country.currencies && Object.keys(country.currencies).join(', ')},
    { label: 'cca3', source: country.cca3},
    { label: 'Population', source: country.population, style: 'right_aligned'},
  ])
}

export default function HomePage() {
  const [data, setData] = useState();
  const [searchData, setSearchData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [showCounter, setShowCounter] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    stopCounter();

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
  }, []);

  const startCounter = () => {
    let count = 5;
    intervalRef.current = setInterval(() => {
      setShowCounter(count);
      if (count === 0) {
        stopCounter();
        setOpenPopup(true);
      } else {
        count--; 
      }
    }, 500);
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setShowCounter(0);
    }
  };

  const closePopup = () => setOpenPopup(false);

  const sourceData = data && data.map(country => mapCountryData(country));

  const onMouseDown = (data) => {
    setSelectedCountry(data);
    setOpenPopup(false);
    startCounter();
  }

  const onMouseUp = () => stopCounter();

  const renderCounterPopup = () => {
    return <div className='popup_counter'>{showCounter}</div>
  }

  const onSearch = (string) => {
    fetch(urlSearch + string)
      .then(response => response.json())
      .then(data => {
        const size = Math.min(data.length, 10);
        data.length = size;
        setSearchData(data);
      })
      .catch(error => console.log(error))
    }

  return (
    <div className='wrapper'>
      {!!showCounter && renderCounterPopup()}
      {openPopup && <CompanyDetails
        closePopup={closePopup}
        selectedCountry={selectedCountry}
      />}
      <Header title='Countries' onSearch={onSearch} searchData={searchData} />
      <div className=''>
        {loading
          ? <div className=''><img src={spinner} alt='loading' /></div>
          : data
            ? <Grid
              data={sourceData}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            />
            : error
              ? <div>An error occured</div>
              : <div>No countries found</div>
        }
      </div>
    </div>
  );
}
