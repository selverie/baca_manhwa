import { NavLink, useNavigate } from 'react-router';
import { Wrapper } from '../../shared/components/ui';
import { PAGE_PATH } from '../../shared/constants';
import { Button, Table } from 'antd';

export function UsersPage() {
  const navigate = useNavigate();

  function toCreate() {
    navigate(PAGE_PATH.USER.CREATE_USER);
  }

  function toEdit(id: string) {
    return PAGE_PATH.USER.EDIT_USER(id);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: IUser) => {
        return (
          <div className="flex items-center gap-4">
            <NavLink to={toEdit(record.id)}>Edit</NavLink>
          </div>
        );
      },
    },
  ];

  return (
    <Wrapper
      title="Users"
      actions={
        <Button variant="solid" color="primary" onClick={toCreate}>
          Add User
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={dummyData}
        scroll={{ x: 'max-content' }}
      />
    </Wrapper>
  );
}

const dummyData: IUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'TbX9K@example.com',
    role: 'user',
  },
  {
    id: '2',
    name: 'John Doe 2',
    email: 'TbX9K@example.com',
    role: 'admin',
  },
];
