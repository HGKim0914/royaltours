import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import NavBar from './NavigationBar';
import '../css/Guide.css';
import $ from 'jquery';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import { setData } from '../js/model';
import { isJson, checkIfAuthorized } from '../js/functions';

//Import .js file
import TourInfo from './AccountingForm/TourInfo';
import TourInfoForm from './AccountingForm/TourInfoForm';
import CashSettlement from './AccountingForm/CashSettlement';
import Expense from './AccountingForm/Expense';
import Profit from './AccountingForm/Profit';
import AdditionalNote from './AccountingForm/AdditionalNote';
import AdminSection from './AccountingForm/AdminSection';

class ViewAccountingform extends Component {
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

        if(!getId){
            window.location.href = "/pagenotexist";
        }else{
            //Retrieve data from Database
            this.callData(tourcode);
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
                tc: false,
                updateTc: false,
    
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
                display: false,

                //Check if all data has been saved properly
                savedTourInfo: false,
                savedCashSettlement: false,
                savedProfit: false,
                savedExpense: false,
                savedOther: false,
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

        if(this.state.savedCashSettlement && this.state.savedProfit && this.state.savedExpense && this.state.savedOther && this.state.savedTourInfo){
            $('.alert').slideDown();
            setTimeout(function(){ $(".alert").slideUp(); }, 3000);
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

        if(this.state.display){ //display after validation
            return(
                <div className="accounting-form" ref={(obj) => this.formObj = obj}>
                    {/* alert */}
                    <div className="alert">성공적으로 저장되었습니다.</div>
    
                    <h6>투어 정산 보고서</h6>
                    
                    {/* Tour Information */}
                    <div className="tour-info">
                        <TourInfo info={this.state.tourInfo} />
                        <TourInfoForm info={this.state.tourInfo} onChange={this.updateTourinfo}/>
                    </div>
                    <div className="expense">
                        {/* 지출 관리 */}
                        <Expense onChange={this.updateExpense} onClick={this.updateExpenseRemove} onLoadedData={this.dataLoaded}/>
                    </div>
                    <div className="profit">
                        {/* 수입 관리 */}
                        <Profit onChange={this.updateProfit} onClick={this.updateProfitRemove} tc={this.state.tc} guidename={this.state.tourInfo[12]} guideid={this.state.tourInfo[2]} onLoadedData={this.dataLoaded}/>
                    </div>
                    <div className="cash-settlement">
                        {/* 정산관리 */}
                        <CashSettlement onChange={this.updateCashSettlement} onClick={this.updateCashSettlementRemove} onLoadedData={this.dataLoaded}/>
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
        }else{  //display nothing
            return(
                <div></div>
            )
        }
    }

    //Call data from database
    callData = async (code) => {
        var tourcode = code;
        var result = await setData("GetTour.php", tourcode);
        if(isJson(result)){
            var tourInfo = JSON.parse(result);
            if(!tourInfo) window.location.href = "/pagenotexist";
            if(tourInfo[12] === this.state.name || checkIfAuthorized(this.state.authorization, 3)){  //check if authorized
                if(tourInfo[9] === "1" && this.state.authorization[3] === "f"){
                    window.location.href = "/pagenotexist";
                }else if(tourInfo[10] === "1" && this.state.authorization[3] === "f"){
                    window.location.href = "/pagenotexist";
                }else{
                    //TC
                    var tc = false;
                    if(tourInfo[5] === "1"){
                        tc = true;
                    }
                    this.setState({
                        tourInfo: tourInfo,
                        tc: tc,
                        display: true,
                    });
                }
            }else{
                window.location.href = "/pagenotexist";
            }

            this.dataLoaded("tourinfo");
        }
    }
    //Loading
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
    updateTourinfo = (event) => {
        //Update TC
        var tour = JSON.parse(JSON.stringify(this.state.tourInfo));
        if(event.target.id === "input-tc"){
            if(event.target.value==="1"){
                tour[5] = "0";
            }else{
                tour[5] = "1";
            }
            this.setState({
                tc: !this.state.tc,
            },  () => console.log(this.state.tc));
        }else if(event.target.id === "input-tourtype"){
            tour[4] = event.target.value;
        }

        this.setState({
            tourInfo : tour,
        });
    }
    updateCashSettlement = (event) => {
      //
    }
    updateExpense = (event, obj) => {
     //
    }
    updateProfit = (event, obj) => {
      //
    }
    updateAdditionalNote = (event) => {
        //
    }
    updateTourProfit = (event) => {
        //
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
    }
    saveTourInfo = async () => {
        var tourcode = this.state.tourcode;
        var numpax = ($('input[type=number][name=numpax]').val())? $('input[type=number][name=numpax]').val() : 0;

        var tc = false;
        if($('#input-tc').is(':checked')) tc = true;

        var tourtype = ($('#input-tourtype option:selected').text() !== '-')? $('#input-tourtype option:selected').text() : '';
        var numroom =  ($('input[type=number][name=numroom]').val())? $('input[type=number][name=numroom]').val() : 0;

        var param = [tourcode, numpax, tc, tourtype, numroom];
        var result = await setData("SaveTourInfoController.php", param);
        
        this.setState({
            savedTourInfo: result,
        });
    }
    // Expense
    saveExpense = async () => {
        var tourcode = this.state.tourcode;
                                                                          
        //Restaurant
        var index = -1;
        var restaurant = ($("select[id='option-rest-name']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index, 
                $(this).val(), 
                $(this).parent().next().children('input').val(),
                $(this).parent().next().next().children('input').val(),
                $(this).parent().next().next().next().children('select').val(),
            ]);
            return result;
        }));

