import React, { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Conversation.module.scss';
import { FaEllipsisH } from 'react-icons/fa';
import moment from 'moment';
import { useAppSelector } from '@/types/commons';
import { StoreConversation, StoreMessage, StoreUser } from '@/types/entities';
import { selectAuth } from '@/store/selectors';
require('moment/locale/vi');
const cx = classNames.bind(styles);

// moment.locale('vi');
type Props = {
  conversation: StoreConversation;
  active: boolean;
  latestMessageChanged?: StoreMessage;
};
const Conversation: React.FC<Props> = ({ conversation, active, latestMessageChanged }) => {
  // console.log(conversation);
  const { user } = useAppSelector(selectAuth);
  const [receiver, setReceiver] = useState(
    conversation.members.find((member: StoreUser) => member._id !== user?._id),
  );
  const [latestMessage, setLatestMessage] = useState<StoreMessage | undefined>(undefined);

  useEffect(() => {
    const getLatestMessage = async () => {
      // try {
      //   const res: StoreMessage = await messageApi.getMessageLatestFromConversation(conversation._id);
      //   setLatestMessage(res);
      // } catch (error) {
      //   console.log(error);
      // }
    };
    getLatestMessage();
    // socket.on(config.socketEvents.SERVER.GET_MESSAGE, ({ message }: { message: StoreMessage }) => {
    //   if (conversation._id === message.conversation) setLatestMessage(message);
    // });
  }, []);
  useEffect(() => {
    latestMessageChanged &&
      conversation._id === latestMessageChanged._id &&
      setLatestMessage(latestMessageChanged);
  }, [latestMessageChanged]);
  useEffect(() => {
    const getLatestMessage = async () => {
      // try {
      //   const res: StoreMessage = await axiosClient.get(`/messages/latest/${conversation._id}`);
      //   setLatestMessage(res);
      // } catch (error) {
      //   console.log(error);
      // }
    };
    active && getLatestMessage();
  }, [conversation, active]);
  return (
    <div
      className={cx(
        'container',
        !latestMessage?.seen && latestMessage?.sender._id !== user?._id && 'unread',
        active && 'active',
      )}
    >
      <div className={cx('conversation-img', 'online')}>
        {receiver?.avatar ? (
          <img src={process.env.REACT_APP_API_URL + receiver.avatar} className={cx('img')} alt="" />
        ) : (
          <span className={cx('span-img')}>
            {receiver?.firstName ? receiver.firstName[0] : receiver?.username[0]}
          </span>
        )}

        <span className={cx('dot-online', !receiver?.loggedOut && 'active')}></span>
      </div>

      <div className={cx('conversation-right')}>
        <div className={cx('conversation-info')}>
          <p className={cx('name')}>
            {receiver?.firstName
              ? receiver?.firstName + ' ' + receiver?.lastName
              : receiver?.username}
          </p>
          {latestMessage?.images && latestMessage?.images.length > 0 ? (
            <div className={cx('text-muted')}>
              <span>
                {latestMessage?.sender._id === user?._id
                  ? 'Bạn'
                  : receiver?.lastName || receiver?.username}{' '}
                đã gửi {latestMessage?.images.length} ảnh
              </span>
            </div>
          ) : (
            <div className={cx('text-muted')}>
              {latestMessage?.sender._id === user?._id && 'Bạn: '}
              {latestMessage?.text}
            </div>
          )}
        </div>
        <div className={cx('actions')}>
          <div className={cx('actions-icon')}>
            <FaEllipsisH />
          </div>
          <p>{moment(latestMessage?.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Conversation);
