<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Montserrat">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Muli">
	<link href="http://fonts.googleapis.com/css?family=Arizonia" rel="stylesheet" type="text/css">
	<link rel="shortcut icon" href="<%=(String)request.getAttribute("themeDirectory")%>/favicon.ico" />
	<link rel="stylesheet" href="<%=(String)request.getAttribute("themeDirectory")%>/library/css/bootstrap.css"/>
	<link rel="stylesheet" href="<%=(String)request.getAttribute("themeDirectory")%>/library/css/bootstrap-responsive.css"/>
	<link rel="stylesheet" href="<%=(String)request.getAttribute("themeDirectory")%>/library/css/custom.css" />
	<link rel="stylesheet" href="<%=(String)request.getAttribute("themeDirectory")%>/library/css/lightbox/jquery.lightbox.css" />
	<!--[if IE 6]>
	<link rel="stylesheet" href="<%=(String)request.getAttribute("themeDirectory")%>/library/css/lightbox/jquery.lightbox.ie6.css" />
	<![endif]-->
	<!--[if (IE 7)|(IE 8)]>
<style type="text/css">
.navbar-inner{
	border-bottom: 1px solid gray;
}
</style>
<![endif]-->
<jsp:include page='<%= (String)request.getAttribute("head") %>' /> 

</head>

<body>	
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container" >
				<a class="brand transition" href="/">
					<img  src="<%=(String)request.getAttribute("themeDirectory")%>/library/images/logo-120x25.png"/>
				</a>
				<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				            <span class="icon-bar"></span>
				            <span class="icon-bar"></span>
				            <span class="icon-bar"></span>
				          </button>
			  <div class="nav-collapse collapse" style="height:0px;">
				<ul class="nav">
					<li class="small-hide"><a href='#tour'>Tour</a></li>
					<li><a href='#about'>About</a></li>
					
					<!-- <li><a href='#licensing'>Licensing</a></li> -->
					<!-- <li><a href='#faq'>FAQ</a></li> -->
					<li><a href='#testimonials'>Testimonials</a></li>
					<li><a href='#contact'>Contact</a></li>
				</ul>
				<ul class="nav pull-right">	
					<li class="dropdown">
					    <a class="dropdown-toggle"
					       data-toggle="dropdown"
					       href="#">
					        Developers
					        <b class="caret"></b>
					      </a>
					    <ul class="dropdown-menu">
						  <li><a href="http://community.data-sutra.com/projects/datasutra/files">Download</a></li>
						  <li><a href="http://community.data-sutra.com/projects/datasutra/wiki">Documentation</a></li>
						  <li><a href="http://community.data-sutra.com/projects/datasutra/boards">Forum</a></li>
						  <li class="divider"></li>
						  <li><a href="http://community.data-sutra.com/projects/datasutra/issues/new">File an issue...</a></li>
					    </ul>
					  </li>
					<!-- <li class="dropdown">
					    <a class="dropdown-toggle"
					       data-toggle="dropdown"
					       href="#">
					        Sutras
					        <b class="caret"></b>
					      </a>
					    <ul class="dropdown-menu">
						  <li><a href="#">Starter Pack: Business</a></li>
						  <li><a href="#">Starter Pack: Reports</a></li>
						  <li><a href="#">Starter Pack: Graphs</a></li>
						  <li class="divider"></li>
					      <li><a href="#">Sutra CMS</a></li>
						  <li><a href="#">Sutra Commerce</a></li>
						  <li><a href="#">Sutra Business Intelligence</a></li>
						  <li><a href="#">Sutra Calendar</a></li>
						  <li><a href="#">Sutra Campaigns</a></li>
						  <li class="divider"></li>
						  <li><a href="#">Quickbooks by Wormald</a></li>
					    </ul>
					  </li> -->
					<!-- <li class="dropdown">
					    <a class="dropdown-toggle"
					       data-toggle="dropdown"
					       href="#">
					        Services
					        <b class="caret"></b>
					      </a>
					    <ul class="dropdown-menu"> -->
						  <!-- <li><a href="starter-package">Training</a></li> -->
						  <!-- <li><a href="support">Support</a></li>
					      <li><a href="hosting">Hosting</a></li> -->
					    <!-- </ul>
					  </li> -->
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!--[if (IE 7)|(IE 8)]>
		<br/><br/><br/><br/>
	<![endif]-->
	<div class="container">
<div class="section" id="home">
	<div class="hero-unit hero-home">
		<div class="script">Build</div> 
		<hr />
    	<h1>Beautiful business apps</h1>
		<hr />
		<br />
		<h2>The Data Sutra Application Management Platform</h2>
    	<div class="row">
	    	<div class="span5"> 
				<p>Are your business applications outdated?</p>
				
				
				<p class="quote">Ok guys, really&mdash;where did you steal this application framework from? The level of polish on this is insane. Excellent! &nbsp;(<a href="#testimonials">More quotes...</a>)</p>
				
				<!-- <p>Develop with immediate results, deploy to various devices, leverage extensive pre-built features to give your applications traction from day one.</p> -->
		
				<!-- <p>Verticals, enterprise integrations, websites, workflow control, group collaboration, etc.</br /><span class="text-error">Transform your business with Data Sutra.</span></p> -->
				
				<!-- <p>Utilize latest web technologies, deploy to various devices, leverage extensive pre-built features.</br /><span class="text-error">Impress your clients</span> with Data Sutra.</p> -->
				
				<p>Don't start with a blank slate. Start with the most advanced Servoy-based application platform on the planet.</p>
				
	    		<p id="demo-server">
					<a href="http://community.data-sutra.com/projects/datasutra/wiki/Philosophy"><span class="text-info">Philosophy</span></a>&nbsp;&nbsp;&nbsp;&nbsp;
	    			<a href="http://demo.data-sutra.com/" target="_blank" class="btn btn-success btn-large">Live Demo</a>
					<a href="http://community.data-sutra.com/projects/datasutra/files" target="_blank" class="btn btn-standard btn-large">Download</a>
					<!-- <a href="http://europe.data-sutra.com/" target="_blank" class="btn btn-success btn-large">Europe Server</a> -->
	    			<!-- &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="text-info"><span class="mini-link">Build an App in 5 Minutes &raquo;<span></a>	 -->
	    		</p>
    		</div>

			<!-- screenshots -->
    		<div class="span5">
    			<a href="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-normal.png" class="lightbox lightbox-active" rel="lightbox[screenshots]" title="1. A basic record view">
					<img src="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-normal.png"/>
				</a>
				<a href="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-print-preview.png" class="lightbox" rel="lightbox[screenshots]" title="2. Inline print preview">
					<img src="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-print-preview.png"/>
				</a>
				<a href="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-date-combo.png" class="lightbox" rel="lightbox[screenshots]" title="3. Custom comboboxes and date picker">
					<img src="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-date-combo.png"/>
				</a>
				<a href="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-sidebar.png" class="lightbox" rel="lightbox[screenshots]" title="4. Sidebar showing &quot;Sutra Notes&quot; module">
					<img src="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-sidebar.png"/>
				</a>
				<a href="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-edit.png" class="lightbox" rel="lightbox[screenshots]" title="5. Edit/Save transaction mode">
					<img src="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-edit.png"/>
				</a>
				<a href="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-ipad-icon.png" class="lightbox" rel="lightbox[screenshots]" title="6. iPad application icon. Customizable!">
					<img src="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-ipad-icon.png"/>
				</a>
				<a href="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-ipad-at-work.png" class="lightbox" rel="lightbox[screenshots]" title="7. iPad at work. Bonus points if you can guess what trumpet I play and what coffee I drink.">
					<img src="<%=(String)request.getAttribute("themeDirectory")%>/library/tour/screen-ipad-at-work.png"/>
				</a>
				<p class="screenshots-title"><em>Screen shots</em></p>
    		</div>
    	</div>      
    </div>
