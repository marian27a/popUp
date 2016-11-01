;(function($){
    var defaults = {
        classClose: '.close',
        classOverlay: "overlay",
        overlay: true,
        popupIn: 1500, 
        overlayIn: 'slow',
        popupOut: 'slow'
    }

    function PopupPlug(elements, options){
        this.config = $.extend({},defaults,options);
        this.elements = elements;
        this.init();
    }
    PopupPlug.prototype.init = function(){
        var self = this;
        this.elementClass = '.' + ($(this.elements).attr('class'));
        this.overlay = '.'+self.config.classOverlay;
        $('body').append('<div class="'+self.config.classOverlay+'"></div>');
        this.actionUi(self);
    }
    PopupPlug.prototype.actionUi = function (self) {
        $(this.elementClass).on('click',function(){
            var target = $(this).attr('data-target');
            var getCenter = -(($(target).width())/2);
            $(target).animate({'top': '200',},self.config.popupIn)
                    .animate({'left': '50%',},{queue:false},self.config.popupIn)
                    .animate({'margin-left' : getCenter,},{queue:false},self.config.popupIn);
            if(self.config.overlay == true){
                $(self.overlay).css({'display': 'none', 'background': 'rgba(0,0,0, .6)', 'position': 'fixed', 'top': '0', 'left': '0', 'right': '0',
                'bottom': '0', 'z-index': '998'}); 
                $(self.overlay).fadeIn(self.config.overlayIn);
            }
            self.closePopup(target,self);
        })
    }

    PopupPlug.prototype.closePopup = function (target,self) {
        $(this.config.classClose).on('click', function(){
            $(self.overlay).fadeOut(self.config.popupOut);
            $(target).animate({'top': '-1000',},1500);
        })
        $(self.overlay).on('click', function(){
            $(self.overlay).fadeOut(self.config.popupOut);
            $(target).animate({'top': '-1000',},1500);
        })
    }

    $.fn.popupPlug = function (options) {
        new PopupPlug(this,options);
    }
})(jQuery);
