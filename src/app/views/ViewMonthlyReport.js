import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import NavBar from './NavigationBar';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';

// import MonthlyReportTable from './MonthlyReport';
class ViewMonthlyReport extends Component{
    constructor(){
        super();
            
        //Prevent unauthorized user to access data
        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getAuthorization === null || (getAuthorization !== null && getAuthorization[4] !== 't') || getId === ""){
            window.location.href = "/pagenotexist";
        }else{
            this.state = {
                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment,
                guideList: [],

                msgErr: "",
            }
        }
    }
    render(){
        return(
            <Row>
                <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    <div className="monthly-netincome">
                        {this.state.msgErr}
                        <SearchData onClick={this.searchReport} onChange={this.updateDate}/>
                    </div>
                </Col>
            </Row>
        );
    }

    searchReport = (start, end, guideName) => {
        var guide = "all";
        if(start !== "" && end !== ""){
            if(guideName !== "전체가이드"){
                guide = guideName;
            }
            window.open('/monthly-report/'+start+"~"+end+'/'+guide);
        }else{
            this.setState({
                msgErr: <p id="err-date"><img src={require('../imgs/warning.png')} alt="img-warning"/>날짜를 선택해주세요. </p>
            })
        }
    }
    updateDate = () => {
        ////////////////////////////////
        this.setState({
            msgErr: "",
        });
    }
}

export default ViewMonthlyReport;

class SearchData extends Component{
    constructor(){
        super();

        this.state = {
            guideList: [],
        }

        //Get Guide Name
        fetch(DatabaseConnectionHelper() + "DisplayGuideController.php")
        .then(res => res.json())
        .then((result) =>
            this.displayGuideList(result),
        );
    }
    render(){
        //Get default date
        var date = new Date();
        var month = date.getMonth();
        month = month + 1;
        if(month < 10){
            month = "0" + month;
        }
        var year = date.getFullYear();
        var enddate = year.toString() + "-" + month.toString();
        var startdate = year + "-01";

        const guideList = [];
        if(this.state.guideList.length !== 0){
            for(var idx=0; idx<this.state.guideList.length; idx++){
                guideList.push(<option key={idx} value={this.state.guideList[idx][1]}>{this.state.guideList[idx][0]}</option>);
            }
        }

        return(
            <Row>
                <div className="search">
                    <div className="title">
                        <p>검색</p>
                    </div>
                    <div className="input">
                        <form>
                            <Col s={12}>
                                <br />
                                <Col s={3}>
                                    <label>FROM</label>
                                    <input type="month" defaultValue={startdate} id="input-date-from" onChange={this.props.onChange} ref={(obj) => this.startObj = obj}/>
                                </Col>
                                <Col s={3}>
                                    <label>TO</label>
                                    <input type="month" defaultValue={enddate} id="input-date-to" onChange={this.props.onChange} ref={(obj) => this.endObj = obj} />
                                </Col>
                                <Col s={3}>
                                    <label>가이드 별</label>
                                    <select className="browser-default" id="input-name" onChange={this.props.onChange} ref={(obj) => this.guideObj = obj}>
                                        <option defaultValue="-">전체가이드</option>
                                        {guideList}
                                    </select>
                                </Col>
                                <Col s={3}>
                                    <div className="waves-effect waves-light btn" id="btn-search" onClick={this.searchDataHandler}>
                                        <img src={require('../imgs/search2.png')} alt="img_search" /> 
                                    </div>
                                </Col>
                            </Col>
                            <p id="empty">.</p>
                        </form>
                    </div>
                </div>
            </Row>
        );
    }
    //Event Handler
    searchDataHandler = () => {
        this.props.onClick(this.startObj.value, this.endObj.value, this.guideObj.value);
    }

    displayGuideList = (props) => {
        this.setState({
            guideList: props,
        })
    }

}