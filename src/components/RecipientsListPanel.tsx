import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { activateRecipient, getRecipients, type IRecipient } from '../store/recipientSlice'
import Spinner from './Spinner'
import Alert from './Alert'

type SearchRecipientsInputProps = {
  handleOnChange: Dispatch<SetStateAction<string>>
}

type RecipientProps = {
  id: IRecipient['id']
  picture: IRecipient['picture']
  name: IRecipient['name']
  isActive: IRecipient['isActive']
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

function Recipient({ picture, name, id, isActive }: RecipientProps) {
  const dispatch = useAppDispatch()

  return (
    <button
      onClick={() => dispatch(activateRecipient(id))}
      className={`flex h-24 w-full items-center gap-4 border-b border-[#e1e1e1] hover:border-r-4 hover:border-r-[#5172c2] hover:bg-white ${
        isActive ? 'border-r-4 border-r-[#5172c2] bg-white' : ''
      }`}
    >
      <img src={picture.medium} alt="" className="ml-4 h-12 w-12 rounded-full bg-cover" />
      <div className="w-1/2 text-left">
        <div className=" text-lg font-semibold">
          {name.first} {name.last}
        </div>
        <div className="truncate text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
      <div className="w-auto rounded-full bg-white p-1 text-xs">2 min</div>
    </button>
  )
}

function Recipients({ searchedRecipients }: RecipientsProps) {
  const dispatch = useAppDispatch()
  const recipients = useAppSelector(state => state.recipients)

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
        />
      ))}
    </>
  )
}

function RecipientsListPanel() {
  const [searchedRecipients, setSearchedRecipients] = useState('')

  return (
    <section className="flex h-full w-1/4 flex-col overflow-y-auto bg-[#f4f5f9]">
      <SearchRecipientsInput handleOnChange={setSearchedRecipients} />
      <Recipients searchedRecipients={searchedRecipients} />
    </section>
  )
}

export default RecipientsListPanel
