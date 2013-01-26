(function(module){
	/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };

  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
})();
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"Addons/ORM/MongoDB": function(exports, require, module) {(function() {
  var Addons;

  Addons = {
    "ORM": {}
  };

  Addons.ORM.MongoDBConnector = (function() {

    function MongoDBConnector() {}

    MongoDBConnector.prototype._identifier = "Mongo";

    MongoDBConnector.prototype.create = function() {
      return this["super"].create.apply(this, arguments);
    };

    MongoDBConnector.prototype.extended = function() {};

    return MongoDBConnector;

  })();

  module.exports = Addons.ORM.MongoDBConnector.prototype;

}).call(this);
}, "ErrorReporter": function(exports, require, module) {(function() {
  var ErrorReporter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ErrorReporter = (function() {

    function ErrorReporter() {
      this.toString = __bind(this.toString, this);

    }

    ErrorReporter._errorGroupMap = [0];

    ErrorReporter._errorGroups = ["Unknown Error"];

    ErrorReporter._errorMessages = ["An unknown error has occurred"];

    ErrorReporter.errorGroupMap = [];

    ErrorReporter.errorGroups = [];

    ErrorReporter.errorMessages = [];

    ErrorReporter.wrapCustomError = function(error) {
      return "[" + error.name + "] " + error.message;
    };

    ErrorReporter.generate = function(errorCode, extra) {
      if (extra == null) {
        extra = null;
      }
      return (new this).generate(errorCode, this, extra);
    };

    ErrorReporter.extended = function() {
      var item, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if ((this["super"] != null) && (this["super"].errorGroupMap != null)) {
        _ref = this["super"].errorGroupMap;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          this._errorGroupMap.push(item);
        }
      }
      if ((this["super"] != null) && (this["super"].errorGroups != null)) {
        _ref1 = this["super"].errorGroups;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          item = _ref1[_j];
          this._errorGroups.push(item);
        }
      }
      if ((this["super"] != null) && (this["super"].errorMessages != null)) {
        _ref2 = this["super"].errorMessages;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          item = _ref2[_k];
          this._errorMessages.push(item);
        }
      }
      return this.include(ErrorReporter.prototype);
    };

    ErrorReporter.prototype.generate = function(errCode, ER, extra) {
      if (extra == null) {
        extra = null;
      }
      if (!(ER._errorGroupMap[errCode] != null)) {
        this.name = ER._errorGroups[0];
        this.message = ER._errorMessages[0];
      } else {
        this.name = ER._errorGroups[ER._errorGroupMap[errCode]];
        this.message = ER._errorMessages[errCode];
      }
      if ((extra != null) && extra) {
        this.message += ((extra != null) && extra ? " - Extra Data : " + extra : void 0);
      }
      this.errCode = errCode;
      return this;
    };

    ErrorReporter.prototype.toString = function() {
      return "[" + this.name + "] " + this.message + " |" + this.errCode + "|";
    };

    return ErrorReporter;

  })();

  module.exports = ErrorReporter;

}).call(this);
}, "Modules/Mediator": function(exports, require, module) {(function() {
  var Modules;

  Modules = {
    Observer: require("Modules/Observer")
  };

  Modules.Mediator = (function() {
    var extended, included, installTo, key, value, _ref;

    function Mediator() {}

    _ref = Modules.Observer;
    for (key in _ref) {
      value = _ref[key];
      Mediator.prototype[key] = value;
    }

    installTo = function(object) {
      this.delegate("publish", object);
      return this.delegate("subscribe", object);
    };

    included = function() {
      this.prototype.queue = {};
      return this.prototype._delegates = {
        publish: true,
        subscribe: true
      };
    };

    extended = function() {
      this.queue = {};
      return this._delegates = {
        publish: true,
        subscribe: true
      };
    };

    return Mediator;

  })();

  module.exports = Modules.Mediator.prototype;

}).call(this);
}, "Modules/ORM": function(exports, require, module) {(function() {
  var Modules, V,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Modules = {};

  V = require("Variable");

  Modules.ORM = (function() {

    function ORM() {}

    ORM.prototype._identifier = "BasicORM";

    ORM.prototype._reccords = {};

    ORM.prototype._symlinks = {};

    ORM.prototype._head = 0;

    ORM.prototype._props = [];

    ORM.prototype.get = function(which) {
      if (typeof which === "object") {
        return this.getAdv(which);
      }
      return this._symlinks[which] || this._reccords[which] || null;
    };

    ORM.prototype.getAdv = function(what) {
      var check, key, rec, results, _ref, _ref1;
      results = [];
      check = function(rec) {
        var final, k, mod, modfinal, recs, v, val, value, _i, _len;
        for (k in what) {
          v = what[k];
          final = false;
          if (!(rec[k] != null)) {
            break;
          }
          if ((typeof v) === "object") {
            for (mod in v) {
              val = v[mod];
              modfinal = true;
              switch (mod) {
                case "$gt":
                  if ((rec[k].get()) <= val) {
                    modfinal = false;
                    break;
                  }
                  break;
                case "$gte":
                  if ((rec[k].get()) < val) {
                    modfinal = false;
                    break;
                  }
                  break;
                case "$lt":
                  if ((rec[k].get()) >= val) {
                    modfinal = false;
                    break;
                  }
                  break;
                case "$lte":
                  if ((rec[k].get()) > val) {
                    modfinal = false;
                    break;
                  }
                  break;
                case "$contains":
                  recs = rec[k].get();
                  if (recs.constructor !== Array) {
                    modfinal = false;
                    break;
                  }
                  modfinal = false;
                  for (_i = 0, _len = recs.length; _i < _len; _i++) {
                    value = recs[_i];
                    if (value === val) {
                      modfinal = true;
                      break;
                    }
                  }
              }
              if (modfinal === false) {
                break;
              }
            }
            if (modfinal === true) {
              final = true;
            }
          } else if ((rec[k].get()) === v) {
            final = true;
          } else {
            break;
          }
        }
        if (final) {
          return results.push(rec);
        }
      };
      _ref = this._reccords;
      for (key in _ref) {
        rec = _ref[key];
        check(rec);
      }
      _ref1 = this._symlinks;
      for (key in _ref1) {
        rec = _ref1[key];
        check(rec);
      }
      if (results.length === 0) {
        return null;
      }
      if (results.length === 1) {
        return results[0];
      }
      return results;
    };

    ORM.prototype["delete"] = function(which) {
      var _base, _base1, _ref, _ref1;
      if ((_ref = (_base = this._reccords)[which]) == null) {
        _base[which] = null;
      }
      return (_ref1 = (_base1 = this._symlinks)[which]) != null ? _ref1 : _base1[which] = null;
    };

    ORM.prototype.create = function(id, args) {
      var prop, uuid, _i, _len, _ref, _ref1, _ref2;
      if ((_ref = this._reccords) == null) {
        this._reccords = {};
      }
      if (args == null) {
        args = {};
      }
      uuid = id || args._id || this._head;
      if ((_ref1 = args._id) == null) {
        args._id = uuid;
      }
      uuid = Math.uuidFast(uuid);
      args._uuid = uuid;
      args._fn = this;
      if (typeof this.preCreate === "function") {
        this.preCreate(args);
      }
      this._reccords[uuid] = new this(args);
      this._reccords[uuid]._constructor(args);
      if (typeof this.postCreate === "function") {
        this.postCreate(this._reccords[uuid], args);
      }
      if ((id != null) && id !== this._head) {
        this._symlinks[id] = this._reccords[uuid];
      }
      if (uuid === this._head) {
        this._head++;
      }
      _ref2 = this._props;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        prop = _ref2[_i];
        this._reccords[uuid][prop] = V.spawn();
      }
      return this._reccords[uuid];
    };

    ORM.prototype.reuse = function(which, args) {
      var rez;
      if (args == null) {
        args = {};
      }
      rez = this.get(which);
      if (rez != null) {
        return rez;
      }
      return this.create(which, args);
    };

    ORM.prototype.addProp = function(prop) {
      var key, rec, _ref, _ref1, _results;
      this._props.push(prop);
      _ref = this._reccords;
      _results = [];
      for (key in _ref) {
        rec = _ref[key];
        _results.push((_ref1 = rec[prop]) != null ? _ref1 : rec[prop] = V.spawn());
      }
      return _results;
    };

    ORM.prototype.removeProp = function(prop) {
      var k, key, p, rec, _i, _len, _ref, _ref1, _ref2;
      _ref = this._reccords;
      for (key in _ref) {
        rec = _ref[key];
        if ((_ref1 = rec[prop]) == null) {
          rec[prop] = null;
        }
      }
      _ref2 = this._props;
      for (k = _i = 0, _len = _ref2.length; _i < _len; k = ++_i) {
        p = _ref2[k];
        if (p === prop) {
          return this._props.splice(k, 1);
        }
      }
    };

    ORM.prototype.extended = function() {
      this._excludes = ["_fn", "_uuid", "_id"];
      return this.include({
        _constructor: function(args) {
          var k, key, v, value, valueSet, _results;
          valueSet = {};
          this._uuid = args._uuid || null;
          this._id = args._id || null;
          this.fn = args._fn;
          for (key in args) {
            value = args[key];
            if (__indexOf.call(this.fn._excludes, key) < 0 && (this.constructFilter(key, value)) !== false) {
              valueSet[key] = value;
            }
          }
          if (this.init != null) {
            return this.init.call(this, valueSet);
          }
          _results = [];
          for (k in valueSet) {
            v = valueSet[k];
            _results.push(this[k] = v);
          }
          return _results;
        },
        constructFilter: function(key, value) {
          return true;
        },
        remove: function() {
          return this.parent.remove(this.id);
        }
      });
    };

    return ORM;

  })();

  module.exports = function(addon) {
    var item, test, valid, x, _i, _len;
    if ((IS.Addons != null) && (IS.Addons.ORM != null) && IS.Addons.ORM[addon]) {
      x = (require("Object")).clone(Modules.ORM);
      (require("Object")).extend(IS.Addons.ORM[addon], x);
    } else if (addon != null) {
      test = ["reuse", "addProp", "removeProp", "get", "create", "delete"];
      valid = true;
      for (_i = 0, _len = test.length; _i < _len; _i++) {
        item = test[_i];
        if (!(addon[item] != null)) {
          valid = false;
        }
      }
      if (valid) {
        x = (require("Object")).clone(Modules.ORM.prototype);
        (require("Object")).extend(addon, x);
      }
    }
    if (x != null) {
      return x;
    } else {
      return Modules.ORM.prototype;
    }
  };

}).call(this);
}, "Modules/Observer": function(exports, require, module) {(function() {
  var Modules,
    __slice = [].slice;

  Modules = {};

  Modules.Observer = (function() {

    function Observer() {}

    Observer.prototype.delegateEvent = function(event, handler, object) {
      var c, _base, _ref;
      if (object == null) {
        object = window;
      }
      if ((event.substr(0, 2)) === "on") {
        event = event.substr(2);
      }
      if ((_ref = (_base = this.queue)[event]) == null) {
        _base[event] = [];
      }
      c = this.queue[event].length;
      this.queue[event].unshift(function() {
        return handler.apply(object, arguments);
      });
      return c;
    };

    Observer.prototype.subscribe = function(event, handler) {
      return this.delegateEvent(event, handler, this);
    };

    Observer.prototype.publish = function() {
      var args, event, handler, key, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      event = args[0];
      args = args.splice(1);
      if (!event || !(this.queue[event] != null)) {
        return this;
      }
      _ref = this.queue[event];
      for (key in _ref) {
        handler = _ref[key];
        if (key !== "__head") {
          handler.apply(this, args);
        }
      }
      return this;
    };

    Observer.prototype.unsubscribe = function(event, id) {
      if (!this.queue[event]) {
        return null;
      }
      if (!this.queue[event][id]) {
        return null;
      }
      return this.queue[event].splice(id, 1);
    };

    Observer.prototype.included = function() {
      return this.prototype.queue = {};
    };

    Observer.prototype.extended = function() {
      return this.queue = {};
    };

    return Observer;

  })();

  module.exports = Modules.Observer.prototype;

}).call(this);
}, "Modules/StateMachine": function(exports, require, module) {(function() {
  var Modules,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Modules = {};

  Modules.StateMachine = (function() {

    function StateMachine() {
      this.delegateContext = __bind(this.delegateContext, this);

    }

    StateMachine.prototype.extended = function() {
      this._contexts = [];
      return this._activeContext = null;
    };

    StateMachine.prototype.included = function() {
      this.prototype._contexts = [];
      return this.prototype._activeContext = null;
    };

    StateMachine.prototype.delegateContext = function(context) {
      var l;
      if (this._find(context)) {
        return null;
      }
      l = this._contexts.length;
      this._contexts[l] = context;
      if (!(context.activate != null)) {
        context.activate = function() {};
      }
      if (!(context.deactivate != null)) {
        context.deactivate = function() {};
      }
      return this;
    };

    StateMachine.prototype.getActiveContextID = function() {
      return this._activeContext;
    };

    StateMachine.prototype.getActiveContext = function() {
      return this._activeContext;
    };

    StateMachine.prototype.getContext = function(context) {
      return this._contexts[context] || null;
    };

    StateMachine.prototype._find = function(con) {
      var key, value, _i, _len, _ref;
      _ref = this._contexts;
      for (value = _i = 0, _len = _ref.length; _i < _len; value = ++_i) {
        key = _ref[value];
        if (con === key) {
          return value;
        }
      }
      return null;
    };

    StateMachine.prototype.activateContext = function(context) {
      var con;
      con = this._find(context);
      if (!(con != null)) {
        return null;
      }
      if (this._activeContext === con) {
        return true;
      }
      this._activeContext = con;
      return context.activate();
    };

    StateMachine.prototype.deactivateContext = function(context) {
      if (!((this._find(context)) != null)) {
        return null;
      }
      this._activeContext = null;
      return context.deactivate();
    };

    StateMachine.prototype.switchContext = function(context) {
      var con;
      if (!(context != null)) {
        con = this._activeContext + 1;
        if (con === this._contexts.length) {
          con = 0;
        }
      } else {
        con = this._find(context);
        if (!(con != null)) {
          return null;
        }
      }
      this.deactivateContext(this._contexts[this._activeContext]);
      this.activateContext(this._contexts[con]);
      return this._contexts[con];
    };

    return StateMachine;

  })();

  module.exports = Modules.StateMachine.prototype;

}).call(this);
}, "Object": function(exports, require, module) {(function() {
  var Obiect, clone, _excludes,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  _excludes = ["included", "extended"];

  clone = function(obj) {
    var k, o, v;
    o = obj instanceof Array ? [] : {};
    for (k in obj) {
      v = obj[k];
      if ((v != null) && typeof v === "object") {
        o[k] = clone(v);
      } else {
        o[k] = v;
      }
    }
    return o;
  };

  Obiect = (function() {
    var extended, included;

    function Obiect() {}

    Obiect.clone = function(obj) {
      if (obj == null) {
        obj = this;
      }
      debugger;
      return (Obiect.proxy(Obiect.include, (Obiect.proxy(Obiect.extend, function() {}))(obj)))(obj.prototype);
    };

    Obiect.extend = function(obj, into) {
      var k, value, _ref, _ref1;
      if (into == null) {
        into = this;
      }
      obj = clone(obj);
      for (k in obj) {
        value = obj[k];
        if (!((__indexOf.call(_excludes, k) >= 0) || ((obj._excludes != null) && __indexOf.call(obj._excludes, k) >= 0))) {
          if (into[k] != null) {
            if ((_ref = into["super"]) == null) {
              into["super"] = {};
            }
            into["super"][k] = into[k];
          }
          into[k] = value;
        }
      }
      if ((_ref1 = obj.extended) != null) {
        _ref1.call(into);
      }
      return this;
    };

    Obiect.include = function(obj, into) {
      var key, value, _ref;
      if (into == null) {
        into = this;
      }
      obj = clone(obj);
      for (key in obj) {
        value = obj[key];
        into.prototype[key] = value;
      }
      if ((_ref = obj.included) != null) {
        _ref.call(into);
      }
      return this;
    };

    Obiect.proxy = function() {
      var to, what,
        _this = this;
      what = arguments[0];
      to = arguments[1];
      if (typeof what === "function") {
        return function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return what.apply(to, args);
        };
      } else {
        return this[what];
      }
    };

    Obiect.delegate = function(property, context) {
      var _ref;
      if ((((_ref = this._delegates) != null ? _ref[property] : void 0) != null) === false && this._deleagates[property] !== false) {
        trigger("Cannot delegate member " + property + " to " + context);
      }
      return context[property] = this.proxy(function() {
        return this[property](arguments);
      }, this);
    };

    extended = function() {};

    included = function() {};

    Obiect.include({
      proxy: Obiect.proxy
    });

    return Obiect;

  })();

  module.exports = Obiect;

}).call(this);
}, "Variable": function(exports, require, module) {(function() {
  var Variable,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Variable = (function(_super) {

    __extends(Variable, _super);

    function Variable() {
      return Variable.__super__.constructor.apply(this, arguments);
    }

    Variable.spawn = function() {
      var x;
      x = new this;
      x._value = null;
      return x;
    };

    Variable.prototype.get = function() {
      return this._value;
    };

    Variable.prototype.set = function(value) {
      return this._value = value;
    };

    Variable.prototype.add = function(reccord) {
      if (!(this._value != null) || this._value.constructor !== Array) {
        this._value = [];
      }
      return this._value.push(reccord);
    };

    return Variable;

  })(require("Object"));

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Variable;
  }

}).call(this);
}});

	var require = this.require;
	(function() {
  var IS;

  require('Object');

  IS = {
    Variable: require('Variable'),
    Object: require('Object'),
    ErrorReporter: require('ErrorReporter'),
    Addons: {
      ORM: {
        MongoDB: require('Addons/ORM/MongoDB')
      }
    },
    Modules: {
      StateMachine: require('Modules/StateMachine'),
      ORM: require('Modules/ORM'),
      Observer: require('Modules/Observer'),
      Mediator: require('Modules/Mediator')
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.IS = IS;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = IS;
  }

  if (typeof root !== "undefined" && root !== null) {
    root.IS = IS;
  }

}).call(this);

}).call({}, typeof(module) == "undefined" ? (typeof(window) == "undefined" ? root : window) : module);
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"Application": function(exports, require, module) {(function() {
  var Application,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require("Object");

  Application = (function(_super) {

    __extends(Application, _super);

    function Application(message) {
      var el, els, root, switchMode, _i, _len, _resize;
      root = window;
      root.echo = (require("Object")).echo;
      document.title = "Arrow Brainstorming";
      (function() {
        var meta;
        meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1");
        return document.head.appendChild(meta);
      })();
      root.DepMan = new (require("helpers/DependenciesManager"));
      DepMan.stylesheet("font-awesome");
      DepMan.googleFont("Electrolize", [400]);
      DepMan.googleFont("Open Sans", [400], ["latin", "latin-ext"]);
      document.body.innerHTML = DepMan.render("index", {
        title: "Arrow",
        copyright: "&copy; Sabin Marcu 2013"
      });
      root.DnD = DepMan.controller("DragAndDrop");
      root.DnD.init();
      root.isMobile = true;
      if ((window.orientation != null) || (document.orientation != null)) {
        root.isMobile = true;
        document.querySelector("html").className += " mobile ";
        document.querySelector("aside").addEventListener("click", function(e) {
          return console.log("Aside Tagged");
        });
        els = document.querySelectorAll("article > *");
        for (_i = 0, _len = els.length; _i < _len; _i++) {
          el = els[_i];
          el.addEventListener("click", function(e) {
            return console.log("" + this.tagName + " Tagged");
          });
        }
      }
      _resize = function() {
        var html;
        html = document.querySelector("html");
        if (window.innerWidth <= 1024) {
          if (html.className.indexOf("smallscreen") === -1) {
            return html.className += " smallscreen";
          }
        } else {
          return html.className = html.className.replace(/\ ?smallscreen/, "");
        }
      };
      window.addEventListener("resize", _resize);
      _resize();
      DepMan.helper("OPMLManager");
      switchMode = function(mode) {
        var html;
        html = document.querySelector("html");
        if (html.className.indexOf(mode) >= 0) {
          return html.className = html.className.replace(new RegExp("\ ?" + mode), "");
        } else {
          return html.className += " " + mode;
        }
      };
      document.getElementById("sidebarToggle").addEventListener("click", function() {
        return switchMode("sidebaroff");
      });
      document.getElementById("fullScreenToggle").addEventListener("click", function() {
        return switchMode("fullscreen");
      });
    }

    return Application;

  })(BaseObject);

  module.exports = Application;

}).call(this);
}, "Object": function(exports, require, module) {(function() {
  var BObject, _baseObj,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _baseObj = {
    echo: function() {
      var args, owner, _d;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _d = new Date;
      owner = "<not supported>";
      if (this.__proto__ != null) {
        owner = this.__proto__.constructor.name;
      }
      args[0] = "[" + (_d.getHours()) + ":" + (_d.getMinutes()) + ":" + (_d.getSeconds()) + "][" + (this.name || owner) + "]	" + args[0];
      return this;
    }
  };

  BObject = (function(_super) {

    __extends(BObject, _super);

    function BObject() {
      return BObject.__super__.constructor.apply(this, arguments);
    }

    BObject.extend(_baseObj);

    BObject.include(_baseObj);

    return BObject;

  })(IS.Object);

  module.exports = window.BaseObject = BObject;

}).call(this);
}, "controllers/ContextMenu": function(exports, require, module) {(function() {
  var ContextMenuController,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ContextMenuController = (function(_super) {

    __extends(ContextMenuController, _super);

    function ContextMenuController(data, event) {
      this.deactivate = __bind(this.deactivate, this);

      var handler, handlers, items, kid, name, _fn, _i, _len, _ref,
        _this = this;
      items = [];
      handlers = [];
      for (name in data) {
        handler = data[name];
        items.push(name);
        handlers.push(handler);
      }
      this.placeholder = document.createElement("div");
      this.placeholder.innerHTML = DepMan.render("ContextMenu", {
        items: items,
        event: {
          x: event.clientX || event.touches[0].clientX,
          y: event.clientY || event.touches[0].clientY
        }
      });
      this.menu = this.placeholder.children[0];
      document.body.appendChild(this.placeholder);
      this.menu.focus();
      this.menu.addEventListener("blur", this.deactivate);
      window.addEventListener("click", function(e) {
        if (e.target !== _this.menu) {
          return _this.deactivate();
        }
      });
      _ref = this.menu.children;
      _fn = function(kid) {
        var id;
        id = kid.id.replace("item-", "");
        return kid.addEventListener("click", function() {
          _this.deactivate();
          return handlers[id]();
        });
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        kid = _ref[_i];
        _fn(kid);
      }
    }

    ContextMenuController.prototype.deactivate = function() {
      this.placeholder.parentNode.removeChild(this.placeholder);
      delete this.menu;
      return delete this.placeholder;
    };

    return ContextMenuController;

  })(BaseObject);

  module.exports = ContextMenuController;

}).call(this);
}, "controllers/DragAndDrop": function(exports, require, module) {(function() {
  var DnD, DnDER,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DnD = (function(_super) {

    __extends(DnD, _super);

    function DnD() {
      return DnD.__super__.constructor.apply(this, arguments);
    }

    DnD.ph = null;

    DnD.init = function() {
      document.addEventListener("dragenter", this.proxy(this.dragEnter, this), true);
      document.addEventListener("dragexit", this.proxy(this.dragExit, this), true);
      return document.addEventListener("dragleave", this.proxy(this.dragExit, this), true);
    };

    DnD.dragEnter = function(e) {
      var span;
      this.ph = document.createElement("div");
      this.ph.className = "dragdropplaceholder";
      span = document.createElement("span");
      span.innerHTML = "Drop file over here";
      this.ph.appendChild(span);
      document.querySelector("article section").appendChild(this.ph);
      this.ph.className += " active";
      this.ph.addEventListener("dragover", this.proxy(this.dragOver, this), true);
      this.ph.addEventListener("drop", this.proxy(this.dragHandler, this), true);
      e.stopPropagation();
      return e.preventDefault();
    };

    DnD.dragExit = function(e) {
      this.ph.parentNode.removeChild(this.ph);
      e.stopPropagation();
      return e.preventDefault();
    };

    DnD.dragOver = function(e) {
      this.ph.className = this.ph.className.replace(/\ ?hover/, "");
      this.ph.className += " hover";
      e.dataTransfer.dropEffect = "copy";
      e.stopPropagation();
      return e.preventDefault();
    };

    DnD.dragHandler = function(e) {
      var file, files, _i, _len, _results;
      e.stopPropagation();
      e.preventDefault();
      DnD.ph.className = DnD.ph.className.replace(/\ ?(hover|active)/, "");
      files = e.dataTransfer.files || e.target.files;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        if (!file.name.match(/.*opml/)) {
          continue;
        }
        _results.push((function() {
          var reader;
          reader = new FileReader;
          reader.onload = DnD.readHandler;
          return reader.readAsText(file);
        })());
      }
      return _results;
    };

    DnD.readHandler = function(file) {
      return DepMan.helper("OPMLManager").open(file.target.result);
    };

    return DnD;

  }).call(this, BaseObject);

  module.exports = DnD;

  DnDER = (function(_super) {

    __extends(DnDER, _super);

    function DnDER() {
      return DnDER.__super__.constructor.apply(this, arguments);
    }

    DnDER.errorGroups = [];

    DnDER.errorGroupMap = [];

    DnDER.errorMessages = [];

    DnDER.extend(IS.ErrorReporter);

    return DnDER;

  })(IS.Object);

}).call(this);
}, "controllers/OPML": function(exports, require, module) {(function() {
  var ER, OPMLController, OPMLControllerErrorReporter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  OPMLController = (function(_super) {

    __extends(OPMLController, _super);

    function OPMLController(model) {
      this.model = model;
      this.deactivate = __bind(this.deactivate, this);

      this.activate = __bind(this.activate, this);

      this.e = document.createElement("article");
      this.model.structure.render(this.e);
    }

    OPMLController.prototype.activate = function() {
      var _this = this;
      document.querySelector("article section").appendChild(this.e);
      this.e.className = "activating";
      document.getElementById("downloadButton").addEventListener("click", this.model.download);
      document.getElementById("saveButton").addEventListener("click", this.model.save);
      return setTimeout(function() {
        return _this.e.className = "activated";
      }, 50);
    };

    OPMLController.prototype.deactivate = function() {
      var _this = this;
      console.log("deactivating");
      this.e.className = "deactivated";
      setTimeout(function() {
        return document.querySelector("article section").removeChild(_this.e);
      }, 1000);
      document.getElementById("downloadButton").removeEventListener("click", this.model.download);
      return document.getElementById("saveButton").removeEventListener("click", this.model.save);
    };

    return OPMLController;

  })(BaseObject);

  OPMLControllerErrorReporter = (function(_super) {

    __extends(OPMLControllerErrorReporter, _super);

    function OPMLControllerErrorReporter() {
      return OPMLControllerErrorReporter.__super__.constructor.apply(this, arguments);
    }

    OPMLControllerErrorReporter.extend(IS.ErrorReporter);

    return OPMLControllerErrorReporter;

  })(BaseObject);

  ER = OPMLControllerErrorReporter;

  module.exports = OPMLController;

}).call(this);
}, "controllers/Outline": function(exports, require, module) {(function() {
  var ER, FakeOutline, OutlineController, OutlineControllerErrorReporter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FakeOutline = (function() {

    function FakeOutline() {
      this.text = "New Node";
      this._status = "unchecked";
      this.childNodes = [];
    }

    FakeOutline.prototype.getAttribute = function(attr) {
      return this[attr] || null;
    };

    return FakeOutline;

  })();

  OutlineController = (function(_super) {

    __extends(OutlineController, _super);

    function OutlineController(e, model) {
      var kid, kids, _fn, _i, _len,
        _this = this;
      this.e = e;
      this.model = model;
      this.fold = __bind(this.fold, this);

      this.update = __bind(this.update, this);

      this.del = __bind(this.del, this);

      this.add = __bind(this.add, this);

      if (!(this.e != null) || !(this.e.tagName != null)) {
        throw ER.generate(1);
      }
      if (!(this.model != null)) {
        throw ER.generate(2);
      }
      this.e.controller = this;
      this.e.addEventListener("contextmenu", function(e) {
        new (DepMan.controller("ContextMenu"))({
          "Delete": _this.del,
          "Add": _this.add
        }, e);
        e.preventDefault();
        return e.stopPropagation();
      });
      if (this.model.controls != null) {
        console.log(this.model.controls);
        this.model.controls.add.addEventListener("click", this.add);
        this.model.controls.remove.addEventListener("click", this.del);
      }
      kids = this.e.children;
      _fn = function(kid) {
        switch (kid.tagName) {
          case "P":
            _this.p = kid;
            kid.addEventListener("dblclick", function() {
              console.log(kid);
              return kid.setAttribute("contenteditable", true);
            });
            return kid.addEventListener("blur", function() {
              kid.setAttribute("contenteditable", false);
              return _this.update("text", kid.innerHTML);
            });
          case "I":
            if (kid.className.indexOf("icon-custom") >= 0) {
              _this.f = kid;
              return kid.addEventListener("click", _this.fold);
            } else {
              _this.c = kid;
              return kid.addEventListener("click", function() {
                switch (kid.className) {
                  case "icon-check":
                    kid.className = "icon-check-empty";
                    _this.update("status", "unchecked");
                    break;
                  case "icon-check-empty":
                    kid.className = "icon-check";
                    _this.update("status", "checked");
                }
                return _this.refreshParents(_this.model.parent.parent.controller);
              });
            }
        }
      };
      for (_i = 0, _len = kids.length; _i < _len; _i++) {
        kid = kids[_i];
        _fn(kid);
      }
    }

    OutlineController.prototype.add = function() {
      var addition, e, kids;
      kids = this.model.children.get();
      if (!(kids != null)) {
        this.model.children.set(new (DepMan.model("Outline")).Collection([], this.model, this.model.parent.depth + 1));
        e = document.createElement("div");
        e.setAttribute("class", "row bordertop");
        e.setAttribute("style", "padding-left: " + (50 * (this.model.parent.depth + 1)) + "px; margin-left: -" + (50 * (this.model.parent.depth + 1)) + "px");
        this.model.children.get().render(e);
        this.e.appendChild(e);
        kids = this.model.children.get();
      }
      addition = new (DepMan.model("Outline")).Element(new FakeOutline, kids);
      kids.topics.push(addition);
      console.log(addition);
      addition.render();
      this.model.children.set(kids);
      this.update("status", "indeterminate");
      this.c.setAttribute("class", "icon-circle-blank");
      this.f.className = this.f.className.replace(/\ ?hidden/g, "");
      return this.e.className += " noborder";
    };

    OutlineController.prototype.del = function() {
      this.e.parentNode.removeChild(this.e);
      return this.model.parent.topics.splice(this.model.parent.topics.indexOf(this.model), 1);
    };

    OutlineController.prototype.update = function(prop, value) {
      if (!(this.model[prop] != null)) {
        throw ER.generate(3);
      }
      return this.model[prop].set(value);
    };

    OutlineController.prototype.fold = function() {
      if (this.model.children.get() != null) {
        if (this.e.className.indexOf("folded") >= 0) {
          return this.e.className = this.e.className.replace(/\ ?folded/g, "");
        } else {
          return this.e.className += " folded";
        }
      }
    };

    OutlineController.prototype.refreshParents = function(el) {
      var kid, valid, _i, _len, _ref, _ref1;
      valid = true;
      _ref = el.model.children.get().topics;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        kid = _ref[_i];
        if (!((_ref1 = kid.status.get()) === "checked" || _ref1 === "determinate")) {
          valid = false;
          break;
        }
      }
      if (valid) {
        el.c.className = "icon-circle";
        el.update("status", "determinate");
      } else {
        el.c.className = "icon-circle-blank";
        el.update("status", "indeterminate");
      }
      if (el.model.parent.parent != null) {
        return this.refreshParents(el.model.parent.parent.controller);
      }
    };

    return OutlineController;

  })(BaseObject);

  OutlineControllerErrorReporter = (function(_super) {

    __extends(OutlineControllerErrorReporter, _super);

    function OutlineControllerErrorReporter() {
      return OutlineControllerErrorReporter.__super__.constructor.apply(this, arguments);
    }

    OutlineControllerErrorReporter.errorGroupMap = [1, 1, 2];

    OutlineControllerErrorReporter.errorGroups = ["Crud", "cRud", "crUd", "cruD"];

    OutlineControllerErrorReporter.errorMessages = ["Must provide a valid HTML node", "Must provide a valid Outline Model", "Must provide a valid property"];

    OutlineControllerErrorReporter.extend(IS.ErrorReporter);

    return OutlineControllerErrorReporter;

  })(BaseObject);

  ER = OutlineControllerErrorReporter;

  module.exports = OutlineController;

}).call(this);
}, "helpers/DependenciesManager": function(exports, require, module) {(function() {
  var DepErr, DepMan,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  DepMan = (function(_super) {

    __extends(DepMan, _super);

    function DepMan(basePrefix, deps) {
      this.basePrefix = basePrefix != null ? basePrefix : "";
      this.deps = deps != null ? deps : [];
      this.googleFont = __bind(this.googleFont, this);

      this.model = __bind(this.model, this);

      this.controller = __bind(this.controller, this);

      this.helper = __bind(this.helper, this);

      this.stylesheet = __bind(this.stylesheet, this);

      this.doc = __bind(this.doc, this);

      this.render = __bind(this.render, this);

      this._require = __bind(this._require, this);

      this.echo("Activated DependenciesManager!");
    }

    DepMan.prototype._require = function(module, prefix) {
      if (prefix == null) {
        prefix = "";
      }
      try {
        this.deps["" + prefix + module] = require("" + this.basePrefix + prefix + module);
        return this.deps["" + prefix + module];
      } catch (e) {
        throw DepErr.generate(1, "[BP= " + this.basePrefix + "][P= " + prefix + "][P= " + module + "] " + (DepErr.wrapCustomError(e)));
      }
    };

    DepMan.prototype.render = function() {
      var args, module;
      module = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (this._require(module, "views/")).apply(this, args);
    };

    DepMan.prototype.doc = function(module) {
      return this._require(module, "docs/");
    };

    DepMan.prototype.stylesheet = function(module) {
      return this._require(module, "stylesheets/");
    };

    DepMan.prototype.helper = function(module) {
      return this._require(module, "helpers/");
    };

    DepMan.prototype.controller = function(module) {
      return this._require(module, "controllers/");
    };

    DepMan.prototype.model = function(module) {
      return this._require(module, "models/");
    };

    DepMan.prototype.googleFont = function(font, sizes, subsets) {
      var names, string, _s;
      if (subsets == null) {
        subsets = null;
      }
      names = font.split(" ");
      _s = this.deps["" + font] = document.createElement("link");
      string = "http://fonts.googleapis.com/css?family=" + (names.join("+")) + ":" + (sizes.join(","));
      if (subsets != null) {
        string += "&subset=" + (subsets.join(","));
      }
      _s.setAttribute("href", string);
      _s.setAttribute("rel", "stylesheet");
      _s.setAttribute("type", "text/css");
      document.head.appendChild(_s);
      return _s;
    };

    return DepMan;

  })(BaseObject);

  DepErr = (function(_super) {

    __extends(DepErr, _super);

    function DepErr() {
      return DepErr.__super__.constructor.apply(this, arguments);
    }

    DepErr.errorGroups = ["RequireError"];

    DepErr.errorGroupMap = [1];

    DepErr.errorMessages = ["Could not require module!"];

    DepErr.extend(IS.ErrorReporter);

    return DepErr;

  })(IS.Object);

  module.exports = DepMan;

}).call(this);
}, "helpers/LinkManager": function(exports, require, module) {(function() {
  var LinkErrorReporter, LinkManager, _first,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _first = true;

  LinkManager = (function(_super) {

    __extends(LinkManager, _super);

    function LinkManager(history, routes) {
      var _this = this;
      this.history = history != null ? history : [];
      this.routes = routes != null ? routes : [];
      this.linkAllAnchors = __bind(this.linkAllAnchors, this);

      this.getParentAnchor = __bind(this.getParentAnchor, this);

      this.link = __bind(this.link, this);

      this.checkRoute = __bind(this.checkRoute, this);

      this.setRoutes = __bind(this.setRoutes, this);

      window.addEventListener("popstate", (function(e) {
        if (_first) {
          return _first = false;
          return _this.checkRoute();
        }
      }));
      this.echo("LinkManager Activated!");
    }

    LinkManager.prototype.setRoutes = function(routePatterns) {
      var handler, route;
      for (route in routePatterns) {
        handler = routePatterns[route];
        this.routes.push({
          route: route,
          handler: handler
        });
      }
      return this.checkRoute();
    };

    LinkManager.prototype.checkRoute = function(after) {
      var args, l, loc, r, res, route, routeSet, _baseLoc, _i, _len, _loc, _ref;
      if (after == null) {
        after = "";
      }
      if (after[0] === "/") {
        loc = after;
      } else {
        loc = window.location.pathname + after;
      }
      _baseLoc = loc;
      if (loc[loc.length - 1] === "/") {
        loc = loc.substr(0, loc.length - 1);
      }
      _loc = loc;
      _ref = this.routes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        routeSet = _ref[_i];
        loc = _loc.split("/");
        route = routeSet.route;
        if (route[route.length - 1] === "/") {
          route = route.substr(0, route.length - 1);
        }
        route = route.split("/");
        args = [];
        res = true;
        while (route.length && res) {
          r = route.shift();
          l = loc.shift();
          if (r[0] === ":") {
            args[r.substr(1)] = l;
          } else {
            if (r !== l) {
              res = false;
            }
          }
        }
        if (res && loc.length === 0) {
          document.body.setAttribute("id", _baseLoc.substr(1));
          return routeSet.handler(args);
        } else {
          continue;
        }
      }
      document.body.innerHTML = DepMan.render(404, {
        title: "ATLAS",
        text: "404",
        reason: "This page either does not exist, or it is hidden.",
        message: "Why would it be hidden? Well, monkeys are always rapaging through the labs, and sometimes want to play hide and seek with our pages.\n\nThat, or  you don't have permission to view those files."
      });
      this.linkAllAnchors();
      return false;
    };

    LinkManager.prototype.link = function(e) {
      var el;
      el = this.getParentAnchor(e.srcElement);
      if (this.checkRoute(el.getAttribute("href"))) {
        history.pushState(null, null, el.href);
      }
      return e.preventDefault();
    };

    LinkManager.prototype.getParentAnchor = function(e) {
      if (!(e != null)) {
        return null;
      }
      if (e.tagName === "A") {
        return e;
      }
      return this.getParentAnchor(e.parentNode);
    };

    LinkManager.prototype.linkAllAnchors = function() {
      var anchor, anchors, _i, _len, _results;
      anchors = document.querySelectorAll("a");
      _results = [];
      for (_i = 0, _len = anchors.length; _i < _len; _i++) {
        anchor = anchors[_i];
        _results.push(anchor.addEventListener("click", this.link));
      }
      return _results;
    };

    return LinkManager;

  })(BaseObject);

  LinkErrorReporter = (function(_super) {

    __extends(LinkErrorReporter, _super);

    function LinkErrorReporter() {
      return LinkErrorReporter.__super__.constructor.apply(this, arguments);
    }

    LinkErrorReporter.errorGroups = [];

    LinkErrorReporter.errorGroupMap = [];

    LinkErrorReporter.errorMessages = [];

    LinkErrorReporter.extend(IS.ErrorReporter);

    return LinkErrorReporter;

  })(IS.Object);

  module.exports = LinkManager;

}).call(this);
}, "helpers/OPMLManager": function(exports, require, module) {(function() {
  var OPMLManager,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  OPMLManager = (function(_super) {

    __extends(OPMLManager, _super);

    function OPMLManager() {
      this.renderList = __bind(this.renderList, this);

      this["new"] = __bind(this["new"], this);

      this.openOPML = __bind(this.openOPML, this);

      this.open = __bind(this.open, this);

      var index, item, _i, _len, _ref, _ref1,
        _this = this;
      this.OPMLs = {};
      index = JSON.parse((_ref = window.localStorage) != null ? _ref.getItem("opmls") : void 0);
      if (index) {
        for (_i = 0, _len = index.length; _i < _len; _i++) {
          item = index[_i];
          this.open((_ref1 = window.localStorage) != null ? _ref1.getItem("opmls." + item) : void 0, true);
        }
      }
      document.getElementById("createOPML").addEventListener("click", function(e) {
        return _this["new"]();
      });
    }

    OPMLManager.prototype.open = function(file, silent) {
      if (silent == null) {
        silent = false;
      }
      if (this.activeOPML != null) {
        this.activeOPML.controller.deactivate();
      }
      this.activeOPML = new (DepMan.model("OPML"))(file);
      this.OPMLs[this.activeOPML.title] = this.activeOPML;
      this.activeOPML.controller.activate();
      return this.renderList();
    };

    OPMLManager.prototype.openOPML = function(which) {
      var le, les, _i, _len;
      les = document.querySelectorAll(".dragdropplaceholder");
      if (les != null) {
        for (_i = 0, _len = les.length; _i < _len; _i++) {
          le = les[_i];
          le.parentNode.removeChild(le);
        }
      }
      if (!(this.activeOPML != null) || (which !== this.activeOPML.title)) {
        if (this.activeOPML != null) {
          this.activeOPML.controller.deactivate();
        }
        this.activeOPML = this.OPMLs[which];
        this.activeOPML.controller.activate();
        return this.renderList();
      }
    };

    OPMLManager.prototype["new"] = function() {
      return this.open("<opml version='1.0'>\n	<head>\n		<title>New OPML</title>\n	</head>\n	<body>\n		<outline text=\"Parent Node\">\n			<outline text=\"First Child\" _status=\"checked\" _note=\"Some Notes\" />\n			<outline text=\"Second Child\" />\n		</outline>\n	</body>\n</opml>");
    };

    OPMLManager.prototype.renderList = function() {
      var item, kid, list, _i, _len, _results,
        _this = this;
      document.querySelector("aside section").innerHTML = DepMan.render("list", {
        items: this.OPMLs,
        active: this.activeOPML
      });
      list = document.querySelectorAll("aside section li");
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        item.addEventListener("click", function(e) {
          return _this.openOPML(e.target.id);
        });
        _results.push((function() {
          var _j, _len1, _ref, _results1,
            _this = this;
          _ref = item.children;
          _results1 = [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            kid = _ref[_j];
            if (kid.tagName === "P") {
              _results1.push((function(kid) {
                kid.addEventListener("dblclick", function() {
                  kid.original = kid.innerHTML;
                  kid.setAttribute("contenteditable", "true");
                  return kid.focus();
                });
                return kid.addEventListener("blur", function() {
                  var storageIndex, _ref1, _ref2, _ref3;
                  kid.setAttribute("contenteditable", "false");
                  _this.OPMLs[kid.original].title = kid.innerHTML;
                  _this.OPMLs[kid.innerHTML] = _this.OPMLs[kid.original];
                  _this.OPMLs[kid.original] = null;
                  _this.OPMLs[kid.innerHTML].save();
                  storageIndex = JSON.parse((_ref1 = window.localStorage) != null ? _ref1.getItem("opmls") : void 0);
                  storageIndex.splice(storageIndex.indexOf(kid.original), 1);
                  if ((_ref2 = window.localStorage) != null) {
                    _ref2.setItem("opmls", JSON.stringify(storageIndex));
                  }
                  return (_ref3 = window.localStorage) != null ? _ref3.setItem("opmls." + kid.original, null) : void 0;
                });
              })(kid));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return OPMLManager;

  })(IS.Object);

  module.exports = new OPMLManager();

}).call(this);
}, "models/OPML": function(exports, require, module) {(function() {
  var OPML, OPMLER,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  OPML = (function(_super) {

    __extends(OPML, _super);

    function OPML(text) {
      if (text == null) {
        text = null;
      }
      this.save = __bind(this.save, this);

      this.exportBody = __bind(this.exportBody, this);

      this["export"] = __bind(this["export"], this);

      this.download = __bind(this.download, this);

      this.find = __bind(this.find, this);

      this.JSONize = __bind(this.JSONize, this);

      this.parse = __bind(this.parse, this);

      if (text != null) {
        this.parse(text);
      }
    }

    OPML.prototype.parse = function(text) {
      var parser, xml;
      parser = new DOMParser;
      xml = parser.parseFromString(text, "text/xml");
      return this.JSONize(xml);
    };

    OPML.prototype.JSONize = function(xml) {
      this.title = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue;
      this.structure = (DepMan.model("Outline")).generate(xml);
      return this.controller = new (DepMan.controller("OPML"))(this);
    };

    OPML.prototype.find = function(search, start) {
      var el, kid, next, _i, _len, _ref;
      if (search == null) {
        search = [];
      }
      if (start == null) {
        start = null;
      }
      if (search.substr != null) {
        search = search.split(".");
      }
      if (!start) {
        start = this.structure;
      }
      next = search.shift();
      el = null;
      _ref = start.topics;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        kid = _ref[_i];
        if (kid.text.get() === next) {
          el = kid;
          break;
        }
      }
      if (search.length === 0) {
        return el;
      }
      if (!(el != null) || !(el.children.get() != null)) {
        return null;
      }
      return this.find(search, el.children.get());
    };

    OPML.prototype.checkProp = function(into, from, prop) {
      var aux;
      aux = from.getAttribute(prop);
      if (aux != null) {
        return into[prop.substr(1)].set(aux);
      }
    };

    OPML.prototype.download = function() {
      var form, input;
      form = document.createElement("form");
      form.setAttribute("action", "/echo/" + (encodeURI(this.title)) + ".opml");
      form.setAttribute("method", "POST");
      input = document.createElement("input");
      input.setAttribute("name", "content");
      input.value = (this["export"]()).replace(/["']/g, "\"");
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      return document.body.removeChild(form);
    };

    OPML.prototype["export"] = function() {
      return "<opml version='1.0'><head><title>" + this.title + "</title></head><body>" + (this.exportBody()) + "</body></opml>";
    };

    OPML.prototype.exportBody = function(tree) {
      var kid, kids, newkid, string, valid, _i, _j, _len, _len1, _ref, _ref1;
      if (tree == null) {
        tree = this.structure;
      }
      string = "";
      _ref = tree.topics;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        kid = _ref[_i];
        string += "<outline text='" + (kid.text.get().replace("\"", "&#34;").replace("'", "&#39;")) + "' ";
        if (kid.note.get() != null) {
          string += "_note='" + (kid.note.get().replace("\"", "&#34;").replace("'", "&#39;").replace("\n", " ")) + "' ";
        }
        if (kid.status.get() != null) {
          string += "_status='" + (kid.status.get()) + "'";
        } else if (kid.children.get() != null) {
          kids = kid.children.get().topics;
          valid = true;
          for (_j = 0, _len1 = kids.length; _j < _len1; _j++) {
            newkid = kids[_j];
            if (!((_ref1 = newkid.status.get()) === "checked" || _ref1 === "determinate")) {
              valid = false;
              break;
            }
          }
          console.log(valid);
          if (valid) {
            string += "_status='determinate'";
          } else {
            string += "_status='indeterminate'";
          }
        } else {
          string += "_status='unchecked'";
        }
        if (kid.children.get()) {
          string += ">" + (this.exportBody(kid.children.get())) + "</outline>";
        } else {
          string += "/>";
        }
      }
      return string;
    };

    OPML.prototype.save = function() {
      var storageIndex, _ref, _ref1, _ref2, _ref3, _ref4;
      if ((_ref = window.localStorage) != null) {
        _ref.setItem("opmls." + this.title, this["export"]());
      }
      storageIndex = JSON.parse((_ref1 = window.localStorage) != null ? _ref1.getItem("opmls") : void 0);
      if (!storageIndex) {
        return (_ref2 = window.localStorage) != null ? _ref2.setItem("opmls", JSON.stringify([this.title])) : void 0;
      } else if (!(_ref3 = this.title, __indexOf.call(storageIndex, _ref3) >= 0)) {
        storageIndex.push(this.title);
        return (_ref4 = window.localStorage) != null ? _ref4.setItem("opmls", JSON.stringify(storageIndex)) : void 0;
      }
    };

    return OPML;

  })(BaseObject);

  module.exports = OPML;

  OPMLER = (function(_super) {

    __extends(OPMLER, _super);

    function OPMLER() {
      return OPMLER.__super__.constructor.apply(this, arguments);
    }

    OPMLER.errorGroups = [];

    OPMLER.errorGroupMap = [];

    OPMLER.errorMessages = [];

    OPMLER.extend(IS.ErrorReporter);

    return OPMLER;

  })(IS.Object);

}).call(this);
}, "models/Outline": function(exports, require, module) {(function() {
  var Outline, OutlineCollection, _checkParam, _map, _params,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _map = {
    unchecked: "icon-check-empty",
    checked: "icon-check",
    determinate: "icon-circle",
    indeterminate: "icon-circle-blank"
  };

  _params = ["status", "note", "text", "children"];

  _checkParam = function(field, param, from) {
    var value;
    value = from.getAttribute(param) || null;
    return field.set(value);
  };

  OutlineCollection = (function(_super) {

    __extends(OutlineCollection, _super);

    function OutlineCollection(bodyElement, parent, depth) {
      var _this = this;
      this.parent = parent;
      this.depth = depth != null ? depth : 0;
      this.render = __bind(this.render, this);

      this.e = document.createElement("div");
      this.e.className = "container";
      this.topics = (function() {
        var element, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = bodyElement.length; _i < _len; _i++) {
          element = bodyElement[_i];
          if (element.tagName === "outline") {
            _results.push(new Outline(element, _this));
          }
        }
        return _results;
      })();
    }

    OutlineCollection.prototype.render = function(pe) {
      var kid, _i, _len, _ref, _results;
      pe.appendChild(this.e);
      _ref = this.topics;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        kid = _ref[_i];
        _results.push(kid.render());
      }
      return _results;
    };

    return OutlineCollection;

  })(BaseObject);

  Outline = (function() {

    function Outline(xmlDoc, parent) {
      this.parent = parent;
      this.render = __bind(this.render, this);

      this.getData = __bind(this.getData, this);

      this.getData(xmlDoc);
    }

    Outline.prototype.getData = function(xmlDoc) {
      var what, _children, _i, _len,
        _this = this;
      for (_i = 0, _len = _params.length; _i < _len; _i++) {
        what = _params[_i];
        this[what] = new IS.Variable;
      }
      this.status.getFormatted = function() {
        return _map[_this.status.get()];
      };
      _checkParam(this.text, "text", xmlDoc);
      _checkParam(this.status, "_status", xmlDoc);
      _checkParam(this.note, "_note", xmlDoc);
      _children = new OutlineCollection(xmlDoc.childNodes, this, this.parent.depth + 1);
      return this.children.set((_children.topics.length ? _children : null));
    };

    Outline.prototype.render = function() {
      var cntrl, e, hasChildren, klass, nav;
      this.e = document.createElement("div");
      hasChildren = this.children.get() || null;
      if (hasChildren) {
        klass = " noborder";
      } else {
        klass = "";
      }
      this.e.setAttribute("class", "row" + klass);
      this.e.setAttribute("style", "padding-left: " + (50 * (this.parent.depth + 1)) + "px; margin-left: -" + (50 * this.parent.depth) + "px");
      if (!hasChildren) {
        klass = "hidden";
      } else {
        klass = "";
      }
      this.e.innerHTML = DepMan.render("outline", {
        hidden: klass,
        item: this
      });
      if (hasChildren != null) {
        e = document.createElement("div");
        e.setAttribute("class", "row bordertop");
        e.setAttribute("style", "padding-left: " + (50 * (this.parent.depth + 1)) + "px; margin-left: -" + (50 * (this.parent.depth + 1)) + "px");
        this.children.get().render(e);
        this.e.appendChild(e);
      }
      if (window.isMobile != null) {
        nav = document.createElement("nav");
        this.controls = {
          add: document.createElement("li"),
          remove: document.createElement("li")
        };
        this.controls.add.innerHTML = "<i class='icon-plus'>";
        this.controls.remove.innerHTML = "<i class='icon-remove'>";
        nav.appendChild(this.controls.add);
        nav.appendChild(this.controls.remove);
        this.e.appendChild(nav);
      }
      cntrl = new (DepMan.controller("Outline"))(this.e, this);
      this.controller = this.e.controller = cntrl;
      return this.parent.e.appendChild(this.e);
    };

    return Outline;

  })();

  module.exports = {
    Collection: OutlineCollection,
    Element: Outline,
    generate: function(xml) {
      return new OutlineCollection(xml.getElementsByTagName("body")[0].childNodes);
    }
  };

}).call(this);
}, "stylesheets/font-awesome": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "/*  Font Awesome 3.0\n    the iconic font designed for use with Twitter Bootstrap\n    -------------------------------------------------------\n    The full suite of pictographic icons, examples, and documentation\n    can be found at: http://fortawesome.github.com/Font-Awesome/\n\n    License\n    -------------------------------------------------------\n    • The Font Awesome font is licensed under the SIL Open Font License - http://scripts.sil.org/OFL\n    • Font Awesome CSS, LESS, and SASS files are licensed under the MIT License -\n      http://opensource.org/licenses/mit-license.html\n    • The Font Awesome pictograms are licensed under the CC BY 3.0 License - http://creativecommons.org/licenses/by/3.0/\n    • Attribution is no longer required in Font Awesome 3.0, but much appreciated:\n      \"Font Awesome by Dave Gandy - http://fortawesome.github.com/Font-Awesome\"\n\n    Contact\n    -------------------------------------------------------\n    Email: dave@davegandy.com\n    Twitter: http://twitter.com/fortaweso_me\n    Work: Lead Product Designer @ http://kyruus.com\n\n    */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url('/font/fontawesome-webfont.eot');\n  src: url('/font/fontawesome-webfont.eot?#iefix') format('embedded-opentype'), url('/font/fontawesome-webfont.woff') format('woff'), url('/font/fontawesome-webfont.ttf') format('truetype');\n  font-weight: normal;\n  font-style: normal;\n}\n/*  Font Awesome styles\n    ------------------------------------------------------- */\n/* includes sprites.less reset */\n[class^=\"icon-\"],\n[class*=\" icon-\"] {\n  font-family: FontAwesome;\n  font-weight: normal;\n  font-style: normal;\n  text-decoration: inherit;\n  display: inline;\n  width: auto;\n  height: auto;\n  line-height: normal;\n  vertical-align: baseline;\n  background-image: none !important;\n  background-position: 0% 0%;\n  background-repeat: repeat;\n}\n[class^=\"icon-\"]:before,\n[class*=\" icon-\"]:before {\n  text-decoration: inherit;\n  display: inline-block;\n  speak: none;\n}\n/* makes sure icons active on rollover in links */\na [class^=\"icon-\"],\na [class*=\" icon-\"] {\n  display: inline-block;\n}\n/* makes the font 33% larger relative to the icon container */\n.icon-large:before {\n  vertical-align: -10%;\n  font-size: 1.3333333333333333em;\n}\n.btn [class^=\"icon-\"],\n.nav [class^=\"icon-\"],\n.btn [class*=\" icon-\"],\n.nav [class*=\" icon-\"] {\n  display: inline;\n  /* keeps button heights with and without icons the same */\n\n  line-height: .6em;\n}\n.btn [class^=\"icon-\"].icon-spin,\n.nav [class^=\"icon-\"].icon-spin,\n.btn [class*=\" icon-\"].icon-spin,\n.nav [class*=\" icon-\"].icon-spin {\n  display: inline-block;\n}\nli [class^=\"icon-\"],\nli [class*=\" icon-\"] {\n  display: inline-block;\n  width: 1.25em;\n  text-align: center;\n}\nli [class^=\"icon-\"].icon-large,\nli [class*=\" icon-\"].icon-large {\n  /* increased font size for icon-large */\n\n  width: 1.5625em;\n}\nul.icons {\n  list-style-type: none;\n  text-indent: -0.75em;\n}\nul.icons li [class^=\"icon-\"],\nul.icons li [class*=\" icon-\"] {\n  width: .75em;\n}\n.icon-muted {\n  color: #eeeeee;\n}\n.icon-border {\n  border: solid 1px #eeeeee;\n  padding: .2em .25em .15em;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\n.icon-2x {\n  font-size: 2em;\n}\n.icon-2x.icon-border {\n  border-width: 2px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n}\n.icon-3x {\n  font-size: 3em;\n}\n.icon-3x.icon-border {\n  border-width: 3px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\n.icon-4x {\n  font-size: 4em;\n}\n.icon-4x.icon-border {\n  border-width: 4px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n}\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n[class^=\"icon-\"].pull-left,\n[class*=\" icon-\"].pull-left {\n  margin-right: .35em;\n}\n[class^=\"icon-\"].pull-right,\n[class*=\" icon-\"].pull-right {\n  margin-left: .35em;\n}\n.btn [class^=\"icon-\"].pull-left.icon-2x,\n.btn [class*=\" icon-\"].pull-left.icon-2x,\n.btn [class^=\"icon-\"].pull-right.icon-2x,\n.btn [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .35em;\n}\n.btn [class^=\"icon-\"].icon-spin.icon-large,\n.btn [class*=\" icon-\"].icon-spin.icon-large {\n  height: .75em;\n}\n.btn.btn-small [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-small [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .45em;\n}\n.btn.btn-large [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-large [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .2em;\n}\n.icon-spin {\n  display: inline-block;\n  -moz-animation: spin 2s infinite linear;\n  -o-animation: spin 2s infinite linear;\n  -webkit-animation: spin 2s infinite linear;\n  animation: spin 2s infinite linear;\n}\n@-moz-keyframes spin {\n  0% {\n    -moz-transform: rotate(0deg);\n  }\n  100% {\n    -moz-transform: rotate(359deg);\n  }\n}\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n  }\n}\n@-o-keyframes spin {\n  0% {\n    -o-transform: rotate(0deg);\n  }\n  100% {\n    -o-transform: rotate(359deg);\n  }\n}\n@-ms-keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg);\n  }\n  100% {\n    -ms-transform: rotate(359deg);\n  }\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(359deg);\n  }\n}\n/*  Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n    readers do not read off random characters that represent icons */\n.icon-glass:before {\n  content: \"\\f000\";\n}\n.icon-music:before {\n  content: \"\\f001\";\n}\n.icon-search:before {\n  content: \"\\f002\";\n}\n.icon-envelope:before {\n  content: \"\\f003\";\n}\n.icon-heart:before {\n  content: \"\\f004\";\n}\n.icon-star:before {\n  content: \"\\f005\";\n}\n.icon-star-empty:before {\n  content: \"\\f006\";\n}\n.icon-user:before {\n  content: \"\\f007\";\n}\n.icon-film:before {\n  content: \"\\f008\";\n}\n.icon-th-large:before {\n  content: \"\\f009\";\n}\n.icon-th:before {\n  content: \"\\f00a\";\n}\n.icon-th-list:before {\n  content: \"\\f00b\";\n}\n.icon-ok:before {\n  content: \"\\f00c\";\n}\n.icon-remove:before {\n  content: \"\\f00d\";\n}\n.icon-zoom-in:before {\n  content: \"\\f00e\";\n}\n.icon-zoom-out:before {\n  content: \"\\f010\";\n}\n.icon-off:before {\n  content: \"\\f011\";\n}\n.icon-signal:before {\n  content: \"\\f012\";\n}\n.icon-cog:before {\n  content: \"\\f013\";\n}\n.icon-trash:before {\n  content: \"\\f014\";\n}\n.icon-home:before {\n  content: \"\\f015\";\n}\n.icon-file:before {\n  content: \"\\f016\";\n}\n.icon-time:before {\n  content: \"\\f017\";\n}\n.icon-road:before {\n  content: \"\\f018\";\n}\n.icon-download-alt:before {\n  content: \"\\f019\";\n}\n.icon-download:before {\n  content: \"\\f01a\";\n}\n.icon-upload:before {\n  content: \"\\f01b\";\n}\n.icon-inbox:before {\n  content: \"\\f01c\";\n}\n.icon-play-circle:before {\n  content: \"\\f01d\";\n}\n.icon-repeat:before {\n  content: \"\\f01e\";\n}\n/* \\f020 doesn't work in Safari. all shifted one down */\n.icon-refresh:before {\n  content: \"\\f021\";\n}\n.icon-list-alt:before {\n  content: \"\\f022\";\n}\n.icon-lock:before {\n  content: \"\\f023\";\n}\n.icon-flag:before {\n  content: \"\\f024\";\n}\n.icon-headphones:before {\n  content: \"\\f025\";\n}\n.icon-volume-off:before {\n  content: \"\\f026\";\n}\n.icon-volume-down:before {\n  content: \"\\f027\";\n}\n.icon-volume-up:before {\n  content: \"\\f028\";\n}\n.icon-qrcode:before {\n  content: \"\\f029\";\n}\n.icon-barcode:before {\n  content: \"\\f02a\";\n}\n.icon-tag:before {\n  content: \"\\f02b\";\n}\n.icon-tags:before {\n  content: \"\\f02c\";\n}\n.icon-book:before {\n  content: \"\\f02d\";\n}\n.icon-bookmark:before {\n  content: \"\\f02e\";\n}\n.icon-print:before {\n  content: \"\\f02f\";\n}\n.icon-camera:before {\n  content: \"\\f030\";\n}\n.icon-font:before {\n  content: \"\\f031\";\n}\n.icon-bold:before {\n  content: \"\\f032\";\n}\n.icon-italic:before {\n  content: \"\\f033\";\n}\n.icon-text-height:before {\n  content: \"\\f034\";\n}\n.icon-text-width:before {\n  content: \"\\f035\";\n}\n.icon-align-left:before {\n  content: \"\\f036\";\n}\n.icon-align-center:before {\n  content: \"\\f037\";\n}\n.icon-align-right:before {\n  content: \"\\f038\";\n}\n.icon-align-justify:before {\n  content: \"\\f039\";\n}\n.icon-list:before {\n  content: \"\\f03a\";\n}\n.icon-indent-left:before {\n  content: \"\\f03b\";\n}\n.icon-indent-right:before {\n  content: \"\\f03c\";\n}\n.icon-facetime-video:before {\n  content: \"\\f03d\";\n}\n.icon-picture:before {\n  content: \"\\f03e\";\n}\n.icon-pencil:before {\n  content: \"\\f040\";\n}\n.icon-map-marker:before {\n  content: \"\\f041\";\n}\n.icon-adjust:before {\n  content: \"\\f042\";\n}\n.icon-tint:before {\n  content: \"\\f043\";\n}\n.icon-edit:before {\n  content: \"\\f044\";\n}\n.icon-share:before {\n  content: \"\\f045\";\n}\n.icon-check:before {\n  content: \"\\f046\";\n}\n.icon-move:before {\n  content: \"\\f047\";\n}\n.icon-step-backward:before {\n  content: \"\\f048\";\n}\n.icon-fast-backward:before {\n  content: \"\\f049\";\n}\n.icon-backward:before {\n  content: \"\\f04a\";\n}\n.icon-play:before {\n  content: \"\\f04b\";\n}\n.icon-pause:before {\n  content: \"\\f04c\";\n}\n.icon-stop:before {\n  content: \"\\f04d\";\n}\n.icon-forward:before {\n  content: \"\\f04e\";\n}\n.icon-fast-forward:before {\n  content: \"\\f050\";\n}\n.icon-step-forward:before {\n  content: \"\\f051\";\n}\n.icon-eject:before {\n  content: \"\\f052\";\n}\n.icon-chevron-left:before {\n  content: \"\\f053\";\n}\n.icon-chevron-right:before {\n  content: \"\\f054\";\n}\n.icon-plus-sign:before {\n  content: \"\\f055\";\n}\n.icon-minus-sign:before {\n  content: \"\\f056\";\n}\n.icon-remove-sign:before {\n  content: \"\\f057\";\n}\n.icon-ok-sign:before {\n  content: \"\\f058\";\n}\n.icon-question-sign:before {\n  content: \"\\f059\";\n}\n.icon-info-sign:before {\n  content: \"\\f05a\";\n}\n.icon-screenshot:before {\n  content: \"\\f05b\";\n}\n.icon-remove-circle:before {\n  content: \"\\f05c\";\n}\n.icon-ok-circle:before {\n  content: \"\\f05d\";\n}\n.icon-ban-circle:before {\n  content: \"\\f05e\";\n}\n.icon-arrow-left:before {\n  content: \"\\f060\";\n}\n.icon-arrow-right:before {\n  content: \"\\f061\";\n}\n.icon-arrow-up:before {\n  content: \"\\f062\";\n}\n.icon-arrow-down:before {\n  content: \"\\f063\";\n}\n.icon-share-alt:before {\n  content: \"\\f064\";\n}\n.icon-resize-full:before {\n  content: \"\\f065\";\n}\n.icon-resize-small:before {\n  content: \"\\f066\";\n}\n.icon-plus:before {\n  content: \"\\f067\";\n}\n.icon-minus:before {\n  content: \"\\f068\";\n}\n.icon-asterisk:before {\n  content: \"\\f069\";\n}\n.icon-exclamation-sign:before {\n  content: \"\\f06a\";\n}\n.icon-gift:before {\n  content: \"\\f06b\";\n}\n.icon-leaf:before {\n  content: \"\\f06c\";\n}\n.icon-fire:before {\n  content: \"\\f06d\";\n}\n.icon-eye-open:before {\n  content: \"\\f06e\";\n}\n.icon-eye-close:before {\n  content: \"\\f070\";\n}\n.icon-warning-sign:before {\n  content: \"\\f071\";\n}\n.icon-plane:before {\n  content: \"\\f072\";\n}\n.icon-calendar:before {\n  content: \"\\f073\";\n}\n.icon-random:before {\n  content: \"\\f074\";\n}\n.icon-comment:before {\n  content: \"\\f075\";\n}\n.icon-magnet:before {\n  content: \"\\f076\";\n}\n.icon-chevron-up:before {\n  content: \"\\f077\";\n}\n.icon-chevron-down:before {\n  content: \"\\f078\";\n}\n.icon-retweet:before {\n  content: \"\\f079\";\n}\n.icon-shopping-cart:before {\n  content: \"\\f07a\";\n}\n.icon-folder-close:before {\n  content: \"\\f07b\";\n}\n.icon-folder-open:before {\n  content: \"\\f07c\";\n}\n.icon-resize-vertical:before {\n  content: \"\\f07d\";\n}\n.icon-resize-horizontal:before {\n  content: \"\\f07e\";\n}\n.icon-bar-chart:before {\n  content: \"\\f080\";\n}\n.icon-twitter-sign:before {\n  content: \"\\f081\";\n}\n.icon-facebook-sign:before {\n  content: \"\\f082\";\n}\n.icon-camera-retro:before {\n  content: \"\\f083\";\n}\n.icon-key:before {\n  content: \"\\f084\";\n}\n.icon-cogs:before {\n  content: \"\\f085\";\n}\n.icon-comments:before {\n  content: \"\\f086\";\n}\n.icon-thumbs-up:before {\n  content: \"\\f087\";\n}\n.icon-thumbs-down:before {\n  content: \"\\f088\";\n}\n.icon-star-half:before {\n  content: \"\\f089\";\n}\n.icon-heart-empty:before {\n  content: \"\\f08a\";\n}\n.icon-signout:before {\n  content: \"\\f08b\";\n}\n.icon-linkedin-sign:before {\n  content: \"\\f08c\";\n}\n.icon-pushpin:before {\n  content: \"\\f08d\";\n}\n.icon-external-link:before {\n  content: \"\\f08e\";\n}\n.icon-signin:before {\n  content: \"\\f090\";\n}\n.icon-trophy:before {\n  content: \"\\f091\";\n}\n.icon-github-sign:before {\n  content: \"\\f092\";\n}\n.icon-upload-alt:before {\n  content: \"\\f093\";\n}\n.icon-lemon:before {\n  content: \"\\f094\";\n}\n.icon-phone:before {\n  content: \"\\f095\";\n}\n.icon-check-empty:before {\n  content: \"\\f096\";\n}\n.icon-bookmark-empty:before {\n  content: \"\\f097\";\n}\n.icon-phone-sign:before {\n  content: \"\\f098\";\n}\n.icon-twitter:before {\n  content: \"\\f099\";\n}\n.icon-facebook:before {\n  content: \"\\f09a\";\n}\n.icon-github:before {\n  content: \"\\f09b\";\n}\n.icon-unlock:before {\n  content: \"\\f09c\";\n}\n.icon-credit-card:before {\n  content: \"\\f09d\";\n}\n.icon-rss:before {\n  content: \"\\f09e\";\n}\n.icon-hdd:before {\n  content: \"\\f0a0\";\n}\n.icon-bullhorn:before {\n  content: \"\\f0a1\";\n}\n.icon-bell:before {\n  content: \"\\f0a2\";\n}\n.icon-certificate:before {\n  content: \"\\f0a3\";\n}\n.icon-hand-right:before {\n  content: \"\\f0a4\";\n}\n.icon-hand-left:before {\n  content: \"\\f0a5\";\n}\n.icon-hand-up:before {\n  content: \"\\f0a6\";\n}\n.icon-hand-down:before {\n  content: \"\\f0a7\";\n}\n.icon-circle-arrow-left:before {\n  content: \"\\f0a8\";\n}\n.icon-circle-arrow-right:before {\n  content: \"\\f0a9\";\n}\n.icon-circle-arrow-up:before {\n  content: \"\\f0aa\";\n}\n.icon-circle-arrow-down:before {\n  content: \"\\f0ab\";\n}\n.icon-globe:before {\n  content: \"\\f0ac\";\n}\n.icon-wrench:before {\n  content: \"\\f0ad\";\n}\n.icon-tasks:before {\n  content: \"\\f0ae\";\n}\n.icon-filter:before {\n  content: \"\\f0b0\";\n}\n.icon-briefcase:before {\n  content: \"\\f0b1\";\n}\n.icon-fullscreen:before {\n  content: \"\\f0b2\";\n}\n.icon-group:before {\n  content: \"\\f0c0\";\n}\n.icon-link:before {\n  content: \"\\f0c1\";\n}\n.icon-cloud:before {\n  content: \"\\f0c2\";\n}\n.icon-beaker:before {\n  content: \"\\f0c3\";\n}\n.icon-cut:before {\n  content: \"\\f0c4\";\n}\n.icon-copy:before {\n  content: \"\\f0c5\";\n}\n.icon-paper-clip:before {\n  content: \"\\f0c6\";\n}\n.icon-save:before {\n  content: \"\\f0c7\";\n}\n.icon-sign-blank:before {\n  content: \"\\f0c8\";\n}\n.icon-reorder:before {\n  content: \"\\f0c9\";\n}\n.icon-list-ul:before {\n  content: \"\\f0ca\";\n}\n.icon-list-ol:before {\n  content: \"\\f0cb\";\n}\n.icon-strikethrough:before {\n  content: \"\\f0cc\";\n}\n.icon-underline:before {\n  content: \"\\f0cd\";\n}\n.icon-table:before {\n  content: \"\\f0ce\";\n}\n.icon-magic:before {\n  content: \"\\f0d0\";\n}\n.icon-truck:before {\n  content: \"\\f0d1\";\n}\n.icon-pinterest:before {\n  content: \"\\f0d2\";\n}\n.icon-pinterest-sign:before {\n  content: \"\\f0d3\";\n}\n.icon-google-plus-sign:before {\n  content: \"\\f0d4\";\n}\n.icon-google-plus:before {\n  content: \"\\f0d5\";\n}\n.icon-money:before {\n  content: \"\\f0d6\";\n}\n.icon-caret-down:before {\n  content: \"\\f0d7\";\n}\n.icon-caret-up:before {\n  content: \"\\f0d8\";\n}\n.icon-caret-left:before {\n  content: \"\\f0d9\";\n}\n.icon-caret-right:before {\n  content: \"\\f0da\";\n}\n.icon-columns:before {\n  content: \"\\f0db\";\n}\n.icon-sort:before {\n  content: \"\\f0dc\";\n}\n.icon-sort-down:before {\n  content: \"\\f0dd\";\n}\n.icon-sort-up:before {\n  content: \"\\f0de\";\n}\n.icon-envelope-alt:before {\n  content: \"\\f0e0\";\n}\n.icon-linkedin:before {\n  content: \"\\f0e1\";\n}\n.icon-undo:before {\n  content: \"\\f0e2\";\n}\n.icon-legal:before {\n  content: \"\\f0e3\";\n}\n.icon-dashboard:before {\n  content: \"\\f0e4\";\n}\n.icon-comment-alt:before {\n  content: \"\\f0e5\";\n}\n.icon-comments-alt:before {\n  content: \"\\f0e6\";\n}\n.icon-bolt:before {\n  content: \"\\f0e7\";\n}\n.icon-sitemap:before {\n  content: \"\\f0e8\";\n}\n.icon-umbrella:before {\n  content: \"\\f0e9\";\n}\n.icon-paste:before {\n  content: \"\\f0ea\";\n}\n.icon-lightbulb:before {\n  content: \"\\f0eb\";\n}\n.icon-exchange:before {\n  content: \"\\f0ec\";\n}\n.icon-cloud-download:before {\n  content: \"\\f0ed\";\n}\n.icon-cloud-upload:before {\n  content: \"\\f0ee\";\n}\n.icon-user-md:before {\n  content: \"\\f0f0\";\n}\n.icon-stethoscope:before {\n  content: \"\\f0f1\";\n}\n.icon-suitcase:before {\n  content: \"\\f0f2\";\n}\n.icon-bell-alt:before {\n  content: \"\\f0f3\";\n}\n.icon-coffee:before {\n  content: \"\\f0f4\";\n}\n.icon-food:before {\n  content: \"\\f0f5\";\n}\n.icon-file-alt:before {\n  content: \"\\f0f6\";\n}\n.icon-building:before {\n  content: \"\\f0f7\";\n}\n.icon-hospital:before {\n  content: \"\\f0f8\";\n}\n.icon-ambulance:before {\n  content: \"\\f0f9\";\n}\n.icon-medkit:before {\n  content: \"\\f0fa\";\n}\n.icon-fighter-jet:before {\n  content: \"\\f0fb\";\n}\n.icon-beer:before {\n  content: \"\\f0fc\";\n}\n.icon-h-sign:before {\n  content: \"\\f0fd\";\n}\n.icon-plus-sign-alt:before {\n  content: \"\\f0fe\";\n}\n.icon-double-angle-left:before {\n  content: \"\\f100\";\n}\n.icon-double-angle-right:before {\n  content: \"\\f101\";\n}\n.icon-double-angle-up:before {\n  content: \"\\f102\";\n}\n.icon-double-angle-down:before {\n  content: \"\\f103\";\n}\n.icon-angle-left:before {\n  content: \"\\f104\";\n}\n.icon-angle-right:before {\n  content: \"\\f105\";\n}\n.icon-angle-up:before {\n  content: \"\\f106\";\n}\n.icon-angle-down:before {\n  content: \"\\f107\";\n}\n.icon-desktop:before {\n  content: \"\\f108\";\n}\n.icon-laptop:before {\n  content: \"\\f109\";\n}\n.icon-tablet:before {\n  content: \"\\f10a\";\n}\n.icon-mobile-phone:before {\n  content: \"\\f10b\";\n}\n.icon-circle-blank:before {\n  content: \"\\f10c\";\n}\n.icon-quote-left:before {\n  content: \"\\f10d\";\n}\n.icon-quote-right:before {\n  content: \"\\f10e\";\n}\n.icon-spinner:before {\n  content: \"\\f110\";\n}\n.icon-circle:before {\n  content: \"\\f111\";\n}\n.icon-reply:before {\n  content: \"\\f112\";\n}\n.icon-github-alt:before {\n  content: \"\\f113\";\n}\n.icon-folder-close-alt:before {\n  content: \"\\f114\";\n}\n.icon-folder-open-alt:before {\n  content: \"\\f115\";\n}\n"; s.id = "css-font-awesome"; document.head.appendChild(s);}, "views/ContextMenu": function(exports, require, module) {

var jade={}; (function(exports) {
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};
})(jade); module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: undefined }];
try {
var buf = [];
with (locals || {}) {
var interp;
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('<nav');
buf.push(attrs({ 'style':("left: " + (event.x) + "px; top: " + (event.y) + "px;"), "class": ('contextMenu') }, {"style":true}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
// iterate items
;(function(){
  if ('number' == typeof items.length) {

    for (var count = 0, $$l = items.length; count < $$l; count++) {
      var item = items[count];

__jade.unshift({ lineno: 2, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<li');
buf.push(attrs({ 'id':("item-" + (count) + "") }, {"id":true}));
buf.push('>');
var __val__ = item
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
    }

  } else {
    var $$l = 0;
    for (var count in items) {
      $$l++;      var item = items[count];

__jade.unshift({ lineno: 2, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<li');
buf.push(attrs({ 'id':("item-" + (count) + "") }, {"id":true}));
buf.push('>');
var __val__ = item
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
    }

  }
}).call(this);

__jade.shift();
__jade.shift();
buf.push('</nav>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}}, "views/collection": function(exports, require, module) {

var jade={}; (function(exports) {
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};
})(jade); module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: undefined }];
try {
var buf = [];
with (locals || {}) {
var interp;
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
 var children = item.topics
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
// iterate children
;(function(){
  if ('number' == typeof children.length) {

    for (var $index = 0, $$l = children.length; $index < $$l; $index++) {
      var outline = children[$index];

__jade.unshift({ lineno: 2, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
var string = DepMan.render("outline", {item: outline, depth: depth, path: path})
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('' + ((interp = string) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
    }

  } else {
    var $$l = 0;
    for (var $index in children) {
      $$l++;      var outline = children[$index];

__jade.unshift({ lineno: 2, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
var string = DepMan.render("outline", {item: outline, depth: depth, path: path})
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('' + ((interp = string) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
    }

  }
}).call(this);

__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}}, "views/index": function(exports, require, module) {

var jade={}; (function(exports) {
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};
})(jade); module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: undefined }];
try {
var buf = [];
with (locals || {}) {
var interp;
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('<aside>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<header>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<h1>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('Files');
__jade.shift();
__jade.shift();
buf.push('</h1>');
__jade.shift();
__jade.shift();
buf.push('</header>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<section>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</section>');
__jade.shift();
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('<footer>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('<nav class="left">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('<li id="createOPML">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('<i class="icon-plus">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
buf.push('</nav>');
__jade.shift();
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('<nav>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('<li>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('Edit');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
buf.push('</nav>');
__jade.shift();
__jade.shift();
buf.push('</footer>');
__jade.shift();
__jade.shift();
buf.push('</aside>');
__jade.shift();
__jade.unshift({ lineno: 11, filename: __jade[0].filename });
buf.push('<article>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('<header>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('<h1>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('' + escape((interp = title) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</h1>');
__jade.shift();
__jade.unshift({ lineno: 13, filename: __jade[0].filename });
buf.push('<nav id="positionNav" class="left">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
buf.push('<li id="sidebarToggle">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
buf.push('<i class="icon-align-left">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.unshift({ lineno: 15, filename: __jade[0].filename });
buf.push('<li id="fullScreenToggle">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 15, filename: __jade[0].filename });
buf.push('<i class="icon-align-center">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
buf.push('</nav>');
__jade.shift();
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
buf.push('<nav class="right">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push('<li id="downloadButton">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push(' ');
__jade.shift();
__jade.unshift({ lineno: 18, filename: __jade[0].filename });
buf.push('<i class="icon-circle-arrow-down">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('<p>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('Download');
__jade.shift();
__jade.shift();
buf.push('</p>');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.unshift({ lineno: 20, filename: __jade[0].filename });
buf.push('<li id="uploadButton">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
buf.push('<i class="icon-circle-arrow-up">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.unshift({ lineno: 22, filename: __jade[0].filename });
buf.push('<p>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 22, filename: __jade[0].filename });
buf.push('Upload');
__jade.shift();
__jade.shift();
buf.push('</p>');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
buf.push('</nav>');
__jade.shift();
__jade.shift();
buf.push('</header>');
__jade.shift();
__jade.unshift({ lineno: 24, filename: __jade[0].filename });
buf.push('<section>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</section>');
__jade.shift();
__jade.unshift({ lineno: 25, filename: __jade[0].filename });
buf.push('<footer>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 26, filename: __jade[0].filename });
buf.push('<nav>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 26, filename: __jade[0].filename });
buf.push('<li id="saveButton">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 27, filename: __jade[0].filename });
buf.push('<i class="icon-ok">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.unshift({ lineno: 28, filename: __jade[0].filename });
buf.push('<p>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 28, filename: __jade[0].filename });
buf.push('Save');
__jade.shift();
__jade.shift();
buf.push('</p>');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
buf.push('</nav>');
__jade.shift();
__jade.unshift({ lineno: 29, filename: __jade[0].filename });
buf.push('<h1>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 29, filename: __jade[0].filename });
buf.push('' + escape((interp = copyright) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</h1>');
__jade.shift();
__jade.shift();
buf.push('</footer>');
__jade.shift();
__jade.shift();
buf.push('</article>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}}, "views/list": function(exports, require, module) {

var jade={}; (function(exports) {
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};
})(jade); module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: undefined }];
try {
var buf = [];
with (locals || {}) {
var interp;
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
// iterate items
;(function(){
  if ('number' == typeof items.length) {

    for (var key = 0, $$l = items.length; key < $$l; key++) {
      var item = items[key];

__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
klass = item === active ? "icon-circle" : "icon-circle-blank"
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<li');
buf.push(attrs({ 'id':("" + (item.title) + "") }, {"id":true}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('<i');
buf.push(attrs({ "class": ("" + (klass) + "") }, {"class":true}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<p>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('' + escape((interp = item.title) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</p>');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
    }

  } else {
    var $$l = 0;
    for (var key in items) {
      $$l++;      var item = items[key];

__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
klass = item === active ? "icon-circle" : "icon-circle-blank"
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<li');
buf.push(attrs({ 'id':("" + (item.title) + "") }, {"id":true}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('<i');
buf.push(attrs({ "class": ("" + (klass) + "") }, {"class":true}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<p>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('' + escape((interp = item.title) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</p>');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
    }

  }
}).call(this);

__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}}, "views/outline": function(exports, require, module) {

var jade={}; (function(exports) {
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};
})(jade); module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: undefined }];
try {
var buf = [];
with (locals || {}) {
var interp;
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('<i');
buf.push(attrs({ "class": ('icon-custom') + ' ' + ("" + (hidden) + "") }, {"class":true}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('<i');
buf.push(attrs({ "class": ("" + (item.status.getFormatted()) + "") }, {"class":true}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</i>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<p>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('' + escape((interp = item.text.get()) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</p>');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
 if (item.note.get() !== null)
{
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<span>');
var __val__ = item.note.get()
buf.push(null == __val__ ? "" : __val__);
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}}});
