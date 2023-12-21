import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { IoImageOutline } from 'react-icons/io5'
import { motion } from "framer-motion";
import { Controller, useForm } from 'react-hook-form';
import { useMessage } from '@/hooks/services';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

type FormCreateMessage = {
  text: string
}
const defaultValues: FormCreateMessage = {
  text: ''
}

const ChatBottom = () => {
  const { onSendMessage } = useMessage()
  const { control, handleSubmit, setValue, setFocus } = useForm<FormCreateMessage>({
    defaultValues
  })

  const onSubmit = (data: FormCreateMessage) => {
    console.log(data);
    onSendMessage({ text: data.text })
    setValue('text', '')
    setFocus('text', {shouldSelect: true})

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-4 bg-background'>
      <div className='bg-card rounded-xl p-8 flex gap-4'>
        <Controller
          control={control}
          name='text'
          render={({ field }) => (
            <Input size="large" placeholder='Type your message...' className='border-none focus:border-card focus:outline-none focus:shadow-none' {...field} />

          )}
        />
        <div className='flex gap-4 items-center'>
          <div>
            <IoImageOutline size={25} />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}

          >
            <Button onSubmit={handleSubmit(onSubmit)} onClick={handleSubmit(onSubmit)} size="large" type="primary" className='flex items-center justify-center'>
              <SendOutlined rev size={40} />
            </Button>
          </motion.div>

        </div>
      </div>
    </form>
  )
}

export default ChatBottom