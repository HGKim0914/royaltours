import React, { Component } from 'react';
import {Row, Col, Table, Checkbox, TextInput, Button, Select} from 'react-materialize';
import '../css/setting.css';
import Setting from './NavigationBar';
import $ from 'jquery';

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
  

class SettingManagement extends Component{
    constructor(){
        super();

        //Get cookie
        var getId = getCookie("id");
        var getName = getCookie("name");
        var getDepartment = getCookie("department");
        var getAuthorization = getCookie("authorization");

        var selectedItem = "쇼핑";
        var getSelectedItem = getCookie("currentOption");
        if(getSelectedItem !== ""){
            selectedItem = getSelectedItem;
            deleteCookie("currentOption");
        }

        this.state = {
            selectedItem: selectedItem,

            id: getId,
            name: getName,
            department: getDepartment,
            authorization: getAuthorization,

            data: [],
        }

        this.callData(this.state.selectedItem);
    }

    callData = (data) => {
        if(data === "쇼핑"){
            //Connection with php and get data
            fetch("http://localhost:8888/DisplayShoppingManagement.php")
            .then(res => res.json())
            .then((result) => 
                this.displayData(result)
            );
        }else if(data === "레스토랑"){
            //Connection with php and get data
            fetch("http://localhost:8888/DisplayRestaurantManagement.php")
            .then(res => res.json())
            .then((result) => 
                this.displayData(result)
            );
        }else if(data === "옵션"){
            //Connection with php and get data
            fetch("http://localhost:8888/DisplayOptionManagement.php")
            .then(res => res.json())
            .then((result) => 
                this.displayData(result)
            );
        }else if(data === "호텔"){
            //Connection with php and get data
            fetch("http://localhost:8888/DisplayHotelManagement.php")
            .then(res => res.json())
            .then((result) => 
                this.displayData(result)
            );
        }
    }
    displayData = (data) => {
        this.setState({
            data: data,
        })
    }

    render(){
        return (
            <Row>
                <Setting authorization={this.state.authorization}/>
                <Col s={12}>
                    <div className="setting-management-list">
                        <h6>환경설정</h6>
                        {/* Select List */}
                        <Row>
                            <Col s={12}>
                                <div className="management-select">
                                    <label>운영관리 선택</label>
                                    <select value={this.state.selectedItem} className="browser-default" onChange={this.changeManagementOption}>
                                        <option defaultValue="쇼핑">쇼핑</option>
                                        <option value="차량">차량</option>
                                        <option value="옵션">옵션관광</option>
                                        <option value="레스토랑">레스토랑</option>
                                        <option value="호텔">호텔</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        
                        <List name={this.state.selectedItem} data={this.state.data} />
                    </div>
                </Col>
            </Row>
        );
    }

    //Eventhandler when the use changes the option
    changeManagementOption = (event) => {
        this.setState({
            selectedItem: event.target.value,
        });
        //Get data for selected item
        this.callData(event.target.value);
    }
}

export default SettingManagement;

var selectedItem = "";

