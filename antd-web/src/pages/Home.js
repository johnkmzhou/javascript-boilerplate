import React, { useState, useEffect } from 'react';
import { List, Typography } from 'antd';
import { MainContainer } from '../layouts/MainContainer';
const { Paragraph } = Typography;

export const Home = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/posts');
        const json = await res.json();
        setPosts(json);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <MainContainer>
      <List
        header="Posts"
        bordered
        dataSource={posts}
        renderItem={item => (
          <List.Item>
            <Paragraph>{item.post}</Paragraph>
            <Paragraph strong>{item.user.username}</Paragraph>
          </List.Item>
        )}
      />
    </MainContainer>
  );
};
