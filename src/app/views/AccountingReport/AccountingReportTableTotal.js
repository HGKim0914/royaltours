import React from 'react';
import {Table} from 'react-materialize';
import $ from 'jquery';

const AccountingReportTableTotal = (props) => {
    var data = props.data;
    var tourProfit = 0;
    var totalNetIncome = 0;

    if(props.tourProfit !== 0 && props.tourProfit !== null){
        tourProfit = parseFloat(props.tourProfit).toFixed(2);
    }

    if(data === undefined){
        data = ["$0", "$0", "$0", "$0", "$0", "$0", "$0"];
    }
    
    let tourExpense = 0;
    let totalProfit = 0;

    tourExpense = $('#total-expense').children().last().text();
    totalProfit = $('#total-profit').children().last().text();
    totalNetIncome = parseFloat(totalProfit.replace('$', '')) - parseFloat(tourExpense.replace('$', '')) + parseFloat(tourProfit);
    //total netincome
    
    return(
        <Table className="accounting-total">
            <thead>
                <tr>
                    <th colSpan="7" id="title">
                    손익금
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>투어수입</th>
                    <th>쇼핑수입</th>
                    <th>옵션수입</th>
                    <th>꿀, 육포수입</th>
                    <th>총 지출</th>
                    {/* <th>가이드팁 입금</th> */}
                    <th>손익금</th>
                </tr>
                <tr>
                    <td>${tourProfit}</td>
                    <td>${props.shoppingProfit.toFixed(2)}</td>
                    <td>${props.optionProfit.toFixed(2)}</td>
                    <td>${props.bhProfit.toFixed(2)}</td>
                    <td>{tourExpense}</td>
                    {/* <td>{data[5]}</td> */}
                    <td>${totalNetIncome.toFixed(2)}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default AccountingReportTableTotal;