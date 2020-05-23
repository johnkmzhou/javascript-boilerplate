import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { MainContainer } from '../layouts/MainContainer';
import { handleErrors } from '../helper';

export const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();
  const [alert, setAlert] = useState(
    location.state ? location.state.alert : null
  );

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
      setAlert(null);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        const json = await res.json();
        sessionStorage.setItem('token', json.token);
        if (location.state && location.state.previous) {
          history.push(location.state.previous);
        } else {
          history.push('/create-post');
        }
      } else {
        throw res;
      }
    } catch (e) {
      handleErrors(e, setAlert, form);
    }
  };

  return (
    <MainContainer>
      {alert && <Alert message={alert.message} type={alert.type} />}
      <Form form={form} {...formItemLayout} onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password.' }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainContainer>
  );
};
