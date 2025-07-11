import React, { Component } from 'react';

class ShoppingProfit extends Component{
    state = {
        name: "-",
        totalAmount: "",
    }
    render(){
        //Initialzie varaibles
        var name = "-";
        var totalAmount = "";

        //Initialize commission related variables
        var comm = 0;
        var guidecomArr = [];
        var guidecom = 0;
        var tccom = 0;
        var commAmount = 0;
        var companyProfit = 0;
        var guideProfit = 0;
        var tcProfit = 0;

        //Get data from parent if exists
        for(var idx=0; idx<this.props.data.length; idx++){
            if(parseInt(this.props.data[idx][1]) === this.props.idx){
                if(this.props.data[idx][2] !== null) name = this.props.data[idx][2];
                if(this.props.data[idx][3] !== null) totalAmount = this.props.data[idx][3];
                break;
            }
        }

        guidecomArr = this.props.guidecom;
        tccom = this.props.tccom;

        //If input updated
        if(this.state.name !== "-"){
            name = this.state.name;
        }
        if(this.state.totalAmount !== ""){
            totalAmount = this.state.totalAmount;
        }

        //Get comm
        if(name !== "-") {
            for(idx=0; idx<this.props.list.length; idx++){
                
                if(name === this.props.list[idx][0]){
                    comm = parseInt(this.props.list[idx][2]) / 100;
                    break;
                }
            }

            //Get guidecom
            for(idx=0; idx<guidecomArr.length; idx++){
                if(name === guidecomArr[idx][1]){
                    guidecom = guidecomArr[idx][2];
                    break;
                }
            }
        }

        //Calculate commission and profit for company, guide and tc
        if(comm !== 0 && totalAmount !== ""){
            commAmount = parseFloat(totalAmount) * comm;
            //TC or not
            if(!this.props.tc || this.props.tc === "0"){
                guideProfit = commAmount * (guidecom / 100);
                companyProfit = commAmount - guideProfit;
            }else{
                tcProfit = parseFloat(totalAmount) * (tccom / 100);
                guideProfit = (commAmount - tcProfit) * (guidecom / 100);
                companyProfit = commAmount - tcProfit - guideProfit;
            }
        }

        //Option for select name
        const optionShopping = [];
        for(idx=0; idx<this.props.list.length; idx++){
            optionShopping.push(<option key={idx} value={this.props.list[idx][0]} data={this.props.list[idx][3]}>{this.props.list[idx][1]}</option>);
        }

        return(
            // <tr>
            //     <td>
            //         <label>쇼핑내역</label><br />
            //         <select className="browser-default" id="option-shopping-name" name={this.props.idx} value={name} onChange={this.updateName} ref={(obj) => this.nameObj = obj}>
            //             <option defaultValue="-">쇼핑내역</option>
            //             {optionShopping}
            //         </select>
            //     </td>
            //     <td>
            //         <label>판매총액</label><br />
            //         <input type="text" id="input-shopping-amount" name={this.props.idx} defaultValue={totalAmount} onChange={this.updateTotalAmount} ref={(obj) => this.totalAmountObj = obj} />
            //     </td>
            //     <td id="output-commission">
            //         커미션 금액: $<span>{companyProfit.toFixed(2)}</span>
            //     </td>
            //     <td id="output-guide">
            //         가이드 수입: $<span>{guideProfit.toFixed(2)}</span>
            //     </td>
            //     <td id="output-tc">
            //         TC수입: $<span>{tcProfit.toFixed(2)}</span>
            //     </td>
            // </tr>
            <tr>
                <td>
                    {/* <label>쇼핑내역</label><br /> */}
                    <select className="browser-default" id="option-shopping-name" name={this.props.idx} value={name} onChange={this.updateName} ref={(obj) => this.nameObj = obj}>
                        <option defaultValue="-">쇼핑내역</option>
                        {optionShopping}
                    </select>
                </td>
                <td>
                    {/* <label>판매총액</label><br /> */}
                    <input type="text" id="input-shopping-amount" name={this.props.idx} defaultValue={totalAmount} onChange={this.updateTotalAmount} ref={(obj) => this.totalAmountObj = obj} placeholder="판매총액" />
                </td>
                <td id="output-commission">
                    $<span>{companyProfit.toFixed(2)}</span>
                </td>
                <td id="output-guide">
                    $<span>{guideProfit.toFixed(2)}</span>
                </td>
                <td id="output-tc">
                    $<span>{tcProfit.toFixed(2)}</span>
                </td>
            </tr>
        );
    }

    //Event handler - update components
    updateTotalAmount = (event) => {
        this.setState({
            totalAmount: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("totalamount");
        this.props.onChange(event, existingObjArr);
    }
    updateName = (event) => {
        this.setState({
            name: event.target.value,
        });
        var existingObjArr = this.checkDefaultDataExist("name");
        this.props.onChange(event, existingObjArr);
    }

    //Check if default data exists for components apart from the one being changed
    checkDefaultDataExist = (dataChanged) => {
        var objArr = [];
        if(this.nameObj.value !== "쇼핑내역" && dataChanged !== "name"){
            objArr.push(this.nameObj);
        }
        if(this.totalAmountObj.value !== "" && dataChanged !== "totalamount"){
            objArr.push(this.totalAmountObj);
        }
        return objArr;
    }
}
export default ShoppingProfit;