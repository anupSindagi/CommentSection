import CommentSection from './CommentSection.jsx'
import AddComment from './AddComment.jsx'
import {AppProvider} from './AppContext'

export default function App() {
  return (
   <AppProvider>
       <div className="font-Rubik">
        <CommentSection />
        <AddComment />
       </div>
   </AppProvider>
  )
}
