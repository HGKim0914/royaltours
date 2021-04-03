import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import '../css/Login.css';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import $ from 'jquery';

class ViewLogin extends Component {
    constructor(){
        super();
        //Get current session
        var getDepartment =  sessionStorage.getItem("department");

        //After registration, accordingly display message.
        var getMsg = sessionStorage.getItem("registration-msg");
        var msg = "";
        if(getMsg !== null){
            if(getMsg === "3") msg = false;     //get cookie - if registration successed
            else if(getMsg === "4")  msg = true;

            sessionStorage.removeItem("registration-msg");
        }
        if(getDepartment ==="가이드"){
            window.location.href = "/guide";
        }else if(getDepartment === "어드민" || getDepartment === "오피스"){
            window.location.href = "/office";
        }else{
            this.state = {
                msgLogin: msg,
                display: true,
            }
        }
    }

    render(){
        var view = "";
        if(this.state.display){
            view = <Loginpage msg={this.state.msgLogin}/>;
        }
        return(
            <div>
                {view}
            </div>
        );
    }
}

export default ViewLogin;

class Loginpage extends Component{
    state = {
        msg : "",
    }
    render(){
        var msg = "";
        if(this.props.msg !== ""){
            if(this.props.msg === true){
                msg =  <p id="msg-registration">회원가입이 완료되었습니다.</p>
            }else if(this.props.msg === false){
                msg = <p id="msg-registration-fail"><img src={require('../imgs/warning.png')} alt="img-warning"/>회원가입에 실패했습니다.</p>
            }
        }

        if(this.state.msg !== ""){
            msg = this.state.msg;
        }
        return(
            <Row>
            {/* Title */}
            <div className="login-title">
                <div className="inner">
                    <h6><img src={require('../imgs/logo-mapleleaf.png')} alt="img_logo" /> ROYAL TOURS</h6>
                </div>
            </div>
            {/* Login Form */}
            <Col s={12}>
                <div className="login">
                    <h6>로그인</h6>
                    <br />
                    {msg}
                    {/* <form action={DatabaseConnectionHelper() + "LoginController.php"} method="POST"> */}
                    <form>
                        <input placeholder="아이디" type="text" name="id" id="input-id" ref={(obj) => this.idObj = obj}/> <br />
                        <input placeholder="비밀번호" type="password" name="password" id="input-pwd" ref={(obj) => this.pwdObj = obj}/><br /><br />
                        <input type="button" value="로그인" className="btn" id="btn-login" onClick={this.loginHandler}/>
                        <div className="dir-register">
                            <a href="/register">
                                <p>회원가입</p>
                            </a>
                        </div>
                    </form>
                </div>
            </Col>
            {/* Footer */}
            <Col s={12} className="login-footer">
                <p>Copyright © Vancouver Royal Tours All rights reserved.</p>
            </Col>
        </Row>
        );
    }

    //Login Button Event Handler
    loginHandler = () => {
        if(this.idObj.value !== "" && this.pwdObj.value !== ""){
            $.ajax({
                url: DatabaseConnectionHelper() + "LoginController.php",
                type: "POST",
                data: {
                    id: this.idObj.value,
                    password: this.pwdObj.value,
                },
                success: (result) => {
                    console.log(result);
                    if(result === "false"){
                        this.setState({
                            msg: <p id="msg-login-fail"><img src={require('../imgs/warning.png')} alt="img-warning"/>아이디나 비밀번호가 맞지 않습니다.</p>
                        });
                    }else{
                        var data = JSON.parse(result);

                        //Session
                        sessionStorage.setItem("id", data[0]);
                        sessionStorage.setItem("name", data[1]);
                        sessionStorage.setItem("department", data[2]);
                        sessionStorage.setItem("authorization", data[3]);

                        if(data[2] === "가이드"){
                            window.location.href = "/guide";
                        }else{
                            window.location.href = "/office";
                        }
                    }
                }
            });
        }else{
            this.setState({
                msg: <p id="msg-login-fail"><img src={require('../imgs/warning.png')} alt="img-warning"/>아이디와 비밀번호를 모두 입력해주세요.</p>
            });
        }
    }
}
