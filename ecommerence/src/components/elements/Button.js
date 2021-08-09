import React from 'react';

const Button = ({ title, onClick, full = false }) => {
  let classNames = 'btn-addtocart ';

  if (full) {
    classNames = `${classNames} w-full`;
  }
  return (
    <button onClick={onClick} className={classNames}>
      <div>{title}</div>
    </button>
  );
};

export default Button;
