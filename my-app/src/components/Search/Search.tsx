import {
  AppstoreOutlined,
  HeartOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { Col, Layout, Row, Typography, Input, Result } from 'antd';
import { FC, useState, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Items, ItemsVideoFetch } from '../../types-reducers/search';
import Preloader from '../common/Preloader/Preloader';
import { ModalSaveSearch } from './ModalSaveSearch';
import s from './search.module.css';

const SearchFC: FC = () => {
  const [querySearch, setQuerySearch] = useState('');
  const [saveSearchIsOpen, setSaveSearchIsOpen] = useState(false);
  const { SearchFetch } = useActions();
  const { items, loaded, searchData, error, isLoading } = useTypedSelector(
    (state) => state.youtube
  );
  const [query, setQuery] = useState('');

  // setItem when there is a query and loading is in progress
  useEffect(() => {
    if (query && isLoading) {
      localStorage.setItem('querySearch', query);
    }
  }, [isLoading]);
  return (
    <div className="container">
      <Layout.Content style={{ margin: '20px 10px' }}>
        <h1 style={loaded ? { textAlign: 'left' } : { textAlign: 'center' }}>
          Поиск видео
        </h1>
        <br />
        <Input.Search
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Что хотите посмотреть?"
          enterButton="Найти"
          size="large"
          className={loaded ? s.search__input_active : s.search__input}
          suffix={
            <div onClick={() => (query ? setSaveSearchIsOpen(true) : null)}>
              <HeartOutlined className={s.input__icon_favorite} />
            </div>
          }
          onSearch={() => {
            SearchFetch(12, query);
            setQuerySearch(query);
          }}
        />
        {loaded && !error ? (
          <VideoContent
            items={items}
            query={querySearch}
            searchData={searchData}
          />
        ) : null}
        {loaded && error ? (
          <Result status="warning" title="Check console" />
        ) : null}
        {saveSearchIsOpen ? (
          <ModalSaveSearch
            setSaveSearchIsOpen={setSaveSearchIsOpen}
            query={query}
          />
        ) : null}
      </Layout.Content>
    </div>
  );
};

const VideoContent: FC<PropsVideoContent> = ({ items, query, searchData }) => {
  const { isLoading } = useTypedSelector((state) => state.youtube);
  const [querySearch, setQuerySearch] = useState('');

  useEffect(() => {
    setQuerySearch(localStorage.getItem('querySearch')!);
  }, [isLoading]);

  const [selectedSplit, setSelectedSplit] = useState(true);
  const totalRes = searchData?.pageInfo.totalResults;
  const { Text } = Typography;
  return (
    <div style={{ margin: '10px' }}>
      <Row>
        <Col span={20}>
          <Text className={s.video__text}>
            Видео по запросу «<Text strong>{querySearch}</Text>»
          </Text>
          <Text type="secondary" style={{ marginLeft: '20px' }}>
            {beautifyViews(totalRes!)}
          </Text>
        </Col>
        <Col span={4} className={s.split}>
          <UnorderedListOutlined
            className={
              selectedSplit
                ? s.split__icon
                : `${s.split__icon_active} ${s.split__icon}`
            }
            onClick={() => setSelectedSplit(false)}
          />
          <AppstoreOutlined
            onClick={() => setSelectedSplit(true)}
            className={
              selectedSplit
                ? `${s.split__icon_active} ${s.split__icon}`
                : s.split__icon
            }
          />
        </Col>
      </Row>
      {isLoading ? (
        <Preloader />
      ) : selectedSplit ? (
        <Row gutter={[30, 20]} style={{ marginTop: '35px' }}>
          {items.map((e) => {
            return <GridCart e={e} key={e.items[0].etag} />;
          })}
        </Row>
      ) : (
        <div>
          {items.map((e) => {
            return <ListCart e={e} key={e.items[0].etag} />;
          })}
        </div>
      )}
    </div>
  );
};

const ListCart: FC<PropsCart> = ({ e }) => {
  const { Text, Link } = Typography;
  return (
    <Row gutter={[15, 30]} style={{ marginTop: '35px' }}>
      <Col span={6}>
        <iframe
          frameBorder={0}
          title={e.items[0].snippet.title}
          width="100%"
          height="158px"
          src={`http://www.youtube.com/embed/${e.items[0].id}?rel=0&modestbranding=1`}
        ></iframe>
      </Col>
      <Col span={18}>
        <Text strong className={s.cart__title}>
          {e.items[0].snippet.title}
        </Text>
        <br />
        <Link
          href={`https://www.youtube.com/channel/${e.items[0].snippet.channelId}`}
          target="_blank"
        >
          {e.items[0].snippet.channelTitle}
        </Link>
        <Text type="secondary" style={{ marginLeft: '15px' }}>
          {beautifyViews(e.items[0].statistics.viewCount)}
        </Text>
      </Col>
    </Row>
  );
};

const GridCart: FC<PropsCart> = ({ e }) => {
  const { Text, Link } = Typography;
  return (
    <Col span={6}>
      <iframe
        frameBorder={0}
        title={e.items[0].snippet.title}
        width="100%"
        height="158px"
        src={`http://www.youtube.com/embed/${e.items[0].id}?rel=0&modestbranding=1`}
        allowFullScreen
      ></iframe>
      <Text strong className={s.cart__title}>
        {e.items[0].snippet.title}
      </Text>
      <br />
      <Link
        href={`https://www.youtube.com/channel/${e.items[0].snippet.channelId}`}
        target="_blank"
      >
        {e.items[0].snippet.channelTitle}
      </Link>
      <br />
      <Text type="secondary">
        {beautifyViews(e.items[0].statistics.viewCount)} просмотров
      </Text>
    </Col>
  );
};

function beautifyViews(totalRes: string | number): string {
  const result = totalRes.toString();

  if (result.length > 3) {
    // 123456 -> 123 456
    const newViews = result
      .slice(0, result.length - 3)
      .replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
    return `${newViews} тыс.`;
  } else {
    return `${result}`;
  }
}

interface PropsVideoContent {
  items: ItemsVideoFetch[];
  query: string;
  searchData?: Items;
}

interface PropsCart {
  e: ItemsVideoFetch;
}

export default SearchFC;
