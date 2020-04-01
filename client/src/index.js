import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
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
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/players">Players</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
			</ul>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/players/:id" component={Players} />
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
