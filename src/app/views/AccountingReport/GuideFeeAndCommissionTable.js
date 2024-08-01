import React from 'react';
import {Table} from 'react-materialize';
import $ from 'jquery';

const GuideFeeAndCommisionTable = (props) => {
    if (props.tourinfo === undefined || props.tourinfo.length === 0) return <></>;
    if (props.guideFee === undefined) return <></>;
    if (props.guideShoppingEarning === undefined) return <></>;
    if (props.optionCost === undefined) return <></>;
    if (props.optionPaid === undefined) return <></>;
    if (props.companyCollectedAmount === undefined) return <></>;

    const tourinfo = props.tourinfo;
    const tourStartDate = tourinfo[1];
    const tourEndDate = tourinfo[13];

    const getDateDiff = (d1, d2) => {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
            
        const diffDate = date1.getTime() - date2.getTime();
            
        return Math.abs(diffDate / (1000 * 60 * 60 * 24));
    }

    
    let guideFee = 0;
    if (props.guideFee !== undefined) guideFee = props.guideFee[5];

    // console.log(props.guideShoppingEarning)
    let guideShoppingTableObj = [];
    let guideShoppingSum = 0;
    if (props.guideShoppingEarning !== undefined && props.guideShoppingEarning.length > 0) {
        for (let i = 0; i < props.guideShoppingEarning.length; i++) {
            let shopName = props.guideShoppingEarning[i][9];
            let guideShoppingEarning = props.guideShoppingEarning[i][6];
            guideShoppingSum += Number(guideShoppingEarning);

            guideShoppingTableObj.push(<tr key={shopName}><td>{shopName}</td><td>${guideShoppingEarning}</td></tr>)
        }
    }

    // console.log(props.optionCost)
    // console.log(props.optionPaid)
    
    let ccAmountDiffDepositObj = [];
    let diffAmountSum = 0;
    // let optionPaidObj = "";
    // if (props.optionPaid !== undefined) optionPaidObj = props.optionPaid;
    let optionPaidTableObj = [];
    let companyCollectedAmount = 0;
    if (props.companyCollectedAmount !== undefined) companyCollectedAmount = props.companyCollectedAmount[3] ? props.companyCollectedAmount[3] : 0;
    let rowSpan = 1;
    // console.log(props.companyCollectedAmount)
    let depositNeededAmount = 0;

    // console.log(optionPaid)
    // if (props.optionProfit !== undefined && props.optionCost.length > 0 && props.optionPaid !== undefined) {
        for (let i = 0; i < props.optionCost.length; i++) {
            let optionName = props.optionCost[i][11];
            let cardPaidAmount = props.optionCost[i][4];
            depositNeededAmount += Number(cardPaidAmount);
            

            // rowSpan += 1;
            ccAmountDiffDepositObj.push(
                <tr key={optionName}>
                    <td>{optionName}</td>
                    <td>${cardPaidAmount}</td>
                    {i === 0 ? <td rowSpan={props.optionCost.length}>${companyCollectedAmount}</td> : null}
                </tr>
            )
            

            // for (let j = 0; j < props.optionPaid.length; j++) {

                

            //     console.log("asd")
            //     if (optionName === props.optionPaid[j][8]) {
                    
            //     }
            // }
            
            // diffAmountSum += Number(depositNeededAmount);

            // ccAmountDiffDepositObj.push(<tr key={optionName}><td>{optionName}</td><td>${cardPaidAmount}</td><td>${companyCollectAmount}</td><td>${depositNeededAmount}</td></tr>);
        }
        depositNeededAmount = Number(depositNeededAmount) - Number(companyCollectedAmount);
    // }

    return(
        <>
            <Table className="accounting-total">
                <thead>
                    <tr>
                        <th colSpan="5" id="title">
                        가이드피 청구 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>투어코드</th>
                        <th>시작일자</th>
                        <th>종료일자</th>
                        <th>행사일수</th>
                        {/* <th>일일 Fee</th> */}
                        <th>금액</th>
                    </tr>
                    <tr>
                        <td>{tourinfo[0]}</td>
                        <td>{tourStartDate}</td>
                        <td>{tourEndDate}</td>
                        <td>{getDateDiff(tourStartDate, tourEndDate) + 1}</td>
                        {/* <td></td> */}
                        <td>${guideFee}</td>
                    </tr>
                    <tr>
                        <td colSpan="4">소계</td>
                        <td>$</td>
                    </tr>
                </tbody>
            </Table>

            <Table className="accounting-total">
                <thead>
                    <tr>
                        <th colSpan="2" id="title">
                            쇼핑 커미션 청구 (캔모어, 밴쿠버샵 합산)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>샵</th>
                        <th>가이드 수입</th>
                    </tr>
                    {guideShoppingTableObj}
                    <tr>
                        <td>소계</td>
                        <td>${guideShoppingSum}</td>
                    </tr>
                </tbody>
            </Table>

            <Table className="accounting-total">
                <thead>
                    <tr>
                        <th colSpan="3" id="title">
                            옵션투어 경비회사 신용카드 지급분 차액 입금
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>구분</th>
                        <th>카드 결제금액(a)</th>
                        <th>회사가 받은 돈(b)</th>
                    </tr>
                    {ccAmountDiffDepositObj}
                    <tr>
                        <td colSpan="2">소계 (a)-(b)</td>
                        <td>${depositNeededAmount}</td>
                    </tr>
                </tbody>
            </Table>

            <Table className="accounting-total">
                <thead>
                    <tr>
                        <th colSpan="5" id="title">
                            최종 정산금 산정
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>정산금액</th>
                        <th>가이드피 청구</th>
                        <th>쇼핑 커미션 청구</th>
                        <th>카드 지급액</th>
                        <th>차감 후 금액</th>
                    </tr>
                    <tr>
                        <td>${}</td>
                        <td>${}</td>
                        <td>${}</td>
                        <td>${}</td>
                        <td>${}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default GuideFeeAndCommisionTable;