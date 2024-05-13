import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getAllUsersArray } from "../../services/users.service";
import { getAllPosts } from "../../services/posts.service";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";

function Home() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const [totalUsersAndPosts, setTotalUsersAndPosts] = useState({
    users: [],
    posts: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsersArray();
      const posts = await getAllPosts();

      setTotalUsersAndPosts({ users, posts });
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="home__about">
        <h2>Welcome to your Home DIY forum</h2>
        <p>
          Welcome to our Home DIY forum, where creativity meets
          craftsmanship! Whether you&apos;re a seasoned DIY enthusiast or just
          dipping your toes into the world of home improvement, this is the
          place to be. Share your tips, tricks, and triumphs, or seek advice and
          inspiration for your next project. From simple fixes to ambitious
          renovations, join our community of like-minded individuals and turn
          your house into the home of your dreams, one project at a time!
        </p>
      </div>
      <div className="home__usp">
        <div className="home__usp__item">
          <img src="" alt="" className="ups__item__icon" />
          <span className="usp__item__title">
            {totalUsersAndPosts.users.length} users registered
          </span>
        </div>
        <div className="home__usp__item">
          <img src="" alt="" className="ups__item__icon" />
          <span className="usp__item__title">
            {totalUsersAndPosts.posts.length} posts created
          </span>
        </div>
        {user ? (
          <Button onClick={() => navigate("/posts")}>See all posts</Button>
        ) : (
          <Button onClick={() => navigate("/register")}>Join us</Button>
        )}
      </div>
      <div className="home__all-posts">
        <p>MUST BE ONLY 10 AND SORTING IS NOT WORKING</p>
        <div className="sorting">
          <label htmlFor="sorting">Sort by:</label>
          <select name="sorting" id="sorting">
            <option value="recent">Most recent </option>
            <option value="liked">Most liked</option>
            <option value="commented">Most commented</option>
          </select>
          {totalUsersAndPosts.posts.length > 0 ? (
            <div className="posts">
              {totalUsersAndPosts.posts.map((post) => (
                <Post key={post.id} post={post} variant={"readPost"} />
              ))}
            </div>
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
