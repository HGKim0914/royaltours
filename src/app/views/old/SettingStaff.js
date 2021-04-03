import React, { Component } from 'react';
import {Row, Col, Table, Checkbox, TextInput, Button} from 'react-materialize';
import '../css/setting.css';
import Setting from './NavigationBar';
import $ from 'jquery';

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

const checkedStaff = [];
var checkedAuthorization = [];
var changedPassword = [];
var changedCom = [];

class SettingStaff extends Component{
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
            authorization: getAuthorization,
            staffData: null, // Staff data retrieved from database
            userData: null, // logged in user data
            msgRemoveStaff: "",
        };

        //Connection with php and get data
        fetch("http://localhost:8888/DisplayStaff.php")
        .then(res => res.json())
        .then((result) => 
            this.displayStaff(result)
        );
    }

    displayStaff = (data) => {
        var staffData = [];
        for(var idx=0; idx< data.length; idx++){
            if(data[idx][0] === this.state.id){
                this.setState({
                    userData: data[idx],
                });
            }else{
                staffData.push(data[idx]);
                this.setState({
                    staffData: staffData,
                });
            }
        }
    }
    
    render(){
        //User Data - userID, name, password, department, com proportion, authorization
        var userData = [];
        var loggedinUserData = [];

        if(this.state.staffData !== null){
            userData = this.state.staffData;
        }
        if(this.state.userData !== null){
            loggedinUserData = this.state.userData;
        }

        return (
            <Row>
                <Setting authorization={this.state.authorization}/>
                    <Col s={12}>
                        <div className="setting-staff-list">
                            <div className="setting-staff-list title" onClick={this.saveStaff}>
                                {this.state.msgRemoveStaff}
                                우리 직원 정보 관리
                            </div>
                            <StaffList loginedUser={loggedinUserData} userData={userData} adminId={this.state.id} onChange={this.changeEventHandler}/>
                        </div>
                    </Col>
                    <Col s={12}>
                        <div className="setting-staff-btn">
                        <Button waves="light" style={{marginRight: '5px'}} id="delete" name="deleteBtn" onClick={this.deleteStaff}>
                            선택 직원 삭제
                        </Button>
                        <Button waves="light" style={{marginRight: '5px'}} id="save" name="saveBtn" onClick={this.saveStaff}>
                            저장
                        </Button>
                        </div>
                    </Col>
            </Row>
        );
    }

    changeEventHandler = (event) => {
        var temp = event.target.id.split("+");
        var newData;

        if(temp[0] === "delete"){
            if(event.target.checked){
                checkedStaff.push(event.target.value);
            }else{
                if(checkedStaff.length > 0){
                    for(var idx=0; idx<checkedStaff.length; idx++){
                        if(checkedStaff[idx] === event.target.value){
                            checkedStaff.splice(idx, 1);
                            break;
                        }
                    }
                }
            }
        }else{
            //AUTHORIZATION HANDLE CHANGE
            if(temp[0] === "authorization"){
                var arrIdx;
                if(event.target.checked){
                    //If clicked data is index 0
                    if(temp[2] === "0"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationChecked(arrIdx, 0, event.target.value);
                    }else if(temp[2] === "1"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationChecked(arrIdx, 1, event.target.value);
                    }
                    else if(temp[2] === "2"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationChecked(arrIdx, 2, event.target.value);
                    }
                    else if(temp[2] === "3"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationChecked(arrIdx, 3, event.target.value);
                    }
                    else if(temp[2] === "4"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationChecked(arrIdx, 4, event.target.value);
                    }
                    else if(temp[2] === "5"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationChecked(arrIdx, 5, event.target.value);
                    }
                    else if(temp[2] === "6"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationChecked(arrIdx, 6, event.target.value);
                    }
                }else{
                    if(temp[2] === "0"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationUnChecked(arrIdx, 0, event.target.value);
                    }else if(temp[2] === "1"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationUnChecked(arrIdx, 1, event.target.value);
                    }else if(temp[2] === "2"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationUnChecked(arrIdx, 2, event.target.value);
                    }else if(temp[2] === "3"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationUnChecked(arrIdx, 3, event.target.value);
                    }else if(temp[2] === "4"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationUnChecked(arrIdx, 4, event.target.value);
                    }else if(temp[2] === "5"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationUnChecked(arrIdx, 5, event.target.value);
                    }else if(temp[2] === "6"){
                        arrIdx = this.checkIfIdExists(checkedAuthorization, event.target.value); //if data exists
                        this.handleAuthorizationUnChecked(arrIdx, 6, event.target.value);
                    }
                }
            }else if(temp[0] === "pwd"){
                arrIdx = this.checkIfIdExists(changedPassword, event.target.name);
                //If password has been changed
                if(arrIdx !== -1){
                    newData = event.target.value;
                    changedPassword[arrIdx][1] = newData;
                }else{
                    newData = event.target.value;
                    changedPassword.push([event.target.name, newData]);
                }

            }else if(temp[0] === "com"){    //if com changed
                arrIdx = this.checkIfIdExists(changedCom, event.target.name);
                if(arrIdx !== -1){
                    newData = event.target.value;
                    changedCom[arrIdx][1] = newData;
                }else{
                    changedCom.push([event.target.name, event.target.value]);
                }
            }
        }
    }
    //Authorization data handling
    handleAuthorizationChecked = (checkedAuthorizationIdx, dataIdx, dataId) => {
        var temp, newData;
        if(checkedAuthorizationIdx !== -1){ //if the required data already exists in the array
            temp = checkedAuthorization[checkedAuthorizationIdx][1];
            newData = "";
            for(var idx=0; idx < temp.length; idx++){
                //store data in array
                if(idx === dataIdx){
                    newData += "t";
                }else{
                    newData += temp[idx];
                }
            }
            checkedAuthorization[checkedAuthorizationIdx][1] = newData;
        }else{ //if data does not exist in the array
            temp = this.getAuthorizationData(dataId);
            newData = "";
            for(var x=0; x < temp.length; x++){
                if(x === dataIdx){
                    newData += "t";
                }else{
                    newData += temp[x];
                }
            }
            checkedAuthorization.push([dataId, newData]);
        }
    }
    handleAuthorizationUnChecked = (checkedAuthorizationIdx, dataIdx, dataId) => {
        var temp, newData;
        if(checkedAuthorizationIdx !== -1){ //if the required data already exists in the array
            temp = checkedAuthorization[checkedAuthorizationIdx][1];
            newData = "";
            for(var idx=0; idx < temp.length; idx++){
                //store data in array
                if(idx === dataIdx){
                    newData += "f";
                }else{
                    newData += temp[idx];
                }
            }
            checkedAuthorization[checkedAuthorizationIdx][1] = newData;
        }else{ //if data does not exist in the array
            temp = this.getAuthorizationData(dataId);
            newData = "";
            for(var x=0; x < temp.length; x++){
                if(x === dataIdx){
                    newData += "f";
                }else{
                    newData += temp[x];
                }
            }
            checkedAuthorization.push([dataId, newData]);
        }
    }
    getAuthorizationData = (userId) => {
        var data = this.state.staffData;
        for(var idx=0; idx<data.length; idx++){
            if(data[idx][0] === userId){
                return data[idx][5];
            }
        }
        return null;
    }
    checkIfIdExists = (arr, data) => {
        for(var idx=0; idx < arr.length; idx++){
            if(arr[idx][0] === data){
                return idx;
            }
        }
        return -1;
    }

    deleteStaff = () => {
        var errDelete = false;
        var validatedStaff = [];
        //Check if delete the staff who is logged into
        for(var idx=0; idx<checkedStaff.length; idx++){
            if(checkedStaff[idx] === this.state.id){
                validatedStaff = checkedStaff.splice(idx, 1);
                errDelete = true;
                console.log(validatedStaff);
            }
        }
        if(errDelete){
            this.setState({
                msgRemoveStaff: <p style={{color: 'red', padding: '0px', margin: '0px', fontSize: '0.5em', fontWeight: 'lighter', textAlign: 'center'}}>현재 로그인된 아이디는 삭제할 수 없습니다. 로그인된 아이디를 제외한 아이디 정보만 삭제됩니다.</p>
            });
        }
        var selectedStaff = JSON.stringify(checkedStaff);
        console.log(selectedStaff);
        $.ajax({
            url: "http://localhost:8888/StaffManagement.php",
            type: "POST",
            data: {staff: selectedStaff},
            success: function(){
                reloadPage();
            }
        });
    }
    saveStaff = () => {
        var pwd = null, com = null, authorization = null;
        if(changedPassword.length > 0){
            pwd = JSON.stringify(changedPassword);
        }
        if(changedCom.length > 0){
            com = JSON.stringify(changedCom);
        }
        if(checkedAuthorization.length > 0){
            authorization = JSON.stringify(checkedAuthorization);
        }

        $.ajax({
            url: "http://localhost:8888/StaffManagement.php",
            type: "POST",
            data: {
                pwd: pwd,
                com: com,
                authorization: authorization,
            },
            success: function(){
                reloadPage();
            }
        });
    }
}

