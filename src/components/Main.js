require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class Cell extends React.Component {

	

	handleClick(e){
		console.log('click');
		e.stopPropagation();
		e.preventDefault();
	}

	render() {
		var styleObj = {};
		styleObj = {
			top : Math.ceil(this.props.arrange.posXY.y/3*100) + '%',
			left :Math.ceil(this.props.arrange.posXY.x/7*100) + '%',
			width: Math.ceil(1/7*100) + '%',
			height: Math.ceil(1/3*100) + '%',

		};
	    return (
	        <figure className="ImgCell" style={styleObj} onClick={this.handleClick.bind(this)}>
				<img src='../images/Penguins.jpg'/>
		    </figure>
	    );
	}
}


class AppComponent extends React.Component {

  constructor(props){
		super(props);
		this.state = {imgsArray:[]};
		this.scale = {
			cols: 7,
			rows: 3
		};
		
	}

  



  render() {
  	var length = this.scale.cols * this.scale.rows;
  	var imgsArray = [],imgFigures = [];;
  	for(var index =0; index < length ; index++)
  	{
  		imgsArray[index] = {
  			index:index,
  			posXY:{
  				x:(index % this.scale.cols),
  				y:(index % this.scale.rows)
  			}
  		};

  		imgFigures.push(<Cell arrange = {imgsArray[index]}/>);
  	}

  	this.state.imgsArray = imgsArray;



    return (
      <section className="stage">
        {imgFigures}
      </section>
    );
  }
}

export default AppComponent;
