import ChatWindow from './components/ChatWindow'
import Navbar from './components/Navbar'
import RecipientInformationPanel from './components/RecipientInformationPanel'
import RecipientsListPanel from './components/RecipientsListPanel'

function App() {
  return (
    <div className="my-4 mx-auto flex h-[calc(100vh_-_2rem)] w-[calc(100vw_-_2rem)] max-w-[1366px] justify-center shadow-xl">
      <Navbar />
      <RecipientsListPanel />
      <ChatWindow />
      <RecipientInformationPanel />
    </div>
  )
}

export default App
