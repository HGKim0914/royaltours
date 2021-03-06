import React from 'react';
import {Table, Modal} from 'react-materialize';
import moment from 'moment';

const FirstTable = (props) => {
    const restaurantTable = [];
    const hotelTable = [];
    const attrTable = [];
    const carTable = [];
    const miscExpenseTable = [];
    const shoppingTable = [];
    const optionTable = [];

    var resExpenseIdx = props.restaurantExpense.length;
    var resExpenseTotal = 0;
    for(var idx=0; idx<resExpenseIdx; idx++){
        restaurantTable.push(<DisplayRestaurantExpense key={idx} data={props.restaurantExpense[idx]}/>);
        if(props.restaurantExpense[idx][5] !== null)
            resExpenseTotal += parseFloat(props.restaurantExpense[idx][5]);
    }

    var hotelExpenseIdx = props.hotelExpense.length;
    var hotelExpenseTotal = 0;
    for(idx=0; idx<hotelExpenseIdx; idx++){
        hotelTable.push(<DisplayHotelExpense key={idx} data={props.hotelExpense[idx]}/>);
        if(props.hotelExpense[idx][7] !== null)
            hotelExpenseTotal += parseFloat(props.hotelExpense[idx][7]);
    }

    var attrExpenseIdx = props.attrExpense.length;
    var attrExpenseTotal = 0;
    for(idx=0; idx<attrExpenseIdx; idx++){
        attrTable.push(<DisplayAttExpense key={idx} data={props.attrExpense[idx]}/>);
        if(props.attrExpense[idx][5] !== null)
            attrExpenseTotal += parseFloat(props.attrExpense[idx][5]);
    }

    var carExpenseIdx = props.carExpense.length;
    var carExpenseTotal = 0;
    
    for(idx=0; idx<carExpenseIdx; idx++){
        carTable.push(<DisplayCarRentalExpense key={idx} data={props.carExpense[idx]}/>);
        if(props.carExpense[idx][7] !== null)
            carExpenseTotal += parseFloat(props.carExpense[idx][7]);
    }

    var miscExpenseIdx = props.miscExpense.length;
    var miscExpenseTotal = 0;
    for(idx=0; idx<miscExpenseIdx; idx++){
        if(props.miscExpense[idx][5] !== null)
            miscExpenseTotal += parseFloat(props.miscExpense[idx][5]);

        //If index number exceeds 5 (additional misc expense)
        if(parseInt(props.miscExpense[idx][1]) >= 6){
            miscExpenseTable.push(<DisplayMiscExpense key={idx} name="????????????" data={props.miscExpense[idx]} idx={idx+1}/>);
        }
    }

    var expenseTotal = resExpenseTotal + hotelExpenseTotal + attrExpenseTotal + carExpenseTotal + miscExpenseTotal;

    // Profit
    var shoppingProfitIdx = props.shoppingProfit.length;
    var shoppingProfitTotal = 0;
    var shoppingProfitCompanyTotal = 0;
    var shoppingProfitGuideTotal = 0;
    var shoppingProfitTCTotal = 0;

    for(idx=0; idx<shoppingProfitIdx; idx++){
        shoppingTable.push(<DisplayShoppingProfit key={idx} data={props.shoppingProfit[idx]}/>);
        shoppingProfitTotal += parseFloat(props.shoppingProfit[idx][3]);
        shoppingProfitCompanyTotal += parseFloat(props.shoppingProfit[idx][5]);
        shoppingProfitGuideTotal += parseFloat(props.shoppingProfit[idx][6]);
        shoppingProfitTCTotal += parseFloat(props.shoppingProfit[idx][7]);
    }

    var optionProfitIdx = props.optionProfit.length;
    var optionProfitTotal = 0;
    var optionProfitCompanyTotal = 0;
    var optionProfitNetIncome = 0;
    var optionProfitOriginalPrice = 0;
    for(idx=0; idx<optionProfitIdx; idx++){
        optionTable.push(<DisplayOptionProfit key={idx} data={props.optionProfit[idx]} />);
        if(props.optionProfit[idx][3] !== null)
            optionProfitTotal += parseFloat(props.optionProfit[idx][3]);
        if(props.optionProfit[idx][4] !== null)
            optionProfitOriginalPrice += parseFloat(props.optionProfit[idx][4]);
        var netincome = 0;
        if(props.optionProfit[idx][3] !== null && props.optionProfit[idx][4] !== null){
            netincome = parseFloat(props.optionProfit[idx][3]) - parseFloat(props.optionProfit[idx][4]);
        }
        optionProfitNetIncome += netincome;
        if(props.optionProfit[idx][6] !== null)
            optionProfitCompanyTotal += parseFloat(props.optionProfit[idx][6]);
    }

    var hbProfitTotal = 0;
    var hbProfitCompanyTotal = 0;
    var hbProfitGuideTotal = 0;
    var hbProfitOriginalPrice = 0;
    var hbProfitTCTotal = 0;
    for(idx=0; idx<props.hbProfit.length; idx++){
        if(props.hbProfit[idx][4] !== null)
            hbProfitTotal += parseFloat(props.hbProfit[idx][4]);
        if(props.hbProfit[idx][5] !== null)
            hbProfitOriginalPrice += parseFloat(props.hbProfit[idx][5]);
        if(props.hbProfit[idx][6] !== null)
            hbProfitCompanyTotal += parseFloat(props.hbProfit[idx][6]);
        if(props.hbProfit[idx][7] !== null)
            hbProfitGuideTotal += parseFloat(props.hbProfit[idx][7]);
        if(props.hbProfit[idx][9] !== null)
            hbProfitTCTotal += parseFloat(props.hbProfit[idx][9]);
    }

    var totalProfit = 0;
    totalProfit = hbProfitCompanyTotal + optionProfitCompanyTotal + shoppingProfitCompanyTotal;
    props.totalData("shoppingprofit", shoppingProfitCompanyTotal);
    props.totalData("optionprofit", optionProfitCompanyTotal);
    props.totalData("bhprofit", hbProfitCompanyTotal);

    var land = "-";
    if(props.tourinfo[3] !== null){
        land = props.tourinfo[3];
    }

    return(
        <Table>
                <thead>
                    <tr>
                        <th colSpan={8} id="title">????????????</th>
                    </tr>
                    <tr>
                        <th>????????????</th>
                        <td colSpan={7}>{props.tourinfo[1]} ~ {props.tourinfo[13]}</td>
                    </tr>
                    <tr>
                        <th>?????????</th>
                        <td>{props.tourinfo[0]}</td>
                        <th>????????????</th>
                        <td>{props.tourinfo[12]}</td>
                        <th>????????????/??????</th>
                        <td>{props.tourinfo[8]}</td>
                        <th>????????????</th>
                        <td>{props.tourinfo[4]}</td>
                    </tr>
                    <tr>
                        <th>????????????</th>
                        <td>{props.tourinfo[6]}</td>
                        <th>??? ???</th>
                        <td>{props.tourinfo[7]}</td>
                        <th>????????????</th>
                        <td>{land}</td>
                        <th>TC??????</th>
                        <td>{props.tourinfo[5]}</td>
                    </tr>
                </thead>
                {/* Expense */}
                <tbody>
                    <tr>
                        <th colSpan={8} id="title">??????</th>
                    </tr>
                    {/* Restaurant */}
                    <tr>
                        <th rowSpan={resExpenseIdx + 2}>????????????</th>
                        <th>??????</th>
                        <th colSpan="2">?????????</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th>??? ??? ??????</th>
                        <th>??????</th>
                    </tr>
                    {restaurantTable}
                    <tr>
                        <td colSpan="6" id="total-title">??????</td>
                        <td>${resExpenseTotal.toFixed(2)}</td>
                    </tr>

                    {/* Hotel */}
                    <tr>
                        <th rowSpan={hotelExpenseIdx + 2}>??????</th>
                        <th>????????? ?????? <br />& ??????</th>
                        <th colSpan="2">?????????</th>
                        <th>????????????</th>
                        <th>??? ???</th>
                        <th>??? ??? ??????</th>
                        <th>??????</th>
                    </tr>
                    {hotelTable}
                    <tr>
                        <td colSpan="6" id="total-title">??????</td>
                        <td>${hotelExpenseTotal.toFixed(2)}</td>
                    </tr>

                    {/* Attraction */}
                    <tr>
                        <th rowSpan={attrExpenseIdx + 2}>?????????</th>
                        <th>??????</th>
                        <th colSpan="2">??????</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th>?????? ??????</th>
                        <th>??????</th>
                    </tr>
                    {attrTable}
                    <tr>
                        <td colSpan="6" id="total-title">??????</td>
                        <td>${attrExpenseTotal.toFixed(2)}</td>
                    </tr>

                    {/* ????????? */}
                    <tr>
                        <th rowSpan={carExpenseIdx + 2}>?????????</th>
                        <th colSpan="2">??????</th>
                        <th colSpan="2">????????????</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th>??????</th>
                    </tr>
                    {carTable}
                    <tr>
                        <td colSpan="6" id="total-title">??????</td>
                        <td>${carExpenseTotal.toFixed(2)}</td>
                    </tr>

                    {/* ?????? ?????? */}
                    <tr>
                        <th rowSpan={7 + miscExpenseTable.length}>????????????</th>
                        <th colSpan="2">??????</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th colSpan="3">??????</th>
                    </tr>
                    <DisplayMiscExpense name="????????????" data={props.miscExpense} idx={1}/>
                    <DisplayMiscExpense name="?????????" data={props.miscExpense} idx={2}/>
                    <DisplayMiscExpense name="????????? ?????????" data={props.miscExpense} idx={3}/>
                    <DisplayMiscExpense name="????????????" data={props.miscExpense} idx={4}/>
                    <DisplayMiscExpense name="?????? ?????? ?????????" data={props.miscExpense} idx={5}/>
                    {miscExpenseTable}
                    <tr>
                        <td colSpan="6" id="total-title">??????</td>
                        <td>${miscExpenseTotal.toFixed(2)}</td>
                    </tr>

                    {/* ??? ?????? ?????? */}
                    <tr id="total-expense">
                        <th colSpan="7">??? ?????? ??????</th>
                        <th>${expenseTotal.toFixed(2)}</th>
                    </tr>
                </tbody>
                {/* Profit */}
                <tbody>
                    <tr>
                        <th colSpan={8} id="title">??????</th>
                    </tr>
                    {/* ?????? */}
                    <tr>
                        <th colSpan="2">??????</th>
                        <th>????????????</th>
                        <th>?????????</th>
                        <th>?????????</th>
                        <th>????????????</th>
                        <th>???????????????</th>
                        <th>TC??????</th>
                    </tr>
                    {shoppingTable}
                    <tr>
                        <td colSpan="2">??????</td>
                        <td>${shoppingProfitTotal.toFixed(2)}</td>
                        <td></td>
                        <td></td>
                        <td>${shoppingProfitCompanyTotal.toFixed(2)}</td>
                        <td id="shoppingGuideTotalProfit">${shoppingProfitGuideTotal.toFixed(2)}</td>
                        <td id="shoppingTCTotalProfit">${shoppingProfitTCTotal.toFixed(2)}</td>
                    </tr>

                    {/* ?????? */}
                    <tr>
                        <th colSpan="2">??????</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th>??????</th>
                        <th>????????????</th>
                        {/* <th>???????????????</th>
                        <th>TC??????</th> */}
                        <th colSpan={2}>??????</th>
                    </tr>
                    {optionTable}
                    <tr>   
                        <td colSpan="2">??????</td>
                        <td>${optionProfitTotal.toFixed(2)}</td>
                        <td>${optionProfitOriginalPrice.toFixed(2)}</td>
                        <td>${optionProfitNetIncome.toFixed(2)}</td>
                        <td id="optionCompanyTotalProfit">${optionProfitCompanyTotal.toFixed(2)}</td>
                        <td colSpan={2}></td>
                    </tr>

                    {/* ?????? */}
                    <tr>
                        <th></th>
                        <th>?????? ??????</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th>??????</th>
                        <th>????????????</th>
                        <th>???????????????</th>
                        <th>TC??????</th>
                    </tr>
                    <DisplayHBProfit name="???" data={props.hbProfit} idx={1}/>
                    <DisplayHBProfit name="??????" data={props.hbProfit} idx={2}/>
                    <tr>
                        <td colSpan="2">??????</td>
                        <td>${hbProfitTotal.toFixed(2)}</td>
                        <td>${hbProfitOriginalPrice.toFixed(2)}</td>
                        <td>${(hbProfitTotal - hbProfitOriginalPrice).toFixed(2)}</td>
                        <td>${hbProfitCompanyTotal.toFixed(2)}</td>
                        <td>${hbProfitGuideTotal.toFixed(2)}</td>
                        <td>${hbProfitTCTotal.toFixed(2)}</td>
                    </tr>
                    <tr id="total-profit">
                        <th colSpan="7">??? ?????? ??????</th>
                        <th>${totalProfit.toFixed(2)}</th>
                    </tr>
                </tbody>

            </Table>
    );
}

