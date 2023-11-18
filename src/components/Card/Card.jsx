import styles from './Card.module.css';
import userIcon from '../../assets/userIcon.png';

const Card = ({ id, title, tag }) => {
  const {
    container,
    titleWrap,
    titleId,
    userImage,
    description,
    detailsWrap,
    details,
    exclamationMark,
    tagWrap,
    circle,
    detail
  } = styles;

  return (
    <main className={container}>
      <div className={titleWrap}>
        <p className={titleId}>{id}</p>
        <img className={userImage} src={userIcon} alt='user icon' />
      </div>

      <div className={description}>{title}</div>

      <div className={detailsWrap}>
        <div className={details}>
          <p className={exclamationMark}>!</p>
        </div>
        <div className={details}>
          <div className={tagWrap}>
            <div className={circle} />
            <p className={detail}>{tag[0]}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Card;
