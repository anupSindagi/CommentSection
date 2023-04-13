import { createContext, useState, useEffect, useContext} from "react";
import Data from './data.json'
export const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    console.log(Data)
    const [currentUser, setCurrentUser] = useState(Data.currentUser);
    const [comments, setComments] = useState(JSON.parse(localStorage.getItem("comments")) || Data.comments);
    const [replyId, setReplyId] = useState(null);
    const [editCommentId, setEditCommentId] = useState(null);
    const [deleteModalId, setDeleteModalId] = useState(null);

    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments))
    }, [comments])
    
    const handleAddComment = (content) => {
        let newComment = {
            id : getNextCommentId(),
            content : content,
            createdAt : "few seconds ago",
            score : 0,
            user : currentUser,
            replies : []
        }
        setComments(comments => [...comments, newComment])
    }

    const getNextCommentId = () => {
        let totalComments = comments.reduce((acc, comment) => acc + comment.replies.length + 1, 0);
        return totalComments + 1;
    }

    const handleReplyComment = (commentId, content) => {
        let mainCommentId = comments.filter(comment => {
            if (comment.id === commentId) return true;
            else if (comment.replies.length > 0 && comment.replies.some(comment => comment.id === commentId)) return true;
        })[0].id;
        console.log(mainCommentId)

        let newComments = [...comments];
        newComments.forEach(comment => {
            if (comment.id === mainCommentId) {
                comment.replies.push({
                    id : getNextCommentId(),
                    content : content,
                    createdAt : "few seconds ago",
                    score : 0,
                    user : currentUser
                })
            }
        })
        setComments([...newComments])
    }

    const updateComment = (commentId, content) => {
        let tempComments = [...comments];
        tempComments.forEach(comment => {
            if (comment.id === commentId) {
                comment.content = content;
            } else {
                comment.replies.forEach(reply => {
                    if (reply.id === commentId) {
                        reply.content = content;
                    } 
                })
            }
        })
        setComments([...tempComments])
    }

    const handleDeleteComment = (commentId) => {
        let tempComments = [...comments];
        let isMainComment = tempComments.some(comment => comment.id === commentId);
        let indexToRemove;
        
        if (isMainComment) {
            tempComments.forEach((comment, index) => {
                if (comment.id === commentId) indexToRemove = index;
            })
            tempComments.splice(indexToRemove, 1)
            console.log("delete",tempComments)
            setComments([...tempComments]);
        } else {
            let mainCommentId = comments.filter(comment => {
                if (comment.replies.length > 0 && comment.replies.some(comment => comment.id === commentId)) return true;
            })[0].id;
            tempComments.forEach(comment => {
                if (comment.id === mainCommentId) {
                    comment.replies.forEach((reply, index) => {
                        if (reply.id === commentId) indexToRemove = index
                    })
                    comment.replies.splice(indexToRemove, 1)
                }
            })
            console.log("delete",tempComments)
            setComments([...tempComments]);
        }
        
    }

    const onScoreChange = (commentId, isUp) => {
        let tempComments = [...comments];
        let isMainComment = tempComments.some(comment => comment.id === commentId);

        if (isMainComment){
            tempComments.forEach(comment => {
                if (comment.id === commentId) {
                    isUp ? comment.score += 1 : comment.score -= 1;
                }
            })
            setComments([...tempComments]);
        } else {
            let mainCommentId = comments.filter(comment => {
                if (comment.replies.length > 0 && comment.replies.some(comment => comment.id === commentId)) return true;
            })[0].id;
            tempComments.forEach(comment => {
                if (comment.id === mainCommentId) {
                    comment.replies.forEach((reply, index) => {
                        if (reply.id === commentId){
                            isUp ? reply.score += 1 : reply.score -= 1;
                        }
                    })
                }
            })
            setComments([...tempComments]);
        }
        
    }
    
    
    return (
        <AppContext.Provider value={{currentUser, setCurrentUser, comments, setComments, replyId, setReplyId, editCommentId, setEditCommentId, deleteModalId, setDeleteModalId, handleAddComment, handleReplyComment, updateComment, handleDeleteComment, onScoreChange}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}