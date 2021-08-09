import { useState } from 'react';
import * as Icon from 'react-feather';
import { useDispatch } from 'react-redux';
import { applyFilter } from '../../redux/actions/filter';
import './style.scss';
const SearchBox = () => {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const onKeyUp = e => {
    if (e.keyCode === 13) {
      e.target.blur();
      dispatch(applyFilter({ keyword: searchInput.toLowerCase(), page: 1 }));
      setSearchInput('');
    }
  };
  const onSearchChange = e => {
    const val = e.target.value.trimStart();
    setSearchInput(val);
  };

  return (
    <div className='search-box'>
      <input
        className='input-box'
        placeholder='Search product...'
        name='searchB'
        onKeyUp={onKeyUp}
        value={searchInput}
        onChange={onSearchChange}
      />
      <Icon.Search />
    </div>
  );
};

export default SearchBox;
