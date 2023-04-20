import React, {Component} from 'react';
import {Table, Modal, Button} from 'react-materialize';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import $ from 'jquery';

import { isJson } from '../js/functions';
import { setData } from '../js/model';

// EACH USER LIST
class UserList extends Component{
    constructor(){
        super();
        this.state = {
            shoppinglist: [],
        }

        //call data
        this.getShoppinglist();
    }

    render(){
        const userdata = [];
        for(var idx = 0; idx < this.props.data.length; idx++){
            userdata.push(<UserData key={idx} data={this.props.data[idx]} com={this.state.shoppinglist} onChange={this.props.onChange}/>);
        }

        return(
            <Table>
               <thead>
                    <tr>
                        <th id="delete">삭제</th>
                        <th>아이디</th>
                        <th>성명</th>
                        <th>비밀번호 리셋</th>
                        <th>부서명</th>
                        <th>가이드 컴비율</th>
                        <th>권한 설정</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Display users */}
                    {userdata}
                </tbody> 
            </Table>
        );
    }

    getShoppinglist = () => {
        //get all shopping list
        fetch(DatabaseConnectionHelper() + "DisplayShoppinglistWithCom.php")
            .then(res => res.json())
            .then((result) => {
                this.setShoppinglist(result);
            }
        );
    }

    setShoppinglist = (result) => {
        if(result){
            this.setState({
                shoppinglist: result
            })
        }
    }
}

export default UserList;

const UserData = (props) => {
    //com
    const com = [];
    if(props.data[2] === "가이드"){
        //get shopping list of this guide only
        var shoppinglist = props.com.map(function(list){
            if(list[3] === props.data[0]){
                return list;
            }
            return null;
        });

        com.push(<Modal key="modal" trigger={<Button id="btn-guide-com">가이드 컴조정</Button>}>
                    <GuideComAdjustment shoppingList={shoppinglist} guideName={props.data[1]} guideId={props.data[0]}/>
                </Modal>
        );
    }else{
        com.push(<p key="com" id="com-unable">-</p>);
    }

    //authorization
    const authorization = [];
    const authTitle = ["직원관리", "환경설정", "콤관리", "전체투어리스트", "투어결산/정산손익금", "투어추가"];
    var temp = null;
    //Authorization
    if(props.data[3] !== undefined){
        for(var idx=0; idx<props.data[3].length; idx++){
            temp = props.data[3];
            authorization.push(<Authorization key={idx} num={idx} name={props.data[0]} title={authTitle[idx]} total={temp} data={temp[idx]} department={props.data[2]} onChange={props.onChange}/>);
            authorization.push(<br key={idx+10}/>);
        }
    }
    return(
        <tr>
            <td id="delete">
                <label>
                    <input type="checkbox" id="cbx-delete" name={props.data[0]} onChange={props.onChange} />
                    <span></span>
                </label>
            </td>
            {/* id */}
            <td>{props.data[0]}</td>
            {/* name */}
            <td id={props.data[1]}>{props.data[1]}</td>
            {/* password */}
            <td id="password">
                <label>새 비밀번호</label><br />
                <input type="password" id={"input-password-"+props.data[0]} name={props.data[0]} onChange={props.onChange}/>
            </td>
            {/* department */}
            <td>{props.data[2]}</td>
            {/* com */}
            <td id="com">{com}</td>
            {/* authorization */}
            <td id="authorization">{authorization}</td>
        </tr>
    );
}


