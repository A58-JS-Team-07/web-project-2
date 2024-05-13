import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/posts.service.js';
import Post from '../../components/Post/Post.jsx';

export default function AllPosts({ page }) {
    const [posts, setPosts] = useState([]);

    //For the posts to be updated in real time, we need to use the onChildChanged method from the Firebase SDK.
    useEffect(() => {
        getAllPosts()
        .then((posts) => posts.reverse())
        .then(setPosts);
    }, []);

    console.log(page);

    useEffect(() => {
        if (page === 'home') {
            getAllPosts()
            .then((posts) => posts.reverse())
            .then((posts) => setPosts(posts.slice(0, 10)));
        }
    },[]);

    const handleSort = (e) => {
        if (e.target.value === 'liked') {
            const sortedByVotes = [...posts].sort((a, b) => b.votes - a.votes);
            page !== 'home' ? setPosts(sortedByVotes) : setPosts(sortedByVotes.slice(0, 10));
            console.log(posts.length);

        } else if (e.target.value === 'commented') {
            const sortedByComments = [...posts].sort((a, b) => b.commentsCount - a.commentsCount);
            page !== 'home' ? setPosts(sortedByComments) : setPosts(sortedByComments.slice(0, 10));
            console.log(posts.length);
        } else {
            const sortedByDate = [...posts].sort((a, b) => b.createdOn - a.createdOn);
            page !== 'home' ? setPosts(sortedByDate) : setPosts(sortedByDate.slice(0, 10));
            console.log(posts.length);
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