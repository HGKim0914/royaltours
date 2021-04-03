import React, { Component } from 'react';
import {Table, Modal} from 'react-materialize';
import '../css/accountingReport.css';

class AccountingReport extends Component {
  render() {
    const tourInfo = ["0202시샌", "0202", "홍길동", "17", "10", "캐완,밴휘", "당사버스", "-", "0"];
    // 투어정보 - 행사명, 행사일자, 가이드성명, 행사인원, 룸수, 투어종류, 차량, 차량회사, T/C유무
    const restaurantInfo = [
        ["D1, 중식", "Chinese Restaurant", "130.97", "카드"],
        ["D1, 석식", "Korean Restaurant", "550.55", "가이드 페이"]
    ];
    // 식당정보 - 구분, 식당명, 금액, 지급방식
    const hotelInfo = [
        ["호텔1", "400.10", "카드"],
        ["Fairmont Hotel", "300", "현금"]
    ];
    const attrInfo = [
        ["attraction1", "500", "현금"],
        ["attraction2", "600", "카드"]
    ];
    const carRentalInfo = ["차량회사1", "600", "카드"];

    // 쇼핑수입 - 쇼핑명, 판매총액, 쇼핑컴, 회사수입, 가이드수입, T/C수입
    const shoppingInfo = [
        ["퓨어헬스(45%)", "400.00", "50.00", "200", "100", "100"],
        ["비바캐나다", "100", "100", "0", "0", "0"]
    ];

    const optionInfo = [
        ["레이크루이스곤돌라", "400.00", "50.00", "200", "100", "100", "5", "5","100", "100"],
        ["헬기옵션", "100", "100", "0", "0", "0", "10", "2", "100", "20"]
    ];

    var temp = "";

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits:2,
    });

    //식당 인당가격, 호텔 룸당가격, 입장료 인당가격 계산
    for(var idx=0 ;idx<restaurantInfo.length; idx++){
        temp = parseFloat(restaurantInfo[idx][2]) / parseFloat(tourInfo[3]);
        restaurantInfo[idx].push(formatter.format(temp));
    }
    
    for(idx=0; idx<hotelInfo.length; idx++){
        temp = parseFloat(hotelInfo[idx][1])/parseFloat(tourInfo[4]);
        hotelInfo[idx].push(formatter.format(temp));
    }
    for(idx=0; idx<attrInfo.length; idx++){
        temp = parseFloat(attrInfo[idx][1])/parseFloat(tourInfo[3]);
        attrInfo[idx].push(formatter.format(temp));
    }

    return (
        <div className="accounting-report">
            <h6>투어 정산 보고서</h6>
            <AccountingReportTable tourInfo={tourInfo} 
                restaurantInfo={restaurantInfo} 
                hotelInfo={hotelInfo}
                attrInfo={attrInfo}
                carRentalInfo={carRentalInfo}
                shoppingInfo={shoppingInfo}
                optionInfo={optionInfo}/>
        </div>
    );
    }
}

export default AccountingReport;

