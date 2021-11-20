import { Card } from 'primereact/card';
import React, { useState } from 'react';
import classNames from 'classnames';
import './Chat.scss';
import { getMessages } from '../../services/messages';
import { useAuth } from '../../hooks/auth';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const { user } = useAuth();

  async function load() {
    const _data = await getMessages({ user, from: 'from' });
  }

  function handleSendMessage() {
    console.log('Mensagem: ', message);
    setMessage('');
  }

  const header = () => {
    return (
      <div className='user-data'>
        <i className='pi pi-user' />
        <span className='user-data-info'>Usuário</span>
      </div>
    );
  };

  const footer = () => {
    return (
      <div className='message-data'>
        <input
          type='text'
          className='message-data-input'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <i
          className='message-data-icon pi pi-send'
          onClick={handleSendMessage}
        />
      </div>
    );
  };

  const content = () => {
    return (
      <div className='message-content'>
        <ul className='message-content-list'>
          {allMessages.map((li, index) => {
            <li
              key={index}
              className={classNames('message-content-list-item', {
                'message-content-list-item--received': li.from,
              })}
            >
              {li.message}
            </li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <Card className='chat-card' header={header} footer={footer}>
      {content()}
      <span>
        Lorem ipsum donec massa torquent nibh luctus leo fringilla tempus
        habitant scelerisque tristique, sodales quam et lacinia aenean himenaeos
        mattis arcu maecenas sed eu, platea nunc orci ante rutrum senectus nunc
        habitasse fringilla habitasse donec. ac ad cras consectetur platea,
        molestie suscipit imperdiet nulla auctor, et sodales enim. pretium justo
        nec at nec himenaeos eget mattis curae vehicula, sagittis feugiat augue
        gravida ornare tempus cubilia phasellus senectus, inceptos sem habitant
        quam sagittis mattis neque tincidunt. ut sapien accumsan et dui tempor
        est faucibus pretium, himenaeos blandit curabitur arcu varius duis
        pulvinar semper nullam, condimentum facilisis libero habitant vehicula
        nam eleifend.{' '}
      </span>
    </Card>
  );
}
