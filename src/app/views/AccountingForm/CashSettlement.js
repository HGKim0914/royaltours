import React, {Component} from 'react';
import {Table} from 'react-materialize';

import PlusFactor from './CashSettlementPlusFactor';
import MinusFactor from './CashSettlementMinusFactor';
import GuideTipLocal from './CashSettlementGuideTipLocal';
import GuideTipInbound from './CashSettlementGuideTipInbound';
import $ from 'jquery';
import DatabaseConnectionHelper from '../../helper/DatabaseConnectionHelper';

class CashSettlement extends Component{
    constructor(){
        super();
        this.state = {
            numPlusFactor: 0,
            numMinusFactor: 0,
            numGuideTipInboundIdx: 0,
            numGuideTipLocalIdx: 0,
    
            //initial value for each input
            //Stored Data
            dataPlusFactor: [],
            dataPlusFactorTotal: [],
            dataPlusFactorLocal: [],
            dataPlusFactorGuide: [],
            dataPlusFactorExtra: [],
            dataPlusFactorMisc: [],

            dataMinusFactor: [],
            dataMinusFactorGuide: [],
            dataMinusFactorOption: [],
            dataMinusFactorMisc: [],

            dataTipInbound: [],
            dataTipInboundGuide: [],
            dataTipInboundMisc: [],

            dataTipLocal: [],
        }

        //Call data
        this.callData();
    }
    render(){
        const plusMiscObj = [];
        const minusMiscObj = [];
        const guideTipInboundObj = [];
        const guideTipLocalObj = [];

        
        for(var idx=0; idx<this.state.numPlusFactor; idx++){
            plusMiscObj.push(<PlusFactor key={idx} idx={idx+9} data={this.state.dataPlusFactor} title="기타 입금" name={"tour-extra-plus-"+idx+1} onChange={this.props.onChange}/>);
        }
        for(idx=0; idx<this.state.numMinusFactor; idx++){
            minusMiscObj.push(<MinusFactor key={idx} idx={idx+3} data={this.state.dataMinusFactor} title="기타 입금" name={"tour-extra-minus-"+idx+1} onChange={this.props.onChange}/>);
        }
        for(idx=0; idx<this.state.numGuideTipInboundIdx; idx++){
            guideTipInboundObj.push(<GuideTipInbound key={idx} idx={idx+2} data={this.state.dataTipInbound} title="기타" onChange={this.props.onChange}/>);
        }
        for(idx=0; idx<this.state.numGuideTipLocalIdx; idx++){
            guideTipLocalObj.push(<GuideTipLocal key={idx} idx={idx+2} title="기타" data={this.state.dataTipLocal} onChange={this.props.onChange}/>);
        }

        return(
            <div className="input">
                <div className="title">
                    투어 정산 관리
                </div>
                <div className="desc">
                    <h6>자금의 수입(+)</h6>
                    <div className="addOrRemove">
                        <input type="button" value="+" id="btn-add" onClick={this.addplus}/>
                        <input type="button" value="-" id="btn-remove" onClick={this.removeplus}/>
                    </div>
                    <Table>
                        <tbody>
                            <tr>
                                <td>구분</td>
                                <td>금액</td>
                                <td>비고</td>
                            </tr>
                            <PlusFactor title={"행사비 수령"} idx={1} data={this.state.dataPlusFactor} name="tour-total-plus" onChange={this.props.onChange} />
                            <PlusFactor title={"행사비 현지수금"} idx={2} data={this.state.dataPlusFactor} name="tour-local-plus" onChange={this.props.onChange} />
                            <PlusFactor title={"쇼핑매출&가이드 수금"} idx={3} data={this.state.dataPlusFactor} name="tour-guide-plus" onChange={this.props.onChange} />
                            <PlusFactor title={"가이드 입금비 (상조경비등)"} idx={4} data={this.state.dataPlusFactor} name="tour-misc-plus" onChange={this.props.onChange} />
                            <PlusFactor title={"옵션카드 수표 지급액"} idx={5} data={this.state.dataPlusFactor} name="tour-misc-plus" onChange={this.props.onChange} />
                            <PlusFactor title={"꿀 입금분"} idx={6} data={this.state.dataPlusFactor} name="tour-misc-plus" onChange={this.props.onChange} />
                            <PlusFactor title={"육포 입금분"} idx={7} data={this.state.dataPlusFactor} name="tour-misc-plus" onChange={this.props.onChange} />
                            <PlusFactor title={"가이드 팁 입금"} idx={8} data={this.state.dataPlusFactor} name="tour-misc-plus" onChange={this.props.onChange} />
                            {plusMiscObj}
                        </tbody>
                    </Table>
                    <br /><hr /><br />
                    <h6>자금의 지출(-)</h6>
                    <div className="addOrRemove">
                        <input type="button" value="+" id="btn-add" onClick={this.addminus} />
                        <input type="button" value="-" id="btn-remove" onClick={this.removeminus}/>
                    </div>
                    <Table>
                        <tbody>
                            <tr>
                                <td>구분</td>
                                <td>금액</td>
                                <td>비고</td>
                            </tr>
                            <MinusFactor title={"회사가 수금한 가이드 팁(로컬행사)"} name="tour-guide-minus" idx={1} data={this.state.dataMinusFactor} onChange={this.props.onChange}/>
                            <MinusFactor title={"옵션포함의 경우 옵션비용"} name="tour-option-minus" idx={2} data={this.state.dataMinusFactor} onChange={this.props.onChange}/>
                            {minusMiscObj}
                        </tbody>
                    </Table>
                    {/* <h6>가이드 지출(-)</h6> */}
                    <div className="addOrRemove removed-obj">
                        <input type="button" value="+" id="btn-add" onClick={this.addGuideTipInbound}/>
                        <input type="button" value="-" id="btn-remove" onClick={this.removeGuideTipInbound}/>
                    </div>
                    <Table className="removed-obj">
                        <tbody>
                            <GuideTipInbound title={"지출(-)"} idx={1} data={this.state.dataTipInbound} onChange={this.props.onChange}/>
                            {guideTipInboundObj}
                            {/* <GuideTipInbound title={"기타"} /> */}
                        </tbody>
                    </Table>
                    {/* <h6>가이드 수입(+)</h6> */}
                    <div className="addOrRemove removed-obj">
                        <input type="button" value="+" id="btn-add" onClick={this.addGuideTipLocal}/>
                        <input type="button" value="-" id="btn-remove" onClick={this.removeGuideTipLocal}/>
                    </div>
                    <Table className="removed-obj">
                        <tbody>
                            <GuideTipLocal title={"수입(+)"} idx={1} data={this.state.dataTipLocal} onChange={this.props.onChange}/>
                            {guideTipLocalObj}
                            {/* <GuideTipInbound title={"기타"} /> */}
                        </tbody>
                    </Table>
                    <br /><br />
                </div>
            </div>
        );
    }

