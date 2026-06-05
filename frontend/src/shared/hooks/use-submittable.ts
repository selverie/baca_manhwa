import { Form, type FormInstance } from 'antd';
import { useEffect, useState } from 'react';

export function useSubmittable(form: FormInstance) {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return submittable;
}
