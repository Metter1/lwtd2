import {
  Button,
  Cascader,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Slider
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { FC, useState } from 'react';
import { useTypedSelector } from './../../hooks/useTypedSelector';

function changeFavorite(id, data: formData, setData, currentUser: string) {
  const dataFromLocal = localStorage.getItem(currentUser)!;
  const oldData: formData[] = JSON.parse(dataFromLocal);
  oldData.forEach((e) => {
    if (e.id === id) {
      e.name = data.name;
      e.pageSize = data.pageSize;
      e.query = data.query;
      e.sort = data.sort;
    }
    return e;
  });
  setData(oldData);
  const newData = [...oldData];
  localStorage.setItem(currentUser, JSON.stringify(newData));
}

export const ModalSaveSearch: FC<PropsSaveSearch> = ({
  setSaveSearchIsOpen,
  query,
  name,
  pageSize,
  sort,
  id,
  setData
}) => {
  const [form] = useForm();
  const [valueSlider, setValueSlider] = useState(12);

  const { currentUser } = useTypedSelector((state) => state.user);

  const onFinish = (data: formData) => {
    if (id) {
      changeFavorite(id, data, setData, currentUser);
      setSaveSearchIsOpen(false);
    } else {
      formToLocalStorageSave(data, currentUser);
      setSaveSearchIsOpen(false);
    }
    message.success('Сохранено!');
  };
  const onFinishFailed = () => {
    message.error('Ошибка!');
  };
  return (
    <Modal
      maskStyle={{ backgroundColor: 'rgba(0,0,0,0.33)' }}
      title="Сохранить запрос"
      visible={true}
      onCancel={() => {
        setSaveSearchIsOpen(false);
      }}
      footer={
        <>
          <Button
            key="cancel"
            onClick={() => {
              setSaveSearchIsOpen(false);
            }}
          >
            Отмена
          </Button>
          <Button
            key="submit"
            htmlType="submit"
            onClick={() => {
              form.submit();
            }}
          >
            Сохранить
          </Button>
        </>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="query" label="Запрос" initialValue={query}>
          <Input disabled={id ? false : true} />
        </Form.Item>
        <Form.Item
          initialValue={name}
          name="name"
          label="Название"
          rules={[
            {
              required: true,
              message: 'Название is required'
            }
          ]}
        >
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item name="sort" label="Сортировать по" initialValue={sort}>
          <Cascader
            options={[
              {
                value: 'videoDuration',
                label: 'Длительность видео',
                children: [
                  {
                    value: 'any',
                    label: 'Любая'
                  },
                  {
                    value: 'short',
                    label: 'Короткая'
                  },
                  {
                    value: 'medium',
                    label: 'Средняя'
                  },
                  {
                    value: 'long',
                    label: 'Длинная'
                  }
                ]
              }
            ]}
          />
        </Form.Item>
        <Form.Item label="Максимальное количество">
          <Input.Group>
            <Row>
              <Col xs={16} sm={18}>
                <Form.Item
                  name="pageSize"
                  initialValue={pageSize ? pageSize : 12}
                >
                  <Slider
                    min={1}
                    max={50}
                    onChange={(e) => setValueSlider(e)}
                    value={typeof valueSlider === 'number' ? valueSlider : 0}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="pageSize">
                  <InputNumber
                    min={1}
                    max={50}
                    style={{ margin: '0 16px' }}
                    value={valueSlider}
                    onChange={(e) => setValueSlider(e)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function formToLocalStorageSave(formData: formData, currentUser: string) {
  // name from token.payload
  // formData[]
  const dataFromLocal = localStorage.getItem(currentUser);
  if (dataFromLocal) {
    const oldData = JSON.parse(dataFromLocal);
    formData.id = Date.now();
    const newData = [...oldData, formData];
    localStorage.setItem(currentUser, JSON.stringify(newData));
  } else {
    formData.id = Date.now();
    localStorage.setItem(currentUser, JSON.stringify([formData]));
  }
}

export interface formData {
  id: number;
  query: string;
  name: string;
  pageSize: number;
  sort?: [string, string];
}

interface PropsSaveSearch {
  setSaveSearchIsOpen: (saveSearchIsOpen: any) => void;
  setData?: (setDatas: any) => void;
  id?: number;
  name?: string;
  pageSize?: number;
  sort?: [string, string];
  query: string;
}
