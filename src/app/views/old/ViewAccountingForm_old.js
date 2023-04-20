import React, { Component } from 'react';
import {Row, Col, Table} from 'react-materialize';
import NavBar from './NavigationBar';
import '../css/Guide.css';
import $ from 'jquery';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';

//Import .js file
import TourInfoInput from './AccountingFormTourInfo';
import CashSettlement from './CashSettlement';
import Expense from './Expense';
import Profit from './Profit';
import AdditionalNote from './AdditionalNote';
import AdminSection from './AdminSection';

class ViewAccountingform extends Component {
    constructor(){
        super();
        // console.log(window.location.href);
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
            //Retrieve data from Database
            this.callDataTourInfo(tourcode);

            this.state = {
                tourInfo: [],
                restaurant: [],
    
                //user information
                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment,
    
                //dataTourInfo input data
                tourcode: tourcode,
                numpax: "",
                numroom: "",
                tourtype: "",
                tc: false,
                updateTc: false,
    
                //Expense input data
                restaurantData: [],
                hotelData: [],
                attrData: [],
                carrentalData: [],
                miscData: [],
    
                //Cash Settlement input Data
                plusFactorData: [],
                minusFactorData: [],
                guideInboundData: [],
                guideLocalData: [],
    
                //Profit input data
                optionData: [],
                shoppingData: [],
                honeyAndBeefData: [],

                //Tour Profit - admin setting
                tourProfit: "",

                //Additional note
                note: "",

    
                //Expense Delete data
                rmCarrentalData: [],
                rmMiscData: [],
                rmAttrData: [],
                rmHotelData: [],
                rmRestData: [], 
    
                //Cash Settlement Delete data
                rmPlusFactorData: [],
                rmMinusFactorData: [],
                rmGuideInboundData: [],
                rmGuideLocalData: [],
    
                //Profit Delete data
                rmShoppingData: [],
                rmOptionData: [],

                loaded: false,
                loadedComponents: [false, false, false, false, false],
            }
        }
    }
    render(){
        var display = "";
        if(!this.state.loadedComponents[0] && !this.state.loadedComponents[1] && !this.state.loadedComponents[2] && !this.state.loadedComponents[3]){
            display = <div className="loading">
                            <img id="loading-image"src={require('../imgs/loading.gif')} alt="Loading..." /><br />
                            로딩중입니다. 잠시만 기다려주세요.
                        </div>
        }
        return(
            <Row>
                <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    {display}
                    <this.accountingForm loaded={this.state.loadedComponents}/>;
                </Col>
            </Row>
        );
    }

    //UI Form
    accountingForm = (props) => {
        if(this.formObj !== undefined){
            if(props.loaded !== undefined){
                if(props.loaded[0] && props.loaded[1] && props.loaded[2] && props.loaded[3]){
                    this.formObj.style.pointerEvents = "auto";
                }else{
                    this.formObj.style.pointerEvents = "none";
                }
            }
        }

        //Button
        var btnObj = "";
        if(this.state.tourInfo !== undefined && this.state.tourInfo[11]  === "1"){
            //If accounting form already sent
            btnObj = <div className="btn-pack-save">
                <div className="waves-effect waves-light btn" id="btn-save" onClick={this.submitForm}>
                    저장
                </div>
            </div>;
        }else{
            //If not
            btnObj =  <div className="btn-pack">
                            <Row>
                                <Col s={6}>
                                    <div className="waves-effect waves-light btn" id="btn-save" onClick={this.saveAccountingForm}>
                                        임시 저장
                                    </div>
                                </Col>
                                <Col s={6}>
                                    <div className="waves-effect waves-light btn" id="btn-send" onClick={this.submitForm}>
                                        보내기
                                    </div>
                                </Col>
                            </Row>
                        </div>;
        }
        
        return(
            <div className="accounting-form" ref={(obj) => this.formObj = obj}>
                <h6>투어 정산 보고서</h6>
                {/* Tour Information */}
                <div className="tour-info">
                    <TourInfo info={this.state.tourInfo} />
                    <TourInfoInput info={this.state.tourInfo} onChange={this.updateTourInfo}/>
                </div>
                <div className="cash-settlement">
                    {/* 정산관리 */}
                    <CashSettlement onChange={this.updateCashSettlement} onClick={this.updateCashSettlementRemove} onLoadedData={this.dataLoaded}/>
                </div>
                <div className="expense">
                    {/* 지출 관리 */}
                    <Expense onChange={this.updateExpense} onClick={this.updateExpenseRemove} onLoadedData={this.dataLoaded}/>
                </div>
                <div className="profit">
                    {/* 수입 관리 */}
                    <Profit onChange={this.updateProfit} onClick={this.updateProfitRemove} tc={this.state.tc} guidename={this.state.tourInfo[3]} onLoadedData={this.dataLoaded}/>
                </div>
                <div className="admin-section">
                    <AdminSection onChange={this.updateTourProfit} onLoadedData={this.dataLoaded}/>
                </div>
                    {/* Additional Note */}
                <div className="additional-note">
                    <AdditionalNote onChange={this.updateAdditionalNote} onLoadedData={this.dataLoaded}/>
                </div>
                {/* Button */}
               {btnObj}
            </div>
        );
    }

    //Call data from database
    callDataTourInfo = (code) => {
        var tourcode = code;
        $.ajax({
            url: DatabaseConnectionHelper() + "GetTourInfoController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setDataTourInfo(result);
                this.dataLoaded("tourinfo");
            }
        });
        
    }
    
    setDataTourInfo = (result) => {
        if(result !== "" && result !== "false"){
            var tourInfo = JSON.parse(result);
            //Check if unauthorized user enters to the system
            if(tourInfo[0][3] === this.state.name || this.state.authorization[3] === "t"){
                if(tourInfo[0][10] === "1" && this.state.authorization[3] === "f"){
                    window.location.href = "/pagenotexist";
                }else if(tourInfo[0][11] === "1" && this.state.authorization[3] === "f"){
                    window.location.href = "/pagenotexist";
                }else{
                    this.setState({
                        tourInfo: tourInfo[0],
                        numpax: tourInfo[0][7],
                        numroom: tourInfo[0][8],
                        tourtype: tourInfo[0][5],
                        tc: tourInfo[0][6],
                    });
                }
            }else{
                window.location.href = "/pagenotexist";
            }
        }
    }

    dataLoaded = (component) => {
        let loadedComponents = JSON.parse(JSON.stringify(this.state.loadedComponents));
        //When all components have been loaded
        if(component === "tourinfo"){
            loadedComponents[0] = true;
        }else if(component === "expense"){
            loadedComponents[1] = true;
        }else if(component === "profit"){
            loadedComponents[2] = true;
        }else if(component === "additionalnote"){
            loadedComponents[3] = true;
        }else if(component === "tourprofit"){
            loadedComponents[4] = true;
        }

        this.setState({
            loadedComponents: loadedComponents,
        });
    }

    //Update data
    updateTourInfo = (event) => {
        if(event.target.id === "input-num"){
            this.setState({
                numpax: event.target.value,
            });
        }else if(event.target.id === "input-roomnum"){
            this.setState({
                numroom: event.target.value
            });
        }else if(event.target.id === "input-tourtype"){
            if(event.target.value !== "-"){
                this.setState({
                    tourtype: event.target.value
                }, () => console.log(this.state.tourtype));
            }
        }else if(event.target.id === "input-tc"){
            if(event.target.checked){
                this.setState({
                    tc: true,
                });
            }else{
                this.setState({
                    tc: false,
                })
            }

            this.setState({
                updateTc: !this.state.updateTc,
            })
        }
    }
    updateCashSettlement = (event, obj) => {
        var ind;
        var id = event.target.id;
        var temp;

        if(id === "input-plus-amount" || id === "input-plus-memo"){
            //Plus factor
            ind = -1;
            var name = event.target.name;
            var value = event.target.value;

            for(var idx=0; idx<this.state.plusFactorData.length; idx++){
                if(this.state.plusFactorData[idx][0] === name){
                    ind = idx;
                    break;
                }
            }

            if(ind === -1){ //if data does not exist in array
                var plusFactorData = [name, "", ""];
                if(id === "input-plus-amount"){
                    plusFactorData[1] = value;
                }else if(id === "input-plus-memo"){
                    plusFactorData[2] = value;
                }
                if(obj !== undefined){
                    if(obj.length > 0){
                        for(idx = 0; idx< obj.length; idx++){
                            temp = obj[idx].id;
                            if(temp === "input-plus-amount"){
                                plusFactorData[1] = obj[idx].value;
                            }else if(temp === "input-plus-memo"){
                                plusFactorData[2] = obj[idx].value;
                            }
                        }
                    }
                }

                this.setState({
                    plusFactorData: [...this.state.plusFactorData, plusFactorData]
                }, () => console.log(this.state.plusFactorData));
            }else{
                let plusFactorDataCopy = JSON.parse(JSON.stringify(this.state.plusFactorData));
                if(id === "input-plus-amount"){
                    plusFactorDataCopy[ind][1] = value;
                }else if(id === "input-plus-memo"){
                    plusFactorDataCopy[ind][2] = value;
                }

                this.setState({
                    plusFactorData: plusFactorDataCopy,
                }, () => console.log(this.state.plusFactorData));
            }
        }else if(id === "input-minus-amount" || id === "input-minus-memo"){
            //Minus factor
            ind = -1;
            name = event.target.name;
            value = event.target.value;

            for(idx = 0; idx<this.state.minusFactorData.length; idx++){
                if(this.state.minusFactorData[idx][0] === name){
                    ind = idx;
                    break;
                }
            }

            if(ind === -1){
                var minusFactorData = [name, "", ""];
                if(id === "input-minus-amount"){
                    minusFactorData[1] = value;
                }else if(id === "input-minus-memo"){
                    minusFactorData[2] = value;
                }

                if(obj !== undefined){
                    if(obj.length > 0){
                        for(idx = 0; idx< obj.length; idx++){
                            temp = obj[idx].id;
                            if(temp === "input-minus-amount"){
                                minusFactorData[1] = obj[idx].value;
                            }else if(temp === "input-minus-memo"){
                                minusFactorData[2] = obj[idx].value;
                            }
                        }
                    }
                }
                this.setState({
                    minusFactorData: [...this.state.minusFactorData, minusFactorData]
                }, () => console.log(this.state.minusFactorData));
            }else{
                let minusFactorDataCopy = JSON.parse(JSON.stringify(this.state.minusFactorData));
                if(id === "input-minus-amount"){
                    minusFactorDataCopy[ind][1] = value;
                }else if(id === "input-minus-memo"){
                    minusFactorDataCopy[ind][2] = value;
                }

                this.setState({
                    minusFactorData: minusFactorDataCopy,
                }, () => console.log(this.state.minusFactorData));
            }
        }else if(id === "input-guide-inbound-numpax" || id === "input-guide-inbound-amount" || id === "input-guide-inbound-memo"){
            //Guide inbound
            ind = -1;
            name = event.target.name;
            value = event.target.value;

            for(idx = 0; idx<this.state.guideInboundData.length; idx++){
                if(this.state.guideInboundData[idx][0] === name){
                    ind = idx;
                    break;
                }
            }

            if(ind === -1){
                var inboundData = [name, "","",""];
                if(id === "input-guide-inbound-numpax"){
                    inboundData[1] = value;
                }else if(id === "input-guide-inbound-amount"){
                    inboundData[2] = value;
                }else if(id === "input-guide-inbound-memo"){
                    inboundData[3] = value;
                }

                if(obj !== undefined){
                    if(obj.length > 0){
                        for(idx=0; idx<obj.length; idx++){
                            temp = obj[idx].id;
                            if(temp === "input-guide-inbound-numpax"){
                                inboundData[1] = obj[idx].value;
                            }else if(temp === "input-guide-inbound-amount"){
                                inboundData[2] = obj[idx].value;
                            }else if(temp === "input-guide-inbound-memo"){
                                inboundData[3] = obj[idx].value;
                            }
                        }
                    }
                }

                this.setState({
                    guideInboundData: [...this.state.guideInboundData, inboundData]
                }, () => console.log(this.state.guideInboundData));
            }else{
                let inboundDataCopy = JSON.parse(JSON.stringify(this.state.guideInboundData));
                if(id === "input-guide-inbound-numpax"){
                    inboundDataCopy[ind][1] = value;
                }else if(id === "input-guide-inbound-amount"){
                    inboundDataCopy[ind][2] = value;
                }else if(id === "input-guide-inbound-memo"){
                    inboundDataCopy[ind][3] = value;
                }

                this.setState({
                    guideInboundData: inboundDataCopy,
                }, ()=> console.log(this.state.guideInboundData));
            }
        }else if(id === "input-guide-local-age" || id === "input-guide-local-numpax" || id === "input-guide-local-amount" || id === "input-guide-local-memo"){
             //Guide local
             ind = -1;
             name = event.target.name;
             value = event.target.value;
 
             for(idx = 0; idx<this.state.guideLocalData.length; idx++){
                 if(this.state.guideLocalData[idx][0] === name){
                     ind = idx;
                     break;
                 }
             }
 
             if(ind === -1){
                 var localData = [name, "", "",""];
                 if(id === "input-guide-local-numpax"){
                     localData[1] = value;
                 }else if(id === "input-guide-local-amount"){
                     localData[2] = value;
                 }else if(id === "input-guide-local-memo"){
                     localData[3] = value;
                 }

                 
                 if(obj !== undefined){
                     if(obj.length > 0){
                         for(idx=0; idx<obj.length; idx++){
                             temp = obj[idx].id;
                             
                             if(temp === "input-guide-local-numpax"){
                                localData[1] = obj[idx].value;
                            }else if(temp === "input-guide-local-amount"){
                                localData[2] = obj[idx].value;
                            }else if(temp === "input-guide-local-memo"){
                                localData[3] = obj[idx].value;
                            }
                         }
                     }
                 }
 
                 this.setState({
                     guideLocalData: [...this.state.guideLocalData, localData]
                 }, () => console.log(this.state.guideLocalData));
             }else{
                 let localDataCopy = JSON.parse(JSON.stringify(this.state.guideLocalData));
                 if(id === "input-guide-local-numpax"){
                    localDataCopy[ind][1] = value;
                 }else if(id === "input-guide-local-amount"){
                     localDataCopy[ind][2] = value;
                 }else if(id === "input-guide-local-memo"){
                     localDataCopy[ind][3] = value;
                 }
 
                 this.setState({
                     guideLocalData: localDataCopy,
                 }, ()=> console.log(this.state.guideLocalData));
             }
        }
    }
    updateExpense = (event, obj) => {
        var ind;
        var id = event.target.id;
        if(id === "option-rest-name" || id === "input-rest-amount" || id === "input-rest-num-people" || id === "option-rest-paymentmethod"){
            //Restaurant
            ind = -1;
            var name = event.target.name;
            var value = event.target.value;

            for(var idx=0; idx<this.state.restaurantData.length; idx++){
                if(this.state.restaurantData[idx][0] === name){
                    ind = idx;
                    break;
                }
            }

            if(ind === -1){
                var restData = [name, "", "", "", ""];
                if(id === "option-rest-name"){
                    restData[1] = value;
                }else if(id === "input-rest-amount"){
                    restData[2] = value;
                }else if(id === "input-rest-num-people"){
                    restData[3] = value;
                }else if(id === "option-rest-paymentmethod"){
                    restData[4] = value;
                }

                var temp;
                if(obj !== undefined){
                    //Check if other input has default data
                    if(obj.length > 0){
                        for(idx=0; idx<obj.length; idx++){
                            temp = obj[idx].id;
                            if(temp === "option-rest-name"){
                                restData[1] = obj[idx].value;
                            }else if(temp === "input-rest-amount"){
                                restData[2] = obj[idx].value;
                            }else if(temp === "input-rest-num-people"){
                                restData[3] = obj[idx].value;
                            }else if(temp === "option-rest-paymentmethod"){
                                restData[4] = obj[idx].value;
                            }
                        }
                    }
                }
                
                this.setState({
                    restaurantData: [...this.state.restaurantData, restData],
                }, () => console.log(this.state.restaurantData));
            }else{
                let restDataCopy = JSON.parse(JSON.stringify(this.state.restaurantData));

                if(id === "option-rest-name"){
                    restDataCopy[ind][1] = value;
                }else if(id === "input-rest-amount"){
                    restDataCopy[ind][2] = value;
                }else if(id === "input-rest-num-people"){
                    restDataCopy[ind][3] = value;
                }else if(id === "option-rest-paymentmethod"){
                    restDataCopy[ind][4] = value;
                }

                this.setState({
                    restaurantData: restDataCopy,
                }, () => console.log(this.state.restaurantData));
            }

        }else if(id === "option-hotel" || id === "input-hotel-checkin" || id === "input-hotel-checkout" || id === "input-hotel-num-room" || id === "input-hotel-amount" || id === "option-hotel-paymentmethod"){
            ind = -1;
            for(idx=0; idx<this.state.hotelData.length; idx++){
                if(this.state.hotelData[idx][0] === event.target.name){
                    //if the array exists in state
                    ind = idx;
                    break;
                }
            }
            if(ind === -1){
                var hotelData = [event.target.name, "", "", "", "", "", ""];
                
                if(id === "option-hotel"){
                    hotelData[1] = event.target.value;
                }else if(id === "input-hotel-checkin"){
                    hotelData[2] = event.target.value;
                }else if(id === "input-hotel-checkout"){
                    hotelData[3] = event.target.value;
                }else if(id === "option-hotel-paymentmethod"){
                    hotelData[4] = event.target.value;
                }else if(id === "input-hotel-num-room"){
                    hotelData[5] = event.target.value;
                }else if(id === "input-hotel-amount"){
                    hotelData[6] = event.target.value;
                }
                // if(obj !== undefined){
                    //Check if other input has default data
                    if(obj.length > 0){
                        for(idx=0; idx<obj.length; idx++){
                            temp = obj[idx].id;
                            if(temp === "option-hotel"){
                                hotelData[1] = obj[idx].value;
                            }else if(temp === "input-hotel-checkin"){
                                hotelData[2] = obj[idx].value;
                            }else if(temp === "input-hotel-checkout"){
                                hotelData[3] = obj[idx].value;
                            }else if(temp === "option-hotel-paymentmethod"){
                                hotelData[4] = obj[idx].value;
                            }else if(temp === "input-hotel-num-room"){
                                hotelData[5] = obj[idx].value;
                            }else if(temp === "input-hotel-amount"){
                                hotelData[6] = obj[idx].value;
                            }
                        }
                    }
                // }
                this.setState({
                    hotelData: [...this.state.hotelData, hotelData]
                }, () => console.log(this.state.hotelData));
            }else{
                let hotelDataCopy = JSON.parse(JSON.stringify(this.state.hotelData));

                if(id === "option-hotel"){
                    hotelDataCopy[ind][1] = event.target.value;
                }else if(id === "input-hotel-checkin"){
                    hotelDataCopy[ind][2] = event.target.value;
                }else if(id === "input-hotel-checkout"){
                    hotelDataCopy[ind][3] = event.target.value;
                }else if(id === "option-hotel-paymentmethod"){
                    hotelDataCopy[ind][4] = event.target.value;
                }else if(id === "input-hotel-num-room"){
                    hotelDataCopy[ind][5] = event.target.value;
                }else if(id === "input-hotel-amount"){
                    hotelDataCopy[ind][6] = event.target.value;
                }

                this.setState({
                    hotelData: hotelDataCopy,
                }, () => console.log(this.state.hotelData));
            }
        }else if(id === "option-attr" || id === "input-attr-num-people" || id === "input-attr-amount" || id === "option-attr-paymentmethod" || id === "input-attr-date"){
            ind = -1;
            for(idx=0; idx<this.state.attrData.length; idx++){
                if(this.state.attrData[idx][0] === event.target.name){
                    //if the array exists in state
                    ind = idx;
                    break;
                }
            }
            if(ind === -1){
                var attrData = [event.target.name, "","","","",""];

                if(id === "option-attr"){
                    attrData[1] = event.target.value;
                }else if(id === "input-attr-num-people"){
                    attrData[2] = event.target.value;
                }else if(id === "input-attr-amount"){
                    attrData[3] = event.target.value;
                }else if(id === "option-attr-paymentmethod"){
                    attrData[4] = event.target.value;
                }else if(id === "input-attr-date"){
                    attrData[5] = event.target.value;
                }

                if(obj !== undefined){
                    //Check if other input has default data
                    if(obj.length > 0){
                        for(idx=0; idx<obj.length; idx++){
                            temp = obj[idx].id;
                            if(temp === "option-attr"){
                                attrData[1] = obj[idx].value;
                            }else if(temp === "input-attr-num-people"){
                                attrData[2] = obj[idx].value;
                            }else if(temp === "input-attr-amount"){
                                attrData[3] = obj[idx].value;
                            }else if(temp === "option-attr-paymentmethod"){
                                attrData[4] = obj[idx].value;
                            }else if(temp === "input-attr-date"){
                                attrData[5] = obj[idx].value;
                            }
                        }
                    }
                }
                this.setState({
                    attrData: [...this.state.attrData, attrData]
                }, () => console.log(this.state.attrData)); 
            }else{
                let attrDataCopy = JSON.parse(JSON.stringify(this.state.attrData));

                if(id === "option-attr"){
                    attrDataCopy[ind][1] = event.target.value;
                }else if(id === "input-attr-num-people"){
                    attrDataCopy[ind][2] = event.target.value;
                }else if(id === "input-attr-amount"){
                    attrDataCopy[ind][3] = event.target.value;
                }else if(id === "option-attr-paymentmethod"){
                    attrDataCopy[ind][4] = event.target.value;
                }else if(id === "input-attr-date"){
                    attrDataCopy[ind][5] = event.target.value;
                }
                this.setState({
                    attrData: attrDataCopy,
                }, () => console.log(this.state.attrData));
            }
        }else if(id === "option-carrental-carcompany" || id === "input-carrental-from" || id === "input-carrental-to" || id === "option-carrental-car" || id === "input-carrental-amount" || id === "option-carrental-paymentmethod"){
            ind = -1;
            for(idx=0; idx<this.state.carrentalData.length; idx++){
                if(this.state.carrentalData[idx][0] === event.target.name){
                    //if the array exists in state
                    ind = idx;
                    break;
                }
            }
            if(ind === -1){
                var carrentalData = [event.target.name, "","","","","",""];

                if(id === "option-carrental-carcompany"){
                    carrentalData[1] = event.target.value;
                }else if(id === "input-carrental-from"){
                    carrentalData[2] = event.target.value;
                }else if(id === "input-carrental-to"){
                    carrentalData[3] = event.target.value;
                }else if(id === "option-carrental-car"){
                    carrentalData[4] = event.target.value;
                }else if(id === "input-carrental-amount"){
                    carrentalData[5] = event.target.value;
                }else if(id === "option-carrental-paymentmethod"){
                    carrentalData[6] = event.target.value;
                }

                if(obj !== undefined){
                    //Check if other input has default data
                    if(obj.length > 0){
                        for(idx=0; idx<obj.length; idx++){
                            temp = obj[idx].id;
                            if(temp === "option-carrental-carcompany"){
                                carrentalData[1] = obj[idx].value;
                            }else if(temp === "input-carrental-from"){
                                carrentalData[2] = obj[idx].value;
                            }else if(temp === "input-carrental-to"){
                                carrentalData[3] = obj[idx].value;
                            }else if(temp === "option-carrental-car"){
                                carrentalData[4] = obj[idx].value;
                            }else if(temp === "input-carrental-amount"){
                                carrentalData[5] = obj[idx].value;
                            }else if(temp === "option-carrental-paymentmethod"){
                                carrentalData[6] = obj[idx].value;
                            }
                        }
                    }
                }
                this.setState({
                    carrentalData: [...this.state.carrentalData, carrentalData]
                }, () => console.log(this.state.carrentalData)); 
            }else{
                let carrentalDataCopy = JSON.parse(JSON.stringify(this.state.carrentalData));

                if(id === "option-carrental-carcompany"){
                    carrentalDataCopy[ind][1] = event.target.value;
                }else if(id === "input-carrental-from"){
                    carrentalDataCopy[ind][2] = event.target.value;
                }else if(id === "input-carrental-to"){
                    carrentalDataCopy[ind][3] = event.target.value;
                }else if(id === "option-carrental-car"){
                    carrentalDataCopy[ind][4] = event.target.value;
                }else if(id === "input-carrental-amount"){
                    carrentalDataCopy[ind][5] = event.target.value;
                }else if(id === "option-carrental-paymentmethod"){
                    carrentalDataCopy[ind][6] = event.target.value;
                }

                this.setState({
                    carrentalData: carrentalDataCopy,
                }, () => console.log(this.state.carrentalData));
            }
        }else if(id === "input-misc-amount" || id === "option-misc-paymentmethod" || id === "input-misc-memo"){
            ind = -1;
            for(idx = 0; idx<this.state.miscData.length; idx++){
                if(this.state.miscData[idx][0] === event.target.name){
                    ind = idx;
                    break;
                }
            }
            if(ind === -1){
                var miscData = [event.target.name, "","",""];
                if(id === "input-misc-amount"){
                    miscData[1] = event.target.value;
                }else if(id === "option-misc-paymentmethod"){
                    miscData[2] = event.target.value;
                }else if(id === "input-misc-memo"){
                    miscData[3] = event.target.value;
                }

                if(obj !== undefined){
                    //Check if other input has default data
                    if(obj.length > 0){
                        for(idx=0; idx<obj.length; idx++){
                            temp = obj[idx].id;
                            if(temp === "input-misc-amount"){
                                miscData[1] = obj[idx].value;
                            }else if(temp === "option-misc-paymentmethod"){
                                miscData[2] = obj[idx].value;
                            }else if(temp === "input-misc-memo"){
                                miscData[3] = obj[idx].value;
                            }
                        }
                    }
                }

                this.setState({
                    miscData: [...this.state.miscData, miscData]
                }, () => console.log(this.state.miscData)); 
            }else{
                let miscDataCopy = JSON.parse(JSON.stringify(this.state.miscData));

                if(id === "input-misc-amount"){
                    miscDataCopy[ind][1] = event.target.value;
                }else if(id === "option-misc-paymentmethod"){
                    miscDataCopy[ind][2] = event.target.value;
                }else if(id === "input-misc-memo"){
                    miscDataCopy[ind][3] = event.target.value;
                }

                this.setState({
                    miscData: miscDataCopy,
                }, () => console.log(this.state.miscData));
            }
        }
        
    }
    updateProfit = (event, obj) => {
        var ind = -1;
        var id = event.target.id;
        if(id === "option-option-name" || id === "option-option-com" || id === "input-option-originalprice" || id === "input-option-saleprice" || id === "input-option-misc"){
            var name = event.target.name;
            var value = event.target.value;

            for(var idx=0; idx<this.state.optionData.length; idx++){
                if(this.state.optionData[idx][0] === name){
                    ind = idx;
                    break;
                }
            }

            if(ind === -1){
                var optionData = [name, "","","","",""];
                if(id === "option-option-name"){
                    optionData[1] = value;
                }else if(id === "option-option-com"){
                    optionData[2] = value;
                }else if(id === "input-option-originalprice"){
                    optionData[3] = value;
                }else if(id === "input-option-saleprice"){
                    optionData[4] = value;
                }else if(id === "input-option-misc"){
                    optionData[5] = value;
                }

                var temp;
                if(obj !== undefined){
                    if(obj.length > 0){
                        for(idx=0; idx<obj.length;idx++){
                            temp = obj[idx].id;
                            if(temp === "option-option-name"){
                                optionData[1] = obj[idx].value;
                            }else if(temp === "option-option-com"){
                                optionData[2] = obj[idx].value;
                            }else if(temp === "input-option-originalprice"){
                                optionData[3] = obj[idx].value;
                            }else if(temp === "input-option-saleprice"){
                                optionData[4] = obj[idx].value;
                            }else if(temp === "input-option-misc"){
                                optionData[5] = obj[idx].value;
                            }
                        }
                    }
                }
                this.setState({
                    optionData: [...this.state.optionData, optionData],
                }, () => console.log(this.state.optionData));
            }else{
                let optionDataCopy = JSON.parse(JSON.stringify(this.state.optionData));
                
                if(id === "option-option-name"){
                    optionDataCopy[ind][1] = value;
                }else if(id === "option-option-com"){
                    optionDataCopy[ind][2] = value;
                }else if(id === "input-option-originalprice"){
                    optionDataCopy[ind][3] = value;
                }else if(id === "input-option-saleprice"){
                    optionDataCopy[ind][4] = value;
                }else if(id === "input-option-misc"){
                    optionDataCopy[ind][5] = value;
                }

                this.setState({
                    optionData: optionDataCopy,
                }, () => console.log(this.state.optionData));
            }
        }else if(id === "option-shopping-name" || id === "input-shopping-amount"){
            name = event.target.name;
            value = event.target.value;

            for(idx = 0; idx<this.state.shoppingData.length; idx++){
                if(this.state.shoppingData[idx][0] === name){
                    ind = idx;
                    break;
                }
            }

            if(ind === -1){
                var shoppingData = [name, "",""];
                if(id === "option-shopping-name"){
                    shoppingData[1] = value;
                }else if(id === "input-shopping-amount"){
                    shoppingData[2] = value;
                }

                if(obj !== undefined){
                    if(obj.length > 0){
                        for(idx=0; idx<obj.length; idx++){
                            temp = obj[idx].id;
                            if(temp === "option-shopping-name"){
                                shoppingData[1] = obj[idx].value;
                            }else if(temp === "input-shopping-amount"){
                                shoppingData[2] = obj[idx].value;
                            }
                        }
                    }
                }
                
                this.setState({
                    shoppingData: [...this.state.shoppingData, shoppingData]
                }, () => console.log(this.state.shoppingData));
            }else{
                let shoppingDataCopy = JSON.parse(JSON.stringify(this.state.shoppingData));

                if(id === "option-shopping-name"){
                    shoppingDataCopy[ind][1] = value;
                }else if(id === "input-shopping-amount"){
                    shoppingDataCopy[ind][2] = value;
                }

                this.setState({
                    shoppingData: shoppingDataCopy
                }, () => console.log(this.state.shoppingData));
            }
        }else if(id === "input-beefandhoney-num" || id === "input-beefandhoney-amount" || id === "input-beefandhoney-originalprice" || id === "option-beefandhoney-com"){
            //Beef or honey
            name = event.target.name;
            value = event.target.value;

            for(idx=0; idx<this.state.honeyAndBeefData.length; idx++){
                if(this.state.honeyAndBeefData[idx][0] === name){
                    ind = idx;
                    break;
                }
            }

            if(ind === -1){
                var honeyAndBeefData = [name, "","","", ""];
                if(id === "input-beefandhoney-num"){
                    honeyAndBeefData[1] = value;
                }else if(id === "input-beefandhoney-amount"){
                    honeyAndBeefData[2] = value;
                }else if(id === "input-beefandhoney-originalprice"){
                    honeyAndBeefData[3] = value;
                }else if(id === "option-beefandhoney-com"){
                    honeyAndBeefData[4] = value;
                }
                
                if(obj !== undefined){
                    for(idx=0; idx<obj.length; idx++){
                        temp = obj[idx].id;
                        if(temp === "input-beefandhoney-num"){
                            honeyAndBeefData[1] = obj[idx].value;
                        }else if(temp === "input-beefandhoney-amount"){
                            honeyAndBeefData[2] = obj[idx].value;
                        }else if(temp === "input-beefandhoney-originalprice"){
                            honeyAndBeefData[3] = obj[idx].value;
                        }else if(temp === "option-beefandhoney-com"){
                            honeyAndBeefData[4] = obj[idx].value;
                        }
                    }
                }

                this.setState({
                    honeyAndBeefData: [...this.state.honeyAndBeefData, honeyAndBeefData]
                }, ()=> console.log(this.state.honeyAndBeefData));
            }else{
                let honeyAndBeefDataCopy = JSON.parse(JSON.stringify(this.state.honeyAndBeefData));

                if(id === "input-beefandhoney-num"){
                    honeyAndBeefDataCopy[ind][1] = value;
                }else if(id === "input-beefandhoney-amount"){
                    honeyAndBeefDataCopy[ind][2] = value;
                }else if(id === "input-beefandhoney-originalprice"){
                    honeyAndBeefDataCopy[ind][3] = value;
                }else if(id === "option-beefandhoney-com"){
                    honeyAndBeefDataCopy[ind][4] = value;
                }

                this.setState({
                    honeyAndBeefData: honeyAndBeefDataCopy
                }, () => console.log(this.state.honeyAndBeefData));
            }
        }
    }
    updateAdditionalNote = (event) => {
        this.setState({
            note: event.target.value,
        });
    }

    updateTourProfit = (event) => {
        this.setState({
            tourProfit: event.target.value
        })
    }

    //Remove data
    updateExpenseRemove = (data, addOrRm, obj) => {
        if(obj === "carrental"){
            //Car Rental
            if(addOrRm === "remove"){
                var duplicate = false;
                if(data !== undefined){
                    for(var idx=0; idx<this.state.rmCarrentalData.length; idx++){
                        if(this.state.rmCarrentalData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }

                    if(!duplicate){
                        this.setState({
                            rmCarrentalData: [...this.state.rmCarrentalData, data],
                        }, () => console.log(this.state.rmCarrentalData));
                    }
                }
            }else if(addOrRm === "add"){
                let carrentalCopy = [];
                var rmValue = this.state.rmCarrentalData[this.state.rmCarrentalData.length-1];
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmCarrentalData.length; idx++){
                        if(this.state.rmCarrentalData[idx] !== rmValue){
                            carrentalCopy.push(this.state.rmCarrentalData[idx]);
                        }
                    }
                }
                this.setState({
                    rmCarrentalData: carrentalCopy,
                }, () => console.log(this.state.rmCarrentalData));
            }
        }else if(obj === "misc"){
            //MISC
            if(addOrRm === "remove"){
                duplicate = false;
                if(data !== undefined){
                    for(idx = 0; idx<this.state.rmMiscData.length; idx++){
                        if(this.state.rmMiscData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }
                    if(!duplicate){
                        this.setState({
                            rmMiscData: [...this.state.rmMiscData, data],
                        }, () => console.log(this.state.rmMiscData));
                    }
                }
            }else if(addOrRm === "add"){
                let miscCopy = [];
                rmValue = this.state.rmMiscData[this.state.rmMiscData.length-1];
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmMiscData.length; idx++){
                        if(this.state.rmMiscData[idx] !== rmValue){
                            miscCopy.push(this.state.rmMiscData[idx]);
                        }
                    }
                }
                this.setState({
                    rmMiscData: miscCopy,
                }, () => console.log(this.state.rmMiscData));
            }
        }else if(obj === "attr"){
            if(addOrRm === "remove"){
                duplicate = false;
                if(data !== undefined){
                    for(idx = 0; idx<this.state.rmAttrData.length; idx++){
                        if(this.state.rmAttrData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }
                    if(!duplicate){
                        this.setState({
                            rmAttrData: [...this.state.rmAttrData, data],
                        }, ()=> console.log(this.state.rmAttrData));
                    }
                }
            }else if(addOrRm === "add"){
                let attrCopy = [];
                rmValue = this.state.rmAttrData[this.state.rmAttrData.length-1];
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmAttrData.length; idx++){
                        if(this.state.rmAttrData[idx] !== rmValue){
                            attrCopy.push(this.state.rmAttrData[idx]);
                        }
                    }
                }
                this.setState({
                    rmAttrData: attrCopy,
                }, () => console.log(this.state.rmAttrData));
            }
        }else if(obj === "hotel"){
            if(addOrRm === "remove"){
                duplicate = false;
                if(data !== undefined){
                    for(idx = 0; idx<this.state.rmHotelData.length; idx++){
                        if(this.state.rmHotelData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }
                    if(!duplicate){
                        this.setState({
                            rmHotelData: [...this.state.rmHotelData, data],
                        }, () => console.log(this.state.rmHotelData));
                    }
                }
            }else if(addOrRm === "add"){
                let hotelCopy = [];
                rmValue = this.state.rmHotelData[this.state.rmHotelData.length-1];
                for(idx=0; idx<this.state.rmHotelData.length; idx++){
                    if(this.state.rmHotelData[idx] !== rmValue){
                        hotelCopy.push(this.state.rmHotelData[idx]);
                    }
                }
                this.setState({
                    rmHotelData: hotelCopy,
                }, () => console.log(this.state.rmHotelData));
            }
        }else if(obj === "rest"){
            if(addOrRm === "remove"){
                duplicate = false;
                if(data !== undefined && data.length > 0){
                    for(idx = 0; idx<this.state.rmRestData.length; idx++){
                        for(var ind = 0; ind<this.state.rmRestData[idx].length; ind++){
                            if(this.state.rmRestData[idx][ind][2] === data[0][2]){
                                duplicate = true;
                                break;
                            }
                        }
                    }
                    if(!duplicate){
                        this.setState({
                            rmRestData: [...this.state.rmRestData, data],
                        }, () => console.log(this.state.rmRestData));
                    }
                }
            }else if(addOrRm === "add"){
                let restCopy = [];
                rmValue = this.state.rmRestData[this.state.rmRestData.length-1];
                for(idx=0; idx<this.state.rmRestData.length; idx++){
                    if(this.state.rmRestData[idx] !== rmValue){
                        restCopy.push(this.state.rmRestData[idx]);
                    }
                }
                this.setState({
                    rmRestData: restCopy,
                }, () => console.log(this.state.rmRestData));
            }
        }
    }
    updateCashSettlementRemove = (data, addOrRm, obj) => {
        if(obj === "plusfactor"){
            if(addOrRm === "remove"){
                var duplicate = false;
                if(data !== undefined){
                    for(var idx=0; idx<this.state.rmPlusFactorData.length; idx++){
                        if(this.state.rmPlusFactorData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }

                    if(!duplicate){
                        this.setState({
                            rmPlusFactorData: [...this.state.rmPlusFactorData, data],
                        }, () => console.log(this.state.rmPlusFactorData));
                    }
                }
            }else if(addOrRm === "add"){
                let plusfactorCopy = [];
                var rmValue = this.state.rmPlusFactorData[this.state.rmPlusFactorData.length - 1];
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmPlusFactorData.length; idx++){
                        if(this.state.rmPlusFactorData[idx] !== rmValue){
                            plusfactorCopy.push(this.state.rmPlusFactorData[idx]);
                        }
                    }
                }
                this.setState({
                    rmPlusFactorData: plusfactorCopy
                }, () => console.log(this.state.rmPlusFactorData));
            }
        }else if(obj === "minusfactor"){
            if(addOrRm === "remove"){
                duplicate = false;
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmMinusFactorData.length; idx++){
                        if(this.state.rmMinusFactorData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }

                    if(!duplicate){
                        this.setState({
                            rmMinusFactorData: [...this.state.rmMinusFactorData, data],
                        }, () => console.log(this.state.rmMinusFactorData));
                    }
                }
            }else if(addOrRm === "add"){
                let minusfactorCopy = [];
                rmValue = this.state.rmMinusFactorData[this.state.rmMinusFactorData.length - 1];
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmMinusFactorData.length; idx++){
                        if(this.state.rmMinusFactorData[idx] !== rmValue){
                            minusfactorCopy.push(this.state.rmMinusFactorData[idx]);
                        }
                    }
                }
                this.setState({
                    rmMinusFactorData: minusfactorCopy
                }, () => console.log(this.state.rmMinusFactorData));
            }
        }else if(obj === "inbound"){
            if(addOrRm === "remove"){
                duplicate = false;
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmGuideInboundData.length; idx++){
                        if(this.state.rmGuideInboundData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }

                    if(!duplicate){
                        this.setState({
                            rmGuideInboundData: [...this.state.rmGuideInboundData, data]
                        }, () => console.log(this.state.rmGuideInboundData));
                    }
                }
            }else if(addOrRm === "add"){
                let inboundCopy = [];
                rmValue = this.state.rmGuideInboundData[this.state.rmGuideInboundData.length - 1];
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmGuideInboundData.length; idx++){
                        if(this.state.rmGuideInboundData[idx] !== rmValue){
                            inboundCopy.push(this.state.rmGuideInboundData[idx]);
                        }
                    }
                }
                this.setState({
                    rmGuideInboundData: inboundCopy
                }, () => console.log(this.state.rmGuideInboundData));
            }
        }else if(obj === "local"){
            if(addOrRm === "remove"){
                duplicate = false;
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmGuideLocalData.length; idx++){
                        if(this.state.rmGuideLocalData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }
                }
                if(!duplicate){
                    this.setState({
                        rmGuideLocalData: [...this.state.rmGuideLocalData, data]
                    }, () => console.log(this.state.rmGuideLocalData));
                }
            }else if(addOrRm === "add"){
                let localCopy = [];
                rmValue = this.state.rmGuideLocalData[this.state.rmGuideLocalData.length - 1];
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmGuideLocalData.length; idx++){
                        if(this.state.rmGuideLocalData[idx] !== rmValue){
                            localCopy.push(this.state.rmGuideLocalData[idx]);
                        }
                    }
                }
                this.setState({
                    rmGuideLocalData: localCopy
                }, () => console.log(this.state.rmGuideLocalData))
            }
        }
    }
    updateProfitRemove = (data, addOrRm, obj) => {
        if(obj === "shopping"){
            //Shopping
            if(addOrRm === "remove"){
                var duplicate = false;
                if(data !== undefined){
                    for(var idx=0; idx<this.state.rmShoppingData.length; idx++){
                        if(this.state.rmShoppingData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }

                    if(!duplicate){
                        this.setState({
                            rmShoppingData: [...this.state.rmShoppingData, data],
                        }, () => console.log(this.state.rmShoppingData));
                    }
                }
            }else if(addOrRm === "add"){
                let shoppingCopy = [];
                var rmValue = this.state.rmShoppingData[this.state.rmShoppingData.length-1];
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmShoppingData.length; idx++){
                        if(this.state.rmShoppingData[idx] !== rmValue){
                            shoppingCopy.push(this.state.rmShoppingData[idx]);
                        }
                    }
                }
                this.setState({
                    rmShoppingData: shoppingCopy,
                }, () => console.log(this.state.rmShoppingData));
            }
        }else if(obj === "option"){
            //Option
            if(addOrRm === "remove"){
                duplicate = false;
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmOptionData.length; idx++){
                        if(this.state.rmOptionData[idx][1] === data[1]){
                            duplicate = true;
                            break;
                        }
                    }

                    if(!duplicate){
                        this.setState({
                            rmOptionData: [...this.state.rmOptionData, data],
                        }, () => console.log(this.state.rmOptionData));
                    }
                }
            }else if(addOrRm === "add"){
                let optionCopy = [];
                rmValue = this.state.rmOptionData[this.state.rmOptionData.length-1];
                if(data !== undefined){
                    for(idx=0; idx<this.state.rmOptionData.length; idx++){
                        if(this.state.rmOptionData[idx] !== rmValue){
                            optionCopy.push(this.state.rmOptionData[idx]);
                        }
                    }
                }
                this.setState({
                    rmOptionData: optionCopy,
                }, () => console.log(this.state.rmOptionData));
            }
        }
    }

    //Event Handler - save
    saveAccountingForm = () => {
        this.saveTourInfo();
        this.saveExpense();
        this.saveCashSettlement();
        this.saveProfit();
        this.saveOther();
        this.saveDeletion();

        //Update profit if tc changed after
        if(this.state.updateTc){
            var tc;
            if(this.state.tc === "0" || this.state.tc === false)tc = "false";
            else if(this.state.tc === "1" || this.state.tc === true) tc = "true";

            // Shopping TC update
            $.ajax({
                url: DatabaseConnectionHelper() + "UpdateProfitTCShoppingController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    tc: tc,
                },
                success: function(result){
                    console.log(result);
                }
            });

            //Option TC update
            $.ajax({
                url: DatabaseConnectionHelper() + "UpdateProfitTCOptionController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    tc: tc,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
        //Reload page
        // reloadePage();
    }
    saveTourInfo = () => {
        //Tour info
        var tourcode = this.state.tourcode;
        var numpax = this.state.numpax;
        var numroom = this.state.numroom;
        var tc = this.state.tc;
        var tourtype = this.state.tourtype;

        if(tc === null){
            tc = false;
        }

        $.ajax({
            url: DatabaseConnectionHelper() + "EditTourInfoController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
                numpax: numpax,
                numroom: numroom,
                tc: tc,
                tourtype: tourtype
            },
            success: function(result){
                console.log(result);
            }
        })
    }
    // Expense
    saveExpense = () => {
        var restaurantCopy = [];
        var hotelCopy = [];
        var attrCopy = [];
        var carRentalCopy = [];
        var miscCopy = [];

        if(this.state.restaurantData.length > 0){
            restaurantCopy = this.state.restaurantData;
        }
        if(this.state.hotelData.length > 0){
            hotelCopy = this.state.hotelData;
        }
        if(this.state.attrData.length > 0){
            attrCopy = this.state.attrData;
        }
        if(this.state.carrentalData.length > 0){
            carRentalCopy = this.state.carrentalData;
        }
        if(this.state.miscData.length > 0){
            miscCopy = this.state.miscData;
        }

        $.ajax({
            url: DatabaseConnectionHelper() + "SaveExpenseController.php",
            type: "POST",
            data: {
                tourcode: this.state.tourcode,
                restaurant: restaurantCopy,
                hotel: hotelCopy,
                misc: miscCopy,
                carrental: carRentalCopy,
                attraction: attrCopy,
            },
            success: function(result){
            }
        });
    }
    // Cash Settlement
    saveCashSettlement = () => {
        var plusFactorCopy = [];
        var minusFactorCopy = [];
        var guideInboundCopy = []; // expense
        var guideLocalCopy = []; // profit

        if(this.state.plusFactorData.length > 0){
            plusFactorCopy = this.state.plusFactorData;
        }
        if(this.state.minusFactorData.length > 0){
            minusFactorCopy = this.state.minusFactorData;
        }
        if(this.state.guideInboundData.length > 0){
            guideInboundCopy = this.state.guideInboundData;
        }

        if(this.state.guideLocalData.length > 0){
            guideLocalCopy = this.state.guideLocalData;
        }

        $.ajax({
            url: DatabaseConnectionHelper() + "SaveCashSettlementController.php",
            type: "POST",
            data: {
                tourcode: this.state.tourcode,
                plusfactor: plusFactorCopy,
                minusfactor: minusFactorCopy,
                inbound: guideInboundCopy,
                local: guideLocalCopy,
            },
            success: function(result){
                console.log("From cash settlement");
                console.log(result);
            }
        })
    }
    // Profit
    saveProfit = () => {
        var optionCopy = [];
        var shoppingCopy = [];
        var beefandhoneyCopy = [];

        // TC
        var tc, id;
        if(this.state.tc === "0" || this.state.tc === false)tc = "false";
        else if(this.state.tc === "1" || this.state.tc === true) tc = "true";
        
        // Guide ID
        id = this.state.tourInfo[3];

        if(this.state.optionData.length > 0){
            optionCopy = this.state.optionData;
        }
        if(this.state.shoppingData.length > 0){
            shoppingCopy = this.state.shoppingData;
        }
        if(this.state.honeyAndBeefData.length > 0){
            beefandhoneyCopy = this.state.honeyAndBeefData;
        }

        $.ajax({
            url: DatabaseConnectionHelper() + "SaveProfitController.php",
            type: "POST",
            data: {
                tourcode: this.state.tourcode,

                option: optionCopy,
                shopping: shoppingCopy,
                honeyandbeef: beefandhoneyCopy,

                userid: id,
                tc: tc,
            },
            success: function(result){
                console.log(result);
            }
        });
    }
    // Other
    saveOther = () => {
        var note = "";
        var tourProfit = "";
        if(this.state.note !== ""){
            note = this.state.note;
        }
        if(this.state.tourProfit !== ""){
            tourProfit = this.state.tourProfit;
        }

        $.ajax({
            url: DatabaseConnectionHelper() + "SaveOtherController.php",
            type: "POST",
            data: {
                tourcode: this.state.tourcode,
                note: note,
                tourprofit: tourProfit,
            },
            success: function(result){
                console.log(result);
            }
        });

    }
    //Save delete
    saveDeletion = () => {
        //Cash Settlement
        if(this.state.rmPlusFactorData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    plusfactor: this.state.rmPlusFactorData,
                },
                success: function(result){
                    console.log(result);
                }
            });

        }
        if(this.state.rmMinusFactorData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    minusfactor: this.state.rmMinusFactorData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
        if(this.state.rmGuideInboundData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    inbound: this.state.rmGuideInboundData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
        if(this.state.rmGuideLocalData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    local: this.state.rmGuideLocalData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }

        //Profit
        if(this.state.rmShoppingData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    shopping: this.state.rmShoppingData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
        if(this.state.rmOptionData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    option: this.state.rmOptionData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
        
        //Expense
        if(this.state.rmCarrentalData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    carrental: this.state.rmCarrentalData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
        if(this.state.rmMiscData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    misc: this.state.rmMiscData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
        if(this.state.rmAttrData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    attraction: this.state.rmAttrData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
        if(this.state.rmHotelData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    hotel: this.state.rmHotelData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
        if(this.state.rmRestData.length > 0){
            $.ajax({
                url: DatabaseConnectionHelper() + "RemoveTourItemController.php",
                type: "POST",
                data: {
                    tourcode: this.state.tourcode,
                    restaurant: this.state.rmRestData,
                },
                success: function(result){
                    console.log(result);
                }
            });
        }
    }
    //SUBMIT THE FORM
    submitForm = () => {
        this.saveAccountingForm();
        
        //Change SQL to send
        $.ajax({
            url: DatabaseConnectionHelper() + "SubmitAccountingForm.php",
            type: "POST",
            data: {
                tourcode: this.state.tourcode,
            },
            success: function(result){
                console.log(result);
            }
        });

        //Redirect to report form
        window.location.href = "/accounting-report/" + this.state.tourcode;
    }
}
export default ViewAccountingform;

const TourInfo = (props) => {
    var land = "";
    if(props.info[4] !== null){
        land = "랜드구분: " + props.info[4];
    }
    return(
        <Table>
            <tbody>
                <tr>
                    <td>행사명: {props.info[0]}</td>
                    <td>가이드 성명: {props.info[3]}</td>
                    <td>인바운드/로컬: {props.info[9]}</td>
                    <td>{land}</td>
                </tr>
                <tr>
                    <td colSpan={4}>행사 날짜: {props.info[1]} ~ {props.info[2]}</td>
                </tr>
            </tbody>
        </Table>
    );
}