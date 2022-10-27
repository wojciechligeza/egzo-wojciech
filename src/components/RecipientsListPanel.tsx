import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { activateRecipient, getRecipients, type IRecipient } from '../store/recipientSlice'
import Spinner from './Spinner'
import Alert from './Alert'
import { convertTimeToReadableFormat } from '../utils'

type SearchRecipientsInputProps = {
  handleOnChange: Dispatch<SetStateAction<string>>
}

type RecipientProps = {
  id: IRecipient['id']
  picture: IRecipient['picture']
  name: IRecipient['name']
  isActive: IRecipient['isActive']
  isFavourite: IRecipient['isFavourite']
}

type RecipientsProps = {
  searchedRecipients: string
}

const BASE_URL = 'https://randomuser.me/api/'

function SearchRecipientsInput({ handleOnChange }: SearchRecipientsInputProps) {
  return (
    <div className="border-b border-[#e1e1e1] p-6">
      <form role="search" className="flex items-center rounded-full bg-white p-1" autoComplete="off">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="ml-2 h-6 w-6 text-[#e1e1e1]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          onChange={e => handleOnChange(e.target.value)}
          type="search"
          name="search"
          placeholder="Search..."
          aria-label="Search user"
          className="ml-4 w-full text-sm leading-tight focus:outline-none"
        />
      </form>
    </div>
  )
}

function Recipient({ picture, name, id, isActive, isFavourite }: RecipientProps) {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(state => state.messages.chat)

  const getLatestMessage = useMemo(() => {
    if (messages.length < 1) return null

    const userMessages = messages.filter(message => message.recipientId === id)
    const recipientMessages = messages.filter(message => message.senderId === id)

    if (userMessages.length < 1) return null

    let latestUserMessage = {
      text: userMessages[0].message.text,
      time: convertTimeToReadableFormat(Date.now() - userMessages[0].message.createdAt),
      createdAt: userMessages[0].message.createdAt,
    }

    if (recipientMessages.length < 1) return latestUserMessage

    let latestRecipientMessage = {
      text: recipientMessages[0].message.text,
      time: convertTimeToReadableFormat(Date.now() - recipientMessages[0].message.createdAt),
      createdAt: recipientMessages[0].message.createdAt,
    }

    if (userMessages.length > 1) {
      const { message } = userMessages.reduce((prev, current) =>
        prev.message.createdAt > current.message.createdAt ? prev : current
      )
      latestUserMessage = {
        text: message.text,
        time: convertTimeToReadableFormat(Date.now() - message.createdAt),
        createdAt: message.createdAt,
      }
    }
    if (recipientMessages.length > 1) {
      const { message } = recipientMessages.reduce((prev, current) =>
        prev.message.createdAt > current.message.createdAt ? prev : current
      )
      latestRecipientMessage = {
        text: message.text,
        time: convertTimeToReadableFormat(Date.now() - message.createdAt),
        createdAt: message.createdAt,
      }
    }

    return latestRecipientMessage.createdAt > latestUserMessage.createdAt ? latestRecipientMessage : latestUserMessage
  }, [id, messages])

  return (
    <button
      onClick={() => dispatch(activateRecipient(id))}
      className={`relative flex h-24 w-full items-center gap-4 border-b border-[#e1e1e1] hover:border-r-4 hover:border-r-[#5172c2] hover:bg-white ${
        isActive ? 'border-r-4 border-r-[#5172c2] bg-white' : ''
      }`}
    >
      <img src={picture.medium} alt="" className="ml-4 h-12 w-12 rounded-full bg-cover" />
      {isFavourite ? (
        <div className="absolute top-2 left-1 text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 fill-[#5172c2] text-[#5172c2]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
      ) : null}
      <div className="w-1/2 text-left">
        <div className=" text-lg font-semibold">
          {name.first} {name.last}
        </div>
        <div className="truncate text-sm text-[#6e6f70]">{getLatestMessage?.text}</div>
      </div>
      <div className={`w-auto rounded-full p-1 text-xs${getLatestMessage?.time ? ' bg-white' : ''}`}>
        {getLatestMessage?.time}
      </div>
    </button>
  )
}

function Recipients({ searchedRecipients }: RecipientsProps) {
  const recipients = useAppSelector(state => state.recipients)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getRecipients(`${BASE_URL}?results=10`))
  }, [dispatch])

  const filteredRecipients = useMemo(
    () =>
      recipients.results.filter(
        recipient =>
          recipient.name.first.toLowerCase().includes(searchedRecipients.toLowerCase()) ||
          recipient.name.last.toLowerCase().includes(searchedRecipients.toLowerCase())
      ),
    [recipients.results, searchedRecipients]
  )

  if (recipients.isLoading) return <Spinner />
  if (recipients.errorMessage) return <Alert message={recipients.errorMessage} />

  return (
    <>
      {filteredRecipients.map(recipient => (
        <Recipient
          key={recipient.id}
          id={recipient.id}
          picture={recipient.picture}
          name={recipient.name}
          isActive={recipient.isActive}
          isFavourite={recipient.isFavourite}
        />
      ))}
    </>
  )
}

function RecipientsListPanel() {
  const [searchedRecipients, setSearchedRecipients] = useState('')

  return (
    <section className="flex h-full w-1/4 min-w-[260px] flex-col overflow-y-auto overflow-x-hidden bg-[#f4f5f9]">
      <SearchRecipientsInput handleOnChange={setSearchedRecipients} />
      <Recipients searchedRecipients={searchedRecipients} />
    </section>
  )
}

export default RecipientsListPanel
