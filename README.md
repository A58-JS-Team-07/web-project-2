# Web Project 2: Home DIY Forum

## Description

The Home DIY Forum web app is a vibrant community platform for home improvement enthusiasts. Users can create posts to share their DIY projects, seek advice, and exchange ideas. The app features a robust commenting system that allows users to engage in discussions, offer tips, and provide feedback. Members can upvote or downvote posts and comments, ensuring the most helpful and popular content rises to the top. Join the Home DIY Forum to connect with like-minded individuals and get inspired for your next home project!

## Creators

Bilyana Karcheva - [@bilyanakarcheva](https://github.com/bilyanakarcheva)<br>
Ivelin Banchev - [@banch3v](https://github.com/banch3v/)<br>

## Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Create .env file and add the following information:<br>
   `VITE_FIREBASE_API_KEY={Firebase API Key}`<br>
   `VITE_FIREBASE_DATABASE_URL={Firebase DB URL}`</br>
   \*Choose Realtime Database and Email/Password auth method.
4. Finally run `npm run dev` to start Vite server.

## Technologies used

JavaScript<br>
React<br>
HTML<br>
CSS<br>
Firebase<br>
ESLint<br>
git<br>

## Project features

### Public and Private part

The app is divided into private and public parts. Non-registered users can access only the public part: Homepage, Top 10 posts, App statistics and Login/Register. The private part, which includes the rest of the app's features, is accessible only after logging in.

### Homepage
The homepage provides a warm welcome message, showcasing the essence of our site. It features the top 10 posts filtered by different criteria to highlight popular and recent discussions. Additionally, it presents key app statistics to give you an overview of our community and its activities.<br><br>
![image](https://github.com/A58-JS-Team-07/web-project-2/assets/77446631/a9a40c07-66e8-4d77-94b7-b17c3c9a5580)

### Login and Register pages

All visitors can log in to their existing profiles or create a new one on the platform. We ensure all inputs are validated to maintain data accuracy and security.

![image](https://github.com/A58-JS-Team-07/web-project-2/assets/77446631/17cd8324-16d5-4f24-bb98-157575554bbc)

![image](https://github.com/A58-JS-Team-07/web-project-2/assets/77446631/081a6a98-49d7-4d8c-b2d7-0e09efbc4584)

### All Posts page

All Posts page is reserved only for logged visitors where they can view a listing of all posts in the platform. Each post has upvote and downvote functionality as well as 'Read Post' option that leads to the detailed page. Additionally, the page offers filtering options where users can filter the posts by most recent, liked or commented posts.

![image](https://github.com/A58-JS-Team-07/web-project-2/assets/77446631/8b4ca5dd-b32d-4b24-b3f0-5c977ae366bd)

### Post Details page

Post Detailed page contains the full information about the post including the description and the post's comments. In this page the user has the option to delete or edit the post or comments that he created. Similarly to the All Posts page you can also upvote and downvote each post.

![image](https://github.com/A58-JS-Team-07/web-project-2/assets/77446631/71a6f0e1-c132-4801-aa45-437570950f7e)



