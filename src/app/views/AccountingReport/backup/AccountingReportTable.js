import React, {Component} from 'react';
import $ from 'jquery';
import DatabaseConnectionHelper from '../../helper/DatabaseConnectionHelper';

//Import each section of table
import FirstTable from './AccountingReportTableFirst';
import SecondTable from './AccountingReportTableSecond';
import TotalTable from './AccountingReportTableTotal';
import { setData } from '../../js/model';
import { isJson, checkIfAuthorized } from '../../js/functions';

var totalProfitShopping = 0;
var totalProfitOption = 0;
var totalProfitHB = 0;

class AccountingReportTable extends Component{
    constructor(){
        super();
        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getId === ""){
            window.location.href = "/pagenotexist";
        }else{
            //Get tourcode from URL to get the corresponding data
            var formURL = window.location.href.split("/");
            var tourcode = formURL[formURL.length - 1];
            tourcode = decodeURIComponent(tourcode);

            this.state = {
                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment,

                tourinfo: [],
                tourProfit: 0,

                // Expense
                restExpense: [],
                hotelExpense: [],
                attrExpense: [],
                carrentalExpense: [],
                miscExpense: [],

                //Profit
                shoppingProfit: [],
                optionProfit: [],
                beefAndHoneyProfit: [],

                //Cash Settlement
                plusfactor: [],
                minusfactor: [],
                guideTipInbound: [],
                guideTipLocal: [],

                additionalNote: "",

                totalProfitShopping: 0,
                totalProfitOption: 0,
                totalProfitHB: 0,
            };

            //Call data
            this.callTourInfoData(tourcode);
            this.callTourProfitData(tourcode);
            this.callRestData(tourcode);
            this.callHotelData(tourcode);
            this.callAttrData(tourcode);
            this.callCarRental(tourcode);
            this.callMiscExpense(tourcode);

            this.callShoppingProfit(tourcode);
            this.callOptionProfit(tourcode);
            this.callHBProfit(tourcode);

            this.callPlusFactor(tourcode);
            this.callMinusFactor(tourcode);
            this.callGuideTipInbound(tourcode);
            this.callGuideTipLocal(tourcode);
            this.callAdditionalNote(tourcode);
        }
    }

    render(){
        var tourinfo = [];
        var restaurantExpense = [];
        var hotelExpense = [];
        var attrExpense = [];
        var carrentalExpense = [];
        var miscExpense = [];
        var shoppingProfit = [];
        var optionProfit = [];
        var hbProfit = [];
        var plusfactor = [];
        var minusfactor = [];
        var guideTipInbound = [];
        var guideTipLocal = [];

        if(this.state.tourinfo !== undefined){
            if(this.state.tourinfo.length > 0){
                tourinfo = this.state.tourinfo;
            } 
        }else{
            window.location.href = "/pagenotexist";
        }

        //Expense
        if(this.state.restExpense.length > 0){
            restaurantExpense = this.state.restExpense;
        }
        if(this.state.hotelExpense.length > 0){
            hotelExpense = this.state.hotelExpense;
        }
        if(this.state.attrExpense.length > 0){
            attrExpense = this.state.attrExpense;
        }

        if(this.state.carrentalExpense.length > 0){
            carrentalExpense = this.state.carrentalExpense;
        }

        if(this.state.miscExpense.length > 0){
            miscExpense = this.state.miscExpense;
        }

        if(this.state.shoppingProfit.length > 0){
            shoppingProfit = this.state.shoppingProfit;
        }

        if(this.state.optionProfit.length > 0){
            optionProfit = this.state.optionProfit;
        }

        if(this.state.beefAndHoneyProfit.length > 0){
            hbProfit = this.state.beefAndHoneyProfit;
        }

        //Only authorized user can see the total netincome
        const totalNetIncome = [];
        if(this.state.department !== "가이드"){
            totalNetIncome.push(<TotalTable key="totalNetIncome" 
                tourProfit={this.state.tourProfit}
                shoppingProfit={totalProfitShopping} 
                optionProfit={totalProfitOption}
                bhProfit={totalProfitHB}
                />
            );
        }

        if(this.state.plusfactor.length > 0){
            plusfactor = this.state.plusfactor;
        }
        if(this.state.minusfactor.length > 0){
            minusfactor = this.state.minusfactor;
        }
        if(this.state.guideTipInbound.length > 0){
            guideTipInbound = this.state.guideTipInbound;
        }
        if(this.state.guideTipLocal.length > 0){
            guideTipLocal = this.state.guideTipLocal;
        }
        return(
            <div>
                <FirstTable tourinfo={tourinfo}
                    restaurantExpense={restaurantExpense}
                    hotelExpense={hotelExpense}
                    attrExpense={attrExpense}
                    carExpense={carrentalExpense}
                    miscExpense={miscExpense}
                    shoppingProfit={shoppingProfit}
                    optionProfit={optionProfit}
                    hbProfit={hbProfit}
                    totalData={this.getTotal}
                />
                <SecondTable plusfactor={plusfactor}
                    minusfactor={minusfactor}
                    guideTipInbound={guideTipInbound}
                    guideTipLocal={guideTipLocal}
                />
                <MemoTable data={this.state.additionalNote}/>
                {totalNetIncome}
            </div>
        );
    }
    getTotal = (obj, data) => {
        if(obj === "shoppingprofit"){
            totalProfitShopping = data;
        }else if(obj === "optionprofit"){
            totalProfitOption = data;
        }else if(obj === "bhprofit"){
            totalProfitHB = data;
        }
    }

    //Call data
    callTourInfoData = async (code) => {
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

    callTourProfitData = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "GetTourProfitController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                if(result !== "" && result !== "false"){
                    var data = JSON.parse(result);
                    this.setState({
                        tourProfit: data[0][0],
                    });
                }
            }
        });
    }

    //Restaurant
    callRestData = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "DisplayRestExpenseReportController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setRestData(result);
            }
        });
    }
    setRestData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                restExpense: data,
            })
        }
    }
    //Hotel
    callHotelData = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "DisplayHotelExpenseReportController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                // this.setTourInfoData(result);
                this.setHotelData(result);
            }
        });
    }
    setHotelData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                hotelExpense: data,
            })
        }
    }
    callAttrData = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "DisplayAttrExpenseReportController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setAttrData(result);
            }
        });
    }
    setAttrData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                attrExpense: data,
            })
        }
    }
    //Car rental
    callCarRental = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "DisplayCarRentalExpenseReportController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setCarRentalData(result);
            }
        });
    }
    setCarRentalData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                carrentalExpense: data,
            });
        }
    }
    //Misc
    callMiscExpense = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "DisplayMiscExpenseReportController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setMiscExpenseData(result);
            }
        });
    }
    setMiscExpenseData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                miscExpense: data,
            });
        }
    }
    //PROFIT
    //Shopping
    callShoppingProfit = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "DisplayShoppingProfitReportController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setShoppingProfitData(result);
            }
        });
    }
    setShoppingProfitData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                shoppingProfit: data,
            })
        }
    }
    //Option
    callOptionProfit = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "DisplayOptionProfitReportController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setOptionProfitData(result);
            }
        });
    }
    setOptionProfitData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                optionProfit: data,
            })
        }
    }
    //Honey and Beef
    callHBProfit = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "DisplayHBProfitReportController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setHBProfitData(result);
            }
        });
    }
    setHBProfitData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                beefAndHoneyProfit: data,
            })
        }
    }

    //Plus Factor
    callPlusFactor = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrievePlusFactorController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setPlusFactorData(result);
            }
        });
    }
    setPlusFactorData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                plusfactor: data,
            })
        }
    }
    //Minus Factor
    callMinusFactor = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveMinusFactorController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setMinusFactorData(result);
            }
        });
    }
    setMinusFactorData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                minusfactor: data,
            })
        }
    }
    //인바운드
    callGuideTipInbound = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveTipInboundController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setGuideTipInboundData(result);
            }
        });
    }

    setGuideTipInboundData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                guideTipInbound: data,
            })
        }
    }

    //Local
    callGuideTipLocal = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveTipLocalController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setGuideTipLocalData(result);
            }
        });
    }

    setGuideTipLocalData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                guideTipLocal: data,
            })
        }
    }

    callAdditionalNote = (tourcode) => {
        $.ajax({
            url: DatabaseConnectionHelper() + "GetAdditionalNoteController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setAdditionalNoteData(result);
            }
        });
    }

    setAdditionalNoteData = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                data: data[0][0],
            });
            this.setState({
                additionalNote: data,
            })
        }
    }
}
export default AccountingReportTable;

const MemoTable = (props) => {
    var data = "";
    if(props.data !== null){
        data = props.data;
    }
    return(
        <table>
            <tbody>
                <tr>
                    <th>비고</th>
                </tr>
                <tr style={{height: "50px"}}>
                    <td>{data}</td>
                </tr>
            </tbody>
        </table>
    );
}