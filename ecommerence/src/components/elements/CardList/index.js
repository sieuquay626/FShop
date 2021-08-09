import React, { useState, useEffect } from 'react';
import { ViewType } from '../../../utils/constant';
import { map, size, get } from 'lodash';
import { RiMenu2Line, RiFunctionLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Icon from 'react-feather';
import {
  handlePopularProduct,
  handleArrivalProduct,
  handleToprateProduct,
  handleGenderProduct
} from '../../../redux/actions/product';
import { gender_category } from '../../../api/product';
import { resetFilter } from '../../../redux/actions/filter';
const CardList = () => {
  const [viewType, setViewType] = useState(ViewType.GRID);
  const filter = useSelector(state => state.filter);
  const category = useSelector(state => state.category.listCategory);
  const dispatch = useDispatch();
  const [activeState, setActiveStae] = useState('popular');
  const [categories, setCategories] = useState([
    { name: 'Popular', value: 'popular' },
    { name: 'Arrival', value: 'arrival' },
    { name: 'Top Rated', value: 'toprate' },
    {
      name: `Men's wear`,
      value: 'Men',
      photo:
        'https://res.cloudinary.com/dbdb4punq/image/upload/v1621208916/test/43cfb32c-f5b7-af00-9b4a-0017f24cd900-removebg-preview_i7ixee.png'
    },
    {
      name: `Women's wear`,
      value: 'Women',
      photo:
        'https://res.cloudinary.com/dbdb4punq/image/upload/v1621213402/test/top1-removebg-preview_dhvszj.png'
    },
    {
      name: `Kid's wear`,
      value: 'Kid',
      photo:
        'https://res.cloudinary.com/dbdb4punq/image/upload/v1621213571/test/UjCdRVx-2-e1591941423572-removebg-preview_mnlfet.png'
    }
  ]);

  const onChooseCategory = type => {
    dispatch(resetFilter());
    switch (type) {
      case 'popular':
        dispatch(handlePopularProduct(filter));

        break;
      case 'arrival':
        dispatch(handleArrivalProduct(filter));

        break;
      case 'toprate':
        dispatch(handleToprateProduct(filter));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    gender_category().then(res => {
      let temp = JSON.parse(JSON.stringify(categories));
      temp[3].sublist = res.data.men;
      temp[4].sublist = res.data.women;
      temp[5].sublist = res.data.kid;
      setCategories(temp);
    });
  }, []);
  const _onClickNav = (type, data) => {
    setActiveStae(type);
    onChooseCategory(type);
  };

  const _onSetView = value => {
    setViewType(value);
  };
  const getNameCategory = id => {
    for (let value of category) {
      if (value._id === id) {
        return value.name;
      }
    }
  };
  const onTypeGender = (id, gender) => {
    console.log(id, gender);
    let data = {
      gender: gender,
      type: id
    };
    dispatch(handleGenderProduct(data, filter));
  };

  return (
    <div className={`card-list ${viewType}`}>
      <div className='navigation-box'>
        <div className='navigation-menu'>
          {map(categories, (item, key) => {
            const hasSubList = size(get(item, 'sublist', [])) > 0;
            return (
              <div
                className={`nav-item ${hasSubList ? 'dropdown' : ''} ${
                  get(item, 'value') === activeState ? 'active' : ''
                }`}
                onClick={() => _onClickNav(get(item, 'value'))}
                key={key}
              >
                <p>{get(item, 'name', '')}</p>
                {hasSubList && (
                  <>
                    <Icon.ChevronDown />
                    <div className={'nav-item-dropdown'}>
                      <div className='agile_inner_drop_nav_info'>
                        <Link to='#'>
                          <img src={get(item, 'photo')} alt='' srecset='' />
                        </Link>

                        <div className='dropdown-test'>
                          {map(get(item, 'sublist', []), (typeCatgory, _ki) => (
                            <div
                              className={'list-dropdown'}
                              key={_ki}
                              onClick={() =>
                                onTypeGender(typeCatgory, item.value)
                              }
                            >
                              {getNameCategory(typeCatgory)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className={'navigation-view'}>
          <RiFunctionLine
            id={'grid'}
            className={` text-${viewType === ViewType.GRID ? 'amber' : 'gray'}`}
            size={23}
            onClick={() => _onSetView('grid')}
          />
          <RiMenu2Line
            id={'list'}
            className={`  text-${
              viewType === ViewType.LIST ? 'amber' : 'gray'
            }`}
            size={23}
            onClick={() => _onSetView('list')}
          />
        </div>
      </div>
    </div>
  );
};

export default CardList;
