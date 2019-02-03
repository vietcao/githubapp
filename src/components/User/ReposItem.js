import React from 'react';

const ReposItem = (props) => (
    <div className="row my-2 py-1 border-top border-bottom border-info">
        <div className="col-6">
            <h4>{props.repo.name}</h4>
            <p>{props.repo.language}</p>
        </div>
        <div className="col-6">
                <p>Created: {props.repo.created_at.substr(0, 10)}</p>
                <p>Updated: {props.repo.updated_at.substr(0, 10)}</p>
        </div>
    </div>
)

export default ReposItem;