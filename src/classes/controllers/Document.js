(function(){
  var STATES, States, AUXSTATES, AuxStates, DocumentController, Controller, slice$ = [].slice;
  STATES = ['outline', 'mindmap'];
  States = new IS.Enum(STATES);
  AUXSTATES = ['sidebaropen', 'sidebarclosed'];
  AuxStates = new IS.Enum(AUXSTATES);
  angular.module(AppInfo.displayname).directive("ngcFocus", [
    '$parse', function($parse){
      return function(scope, element, attr){
        var fn;
        fn = $parse(attr['ngcFocus']);
        return element.bind('focus', function(e){
          return scope.$apply(function(){
            return fn(scope, {
              $event: e
            });
          });
        });
      };
    }
  ]);
  DocumentController = (function(superclass){
    var prototype = extend$((import$(DocumentController, superclass).displayName = 'DocumentController', DocumentController), superclass).prototype, constructor = DocumentController;
    function DocumentController(){
      var this$ = this instanceof ctor$ ? this : new ctor$;
      this$.propagateChange = bind$(this$, 'propagateChange', prototype);
      this$.changeStatus = bind$(this$, 'changeStatus', prototype);
      this$.getStyles = bind$(this$, 'getStyles', prototype);
      this$.getActiveDocument = bind$(this$, 'getActiveDocument', prototype);
      this$['switch'] = bind$(this$, 'switch', prototype);
      this$.configScope = bind$(this$, 'configScope', prototype);
      this$.hookKeyboard = bind$(this$, 'hookKeyboard', prototype);
      this$.init = bind$(this$, 'init', prototype);
      this$.initRuntime = bind$(this$, 'initRuntime', prototype);
      this$.renderDocumentTemplate = bind$(this$, 'renderDocumentTemplate', prototype);
      this$.prep = bind$(this$, 'prep', prototype);
      this$.passthrough = bind$(this$, 'passthrough', prototype);
      this$.nodeRemove = bind$(this$, 'nodeRemove', prototype);
      this$.nodeAddRoot = bind$(this$, 'nodeAddRoot', prototype);
      this$.nodeAdd = bind$(this$, 'nodeAdd', prototype);
      this$.fetchNode = bind$(this$, 'fetchNode', prototype);
      this$.fetchDocument = bind$(this$, 'fetchDocument', prototype);
      this$.remove = bind$(this$, 'remove', prototype);
      this$.add = bind$(this$, 'add', prototype);
      this$.replicate = bind$(this$, 'replicate', prototype);
      this$.nodeChange = bind$(this$, 'nodeChange', prototype);
      this$.log("Document Controller Online");
      window.DocumentController = this$;
      this$.STATES = STATES;
      this$.States = States;
      this$.AUXSTATES = STATES;
      this$.AuxStates = AuxStates;
      this$.renderDocumentTemplate();
      if (typeof Client != 'undefined' && Client !== null) {
        Client.events = {
          "node.change": function(){
            var args;
            args = slice$.call(arguments);
            return this$.passthrough(this$.nodeChange, args);
          },
          "node.add": function(){
            var args;
            args = slice$.call(arguments);
            return this$.passthrough(this$.nodeAdd, args);
          },
          "node.add-root": function(){
            var args;
            args = slice$.call(arguments);
            return this$.passthrough(this$.nodeAddRoot, args);
          },
          "node.remove": function(){
            var args;
            args = slice$.call(arguments);
            return this$.passthrough(this$.nodeRemove, args);
          }
        };
      }
      if (typeof Client != 'undefined' && Client !== null) {
        Client.loadEvents();
      }
      return this$;
    } function ctor$(){} ctor$.prototype = prototype;
    prototype.nodeChange = function(index, property, value){
      var node;
      this.log("Changing " + index + "'s " + property + " to " + value);
      node = this.fetchNode(index);
      node[property] = value;
      if (property === 'status') {
        this.propagateChange(node);
      }
      return this.safeApply();
    };
    prototype.replicate = function(node, property){
      return this.prep('node.change', node.$index, property, node[property]);
    };
    prototype.add = function(node){
      this.nodeAdd(node.$index);
      return this.prep('node.add', node.$index);
    };
    prototype.remove = function(node){
      this.nodeRemove(node.$index);
      return this.prep('node.remove', node.$index);
    };
    prototype.fetchDocument = function(){
      return this.models._reccords[this.runtime.props['active-document']];
    };
    prototype.fetchNode = function(index){
      return this.fetchDocument().indexes[index - 1];
    };
    prototype.nodeAdd = function(index){
      var node;
      node = this.fetchNode(index);
      node.children == null && (node.children = []);
      node.children.push({
        title: "New Node"
      });
      this.fetchDocument().refresh();
      return this.safeApply();
    };
    prototype.nodeAddRoot = function(init){
      var doc;
      init == null && (init = false);
      doc = this.fetchDocument();
      doc.data.push({
        title: "New Root Document"
      });
      doc.refresh();
      this.safeApply();
      if (!init) {
        return this.prep("node.add-root", true);
      }
    };
    prototype.nodeRemove = function(index){
      var node, repo;
      node = this.fetchNode(index);
      repo = node.$parent.children || node.$parent.data;
      repo.splice(repo.indexOf(node, 1));
      this.fetchDocument().refresh();
      return this.safeApply();
    };
    prototype.passthrough = function(fn, args){
      var id;
      id = args.pop();
      if (id !== Client.id) {
        return fn.apply(this, args);
      }
    };
    prototype.prep = function(ev){
      var data;
      data = slice$.call(arguments, 1);
      data.push(Client.id);
      data.unshift(ev);
      return Client.publish.apply(Client, data);
    };
    prototype.renderDocumentTemplate = function(){
      var div;
      div = document.createElement("div");
      div.setAttribute("rel", "Main Document Placeholder");
      div.setAttribute("id", "documentplaceholder");
      div.innerHTML = DepMan.render(['document', 'index'], {
        AuxStates: AuxStates
      });
      return $(div).insertBefore($('section#application').children()[0]);
    };
    prototype.initRuntime = function(){
      return this.runtime.init("document-state", 'number');
    };
    prototype.init = function(scope, runtime, models){
      this.scope = scope;
      this.runtime = runtime;
      this.models = models;
      this.configScope();
      this.initRuntime();
      this.hookKeyboard();
      this.runtime.subscribe('prop-active-document-change', this.getActiveDocument);
      return this.getActiveDocument();
    };
    prototype.hookKeyboard = function(){
      var key, handle, this$ = this;
      key = Tester.mac ? "cmd" : "ctrl";
      handle = function(e, way){
        way == null && (way = null);
        e.preventDefault();
        if (way) {
          this$.runtime.set("document-state", States[way]);
        } else if (this$.runtime.props['document-state'] === States.outline) {
          this$.runtime.set('document-state', States.mindmap);
        } else {
          this$.runtime.set('document-state', States.outline);
        }
        return this$.safeApply();
      };
      jwerty.key(key + "+[", function(it){
        return handle(it, 'mindmap');
      });
      jwerty.key(key + "+]", function(it){
        return handle(it, 'outline');
      });
      return jwerty.key(key + "+alt+tab", function(it){
        return handle(it);
      });
    };
    prototype.configScope = function(){
      var this$ = this;
      this.safeApply = function(fn){
        var phase;
        phase = this$.scope.$parent.$$phase;
        if (phase === "$apply" || phase === "$digest") {
          if (fn && typeof fn === 'function') {
            return fn();
          }
        } else {
          return this$.scope.$apply(fn);
        }
      };
      return import$(this.scope, this);
    };
    prototype['switch'] = function(id){
      return this.runtime.set('active-document', id);
    };
    prototype.getActiveDocument = function(){
      this.scope.activeDocument = this.models._reccords[this.runtime.get('active-document')];
      this.runtime.set('document-state', States.outline);
      return this.safeApply();
    };
    prototype.getStyles = function(node){
      return {
        paddingLeft: node.$depth * 50 + 25
      };
    };
    prototype.changeStatus = function(node, preventBubble){
      var oldstatus;
      preventBubble == null && (preventBubble = false);
      oldstatus = node.status;
      (function(){
        var det, i$, ref$, len$, kid, ref1$;
        if (this.children && this.children.length > 0) {
          det = 0;
          for (i$ = 0, len$ = (ref$ = this.children).length; i$ < len$; ++i$) {
            kid = ref$[i$];
            if ((ref1$ = kid.status) == 'checked' || ref1$ == 'determinate') {
              det++;
            }
          }
          if (det === this.children.length) {
            this.status = 'determinate';
          } else {
            this.status = 'indeterminate';
          }
        } else {
          if (this.$status) {
            this.status = 'checked';
          } else {
            this.status = 'unchecked';
          }
        }
      }.call(node));
      if (node.status !== oldstatus) {
        if (!preventBubble) {
          this.replicate(node, 'status');
          this.propagateChange(node);
          return this.safeApply();
        }
      }
    };
    prototype.propagateChange = function(node){
      while (node) {
        if (node.$parent) {
          node = node.$parent;
        } else {
          break;
        }
        this.changeStatus(node, true);
      }
      return this.safeApply();
    };
    return DocumentController;
  }(IS.Object));
  Controller = new DocumentController();
  angular.module(AppInfo.displayname).controller("Document", ["$scope", "Runtime", "Documents", Controller.init]);
  module.exports = Controller;
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
