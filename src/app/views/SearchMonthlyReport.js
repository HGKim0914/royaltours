import React, {Component, Suspense} from 'react';
import $ from 'jquery';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';
import { setData } from '../js/model';
import { isJson } from '../js/functions';

class MonthlyReport extends Component{
    constructor(){
        super();

        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getAuthorization === null || (getAuthorization !== null && getAuthorization[4] !== 't') || getId === ""){
            window.location.href = "/pagenotexist";
        }

        //Get date from url
        var formURL = window.location.href.split("/");
        var dateURL = formURL[formURL.length - 2];
        var guideId = formURL[formURL.length - 1];
        var dates = dateURL.split("~");
        var startdate = dates[0] + "-01";
        // const nextMonth = new Date(dates[1].split("-")[0], dates[1].split("-")[1], 1);
        // const lastDayOfMonth = new Date(nextMonth.getTime() - 86400000);
        // var enddate = dates[1] + "-" + lastDayOfMonth.getDate();
        var enddate = dates[1] + "-01";

        //Calculating months in between startdate and enddate
        //And store in array
        var startmonth = new Date(startdate);
        var endmonth = new Date(enddate);

        var current = startmonth;
        var months = [];
        var years = [];
        while(current < endmonth){
            if(current.getMonth() === 11){
                current = new Date(current.getFullYear() + 1, 0, 1);
            }else{
                current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
            }
            months.push(current.getMonth());

            //Save year
            if(years.length === 0){
                years.push(current.getFullYear());
            }else{
                var exist = false;
                for(var idx=0; idx<years.length; idx++){
                    if(years[idx] === current.getFullYear()){
                        exist = true;
                        break;
                    }
                }
                if(!exist){
                    years.push(current.getFullYear());
                }
            }
        }
        //If start month and end month is the same
        if(startmonth.getFullYear() === endmonth.getFullYear()){
            if(startmonth.getMonth() === endmonth.getMonth()){
                if(startmonth.getMonth() === 11){
                    current = new Date(startmonth.getFullYear() + 1, 0, 1);
                }else{
                    current = new Date(startmonth.getFullYear(), startmonth.getMonth() + 1, 1);
                }
                months.push(current.getMonth());
                years.push(current.getFullYear());
            }
        }
        // console.log(months.length)
        // console.log(years)

        var monthAndYear = [];
        var ind = 0;
        // console.log("current: " + current)
        // console.log("months: " + months)
        // console.log("years: " + years)
        for(idx=0; idx<months.length; idx++){
            monthAndYear.push(years[ind] + "-" + (months[idx]+1 < 10 ? `0${months[idx]+1}` : months[idx]+1));
            if(months[idx] === 11){
                ind++;
            }
        }
        console.log("monthAndYear: " + monthAndYear)

        this.state = {
            startdate: startdate,
            enddate: enddate,

            //user information
            name: getName,
            authorization: getAuthorization,
            id: getId,
            department: getDepartment,

            guideId: guideId,
            data: [],
            inboundData: [],
            localData: [],
            months: months,
            years: years,
            monthAndYear: monthAndYear,

            tourProfitInbound: [],
            tourProfitLocal: [],

            shoppingProfitInbound: [],
            shoppingProfitLocal: [],

            optionProfitInbound: [],
            optionProfitLocal: [],

            hbProfitInbound: [],
            hbProfitLocal: [],

            carRentalExpenseInbound: [],
            carRentalExpenseLocal: [],

            carRentalExtraExpenseInbound: [],
            carRentalExtraExpenseLocal: [],

            gasExpenseInbound: [],
            gasExpenseLocal: [],

            parkingExpenseInbound: [],
            parkingExpenseLocal: [],

            guideExpenseInbound: [],
            guideExpenseLocal: [],

            guidePickupExpenseInbound: [],
            guidePickupExpenseLocal: [],

            restExpenseInbound: [],
            restExpenseLocal: [],

            hotelExpenseInbound: [],
            hotelExpenseLocal: [],

            attrExpenseInbound: [],
            attrExpenseLocal: [],

            miscExpenseInbound: [],
            miscExpenseLocal: [],

            // Guide profit
            guideProfitInbound: [],
            guideProfitLocal: [],
        }

