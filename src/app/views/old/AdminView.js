import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import Setting from './NavigationBar';
import '../css/admin.css';

//Cookie
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

class AdminView extends Component {
  constructor(){
    super();

    var getId = getCookie("id");
    var getName = getCookie("name");
    var getDepartment = getCookie("department");
    var getAuthorization = getCookie("authorization");
    
    this.state = {
      id: getId,
      name: getName,
      department: getDepartment,
      authorization: getAuthorization
    }
  }

  render() {
    // Display Button by Authorization
    var authorized = [false, false, false, false];
    for(var idx=0; idx<4; idx++){
      if(this.state.authorization.charAt(idx) === "t"){
        authorized[idx] = true;
      }else if(this.state.authorization.charAt(idx) === "f"){
        authorized[idx] = false;
      }
    }

    var btnAuthorized = ["","","",""];
    //전체투어리스트, 투어결산/손익금, 항목별 결산, 투어추가

    if(authorized[0]){
      btnAuthorized[0] = 
        <Col s={3}>
          <a href="/total-tourlist">
            <div className="dir-btn">
              <img src={require('../imgs/tourlist_admin.png')} alt="img_tourlist" />
              <p>전체투어리스트</p>
            </div>
          </a>
        </Col>;
    }
    if(authorized[1]){
      btnAuthorized[1] =
        <Col s={3}>
          <a href="/monthly-netincome">
            <div className="dir-btn">
              <img src={require('../imgs/monthlyProfit.png')} alt="img_tourlist" />
              <p>투어결산/정산손익금</p>
            </div>
          </a>
        </Col>;
    }
    if(authorized[2]){
      btnAuthorized[2] =
        <Col s={3}>
          <a href="/yearly-netincome">
            <div className="dir-btn">
              <img src={require('../imgs/yearlyProfit.png')} alt="img_tourlist" />
              <p>항목별 결산</p>
            </div>
          </a>
        </Col>;
    }
    if(authorized[3]){
      btnAuthorized[3] = 
        <Col s={3}>
          <a href="/add-tour">
            <div className="dir-btn">
              <img src={require('../imgs/tourlist_add.png')} alt="img_tourlist" />
              <p>투어추가</p>
            </div>
          </a>
        </Col>;
    }

    return (
        <Row>
            <Setting authorization={this.state.authorization}/>
            <Col s={12}>
                <div className="admin-bg">

                  {/* User Information */}
                  <Row>
                    <div className="user-info">
                    <Col s={2}>
                      <img src={require('../imgs/man-user.png')} alt="user-icon" />
                    </Col>
                    <Col s={10}>
                      <span>{this.state.name}님 환영합니다.</span>
                    </Col>
                    </div>
                  </Row>

                  {/* Buttons */}
                  <Row>
                    {btnAuthorized[0]}
                    {btnAuthorized[1]}
                    {btnAuthorized[2]}
                    {btnAuthorized[3]}
                  </Row>
                </div>
            </Col>
        </Row>
    );
  }
}
export default AdminView;
