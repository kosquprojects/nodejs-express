/*!
* jquery.fancytree.edit.js
*
* Make node titles editable.
* (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
*
* Copyright (c) 2014, Martin Wendt (http://wwWendt.de)
*
* Released under the MIT license
* https://github.com/mar10/fancytree/wiki/LicenseInfo
*
* @version 2.6.0
* @date 2014-11-29T08:33
*/;(function($,window,document,undefined){"use strict";var isMac=/Mac/.test(navigator.platform),escapeHtml=$.ui.fancytree.escapeHtml,unescapeHtml=$.ui.fancytree.unescapeHtml;$.ui.fancytree._FancytreeNodeClass.prototype.editStart=function(){var $input,node=this,tree=this.tree,local=tree.ext.edit,instOpts=tree.options.edit,$title=$(".fancytree-title",node.span),eventData={node:node,tree:tree,options:tree.options,isNew:$(node.span).hasClass("fancytree-edit-new"),orgTitle:node.title,input:null,dirty:false};if(instOpts.beforeEdit.call(node,{type:"beforeEdit"},eventData)===false){return false;}
$.ui.fancytree.assert(!local.currentNode,"recursive edit");local.currentNode=this;local.eventData=eventData;tree.widget._unbind();$(document).on("mousedown.fancytree-edit",function(event){if(!$(event.target).hasClass("fancytree-edit-input")){node.editEnd(true,event);}});$input=$("<input />",{"class":"fancytree-edit-input",type:"text",value:unescapeHtml(eventData.orgTitle)});local.eventData.input=$input;if(instOpts.adjustWidthOfs!=null){$input.width($title.width()+instOpts.adjustWidthOfs);}
if(instOpts.inputCss!=null){$input.css(instOpts.inputCss);}
$title.html($input);$input.focus().change(function(event){$input.addClass("fancytree-edit-dirty");}).keydown(function(event){switch(event.which){case $.ui.keyCode.ESCAPE:node.editEnd(false,event);break;case $.ui.keyCode.ENTER:node.editEnd(true,event);return false;}
event.stopPropagation();}).blur(function(event){return node.editEnd(true,event);});instOpts.edit.call(node,{type:"edit"},eventData);};$.ui.fancytree._FancytreeNodeClass.prototype.editEnd=function(applyChanges,_event){var newVal,node=this,tree=this.tree,local=tree.ext.edit,eventData=local.eventData,instOpts=tree.options.edit,$title=$(".fancytree-title",node.span),$input=$title.find("input.fancytree-edit-input");if(instOpts.trim){$input.val($.trim($input.val()));}
newVal=$input.val();eventData.dirty=(newVal!==node.title);if(applyChanges===false){eventData.save=false;}else if(eventData.isNew){eventData.save=(newVal!=="");}else{eventData.save=eventData.dirty&&(newVal!=="");}
if(instOpts.beforeClose.call(node,{type:"beforeClose"},eventData)===false){return false;}
if(eventData.save&&instOpts.save.call(node,{type:"save"},eventData)===false){return false;}
$input.removeClass("fancytree-edit-dirty").unbind();$(document).off(".fancytree-edit");if(eventData.save){node.setTitle(escapeHtml(newVal));node.setFocus();}else{if(eventData.isNew){node.remove();node=eventData.node=null;local.relatedNode.setFocus();}else{node.renderTitle();node.setFocus();}}
local.eventData=null;local.currentNode=null;local.relatedNode=null;tree.widget._bind();$(tree.$container).focus();eventData.input=null;instOpts.close.call(node,{type:"close"},eventData);return true;};$.ui.fancytree._FancytreeNodeClass.prototype.editCreateNode=function(mode,init){var newNode,that=this;mode=mode||"child";if(init==null){init={title:""};}else if(typeof init==="string"){init={title:init};}else{$.ui.fancytree.assert($.isPlainObject(init));}
if(mode==="child"&&!this.isExpanded()&&this.hasChildren()!==false){this.setExpanded().done(function(){that.editCreateNode(mode,init);});return;}
newNode=this.addNode(init,mode);newNode.makeVisible();$(newNode.span).addClass("fancytree-edit-new");this.tree.ext.edit.relatedNode=this;newNode.editStart();};$.ui.fancytree._FancytreeClass.prototype.isEditing=function(){return this.ext.edit.currentNode;};$.ui.fancytree._FancytreeNodeClass.prototype.isEditing=function(){return this.tree.ext.edit.currentNode===this;};$.ui.fancytree.registerExtension({name:"edit",version:"0.2.0",options:{adjustWidthOfs:4,allowEmpty:false,inputCss:{minWidth:"3em"},triggerCancel:["esc","tab","click"],triggerStart:["f2","shift+click","mac+enter"],trim:true,beforeClose:$.noop,beforeEdit:$.noop,close:$.noop,edit:$.noop,save:$.noop},currentNode:null,treeInit:function(ctx){this._super(ctx);this.$container.addClass("fancytree-ext-edit");},nodeClick:function(ctx){if($.inArray("shift+click",ctx.options.edit.triggerStart)>=0){if(ctx.originalEvent.shiftKey){ctx.node.editStart();return false;}}
return this._super(ctx);},nodeDblclick:function(ctx){if($.inArray("dblclick",ctx.options.edit.triggerStart)>=0){ctx.node.editStart();return false;}
return this._super(ctx);},nodeKeydown:function(ctx){switch(ctx.originalEvent.which){case 113:if($.inArray("f2",ctx.options.edit.triggerStart)>=0){ctx.node.editStart();return false;}
break;case $.ui.keyCode.ENTER:if($.inArray("mac+enter",ctx.options.edit.triggerStart)>=0&&isMac){ctx.node.editStart();return false;}
break;}
return this._super(ctx);}});}(jQuery,window,document));