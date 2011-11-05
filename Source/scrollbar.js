
var Scrollbar = new Class({
    Implements: Options,
    options: {
        // Number of pixels the contents moves up adns down
		step: 10,
        // Interval between 2 moves
		inrterval: 100
	},
	element: null,
    timer: null,
    sizes: {},
    top: 0,
	initialize: function(element, options){
		if(!element) return;
		this.setOptions(options);
		this.element = element;
		this.element.store('MooScroll', this);
		return this.prepare();
	},
	prepare: function(){
		this.element.setStyles({'overflow': 'hidden', 'position': 'relative'});
		
        // Retrieve content
		var html = this.element.get('html');
		this.element.empty();
		
        // Create scrollbar layout
		this.scroller = new Element('div', { 'class': 'MooScroll' });
		this.scroller.tarrow = new Element('div', {'class': 'MooScroll-tarrow'}).inject(this.scroller);
        this.scroller.scrollbar = new Element('div', {'class': 'MooScroll-scrollbar'}).inject(this.scroller);
        this.scroller.scrollbarInner = new Element('div', {'class': 'MooScroll-scrollbarInner'}).inject(this.scroller.scrollbar);
		this.scroller.button = new Element('div', {'class': 'MooScroll-button'}).inject(this.scroller.scrollbarInner);
		this.scroller.barrow = new Element('div', {'class': 'MooScroll-barrow'}).inject(this.scroller);
		this.scroller.inject(this.element);
		
        // Create content layout
		this.content = new Element('div', {'class': 'MooScroll-content'});
		this.content.fx = new Fx.Tween(this.content, { property: 'top', link: 'cancel', duration: 'short' });
		new Element('div', {'class' : 'MooScroll-contentInner', html: html}).inject(this.content);
		this.content.inject(this.element);
        
        this.update();
		
        // Add events to scrollbar
		this.scroller.barrow.addEvents({
			'mousedown': function(e){
				e.preventDefault();
				this.timer = this.moveOf.periodical(this.options.interval, this, -this.options.step);
			}.bind(this),
			'mouseup': function(e){
				e.preventDefault();
				clearInterval(this.timer);
			}.bind(this)
		});
		this.scroller.tarrow.addEvents({
			'mousedown': function(e){
				e.preventDefault();
				this.timer = this.moveOf.periodical(this.options.interval, this, this.options.step);
			}.bind(this),
			'mouseup': function(e){
				e.preventDefault();
				clearInterval(this.timer);
			}.bind(this)
		});
		
		return this;
	},
    moveOf: function(distance){
        var distance = [distance, 0].pick(),
            newTop = this.top + distance;
        this.moveTo(newTop);
        return this;
    },
    moveTo: function(top){
        var sizes = this.sizes;
        top = top.limit(sizes.maxTop, 0);
        var buttonTop = (-top*sizes.ratio).limit(0, sizes.scrollBarInner);
        var correction = (buttonTop*sizes.ratio).limit(0, sizes.button);
        this.scroller.button.setStyle('top', buttonTop-correction);
        this.content.setStyle('top', top);
        this.top = top.toInt();
        return this;
    },
    update: function(){
        // Get sizes
        var sizes = {
            content: this.content.getSize().y,
            element: this.element.getSize().y,
            scrollbar: this.scroller.scrollbar.getSize().y,
            tarrow: this.scroller.tarrow.getSize().y,
            barrow: this.scroller.barrow.getSize().y
        };
        sizes.ratio = sizes.element / sizes.content;
        sizes.scrollBarInner = sizes.scrollbar - (sizes.tarrow + sizes.barrow);
        sizes.button = sizes.ratio*sizes.scrollBarInner;
        sizes.maxTop = -(sizes.content - sizes.element);
        
        // Set scrollbar & button size
        this.scroller.scrollbar.setStyle('padding-top', sizes.tarrow);
        this.scroller.scrollbarInner.setStyle('height', sizes.scrollBarInner);
        this.scroller.button.setStyle('height', sizes.button);
        
        this.sizes = sizes;
        
        return this;
    }
});