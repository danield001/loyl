import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS } from '../../utils/queries';

const PostForm = () => {
    const [formState, setFormState] = useState({
        postCaption: '',
        postAuthor: '',
        postImage: '',
    });
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        refetchQueries: [{ query: QUERY_POSTS }]
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addPost({
                variables: { ...formState },
            });

            setCharacterCount(0);
            setFormState({
                postCaption: '',
                postAuthor: '',
                postImage: ''
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "postCaption" && value.length <= 280) {
            setCharacterCount(value.length);
        }
        setFormState({ ...formState, [name]: value });
    };

    return (
        <div>
            <p>Coffee Up! Show the world your best coffee shot with a caption!</p>
            <form onSubmit={handleFormSubmit} className='flex-row justify-centre justify-space-between-md align-center'>
                <div className="col-12">
                    <textarea
                        name="postCaption"
                        placeholder="Caption"
                        value={formState.postCaption}
                        className="form-input w-100"
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="col-12 col-lg-9">
                    <input
                        name="postAuthor"
                        placeholder="Author"
                        value={formState.postAuthor}
                        className="form-input w-100"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 col-lg-3">
                    <button className="btn btn-primary btn-block py-3" type="submit">
                        Post
                    </button>
                </div>
                {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                        Something went wrong...
                    </div>
                )}
            </form>
        </div>
    );
};

export default PostForm;
