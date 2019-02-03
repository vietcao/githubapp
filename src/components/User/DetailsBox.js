import React from 'react';

const DetailsBox = (props) => (
    <div className="vh-75 overflow-auto">
    {
        Object.entries(props.user).map(
            ([key, value]) => {
                return (
                    <p className="text-truncate" key={key}>
                        {key} : {value}
                    </p>
                )
            }
        )
    }
    </div>
);

export default DetailsBox;