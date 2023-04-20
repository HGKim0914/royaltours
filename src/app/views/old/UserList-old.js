import React, {Component} from 'react';
import {Table, Modal, Button} from 'react-materialize';
import '../css/Setting.css';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import $ from 'jquery';
import { setData } from '../js/model';
import { isJson } from '../js/functions';

class UserList extends Component{
    constructor(){
        super();

        this.state = {
            shoppingList: [],
        }

        // Call shopping center list
        this.callShoppingCenterList();
    }
    render(){
        const component = [];
        for(var idx=0; idx<this.props.data.length; idx++){
            component.push(<Data key={idx} data={this.props.data[idx]} shoppingList={this.state.shoppingList} onChange={this.props.onChange}/>)
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
                    {component}
                </tbody>
            </Table>
        );
    }

    callShoppingCenterList = () => {
        fetch(DatabaseConnectionHelper() + "DisplayShoppinglistWithCom.php")
            .then(res => res.json())
            .then((result) => this.displayShoppingCenterList(result)
        );
    }

    displayShoppingCenterList = (result) => {
        if(result !== false){
            this.setState({
                shoppingList: result,
            })
        }
    }
}
export default UserList;

const Data = (props) => {
    const com = [];
    
    if(props.data[2] === "가이드"){ //guide com
        com.push(<Modal key="modal" trigger={<Button id="btn-guide-com">가이드 컴조정</Button>}>
                    <GuideComAdjustment shoppingList={props.shoppingList} guideName={props.data[1]} guideId={props.data[0]}/>
                </Modal>);
    }else{
        com.push(<p key="com" id="com-unable">-</p>);
    }

    const authorization = [];
    const authTitle = ["직원관리", "환경설정", "콤관리", "전체투어리스트", "투어결산/정산손익금", "투어추가"];
    var temp = null;
    //Authorization
    for(var idx=0; idx<props.data[3].length; idx++){
        temp = props.data[3];
        authorization.push(<Authorization key={idx} num={idx} name={props.data[0]} title={authTitle[idx]} total={temp} data={temp[idx]} department={props.data[2]} onChange={props.onChange}/>);
        authorization.push(<br key={idx+10}/>);
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

//Modal Data
class GuideComAdjustment extends Component{
    constructor(){
        super();
        this.state = {
            com: [],
            editMode: false,
            data: [],
            updatedData: [],

            comUpdated: false,
            statusMsg: "",
        }
    }
    
    componentDidMount(){
        this.callData(false);
    }

    render(){
        const list = [];
        var shoppingList = this.props.shoppingList;
        if(this.state.comUpdated) shoppingList = this.state.data;
        
        //Get shopping center list
        if(shoppingList.length > 0){
            for(var idx=0; idx<this.props.shoppingList.length; idx++){
                
                if(shoppingList[idx][3] === this.props.guideId){
                    list.push(<ShoppingList key={idx} id={shoppingList[idx][1]} name={shoppingList[idx][0]} data={shoppingList[idx]} editModeOn={this.state.editMode} onChange={this.updateData}/>);
                }
            }
        }

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
                {this.state.statusMsg}
                <table>
                    <thead>
                        <tr>
                            <th>목록</th>
                            <th>컴비율(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <Button id="btn-edit" onClick={this.activateEditMode}>수정 모드</Button>
                <Button id="btn-delete" onClick={this.saveData}>저장</Button>
            </div>
        );
    }

    //Get com data for each guide
    callData = async (updated) => {
        var url = "DisplayGuidecomController.php";
        const result = await setData(url, this.props.guideId);
        if(isJson(result)){
            var data = JSON.parse(result);

            this.setState({
                data: data,
                comUpdated: updated,
            });
        }
    }

    //Event Handler
    activateEditMode = () => {
        //Set edit mode true or false
        this.setState({
            editMode: !(this.state.editMode),
            statusMsg: "",
        });
    }

    saveData = async () => {
        const data = [];
        if(this.state.editMode){    //in edit mode only
            for(var idx=0; idx<this.props.shoppingList.length; idx++){
                if(this.props.shoppingList[idx][3] === this.props.guideId){
                    var id = this.props.shoppingList[idx][1];
                    var value = $('input[type=number][name='+this.props.shoppingList[idx][1]+']').val();
                    if(value !== "") data.push([this.props.guideId, id, value]);
                }
            }
            // //Ajax save
            const result = await setData("SaveGuidecom.php", data);
            if(result){
                this.setState({
                    editMode: !(this.state.editMode),
                    statusMsg: <p className="font-green small left">저장 되었습니다.</p>
                });
            }else{
                this.setState({
                    editMode: !(this.state.editMode),
                    statusMsg: <p className="font-red small left">저장에 실패했습니다.</p>
                });
            }

            this.callData(true);
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
            <td>{props.name}</td>
            <td>{data}</td>
        </tr>
    );
}