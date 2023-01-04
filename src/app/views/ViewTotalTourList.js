import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import NavBar from './NavigationBar';
import DatabaseConnectionHelper from '../helper/DatabaseConnectionHelper';

import TourList from './TourList';

class ViewTotalTourList extends Component{
    constructor(){
        super();

        //Get current session
        var getId = sessionStorage.getItem("id");
        var getName =  sessionStorage.getItem("name");
        var getDepartment =  sessionStorage.getItem("department");
        var getAuthorization =  sessionStorage.getItem("authorization");

        if(getAuthorization === null || (getAuthorization !== null && getAuthorization[3] !== 't') || getId === null){
            window.location.href = "/pagenotexist";
        }else{
            //Get date
            var today = this.getCurrentDate();
            var thisYear = this.getCurrentYear();
            var firstDayOfThisYear = thisYear  + '-01-01';

            this.callData();

            //STATE
            this.state = {
                // rawData: rawData,
                rawData: [],
                data: [],
                eachPageData: [],
                lowestPageNum: 1, // Default the lowest page number is 1
                currentPageNum: 1,

                //Search
                tourFrom: firstDayOfThisYear,
                tourTo: today,

                name: getName,
                authorization: getAuthorization,
                id: getId,
                department: getDepartment
            }
        }
    }

    render(){
        return(
            <Row>  
                <NavBar department={this.state.department} authorization={this.state.authorization} name={this.state.name}/>
                <Col s={12}>
                    <div className="tourlist total">
                        <SearchData onClick={this.searchTourListEventHandler} tourFrom={this.state.tourFrom} tourTo={this.state.tourTo}/>
                        <TourList data={this.state.eachPageData}/>
                        <ListPages leng={this.state.data.length} lowestPageNum={this.state.lowestPageNum} currentPageNum={this.state.currentPageNum} onClick={this.pageClickHandler}/>
                    </div>
                </Col>
            </Row>
        );  
    }

    //Get tourlist from database
    callData = () => {
        fetch(DatabaseConnectionHelper() + "DisplayTotalTourList.php")
        .then(res => res.json())
        .then((result) =>
            this.setData(result)
        );
    }
    setData = (result) => {
        if(result !== undefined){
            //Get date
            var today = this.getCurrentDate();
            var thisYear = this.getCurrentYear();
            var firstDayOfThisYear = thisYear  + '-01-01';

            var rawData = result;
            const data = this.displayData(rawData, firstDayOfThisYear, today, null);

            //Get 10 tour items in each page
            //Get first 10 items when the page is loaded
            var eachPageData = [];
            for(var idx=0; idx<10; idx++){
                if(data[idx] !== undefined)
                    eachPageData.push(data[idx]);
            }
            this.setState({
                rawData: result,
                data: data,
                eachPageData: eachPageData,
            });
        }
    }
    // Page
    pageClickHandler = (props, pages) => {
        var currentPageData = [];
        var lowestDataNum, highestDataNum;
        var lowestPageNum, currentPageNum;

        if(props.target.id === "btn-next"){
            //When user clicks the next button
            //Get corresponding data
            currentPageNum = parseInt(this.state.currentPageNum) + 1;
            highestDataNum = currentPageNum * 10;
            lowestDataNum = highestDataNum - 10;
            for(var ind=lowestDataNum; ind<highestDataNum; ind++){
                if(this.state.data[ind] !== undefined){
                    currentPageData.push(this.state.data[ind]);
                }
            }
            //Set the lowest page number
            if(currentPageNum >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(currentPageNum < 3){
                lowestPageNum = 1;
            }

            //Set data
            this.setState({
                eachPageData: currentPageData,
                lowestPageNum: lowestPageNum,
                currentPageNum: currentPageNum,
            });

            //CSS
            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "blue";
                            
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }
            
        }else if(props.target.id === "btn-prev"){
            //When user clicks on the page number itself
            //Get corresponding data
            currentPageNum = parseInt(this.state.currentPageNum) - 1;
            highestDataNum = currentPageNum * 10;
            lowestDataNum = highestDataNum - 10;
            for(var inx=lowestDataNum; inx<highestDataNum; inx++){
                if(this.state.data[inx] !== undefined){
                    currentPageData.push(this.state.data[inx]);
                }
            }

            //Set the lowest page number
            if(currentPageNum >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(currentPageNum < 3){
                lowestPageNum = 1;
            }

            //Set data
            this.setState({
                eachPageData: currentPageData,
                lowestPageNum: lowestPageNum,
                currentPageNum: currentPageNum,
            });

            //CSS
            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "blue";
                            
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }

        }else{
            //When user clicks on the page number itself
            //Get corresponding data
            highestDataNum = (props.target.id) * 10;
            lowestDataNum = highestDataNum - 10;
            for(var idx=lowestDataNum; idx<highestDataNum; idx++){
                if(this.state.data[idx] !== undefined){
                    currentPageData.push(this.state.data[idx]);
                }
            }
            //Set the lowest page number
            if(props.target.id >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(props.target.id < 3){
                lowestPageNum = 1;
            }

            //Set data
            currentPageNum = props.target.id;
            this.setState({
                eachPageData: currentPageData,
                // pageObj: [...this.state.pageObj, props.target],
                lowestPageNum: lowestPageNum,
                currentPageNum: currentPageNum,
            });

            //CSS
            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "blue";
                            
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }
        }
    }
    //Search Data
    displayData = (rawData, tourFrom, tourTo, name) => {
        var guideName = name;
        const data = [];

        //When the app is constructed, display corresponding data based on the date
        var start = tourFrom;
        var end = tourTo;

        for(var idx=0; idx < rawData.length; idx++){
            if(rawData[idx][0] >= start && rawData[idx][0] <= end){
                if(guideName === null){
                    data.push(rawData[idx]);
                }else{
                    if(rawData[idx][2] === guideName){
                        data.push(rawData[idx]);
                    }
                }
            }
        }
        return data;
    }
    
