import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";

function Feed(props) {

  const [posts, setPosts] = useState([]);

      function compare( a, b ) {
        if ( a.timestamp < b.timestamp ){
          return -1;
        }
        if ( a.last_nom > b.last_nom ){
          return 1;
        }
        return 0;
      }
      

  useEffect(() => {
  axios
  .post('http://localhost:5000/tweetFeed', {handle: props.userData.handle})
  .then(response => {
    setPosts(response.data.sort(compare));

  })
  .catch(err => {
    console.error(err);
  });
  }, [])

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2> <p>Hi {props.userData.username.split(" ")[0]}</p>
      </div>

      <TweetBox handle={props.userData.handle}/>

      <FlipMove>
        {posts.map((post) => (
          <Post
            message={post.message}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;

// {
//     text: "This is a tweet I am tweeting",
//     username: "Dis Name",
//     handle: "realDis",
//     verified: true
//   }