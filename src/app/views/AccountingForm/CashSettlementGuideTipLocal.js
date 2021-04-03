import React, {Component} from 'react';

class GuideTipLocal extends Component{  // Plus to the company
    state = {
        numPax: "",
        tipAmount: "",
        memo: "",
        ageGroup: "-"
    }
    render(){
        var numpax = "";
        var tipAmount = "";
        var memo = "";
        var amount = 0;

        for(var idx=0; idx<this.props.data.length; idx++){
            if(parseInt(this.props.data[idx][1]) === this.props.idx){
                // if(this.props.data[idx][2] !== null){
                //     agegroup = this.props.data[idx][2];
                // }
                if(this.props.data[idx][2] !== null){
                    numpax = this.props.data[idx][2];
                }
                if(this.props.data[idx][3] !== null){
                    tipAmount = this.props.data[idx][3];
                }
                if(this.props.data[idx][4] !== null){
                    memo = this.props.data[idx][4];
                }
            }
        }

        // if(this.state.ageGroup !== "-"){
        //     agegroup = this.state.ageGroup;
        // }
        if(this.state.numPax !== ""){
            numpax = this.state.numPax;
        }
        if(this.state.tipAmount !== ""){
            tipAmount = this.state.tipAmount;
        }
        if(this.state.memo !== ""){
            memo = this.state.memo;
        }

        //Get total amount
        if(numpax !== "" && tipAmount !== ""){
            amount = numpax * tipAmount;
        }
        
        return(
            <tr>
                <td>{this.props.title}</td>
                {/* <td>
                    <label>성인/아동 선택</label>
                    <select className="browser-default" name={this.props.idx} id="input-guide-local-age" value={agegroup} onChange={this.updateAgeGroup} ref={(obj) => this.ageObj = obj}>
                        <option defaultValue="-">성인/아동 선택</option>
                        <option value="성인">성인</option>
                        <option value="아동">아동</option>
                    </select>
                    
                </td> */}
                <td>
                    <label>인원</label><br />
                    <input type="number" defaultValue={numpax} name={this.props.idx} id="input-guide-local-numpax" onChange={this.updateNumPax} ref={(obj) => this.numpaxObj = obj}/>
                </td>
                <td>
                    <br />
                    <label>팁 금액($)</label><br />
                    <input type="number" defaultValue={tipAmount} name={this.props.idx} id="input-guide-local-amount" onChange={this.updateTipAmount} ref={(obj) => this.tipamountObj = obj}/>
                    <br /><label>총 금액 ${amount.toFixed(2)}</label>
                </td>
                <td>
                    <label>비고</label><br />
                    <input type="text" defaultValue={memo} name={this.props.idx} onChange={this.updateMemo} id="input-guide-local-memo" ref={(obj) => this.memoObj = obj}/>
                </td>
            </tr>
        )
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
    // updateAgeGroup = (event) => {
    //     this.setState({
    //         ageGroup: event.target.value,
    //     });
    //     var existingObjArr = this.checkDefaultDataExist("agegroup");
    //     this.props.onChange(event, existingObjArr);
    // }
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
        // if(this.ageObj.value !== "성인/아동 선택" && dataChanged !== "agegroup"){
        //     objArr.push(this.ageObj);
        // }

        return objArr;
    }
}

export default GuideTipLocal;