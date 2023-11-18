import { useState } from 'react';
import styles from './DisplayModal.module.css';
import slider from '../../assets/slider.svg';
import dropdownArrow from '../../assets/dropdownArrow.png';
import { getData, localStorageKey, setData } from '../../utils/localStorageAPI';

const DisplayModal = () => {
  const { container, button, image, text, dropdown, section, options, label, select, option } =
    styles;

  const intialGrouping = getData(localStorageKey.grouping) ?? 'Status';
  const intialOrdering = getData(localStorageKey.ordering) ?? 'Priority';

  const [showOptions, setShowOptions] = useState(false);
  const [grouping, setGrouping] = useState(intialGrouping);
  const [ordering, setOrdering] = useState(intialOrdering);

  const toggleDisplay = () => {
    setShowOptions((prev) => !prev);
  };

  const handleGroupingChange = (event) => {
    const { value } = event.target;

    setGrouping(value);
    setData(localStorageKey.grouping, value);
  };

  const handleOrderingChange = (event) => {
    const { value } = event.target;

    setOrdering(value);
    setData(localStorageKey.ordering, value);
  };

  const groupingOptions = ['Status', 'User', 'Priority'];
  const orderingOptions = ['Priority', 'Title'];

  return (
    <main className={container}>
      <button className={button} type='button' onClick={toggleDisplay}>
        <img className={image} src={slider} alt='slider' />
        <p className={text}>Display</p>
        <img className={dropdown} src={dropdownArrow} alt='dropdown arrow' />
      </button>

      {showOptions && (
        <section className={section}>
          <div className={options}>
            <p className={label}>Grouping</p>
            <select className={select} onChange={handleGroupingChange} value={grouping}>
              {groupingOptions.map((id) => (
                <option className={option} key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div className={options}>
            <p className={label}>Ordering</p>
            <select className={select} onChange={handleOrderingChange} value={ordering}>
              {orderingOptions.map((id) => (
                <option className={option} key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>
        </section>
      )}
    </main>
  );
};

export default DisplayModal;
