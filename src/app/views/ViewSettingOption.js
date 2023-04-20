import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import NavBar from './NavigationBar';
import '../css/Setting.css';
import $ from 'jquery';

//Table
import List from './OptionList';
import AddComponent from './AddComponent';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';

class ViewSettingOption extends Component{
    constructor(){
        super();

        //Prevent unauthorized user to access data
        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getAuthorization === null|| (getAuthorization !== null && getAuthorization[1] !== 't')  || getId === ""){
            window.location.href = "/pagenotexist";
        }else{

            var selectedItem = "쇼핑";
            var getSelectedItem = sessionStorage.getItem("currentoption");
            if(getSelectedItem !== ""){
                switch(getSelectedItem){
                    case '"optiontour"':
                        selectedItem = "옵션";
                    break;
                    case '"restaurant"':
                        selectedItem = "레스토랑";
                    break;
                    case '"hotel"':
                        selectedItem = "호텔";
                    break;
                    case '"cartype"':
                        selectedItem = "차량";
                    break;
                    case '"carcompany"':
                        selectedItem = "차량회사";
                    break;
                    case '"land"':
                        selectedItem = "기타";
                    break;
                    default:
                        selectedItem = "쇼핑";
                }
                sessionStorage.removeItem("currentoption");
            }
    
            this.state = {
                selectedItem: selectedItem,
                data: [],
    
                deletedItems: [],
                addedItemName: "",
    
                //메세지
                msgDeleteError: "",
                msgAddError: "",

                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment
            }
            this.callData(this.state.selectedItem);
        }
    }

    render(){
        return(
            <Row>
                <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    <div className="setting-option">
                        <div className="title">
                            <h6>환경설정</h6>
                        </div>
                        {/* Select Component */}
                        <div className="option">
                            <label>옵션 선택</label>
                            <select value={this.state.selectedItem} className="browser-default" id="input-option" onChange={this.changeOption}>
                                <option value="쇼핑">쇼핑</option>
                                <option defaultValue="옵션">옵션</option>
                                <option value="차량">차량</option>
                                <option value="차량회사">차량회사</option>
                                <option value="레스토랑">레스토랑</option>
                                <option value="호텔">호텔</option>
                                <option value="기타">랜드구분</option>
                            </select>
                        </div>

                        {/* Display Table */}
                        <div className="display">
                            {/* Table */}
                            {this.state.msgDeleteError}
                            <List name={this.state.selectedItem} data={this.state.data} onChange={this.deleteItemAddHandler}/>
                            <div id="delete">
                                <div className="waves-effect waves-light btn" id="btn-delete" onClick={this.deleteItemHandler}>
                                    선택된 항목 삭제
                                </div>
                            </div>

                            {/* Add Component */}
                            {this.state.msgAddError}
                            <AddComponent onClick={this.addItemHandler} onChange={this.getAddedItemHandler}/>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    //Event Handler
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
            msgDeleteError: "",
        }, ()=> console.log(this.state.deletedItems));
    }

    deleteItemHandler = () =>{
        if(this.state.deletedItems.length === 0){
            this.setState({
                msgDeleteError: <p id="msg-warning"><img src={require('../imgs/warning.png')} alt="img-warning"/> 삭제할 아이템이 없습니다. </p>,
            });
        }else{
            var option = "";
            if(this.state.selectedItem === "쇼핑"){
                option = "shoppinglist";
            }else if(this.state.selectedItem === "옵션"){
                option = "optiontour";
            }else if(this.state.selectedItem === "호텔"){
                option = "hotel";
            }else if(this.state.selectedItem === "레스토랑"){
                option = "restaurant";
            }else if(this.state.selectedItem === "차량"){
                option = "cartype";
            }else if(this.state.selectedItem === "기타"){
                option = "land";
            }else if(this.state.selectedItem === "차량회사"){
                option = "carcompany";
            }
    
            $.ajax({
                url: DatabaseConnectionHelper() + "OptionManagementController.php",
                type: "POST",
                data: {
                    option: option,
                    items: this.state.deletedItems,
                },
                success: function(result){
                    sessionStorage.setItem("currentoption", result);
                    reloadePage();
                }
            });
        }
    }

    changeOption = (obj) => {
        this.callData(obj.target.value);
        this.setState({
            selectedItem: obj.target.value,
            msgAddError: "",
            msgDeleteError: "",
        });
    }

    addItemHandler = () => {
        var send = false;
        if(this.state.selectedItem === "쇼핑" || this.state.selectedItem === "옵션" || this.state.selectedItem === "호텔" || this.state.selectedItem === "레스토랑" || 
        this.state.selectedItem === "차량" || this.state.selectedItem === "차량회사" || this.state.selectedItem === "기타"){
            if(this.state.addedItemName === ""){
                this.setState({
                    msgAddError: <p id="msg-warning"><img src={require('../imgs/warning.png')} alt="img-warning"/> 아이템을 추가하시려면 이름을 입력해주세요. </p>,
                });
            }else{
                send = true;
            }
        }

        if(send){
            //Add item
            var option = "";
            if(this.state.selectedItem === "쇼핑"){
                option = "shoppinglist";
            }else if(this.state.selectedItem === "옵션"){
                option = "optiontour";
            }else if(this.state.selectedItem === "호텔"){
                option = "hotel";
            }else if(this.state.selectedItem === "레스토랑"){
                option = "restaurant";
            }else if(this.state.selectedItem === "차량"){
                option = "cartype";
            }else if(this.state.selectedItem === "기타"){
                option = "land";
            }else if(this.state.selectedItem === "차량회사"){
                option = "carcompany";
            }

            $.ajax({
                url: DatabaseConnectionHelper() + "OptionManagementController.php",
                type: "POST",
                data: {
                    option: option,
                    name: this.state.addedItemName,
                },
                success: function(result){
                    sessionStorage.setItem("currentoption", result);
                    reloadePage();
                }
            });
        }
    }

    getAddedItemHandler = (obj) => {
        if(obj.target.id === "input-name"){
            this.setState({
                addedItemName: obj.target.value,
            })
        }
        this.setState({
            msgAddError: "",
        });
    }

    //Get data from database
    callData = (data) => {
        if(data === "쇼핑"){
            fetch(DatabaseConnectionHelper() + "DisplayAvailableShoppinglistController.php")
            .then(res => res.json())
            .then((result) => this.displayData(result)
            );
        }else if(data === "옵션"){
            fetch(DatabaseConnectionHelper() + "DisplayOptiontourController.php")
            .then(res => res.json())
            .then((result) => this.displayData(result)
            );
        }else if(data === "호텔"){
            fetch(DatabaseConnectionHelper() + "DisplayHotelController.php")
            .then(res => res.json())
            .then((result) => this.displayData(result)
            );
        }else if(data === "레스토랑"){
            fetch(DatabaseConnectionHelper() +"DisplayRestaurantController.php")
            .then(res => res.json())
            .then((result) => this.displayData(result)
            );
        }else if(data === "차량"){
            fetch(DatabaseConnectionHelper() + "DisplayCarRentalController.php")
            .then(res => res.json())
            .then((result) => this.displayData(result)
            );
        }else if(data === "차량회사"){
            fetch(DatabaseConnectionHelper() + "DisplayCarCompanyController.php")
            .then(res => res.json())
            .then((result) => this.displayData(result)
            );
        }else if(data === "기타"){
            fetch(DatabaseConnectionHelper() + "DisplayLandController.php")
            .then(res => res.json())
            .then((result) => this.displayData(result)
            );
        }
    }

    displayData = (result) => {
        if(result !== false){
            this.setState({
                data: result,
            });
        }else{
            this.setState({
                data: [],
            });
        }
    }
}
export default ViewSettingOption;

// JavaScript
function reloadePage(){
    window.location.reload(true);
}

// function setCookie(cname, cvalue){
//     var d = new Date();
//     d.setTime(d.getTime() + (5*24*60*60*1000));
//     var expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(data){
//     var msg = data + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var temp = decodedCookie.split(';');
//     for(var idx=0; idx<temp.length; idx++){
//       var temp2 = temp[idx];
//       while(temp2.charAt(0) === ' '){
//         temp2 = temp2.substring(1);
//       }
//       if(temp2.indexOf(msg)===0){
//         return temp2.substring(msg.length, temp2.length);
//       }
//     }
//     return "";
// }

//   function deleteCookie(data){
//     document.cookie = data + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }
