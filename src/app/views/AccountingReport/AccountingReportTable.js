import React, {Component, Suspense} from 'react';
import $ from 'jquery';
import DatabaseConnectionHelper from '../../helper/DatabaseConnectionHelper';

//Import each section of table
import FirstTable from './AccountingReportTableFirst';
import SecondTable from './AccountingReportTableSecond';
import GuideFeeAndCommisionTable from './GuideFeeAndCommissionTable';
const TotalTable = React.lazy(() => import("./AccountingReportTableTotal"));

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

    
        //Get tourcode from URL to get the corresponding data
        var formURL = window.location.href.split("/");
        var tourcode = formURL[formURL.length - 1];
        tourcode = decodeURIComponent(tourcode);

        this.state = {
            name: getName,
            authorization: getAuthorization,
            id: getId,
            department: getDepartment,
            tourcode: tourcode,

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
        this.callTourProfitData();
        this.callRestData();
        this.callHotelData();
        this.callAttrData();
        this.callCarRental();
        this.callMiscExpense();

        this.callShoppingProfit();
        this.callOptionProfit();
        this.callHBProfit();

        this.callPlusFactor();
        this.callMinusFactor();
        this.callGuideTipInbound();
        this.callGuideTipLocal();
        this.callAdditionalNote();
    }
    componentDidMount() {
        this.callTourProfitData();
        this.callRestData();
        this.callHotelData();
        this.callAttrData();
        this.callCarRental();
        this.callMiscExpense();

        this.callShoppingProfit();
        this.callOptionProfit();
        this.callHBProfit();

        this.callPlusFactor();
        this.callMinusFactor();
        this.callGuideTipInbound();
        this.callGuideTipLocal();
        this.callAdditionalNote();
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
        
        if(this.props.tourinfo) tourinfo = this.props.tourinfo;

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
        let totalNetIncome = [];
        if(this.state.department !== "가이드"){
            totalNetIncome.push(
                <TotalTable key="totalNetIncome" 
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
        return !this.props.tourinfo ? 'Loading...' : (
            <Suspense fallback={
                <div className="loading">
                    <img id="loading-image"src={require('../../imgs/loading.gif')} alt="Loading..." /><br />
                    로딩중입니다. 잠시만 기다려주세요.
                </div>}
            >
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
                    <GuideFeeAndCommisionTable tourinfo={tourinfo}
                        guideFee={miscExpense[2]}
                        guideShoppingEarning={shoppingProfit}
                        optionCost={optionProfit}
                        optionPaid={attrExpense}
                        companyCollectedAmount={minusfactor[1]}
                    />
                </div>
            </Suspense>
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

    callTourProfitData = () => {
        var tourcode = this.state.tourcode;
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
    callRestData = () => {
        var tourcode = this.state.tourcode;
        //Warning! Data wont be displayed until the user entered the restaurant name
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
    callHotelData = () => {
        var tourcode = this.state.tourcode;
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
    callAttrData = () => {
        var tourcode = this.state.tourcode;
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
    callCarRental = () => {
        var tourcode = this.state.tourcode;
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
    callMiscExpense = () => {
        var tourcode = this.state.tourcode;
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
    callShoppingProfit = () => {
        var tourcode = this.state.tourcode;
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
    callOptionProfit = () => {
        var tourcode = this.state.tourcode;
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
    callHBProfit = () => {
        var tourcode = this.state.tourcode;
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
    callPlusFactor = () => {
        var tourcode = this.state.tourcode;
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
    callMinusFactor = () => {
        var tourcode = this.state.tourcode;
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
    callGuideTipInbound = () => {
        var tourcode = this.state.tourcode;
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
    callGuideTipLocal = () => {
        var tourcode = this.state.tourcode;
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

    callAdditionalNote = () => {
        var tourcode = this.state.tourcode;
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