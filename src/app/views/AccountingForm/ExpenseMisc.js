import React, {Component} from 'react';

class Misc extends Component{
    state = {
        amount: ["",false],
        paymentmethod: "-",
        memo: ["",false],
    }
    render(){
        var amount = "";
        var paymentmethod = "-";
        var memo = "";

        //If title matches with the data sent from parent, display the data
        for(var ind=0; ind<this.props.data.length; ind++){
            if(parseInt(this.props.data[ind][1]) === this.props.idx){
                if(this.props.data[ind][3] !== null) paymentmethod = this.props.data[ind][3];
                if(this.props.data[ind][4] !== null) memo = this.props.data[ind][4];
                if(this.props.data[ind][5] !== null) amount = this.props.data[ind][5];
            }
        }
        
        if(this.state.amount[0] !== "" || this.state.amount[1] === true){
            amount = this.state.amount[0];
        }

        if(this.state.paymentmethod !== "-"){
            paymentmethod = this.state.paymentmethod;
        }

        if(this.state.memo[0] !== "" || this.state.memo[1] === true){
            memo = this.state.memo[0];
        }
        
        return(
            <tr>
                <td id="title-misc">{this.props.title}</td>
                <td>
                    {/* <label>금액</label> */}
                    <input type="number" name={this.props.idx} defaultValue={amount} onChange={this.updateAmount} id="input-misc-amount" ref={(obj) => this.totalAmountObj = obj} placeholder='금액'/>
                </td>
                <td>
                    {/* <label>지급방식</label> */}
                    <select className="browser-default" name={this.props.idx} value={paymentmethod} onChange={this.updatePaymentMethod} id="option-misc-paymentmethod" ref={(obj) => this.paymentObj = obj}>
                        <option defaultValue="-">지급방식</option>
                        <option value="회사카드">회사카드</option>
                        <option value="회사체크">회사체크</option>
                        <option value="가이드페이">가이드페이</option>
                        <option value="Reimbersement">Reimbersement</option>
                    </select>
                </td>
                <td colSpan="2">
                    {/* <label>비고</label> */}
                    <input type="text" name={this.props.idx} defaultValue={memo} onChange={this.updateMemo} id="input-misc-memo" ref={(obj) => this.memoObj = obj} placeholder='비고'/>
                </td>
            </tr>
        );
    }
    //Event handler
    updateAmount = (event) => {
        this.setState({
            amount: [event.target.value, true],
        });

        var existingObjArr = this.checkDefaultDataExist("totalamount");
        this.props.onChange(event, existingObjArr);
    }
    updatePaymentMethod = (event) => {
        this.setState({
            paymentmethod: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("payment");
        this.props.onChange(event, existingObjArr);
    }
    updateMemo = (event) => {
        this.setState({
            memo: [event.target.value, true],
        });
        var existingObjArr = this.checkDefaultDataExist("memo");
        this.props.onChange(event, existingObjArr);
    }

    //If data already exists in the input value, send those data to parent as well
    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.totalAmountObj.value !== "" && dataChanged !== "totalamount"){
            objArr.push(this.totalAmountObj);
        }
        if(this.paymentObj.value !== "지급방식" && dataChanged !== "payment"){
            objArr.push(this.paymentObj);
        }
        if(this.memoObj.value !== "" && dataChanged !== "memo"){
            objArr.push(this.memoObj);
        }

        return objArr;
    }
}
export default Misc;