import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import NavBar from './NavigationBar';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import $ from 'jquery';

class ViewUserCodeManagement extends Component{
    constructor(){
        super();
            
        //Prevent unauthorized user to access data
        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getDepartment === null || (getDepartment !== null && getDepartment !== '어드민')){
            window.location.href = "/pagenotexist";
        }else{

            var temp = sessionStorage.getItem("msg");
            var msg = "";
            if(temp !== null && temp){
                msg = <p style={{color: "green", fontSize: "0.7em"}}>코드를 변경하였습니다.</p>;
            }
            sessionStorage.removeItem("msg");

            this.state = {
                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment,
                msg: msg,

                officecode: "",
                guidecode: "",
                admincode: "",
            }

            this.callData();
        }
    }
    render(){
        return(
            <Row>
                <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    <div className="usercode-management">
                        <div className="title">
                            <h6>직원 회원가입 코드 관리</h6>
                            <p>회원가입시 입력해야하는 코드를 변경할 수 있습니다.</p>
                        </div>
                        {this.state.msg}
                        <table>
                            <tbody>
                                <tr>
                                    <th>어드민</th>
                                    <td>
                                        <label style={{marginLeft: "20px"}}>현재코드: {this.state.admincode}</label><br />
                                        <input placeholder="새 어드민 코드 입력" type="text" id="input-code" ref={(obj) => this.adminObj = obj}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>오피스</th>
                                    <td>
                                        <label style={{marginLeft: "20px"}}>현재코드: {this.state.officecode}</label><br />
                                        <input placeholder="새 오피스 코드 입력" type="text" id="input-code" ref={(obj) => this.officeObj = obj}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>가이드</th>
                                    <td>
                                        <label style={{marginLeft: "20px"}}>현재코드: {this.state.guidecode}</label><br />
                                        <input placeholder="새 가이드 코드 입력" type="text" id="input-code" ref={(obj) => this.guideObj = obj}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="waves-effect waves-light btn" id="btn-save" onClick={this.saveCodeHandler}>
                            저장
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    callData = () => {
        //Get Guide Name
        fetch(DatabaseConnectionHelper() + "DisplayUserCodeController.php")
        .then(res => res.json())
        .then((result) =>
            this.setCodeData(result),
        );
    }

    setCodeData = (result) => {
        if(result !==""){
            var data = result;
            this.setState({
                admincode: data[0],
                officecode: data[1],
                guidecode: data[2],
            })
        }
    }

    saveCodeHandler = () => {
        //Send data to PHP
        $.ajax({
            url: DatabaseConnectionHelper() + "UpdateUserCodeController.php",
            type: "POST",
            data: {
                guide: this.guideObj.value,
                office: this.officeObj.value,
                admin: this.adminObj.value,
            },
            success: function(result){
                if(result === "111"){
                    sessionStorage.setItem("msg", true);
                }else{
                    sessionStorage.setItem("msg", false);
                }

                //Reload page
                window.location.reload(true);
            }
        });
    }
}

export default ViewUserCodeManagement;