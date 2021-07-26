import React from 'react';
import { withRouter } from 'react-router';
import './style.scss';

// 현재 페이지의 헤더에 뒤로가기 버튼이 있는지에 따라 왼쪽 화살표가 생성됨
// true => 왼쪽 화살표 표시, false => 왼쪽 화살표 표시하지 않음
// title : 현재 페이지의 헤더 타이틀을 전달함
const Header = withRouter(({history, back, title }) => {

    function goBack() {
        // 뒤로 가기 버튼을 눌렀을 때 페이지 이동
        history.goBack();
    }
    
    let backIcon = ''
    if (back) {
        backIcon = <i className="fas fa-arrow-left" onClick={goBack}></i>;
    }
    
    return(
        <div className="header">
            <div className="back-btn">
                {backIcon}
            </div>
            <div className="page-title">
                <h4>{title}</h4>
            </div>
            <div className="alarm">
                <i className="fas fa-bell"></i>
            </div>
        </div>
    )
});

export default Header