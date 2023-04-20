import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import Setting from './NavigationBar';
import '../css/guide.css';

import TourList from './TourList';

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

class GuideView extends Component {
  constructor(){
    super();

    //Display the error message
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
    return (
        <Row>
            <Setting authorization={this.state.authorization}/>
            <Col s={12}>
                <div className="guide-accounting-list">
                    <p>{this.state.name}님 환영합니다.</p>
                    {/* <Chart /> */}
                    <TourList authorization={false}/>
                </div>
            </Col>
        </Row>
    );
  }
}
export default GuideView;
