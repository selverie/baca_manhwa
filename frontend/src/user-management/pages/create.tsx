import { useMemo } from 'react';
import { Wrapper } from '../../shared/components/ui';
import { useNavigate } from 'react-router';
import { PAGE_PATH } from '../../shared/constants';
import { Button, Form, Input } from 'antd';
import { useSubmittable } from '../../shared/hooks';
import { useForm } from 'antd/es/form/Form';
import { useCreateUser } from '../hooks';

type FieldType = ICreateUserBody;

const isEdit = false;

export function CreateOrUpdateUserPage() {
  const navigate = useNavigate();
  const [form] = useForm<FieldType>();
  const isValid = useSubmittable(form);
  const create = useCreateUser();

  function toUsers() {
    navigate(PAGE_PATH.USER.LIST);
  }

  function handleSubmit(values: FieldType) {
    console.log(values);
  }

  const breadcrumb = useMemo(
    () => [
      {
        title: 'Manage User',
        onClick: () => {
          toUsers();
        },
      },
      {
        title: isEdit ? 'Edit User' : 'Add New User',
      },
    ],
    [],
  );

  const isLoading = create.isMutating; // ||  update.isMutating

  return (
    <Wrapper
      title={isEdit ? 'Edit User' : 'Add New User'}
      description="Create and manage users to assign roles and permissions for secure access."
      breadcrumb={{
        items: breadcrumb,
      }}
    >
      <div>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item<FieldType>
            name="name"
            label="Full Name"
            required
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Input full name" />
          </Form.Item>

          <Form.Item<FieldType>
            name="email"
            label="Email"
            required
            rules={[{ required: true }]}
          >
            <Input
              size="large"
              placeholder="Input email address"
              inputMode="email"
              disabled
            />
          </Form.Item>

          <Form.Item className="mt-5 ">
            <div className="flex items-center gap-4">
              <Button
                variant="outlined"
                color="primary"
                size="large"
                block
                onClick={toUsers}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                block
                disabled={!isValid}
                loading={isLoading}
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
}
