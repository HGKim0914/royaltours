import React, {Component} from 'react';

class GuideTipInbound extends Component{
    state = {
        numPax: "",
        tipAmount: "",
        memo: "",
    }

    render(){
        var amount = 0;
        var numpax = "";
        var memo = "";
        var tipAmount = "";

        //Set data if data received from parent exists
        for(var idx=0; idx<this.props.data.length; idx++){
            if(parseInt(this.props.data[idx][1]) === this.props.idx){
                if(this.props.data[idx][2] !== null)
                    numpax = this.props.data[idx][2];
                if(this.props.data[idx][3] !== null)
                    tipAmount = this.props.data[idx][3];
                if(this.props.data[idx][4] !== null)
                    memo = this.props.data[idx][4];
            }
        }
        if(this.state.numPax !== ""){
            numpax = this.state.numPax;
        }
        if(this.state.memo !== ""){
            memo = this.state.memo;
        }
        if(this.state.tipAmount !== ""){
            tipAmount = this.state.tipAmount;
        }

        if(numpax !== "" && tipAmount !== ""){
            amount = numpax * tipAmount;
        }

        return(
            <tr>
                <td>{this.props.title}</td>
                <td>
                    <label>인원</label><br />
                    <input type="number"name={this.props.idx} id="input-guide-inbound-numpax" onChange={this.updateNumPax} defaultValue={numpax} ref={(obj)=> this.numpaxObj = obj}/></td>
                <td>
                    <br />
                    <label>팁 금액($)</label><br />
                    <input type="number" defaultValue={tipAmount} name={this.props.idx} id="input-guide-inbound-amount" onChange={this.updateTipAmount} ref={(obj) => this.tipamountObj = obj} />
                    {/* <input type="number" placeholder="일수" id="input-guide-inbound" />  */}
                    <br /><label>총 금액 ${amount.toFixed(2)}</label>
                </td>
                <td>
                    <label>비고</label><br />
                    <input type="text" name={this.props.idx} defaultValue={memo} onChange={this.updateMemo} id="input-guide-inbound-memo" ref={(obj) => this.memoObj = obj}/>
                </td>
            </tr>
        );
    }
    //Event Handler
    updateNumPax = (event) => {
        this.setState({
            numPax: event.target.value
        });

        var existingObjArr = this.checkDefaultDataExist("numpax");
        this.props.onChange(event, existingObjArr);
    }

    updateTipAmount = (event) => {
        this.setState({
            tipAmount: event.target.value
        });

        var existingObjArr = this.checkDefaultDataExist("tipamount");
        this.props.onChange(event, existingObjArr);
    }
    updateMemo = (event) => {
        this.setState({
            memo: event.target.value,
        });

        var existingObjArr = this.checkDefaultDataExist("memo");
        this.props.onChange(event, existingObjArr);
    }

    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.numpaxObj.value !== "" && dataChanged !== "numpax"){
            objArr.push(this.numpaxObj);
        }
        if(this.memoObj.value !== "" && dataChanged !== "memo"){
            objArr.push(this.memoObj);
        }
        if(this.tipamountObj.value !== "" && dataChanged !== "tipamount"){
            objArr.push(this.tipamountObj);
        }

        return objArr;
    }
}

export default GuideTipInbound;