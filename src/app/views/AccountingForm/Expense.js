import React, { Component } from 'react';
import {Table} from 'react-materialize';
import $ from 'jquery';
import DatabaseConnectionHelper from '../../helper/DatabaseConnectionHelper';

//Import js
import Restaurant from './ExpenseRestaurant';
import Hotel from './ExpenseHotel';
import Attraction from './ExpenseAttraction';
import Misc from './ExpenseMisc';
// import MiscEtc from './ExpenseMiscEtc';
import CarRental from './ExpenseCarRental';

class Expense extends Component{
    
    constructor(){
        super();
        this.state = {
            numOfRest: 0,
            numOfHotel: 1,
            numOfAttraction: 1,
            numOfcarRental: 1,
            numOfMisc: 0,

            //List for the option
            listRest: [],
            listHotel: [],
            listAttr: [],
            listCar: [],
            listCarCompany: [],

            //Saved data
            dataRest: [],
            dataHotel: [],
            dataAttr: [],
            dataMisc: [],
            dataCarRental: [],

            //Mockup data
            mockupDataRest: [],
            mockupDataHotel: [],
            mockupDataAttr: [],
            mockupDataMisc: [],
            mockupDataCarRental: [],

            restLoaded: false,
            hotelLoaded: false,
            attrLoaded: false,
            carrentalLoaded: false,
            miscLoaded: false,
        }

        //Call data
        this.callListExpense("rest");
        this.callListExpense("hotel");
        this.callListExpense("attr");
        this.callListExpense("carcompany");
        this.callListExpense("carrental");

        //Retrieve saved data if exist
        this.callData();
    }
    render(){
        const restaurantObj = [];
        const hotelObj = [];
        const attractionObj = [];
        const carrentalObj = [];
        const miscObj = [];
        // const etcObj = [];

        for(var idx=0; idx<this.state.numOfRest; idx++){
            var day = idx + 2;
            restaurantObj.push(<Restaurant title={"D" + day + ".조식"} key={"조식" + idx} list={this.state.listRest} data={this.state.dataRest} onChange={this.props.onChange}/>);
            restaurantObj.push(<Restaurant title={"D" + day + ".중식"} key={"중식" + idx} list={this.state.listRest} data={this.state.dataRest} onChange={this.props.onChange}/>);
            restaurantObj.push(<Restaurant title={"D" + day + ".석식"} key={"석식" + idx} list={this.state.listRest} data={this.state.dataRest} onChange={this.props.onChange}/>);
        }

        for(idx=0; idx<this.state.numOfHotel; idx++){
            var hotelNum = idx + 1;
            hotelObj.push(<Hotel num={hotelNum} key={idx} list={this.state.listHotel} data={this.state.dataHotel} onChange={this.props.onChange} />);    
        }
        for(idx=0; idx<this.state.numOfcarRental; idx++){
            var carRentalNum = idx + 1;
            carrentalObj.push(<CarRental num={carRentalNum} key={idx} list={this.state.listCar} listcom={this.state.listCarCompany} data={this.state.dataCarRental} onChange={this.props.onChange}/>)
        }
        for(idx=0; idx<this.state.numOfAttraction; idx++){
            attractionObj.push(<Attraction key={idx} list={this.state.listAttr} data={this.state.dataAttr} idx={idx+1} onChange={this.props.onChange}/>);
        }
        for(idx=0; idx<this.state.numOfMisc; idx++){
            miscObj.push(<Misc title="기타" key={idx} data={this.state.dataMisc} idx={idx+6} onChange={this.props.onChange}/>);
        }

        
        return(
            
            <div className="input">
                <div className="title">
                    지출 내역
                </div>
                <div className="desc">
                    <br />

                    {/* Restaurant */}
                    <h6>레스토랑</h6>
                    <div className="addOrRemove">
                        <input type="button" value="+" id="btn-add" onClick={this.addRest}/>
                        <input type="button" value="-" id="btn-remove" onClick={this.removeRest}/>
                    </div>
                    <Table>
                        <tbody>
                            <Restaurant title="D1.중식" list={this.state.listRest} data={this.state.dataRest} onChange={this.props.onChange}/>
                            <Restaurant title="D1.석식" list={this.state.listRest} data={this.state.dataRest} onChange={this.props.onChange}/>
                            {restaurantObj}
                        </tbody>
                    </Table>
                    <hr />

                    {/* Hotel */}
                    <h6>호텔</h6>
                    <div className="addOrRemove">
                        <input type="button" value="+" id="btn-add" onClick={this.addHotel}/>
                        <input type="button" value="-" id="btn-remove" onClick={this.removeHotel}/>
                    </div>
                    <Table>
                        {hotelObj}
                    </Table>
                    <hr />

                    {/* Attraction */}
                    <h6>입장료</h6>
                    <div className="addOrRemove">
                        <input type="button" value="+" id="btn-add" onClick={this.addAttraction}/>
                        <input type="button" value="-" id="btn-remove" onClick={this.removeAttraction}/>
                    </div>
                    <Table>
                        <tbody>
                            {attractionObj}
                        </tbody>
                    </Table>
                    <hr />

                    {/* Car rental */}
                    <h6>차량비</h6>
                    <div className="addOrRemove">
                        <input type="button" value="+" id="btn-add" onClick={this.addCarRental} />
                        <input type="button" value="-" id="btn-remove" onClick={this.removeCarRental}/>
                    </div>
                    <Table>
                        {carrentalObj}
                    </Table>
                    <hr />

                    {/* Misc */}
                    <h6>기타 비용</h6>
                    <div className="addOrRemove">
                        <input type="button" value="+" id="btn-add" onClick={this.addMisc}/>
                        <input type="button" value="-" id="btn-remove" onClick={this.removeMisc}/>
                    </div>
                    <Table>
                        <tbody>
                            <Misc title="주차비용" data={this.state.dataMisc} onChange={this.props.onChange} idx={1}/>
                            <Misc title="가스비" data={this.state.dataMisc} onChange={this.props.onChange} idx={2}/>
                            <Misc title="가이드 지급비" data={this.state.dataMisc} onChange={this.props.onChange} idx={3}/>
                            <Misc title="픽업비용" data={this.state.dataMisc} onChange={this.props.onChange} idx={4}/>
                            <Misc title="별도 지급 차량비" data={this.state.dataMisc} onChange={this.props.onChange} idx={5}/>
                            {miscObj}
                        </tbody>
                    </Table>
                    <br /><br />
                </div>
            </div>
        );
    }

