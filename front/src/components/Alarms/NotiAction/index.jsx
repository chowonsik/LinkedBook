import React from 'react';

import './style.scss';

function NotiAction({message}) {
    return(
        <div className="noti-action-item">
            <h5>{message}</h5>
            <div className="arrow-icon">
                <i className="fas fa-angle-double-right"></i>
            </div>
        </div>
    )
}

export default NotiAction