//Reload website
function reloadPage(){
    window.location.reload(true);
}


export default SettingStaff;

const StaffList = (props) => {
    //Get the length of user data and display all users
    const userData = [];
    for(var idx=0; idx<props.userData.length; idx++){
        userData.push(<StaffInfo userData={props.userData[idx]} key={idx} idx={idx} onChange={props.onChange} adminId={props.adminId}/>);
    }

    var authorizationList = ["전체투어리스트", "투어결산/정산손익금", "항목별결산", "투어추가", "직원관리", "환경설정", "콤관리"];
    const loggedinUserData = [];
    //Logged in User Authorization
    if(props.loginedUser[5] !== undefined){
        
        var user = props.loginedUser[5];
        for(idx=0; idx < 6; idx++){
            if(user[idx] === 't'){
               loggedinUserData.push(<Checkbox value="loggedin user" key={idx} label={authorizationList[idx]} checked disabled />);
            }else if(user[idx] === 'f'){
                loggedinUserData.push(<Checkbox value="loggedin user" key={idx} label={authorizationList[idx]} disabled />);
            }
            loggedinUserData.push(<br key={idx + 10}/>)
        }
    }
    return(
        <Table>
            <thead>
                <tr>
                    <th id="staff-checked delete">삭제</th>
                    <th data-field="account-id">아이디</th>
                    <th data-field="account-name">성명</th>
                    <th data-field="account-pwd">비밀번호 리셋</th>
                    <th data-field="account-depart">부서명</th>
                    <th data-field="acount-com-proportion">가이드 컴비율</th>
                    <th data-field="account-auth">권한 설정</th>
                </tr>

                {/* 로그인 되어있는 유저 정보 */}
                <tr style={{color: 'black'}}>
                    <td id="staff-checked"><Checkbox value="userData" label="" disabled /></td>
                    <td>{props.loginedUser[0]}</td>
                    <td>{props.loginedUser[2]}</td>
                    <td id="staff-pwd"><TextInput password label="새 비밀번호" disabled/></td>
                    <td>{props.loginedUser[3]}</td>
                    <td><TextInput label="-" disabled/></td>
                    <td id="staff-auth">
                        {loggedinUserData}
                    </td>
                </tr>
            </thead>
            <tbody>
                {userData}
            </tbody>
        </Table>
    );
}

