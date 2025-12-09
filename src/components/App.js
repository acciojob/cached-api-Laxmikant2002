
import React, { useState, useEffect, useMemo } from "react";
import './../styles/App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from API
  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  // Memoize filtered posts based on search term
  const filteredPosts = useMemo(() => {
    console.log('Calculating filtered posts...');
    if (!searchTerm) {
      return posts;
    }
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div>
        {/* Do not remove the main div */}
        <div className="app-container">
          <h1>Cached API Posts</h1>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : (
            <div className="posts-container">
              <p className="posts-count">
                Showing {filteredPosts.length} of {posts.length} posts
              </p>
              {filteredPosts.map(post => (
                <div key={post.id} className="post-card">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-body">{post.body}</p>
                  <span className="post-id">Post ID: {post.id}</span>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default App
