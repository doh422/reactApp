import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import Players from './players';
import Contact from './contact';


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
			<Route exact path="/" component={App} />
			<Route path="/players" component={Players} />
			<Route path="/contact" component={Contact} />
		</div>
	</Router>
)

ReactDOM.render(
  //<App />,
  routing,
  document.getElementById('root')
);
