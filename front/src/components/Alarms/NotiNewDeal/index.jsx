import React from 'react';

import './style.scss';

function NotiNewDeal({likedBook}) {
    return (
        <div className="new-deal-item">
            <h5>{likedBook}이(가) 입고되었어요.</h5>
            <div className="arrow-icon">
                <i className="fas fa-angle-double-right"></i>
            </div>
        </div>
    )
}

export default NotiNewDeal