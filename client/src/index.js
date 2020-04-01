import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Players from './players';
import Contact from './contact';
import Notfound from './notfound';


const routing = (
	<Router>
		<div>
			<ul>
				<li>
					<NavLink exact activeClassName="active" to="/">Home</NavLink>
				</li>
				<li>
					<NavLink activeClassName="active" to="/players">Players</NavLink>
				</li>
				<li>
					<NavLink activeClassName="active" to="/contact">Contact</NavLink>
				</li>
			</ul>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/players" component={Players} />
				<Route path="/contact" component={Contact} />
				<Route component={Notfound} />
			</Switch>
		</div>
	</Router>
)

ReactDOM.render(
  //<App />,
  routing,
  document.getElementById('root')
);
