import React, {Component} from 'react';
import moment from 'moment';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

class Hotel extends Component{
    state = {
        name: "-",
        paymentmethod: "-",
        numroom: ["",false], //false if state just initialized
        totalAmount: ["", false],
        checkin: ["", false],
        checkout: ["", false],
    }

    render(){
        var checkin = "";
        var numroom = "";
        var totalAmount = "";
        var checkout = "";
        var name = "-";
        var paymentmethod = "-";

        var a, b; //checkout calculation

        //Get saved data if exist
        for(var idx=0; idx<this.props.data.length; idx++){
            //If corresponding data exist
            if(parseInt(this.props.data[idx][1]) === this.props.num){
                if(this.props.data[idx][2] !== null) name = this.props.data[idx][2];
                if(this.props.data[idx][3] !== null) checkin = this.props.data[idx][3];
                if(this.props.data[idx][4] !== null) {
                    checkout = this.props.data[idx][4];
                }
                if(this.props.data[idx][5] !== null) paymentmethod = this.props.data[idx][5];
                if(this.props.data[idx][6] !== null) numroom = this.props.data[idx][6];
                if(this.props.data[idx][7] !== null) {
                    totalAmount = this.props.data[idx][7];
                }
                break;
            }
        }

        //Update
        if(this.state.name !== "-"){
            name = this.state.name;
        }
        if(this.state.numroom[0] !== "" || this.state.numroom[1] === true){
            numroom = this.state.numroom[0];
        }
        if(this.state.totalAmount[0] !== "" || this.state.totalAmount[1] === true){
            totalAmount = this.state.totalAmount[0];
        }
        if(this.state.paymentmethod !== "-"){
            paymentmethod = this.state.paymentmethod;
        }
        if(this.state.checkin[0] !== "" || this.state.checkin[1] === true){
            checkin = this.state.checkin[0];
        }
        if(this.state.checkout[0] !== "" || this.state.checkout[1] === true){
            checkout = this.state.checkout[0];
        }

        var days = 1;
        //Get the nights stayed in the hotel
        if(checkin !== "" && checkout !== ""){
            a = moment(checkin, 'YYYY-MM-DD');
            b = moment(checkout, 'YYYY-MM-DD');
            days = b.diff(a, 'days');
        }

        var amount = 0;
        if(numroom !== "" && totalAmount !== "" && days !== 0){
            amount = totalAmount / numroom / days;
        }
        
        const optionHotel = [];
        for(idx=0; idx<this.props.list.length; idx++){
            optionHotel.push(<option value={this.props.list[idx][0]} key={idx}>{this.props.list[idx][1]}</option>);
        }

        

        return(
            <tbody>
            <tr>
                <td rowSpan="2" id="title-hotel">호텔 No.{this.props.num}</td>
                <td>
                    <label>호텔명</label>
                    <select className="browser-default" name={this.props.num} id="option-hotel" value={name} onChange={this.updateName} ref={(obj) => this.nameObj = obj}>
                        <option defaultValue="-">호텔명</option>
                        {optionHotel}
                    </select>
                </td>
                <td>
                    <label>체크인 (YYYY-MM-DD)</label><br />
                    <input type="date" id="input-hotel-checkin" name={this.props.num} defaultValue={checkin} onChange={this.updateCheckInDate} ref={(obj) => this.checkInObj = obj}/>
                    {/* <DatePicker value={checkin} name={this.props.num} id="input-hotel-checkin" onChange={this.updateCheckInDate} ref={(obj) => this.checkInObj = obj}/> */}
                </td>
                <td>
                    <label>체크아웃 (YYYY-MM-DD)</label><br />
                    <input type="date" id="input-hotel-checkout" name={this.props.num}  defaultValue={checkout} onChange={this.updateCheckOutDate} ref={(obj)=> this.checkOutObj = obj}/>
                    {/* <DatePicker value={checkout} name={this.props.num} id="input-hotel-checkout" onChange={this.updateCheckOutDate} ref={(obj)=>this.checkOutObj = obj} /> */}
                </td>
            </tr>
            <tr>
                <td>
                    <label>룸 수</label>
                    <input type="number" id="input-hotel-num-room" name={this.props.num} defaultValue={numroom} onChange={this.updateNumRoom} ref={(obj) => this.numRoomObj = obj}/>
                </td>
                <td>
                    <label>금액</label>
                    <input type="number" id="input-hotel-amount" name={this.props.num} defaultValue={totalAmount} onChange={this.updateTotalAmount} ref={(obj) => this.totalAmountObj = obj}/>
                    <br /><label>방당 가격: ${amount.toFixed(2)}</label>
                </td>
                <td>
                    <label>지급방식</label>
                    <select className="browser-default" id="option-hotel-paymentmethod" name={this.props.num} value={paymentmethod} onChange={this.updatePaymentmethod} ref={(obj) => this.paymentmethodObj = obj}>
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

    updateNumRoom = (event) => {
        this.setState({
            numroom: [event.target.value, true]
        });

        var existingObjArr = this.checkDefaultDataExist("numroom");
        this.props.onChange(event, existingObjArr);
    }
    updateTotalAmount = (event) => {
        this.setState({
            totalAmount: [event.target.value, true]
        });

        var existingObjArr = this.checkDefaultDataExist("totalamount");
        this.props.onChange(event, existingObjArr);
    }
    updateCheckInDate = (event) => {
        this.setState({
            checkin: [event.target.value, true]
        });

        var existingObjArr = this.checkDefaultDataExist("checkin");
        this.props.onChange(event, existingObjArr);
    }
    updateCheckOutDate = (event) => {
        this.setState({
            checkout: [event.target.value, true]
        });

        var existingObjArr = this.checkDefaultDataExist("checkout");
        this.props.onChange(event, existingObjArr);
    }
    updateName = (event) => {
        this.setState({
            name: event.target.value,
        });

        var existingObjArr = this.checkDefaultDataExist("name");
        this.props.onChange(event, existingObjArr);
    }
    updatePaymentmethod = (event) => {
        this.setState({
            paymentmethod: event.target.value,
        });

        var existingObjArr = this.checkDefaultDataExist("payment");
        this.props.onChange(event, existingObjArr);
    }

    //If data already exists in the input value, send those data to parent as well
    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.nameObj.value !== "호텔명" && dataChanged !== "name"){
            objArr.push(this.nameObj);
        }
        if(this.paymentmethodObj.value !== "지급방식" && dataChanged !== "payment"){
            objArr.push(this.paymentmethodObj);
        }
        if(this.numRoomObj.value !== "" && dataChanged !== "numroom"){
            objArr.push(this.numRoomObj);
        }
        if(this.totalAmountObj.value !== "" && dataChanged !== "totalamount"){
            objArr.push(this.totalAmountObj);
        }
        if(this.checkInObj.value !== "" && dataChanged !== "checkin"){
            objArr.push(this.checkInObj);
        }
        if(this.checkOutObj.value !== "" && dataChanged !== "checkout"){
            objArr.push(this.checkOutObj);
        }

        return objArr;
    }
}
export default Hotel;
