import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/posts.service';
import Post from '../../components/Post/Post.jsx';

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [sorting, setSorting] = useState('most');

    //1. useState for 3 sorting options
    //2. functions for sorting by likes, comments, and date
    //3. condition in return - if useState is sth render it

    //For the posts to be updated in real time, we need to use the onChildChanged method from the Firebase SDK.
    useEffect(() => {
        getAllPosts()
        .then((posts) => posts.reverse())
        .then(setPosts);
    }, []);

    const handleSort = (e) => {
        setSorting(e.target.value);
        if (e.target.value === 'liked') {
            setPosts(posts.sort((a, b) => b.votes - a.votes));
        } else if (e.target.value === 'commented') {
            setPosts(posts.sort((a, b) => b.commentsCount - a.commentsCount));
        } else {
            setPosts(posts.sort((a, b) => b.createdOn - a.createdOn));
        }
    }

    // useEffect(() => {
    //     return onChildChanged(ref(db, 'posts'), (snapshot) => {
    //         const updatedPost = snapshot.val();
    //         const updatedPosts = posts.map((post) => {
    //             if (post.id === snapshot.key) {
    //                 return {
    //                     ...post,
    //                     ...updatedPost,
    //                 };
    //             }

    //             return post;
    //         });

    //         setPosts(updatedPosts);
    //     });
    // }, []);


    return (
        <div>
            <h1>All Posts</h1>
            {console.log('post rerender')}
            <div className="sorting">
                <label htmlFor="sorting">Sort by:</label>
                <select name="sorting" id="sorting" onChange={handleSort}>
                    <option value="recent">Most recent </option>
                    <option value="liked">Most liked</option>
                    <option value="commented">Most commented</option>
                </select>
                {posts.length > 0 ? (
                    <div className="posts">
                        {posts.map((post) => (
                            <Post key={post.id} post={post} variant={"readPost"} />))
                        }
                    </div>
                ) : (
                    <p>No posts found</p>
                )}
            </div>
        </div>
    );
}