    //Add or remove components
    addplus = () => {
        this.setState({
            numPlusFactor: this.state.numPlusFactor + 1,
        });
        this.props.onClick(null, "add", "plusfactor");
    }
    addminus = () => {
        this.setState({
            numMinusFactor: this.state.numMinusFactor + 1,
        });
        this.props.onClick(null, "add", "minusfactor");
    }
    addGuideTipInbound = () => {
        this.setState({
            numGuideTipInboundIdx: this.state.numGuideTipInboundIdx + 1,
        });
        this.props.onClick(null, "add", "inbound");
    }
    addGuideTipLocal = () => {
        this.setState({
            numGuideTipLocalIdx: this.state.numGuideTipLocalIdx + 1,
        });
        this.props.onClick(null, "add", "local");
    }

    removeplus = () => {
        if(this.state.numPlusFactor > 0){
            var num = this.state.numPlusFactor + 5;
            const dataPlusFactorCopy = [];
            var addGapIdx = 1;

            for(var idx=0; idx<=num; idx++){
                if(this.state.dataPlusFactor[idx] !== undefined){
                    var arrData = parseInt(this.state.dataPlusFactor[idx][1]);
                    //if data exists, store in array
                    if(arrData === (idx+addGapIdx)){
                        dataPlusFactorCopy.push(this.state.dataPlusFactor[idx]);
                    }//else store mockup data
                    else{
                        var difference = arrData - (idx + addGapIdx);
                        var gapIdx = difference;
                        for(var ind = 0; ind<difference; ind++){
                            dataPlusFactorCopy.push(["", ""+arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataPlusFactorCopy.push(this.state.dataPlusFactor[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }

            ind = 0;
            for(idx=0; idx<dataPlusFactorCopy.length; idx++){
                //if number of components exceed the number of default components
                if(dataPlusFactorCopy[idx][1] >= 9){
                    ind = ind+1;
                }
            }
            var numOfExtra = ind - this.state.numPlusFactor + 1;
            var data = dataPlusFactorCopy[dataPlusFactorCopy.length - numOfExtra];
            this.setState({
                numPlusFactor: this.state.numPlusFactor - 1,
            });
            this.props.onClick(data, "remove", "plusfactor");
        }
    }
    removeminus = () => {
        if(this.state.numMinusFactor > 0){
            var num = this.state.numMinusFactor + 3;
            const dataMinusFactorCopy = [];
            var addGapIdx = 1;

            //Get temp array with all components including empty one
            for(var idx=0; idx<=num; idx++){
                if(this.state.dataMinusFactor[idx] !== undefined){
                    var arrData = parseInt(this.state.dataMinusFactor[idx][1]);
                    if(arrData === (idx+addGapIdx)){
                        dataMinusFactorCopy.push(this.state.dataMinusFactor[idx]);
                    }else{
                        var difference = arrData - (idx+addGapIdx);
                        var gapIdx = difference;
                        for(var ind=0; ind<difference; ind++){
                            dataMinusFactorCopy.push(["","" + arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataMinusFactorCopy.push(this.state.dataMinusFactor[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }
            ind = 0;
            for(idx=0; idx<dataMinusFactorCopy.length; idx++){
                if(dataMinusFactorCopy[idx][1] >= 3){
                    ind = ind + 1;
                }
            }
            var numOfExtra = ind - this.state.numMinusFactor + 1;
            var data = dataMinusFactorCopy[dataMinusFactorCopy.length - numOfExtra];


            this.setState({
                numMinusFactor: this.state.numMinusFactor - 1,
             });
             this.props.onClick(data, "remove", "minusfactor");
        }
    }
    removeGuideTipInbound = () => {
        if(this.state.numGuideTipInboundIdx > 0){
            var num = this.state.numGuideTipInboundIdx + 2;
            const dataInboundCopy = [];
            var addGapIdx = 1;
            for(var idx = 0; idx<=num; idx++){
                if(this.state.dataTipInbound[idx] !== undefined){
                    var arrData = parseInt(this.state.dataTipInbound[idx][1]);
                    if(arrData === (idx+addGapIdx)){
                        dataInboundCopy.push(this.state.dataTipInbound[idx]);
                    }else{
                        var difference = arrData - (idx + addGapIdx);
                        var gapIdx = difference;
                        for(var ind=0; ind<difference; ind++){
                            dataInboundCopy.push(["",""+arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataInboundCopy.push(this.state.dataTipInbound[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }
            ind = 0;
            for(idx=0; idx<dataInboundCopy.length; idx++){
                if(dataInboundCopy[idx][1] >= 2){
                    ind = ind + 1;
                }
            }
            var numOfExtra = ind - this.state.numGuideTipInboundIdx + 1;
            var data = dataInboundCopy[dataInboundCopy.length - numOfExtra];
            this.setState({
                numGuideTipInboundIdx: this.state.numGuideTipInboundIdx - 1,
            });
            this.props.onClick(data, "remove", "inbound");
        }
    }
    removeGuideTipLocal = () => {
        if(this.state.numGuideTipLocalIdx > 0){
            var num = this.state.numGuideTipLocalIdx + 2;
            const dataLocalCopy = [];
            var addGapIdx = 1;
            for(var idx=0; idx<=num; idx++){
                if(this.state.dataTipLocal[idx] !== undefined){
                    var arrData = parseInt(this.state.dataTipLocal[idx][1]);
                    if(arrData === (idx + addGapIdx)){
                        dataLocalCopy.push(this.state.dataTipLocal[idx]);
                    }else{
                        var difference = arrData - (idx + addGapIdx);
                        var gapIdx = difference;
                        for(var ind = 0; ind < difference; ind++){
                            dataLocalCopy.push(["","" + arrData - gapIdx + ""]);
                            gapIdx--;
                        }
                        dataLocalCopy.push(this.state.dataTipLocal[idx]);
                        addGapIdx = addGapIdx + difference;
                    }
                }
            }
            ind = 0;
            for(idx = 0; idx<dataLocalCopy.length; idx++){
                if(dataLocalCopy[idx][1] >= 2){
                    ind = ind + 1;
                }
            }
            var numOfExtra = ind - this.state.numGuideTipLocalIdx + 1;
            var data = dataLocalCopy[dataLocalCopy.length - numOfExtra];
            this.setState({
                numGuideTipLocalIdx: this.state.numGuideTipLocalIdx - 1,
            })
            this.props.onClick(data, "remove", "local");
        }
    }
    //Call data
    callData = () => {
        //Get tourcode from URL to get the corresponding data
        var formURL = window.location.href.split("/");
        var tourcode = formURL[formURL.length - 1];
        tourcode = decodeURIComponent(tourcode);

        //plus factor
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrievePlusFactorController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setPlusFactorData(result);
                this.props.onLoadedData("cashsettlement");
            }
        });

        //minus factor
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveMinusFactorController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setMinusFactorData(result);
            }
        });

        //Tip inbound
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveTipInboundController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setTipInboundData(result);
            }
        });

        //Tip local
        $.ajax({
            url: DatabaseConnectionHelper() + "RetrieveTipLocalController.php",
            type: "POST",
            data: {
                tourcode: tourcode,
            },
            success: (result) => {
                this.setTipLocalData(result);
            }
        });

    }
    //Set data
    setPlusFactorData = (result) => {
        if(result !== false){
            var data = JSON.parse(result);
            if(data.length > 0){
                var last = data[data.length-1][1];
                if(last >= 8){
                    var lastComponent = parseInt(data[data.length-1][1]) - 8;
                    this.setState({
                        numPlusFactor: lastComponent,
                    })
                }
                //Set hotel data
                this.setState({
                    dataPlusFactor: data,
                })
            }
        }
    }
    setMinusFactorData = (result) => {
        if(result !== false){
            var data = JSON.parse(result);
            if(data.length > 0){
                var last = data[data.length-1][1];
                if(last >= 3){
                    var lastComponent = parseInt(data[data.length-1][1]) - 2;
                    this.setState({
                        numMinusFactor: lastComponent,
                    })
                }

                this.setState({
                    dataMinusFactor: data,
                })
            }
        }
    }
    setTipInboundData = (result) => {
        if(result !== ""){
            var data = JSON.parse(result);
            if(data.length > 0){
                var last = data[data.length-1][1];
                if(last >= 2){
                    var lastComponent = parseInt(data[data.length-1][1]) - 1;
                    this.setState({
                        numGuideTipInboundIdx: lastComponent,
                    });
                }

                this.setState({
                    dataTipInbound: data,
                })
            }
        }
    }
    setTipLocalData = (result) => {
        if(result !== false){
            var data = JSON.parse(result);
            if(data.length > 0){
                var last = data[data.length-1][1];
                if(last >= 2){
                    var lastComponent = parseInt(data[data.length-1][1]) - 1;
                    this.setState({
                        numGuideTipLocalIdx: lastComponent,
                    });
                }
                this.setState({
                    dataTipLocal: data,
                })
            }
        }
    }
}


export default CashSettlement;