const AccountingReportTable = (props) => {
    return(
        <Table>
            <thead>
                <tr>
                    {/* title */}
                    <th colSpan="6" id="title">투어정보</th>
                </tr>
                
                <tr>
                    <th>행사명</th><td>{props.tourInfo[0]}</td>
                    <th>행사일자</th><td>{props.tourInfo[1]}</td>
                    <th>가이드 성명</th><td>{props.tourInfo[2]}</td>
                </tr>
                <tr>
                    <th>행사인원</th><td>{props.tourInfo[3]}</td>
                    <th>룸수(Per Night)</th><td>{props.tourInfo[4]}</td>
                    <th>투어종류</th><td>{props.tourInfo[5]}</td>
                </tr>
                <tr>
                    <th>차량회사</th><td>{props.tourInfo[6]}</td>
                    <th>차량</th><td>{props.tourInfo[7]}</td>
                    <th>T/C유무</th><td>{props.tourInfo[8]}</td>
                </tr>
            </thead>
            <tbody>
                {/* 지출정보 - 식당, 호텔, 차량비, 기타*/}
                <tr><th colSpan="6" id="title">지출</th></tr>

                {/* 식당지출 */}
                <tr className="title-desc">
                        <th rowSpan="4">레스토랑</th>
                        <th>구분</th>
                        <th>식당명</th>
                        <th>지급방식</th>
                        <th>인당 금액</th>
                        <th>금액</th>
                </tr>
                <DisplayRestaurant data={props.restaurantInfo[0]} />
                <DisplayRestaurant data={props.restaurantInfo[1]} />
                <tr>
                    <th colSpan="4">합계</th>
                    <td>$500</td>
                </tr>

                {/* 호텔지출 */}
                <tr className="title-desc">
                    <th rowSpan="4">호텔</th>
                    <th colSpan="2">호텔명</th>
                    <th>지급방식</th>
                    <th>룸당가격</th>
                    <th>금액</th>
                </tr>
                <DisplayHotel data={props.hotelInfo[0]} />
                <DisplayHotel data={props.hotelInfo[1]} />
                <tr>
                    <th colSpan="4">합계</th>
                    <td>$600</td>
                </tr>

                {/* 입장료 */}
                <tr className="title-desc">
                    <th rowSpan="4">입장료</th>
                    <th colSpan="2">장소</th>
                    <th>지급방식</th>
                    <th>인당가격</th>
                    <th>금액</th>
                </tr>
                <DisplayAttr data={props.attrInfo[0]} />
                <DisplayAttr data={props.attrInfo[1]} />
                <tr>
                    <th colSpan="4">합계</th>
                    <td>$600</td>
                   
                </tr>

                {/* 차량비 */}
                <tr className="title-desc">
                    <th rowSpan="4">차량비</th>
                    <th colSpan="3">회사명</th>
                    <th>지급방식</th>
                    <th>금액</th>
                </tr>
                <DisplayCarRental data={props.carRentalInfo} />
                <DisplayCarRental data={props.carRentalInfo} />
                <tr>
                    <th colSpan="4">합계</th>
                    <td>$600</td>
                </tr>

                {/* 기타 */}
                <tr className="title-desc">
                    <th rowSpan="6">기타</th>
                    <th colSpan="3"></th>
                    <th>지급방식</th>
                    <th>금액</th>
                </tr>
                <DisplayMiscExpense name="주차비용" data={["500.00", "카드"]} />
                <DisplayMiscExpense name="가스비" data={["111.38", "카드"]} />
                <DisplayMiscExpense name="가이드지급비" data={["175.00", "현금"]} />
                <DisplayMiscExpense name="픽업비용" data={["100.00", "카드"]} />
                <DisplayMiscExpense name="별도지급차량비" data={["50.00", "가이드페이"]} />
                <tr>
                    <th colSpan="5" id="title-expense">총지출</th>
                    <th id="title-expense">$1,000.00</th>
                </tr>
            </tbody>
            {/* 수입 */}
            <tbody>
                <tr><th colSpan="6" id="title">수입</th></tr>
                {/* 쇼핑 */}
                <tr className="title-desc">
                    <th>쇼핑</th>
                    <th>판매총액</th>
                    <th>쇼핑컴</th>
                    <th>회사수입</th>
                    <th>가이드수입</th>
                    <th>T/C수입</th>
                </tr>
                <DisplayShopping data={props.shoppingInfo[0]} />
                <DisplayShopping data={props.shoppingInfo[1]} />
                <tr>
                    <th>합계</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                {/* 옵션 */}
                <tr className="title-desc">
                    <th>선택관광</th>
                    <th>판매가</th>
                    <th>원가</th>
                    <th>회사수입</th>
                    <th>가이드수입</th>
                    <th>T/C수입</th>
                </tr>
                <DisplayOption data={props.optionInfo[0]} />
                <DisplayOption data={props.optionInfo[1]} />
                <tr>
                    <th>합계</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th colSpan="5" id="title-expense">총 회사수입</th>
                    <th id="title-expense">$1,000.00</th>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan="6" id="title">총 계</th>
                </tr>
                <tr className="title-desc">
                    <th>투어수입</th>
                    <th>총지출</th>
                    <th>쇼핑수입</th>
                    <th>옵션수입</th>
                    <th>가이드입금</th>
                    <th>손익금</th>
                </tr>
                <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td id="netincome">-</td>
                </tr>
            </tfoot>
        </Table>
    );
}

