import {useGlobalContext} from './AppContext.jsx'

const ReplyComment = ({currentUser, replyAt, commentId}) => {
    const {handleReplyComment, setReplyId} = useGlobalContext();
        
    return (
        <div className="bg-white rounded-xl p-2 mb-4 px-4">
            <textarea className="p-2 w-full border-2 border-slate-200 rounded-xl focus:outline-slate-300 h-24 text-slate-700" 
                type="text" defaultValue={`@${replyAt} `}/>
            <div className="flex flex-row justify-between mt-2">
                <div className="w-10 h-10 bg-cover bg-center rounded-full mx-2" style={{backgroundImage: `url(${currentUser.image.png})`}}></div>
                <button className="bg-indigo-700 text-white p-1 text-sm rounded-xl hover:bg-indigo-600"
                    onClick = {(e) => {
                        const textArea = e.currentTarget.parentElement.parentElement.firstChild;
                        if (textArea.value.length > 0 ) {
                            handleReplyComment(commentId,textArea.value);
                            textArea.value = "";
                            setReplyId(null)
                        }
                    }}>
                REPLY</button>
            </div>
        </div>
    )
}

export default ReplyComment;