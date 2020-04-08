import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Players from './players';
import Contact from './contact';
import Users from './users';
import Notfound from './notfound';


const routing = (
	<Router>
		<header>
			<nav>
				<NavLink exact activeClassName="active" to="/">Home</NavLink>
				<NavLink activeClassName="active" to="/players">Players</NavLink>
				<NavLink activeClassName="active" to="/contact">Contact</NavLink>
				<NavLink activeClassName="active" to="/users">Users</NavLink>
			</nav>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/players" component={Players} />
				<Route path="/contact" component={Contact} />
				<Route path="/users" component={Users} />
				<Route component={Notfound} />
			</Switch>
		</header>
	</Router>
)

ReactDOM.render(
  //<App />,
  routing,
  document.getElementById('root')
);
