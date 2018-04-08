require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/style.scss');

import React from 'react';



let imageDatas = require('../data/imageData.json');
imageDatas = (function gener(images){
	for (let i = 0; i < images.length; i++) {
		let img = images[i];
		img.imageURL = require('../images/'+ img.fileName);
		images[i] = img;
	}
})(imageDatas);


class AppComponent extends React.Component {

  render() {
    return (
      <section className="stage">	
      	<section className="img-sec"></section>
      	<nav className="controller-nav"></nav>

      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
