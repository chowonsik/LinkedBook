import React from 'react';
import './style.scss';
function FollowerItem({profileImage, followerID}) {
    return (
        <div className="follower-item">
            <div className="image-id">
                <img src={profileImage} alt={followerID} />
                <div className="follower-id">
                    <h4>{followerID}</h4>
                </div>
            </div>
            <div className="cancel-btn">
                <button>삭제</button>
            </div>
        </div>
    )
}

export default FollowerItem