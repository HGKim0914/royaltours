import React from 'react';
import {Table} from 'react-materialize';
import $ from 'jquery';

const SecondTable = (props) => {
    if (!props.plusfactor) return <></>
    if (!props.minusfactor) return <></>
    if (!props.guideTipInbound) return <></>
    if (!props.guideTipLocal) return <></>
    console.log(props.plusfactor)

    // console.log(props.plusfactor)
    // console.log(props.minusfactor)
    // console.log(props.guideTipInbound)
    // console.log(props.guideTipLocal)

    var cashsettlementTotal = 0;
    //Length of plusfactor & minus factor
    const plusfactorObj = [];
    var counter = 0;
    for(var idx=0; idx<props.plusfactor.length; idx++){
        if(props.plusfactor[idx][1] > 8){
            plusfactorObj.push(<Plus key={idx} name="기타" data={props.plusfactor} idx={props.plusfactor[idx][1]}/>);
            counter = counter + 1;
        }
        if(props.plusfactor[idx][3]) cashsettlementTotal += parseFloat(props.plusfactor[idx][3]);
        
    }

    const minusfactorObj = [];
    var counter2 = 0;
    for(idx=0; idx<props.minusfactor.length; idx++){
        if(props.minusfactor[idx][1] > 3){
            minusfactorObj.push(<Minus key={idx} name="기타" data={props.minusfactor} idx={props.minusfactor[idx][1]}/>);
            counter2 = counter2 + 1;
        }
        if(props.minusfactor[idx][3]) cashsettlementTotal -= parseFloat(props.minusfactor[idx][3]);
    }

    var counterInbound = 0;
    var inboundTotalAmount = 0;
    const inboundObj = [];
    for( idx=0; idx<props.guideTipInbound.length; idx++){
        inboundObj.push(<Inbound key={idx} data={props.guideTipInbound[idx]} />);
        counterInbound++;

        
        //total amount
        if(props.guideTipInbound[idx][2] && props.guideTipInbound[idx][3]){
            inboundTotalAmount += parseInt(props.guideTipInbound[idx][2]) * parseFloat(props.guideTipInbound[idx][3]);
        }
    }

    // cashsettlementTotal -= inboundTotalAmount;

    if(counterInbound === 0){
        var data = ["","","","",""];
        inboundObj.push(<Inbound key={1} data={data} />);
        counterInbound++;
    }

    var counterLocal = 0;
    var localTotalAmount = 0;
    const localObj = [];
    for(idx=0; idx<props.guideTipLocal.length; idx++){
        localObj.push(<Local key={idx} data={props.guideTipLocal[idx]}/>);
        counterLocal++;
        if(props.guideTipLocal[idx][2] && props.guideTipLocal[idx][3] !== null){
            localTotalAmount += parseInt(props.guideTipLocal[idx][2]) * parseFloat(props.guideTipLocal[idx][3]);
        }
    }

    // cashsettlementTotal += localTotalAmount;

    if(counterLocal === 0){
        data = ["","","","","","","",""];
        localObj.push(<Local key={1} data={data}/>);
        counterLocal++;
    }

    let optionCompanyTotalProfit = $('#optionCompanyTotalProfit').text(); //Get total option profits
    optionCompanyTotalProfit = optionCompanyTotalProfit.replace("$", "");

    let shoppingGuideTotalProfit = $('#shoppingGuideTotalProfit').text(); //Get total expense - guide & TC
    shoppingGuideTotalProfit = shoppingGuideTotalProfit.replace("$", "");
    let shoppingTCTotalProfit = $('#shoppingTCTotalProfit').text();
    shoppingTCTotalProfit = shoppingTCTotalProfit.replace('$', "");

    let shoppingTotalGuideTCProfit = (shoppingGuideTotalProfit && shoppingTCTotalProfit)? parseFloat(shoppingGuideTotalProfit) + parseFloat(shoppingTCTotalProfit) : 0;

    let totalExpenseGuidePay = 0;
    $('.guide-pay').each(function(){
        let amount = $(this).text();
        totalExpenseGuidePay += parseFloat(amount);
    });


    //Update total netincome
    cashsettlementTotal += (optionCompanyTotalProfit && !isNaN(optionCompanyTotalProfit))? parseFloat(optionCompanyTotalProfit) : 0;
    cashsettlementTotal -= (shoppingTotalGuideTCProfit && !isNaN(shoppingTotalGuideTCProfit))? parseFloat(shoppingTotalGuideTCProfit) : 0;
    cashsettlementTotal -= (totalExpenseGuidePay && !isNaN(totalExpenseGuidePay))? parseFloat(totalExpenseGuidePay) : 0;

    //Add beef and honey info in cashsettlement
    cashsettlementTotal += ($('.cs-row-6').find('.amount').text())? parseFloat($('.cs-row-6').find('.amount').text()) : 0;
    cashsettlementTotal += ($('.cs-row-7').find('.amount').text())? parseFloat($('.cs-row-7').find('.amount').text()) : 0;
    
    return(
        <Table>
            <tbody>
                {/* 자금의 수입 */}
                <tr>
                    <th rowSpan={10+counter}>자금의 수입 (+)</th>
                    <th colSpan="2">구분</th>
                    <th>금액</th>
                    <th colSpan="4">비고</th>
                </tr>
                <Plus name="행사비 수령" data={props.plusfactor} idx={1}/>
                <Plus name="투어비 현지수금" data={props.plusfactor} idx={2}/>
                <Plus name="쇼핑 매출 가이드 수금" data={props.plusfactor} idx={3}/>
                <Plus name="기타 입금 (상조경비 등)" data={props.plusfactor} idx={4}/>
                <Plus name="옵션카드 수표 지급액" data={props.plusfactor} idx={5}/>
                <Plus name="꿀 입금분 (회사수익+원가분)" data={props.plusfactor} idx={6}/>
                <Plus name="육포 입금분 (회사수익+원가분)" data={props.plusfactor} idx={7}/>
                <Plus name="가이드팁 입금" data={props.plusfactor} idx={8}/>
                {plusfactorObj}
                <Plus name="옵션수입 회사분" data={optionCompanyTotalProfit} extraRow={true} idx={9+counter}/>

                {/* 자금의 지출 */}
                <tr>
                    <th rowSpan={6+counter2}>자금의 지출 (-)</th>
                    <th colSpan="2">구분</th>
                    <th>금액</th>
                    <th colSpan="4">비고</th>
                </tr>
                <Minus name="회사가 수금한 가이드 팁 (로컬행사)" data={props.minusfactor} idx={1}/>
                <Minus name="옵션 포함의 경우 옵션비용" data={props.minusfactor} idx={2} />
                <Minus name="기타 입금" data={props.minusfactor} idx={3}/>
                {minusfactorObj}
                <Minus name="가이드페이" data={totalExpenseGuidePay} idx={4+counter2} extraRow={true}/>
                <Minus name="쇼핑수입 (가이드+TC)" data={shoppingTotalGuideTCProfit} idx={5+counter2} extraRow={true} />
                

                {/* 인바운드 */}
                <tr className="removed-obj">
                    <th rowSpan={2 + counterInbound}>가이드 지출(-)</th>
                    <th>인원</th>
                    <th>금액</th>
                    <th>총액</th>
                    <th colSpan="4">비고</th>
                </tr>

                <tr className="removed-obj">
                    <td colSpan={3}>소계</td>
                    <td colSpan={4}>${inboundTotalAmount.toFixed(2)}</td>
                </tr>
                
                {/* 로컬행사 가이드팁 정리 */}
                <tr className="removed-obj">
                    <th rowSpan={2 + counterInbound}>가이드 수입(+)</th>
                    <th>인원</th>
                    <th>금액</th>
                    <th>총액</th>
                    <th colSpan="4">비고</th>
                </tr>
                {/* {localObj} */}
                <tr className="removed-obj">
                    <td colSpan={3}>소계</td>
                    <td colSpan={4}>${localTotalAmount.toFixed(2)}</td>
                </tr>

                {/* 총계 */}
                <tr id="total-netincome" >
                    <th colSpan="8" id="title">총 계</th>
                </tr>
                <tr id="total-netincome">
                    <th colSpan="3">정산금액</th>
                    <th colSpan="5">${cashsettlementTotal.toFixed(2)}</th>
                </tr>
            </tbody>
        </Table>
    );
}

