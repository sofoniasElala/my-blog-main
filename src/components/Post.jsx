import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getSpecificPost, notificationPopUp, commentOnPost, deleteComment} from "../utils";
import { DateTime } from "luxon";
import trash from '/trash-solid.svg';

function getFormattedDate(isoDate){
    const today = DateTime.now();
    const commentDate = DateTime.fromISO(isoDate);
    const timeDiff = today.diff(commentDate, ['months', 'days', 'hours', 'minutes']).toObject();
    for(const time in timeDiff ){
        if(timeDiff[time] > 0) return `${Math.floor(timeDiff[time])} ${timeDiff[time] > 1 ? time : time.slice(0, time.length -1)} ago`;
    }
    return `less than a minute ago`;
  } 
  
export default function Post(){
    const [post, setPost] = useState(null);
    const [markup, setMarkup] = useState(null);
    const userLoggedIn = localStorage.getItem('blog-visitor') ? true : false;
    const {postId} = useParams();
    const [commentInputOpen, setCommentInputOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const commentInputRef = useRef(null);


    async function deleteCommentClick(commentId){
        const deleteCommentApiCall =  deleteComment(post.post._id, commentId);
        await notificationPopUp(deleteCommentApiCall, {pending: 'Deleting comment...', success: 'Comment deleted'}, 3000);
        setPost({...post, allCommentsOnPost: post.allCommentsOnPost.filter((comment) => comment._id !== commentId)})
      }

    async function handleSubmission(){
        const date = new Date();
        const commentData = {
            userid: JSON.parse(localStorage.getItem('blog-userInfo')).id,
            text: commentInputRef.current.value,
            date: date
        }
        const commentApiCall = commentOnPost(postId, commentData);
        const errorData = await notificationPopUp(
        commentApiCall,
        { pending: "Posting comment...", success: "Comment posted" },
        3000
        );

        if (errorData.id) {
           const userInfo = JSON.parse(localStorage.getItem('blog-userInfo'));
           const postedComment = {
            _id: errorData.id,
            author: {_id: userInfo.id, username: userInfo.name},
            text: inputValue,
            date: date
           }
           let updatedAllCommentsOnPost = [postedComment, ...post.allCommentsOnPost];
           setPost({...post, allCommentsOnPost: updatedAllCommentsOnPost});
           setInputValue('');
           setCommentInputOpen(false);
          }
    }

    function handleInputChange(event){
        setInputValue(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    useEffect(()=> {
        if(commentInputRef.current && inputValue == '') commentInputRef.current.style.height = '19.2px';
    },[inputValue]);

    useEffect(() => {
        async function getPost() {
          const postApiCall = getSpecificPost(postId);
          const postResult = await notificationPopUp(postApiCall, {pending: 'Loading post...', success: 'Post loaded'}, 3000);
          setPost(postResult);
          setMarkup({ __html: postResult.post.text });
          document.title = postResult.post.title + ' - My Blog';
        }
        getPost();
      }, [postId]);


      if (post == null) return <p>Loading...</p>;
      else
        return (
            <section className="post">
                <div className="post-info">
                    <h1>{post.post.title}</h1>
                    <h4>{post.post.authorName}</h4>
                    <h6>{DateTime.fromISO(post.post.date).toFormat("MMMM dd, yyyy")}</h6>
                </div>
                <div className="image-info">
                    <img width='600px' src={post.post.image} alt="post thumbnail" />
                    <h6>{post.post.imageOwner}</h6>
                </div>
                <p dangerouslySetInnerHTML={markup} ></p>
                <div className='comment-section'>
                    <hr  className="hr-edit-divder"/>
                    <h3>Comments</h3>
                    <textarea ref={commentInputRef} rows="1" onClick={() => setCommentInputOpen(true)} value={inputValue} onChange={handleInputChange} type="textarea" name="user-comment" id="user-comment" placeholder={userLoggedIn ? 'Add a comment...' : 'Login to comment'} disabled={!userLoggedIn} />
                    {commentInputOpen && <div className="user-comments-buttons"> <button onClick={()=> {setCommentInputOpen(false); setInputValue('')}} >Cancel</button><button onClick={() => handleSubmission()} disabled={inputValue == ''}>Comment</button> </div>}
                    {post.allCommentsOnPost.length > 0 ?  (
                        post.allCommentsOnPost.map(comment => {
                        return <div className="comment" key={comment._id} >
                            <h5>{comment.author.username} • <span className="comment-date">{getFormattedDate(comment.date)}</span>{JSON.parse(localStorage.getItem('blog-userInfo'))?.id == comment.author._id &&  <img src={trash} width='20px' onClick={() => deleteCommentClick(comment._id)} alt="delete comment"/>}</h5>
                            <p>{comment.text}</p>
                            <hr />
                            </div>
                        })
                        ) : (
                        <p>No Comments</p>)} 
          </div>
            </section>
    )
}