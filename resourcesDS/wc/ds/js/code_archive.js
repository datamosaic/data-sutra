/**
 * 	Copyright (C) 2006 - 2012 Data Mosaic
 *	http://www.data-mosaic.com
 *	All rights reserved 
 *
 *	The copyright of the computer program(s) herein is 
 *	the property of Data Mosaic. The program(s) may be used/copied 
 *	only with the written permission of the owner or in 
 *	accordance with the terms and conditions stipulated in 
 *	the agreement/contract under which the program(s) have 
 *	been supplied.
 */

/*
 *	This file holds useful code snippets that are no longer used.
 *	An easy reference instead of digging back through past SVN revisions.
 */

<!-- https://gist.github.com/1042167, 1042026 -->
<script type="text/javascript">
	(function(document,navigator,standalone) {
		// prevents links from apps from oppening in mobile safari
		// this javascript must be the first script in your <head>
		if ((standalone in navigator) && navigator[standalone]) {
			var curnode, location=document.location, stop=/^(a|html)$/i;
			document.addEventListener('click', function(e) {
				curnode=e.target;
				while (!(stop).test(curnode.nodeName)) {
					curnode=curnode.parentNode;
				}
				// Condidions to do this only on links to your own app
				// if you want all links, use if('href' in curnode) instead.
				if ('href' in curnode && // is a link
					 // is not an anchor
					(chref=curnode.href).replace(location.href,'').indexOf('#') &&
					// either does not have a proper scheme (relative links)
					(	!(/^[a-z\+\.\-]+:/i).test(chref) ||         
					// or is in the same protocol and domain              
						chref.indexOf(location.protocol+'//'+location.host)===0 ) 
				) {
					e.preventDefault();
					location.href = curnode.href;
				}
			},false);
		}
	})(document,window.navigator,'standalone');
</script>

//	cookie status on MainPage.html
<script>
	var oldSession = localStorage.dsCookie;
	var newSession = 'Nothing yet'
	var cookieHelp = unescape(document.cookie).split(';').filter(function(item){return item.substr(0,10) == 'JSESSIONID' || item.substr(0,11) == ' JSESSIONID'});
	if (cookieHelp && cookieHelp.length) {
		newSession = cookieHelp[0].substr(cookieHelp[0].indexOf('=') + 1)
		localStorage.dsCookie = newSession
	}
	
	console.log('Old: ' + oldSession + '\nNew: ' + newSession);
</script>


//	snippet to auto-load weinre on page
<script src="http://trojalia.local:8088/target/target-script-min.js#anonymous"></script>

<!-- https://gist.github.com/472519 has more info on all ios specific flags in html file -->

// what domain are we running on?
function getDomain() {
	var url = window.location.href;
	var arr = url.split("/");
	var result = arr[0] + "//" + arr[2];
	return result;
}

//	Useful frame speak
window.parent && 
window.parent.window && 
window.parent.window.frameElement && 
window.parent.window.frameElement.id == 'ds_website'

//	Update indicator to be new style (in the toolbar)
	// this really shows how to repeatedly run a function until what it is waiting for has loaded
function setIndicator(delay) {
	var indicator = $('.indicator');
	var toolbar = $("#form_DATASUTRA_WEB_0F__header__toolbar");

	//we have enough things loaded to actually run this method
	if (toolbar.length && toolbar.width()) {
		//280 is position of form, 20 is width of indicator, 15 is inset = 245
		var offset = 245 + toolbar.width() + 'px';

		console.log('SET: ' + offset);

		//in the wrong place, readjust
		if (indicator.css('margin-left') != offset) {
			//put indicator into toolbar area
			indicator.css('left','0px');
			indicator.css('margin-left',offset);
			indicator.css('margin-top','8px');
		}
	}
	//run this function again until enough loaded
	else {
		setTimeout(function(){
			setIndicator(delay)
		},delay || 250)
		console.log('SET waiting....');
	}
}

