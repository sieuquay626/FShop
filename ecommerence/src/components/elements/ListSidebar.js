import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from '../../redux/actions/filter';
const ListSidebar = ({ list }) => {
  const [showSub, setShowsub] = useState('off');
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.category);
  return (
    <div className='listsidebar'>
      {list.map((value, key) => {
        let sub = value.sub ? value.sub : [];
        return (
          <div
            className='accordion '
            key={key}
            onClick={() => {
              dispatch(applyFilter({ category: value.name, page: 1 }));
            }}
          >
            <div className='accordionHeading '>
              <div
                className={`accordionTitle ${
                  value.name == filter ? 'active-title' : ''
                }`}
              >
                <p>{value.name}</p>
                <span
                  onClick={() => {
                    if (showSub === value.name) {
                      setShowsub('off');
                    } else {
                      setShowsub(value.name);
                    }
                  }}
                >
                  {sub.length ? (
                    showSub === value.name ? (
                      <Minus />
                    ) : (
                      <Plus />
                    )
                  ) : (
                    ''
                  )}
                </span>
              </div>
            </div>
            <div
              className={
                (showSub === value.name ? 'show' : '') + ' accordionContent'
              }
            >
              <div className='cotainerr'>
                <ul>
                  {sub.map((value, key) => {
                    return (
                      <li key={key}>
                        <Link to='#'>{value} </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListSidebar;
