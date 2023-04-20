import React, { Component } from 'react';
import {Row, Col, Table, TextInput, Button} from 'react-materialize';
import '../css/setting.css';
import Setting from './NavigationBar';

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

class SettingCom extends Component{
    constructor(){
        super();

        //Get cookie
        var getId = getCookie("id");
        var getName = getCookie("name");
        var getDepartment = getCookie("department");
        var getAuthorization = getCookie("authorization");

        this.state = {
            selectedItem: "쇼핑",
            data: [],
            com: [],

            id: getId,
            name: getName,
            department: getDepartment,
            authorization: getAuthorization,
        }

        this.callData(this.state.selectedItem);
    }

    //Get data from database
    callData = (data) => {
        if(data === "쇼핑"){
            //Connection with php and get data
            fetch("http://localhost:8888/DisplayShoppingCom.php")
            .then(res => res.json())
            .then((result) => 
                this.displayData(result)
            );

            fetch("http://localhost:8888/DisplayTCCom.php")
            .then(res => res.json())
            .then((result) => 
                this.displayCom(result)
            );

        }else if(data === "옵션"){
            //Connection with php and get data
            fetch("http://localhost:8888/DisplayRestaurantManagement.php")
            .then(res => res.json())
            .then((result) => 
                this.displayData(result)
            );
        }
    }

    displayData = (data) => {
        this.setState({
            data: data,
        });
    }
    displayCom = (data) => {
        this.setState({
            com: data[0][0]
        });
    }

    render(){
        var tc = [false, ""];

        // When user change the list, reload the table with the new data
        if(this.state.selectedItem === "쇼핑"){
            tc = [true, this.state.com[0]];
        }
        return (
            <Row>
                <Setting authorization={this.state.authorization}/>
                <Col s={12}>
                    <div className="setting-com-list">
                        <h6>컴조정</h6>

                        {/* Select List */}
                        <Row>
                            <Col s={12}>
                                <div className="com-select">
                                    <label>컴관리 선택</label>
                                    <select className="browser-default" onChange={this.changeManagementOption}>
                                        <option defaultValue="쇼핑">쇼핑</option>
                                        <option value="옵션">옵션</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        
                        <List title={this.state.selectedItem + " 관리"} name={this.state.selectedItem} data={this.state.data} tc={tc} />
                    </div>
                </Col>
            </Row>
        );
    }

    changeManagementOption = (event) => {
        this.setState({
            selectedItem: event.target.value,
        });
    }
}

export default SettingCom;

const List = (props) => {
    var tc = "";
    if(props.tc[0]){
        tc = <DisplayTC tc={props.tc[1]}/>
    }
    return(
        <Row>
            <div className="title">
                {props.title}
            </div>
            <div className="frame">
                <DisplayTable name={props.name} data={props.data}/>
                {/* Display T/C in case of shopping com list */}
                {tc}

                {/* Save */}
                <Button waves="light" id="save-btn" style={{marginRight: '5px' , marginTop: '25px', width: "150px"}}>
                    저장
                </Button>
            </div>
        </Row>
    );
}

const DisplayTable = (props) => {

    const component = [];
    for(var idx=0; idx<props.data.length; idx++){
        component.push(<DisplayComponent key={idx} list={props.data[idx][0]} com={props.data[idx][1]}/>)
    }

    return(
        <Table>
            <thead>
                <tr>
                    <th data-field="name" id="name">{props.name}</th>
                    <th data-field="com" id="com">회사 컴비율</th>
                </tr>
            </thead>
            <tbody>
                {component}
            </tbody>
        </Table>
    );
}
//Display Component
const DisplayComponent = (props) => {
    return(
        <tr>
            <td>{props.list}</td>
            <td><TextInput value={props.com} id="com-proportion" /></td>
        </tr>
    );
}
//Display T/C
const DisplayTC = (props) => {
    return(
        <Table>
            <thead>
                <tr>
                    <th>T/C</th>
                    <th>컴비율</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>T/C 컴비율</td>
                    <td><TextInput value={props.tc} id="com-proportion" /></td>
                </tr>
            </tbody>
        </Table>
    );
}