        //Hotel
        var hotel = ($("select[id='option-hotel']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index,
                $(this).val(),
                $(this).parent().next().children('input').val(),
                $(this).parent().next().next().children('input').val(),
                $(this).parent().parent().next().children('td').first().children('input').val(),
                $(this).parent().parent().next().children('td').first().next().children('input').val(),
                $(this).parent().parent().next().children('td').first().next().next().children('select').val(),
            ]);
            return result;
        }))

        //Attraction
        var attraction = ($("input[id='input-attr-date']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index,
                $(this).val(),
                $(this).parent().next().children('select').val(),
                $(this).parent().next().next().children('input').val(),
                $(this).parent().next().next().next().children('input').val(),
                $(this).parent().next().next().next().next().children('select').val()
            ]);
            return result;
        }));

        var carrental = ($("select[id='option-carrental-carcompany']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index,
                $(this).val(),
                $(this).parent().next().children('input').val(),
                $(this).parent().next().next().children('input').val(),
                $(this).parent().parent().next().children('td').first().children('select').val(),
                $(this).parent().parent().next().children('td').first().next().children('input').val(),
                $(this).parent().parent().next().children('td').first().next().next().children('select').val()
            ]);
            return result;
        }));

        var misc = ($('input[id="input-misc-amount"]').map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index,
                $(this).val(),
                $(this).parent().next().children('select').val(),
                $(this).parent().next().next().children('input').val(),
            ]);
            return result;
        }));

        var param = [tourcode, restaurant.toArray(), hotel.toArray(), attraction.toArray(), carrental.toArray(), misc.toArray()];
        var result = await setData("SaveExpenseController.php", param);
        if(result){
            this.setState({
                savedExpense: true,
            })
        }
    }

    // Cash Settlement
    saveCashSettlement = async () => {
        var tourcode = this.state.tourcode;

        //Plus Factor
        var index = -1;
        var plusFactor = ($("input[id='input-plus-amount']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index,$(this).val(),$(this).parent().next().children('input').val()]);
            return result;
        }));

        //Minus Factor
        var minusFactor = ($("input[id='input-minus-amount']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index,$(this).val(),$(this).parent().next().children('input').val()]);
            return result;
        }));

        //Guide tip plus
        var guideTipMinus = ($("input[id='input-guide-inbound-numpax']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index,$(this).val(),$(this).parent().next().children('input').val(), $(this).parent().next().next().children('input').val()]);
            return result;
        }));

        //Guide tip minus
        var guideTipPlus = ($("input[id='input-guide-local-numpax']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index,$(this).val(),$(this).parent().next().children('input').val(), $(this).parent().next().next().children('input').val()]);
            return result;
        }));

        var param = [tourcode, plusFactor.toArray(), minusFactor.toArray(), guideTipMinus.toArray(), guideTipPlus.toArray()];
        var result = await setData("SaveCashSettlementController.php", param);
        if(result){
            this.setState({
                savedCashSettlement: true,
            })
        }
    }
    // Profit
    saveProfit = async () => {
        var tourcode = this.state.tourcode;

        var index = -1;
        //Shopping
        var shopping = $("select[id='option-shopping-name']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index, $(this).val(), $(this).parent().next().children('input').val(), $(this).parent().next().next().children('span').text(),  $(this).parent().next().next().next().children('span').text(),  $(this).parent().next().next().next().next().children('span').text()]);
            return result;
        });

        //Option
        var option = $("select[id='option-option-name']").map(function(){
            index = $(this).prop("name");
            var result = [];

            result.push([index, $(this).val(),
                 $(this).parent().next().children('input').val(), 
                 $(this).parent().next().next().children('input').val(), 
                 $(this).parent().parent().next().children('td').first().children('select').val(),
                 $(this).parent().parent().next().children('td').first().next().children('input').val(),
                 $(this).parent().parent().next().children('td').first().next().next().children('span').first().text(),
                 $(this).parent().parent().next().children('td').first().next().next().children('span').first().next().text(),
                 $(this).parent().parent().next().children('td').first().next().next().children('span').first().next().next().text()
            ]);

            return result;
        });

        //Honey and beef
        var hb = $("input[id='input-beefandhoney-num']").map(function(){
            index = $(this).prop("name");
            var result = [];
            result.push([index, $(this).val(),
                $(this).parent().next().children('input').val(), 
                $(this).parent().next().next().children('input').val(), 
                $(this).parent().next().next().next().children('select').val(),
                $(this).parent().next().next().next().children('label').children('span').text(),
                $(this).parent().next().next().next().children('span').first().text(),
                $(this).parent().next().next().next().children('span').first().next().text()
            ]);
            return result;
        });
        console.log("Shopping:", shopping.toArray())
        console.log("option:", option.toArray())
        console.log("HB:", hb.toArray())

        var param = [tourcode, shopping.toArray(), option.toArray(), hb.toArray()];

        var result = await setData("SaveProfitController.php", param);
        console.log(result + "aa")
        if(result){
            this.setState({
                savedProfit: true,
            });
        }
    }
    saveOther = async () => {
        var tourcode = this.state.tourcode;
        var additionalnote = $('#input-additiona-note').val();
        var tourprofit = $('#input-tour-profit').val();

        tourprofit = (tourprofit)? tourprofit : 0;
        additionalnote = (additionalnote)? additionalnote : '';

        var param = [tourcode, tourprofit, additionalnote];
        var result = await setData("SaveOtherController.php", param);
        if(result){
            this.setState({
                savedOther: true,
            });
        }
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
    submitForm = async () => {
        this.saveAccountingForm();
        
        var result = await setData("SubmitAccountingForm.php", this.state.tourcode);
        if(result){
            //Redirect to report form
            window.location.href = "/accounting-report/" + this.state.tourcode;
        }
    }
}
export default ViewAccountingform;

