import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getRecipients, type IRecipient } from '../store/recipientSlice'
import Spinner from './Spinner'
import MessageAlert from './MessageAlert'

type RecipientProps = {
  picture: IRecipient['picture']
  name: IRecipient['name']
}

const BASE_URL = 'https://randomuser.me/api/'

function Recipient({ picture, name }: RecipientProps) {
  return (
    <div className="flex h-24 w-full items-center gap-4 border-b border-[#e1e1e1]">
      <img src={picture.medium} alt="" className="ml-4 h-12 w-12 rounded-full bg-cover" />
      <div className="w-1/2">
        <h1 className=" text-lg font-semibold">
          {name.first} {name.last}
        </h1>
        <p className="truncate text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="w-auto rounded-full bg-white p-1 text-xs">2 min</div>
    </div>
  )
}

function Recipients() {
  const dispatch = useAppDispatch()
  const { recipients } = useAppSelector(state => state.recipients)

  useEffect(() => {
    dispatch(getRecipients(`${BASE_URL}?results=10`))
  }, [dispatch])

  if (recipients.isLoading) return <Spinner />
  if (recipients.errorMessage) return <MessageAlert message={recipients.errorMessage} />

  return (
    <>
      {recipients.data.results.map(recipient => (
        <Recipient key={recipient.email} picture={recipient.picture} name={recipient.name} />
      ))}
    </>
  )
}

function SearchRecipientsInput() {
  return (
    <div className="border-b border-[#e1e1e1] p-6">
      <form role="search" className="flex items-center rounded-full bg-white p-1">
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

function RecipientsListPanel() {
  return (
    <section className="flex h-full w-1/4 flex-col bg-[#f4f5f9]">
      <SearchRecipientsInput />
      <Recipients />
    </section>
  )
}

export default RecipientsListPanel
