
const EditComment = ({currentUser, replyAt, commentId}) => {
    return (
        <form className="bg-white rounded-xl shadow-sm p-2 mb-4 px-4">
            <textarea className="p-2 w-full border-2 border-slate-200 rounded-xl focus:outline-slate-300 h-16 text-slate-700" 
                type="text" defaultValue={`@${replyAt} `}/>
            <div className="flex flex-row justify-between mt-2">
                <div className="w-10 h-10 bg-cover bg-center rounded-full mx-2" style={{backgroundImage: `url(${currentUser.image.png})`}}></div>
                <button className="bg-indigo-700 text-white p-2 rounded-xl">REPLY</button>
            </div>
        </form>
    )
}

export default EditComment;