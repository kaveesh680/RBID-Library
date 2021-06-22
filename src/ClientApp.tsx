import React from 'react';
import Library from "./components/Library";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";

const ClientApp:React.FC = () => {


    return(
        <Router>
            <NavigationBar/>
            <Switch>
                <Route path='/' exact component={Library}/>
                <Route path='/about' exact component={About}/>
                <Route path='/contact' exact component={Contact}/>
            </Switch>
            <Footer/>
        </Router>
    )
}

export default ClientApp;