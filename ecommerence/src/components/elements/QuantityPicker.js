import React from 'react';

const QuantityPicker = ({
  increment,
  decrement,
  numberOfitems,
  hideQuantityLabel,
  name,
  ...props
}) => {
  return (
    <div className={`item-center`}>
      {!hideQuantityLabel && <div className='title-quantity'>{name}</div>}
      <button className='btn-add' onClick={increment}>
        +
      </button>
      <p className='quantity-number'>{numberOfitems}</p>
      <button
        className='
        w-10 h-10 text-2xl
        md:w-8 md:h-8 md:text-sm
        cursor-pointer text-center border pb-.5
        hover:bg-gray-900 hover:text-white
        focus:outline-none btn-minus
        '
        onClick={decrement}
      >
        -
      </button>
    </div>
  );
};
export default QuantityPicker;
