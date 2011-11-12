
var Scrollbar = new Class({
    Implements: Options,
    options: {
        // Number of pixels the contents moves up adns down
        step: 10,
        // Interval between 2 moves
		inrterval: 100
	},
	element: null,
	elements: {},
    sizes: {},
    slider: null,
    top: 0,
    contentFx: null,
	initialize: function(element, options){
		element = document.id(element);
		if(!element) return;
		this.setOptions(options);
		this.element = element;
		this.element.store('MooScroll', this);
        return this.setup();
	},
    setup: function(){
        var o = this.options,
            timer;
        
        // Store original values
        var originalPadding = this.element.getStyle('padding');
		var html = this.element.get('html');
		
        this.element.setStyles({ overflow: 'hidden', position: 'relative', padding: 0}).empty();
		
        // Build elements
		var elts = {};
		['scroller', 'tArrow', 'scrollbar', 'scrollbarInner', 'button', 'bArrow', 'content', 'contentInner'].each(function(element, i){
			elts[element] = new Element('div', { 'class': 'Scrollbar-'+element });
		});
		elts.tArrow.inject(elts.scroller);
        elts.scrollbar.inject(elts.scroller);
        elts.scrollbarInner.inject(elts.scrollbar);
		elts.button.inject(elts.scrollbarInner);
		elts.bArrow.inject(elts.scroller);
		elts.scroller.inject(this.element);
		elts.contentInner.set('html', html).setStyle('padding', originalPadding).inject(elts.content);
		elts.content.inject(this.element);
		this.elements = elts;
		
		// Scroll fx
		this.contentFx = new Fx.Tween(elts.content, { property: 'top', link: 'cancel', duration: 'short' });
		
		// Compute initial sizes
		this.update();
		var s = this.sizes;
		
        // Add events to arrows
        elts.bArrow.addEvents({
			'mousedown': function(e){
				e.preventDefault();
				timer = this.moveOf.periodical(o.interval, this, [-o.step, true]);
			}.bind(this),
			'mouseup': function(e){
				e.preventDefault();
				clearInterval(timer);
			}.bind(this)
		});
        elts.tArrow.addEvents({
			'mousedown': function(e){
				e.preventDefault();
				timer = this.moveOf.periodical(o.interval, this, [o.step, true]);
			}.bind(this),
			'mouseup': function(e){
				e.preventDefault();
				clearInterval(timer);
			}.bind(this)
		});
		
        // Make button draggable
        new Drag(elts.button, {
            limit: {
                x: [0, 0],
                y: [0, s.scrollbarInner - s.button]
            },
            onDrag: function(button, e){
                this.moveTo(- (button.getStyle('top').toInt() / s.scrollbarRatio));
            }.bind(this)
        });
        
        this.element.addEvent('mousewheel', function(e){
            e.preventDefault();
            this.moveOf(e.wheel*o.step, true);
        }.bind(this));
        
        return this;
    },
    /**
     * Move of (x) pixels
     * x can be positive or negative
     */
    update: function(){
        var elts = this.elements;
        var s = {
            content: elts.content.getSize().y,
            element: this.element.getSize().y,
            scrollbar: elts.scrollbar.getSize().y,
            tArrow: elts.tArrow.getSize().y,
            bArrow: elts.bArrow.getSize().y
        };
        s.scrollbarInner = s.scrollbar - (s.tArrow + s.bArrow);
        s.scrollbarRatio = s.scrollbarInner / s.content;
        s.button = (s.element / s.content)*s.scrollbarInner;
        s.maxTop = -(s.content - s.element);
        
        elts.scrollbar.setStyle('padding-top', s.tArrow);
        elts.scrollbarInner.setStyle('height', s.scrollbarInner);
        elts.button.setStyle('height', s.button);
        
        this.sizes = s;
        
        return this;
    },
    /**
     * Move to (x) pixels
     * x must be negative
     */
    moveTo: function(top, updateButtonPosition){
        var sizes = this.sizes,
            elts = this.elements;
        top = [top, 0].pick().limit(sizes.maxTop, 0);
        if(updateButtonPosition){
            var buttonTop = -top*sizes.scrollbarRatio;
            elts.button.setStyle('top', buttonTop);
        }
        elts.content.setStyle('top', top);
        this.top = top.toInt();
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
    }
});