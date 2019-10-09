import React from 'react';

function PostModal(props) {
    const renderUserCard = () => {
        let html = <span />;

        if (props.detailedUser.name) {
            html = (
                <div className="modal-container">
                    <i className="nes-ash" />
                    <p>{props.detailedUser.name}</p>
                    <p>{props.detailedUser.email}</p>
                    <p>{props.detailedUser.phone}</p>
                    <p>{props.detailedUser.website}</p>
                    <div className="details-container">
                        <span className="details-title"> Company </span>
                        <span className="container-info">{props.detailedUser.company.name}</span>
                        <span className="container-info">{props.detailedUser.company.catchPhrase}</span>
                        <span className="container-info">{props.detailedUser.company.bs}</span>
                    </div>
                    <div className="details-container">
                        <span className="details-title"> Address </span>
                        <span className="container-info">{props.detailedUser.address.street}</span>
                        <span className="container-info">{props.detailedUser.address.suite}</span>
                        <span className="container-info">{props.detailedUser.address.city}</span>
                        <span className="container-info">{props.detailedUser.address.zipcode}</span>
                    </div>
                </div>
            );
        }

        return html;
    }

    return (
        <dialog className="nes-dialog is-rounded" id="modal-post" onClick={props.closeModal}>
            {renderUserCard()}
        </dialog>
    );
}

export default PostModal;