export default FirstTable;

// Expense Table
const DisplayRestaurantExpense = (props) => {
    var eachCost = 0;
    var totalCost = 0;

    if(props.data[4] !== null && props.data[5] !== null) eachCost = props.data[5] / props.data[4];   // ?????? ??????
    if(props.data[5] !== null)  totalCost = parseFloat(props.data[5]); // ?????? ??????

    let paymentMethod = (props.data && props.data[3] === "???????????????")? "guide-pay" : "other-pay";

    return(
        <tr>
            <td>{props.data[2]}</td>
            <td colSpan="2">{(props.data[7] !== null)?props.data[7]:"-"}</td>
            <td className="paymentMethod">{(props.data[3] !== null)?props.data[3]:"-"}</td>
            <td>{(props.data[4] !== null)?props.data[4]:"-"}</td>
            <td>{eachCost.toFixed(2)}</td>
            <td className={paymentMethod}>{totalCost.toFixed(2)}</td>
        </tr>
    );
}

const DisplayHotelExpense = (props) => {
    var eachroomprice = 0;
    var totalprice = 0;
    if(props.data[6] !== null && props.data[7] !== null){
        eachroomprice = props.data[7] / props.data[6];
    }
    if(props.data[7] !== null){
        totalprice = parseFloat(props.data[7]);
    }
    var days = 0;
    if(props.data[3] !== null && props.data[4] !== null){
        var a = moment(props.data[3], 'YYYY-MM-DD');
        var b = moment(props.data[4], 'YYYY-MM-DD');
        days = b.diff(a, 'days');
    }

    let paymentMethod = (props.data && props.data[5] === "???????????????")? "guide-pay" : "other-pay";

    return(
        <tr>
            <td>{props.data[3]} {(days !== 0)? "& "+days+"???": null}</td>
            <td colSpan="2">{(props.data[9] !== null)?props.data[9]:"-"}</td>
            <td>{(props.data[5] !== null)?props.data[5]:"-"}</td>
            <td>{(props.data[6] !== null)?props.data[6]:"-"}</td>
            <td>{eachroomprice.toFixed(2)}</td>
            <td className={paymentMethod}>{(totalprice !== 0)? totalprice.toFixed(2) : totalprice}</td>
        </tr>
    );
}
const DisplayAttExpense = (props) => {
    var totalprice = 0;
    var eachprice = 0;
    
    if(props.data[4] !== null && props.data[5] !== null){
        eachprice = parseFloat(props.data[5]) / parseInt(props.data[4]);
    }
    if(props.data[5] !== null){
        totalprice = parseFloat(props.data[5]);
    }

    let paymentMethod = (props.data && props.data[3] === "???????????????")? "guide-pay" : "other-pay";
    return(
        <tr>
            <td>{props.data[6]}</td>
            {/* name */}
            <td colSpan="2">{(props.data[8] !== null)?props.data[8]:'-'}</td>
            <td>{(props.data[3] !== null)?props.data[3]:"-"}</td>
            <td>{(props.data[4] !== null)?props.data[4]:"-"}</td>
            <td>{eachprice.toFixed(2)}</td>
            <td className={paymentMethod}>{(totalprice !== 0)? totalprice.toFixed(2) : 0}</td>
        </tr>
    );
}
const DisplayCarRentalExpense = (props) => {
    let paymentMethod = (props.data && props.data[6] === "???????????????")? "guide-pay" : "other-pay";

    return(
        <tr>
            <td colSpan="2">{props.data[4] + " ~ " + props.data[5]}</td>
            <td colSpan="2">{(props.data[12] !== null)?props.data[12]:"-"}</td>
            <td>{(props.data[6] !== null)?props.data[6]: "-"}</td>
            <td>{(props.data[9] !== null)?props.data[9]: "-"}</td>
            <td className={paymentMethod}>{(props.data[7] !== null)? parseFloat(props.data[7]).toFixed(2): 0.00}</td>
        </tr>
    );
}
const DisplayMiscExpense = (props) => {
    var data = ["","","","","",""];

    if(props.data.length > 0 && props.idx <= 5){    //set misc expense in a corresponding index
        for(var idx=0; idx<props.data.length; idx++){
            if(props.data[idx][2] === props.idx.toString()){
                data = props.data[idx];
                break;
            }
        }
    }else{
        data = props.data;
    }

    let paymentMethod = (data && data[3] === "???????????????")? "guide-pay" : "other-pay";

    return(
        <tr>
            <td colSpan="2">{props.name}</td>
            <td>{(data[3] !== null)? data[3] : "-"}</td>
            <td className={paymentMethod}>{(data[5] !== undefined && data[5] !== null)? parseFloat(data[5]).toFixed(2) : 0.00}</td>
            <td colSpan="3">{(data[4] !== null)? data[4] : "-"}</td>
        </tr>
    );
}
const DisplayShoppingProfit = (props) => {
    var saleamount = 0;
    var comamount = 0;
    var com = "";
    var comProfit = 0;
    var guideProfit = 0;
    var tcProfit = 0;

    if(props.data[3] !== null){
        saleamount =  parseFloat(props.data[3]).toFixed(2);
    }
    if(props.data[10]){
        com = props.data[10] + "%";
        if(saleamount !== 0){
            comamount = saleamount * (props.data[10] / 100);
            comamount = comamount.toFixed(2);
        }
    }
    if(props.data[5] !== null){
        comProfit =  parseFloat(props.data[5]).toFixed(2);
    }
    if(props.data[6] !== null){
        guideProfit =  parseFloat(props.data[6]).toFixed(2);
    }
    if(props.data[7] !== null){
        tcProfit =  parseFloat(props.data[7]).toFixed(2);
    }
    return(
        <tr>
            <td colSpan="2">{props.data[9]}</td>
            {/* totalamount */}
            <td>{saleamount}</td>
            <td>{com}</td>
            <td>{comamount}</td>
            <td>{comProfit}</td>
            <td>{guideProfit}</td>
            <td>{tcProfit}</td>
        </tr>
    );
}
const DisplayOptionProfit = (props) => {
    var saleprice = "";
    var originalprice = "";
    var companyprofit = "";
    var guideprofit = "";
    var tcprofit = "";
    var netincome = "";
    if(props.data[3] !== null) saleprice =  parseFloat(props.data[3]).toFixed(2);
    if(props.data[4] !== null) originalprice =  parseFloat(props.data[4]).toFixed(2);
    if(props.data[6] !== null) companyprofit = parseFloat(props.data[6]).toFixed(2);
    if(props.data[7] !== null) guideprofit = parseFloat(props.data[7]).toFixed(2);
    if(props.data[8] !== null) tcprofit =parseFloat(props.data[8]).toFixed(2);
    if(props.data[3] !== null && props.data[4] !== null) {
        netincome = parseFloat(props.data[3]) - parseFloat(props.data[4]);
        netincome = netincome.toFixed(2);
    }
    return(
        <tr>
            <td colSpan="2">{props.data[11]}</td>
            <td>{saleprice}</td>
            <td>{originalprice}</td>
            <td>{netincome}</td>
            <td>
                <Modal header="??????" trigger={<p className="modal-trigger">{companyprofit}</p>}>
                    <div className="table">
                        <div className="row header">
                            <div className="col">????????????</div>
                            <div className="col">???????????????</div>
                            <div className="col">TC??????</div>
                        </div>
                        <div className="row content">
                            <div className="col">${companyprofit}</div>
                            <div className="col">${guideprofit}</div>
                            <div className="col">${tcprofit}</div>
                        </div>
                    </div>
                </Modal>
            </td>
            {/* <td>{guideprofit}</td>
            <td>{tcprofit}</td> */}
            <td colSpan={2}>{(props.data[5])? props.data[5]: "-"}</td>
        </tr>
    );
}

