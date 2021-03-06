import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import NavBar from './NavigationBar';
import '../css/Office.css';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import $ from 'jquery';

import TourList from './RecentlyAddedTourList';

class ViewAddTour extends Component{
    constructor(){
        super();

        //Prevent unauthorized user to access data
        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getAuthorization === null || (getAuthorization !== null && getAuthorization[5] !== 't')|| getId === ""){
            window.location.href = "/pagenotexist";
        }else{
            var today = this.getCurrentDate();
            this.state = {
                tourDateStart: today,
                tourDateEnd: today,
    
                guideList: [],
                landList: [],
    
                displayLand: false,
    
                selectedGuide: "-",
                selectedInbound: "-",
                selectedLand: "-",
                tourcode: "",
    
                msgError: "",

                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment
            }
    
            //Get Guide Name
            fetch(DatabaseConnectionHelper() + "DisplayGuideController.php")
            .then(res => res.json())
            .then((result) =>
                this.displayGuideList(result),
            );
        }
    }
    componentDidMount(){
        //Get error message 
        var getMsg = sessionStorage.getItem("err-msg");
        var msg = "";
        if(getMsg !== null)msg = getMsg.toString();
        console.log(getMsg);
        if(msg === "1"){
            this.setState({
                msgError: <p id="err-date"><img src={require('../imgs/warning.png')} alt="img-warning"/>?????? ????????? ??????????????????. </p>
            })
        }else if(msg === "2"){
            this.setState({
                msgError: <p id="err-date"><img src={require('../imgs/warning.png')} alt="img-warning"/>???????????? ??????????????? ?????? ???????????????. </p>
            })
        }else if(msg === "3"){
            this.setState({
                msgError: <p id="msg-complete">????????? ??????????????? ??????????????????.</p>
            })
        }

        sessionStorage.removeItem("err-msg");
    }

    render(){
        const guideList = [];
        if(this.state.guideList.length !== 0){
            for(var idx=0; idx<this.state.guideList.length; idx++){
                guideList.push(<option key={idx} value={this.state.guideList[idx][1]}>{this.state.guideList[idx][0]}</option>);
            }
        }
        const land = [];
        const landList = [];

        if(this.state.displayLand){
            if(this.state.landList.length !== 0){
                for(idx=0; idx<this.state.landList.length; idx++){
                    landList.push(<option key={idx} value={this.state.landList[idx][0]}>{this.state.landList[idx][1]}</option>)
                }
            }

            land.push(
                <div key="land">
                    <label>????????????</label>
                    <select className="browser-default" id="input-land" value={this.state.selectedLand} onChange={this.landChangeHandler}>
                        <option defaultValue="-">-</option>
                        {landList}
                    </select>
                </div>
            );
        }

        return(
            <Row>
                <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    <div className="add-tour">
                        <div className="title">
                            <p>????????????</p>
                        </div>
                        <div className="input">
                            <form>
                                {this.state.msgError}
                                <div>
                                    <label>?????? ?????????</label><br />
                                    <input type="date" id="input-date" value={this.state.tourDateStart} onChange={this.dateChangehandler}/>
                                </div>
                                <div>
                                    <label>?????? ?????????</label><br />
                                    <input type="date" id="input-date" value={this.state.tourDateEnd} onChange={this.dateEndChangeHandler}/>
                                </div>
                                <div>
                                    <label>????????????</label><br />
                                    <input type="text" id="input-tourcode" value={this.state.tourcode} onChange={this.tourcodeChangeHandler} />
                                </div>
                                <div>
                                    <label>????????? ??????</label>
                                    <select className="browser-default" id="input-name" value={this.state.selectedGuide} onChange={this.guideChangeHandler}>
                                        <option defaultValue="-">-</option>
                                        {guideList}
                                    </select>
                                </div>
                                <div>
                                    <label>????????????/??????</label>
                                    <select className="browser-default" id="input-inbound" value={this.state.selectedInbound} onChange={this.inboundChangeHandler} >
                                        <option defaultValue="-">-</option>
                                        <option value="????????????">????????????</option>
                                        <option value="??????">??????</option>
                                    </select>
                                </div>
                                {land}
                                <div className="waves-effect waves-light btn" id="btn-add" onClick={this.addTourHandler}>
                                    ?????? ??????
                                </div>
                            </form>
                            <p id="empty">.</p>
                        </div>
                    </div>
                </Col>

                {/* LIST OF TOURS CREATED */}
                <TourList id={this.state.id} />
            </Row>
        );
    }

    displayGuideList = (props) => {
        this.setState({
            guideList: props,
        })
    }
    displayLandList = (props) => {
        this.setState({
            landList: props,
        })
    }
    getCurrentDate = () => {
         //Get current date
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth() + 1;
         var yyyy = today.getFullYear();
 
         if(dd<10) dd = '0'+dd;
         if(mm<10) mm = '0'+mm;

         today = yyyy + '-' + mm + '-' + dd;

        return today;
    }
    dateChangehandler = (obj) => {
        this.setState({
            tourDateStart: obj.target.value,
        });
    }
    dateEndChangeHandler = (obj) => {
        this.setState({
            tourDateEnd: obj.target.value,
        })
    }
    guideChangeHandler = (obj) => {
        this.setState({
            selectedGuide: obj.target.value
        })
    }
    inboundChangeHandler = (obj) => {
        this.setState({
            selectedInbound: obj.target.value,
        });

        if(obj.target.value === '????????????'){

            //Get Land
            fetch(DatabaseConnectionHelper() + "DisplayLandController.php")
            .then(res => res.json())
            .then((result) =>
                this.displayLandList(result),
            );

            this.setState({
                displayLand: true,
            });
        }else{
            this.setState({
                displayLand: false,
                selectedLand: "-"
            });
        }
    }

    tourcodeChangeHandler = (obj) => {
        this.setState({
            tourcode: obj.target.value.trim(),
        })
    }

    landChangeHandler = (obj) => {
        this.setState({
            selectedLand: obj.target.value,
        })
    }

    addTourHandler = () => {
        if(this.compareDates()){
            if(this.state.selectedGuide !== "-"){
                if(this.state.selectedInbound !== "-"){
                    if(this.state.tourcode !== ""){
                        this.setState({
                            msgError: "",
                        });

                        //Send data to PHP
                        $.ajax({
                            url: DatabaseConnectionHelper() + "AddTourController.php",
                            type: "POST",
                            data: {
                                tourcode: this.state.tourcode,
                                startDate: this.state.tourDateStart,
                                endDate: this.state.tourDateEnd,
                                guide: this.state.selectedGuide,
                                inbound: this.state.selectedInbound,
                                land: this.state.selectedLand,
                                uploader: this.state.id,
                            },
                            success: function(result){
                                sessionStorage.setItem("err-msg", result);
                                reloadePage();
                            }
                        });
                    }else{
                        this.setState({
                            msgError: <p id="err-date"><img src={require('../imgs/warning.png')} alt="img-warning"/>??????????????? ??????????????????.</p>
                        });
                    }
                }else{
                    this.setState({
                        msgError: <p id="err-date"><img src={require('../imgs/warning.png')} alt="img-warning"/>????????????/?????? ????????? ??????????????????.</p>
                    });
                }
            }else{
                this.setState({
                    msgError: <p id="err-date"><img src={require('../imgs/warning.png')} alt="img-warning"/>?????? ???????????? ??????????????????. </p>
                });
            }
        }else{
            this.setState({
                msgError: <p id="err-date"><img src={require('../imgs/warning.png')} alt="img-warning"/>??????????????? ??????????????????. </p>
            });
        }
    }

    compareDates = () => {
        // Compare start date and end date
        var startDate = this.state.tourDateStart;
        var endDate = this.state.tourDateEnd;

        if(startDate <= endDate){
            return true;
        }
        return false;
    }
}

export default ViewAddTour;

function reloadePage(){
    window.location.reload(true);
}