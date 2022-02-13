import { Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { FC, useState } from 'react';
import { formData, ModalSaveSearch } from '../Search/ModalSaveSearch';
import s from './favorite.module.css';
import { useActions } from './../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from './../../hooks/useTypedSelector';

export const Favorite: FC = () => {
  const { currentUser } = useTypedSelector((state) => state.user);
  const data = dataFromLocalStorage(currentUser);
  return (
    <div className="container">
      {data ? <ListFavorite data={data} currentUser={currentUser} /> : null}
    </div>
  );
};

function dataFromLocalStorage(currentUser: string): formData[] | void {
  const dataFromLocalS = localStorage.getItem(currentUser);
  if (dataFromLocalS) {
    const data = JSON.parse(dataFromLocalS);
    return data;
  }
}

const ListFavorite: FC<PropsListFavorite> = ({ data }) => {
  const navigate = useNavigate();
  const { SearchFetch } = useActions();
  const [edit, setEdit] = useState(0);
  const [datas, setDatas] = useState(data);

  function editFavorite(id: number) {
    setEdit(id);
  }

  return (
    <Row gutter={[15, 30]} style={{ marginTop: '35px' }}>
      <Col span={24}>
        {datas.map((e) => {
          return (
            <div key={e.id} className={s.favorite__item}>
              <div>
                <Text strong className={s.favorite__title}>
                  {' '}
                  {e.query}
                </Text>
              </div>
              <div className={s.favorite__buttons}>
                <button
                  className={s.favorite__button}
                  onClick={() => editFavorite(e.id)}
                >
                  <Text className={s.favorite__button_change}>Изменить</Text>
                </button>
                <button
                  className={s.favorite__button}
                  onClick={() => {
                    saveQuery(e.query);
                    SearchFetch(e.pageSize, e.query, e.sort);
                    navigate('/search');
                  }}
                >
                  <Text className={s.favorite__button_call}>Выполнить</Text>
                </button>
                {edit === e.id ? (
                  <ModalSaveSearch
                    setData={setDatas}
                    query={e.query}
                    name={e.name}
                    pageSize={e.pageSize}
                    setSaveSearchIsOpen={setEdit}
                    sort={e.sort}
                    id={e.id}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
        <Text type="secondary" style={{ marginLeft: '15px' }}></Text>
      </Col>
    </Row>
  );
};

function saveQuery(query: string) {
  localStorage.setItem('querySearch', query);
}

interface PropsListFavorite {
  currentUser: string;
  data: formData[];
}