// Honey and beef
const DisplayHBProfit = (props) => {
    var data = ["","","","","","","","",""];
    var salesnum = "-";
    var salesprice = 0;
    var originalprice = 0;
    var netincome = 0;
    var companyProfit = 0;
    var guideProfit = 0;
    var tcProfit = 0;

    if(props.data.length > 0){
        for(var idx=0; idx<props.data.length; idx++){
            if(props.data[idx][2] === props.idx.toString()){
                data = props.data[idx];
                if(data[3] !== null)salesnum = parseInt(data[3]);
                if(data[4] !== null)salesprice =  parseFloat(data[4]).toFixed(2);
                if(data[5] !== null)originalprice =  parseFloat(data[5]).toFixed(2);
                if(data[4] !== null && data[5] !== null) {
                    netincome = parseFloat(data[4]) - parseFloat(data[5]);
                    netincome =  netincome.toFixed(2);
                }
                if(data[6] !== null)companyProfit =  parseFloat(data[6]).toFixed(2);
                if(data[7] !== null)guideProfit =  parseFloat(data[7]).toFixed(2);
                if(data[9] !== null)tcProfit = parseFloat(data[9]).toFixed(2);
            }
        }
    }

    let currentElem = (props.idx === 1)? 'honey-row' : 'beef-row';
    return(
        <tr className={currentElem}>
            <th>{props.name}</th>
            <td>{salesnum}</td>
            <td>{salesprice}</td>
            <td className="original-price">{originalprice}</td>
            <td>{netincome}</td>
            <td className="com-profit">{companyProfit}</td>
            <td>{guideProfit}</td>
            <td>{tcProfit}</td>
        </tr>
    );
}