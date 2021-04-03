import React, {Component} from 'react';
import {Row, Col, Table} from 'react-materialize';
import NavBar from './NavigationBar';
import '../css/App.css';
import { isString } from 'util';
import $ from 'jquery';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';

class ViewMyAccount extends Component{
    constructor(){
        super();

        //Prevent unauthorized user to access data
        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");
        
        var getMsg = sessionStorage.getItem("msgComplete");
        sessionStorage.removeItem("msgComplete");

        if(getId === ""){
            window.location.href = "/pagenotexist";
        }else{
            var msg = "";
            if(getMsg === "success"){
                msg = <div id="msg-pwdSaved">비밀번호를 성공적으로 저장했습니다.</div>;
            }
            this.state = {
                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment,

                pwd: "",
                pwd2: "",
    
                //Msg
                msgPwdValidation: "",
                msgPwdNotMatching: "",
                msgPwdSaved: msg,
    
                //Validation
                pwdValidation: false,
                pwdMatching: false,
            }
        }
    }
    render(){
        return(
            <Row>
                 <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    <div className="myaccount">
                        <div className="title">
                            <h6>My Account</h6>
                            <p>
                                <span id="name">{this.state.name}</span>님의 계정 정보입니다.
                            </p>
                        </div>
                        
                        <div className="user-info">
                        {this.state.msgPwdSaved}
                            <Table>
                                <tbody>
                                    <tr>
                                        <td id="title">사용자 이름</td>
                                        <td id="desc">{this.state.name}</td>
                                    </tr>
                                    <tr>
                                        <td id="title">사용자 아이디</td>
                                        <td id="desc">{this.state.id}</td>
                                    </tr>
                                    <tr id="password">
                                        <td id="title">비밀번호 변경</td>
                                        <td id="desc">
                                            <input placeholder="비밀번호" type="password" name="password" id="input-pwd" onChange={this.pwdValidation}/><br />
                                            {this.state.msgPwdValidation}
                                            <input placeholder="비밀번호 확인" type="password" name="password2" id="input-pwd-confirm" onChange={this.pwdValidation}/>
                                            {this.state.msgPwdNotMatching}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="title">부서명</td>
                                        <td id="desc">{this.state.department}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="waves-effect waves-light btn" id="btn-save" onClick={this.savePassword}>
                                저장
                            </div>
                        </div>
                        
                    </div>
                </Col>
            </Row>
        );
    }

    //Save Event Handler
    savePassword = () => {
        if(this.state.pwdValidation && this.state.pwdMatching){
            if(this.state.pwd !== "" && this.state.pwd2 !== ""){
                //Save password
                $.ajax({
                    url: DatabaseConnectionHelper() + "MyAccountManagementController.php",
                    type: "POST",
                    data: {
                        id: this.state.id,
                        password: this.state.pwd,
                    },
                    success: function(){
                        sessionStorage.setItem("msgComplete", "success");
                        reloadePage();
                    }
                });
            }
        }else{
            this.setState({
                msgPwdSaved: <div id="msg-pwdValidation"><img src={require('../imgs/warning.png')} alt="img-warning"/> 비밀번호를 저장할 수가 없습니다.</div>,
            });
        }
    }
    //Pasword validation. If incorrect, message pop up
    pwdValidation = (props) => {
        var pwd, pwd2;

        //First password Entered - Check if validate
        if(props.target.name === "password"){
            if(props.target.value !== ""){
                this.setState({
                    pwd: props.target.value,
                })

                pwd = props.target.value;
                var containNum = false;
                var containLetter = false;
                var validPwd = false;

                //Check if password contains number and letter
                for(var idx=0; idx<pwd.length; idx++){
                    if(!isNaN(pwd[idx])) containNum = true;
                    else if(isString(pwd[idx])) containLetter = true;
                }

                //Check if validate
                if(containLetter && containNum && pwd.length >= 8){
                    validPwd = true;
                }else{
                    validPwd = false;
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
            }
        }

        //If the second password entered
        if(props.target.name === "password2"){
            if(props.target.value !== ""){
                this.setState({
                    pwd2: props.target.value,
                })

                pwd2 = props.target.value;

                //If also the first password entered - check if matches
                if(this.state.pwd !== ""){
                    if(this.state.pwd === pwd2){
                        this.setState({
                            msgPwdNotMatching: "",
                            pwdMatching: true,
                        })
                    }else{
                        this.setState({
                            msgPwdNotMatching: <div id="msg-pwdValidation"><img src={require('../imgs/warning.png')} alt="img-warning"/> 비밀번호가 일치하지 않습니다.</div>,
                            pwdMatching: false,
                        })
                    }
                //If the first password not entered
                }else{
                    if(this.state.pwd === ""){
                        this.setState({
                            msgPwdValidation: <div id="msg-pwdValidation"><img src={require('../imgs/warning.png')} alt="img-warning"/> 필수 정보입니다.</div>,
                            pwdValidation: false,
                        })
                    }else{
                        this.setState({
                            msgPwdValidation: "",
                            pwdValidation: false,
                        })
                    }
                }
            }
        }
    }
}

export default ViewMyAccount;

// JavaScript
function reloadePage(){
    window.location.reload(true);
}
