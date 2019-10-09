import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import App from './components/App';
import Post from './components/Post';
import CommentRow from './components/CommentRow';
import PostModal from './components/PostModal';

describe('React Test', () => {
    let wrapper;
    describe('App', () => {
        beforeEach(() => {
            wrapper = Enzyme.shallow(<App />);
        });

        it('Should render correctly', () => {
            const tree = renderer.create(<App />);
            expect(tree.toJSON()).toMatchSnapshot();
        });
    });
    describe('PostModal', () => {
        const props = {
            detailedUser: {},
            closeModal: jest.fn()
        };

        beforeEach(() => {
            wrapper = Enzyme.shallow(<PostModal {...props} />);
        });

        it('Should render correctly', () => {
            const tree = renderer.create(<PostModal {...props} />);
            expect(tree.toJSON()).toMatchSnapshot();
        });
        it('Should call close modal function on click outside', () => {
            const modalTrigger = wrapper.find('#modal-post');
            modalTrigger.simulate('click');
            expect(props.closeModal).toHaveBeenCalled();
        });
        it('Should not render user detail if not passed', () => {
            const modalContainer = wrapper.find('.modal-container');
            expect(modalContainer.length).not.toBeGreaterThan(0);
        });
        it('Should render user detail when passed', () => {
            props.detailedUser = {
                name: 'test name',
                company: {},
                address: {},
            }
            wrapper = Enzyme.shallow(<PostModal {...props} />);
            const modalContainer = wrapper.find('.modal-container');
            expect(modalContainer.length).toBeGreaterThan(0);
        });
    });
    describe('Post', () => {
        const props = {
            post: {
                userId: 1,
                id: 1,
                title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body: 'lorem',
                comments: [{id: 1, body: 'test'}],
            },
            findUser: id => { return {name: 'test name'} },
            openModal: jest.fn(),
        };

        beforeEach(() => {
            wrapper = Enzyme.shallow(<Post {...props} />);
        });

        it('Should render correctly', () => {
            const tree = renderer.create(<Post {...props} />);
            expect(tree.toJSON()).toMatchSnapshot();
        });
        it('Call open modal on click of the user', () => {
            const userPointer = wrapper.find('.user');
            userPointer.simulate('click');
            expect(props.openModal).toHaveBeenCalled();
        });
        it('Comments load function called on click', () => {
            const commentsPointer = wrapper.find('.comments-link');
            commentsPointer.simulate('click');

            // Simulate Ajax call of the comments
            setTimeout(() => {
                expect(wrapper.find('.message-list').length).toBeGreaterThan(0);
            });
        });
    });
    describe('CommentRow', () => {
        const props = {
            comment: [{ id: 1, body: '' }, { id: 2, body: '' }],
            direction: 'left',
        };

        beforeEach(() => {
            wrapper = Enzyme.shallow(<CommentRow {...props} />);
        });

        it('Should render correctly', () => {
            const tree = renderer.create(<CommentRow {...props} />);
            expect(tree.toJSON()).toMatchSnapshot();
        });
        it('Should render left comment', () => {
            const leftComment = wrapper.find('.-left');
            // const rightComment = wrapper.find('.-right');
            expect(leftComment.length).toBeGreaterThan(0);
        });
        it('Should render right comment', () => {
            props.direction = 'right';
            wrapper = Enzyme.shallow(<CommentRow {...props} />);
            const rightComment = wrapper.find('.-right');
            expect(rightComment.length).toBeGreaterThan(0);
        });
    });
});
