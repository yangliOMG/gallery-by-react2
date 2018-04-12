require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './imgfigure.js';
import ControllerUnit from './controllerUnit.js';


var imageDatas = require('../data/imageData.json');
imageDatas = (function gener(images){
	for (let i = 0; i < images.length; i++) {
		let img = images[i];
		img.imageURL = require('../images/'+ img.fileName);
		images[i] = img;
	}
	return images;
})(imageDatas);


function getRangeRandom(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
function get30DegRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30));
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: { // 中心位置
        left: 0,
        top: 0
      },
      hPosRange: { // 水平方向
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: { // 垂直方向
        x: [0, 0],
        topY: [0, 0]
      }
    };
    this.state = {
      imgArrangeArr: []
    };
  }

  inverse(index) {
    return function () {
      var imgArrangeArr = this.state.imgArrangeArr;

      imgArrangeArr[index].isInverse = !imgArrangeArr[index].isInverse;

      this.setState({
        imgArrangeArr: imgArrangeArr
      });
    }.bind(this);
  }

  rearrange	(centerIndex){
  	let imgArrangeArr = this.state.imgArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRigheSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      imgArrangeTopArr = [],
      topImgNum = Math.floor(Math.random() * 2), // there would be 0 or 1 pics in top sec
      topImgSpliceIndex = 0, // the index of pic at top sec

      imgArrangeCenterArr = imgArrangeArr.splice(centerIndex, 1); // get the center pic

    // get the info of pics in up sec
    topImgSpliceIndex = Math.floor(Math.random() * (imgArrangeArr.length - topImgNum));
    imgArrangeTopArr = imgArrangeArr.splice(topImgSpliceIndex, topImgNum);

    /*---- position part ----*/
    // 让图片居中
    imgArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    }
    // 让图片在最上层
    imgArrangeTopArr.forEach(function (value, index) {
      imgArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      };
    });

    for (var i = 0, j = imgArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;

      // first half pics at left
      // rest pics at right
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRigheSecX;
      }

      imgArrangeArr[i] = {
        pos: {
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      };
    }
    if (imgArrangeTopArr && imgArrangeTopArr[0]) {
      imgArrangeArr.splice(topImgSpliceIndex, 0, imgArrangeTopArr[0]);
    }

    imgArrangeArr.splice(centerIndex, 0, imgArrangeCenterArr[0]);

    this.setState({
      imgArrangeArr: imgArrangeArr
    })
  }

  getInitialState(){
  	return {
  		imgsArrangeArr:[

  		]
  	}
  }

  center(index) {
    return function () {
      this.rearrange(index);
    }.bind(this);
  }

  componentDidMount() {
    // get the size of stage
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);
    // get the size of one music
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);
    // 计算中心图片的位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    // calculate the range of posiztion for the left and right sec
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    // calculate the range of position for up sec
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.Constant.vPosRange.topY[0] = 0 - halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    // let the first pic at center
    this.rearrange(0);
  }

  render() {
  	let controllerUnits = [], imgFigures = [];
  	imageDatas.forEach((value,i)=>{
  		if (!this.state.imgArrangeArr[i]) {
	        this.state.imgArrangeArr[i] = {
	          pos: {
	            left: 0,
	            top: 0
	          },
	          rotate: 0,
	          isInverse: false,
	          isCenter: false
	        }
	    }
  		imgFigures.push(<ImgFigure data={value} key={i} ref={'imgFigure'+i}
  			arrange={this.state.imgArrangeArr[i]} inverse={this.inverse(i)} center={this.center(i)}/>);
  		controllerUnits.push(<ControllerUnit key={i} arrange={this.state.imgArrangeArr[i]}
                                           inverse={this.inverse(i)} center={this.center(i)}/>);
  	});

    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">{imgFigures}</section>
      	<nav className="controller-nav">{controllerUnits}</nav>

      </section>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
