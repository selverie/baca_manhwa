import { Button, Checkbox, Form, Input } from 'antd';
import { useSubmittable } from '../../shared/hooks';
import { useNavigate } from 'react-router';
import { PAGE_PATH } from '../../shared/constants';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export function LoginPage() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const isValid = useSubmittable(form);

  function handleSubmit(e: FieldType) {
    if (!e.password || !e.username) return;

    if (e.remember) {
      localStorage.setItem('_ousername', e.username);
    }

    console.log(e);
    navigate(PAGE_PATH.DASHBOARD);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md flex flex-col items-center gap-6 px-4">
        <div className="text-center">
          <h1 className="font-semibold text-2xl text-neutral-900 mb-1">
            Login to your account
          </h1>
        </div>
        <div className="w-full">
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
            <Form.Item<FieldType>
              name="username"
              label="Username or Email"
              required
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input size="large" placeholder="Username or Email" />
            </Form.Item>
            <Form.Item<FieldType>
              name="password"
              label="Password"
              required
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>

            <div className="flex justify-between items-center mb-7">
              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                label={null}
                className="mb-0"
              >
                <Checkbox className="text-base">Remember me</Checkbox>
              </Form.Item>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                size="large"
                block
                className="mb-4"
                htmlType="submit"
                disabled={!isValid}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
