import React, { Component, Suspense } from 'react';
import './app/css/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
}from 'react-router-dom';

//View
import Login from './app/views/ViewLogin';
import Register from './app/views/ViewRegister';
import Guide from './app/views/ViewGuide';
import SettingCom from './app/views/ViewSettingCom';
import SettingOption from './app/views/ViewSettingOption';
import SettingUser from './app/views/ViewSettingUser';
import MyAccount from './app/views/ViewMyAccount';
import Office from './app/views/ViewOffice';
import TotalTourList from './app/views/ViewTotalTourList';
import AccountingReport from './app/views/ViewAccountingReport';
import AddTour from './app/views/ViewAddTour';
import PageNotExist from './app/views/ViewPageNotExist';
import MonthlyNetIncome from './app/views/ViewMonthlyReport';
import AccountingForm from './app/views/ViewAccountingForm';
import MonthlyReport from './app/views/SearchMonthlyReport';
import UserCodeManagement from './app/views/ViewUserCodeManagement';
// import Test from './app/views/AccountingForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/guide/" component={Guide} />
            <Route path="/register/" component={Register} />
            <Route path='/settingcom/' component={SettingCom} />
            <Route path="/settinguser/" component={SettingUser} />
            <Route path="/settingoption/" component={SettingOption} />
            <Route path="/myaccount/" component={MyAccount} />
            <Route path="/office/" component={Office} />
            <Route path="/addtour" component={AddTour} />
            <Route path="/pagenotexist" component={PageNotExist} />
            <Route path="/total-tourlist/" component={TotalTourList} />
            <Route path="/accounting-report" component={AccountingReport} />
            <Route path='/monthly-report/:search' component={MonthlyReport} />
            <Route path="/monthly-report" component={MonthlyNetIncome} />
            <Route path="/accounting-form" component={AccountingForm} />
            <Route path="/usercode-management" component={UserCodeManagement} />
            {/* <Route path="/test" component={Test}/> */}
            
            <Route path="/" exact component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
