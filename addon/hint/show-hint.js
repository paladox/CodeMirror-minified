'use strict';(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){function n(a,b){this.cm=a;this.options=b;this.widget=null;this.tick=this.debounce=0;this.startPos=this.cm.getCursor("start");this.startLen=this.cm.getLine(this.startPos.line).length-this.cm.getSelection().length;var d=this;a.on("cursorActivity",this.activityFunc=function(){d.cursorActivity()})}
function y(a,b){function d(a,c){var d="string"!=typeof c?function(a){return c(a,b)}:e.hasOwnProperty(c)?e[c]:c;f[a]=d}var e={Up:function(){b.moveFocus(-1)},Down:function(){b.moveFocus(1)},PageUp:function(){b.moveFocus(-b.menuSize()+1,!0)},PageDown:function(){b.moveFocus(b.menuSize()-1,!0)},Home:function(){b.setFocus(0)},End:function(){b.setFocus(b.length-1)},Enter:b.pick,Tab:b.pick,Esc:b.close},c=a.options.customKeys,f=c?{}:e;if(c)for(var g in c)c.hasOwnProperty(g)&&d(g,c[g]);if(a=a.options.extraKeys)for(g in a)a.hasOwnProperty(g)&&
d(g,a[g]);return f}function w(a,b){for(;b&&b!=a;){if("LI"===b.nodeName.toUpperCase()&&b.parentNode==a)return b;b=b.parentNode}}function q(a,b){this.completion=a;this.data=b;this.picked=!1;var d=this,e=a.cm,c=this.hints=document.createElement("ul");c.className="CodeMirror-hints";this.selectedHint=b.selectedHint||0;for(var m=b.list,g=0;g<m.length;++g){var l=c.appendChild(document.createElement("li")),h=m[g],p="CodeMirror-hint"+(g!=this.selectedHint?"":" CodeMirror-hint-active");null!=h.className&&(p=
h.className+" "+p);l.className=p;h.render?h.render(l,b,h):l.appendChild(document.createTextNode(h.displayText||("string"==typeof h?h:h.text)));l.hintId=g}g=e.cursorCoords(a.options.alignWithWord?b.from:null);var u=g.left,v=g.bottom,n=!0;c.style.left=u+"px";c.style.top=v+"px";l=window.innerWidth||Math.max(document.body.offsetWidth,document.documentElement.offsetWidth);var k=window.innerHeight||Math.max(document.body.offsetHeight,document.documentElement.offsetHeight);(a.options.container||document.body).appendChild(c);
h=c.getBoundingClientRect();var r=h.bottom-k;p=c.scrollHeight>c.clientHeight+1;var q=e.getScrollInfo();0<r&&(r=h.bottom-h.top,0<g.top-(g.bottom-h.top)-r?(c.style.top=(v=g.top-r)+"px",n=!1):r>k&&(c.style.height=k-5+"px",c.style.top=(v=g.bottom-h.top)+"px",k=e.getCursor(),b.from.ch!=k.ch&&(g=e.cursorCoords(k),c.style.left=(u=g.left)+"px",h=c.getBoundingClientRect())));k=h.right-l;0<k&&(h.right-h.left>l&&(c.style.width=l-5+"px",k-=h.right-h.left-l),c.style.left=(u=g.left-k)+"px");if(p)for(g=c.firstChild;g;g=
g.nextSibling)g.style.paddingRight=e.display.nativeBarWidth+"px";e.addKeyMap(this.keyMap=y(a,{moveFocus:function(a,b){d.changeActive(d.selectedHint+a,b)},setFocus:function(a){d.changeActive(a)},menuSize:function(){return d.screenAmount()},length:m.length,close:function(){a.close()},pick:function(){d.pick()},data:b}));if(a.options.closeOnUnfocus){var t;e.on("blur",this.onBlur=function(){t=setTimeout(function(){a.close()},100)});e.on("focus",this.onFocus=function(){clearTimeout(t)})}e.on("scroll",this.onScroll=
function(){var b=e.getScrollInfo(),d=e.getWrapperElement().getBoundingClientRect(),g=v+q.top-b.top,f=g-(window.pageYOffset||(document.documentElement||document.body).scrollTop);n||(f+=c.offsetHeight);if(f<=d.top||f>=d.bottom)return a.close();c.style.top=g+"px";c.style.left=u+q.left-b.left+"px"});f.on(c,"dblclick",function(a){(a=w(c,a.target||a.srcElement))&&null!=a.hintId&&(d.changeActive(a.hintId),d.pick())});f.on(c,"click",function(b){(b=w(c,b.target||b.srcElement))&&null!=b.hintId&&(d.changeActive(b.hintId),
a.options.completeOnSingleClick&&d.pick())});f.on(c,"mousedown",function(){setTimeout(function(){e.focus()},20)});f.signal(b,"select",m[this.selectedHint],c.childNodes[this.selectedHint]);return!0}function z(a,b){if(!a.somethingSelected())return b;a=[];for(var d=0;d<b.length;d++)b[d].supportsSelection&&a.push(b[d]);return a}function t(a,b,d,e){a.async?a(b,e,d):(a=a(b,d))&&a.then?a.then(e):e(a)}f.showHint=function(a,b,d){if(!b)return a.showHint(d);d&&d.async&&(b.async=!0);b={hint:b};if(d)for(var e in d)b[e]=
d[e];return a.showHint(b)};f.defineExtension("showHint",function(a){var b=this.getCursor("start"),d=this.options.hintOptions,e={},c;for(c in x)e[c]=x[c];if(d)for(c in d)void 0!==d[c]&&(e[c]=d[c]);if(a)for(c in a)void 0!==a[c]&&(e[c]=a[c]);e.hint.resolve&&(e.hint=e.hint.resolve(this,b));a=e;b=this.listSelections();if(!(1<b.length)){if(this.somethingSelected()){if(!a.hint.supportsSelection)return;for(c=0;c<b.length;c++)if(b[c].head.line!=b[c].anchor.line)return}this.state.completionActive&&this.state.completionActive.close();
b=this.state.completionActive=new n(this,a);b.options.hint&&(f.signal(this,"startCompletion",this),b.update(!0))}});var A=window.requestAnimationFrame||function(a){return setTimeout(a,1E3/60)},B=window.cancelAnimationFrame||clearTimeout;n.prototype={close:function(){this.active()&&(this.tick=this.cm.state.completionActive=null,this.cm.off("cursorActivity",this.activityFunc),this.widget&&this.data&&f.signal(this.data,"close"),this.widget&&this.widget.close(),f.signal(this.cm,"endCompletion",this.cm))},
active:function(){return this.cm.state.completionActive==this},pick:function(a,b){b=a.list[b];b.hint?b.hint(this.cm,a,b):this.cm.replaceRange("string"==typeof b?b:b.text,b.from||a.from,b.to||a.to,"complete");f.signal(a,"pick",b);this.close()},cursorActivity:function(){this.debounce&&(B(this.debounce),this.debounce=0);var a=this.cm.getCursor(),b=this.cm.getLine(a.line);if(a.line!=this.startPos.line||b.length-a.ch!=this.startLen-this.startPos.ch||a.ch<this.startPos.ch||this.cm.somethingSelected()||
a.ch&&this.options.closeCharacters.test(b.charAt(a.ch-1)))this.close();else{var d=this;this.debounce=A(function(){d.update()});this.widget&&this.widget.disable()}},update:function(a){if(null!=this.tick){var b=this,d=++this.tick;t(this.options.hint,this.cm,this.options,function(e){b.tick==d&&b.finishUpdate(e,a)})}},finishUpdate:function(a,b){this.data&&f.signal(this.data,"update");b=this.widget&&this.widget.picked||b&&this.options.completeSingle;this.widget&&this.widget.close();(this.data=a)&&a.list.length&&
(b&&1==a.list.length?this.pick(a,0):(this.widget=new q(this,a),f.signal(a,"shown")))}};q.prototype={close:function(){if(this.completion.widget==this){this.completion.widget=null;this.hints.parentNode.removeChild(this.hints);this.completion.cm.removeKeyMap(this.keyMap);var a=this.completion.cm;this.completion.options.closeOnUnfocus&&(a.off("blur",this.onBlur),a.off("focus",this.onFocus));a.off("scroll",this.onScroll)}},disable:function(){this.completion.cm.removeKeyMap(this.keyMap);var a=this;this.keyMap=
{Enter:function(){a.picked=!0}};this.completion.cm.addKeyMap(this.keyMap)},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(a,b){a>=this.data.list.length?a=b?this.data.list.length-1:0:0>a&&(a=b?0:this.data.list.length-1);this.selectedHint!=a&&(b=this.hints.childNodes[this.selectedHint],b.className=b.className.replace(" CodeMirror-hint-active",""),b=this.hints.childNodes[this.selectedHint=a],b.className+=" CodeMirror-hint-active",b.offsetTop<this.hints.scrollTop?
this.hints.scrollTop=b.offsetTop-3:b.offsetTop+b.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=b.offsetTop+b.offsetHeight-this.hints.clientHeight+3),f.signal(this.data,"select",this.data.list[this.selectedHint],b))},screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1}};f.registerHelper("hint","auto",{resolve:function(a,b){var d=a.getHelpers(b,"hint"),e;return d.length?(a=function(a,b,e){function c(d){if(d==f.length)return b(null);
t(f[d],a,e,function(a){a&&0<a.list.length?b(a):c(d+1)})}var f=z(a,d);c(0)},a.async=!0,a.supportsSelection=!0,a):(e=a.getHelper(a.getCursor(),"hintWords"))?function(a){return f.hint.fromList(a,{words:e})}:f.hint.anyword?function(a,b){return f.hint.anyword(a,b)}:function(){}}});f.registerHelper("hint","fromList",function(a,b){var d=a.getCursor();var e=a.getTokenAt(d),c=f.Pos(d.line,e.end);e.string&&/\w/.test(e.string[e.string.length-1])?(a=e.string,d=f.Pos(d.line,e.start)):(a="",d=c);e=[];for(var m=
0;m<b.words.length;m++){var g=b.words[m];g.slice(0,a.length)==a&&e.push(g)}if(e.length)return{list:e,from:d,to:c}});f.commands.autocomplete=f.showHint;var x={hint:f.hint.auto,completeSingle:!0,alignWithWord:!0,closeCharacters:/[\s()\[\]{};:>,]/,closeOnUnfocus:!0,completeOnSingleClick:!0,container:null,customKeys:null,extraKeys:null};f.defineOption("hintOptions",null)});
