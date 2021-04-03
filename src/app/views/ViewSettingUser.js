import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import NavBar from './NavigationBar';
import '../css/Setting.css';
import $ from 'jquery';


import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import UserList from './UserList';

class ViewSettingUser extends Component{
    constructor(){
        super();

        //Prevent unauthorized user to access data
        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");
 
         if(getAuthorization === null|| (getAuthorization !== null && getAuthorization[0] !== 't')  || getId === ""){
             window.location.href = "/pagenotexist";
         }else{
            this.state = {
                data: [],
                deletedItems: [],
                changedPassword: [],
                changedAuthorization: [],
                changedCom: [],
    
                searchValue: "",
    
                //Error msg
                msgError: "",

                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment
            }

            this.callData();
         }
    }
    render(){
        return(
            <Row>
                <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    <div className="setting-user">
                        <div className="display">
                            <div className="title">
                                <div id="title">
                                    직원 정보 관리
                                    <br /><br />
                                    <span id="search">
                                        <label>찾고 계신 직원의 이름을 입력해주세요.</label><br />
                                        <span className="btn-search">
                                            <input type="text" id="input-search" value={this.state.searchValue} onChange={this.searchItemAddHandler}/>
                                            <div className="waves-effect waves-light" id="btn-search" onClick={this.searchItemHandler}>
                                                <img src={require('../imgs/search.png')} alt="img_logo" />
                                            </div>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            {this.state.msgError}
                            <UserList data={this.state.data} onChange={this.changeEventHandler}/>
                            <div className="save">
                                <a href="#title">
                                    <div className="waves-effect waves-light btn" id="btn-save" onClick={this.editItemHandler}>
                                        저장
                                    </div>
                                </a>
                                <a href="#title">
                                    <div className="waves-effect waves-light btn" id="btn-delete" onClick={this.deleteItemHandler}>
                                        선택된 항목 삭제
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    changeEventHandler = (obj) => {
        var item = obj.target.id.split("-");
        if(item[1] === "delete"){
            this.deleteItemAddHandler(obj);
        }else if(item[1] === "password"){
            this.editItemPasswordHandler(obj);
        }else if(item[1] === "authorization"){
            this.editItemAuthorizationHandler(obj);
        }else if(item[1] === "com"){
            this.editItemComHandler(obj);
        }
    }

    //EventHandler
    deleteItemAddHandler = (obj) => {
        var items = this.state.deletedItems;
        var temp = [];
        var exist = false;

        if(items.length > 0){
            for(var idx=0; idx<items.length; idx++){
                if(obj.target.name === items[idx]) exist = true;
                else temp.push(items[idx]);
            }
        }
        if(!exist) temp.push(obj.target.name);
        
        this.setState({
            deletedItems: temp,
            msgError: "",
        });
    }

    deleteItemHandler = () => {
        if(this.state.deletedItems.length === 0){
            this.setState({
                msgError: <p id="msg-warning"><img src={require('../imgs/warning.png')} alt="img-warning"/> 삭제할 아이템이 없습니다. </p>,
            });
        }else{
            $.ajax({
                url: DatabaseConnectionHelper() + "UserManagementController.php",
                type: "POST",
                data: {
                    items: this.state.deletedItems,
                },
                success: function(){
                    reloadePage();
                }
            });
        }
    }

    editItemPasswordHandler = (obj) => {
        var items = this.state.changedPassword;
        var temp = [];
        var exist = false;

        if(items.length > 0){
            for(var idx=0; idx<items.length; idx++){
                if(obj.target.name === items[idx][0]) {
                    exist = true;
                    items[idx][1] = obj.target.value;
                    temp.push(items[idx]);
                }
                else temp.push(items[idx]);
            }
        }
        // console.log(obj.target.name);
        if(!exist) temp.push([obj.target.name, obj.target.value]);
        this.setState({
            changedPassword: temp,
            msgError: "",
        });
    }
    
    editItemComHandler = (obj) => {
        var items = this.state.changedCom;
        var temp = [];
        var exist = false;

        if(items.length > 0){
            for(var idx=0; idx<items.length; idx++){
                if(obj.target.name === items[idx][0]) {
                    exist = true;
                    items[idx][1] = obj.target.value;
                    temp.push(items[idx]);
                }
                else temp.push(items[idx]);
            }
        }

        // console.log(obj.target.name);
        if(!exist) temp.push([obj.target.name, obj.target.value]);
        this.setState({
            changedCom: temp,
            msgError: "",
        });
    }

    editItemAuthorizationHandler = (obj) => {
        var items = this.state.changedAuthorization;
        var temp = [];
        var exist = false;
        var data = obj.target.name.split("-");

        if(items.length > 0){
            for(var idx=0; idx<items.length; idx++){
                //If ID already exist in the array
                if(data[0] === items[idx][0]){
                    exist = true;
                    var temp3 = "";
                    var temp4 = items[idx][1];
                    for(var x=0; x<temp4.length; x++){
                        //If the index of authorization stored in array does not match with the index of data called
                        if(x.toString() !== data[2]){
                            temp3 += temp4[x];
                        }else{
                            //If matches
                            if(temp4[x] === "t"){
                                temp3 += "f";
                            }else if(temp4[x] === "f"){
                                temp3 += "t";
                            }
                        }
                    }
                    temp.push([items[idx][0], temp3]);
                }else{
                    temp.push(items[idx]);
                }
            }
        }

        if(!exist){
            var ind = data[2];
            var temp2 = "";
            for(idx=0; idx<data[1].length; idx++){
                if(idx.toString() !== ind){
                    temp2 += data[1][idx];
                }else{
                    if(data[3] === "t"){
                        temp2 += "f";
                    }else if(data[3] === "f"){
                        temp2 += "t";
                    }
                }
            }
            temp.push([data[0],temp2]);
        }

        this.setState({
            changedAuthorization: temp,
            msgError: "",
        });
    }

    editItemHandler = () => {
        if(this.state.changedAuthorization.length === 0 && this.state.changedPassword.length === 0 && this.state.changedCom.length === 0){
            this.setState({
                msgError: <p id="msg-warning"><img src={require('../imgs/warning.png')} alt="img-warning"/> 변경할 아이템이 없습니다. </p>,
            });
        }else{
            $.ajax({
                url: DatabaseConnectionHelper() + "/UserManagementController.php",
                type: "POST",
                data: {
                    authorization: this.state.changedAuthorization,
                    password: this.state.changedPassword,
                    com: this.state.changedCom
                },
                success: function(result){
                    alert("성공적으로 데이터가 업데이트 되었습니다.");
                    reloadePage();
                }
            });
        }
    }

    searchItemAddHandler = (obj) => {
        this.setState({
            searchValue: obj.target.value,
        })
    }
    searchItemHandler = () => {
        var item = this.state.searchValue;

        window.location.href = "#" + item;

        var exist = false;
        for(var idx=0; idx<this.state.data.length; idx++){
            if(item === this.state.data[idx][1]){
                exist = true;
            }
        }
        if(exist){
            this.setState({
                msgError: "",
            })
        }else{
            this.setState({
                msgError: <p id="msg-warning"><img src={require('../imgs/warning.png')} alt="img-warning"/> 선택한 아이템이 존재하지 않습니다. </p>,
            })
        }

        this.setState({
            searchValue: "",
        })
    }

    //Call Data
    callData = () => {
        fetch(DatabaseConnectionHelper() + "DisplayUserController.php")
            .then(res => res.json())
            .then((result) => this.setState({
                data: result,
            })
        );
    }

    //CSS
    removeUnderline = (obj) => {
    }

}

export default ViewSettingUser;

// JavaScript
function reloadePage(){
    window.location.reload(true);
}