    //Get data
    callListExpense = (obj) => {
        if(obj === "rest"){
            fetch(DatabaseConnectionHelper() + "DisplayRestaurantController.php")
            .then(res => res.json())
            .then((result) => this.setListRest(result)
            );
        }else if(obj === "hotel"){
            fetch(DatabaseConnectionHelper() + "DisplayHotelController.php")
            .then(res => res.json())
            .then((result) => this.setListHotel(result)
            );
        }else if(obj === "attr"){
            fetch(DatabaseConnectionHelper() + "DisplayOptiontourController.php")
            .then(res => res.json())
            .then((result) => this.setListAttr(result)
            );
        }else if(obj === "carcompany"){
            fetch(DatabaseConnectionHelper() + "DisplayCarCompanyController.php")
            .then(res => res.json())
            .then((result) => this.setListCarCompany(result)
            );
        }else if(obj === "carrental"){
            fetch(DatabaseConnectionHelper() + "DisplayCarRentalController.php")
            .then(res => res.json())
            .then((result) => this.setListCar(result)
            );
        }

    }

    //Call saved data
    callData = () => {
        //Get tourcode from URL to get the corresponding data
        var formURL = window.location.href.split("/");
        var tourcode = formURL[formURL.length - 1];
        tourcode = decodeURIComponent(tourcode);

        //Restaurant
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveRestExpenseController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setRestExpenseData(result);
                this.expenseDataLoaded("rest");
            }
        });

        //Hotel
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveHotelExpenseController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setHotelExpenseData(result);
                this.expenseDataLoaded("hotel");
            }
        });

        //ATTRACTION
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveAttrExpenseController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setAttrExpenseData(result);
                this.expenseDataLoaded("attr");
            }
        });

        //CAR RENTAL
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveCarRentalExpenseController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setCarRentalExpenseData(result);
                this.expenseDataLoaded("carrental");
            }
        });

        //MISC
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveMiscExpenseController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setMiscExpenseData(result);
                this.expenseDataLoaded("misc");
            }
        });
    }

    setTourExpenseData = (result) => {
    }

    expenseDataLoaded = (data) => {
        if(data === "rest"){
            this.setState({
                restLoaded: true,
            })
        }else if(data === "hotel"){
            this.setState({
                hotelLoaded: true,
            })
        }else if(data === "attr"){
            this.setState({
                attrLoaded: true,
            })
        }else if(data === "carrental"){
            this.setState({
                carrentalLoaded: true,
            })
        }else if(data === "misc"){
            this.setState({
                miscLoaded: true,
            })
        }

        this.dataLoaded();
    }

    dataLoaded = () => {
        if(this.state.restLoaded && this.state.hotelLoaded && this.state.attrLoaded && this.state.carrentalLoaded && this.state.miscLoaded){
            this.props.onLoadedData("expense");
        }
    }
    
    setRestExpenseData = (result) => {
        if(result !== false){
            //RESTAURANT
            var data = JSON.parse(result);
            //Check the length of data array if exceed day 1
            //if exceed, by default, increase number of components displayed to the user
            var lastDay = -1;
            for(var idx=0; idx<data.length; idx++){
                var temp = data[idx][2]; //Get restday
                var tempArr = temp.split(".");
                temp = tempArr[0].substring(1, tempArr[0].length); //Get day only
                if(temp > lastDay){
                    lastDay = temp;
                }
            }
            if(lastDay >= 2){
                this.setState({
                    numOfRest: lastDay-1,
                })
            }

            //Set saved restaurant data to state
            this.setState({
                dataRest: data,
            })
        }
    }
    setHotelExpenseData = (result) => {
        if(result !== false){
            //HOTEL
            var data = JSON.parse(result);
            if(data.length > 0){
                //Get number of hotel options displayed
                var lastDay = data[data.length-1][1];
                if(lastDay >= 2){
                    this.setState({
                        numOfHotel: parseInt(lastDay),
                    })
                }

                //Set hotel data
                this.setState({
                    dataHotel: data,
                })
            }
        }
    }
    setAttrExpenseData = (result) => {
        if(result !== false){
            //ATTRACTION
            var data = JSON.parse(result);
            if(data.length > 0){
                var last = data[data.length-1][1];
                //Set the input components displayed as a default to be larger than 2
                if(last >= 2){
                    this.setState({
                        numOfAttraction: parseInt(last)
                    })
                }
            }

            //Set attraction data
            this.setState({
                dataAttr: data,
            })
        }
    }
    setCarRentalExpenseData = (result) => {
        if(result !== false){
            //CAR RENTAL
            var data = JSON.parse(result);
            if(data.length > 0){
                var last = data[data.length-1][1];
                if(last >= 2){
                    this.setState({
                        numOfcarRental: parseInt(last),
                    })
                }
            }
            //Set Car Rental data
            this.setState({
                dataCarRental: data,
            })
        }
    }
    setMiscExpenseData = (result) => {
        if(result !== false){
            //MISC
            var data = JSON.parse(result);
            if(data.length > 0){
                //Check if the data contains 기타
                var last = data[data.length-1][1];
                if(last >= 6){
                    var lastComponent = parseInt(data[data.length-1][1]) - 5;
                    this.setState({
                        numOfMisc: lastComponent,
                    })
                }
            }
            this.setState({
                dataMisc: data,
            });
        }
    }

    //Set data
    setListRest = (result) => {
        this.setState({
            listRest: result,
        });
    }
    setListHotel = (result) => {
        this.setState({
            listHotel: result,
        })
    }
    setListAttr = (result) => {
        this.setState({
            listAttr: result,
        })
    }
    setListCarCompany = (result) => {
        this.setState({
            listCarCompany: result,
        })
    }
    setListCar = (result) => {
        this.setState({
            listCar: result,
        })
    }

    //Add number
    addRest = () => {
        this.setState({
            numOfRest: this.state.numOfRest + 1,
        });
        this.props.onClick(null, "add", "rest"); //get the index of the array
    }
    addHotel = () => {
        this.setState({
            numOfHotel:  this.state.numOfHotel + 1,
        });

        this.props.onClick(null, "add", "hotel");
    }
    addAttraction = () => {
        this.setState({
            numOfAttraction: this.state.numOfAttraction + 1,
        })
        this.props.onClick(null, "add", "attr")
    }
    addCarRental = () => {
        var num = this.state.numOfcarRental;
        this.setState({
            numOfcarRental: num + 1,
        });
        this.props.onClick(null, "add", "carrental");
    }
    addMisc = () => {
        this.setState({
            numOfMisc: this.state.numOfMisc + 1,
        });

        this.props.onClick(null, "add", "misc");
    }
    
    //Remove number
    removeRest = () => {
        if(this.state.numOfRest > 0){
            var num = this.state.numOfRest + 2;
            const dataRestCopy = [];
            var dayIdx = 1;
            for(var idx = 0; idx <= num; idx++){
                if(this.state.dataRest[idx] !== undefined){
                    var arrData = this.state.dataRest[idx][2];
                    var temp = arrData.split(".");
                    var day = temp[0].substring(1, temp[0].length);
                    if(parseInt(day) === dayIdx){ // if day matches with day index
                        if(arrData === "D" + dayIdx + ".조식"){
                            //check if dinner data exist
                            if(dataRestCopy.length > 0 && dataRestCopy[dataRestCopy.length-1][2] !== "D" + dayIdx + ".석식"){
                                dataRestCopy.push(["","", "D" + dayIdx + ".석식"]);
                            }
                            dataRestCopy.push(this.state.dataRest[idx]);
                        }else if(arrData === "D" + dayIdx + ".중식"){
                            //check if breakfast data exist
                            if(dataRestCopy.length > 0){
                                if(dataRestCopy[dataRestCopy.length-1][2] !== "D" + dayIdx + ".조식"){
                                    if(dataRestCopy[dataRestCopy.length-1][2] === "D" + dayIdx + ".석식"){
                                        dataRestCopy.push(["","", "D" + dayIdx + ".조식"]);
                                    }else{
                                        dataRestCopy.push(["","", "D" + dayIdx + ".석식"]);
                                        dataRestCopy.push(["","", "D" + dayIdx + ".조식"]);
                                    }
                                }
                            }
                            dataRestCopy.push(this.state.dataRest[idx]); // LUNCH
                        }else if(arrData === "D" + dayIdx + ".석식"){
                            dataRestCopy.push(this.state.dataRest[idx]);
                        }
                    }else{
                        if(dataRestCopy.length > 0){
                            //check if the last one is 석식
                            if(dataRestCopy[dataRestCopy.length-1][2] !== "D" + dayIdx + ".중식"){
                                if(dataRestCopy[dataRestCopy.length-1][2] === "D" + dayIdx + ".석식"){
                                    dataRestCopy.push(["","", "D" + dayIdx + ".조식"]);
                                    dataRestCopy.push(["","", "D" + dayIdx + ".중식"]);
                                }else if(dataRestCopy[dataRestCopy.length-1][2] === "D" + dayIdx + ".조식"){
                                    dataRestCopy.push(["","", "D" + dayIdx + ".중식"]);
                                }
                            }
                        }

                        var difference = parseInt(day) - dayIdx;
                        for(var ind = 1; ind < difference; ind++){
                            dayIdx++;
                            dataRestCopy.push(["","", "D" + dayIdx + ".석식"]);
                            dataRestCopy.push(["","", "D" + dayIdx + ".조식"]);
                            dataRestCopy.push(["","", "D" + dayIdx + ".중식"]);
                        }

                        dayIdx++;
                        //Store the current index data
                        if(arrData === "D" + dayIdx + ".석식"){
                            dataRestCopy.push(this.state.dataRest[idx]);
                        }else if(arrData === "D" + dayIdx + ".중식"){
                            //check if breakfast data exist
                            if(dataRestCopy.length > 0){
                                if(dataRestCopy[dataRestCopy.length-1][2] !== "D" + dayIdx + ".조식"){
                                    if(dataRestCopy[dataRestCopy.length-1][2] === "D" + dayIdx + ".석식"){
                                        dataRestCopy.push(["","", "D" + dayIdx + ".조식"]);
                                    }else{
                                        dataRestCopy.push(["","", "D" + dayIdx + ".석식"]);
                                        dataRestCopy.push(["","", "D" + dayIdx + ".조식"]);
                                    }
                                }
                            }
                            dataRestCopy.push(this.state.dataRest[idx]); // LUNCH
                        }else if(arrData === "D" + dayIdx + ".조식"){
                            //check if dinner data exist
                            if(dataRestCopy.length > 0 && dataRestCopy[dataRestCopy.length-1][2] !== "D" + dayIdx + ".석식"){
                                dataRestCopy.push(["","", "D" + dayIdx + ".석식"]);
                            }
                            dataRestCopy.push(this.state.dataRest[idx]);
                        }
                    }
                }
            }
            
            if(dataRestCopy.length > 0){
                var dataArr = [];
                console.log(this.state.numOfRest); //5 number of components: 6
                
                for(idx=0; idx<dataRestCopy.length; idx++){
                    temp = dataRestCopy[idx][2].split(".");
                    var tempNumber = temp[0].substring(1, temp[0].length);
                    if((this.state.numOfRest+1) === parseInt(tempNumber)){
                        dataArr.push(dataRestCopy[idx]);
                    }
                }

                this.setState({
                    numOfRest: this.state.numOfRest - 1,
                });

                this.props.onClick(dataArr, "remove", "rest");
            }
            
        }
    }
    removeHotel = () => {
        if(this.state.numOfHotel > 1){
            var num = this.state.numOfHotel - 1;
            const dataHotelCopy = [];
            var addGapIdx  = 1;
            
            for(var idx=0; idx<=num; idx++){
                if(this.state.dataHotel[idx] !== undefined){
                    var arrData = parseInt(this.state.dataHotel[idx][1]);
                    if(arrData === (idx + addGapIdx)){
                        dataHotelCopy.push(this.state.dataHotel[idx]);
                    }else{
                        var difference = arrData - (idx + addGapIdx);
                        var gapIdx = difference;
                        for(var ind = 0; ind < difference; ind++){
                            dataHotelCopy.push(["", "" + arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataHotelCopy.push(this.state.dataHotel[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }
            var data = dataHotelCopy[num];
            this.setState({
                numOfHotel: num,
            })

            this.props.onClick(data, "remove", "hotel");
        }
    }
    removeAttraction = () => {
        if(this.state.numOfAttraction > 1){
            var num = this.state.numOfAttraction - 1;
            const dataAttrCopy = [];
            var addGapIdx = 1;

            for(var idx=0; idx<=num; idx++){
                if(this.state.dataAttr[idx] !== undefined){
                    var arrData = parseInt(this.state.dataAttr[idx][1]);

                    //if data exists
                    if(arrData === (idx + addGapIdx)){
                        dataAttrCopy.push(this.state.dataAttr[idx]);
                    }else{
                        var difference = arrData - (idx + addGapIdx);
                        var gapIdx = difference;
                        for(var ind = 0; ind < difference; ind++){
                            dataAttrCopy.push(["", arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataAttrCopy.push(this.state.dataAttr[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }
            var data = dataAttrCopy[num];

            this.setState({
                numOfAttraction: num,
            });
            this.props.onClick(data, "remove", "attr");
        }
    }
    removeCarRental = () => {
        if(this.state.numOfcarRental > 1){
            var num = this.state.numOfcarRental - 1;
            const dataCarRentalCopy = [];
            var addGapIdx = 1;
            //Get temp array with all components including the empty value
            for(var idx=0; idx<=num; idx++){
                if(this.state.dataCarRental[idx] !== undefined){
                    var arrData = parseInt(this.state.dataCarRental[idx][1]);
                    //If data exists, store in array
                    if(arrData === (idx+addGapIdx)){
                        dataCarRentalCopy.push(this.state.dataCarRental[idx]);
                    }//else, store mockup data
                    else{
                        var difference = arrData - (idx + addGapIdx);
                        var gapIdx = difference;
                        for(var ind = 0; ind < difference; ind++){
                            dataCarRentalCopy.push(["","" + arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataCarRentalCopy.push(this.state.dataCarRental[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }
            var data = dataCarRentalCopy[num];
            this.setState({
                numOfcarRental: num,
            })

            this.props.onClick(data, "remove", "carrental");
        }
    }
    removeMisc = () => {
        if(this.state.numOfMisc > 0){
            var num = this.state.numOfMisc + 5;
            const dataMiscCopy = [];
            var addGapIdx = 1;
            //Get temp array with all components
            for(var idx=0; idx<=num; idx++){
                if(this.state.dataMisc[idx] !== undefined){
                    var arrData = parseInt(this.state.dataMisc[idx][1]);
                    //if data exists, store in array
                    if(arrData === (idx+addGapIdx)){
                        dataMiscCopy.push(this.state.dataMisc[idx]);
                    //else, store mockup data
                    }else{
                        var difference = arrData - (idx + addGapIdx);
                        var gapIdx = difference;
                        for(var ind=0; ind<difference; ind++){
                            dataMiscCopy.push(["", "" + arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataMiscCopy.push(this.state.dataMisc[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }
            ind = 0;
            for(idx=0; idx<dataMiscCopy.length; idx++){
                //if number of components exceed the the number of default component
                if(parseInt(dataMiscCopy[idx][1]) > 5){
                    ind = ind + 1;
                }
            }
            var numOfExtra = ind - this.state.numOfMisc + 1; // number of extra components
            var data = dataMiscCopy[dataMiscCopy.length - numOfExtra];

            this.setState({
                numOfMisc: this.state.numOfMisc - 1,
            });
            this.props.onClick(data, "remove", "misc");
        }
    }
}

export default Expense;