export default SecondTable;

const Plus = (props) => {
    var amount = 0.00;
    var memo = "-";

    if(props.data){
        if(props.extraRow){
            amount = props.data;
        }else{
            for(var idx=0; idx<props.data.length; idx++){
                if(props.data[idx][1] === props.idx.toString()){
                    if(props.data[idx][3] !== null){
                        amount = parseFloat(props.data[idx][3]).toFixed(2);
                    }
                    if(props.data[idx][4])  memo = props.data[idx][4];
                }
            }
        }
    }

    if(props.idx === 6){ //Honey amount from jquery
        let originalPrice   = ($('.honey-row').find('.original-price').text())? $('.honey-row').find('.original-price').text() : 0;
        let comProfit       = ($('.honey-row').find('.com-profit').text())? $('.honey-row').find('.com-profit').text() : 0 ;
        amount = (parseFloat(originalPrice) + parseFloat(comProfit)).toFixed(2);   
    }

    if(props.idx === 7){ //Honey amount from jquery
        let originalPrice   = ($('.beef-row').find('.original-price').text())? $('.beef-row').find('.original-price').text() : 0;  
        let comProfit       = ($('.beef-row').find('.com-profit').text())? $('.beef-row').find('.com-profit').text() : 0;
        amount = (parseFloat(originalPrice) + parseFloat(comProfit)).toFixed(2);  
    }

    return(
        <tr className={'cs-row-' + props.idx}>
            <td colSpan="2">{props.name}</td>
            <td className="amount">{amount}</td>
            <td colSpan="4">{memo}</td>
        </tr>
    );
}
const Minus = (props) => {
    var amount = 0.00;
    var memo = "-";
    if(props.data){
        if(props.extraRow) amount = props.data.toFixed(2);
        else{
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
    }
    return(
        <tr>
            <td colSpan="2">{props.name}</td>
            <td>{amount}</td>
            <td colSpan="4">{memo}</td>
        </tr>
    );
}
//가이드 지출
const Inbound = (props) => {
    var data = props.data;
    var numpax = 0;
    var amount = 0;
    var totalAmount = 0;
    var desc = "-";

    if(data[2]) numpax = parseInt(data[2]);
    if(data[3]) amount = parseFloat(data[3]);
    if(numpax && amount) totalAmount = numpax * amount;
    if(data[4]) desc = data[4];

    return(
        <tr>
            <td>{numpax}</td>
            <td>{amount.toFixed(2)}</td>
            <td>{totalAmount.toFixed(2)}</td>
            <td colSpan="4">{desc}</td>
        </tr>
    );
}
//가이드 수입
const Local = (props) => {
    var data = props.data;
    var numpax = 0;
    var amount = 0;
    var totalAmount = 0;
    var desc = "-";

    if(data[2]) numpax = parseInt(data[2]);
    if(data[3]) amount = parseFloat(data[3]);
    if(numpax && amount) totalAmount = numpax * amount;
    if(data[4]) desc = data[4];

    return(
        <tr>
            <td>{numpax}</td>
            <td>{amount.toFixed(2)}</td>
            <td>{totalAmount.toFixed(2)}</td>
            <td colSpan="4">{desc}</td>
        </tr>
    );
}