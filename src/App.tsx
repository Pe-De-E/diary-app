import { DiaryProvider } from './context/diaryContext'
import Navbar from './components/Navbar'
import EntryList from './components/EntryList'

function App() {
  return (
    <DiaryProvider>
      <div className="min-h-screen">
        <Navbar />
        <EntryList />
      </div>
    </DiaryProvider>
  )
}

export default App
