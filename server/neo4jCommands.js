/*

ROUGH

A new user is created:
CREATE (newUser:USER {
    userHandle: "realVishok",
    userName: "Vishok G",
})

User A follows User B:
MATCH (follower:USER), (followed:USER {userHandle: "B..",})
WHERE A.userHandle = "A.." AND B.userHandle = "B.."
CREATE (follower) -[:FOLLOWS]-> (followed)
////CREATE (followed) -[:FOLLOWED_BY]-> (follower)

A tweet is tweeted:
CREATE (newTweet:TWEET {
    userHandle: "...",
    content: "...",
    noOfLikes: "...",
    timeTweeted: "..."
})
CREATE (tweetingUser:USER) -[:TWEETED]-> (newTweet) 

A tweet is liked:
MATCH (liker:USER), (tweet:TWEET)
WHERE liker.userHandle = "..."  AND tweet.tweetID = "..."
CREATE liker -[:LIKED]-> tweet
SET tweet.noOfLikes = tweet.noOfLikes + 1
*/