(function(b,c){'function'==typeof define&&define.amd?define(['jquery'],function(d){return c(d)}):'object'==typeof exports?module.exports=c(require('jquery')):c(jQuery)})(this,function(b){(function(c){'use strict';function d(l){var m=[{re:/[\xC0-\xC6]/g,ch:'A'},{re:/[\xE0-\xE6]/g,ch:'a'},{re:/[\xC8-\xCB]/g,ch:'E'},{re:/[\xE8-\xEB]/g,ch:'e'},{re:/[\xCC-\xCF]/g,ch:'I'},{re:/[\xEC-\xEF]/g,ch:'i'},{re:/[\xD2-\xD6]/g,ch:'O'},{re:/[\xF2-\xF6]/g,ch:'o'},{re:/[\xD9-\xDC]/g,ch:'U'},{re:/[\xF9-\xFC]/g,ch:'u'},{re:/[\xC7-\xE7]/g,ch:'c'},{re:/[\xD1]/g,ch:'N'},{re:/[\xF1]/g,ch:'n'}];return c.each(m,function(){l=l.replace(this.re,this.ch)}),l}function f(l){var m={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#x27;','`':'&#x60;'},n='(?:'+Object.keys(m).join('|')+')',p=new RegExp(n),q=new RegExp(n,'g'),s=null==l?'':''+l;return p.test(s)?s.replace(q,function(t){return m[t]}):s}function g(l,m){var n=arguments,p=l;[].shift.apply(n);var s,t=this.each(function(){var u=c(this);if(u.is('select')){var v=u.data('selectpicker'),w='object'==typeof p&&p;if(!v){var x=c.extend({},h.DEFAULTS,c.fn.selectpicker.defaults||{},u.data(),w);x.template=c.extend({},h.DEFAULTS.template,c.fn.selectpicker.defaults?c.fn.selectpicker.defaults.template:{},u.data().template,w.template),u.data('selectpicker',v=new h(this,x,m))}else if(w)for(var y in w)w.hasOwnProperty(y)&&(v.options[y]=w[y]);'string'==typeof p&&(v[p]instanceof Function?s=v[p].apply(v,n):s=v.options[p])}});return'undefined'==typeof s?t:s}String.prototype.includes||function(){'use strict';var l={}.toString,m=function(){try{var q={},s=Object.defineProperty,t=s(q,q,q)&&s}catch(u){}return t}(),n=''.indexOf,p=function(q){if(null==this)throw new TypeError;var s=this+'';if(q&&'[object RegExp]'==l.call(q))throw new TypeError;var t=s.length,u=q+'',v=u.length,w=1<arguments.length?arguments[1]:void 0,x=w?+w:0;x!=x&&(x=0);var y=Math.min(Math.max(x,0),t);return!(v+y>t)&&-1!=n.call(s,u,x)};m?m(String.prototype,'includes',{value:p,configurable:!0,writable:!0}):String.prototype.includes=p}(),String.prototype.startsWith||function(){'use strict';var l=function(){try{var p={},q=Object.defineProperty,s=q(p,p,p)&&q}catch(t){}return s}(),m={}.toString,n=function(p){if(null==this)throw new TypeError;var q=this+'';if(p&&'[object RegExp]'==m.call(p))throw new TypeError;var s=q.length,t=p+'',u=t.length,v=1<arguments.length?arguments[1]:void 0,w=v?+v:0;w!=w&&(w=0);var x=Math.min(Math.max(w,0),s);if(u+x>s)return!1;for(var y=-1;++y<u;)if(q.charCodeAt(x+y)!=t.charCodeAt(y))return!1;return!0};l?l(String.prototype,'startsWith',{value:n,configurable:!0,writable:!0}):String.prototype.startsWith=n}(),Object.keys||(Object.keys=function(l,m,n){for(m in n=[],l)n.hasOwnProperty.call(l,m)&&n.push(m);return n}),c.fn.triggerNative=function(l){var n,m=this[0];m.dispatchEvent?('function'==typeof Event?n=new Event(l,{bubbles:!0}):(n=document.createEvent('Event'),n.initEvent(l,!0,!1)),m.dispatchEvent(n)):(m.fireEvent&&(n=document.createEventObject(),n.eventType=l,m.fireEvent('on'+l,n)),this.trigger(l))},c.expr[':'].icontains=function(l,m,n){var p=c(l),q=(p.data('tokens')||p.text()).toUpperCase();return q.includes(n[3].toUpperCase())},c.expr[':'].ibegins=function(l,m,n){var p=c(l),q=(p.data('tokens')||p.text()).toUpperCase();return q.startsWith(n[3].toUpperCase())},c.expr[':'].aicontains=function(l,m,n){var p=c(l),q=(p.data('tokens')||p.data('normalizedText')||p.text()).toUpperCase();return q.includes(n[3].toUpperCase())},c.expr[':'].aibegins=function(l,m,n){var p=c(l),q=(p.data('tokens')||p.data('normalizedText')||p.text()).toUpperCase();return q.startsWith(n[3].toUpperCase())};var h=function(l,m,n){n&&(n.stopPropagation(),n.preventDefault()),this.$element=c(l),this.$newElement=null,this.$button=null,this.$menu=null,this.$lis=null,this.options=m,null===this.options.title&&(this.options.title=this.$element.attr('title')),this.val=h.prototype.val,this.render=h.prototype.render,this.refresh=h.prototype.refresh,this.setStyle=h.prototype.setStyle,this.selectAll=h.prototype.selectAll,this.deselectAll=h.prototype.deselectAll,this.destroy=h.prototype.destroy,this.remove=h.prototype.remove,this.show=h.prototype.show,this.hide=h.prototype.hide,this.init()};h.VERSION='1.9.3',h.DEFAULTS={noneSelectedText:'Nothing selected',noneResultsText:'No results matched {0}',countSelectedText:function(l){return 1==l?'{0} item selected':'{0} items selected'},maxOptionsText:function(l,m){return[1==l?'Limit reached ({n} item max)':'Limit reached ({n} items max)',1==m?'Group limit reached ({n} item max)':'Group limit reached ({n} items max)']},selectAllText:'Select All',deselectAllText:'Deselect All',doneButton:!1,doneButtonText:'Close',multipleSeparator:', ',styleBase:'btn',style:'btn-default',size:'auto',title:null,selectedTextFormat:'values',width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,liveSearchPlaceholder:null,liveSearchNormalize:!1,liveSearchStyle:'contains',actionsBox:!1,iconBase:'glyphicon',tickIcon:'glyphicon-ok',template:{caret:'<span class="caret"></span>'},maxOptions:!1,mobile:!1,selectOnTab:!1,dropdownAlignRight:!1},h.prototype={constructor:h,init:function(){var l=this,m=this.$element.attr('id');this.liObj={},this.multiple=this.$element.prop('multiple'),this.autofocus=this.$element.prop('autofocus'),this.$newElement=this.createView(),this.$element.after(this.$newElement).appendTo(this.$newElement),this.$button=this.$newElement.children('button'),this.$menu=this.$newElement.children('.dropdown-menu'),this.$menuInner=this.$menu.children('.inner'),this.$searchbox=this.$menu.find('input'),this.options.dropdownAlignRight&&this.$menu.addClass('dropdown-menu-right'),'undefined'!=typeof m&&(this.$button.attr('data-id',m),c('label[for="'+m+'"]').click(function(n){n.preventDefault(),l.$button.focus()})),this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data('this',this),this.$newElement.data('this',this),this.options.mobile&&this.mobile(),this.$newElement.on({'hide.bs.dropdown':function(n){l.$element.trigger('hide.bs.select',n)},'hidden.bs.dropdown':function(n){l.$element.trigger('hidden.bs.select',n)},'show.bs.dropdown':function(n){l.$element.trigger('show.bs.select',n)},'shown.bs.dropdown':function(n){l.$element.trigger('shown.bs.select',n)}}),l.$element[0].hasAttribute('required')&&this.$element.on('invalid',function(){l.$button.addClass('bs-invalid').focus(),l.$element.on({'focus.bs.select':function(){l.$button.focus(),l.$element.off('focus.bs.select')},'shown.bs.select':function(){l.$element.val(l.$element.val()).off('shown.bs.select')},'rendered.bs.select':function(){this.validity.valid&&l.$button.removeClass('bs-invalid'),l.$element.off('rendered.bs.select')}})}),setTimeout(function(){l.$element.trigger('loaded.bs.select')})},createDropdown:function(){var l=this.multiple?' show-tick':'',m=this.$element.parent().hasClass('input-group')?' input-group-btn':'',n=this.autofocus?' autofocus':'',p=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+'</div>':'',q=this.options.liveSearch?'<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"'+(null===this.options.liveSearchPlaceholder?'':' placeholder="'+f(this.options.liveSearchPlaceholder)+'"')+'></div>':'',s=this.multiple&&this.options.actionsBox?'<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">'+this.options.selectAllText+'</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">'+this.options.deselectAllText+'</button></div></div>':'',t=this.multiple&&this.options.doneButton?'<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">'+this.options.doneButtonText+'</button></div></div>':'',u='<div class="btn-group bootstrap-select'+l+m+'"><button type="button" class="'+this.options.styleBase+' dropdown-toggle" data-toggle="dropdown"'+n+'><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">'+this.options.template.caret+'</span></button><div class="dropdown-menu open">'+p+q+s+'<ul class="dropdown-menu inner" role="menu"></ul>'+t+'</div></div>';return c(u)},createView:function(){var l=this.createDropdown(),m=this.createLi();return l.find('ul')[0].innerHTML=m,l},reloadLi:function(){this.destroyLi();var l=this.createLi();this.$menuInner[0].innerHTML=l},destroyLi:function(){this.$menu.find('li').remove()},createLi:function(){var l=this,m=[],n=0,p=document.createElement('option'),q=-1,s=function(v,w,x,y){return'<li'+('undefined'!=typeof x&''!==x?' class="'+x+'"':'')+('undefined'!=typeof w&null!==w?' data-original-index="'+w+'"':'')+('undefined'!=typeof y&null!==y?'data-optgroup="'+y+'"':'')+'>'+v+'</li>'},t=function(v,w,x,y){return'<a tabindex="0"'+('undefined'==typeof w?'':' class="'+w+'"')+('undefined'==typeof x?'':' style="'+x+'"')+(l.options.liveSearchNormalize?' data-normalized-text="'+d(f(v))+'"':'')+('undefined'!=typeof y||null!==y?' data-tokens="'+y+'"':'')+'>'+v+'<span class="'+l.options.iconBase+' '+l.options.tickIcon+' check-mark"></span></a>'};if(this.options.title&&!this.multiple&&(q--,!this.$element.find('.bs-title-option').length)){var u=this.$element[0];p.className='bs-title-option',p.appendChild(document.createTextNode(this.options.title)),p.value='',u.insertBefore(p,u.firstChild),void 0===c(u.options[u.selectedIndex]).attr('selected')&&(p.selected=!0)}return this.$element.find('option').each(function(v){var w=c(this);if(q++,!w.hasClass('bs-title-option')){var x=this.className||'',y=this.style.cssText,z=w.data('content')?w.data('content'):w.html(),A=w.data('tokens')?w.data('tokens'):null,B='undefined'==typeof w.data('subtext')?'':'<small class="text-muted">'+w.data('subtext')+'</small>',C='undefined'==typeof w.data('icon')?'':'<span class="'+l.options.iconBase+' '+w.data('icon')+'"></span> ',D=this.disabled||'OPTGROUP'===this.parentNode.tagName&&this.parentNode.disabled;if(''!=C&&D&&(C='<span>'+C+'</span>'),l.options.hideDisabled&&D)return void q--;if(w.data('content')||(z=C+'<span class="text">'+z+B+'</span>'),'OPTGROUP'===this.parentNode.tagName&&!0!==w.data('divider')){var E=' '+this.parentNode.className||'';if(0===w.index()){n+=1;var F=this.parentNode.label,G='undefined'==typeof w.parent().data('subtext')?'':'<small class="text-muted">'+w.parent().data('subtext')+'</small>',H=w.parent().data('icon')?'<span class="'+l.options.iconBase+' '+w.parent().data('icon')+'"></span> ':'';F=H+'<span class="text">'+F+G+'</span>',0!==v&&0<m.length&&(q++,m.push(s('',null,'divider',n+'div'))),q++,m.push(s(F,null,'dropdown-header'+E,n))}m.push(s(t(z,'opt '+x+E,y,A),v,'',n))}else!0===w.data('divider')?m.push(s('',v,'divider')):!0===w.data('hidden')?m.push(s(t(z,x,y,A),v,'hidden is-hidden')):(this.previousElementSibling&&'OPTGROUP'===this.previousElementSibling.tagName&&(q++,m.push(s('',null,'divider',n+'div'))),m.push(s(t(z,x,y,A),v)));l.liObj[v]=q}}),this.multiple||0!==this.$element.find('option:selected').length||this.options.title||this.$element.find('option').eq(0).prop('selected',!0).attr('selected','selected'),m.join('')},findLis:function(){return null==this.$lis&&(this.$lis=this.$menu.find('li')),this.$lis},render:function(l){var n,m=this;!1!==l&&this.$element.find('option').each(function(v){var w=m.findLis().eq(m.liObj[v]);m.setDisabled(v,this.disabled||'OPTGROUP'===this.parentNode.tagName&&this.parentNode.disabled,w),m.setSelected(v,this.selected,w)}),this.tabIndex();var p=this.$element.find('option').map(function(){if(this.selected){if(m.options.hideDisabled&&(this.disabled||'OPTGROUP'===this.parentNode.tagName&&this.parentNode.disabled))return;var x,v=c(this),w=v.data('icon')&&m.options.showIcon?'<i class="'+m.options.iconBase+' '+v.data('icon')+'"></i> ':'';return x=m.options.showSubtext&&v.data('subtext')&&!m.multiple?' <small class="text-muted">'+v.data('subtext')+'</small>':'','undefined'==typeof v.attr('title')?v.data('content')&&m.options.showContent?v.data('content'):w+v.html()+x:v.attr('title')}}).toArray(),q=this.multiple?p.join(this.options.multipleSeparator):p[0];if(this.multiple&&-1<this.options.selectedTextFormat.indexOf('count')){var s=this.options.selectedTextFormat.split('>');if(1<s.length&&p.length>s[1]||1==s.length&&2<=p.length){n=this.options.hideDisabled?', [disabled]':'';var t=this.$element.find('option').not('[data-divider="true"], [data-hidden="true"]'+n).length,u='function'==typeof this.options.countSelectedText?this.options.countSelectedText(p.length,t):this.options.countSelectedText;q=u.replace('{0}',p.length.toString()).replace('{1}',t.toString())}}this.options.title==void 0&&(this.options.title=this.$element.attr('title')),'static'==this.options.selectedTextFormat&&(q=this.options.title),q||(q='undefined'==typeof this.options.title?this.options.noneSelectedText:this.options.title),this.$button.attr('title',c.trim(q.replace(/<[^>]*>?/g,''))),this.$button.children('.filter-option').html(q),this.$element.trigger('rendered.bs.select')},setStyle:function(l,m){this.$element.attr('class')&&this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi,''));var n=l?l:this.options.style;'add'==m?this.$button.addClass(n):'remove'==m?this.$button.removeClass(n):(this.$button.removeClass(this.options.style),this.$button.addClass(n))},liHeight:function(l){if(l||!1!==this.options.size&&!this.sizeInfo){var m=document.createElement('div'),n=document.createElement('div'),p=document.createElement('ul'),q=document.createElement('li'),s=document.createElement('li'),t=document.createElement('a'),u=document.createElement('span'),v=this.options.header&&0<this.$menu.find('.popover-title').length?this.$menu.find('.popover-title')[0].cloneNode(!0):null,w=this.options.liveSearch?document.createElement('div'):null,x=this.options.actionsBox&&this.multiple&&0<this.$menu.find('.bs-actionsbox').length?this.$menu.find('.bs-actionsbox')[0].cloneNode(!0):null,y=this.options.doneButton&&this.multiple&&0<this.$menu.find('.bs-donebutton').length?this.$menu.find('.bs-donebutton')[0].cloneNode(!0):null;if(u.className='text',m.className=this.$menu[0].parentNode.className+' open',n.className='dropdown-menu open',p.className='dropdown-menu inner',q.className='divider',u.appendChild(document.createTextNode('Inner text')),t.appendChild(u),s.appendChild(t),p.appendChild(s),p.appendChild(q),v&&n.appendChild(v),w){var z=document.createElement('span');w.className='bs-searchbox',z.className='form-control',w.appendChild(z),n.appendChild(w)}x&&n.appendChild(x),n.appendChild(p),y&&n.appendChild(y),m.appendChild(n),document.body.appendChild(m);var A=t.offsetHeight,B=v?v.offsetHeight:0,C=w?w.offsetHeight:0,D=x?x.offsetHeight:0,E=y?y.offsetHeight:0,F=c(q).outerHeight(!0),G='function'==typeof getComputedStyle&&getComputedStyle(n),H=G?null:c(n),I=parseInt(G?G.paddingTop:H.css('paddingTop'))+parseInt(G?G.paddingBottom:H.css('paddingBottom'))+parseInt(G?G.borderTopWidth:H.css('borderTopWidth'))+parseInt(G?G.borderBottomWidth:H.css('borderBottomWidth')),J=I+parseInt(G?G.marginTop:H.css('marginTop'))+parseInt(G?G.marginBottom:H.css('marginBottom'))+2;document.body.removeChild(m),this.sizeInfo={liHeight:A,headerHeight:B,searchHeight:C,actionsHeight:D,doneButtonHeight:E,dividerHeight:F,menuPadding:I,menuExtras:J}}},setSize:function(){if(this.findLis(),this.liHeight(),this.options.header&&this.$menu.css('padding-top',0),!1!==this.options.size){var B,C,D,E,l=this,m=this.$menu,n=this.$menuInner,p=c(window),q=this.$newElement[0].offsetHeight,s=this.sizeInfo.liHeight,t=this.sizeInfo.headerHeight,u=this.sizeInfo.searchHeight,v=this.sizeInfo.actionsHeight,w=this.sizeInfo.doneButtonHeight,x=this.sizeInfo.dividerHeight,y=this.sizeInfo.menuPadding,z=this.sizeInfo.menuExtras,A=this.options.hideDisabled?'.disabled':'',F=function(){D=l.$newElement.offset().top-p.scrollTop(),E=p.height()-D-q};if(F(),'auto'===this.options.size){var G=function(){var J,K=function(O,P){return function(Q){return P?Q.classList?Q.classList.contains(O):c(Q).hasClass(O):Q.classList?!Q.classList.contains(O):!c(Q).hasClass(O)}},L=l.$menuInner[0].getElementsByTagName('li'),M=Array.prototype.filter?Array.prototype.filter.call(L,K('hidden',!1)):l.$lis.not('.hidden'),N=Array.prototype.filter?Array.prototype.filter.call(M,K('dropdown-header',!0)):M.filter('.dropdown-header');F(),B=E-z,l.options.container?(!m.data('height')&&m.data('height',m.height()),C=m.data('height')):C=m.height(),l.options.dropupAuto&&l.$newElement.toggleClass('dropup',D>E&&B-z<C),l.$newElement.hasClass('dropup')&&(B=D-z),J=3<M.length+N.length?3*s+z-2:0,m.css({'max-height':B+'px',overflow:'hidden','min-height':J+t+u+v+w+'px'}),n.css({'max-height':B-t-u-v-w-y+'px','overflow-y':'auto','min-height':Math.max(J-y,0)+'px'})};G(),this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize',G),p.off('resize.getSize scroll.getSize').on('resize.getSize scroll.getSize',G)}else if(this.options.size&&'auto'!=this.options.size&&this.$lis.not(A).length>this.options.size){var H=this.$lis.not('.divider').not(A).children().slice(0,this.options.size).last().parent().index(),I=this.$lis.slice(0,H+1).filter('.divider').length;B=s*this.options.size+I*x+y,l.options.container?(!m.data('height')&&m.data('height',m.height()),C=m.data('height')):C=m.height(),l.options.dropupAuto&&this.$newElement.toggleClass('dropup',D>E&&B-z<C),m.css({'max-height':B+t+u+v+w+'px',overflow:'hidden','min-height':''}),n.css({'max-height':B-y+'px','overflow-y':'auto','min-height':''})}}},setWidth:function(){if('auto'===this.options.width){this.$menu.css('min-width','0');var l=this.$menu.parent().clone().appendTo('body'),m=this.options.container?this.$newElement.clone().appendTo('body'):l,n=l.children('.dropdown-menu').outerWidth(),p=m.css('width','auto').children('button').outerWidth();l.remove(),m.remove(),this.$newElement.css('width',Math.max(n,p)+'px')}else'fit'===this.options.width?(this.$menu.css('min-width',''),this.$newElement.css('width','').addClass('fit-width')):this.options.width?(this.$menu.css('min-width',''),this.$newElement.css('width',this.options.width)):(this.$menu.css('min-width',''),this.$newElement.css('width',''));this.$newElement.hasClass('fit-width')&&'fit'!==this.options.width&&this.$newElement.removeClass('fit-width')},selectPosition:function(){this.$bsContainer=c('<div class="bs-container" />');var m,n,l=this,p=function(q){l.$bsContainer.addClass(q.attr('class').replace(/form-control|fit-width/gi,'')).toggleClass('dropup',q.hasClass('dropup')),m=q.offset(),n=q.hasClass('dropup')?0:q[0].offsetHeight,l.$bsContainer.css({top:m.top+n,left:m.left,width:q[0].offsetWidth})};this.$button.on('click',function(){var q=c(this);l.isDisabled()||(p(l.$newElement),l.$bsContainer.appendTo(l.options.container).toggleClass('open',!q.hasClass('open')).append(l.$menu))}),c(window).on('resize scroll',function(){p(l.$newElement)}),this.$element.on('hide.bs.select',function(){l.$menu.data('height',l.$menu.height()),l.$bsContainer.detach()})},setSelected:function(l,m,n){n||(n=this.findLis().eq(this.liObj[l])),n.toggleClass('selected',m)},setDisabled:function(l,m,n){n||(n=this.findLis().eq(this.liObj[l])),m?n.addClass('disabled').children('a').attr('href','#').attr('tabindex',-1):n.removeClass('disabled').children('a').removeAttr('href').attr('tabindex',0)},isDisabled:function(){return this.$element[0].disabled},checkDisabled:function(){var l=this;this.isDisabled()?(this.$newElement.addClass('disabled'),this.$button.addClass('disabled').attr('tabindex',-1)):(this.$button.hasClass('disabled')&&(this.$newElement.removeClass('disabled'),this.$button.removeClass('disabled')),-1==this.$button.attr('tabindex')&&!this.$element.data('tabindex')&&this.$button.removeAttr('tabindex')),this.$button.click(function(){return!l.isDisabled()})},tabIndex:function(){this.$element.data('tabindex')!==this.$element.attr('tabindex')&&-98!==this.$element.attr('tabindex')&&'-98'!==this.$element.attr('tabindex')&&(this.$element.data('tabindex',this.$element.attr('tabindex')),this.$button.attr('tabindex',this.$element.data('tabindex'))),this.$element.attr('tabindex',-98)},clickListener:function(){var l=this,m=c(document);this.$newElement.on('touchstart.dropdown','.dropdown-menu',function(n){n.stopPropagation()}),m.data('spaceSelect',!1),this.$button.on('keyup',function(n){/(32)/.test(n.keyCode.toString(10))&&m.data('spaceSelect')&&(n.preventDefault(),m.data('spaceSelect',!1))}),this.$button.on('click',function(){l.setSize(),l.$element.on('shown.bs.select',function(){if(!l.options.liveSearch&&!l.multiple)l.$menuInner.find('.selected a').focus();else if(!l.multiple){var n=l.liObj[l.$element[0].selectedIndex];if('number'!=typeof n||!1===l.options.size)return;var p=l.$lis.eq(n)[0].offsetTop-l.$menuInner[0].offsetTop;p=p-l.$menuInner[0].offsetHeight/2+l.sizeInfo.liHeight/2,l.$menuInner[0].scrollTop=p}})}),this.$menuInner.on('click','li a',function(n){var p=c(this),q=p.parent().data('originalIndex'),s=l.$element.val(),t=l.$element.prop('selectedIndex');if(l.multiple&&n.stopPropagation(),n.preventDefault(),!l.isDisabled()&&!p.parent().hasClass('disabled')){var u=l.$element.find('option'),v=u.eq(q),w=v.prop('selected'),x=v.parent('optgroup'),y=l.options.maxOptions,z=x.data('maxOptions')||!1;if(!l.multiple)u.prop('selected',!1),v.prop('selected',!0),l.$menuInner.find('.selected').removeClass('selected'),l.setSelected(q,!0);else if(v.prop('selected',!w),l.setSelected(q,!w),p.blur(),!1!==y||!1!==z){var A=y<u.filter(':selected').length,B=z<x.find('option:selected').length;if(y&&A||z&&B)if(y&&1==y)u.prop('selected',!1),v.prop('selected',!0),l.$menuInner.find('.selected').removeClass('selected'),l.setSelected(q,!0);else if(z&&1==z){x.find('option:selected').prop('selected',!1),v.prop('selected',!0);var C=p.parent().data('optgroup');l.$menuInner.find('[data-optgroup="'+C+'"]').removeClass('selected'),l.setSelected(q,!0)}else{var D='function'==typeof l.options.maxOptionsText?l.options.maxOptionsText(y,z):l.options.maxOptionsText,E=D[0].replace('{n}',y),F=D[1].replace('{n}',z),G=c('<div class="notify"></div>');D[2]&&(E=E.replace('{var}',D[2][1<y?0:1]),F=F.replace('{var}',D[2][1<z?0:1])),v.prop('selected',!1),l.$menu.append(G),y&&A&&(G.append(c('<div>'+E+'</div>')),l.$element.trigger('maxReached.bs.select')),z&&B&&(G.append(c('<div>'+F+'</div>')),l.$element.trigger('maxReachedGrp.bs.select')),setTimeout(function(){l.setSelected(q,!1)},10),G.delay(750).fadeOut(300,function(){c(this).remove()})}}l.multiple?l.options.liveSearch&&l.$searchbox.focus():l.$button.focus(),(s!=l.$element.val()&&l.multiple||t!=l.$element.prop('selectedIndex')&&!l.multiple)&&(l.$element.triggerNative('change'),l.$element.trigger('changed.bs.select',[q,v.prop('selected'),w]))}}),this.$menu.on('click','li.disabled a, .popover-title, .popover-title :not(.close)',function(n){n.currentTarget==this&&(n.preventDefault(),n.stopPropagation(),l.options.liveSearch&&!c(n.target).hasClass('close')?l.$searchbox.focus():l.$button.focus())}),this.$menuInner.on('click','.divider, .dropdown-header',function(n){n.preventDefault(),n.stopPropagation(),l.options.liveSearch?l.$searchbox.focus():l.$button.focus()}),this.$menu.on('click','.popover-title .close',function(){l.$button.click()}),this.$searchbox.on('click',function(n){n.stopPropagation()}),this.$menu.on('click','.actions-btn',function(n){l.options.liveSearch?l.$searchbox.focus():l.$button.focus(),n.preventDefault(),n.stopPropagation(),c(this).hasClass('bs-select-all')?l.selectAll():l.deselectAll(),l.$element.triggerNative('change')}),this.$element.change(function(){l.render(!1)})},liveSearchListener:function(){var l=this,m=c('<li class="no-results"></li>');this.$button.on('click.dropdown.data-api touchstart.dropdown.data-api',function(){l.$menuInner.find('.active').removeClass('active'),!l.$searchbox.val()||(l.$searchbox.val(''),l.$lis.not('.is-hidden').removeClass('hidden'),!!m.parent().length&&m.remove()),l.multiple||l.$menuInner.find('.selected').addClass('active'),setTimeout(function(){l.$searchbox.focus()},10)}),this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api',function(n){n.stopPropagation()}),this.$searchbox.on('input propertychange',function(){if(l.$searchbox.val()){var n=l.$lis.not('.is-hidden').removeClass('hidden').children('a');n=l.options.liveSearchNormalize?n.not(':a'+l._searchStyle()+'("'+d(l.$searchbox.val())+'")'):n.not(':'+l._searchStyle()+'("'+l.$searchbox.val()+'")'),n.parent().addClass('hidden'),l.$lis.filter('.dropdown-header').each(function(){var q=c(this),s=q.data('optgroup');0===l.$lis.filter('[data-optgroup='+s+']').not(q).not('.hidden').length&&(q.addClass('hidden'),l.$lis.filter('[data-optgroup='+s+'div]').addClass('hidden'))});var p=l.$lis.not('.hidden');p.each(function(q){var s=c(this);s.hasClass('divider')&&(s.index()===p.first().index()||s.index()===p.last().index()||p.eq(q+1).hasClass('divider'))&&s.addClass('hidden')}),l.$lis.not('.hidden, .no-results').length?!!m.parent().length&&m.remove():(!!m.parent().length&&m.remove(),m.html(l.options.noneResultsText.replace('{0}','"'+f(l.$searchbox.val())+'"')).show(),l.$menuInner.append(m))}else l.$lis.not('.is-hidden').removeClass('hidden'),!m.parent().length||m.remove();l.$lis.filter('.active').removeClass('active'),l.$searchbox.val()&&l.$lis.not('.hidden, .divider, .dropdown-header').eq(0).addClass('active').children('a').focus(),c(this).focus()})},_searchStyle:function(){return{begins:'ibegins',startsWith:'ibegins'}[this.options.liveSearchStyle]||'icontains'},val:function(l){return'undefined'==typeof l?this.$element.val():(this.$element.val(l),this.render(),this.$element)},changeAll:function(l){'undefined'==typeof l&&(l=!0),this.findLis();for(var t,m=this.$element.find('option'),n=this.$lis.not('.divider, .dropdown-header, .disabled, .hidden').toggleClass('selected',l),p=n.length,q=[],s=0;s<p;s++)t=n[s].getAttribute('data-original-index'),q[q.length]=m.eq(t)[0];c(q).prop('selected',l),this.render(!1)},selectAll:function(){return this.changeAll(!0)},deselectAll:function(){return this.changeAll(!1)},keydown:function(l){var p,s,t,u,v,w,x,y,z,m=c(this),n=m.is('input')?m.parent().parent():m.parent(),q=n.data('this'),A=':not(.disabled, .hidden, .dropdown-header, .divider)',B={32:' ',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',59:';',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',96:'0',97:'1',98:'2',99:'3',100:'4',101:'5',102:'6',103:'7',104:'8',105:'9'};if(q.options.liveSearch&&(n=m.parent().parent()),q.options.container&&(n=q.$menu),p=c('[role=menu] li',n),z=q.$newElement.hasClass('open'),!z&&(48<=l.keyCode&&57>=l.keyCode||96<=l.keyCode&&105>=l.keyCode||65<=l.keyCode&&90>=l.keyCode)&&(q.options.container?q.$button.trigger('click'):(q.setSize(),q.$menu.parent().addClass('open'),z=!0),q.$searchbox.focus()),q.options.liveSearch&&(/(^9$|27)/.test(l.keyCode.toString(10))&&z&&0===q.$menu.find('.active').length&&(l.preventDefault(),q.$menu.parent().removeClass('open'),q.options.container&&q.$newElement.removeClass('open'),q.$button.focus()),p=c('[role=menu] li'+A,n),!m.val()&&!/(38|40)/.test(l.keyCode.toString(10))&&0===p.filter('.active').length&&(p=q.$menuInner.find('li'),p=q.options.liveSearchNormalize?p.filter(':a'+q._searchStyle()+'('+d(B[l.keyCode])+')'):p.filter(':'+q._searchStyle()+'('+B[l.keyCode]+')'))),!!p.length){if(/(38|40)/.test(l.keyCode.toString(10)))s=p.index(p.find('a').filter(':focus').parent()),u=p.filter(A).first().index(),v=p.filter(A).last().index(),t=p.eq(s).nextAll(A).eq(0).index(),w=p.eq(s).prevAll(A).eq(0).index(),x=p.eq(t).prevAll(A).eq(0).index(),q.options.liveSearch&&(p.each(function(G){c(this).hasClass('disabled')||c(this).data('index',G)}),s=p.index(p.filter('.active')),u=p.first().data('index'),v=p.last().data('index'),t=p.eq(s).nextAll().eq(0).data('index'),w=p.eq(s).prevAll().eq(0).data('index'),x=p.eq(t).prevAll().eq(0).data('index')),y=m.data('prevIndex'),38==l.keyCode?(q.options.liveSearch&&s--,s!=x&&s>w&&(s=w),s<u&&(s=u),s==y&&(s=v)):40==l.keyCode&&(q.options.liveSearch&&s++,-1==s&&(s=0),s!=x&&s<t&&(s=t),s>v&&(s=v),s==y&&(s=u)),m.data('prevIndex',s),q.options.liveSearch?(l.preventDefault(),!m.hasClass('dropdown-toggle')&&(p.removeClass('active').eq(s).addClass('active').children('a').focus(),m.focus())):p.eq(s).children('a').focus();else if(!m.is('input')){var D,E,C=[];p.each(function(){c(this).hasClass('disabled')||c.trim(c(this).children('a').text().toLowerCase()).substring(0,1)!=B[l.keyCode]||C.push(c(this).index())}),D=c(document).data('keycount'),D++,c(document).data('keycount',D),E=c.trim(c(':focus').text().toLowerCase()).substring(0,1),E==B[l.keyCode]?D>=C.length&&(c(document).data('keycount',0),D>C.length&&(D=1)):(D=1,c(document).data('keycount',D)),p.eq(C[D-1]).children('a').focus()}if((/(13|32)/.test(l.keyCode.toString(10))||/(^9$)/.test(l.keyCode.toString(10))&&q.options.selectOnTab)&&z){if(/(32)/.test(l.keyCode.toString(10))||l.preventDefault(),!q.options.liveSearch){var F=c(':focus');F.click(),F.focus(),l.preventDefault(),c(document).data('spaceSelect',!0)}else /(32)/.test(l.keyCode.toString(10))||(q.$menuInner.find('.active a').click(),m.focus());c(document).data('keycount',0)}(/(^9$|27)/.test(l.keyCode.toString(10))&&z&&(q.multiple||q.options.liveSearch)||/(27)/.test(l.keyCode.toString(10))&&!z)&&(q.$menu.parent().removeClass('open'),q.options.container&&q.$newElement.removeClass('open'),q.$button.focus())}},mobile:function(){this.$element.addClass('mobile-device')},refresh:function(){this.$lis=null,this.liObj={},this.reloadLi(),this.render(),this.checkDisabled(),this.liHeight(!0),this.setStyle(),this.setWidth(),this.$lis&&this.$searchbox.trigger('propertychange'),this.$element.trigger('refreshed.bs.select')},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove(),this.$element.remove()},destroy:function(){this.$newElement.remove(),this.$bsContainer?this.$bsContainer.remove():this.$menu.remove(),this.$element.off('.bs.select').removeData('selectpicker').removeClass('bs-select-hidden selectpicker')}};var j=c.fn.selectpicker;c.fn.selectpicker=g,c.fn.selectpicker.Constructor=h,c.fn.selectpicker.noConflict=function(){return c.fn.selectpicker=j,this},c(document).data('keycount',0).on('keydown.bs.select','.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input',h.prototype.keydown).on('focusin.modal','.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input',function(l){l.stopPropagation()}),c(window).on('load.bs.select.data-api',function(){c('.selectpicker').each(function(){var l=c(this);g.call(l,l.data())})})})(b)});
