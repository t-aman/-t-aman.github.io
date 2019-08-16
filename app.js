(function ($) {

	$.hotaru = function (element, options) {
		var defaults = {
			max: 60,
			radius: 1.5
		};
		var plugin = this;
		var hotaru_array = [];
		var ctx;
		var stageWidth, stageHeight;
		var scale = 0.2;
		var img = new Image();
		img.src = "background.jpg?" + new Date().getTime();

		plugin.init = function () {
			plugin.settings = $.extend({}, defaults, options);
			initializeHotaru();
		};
alert(1);
		var initializeHotaru = function () {
			var cvs = document.getElementById("canvas");
			if (!cvs || !cvs.getContext) {
				return;
			}
			stageWidth = window.innerWidth ? window.innerWidth : $(window).width();
			stageHeight = window.innerHeight ? window.innerHeight : $(window).height();
			cvs.width = stageWidth;
			cvs.height = stageHeight;
			ctx = cvs.getContext("2d");
			stageWidth = cvs.width;
			stageHeight = cvs.height;
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fillRect(0, 0, cvs.width, cvs.height);
			alert(2);
			img.onload = function () {
				var scW = stageWidth / img.width;
				var scH = stageHeight / img.height;
				scale = scW > scH ? scW : scH;
				ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * scale, img.height * scale);
				alert(3);
			};
			for (var i = 0; i < plugin.settings.max; i++) {
				var hotaruObj = new Hotaru();
				ctx.fillStyle = "rgba(248, 249, 203, " + hotaruObj.alpha + ")";
				ctx.beginPath();
				ctx.arc(hotaruObj.posX, hotaruObj.posY, hotaruObj.size, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
				hotaru_array.push(hotaruObj);
			}
			alert(4);
			setInterval(enterFrame, 30);
		};

		var Hotaru = function () {
			this.posX = Math.random() * stageWidth;
			this.posY = Math.random() * stageHeight;
			var angle = Math.random() * 360;
			var speed = Math.random() + 0.01;
			this.moveX = Math.cos((angle * Math.PI) / 180.0) * speed;
			this.moveY = Math.sin((angle * Math.PI) / 180.0) * speed;
			this.step = parseInt(Math.random() * 360);
			this.steps = parseInt(Math.random() * 10) + 1;
			this.alpha = (Math.sin((this.step * Math.PI) / 180) + 1) / 2;
			this.size = Math.random() * plugin.settings.radius + 1;
		};

		var enterFrame = function () {
			var i;
			for (i = 0; i < plugin.settings.max; i++) {
				hotaru_array[i].alpha = (Math.sin((hotaru_array[i].step * Math.PI) / 180) + 1) / 2;
				hotaru_array[i].step = (hotaru_array[i].step + hotaru_array[i].steps) % 360;
				hotaru_array[i].posX += hotaru_array[i].moveX;
				hotaru_array[i].posY += hotaru_array[i].moveY;
				if (hotaru_array[i].posX < 0) hotaru_array[i].posX = stageWidth;
				if (hotaru_array[i].posX > stageWidth) hotaru_array[i].posX = 0;
				if (hotaru_array[i].posY < 0) hotaru_array[i].posY = stageHeight;
				if (hotaru_array[i].posY > stageHeight) hotaru_array[i].posY = 0;
			}
			ctx.fillRect(0, 0, stageWidth, stageHeight);
			var scW = stageWidth / img.width;
			var scH = stageHeight / img.height;
			scale = scW > scH ? scW : scH;
			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * scale, img.height * scale);

			for (i = 0; i < plugin.settings.max; i++) {
				ctx.fillStyle = "rgba(248, 249, 203, " + hotaru_array[i].alpha + ")";
				ctx.beginPath();
				ctx.arc(
					hotaru_array[i].posX,
					hotaru_array[i].posY,
					hotaru_array[i].size,
					0,
					Math.PI * 2,
					true
				);
				ctx.closePath();
				ctx.fill();
			}
		};

		$(window).resize(function () {
			stageWidth = window.innerWidth ? window.innerWidth : $(window).width();
			stageHeight = window.innerHeight
				? window.innerHeight
				: $(window).height();
		});

		plugin.init();
	};

	$.fn.hotaru = function (options) {
		return this.each(function () {
			if (undefined == $(this).data("hotaru")) {
				$(this).data("hotaru", new $.hotaru(this, options));
			}
		});
	};

})(jQuery);

$(function () {
	$("#canvas").hotaru({ max: 50, radius: 3.0 });
});
