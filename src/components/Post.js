import React, { useState } from 'react';
import axios from 'axios';
import CommentRow from './CommentRow';
import constants from '../constants';

function Post(props) {
    const [comments, setComments] = useState([]);

    const loadComments = () => {
        axios.get(`${constants.jsonCommentsUrl}?postId=${props.post.id}`)
            .then(response => {
                setComments(response.data);
            }
        );
    }

    const renderComments = () => {
        let html;

        if (comments.length > 0) {
            html = (
                <section className="message-list">
                    {
                        comments.map((comment, index) => {
                            const direction = index % 2 ? 'right' : 'left';
                            return <CommentRow key={comment.id} comment={comment} direction={direction} />;
                        })
                    }
                </section>
            );
        } else {
            html = (
                <span className="comments-link nes-pointer" onClick={loadComments}> Load Comments </span>
            );
        }

        return html;
    }

    return (
        <div className="post-container">
            <p className="user nes-pointer" onClick={() => props.openModal(props.findUser(props.post.userId))}>
                <i className="nes-ash" /> <span> {props.findUser(props.post.userId).name} </span>
            </p>
            <p className="title"> {props.post.title} </p>
            <p className="body"> {props.post.body} </p>
            {renderComments()}
        </div>
    );
}

export default Post;
