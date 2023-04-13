import {useGlobalContext} from './AppContext.jsx'
import ReplyComment from './ReplyComment.jsx'

const Comment = ({comment}) => {
    const {replyId, setReplyId, currentUser, editCommentId, setEditCommentId, deleteModalId, setDeleteModalId, updateComment, onScoreChange} = useGlobalContext();
    
    return (
        <>
            <div className="flex flex-row p-2">
                <div className="w-10 h-10 bg-cover bg-center rounded-full mx-2" style={{backgroundImage: `url(${comment.user.image.png})`}}></div>
                <div className="self-center font-bold text-slate-700 mx-2"> {comment.user.username} </div>
                {currentUser.username === comment.user.username && 
                    <span className="bg-indigo-500 text-white text-xs h-fit w-fit self-center p-1 rounded-md">you</span>
                }
                <div className="self-center text-slate-500 text-sm mx-2">{comment.createdAt}</div>
            </div>
            <div className="p-2 px-4 text-slate-600">
                {(comment.user.username === currentUser.username && editCommentId === comment.id) ? 
                    <textarea className="p-2 w-full border-2 border-slate-200 rounded-xl focus:outline-slate-300 h-36 text-slate-700" 
                        defaultValue={comment.content}/> 
                    :
                    comment.content
                }
            </div>
            <div className="flex flex-row justify-between pb-2">
                <div className="flex flex-row m-2 ml-4 border-2 border-slate-200 bg-slate-100 p-1 rounded-xl">
                    <img className="w-4 h-4 m-0.5 hover:cursor-pointer hover:scale-125" src="./icons/icon-plus.svg"
                        onClick={() => onScoreChange(comment.id, true)}/>
                    <span className="self-center mx-1 text-indigo-700 font-bold">{comment.score}</span>
                    <img className="w-4 h-1.5 m-0.5 self-center hover:cursor-pointer hover:scale-125" src="./icons/icon-minus.svg" 
                        onClick={() => onScoreChange(comment.id, false)}/>
                </div>
                {comment.user.username !== currentUser.username ? 
                    <button className="text-indigo-700 m-2 mx-4 border-2 align-bottom text-sm
                        border-slate-200 bg-slate-100 p-1 rounded-xl hover:cursor-pointer hover:bg-slate-200"
                        onClick = {() => replyId !== comment.id ? setReplyId(comment.id) : setReplyId(null)}
                        >
                        <img className="w-3 h-3 m-0.5 inline" src="./icons/icon-reply.svg"/> Reply
                    </button>
                :
                    <div className="flex flex-row mr-4">
                        <button className="text-pink-700 m-1 border-2 w-max border-slate-200 bg-slate-100 p-1 
                            rounded-xl hover:cursor-pointer hover:bg-slate-200 "
                            onClick={() => setDeleteModalId(comment.id)}>
                            <img className="w-4 h-4 m-1 inline" src="./icons/icon-delete.svg"/> 
                        </button>
                        
                        <button className="text-indigo-700 m-1 border-2  w-max border-slate-200 bg-slate-100 p-1 rounded-xl 
                            hover:cursor-pointer hover:bg-slate-200" 
                            onClick = {() => editCommentId !== comment.id ? setEditCommentId(comment.id) : setEditCommentId(null)}>
                            <img className="w-4 h-4 m-1 inline" src="./icons/icon-edit.svg"/>  
                        </button>
                        <button className="text-indigo-700 m-1 border-2 align-bottom text-sm
                            border-slate-200 bg-slate-100 p-1 rounded-xl hover:cursor-pointer hover:bg-slate-200"
                            onClick = {() => replyId !== comment.id ? setReplyId(comment.id) : setReplyId(null)}
                            >
                            <img className="w-3 h-3 m-0.5 inline" src="./icons/icon-reply.svg"/> Reply
                        </button>
                    </div>
                }
            </div>
            {editCommentId !== null && comment.user.username === currentUser.username && editCommentId === comment.id && 
                <div className="flex flex-row justify-end">
                    <button className="bg-indigo-700 text-white text-sm p-1.5 mr-4 my-1 mb-3 rounded-xl hover:bg-indigo-600"
                        onClick={(e) => {
                            let textArea = e.currentTarget.parentElement.previousSibling.previousSibling.firstChild;
                            if (textArea.value.length > 0 ) {
                                updateComment(comment.id,textArea.value);
                                textArea.value = "";
                                setEditCommentId(null)
                            }
                        }}>
                    UPDATE</button>
                </div>
            }
            {replyId === comment.id && <ReplyComment currentUser={currentUser} commentId={comment.id} replyAt={comment.user.username}/>}
        </>
    )
}

export default Comment;