class StaffInfo extends Component {
    render(){
        var com = "";
        //컴 설정
        var tbxCom = <TextInput label="-" value={com} disabled/>;
        if(this.props.userData[4] !== null){
            com = this.props.userData[4];
            tbxCom = <TextInput type="number" label="가이드 컴비율(%)" value={com} name={this.props.userData[0]} id={"com+"+this.props.idx} onChange={this.props.onChange}/>;
        }
        //권한 설정
        const authorizationList = [];
        var authorization = this.props.userData[5];
        if(authorization[0] === "t"){
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="4" label="전체투어리스트" id={"authorization+"+this.props.idx+"+0"}  onChange={this.props.onChange} checked/>);
        }else{
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="4" label="전체투어리스트" id={"authorization+"+this.props.idx+"+0"}  onChange={this.props.onChange} />);
        }
        authorizationList.push(<br key="10" />);
        if(authorization[1] === "t"){
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="5" label="투어결산/정산손익금" id={"authorization+"+this.props.idx+"+1"}  onChange={this.props.onChange} checked/>);
        }else{
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="5" label="투어결산/정산손익금" id={"authorization+"+this.props.idx+"+1"}  onChange={this.props.onChange} />);
        }
        authorizationList.push(<br key="11" />);
        if(authorization[2] === "t"){
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="6" label="항목별 결산" id={"authorization+"+this.props.idx+"+2"}  onChange={this.props.onChange} checked/>);
        }else{
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="6" label="항목별 결산" id={"authorization+"+this.props.idx+"+2"}  onChange={this.props.onChange} />);
        }
        authorizationList.push(<br key="12" />);
        if(authorization[3] === "t"){
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="7" label="투어추가" id={"authorization+"+this.props.idx+"+3"}  onChange={this.props.onChange} checked/>);
        }else{
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="7" label="투어추가" id={"authorization+"+this.props.idx+"+3"} onChange={this.props.onChange}/>);
        }
        authorizationList.push(<br key="17" />);
        if(authorization[4] === "t"){
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="1" label="직원관리" id={"authorization+"+this.props.idx+"+4"}  onChange={this.props.onChange} checked/>);
        }else{
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="1" label="직원관리" id={"authorization+"+this.props.idx+"+4"}  onChange={this.props.onChange} />);
        }
        authorizationList.push(<br key="8" />);
        if(authorization[5] === "t"){
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="3" label="환경설정" id={"authorization+"+this.props.idx+"+5"}  onChange={this.props.onChange} checked/>);
        }else{
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="3" label="환경설정" id={"authorization+"+this.props.idx+"+5"}  onChange={this.props.onChange} />);
        }
        authorizationList.push(<br key="13"/>);
        if(authorization[6] === "t"){
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="2" label="콤관리" id={"authorization+"+this.props.idx+"+6"}  onChange={this.props.onChange} checked/>);
        }else{
            authorizationList.push(<Checkbox value={this.props.userData[0]} key="2" label="콤관리" id={"authorization+"+this.props.idx+"+6"}  onChange={this.props.onChange} />);
        }

        this.test = authorizationList;

        return(
            <tr>
                {/* 삭제 */}
                <td id="staff-checked">
                    <Checkbox label="" value={this.props.userData[0]} id={"delete+"+this.props.idx} onChange={this.props.onChange} />
                </td>
                {/* 아이디 */}
                <td>{this.props.userData[0]}</td>
                {/* 이름 */}
                <td>{this.props.userData[2]}</td>
                {/* 비밀번호 입력창 */}
                <td id="staff-pwd"><TextInput password label="새 비밀번호" name={this.props.userData[0]} id={"pwd+"+this.props.idx} onChange={this.props.onChange}/></td>
                {/* 부서명 */}
                <td>{this.props.userData[3]}</td>
                <td>
                    {tbxCom}
                </td>
                <td id="staff-auth">
                    {authorizationList}
                </td>
            </tr>
        );
    }
}