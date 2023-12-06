import React, { useEffect, useState, useRef, memo } from 'react';
import styles from './Messenger.module.scss';
import classNames from 'classnames/bind';

import { FaPaperPlane, FaPlusCircle, FaSmile } from 'react-icons/fa';
import { BsFillTelephoneFill, BsFillCameraVideoFill, BsDashLg } from 'react-icons/bs';
import { Button } from '@/components/shares';
import { selectAuth } from '@/store/selectors';
import { useAppSelector } from '@/types/commons';
import moment from 'moment';
import { MdClose } from 'react-icons/md';
import ReactLoading from 'react-loading';
import Message from '../Message';
import { StoreConversation, StoreMessage, StoreUser } from '@/types/entities';
import { routes } from '@/config';
require('moment/locale/vi');

const cx = classNames.bind(styles);
const Messenger = () => {
  const { user } = useAppSelector(selectAuth);
  const [activeMessenger, setActiveMessenger] = useState(false);
  const [conversation, setConversation] = useState<StoreConversation | undefined>(undefined);
  const [loadingGetMessage, setLoadingGetMessage] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [data, setData] = useState<{ countDocument: number; messages: StoreMessage[] }>({
    countDocument: 0,
    messages: [],
  });
  const [receiver, setReceiver] = useState<StoreUser | undefined>(undefined);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [currentPageYOffset, setCurrentPageYOffset] = useState({
    page: 2,
    height: 0,
  });

  const messageInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // socket.on(events.SERVER.GET_MESSAGE, ({ message }: { message: IMessage }) => {
    //   message.sender._id !== user?._id && setReceiver(message.sender);
    //   if (!activeMessenger) setActiveMessenger(true);
    //   setData((prev) => {
    //     const lastPrevMessage = prev.messages[prev.messages.length - 1];
    //     if (
    //       lastPrevMessage &&
    //       // user?._id !== message.sender._id &&
    //       lastPrevMessage.conversation === message.conversation &&
    //       lastPrevMessage._id !== message._id
    //     ) {
    //       return { ...prev, messages: [...prev.messages, message] };
    //     }
    //     return prev;
    //   });
    // });
  }, []);

  useEffect(() => {
    // const fetchConversation = async () => {
    //   try {
    //     const res: StoreConversation[] = await conversationApi.getMyConversation();
    //     // console.log(res[0]);
    //     if (res) {
    //       setReceiver(res[0]?.StoreMessage.find((member) => member._id !== user?._id));
    //       setConversation(res[0]);
    //     }
    //   } catch (error) {
    //     StoreUserle.log(error);
    //   }
    // };
    // fetchConversation();
  }, [user?._id]);

  useEffect(() => {
    // const getMessages = async () => {
    //   try {
    //     const params = {
    //       page: 1,
    //       limit: 10,
    //       // sort: 'createdAt',
    //     };
    //     setLoadingGetMessage(true);
    //     const res = await messageApi.getMessagesFromConversation(conversation?._id || '', params);
    //     console.log(res);
    //     if (res.data.length > 0) {
    //       setData({ countDocument: res.countDocument, messages: res.data });
    //       setLoadingGetMessage(false);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // conversation && activeMessenger && getMessages();
  }, [conversation, activeMessenger]);

  useEffect(() => {
    // if (activeMessenger && !conversation) {
    //   const handleCreateNewConversation = async () => {
    //     try {
    //       const res = await conversationApi.create({ receiverId: 'admin' });
    //       if (res) {
    //         setReceiver(res?.members.find((member) => member._id !== user?._id));
    //         setConversation(res);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   user?._id && handleCreateNewConversation();
    // } else {
    //   setData({ countDocument: 0, messages: [] });
    //   setCurrentPageYOffset({ page: 2, height: 0 });
    // }
  }, [activeMessenger, conversation, user?._id]);

  useEffect(() => {
    // scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    // if (
    //   conversation &&
    //   activeMessenger &&
    //   data.messages &&
    //   receiver &&
    //   receiver?._id === data.messages[data.messages.length - 1]?.sender?._id
    // ) {
    //   handleUpdateSeenMessage(conversation?._id, receiver?._id);
    // }
  }, [data.messages, receiver]);


  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    // let createMessage: {
    //   conversation?: string;
    //   sender?: string;
    //   text: string;
    //   images?: string[];
    // } = {
    //   conversation: conversation?._id,
    //   sender: user?._id,
    //   text: '',
    // };
    // if (fileImages.length > 0) {
    //   let formData = new FormData();
    //   fileImages.map((image) => {
    //     formData.append('imageMessage', image);
    //   });
    //   const res = await uploadApi.message(formData);
    //   console.log(res.data.imageMessage);
    //   const images = res.data.imageMessage.map(
    //     (image: FileResponse) => '/public/messages/' + image.filename,
    //   );
    //   createMessage.images = images;
    // }

    // if (newMessage || (createMessage?.images && createMessage?.images?.length > 0)) {
    //   try {
    //     if (newMessage) createMessage.text = newMessage;
    //     const message: IMessage = await messageApi.create(createMessage);
    //     if (message) {
    //       setData((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    //       socket.emit(socketEvents.CLIENT.SEND_MESSAGE, {
    //         message,
    //         receiverId: receiver?._id,
    //       });
    //       setNewMessage('');
    //       setFileImages([]);
    //       messageInputRef.current?.focus();
    //     }
    //   } catch (error) {}
    // } else {
    //   toast.info('Vui lòng nhập thông tin');
    // }
  }

  const handleKeyDown = () => {
    // socket.emit(socketEvents.CLIENT.KEY_DOWN, {
    //   isKeyPressedDown: true,
    //   senderId: user?._id || '',
    //   conversationId: conversation?._id || '',
    //   receiverId: receiver?._id || '',
    // });
  };
  const handleRemoveImageFile = (file: File) => {
    setFileImages((prev) => {
      return prev.filter((fileImage) => fileImage !== file);
    });
  };
  async function handleScroll(e: any) {
    // console.log(e.target.scrollTop);
    // setCurrentPageYOffset({ ...currentPageYOffset, height: e.target.scrollTop });
    // // console.log({ e: e.target.scrollTop, b: currentPageYOffset });

    // if (e.target.scrollTop === 0 && e.target.scrollTop < currentPageYOffset.height) {
    //   if (data.messages.length === data.countDocument) return;
    //   try {
    //     const params = {
    //       page: currentPageYOffset.page,
    //       limit: 10,
    //       skip: data.messages.length,
    //     };
    //     // console.log(params);

    //     setLoadingGetMessage(true);
    //     const res = await messageApi.getMessagesFromConversation(conversation?._id || '', params);
    //     console.log(res);
    //     if (res.data.length > 0) {
    //       const isExist = data.messages.find((message) => message._id === res.data[0]._id);
    //       if (res.resultPerPage === currentPageYOffset.page && !isExist) {
    //         setCurrentPageYOffset({ ...currentPageYOffset, page: currentPageYOffset.page + 1 });
    //         setData((prev) => ({
    //           countDocument: res.countDocument,
    //           messages: [...res.data, ...prev.messages],
    //         }));
    //       }
    //     }
    //     setLoadingGetMessage(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }

  const handlePasteClipboard = (e: any) => {
    if (e.clipboardData.files[0] as File) {
      setFileImages((prev) => {
        const isExist = prev.find(
          (fileImage) => fileImage.size === (e.clipboardData.files[0] as File).size,
        );
        if (isExist) {
          return prev;
        }
        return [...prev, e.clipboardData.files[0] as File];
      });
    }
  };

  const handleBlur = () => {
    // socket.emit(socketEvents.CLIENT.KEY_DOWN, {
    //   isKeyPressedDown: true,
    //   senderId: user?._id || '',
    //   conversationId: conversation?._id || '',
    //   receiverId: receiver?._id || '',
    // });
  };

  return (
    <div className={cx('container')}>
      <div className={cx('messenger', activeMessenger && 'active')}>
        {loadingGetMessage && (
          <div className={cx('loading-message')}>
            <ReactLoading type="spinningBubbles" color="#2e3e3e" width="2rem" height="2rem" />
          </div>
        )}
        {user ? (
          <>
            <div className={cx('messenger__header')}>
              <div className={cx('messenger__header-info')}>
                <div className={cx('avatar')}>
                  <img
                    src={receiver?.avatar ? process.env.REACT_APP_API_URL + receiver.avatar : ''}
                    alt=""
                  />
                </div>
                <div>
                  <p className={cx('name')}>
                    {receiver?.firstName
                      ? receiver.firstName + ' ' + receiver.lastName
                      : receiver?.username}
                  </p>
                  <p className={cx('active-text')}>
                    {receiver?.loggedOut
                      ? `Hoạt động ${moment(receiver?.loggedOutAt).fromNow()}`
                      : 'Đang hoạt động'}
                  </p>
                </div>
              </div>
              <div className={cx('messenger__header-actions')}>
                <div className={cx('icon')}>
                  <BsFillTelephoneFill />
                </div>
                <div className={cx('icon')}>
                  <BsFillCameraVideoFill />
                </div>
                <div onClick={() => setActiveMessenger(false)} className={cx('icon')}>
                  <BsDashLg />
                </div>
              </div>
            </div>
            <div
              ref={messageContainerRef}
              className={cx('messenger__body')}
              onScroll={handleScroll}
            >
              {data.messages.map((message) => (
                <div ref={scrollRef} key={message._id}>
                  <Message message={message} own={message?.sender?._id === user?._id} />
                </div>
              ))}
            </div>
            <form className={cx('messenger__footer')}>
              <div className={cx('icon')}>
                <FaPlusCircle />
              </div>
              <div className={cx('chat-input')}>
                <input
                  ref={messageInputRef}
                  className={cx('input')}
                  name="message"
                  placeholder="Aa"
                  value={newMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewMessage(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  onPaste={handlePasteClipboard}
                  onBlur={handleBlur}
                />
                {fileImages.length > 0 && (
                  <div className={cx('prev-image-container')}>
                    {fileImages.map((fileImage, i) => (
                      <div className={cx('chat-image-input')} key={i}>
                        <img src={URL.createObjectURL(fileImage)} alt="" />
                        <span
                          onClick={() => handleRemoveImageFile(fileImage)}
                          className={cx('close-icon')}
                        >
                          <MdClose />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className={cx('icon', 'emoji')}>
                  <FaSmile />
                </div>
              </div>

              <button onClick={handleSendMessage} className={cx('chat-submit')}>
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className={cx('require-login')}>
            <div>
              <Button primary to={routes.login}>
                Vui lòng đăng nhập
              </Button>
            </div>
          </div>
        )}
      </div>
      <div
        onClick={() => setActiveMessenger(!activeMessenger)}
        id="messenger"
        className={cx('icon-wrapper')}
      >
        <div className={cx('icon')}>
          <div className={cx('c')}>
            <span></span>
            <span className={cx('line-short')}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Messenger);
