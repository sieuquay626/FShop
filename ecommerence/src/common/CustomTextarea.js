/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';

const CustomTextarea = ({
  field,
  form: { touched, errors },
  label,
  ...props
}) => (
  <div className='input-group'>
    {touched[field.name] && errors[field.name] ? (
      <span className='label-input label-error'>{errors[field.name]}</span>
    ) : (
      <label className='label-input' htmlFor={field.name}>
        {label}
      </label>
    )}
    <textarea
      name={'test'}
      cols={30}
      rows={8}
      id={'test'}
      className={`input-form`}
      {...field}
      {...props}
    />
  </div>
);

export default CustomTextarea;