class List extends Component {
    constructor(){
        super();

        this.state = {
            selectedItems: [],
            placeData: [
                {value: "록키", data: "록키"},
                {value: "그외", data: "그외"},
                {value: "밴쿠버", data: "밴쿠버"},
                {value: "휘슬러", data: "휘슬러"}
            ],
            inputName: "",
            inputPlace: [],
        }
        
    }
    render(){
        selectedItem = this.props.name;
        return(
            <Row>
                <div className="title">
                    {this.props.name} 관리
                </div>
                <div className="frame">
                    <DisplayTable name={this.props.name} data={this.props.data} onChange={this.selectedItems}/>

                    {/* 아이템 추가 */}
                    <Row>
                        <div className="add-component-frame">
                                <Col s={4}><TextInput label="이름" id="name" onChange={this.insertedItems}/></Col>
                                <Col s={4}>
                                    <Select multiple id="place" label="장소선택" onChange={this.handleChangePlace}>
                                        {this.state.placeData.map(function(data, key){  
                                            return ( <option key={key} value={data.data}>{data.value}</option> )
                                        })}
                                    </Select>
                                </Col>
                                <Col s={2}>
                                    <Button waves="light" id="add-btn" style={{marginRight: '5px' , marginTop: '25px', width: "100%"}} onClick={this.addComponent}>
                                        추가
                                    </Button>
                                </Col>
                                <Col s={2}>
                                    <Button waves="light" id="remove-btn" style={{marginRight: '5px' , marginTop: '25px', width: "100%"}} onClick={this.deleteComponent}>
                                        삭제
                                    </Button>
                                </Col>
                        </div>
                    </Row>
                </div>
            </Row>
        );
    }
    //Getting data if user clicks the delete button
    selectedItems = (obj) => {
        //If checked
        this.setState({
            selectedItems: [...this.state.selectedItems, obj.target.value],
        });
    }

    //Getting data if user enter in inputbox
    insertedItems = (obj) => {
        this.setState({
            inputName: obj.target.value,
        })
    }

    //Getting data from options
    handleChangePlace = (data) => {
        var options = data.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({
            inputPlace: value,
        });
    }

    //Event Handler - Delete
    deleteComponent = () => {
        var option = "";
        if(this.props.name === "쇼핑"){
            option = "shoppinglist";
        }else if(this.props.name === "호텔"){
            option = "hotel";
        }else if(this.props.name === "옵션"){
            option = "optiontour";
        }else if(this.props.name === "레스토랑"){
            option = "restaurant";
        }

        $.ajax({
            url: "http://localhost:8888/SettingManagement.php",
            type: "POST",
            data: {
                option: option,
                items: this.state.selectedItems,
            },
            success: function(){
                setCookie("currentOption", selectedItem);
                reloadPage();
            }
        });
    }

    //Event Handler - Add
    addComponent = () => {
        var option = "";
        if(this.props.name === "쇼핑"){
            option = "shoppinglist";
        }else if(this.props.name === "호텔"){
            option = "hotel";
        }else if(this.props.name === "옵션"){
            option = "optiontour";
        }else if(this.props.name === "레스토랑"){
            option = "restaurant";
        }

        var place = "";
        //List place
        for(var idx=0; idx<this.state.inputPlace.length; idx++){
            if(idx === 0){
                place += this.state.inputPlace[idx];
            }else{
                place = place + "," + this.state.inputPlace[idx];
            }
        }

        $.ajax({
            url: "http://localhost:8888/SettingManagement.php",
            type: "POST",
            data: {
                option: option,
                name: this.state.inputName,
                place: place
            },
            success: function(){
                setCookie("currentOption", selectedItem);
                reloadPage();
            }
        });
    }
}

//Set cookie
function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (5*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Reload website
function reloadPage(){
    window.location.reload(true);
}

const DisplayTable = (props) => {
    const component = [];
    var count = 0;

    if(props.data !== undefined){
        count = props.data.length;
    }

    //Get each component from array
    for(var idx=0; idx<count; idx++){
        component.push(<DisplayComponent key={idx} list={props.data[idx][0]} place={props.data[idx][1]} id={props.data[idx][2]} onChange={props.onChange}/>);
    }

    return(
        <Table>
            <thead>
                <tr>
                    <th id="management-checked delete">삭제</th>
                    <th data-field="name">{props.name}</th>
                    <th data-field="place">장소</th>
                </tr>
            </thead>
            <tbody>
                {component}
            </tbody>
        </Table>
    );
}

const DisplayComponent = (props) => {
    return(
        <tr>
            <td id="management-checked"><Checkbox value={props.id} label="" onChange={props.onChange} /></td>
            <td>{props.list}</td>
            <td>{props.place}</td>
        </tr>
    );
}