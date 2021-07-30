import React from 'react';
import './style.scss';
function FollowingItem({profileImage, followingID}) {
    return (
        <div className="following-item">
            <div className="image-id">
                <img src={profileImage} alt={followingID} />
                <div className="following-id">
                    <h4>{followingID}</h4>
                </div>
            </div>
            <div className="cancel-btn">
                <button>팔로잉</button>
            </div>
        </div>
    )
}

export default FollowingItem