    searchTourListEventHandler = (tourFrom, tourTo, guideName) => {
        var data;
        if(guideName === ""){
            data = this.displayData(this.state.rawData, tourFrom, tourTo, null);
        }else{
            data = this.displayData(this.state.rawData, tourFrom, tourTo, guideName);
        }

        //Get 10 tour items in each page
        //Get first 10 items when the page is loaded
        var eachPageData = [];
        for(var idx=0; idx<10; idx++){
            if(data[idx] !== undefined)
                eachPageData.push(data[idx]);
        }

        this.setState({
            eachPageData: eachPageData,
            data: data,
            tourFrom: tourFrom,
            tourTo: tourTo
        });
    }
    getCurrentDate = () => {
        //Get current date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if(dd<10) dd = '0'+dd;
        if(mm<10) mm = '0'+mm;

        today = yyyy + '-' + mm + '-' + dd;

       return today;
    }
    getCurrentYear = () => {
        var today = new Date();
        var yyyy = today.getFullYear();
        
        return yyyy;
    }
}
export default ViewTotalTourList;

class SearchData extends Component{
    //Default value of search input
    state = {
        tourFrom: this.props.tourFrom,
        tourTo: this.props.tourTo,
        guideName: "",
    }
    render(){
        return(
            <Row>
                <div className="search">
                    <div className="title">
                        <p>검색</p>
                    </div>
                    <div className="input">
                        <form>
                            <Col s={12}>
                                <br />
                                <Col s={3}>
                                    <label>FROM</label>
                                    <input type="date" id="input-date" value={this.state.tourFrom} onChange={this.changeDateFromHandler} />
                                </Col>
                                <Col s={3}>
                                    <label>TO</label>
                                    <input type="date" id="input-date" value={this.state.tourTo} onChange={this.changeDateToHandler}/>
                                </Col>
                                <Col s={3}>
                                    <label>가이드 성함</label>
                                    <input type="text" id="input-name" value={this.state.guideName} onChange={this.changeGuideName}/>
                                </Col>
                                <Col s={3}>
                                    <div className="waves-effect waves-light btn" id="btn-search" onClick={this.searchDataSentToParent}>
                                        <img src={require('../imgs/search2.png')} alt="img_search" /> 
                                    </div>
                                </Col>
                            </Col>
                            <p id="empty">.</p>
                        </form>
                    </div>
                </div>
            </Row>
        );
    }
    
    //Event Handler
    changeDateFromHandler = (obj) => {
        this.setState({
                tourFrom: obj.target.value,
        });
    }
    changeDateToHandler = (obj) => {
        this.setState({
                tourTo: obj.target.value,
        });
        //Today is max value for dateTo
    }
    changeGuideName = (obj) => {
        this.setState({
            guideName: obj.target.value,
        })
    }
    searchDataSentToParent = () => {
        this.props.onClick(this.state.tourFrom, this.state.tourTo, this.state.guideName);
    }
}

var pageObj;
class ListPages extends Component{
    render(){
        const pageCounter = Math.ceil(this.props.leng / 10);
        var lowestPageNum = this.props.lowestPageNum;
        var highestPageNum;

        if(pageCounter>10){
            if(lowestPageNum + 9 <= pageCounter)
                highestPageNum = lowestPageNum + 9;
            else{
                highestPageNum = pageCounter;
            }
        }else{
            highestPageNum = pageCounter;
        }

        //Display page number
        const pages = [];
        for(var idx = lowestPageNum; idx<=highestPageNum; idx++){
            pages.push(
                <Col s={1} key={idx}>
                    <div className="list-page" onClick={this.sendDataClickEvent} id={idx} ref={(obj) => this.addPageObj(obj)}>
                        <span style={{pointerEvents: 'none'}}>{idx}</span>
                    </div>
                </Col>
            )
        }

        //Display Next Button
        var pageNextBtn = "";
        var currentPageNum = this.props.currentPageNum;
        if(pageCounter > 1 && pageCounter > currentPageNum){
            pageNextBtn = <Col s={1}>
                                <div className="list-page-next" id="btn-next" onClick={this.sendDataClickEvent}>
                                    <span style={{pointerEvents: 'none'}}>
                                        다음
                                    </span>
                                </div>
                            </Col>
        }

        //Display PRev Button
        var pagePrevBtn = "";
        if(parseInt(currentPageNum) !== 1){
            pagePrevBtn = <Col s={1}>
                            <div className="list-page-prev" id="btn-prev" onClick={this.sendDataClickEvent}>
                                <span style={{pointerEvents: 'none'}}>
                                    이전
                                </span>
                            </div>
                        </Col>
        }

        return(
            <Row>
                <div className="list-pages">
                    {pagePrevBtn}
                    {pages}
                    {pageNextBtn}
                </div>
            </Row>
        );
    }

    //Add page number object into array
    addPageObj = (obj) => {
        var exist = false;
        if(pageObj === undefined){
            pageObj = [];
        }else{
            for(var idx=0; idx<pageObj.length; idx++){
                if(pageObj[idx] === obj){
                    exist = true;
                }
            }
            if(!exist){
                pageObj.push(obj);
            }
        }
        
    }

    //Click Event Handler
    sendDataClickEvent = (props) => {
        this.props.onClick(props, pageObj);
    }
}
