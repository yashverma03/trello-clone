import styles from './Card.module.css';
import userIcon from '../../assets/userIcon.png';
import circle from '../../assets/circle.svg';
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
      <div className={titleWrap}>
        <p className={titleId}>{id}</p>
        {grouping !== 'user' && <img className={userImage} src={userIcon} alt='user icon' />}
      </div>

      <div className={descriptionWrap}>
        {grouping !== 'status' && <img className={circleImage} src={circle} alt='circle' />}
        <div className={description}>{getFormattedString(title)}</div>
      </div>

      <div className={detailsWrap}>
        {grouping !== 'priority' && (
          <div className={details}>
            <p className={exclamationMark}>!</p>
          </div>
        )}
        <div className={details}>
          <div className={tagWrap}>
            <div className={circleShape} />
            <p className={detail}>{tag[0]}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Card;
