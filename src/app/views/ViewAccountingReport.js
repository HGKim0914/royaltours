import React, {Component} from 'react';
import {Row} from 'react-materialize';
import $ from 'jquery';
import { setData } from '../js/model';
import { isJson, checkIfAuthorized, getTourcode, reloadPage } from '../js/functions';

import AccountingReportContent from './AccountingReport/AccountingReportTable';

class AccountingReport extends Component{
    constructor(){
        super();
        var formURL = window.location.href.split("/");
        var tourcode = getTourcode(formURL);

        var getId = sessionStorage.getItem("id"); //Get current session
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getId){
            this.state = {
                currentUserName: getName,
                currentuserAuthorization: getAuthorization,
                currentUserId: getId,
                currentUserDepartment: getDepartment,
                tourcode: tourcode,
                alert: "",
            }
            this.callTourData();
        }else{
            window.location.href = "/pagenotexist";
        }

    }

    render(){
        var btns = [];
        if(this.state.tourinfo !== undefined){
            if(this.state.currentuserAuthorization[3] === "t"){
                if(this.state.tourinfo[9] === "0"){
                    btns.push(<div key="resubmit" className="column btn click-btn" id="resubmit" onClick={this.clickEventHandler}>재검토 필요</div>);
                    btns.push(<div key="edit" className="column btn click-btn" id="edit" onClick={this.clickEventHandler}>수정</div>);
                    btns.push(<div key="confirm" className="column btn click-btn" id="confirm" onClick={this.clickEventHandler}>CONFIRM</div>);
                }else if(this.state.tourinfo[9] === "1"){
                    btns.push(<div key="edit" className="column btn click-btn" id="edit" onClick={this.clickEventHandler}>수정</div>);
                }
            }else{
                if(this.state.tourinfo[10] === "0"){
                    btns.push(<div key="edit" className="column btn click-btn" id="edit" onClick={this.clickEventHandler}>수정</div>);
                }
            }
        }
         
        var btnObj = <div className="row btn-package">{btns}</div>;
        
        return(
            <Row>
                {/* alert */}
                {this.state.alert}
                <div className="accounting-report">
                    <h6>투어 정산 보고서</h6>
                    <AccountingReportContent tourinfo={this.state.tourinfo}/>
                    {btnObj}
                </div>
            </Row>
        );
    }

    callTourData = async () => {
        var result = await setData("GetTour.php", this.state.tourcode);
        if(isJson(result)){
            var validation = true;
            var tourinfo = JSON.parse(result);

            if(!tourinfo) window.location.href = "/pagenotexist";
            //validate user data
            if(this.state.currentUserName !== tourinfo[12] && !checkIfAuthorized(this.state.currentuserAuthorization, 3)) validation = false;
            // if(tourinfo[9] === "1" && this.state.currentuserAuthorization[3] === "f") validation = false;
            if(validation){
                this.setState({
                    tourinfo: tourinfo,
                });
                return true;
            }
        }

        // window.location.href = "/pagenotexist";
    }

    clickEventHandler = (event) => {
        switch(event.target.id){
            case "resubmit":
                this.sendbackReport();
            break;
            case "edit":
                window.location.href = "/accounting-form/" + this.state.tourcode;
            break;
            case "confirm":
                this.confirmReport();
            break;
            default: 
            break;
        }
    }
    sendbackReport = async () => {
        var result = await setData("SendbackAccountingReport.php", this.state.tourcode);
        if(result){
            this.setState({
                alert: <div className="alert">이 리포트는 재검토가 필요합니다. 이 창을 닫아주세요.</div>
            });
            alert();
        }
    }

    confirmReport = async () => {
        var result = await setData("ConfirmAccountingReport.php", this.state.tourcode);
        if(result){
            this.setState({
                alert: <div className="alert">리포트가 CONFIRM 되었습니다. CONFIRM된 리포트는 투어 결산에 합산됩니다.</div>
            });
            alert();
            
        }
    }
}

export default AccountingReport;

function alert(){
    $('.alert').slideDown(300);

    setTimeout(function(){
        $('.alert').slideUp(300);
        reloadPage();
    },1000);
}