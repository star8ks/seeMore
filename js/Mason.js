var Mason = (function() {
  /**
   * @usage: 
    new Mason(util.$('.waterfall'), {
      itemSelector: '.item',
      columnWidth: 140,
      columnNum: 3
    });
   * @withHTML: 
    <div class="waterfall">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
   */
  function Mason(container, option) {
    this.$container = container;
    this.itemSelector = option.itemSelector;
    this.$items = this.$container.querySelectorAll(this.itemSelector);
    this.columnNum = option.columnNum;
    this.colHeightArr = new Array(option.columnNum).fill(0);
    this.columnWidth = option.columnWidth ? option.columnWidth : getRealWidth(this.$items[0]);
    // @TODO add container's max height option
    // this.containerMaxHeight = option.containerMaxHeight ? option.containerMaxHeight : window.document.body.scrollHeight;
    this.renderAll();
  }

  Mason.prototype = {
    renderAll: function(){
      var length = this.$items.length;
      for(var i=0; i < length; i++) {
        var minHeight = min(this.colHeightArr);
        var insertColIndex = this.colHeightArr.indexOf(minHeight);

        setStyle(this.$items[i], {
          position: 'absolute',
          top: this.colHeightArr[insertColIndex] + 'px',
          left: insertColIndex * this.columnWidth + 'px'
        });
        this.colHeightArr[insertColIndex] += getRealHeight(this.$items[i]);
      }

      setStyle(this.$container, {
        position: 'relative',
        height: max(this.colHeightArr) + 'px'
      });
    }
    // @TODO add items
    // add: function(){}
  }

  function getComputedVal($el, property) {
    style = window.getComputedStyle($el);
    if(!style.hasOwnProperty(property)) {
      throw new Error('Error: element have no style named ' + property);
    }
    return parseFloat(style[property].slice(0, -2));
  }

  function getRealWidth($el) {
    var marginLeft = getComputedVal($el, 'marginLeft');
    var marginRight = getComputedVal($el, 'marginRight');
    return $el.offsetWidth + marginLeft + marginRight;
  }

  function getRealHeight($el) {
    var marginTop = getComputedVal($el, 'marginTop');
    var marginBottom = getComputedVal($el, 'marginBottom');
    return $el.offsetHeight + marginTop + marginBottom;
  }

  function setStyle($el, style) {
    Object.keys(style).forEach(function(property) {
      $el.style[property] = style[property];
    });
  }

  function min(arr){
    return Math.min.apply(Math, arr);
  }
  function max(arr){
    return Math.max.apply(Math, arr);
  }

  return Mason;
})();