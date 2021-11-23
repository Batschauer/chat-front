import { Card } from 'primereact/card';
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './Chat.scss';
import { getMessages } from '../../services/messages';
import { useAuth } from '../../hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { decrypt } from '../../utils/crypto';
import { TieredMenu } from 'primereact/tieredmenu';
import { getUsers } from '../../services/user';
import allActions from '../../redux/actions';

const GET_SENDER_USER = '/from_(\w+)_to\w+/gm';

export default function Chat() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    //@TODO: Gerar e recuperar chave privada
    const [privateKey, currentUser] = useSelector(
        ({
            rootReducer: {
                login: { key },
                message: { user },
            },
        }) => [key, user]
    );

    const dispatch = useDispatch();

    const menuRef = useRef(null);

    const { user } = useAuth();

    const getMessagesLocalStorage = () => {
        const messages = localStorage.getItem(`message_${user}_${currentUser}`);

        if (messages) {
            const { history } = messages;

            setAllMessages([...history, ...allMessages]);
        }
    };

    const setMessagesLocalStorage = () => {
        const messages = {
            history: allMessages,
        };

        localStorage.setItem(`message_${user}_${currentUser}`, messages);
    };

    const getSender = (destination) => {
        const [sender] = destination.match(GET_SENDER_USER);
        return sender;
    };

    const normalizeMessages = (messages) => {
        let senderMessages = messages.filter((value) => getSender(value.destination) === currentUser);
        senderMessages = senderMessages.map((value) => {
            return {
                from: true,
                ...value
            }
        });

        setAllMessages([...allMessages, ...senderMessages]);
    };

    async function load() {
        const _dataEncrypted = await getMessages({ user, from: currentUser });

        const _data = decrypt(privateKey, _dataEncrypted);

        setAllMessages([...allMessages, ..._data]);
    }

    async function run() {
        const _users = await getUsers(user) || [];

        const _menuModel = _users.map((value) => {
            return {
                label: value.userName,
                command: handleUserChange,
            };
        });

        setUsers(_menuModel);
    }

    function handleSendMessage() {
        console.log('Mensagem: ', message);
        setMessage('');
    }

    function handleUserChange(e) {
        dispatch(allActions.doSetMessage({ user: e.item.label}));
    }

    const header = () => {
        return (
            <div className='user-data'>
                <i className='pi pi-user' />
                <span
                    className='user-data-info'
                    onClick={(e) => menuRef.current.toggle(e)}
                    aria-haspopup
                    aria-controls='overlay_tmenu'
                >
                    {currentUser || 'Selecione um usuário'}
                </span>
                <TieredMenu
                    model={users}
                    popup
                    ref={menuRef}
                    id='overlay_tmenu'
                />
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
                            {li.data}
                        </li>;
                    })}
                </ul>
            </div>
        );
    };

    useEffect(async () => {
      if (currentUser) {
        const _messages = await getMessages(user, currentUser);
        normalizeMessages(_messages);
      }
    }, [currentUser]);

    useEffect(() => {
        run();
    }, []);

    return (
        <Card className='chat-card' header={header} footer={footer}>
            {content()}
        </Card>
    );
}
