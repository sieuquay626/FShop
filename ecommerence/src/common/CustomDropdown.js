import PropType from 'prop-types';
import React, { useRef } from 'react';
import { useFormikContext } from 'formik';

const CustomDropdown = ({
  field,
  form: { touched, errors },
  label,
  inputRef,
  ItemRender,
  ...props
}) => {
  const { values, setValues } = useFormikContext();
  const onItemChange = e => {
    setValues({ ...values, [field.name]: e.target.value });
  };
  return (
    <>
      <div className='input-group'>
        {touched[field.name] && errors[field.name] ? (
          <span className='label-input label-error'>{errors[field.name]}</span>
        ) : (
          <label className='label-input' htmlFor={field.name}>
            {label}
          </label>
        )}
        <select
          className='filters-sort-by d-block'
          style={{ textTransform: 'capitalize' }}
          value={field.value}
          onChange={onItemChange}
        >
          <ItemRender />
        </select>
      </div>
    </>
  );
};

CustomDropdown.defaultProps = {
  inputRef: undefined
};

CustomDropdown.propTypes = {
  label: PropType.string.isRequired,
  field: PropType.object.isRequired,
  form: PropType.object.isRequired,
  inputRef: PropType.oneOfType([
    PropType.func,
    PropType.shape({ current: PropType.instanceOf(Element) })
  ])
};

export default CustomDropdown;
