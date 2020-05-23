import React, { useState, useEffect } from 'react';
import { List, Typography } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import { MainContainer } from '../layouts/MainContainer';
const { Text } = Typography;

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
            <List.Item.Meta
              title={item.publishedAt}
              description={
                <>
                  <Text>{item.post}</Text>{' '}
                  {item.attachmentPath && (
                    <a
                      href={item.attachmentPath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FilePdfOutlined />
                    </a>
                  )}
                </>
              }
            />
            <div>{item.user.username}</div>
          </List.Item>
        )}
      />
    </MainContainer>
  );
};