</div>

<div class="section" id="tour">
	<div class="page-header">
		<h2 >Tour
		<!-- <div class="pagination">
			<ul  id="screenshotNav">
				<li data-screenshot="ds-tour-1" class="active"><a>Layout</a></li>
				<li data-screenshot="tour-slickgrid"><a>Slickgrid</a></li>
				<li data-screenshot="tour-treeview"><a>Tree View</a></li>
				<li data-screenshot="tour-navigation-engine"><a>Navigation Engine</a></li>
				<li data-screenshot="tour-security"><a>Access &amp; Control</a></li>
				<li data-screenshot="tour-transaction"><a href="#">Transactions</a></li>
				<li data-screenshot="tour-reporting"><a>Reporting</a></li>
				<li data-screenshot="tour-servoy-ide"><a>Servoy IDE</a></li>
			</ul>
		</div> -->
		</h2>
	</div>

	<div class="screenshot" id="ds-tour-1">
		<button data-x="60" data-y="50" class="btn btn-danger btn-small" rel="popover" data-title="Workspaces" data-content="The workspace button switches between the various workspaces a user has access to.">1</button>
		<button data-x="110" data-y="150" class="btn btn-danger btn-small" rel="popover" data-title="Navigation" data-content="The Navigation pane lists the applications and views for the currently selected workspace.">2</button>
		<button data-x="70" data-y="220" class="btn btn-danger btn-small" rel="popover" data-title="Fast Find" data-content="Quickly search any field or related fields of the current workspace form. Powerful features include: easy date entry popup, value list popup, extend searches, restrict searches, omit searches, ranges, starts with, ends with, exact matches, and wildcards.">3</button>
		<button data-x="35" data-y="400" class="btn btn-danger btn-small" rel="popover" data-title="Universal Lists" data-content="Configure and show multiple lists from any field or related fields of the current workspace form. Field options include alignment, type, display value list values, masking, and width. The top right tab control button flips between lists.">4</button>
		<button data-x="60" data-y="70" class="btn btn-danger btn-small" rel="popover" data-title="Spaces" data-content="The Spaces button group accesses various screen configurations: Standard, Navigation control, List control, List, and Workspace.">5</button>
		<button data-placement="right" data-x="200" data-y="50" class="btn btn-danger btn-small" rel="popover" data-title="Meaningful URLs" data-content="Data Sutra's URL's make sense for a reason: they work as links to navigation screens and specific records.">6</button>
		<button data-placement="right" data-x="400" data-y="70" class="btn btn-danger btn-small" rel="popover" data-title="Toolbars" data-content="The Toolbar pane is a smaller pane for general widgets. Define a widget by assigning to a Servoy form. Data Sutra comes with some default widgets: solution title, record navigator, browsing history (smart client), weather, and konsole.">7</button>
		<button data-placement="left" data-x="240" data-y="200" class="btn btn-danger btn-small" rel="popover" data-title="Grid Theme" data-content="Our Grid Theme takes the grunt work out of creating forms. Style classes for every Servoy object that look great in smart and web client.">8</button>
		<button data-placement="left" data-x="300" data-y="350" class="btn btn-danger btn-small" rel="popover" data-title="Workflow Area" data-content="The Workflow pane is the main working area of Data Sutra. Servoy forms that you create show up here when navigation items are selected.">9</button>		
		<button data-placement="bottom" data-x="500" data-y="100" class="btn btn-danger btn-small" rel="popover" data-title="Action Button Group" data-content="Action button groups appear at the bottom of the list pane and in the top right toolbar. Assign any of your methods to these buttons. Additionally, in the top right is default transaction buttons (edit, save and cancel) that require no addition coding. The user is locked out from navigating away while a transaction is open.">10</button>
		<button data-placement="left" data-x="600" data-y="320" class="btn btn-danger btn-small" rel="popover" data-title="Sidebar" data-content="Not shown here, the button in the header above opens up a right-side panel. Servoy forms attached to the Sidebar stay in view as you navigate your solution. This makes the Sidebar well suited for workflows that apply to your entire solution. Examples include time keeping, notes, tasks, etc.">11</button>
	</div>
	
	<div class="screenshot" id="tour-slickgrid">
		<button data-placement="bottom" data-x="200" data-y="100" class="btn btn-danger btn-small" rel="popover" data-title="Speed!" data-content="All of Data Sutra's lists and tables are now Slickgrid components instead of Servoy's default tables. This removes the main speed bottleneck of Servoy web client resulting in web application performance on par with complicated client-side technologies.">1</button>
		<button data-placement="bottom" data-x="350" data-y="100" class="btn btn-danger btn-small" rel="popover" data-title="The Problem" data-content="Servoy's default grid component (tables/lists) shows only a small selection of records, doesn't remember scroll position, fires off excessive amounts of requests to the server, doesn't support keyboard navigation, and has no advanced grid features. Perceived user performance&mdash;selecting, clicking, scrolling, keyboard navigation&mdash;is sub par compared to today's standards.">2</button>
		<button data-placement="bottom" data-x="500" data-y="100" class="btn btn-danger btn-small" rel="popover" data-title="The Solution" data-content="By integrating Slickgrid into Servoy, we've leveraged slickgrid's adaptive virtual scrolling (handle hundreds of thousands of rows with immediate responsiveness), extremely fast rendering speed, full keyboard navigation, column resize/reorder/show/hide, column autosizing & force-fit, and row grouping.">3</button>
		<button  data-placement="bottom"data-x="650" data-y="100" class="btn btn-danger btn-small" rel="popover" data-title="Easy to use" data-content="We've integrated Slickgrid into Servoy in such a way that is fully compatible with Servoy's design capabilities. Just design a regular Servoy table and tag it with a designTime property &quot;slickView&quot; or &quot;slickEdit&quot; and we auto-magically switch Servoy's grid out with a Slickgrid component when running solution in the web.">4</button>		
		<button data-placement="top" data-x="750" data-y="470" class="btn btn-danger btn-small" rel="popover" data-title="Try it now" data-content="Click to open live demo"><a href="http://demo.data-sutra.com/cms/site" target="_blank">Demo</a></button>	
	</div>
	
	<div class="screenshot" id="tour-treeview">
		<button data-x="60" data-y="50" class="btn btn-danger btn-small" rel="popover" data-title="Workspaces" data-content="The workspace button switches between the various workspaces a user has access to.">1</button>
	</div>
	
	<div class="screenshot" id="tour-transaction">
		<button data-x="60" data-y="50" class="btn btn-danger btn-small" rel="popover" data-title="Workspaces" data-content="The workspace button switches between the various workspaces a user has access to.">1</button>
	</div>
	
	<div class="screenshot" id="tour-security">
		<button data-x="60" data-y="50" class="btn btn-danger btn-small" rel="popover" data-title="Workspaces" data-content="The workspace button switches between the various workspaces a user has access to.">1</button>
	</div>
	
	<div class="screenshot" id="tour-navigation-engine">
		<button data-x="60" data-y="50" class="btn btn-danger btn-small" rel="popover" data-title="Workspaces" data-content="The workspace button switches between the various workspaces a user has access to.">1</button>
	</div>
	
	<div class="screenshot" id="tour-reporting">
		<button data-x="60" data-y="50" class="btn btn-danger btn-small" rel="popover" data-title="Workspaces" data-content="The workspace button switches between the various workspaces a user has access to.">1</button>
	</div>
	
	<div class="screenshot" id="tour-servoy-ide">
		<button data-x="60" data-y="50" class="btn btn-danger btn-small" rel="popover" data-title="Workspaces" data-content="The workspace button switches between the various workspaces a user has access to.">1</button>
	</div>
	
	<div class="row">
		<div class="span10">
			<a href="http://demo.data-sutra.com/" target="_blank" class="btn btn-block btn-default" style="width:100%;">Try it live on U.S. demo server</a>
			
			<!-- <button class="btn btn-block btn-default" style="width:100%;">Try it live on U.S. demo server</button> -->
		</div>
	</div>
	
