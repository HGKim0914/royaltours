import React, {Component} from 'react';
import {Table} from 'react-materialize';
import '../css/Guide.css';
import $ from 'jquery';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';

class TourList extends Component{
    constructor(){
        super();

        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        this.state = {
            name: getName,
            authorization: getAuthorization,
            id: getId,
            department: getDepartment,
        }
    }

    render(){
        const data = this.props.data;
        const tour = [];

        for(var idx=0; idx<data.length; idx++){
            tour.push(<DisplayTour key={idx} data={data[idx]} department={this.state.department}/>);
        }

        return(
            <Table>
                <thead>
                    <tr>
                        <td>DATE</td>
                        <td>행사명</td>
                        <td>가이드 성명</td>
                        <td>투어 종류</td>
                        <td style={{width: "100px"}}>정산여부</td>
                        <td style={{width: "50px"}}></td>
                        <td style={{width: "50px"}}></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {tour}
                </tbody>
            </Table>
        );
    }
}

export default TourList;

class DisplayTour extends Component {
    render(){
        const confirmation = [];
        const btnFirst = [];
        const btnSecond = [];
        
        //Guide view
        if(this.props.department === "가이드"){
            //If data sent
            if(this.props.data[5] === "0" || this.props.data[5] === null){
                //if form has not been sent yet
                confirmation.push(<img key="img-not-sent" src={require('../imgs/sent.png')} alt="img-sent-to-admin" id="img-not-sent"/>);
                confirmation.push(<span key="msg-notsent" id="msg-not-sent-to-admin">NOT SENT</span>);

                btnFirst.push(<div key="edit-btn" className="waves-effect waves-light btn btn-modify" onClick={this.accountingFormClickHandler}>수정</div>);
                btnSecond.push(<div key="view-btn" onClick={this.accountingReportClickHandler} className="waves-effect waves-light btn btn-view">보기</div>);
            }else if(this.props.data[5] === "1"){
                confirmation.push(<img key="img-sent" src={require('../imgs/sent.png')} alt="img-sent-to-admin" id="img-sent"/>);
                confirmation.push(<span key="msg-sent" id="msg-sent-to-admin">SENT</span>);

                btnSecond.push(<div key="view-btn" className="waves-effect waves-light btn btn-view" onClick={this.accountingReportClickHandler}>보기</div>);
            }
        //Office & Admin view
        }else{
            //If data is confirmed
            // data[4]: confirmation, data[5]: sent
            if(parseInt(this.props.data[5]) === 0){
                confirmation.push(<img key="img-confirmed" src={require('../imgs/message.png')} alt="img-not-confirmed" id="img-confirmed"/>);
            }else if (parseInt(this.props.data[5]) === 1 && parseInt(this.props.data[4]) === 0){
                confirmation.push(<img key="img-confirmed" src={require('../imgs/message2.png')} alt="img-confirmed" id="img-confirmed"/>);
            } else if (parseInt(this.props.data[5]) === 1 && parseInt(this.props.data[4]) === 1){
                confirmation.push(<div key="text-confirmed" style={{fontWeight: "bold"}}>CONFIRM</div>);
            }
    
            btnFirst.push(<div key="view-btn" className="waves-effect waves-light btn btn-view" onClick={this.accountingReportClickHandler}>보기</div>);
            btnSecond.push(<div key="delete-btn" className="waves-effect waves-light btn btn-delete" onClick={this.deleteTour}>삭제</div>);
        }
        console.log(this.props.data)
        return(
            <tr>
                <td>{this.props.data[0]}</td>
                <td>{this.props.data[1]}</td>
                <td>{this.props.data[2]}</td>
                <td>{this.props.data[3]}</td>
                <td>
                    <div className="tooltip">
                        {confirmation}
                    </div>
                </td>
                <td>{btnFirst}</td>
                <td>{btnSecond}</td>
                {/* Emtpy Column */}
                <td></td>
            </tr>
        );
    }
    
    //Accounting Form - sending data
    accountingFormClickHandler = () => {
        // window.location.href = "/accounting-form/" + this.props.data[1];
        window.open("/accounting-form/" + this.props.data[1]);
    }
    accountingReportClickHandler = () => {
        // window.location.href = "/accounting-report/" + this.props.data[1];
        window.open("/accounting-report/" + this.props.data[1]);
    }

    //Delete tour
    deleteTour = () => {
        var tourcode = this.props.data[1];
        $.ajax({
            url: DatabaseConnectionHelper() + "DeleteTourController.php",
            type: "POST",
            data: {
                param: tourcode,
            },
            success: function(result){
                reloadePage();
            }
        });
    }
}
function reloadePage(){
    window.location.reload(true);
}