import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import '../css/Login.css';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import $ from 'jquery';
import { isString } from 'util';

class ViewRegister extends Component{
    state = {
        id: "",
        pwd: "",
        pwd2: "",
        name: "",
        code: "",

        pwdValidation: false,
        msgPwdValidation: "",
        msgRegistration: "",
    }
    render(){
        var msgPwdNotMatching = "";
        var msgPwdValidation = "";


        if(this.state.msgPwdValidation !== ""){
            msgPwdValidation = this.state.msgPwdValidation;
        }

        //If also the first password input entered - check if matches
        if(this.state.pwd !== "" && this.state.pwd2 !== ""){
            if(this.state.pwd === this.state.pwd2){
                msgPwdNotMatching = "";
            }else{
                msgPwdNotMatching = <div id="msg-pwdValidation"><img src={require('../imgs/warning.png')} alt="img-warning"/> 비밀번호가 일치하지 않습니다.</div>
            }
        }else if(this.state.pwd === "" && this.state.pwd2 !== ""){
            msgPwdValidation = <div id="msg-pwdValidation"><img src={require('../imgs/warning.png')} alt="img-warning"/> 필수 정보입니다.</div>;
        }

        return(
            <Row>
                {/* Title */}
                <div className="register-title">
                    <div className="inner">
                        <a href="/">
                            <h6><img src={require('../imgs/logo-mapleleaf.png')} alt="img_logo" /> ROYAL TOURS</h6>
                        </a>
                    </div>
                </div>

                {/* Body */}
                <Col s={12}>
                    <div className="register">
                        <h6>회원가입</h6>
                        <br />
                        {this.state.msgRegistration}
                        <form>
                            <label>아이디</label>
                            <input type="text" name="id" id="input-id" value={this.state.id} onChange={this.updateId}/> 

                            <label>비밀번호</label>
                            <input type="password" name="password" id="input-pwd" value={this.state.pwd} onChange={this.updatePwd}/> 
                            {/* Check if password is valid */}
                            {msgPwdValidation}
                            
                            <label>비밀번호 확인</label>
                            <input type="password" name="password2" id="input-pwd2" value={this.state.pwd2} onChange={this.updatePwd2}/> 
                            {msgPwdNotMatching}

                            <label>이름</label>
                            <input type="text" name="name" id="input-name" value={this.state.name} onChange={this.updateName}/> 

                            <label>인증코드</label>
                            <input type="password" name="code" id="input-code" value={this.state.code} onChange={this.updateCode}/> 

                            <br /><br />
                            <input type="button" value="회원가입" id="btn-register" className="btn" onClick={this.registerEventHandler} />
                        </form>
                    </div>
                </Col>
            </Row>
        );
    }

    // Update Event Handler
    updateId = (event) => {
        //Only English and Number
        const re = /^[A-Za-z0-9]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({
                id: event.target.value.trim(),
            });
        }
    }
    updatePwd = (event) => {
        //Validate pwd
        var pwd = event.target.value;
        var containNum = false;
        var containLetter = false;
        var validPwd = false;

        //Check if password contains number and letter
        for(var idx=0; idx<pwd.length; idx++){
            if(!isNaN(pwd[idx])) containNum = true;
            else if(isString(pwd[idx])) containLetter = true;
        }

        if(containLetter && containNum && pwd.length >= 8){
            validPwd = true;
        }

        if(!validPwd){
            this.setState({
                msgPwdValidation: <div id="msg-pwdValidation"><img src={require('../imgs/warning.png')} alt="img-warning"/> 8자 이상의 문자, 숫자를 사용하세요.</div>,
                pwdValidation: false,
            })
        }else{
            this.setState({
                msgPwdValidation: "",
                pwdValidation: true,
            })
        }
        
        this.setState({
            pwd: event.target.value.trim()
        })
    }
    updatePwd2 = (event) => {
        this.setState({
            pwd2: event.target.value.trim(),
        })
    }
    updateName = (event) => {
        this.setState({
            name: event.target.value.trim()
        })
    }
    updateCode = (event) => {
        this.setState({
            code: event.target.value.trim(),
        })
    }

    registerEventHandler = () => {
        if(this.state.id === ""){
            this.setState({
                msgRegistration: <p id="msg-inputValidation">아이디를 입력해주세요.</p>
            });
        }else if(this.state.pwd === ""){
            this.setState({
                msgRegistration: <p id="msg-inputValidation">비밀번호를 입력해주세요.</p>
            });
        }else if(this.state.pwd2 === ""){
            this.setState({
                msgRegistration: <p id="msg-inputValidation">비밀번호를 입력해주세요.</p>
            });
        }else if(this.state.name === ""){
            this.setState({
                msgRegistration: <p id="msg-inputValidation">이름을 입력해주세요.</p>
            });
        }else if(this.state.code === ""){
            this.setState({
                msgRegistration: <p id="msg-inputValidation">회원가입 코드를 입력해주세요.</p>
            });
        }else{
            if(this.state.pwd !== this.state.pwd2 || this.state.pwdValidation === false){
                this.setState({
                    msgRegistration: <p id="msg-inputValidation">비밀번호를 확인해주세요.</p>
                })
            }else{
                //Input Validation in client side completed!
                $.ajax({
                    url: DatabaseConnectionHelper() + "RegistrationController.php",
                    type: "POST",
                    data: {
                        id: this.state.id,
                        password: this.state.pwd,
                        name: this.state.name,
                        code: this.state.code
                    },
                    success: (result) => {
                        var data;
                        console.log(result);
                        // if(isJson(result))
                            data = JSON.parse(result);

                        if(data === "1"){
                            //User id already exists
                            this.setState({
                                msgRegistration: <p id="msg-inputValidation">아이디가 이미 존재합니다.</p>
                            })
                        }else if(data === "2"){
                            //Code does not exist
                            this.setState({
                                msgRegistration: <p id="msg-inputValidation">입력하신 회원가입 코드가 존재하지 않습니다.</p>
                            })
                        }else if(data === "3"){
                            //Registeration Failed
                            //Session
                            sessionStorage.setItem("registration-msg", data);
                            window.location.replace("/");
                        }else if(data === "4"){
                            //Registered Successfully
                            //Session
                            sessionStorage.setItem("registration-msg", data);
                            window.location.replace("/");
                        }
                    }
                });
            }
        }
    }
}

export default ViewRegister;
