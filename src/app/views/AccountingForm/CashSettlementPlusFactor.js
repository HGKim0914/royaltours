import React, {Component} from 'react';

class CashSettlementPlusFactor extends Component{
    state = {
        amount: "",
        memo: "",
    }
    render(){
        var amount = "";
        var memo = "";
        for(var idx=0; idx<this.props.data.length; idx++){
            if(parseInt(this.props.data[idx][1]) === this.props.idx){
                if(this.props.data[idx][4] !== "NULL" && this.props.data[idx][4] !== null) memo = this.props.data[idx][4];
                if(this.props.data[idx][3] !== "NULL" && this.props.data[idx][3] !== null) amount = this.props.data[idx][3];
            }
        }

        if(this.state.amount !== ""){
            amount = this.state.amount;
        }
        if(this.state.memo !== ""){
            memo = this.state.memo;
        }
        
        let hidden = (this.props.idx === 6 || this.props.idx === 7)? true : false;

        return(
            <tr className={(hidden)? 'hidden' : ''}>
                <td style={{width: '250px'}}>{this.props.title}</td>
                <td>
                    <label>금액</label><br />
                    <input type="number" id={"input-plus-amount"} name={this.props.idx} defaultValue={amount} onChange={this.updateAmount} ref={(obj)=>this.amountObj = obj}/>
                </td>
                <td>
                    <label>비고</label><br />
                    <input type="text" id={"input-plus-memo"} name={this.props.idx} defaultValue={memo} onChange={this.updateMemo} ref={(obj) => this.memoObj = obj}/>
                </td>
            </tr>
        );
    }

    //update
    updateAmount = (event) => {
        this.setState({
            amount: event.target.value,
        })
        var existingObjArr = this.checkDefaultDataExist("amount");
        this.props.onChange(event, existingObjArr);
        console.log(this.props.idx);
    }

    updateMemo = (event) => {
        this.setState({
            memo: event.target.value,
        })
        var existingObjArr = this.checkDefaultDataExist("memo");
        this.props.onChange(event, existingObjArr);
    }
    
    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.amountObj.value !== "" && dataChanged !== "amount"){
            objArr.push(this.amountObj);
        }
        if(this.memoObj.value !== "" && dataChanged !== "memo"){
            objArr.push(this.memoObj);
        }

        return objArr;
    }
}

export default CashSettlementPlusFactor