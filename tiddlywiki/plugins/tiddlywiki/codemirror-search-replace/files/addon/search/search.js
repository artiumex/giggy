// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("./searchcursor"),require("../dialog/dialog")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./searchcursor","../dialog/dialog"],e):e(CodeMirror)}(function(d){"use strict";function o(){this.posFrom=this.posTo=this.lastQuery=this.query=null,this.overlay=null}function m(e){return e.state.search||(e.state.search=new o)}function a(e){return"string"==typeof e&&e==e.toLowerCase()}function y(e,o,n){return e.getSearchCursor(o,n,{caseFold:a(o),multiline:!0})}function h(e,o,n,r,t){e.openDialog?e.openDialog(o,t,{value:r,selectValueOnOpen:!0,bottom:e.options.search.bottom}):t(prompt(n,r))}function r(e){return e.replace(/\\([nrt\\])/g,function(e,o){return"n"==o?"\n":"r"==o?"\r":"t"==o?"\t":"\\"==o?"\\":e})}function s(e){var o=e.match(/^\/(.*)\/([a-z]*)$/);if(o)try{e=new RegExp(o[1],-1==o[2].indexOf("i")?"":"i")}catch(e){}else e=r(e);return("string"==typeof e?""==e:e.test(""))&&(e=/x^/),e}function g(e,o,n){var r,t;o.queryText=n,o.query=s(n),e.removeOverlay(o.overlay,a(o.query)),o.overlay=(r=o.query,t=a(o.query),"string"==typeof r?r=new RegExp(r.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),t?"gi":"g"):r.global||(r=new RegExp(r.source,r.ignoreCase?"gi":"g")),{token:function(e){r.lastIndex=e.pos;var o=r.exec(e.string);if(o&&o.index==e.pos)return e.pos+=o[0].length||1,"searching";o?e.pos=o.index:e.skipToEnd()}}),e.addOverlay(o.overlay),e.showMatchesOnScrollbar&&(o.annotate&&(o.annotate.clear(),o.annotate=null),o.annotate=e.showMatchesOnScrollbar(o.query,a(o.query)))}function n(a,o,e,n){var r=m(a);if(r.query)return x(a,o);var t,s,i,c,l,u,p,f=a.getSelection()||r.lastQuery;f instanceof RegExp&&"x^"==f.source&&(f=null),e&&a.openDialog?(t=null,s=function(e,o){d.e_stop(o),e&&(e!=r.queryText&&(g(a,r,e),r.posFrom=r.posTo=a.getCursor()),t&&(t.style.opacity=1),x(a,o.shiftKey,function(e,o){var n;o.line<3&&document.querySelector&&(n=a.display.wrapper.querySelector(".CodeMirror-dialog"))&&n.getBoundingClientRect().bottom-4>a.cursorCoords(o,"window").top&&((t=n).style.opacity=.4)}))},c=b(i=a),l=f,u=s,p=function(e,o){var n=d.keyName(e),r=a.getOption("extraKeys"),t=r&&r[n]||d.keyMap[a.getOption("keyMap")][n];"findNext"==t||"findPrev"==t||"findPersistentNext"==t||"findPersistentPrev"==t?(d.e_stop(e),g(a,m(a),o),a.execCommand(t)):"find"!=t&&"findPersistent"!=t||(d.e_stop(e),s(o,e))},i.openDialog(c,u,{value:l,selectValueOnOpen:!0,closeOnEnter:!1,onClose:function(){v(i)},onKeyDown:p,bottom:i.options.search.bottom}),n&&f&&(g(a,r,f),x(a,o))):h(a,b(a),"Search for:",f,function(e){e&&!r.query&&a.operation(function(){g(a,r,e),r.posFrom=r.posTo=a.getCursor(),x(a,o)})})}function x(n,r,t){n.operation(function(){var e=m(n),o=y(n,e.query,r?e.posFrom:e.posTo);(o.find(r)||(o=y(n,e.query,r?d.Pos(n.lastLine()):d.Pos(n.firstLine(),0))).find(r))&&(n.setSelection(o.from(),o.to()),n.scrollIntoView({from:o.from(),to:o.to()},20),e.posFrom=o.from(),e.posTo=o.to(),t&&t(o.from(),o.to()))})}function v(o){o.operation(function(){var e=m(o);e.lastQuery=e.query,e.query&&(e.query=e.queryText=null,o.removeOverlay(e.overlay),e.annotate&&(e.annotate.clear(),e.annotate=null))})}function b(e){return'<span class="CodeMirror-search-label">'+e.phrase("Search:")+'</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">'+e.phrase("(Use /re/ syntax for regexp search)")+"</span>"}function C(o,r,t){o.operation(function(){for(var n,e=y(o,r);e.findNext();){"string"!=typeof r?(n=o.getRange(e.from(),e.to()).match(r),e.replace(t.replace(/\$(\d)/g,function(e,o){return n[o]}))):e.replace(t)}})}function t(f,e){var o,n;f.getOption("readOnly")||(o=f.getSelection()||m(f).lastQuery,n='<span class="CodeMirror-search-label">'+(e?f.phrase("Replace all:"):f.phrase("Replace:"))+"</span>",h(f,n+(' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">'+f.phrase("(Use /re/ syntax for regexp search)")+"</span>"),n,o,function(p){p&&(p=s(p),h(f,'<span class="CodeMirror-search-label">'+f.phrase("With:")+'</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/>',f.phrase("Replace with:"),"",function(i){var c,l,u;i=r(i),e?C(f,p,i):(v(f),c=y(f,p,f.getCursor("from")),l=function(){var e,o,n,r,t,a,s=c.from();!(e=c.findNext())&&(c=y(f,p),!(e=c.findNext())||s&&c.from().line==s.line&&c.from().ch==s.ch)||(f.setSelection(c.from(),c.to()),f.scrollIntoView({from:c.from(),to:c.to()}),n='<span class="CodeMirror-search-label">'+(a=o=f).phrase("Replace?")+"</span> <button>"+a.phrase("Yes")+"</button> <button>"+a.phrase("No")+"</button> <button>"+a.phrase("All")+"</button> <button>"+a.phrase("Stop")+"</button> ",r=f.phrase("Replace?"),t=[function(){u(e)},l,function(){C(f,p,i)}],o.openConfirm?o.openConfirm(n,t):confirm(r)&&t[0]())},u=function(n){c.replace("string"==typeof p?i:i.replace(/\$(\d)/g,function(e,o){return n[o]})),l()},l())}))}))}d.defineOption("search",{bottom:!1}),d.commands.find=function(e){v(e),n(e)},d.commands.findPersistent=function(e){v(e),n(e,!1,!0)},d.commands.findPersistentNext=function(e){n(e,!1,!0,!0)},d.commands.findPersistentPrev=function(e){n(e,!0,!0,!0)},d.commands.findNext=n,d.commands.findPrev=function(e){n(e,!0)},d.commands.clearSearch=v,d.commands.replace=t,d.commands.replaceAll=function(e){t(e,!0)}});
