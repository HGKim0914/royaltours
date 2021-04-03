import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import NavBar from './NavigationBar';
import '../css/Office.css';

class ViewOffice extends Component{
    constructor(){
        super();

        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getAuthorization === null || (getDepartment !== null && getDepartment === "가이드") || getId === null){
            //If user not signed in - redirect to error page
            window.location.href ="/pagenotexist";
        }else{
            this.state = {
                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment
            }
        }
    }

    render(){
        //Authorization
        var authorized = [false, false, false, false];
        const authorization = [];
        for(var idx=0; idx<authorized.length; idx++){
            if(this.state.authorization.charAt(idx+3) === "t"){
                authorized[idx] = true;
            }else if(this.state.authorization.charAt(idx+3) === "f"){
                authorized[idx] = false;
            }
        }
        
        if(authorized[0]){
            authorization.push(
                <Col s={4} key="tourlist">
                    <a href="/total-tourlist">
                        <div className="dir-btn">
                            <img src={require('../imgs/tourlist_admin.png')} alt="img-btn"/>
                            <p>전체투어리스트</p>
                        </div>
                    </a>
                </Col>
            );
        }
        
        if(authorized[1]){
            authorization.push(
                <Col s={4} key="monthly">
                    <a href="/monthly-report">
                        <div className="dir-btn">
                            <img src={require('../imgs/monthlyProfit.png')} alt="img-btn"/>
                            <p>투어결산/정산손익금</p>
                        </div>
                    </a>
                </Col>
            );
        }

        if(authorized[2]){
            authorization.push(
                <Col s={4} key="add">
                    <a href="/addtour">
                        <div className="dir-btn">
                            <img src={require('../imgs/tourlist_add.png')} alt="img-btn"/>
                            <p>투어추가</p>
                        </div>
                    </a>
                </Col>
            );
        }

        return(
            <Row>
                 <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    <div className="office">
                        <div className="side-navbar">
                            {authorization}    
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ViewOffice;
