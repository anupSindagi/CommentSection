import {useGlobalContext} from './AppContext.jsx'

const DeleteModal = () => {
    const {deleteModalId, setDeleteModalId, handleDeleteComment} = useGlobalContext();
    
    return (
       <div className="fixed top-0 left-0 z-10 w-full h-screen backdrop-contrast-50"
           onClick = {() => setDeleteModalId(null)}
           >
            <div className="sticky flex top-1/2 left-1/2 place-items-center justify-center">
                <div className="w-[250px] h-[170px] -mt-[85px] bg-slate-100 rounded-xl"
                    onClick = {(e) => e.stopPropagation()}
                    >
                    <div className="p-4">
                        <span className="text-slate-700 font-bold">Delete comment </span>
                        <p className="text-sm text-slate-600"> Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                        <div className="flex flex-row justify-between my-2">
                            <button className="bg-slate-500 rounded-lg text-white p-1 px-2 text-sm"
                                onClick = {() => setDeleteModalId(null)}    
                            >NO, CANCEL</button>
                            <button className="bg-red-500 rounded-lg text-white p-1 px-2 text-sm"
                                onClick={() => {
                                    handleDeleteComment(deleteModalId);
                                    setDeleteModalId(null);
                                }}>
                            YES, DELETE</button>
                        </div>
                    </div>
                </div>
            </div>
       </div> 
    ) 
}

export default DeleteModal