import "./Home.css";
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
      <h1>Home</h1>
      <div className="home__about">
        <h2>Welcome to your Home DIY forum</h2>
        <p>
          Welcome to our Home DIY forum, where creativity meets craftsmanship!
          Whether you&apos;re a seasoned DIY enthusiast or just dipping your
          toes into the world of home improvement, this is the place to be.
          Share your tips, tricks, and triumphs, or seek advice and inspiration
          for your next project. From simple fixes to ambitious renovations,
          join our community of like-minded individuals and turn your house into
          the home of your dreams, one project at a time!
        </p>
      </div>
      <div className="home__usp">
        <div className="home__usp__item">
          <svg fill="#03a4e6" width="35" height="35" viewBox="0 0 305 305">
            <path d="M152.5 0C68.4 0 0 68.4 0 152.5s68.4 152.5 152.5 152.5c84.1 0 152.5-68.4 152.5-152.5S236.6 0 152.5 0zM152.5 280c-70.3 0-127.5-57.2-127.5-127.5S82.2 25 152.5 25s127.5 57.2 127.5 127.5S222.8 280 152.5 280zM218.5 94l-90.5 90.5-41.4-41.4c-4.9-4.9-12.8-4.9-17.7 0s-4.9 12.8 0 17.7l50.2 50.2c2.4 2.4 5.6 3.7 8.8 3.7s6.4-1.2 8.8-3.7l99.4-99.4c4.9-4.9 4.9-12.8 0-17.7C231.3 89.1 223.4 89.1 218.5 94z" />
          </svg>
          <span className="usp__item__title">
            {totalUsersAndPosts.users.length} users <br />
            registered
          </span>
        </div>
        <div className="home__usp__item">
          <svg fill="#03a4e6" width="35" height="35" viewBox="0 0 305 305">
            <path d="M152.5 0C68.4 0 0 68.4 0 152.5s68.4 152.5 152.5 152.5c84.1 0 152.5-68.4 152.5-152.5S236.6 0 152.5 0zM152.5 280c-70.3 0-127.5-57.2-127.5-127.5S82.2 25 152.5 25s127.5 57.2 127.5 127.5S222.8 280 152.5 280zM218.5 94l-90.5 90.5-41.4-41.4c-4.9-4.9-12.8-4.9-17.7 0s-4.9 12.8 0 17.7l50.2 50.2c2.4 2.4 5.6 3.7 8.8 3.7s6.4-1.2 8.8-3.7l99.4-99.4c4.9-4.9 4.9-12.8 0-17.7C231.3 89.1 223.4 89.1 218.5 94z" />
          </svg>
          <span className="usp__item__title">
            {totalUsersAndPosts.posts.length} posts <br />
            created
          </span>
        </div>
        {user ? (
          <Button onClick={() => navigate("/posts")}>See all posts</Button>
        ) : (
          <Button onClick={() => navigate("/register")}>Join us</Button>
        )}
      </div>
      <div className="home__all-posts">
        <AllPosts page="home" />
      </div>
    </div>
  );
}

export default Home;