const DisplayRestaurant = (props) => {
    return(
        <tr>
            {/* 구분 */}
            <td>{props.data[0]}</td>
            {/* 식당명 */}
            <td>{props.data[1]}</td>
            {/* 지급방식 */}
            <td>{props.data[3]}</td>
            {/* 인당금액 */}
            <td>{props.data[4]}</td>
            {/* 금액 */}
            <td>{"$" + props.data[2]}</td>
        </tr>
    );
}

const DisplayHotel = (props) => {
    return(
        <tr>
            {/* 호텔명 */}
            <td colSpan="2">{props.data[0]}</td>
            {/* 지급방식 */}
            <td>{props.data[2]}</td>
            {/* 룸당 가격 */}
            <td>{props.data[3]}</td>
            {/* 금액 */}
            <td>{"$" + props.data[1]}</td>
        </tr>
    );
}

const DisplayAttr = (props) => {
    return(
        <tr>
            {/* 장소 */}
            <td colSpan="2">{props.data[0]}</td>
            {/* 지급방식 */}
            <td>{props.data[2]}</td>
            {/* 인당 가격 */}
            <td>{props.data[3]}</td>
            {/* 금액 */}
            <td>{"$" + props.data[1]}</td>
        </tr>
    );
}

const DisplayCarRental = (props) => {
    return(
        <tr>
            {/* 회사명 */}
            <td colSpan="3">{props.data[0]}</td>
            {/* 지급방식 */}
            <td>{props.data[2]}</td>
            {/* 금액 */}
            <td>{"$" + props.data[1]}</td>
        </tr>
    );
}

const DisplayMiscExpense = (props) => {
    return(
        <tr>
            <th colSpan="3">{props.name}</th>
            <td>{props.data[1]}</td>
            <td>{"$" + props.data[0]}</td>
        </tr>
    );
}

// Shopping
const DisplayShopping = (props) => {
    return(
        <tr>
            {/* 쇼핑명 */}
            <td>{props.data[0]}</td>
            {/* 판매총액 */}
            <td>{props.data[1]}</td>
            {/* 쇼핑컴 */}
            <td>{props.data[2]}</td>
            {/* 회사수입 */}
            <td>{props.data[3]}</td>
            {/* 가이드수입 */}
            <td>{props.data[4]}</td>
            {/* T/C */}
            <td>{props.data[5]}</td>
        </tr>
    );
}
const DisplayOption = (props) => {
    return(
        <tr>
            {/* 선택관광 */}
            <td>{props.data[0]}</td>
            {/* 판매가 */}
            <td>
                <Modal header="판매총액" trigger={<div>{props.data[1]}</div>}>
                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>인원수</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Adult</th>
                                <td>{props.data[6]}</td>
                                <td>{props.data[8]}</td>
                            </tr>
                            <tr>
                                <th>Child</th>
                                <td>{props.data[7]}</td>
                                <td>{props.data[9]}</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                </Modal>
            </td>
            {/* 원가 */}
            <td>{props.data[2]}</td>
            {/* 회사수입 */}
            <td>{props.data[3]}</td>
            {/* 가이드수입 */}
            <td>{props.data[4]}</td>
            {/* T/C */}
            <td>{props.data[5]}</td>
        </tr>
    );
}