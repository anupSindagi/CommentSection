import {useGlobalContext} from './AppContext.jsx'
import DeleteModal from './DeleteModal'
import Comment from './Comment.jsx'

export default function App() {
    const {currentUser, comments, deleteModalId} = useGlobalContext();
    
    return (
        <div className="relative flex flex-col place-items-center space-y-10 pt-10">
            {deleteModalId !== null && <DeleteModal />}
            {comments.map(comment => 
                <div key={comment.id} className="bg-white w-[90%] sm:max-w-[80%] lg:max-w-[60%] rounded-xl shadow-sm">
                    <Comment comment={comment}/>
                    {comment.replies.length > 0 && 
                        <div className="grid grid-cols-12">
                            <div className="col-span-1 py-4">
                                <span className="relative flex bg-slate-300/[0.7] rounded-xl h-full w-2 mx-auto"></span>
                            </div>
                            <div className="col-span-11 -ml-4">
                                {comment.replies.map(reply => <Comment key={reply.id} comment={reply}/> )}
                            </div>
                        </div>                                       
                    }
                </div>
            )}
        </div>
    )
}
