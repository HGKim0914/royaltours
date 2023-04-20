import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import AccountingReportTable from './AccountingReport/AccountingReportTable';
import $ from 'jquery';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import { setData } from '../js/model';
import { isJson, checkIfAuthorized } from '../js/functions';

class AccountingReport extends Component{
    constructor(){
        super();

        //Get tourcode from URL to get the corresponding data
        var formURL = window.location.href.split("/");
        var tourcode = formURL[formURL.length - 1];
        tourcode = decodeURIComponent(tourcode);

        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getId === null){
            window.location.href = "/pagenotexist";
        }else{
            this.state = {
                //user information
                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment,

                tourcode: tourcode,
            }
        }

        this.callTourInfo(tourcode);
    }
    render(){
        var btnObj = "";
        if(this.state.authorization[3] === "t"){
            if(this.state.tourinfo!== undefined && this.state.tourinfo[9] === "0"){
                btnObj = <div className="btn-package">
                    <Col s={4}>
                        <div className="waves-effect waves-light btn" id="btn-resubmit" onClick={this.sentEventHandler}>
                            재검토 필요
                        </div>
                    </Col>
                    <Col s={4}>
                        <div className="waves-effect waves-light btn" id="btn-edit" onClick={this.editEventHandler}>
                            수정
                        </div>
                    </Col>
                    <Col s={4}>
                        <div className="waves-effect waves-light btn" id="btn-confirm" onClick={this.confirmEventHandler}>
                            CONFIRM
                        </div>
                    </Col>
                </div>;
            }else if(this.state.tourinfo!== undefined && this.state.tourinfo[9] === "1"){
                btnObj = <div className="btn-package-guideview btn-package-confirmed-view">
                    <div className="waves-effect waves-light btn" id="btn-edit" onClick={this.editEventHandler}>
                        수정
                    </div>
                </div>;
            }
        }else{
            if(this.state.tourinfo!== undefined && this.state.tourinfo[11] === "0"){
                btnObj = <div className="btn-package-guideview btn-package-confirmed-view">
                        <div className="waves-effect waves-light btn" id="btn-edit" onClick={this.editEventHandler}>
                            수정
                        </div>
                    </div>;  
            }else if(this.state.tourinfo !== undefined && this.state.tourinfo[11] === "1"){
                btnObj = "";
            }
        }
        return(
            <Row>
                <div className="accounting-report">
                    <h6>투어 정산 보고서</h6>
                    <AccountingReportTable />
                    {btnObj}
                </div>
            </Row>
        );
    }

    editEventHandler = () => {
        window.location.href = "/accounting-form/" + this.state.tourcode; 
    }

    confirmEventHandler = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "ConfirmAccountingReport.php",
            type: "POST",
            data: {
                tourcode: this.state.tourcode,
            },
            success: (result) => {
                reloadePage();
            }
        });
    }

    sentEventHandler = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "RejectAccountingFormController.php",
            type: "POST",
            data: {
                tourcode: this.state.tourcode,
            },
            success: () => {
                window.location.href = "/total-tourlist";
            }
        });
    }

    callTourInfo = async (code) => {
        var tourcode = code;
        var result = await setData("GetTour.php", tourcode);
        if(isJson(result)){
            var tourInfo = JSON.parse(result);

            //validate user
            if(tourInfo[12] === this.state.name || checkIfAuthorized(this.state.authorization, 3)){
                if(tourInfo[9] === "1" && this.state.authorization[3] === "f"){
                    window.location.href = "/pagenotexist";
                }else if(tourInfo[10] === "1" && this.state.authorization[3] === "f"){
                    window.location.href = "/pagenotexist";
                }else{
                    
                    this.setState({ //connect to the server
                        tourinfo: tourInfo,
                    });
                }
            }else{
                window.location.href = "/pagenotexist";
            }
        }
    }
}
export default AccountingReport;

//JavaScript
function reloadePage(){
    window.location.reload(true);
}