import { Card } from 'primereact/card';
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './Chat.scss';
import { getMessages, sendMessage } from '../../services/message.js';
import { useAuth } from '../../hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { decrypt } from '../../utils/crypto';
import { TieredMenu } from 'primereact/tieredmenu';
import { getUsers } from '../../services/user';
import allActions from '../../redux/actions';

const GET_SENDER_USER = /from_(\w+)_to\w+/;

export default function Chat() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [history, setHistory] = useState([]);

    const [currentUser] = useSelector(
        ({
            rootReducer: {
                message: { user },
            },
        }) => [user]
    );

    const dispatch = useDispatch();

    const menuRef = useRef(null);

    const { user } = useAuth();

    const getMessagesLocalStorage = () => {
        const _messages = localStorage.getItem(
            `message_${user}_${currentUser}`
        );
        const messages = JSON.parse(_messages);

        if (messages) {
            const { history } = messages;

            return [...history];
        }

        return [];
    };

    const setMessagesLocalStorage = () => {
        const messages = {
            history: [...history.sort(({ idA }, { idB }) => idA - idB)],
        };

        if (currentUser)
            localStorage.setItem(
                `message_${user}_${currentUser}`,
                JSON.stringify(messages)
            );
    };

    const getSender = (destination) => {
        const [_, sender] = destination.match(GET_SENDER_USER);
        return sender;
    };

    const normalizeMessages = (messages) => {
        messages = messages.map((value) => {
            return {
                ...value,
                from: getSender(value.destination) === currentUser,
            };
        });

        return [...messages];
    };

    async function run() {
        const _users = (await getUsers(user)) || [];

        const _menuModel = _users.map((value) => {
            return {
                label: value.userName,
                command: handleUserChange,
            };
        });

        setUsers(_menuModel);
    }

    async function load() {
        const _messages = await getMessages(user, currentUser);
        const _history = getMessagesLocalStorage();

        let _allMessages = [..._history, ..._messages];
        _allMessages.sort((valueA, valueB) => valueA.id - valueB.id);

        setHistory(normalizeMessages(_allMessages));
    }

    async function handleSendMessage() {
        const { id } = await sendMessage(user, currentUser, message);

        const _history = [
            ...allMessages,
            {
                id,
                destination: `from_${user}_to_${currentUser}`,
                data: message,
            },
        ];

        console.log('Historico: ', _history);
        setHistory(_history);

        setMessage('');
    }

    function handleUserChange(e) {
        if (currentUser) {
            setMessagesLocalStorage();
        }

        dispatch(allActions.doSetMessage({ user: e.item.label }));
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
        return allMessages ? (
            <div className='message-content'>
                <ul className='message-content-list'>
                    {allMessages.map((li, index) => {
                        return (
                            <li
                                key={index}
                                className={classNames(
                                    'message-content-list-item',
                                    {
                                        'message-content-list-item--received':
                                            li.from,
                                    }
                                )}
                            >
                                {li.data}
                            </li>
                        );
                    })}
                </ul>
            </div>
        ) : null;
    };

    useEffect(() => {
        if (currentUser) {
            load();
        }
    }, [currentUser]);

    useEffect(() => {
        if (Array.isArray(allMessages) && allMessages.length) {
            setMessagesLocalStorage();
            console.log('Effect: ', allMessages);
        }
    }, [allMessages]);

    useEffect(() => {
        if (history) {
            setMessagesLocalStorage();

            setAllMessages(history);
        }
    }, [history]);

    useEffect(() => {
        run();
    }, []);

    return (
        <Card className='chat-card' header={header} footer={footer}>
            {content()}
        </Card>
    );
}
