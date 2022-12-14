import { KeyboardEvent, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addMessage, selectActiveChat } from '../store/messageSlice'
import {
  type IRecipient,
  selectActiveRecipient,
  sortByFavourite,
  recipientStartsTyping,
  recipientEndsTyping,
} from '../store/recipientSlice'

type ChatHeaderProps = {
  recipientId?: IRecipient['id']
  recipientName?: IRecipient['name']
  recipientIsFavourite?: IRecipient['isFavourite']
}

type MessagesProps = {
  senderPictureMedium?: string
}

type MessageProps = {
  messageTimestamp: string
  messageText: string
} & MessagesProps

type SendMessageInputProps = {
  recipientId?: IRecipient['id']
  recipientIsTyping?: IRecipient['isTyping']
  recipientFirstName?: string
}

type SimulatedResponse = `Odpowiadam: ${string}`

function ChatHeader({ recipientId, recipientName, recipientIsFavourite }: ChatHeaderProps) {
  const dispatch = useAppDispatch()

  const classes = {
    iconWrapper: 'flex bg-white h-full w-full items-center justify-center ml-1',
    fillIcon: (clicked?: boolean) => `h-8 w-8 text-[#5172c2] ${clicked ? 'fill-[#5172c2]' : 'hover:fill-[#e4effe]'}`,
  }

  const handleClickedFavourite = () => {
    if (recipientId) {
      dispatch(sortByFavourite(recipientId))
    }
  }

  return (
    <header className="flex h-16 w-full">
      <h1 className="mb-1 w-2/3 bg-white p-4">
        {recipientName ? (
          <>
            <span>Chat with </span>
            <span className="border- border-b-2 border-b-[#5172c2] font-semibold text-[#5172c2]">
              {recipientName.first} {recipientName.last}
            </span>
          </>
        ) : (
          <span>Choose who you want to chat with</span>
        )}
      </h1>
      <div className="mb-1 flex w-1/3">
        <button className={classes.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={classes.fillIcon()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </button>
        <button className={classes.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={classes.fillIcon()}
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>
        <button className={classes.iconWrapper} onClick={handleClickedFavourite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={classes.fillIcon(recipientIsFavourite)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

function SentMessage({ senderPictureMedium, messageText, messageTimestamp }: MessageProps) {
  return (
    <div className="m-4 flex items-center self-end">
      <div className="rounded-2xl bg-[#e4effe] p-4">{messageText}</div>
      <div className="h-0 w-0 border-y-8 border-l-[8px] border-[#e4effe] border-y-transparent"></div>
      <div className="flex flex-col items-center">
        <img src={senderPictureMedium} alt="" className="mt-6 ml-4 h-12 w-12 rounded-full bg-contain" />
        <div className="mt-1 ml-3 text-xs font-semibold">{messageTimestamp}</div>
      </div>
    </div>
  )
}

function ReceivedMessage({ senderPictureMedium, messageText, messageTimestamp }: MessageProps) {
  return (
    <div className="m-4 flex items-center self-start">
      <div className="flex flex-col items-center">
        <img src={senderPictureMedium} alt="" className="mt-6 mr-4 h-12 w-12 rounded-full bg-contain" />
        <div className="mt-1 mr-3 text-xs font-semibold">{messageTimestamp}</div>
      </div>
      <div className="h-0 w-0 border-y-8 border-r-[8px] border-[#f6f6f6] border-y-transparent"></div>
      <div className="rounded-2xl bg-[#f6f6f6] p-4">{messageText}</div>
    </div>
  )
}

function Messages({ senderPictureMedium }: MessagesProps) {
  const messages = useAppSelector(selectActiveChat)
  const user = useAppSelector(state => state.user)
  return (
    <main className="mb-1 flex w-full flex-1 flex-col overflow-x-auto bg-white">
      {messages.map(item => {
        const sendByUser = item.senderId === user.id
        const date = new Date(item.message.createdAt)
        const minutes =
          date.getMinutes().toLocaleString().length === 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        const hoursAndMinutes = `${date.getHours()}:${minutes}`
        if (sendByUser) {
          return (
            <SentMessage
              key={item.message.createdAt}
              senderPictureMedium={user.avatar}
              messageText={item.message.text}
              messageTimestamp={hoursAndMinutes}
            />
          )
        }
        return (
          <ReceivedMessage
            key={item.message.createdAt}
            senderPictureMedium={senderPictureMedium}
            messageText={item.message.text}
            messageTimestamp={hoursAndMinutes}
          />
        )
      })}
    </main>
  )
}

function SendMessageInput({ recipientId, recipientIsTyping, recipientFirstName }: SendMessageInputProps) {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const simulateResponse = useCallback(() => {
    if (recipientId && inputRef.current?.value) {
      const text: SimulatedResponse = `Odpowiadam: ${inputRef.current.value}`
      const max = 10 * 1000 // 10 secs
      const min = 5 * 1000 // 5 secs
      dispatch(recipientStartsTyping(recipientId))
      setTimeout(() => {
        dispatch(
          addMessage({
            senderId: recipientId,
            recipientId: user.id,
            message: { text, createdAt: Date.now() },
          })
        )
        dispatch(recipientEndsTyping(recipientId))
      }, Math.floor(Math.random() * (max - min + 1) + min)) // execute in random time from 5 to 10 secs inclusive
    }
  }, [dispatch, recipientId, user.id])

  const sendMessage = () => {
    if (recipientId && inputRef.current?.value) {
      dispatch(
        addMessage({
          senderId: user.id,
          recipientId,
          message: { text: inputRef.current.value, createdAt: Date.now() },
        })
      )
      simulateResponse()
      inputRef.current.value = ''
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="relative flex h-16 w-full bg-white pl-2">
      {recipientIsTyping ? (
        <div className="absolute -top-6 text-sm text-[#b1b1b1]">{recipientFirstName} is typing...</div>
      ) : null}
      <input
        ref={inputRef}
        disabled={!recipientId}
        type="text"
        name="chat"
        placeholder="Type your message here..."
        aria-label="Type message"
        className="my-1 h-[calc(100%_-_8px)] w-3/4 rounded-2xl pl-2 leading-tight focus:outline-none"
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <div className="flex flex-1">
        <button className="m-1 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-[#b1b1b1]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </button>
        <button className="m-1 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-[#b1b1b1]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        </button>
        <button className="m-2 rounded-full bg-[#4768b5] p-3 hover:bg-[#5172c2]" onClick={sendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-[#e1e1e1]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

function ChatWindow() {
  const recipient = useAppSelector(selectActiveRecipient)

  return (
    <div className="flex h-full w-1/2 flex-grow flex-col bg-[#f4f5f9]">
      <ChatHeader
        recipientId={recipient?.id}
        recipientName={recipient?.name}
        recipientIsFavourite={recipient?.isFavourite}
      />
      <Messages senderPictureMedium={recipient?.picture.medium} />
      <SendMessageInput
        recipientId={recipient?.id}
        recipientFirstName={recipient?.name.first}
        recipientIsTyping={recipient?.isTyping}
      />
    </div>
  )
}

export default ChatWindow
