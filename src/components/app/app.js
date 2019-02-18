import React, {Component} from 'react';
import MainPage from '../pages/mainPage';
import OurCoffePage from '../pages/ourCoffePage';
import ForYourPleasurePage from '../pages/forYourPleasurePage';
import ContactUsPage from '../pages/contactUsPage';
import CoffeItemPage from '../pages/coffeItemPage';
import NotFound from '../pages/notFound';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {

  state = {
    error: false,
    components: [
      "MainPage",
      "OurCoffePage",
      "ForYourPleasurePage",
      "CoffeItemPage",
      "ContactUsPage"
    ]
  }

  componentDidCatch(errorString, errorInfo) {
    this.state.components.forEach((item) => {
      if(errorInfo.componentStack.includes(item)) {
        this.setState({error: item})
      }
    });
  }

  render() {
    const err = this.state.error;

    return (
      <Router basename={'.'}>
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/`} exact component={err === "MainPage" ? NotFound : MainPage}/>
          <Route path={`${process.env.PUBLIC_URL}/our-coffe/`} exact component={err === "OurCoffePage" ? NotFound : OurCoffePage}/>
          <Route path={`${process.env.PUBLIC_URL}/for-your-pleasure`} exact component={err === "ForYourPleasurePage" ? NotFound : ForYourPleasurePage}/>
          <Route path={`${process.env.PUBLIC_URL}/contact-us`} exact component={err === "ContactUsPage" ? NotFound : ContactUsPage}/>
          <Route path={`${process.env.PUBLIC_URL}/our-coffe/:id`} exact component={err === "CoffeItemPage" ? NotFound : CoffeItemPage}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    )
  }
}

export default App