import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { plusIcon, ellipsisIcon, signalIcon, circleIcon, userIcon } from '../../assets/index';
import Card from '../Card/Card';
import DisplayModal from '../DisplayModal/DisplayModal';
import { getData, localStorageKey, setData } from '../../utils/localStorageAPI';
import capitalCase from '../../utils/util';
import getKanbanData from '../../utils/api';

const Home = () => {
  const {
    container,
    article,
    headingItems,
    headingItem1,
    headingItem2,
    headingName,
    headingNumber,
    headingImage
  } = styles;

  const initialGrouping = getData(localStorageKey.grouping) ?? 'status';
  const initialOrdering = getData(localStorageKey.ordering) ?? 'priority';

  const [grouping, setGrouping] = useState(initialGrouping);
  const [ordering, setOrdering] = useState(initialOrdering);
  const [kanbanData, setKanbanData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getKanbanData();
      setKanbanData(data);
    };

    fetchData();
  }, []);

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    setData(localStorageKey.grouping, newGrouping);
  };

  const handleOrderingChange = (newOrdering) => {
    setOrdering(newOrdering);
    setData(localStorageKey.ordering, newOrdering);
  };

  const getUsers = () => {
    const users = {};

    kanbanData?.users.forEach((user) => {
      users[user.id] = [];
    });

    return users;
  };

  const initialGroupedData = {
    status: {
      Backlog: [],
      Todo: [],
      'In progress': [],
      Done: [],
      Cancelled: []
    },
    priority: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    },
    user: getUsers()
  };

  const getGroupedData = (groupedData) => {
    kanbanData?.tickets.forEach((ticket) => {
      const { id, title, tag, userId, status, priority } = ticket;
      const item = { id, title, tag };

      let property = status;
      if (grouping === 'priority') {
        property = priority;
      }
      if (grouping === 'user') {
        property = userId;
      }

      groupedData[grouping][property].push(item);
    });
  };

  const getOrderdedData = (groupedData) => {
    Object.keys(groupedData[grouping]).forEach((items) => {
      if (ordering === 'title') {
        groupedData[grouping][items].sort((a, b) => a.title.localeCompare(b.title));
      } else {
        groupedData[grouping][items].sort((a, b) => a.priority - b.priority);
      }
    });
  };

  const getUpdatedGroupedData = (groupedData) => {
    getGroupedData(groupedData);
    getOrderdedData(groupedData);

    return groupedData;
  };

  const updatedGroupedData = getUpdatedGroupedData(initialGroupedData);

  const getSource = () => {
    if (grouping === 'status') {
      return circleIcon;
    }
    if (grouping === 'priority') {
      return signalIcon;
    }
    return userIcon;
  };

  const getDisplayItem = (item) => {
    const priorityItems = {
      0: 'No priority',
      1: 'Low',
      2: 'Medium',
      3: 'High',
      4: 'Urgent'
    };

    const names = {};

    kanbanData?.users.forEach((user) => {
      names[user.id] = user.name;
    });

    if (grouping === 'priority') {
      return priorityItems[item];
    }

    if (grouping === 'user') {
      return names[item];
    }

    return capitalCase(item);
  };

  return (
    <main className={container}>
      <DisplayModal
        initialGrouping={initialGrouping}
        initialOrdering={initialOrdering}
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange}
      />

      <article className={article}>
        {Object.keys(updatedGroupedData[grouping]).map((items) => (
          <section key={items}>
            <div className={headingItems}>
              <div className={headingItem1}>
                <img className={headingImage} src={getSource()} alt='icon' />
                <h1 className={headingName}>{getDisplayItem(items)}</h1>
                <p className={headingNumber}>{updatedGroupedData[grouping][items].length}</p>
              </div>
              <div className={headingItem2}>
                <img className={headingImage} src={plusIcon} alt='plusIcon' />
                <img className={headingImage} src={ellipsisIcon} alt='ellipsisIcon' />
              </div>
            </div>

            {updatedGroupedData[grouping][items].map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </section>
        ))}
      </article>
    </main>
  );
};

export default Home;
