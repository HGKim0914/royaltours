import React from 'react';
import {Table} from 'react-materialize';

const SecondTable = (props) => {
    //Length of plusfactor & minus factor
    const plusfactorObj = [];
    var counter = 0;
    for(var idx=0; idx<props.plusfactor.length; idx++){
        if(props.plusfactor[idx][1] > 7){
            plusfactorObj.push(<Plus key={idx} name="기타" data={props.plusfactor} idx={props.plusfactor[idx][1]}/>);
            counter = counter + 1;
        }
    }

    const minusfactorObj = [];
    var counter2 = 0;
    for(idx=0; idx<props.minusfactor.length; idx++){
        if(props.minusfactor[idx][1] > 3){
            minusfactorObj.push(<Minus key={idx} name="기타" data={props.minusfactor} idx={props.minusfactor[idx][1]}/>);
            counter2 = counter2 + 1;
        }
    }

    var counterInbound = 0;
    var inboundTotalAmount = 0;
    const inboundObj = [];
    for( idx=0; idx<props.guideTipInbound.length; idx++){
        inboundObj.push(<Inbound key={idx} data={props.guideTipInbound[idx]} />);
        counterInbound++;

        //total amount
        if(props.guideTipInbound[idx][2] !== null && props.guideTipInbound[idx][3] !== null){
            inboundTotalAmount += parseInt(props.guideTipInbound[idx][2]) * parseFloat(props.guideTipInbound[idx][3]);
        }
    }

    if(counterInbound === 0){
        var data = ["","","","",""];
        inboundObj.push(<Inbound key={1} data={data} />);
        counterInbound++;
    }

    var counterLocal = 0;
    var localTotalAmount = 0;
    var localTotalGuideAmount = 0;
    var localTotalDriverAmount = 0;
    var localTotalCompanyAmount = 0;
    const localObj = [];
    for(idx=0; idx<props.guideTipLocal.length; idx++){
        localObj.push(<Local key={idx} data={props.guideTipLocal[idx]}/>);
        counterLocal++;
        if(props.guideTipLocal[idx][3] !== null && props.guideTipLocal[idx][4] !== null){
            var totalAmount = parseInt(props.guideTipLocal[idx][3]) * parseFloat(props.guideTipLocal[idx][4]);
            localTotalAmount += totalAmount;
            localTotalGuideAmount += totalAmount * (5/10);
            localTotalCompanyAmount += totalAmount * (3/10);
            localTotalDriverAmount += totalAmount * (2/10);
        }
    }
    
    if(counterLocal === 0){
        data = ["","","","","","","",""];
        localObj.push(<Local key={1} data={data}/>);
        counterLocal++;
    }

    return(
        <Table>
            <tbody>
                {/* 자금의 수입 */}
                <tr>
                    <th rowSpan={8+counter}>자금의 수입 (+)</th>
                    <th colSpan="2">구분</th>
                    <th>금액</th>
                    <th colSpan="4">비고</th>
                </tr>
                <Plus name="행사비 수령" data={props.plusfactor} idx={1}/>
                <Plus name="투어비 현지수금" data={props.plusfactor} idx={2}/>
                <Plus name="쇼핑 매출 가이드 수금" data={props.plusfactor} idx={3}/>
                <Plus name="기타 입금 (상조경비 등)" data={props.plusfactor} idx={4}/>
                <Plus name="옵션카드 수표 지급액" data={props.plusfactor} idx={5}/>
                <Plus name="꿀 수령의 원기분" data={props.plusfactor} idx={6}/>
                <Plus name="육포 수령의 원기분" data={props.plusfactor} idx={7}/>
                {plusfactorObj}

                {/* 자금의 지출 */}
                <tr>
                    <th rowSpan={4+counter2}>자금의 지출 (-)</th>
                    <th colSpan="2">구분</th>
                    <th>금액</th>
                    <th colSpan="4">비고</th>
                </tr>
                <Minus name="회사가 수금한 가이드 팁 (로컬행사)" data={props.minusfactor} idx={1}/>
                <Minus name="옵션 포함의 경우 옵션비용" data={props.minusfactor} idx={2} />
                <Minus name="기타 입금" data={props.minusfactor} idx={3}/>
                {minusfactorObj}

                {/* 인바운드 */}
                <tr>
                    <th rowSpan={2 + counterInbound}>인바운드 (팁 포함 행사의 가이드 포션)(-)</th>
                    <th>인원</th>
                    <th>금액</th>
                    <th>총액</th>
                    <th colSpan="4">비고</th>
                </tr>
                {inboundObj}

                <tr>
                    <td colSpan={6}>소계</td>
                    <td>${inboundTotalAmount.toFixed(2)}</td>
                </tr>
                
                {/* 로컬행사 가이드팁 정리 */}
                <tr>
                    <th rowSpan={2 + counterLocal}>로컬행사 가이드팁 정리(+)</th>
                    <th>구분</th>
                    <th>인원</th>
                    <th>금액</th>
                    <th>총액</th>
                    <th>가이드(5)</th>
                    <th>회사(3)</th>
                    <th>기사(2)</th>
                </tr>
                {localObj}
                <tr>
                    <td colSpan="3">소계</td>
                    <td>${localTotalAmount.toFixed(2)}</td>
                    <td>${localTotalGuideAmount.toFixed(2)}</td>
                    <td>${localTotalCompanyAmount.toFixed(2)}</td>
                    <td>${localTotalDriverAmount.toFixed(2)}</td>
                </tr>

                {/* 총계 */}
                <tr id="total-netincome" >
                    <th colSpan="8" id="title">총 계</th>
                </tr>
                <tr id="total-netincome">
                    <th colSpan="3">정산금액</th>
                    <th colSpan="5">-</th>
                </tr>
            </tbody>
        </Table>
    );
}

