import styles from './Card.module.css';
import { userIcon, circleIcon } from '../../assets/index';
import { getData, localStorageKey } from '../../utils/localStorageAPI';

const Card = ({ item }) => {
  const {
    container,
    titleWrap,
    titleId,
    userImage,
    descriptionWrap,
    circleImage,
    description,
    detailsWrap,
    details,
    exclamationMark,
    tagWrap,
    circleShape,
    detail
  } = styles;

  const { id, title, tag } = item;
  const grouping = getData(localStorageKey.grouping) ?? 'status';

  const getFormattedString = (inputString) => {
    const maxStringSize = 70;

    if (inputString.length <= maxStringSize) {
      return inputString;
    }

    return `${inputString.substring(0, maxStringSize)}...`;
  };

  return (
    <main className={container}>
      <section className={titleWrap}>
        <h2 className={titleId}>{id}</h2>
        {grouping !== 'user' && <img className={userImage} src={userIcon} alt='user icon' />}
      </section>

      <section className={descriptionWrap}>
        {grouping !== 'status' && <img className={circleImage} src={circleIcon} alt='circleIcon' />}
        <h1 className={description}>{getFormattedString(title)}</h1>
      </section>

      <section className={detailsWrap}>
        {grouping !== 'priority' && (
          <div className={details}>
            <p className={exclamationMark}>!</p>
          </div>
        )}
        <div className={details}>
          <div className={tagWrap}>
            <div className={circleShape} />
            <h3 className={detail}>{tag[0]}</h3>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Card;
