import { getPublishedPosts, notificationPopUp, capitalizeName } from "../utils"
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    document.title = 'My Blog'

    useEffect(() =>{
        async function getPosts() {
            const getPostsApiCall = getPublishedPosts();
            const postsArray = await notificationPopUp(
              getPostsApiCall,
              { pending: "Retrieving posts...", success: "Posts loaded" },
              3000
            );
            setPosts(postsArray);
          }
          getPosts();
    }, []);

    function handleArticleEditClick(postId) {
        navigate(`posts/${postId}`);
      }

      if (posts == null) return <p>...</p>;
      else
    return(
        <>
        <p className="float-banner" >MY BLOG</p>
        <section key='posts-container' className="posts-container">
            {posts.map((post, index) => {
              const formattedDate = DateTime.fromISO(post.date).toFormat(
                "MMMM dd, yyyy"
              );
              const formattedName = capitalizeName(post.authorName);
              return (
                  <article className={index == 0 ? 'recent' : 'top-stories'} key={post._id} onClick={() => handleArticleEditClick(post._id)} >
                    <div className="content">
                        <img width='250px' src={post.image} alt="post thumbnail" />
                        <div className="post-description">
                          <h3>{post.title}</h3>
                          <div className="authorPlusDate">
                            <h5>{formattedName}</h5>
                            <h6>{formattedDate}</h6>
                          </div>
                        </div>
                     <hr className="article-divider"/>
                    </div>
                    {index == 0 && <hr className="vertical-divider"/>}
                  </article>
              );
            })}
          </section>
        </>
    )
}