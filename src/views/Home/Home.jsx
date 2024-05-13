import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import { getAllUsersArray } from "../../services/users.service.js";
import { getAllPosts } from "../../services/posts.service.js";
import Button from "../../components/Button/Button.jsx";
import AllPosts from "../Posts/AllPosts.jsx";

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
      <div className="home__about">
        <h1>Home</h1>
      </div>
      <div className="home__usp">
        <div className="home__usp__item">
          <img src="" alt="" className="ups__item__icon" />
          <span className="usp__item__title">
            { totalUsersAndPosts.users.length} users registered
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
        <AllPosts page='home'/>
      </div>
    </div>
  );
}

export default Home;
