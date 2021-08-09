import React, { useContext, useEffect, useRef, useState } from 'react';
import { faCaretDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropdownItem = ({ item }) => (
  <button className='text-gray-700 flex items-center' onClick={item.onClick}>
    <FontAwesomeIcon icon={item.icon} />
    <p className='ml-2'>{item.title}</p>
  </button>
);

const DropdownContent = ({ dropdownItems }) => {
  return (
    <div className='bg-white w-full absolute p-4 shadow-lg rounded-lg mt-2'>
      {dropdownItems.map((item, i) => {
        return (
          <div className='mt-1' key={i}>
            <DropdownItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

const AvatarDropdown = () => {
  const node = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownItems = [
    {
      title: 'Log Out',
      icon: faSignOutAlt,
      onClick: () => {
        console.log('LogOut');
      }
    }
  ];

  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div ref={node}>
      <button
        ref={node}
        className='flex rounded-full items-center py-2 px-3 bg-gradient focus:outline-none shadow-lg'
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={
            'data:image/jpeg;base64,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'
          }
          className='rounded-full w-6 border-2 border-white'
          alt='Avatar'
        />
        <div className='px-3'>
          <p className='text-white'>Test</p>
        </div>
        <div className='mr-1 text-white'>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </button>

      {dropdownOpen && (
        <div className='relative'>
          <DropdownContent dropdownItems={dropdownItems} />
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