const Authorization = (props) => {
    var cbxauthorzation = "";
    if(props.department === "어드민"){
        if(props.data === 't'){
            cbxauthorzation = <input type="checkbox" name={props.name+"-"+props.total+"-"+props.num+"-"+props.data} id={"cbx-authorization"} onChange={props.onChange} defaultChecked disabled/>;
        }else{
            cbxauthorzation = <input type="checkbox" name={props.name+"-"+props.total+"-"+props.num+"-"+props.data} id={"cbx-authorization"} onChange={props.onChange} disabled/>
        }
    }else if(props.department === "가이드"){
        //not able to even see
        if(props.num < 3){
            if(props.data === 't'){
                cbxauthorzation = <input type="checkbox" name={props.name+"-"+props.total+"-"+props.num+"-"+props.data} id={"cbx-authorization"} onChange={props.onChange} defaultChecked />;
            }else{
                cbxauthorzation = <input type="checkbox" name={props.name+"-"+props.total+"-"+props.num+"-"+props.data} id={"cbx-authorization"} onChange={props.onChange} />
            }
        }else{
            cbxauthorzation = <input type="checkbox" name={props.name+"-"+props.total+"-"+props.num+"-"+props.data} id={"cbx-authorization"} onChange={props.onChange} disabled/>;
        }
    }else{
        if(props.data === 't'){
            cbxauthorzation = <input type="checkbox" name={props.name+"-"+props.total+"-"+props.num+"-"+props.data} id={"cbx-authorization"} onChange={props.onChange} defaultChecked />;
        }else{
            cbxauthorzation = <input type="checkbox" name={props.name+"-"+props.total+"-"+props.num+"-"+props.data} id={"cbx-authorization"} onChange={props.onChange} />
        }
    }

    return(
        <label>
            {cbxauthorzation}
            <span>{props.title}</span>
        </label>
    );
}

//GUIDE COM
class GuideComAdjustment extends Component{
    constructor(){
        super();
        this.state = {
            editMode: false,
            shoppinglist: [],
        }
    }
   
    render(){
        const shoppinglist = [];
        var shoppinglistRAW = this.props.shoppingList;
        if(this.state.shoppinglist.length > 0){
            shoppinglistRAW = this.state.shoppinglist;
        }
        var editMode = this.state.editMode;

        shoppinglistRAW.forEach(function(list){
            if(list) shoppinglist.push(<ShoppingList key={list[1]} id={list[1]} name={list[0]} data={list} editModeOn={editMode}/>);
        });
        if(this.state.editMode){
            $('#btn-edit').text('일반 모드');
            $('#btn-edit').css('background', 'rgb(26, 66, 122)');
        }else{
            $('#btn-edit').text('수정 모드');
            $('#btn-edit').css('background', 'rgb(26, 66, 122)');
        }

        return(
            <div className="user-com-wrapper center">
                <h5>가이드 컴비율 조정<span id="guide-name"> 가이드 성함: {this.props.guideName}</span></h5>
                <span className="statusMsg"></span>
                <table>
                    <thead>
                        <tr>
                            <th>목록</th>
                            <th>컴비율(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoppinglist}
                    </tbody>
                </table>
                <Button id="btn-edit" onClick={this.activateEditMode}>수정 모드</Button>
                <Button id="btn-delete" onClick={this.saveData}>저장</Button>
            </div>
        );
    }

    //Click Event handler
    activateEditMode = () => {
        //Set edit mode true or false
        this.setState({
            editMode: !(this.state.editMode),
            refreshPopup: false,
        });

        $('.statusMsg').text('');
    }

    //SAVE
    saveData = async () => {
        const data = [];

        if(this.state.editMode){
            this.setState({
                editMode: !(this.state.editMode),
            });

            var guideId = this.props.guideId;
            //In edit mode
            $('input[type="number"]').each(function(){
                data.push([guideId, $(this).prop('name'), $(this).val()]);
            });

            const result = await setData("SaveGuidecom.php", data);
            if(result){
                $('.statusMsg').append('<p className="font-green small left" style="color:green">저장 되었습니다.</p>');
                this.callData();
            }else{
                $('.statusMsg').append('<p className="font-red small left" style="color:red">저장에 실패했습니다.</p>');
            }
        }
    }

    callData = async () => {
        const result = await setData("DisplayGuidecomController.php", this.props.guideId);
        if(isJson(result)){
            this.setState({
                shoppinglist: JSON.parse(result),
            });
        }
    }
}

const ShoppingList = (props) => {
    var data = [];
    if(props.data !== undefined){
        if(props.editModeOn) {
            data.push(<label key="1">{props.data[2] + " % => "}</label>);
            data.push(<br key="2" />);
            data.push(<input key="3" type="number" id="input-guide-com" name={props.id} />);
        }
        else data.push(props.data[2] + " %");
    }
    return(
        <tr>
            {/* name of product */}
            <td>{props.data[0]}</td> 
            <td>{data}</td>
        </tr>
    );
}