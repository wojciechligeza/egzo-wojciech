import { KeyboardEvent, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addMessage, selectActiveChat } from '../store/messageSlice'
import { IRecipient, selectActiveRecipient } from '../store/recipientSlice'

type ChatHeaderProps = {
  recipientName?: IRecipient['name']
}

type MessagesProps = {
  recipientId?: IRecipient['id']
  recipientPicture?: IRecipient['picture']
}

type SendMessageInputProps = {
  recipientId?: IRecipient['id']
}

function ChatHeader({ recipientName }: ChatHeaderProps) {
  const classes = {
    iconWrapper: 'flex bg-white h-full w-full items-center justify-center ml-1',
    icon: 'h-8 w-8 w-1/3 text-[#5172c2]',
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
        <div className={classes.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={classes.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </div>
        <div className={classes.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={classes.icon}
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <div className={classes.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={classes.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
      </div>
    </header>
  )
}

function Messages({ recipientId, recipientPicture }: MessagesProps) {
  const messages = useAppSelector(selectActiveChat)
  return (
    <main className="mb-1 w-full flex-1 bg-white">
      Messages {recipientId} {recipientPicture?.medium} {JSON.stringify(messages)}
    </main>
  )
}

function SendMessageInput({ recipientId }: SendMessageInputProps) {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const sendMessage = () => {
    if (recipientId && inputRef.current?.value) {
      dispatch(
        addMessage({
          senderId: user.id,
          recipientId,
          message: { text: inputRef.current.value, createdAt: Date.now() },
        })
      )
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
    <div className="flex h-16 w-full bg-white pl-4">
      <input
        ref={inputRef}
        disabled={!recipientId}
        type="text"
        name="chat"
        placeholder="Type your message here..."
        aria-label="Type message"
        className="h-full w-3/4 rounded-2xl leading-tight focus:outline-none"
        onKeyDown={handleKeyDown}
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
        <button className="m-2 rounded-full bg-[#4768b5] p-3" onClick={sendMessage}>
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
      <ChatHeader recipientName={recipient?.name} />
      <Messages recipientId={recipient?.id} recipientPicture={recipient?.picture} />
      <SendMessageInput recipientId={recipient?.id} />
    </div>
  )
}

export default ChatWindow
