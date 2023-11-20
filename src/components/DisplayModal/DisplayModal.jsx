import { useState } from 'react';
import styles from './DisplayModal.module.css';
import { sliderIcon, dropdownArrowIcon } from '../../assets/index';
import capitalCase from '../../utils/util';

const DisplayModal = ({ initialGrouping, initialOrdering, onGroupingChange, onOrderingChange }) => {
  const { container, button, text, dropdown, section, options, label, select } = styles;

  const [showOptions, setShowOptions] = useState(false);
  const [grouping, setGrouping] = useState(initialGrouping);
  const [ordering, setOrdering] = useState(initialOrdering);

  const toggleDisplay = () => {
    setShowOptions((prev) => !prev);
  };

  const handleGroupingChange = (event) => {
    const { value } = event.target;

    setGrouping(value);
    onGroupingChange(value);
  };

  const handleOrderingChange = (event) => {
    const { value } = event.target;

    setOrdering(value);
    onOrderingChange(value);
  };

  const groupingOptions = ['status', 'user', 'priority'];
  const orderingOptions = ['priority', 'title'];

  return (
    <main className={container}>
      <button className={button} type='button' onClick={toggleDisplay}>
        <img src={sliderIcon} alt='sliderIcon' />
        <h1 className={text}>Display</h1>
        <img className={dropdown} src={dropdownArrowIcon} alt='dropdown arrow' />
      </button>

      {showOptions && (
        <section className={section}>
          <div className={options}>
            <h2 className={label}>Grouping</h2>
            <select className={select} onChange={handleGroupingChange} value={grouping}>
              {groupingOptions.map((id) => (
                <option key={id} value={id}>
                  {capitalCase(id)}
                </option>
              ))}
            </select>
          </div>

          <div className={options}>
            <h2 className={label}>Ordering</h2>
            <select className={select} onChange={handleOrderingChange} value={ordering}>
              {orderingOptions.map((id) => (
                <option key={id} value={id}>
                  {capitalCase(id)}
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
