import React, {Component} from 'react';
import moment from 'moment';

class CarRental extends Component{
    constructor(){
        super();

        this.state = {
            startDate: ["",false],
            endDate: ["",false],
            totalAmount: ["",false],
            carcompany: "-",
            carrental: "-",
            paymentmethod: "-",
        }
    }
    
    render(){
        var carcompany = "-";
        var startdate = "";
        var enddate = "";
        var carrental = "-";
        var totalAmount = "";
        var paymentmethod = "-";

        //Retrieve saved data if exist
        for(var idx=0; idx<this.props.data.length; idx++){
            //If corresponding data exist
            if(parseInt(this.props.data[idx][1]) === this.props.num){
                if(this.props.data[idx][2] !== null) carcompany = this.props.data[idx][2];
                if(this.props.data[idx][3] !== null) carrental = this.props.data[idx][3];
                if(this.props.data[idx][4] !== null) startdate = this.props.data[idx][4];
                if(this.props.data[idx][5] !== null) enddate = this.props.data[idx][5];
                if(this.props.data[idx][6] !== null) paymentmethod = this.props.data[idx][6];
                if(this.props.data[idx][7] !== null) totalAmount = this.props.data[idx][7];
            }
        }

        if(this.state.carcompany !== "-"){
            carcompany = this.state.carcompany;
        }
        if(this.state.carrental !== "-"){
            carrental = this.state.carrental;
        }
        if(this.state.startDate[0] !== "" || this.state.startDate[1] === true){
            startdate = this.state.startDate[0];
        }
        if(this.state.endDate[0] !== "" || this.state.endDate[1] === true){
            enddate = this.state.endDate[0];
        }
        if(this.state.totalAmount[0] !== "" || this.state.totalAmount[1] === true){
            totalAmount = this.state.totalAmount[0];
        }
        if(this.state.paymentmethod !== "-"){
            paymentmethod = this.state.paymentmethod;
        }

        var days = 0;

        //Get days
        if(startdate !== "" && enddate !== ""){
            var a = moment(startdate, 'YYYY-MM-DD');
            var b = moment(enddate, 'YYYY-MM-DD');
            days = b.diff(a, 'days') + 1;
        }

        var amount = 0;
        if(days > 0 && totalAmount !== ""){
            amount = totalAmount / days; 
        }
        
        const optionCarCompany = [];
        const optionCarRental = [];
    
        for(idx=0; idx<this.props.listcom.length; idx++){
            optionCarCompany.push(<option key={idx} value={this.props.listcom[idx][0]}>{this.props.listcom[idx][1]}</option>)
        }
        for(idx=0; idx<this.props.list.length; idx++){
            optionCarRental.push(<option key={idx} value={this.props.list[idx][0]}>{this.props.list[idx][1]}</option>)
        }
    
        return(
            <tbody>
                <tr>
                    <td rowSpan="2" id="title-carrental">
                        차량 No. {this.props.num} 
                    </td>
                    <td>
                        <label>차량회사</label>
                        <select className="browser-default" id="option-carrental-carcompany" name={this.props.num} value={carcompany} onChange={this.updateCarCompany} ref={(obj) => this.carcompanyObj = obj}>
                            <option defaultValue="-">차량회사</option>
                            {optionCarCompany}
                        </select>
                    </td>
                    <td>
                        <label>FROM (YYYY-MM-DD)</label><br />
                        <input type="date" id="input-carrental-from" name={this.props.num} defaultValue={startdate} onChange={this.updateStartDate} ref={(obj) => this.startdateObj = obj}/>
                    </td>
                    <td>
                        <label>TO (YYYY-MM-DD)</label><br />
                        <input type="date" id="input-carrental-to" name={this.props.num} defaultValue={enddate} onChange={this.updateEndDate} ref={(obj) => this.enddateObj = obj}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>차량</label><br />
                        <select className="browser-default" id="option-carrental-car" name={this.props.num} value={carrental} onChange={this.updateCarRental} ref={(obj) => this.carrentalObj = obj}>
                            <option defaultValue="-">차량</option>
                            {optionCarRental}
                        </select>
                    </td>
                    <td>
                        <label>금액</label><br />
                        <input type="number" id="input-carrental-amount" name={this.props.num} defaultValue={totalAmount} onChange={this.updateTotalAmount} ref={(obj) => this.totalamountObj = obj}/><br />
                        <label>하루 금액: ${amount.toFixed(2)} </label>
                    </td>
                    <td>
                        <label>지급방식</label><br />
                        <select className="browser-default" id="option-carrental-paymentmethod" name={this.props.num} value={paymentmethod} onChange={this.updatePaymentMethod} ref={(obj) => this.paymentObj = obj}>
                            <option defaultValue="-">지급방식</option>
                            <option value="회사카드">회사카드</option>
                            <option value="회사체크">회사체크</option>
                            <option value="가이드페이">가이드페이</option>
                            <option value="Reimbersement">Reimbersement</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        );
    }

    //Event Handler
    updateStartDate = (event) => {
        this.setState({
            startDate: [event.target.value, true]
        })
        var existingDefaultData =  this.checkDefaultDataExist("startdate");
        this.props.onChange(event, existingDefaultData);
    }
    updateEndDate = (event) => {
        this.setState({
            endDate: [event.target.value, true]
        })
        var existingDefaultData =  this.checkDefaultDataExist("enddate");
        this.props.onChange(event, existingDefaultData);
    }
    updateTotalAmount = (event) => {
        this.setState({
            totalAmount: [event.target.value, true]
        })
        var existingDefaultData =  this.checkDefaultDataExist("totalamount");
        this.props.onChange(event, existingDefaultData);
    }
    updateCarCompany = (event) => {
        this.setState({
            carcompany: event.target.value,
        })
        var existingDefaultData =  this.checkDefaultDataExist("carcompany");
        this.props.onChange(event, existingDefaultData);
    }
    updateCarRental = (event) => {
        this.setState({
            carrental: event.target.value,
        })
        var existingDefaultData =  this.checkDefaultDataExist("carrental");
        this.props.onChange(event, existingDefaultData);
    }
    updatePaymentMethod = (event) => {
        this.setState({
            paymentmethod: event.target.value,
        })
        var existingDefaultData =  this.checkDefaultDataExist("payment");
        this.props.onChange(event, existingDefaultData);
    }

    //If data already exists in the input value, send those data to parent as well
    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.carcompanyObj.value !== "차량회사" && dataChanged !== "carcompany"){
            objArr.push(this.carcompanyObj);
        }
        if(this.carrentalObj.value !== "차량" && dataChanged !== "carrental"){
            objArr.push(this.carrentalObj);
        }
        if(this.startdateObj.value !== "" && dataChanged !== "startdate"){
            objArr.push(this.startdateObj);
        }
        if(this.enddateObj.value !== "" && dataChanged !== "enddate"){
            objArr.push(this.enddateObj);
        }
        if(this.totalamountObj.value !== "" && dataChanged !== "totalamount"){
            objArr.push(this.totalamountObj);
        }
        if(this.paymentObj.value !== "지급방식" && dataChanged !== "payment"){
            objArr.push(this.paymentObj);
        }

        return objArr;
    }
}

export default CarRental;