import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Roster from './components/roster';
import Contact from './contact';
import Users from './users';
import Player from './components/player';
import Schedule from './components/schedule';
import Boxscore from './components/boxscore';
import Scorebook from './components/scorebook';
import Notfound from './notfound';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const routing = (
	<Router>
		<header>
			<Navbar bg="light">
				<NavLink exact className="navbar-brand homeLink" to="/">Rumors</NavLink>
				<Navbar.Toggle aria-controls="navbarNav" />
				<Navbar.Collapse id="navbarNav"className="justify-content-end">
					<Nav className="navbar-nav">
						<NavLink activeClassName="active" className="nav-item nav-link" to="/roster">Roster</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link" to="/schedule">Schedule</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link" to="/contact">Contact</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link" to="/users">Users</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/roster" component={Roster} />
				<Route path="/schedule" component={Schedule} />
				<Route path="/contact" component={Contact} />
				<Route path="/users" component={Users} />
				<Route path="/player/:name" component={Player} />
				<Route exact path="/game/:id" component={Boxscore} />
				<Route path="/game/:id/scorebook" component={Scorebook} />
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
