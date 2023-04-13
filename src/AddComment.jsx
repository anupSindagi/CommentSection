import {useGlobalContext} from './AppContext.jsx'

const AddComment = () => {
    const {currentUser, handleAddComment} = useGlobalContext();
    
    return (
        <div className="flex flex-col place-items-center ">
            <div className="bg-white w-[90%] sm:max-w-[80%] lg:max-w-[60%] rounded-xl shadow-sm p-6 mt-4 mb-8">
                <textarea className="p-2 w-full border-2 border-slate-200 rounded-xl focus:outline-slate-300 h-16 text-slate-700" type="text" placeholder="Add a comment.."/>
                <div className="flex flex-row justify-between mt-2">
                    <div className="w-10 h-10 bg-cover bg-center rounded-full mx-2" style={{backgroundImage: `url(${currentUser.image.png})`}}></div>
                    <button className="bg-indigo-700 text-white text-sm p-1 rounded-xl hover:bg-indigo-600"
                        onClick={(e) => {
                            const textArea = e.currentTarget.parentElement.parentElement.firstChild;
                            textArea.value.length > 0 && handleAddComment(textArea.value);
                            textArea.value = "";
                        }}>
                    SEND</button>
                </div>
            </div>
        </div>        
    )
}

export default AddComment