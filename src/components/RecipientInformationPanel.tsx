import { SocialIcon } from 'react-social-icons'
import { useAppSelector } from '../store/hooks'
import { selectActiveRecipient } from '../store/recipientSlice'

export default function RecipientInformationPanel() {
  const recipient = useAppSelector(selectActiveRecipient)
  const dateOfBirth = recipient?.dob.date
    ? new Date(recipient.dob.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Unknown'

  return (
    <aside className="hidden h-full w-1/5 flex-col overflow-clip bg-[#f4f5f9] lg:flex">
      <section className="ml-1 mb-1 flex h-2/5 flex-col items-center bg-white">
        <img src={recipient?.picture.large} alt="" className="mt-8 rounded-full" />
        <div className="mt-5 text-lg font-bold text-[#5172c2]">
          {recipient?.name.first} {recipient?.name.last}
        </div>
        <div className="mt-1 text-[#9ca3af]">
          {recipient?.location.city}, {recipient?.location.country}
        </div>
        {recipient ? (
          <div className="mt-4">
            <SocialIcon
              url="https://www.facebook.com/EGZOTech"
              style={{ height: '1.5rem', width: '1.5rem' }}
              className="m-1"
            />
            <SocialIcon
              url="https://www.linkedin.com/in/wojciech-lig%C4%99za-9883171a1"
              style={{ height: '1.5rem', width: '1.5rem' }}
              className="m-1"
            />
            <SocialIcon
              url="https://twitter.com/nextjs"
              style={{ height: '1.5rem', width: '1.5rem' }}
              className="m-1"
            />
          </div>
        ) : null}
      </section>
      <section className="ml-1 mb-1 flex h-1/3 flex-col bg-white">
        {recipient ? (
          <>
            <div className="my-8 flex justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-lg text-[#5172c2]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              <div className="font-semibold text-[#9ca3af]">INFORMATION</div>
            </div>
            <div className="mx-8 flex justify-between border-b-2 border-[#f4f5f9] py-2">
              <div className="font-bold text-[#9ca3af]">Tel:</div>
              <div className="text-[#9ca3af]">{recipient?.cell}</div>
            </div>
            <div className="mx-8 my-2 flex justify-between border-b-2 border-[#f4f5f9] py-2">
              <div className="font-bold text-[#9ca3af]">Date Of Birth:</div>
              <div className="text-[#9ca3af]">{dateOfBirth}</div>
            </div>
          </>
        ) : null}
      </section>
      <section className="ml-1 flex-1 bg-white">
        {recipient ? (
          <>
            <div className="my-6 flex justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-lg text-[#5172c2]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                />
              </svg>
              <div className="font-semibold text-[#9ca3af]">SHARED FILES</div>
            </div>
            <ul className="ml-14 flex list-disc flex-col gap-2">
              <li className="text-[#9ca3af] underline">Annual Plan.doc</li>
              <li className="text-[#9ca3af] underline">Offers to Companies.pdf</li>
              <li className="text-[#9ca3af] underline">Calculations.xls</li>
            </ul>
          </>
        ) : null}
      </section>
    </aside>
  )
}
