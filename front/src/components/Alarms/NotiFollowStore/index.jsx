import React from 'react';

import './style.scss';

function NotiFollowStore({username}) {
    return (
        <div className="follow-store-item">
            <h5>{username}님이 나의 서점을 팔로우했어요.</h5>
        </div>
    )
}

export default NotiFollowStore