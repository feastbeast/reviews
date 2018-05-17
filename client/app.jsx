import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './components/Reviews.jsx';
import Description from './components/Description.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

  render () {
    return (
      <div className="parent-component">
        <Description />
        <Reviews />
      </div>
    )
  }
}
