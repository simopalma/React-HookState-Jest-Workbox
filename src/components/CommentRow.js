import React from 'react';


function CommentRow(props) {
    const renderAlternateComment = () => {
        let html;

        if (props.direction === 'left') {
            html = (
                <section className="message -left">
                    <i className="nes-bcrikko icon" />
                    <div className="nes-balloon from-left">
                        <p>{props.comment.body}</p>
                    </div>
                </section>  
            );
        } else {
            html = (
                <section className="message -right">
                    <div className="nes-balloon from-right">
                        <p>{props.comment.body}</p>
                    </div>
                    <i className="nes-bcrikko icon" />
                </section>
            );
        }

        return html;
    }
    return renderAlternateComment();
}

export default CommentRow;
