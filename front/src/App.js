import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Items from "./containers/Items/Items";
import AddItem from "./containers/AddItem/AddItem";

class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar/>
                </header>
                <div className="container mt-5">
                    <Switch>
                        <Route path="/" exact component={Items}/>
                        <Route path="/addItem" exact component={AddItem}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                </div>
            </Fragment>
        );
    }
}

export default App;