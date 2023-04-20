import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import { isString } from 'util';

//Getting the response message from the database
function getCookie(data){
  var msg = data + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var temp = decodedCookie.split(';');
  for(var idx=0; idx<temp.length; idx++){
    var temp2 = temp[idx];
    while(temp2.charAt(0) === ' '){
      temp2 = temp2.substring(1);
    }
    if(temp2.indexOf(msg)===0){
      return temp2.substring(msg.length, temp2.length);
    }
  }
  return "";
}

function deleteCookie(data){
  document.cookie = data + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

class RegisterView extends Component {
  state = {
    password: null,
    password2: null,
    passwordNotValid: null,
    passwordNotMatching: null,
    submitBtn: null,

    //Get input value - display when data sent back from server
    id: "",
    name: "",
    code: "",

    //Msg-id error
    invalidInputErrorMsg: "",
  }

  componentDidMount(){
    this.setState({
      submitBtn: this.submitBtn,
    })
    //Display ID error message
    var getMsg = getCookie("error-msg");
    var getId = getCookie("id");
    var getName = getCookie("name");
    var getCode = getCookie("code");


    if(getMsg !== ""){
      if(getMsg === "1"){
        this.setState({
          invalidInputErrorMsg: <p id="msg-validation">사용하는 아이디 입니다.</p>,
        });

        if(getId !== "" && getName !== "" && getCode !== ""){
          this.setState({
            name: getName,
            code: getCode,
          });
        }
        deleteCookie("id");
        deleteCookie("name");
        deleteCookie("code");
      }else if(getMsg === "2"){
        this.setState({
          invalidInputErrorMsg: <p id="msg-validation">사용할 수 없는 코드입니다.</p>,
        });
        
        if(getId !== "" && getName !== "" && getCode !== ""){
          this.setState({
            name: getName,
            id: getId,
          });
        }
        deleteCookie("id");
        deleteCookie("name");
        deleteCookie("code");
      }
      
      deleteCookie("error-msg");
    }
  }

  InputHandler = (event) => {
    if(event.target.name === "id"){
      this.setState({
        id: event.target.value,
      })
    }else if(event.target.name === "name"){
      this.setState({
        name: event.target.value,
      })
    }else if(event.target.name === "code"){
      this.setState({
        code: event.target.value,
      })
    }
  }
  
  render() {
    return (
        <Row>
            <Col s={12} className="registration">
            <form action="http://localhost:8888/Registration.php" method="POST" >
              <div onClick={this.PasswordValidation} onChange={this.PasswordValidation}>
                  {this.state.invalidInputErrorMsg}
                  <input placeholder="아이디" name="id" value={this.state.id} onChange={this.InputHandler} type="text" ref={(obj) => this.id = obj}/><br />
                  <input placeholder="비밀번호" type="password" name="password" ref={(input)=> this.pwd = input}/><br />
                  {this.state.passwordNotValid}
                  <input placeholder="비밀번호 확인" type="password" name="password2" ref={(input)=> this.pwd2 = input}/><br />
                  {this.state.passwordNotMatching}
                  <input placeholder="이름" type="text" name="name" value={this.state.name} onChange={this.InputHandler} ref={(obj) => this.name = obj}/><br />
                  <input placeholder="인증코드" type="password" name="code" value={this.state.code} onChange={this.InputHandler} ref={(obj) => this.code = obj}/><br />
                  <input type="submit" value="회원가입" className="btn register-btn" style={{background:'rgb(51, 103, 175)'}} ref={(obj)=> this.submitBtn = obj} disabled />
              </div>
            </form>
            <p className="registration-footer">Copyright © Vancouver Royal Tours All rights reserved.</p>
            </Col>
        </Row>
    );
  }
  InputValidation = () => {
    //모든창이 입력이되었을 경우
    var submitBtn = this.state.submitBtn;
    if(this.state.passwordNotMatching === null 
      && this.state.passwordNotValid === null
      && this.id.value !== ""
      && this.name.value !== ""
      && this.code.value !== ""
      && this.password !== ""){
      submitBtn.disabled = false;
      //모든창이 입력이 되지 않았을 경우
    }else{
      submitBtn.disabled = true;
    }
  }

  PasswordValidation = () => {
    var password, password2;
    
    //첫번째 비밀번호입력되었을 경우 - 사용할수있는 비밀번호인지 확인
    if(this.pwd.value !== ""){
      password = this.pwd.value;
      var containNum = false;
      var containLetter = false;
      var validPwd = false;

      for(var idx=0; idx< password.length; idx++){
        if(!isNaN(password[idx]))containNum = true;
        else if(isString(password[idx])) containLetter = true;
      }

      if(containNum && containLetter && password.length >= 8){
        validPwd = true;
      }else{
        validPwd = false;
      }

      if(!validPwd){
        this.setState({
          passwordNotValid: <p id="pwd-validation">8자 이상의 문자, 숫자를 사용하세요.</p>
        });
      }else{
        this.setState({
          passwordNotValid: null,
        })
      }

      //비밀번호 매칭 확인
      if(this.pwd2.value !== ""){
        password2 = this.pwd2.value;
        if(password === password2){
          this.setState({
            passwordNotMatching: null,
          })
        }else{
          this.setState({
            passwordNotMatching: <p id="pwd-validation">비밀번호가 일치하지 않습니다.</p>,
          })
        }
      }
    }else{
      if(this.pwd2.value !== ""){
        this.setState({
          passwordNotValid: <p id="pwd-validation">필수 정보입니다.</p>
        })
      }else{
        this.setState({
          passwordNotValid: null,
        })
      }
    }

    this.InputValidation();
  }
}

export default RegisterView;