//	Disallow scaling in iOS
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no;" />

//	Extend jQuery to give us scrollstart / scrollstop events
(function(){

	var special = jQuery.event.special,
		uid1 = 'D' + (+new Date()),
		uid2 = 'D' + (+new Date() + 1);

	special.scrollstart = {
		setup: function() {

			var timer,
				handler =  function(evt) {

					var _self = this,
						_args = arguments;

					if (timer) {
						clearTimeout(timer);
					} else {
						evt.type = 'scrollstart';
						jQuery.event.handle.apply(_self, _args);
					}

					timer = setTimeout( function(){
						timer = null;
					}, special.scrollstop.latency);

				};

			jQuery(this).bind('scroll', handler).data(uid1, handler);

		},
		teardown: function(){
			jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
		}
	};

	special.scrollstop = {
		latency: 300,
		setup: function() {

			var timer,
					handler = function(evt) {

					var _self = this,
						_args = arguments;

					if (timer) {
						clearTimeout(timer);
					}

					timer = setTimeout( function(){

						timer = null;
						evt.type = 'scrollstop';
						jQuery.event.handle.apply(_self, _args);

					}, special.scrollstop.latency);

				};

			jQuery(this).bind('scroll', handler).data(uid2, handler);

		},
		teardown: function() {
			jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
		}
	};

})();


//	Object to track scroll position
var DS_universalList = {
				formName : '',
				scrollPosition : 0,
				setFormName : function(formName) {
					DS_universalList.formName = formName;
				},
				scrollHijack : function(formName) {
						//formName not specified, use whatever is currently the default
						if (!formName) {
							formName = DS_universalList.formName
						}
						
						var selector = $("#form_" + formName).find("tbody[id*='id']");
						
						if (selector.length) {
							console.log('HIJACK: gotcha ' + formName);
							selector.bind('scrollstop',
								function() {
									DS_universalList.scrollPosition = selector.scrollTop();
								}
							);
						}
						else {
							console.log('HIJACK: Nothing found here: ' + formName);
						}
					},
				scrollReset : function() {
						//grab the UL div
						var selector = $("#form_" + DS_universalList.formName).find("tbody[id*='id']");
						
						if (selector.length) {
							//scroll position not correct yet
							if (selector.scrollTop() != DS_universalList.scrollPosition) {
								selector.scrollTop(DS_universalList.scrollPosition);
								setTimeout(DS_universalList.scrollReset, 750);
								console.log('RESET: Scroll at ' + selector.scrollTop());
							}
							//scroll position correct, reattach listener
							else {
								DS_universalList.scrollHijack()
								console.log('RESET: Scroll correct; re-attaching listener');
							}
						}
						else {
							console.log('RESET: Nothing found here: ' + DS_universalList.formName);
						}
					}
			};

//	Attach listener to form name variable change
(function() {
	//allow me to watch for change state
	//https://gist.github.com/384583 http://eligrey.com
	if (!Object.prototype.watch) {
		Object.defineProperty(Object.prototype, "watch", {
			  enumerable: false
			, configurable: true
			, writable: false
			, value: function (prop, handler) {
				var
				  oldval = this[prop]
				, newval = oldval
				, getter = function () {
					return newval;
				}
				, setter = function (val) {
					oldval = newval;
					return newval = handler.call(this, prop, oldval, val);
				}
				;

				if (delete this[prop]) { // can't watch constants
					Object.defineProperty(this, prop, {
						  get: getter
						, set: setter
						, enumerable: true
						, configurable: true
					});
				}
			}
		});
	}
	
	DS_universalList.watch('formName',
			function (key, oldVal, newVal) {  
				//let me know when this function fires
				// console.log("DS_universalList." + key + " changed from " + oldVal + " to " + newVal);
				
				//assign listener to new universal list form
				setTimeout(function(){DS_universalList.scrollHijack(newVal)},1500);
				
				return newVal;
			  }
		);
})();