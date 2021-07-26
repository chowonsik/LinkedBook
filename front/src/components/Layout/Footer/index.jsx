import React from 'react';
import { withRouter } from 'react-router';
import './style.scss';

// 추후에 Link를 통해 페이지 이동할 수 있도록 구성하기
// 클릭 시에 현재 페이지의 위치를 푸터에 색으로 표시
const Footer = () => {
    
    function onClick(e) {
        const curIcon = document.querySelector('#current-page');
        curIcon.id = '';
        e.target.id = 'current-page';
    }
    return (
        <div className="footer">
           <div className="home" onClick={onClick}>
                <i className="fas fa-home" id="current-page"></i>
           </div>
           <div className="book" onClick={onClick}>
                <i className="fas fa-book"></i>
           </div>
           <div className="plus" onClick={onClick}>
                <i className="fas fa-plus-circle"></i>
           </div>
           <div className="chat" onClick={onClick}>
                <i className="far fa-comments"></i>
           </div>
           <div className="user" onClick={onClick}>
                <i className="fas fa-user"></i>
           </div>
        </div>
    )
}

export default Footer