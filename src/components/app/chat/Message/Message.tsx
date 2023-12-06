import TimeAgo from 'timeago-react';
// import { register } from 'timeago.js';
import classNames from 'classnames/bind';
// import it first.
import vi from 'timeago.js/lib/lang/vi';
import moment from 'moment';
import { memo, useState } from 'react';

import styles from './Message.module.scss';
import { PopUp } from '@/components/shares';
import { StoreMessage } from '@/types/entities';
const cx = classNames.bind(styles);
type Props = {
  message: StoreMessage;
  own: boolean;
};
const Message: React.FC<Props> = ({ message, own }) => {
  const [popupImage, setPopupImage] = useState({ isOpen: false, src: '' });

  return (
    <div className={cx('message', own && 'own')}>
      <PopUp
        isOpen={popupImage.isOpen}
        trigger={<></>}
        handleClose={() => setPopupImage((prev) => ({ ...prev, isOpen: false }))}
        position="center"
      >
        <div className={cx('popup-image')}>
          <img src={popupImage.src} alt="" />
        </div>
      </PopUp>
      <div className={cx('message-top')}>
        {!own && (
          <div className={cx('message-img-container')}>
            {message.sender?.avatar ? (
              <img
                src={process.env.REACT_APP_API_URL + message.sender?.avatar}
                alt=""
                className={cx('message-img')}
              />
            ) : (
              <span className={cx('message-img-name')}>
                {message.sender?.firstName
                  ? message.sender.firstName[0]
                  : message.sender.username[0]}
              </span>
            )}
            <div className={cx('dot-online', message.sender.loggedOut && !own && 'logged')}></div>
          </div>
        )}
        <div className={cx('content')}>
          <div className={cx('container-image')}>
            {message?.images &&
              message.images.length > 0 &&
              message.images.map((image) => (
                <img
                  className={cx('message-img-text')}
                  src={process.env.REACT_APP_API_URL + image}
                  alt=""
                  onClick={() =>
                    setPopupImage({ isOpen: true, src: process.env.REACT_APP_API_URL + image })
                  }
                />
              ))}
          </div>
          {message.text && (
            <div className={cx('message-text')}>
              {/* {message?.isLoading ? (
                <div className={cx('loading')}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                message.text
              )} */}
            </div>
          )}

          <div className={cx('time')}>
            {/* {moment().diff(moment(message.createdAt), 'minutes')}

            {moment().diff(moment(message.createdAt), 'days') > 7 ? (
              <span>{moment(message.createdAt).format('llll')}</span>
            ) : (
              <span>{moment(message.createdAt).calendar()}</span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Message);
