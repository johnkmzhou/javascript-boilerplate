import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Form, Input, Button, Upload, Alert, Descriptions } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MainContainer } from '../layouts/MainContainer';
import { handleErrors } from '../helper';

export const CreatePost = () => {
  const history = useHistory();
  const token = sessionStorage.getItem('token');
  const [confirmation, setConfirmation] = useState(false);
  const [alert, setAlert] = useState();
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
  };

  const tailLayout = {
    wrapperCol: { sm: { offset: 4 } },
  };

  const onFinish = async values => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(i => {
        if (i === 'attachment' && values[i]) {
          formData.append(i, values[i].file);
        } else if (values[i]) {
          formData.append(i, values[i]);
        }
      });
      const res = await fetch('/api/create-post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        setConfirmation(json);
      } else {
        throw res;
      }
    } catch (e) {
      if (e.status === 401) {
        sessionStorage.getItem(sessionStorage.removeItem('token'));
        history.push('/login', {
          alert: {
            message: 'Your session has expired. Please log in again.',
            type: 'warning',
          },
        });
      } else {
        handleErrors(e, setAlert, form);
      }
    }
  };

  return (
    <>
      {token ? (
        <MainContainer>
          {confirmation ? (
            <Descriptions>
              <Descriptions.Item label="Post">
                {confirmation.post}
              </Descriptions.Item>
              <Descriptions.Item label="Published At">
                {new Date(confirmation.publishedAt).toLocaleDateString()}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <>
              {alert && <Alert message={alert.message} type={alert.type} />}
              <Form
                form={form}
                {...formItemLayout}
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                  name="post"
                  label="Post"
                  rules={[
                    { required: true, message: 'Please enter your post.' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="attachment" {...tailLayout}>
                  <Upload accept=".pdf" beforeUpload={() => false}>
                    <Button>
                      <UploadOutlined /> Click to upload
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </MainContainer>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};
