import React, { Component } from 'react';
class ProfitHoneyAndBeef extends Component{
    state = {
        num: "",
        originalPrice: "",
        salePrice: "",
        com: "-",
    }
    render(){
        var num = "";
        var originalPrice = "";
        var salePrice = "";
        var com = "-";

        // var totalAmount = 0;
        var tccom = 0;
        var netIncome = 0;
        var guideProfit = 0;
        var tcProfit = 0;
        var companyProfit = 0;
        //Get data if stored data exists
        if(this.props.data !== undefined && this.props.data.length > 0){
            for(var idx=0; idx<this.props.data.length; idx++){
                if(this.props.data[idx][1] === this.props.idx){
                    if(this.props.data[idx][3] !== null) num = this.props.data[idx][3];
                    if(this.props.data[idx][4] !== null) salePrice = this.props.data[idx][4];
                    if(this.props.data[idx][5] !== null) originalPrice = this.props.data[idx][5];
                    if(this.props.data[idx][8] !== null) com = this.props.data[idx][8];
                }
            }
        }

        tccom = this.props.tccom;

        if(this.state.num !== ""){
            num = this.state.num;
        }
        if(this.state.originalPrice !== ""){
            originalPrice = this.state.originalPrice;
        }
        if(this.state.salePrice !== ""){
            salePrice = this.state.salePrice;
        }
        if(this.state.com !== "-"){
            com = this.state.com;
        }

        if(originalPrice !== "" && salePrice !== ""){
            netIncome = parseFloat(salePrice) - parseFloat(originalPrice);
        }

        //Guide profit
        if(netIncome !== 0 && com !== "-"){
            if(!this.props.tc || this.props.tc === "0"){
                guideProfit = (parseInt(com) / 10) * netIncome;
                companyProfit = netIncome - guideProfit;
            }else{
                //If tc exists
                tcProfit = salePrice * tccom / 100;
                
                guideProfit = (netIncome - tcProfit) * (parseInt(com) / 10);
                companyProfit = netIncome - tcProfit - guideProfit;
            }
        }

        return(
            <tr>
                <td>
                    <br />
                    <label id="label-beefandhoney-num">판매갯수</label>
                    <input type="text" name={this.props.idx} id="input-beefandhoney-num" onChange={this.updateNum} defaultValue={num} ref={(obj) => this.numObj = obj}/><br />
                    <label><span style={{color:"white"}}>.</span></label>
                </td>
                <td>
                    {/* <br /> */}
                    <label>판매총액</label>
                    <input type="text" name={this.props.idx} id="input-beefandhoney-amount" onChange={this.updateAmount} defaultValue={salePrice} ref={(obj) => this.salePriceObj = obj}/><br />
                </td>
                <td>
                    {/* <br /> */}
                    <label>총 원가</label>
                    <input type="text" name={this.props.idx} id="input-beefandhoney-originalprice" onChange={this.updateOriginalPrice} defaultValue={originalPrice} ref={(obj) => this.originalPriceObj = obj}/><br />
                </td>
                <td id="output-guide">
                    <br />
                    <label>수입분배</label>
                    <select className="browser-default" id="option-beefandhoney-com" name={this.props.idx} value={com} onChange={this.updateCom} ref={(obj) => this.comObj = obj}>
                        <option defaultValue="-">수입분배</option>
                        <option value="2">9 : 1</option>
                        <option value="2">8 : 2</option>
                        <option value="3">7 : 3</option>
                        <option value="4">6 : 4</option>
                        <option value="5">5 : 5</option>
                    </select>
                    <label>가이드 수입: $<span>{guideProfit.toFixed(2)}</span></label>
                    <span id="hidden-amount">{companyProfit.toFixed(2)}</span>
                    <span id="hidden-amount">{tcProfit.toFixed(2)}</span>
                </td>
            </tr>
        );
    }
    //Update input
    updateAmount = (event) => {
        this.setState({
            salePrice: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("saleprice");
        this.props.onChange(event, existingObjArr);
    }
    updateNum = (event) => {
        console.log(event.target.value);
        this.setState({
            num: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("num");
        this.props.onChange(event, existingObjArr);
    }
    updateCom = (event) => {
        this.setState({
            com: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("com");
        this.props.onChange(event, existingObjArr);
    }
    updateOriginalPrice = (event) => {
        this.setState({
            originalPrice: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("originalprice");
        this.props.onChange(event, existingObjArr);
    }

    //Check if default data exists for the components apart from the one being changed
    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.numObj.value !== "" && dataChanged !== "num"){
            objArr.push(this.numObj);
        }
        if(this.originalPriceObj.value !== "" && dataChanged !== "originalprice"){
            objArr.push(this.originalPriceObj);
        }
        if(this.salePriceObj.value !== "" && dataChanged !== "saleprice"){
            objArr.push(this.salePriceObj);
        }
        if(this.comObj.value !== "수입분배" && dataChanged !== "com"){
            objArr.push(this.comObj);
        }

        return objArr;
    }
}
export default ProfitHoneyAndBeef;