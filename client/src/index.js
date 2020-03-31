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
			<Route path="/" component={App} />
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
