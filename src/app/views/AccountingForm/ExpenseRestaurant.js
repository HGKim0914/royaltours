import React, {Component} from 'react';
// import {Table} from 'react-materialize';

class Restaurant extends Component{
    state = {
        //Updated data
        totalAmount: ["",false],
        numPax: ["",false],
        name: "-",
        paymentmethod: "-",
    }

    render(){
        //Initialize data
        var name = "-";
        var totalAmount = "";
        var numPeople = "";
        var paymentmethod = "-";

        //If title matches with the data sent from parent, display the data
        for(var idx=0; idx<this.props.data.length; idx++){
            if(this.props.data[idx][2] === this.props.title){
                if(this.props.data[idx][1] !== null) name = this.props.data[idx][1];
                if(this.props.data[idx][3] !== null) paymentmethod = this.props.data[idx][3];
                if(this.props.data[idx][5] !== null) {
                    totalAmount = this.props.data[idx][5];
                }
                if(this.props.data[idx][4] !== null) numPeople = this.props.data[idx][4];
                break;
            }
        }

        //If the default value changes, update variables
        if(this.state.totalAmount[0] !== "" || this.state.totalAmount[1] === true) {
            totalAmount = this.state.totalAmount[0];
        }
        if(this.state.numPax[0] !== "" || this.state.numPax[1]) numPeople = this.state.numPax[0];
        if(this.state.name !== "-") name = this.state.name;
        if(this.state.paymentmethod !== "-") paymentmethod = this.state.paymentmethod;

        //Display amount for each person
        var amount = 0;
        if(totalAmount !== "" && numPeople !== ""){
            amount = totalAmount / numPeople;
        }
        
        //Display the list of restaurants getting from the parent
        var optionRest = [];
        for(idx=0; idx<this.props.list.length; idx++){
            optionRest.push(<option value={this.props.list[idx][0]} key={idx}>{this.props.list[idx][1]}</option>);
        }

        return(
            // <tr>
            //     <td id="title-rest">{this.props.title}</td>
                // <td>
                //     <label>식당명</label><br />
                //     <select value={name} className="browser-default" id="option-rest-name" name={this.props.title} onChange={this.updateRestName} ref={(obj)=>this.nameObj = obj}>
                //         <option defaultValue="-">식당명</option>
                //         {optionRest}
                //     </select>
                // </td>
                // <td>
                //     <br />
                //     <label>금액</label><br />
                //     <input type="number" defaultValue={totalAmount} id="input-rest-amount" name={this.props.title} onChange={this.updateTotalAmount} ref={(obj)=> this.totalAmountObj = obj}/><br />
                //     <label>인당 금액: ${amount.toFixed(2)}</label>
                // </td>
                // <td>
                //     <label>인원</label><br />
                //     <input type="number" id="input-rest-num-people" defaultValue={numPeople} name={this.props.title} onChange={this.updateNumPax} ref={(obj)=> this.numPaxObj = obj}/>
                // </td>
                // <td>
                //     <label>지급방식</label><br />
                //     <select value={paymentmethod} className="browser-default" id="option-rest-paymentmethod" name={this.props.title} onChange={this.updatePayment} ref={(obj) => this.paymentmethodObj = obj}>
                //         <option defaultValue="-">지급방식</option>
                //         <option value="회사카드">회사카드</option>
                //         <option value="회사체크">회사체크</option>
                //         <option value="가이드페이">가이드페이</option>
                //         <option value="Reimbersement">Reimbersement</option>
                //     </select>
                // </td>
            // </tr>
            <tr id={this.props.title.includes("석식") ? 'lastMealOfTheDay' : ''}>
                <td id="title-rest">{this.props.title}</td>
                <td>
                    <select value={name} className="browser-default" id="option-rest-name" name={this.props.title} onChange={this.updateRestName} ref={(obj)=>this.nameObj = obj}>
                        <option defaultValue="-">식당명</option>
                        {optionRest}
                    </select>
                </td>
                <td>
                    {/* <label>지급방식</label><br /> */}
                    <select value={paymentmethod} className="browser-default" id="option-rest-paymentmethod" name={this.props.title} onChange={this.updatePayment} ref={(obj) => this.paymentmethodObj = obj}>
                        <option defaultValue="-">지급방식</option>
                        <option value="회사카드">회사카드</option>
                        <option value="회사체크">회사체크</option>
                        <option value="가이드페이">가이드페이</option>
                        <option value="Reimbersement">Reimbersement</option>
                    </select>
                </td>
                <td>
                    {/* <label>인원</label><br /> */}
                    <input type="number" id="input-rest-num-people" defaultValue={numPeople} name={this.props.title} onChange={this.updateNumPax} ref={(obj)=> this.numPaxObj = obj} placeholder='인원'/>
                </td>
                <td>
                    <br />
                    {/* <label>금액</label><br /> */}
                    <input type="number" defaultValue={totalAmount} id="input-rest-amount" name={this.props.title} onChange={this.updateTotalAmount} ref={(obj)=> this.totalAmountObj = obj} placeholder='금액'/><br />
                    <label>인당 금액: ${amount.toFixed(2)}</label>
                </td>
            </tr>
        );
    }
    updateRestName = (event) => {
        this.setState({
            name: event.target.value,
        })
        var existingObjArr = this.checkDefaultDataExist("name");
        this.props.onChange(event, existingObjArr);
    }
    updateTotalAmount = (event) => {
        this.setState({
            totalAmount: [event.target.value, true],
        })
        var existingObjArr = this.checkDefaultDataExist("totalamount");
        this.props.onChange(event, existingObjArr);
    }
    updateNumPax = (event) => {
        this.setState({
            numPax: [event.target.value, true],
        })
        
        var existingObjArr = this.checkDefaultDataExist("numpax");
        this.props.onChange(event, existingObjArr);
    }
    updatePayment = (event) => {
        this.setState({
            paymentmethod: event.target.value,
        })

        var existingObjArr = this.checkDefaultDataExist("payment");
        this.props.onChange(event, existingObjArr);
    }

    //If data already exists in the input value, send those data to parent as well
    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.nameObj.value !== "식당명" && dataChanged !== "name"){
            objArr.push(this.nameObj);
        }
        if(this.paymentmethodObj.value !== "지급방식" && dataChanged !== "payment"){
            objArr.push(this.paymentmethodObj);
        }
        if(this.numPaxObj.value !== "" && dataChanged !== "numpax"){
            objArr.push(this.numPaxObj);
        }
        if(this.totalAmountObj.value !== "" && dataChanged !== "totalamount"){
            objArr.push(this.totalAmountObj);
        }

        return objArr;
    }
}

export default Restaurant;