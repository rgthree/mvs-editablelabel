// EditableLabel

(function(window){

  "use strict";

  var EditableLabel = window.EditableLabel = new Class({
    Extends:MooVeeStar.View,

    options: {
      element: 'div',
      newlines: false,
      blurOnEnter: true,
      selectAllOnFocus: false,
      initialValue: '',
      placeholder: ''
    },

    events: {
      focus: 'onFocus',
      blur: 'onBlur',
      keydown: 'onKeyDown',
      paste: 'onPaste'
    },

    initialize: function(options){
      this.setOptions(options);
      this.setElement((typeOf(this.options.element) === 'element' ? this.options.element : new Element(this.options.element)).addClass('editable-label'));
      if(!/input|textarea/.test(this.element.get('tag')))
        this.element.set('contenteditable', true);

      this.field = /input|textarea/.test(this.element.get('tag')) ? 'value' : 'text';
      if(!this.element.get('data-placeholder') && this.options.placeholder)
        this.element.set('data-placeholder', this.options.placeholder);
      this.setValue(this.element.get(this.field)||this.options.initialValue||'');
      this.parent();
    },

    selectAll: function(){
      this.element.selectContents();
      return this;
    },

    isFocused: function(){
      return document.activeElement == this.element;
    },

    setValue: function(value){
      return this.element.set(this.field, (value||'').trim());
    },

    getValue: function(){
      return this.element.get(this.field).trim();
    },

    focus: function(){
      if(!this.isFocused())
        this.element.focus();
      return this;
    },

    blur: function(){
      if(this.isFocused())
        this.element.blur();
      return this;
    },

    onFocus: function(e){
      if(this.options.selectAllOnFocus)
        this.selectAll.delay(0, this);

      this.fireEvent('focus', e);
    },

    onBlur: function(e){
      this.setValue(this.getValue());
      this.fireEvent('blur', e);
    },

    onKeyDown: function(e){
      if(e.key === 'enter'){
        if(this.options.newlines === false)
          e.stop();
        if(this.options.blurOnEnter)
          this.blur();
      }
      this.fireEvent('keydown', e);
    },

    onPaste: function(e){
      var self = this;
      (function(){
        self.setValue(self.getValue());
      }).delay(0)
    }

  });

})(this);
