(function ($) {

	$.gCircle = function (element, options) {

		var defaultOptions = {
			image: 'background.jpg',
			color: '248, 249, 203',
			max: 50,
			radius: 3.0,
			interval:50
		};
		var $$ = this;
		$$.settings = $.extend({}, defaultOptions, options);
		var ctx;
		var arrCircle = [];
		var scWidth = 0, scHeight = 0, scale = 0.2;
		var img = new Image();
		img.src = $$.settings.image + "?" + new Date().getTime();

		$$.init = function () {
			var cvs = document.getElementById("canvas");
			if (!cvs || !cvs.getContext) return;
			cvs.width = window.innerWidth ? window.innerWidth : $(window).width();
			cvs.height = window.innerHeight ? window.innerHeight : $(window).height();
			ctx = cvs.getContext("2d");
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fillRect(0, 0, cvs.width, cvs.height);
			scWidth = cvs.width;
			scHeight = cvs.height;
			img.onload = function () {
				var scW = scWidth / img.width;
				var scH = scHeight / img.height;
				scale = scW > scH ? scW : scH;
				ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * scale, img.height * scale);
			};
			for (var i = 0; i < $$.settings.max; i++) {
				var obj = new Circle();
				ctx.fillStyle = "rgba(" + $$.settings.color + ", " + obj.alpha + ")";
				ctx.beginPath();
				ctx.arc(obj.posX, obj.posY, obj.size, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
				arrCircle.push(obj);
			}
			setInterval(showCircle, $$.settings.interval);
		};

		var showCircle = function () {
			var i;
			for (i = 0; i < $$.settings.max; i++) {
				arrCircle[i].alpha = (Math.sin((arrCircle[i].step * Math.PI) / 180) + 1) / 2;
				arrCircle[i].step = (arrCircle[i].step + arrCircle[i].steps) % 360;
				arrCircle[i].posX += arrCircle[i].moveX;
				arrCircle[i].posY += arrCircle[i].moveY;
				if (arrCircle[i].posX < 0) arrCircle[i].posX = scWidth;
				if (arrCircle[i].posX > scWidth) arrCircle[i].posX = 0;
				if (arrCircle[i].posY < 0) arrCircle[i].posY = scHeight;
				if (arrCircle[i].posY > scHeight) arrCircle[i].posY = 0;
			}
			ctx.fillRect(0, 0, scWidth, scHeight);
			var scW = scWidth / img.width;
			var scH = scHeight / img.height;
			scale = scW > scH ? scW : scH;
			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * scale, img.height * scale);
			for (i = 0; i < $$.settings.max; i++) {
				ctx.fillStyle = "rgba(" + $$.settings.color + ", " + arrCircle[i].alpha + ")";
				ctx.beginPath();
				ctx.arc(arrCircle[i].posX, arrCircle[i].posY, arrCircle[i].size, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
			}
		};

		var Circle = function () {
			var angle = Math.random() * 360;
			var speed = Math.random() + 0.01;
			this.posX = Math.random() * scWidth;
			this.posY = Math.random() * scHeight;
			this.moveX = Math.cos((angle * Math.PI) / 180.0) * speed;
			this.moveY = Math.sin((angle * Math.PI) / 180.0) * speed;
			this.step = parseInt(Math.random() * 360);
			this.steps = parseInt(Math.random() * 10) + 1;
			this.alpha = (Math.sin((this.step * Math.PI) / 180) + 1) / 2;
			this.size = Math.random() * $$.settings.radius + 1;
		};

		$(window).resize(function () {
			scWidth = window.innerWidth ? window.innerWidth : $(window).width();
			scHeight = window.innerHeight ? window.innerHeight : $(window).height();
		});

		$$.init();
	};

	$.fn.firefly = function (options) {
		return this.each(function () {
			if (undefined == $(this).data("gCircle")) {
				$(this).data("gCircle", new $.gCircle(this, options));
			}
		});
	};

})(jQuery);

$(function () {

	$("#canvas").firefly();
	alert(123);

});
