import React, { Component } from 'react';
import {Table} from 'react-materialize';
import DatabaseConnectionHelper from '../../helper/DatabaseConnectionHelper';
import $ from 'jquery';
import { setData } from '../../js/model';
import { isJson } from '../../js/functions';

//Import javascript
import OptionProfit from './ProfitOption';
import ShoppingProfit from './ProfitShopping';
import ProfitHoneyAndBeef from './ProfitBeefAndHoney';
class Profit extends Component{
    constructor(){
        super();

        //state
        this.state = {
            tc: "",
            guidecom: [],

            numOfShopping: 1,
            numOfOption: 1,
            
            //list
            listDataShopping: [],
            listDataOption: [],

            //data
            dataShopping: [],
            dataOption: [],
            dataHoneyBeef: [],

            optionLoaded: false,
            shoppingLoaded: false,
            beefandhoneyLoaded: false,
        }

        //Get list of shopping and option item
        this.callListData("shopping");
        this.callListData("option");

        this.callTc();

        //Get saved data if exists
        this.callData();
    }
    
    render(){
        const shoppingObj = [];
        const optionObj = [];

        for(var idx=0; idx<this.state.numOfShopping; idx++){
            shoppingObj.push(<ShoppingProfit key={idx} idx={idx+1} tccom={this.state.tc} guidecom={this.state.guidecom} list={this.state.listDataShopping} data={this.state.dataShopping} onChange={this.props.onChange} tc={this.props.tc}/>);
        }
        for(idx=0; idx<this.state.numOfOption; idx++){
            optionObj.push(<OptionProfit key={idx} idx={idx+1} tccom={this.state.tc} list={this.state.listDataOption} data={this.state.dataOption} onChange={this.props.onChange} tc={this.props.tc}/>);
        }
        
        //Get com data
        this.callGuideCom();
        return(
            <div className="input">
                <div className="title">수입 내역</div>
                <div className="desc">
                    <br />
                    {/* Shopping */}
                    <h6>쇼핑</h6>
                    <div className="addOrRemove">
                        <input type="button" value="+" id="btn-add" onClick={this.addShopping}/>
                        <input type="button" value="-" id="btn-remove" onClick={this.removeShopping}/>
                    </div>
                    <Table>
                        <tbody>
                            <tr>
                                <td>쇼핑</td>
                                <td>판매총액</td>
                                <td>커미션 금액</td>
                                <td>가이드 수입</td>
                                <td>TC 수입</td>
                            </tr>
                            {shoppingObj}
                        </tbody>
                    </Table>
                    <hr />
                    {/* Option */}
                    <h6>옵션</h6>
                    <div className="addOrRemove">
                        <input type="button" value="+" id="btn-add" onClick={this.addOption}/>
                        <input type="button" value="-" id="btn-remove" onClick={this.removeOption}/>
                    </div>
                    <Table>
                        <tbody>
                            <tr>
                                <td>선택관광</td>
                                <td>판매총액</td>
                                <td>원가</td>
                                <td>수입 분배</td>
                                <td>비고</td>
                                <td>가이드 수입</td>
                            </tr>
                            {optionObj}
                        </tbody>
                    </Table>
                    <hr />
                    {/* Honey and beef */}
                    <h6>꿀</h6>
                    <Table>
                        <tbody>
                            <tr>
                                <td>판매갯수</td>
                                <td>판매총액</td>
                                <td>총 원가</td>
                                <td>수입분배</td>
                            </tr>
                            <ProfitHoneyAndBeef idx={"1"} onChange={this.props.onChange} data={this.state.dataHoneyBeef} tccom={this.state.tc} tc={this.props.tc} title="꿀"/>
                        </tbody>
                    </Table>
                    {/* <hr /> */}
                    {/* Honey and beef */}
                    <h6>육포</h6>
                    <Table>
                        <tbody>
                            <tr>
                                <td>판매갯수</td>
                                <td>판매총액</td>
                                <td>총 원가</td>
                                <td>수입분배</td>
                            </tr>
                            <ProfitHoneyAndBeef idx={"2"} onChange={this.props.onChange} data={this.state.dataHoneyBeef} tccom={this.state.tc} tc={this.props.tc} title="육포"/>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

    //Get data
    callListData = (data) => {
        if(data === "shopping"){
            fetch(DatabaseConnectionHelper() + "DisplayShoppinglistController.php")
            .then(res => res.json())
            .then((result) => this.setShoppingListData(result)
            );
        }else if(data === "option"){
            fetch(DatabaseConnectionHelper() + "DisplayOptiontourController.php")
            .then(res => res.json())
            .then((result) => this.setOptiontourListData(result)
            );
        }
    }
    //Get user saved data
    callData = () => {
        //Get tourcode from URL to get the corresponding data
        var formURL = window.location.href.split("/");
        var tourcode = formURL[formURL.length - 1];
        tourcode = decodeURIComponent(tourcode);
        
        //Shopping
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveShoppingProfitController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setShoppingData(result);
                this.profitDataLoaded("shopping");
            }
        });

