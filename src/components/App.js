import React, { useState } from 'react';
import Post from './Post';
import PostModal from './PostModal';
import constants from '../constants';
import axios from 'axios';

function App() {
    const modalElement = document.querySelector('#modal-post');
    const [posts, setPosts] = useState([]);
    const [detailedUser, setdetailedUser] = useState({});
    const [users, setUsers] = useState([]);

    if (users.length <= 0) {
        axios.all([
            axios.get(constants.jsonUsersUrl),
            axios.get(constants.jsonPostUrl)
        ]).then(axios.spread((users, posts) => {
            setUsers(users.data);
            setPosts(posts.data);
        }));
    }

    const findUser = id => {
        return users.find(user => user.id === id);
    };

    const openModal = user => {
        setdetailedUser(user);
        modalElement.showModal();
    }

    const closeModal = (e) => {
        if (modalElement.attributes.open !== undefined && !e.target.closest('.modal-container')) {
            modalElement.close();
        }
    }

    return (
        <div>
            <div className="app-container">
                {posts.map(post => (
                    <Post key={post.id} post={post} openModal={openModal} findUser={findUser} />
                ))}
            </div>
            <PostModal closeModal={closeModal} detailedUser={detailedUser} />
        </div>
    );
}

export default App;
