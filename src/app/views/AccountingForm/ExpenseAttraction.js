import React, {Component} from 'react';

class Attraction extends Component{
    state = {
        name: "-",
        numPax: ["", false],
        totalAmount: ["", false],
        paymentmethod: "-",
        date: "",
    }
    render(){
        var name = "-";
        var numpax = "";
        var totalAmount = "";
        var paymentmethod = "-";
        var visitdate = "";

        //Verify the correct data
        for(var idx=0; idx<this.props.data.length; idx++){
            if(parseInt(this.props.data[idx][1]) === this.props.idx){
                //Set default value saved last time by user if exist
                if(this.props.data[idx][2] !== null) name = this.props.data[idx][2];
                if(this.props.data[idx][3] !== null) paymentmethod = this.props.data[idx][3];
                if(this.props.data[idx][4] !== null) numpax = this.props.data[idx][4];
                if(this.props.data[idx][5] !== null) totalAmount = this.props.data[idx][5];
                if(this.props.data[idx][6] !== null) visitdate = this.props.data[idx][6];
            }
        }

        if(this.state.name !== "-"){
            name = this.state.name;
        }

        if(this.state.numPax[0] !== "" || this.state.numPax[1] === true){
            numpax = this.state.numPax[0];
        }
        
        if(this.state.totalAmount[0] !== "" || this.state.totalAmount[1] === true){
            totalAmount = this.state.totalAmount[0];
        }

        if(this.state.paymentmethod !== "-"){
            paymentmethod = this.state.paymentmethod;
        }

        if(this.state.date !== ""){
            visitdate = this.state.date;
        }

        var amount = 0;
        if(numpax !== "" && totalAmount !== ""){
            amount = totalAmount / numpax;
        }

        const optionAttr = [];
        for(idx=0; idx<this.props.list.length; idx++){
            optionAttr.push(<option key={idx} value={this.props.list[idx][0]}>{this.props.list[idx][1]}</option>)
        }

        return(
            <tr>
                <td>
                    <label>날짜 (YYYY-MM-DD)</label>
                    <input type="date" id="input-attr-date" name={this.props.idx} defaultValue={visitdate} onChange={this.updateDate} ref={(obj) => this.dateObj = obj}/>
                </td>
                <td>
                    <label>장소명</label>
                    <select className="browser-default" id="option-attr" name={this.props.idx} value={name} onChange={this.updateName} ref={(obj) => this.nameObj = obj}>
                        <option defaultValue="-">장소명</option>
                        {optionAttr}
                    </select>
                </td>
                <td>
                    <label>인원</label>
                    <input type="number" id="input-attr-num-people" placeholder="인원" name={this.props.idx} defaultValue={numpax} onChange={this.updateNumPax} ref={(obj) => this.numpaxObj = obj}/>
                </td>
                <td>
                    <br />
                    <label>금액</label>
                    <input type="number" id="input-attr-amount" placeholder="금액" name={this.props.idx} defaultValue={totalAmount} onChange={this.updateTotalAmount} ref={(obj) => this.totalAmountObj = obj}/><br />
                    <label>인당 금액: ${amount.toFixed(2)}</label>
                </td>
                <td>
                    <label>지급방식</label>
                    <select className="browser-default" id="option-attr-paymentmethod" name={this.props.idx} value={paymentmethod} onChange={this.updatePaymentMethod} ref={(obj) => this.paymentmethodObj = obj}>
                        <option defaultValue="-">지급방식</option>
                        <option value="회사카드">회사카드</option>
                        <option value="회사체크">회사체크</option>
                        <option value="가이드페이">가이드페이</option>
                        <option value="Reimbersement">Reimbersement</option>
                    </select>
                </td>
            </tr>
        ); 
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
    updateDate = (event) => {
        this.setState({
            date: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("date");
        this.props.onChange(event, existingObjArr);
    }
    updateName = (event) => {
        this.setState({
            name: event.target.value,
        })
        var existingObjArr = this.checkDefaultDataExist("name");
        this.props.onChange(event, existingObjArr);
    }
    updatePaymentMethod = (event) => {
        this.setState({
            paymentmethod: event.target.value,
        })
        var existingObjArr = this.checkDefaultDataExist("payment");
        this.props.onChange(event, existingObjArr);
    }

    //If data already exists in the input value, send those data to parent as well
    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.nameObj.value !== "장소명" && dataChanged !== "name"){
            objArr.push(this.nameObj);
        }
        if(this.paymentmethodObj.value !== "지급방식" && dataChanged !== "payment"){
            objArr.push(this.paymentmethodObj);
        }
        if(this.numpaxObj.value !== "" && dataChanged !== "numpax"){
            objArr.push(this.numpaxObj);
        }
        if(this.totalAmountObj.value !== "" && dataChanged !== "totalamount"){
            objArr.push(this.totalAmountObj);
        }
        if(this.dateObj.value !== "" && dataChanged !== "date"){
            objArr.push(this.dateObj);
        }

        return objArr;
    }
}

export default Attraction;