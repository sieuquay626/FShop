import PropType from 'prop-types';

const ColorChooser = ({ availableColors, SetColor, color }) => {
  const setColor = color => {
    SetColor(color);
  };
  return (
    <>
      <div className='text-subtle'>Choose Color</div>
      <div className='color-chooser'>
        {availableColors.map(itemcolor => (
          <div
            className={
              color === itemcolor
                ? 'color-item color-item-selected'
                : 'color-item'
            }
            key={itemcolor}
            onClick={() => setColor(itemcolor)}
            style={{ backgroundColor: itemcolor }}
            role='presentation'
          />
        ))}
      </div>
    </>
  );
};

ColorChooser.propTypes = {
  availableColors: PropType.arrayOf(PropType.string).isRequired
};

export default ColorChooser;
