import React, { useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Nullable, useAppSelector } from '@/types/commons';
import { selectAuth } from '@/store/selectors';
import { StoreConversation, StoreMessage, StoreUser } from '@/types/entities';
import { SearchInput } from '@/components/shares';
const Chat = () => {
  const { user } = useAppSelector(selectAuth);
  const [conversations, setConversations] = useState<StoreConversation[]>([]);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [loadingGetMessage, setLoadingGetMessage] = useState(false);
  const [currentChat, setCurrentChat] = useState<Nullable<StoreConversation>>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<StoreMessage[]>([]);
  const [receiver, setReceiver] = useState<StoreUser | undefined>(undefined);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [currentPageYOffset, setCurrentPageYOffset] = useState({ page: 2, limit: 20, height: 0 });
  const messageInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   socket.on(config.socketEvents.SERVER.GET_MESSAGE, ({ message }: { message: StoreMessage }) => {
  //     setMessages((prev) => {
  //       const lastPrevMessage = prev[prev.length - 1];
  //       if (
  //         lastPrevMessage &&
  //         // user?._id !== message.sender._id &&
  //         lastPrevMessage.conversation === message.conversation &&
  //         lastPrevMessage._id !== message._id
  //       ) {
  //         const prevMessages = prev.filter((message) => message._id !== '923457923845729454279525');
  //         return [...prevMessages, message];
  //       }
  //       return prev;
  //     });
  //     // }
  //     const handleUpdateConversation = async () => {
  //       try {
  //         const res = await conversationApi.updateConversation(message.conversation);
  //         if (res) {
  //           setConversations((prev) => [
  //             res,
  //             ...prev.filter((conversation) => conversation._id !== res._id),
  //           ]);
  //         }
  //         console.log(res);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     handleUpdateConversation();
  //     console.log('getMessage', message);
  //   });
  // }, []);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoadingConversation(true);
        // const res: StoreConversation[] = await conversationApi.getMyConversation();
        // console.log(res);
        // if (res) {
        //   setConversations(res);
        //   setLoadingConversation(false);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, [user?._id]);
  useEffect(() => {
    // const getMessages = async () => {
    //   setReceiver(currentChat?.members.find((member) => member._id !== user?._id));
    //   try {
    //     const params = {
    //       page: 1,
    //       limit: currentPageYOffset.limit,
    //     };
    //     setLoadingGetMessage(true);
    //     const res = await messageApi.getMessagesFromConversation(currentChat?._id || '', params);
    //     // console.log(res);
    //     if (res.data.length > 0) {
    //       setMessages(res.data);
    //       setLoadingGetMessage(false);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // setCurrentPageYOffset({ page: 2, limit: 20, height: 0 });
    // currentChat && getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (currentChat && receiver?._id === messages[messages.length - 1]?.sender._id) {
      handleUpdateSeenMessage(currentChat?._id, receiver?._id);
    }
  }, [messages]);

  const handleUpdateSeenMessage = async (conversation: string, receiverId: string) => {
    try {
      // const res = await messageApi.updateSeenMessage(conversation, receiverId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickConversation = (conversation: StoreConversation) => {
    const receiverId = conversation.members.find((member) => member._id !== user?._id)?._id || '';
    handleUpdateSeenMessage(conversation._id, receiverId);
    setCurrentChat(conversation);
  };
  const handleSendMessage = async (e: React.FormEvent) => {
    // e.preventDefault();
    // let createMessage: {
    //   conversation?: string;
    //   sender?: string;
    //   text: string;
    //   images?: string[];
    // } = {
    //   conversation: currentChat?._id,
    //   sender: user?._id,
    //   text: '',
    // };
    // if (fileImages.length > 0) {
    //   let formData = new FormData();
    //   fileImages.map((image) => {
    //     formData.append('imageMessage', image);
    //   });
    //   const res = await axiosClient.post('/upload/messages', formData);
    //   console.log(res.data.imageMessage);
    //   const images = res.data.imageMessage.map(
    //     (image: FileResponse) => '/public/messages/' + image.filename,
    //   );
    //   createMessage.images = images;
    // }
    // console.log(createMessage);
    // if (newMessage || (createMessage?.images && createMessage?.images?.length > 0)) {
    //   try {
    //     if (newMessage) createMessage.text = newMessage;
    //     const message: StoreMessage = await messageApi.create(createMessage);
    //     if (message) {
    //       // setMessages((prev) => [...prev, message]);
    //       socket.emit(config.socketEvents.CLIENT.SEND_MESSAGE, {
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
  };
  const handleScroll = async (e: any) => {
    // setCurrentPageYOffset({ ...currentPageYOffset, height: e.target.scrollTop });
    // if (e.target.scrollTop === 0 && e.target.scrollTop < currentPageYOffset.height) {
    //   try {
    //     const params = {
    //       page: currentPageYOffset.page,
    //       limit: currentPageYOffset.limit,
    //       skip: messages.length,
    //     };
    //     console.log(params);
    //     const res = await messageApi.getMessagesFromConversation(currentChat?._id || '', params);
    //     console.log(res);

    //     if (res.data.length > 0) {
    //       const isExist = messages.find((message) => message._id === res.data[0]._id);
    //       if (res.resultPerPage === currentPageYOffset.page && !isExist) {
    //         setCurrentPageYOffset({ ...currentPageYOffset, page: currentPageYOffset.page + 1 });
    //         setMessages((prev) => [...res.data, ...prev]);
    //       }
    //       // setLoadingGetMessage(false);
    //     }

    //     // if (res.data.length > 0) {
    //     //   const isExist = messages.find((message) => message._id === res.data[0]._id);
    //     //   if (res.resultPerPage === currentPageYOffset.page && !isExist) {
    //     //     setCurrentPageYOffset({ ...currentPageYOffset, page: currentPageYOffset.page + 1 });
    //     //     setMessages((prev) => [...res.data, ...prev]);
    //     //   }
    //     // }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };
  const handleKeyDown = () => {
    // socket.emit(config.socketEvents.CLIENT.KEY_DOWN, {
    //   isKeyPressedDown: true,
    //   senderId: user?._id || '',
    //   conversationId: currentChat?._id || '',
    //   receiverId: receiver?._id || '',
    // });
  };
  const handleRemoveImageFile = (file: File) => {
    setFileImages((prev) => {
      return prev.filter((fileImage) => fileImage !== file);
    });
  };
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
  return (
    <div className=''>
        Chat
    </div>
  );
};

export default Chat;
