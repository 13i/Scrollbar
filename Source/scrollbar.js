
var Scrollbar = new Class({
    Implements: Options,
	options: {
		speed: 10,
		inrterval: 100
	},
	element: null,
	initialize: function(element, options){
		if(!element) return;
		this.setOptions(options);
		this.element = element;
		this.element.store('MooScroll', this);
		return this.prepare();
	},
	prepare: function(){
		this.element.setStyles({'overflow': 'hidden', 'position': 'relative'});
		
		var html = this.element.get('html');
		this.element.empty();
		
		this.scroller = new Element('div', { 'class': 'MooScroll' });
		this.scroller.tarrow = new Element('div', {'class': 'MooScroll-tarrow'}).inject(this.scroller);
		this.scroller.scrollbar = new Element('div', {'class': 'MooScroll-scrollbar'}).inject(this.scroller);
		this.scroller.button = new Element('div', {'class': 'MooScroll-button'}).inject(this.scroller.scrollbar);
		this.scroller.barrow = new Element('div', {'class': 'MooScroll-barrow'}).inject(this.scroller);
		this.scroller.inject(this.element);
		
		this.content = new Element('div', {'class': 'MooScroll-content'});
		this.content.fx = new Fx.Tween(this.content, { property: 'top', link: 'cancel', duration: 'short' });
		new Element('div', {'class' : 'MooScroll-contentInner', html: html}).inject(this.content);
		this.content.inject(this.element);
		
		var contentHeight = this.content.getSize().y;
		var elementHeight = this.element.getSize().y;
		
		this.maxTop = -(contentHeight - elementHeight);
		
		this.scroller.barrow.addEvents({
			'mousedown': function(e){
				e.preventDefault();
				this.timer = this.down.periodical(this.options.interval, this);
			}.bind(this),
			'mouseup': function(e){
				e.preventDefault();
				clearInterval(this.timer);
			}.bind(this)
		});
		this.scroller.tarrow.addEvents({
			'mousedown': function(e){
				e.preventDefault();
				this.timer = this.up.periodical(this.options.interval, this);
			}.bind(this),
			'mouseup': function(e){
				e.preventDefault();
				clearInterval(this.timer);
			}.bind(this)
		});
		
		return this;
	},
	down: function(){
		var top = this.content.getStyle('top').toInt()-this.options.speed;
		if(top <= this.maxTop) top = this.maxTop;
		this.content.setStyle('top', top);
	},
	up: function(){
		var top = this.content.getStyle('top').toInt()+this.options.speed;
		if(top > 0) top = 0;
		this.content.setStyle('top', top);
	}
});