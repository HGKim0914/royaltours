import React, {Component} from 'react';
import {Row, Col, Table} from 'react-materialize';
import NavBar from './NavigationBar';
import '../css/Setting.css';
import $ from 'jquery';

import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';

class ViewSettingCom extends Component{
    constructor(){
        super();

        //Prevent unauthorized user to access data
        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");


        if(getAuthorization === null|| (getAuthorization !== null && getAuthorization[2] !== 't') || getId === ""){
            window.location.href = "/pagenotexist";
        }else{
            var selectedItem = "쇼핑";
            var getSelectedItem = getCookie("currentoption");
            if(getSelectedItem !== ""){
                if(getSelectedItem === '"optiontour"'){
                    selectedItem = "옵션"
                }else if(getSelectedItem === '"tccom"'){
                    selectedItem = "TC";
                }
                deleteCookie("currentoption");
            }
    
            this.state = {
                edit: false,
                selectedItem: selectedItem,
                data: [],
                updatedCom: [],

                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment
            }
            this.callData(this.state.selectedItem);
        }

    }
    
    render(){
        const msgWarning = [];
        if(this.state.edit){
            msgWarning.push(<p key="1"><img src={require('../imgs/warning.png')} alt="img-warning"/> 변경내용을 저장하려면 '저장'버튼을 눌러주세요.</p>);
        }
        return(
            <Row>
                <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    <div className="setting-com">
                        <div className="title">
                            <h6>컴관리</h6>
                        </div>
                        <div className="option">
                            <label>컴조정 관리</label>
                            <select value={this.state.selectedItem} className="browser-default" id="input-option" onChange={this.changeOption}>
                                <option value="쇼핑">쇼핑</option>
                                <option value="TC">TC</option>
                            </select>
                        </div>
                        <div className="display">
                            {msgWarning}
                            <List name={this.state.selectedItem} data={this.state.data} edit={this.state.edit} onClick={this.clickEventHandler} onChange={this.updateCom}/>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    clickEventHandler = (props) => {
        if(props.target.id === "btn-edit"){
            this.editEventHandler();
        }else if(props.target.id === "btn-save"){
            this.saveEventHandler();
        }
    }

    //EditEventHandler
    editEventHandler = () => {
        this.setState({
            edit: !this.state.edit,
        })
    }

    updateCom = (props) => {
        //Update com
        if(props.target.value !== "tc"){
            var com = this.state.updatedCom;
            var ind = -1;
            //If updatedcom array already exists
            for(var idx=0; idx<com.length; idx++){
                if(com[idx][0] === props.target.name){
                    //exists
                    ind = idx;
                    break;
                }
            }
            if(ind !== -1){
                com[ind][1] = props.target.value;
            }else{
                com.push([props.target.name, props.target.value]);
            }

            this.setState({
                updateCom: com
            })
        }
    }
    //SaveEventHandler
    saveEventHandler = () => {
        if(this.state.updatedCom.length !== 0){
            var option = "";
            if(this.state.selectedItem === "쇼핑"){
                option = "shoppinglist";
            }else if(this.state.selectedItem === "TC"){
                option = "tccom";
            }

            $.ajax({
                url: DatabaseConnectionHelper() + "UpdateComController.php",
                type: "POST",
                data: {
                    option: option,
                    items: this.state.updatedCom
                },
                success: function(result){
                    setCookie("currentoption", result);
                    reloadePage();
                }
            })
        }
    }

    //OptionEventHandler
    changeOption = (obj) => {
        console.log(obj.target.value);
        this.callData(obj.target.value);
        this.setState({
            selectedItem: obj.target.value,
            updatedCom: [],
            edit: false
        });

    }
    //Get data from database
    callData = (data) => {
        if(data === "쇼핑"){
            fetch(DatabaseConnectionHelper() + "DisplayShoppingComController.php")
            .then(res => res.json())
            .then((result) => this.displayData(result)
            );
        }else if(data === "TC"){
            fetch(DatabaseConnectionHelper() + "DisplayTCComController.php")
            .then(res => res.json())
            .then((result) => this.displayData(result)
            );
        }
    }
    displayData = (data) => {
        this.setState({
            data: data,
        })
    }
}

export default ViewSettingCom;

const List = (props) => {
    const comp = [];
    for(var idx=0; idx<props.data.length; idx++){
        //If last block
        if(idx === props.data.length - 1){
            comp.push(<Data key={idx} data={props.data[idx]} edit={props.edit} onChange={props.onChange} lastBlock={true} onClick={props.onClick}/>);
        }else{
            comp.push(<Data key={idx} data={props.data[idx]} onChange={props.onChange} edit={props.edit}/>);
        }
    }

    var com = "회사 컴비율(%)";
    if(props.name === "TC"){
        com = "컴비율(%)";
    }

    return(
        <Table>
            <thead>
                <tr>
                    <th>{props.name}</th>
                    <th>{com}</th>
                    <th id="empty"></th>
                </tr>
            </thead>
            <tbody>
                {comp}
            </tbody>
        </Table>
    );
}

class Data extends Component{
    state = {
        btnMode: "수정모드",
    }
    render(){
        const com = [];
        //Edit mode
        if(this.props.edit){
            com.push(<label key="1">{this.props.data[1] + "% ->"}</label>);
            com.push(<br key="2"/>);
            com.push(<input key="3" type="number" name={this.props.data[2]} id="input-com" onChange={this.props.onChange}/>);
        }else{
            com.push(this.props.data[1]+"%");
        }

        //Button
        const lastBlock = [];
        if(this.props.lastBlock){
            lastBlock.push(
                <td id="empty" key="1">
                    <div className="waves-effect waves-light btn" id="btn-edit" onClick={this.updateBtnModeHandler}>
                        {this.state.btnMode}
                    </div>
                    <div className="waves-effect waves-light btn" id="btn-save" onClick={this.props.onClick}>
                        저장
                    </div>
                </td>
            );
        }else{
            lastBlock.push(
                <td id="empty" key="1">
                </td>
            )
        }

        var name = this.props.data[0];
        if(this.props.data[0] === "1"){
            name = "TC 컴비율";
        }

        return(
            <tr>
                <td id="list">{name}</td>
                <td id="com">
                    {com}
                </td>
                {lastBlock}
            </tr>
        );
    }

    updateBtnModeHandler = (obj) => {
        this.props.onClick(obj);
        if(this.props.edit){
            this.setState({
                btnMode:"수정모드",
            });
        }else{
            this.setState({
                btnMode:"일반모드",
            });
        }
    }
}

// JavaScript
function reloadePage(){
    window.location.reload(true);
}

function setCookie(cname, cvalue){
    var d = new Date();
    d.setTime(d.getTime() + (5*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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