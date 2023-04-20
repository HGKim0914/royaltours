import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import '../css/login.css';

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


class LoginView extends Component {
  state = {
    invalidLoginAttemp: "",
  }
  componentDidMount(){
    //Display the error message
    var getMsg = getCookie("invalidLogin");
    var getLoginStatus = getCookie("error-msg");
    if(getMsg !== ""){
      this.setState({
        invalidLoginAttemp: <p style={{fontSize: '0.8em', color: 'red'}}>아이디나 비밀번호가 맞지 않습니다.</p>,
      })
      deleteCookie("invalidLogin");
    }
    //After register
    else if(getLoginStatus === "3"){
      this.setState({
        invalidLoginAttemp: <p style={{fontSize: '0.8em', color: 'green'}} >회원가입이 완료되었습니다.</p>,
      });
      deleteCookie("error-msg");
    }else if(getLoginStatus === "4"){
      this.setState({
        invalidLoginAttemp: <p style={{fontSize: '0.8em', color: 'red'}} >회원가입에 실패했습니다.</p>,
      });
      deleteCookie("error-msg");
    }
  }
  render() {
    

    return (
        <Row>
            <Col s={12} className="login">
                <h6>로얄투어 정산 시스템</h6>
                <form action="http://localhost:8888/UserLoginValidation.php" method="POST">
                  <div>
                    {this.state.invalidLoginAttemp}
                    <input placeholder="아이디" type="text" name="id" /><br />
                    <input placeholder="비밀번호" type="password" name="password"  /><br />
                    <input type="submit" value="로그인" className="btn login-btn" style={{background:'rgb(51, 103, 175)'}} />
                    <p>OR</p>
                    <a href="/register"><p>회원가입</p></a>
                  </div>
                </form>
                <p className="login-footer">Copyright © Vancouver Royal Tours All rights reserved.</p>
            </Col>
        </Row>
    );

  }
}

export default LoginView;
