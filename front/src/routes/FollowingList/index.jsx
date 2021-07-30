import React, {useState, useEffect} from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import FollowingItem from '../../components/Follow/FollowingItem';
import './style.scss';

function FollowingList() {
    const [following, setFollowing] = useState({});

    useEffect(() => {
        handleSetFollowing()
    }, [])

    function handleSetFollowing() {
        const user = {
            profileImage: "https://drive.google.com/uc?id=1tf7W-Kb9p7eAfRbPx1fVCRrpPvyJSueR",
            followingID: "정다은",
        }
        setFollowing(user);
    }
    return (
        <div className="following-list">
            <Header back={true} title={'팔로잉'}/>
            <FollowingItem profileImage={following.profileImage} followingID={following.followingID} />
            <Footer />
        </div>
    )
}

export default FollowingList