import React from 'react';
import Search from '../Search/search';
import './header.css';

export default function Header({ title, onSearch, searchData }) {
  return (
    <div className='header'>
      <div className='header_title'>{title}</div>
      <div>
        <Search onSearch={onSearch} results={searchData} />
      </div>
    </div>
  )
};