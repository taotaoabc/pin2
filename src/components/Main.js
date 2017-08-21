require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

let Penguins = require('../images/Penguins2.jpg');

class Cell extends React.Component {

	handleClick(e){
		(this.props.move)();
		e.stopPropagation();
		e.preventDefault();
	}

	componentDidMount(){

	}

	render() {
		var styleObj = {},styleObj2 = {};
		styleObj = {
			top : Math.ceil(this.props.arrange.posXY.y*100),
			left: Math.ceil(this.props.arrange.posXY.x*100),
			width: 100,
			height: 100
		};

		styleObj2 = {
			top : Math.ceil(this.props.arrange.posXY.y*100),
			left: Math.ceil(this.props.arrange.posXY.x*100),
			width: 100,
			height: 100
		};

		var stdLeft = this.props.arrange.posXYStd.x*100,
		stdTop = this.props.arrange.posXYStd.y*100;

		styleObj.backgroundPosition="-"+stdLeft+"px "+
		"-"+stdTop+"px";

		var isBlank = this.props.arrange.isBlank;

		if(isBlank)
		{
			return (
	        <div className="ImgCell2" style={styleObj2}>
		    </div>);
		}
		else
		{
			return (
		        <div className="ImgCell" style={styleObj}  ref="ImgCell"
		        onClick={this.handleClick.bind(this)}>
			    </div>);			
		}
	    
	}
}


//深拷贝与浅拷贝
//原有的写法不可行，请分析
// var temp = obj1;
// 	obj1.posXY = obj2.posXY;
// 	obj2.posXY = temp.posXY;
function changePos(obj1,obj2){
	var temp1 = obj1.posXYStd;
	var temp2 = obj1.isBlank;
	var temp3 = obj1.index;
	obj1.posXYStd = obj2.posXYStd;
	obj1.isBlank = obj2.isBlank;
	obj1.index = obj2.index;
	obj2.posXYStd = temp1;
	obj2.isBlank = temp2;
	obj2.index = temp3;
}

class AppComponent extends React.Component {

  constructor(props){
		super(props);
		this.state = {imgsArray:[]};
		this.scale = {
			cols: 8,
			rows: 4
		};

	var length = this.scale.cols * this.scale.rows;
  	var imgsArray = [];

  	//posXYStd用来记录每个Cell的background-position位置信息，此信息不会发生变化
  	for(var index =0; index < length ; index++)
  	{
  		if(index!=7)
  		{
  			imgsArray[index] = {
  			isBlank:false,
  			index:index,
  			posXYStd:{
  				x:(index % 8),
  				y:((index-index % 8)/8)
  			}
  		};
  		}
	  	else
	  	{
	  		imgsArray[index] = {
  			isBlank:true,
  			index:index,
  			posXYStd:{
  				x:(index % 8),
  				y:((index-index % 8)/8)
  			}
  		};
	  	}
  		

  	}


  	imgsArray.sort(function(){
	  		return Math.random()-0.5;	   	
  	});

  	//posXY用来记录每个Cell的在stage上的位置信息，如果不随机排序，那么posXY=posXYStd
  	for(var index =0; index < length ; index++)
  	{
  		imgsArray[index].posXY = {
  			x:(index%8),
  			y:((index-index%8)/8)
  		};
  	}
  	
	console.log(imgsArray);
  	this.state.imgsArray = imgsArray;
		
	}



	move(index){
		return function(){
			console.log(this.state.imgsArray);
			var imgsArray = this.state.imgsArray;
			//console.log(index);
			//看下元素的上下左右是否有空座
			{
				if(index-8>=0)
				{
					if(imgsArray[index-8].isBlank)
					{
						changePos(imgsArray[index-8],imgsArray[index]);
					}
				}
				if(index+8<32)
				{
					if(imgsArray[index+8].isBlank)
					{
						changePos(imgsArray[index+8],imgsArray[index]);
					}
				}
				if(index+1<32)
				{
					if(imgsArray[index+1].isBlank)
					{
						changePos(imgsArray[index+1],imgsArray[index]);						
					}
				}
				if(index-1>=0)
				{
					if(imgsArray[index-1].isBlank)
					{
						changePos(imgsArray[index-1],imgsArray[index]);						
					}
				}
			}
			console.log(index);
			console.log(imgsArray);
			this.setState(
			{
				imgsArray:imgsArray
			});
	}  
}


  render() {
  	var length = this.scale.cols * this.scale.rows;
  	var imgFigures = [];
  	for(var index =0; index < length ; index++)
  	{
  			imgFigures.push(<Cell arrange = {this.state.imgsArray[index]}
  				move = {this.move(index).bind(this)}/>);  			

  	}


    return (
      <section className="stage">
        {imgFigures}
      </section>
    );
  }
}

export default AppComponent;
