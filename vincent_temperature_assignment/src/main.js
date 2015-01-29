var THEME = require('themes/flat/theme');
var SLIDERS = require('controls/sliders');
var BUTTONS = require('controls/buttons');

// pictures
var sunnyPic = new Picture({left: 20, right: 20, top:90, bottom: 325}, "http://www.wpclipart.com/weather/sun/sun_5/sunny_happy_day.png");
var cloudyPic = new Picture({left: 20, right: 20, top:90, bottom: 325}, "http://images.clipartpanda.com/partly-cloudy-clipart-black-and-white-cloudy-clipart-black-and-white-1277949025.png");
var snowPic = new Picture({left: 20, right: 20, top:90, bottom: 325}, "http://images.clipartpanda.com/frost-clipart-snowy_winter_weather.png");
var partlyCloudyPic = new Picture({left: 20, right: 20, top:90, bottom: 325}, "http://images.clipartpanda.com/partly-cloudy-clipart-black-and-white-1327351703936930346cloudy.svg.med.png");
var firePic = new Picture({left: 10, right: 10, top:80, bottom: 315}, "http://images.clipartpanda.com/fire-clip-art-zeimusu_Fire_Icon.png");

// picture logic; fahrenheit range is 32-212
function pictureLogic() {
	if (fNumber.string < 50) { // snowy
		sunnyPic.opacity = 0;
		cloudyPic.opacity = 0;
		snowPic.opacity = 1;
		partlyCloudyPic.opacity = 0; 
		firePic.opacity = 0;
	} else if (fNumber.string < 70) { // cloudy
		sunnyPic.opacity = 0;
		cloudyPic.opacity = 1;
		snowPic.opacity = 0;
		partlyCloudyPic.opacity = 0;
		firePic.opacity = 0;
	} else if (fNumber.string < 90) { // partly cloduy
		sunnyPic.opacity = 0;
		cloudyPic.opacity = 0;
		snowPic.opacity = 0;
		partlyCloudyPic.opacity = 1;
		firePic.opacity = 0;
	} else if (fNumber.string < 130) { // sunny
		sunnyPic.opacity = 1;
		cloudyPic.opacity = 0;
		snowPic.opacity = 0;
		partlyCloudyPic.opacity = 0;
		firePic.opacity = 0;
	} else { // fire
		sunnyPic.opacity = 0;
		cloudyPic.opacity = 0;
		snowPic.opacity = 0;
		partlyCloudyPic.opacity = 0;
		firePic.opacity = 1;
		partlyCloudyPic.opacity = 0;
		
	}   
}

// Styling
var whiteS = new Skin({fill:"white"});
var greyS = new Skin({fill:"grey"});
var labelStyle = new Style( { font: "bold 10px", color:"white", height: "20px" } );
var titleLabelStyle = new Style( { font: "bold 25px", color:"white", height: "20px" } );

// labels
var titleLabel = new Label({left:10, right:10, top: 20, string: "Temperature Converter", style: titleLabelStyle});
var infoLabel = new Label({left:10, right:10, top: 60, string: "Change any slider and see the conversions; Ignore old sliders", style: labelStyle});
var dNumber = new Label({left:10, right:10, bottom: 260, string: "", style: labelStyle});
var fNumber = new Label({left:10, right:10, bottom: 180, string: "", style: labelStyle});
var cNumber = new Label({left:10, right:10, bottom: 100, string: "", style: labelStyle});
var kNumber = new Label({left:10, right:10, bottom: 20, string: "", style: labelStyle});
var dLabel = new Label({left:10, right:10, bottom: 300, string: "Delisle", style: labelStyle});
var fLabel = new Label({left:10, right:10, bottom: 220, string: "Fahrenheit", style: labelStyle});
var cLabel = new Label({left:10, right:10, bottom: 140, string: "Celsius", style: labelStyle});
var kLabel = new Label({left:10, right:10, bottom: 60, string: "Kelvin", style: labelStyle});

// sliders
var fSlider = SLIDERS.HorizontalSlider.template(function($){ return{
	bottom:180, left:50, right:50,
	behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
		onValueChanged: { value: function(container){
			SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
			fNumber.string = Math.round(this.data.value);
			cNumber.string = Math.round((this.data.value - 32) * 5 / 9);
			kNumber.string = Math.round((this.data.value + 459.67) * 5 / 9);
			dNumber.string = Math.round((212 - this.data.value) * 5 / 6);
			pictureLogic();
	}}})
}});

var cSlider = SLIDERS.HorizontalSlider.template(function($){ return{
	bottom:100, left:50, right:50,
	behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
		onValueChanged: { value: function(container){
			SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
			cNumber.string = Math.round(this.data.value);
			kNumber.string = Math.round(this.data.value + 273);
			fNumber.string = Math.round((this.data.value * 9 / 5) + 32);
			dNumber.string = Math.round((100 - this.data.value) * 3 / 2);
			pictureLogic();
	}}})
}});

var kSlider = SLIDERS.HorizontalSlider.template(function($){ return{
	bottom:20, left:50, right:50,
	behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
		onValueChanged: { value: function(container){
			SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
			kNumber.string = Math.round(this.data.value);
			cNumber.string = Math.round(this.data.value - 273);
			fNumber.string = Math.round(((this.data.value - 273) * 9 / 5) + 32);
			dNumber.string = Math.round((212 - fNumber.string) * 5 / 6);
			pictureLogic();
	}}})
}});

var dSlider = SLIDERS.HorizontalSlider.template(function($){ return{
	bottom:260, left:50, right:50,
	behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
		onValueChanged: { value: function(container){
			SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
			kNumber.string = Math.round(this.data.value);
			cNumber.string = Math.round(this.data.value - 273);
			fNumber.string = Math.round(((this.data.value - 273) * 9 / 5) + 32);
			dNumber.string = Math.round(this.data.value);
			pictureLogic();
	}}})
}});

var fSlider = new fSlider({ min:32, max:212, value:32,  });
var cSlider = new cSlider({ min:1, max:100, value:1,  });
var kSlider = new kSlider({ min:273, max:373, value:273,  });
var dSlider = new dSlider({ min:0, max:150, value:150,  });

// main app
var mainCon = new Container({left:0, 
							right:0, 
							top:0, 
							bottom:0, 
							skin: greyS
							});
application.add(mainCon);
mainCon.add(fSlider);
mainCon.add(cSlider);
mainCon.add(kSlider);
mainCon.add(dSlider);
mainCon.add(titleLabel);
mainCon.add(fNumber);
mainCon.add(cNumber);
mainCon.add(kNumber);
mainCon.add(dNumber);
mainCon.add(fLabel);
mainCon.add(cLabel);
mainCon.add(kLabel);
mainCon.add(dLabel);
mainCon.add(infoLabel);
mainCon.add(sunnyPic);
mainCon.add(cloudyPic);
mainCon.add(snowPic);
mainCon.add(partlyCloudyPic);
mainCon.add(firePic);
