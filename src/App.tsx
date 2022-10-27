import ChatWindow from './components/ChatWindow'
import Navbar from './components/Navbar'
import RecipientInformationPanel from './components/RecipientInformationPanel'
import RecipientsListPanel from './components/RecipientsListPanel'

function App() {
  return (
    <div className="my-4 mx-auto flex h-[calc(100vh_-_2rem)] min-h-[740px] w-[calc(100vw_-_2rem)] min-w-[840px] max-w-[1600px] justify-center shadow-xl">
      <Navbar />
      <RecipientsListPanel />
      <ChatWindow />
      <RecipientInformationPanel />
    </div>
  )
}

export default App
