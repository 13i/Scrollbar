
var Scrollbar = new Class({
    Implements: Options,
    options: {
        // Number of pixels the contents moves up adns down
		step: 10,
        // Interval between 2 moves
		inrterval: 100
	},
	element: null,
    sizes: {},
    slider: null,
    top: 0,
	initialize: function(element, options){
		if(!element) return;
		this.setOptions(options);
		this.element = element;
		this.element.store('MooScroll', this);
		this.setup();
        return this;
	},
	setup: function(){
        this.setupHTML().setupSizes().setupEvents();
		return this;
	},
    setupHTML: function(){
        
    	this.element.setStyles({'overflow': 'hidden', 'position': 'relative'});
		
        // Retrieve content
		var html = this.element.get('html');
		this.element.empty();
		
        // Create scrollbar layout
		this.scroller = new Element('div', { 'class': 'Scrollbar-scroller' });
		this.scroller.tarrow = new Element('div', {'class': 'Scrollbar-tArrow'}).inject(this.scroller);
        this.scroller.scrollbar = new Element('div', {'class': 'Scrollbar-scrollbar'}).inject(this.scroller);
        this.scroller.scrollbarInner = new Element('div', {'class': 'Scrollbar-scrollbarInner'}).inject(this.scroller.scrollbar);
		this.scroller.button = new Element('div', {'class': 'Scrollbar-button'}).inject(this.scroller.scrollbarInner);
		this.scroller.barrow = new Element('div', {'class': 'Scrollbar-bArrow'}).inject(this.scroller);
		this.scroller.inject(this.element);
        
        // Create content layout
		this.content = new Element('div', {'class': 'Scrollbar-content'});
		this.content.fx = new Fx.Tween(this.content, { property: 'top', link: 'cancel', duration: 'short' });
		new Element('div', {'class' : 'Scrollbar-contentInner', html: html}).inject(this.content);
		this.content.inject(this.element);
        
        return this;
    },
    setupEvents: function(){
        var timer,
            o = this.options,
            s = this.sizes;
        
        this.scroller.barrow.addEvents({
			'mousedown': function(e){
				e.preventDefault();
				timer = this.moveOf.periodical(o.interval, this, [-o.step, true]);
			}.bind(this),
			'mouseup': function(e){
				e.preventDefault();
				clearInterval(timer);
			}.bind(this)
		});
		
        this.scroller.tarrow.addEvents({
			'mousedown': function(e){
				e.preventDefault();
				timer = this.moveOf.periodical(o.interval, this, [o.step, true]);
			}.bind(this),
			'mouseup': function(e){
				e.preventDefault();
				clearInterval(timer);
			}.bind(this)
		});
        
        var drag = new Drag(this.scroller.button, {
            limit: {
                x: [0, 0],
                y: [0, s.scrollBarInner - s.button]
            },
            onDrag: function(el, e){
                this.moveTo(- (el.getStyle('top').toInt() / s.scrollBarRatio));
            }.bind(this)
        });
        
        /*
        this.slider = new Slider(this.scroller.scrollbarInner, this.scroller.button, {
            mode: 'vertical',
            snap: true,
            range: [0, this.sizes.scrollBarInner - this.sizes.button],
            steps: this.sizes.scrollBarInner - this.sizes.button,
            onChange: function(step){
                this.moveTo(-step/this.sizes.ratio);
            }.bind(this)
        });
        */
        
        return this;
    },
    setupSizes: function(){
        var s = {
            content: this.content.getSize().y,
            element: this.element.getSize().y,
            scrollbar: this.scroller.scrollbar.getSize().y,
            tarrow: this.scroller.tarrow.getSize().y,
            barrow: this.scroller.barrow.getSize().y
        };
        s.ratio = s.element / s.content;
        s.scrollBarInner = s.scrollbar - (s.tarrow + s.barrow);
        s.scrollBarRatio = s.scrollBarInner / s.content;
        s.button = s.ratio*s.scrollBarInner;
        s.maxTop = -(s.content - s.element);
        
        this.scroller.scrollbar.setStyle('padding-top', s.tarrow);
        this.scroller.scrollbarInner.setStyle('height', s.scrollBarInner);
        this.scroller.button.setStyle('height', s.button);
        
        this.sizes = s;
        
        return this;
    },
    /**
     * Move of (x) pixels
     * x can be positive or negative
     */
    moveOf: function(x, updateButtonPosition){
        var distance = [distance, 0].pick(),
            newTop = this.top + x;
        this.moveTo(newTop, updateButtonPosition);
        return this;
    },
    /**
     * Move to (x) pixels
     * x must be negative
     */
    moveTo: function(top, updateButtonPosition){
        console.log(top);
        var sizes = this.sizes,
            top = [top, 0].pick().limit(sizes.maxTop, 0);
        if(updateButtonPosition){
            var buttonTop = (-top*sizes.ratio).limit(0, sizes.scrollBarInner),
                correction = (buttonTop*sizes.ratio).limit(0, sizes.button);
                this.scroller.button.setStyle('top', buttonTop-correction);
        }
        this.content.setStyle('top', top);
        this.top = top.toInt();
        return this;
    }
});