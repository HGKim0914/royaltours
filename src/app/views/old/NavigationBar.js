import React, {Component} from 'react';

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

class Setting extends Component{
  constructor(){
    super();

    //Display the error message
    var getDepartment = getCookie("department");
    this.state = {
      department: getDepartment,
    }
  }
  render(){
    const authorized = [false, false, false];
    const navItems = [];
    var i=0;
    for(var idx=4; idx<this.props.authorization.length; idx++){
      if(this.props.authorization[idx] === "t"){
        authorized[i] = true;
      }else if(this.props.authorization[idx] === "f"){
        authorized[i] = false;
      }
      i++;
    }
    
    //main item
    if(this.state.department === "가이드"){
      navItems.push(<li key="0"><a href="/guide">메인</a></li>);
    }else if(this.state.department === "오피스" || this.state.department === "어드민"){
      navItems.push(<li key="0"><a href="/admin">메인</a></li>);
    }else{
      navItems.push(<li key="0"><a href="/">메인</a></li>)
    }

    if(authorized[0])
      navItems.push(<li key="1"><a href="/setting-staff">직원관리</a></li>);
    if(authorized[1])
      navItems.push(<li key="2"><a href="/setting-management">환경설정</a></li>);
    if(authorized[2])
      navItems.push(<li key="3"><a href="/setting-com">컴조정</a></li>);

    return(
        <nav>
        <div className="nav-wrapper navigation-bar">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {navItems}
            <li><a href="/" onClick={removeAllCookies}>로그아웃</a></li>
          </ul>
        </div>
      </nav>
            
    );
  }
}

export default Setting;

function removeAllCookies(){
  if(getCookie("id")){
    deleteCookie("id");
  }
  if(getCookie("name")){
    deleteCookie("name");
  }
  if(getCookie("authorization")){
    deleteCookie("authorization");
  }
  if(getCookie("department")){
    deleteCookie("department");
  }
}