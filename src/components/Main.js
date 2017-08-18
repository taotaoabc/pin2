require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

let Penguins = require('../images/Penguins2.jpg');

class Cell extends React.Component {

	handleClick(e){
		console.log('click');
		e.stopPropagation();
		e.preventDefault();
	}

		componentDidMount(){
		//首先拿到舞台的大小
		// var ImgDOM = ReactDOM.findDOMNode(this.refs.ImgCell);
		// var ImgRef = ReactDOM.findDOMNode(this.refs.ImgRef);
		// var ctx = ImgDOM.getContext('2d');
		// console.log(this.props.arrange.posXY.y);
		// console.log(this.props.arrange.posXY.x);
		// ctx.drawImage(ImgRef,this.props.arrange.posXY.x*100,
		// 	this.props.arrange.posXY.y*100,
		// 	100,100,
		// 	this.props.arrange.posXY.y*100,
		// 	this.props.arrange.posXY.x*100,
		// 	100,100);

	}

	render() {
		var styleObj = {};
		styleObj = {
			top : Math.ceil(this.props.arrange.posXY.y*100),
			left: Math.ceil(this.props.arrange.posXY.x*100),
			width: 100,
			height: 100,
		};

		styleObj.backgroundPosition="-"+styleObj.left+"px "+
		"-"+styleObj.top+"px";

		
	    return (
	        <div className="ImgCell" style={styleObj}  ref="ImgCell"
	        onClick={this.handleClick.bind(this)}>
		    </div>
	    );
	}
}


class AppComponent extends React.Component {

  constructor(props){
		super(props);
		this.state = {imgsArray:[]};
		this.scale = {
			cols: 8,
			rows: 4
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
  				x:(index % 8),
  				y:((index-index % 8)/8)
  			}
  		};

  		imgFigures.push(<Cell arrange = {imgsArray[index]}/>);
  	}

  	imgFigures.sort();

  	this.state.imgsArray = imgsArray;



    return (
      <section className="stage">
        {imgFigures}
      </section>
    );
  }
}

export default AppComponent;
