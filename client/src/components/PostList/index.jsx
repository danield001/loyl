import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts, title }) => {
    if (!posts.length) {
        return <h3>No posts yet...</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {posts.map((post) => (
                <div key={post._id} className="card mb-3">
                    <h4 className="card-header bg-primary text-light p-2 m-0">
                        <img src={post.image} alt="Post" /><br />
                        {post.postAuthor}
                        <span style={{ fontSize: '1rem' }}>
                            | {post.caption}
                        </span>
                    </h4>
                    <Link to={`/blog/${post._id}`}>
                        Add Comment...
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default PostList;
