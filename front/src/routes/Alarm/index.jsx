import React from 'react';
import Header from '../../components/Layout/Header';
import NotiFollowStore from '../../components/Alarms/NotiFollowStore';
import NotiNewDeal from '../../components/Alarms/NotiNewDeal';
import NotiAction from '../../components/Alarms/NotiAction';
import './style.scss';

function Alarm() {
    return (
        <div className="alarm">
            <Header back={true} title={"새 소식"}/>
            <div className="container">
                <div className="new-follow">
                    <h3>NEW 팔로우</h3>
                    <NotiFollowStore username={"abcde"}/>
                    <NotiFollowStore username={"미나리"}/>
                    <NotiFollowStore username={"스파이더맨"}/>
                </div>
                <div className="new-deal">
                    <h3>NEW 거래</h3>
                    <NotiNewDeal likedBook={"어린 왕자"} />
                    <NotiNewDeal likedBook={"나의 라임 오렌지 나무"} />
                </div>
                <div className="new-act">
                    <h3>활동</h3>
                    <NotiAction message={"홈파티가 열렸어요."}/>
                </div>
            </div>
        </div>
    )
}

export default Alarm