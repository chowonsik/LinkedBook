import React from 'react';
import './style.scss';
function FollowerItem({profileImage, followerID}) {
    return (
        <div className="follower-item">
            <div className="profile-image">
                <img src={profileImage} alt={followerID} />
            </div>
            <div className="follower-id">
                <h3>{followerID}</h3>
            </div>
            <div className="cancel-btn">
                <button>삭제</button>
            </div>
        </div>
    )
}

export default FollowerItem