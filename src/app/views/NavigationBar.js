import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import '../css/App.css';

class NavigationBar extends Component {
    render(){
        const option = [];
        const logo = [];
        if(this.props.department === "가이드"){
            option.push(<li className="tab" key="main"><a className="active" href="/guide">메인</a></li>);
            logo.push(
                <a key="logo" href="/guide" className="brand-logo logo">
                    <h6>ROYAL TOURS</h6>
                </a>
            );
        }else{
            option.push(<li className="tab" key="main"><a className="active" href="/office">메인</a></li>)
            logo.push(
                <a key="logo" href="/office" className="brand-logo logo">
                    <h6>ROYAL TOURS</h6>
                </a>
            );
        }

        if(this.props.authorization[0] === "t"){
            option.push(<li className="tab" key="settinguser"><a className="active" href="/settinguser">직원관리</a></li>);
        }
        if(this.props.authorization[1] === "t"){
            option.push(<li className="tab" key="settingoption"><a className="active" href="/settingoption">환경설정</a></li>);
        }
        if(this.props.authorization[2] === "t"){
            option.push(<li className="tab" key="settingcom"><a className="active" href="/settingcom">컴조정</a></li>);
        }
        if(this.props.department === "어드민"){
            option.push(<li className="tab" key="settingcode"><a className="active" href="/usercode-management">회원가입 코드설정</a></li>);
        }

        
        return(
            <div>
                <nav className="nav-extended navigationbar">
                    <div className="inner">
                            <div className="nav-wrapper">
                                {logo}
                                {/* Mobile */}
                                {/* <a href="/" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a> */}
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li>
                                        <MyUser name={this.props.name} onClick={this.displayUserInfo}/>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <div className="waves-effect waves-light btn btn-logout" onClick={this.logoutHandler}>로그아웃</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-content">
                                <ul className="tabs tabs-transparent">
                                    {option}
                                </ul>
                            </div>
                    </div>
                </nav>
            </div>
        );
    }

    logoutHandler = () => {
        sessionStorage.clear();
        window.location.href = "/";
    }

    displayUserInfo = () => {
        window.location.href = "/myaccount";
    }
}

export default NavigationBar;

const MyUser = (props) => {
    return(
        <Row>
            <div className="user-info">
                <Col s={2}>
                    <img src={require('../imgs/man-user2.png')} alt="user-icon" />
                </Col>
                <Col s={10}>
                    <span id="name" onClick={props.onClick}>
                        {props.name}
                    </span>
                    님 환영합니다.
                </Col>
            </div>
        </Row>
    );
}
