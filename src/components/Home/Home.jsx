import Card from '../Card/Card';
import styles from './Home.module.css';

const temp = {
  id: 'CAM-1',
  title: 'Update User Profile Page UI',
  tag: ['Feature Request']
};

const Home = () => {
  const { container } = styles;

  return (
    <main className={container}>
      <Card id={temp.id} title={temp.title} tag={temp.tag} />
    </main>
  );
};

export default Home;