</div>

<!--
	<div class="section" id="news">
		<div class="page-header">
			<h2>News</h2>
		</div>
		<div class="carousel slide" id="news-carousel">
			<div class="carousel-inner">
				
				<!-- item 
				<div class="item active">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/vector/newspaper.png"/></a></div>
						<div class="span7 news-description">
							<h3>Data Sutra 4.0.2 released</h3>
							<p class="text-warning">March 21, 2013</p>
							<p>Key features of this release include:</p>
							<ul>
								<li>Version 2 of our router: link directly to records now</li>
								<li>Reporting enhancements: creating reports for web viewing easier than ever</li>
								<li>UI and speed tweaks: continuing to make Servoy hum</li>
							</ul>
							<p>Detailed release notes <a href="http://community.data-sutra.com/projects/datasutra/wiki/402">here.</a></p>
						</div>
					</div>
				</div>	
				<!-- /item 
				
				
				<!-- item 
				<div class="item">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/vector/newspaper.png"/></a></div>
						<div class="span7 news-description">
							<h3>Data Sutra 4.0.1 released</h3>
							<p class="text-warning">February 18, 2013</p>
							<p>Key features of this release include:</p>
							<ul>
								<li>brand new rockin' pdf viewer</li>
								<li>browser compatibility additions</li>
								<li>css changes and minor fixes</li>
							</ul>
							<p>Detailed release notes <a href="http://community.data-sutra.com/projects/datasutra/wiki/401">here.</a></p>
						</div>
					</div>
				</div>	
				<!-- /item 
				
				<!-- item 
				<div class="item">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/vector/newspaper.png"/></a></div>
						<div class="span7 news-description">
							<h3>Web Starter Package released</h3>
							<p class="text-warning">February 6, 2013</p>
							<p>Looking to get over the Rich Internet Application hurdle? Fast-track your apps to the web!</p>
							<p><b>Who it is for</b><br />New and current Servoy developers needing to get up to speed with web development.</p>
							<p><b>What you accomplish</b><br />Develop a working web application and deploy on a real server&mdash;the right way.</p>
							<p><b>What you get</b><br />Five 2-hour one-on-one training sessions, a testing/staging server (very very fast) for six months, and two hours of tech support.</p>
							<p>Go to <a href="http://www.data-sutra.com/starter-package">http://www.data-sutra.com/starter-package</a> for full package details.</p>
						</div>
					</div>
				</div>	
				<!-- /item 
				
				<!-- item 
				<div class="item">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/vector/newspaper.png"/></a></div>
						<div class="span7 news-description">
							<h3>Data Sutra 4.0 released!</h3>
							<p class="text-warning">January 16, 2013</p>
							<p>Key features of this release include:</p>
							<ul>
								<li>awesome new web client for desktop and tablets</li>
								<li>major update of the UI</li>
								<li>exclusive web customizations and improvements to Servoy web client</li>
								<li>for Servoy 6.1.3 and up</li>
								<li>a dedicated website</li>
							</ul>
							<p>Try it now: <a href="http://demo.data-sutra.com/">US Demo Server</a> | <a href="http://europe.data-sutra.com/">Europe Demo Server</a></p>
							<p>Huge thanks to all of the testers who have thrashed on our code over the past six months. Sometimes from devices we didn't even know existed (an Android treadmill&mdash;really?!). Troy and I are profoundly greatful for your willingness to contribute and the breadth of expertise you brought to this release. Without all your help, we'd probably be stuck right now on something totally unimportant.</p> 
						</div>
					</div>
				</div>	
				<!-- /item 
			
				<!-- item 
				<div class="item">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/vector/newspaper.png"/></a></div>
						<div class="span7 news-description">
							<h3>UI update in final testing</h3>
							<p class="text-warning">January 9, 2013</p>
							<p>Stuff to test:</p>
							<ul>
								<li>record navigator (shows correct position)</li>
								<li>form in dialogs (much better looking now) // orders >> toggle status action</li>
								<li>new feedback (pretty obvious where it's at...)</li>
								<li>UL performance (a nice fade in so it seems faster)</li>
								<li>iPad (add to home screen to see our new logo)</li>
								<li>font corrections for type aheads, combos, text areas (had to override what servoy spits out) // customer >> industry field</li>
								</ul>
							<p>Test server: <a href="http://demo.data-sutra.com/">http://demo.data-sutra.com/</a></p>
							
						</div>
					</div>
				</div>	
				<!-- /item 
				
				<!-- item 
				<div class="item">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/vector/newspaper.png"/></a></div>
						<div class="span7 news-description">
							<h3>Hacking Servoy's Calendar Picker</h3>
							<p class="text-warning">January 3, 2013</p>
							<p>Servoy's web client calendar picker is an easy target to make fun of&mdash;the last time it looked even somewhat passable was probably 15 years ago. So we redid it:</p>
							<img class="img-polaroid" src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/news/cal-picker-new.png"/>
							<p>Read the rest of the article over at <a href="http://www.servoymagazine.com/home/2013/01/hacking-servoys-calendar-picker.html">Servoy Magazine</a></p>
							
						</div>
					</div>
				</div>	
				<!-- /item 
			
			</div>
			<a class="carousel-control left" href="#news-carousel" data-slide="prev">&lsaquo;</a>
			<a class="carousel-control right" href="#news-carousel" data-slide="next">&rsaquo;</a>
		</div>
	
	</div>
	
-->
	
	
	

	<div class="section" id="about">
		<div class="page-header">
			<h2>Data Sutra is awesome sauce</h2>

		</div>
		
		<div class="row feature">
		<div class="span3 icons"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/check-box.png"/></div>
			<div class="span7 feature-description">
				<h2>Everything you need to build a great app</h2>
				<p>Why are there so many garbage apps in the world?</p>
				<p>Simple. You start out with the intent of solving a problem and soon find out that you need all this &ldquo;other stuff&rdquo;: navigation, security, integration with external data sources, good looking templates, easy deployment, etc.</p>
				<p>Data Sutra is the result of 1,000's of hours spent on the &ldquo;other stuff&rdquo;. The grunt work has been done for you.</p>
				<p class="text-info"><strong>Spend your time solving problems, not coding app stuff</strong></p>
			</div>
		</div>
		
		<div class="row feature">
		<div class="span3 icons"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/favorite-add.png"/></div>
			<div class="span7 feature-description">
				<h2>A great UX easily adopted by your users</h2>
				<p>Data Sutra has a familiar and intuitive "consumer" application layout and functionality. Adaptive workspaces, screen and record navigation, configurable lists, contextual menus, centralized searching, filter engine, inline help system, main workflow area, sidebar workflow area, accessible reports &mdash; all consistently organized and styled with our "grid" theme.</p>
				<p>The result is no clutter, no digging &mdash; everything is at your fingertips and easily discoverable. The eye naturally flows across the screen to pick out relevant information immediately. And when that extra bit of help is needed, inline help and tooltips are right where they are needed.</p>
				<p class="text-info"><strong>Reduce user training and accelerate adoption rates</strong></p>
			</div>
		</div>
		
		<div class="row feature">
		<div class="span3 icons"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/toolbox.png"/></div>
			<div class="span7 feature-description">
				<h2>Extreme power out-of-the-box</h2>
				<p>Data Sutra comes includes tons of stuff you don't have to code: layout manager, navigation manager, record navigator, solution preferences, user created lists, fast find, find and replace, action menus, filter builder, automatic transactions, report manager, toolbars, sidebars, user preferences, value list manager, tooltip manager, inline user feedback, i18n manager, code library, API, Grid theme, form templates, sample solutions, meta data reports, large solution organization guidelines and pluggable architecture, smart and web client, advanced UX, etc.</p>
				<p class="text-info"><strong>Be productive immediately</strong></p>
			</div>
		</div>
		
		<div class="row feature">
		<div class="span3 icons"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/power.png"/></div>
			<div class="span7 feature-description">
				<h2>Exclusive web client customizations</h2>
				<p>Data Sutra implements many of the latest html5 techniques that go beyond what Servoy offers. Customizations include: browser and platform detection, a rockin' date picker, wrappers for various browsers and platforms, elegant spinner notification for blocking actions, registration and login widgets to include on external websites, "pretty" URLs, unique URLs for each screen and record, browser history buttons enabled, google analytics, scrollbar styling, URL rewrites for SaaS deployments, session tracking, report preview and printing, etc.</p>
				<p class="text-info"><strong>You get the latest bells and whistles</strong></p>
			</div>
		</div>
		
		<div class="row feature">
		<div class="span3 icons"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/plugin.png"/></div>
			<div class="span7 feature-description">
				<h2>Pluggable pre-built applications</h2>
				<p>There is a growing collection of 3rd party modules for various business tasks (CRM, CMS, mailers, documents, charting, etc) that you can plug into your solution.</p>
				<p class="text-info"><strong>As if Data Sutra wasn't enough of a head start</strong></p>
			</div>
		</div>
		
		<div class="row feature">
		<div class="span3 icons"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/security.png"/></div>
			<div class="span7 feature-description">
				<h2>Security in a mobile world</h2>
				<p>Our security module implements a robust 3-tier restriction plan: views, records and functionality. With our management screens, you can quickly assign what a user can see, what records they have access to, and what they can do while there.</p>
				<p>To this we added SaaS deployment capability with our organization and user abstraction, bank-level password controls, connection to external users store, logging of all user actions, realtime session monitoring, and a login widget to include on external websites.</p>
				<p>Lastly, your data is encrypted from point to point via HTTPS.</p>
				<p class="text-info"><strong>Rest secure...it&rsquo;s taken care of</strong></p>
			</div>
		</div>
		
		<div class="row feature">
		<div class="span3 icons"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/tool.png"/></div>
			<div class="span7 feature-description">
				<h2>Servoy</h2>
				<p>A full featured IDE with a visual form editor and server-side java script. Debugger, team sharing, code hints and warnings, large collection of native plugins, access to all eclipse plugins, JDBC connect to all databases, etc. Servoy's <a href="http://www.servoy.com">website</a>.</p>
				<p class="text-info"><strong>Spend your time developing</strong></p>
			</div>
		</div>
		
		<div class="row feature">
		<div class="span3 icons"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/cloud.png"/></div>
			<div class="span7 feature-description">
				<h2>Flexible deployment</h2>
				<p>Deploy to many users and many organizations (SaaS) from the cloud or on premise. Use any SQL database (MySQL, PostgreSQL, Oracle, etc). Run from any Java server (Tomcat, JBoss, Jetty, WebSphere, etc).</p>
				<p class="text-info"><strong>Leverage your existing assets</strong></p>
			</div>
		</div>
		
		<div class="row feature">
		<div class="span3 icons"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/magic-wand.png"/></div>
			<div class="span7 feature-description">
				<h2>Low barrier of entry</h2>
				<p>New to Servoy? Need to get knock something out fast? Don't know where to start with a large project?</p>
				<p>With our many templates, code examples, built-in functionality, design patterns, coding conventions and modular concepts &mdash; Data Sutra significantly reduces your development learning curve and encourages good development practices.</p>
				<p class="text-info"><strong>Go ahead, build a great application...the first time</strong></p>
			</div>
		</div>
		
	</div>
	

	<!-- <div class="section" id="licensing">
		<div class="page-header">
			<h2>Licensing
				<a href="#faq" style="float:right;" class="btn btn-success"><i class="icon-white icon-question-sign"></i> FAQ</a>
			</h2>
		</div>
		
		<div class="feature-description">
			<p>Data Sutra uses a "dual licensing" business model which means that the same code is released under two different licenses. This licensing model is based on the principle of fair exchange:</p>
		</div>
		<br/>

		<table width="100%" class="table">
			<tbody>
				<tr>
					<th width="40%" style="border-top: none;">&nbsp;</th>
					<th width="30%" style="border-top: none;"><h3>Open Source</h3></th>
					<th width="30%" style="border-top: none;"><h3>Premium</h3></th>
				</tr>				
				<tr>
					<td>License</td>
					<td><h4 style="color:#7bb543;">AGPL v3</h4></td>
					<td><h4 style="color:#ca3e42;">Commercial</h4></td>
				</tr>			
				<tr>
					<td>Unlimited development</td>
					<td><h4><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/green-check.png"/></h4></td>
					<td><h4><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/red-check.png"/></h4></td>
				</tr>				
				<tr>
					<td>Unlimited open source deployment</td>
					<td><h4><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/green-check.png"/></h4></td>
					<td><h4><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/red-check.png"/></h4></td>
				</tr>
				<tr>
					<td>Unlimited commercial deployment</td>
					<td>&nbsp;</td>
					<td><h4><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/red-check.png"/></h4></td>
				</tr>
				<tr>
					<td>Hosted testing server (5 users)</td>
					<td>
						<h4 style="color:#7bb543;">$150/month</h4>
						<form style="margin-bottom:0;"action="https://www.paypal.com/cgi-bin/webscr" method="post">
						<input type="hidden" name="cmd" value="_s-xclick">
						<input type="hidden" name="hosted_button_id" value="3EHQJ36FYVZ2A">
						<input type="image" src="http://www.data-mosaic.com/external/pp_purchase.png" border="0" name="submit">
						<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
						</form>
					</td>
					<td>
						<h4 style="color:#ca3e42;">$50/month</h4>
						<form style="margin-bottom:0;"action="https://www.paypal.com/cgi-bin/webscr" method="post">
						<input type="hidden" name="cmd" value="_s-xclick">
						<input type="hidden" name="hosted_button_id" value="F5RDD4U6N4NKA">
						<input type="image" src="http://www.data-mosaic.com/external/pp_purchase.png" border="0" name="submit">
						<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
						</form>
					</td>
				</tr>		
				<tr>
					<td>Forum support</td>
					<td><h4><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/green-check.png"/></h4></td>
					<td><h4><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/red-check.png"/></h4></td>
				</tr>
				<tr>
					<td>Premium forum support</td>
					<td>&nbsp;</td>
					<td><h4><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/red-check.png"/></h4></td>
				</tr>
				<tr>
					<td>Code obfuscation (IP protection)</td>
					<td></td>
					<td><h4 style="color:#ca3e42;">$150/module</h4></td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<th valign="top" style="vertical-align: top;"><h3 style="color:#7bb543;">Free</h3></th>
					<th>
						<h3 style="line-height: 1.1em;word-wrap:break-word;"><span style="color:#ca3e42;">$25</span> /developer /month<br/>
						w/ annual commitment<br/>
						or $35 /developer /month, month-to-month</p></h3>
					</th>
				</tr>				
				<tr>
					<td></td>
					<td>
						<a href="http://www.gnu.org/licenses/agpl-3.0.html" class="btn btn-info">License</a>
						<p style="margin-top:3px;"><a href="http://community.data-sutra.com/projects/datasutra/files" class="btn btn-success">Download</a></p>
					</td>
					<td>
						<a href="http://community.data-sutra.com/projects/datasutra/wiki/Premium_license" class="btn btn-info">License</a>
						<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
						<input type="hidden" name="cmd" value="_s-xclick">
						<input type="hidden" name="hosted_button_id" value="U2NR848T52XVA">
						<input type="hidden" name="currency_code" value="USD">
						<input type="hidden" name="on0" value="">
						<input type="image" style="vertical-align: top;" src="http://www.data-mosaic.com/external/pp_purchase.png" name="submit" alt="PayPal - The safer, easier way to pay online!">
						<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">						
						<select name="os0" style="margin-top:3px;">
							<option value="Monthly">Monthly : $35.00 USD</option>
							<option value="Yearly">Yearly : $300.00 USD</option>
						</select>	
						</form>
											
					</td>			
				</tr>	
			</tbody>
		</table>
		<div class="feature-description">
			<h4>Notes</h4>
			<p>If you are using Data Sutra commercially &mdash; that is, for creating proprietary software for sale or use in a commercial setting &mdash; you must purchase premium licenses for each developer.</p>

			<p>Alternatively, if you wish to write open source software you can use the open source version of Data Sutra. If you use the open source version you must release your application and complete source code under the AGPL as well.</p>
			
			<p>Please refer to our <a href="#faq">FAQ</a> for additional licensing questions.</p>
		</div>
			
	</div>	 -->
	
	<!-- faq
	<div class="section" id="faq">
		<div class="page-header">
			<h2>FAQ</h2>
		</div>
		
		<div class="feature-description">	
			<div class="accordion" id="basic-accordion">
				<div class="accordian-section">
					<h5 class="text-info">General</h5>
				</div>
				

			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#faq1">
			         What is Data Sutra?
			       </a>
			     </div>
			     <div id="faq1" class="accordion-body collapse">
			       <div class="accordion-inner">
			         <p>Data Sutra is a complete business application management platform for Servoy. It provides structure, organization, functionality & GUI for your Servoy solutions. And it has been honed and tested against many projects, developers and clients.</p>
					 <p>Value to you?</p>
					 <p>1. Code right the first time<br />
					 2. Minimize unforeseen hurdles<br />
					 3. Focus on just building your workflows<br /></p>		 		 
					 <p>Everything you need to build great apps!</p>										 
			       </div>
			     </div>
			   </div>
			
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#faq2">
			         What does Data Sutra include?
			       </a>
			     </div>
			     <div id="faq2" class="accordion-body collapse">
			       <div class="accordion-inner">
			         <p>Data Sutra comes with a comprehensive collection of frameworks, helper functions, resources, and templates that give you all the tools necessary to easily and rapidly build quality business applications with Servoy.</p>
			    	<p>The list includes: layout manager, navigation manager, record navigator, solution preferences, user created lists, fast find, find and replace, action menus, filter builder, report manager, toolbars, sidebars, login, password controls, screen restrictions, record restrictions, action restrictions, organizations, users, groups, action logging, user preferences, value list manager, tooltip manager, inline user feedback, i18n manager, code library, API, Grid theme, form templates, sample solutions, meta data reports, large solution organization guidelines and pluggable architecture, smart and web client, advanced UX, etc.</p>
					<p>Custom web client features that go beyond what Servoy offers include: browser and platform detection, custom wrappers for various browsers and platforms, elegant spinner notification for blocking actions, registration and login widgets to include on external websites, "pretty" URLs, browser history buttons enabled, google analytics, scrollable grids, URL rewrites for SaaS deployments, session tracking, etc.</p>
					<p>Additionally, there is a growing collection of 3rd party modules for various business tasks (CRM, CMS, mailers, documents, etc) that you can plug into your solution to start from an even more advanced point.</p>
			       </div>
			     </div>
			   </div>
				
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#faq3">
			         What does Data Sutra NOT include?
			       </a>
			     </div>
			     <div id="faq3" class="accordion-body collapse">
			       <div class="accordion-inner">
			         <p>Your business workflow screens. And a toaster.</p>
			       </div>
			     </div>
			   </div>
				
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#fw-theming">
			         Can I re-skin/brand Data Sutra?
			       </a>
			     </div>
			     <div id="fw-theming" class="accordion-body collapse">
			       <div class="accordion-inner">
					<p>Data Sutra comes with a number of branding configuration data points such as title bar text, company logo and basic color scheme choosers.</p>
					<p>Additionally, our style sheets and custom client-side code abstract out the look and feel of the web client well beyond what Servoy is capable of natively. If you are a developer with an eye for this sort of thing, modifying our CSS is a relatively easy task.</p>
			       </div>
			     </div>
			   </div>

			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#fw-browsers">
			         What browsers does Data Sutra work with?
			       </a>
			     </div>
			     <div id="fw-browsers" class="accordion-body collapse">
			       <div class="accordion-inner">
					<p>All the latest versions of Google Chrome, Safari, Firefox, Opera, and IE 9+. Also iPads and tablets running recent versions of Android.</p>
			       </div>
			     </div>
			   </div>

			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#fw-mobile">
			         What mobile devices does Data Sutra work with?
			       </a>
			     </div>
			     <div id="fw-mobile" class="accordion-body collapse">
			       <div class="accordion-inner">
					<p>Tablets can use the same Data Sutra Grid theme as the desktop and are fully supported to the extent that we have tablet-only css and functional code (prompt on iPad to save as a favorite for example). Tablet clients are live connected to the server and data broadcast with all normal web and smart clients.</p>
					<p>The phone form factor is also supported by Data Sutra via our REST API's. This allows you to use <a href="http://www.sencha.com/products/touch">Sencha Touch</a>, <a href="http://www.kendoui.com/mobile.aspx">KendoUI Mobile</a>, <a href="http://jquerymobile.com/">JQuery Mobile</a>, <a href="http://enyojs.com/">Enjo</a>, etc for your client.</p>
					<p>In a pinch, the Data Sutra Grid theme will load up on most of the high-end smart phones but we do not recommend it as your default approach as the Grid theme is not optimized for these devices.</p>
			       </div>
			     </div>
			   </div>
				
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#ds-smart-client">
			         Does Smart Client still work?
			       </a>
			     </div>
			     <div id="ds-smart-client" class="accordion-body collapse">
			       <div class="accordion-inner">
			         <p>Smart Client is an option and we still use it all the time on projects. However, as browser capabilities as a rich client have rapidly increased in recent years, we have shifted our focus to the web and mobile clients.</p>
			       </div>
			     </div>
			   </div>
				
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#faq4">
			         What is Servoy?
			       </a>
			     </div>
			     <div id="faq4" class="accordion-body collapse">
			       <div class="accordion-inner">
			         <p>Data Sutra is written using the application development and deployment product: Servoy. It gives you forms-based development, business coding in javascript, debugger, write and test without the build step, access to all JDBC databases, smart client and web client deployment, etc.</p>
					<p>Head on over to <a href="http://www.servoy">Servoy's website</a> for complete information.</p>
			       </div>
			     </div>
			   </div>
				
				
				<div class="accordian-section">
					<h5 class="text-info">Support</h5>
				</div>
				
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#support1">
			         What kind of support is available?
			       </a>
			     </div>
			     <div id="support1" class="accordion-body collapse">
			       <div class="accordion-inner">
			         <p>If you are using the open source license, we have a general forum. For our commercial users, we have an additional premium forum.</p>
					 <p>We also offer two pre-paid support packages: $150/hour and $1,200/10 hours.
			       </div>
			     </div>
			   </div>
				
				<div class="accordian-section">
					<h5 class="text-info">Why Data Sutra</h5>
				</div>			
				
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#fw-comparison">
			         How is Data Sutra different from other Servoy-based application frameworks?
			       </a>
			     </div>
			     <div id="fw-comparison" class="accordion-body collapse">
			       <div class="accordion-inner">
					<p>Application frameworks exist to solve common developer tasks such as navigation, layout, access and control, searching, reporting, etc.&mdash;the list goes on and on.</p>
					<p>In comparison to "light" frameworks such as <a href="https://www.servoyforge.net/projects/servoy-commons">Servoy Commons</a>, the most noticable difference is the breadth and scope of Data Sutra.</p>
					<p>In comparison to other full-featured frameworks, we feel that our UX is vastly superior; our components such as security and searching are more powerful yet much simpler to configure; our sandboxing approach allows us to upgrade Data Sutra for everyone without messing up your code, and our web client specific customizations are not found anywhere else in the industry.</p>
					<p>Our pride and obsessive attention to detail is apparent in Data Sutra.</p>
			       </div>
			     </div>
			   </div>
				
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#ds-history">
			         How long has Data Sutra been around?
			       </a>
			     </div>
			     <div id="ds-history" class="accordion-body collapse">
			       <div class="accordion-inner">
					<p>Data Sutra came about eight years ago from the need to develop multiple client projects at the same time. Originally we called it &quot;Mosaic Frameworks for Servoy&quot; and it was a Smart Client only product. Version 4 brings Data Sutra applications to web browsers and mobile devices.</p>
			       </div>
			     </div>
			   </div>
				
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#dm-dudes">
			         Who are you guys?
			       </a>
			     </div>
			     <div id="dm-dudes" class="accordion-body collapse">
			       <div class="accordion-inner">
					<p>Hi, I'm David and that is Troy there scrunched over a computer in a coffee shop on Planet X somewhere. We're the founders of <a href="http://www.data-mosaic.com">Data Mosaic</a> and your esteemed developers of <a href="http://www.data-sutra.com">Data Sutra</a>.</p>
					<p>We've been developing with Servoy since before it was publicaly released 10+ years ago. You may know us from the 100's of <a href="http://forum.servoy.com">Servoy forum</a> posts over the years, the creators and publishers of <a href="http://www.servoymagazine.com">Servoy Magazine</a>, our <a href="http://www.youtube.com/datamosaic">YouTube channel</a>, regular speakers at Servoy conferences, or out <a href="http://www.more-mtb.org/">hammering single track</a>.</p>
					<div class="span1">&nbsp;</div>
					<div class="span4 pagination-centered"><img class="img-rounded" title="David"  src="<%=(String)request.getAttribute("themeDirectory")%>/library/images/david.png"/></div>
					<div class="span4 pagination-centered"><img class="img-rounded" title="Troy"  src="<%=(String)request.getAttribute("themeDirectory")%>/library/images/troy2.jpg"/></div>
			       </div>
			     </div>
			   </div>
			   
			   <div class="accordion-group">
			     <div class="accordion-heading">
			       <a class="accordion-toggle" data-toggle="collapse" data-parent="#basic-accordion" href="#ds-confused">
			         Why am I still reading this?
			       </a>
			     </div>
			     <div id="ds-confused" class="accordion-body collapse">
			       <div class="accordion-inner">
					<div class="span4 pagination-centered"><img class="img-rounded" title="Spit happens"  src="<%=(String)request.getAttribute("themeDirectory")%>/library/images/spit-happens.jpg"/></div>
			       </div>
			     </div>
			   </div>

				
			 </div>			
		</div>
	</div>
	end faq -->	
	
	
	
	  	
	
	<div class="section" id="testimonials">
		<div class="page-header">
			<h2>What people are saying</h2>
		</div>
		<div class="carousel slide" id="testimonial-carousel">
			<div class="carousel-inner">
				
				<div class="item active">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/announcement-flip.png"/></a></div>
						<div class="span7 testimonial-description">
							<em>&ldquo;Data Mosaic helped me work out coding strategies that depend on heavy-duty mathematical calculations applied to thousands of records. Instead of 23 seconds, they now take 1.7 seconds &mdash; invaluable! These guys are far beyond brilliant and are the best help money can buy.&rdquo;</em>
							<p>
								- Ellen Meserow<br/>
								Meserow Consulting<br/>
							</p>
						</div>
					</div>
				</div>
				
				<div class="item">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/announcement-flip.png"/></a></div>
						<div class="span7 testimonial-description">
							<em>&ldquo;Ok guys, really&mdash;where did you steal this application framework from? The level of polish on this is insane. Excellent!&rdquo;</em>
							<p>
								- Lachlan Dunlop<br/>
								President<br/>
								lach dot net
							</p>
						</div>
					</div>
				</div>
				
				<div class="item">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/announcement-flip.png"/></a></div>
						<div class="span7 testimonial-description">
							<em>&ldquo;Data Sutra is a supercharger for Servoy RAD! A monumental leap forward in RAD methodologies enabling direct connection with our customers. The ROI is at least 100-fold in time saved.&rdquo;</em>
							<p>
								- Tom Parry<br/>
								President<br/>
								Prospect IT Consulting Inc.
							</p>
						</div>
					</div>
				</div>
				
				<div class="item">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/announcement-flip.png"/></a></div>
						<div class="span7 testimonial-description">
							<em>&ldquo;The guys at Data Mosaic are impressive. On a very complicated project they are always two steps ahead of us and everything is extremely well thought out &mdash; their experience shows! With Data Sutra as the starting point, not only are we saving weeks of development time, I was also able to contribute with apps of my own in a matter of days even as a php programmer.&rdquo;</em>
							<p>
								- David Kaufman<br/>
								Westwind Wood Specialties
							</p>
						</div>
					</div>
				</div>
				
				<div class="item">
					<div class="testimonial row">
						<div class="span2 icons"><a class="thumbnail span1"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/about/announcement-flip.png"/></a></div>
						<div class="span7 testimonial-description">
							<em>&ldquo;It looks good, I like! And all the extra java script stuff...you guys are CRAZY! ;-)<br /><br />

							I LOVE your custom combo boxes. Can I implement that into the ServoyForge alternative CSS project?&rdquo;</em>
							<p>
								- Harjo Kompagnie<br/>
								CEO<br/>
								<a href="http://www.directict.nl/">Direct ICT</a>
							</p>
						</div>
					</div>
				</div>
				
			</div>
			<a class="carousel-control left" href="#testimonial-carousel" data-slide="prev">&lsaquo;</a>
			<a class="carousel-control right" href="#testimonial-carousel" data-slide="next">&rsaquo;</a>
		</div>
		
	</div> 

	<div class="section" id="contact">
		<div class="page-header"><h2>Contact</h2></div>
		<div class=" row">
				<div class="span6">
					<div id="contactSuccess" class="alert alert-success hide" style="color: black;">Thank you for contacting us! We'll be in touch soon.</div>
					<form class="form-horizontal" id="contactFrm">
						<fieldset>
							<legend>Write to us</legend>
							<div class="control-group">
								<label for="name">Name</label>
								<div class="controls">
									<input type="text" name="name" id="name" class="required input-xlarge"/>
								</div>
							</div>
							<div class="control-group">
								<label for="email">Email</label>
								<div class="controls">
									<input type="email" name="email" id="email" class="required email input-xlarge"/>
								</div>
							</div>
							<div class="control-group">
								<label for="message">Message</label>
								<div class="controls">
									<textarea  name="message" id="message" class="required input-xlarge" rows="8"></textarea>
								</div>
							</div>
							<div class="form-actions">
								<button type="submit" class="btn btn-success">Get in touch</button>
							</div>
						</fieldset>
					</form>
				</div>
				
				<div id="contact-info" class="span6"><img src="<%=(String)request.getAttribute("themeDirectory")%>/library/img/vector/phone.png"/>
					<h1 style="font-size:2em;"><br/>+1 202 573 9669</h1><p>Call anytime</p>
				</div>
				
					
			</div>


			<footer class="footer" style="float: left;">
	
			<a href="https://twitter.com/datamosaic" class="twitter-follow-button" data-show-count="false" data-show-screen-name="false" data-align="left">Follow @datasutra</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		<p>Data Sutra is an open source project of Data Mosaic. &copy; Copyright 2013 <a href="http://www.data-mosaic.com/">Data Mosaic, LLC</a>.</p>
	</footer>

