import React, { useEffect, useState } from 'react';
import { Plus, Minus } from 'react-feather';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleCategory } from '../../../redux/actions/category';
import { handleBrand } from '../../../redux/actions/brand';
import { applyFilter } from '../../../redux/actions/filter';

const LeftSidebar = () => {
  const category = useSelector(state => state.category.listCategory);
  const filter = useSelector(state => state.filter);
  const [showSub, setShowsub] = useState('off');
  const dispatch = useDispatch();
  console.log('Left Sidebar');
  useEffect(() => {
    dispatch(handleCategory());
    dispatch(handleBrand());
  }, []);

  return (
    <div className='left-sidebar'>
      <h2>Category</h2>
      <div className='listsidebar'>
        {category.map((value, key) => {
          let sub = value.sub ? value.sub : [];
          return (
            <div
              className='accordion '
              key={key}
              onClick={() => {
                dispatch(applyFilter({ category: value._id }));
              }}
            >
              <div className='accordionHeading '>
                <div
                  className={`accordionTitle ${
                    value._id == filter.category ? 'active-title' : ''
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
    </div>
  );
};

export default LeftSidebar;