        //Option
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveOptionProfitController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setOptionData(result);
                this.profitDataLoaded("option");
            }
        });

        //Honey and beef
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveHBProfitController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setHBData(result);
                this.profitDataLoaded("beefandhoney");
            }
        });
    }

    profitDataLoaded = (data) => {
        if(data === "shopping"){
            this.setState({
                shoppingLoaded: true,
            })
        }else if(data === "option"){
            this.setState({
                optionLoaded: true,
            })
        }else if(data === "beefandhoney"){
            this.setState({
                beefandhoneyLoaded: true,
            })
        }

        this.dataLoaded();
    }
    dataLoaded = () => {
        if(this.state.shoppingLoaded && this.state.optionLoaded && this.state.beefandhoneyLoaded){
            this.props.onLoadedData("profit");
        }
    }

    //Get data from database
    callTc = () => {
        if(this.state.tc === ""){
            //Get TC
            $.ajax({
                url: DatabaseConnectionHelper() + "GetTCController.php",
                type: "POST",
                success: (result) => {
                    this.setTc(result)
                }
            });
        }
    }
    setTc = (result) => {
        var temp = JSON.parse(result);
        var tc = parseInt(temp[0][0]);
        this.setState({
            tc: tc,
        });
    }

    callGuideCom = async () => {
        if(this.state.guidecom.length === 0){
            var result = await setData("GetGuideComController.php", this.props.guideid);
            if(isJson(result)){
                var data = JSON.parse(result);
                this.setState({
                    guidecom: data,
                });
            }
        }
    }

    //Set data
    setShoppingListData = (result) => {
        this.setState({
            listDataShopping: result,
        });
    }
    setOptiontourListData = (result) => {
        this.setState({
            listDataOption: result,
        });
    }

    setShoppingData = (result) => {
        var data = JSON.parse(result);
        if(data.length > 0){
            var last = data[data.length-1][1];
            if(last >= 2){
                this.setState({
                    numOfShopping: parseInt(last),
                })
            }
        }
        this.setState({
            dataShopping: data
        })
    }
    setOptionData = (result) => {
        var data = JSON.parse(result);
        if(data.length > 0){
            var last = data[data.length-1][1];
            // var last = data.length;
            if(last >= 2){
                this.setState({
                    numOfOption: parseInt(last),
                })
            }
            this.setState({
                dataOption: data
            })
        }
        
    }
    setHBData = (result) => {
        var data = JSON.parse(result);
        this.setState({
            dataHoneyBeef: data
        })
    }
    //Add or remove components
    addShopping = () => {
        this.setState({
            numOfShopping: this.state.numOfShopping + 1
        });
        this.props.onClick(null, "add", "shopping");
    }
    addOption = () => {
        this.setState({
            numOfOption: this.state.numOfOption + 1,
        });
        this.props.onClick(null, "add", "option");
    }

    removeShopping = () => {
        if(this.state.numOfShopping > 1){
            var num = this.state.numOfShopping - 1;
            const dataShoppingCopy = [];
            var addGapIdx = 1;

            for(var idx=0; idx<=num; idx++){
                if(this.state.dataShopping[idx] !== undefined){
                    var arrData = parseInt(this.state.dataShopping[idx][1]);

                    //If data exists
                    if(arrData === (idx + addGapIdx)){
                        dataShoppingCopy.push(this.state.dataShopping[idx]);
                    }else{
                        var difference = arrData - (idx + addGapIdx);
                        var gapIdx = difference;
                        for(var ind=0; ind<difference; ind++){
                            dataShoppingCopy.push(["", arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataShoppingCopy.push(this.state.dataShopping[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }
            var data = dataShoppingCopy[num];

            this.setState({
                numOfShopping: num,
            });
            this.props.onClick(data, "remove", "shopping");
        }
    }
    removeOption = () => {
        if(this.state.numOfOption > 1){
            var num = this.state.numOfOption - 1;
            const dataOptionCopy = [];
            var addGapIdx = 1;

            for(var idx=0; idx<=num; idx++){
                if(this.state.dataOption[idx] !== undefined){
                    var arrData = parseInt(this.state.dataOption[idx][1]);

                    //If data exists
                    if(arrData === (idx + addGapIdx)){
                        dataOptionCopy.push(this.state.dataOption[idx]);
                    }else{
                        var difference = arrData - (idx + addGapIdx);
                        var gapIdx = difference;
                        for(var ind=0; ind<difference; ind++){
                            dataOptionCopy.push(["", arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataOptionCopy.push(this.state.dataOption[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }
            var data = dataOptionCopy[num];

            this.setState({
                numOfOption: num,
            });
            this.props.onClick(data, "remove", "option");
        }
    }
}

export default Profit;