</div> <!-- container -->
	</div>
	<script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/jquery.min.js"></script>
	<script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/modernizr.js"></script>
	<script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap.js"></script>
 	<script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-transition.js"></script>
    <!-- <script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-alert.js"></script> -->
    <!-- <script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-modal.js"></script> -->
    <!-- <script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-dropdown.js"></script> -->
    <script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-tooltip.js"></script>
    <script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-popover.js"></script>
    <script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-button.js"></script>
    <script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-collapse.js"></script>
    <!-- <script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-carousel.js"></script> -->
	<script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/bootstrap-tab.js"></script>
    <script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/jquery.scrollTo-min.js"></script>
	<script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/jquery.lightbox.js"></script>
	<script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/plugins/validate/jquery.validate.js"></script>
	<script src="<%=(String)request.getAttribute("themeDirectory")%>/library/js/plugins/validate/additional-methods.js"></script>

    <script>

		// page transition (http://www.onextrapixel.com/2010/02/23/how-to-use-jquery-to-make-slick-page-transitions/)
		/* $("body").css("display", "none");
		$("body").fadeIn(500);
		
		$("a.transition").click(function(event){
		        event.preventDefault();
		        linkLocation = this.href;
		        $("body").fadeOut(200, redirectPage);      
		    }); 
		
 		function redirectPage() {
		        window.location = linkLocation;
		    } */
		
		// accordion (faq)
		$('.accordion').on('show', function (e) {
	         $(e.target).prev('.accordion-heading').parent ().addClass('open');
	    });

	    $('.accordion').on('hide', function (e) {
	        $(this).find('.accordion-toggle').not($(e.target)).parents ('.accordion-group').removeClass('open');
	    });

	    $('.accordion').each (function () {	    	
	    	$(this).find ('.accordion-body.in').parent ().addClass ('open');
	    });


		// section sizing
		$(".section").css("min-height",$(window).height() - 100);
		
		// $("#testimonials").css("min-height",325);
		$("#contact").css("min-height",350);
		
		$('#contactFrm').validate();
		
		$("#contactFrm").submit(function(){			
			
			// if valid
			if ( $('#contactFrm').valid() ) {
			
				$.post(
					"cntl/contact_us.jsp",
					"name=" + $("#name").val() + "&message=" + $("#message").val() + "&email=" + $("#email").val(),
					function(){
						$("#contactSuccess").show(250);
						$("#message,#email,#name").val("");
					}
				);
				return false;
			}
		});
		
		
		$(".screenshot").each(function(i,element){
			var _element = $(element);
			// $(element).css("background","url(<%=(String)request.getAttribute("themeDirectory")%>/library/tour/" + _element.attr("id") + ".png)")
			// .css("background-repeat","no-repeat");
			_element.find("button").each(function(j,button){
				var _button = $(button);
				_button.css({left:_button.attr("data-x") + "px",top:_button.attr("data-y") + "px"});
			});
		});
		$(".screenshot").hide();
		$(".screenshot:first").show();
		
		$("#screenshotNav>li").click(function(){
			var screenshot = $(this).attr("data-screenshot");
			$(".screenshot").hide();
			$("#screenshotNav>li").removeClass("active");
			$(this).addClass("active");
			$("#" + screenshot).show(200);
		});
		

    	$("[rel='popover']").popover();
    	$("#testimonial-carousel").carousel({interval: 5000});

		// scrollTo
    	if(!$.browser.msie){
	    	$("a").click(function(e){
	    		var attr = $(this).attr("href");
	    		if(($(this).attr("href").substr(0,1) == "#") 
					&& !$(this).hasClass("carousel-control") 
					&& !$(this).hasClass("accordion-toggle") ){
		    			e.preventDefault();
		    			$.scrollTo(attr,500);
		    			var myThis = this;
		    			setTimeout(function(){window.location=$(myThis).attr("href");},500);
	    		}
	    	});
		};
		
		// lightbox initialize
		jQuery(document).ready(function($){
			$('.lightbox').lightbox();
		});
				
		// tour
		// $("#screenie").show();
		
    </script>
	

</body>
</html>
