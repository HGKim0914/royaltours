import React, { Component } from 'react';

class OptionProfit extends Component{
    state = {
        name: "-",
        salePrice: "",
        originalPrice: "",
        com: "-",
        misc: "",
    }

    render(){
        //Initialize variables
        var name = "-";
        var salePrice = "";
        var originalPrice = "";
        var com = "-";
        var misc = "";

        //Initialize com data
        var tccom = 0;
        var netIncome = 0;
        var guideProfit = 0;
        var tcProfit = 0;
        var companyProfit = 0;

        for(var idx=0; idx<this.props.data.length; idx++){
            if(parseInt(this.props.data[idx][1]) === this.props.idx){
                //Get data from parent if exists
                if(this.props.data[idx][2] !== null) name = this.props.data[idx][2];
                if(this.props.data[idx][3] !== null) salePrice = this.props.data[idx][3];
                if(this.props.data[idx][4] !== null) originalPrice = this.props.data[idx][4];
                if(this.props.data[idx][5] !== null) misc = this.props.data[idx][5];
                if(this.props.data[idx][9] !== null) com = this.props.data[idx][9];
            }
        }
        
        tccom = this.props.tccom;

        //If input updated
        if(this.state.name !== "-"){
            name = this.state.name;
        }
        if(this.state.salePrice !== ""){
            salePrice = this.state.salePrice;
        }
        if(this.state.com !== "-"){
            com = this.state.com;
        }
        if(this.state.originalPrice !== ""){
            originalPrice = this.state.originalPrice;
        }
        if(this.state.misc !== ""){
            misc = this.state.misc;
        }

        //Get netincome
        if(salePrice !== "" && originalPrice !== ""){
            netIncome = parseFloat(salePrice) - parseFloat(originalPrice);
        }

        //Calculate guide profit
        if(netIncome !== 0 && com !== "-"){
            if(!this.props.tc || this.props.tc === "0"){
                guideProfit = (parseInt(com) / 10) * netIncome;
                companyProfit = netIncome - guideProfit;
            }else{
                tcProfit = salePrice * (tccom / 100);
                guideProfit = (netIncome - tcProfit) * (parseInt(com) / 10);
                companyProfit = netIncome - tcProfit - guideProfit;
            }
        }

        //Display select option
        const optionOption = [];
        for(idx=0; idx<this.props.list.length; idx++){
            optionOption.push(<option key={idx} value={this.props.list[idx][0]}>{this.props.list[idx][1]}</option>);
        }
        return(
            <tbody>
                <tr>
                    <td rowSpan={2} style={{width: '100px'}}>
                        옵션 No. {this.props.idx}
                    </td>
                    <td>
                        <label>선택관광</label>
                        <select className="browser-default" id="option-option-name" name={this.props.idx} value={name} onChange={this.updateName} ref={(obj) => this.nameObj = obj}>
                            <option defaultValue="-">선택관광</option>
                            {optionOption}
                        </select>
                    </td>
                    <td>
                        <label>판매총액</label>
                        <input type="text" id="input-option-saleprice" name={this.props.idx} defaultValue={salePrice} onChange={this.updateSalePrice} ref={(obj) => this.salePriceObj = obj}/>
                    </td>
                    <td>
                        <br />
                        <label>총 원가</label>
                        <input type="text" id="input-option-originalprice" name={this.props.idx} defaultValue={originalPrice} onChange={this.updateOriginalPrice} ref={(obj) => this.originalPriceObj = obj}/>
                        <br />
                        <label>차액: ${netIncome.toFixed(2)}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>수입분배</label>
                        <select className="browser-default" id="option-option-com" name={this.props.idx} value={com} onChange={this.updateCom} ref={(obj) => this.comObj = obj}>
                            <option defaultValue="-">수입분배</option>
                            <option value="3">7 : 3</option>
                            <option value="2">8 : 2</option>
                            <option value="4">6 : 4</option>
                            <option value="5">5 : 5</option>
                        </select>
                    </td>
                    <td>
                        <label>비고</label><br />
                        <input type="text" id="input-option-misc" name={this.props.idx} defaultValue={misc} onChange={this.updateMisc} ref={(obj) => this.miscObj = obj}/>
                    </td>
                    <td id="output-guide">
                        가이드 수입: $<span>{guideProfit.toFixed(2)}</span><span id="hidden-amount">{companyProfit.toFixed(2)}</span><span id="hidden-amount">{tcProfit.toFixed(2)}</span>
                    </td>
                </tr>
            </tbody>
        );
    }

    //Event Handler - update input
    updateName = (event)=> {
        this.setState({
            name: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("name");
        this.props.onChange(event, existingObjArr);
    }
    updateCom = (event) => {
        this.setState({
            com: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("com");
        this.props.onChange(event, existingObjArr);
    }
    updateSalePrice = (event) => {
        this.setState({
            salePrice: event.target.value,
        });

        var existingObjArr = this.checkDefaultDataExist("salePrice");
        this.props.onChange(event, existingObjArr);
    }
    updateOriginalPrice = (event) => {
        this.setState({
            originalPrice: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("originalPrice");
        this.props.onChange(event, existingObjArr);
    }
    updateMisc = (event) => {
        this.setState({
            misc: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("misc");
        this.props.onChange(event, existingObjArr);
    }

    //Check if default data exists for components apart from the one being changed
    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.nameObj.value !== "선택관광" && dataChanged !== "name"){
            objArr.push(this.nameObj);
        }
        if(this.salePriceObj.value !== "" && dataChanged !== "salePrice"){
            objArr.push(this.salePriceObj);
        }
        if(this.comObj.value !== "수입분배" && dataChanged !== "com"){
            objArr.push(this.comObj);
        }
        if(this.miscObj.value !== "" && dataChanged !== "misc"){
            objArr.push(this.miscObj);
        }
        if(this.originalPriceObj.value !== "" && dataChanged !== "originalPrice"){
            objArr.push(this.originalPriceObj);
        }
        console.log(objArr);

        return objArr;
    }

}
export default OptionProfit;