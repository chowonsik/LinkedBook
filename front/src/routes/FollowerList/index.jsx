import React, { useState, useEffect } from 'react';
import FollowerItem from '../../components/Follow/FollowerItem';

import './style.scss';
function FollowerList() {
    // redux를 사용했을 때는 user 내의 follower 들을 불러오도록 함
    const [follower, setFollower] = useState({});
    useEffect(() => {
        handleSetFollower()
    }, [])

    function handleSetFollower() {
        const user = {
            profileImage: "https://drive.google.com/uc?id=1tf7W-Kb9p7eAfRbPx1fVCRrpPvyJSueR",
            followerID: "정다은",
        }
        setFollower(user);
    }
    return (
        <div className="follower-list">
            <FollowerItem profileImage={follower.profileImage} followerID={follower.followerID}/>
            <FollowerItem profileImage={follower.profileImage} followerID={follower.followerID}/>
            <FollowerItem profileImage={follower.profileImage} followerID={follower.followerID}/>
            <FollowerItem profileImage={follower.profileImage} followerID={follower.followerID}/>
        </div>
    )
}

export default FollowerList