        this.callData(startdate, enddate, guideId);
    }
    render(){
        const months = [];

        //Display each data in each column by monthly
        var totalTourProfitArr = [[],[]];
        var totalShoppingProfitArr = [[],[]];
        var totalOptionProfitArr = [[], []];
        var totalHBProfitArr = [[],[]];
        var totalGuideProfitArr = [[],[]];
        var totalProfitPartArr = [[],[]];
        var totalProfitArr = [[],[]];

        var totalCarRentalExpenseArr = [[], []];

        var totalGasExpenseArr = [[], []];
        var totalParkingExpenseArr = [[], []];
        var totalCarExpensesArr = [[], []];

        var totalRestExpenseArr = [[], []];
        var totalHotelExpenseArr = [[], []];
        var totalAttrExpenseArr = [[], []];
        var totalMiscExpesneArr = [[], []];

        var totalGuideExpenseArr = [[], []];

        var totalExpensePartArr = [[], []];
        var totalExpenseArr = [[], []];

        //Net Income
        var totalNetIncomeInboundAndLocalArr = [[], []];
        var totalNetIncomeArr = [];
        var totalNetIncomeAccumulatedArr = [];
        
        for(var ind=0; ind<this.state.monthAndYear.length; ind++){
            //Profit
            totalTourProfitArr[0].push(0);
            totalTourProfitArr[1].push(0);

            totalShoppingProfitArr[0].push(0); //inbound
            totalShoppingProfitArr[1].push(0); //local

            totalOptionProfitArr[0].push(0);
            totalOptionProfitArr[1].push(0);

            totalHBProfitArr[0].push(0);
            totalHBProfitArr[1].push(0);

            totalGuideProfitArr[0].push(0);
            totalGuideProfitArr[1].push(0);

            totalProfitPartArr[0].push(0);
            totalProfitPartArr[1].push(0);

            totalProfitArr[0].push(0);
            totalProfitArr[1].push(0);

            //Expense
            totalCarRentalExpenseArr[0].push(0);
            totalCarRentalExpenseArr[1].push(0);

            totalGasExpenseArr[0].push(0);
            totalGasExpenseArr[1].push(0);

            totalParkingExpenseArr[0].push(0);
            totalParkingExpenseArr[1].push(0);

            totalCarExpensesArr[0].push(0);
            totalCarExpensesArr[1].push(0);

            totalRestExpenseArr[0].push(0);
            totalRestExpenseArr[1].push(0);

            totalHotelExpenseArr[0].push(0);
            totalHotelExpenseArr[1].push(0);

            totalAttrExpenseArr[0].push(0);
            totalAttrExpenseArr[1].push(0);

            totalMiscExpesneArr[0].push(0);
            totalMiscExpesneArr[1].push(0);

            totalGuideExpenseArr[0].push(0);
            totalGuideExpenseArr[1].push(0);

            totalExpensePartArr[0].push(0);
            totalExpensePartArr[1].push(0);

            totalExpenseArr[0].push(0);
            totalExpenseArr[1].push(0);


            //Net income
            totalNetIncomeInboundAndLocalArr[0].push(0);
            totalNetIncomeInboundAndLocalArr[1].push(0);

            totalNetIncomeArr.push(0);
            totalNetIncomeAccumulatedArr.push(0);
        }
        console.log(this.state)
        // for (let i = 0; i < this.state.tourProfitInbound.length; i++) {
        //     if (this.state.tourProfitInbound[i][2].includes('2023-08')) {
        //         console.log(Date.parse(this.state.tourProfitInbound[i][2]));
        //     }
        // }

        // Tour Profit
        for(ind=0; ind<this.state.tourProfitInbound.length; ind++){
            for(var x=0; x<this.state.monthAndYear.length; x++){
                var listDate = new Date(this.state.tourProfitInbound[ind][2]);
                var startDate = new Date(this.state.monthAndYear[x]+"-01");

                //Last date
                var dateArr = this.state.monthAndYear[x].split("-");
                var lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalTourProfitArr[0][x] += parseFloat(this.state.tourProfitInbound[ind][1]);
                }
            }
        }

        for(ind=0; ind<this.state.tourProfitLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.tourProfitLocal[ind][2]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");

                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalTourProfitArr[1][x] += parseFloat(this.state.tourProfitLocal[ind][1]);
                }
            }
        }

        // Shopping Data
        for(ind=0; ind<this.state.shoppingProfitLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.shoppingProfitLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalShoppingProfitArr[1][x] += parseFloat(this.state.shoppingProfitLocal[ind][2]);
                }
            }
        }

        for(ind=0; ind<this.state.shoppingProfitInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.shoppingProfitInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalShoppingProfitArr[0][x] += parseFloat(this.state.shoppingProfitInbound[ind][2]);
                }
            }
        }

        //Option Data
        for(ind=0; ind<this.state.optionProfitLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.optionProfitLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalOptionProfitArr[1][x] += parseFloat(this.state.optionProfitLocal[ind][2]);
                }
            }
        }
        for(ind=0; ind<this.state.optionProfitInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.optionProfitInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalOptionProfitArr[0][x] += parseFloat(this.state.optionProfitInbound[ind][2]);
                }
            }
        }

        // Honey, Beef Data
        for(ind=0; ind<this.state.hbProfitLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.hbProfitLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalHBProfitArr[1][x] += parseFloat(this.state.hbProfitLocal[ind][2]);
                }
            }
        }
        for(ind=0; ind<this.state.hbProfitInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.hbProfitInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalHBProfitArr[0][x] += parseFloat(this.state.hbProfitInbound[ind][2]);
                }
            }
        }

         //Guide Profit
         for(ind = 0; ind<this.state.guideProfitInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.guideProfitInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");

                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalGuideProfitArr[0][x] += (this.state.guideProfitInbound[ind][2])? parseFloat(this.state.guideProfitInbound[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.guideProfitLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.guideProfitLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");

                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalGuideProfitArr[1][x] += (this.state.guideProfitLocal[ind][2])? parseFloat(this.state.guideProfitLocal[ind][2]) : 0;
                }
            }
        }


        
        //GET TOTAL FOR PROFIT
        for(ind = 0; ind < this.state.months.length; ind++){
            // Get tour profit
            totalProfitArr[0][ind] += totalTourProfitArr[0][ind];
            totalProfitArr[1][ind] += totalTourProfitArr[1][ind];
            // Get option
            totalProfitPartArr[0][ind] += totalOptionProfitArr[0][ind];
            totalProfitPartArr[1][ind] += totalOptionProfitArr[1][ind];
            // Get Honey, Beef
            totalProfitPartArr[0][ind] += totalHBProfitArr[0][ind];
            totalProfitPartArr[1][ind] += totalHBProfitArr[1][ind];
            // Get shopping
            totalProfitPartArr[0][ind] += totalShoppingProfitArr[0][ind];
            totalProfitPartArr[1][ind] += totalShoppingProfitArr[1][ind];

            // Get guide
            totalProfitPartArr[0][ind] += totalGuideProfitArr[0][ind];
            totalProfitPartArr[1][ind] += totalGuideProfitArr[1][ind];

            totalProfitArr[0][ind] += totalProfitPartArr[0][ind];
            totalProfitArr[1][ind] += totalProfitPartArr[1][ind];
        }

        //CarRental Data
        for(ind = 0; ind<this.state.carRentalExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.carRentalExpenseInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalCarRentalExpenseArr[0][x] += (this.state.carRentalExpenseInbound[ind][2])? parseFloat(this.state.carRentalExpenseInbound[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.carRentalExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.carRentalExpenseLocal[ind][3]); //get tour start date
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalCarRentalExpenseArr[1][x] += (this.state.carRentalExpenseLocal[ind][2])?parseFloat(this.state.carRentalExpenseLocal[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.carRentalExtraExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.carRentalExtraExpenseInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalCarRentalExpenseArr[0][x] += (this.state.carRentalExtraExpenseInbound[ind][2])? parseFloat(this.state.carRentalExtraExpenseInbound[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.carRentalExtraExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.carRentalExtraExpenseLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalCarRentalExpenseArr[1][x] += (this.state.carRentalExtraExpenseLocal[ind][2])? parseFloat(this.state.carRentalExtraExpenseLocal[ind][2]) : 0;
                }
            }
        }

        //Restaurant Data
        for(ind = 0; ind<this.state.restExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.restExpenseLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalRestExpenseArr[1][x] += (this.state.restExpenseLocal[ind][2])? parseFloat(this.state.restExpenseLocal[ind][2]) : 0;
                }
            }
        }
        for(ind = 0; ind<this.state.restExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.restExpenseInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalRestExpenseArr[0][x] += (this.state.restExpenseInbound[ind][2])? parseFloat(this.state.restExpenseInbound[ind][2]) : 0;
                }
            }
        }
        //Hotel data
        for(ind = 0; ind<this.state.hotelExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.hotelExpenseLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalHotelExpenseArr[1][x] += (this.state.hotelExpenseLocal[ind][2])? parseFloat(this.state.hotelExpenseLocal[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.hotelExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.hotelExpenseInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalHotelExpenseArr[0][x] += (this.state.hotelExpenseInbound[ind][2])? parseFloat(this.state.hotelExpenseInbound[ind][2]) : 0;
                }
            }
        }
        //Admission
        for(ind = 0; ind<this.state.attrExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.attrExpenseInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate.getTime() >= startDate.getTime() && listDate.getTime() <= lastDate.getTime()){
                    totalAttrExpenseArr[0][x] += (this.state.attrExpenseInbound[ind][2])? parseFloat(this.state.attrExpenseInbound[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.attrExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.attrExpenseLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalAttrExpenseArr[1][x] += (this.state.attrExpenseLocal[ind][2])? parseFloat(this.state.attrExpenseLocal[ind][2]) : 0;
                }
            }
        }
        
        //Gas
        for(ind = 0; ind<this.state.gasExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.gasExpenseInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalGasExpenseArr[0][x] += (this.state.gasExpenseInbound[ind][2])? parseFloat(this.state.gasExpenseInbound[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.gasExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.gasExpenseLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalGasExpenseArr[1][x] += (this.state.gasExpenseLocal[ind][2])? parseFloat(this.state.gasExpenseLocal[ind][2]) : 0;
                }
            }
        }

        //Parking
        for(ind = 0; ind<this.state.parkingExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.parkingExpenseInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalParkingExpenseArr[0][x] += (this.state.parkingExpenseInbound[ind][2])? parseFloat(this.state.parkingExpenseInbound[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.parkingExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.parkingExpenseLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalParkingExpenseArr[1][x] += (this.state.parkingExpenseLocal[ind][2])? parseFloat(this.state.parkingExpenseLocal[ind][2]) : 0;
                }
            }
        }

        //Guide Expense
        for(ind = 0; ind<this.state.guideExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.guideExpenseInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalGuideExpenseArr[0][x] += (this.state.guideExpenseInbound[ind][2])? parseFloat(this.state.guideExpenseInbound[ind][2]) : 0;
                }
            }
        }

      
        for(ind = 0; ind<this.state.guideExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.guideExpenseLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalGuideExpenseArr[1][x] += (this.state.guideExpenseLocal[ind][2])? parseFloat(this.state.guideExpenseLocal[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.guidePickupExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.guidePickupExpenseInbound[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalGuideExpenseArr[0][x] += (this.state.guidePickupExpenseInbound[ind][2])? parseFloat(this.state.guidePickupExpenseInbound[ind][2]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.guidePickupExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.guidePickupExpenseLocal[ind][3]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalGuideExpenseArr[1][x] += (this.state.guidePickupExpenseLocal[ind][2])? parseFloat(this.state.guidePickupExpenseLocal[ind][2]) : 0;
                }
            }
        }

        //MISC EXPENSE
        for(ind = 0; ind<this.state.miscExpenseInbound.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.miscExpenseInbound[ind][2]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalMiscExpesneArr[0][x] += (this.state.miscExpenseInbound[ind][1])? parseFloat(this.state.miscExpenseInbound[ind][1]) : 0;
                }
            }
        }

        for(ind = 0; ind<this.state.miscExpenseLocal.length; ind++){
            for(x=0; x<this.state.monthAndYear.length; x++){
                listDate = new Date(this.state.miscExpenseLocal[ind][2]);
                startDate = new Date(this.state.monthAndYear[x]+"-01");
               
                //Last date
                dateArr = this.state.monthAndYear[x].split("-");
                lastDate = new Date(dateArr[0], dateArr[1], 0);

                if(listDate >= startDate && listDate <= lastDate){
                    totalMiscExpesneArr[1][x] += (this.state.miscExpenseLocal[ind][1])? parseFloat(this.state.miscExpenseLocal[ind][1]) : 0;
                }
            }
        }

        var accumulated = 0;
        for(ind = 0; ind<this.state.months.length; ind++){
            //Car
            totalCarExpensesArr[0][ind] += totalCarRentalExpenseArr[0][ind];
            totalCarExpensesArr[1][ind] += totalCarRentalExpenseArr[1][ind];

            totalCarExpensesArr[0][ind] += totalGasExpenseArr[0][ind];
            totalCarExpensesArr[1][ind] += totalGasExpenseArr[1][ind];

            totalCarExpensesArr[0][ind] += totalParkingExpenseArr[0][ind];
            totalCarExpensesArr[1][ind] += totalParkingExpenseArr[1][ind];

            //Expense
            totalExpensePartArr[0][ind] += totalRestExpenseArr[0][ind];
            totalExpensePartArr[1][ind] += totalRestExpenseArr[1][ind];

            totalExpensePartArr[0][ind] += totalHotelExpenseArr[0][ind];
            totalExpensePartArr[1][ind] += totalHotelExpenseArr[1][ind];

            totalExpensePartArr[0][ind] += totalAttrExpenseArr[0][ind];
            totalExpensePartArr[1][ind] += totalAttrExpenseArr[1][ind];

            totalExpensePartArr[0][ind] += totalGuideExpenseArr[0][ind];
            totalExpensePartArr[1][ind] += totalGuideExpenseArr[1][ind];

            totalExpensePartArr[0][ind] += totalMiscExpesneArr[0][ind];
            totalExpensePartArr[1][ind] += totalMiscExpesneArr[1][ind];

            totalExpenseArr[0][ind] = totalExpensePartArr[0][ind] + totalCarExpensesArr[0][ind];
            totalExpenseArr[1][ind] = totalExpensePartArr[1][ind] + totalCarExpensesArr[1][ind];

            //Total net income
            totalNetIncomeInboundAndLocalArr[0][ind] = totalProfitArr[0][ind] - totalExpenseArr[0][ind];
            totalNetIncomeInboundAndLocalArr[1][ind] = totalProfitArr[1][ind] - totalExpenseArr[1][ind];

            totalNetIncomeArr[ind] = totalNetIncomeInboundAndLocalArr[0][ind] + totalNetIncomeInboundAndLocalArr[1][ind];
            accumulated += totalNetIncomeArr[ind];
            totalNetIncomeAccumulatedArr[ind] = accumulated;
        }

        const localOrInbound = [];
        //Profit
        const tourProfitObj = [];
        const shoppingObj = [];
        const optionObj = [];
        const hbObj = [];
        const guideProfitObj = [];
        const totalProfitPartObj = [];
        const totalProfitObj = [];

        //Expenses
        const carRentalExpenseObj = [];
        const gasExpenseObj = [];
        const parkingExpenseObj = [];
        const totalCarExpensesObj = [];
        const restExpenseObj = [];
        const attrExpenseObj = [];
        const hotelExpenseObj = [];
        const guideExpenseObj = [];
        const miscExpenseObj = [];
        const totalExpensePartObj = [];
        const totalExpenseObj = [];

        //Net income
        const totalNetIncomeInboundAndLocalObj = [];
        const totalNetIncomeObj = [];
        const totalNetIncomeAccumulatedObj = [];
        
        //Set months
        for(var idx=0; idx<this.state.months.length; idx++){
            months.push(
              <th key={idx} colSpan={2} style={{minWidth: "20px"}}>{this.state.months[idx] + 1}월</th>
            );
            localOrInbound.push(
                <th key={"inbound"+idx} id="inbound">인바</th>
            );
            localOrInbound.push(
                <th key={"local"+idx}id="local">로컬</th>
            );
            //Profit
            tourProfitObj.push(
                <td key={"inbound"+idx}>{totalTourProfitArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            tourProfitObj.push(
                <td key={"local"+idx}>{totalTourProfitArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            shoppingObj.push(
                <td key={"inbound"+idx}>{totalShoppingProfitArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            shoppingObj.push(
                <td key={"local"+idx}>{totalShoppingProfitArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            optionObj.push(
                <td key={"inbound"+idx}>{totalOptionProfitArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            optionObj.push(
                <td key={"local"+idx}>{totalOptionProfitArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            hbObj.push(
                <td key={"inbound"+idx}>{totalHBProfitArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            hbObj.push(
                <td key={"local"+idx}>{totalHBProfitArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            
            guideProfitObj.push(
                <td key={"inbound"+idx}>{totalGuideProfitArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            guideProfitObj.push(
                <td key={"local"+idx}>{totalGuideProfitArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );

            // 수입 소계 구하기
            totalProfitPartObj.push(
                <td key={"inbound"+idx} id="part-totalamount">{totalProfitPartArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            totalProfitPartObj.push(
                <td key={"local"+idx} id="part-totalamount">{totalProfitPartArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );

            // 수입 총액 구하기
            totalProfitObj.push(
                <td key={"inbound"+idx} id="totalamount">{totalProfitArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            totalProfitObj.push(
                <td key={"local"+idx} id="totalamount">{totalProfitArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );

            //Expense
            carRentalExpenseObj.push(
                <td key={"inbound"+idx}>{totalCarRentalExpenseArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            carRentalExpenseObj.push(
                <td key={"local"+idx}>{totalCarRentalExpenseArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            gasExpenseObj.push(
                <td key={"inbound"+idx}>{totalGasExpenseArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            gasExpenseObj.push(
                <td key={"local"+idx}>{totalGasExpenseArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            parkingExpenseObj.push(
                <td key={"inbound"+idx}>{totalParkingExpenseArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            parkingExpenseObj.push(
                <td key={"local"+idx}>{totalParkingExpenseArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            totalCarExpensesObj.push(
                <td key={"inbound"+idx} id="part-totalamount">{totalCarExpensesArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            totalCarExpensesObj.push(
                <td key={"local"+idx} id="part-totalamount">{totalCarExpensesArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            restExpenseObj.push(
                <td key={"inbound"+idx}>{totalRestExpenseArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            restExpenseObj.push(
                <td key={"local"+idx}>{totalRestExpenseArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            attrExpenseObj.push(
                <td key={"inbound"+idx}>{totalAttrExpenseArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            attrExpenseObj.push(
                <td key={"local"+idx}>{totalAttrExpenseArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            )
            hotelExpenseObj.push(
                <td key={"inbound"+idx}>{totalHotelExpenseArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            hotelExpenseObj.push(
                <td key={"local"+idx}>{totalHotelExpenseArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            guideExpenseObj.push(
                <td key={"inbound"+idx}>{totalGuideExpenseArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            guideExpenseObj.push(
                <td key={"local"+idx}>{totalGuideExpenseArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            miscExpenseObj.push(
                <td key={"inbound"+idx}>{totalMiscExpesneArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );

            miscExpenseObj.push(
                <td key={"local"+idx}>{totalMiscExpesneArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );

            totalExpensePartObj.push(
                <td key={"inbound"+idx} id="part-totalamount">{totalExpensePartArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            totalExpensePartObj.push(
                <td key={"local"+idx} id="part-totalamount">{totalExpensePartArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            totalExpenseObj.push(
                <td key={"inbound"+idx} id="totalamount">{totalExpenseArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );
            totalExpenseObj.push(
                <td key={"local"+idx} id="totalamount">{totalExpenseArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</td>
            );

            //Net Income
            totalNetIncomeInboundAndLocalObj.push(
                <th key={"inbound"+idx} id="totalamount">{totalNetIncomeInboundAndLocalArr[0][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</th>
            );
            totalNetIncomeInboundAndLocalObj.push(
                <th key={"local"+idx} id="totalamount">{totalNetIncomeInboundAndLocalArr[1][idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</th>
            );
            totalNetIncomeObj.push(
                <th colSpan={2} key={"local"+idx} id="totalamount">{totalNetIncomeArr[idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</th>
            );
            totalNetIncomeAccumulatedObj.push(
                <th colSpan={2} key={"local"+idx} id="totalamount">{totalNetIncomeAccumulatedArr[idx].toLocaleString("en-US", {style: "currency",currency: "USD"})}</th>
            );
        }

        var getTimestamp = window.location.href.split('/');
        getTimestamp = getTimestamp[getTimestamp.length - 2];
        return(
            <div className="monthly-report">
                <h6>{getTimestamp}</h6>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2} rowSpan={2} id="title">구분</th>
                            {months}
                        </tr>
                        <tr>
                            {localOrInbound}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Profit */}
                        <tr>
                            <td rowSpan="7" style={{minWidth: "38px"}}>수입</td>
                            <td style={{minWidth: "52px"}}>행사비</td>
                            {tourProfitObj}
                        </tr>
                        <tr>
                            <td>쇼핑</td>
                            {shoppingObj}
                        </tr>
                        <tr>
                            <td>옵션</td>
                            {optionObj}
                        </tr>
                        <tr>
                            <td>기타</td>
                            {hbObj}
                        </tr>
                        <tr>
                            <td >가이드</td>
                            {guideProfitObj}
                        </tr>
                        <tr>
                            <td id="part-totalamount">소계</td>
                            {totalProfitPartObj}
                        </tr>
                        <tr>
                            <td id="totalamount">합계</td>
                            {totalProfitObj}
                        </tr>

                        {/* Expense */}
                        <tr>
                            <td rowSpan="11">지출</td>
                            <td >BUS렌트</td>
                            {carRentalExpenseObj}
                        </tr>
                        <tr>
                            <td>가스비</td>
                            {gasExpenseObj}
                        </tr>
                        <tr>
                            <td>주차비</td>
                            {parkingExpenseObj}
                        </tr>
                        <tr>
                            <td id="part-totalamount">소계</td>
                            {totalCarExpensesObj}
                        </tr>
                        <tr>
                            <td>기타</td>
                            {miscExpenseObj}
                        </tr>
                        <tr>
                            <td>식사</td>
                            {restExpenseObj}
                        </tr>
                        <tr>
                            <td>입장료</td>
                            {attrExpenseObj}
                        </tr>
                        <tr>
                            <td>호텔</td>
                            {hotelExpenseObj}
                        </tr>
                        <tr>
                            <td >가이드비</td>
                            {guideExpenseObj}
                        </tr>
                        <tr>
                            <td id="part-totalamount">소계</td>
                            {totalExpensePartObj}
                        </tr>
                        <tr>
                            <td id="totalamount" style={{width: "100px"}}>합계</td>
                            {totalExpenseObj}
                        </tr>
                    </tbody>
                    <tbody className="totalNetIncome">
                        <tr>
                            <th rowSpan={2} colSpan={2}>순손익</th>
                            {totalNetIncomeInboundAndLocalObj}
                        </tr>
                        <tr>
                            {totalNetIncomeObj}
                        </tr>
                        <tr>
                            <th colSpan={2}>순손익누계</th>
                            {totalNetIncomeAccumulatedObj}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    callData = (startdate, enddate, guideId) => {
        console.log(startdate, enddate, guideId)
        console.log(Date.parse(startdate))
        console.log(Date.parse(enddate))
        if(startdate !== undefined && enddate !== undefined){
            $.ajax({
                url: DatabaseConnectionHelper() + "GetMonthlyTourDataController.php",
                type: "POST",
                data: {
                    startdate: startdate,
                    enddate: enddate,
                    guideId: guideId,
                },
                success: (result) =>{
                    this.setTourData(result);
                    console.log(JSON.parse(result))
                }
            });
        }
    }

    setTourData = (result) => {
        if(!isJson(result)) return false;
        var data = JSON.parse(result);
        var localData = [];
        var inboundData = [];

        for(var idx=0; idx < data.length; idx++){
            // if(data[idx][9] === "로컬"){
            //     localData.push(data[idx]);
            // }else if(data[idx][9]  === "인바운드"){
            //     inboundData.push(data[idx]);
            // };
            if(data[idx][1] === "로컬"){
                localData.push(data[idx]);
            }else if(data[idx][1]  === "인바운드"){
                inboundData.push(data[idx]);
            };
        }

        this.setState({
            data: data,
            localData: localData,
            inboundData: inboundData,
        });

        //Call each data
        this.callProfitData();
        this.callExpenseData();
        this.callGuideProfit();
    }

    callProfitData = () => {
        if(this.state.data.length > 0){
            this.callTourProfitData();
            this.callShoppingData();
            this.callOptionData();
            this.callHBData();
        }
    }

    callExpenseData = () => {
        if(this.state.data.length > 0){
            // 버스비
            this.callCarRentalData();
            this.callExtraCarRentalData();

            this.callRestaurantData();
            this.callHotelData();
            this.callAttrData();

            // 그외 차량비
            this.callGasExpenseData();
            this.callParkingExpenseData();

            // 가이드 비
            this.callGuideExpenseData();

            // Misc expense from miscexpense table
            this.callMiscExpenseData();
        }
    }

    callTourProfitData = () => {
        //Inbound, local
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyTourProfitDataController.php",
            type: "POST",
            data: {
                // data: this.state.inboundData
                data: this.state.data
            },
            success: (result) =>{
                this.setTourProfitData(result);
                // this.setTourProfitDataLocal(result);
            }
        });

        // Local
        // $.ajax({
        //     url: DatabaseConnectionHelper() + "GetMonthlyTourProfitDataController.php",
        //     type: "POST",
        //     data: {
        //         data: this.state.localData
        //     },
        //     success: (result) =>{
        //         this.setTourProfitDataLocal(result);
        //     }
        // });
    }

    callShoppingData = () => {
        //Inbound
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyShoppingDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData
            },
            success: (result) =>{
                this.setShoppingDataInbound(result);
            }
        });

        //Local
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyShoppingDataController.php",
            type: "POST",
            data: {
                data: this.state.localData
            },
            success: (result) =>{
                this.setShoppingDataLocal(result);
            }
        });
    }

    callOptionData = () => {
        //Inbound
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyOptionDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData
            },
            success: (result) =>{
                this.setOptionDataInbound(result);
            }
        });

        //Local
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyOptionDataController.php",
            type: "POST",
            data: {
                data: this.state.localData
            },
            success: (result) =>{
                this.setOptionDataLocal(result);
            }
        });
    }

    callHBData = () => {
        //Inbound
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyHBDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData
            },
            success: (result) =>{
                this.setHBDataInbound(result);
            }
        });

        //Local
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyHBDataController.php",
            type: "POST",
            data: {
                data: this.state.localData
            },
            success: (result) =>{
                this.setHBDataLocal(result);
            }
        });
    }

    callRestaurantData = () => {
        //Local
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyRestaurantDataController.php",
            type: "POST",
            data: {
                data: this.state.localData,
            },
            success: (result) =>{
                this.setRestaurantDataLocal(result);
            }
        });

        //Inbound
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyRestaurantDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData,
            },
            success: (result) =>{
                this.setRestaurantDataInbound(result);
            }
        });
    }

    callMiscExpenseData = async () => {
        //Get misc expense
        var resultInbound = await setData('GetMonthlyMiscExpense.php', this.state.inboundData);
        if(isJson(resultInbound)){
            this.setState({
                miscExpenseInbound: JSON.parse(resultInbound)
            });
        }

        var resultLocal = await setData('GetMonthlyMiscExpense.php', this.state.localData);
        if(isJson(resultLocal)){
            this.setState({
                miscExpenseLocal: JSON.parse(resultLocal)
            });
        }
    }

    callHotelData = () => {
        //Local
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyHotelDataController.php",
            type: "POST",
            data: {
                data: this.state.localData,
            },
            success: (result) =>{
                this.setHotelDataLocal(result);
            }
        });

        //Local
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyHotelDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData,
            },
            success: (result) =>{
                this.setHotelDataInbound(result);
            }
        });
    }

    callAttrData = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyAttrDataController.php",
            type: "POST",
            data: {
                data: this.state.localData,
            },
            success: (result) =>{
                this.setAttrDataLocal(result);
            }
        });

        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyAttrDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData,
            },
            success: (result) =>{
                this.setAttrDataInbound(result);
            }
        });
    }

    callCarRentalData = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyCarRentalDataController.php",
            type: "POST",
            data: {
                data: this.state.localData,
            },
            success: (result) =>{
                this.setCarRentalDataLocal(result);
            }
        });

        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyCarRentalDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData,
            },
            success: (result) =>{
                this.setCarRentalDataInbound(result);
            }
        });
    }

    callExtraCarRentalData = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyCarRentalExtraDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData,
            },
            success: (result) =>{
                this.setCarRentalExtraDataInbound(result);
            }
        });

        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyCarRentalExtraDataController.php",
            type: "POST",
            data: {
                data: this.state.localData,
            },
            success: (result) =>{
                this.setCarRentalExtraDataLocal(result);
            }
        });
    }

    callGasExpenseData = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyGasExpenseDataController.php",
            type: "POST",
            data: {
                data: this.state.localData,
            },
            success: (result) =>{
                this.setGasExpenseDataLocal(result);
            }
        });

        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyGasExpenseDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData,
            },
            success: (result) =>{
                this.setGasExpenseDataInbound(result);
            }
        });
    }

    callParkingExpenseData = () => {
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyParkingExpenseDataController.php",
            type: "POST",
            data: {
                data: this.state.localData,
            },
            success: (result) =>{
                this.setParkingExpenseDataLocal(result);
            }
        });

        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyParkingExpenseDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData,
            },
            success: (result) =>{
                this.setParkingExpenseDataInbound(result);
            }
        });
    }

    callGuideExpenseData = () => {
        //가이드 지급비
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyGuideExpenseDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData,
            },
            success: (result) =>{
                this.setGuideExpenseDataInbound(result);
            }
        });

        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyGuideExpenseDataController.php",
            type: "POST",
            data: {
                data: this.state.localData,
            },
            success: (result) =>{
                this.setGuideExpenseDataLocal(result);
            }
        });

        //픽업비용
        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyGuidePickupExpenseDataController.php",
            type: "POST",
            data: {
                data: this.state.inboundData,
            },
            success: (result) =>{
                this.setGuidePickupExpenseDataInbound(result);
            }
        });

        $.ajax({
            url: DatabaseConnectionHelper() + "GetMonthlyGuidePickupExpenseDataController.php",
            type: "POST",
            data: {
                data: this.state.localData,
            },
            success: (result) =>{
                this.setGuidePickupExpenseDataLocal(result);
            }
        });
    }

    //Get Guide profit
    callGuideProfit = async () => {
        var resultInbound = await setData("GetGuideProfit.php", this.state.inboundData);
        //SET GUIDE PROFIT DATA WHEN EXISTS
        if(isJson(resultInbound)){
            this.setState({
                guideProfitInbound: JSON.parse(resultInbound)
            });
        }

        var resultLocal = await setData("GetGuideProfit.php", this.state.localData);
        //calculate local
        if(isJson(resultLocal)){
            this.setState({
                guideProfitLocal: JSON.parse(resultLocal)
            });
        }
    }

    callGuideExpense = async () => {
        var resultInbound = await setData("GetGuideExpense.php", this.state.inboundData);
        if(isJson(resultInbound)){
            this.setState({
                guideExpenseInbound: JSON.parse(resultInbound),
            })
        }
        var resultLocal = await setData("GetGuideExpense.php", this.state.localData);
        if(isJson(resultLocal)){
            this.setState({
                guideExpenseLocal: JSON.parse(resultLocal)
            })
        }
    }
    
    setTourProfitData = (result) => {
        if(result !== "" && result !== "false"){
            let data = JSON.parse(result);
            let inbound = [];
            let local = [];
            
            for (let i = 0; i < data.length; i++) {
                data[i][3] === '로컬' ? local.push(data[i]) : inbound.push(data[i]);
            }
            this.setState({
                tourProfitInbound: inbound,
                tourProfitLocal: local
                // tourProfitInbound: inbound,
                // tourProfitLocal: local
            })
        }
    }

    // setTourProfitDataLocal = (result) => {
    //     if(result !== "" && result !== "false"){
    //         var data = JSON.parse(result);
    //         this.setState({
    //             tourProfitLocal: data,
    //         })
    //     }
    // }

    setGuideExpenseDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                guideExpenseInbound: data,
            })
        }
    }

    setGuideExpenseDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                guideExpenseLocal: data,
            })
        }
    }

    setGuidePickupExpenseDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                guidePickupExpenseInbound: data,
            })
        }
    }

    setGuidePickupExpenseDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                guidePickupExpenseLocal: data,
            })
        }
    }

    setCarRentalExtraDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                carRentalExtraExpenseInbound: data,
            })
        }
    }

    setCarRentalExtraDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                carRentalExtraExpenseLocal: data,
            })
        }
    }

    setParkingExpenseDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                parkingExpenseInbound: data,
            })
        }
    }

    setParkingExpenseDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                parkingExpenseLocal: data,
            })
        }
    }

    setGasExpenseDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                gasExpenseInbound: data,
            })
        }
    }

    setGasExpenseDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                gasExpenseLocal: data,
            })
        }
    }

    setCarRentalDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                carRentalExpenseInbound: data,
            })
        }
    }
    setCarRentalDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                carRentalExpenseLocal: data,
            })
        }
    }

    setAttrDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                attrExpenseInbound:data,
            });
        }
    }

    setAttrDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                attrExpenseLocal:data,
            });
        }
    }

    setHotelDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                hotelExpenseLocal:data,
            });
        }
    }

    setHotelDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                hotelExpenseInbound:data,
            });
        }
    }

    setRestaurantDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                restExpenseLocal: data,
            });
        }
    }
    
    setRestaurantDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);
            this.setState({
                restExpenseInbound: data,
            });
        }
    }

    setShoppingDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);

            this.setState({
                shoppingProfitInbound: data
            })
        }
    }

    setShoppingDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);

            this.setState({
                shoppingProfitLocal: data
            })
        }
    }

    setOptionDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);

            this.setState({
                optionProfitInbound: data
            });
        }
    }

    setOptionDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);

            this.setState({
                optionProfitLocal: data
            });
        }
    }

    setHBDataInbound = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);

            this.setState({
                hbProfitInbound: data
            });
        }
    }

    setHBDataLocal = (result) => {
        if(result !== "" && result !== "false"){
            var data = JSON.parse(result);

            this.setState({
                hbProfitLocal: data
            });
        }
    }
}

export default MonthlyReport;