export default SecondTable;

const Plus = (props) => {
    var amount = 0.00;
    var memo = "-";
    if(props.data.length > 0){
        for(var idx=0; idx<props.data.length; idx++){
            if(props.data[idx][1] === props.idx.toString()){
                if(props.data[idx][3] !== null){
                    amount = parseFloat(props.data[idx][3]).toFixed(2);
                }
                if(props.data[idx][4] !== null && props.data[idx][4] !== "NULL"){
                    memo = props.data[idx][4];
                }
            }
        }
    }
    return(
        <tr>
            <td colSpan="2">{props.name}</td>
            <td>{amount}</td>
            <td colSpan="4">{memo}</td>
        </tr>
    );
}
const Minus = (props) => {
    var amount = 0.00;
    var memo = "-";
    if(props.data.length > 0){
        for(var idx=0; idx<props.data.length; idx++){
            if(props.data[idx][1] === props.idx.toString()){
                if(props.data[idx][3] !== null){
                    amount =  parseFloat(props.data[idx][3]).toFixed(2);
                }
                if(props.data[idx][4] !== null && props.data[idx][4] !== "NULL"){
                    memo = props.data[idx][4];
                }
            }
        }
    }
    return(
        <tr>
            <td colSpan="2">{props.name}</td>
            <td>{amount}</td>
            <td colSpan="4">{memo}</td>
        </tr>
    );
}

const Inbound = (props) => {
    var data = props.data;
    var numpax = 0;
    var amount = 0.00;
    var totalAmount = 0.00;
    var desc = "-";

    if(data[2] !== "" && data[2] !== null && data[2] !== "NULL"){
        numpax = parseInt(data[2]);
    }
    if(data[3] !== "" && data[3] !== null && data[3] !== "NULL"){
        amount = parseFloat(data[3]).toFixed(2);
    }
    if(numpax !== 0 && amount !== 0.00){
        totalAmount = numpax * parseFloat(data[3]);
    }
    if(data[5] !== "" && data[5] !== null && data[5] !== "NULL"){
        desc = data[5];
    }
    // 인원	금액	총액	비고
    return(
        <tr>
            <td>{numpax}</td>
            <td>{amount}</td>
            <td>{totalAmount}</td>
            <td colSpan="4">{desc}</td>
        </tr>
    );
}

const Local = (props) => {
    var data = props.data;
    var name = "-";
    var numpax = 0;
    var amount = 0.00;
    var totalAmount = 0;
    var guideAmount = 0;
    var driverAmount = 0;
    var companyAmount = 0;

    if(data[2]!== null && data[2] !== "") name = data[2];
    if(data[3]!== null && data[3] !== "") numpax = parseInt(data[3]);
    if(data[4]!== null && data[4] !== "") amount = parseFloat(data[4]).toFixed(2);
    if(data[3] !== null && data[3] !== "" && data[4] !== null && data[4] !== ""){
        totalAmount = parseInt(data[3]) * parseFloat(data[4]);
    }
    if(totalAmount !== 0){
        guideAmount = (totalAmount * (5/10));
        driverAmount = totalAmount * (2/10);
        companyAmount = totalAmount * (3/10);
    }
    return(
        <tr>
            <td>{name}</td>
            <td>{numpax}</td>
            <td>{amount}</td>
            <td>{totalAmount}</td>
            <td>{guideAmount.toFixed(2)}</td>
            <td>{companyAmount.toFixed(2)}</td>
            <td>{driverAmount.toFixed(2)}</td>
        </tr>
    );
}