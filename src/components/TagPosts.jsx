import { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigate} from "react-router-dom";
import { getPostsFromTag, notificationPopUp, capitalizeName } from "../utils";
import { DateTime } from "luxon";

export default function TagPosts(){
    const tagId = useLoaderData();
    const {tagName} = useParams();
    const [postsByTag, setPostsByTags] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getPosts() {
          const postsApiCall = getPostsFromTag(tagId);
          const postsApiResult = await notificationPopUp(postsApiCall, {pending: `Loading ${tagName} posts...`, success: `${tagName[0].toUpperCase() + tagName.slice(1)} posts loaded`}, 3000);
          setPostsByTags(postsApiResult.allPostsOnTag);
          document.title = tagName[0].toUpperCase() + tagName.slice(1) + ' - My Blog';
        }
        getPosts();
      }, [tagName]);

      function handleArticleEditClick(postId) {
        navigate(`/posts/${postId}`);
      }



    if (postsByTag == null) return <p>Loading...</p>;
    else  
    return (
        <section key='tag-posts-container' className="tag-posts-container">
            <h1>{tagName[0].toUpperCase() + tagName.slice(1)}</h1>
            {postsByTag.map((post, index) => {
              const formattedDate = DateTime.fromISO(post.date).toFormat(
                "MMMM dd, yyyy"
              );
              const formattedName = capitalizeName(post.authorName);
              return (
                  <article className='tag-stories' key={post._id} onClick={() => handleArticleEditClick(post._id)} >
                    <div className="tag-content">
                        <img width='600px' src={post.image} alt="post thumbnail" />
                        <h3>{post.title}</h3>
                        <h5>{formattedName}</h5>
                        <h6>{formattedDate}</h6>
                        <hr className="article-divider"/>
                    </div>
                    {(index + 1) % 2 != 0 && <hr className="vertical-divider"/>}
                  </article>
              );
            })}
          </section>

    )
}