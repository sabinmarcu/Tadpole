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

    function Application(name) {
      var item, items, renderDoc, renderLayout, routes, _i, _len,
        _this = this;
      window.root = window;
      window.echo = BaseObject.echo;
      window.name = "AtlasPortal Application";
      document.title = "Atlas";
      echo("Starting Application");
      root.DepMan = new (require("helpers/DependenciesManager"));
      root.LinkManager = new (DepMan.helper("LinkManager"));
      root.DepMan.stylesheet("font-awesome");
      root.DepMan.googleFont("Electrolize", [400, 300]);
      root.DepMan.googleFont("Source Sans Pro", [400, 300]);
      root.DepMan.googleFont("Inconsolata", [400, 300]);
      items = [
        {
          link: "/about",
          title: "About",
          help: "About the ATLAS Project"
        }, {
          link: "/typography",
          title: "Typography",
          help: "Demo of Design / Typography"
        }, {
          link: "/colors",
          title: "Colors",
          help: "Demo of Design / Colors"
        }, {
          link: "/scaffolding",
          title: "Scaffolding",
          help: "Demo of Design / Scaffolding",
          replacePlaceHolder: true
        }, {
          link: "/grid",
          title: "Grid",
          help: "Grid elements"
        }, {
          link: "/",
          title: "Go Home",
          help: "Go back to the beginning"
        }
      ];
      renderLayout = function() {
        if (document.getElementById("layoutActive")) {
          return;
        }
        document.body.innerHTML = DepMan.render("layout", {
          title: "ATLAS",
          items: items
        });
        return LinkManager.linkAllAnchors();
      };
      renderDoc = function(doc, replace, handler) {
        var e, el, re;
        if (replace == null) {
          replace = false;
        }
        if (handler == null) {
          handler = null;
        }
        renderLayout();
        el = document.querySelector("section");
        if (!(el != null)) {
          return;
        }
        if (replace) {
          e = document.createElement("div");
          e.innerHTML = DepMan.doc(doc);
          re = el.parentNode;
          re.removeChild(el);
          re.appendChild(e);
        } else {
          el.innerHTML = DepMan.doc(doc);
        }
        if (handler != null) {
          return handler();
        }
      };
      routes = {
        "/": function() {
          document.body.innerHTML = DepMan.render("indexPage", {
            title: "ATLAS",
            tagline: "Comin' up"
          });
          return LinkManager.linkAllAnchors();
        },
        "/checkin": function() {
          return renderLayout();
        }
      };
      (function(routes) {
        return console.log(routes);
      })(routes);
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (item.link !== "/") {
          routes[item.link] = (function(item) {
            return function() {
              var args;
              args = [item.link.substr(1)];
              if (item.replacePlaceHolder != null) {
                args.push(true);
              }
              if (item.after != null) {
                args.push(item.after);
              }
              renderDoc.apply(renderDoc, args);
              return true;
            };
          })(item);
        }
      }
      console.log(routes);
      root.LinkManager.setRoutes(routes);
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
      var args, _d;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _d = new Date;
      args[0] = "[" + (_d.getHours()) + ":" + (_d.getMinutes()) + ":" + (_d.getSeconds()) + "][" + (this.name || this.__proto__.constructor.name) + "]	" + args[0];
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
}, "controllers/Slider": function(exports, require, module) {(function() {
  var Slider, SliderErrorReporter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Slider = (function(_super) {

    __extends(Slider, _super);

    function Slider(parent, type) {
      this.parent = parent;
      this.type = type != null ? type : "horrizontal";
      this.remove = __bind(this.remove, this);

      this.decideTap = __bind(this.decideTap, this);

      this.endHandler = __bind(this.endHandler, this);

      this.moveHandler = __bind(this.moveHandler, this);

      this.startHandler = __bind(this.startHandler, this);

      this.capture = __bind(this.capture, this);

      this.resolveData = __bind(this.resolveData, this);

      this.encapsulate = __bind(this.encapsulate, this);

      this.getSizes = __bind(this.getSizes, this);

      this.dataSet = {};
      DepMan.stylesheet("slider");
      this.encapsulate();
      this.getSizes();
      this.capture();
    }

    Slider.prototype.getSizes = function(el) {
      if (el == null) {
        el = this.inner;
      }
      return this.sizes = {
        width: el.clientWidth,
        height: el.clientHeight
      };
    };

    Slider.prototype.encapsulate = function(el) {
      var child, children, _i, _j, _len, _len1, _ref;
      if (el == null) {
        el = this.parent;
      }
      children = [];
      _ref = el.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        children.push(child);
      }
      this.inner = document.createElement("div");
      this.inner.setAttribute("class", "slider-inner");
      this.parent.appendChild(this.inner);
      this.parent.style.width = "" + this.parent.clientWidth + "px";
      this.parent.style.height = "" + this.parent.clientHeight + "px";
      this.parent.className += " slider";
      this.parent.Slider = this;
      this.inner.style.top = "0px";
      this.inner.style.left = this.inner.style.right = "0px";
      for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
        child = children[_j];
        if (child === this.inner) {
          continue;
        }
        this.inner.appendChild(child);
      }
      return this;
    };

    Slider.prototype.resolveData = function(event) {
      if (event.touches) {
        return {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      } else {
        return {
          x: event.clientX,
          y: event.clientY
        };
      }
    };

    Slider.prototype.capture = function(el) {
      if (el == null) {
        el = this.parent;
      }
      el.addEventListener("mousedown", this.startHandler);
      el.addEventListener("touchstart", this.startHandler);
      el.addEventListener("mousemove", this.moveHandler);
      el.addEventListener("touchmove", this.moveHandler);
      el.addEventListener("mouseup", this.endHandler);
      return el.addEventListener("touchend", this.endHandler);
    };

    Slider.prototype.startHandler = function(e) {
      this.dataSet.first = this.resolveData(e);
      this.dataSet.top = parseInt(this.inner.style.top);
      this.dataSet.current = null;
      this.dataSet["continue"] = false;
      setTimeout(this.proxy(this.decideTap, this), 100);
      return e.preventDefault();
    };

    Slider.prototype.moveHandler = function(e) {
      var delta, newtop;
      this.dataSet.current = this.resolveData(e);
      if (this.dataSet["continue"]) {
        delta = this.inner.clientHeight - this.parent.clientHeight;
        if (delta < 0) {
          return;
        }
        newtop = this.dataSet.current.y - this.dataSet.first.y + this.dataSet.top;
        console.log(newtop, delta);
        if (newtop < -delta) {
          this.inner.style.top = "" + (-delta) + "px";
        } else if (newtop > 0 && this.inner.clientHeight === this.parent.clientHeight + delta) {
          this.inner.style.top = "0px";
        } else {
          this.inner.style.top = "" + (this.dataSet.current.y - this.dataSet.first.y + this.dataSet.top) + "px";
        }
      }
      return e.preventDefault();
    };

    Slider.prototype.endHandler = function(e) {
      if (!this.dataSet["continue"]) {
        e.preventDefault();
      }
      return this.dataSet["continue"] = false;
    };

    Slider.prototype.decideTap = function() {
      if (this.dataSet.current && this.dataSet.first !== this.dataSet.current) {
        return this.dataSet["continue"] = true;
      }
    };

    Slider.prototype.remove = function(el) {
      var child, children, _i, _j, _len, _len1, _ref;
      if (el == null) {
        el = this.parent;
      }
      this.parent.className = this.parent.className.replace(/\ ?slider\ ?/, "");
      children = [];
      _ref = this.inner.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        children.push(child);
      }
      for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
        child = children[_j];
        this.parent.appendChild(child);
      }
      this.parent.removeChild(this.inner);
      el.removeEventListener("mousedown", this.startHandler);
      el.removeEventListener("touchstart", this.startHandler);
      el.removeEventListener("mousemove", this.moveHandler);
      el.removeEventListener("touchmove", this.moveHandler);
      el.removeEventListener("mouseup", this.endHandler);
      return el.removeEventListener("touchend", this.endHandler);
    };

    return Slider;

  })(BaseObject);

  SliderErrorReporter = (function(_super) {

    __extends(SliderErrorReporter, _super);

    function SliderErrorReporter() {
      return SliderErrorReporter.__super__.constructor.apply(this, arguments);
    }

    SliderErrorReporter.errorGroups = [];

    SliderErrorReporter.errorGroupMap = [];

    SliderErrorReporter.errorMessages = [];

    SliderErrorReporter.extend(IS.ErrorReporter);

    return SliderErrorReporter;

  })(IS.Object);

  module.exports = Slider;

}).call(this);
}, "docs/about": function(exports, require, module) {module.exports = "<h1>About stuff</h1>"}, "docs/colors": function(exports, require, module) {module.exports = "<article class=\"impact\">\n	<h1>Colors and Icons</h1>\n	<p>Let's check them out ...</p>\n</article>\n<pre>\n	<span class=\"red\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span>\n	<span class=\"blue\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span>\n	<span class=\"purple\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span>\n	<span class=\"pink\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span>\n	<span class=\"green\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span>\n	<span class=\"yellow\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span>\n	<span class=\"orange\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span>\n</pre>\n<p class=\"container red-bg\"><i class=\"icon-chevron-right\"></i> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>\n<p class=\"container blue-bg\"><i class=\"icon-chevron-right\"></i> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>\n<p class=\"container purple-bg\"><i class=\"icon-chevron-right\"></i> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>\n<p class=\"container pink-bg\"><i class=\"icon-chevron-right\"></i> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>\n<p class=\"container green-bg\"><i class=\"icon-chevron-right\"></i> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>\n<p class=\"container yellow-bg\"><i class=\"icon-chevron-right\"></i> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>\n<p class=\"container orange-bg\"><i class=\"icon-chevron-right\"></i> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>\n<br/>\n<button class=\"red\"><i class=\"icon-plus\"></i>Color 1</button>\n<button class=\"blue\"><i class=\"icon-plus\"></i>Color 2</button>\n<button class=\"purple\"><i class=\"icon-plus\"></i>Color 3</button>\n<button class=\"pink\"><i class=\"icon-plus\"></i>Color 4</button>\n<button class=\"green\"><i class=\"icon-plus\"></i>Color 5</button>\n<button class=\"yellow\"><i class=\"icon-plus\"></i>Color 6</button>\n<button class=\"orange\"><i class=\"icon-plus\"></i>Color 7</button>\n<br/>\n<button class=\"red-bg\"><i class=\"icon-tag\"></i>Color 1</button>\n<button class=\"blue-bg\"><i class=\"icon-tag\"></i>Color 2</button>\n<button class=\"purple-bg\"><i class=\"icon-tag\"></i>Color 3</button>\n<button class=\"pink-bg\"><i class=\"icon-tag\"></i>Color 4</button>\n<button class=\"green-bg\"><i class=\"icon-tag\"></i>Color 5</button>\n<button class=\"yellow-bg\"><i class=\"icon-tag\"></i>Color 6</button>\n<button class=\"orange-bg\"><i class=\"icon-tag\"></i>Color 7</button>\n<br/>\n<button class=\"bold red\"><i class=\"icon-check\"></i>Color 1</button>\n<button class=\"bold blue\"><i class=\"icon-check\"></i>Color 2</button>\n<button class=\"bold purple\"><i class=\"icon-check\"></i>Color 3</button>\n<button class=\"bold pink\"><i class=\"icon-check\"></i>Color 4</button>\n<button class=\"bold green\"><i class=\"icon-check\"></i>Color 5</button>\n<button class=\"bold yellow\"><i class=\"icon-check\"></i>Color 6</button>\n<button class=\"bold orange\"><i class=\"icon-check\"></i>Color 7</button>\n<br/>\n<button class=\"bold red-bg\"><i class=\"icon-cog\"></i>Color 1</button>\n<button class=\"bold blue-bg\"><i class=\"icon-cog\"></i>Color 2</button>\n<button class=\"bold purple-bg\"><i class=\"icon-cog\"></i>Color 3</button>\n<button class=\"bold pink-bg\"><i class=\"icon-cog\"></i>Color 4</button>\n<button class=\"bold green-bg\"><i class=\"icon-cog\"></i>Color 5</button>\n<button class=\"bold yellow-bg\"><i class=\"icon-cog\"></i>Color 6</button>\n<button class=\"bold orange-bg\"><i class=\"icon-cog\"></i>Color 7</button>\n"}, "docs/grid": function(exports, require, module) {module.exports = "<article class=\"impact\">\n	<h1>This will impress</h1>\n	<p>... anybody going near it</p>\n</article>\n<article class=\"bordered\">\n	<p>\n		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed augue neque, eget vestibulum nulla. Nullam sit amet sapien sit amet enim volutpat consectetur nec quis ipsum. In vel nibh quis nisl suscipit faucibus. Maecenas in adipiscing mauris. Nulla venenatis ipsum non mi consectetur consequat. Integer dictum imperdiet congue. Aenean eu metus ante. Aliquam viverra sapien eu arcu varius eu sagittis nibh ultricies. Vestibulum euismod dui quis nisi imperdiet in fermentum magna hendrerit. Sed condimentum sapien varius mi rutrum pellentesque. Cras convallis pretium lorem nec sagittis. Ut ac erat augue. Phasellus id eleifend risus. Quisque massa lorem, cursus at pellentesque sit amet, ullamcorper tristique quam. Fusce vel nulla non neque lobortis rhoncus.\n	</p>\n\n	<p>\n		In suscipit sapien vel justo consequat in commodo metus blandit. Vestibulum faucibus dictum ante, at posuere purus posuere ut. Vestibulum ac porttitor nisi. Vestibulum mollis placerat turpis, vel viverra tortor pellentesque quis. Duis erat odio, placerat vel commodo non, sollicitudin ut sapien. Suspendisse faucibus lobortis aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc laoreet fringilla quam eu pretium. Nulla et sapien porttitor nulla iaculis dignissim.\n	</p>\n\n	<p>\n		Nunc at enim mi. Proin a massa a nibh laoreet ullamcorper. Morbi vehicula rutrum erat, quis rhoncus metus tincidunt eu. Integer posuere pulvinar pharetra. Sed vestibulum turpis ut arcu aliquet molestie malesuada metus volutpat. Quisque urna mauris, laoreet ac ullamcorper id, accumsan sed turpis. Nam condimentum ipsum ut diam imperdiet ultrices. Vivamus suscipit ipsum sed eros condimentum sed aliquet ipsum feugiat. Phasellus vel velit non turpis adipiscing consequat. Maecenas luctus ante sed lacus lobortis nec molestie purus laoreet. In suscipit mauris enim. Mauris nec quam quis velit sagittis suscipit sit amet nec eros.\n	</p>\n\n	<p>\n		Vestibulum blandit, erat id feugiat vulputate, arcu lorem molestie dui, sollicitudin iaculis eros ipsum sit amet ante. Proin adipiscing odio vel leo mattis consectetur. Phasellus molestie, augue vitae consequat semper, lacus erat ultrices massa, tristique malesuada erat orci ut magna. Vestibulum sagittis ante vel nulla tempor tristique. Integer pharetra, metus vel elementum interdum, lorem risus pharetra dui, at euismod lectus risus quis arcu. Donec metus purus, auctor vitae laoreet eu, interdum non nunc. In ac turpis in purus bibendum rhoncus. Etiam euismod, elit eu faucibus gravida, odio lorem condimentum lacus, facilisis scelerisque nibh lorem in ante. Nunc egestas odio sit amet mi mollis congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras tincidunt nunc vitae urna hendrerit sed pulvinar elit tempus. Nullam pulvinar tellus nec metus aliquet non ullamcorper leo sagittis. Proin sit amet tortor odio, eu pretium odio. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n	</p>\n\n	<p>\n		Vivamus laoreet, libero in scelerisque pulvinar, lacus augue aliquet nulla, ut ultricies enim enim nec purus. Ut vitae nibh velit, ut porttitor ipsum. Mauris auctor lacinia mattis. Duis imperdiet nisl et magna porttitor eu viverra mi accumsan. Proin id sem lacus. Vivamus ornare fermentum placerat. Sed mollis tortor vel nibh adipiscing mollis. Phasellus diam turpis, vestibulum vitae blandit sit amet, consequat a dui. Maecenas tristique, diam a consectetur lacinia, ligula nisl luctus eros, non elementum ipsum odio eu augue. Cras metus lacus, mollis eget sollicitudin ac, suscipit at sapien. Nullam quis sem eget lectus viverra tempus. Sed tincidunt vulputate est a aliquet. Cras eget lorem quis mi ornare molestie.\n	</p>\n</article>\n<div class=\"row\">\n	<article class=\"solid bordered span1\">\n		<p>\n			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed augue neque, eget vestibulum nulla. Nullam sit amet sapien sit amet enim volutpat consectetur nec quis ipsum. In vel nibh quis nisl suscipit faucibus. Maecenas in adipiscing mauris. Nulla venenatis ipsum non mi consectetur consequat. Integer dictum imperdiet congue. Aenean eu metus ante. Aliquam viverra sapien eu arcu varius eu sagittis nibh ultricies. Vestibulum euismod dui quis nisi imperdiet in fermentum magna hendrerit. Sed condimentum sapien varius mi rutrum pellentesque. Cras convallis pretium lorem nec sagittis. Ut ac erat augue. Phasellus id eleifend risus. Quisque massa lorem, cursus at pellentesque sit amet, ullamcorper tristique quam. Fusce vel nulla non neque lobortis rhoncus.\n		</p>\n		\n		<p>\n			In suscipit sapien vel justo consequat in commodo metus blandit. Vestibulum faucibus dictum ante, at posuere purus posuere ut. Vestibulum ac porttitor nisi. Vestibulum mollis placerat turpis, vel viverra tortor pellentesque quis. Duis erat odio, placerat vel commodo non, sollicitudin ut sapien. Suspendisse faucibus lobortis aliquam. \n		</p>\n	</article>\n	<article class=\"solid bordered span3\">\n		<p>\n			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed augue neque, eget vestibulum nulla. Nullam sit amet sapien sit amet enim volutpat consectetur nec quis ipsum. In vel nibh quis nisl suscipit faucibus. Maecenas in adipiscing mauris. Nulla venenatis ipsum non mi consectetur consequat. Integer dictum imperdiet congue. Aenean eu metus ante. Aliquam viverra sapien eu arcu varius eu sagittis nibh ultricies. Vestibulum euismod dui quis nisi imperdiet in fermentum magna hendrerit. Sed condimentum sapien varius mi rutrum pellentesque. Cras convallis pretium lorem nec sagittis. Ut ac erat augue. Phasellus id eleifend risus. Quisque massa lorem, cursus at pellentesque sit amet, ullamcorper tristique quam. Fusce vel nulla non neque lobortis rhoncus.\n		</p>\n\n		<p>\n			In suscipit sapien vel justo consequat in commodo metus blandit. Vestibulum faucibus dictum ante, at posuere purus posuere ut. Vestibulum ac porttitor nisi. Vestibulum mollis placerat turpis, vel viverra tortor pellentesque quis. Duis erat odio, placerat vel commodo non, sollicitudin ut sapien. Suspendisse faucibus lobortis aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc laoreet fringilla quam eu pretium. Nulla et sapien porttitor nulla iaculis dignissim.\n		</p>\n\n		<p>\n			Nunc at enim mi. Proin a massa a nibh laoreet ullamcorper. Morbi vehicula rutrum erat, quis rhoncus metus tincidunt eu. Integer posuere pulvinar pharetra. Sed vestibulum turpis ut arcu aliquet molestie malesuada metus volutpat. Quisque urna mauris, laoreet ac ullamcorper id, accumsan sed turpis. Nam condimentum ipsum ut diam imperdiet ultrices. Vivamus suscipit ipsum sed eros condimentum sed aliquet ipsum feugiat. Phasellus vel velit non turpis adipiscing consequat. Maecenas luctus ante sed lacus lobortis nec molestie purus laoreet. In suscipit mauris enim. Mauris nec quam quis velit sagittis suscipit sit amet nec eros.\n		</p>\n\n		<p>\n			Vestibulum blandit, erat id feugiat vulputate, arcu lorem molestie dui, sollicitudin iaculis eros ipsum sit amet ante. Proin adipiscing odio vel leo mattis consectetur. Phasellus molestie, augue vitae consequat semper, lacus erat ultrices massa, tristique malesuada erat orci ut magna. Vestibulum sagittis ante vel nulla tempor tristique. Integer pharetra, metus vel elementum interdum, lorem risus pharetra dui, at euismod lectus risus quis arcu. Donec metus purus, auctor vitae laoreet eu, interdum non nunc. In ac turpis in purus bibendum rhoncus. Etiam euismod, elit eu faucibus gravida, odio lorem condimentum lacus, facilisis scelerisque nibh lorem in ante. Nunc egestas odio sit amet mi mollis congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras tincidunt nunc vitae urna hendrerit sed pulvinar elit tempus. Nullam pulvinar tellus nec metus aliquet non ullamcorper leo sagittis. Proin sit amet tortor odio, eu pretium odio. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n		</p>\n\n		<p>\n			Vivamus laoreet, libero in scelerisque pulvinar, lacus augue aliquet nulla, ut ultricies enim enim nec purus. Ut vitae nibh velit, ut porttitor ipsum. Mauris auctor lacinia mattis. Duis imperdiet nisl et magna porttitor eu viverra mi accumsan. Proin id sem lacus. Vivamus ornare fermentum placerat. Sed mollis tortor vel nibh adipiscing mollis. Phasellus diam turpis, vestibulum vitae blandit sit amet, consequat a dui. Maecenas tristique, diam a consectetur lacinia, ligula nisl luctus eros, non elementum ipsum odio eu augue. Cras metus lacus, mollis eget sollicitudin ac, suscipit at sapien. Nullam quis sem eget lectus viverra tempus. Sed tincidunt vulputate est a aliquet. Cras eget lorem quis mi ornare molestie.\n		</p>\n	</article>\n</div>\n<div class=\"row\">\n	<article class=\"solid bordered span3\">\n		<p>\n			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed augue neque, eget vestibulum nulla. Nullam sit amet sapien sit amet enim volutpat consectetur nec quis ipsum. In vel nibh quis nisl suscipit faucibus. Maecenas in adipiscing mauris. Nulla venenatis ipsum non mi consectetur consequat. Integer dictum imperdiet congue. Aenean eu metus ante. Aliquam viverra sapien eu arcu varius eu sagittis nibh ultricies. Vestibulum euismod dui quis nisi imperdiet in fermentum magna hendrerit. Sed condimentum sapien varius mi rutrum pellentesque. Cras convallis pretium lorem nec sagittis. Ut ac erat augue. Phasellus id eleifend risus. Quisque massa lorem, cursus at pellentesque sit amet, ullamcorper tristique quam. Fusce vel nulla non neque lobortis rhoncus.\n		</p>\n\n		<p>\n			In suscipit sapien vel justo consequat in commodo metus blandit. Vestibulum faucibus dictum ante, at posuere purus posuere ut. Vestibulum ac porttitor nisi. Vestibulum mollis placerat turpis, vel viverra tortor pellentesque quis. Duis erat odio, placerat vel commodo non, sollicitudin ut sapien. Suspendisse faucibus lobortis aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc laoreet fringilla quam eu pretium. Nulla et sapien porttitor nulla iaculis dignissim.\n		</p>\n\n		<p>\n			Nunc at enim mi. Proin a massa a nibh laoreet ullamcorper. Morbi vehicula rutrum erat, quis rhoncus metus tincidunt eu. Integer posuere pulvinar pharetra. Sed vestibulum turpis ut arcu aliquet molestie malesuada metus volutpat. Quisque urna mauris, laoreet ac ullamcorper id, accumsan sed turpis. Nam condimentum ipsum ut diam imperdiet ultrices. Vivamus suscipit ipsum sed eros condimentum sed aliquet ipsum feugiat. Phasellus vel velit non turpis adipiscing consequat. Maecenas luctus ante sed lacus lobortis nec molestie purus laoreet. In suscipit mauris enim. Mauris nec quam quis velit sagittis suscipit sit amet nec eros.\n		</p>\n\n		<p>\n			Vestibulum blandit, erat id feugiat vulputate, arcu lorem molestie dui, sollicitudin iaculis eros ipsum sit amet ante. Proin adipiscing odio vel leo mattis consectetur. Phasellus molestie, augue vitae consequat semper, lacus erat ultrices massa, tristique malesuada erat orci ut magna. Vestibulum sagittis ante vel nulla tempor tristique. Integer pharetra, metus vel elementum interdum, lorem risus pharetra dui, at euismod lectus risus quis arcu. Donec metus purus, auctor vitae laoreet eu, interdum non nunc. In ac turpis in purus bibendum rhoncus. Etiam euismod, elit eu faucibus gravida, odio lorem condimentum lacus, facilisis scelerisque nibh lorem in ante. Nunc egestas odio sit amet mi mollis congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras tincidunt nunc vitae urna hendrerit sed pulvinar elit tempus. Nullam pulvinar tellus nec metus aliquet non ullamcorper leo sagittis. Proin sit amet tortor odio, eu pretium odio. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n		</p>\n\n		<p>\n			Vivamus laoreet, libero in scelerisque pulvinar, lacus augue aliquet nulla, ut ultricies enim enim nec purus. Ut vitae nibh velit, ut porttitor ipsum. Mauris auctor lacinia mattis. Duis imperdiet nisl et magna porttitor eu viverra mi accumsan. Proin id sem lacus. Vivamus ornare fermentum placerat. Sed mollis tortor vel nibh adipiscing mollis. Phasellus diam turpis, vestibulum vitae blandit sit amet, consequat a dui. Maecenas tristique, diam a consectetur lacinia, ligula nisl luctus eros, non elementum ipsum odio eu augue. Cras metus lacus, mollis eget sollicitudin ac, suscipit at sapien. Nullam quis sem eget lectus viverra tempus. Sed tincidunt vulputate est a aliquet. Cras eget lorem quis mi ornare molestie.\n		</p>\n	</article>\n	<article class=\"solid bordered span1\">\n		<p>\n			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed augue neque, eget vestibulum nulla. Nullam sit amet sapien sit amet enim volutpat consectetur nec quis ipsum. In vel nibh quis nisl suscipit faucibus. Maecenas in adipiscing mauris. Nulla venenatis ipsum non mi consectetur consequat. Integer dictum imperdiet congue. Aenean eu metus ante. Aliquam viverra sapien eu arcu varius eu sagittis nibh ultricies. Vestibulum euismod dui quis nisi imperdiet in fermentum magna hendrerit. Sed condimentum sapien varius mi rutrum pellentesque. Cras convallis pretium lorem nec sagittis. Ut ac erat augue. Phasellus id eleifend risus. Quisque massa lorem, cursus at pellentesque sit amet, ullamcorper tristique quam. Fusce vel nulla non neque lobortis rhoncus.\n		</p>\n		\n		<p>\n			In suscipit sapien vel justo consequat in commodo metus blandit. Vestibulum faucibus dictum ante, at posuere purus posuere ut. Vestibulum ac porttitor nisi. Vestibulum mollis placerat turpis, vel viverra tortor pellentesque quis. Duis erat odio, placerat vel commodo non, sollicitudin ut sapien. Suspendisse faucibus lobortis aliquam. \n		</p>\n	</article>\n</div>\n<div class=\"row\">\n	<article class=\"solid bordered span2\">\n		<p>\n			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed augue neque, eget vestibulum nulla. Nullam sit amet sapien sit amet enim volutpat consectetur nec quis ipsum. In vel nibh quis nisl suscipit faucibus. Maecenas in adipiscing mauris. Nulla venenatis ipsum non mi consectetur consequat. Integer dictum imperdiet congue. Aenean eu metus ante. Aliquam viverra sapien eu arcu varius eu sagittis nibh ultricies. Vestibulum euismod dui quis nisi imperdiet in fermentum magna hendrerit. Sed condimentum sapien varius mi rutrum pellentesque. Cras convallis pretium lorem nec sagittis. Ut ac erat augue. Phasellus id eleifend risus. Quisque massa lorem, cursus at pellentesque sit amet, ullamcorper tristique quam. Fusce vel nulla non neque lobortis rhoncus.\n		</p>\n\n		<p>\n			In suscipit sapien vel justo consequat in commodo metus blandit. Vestibulum faucibus dictum ante, at posuere purus posuere ut. Vestibulum ac porttitor nisi. Vestibulum mollis placerat turpis, vel viverra tortor pellentesque quis. Duis erat odio, placerat vel commodo non, sollicitudin ut sapien. Suspendisse faucibus lobortis aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc laoreet fringilla quam eu pretium. Nulla et sapien porttitor nulla iaculis dignissim.\n		</p>\n\n		<p>\n			Nunc at enim mi. Proin a massa a nibh laoreet ullamcorper. Morbi vehicula rutrum erat, quis rhoncus metus tincidunt eu. Integer posuere pulvinar pharetra. Sed vestibulum turpis ut arcu aliquet molestie malesuada metus volutpat. Quisque urna mauris, laoreet ac ullamcorper id, accumsan sed turpis. Nam condimentum ipsum ut diam imperdiet ultrices. Vivamus suscipit ipsum sed eros condimentum sed aliquet ipsum feugiat. Phasellus vel velit non turpis adipiscing consequat. Maecenas luctus ante sed lacus lobortis nec molestie purus laoreet. In suscipit mauris enim. Mauris nec quam quis velit sagittis suscipit sit amet nec eros.\n		</p>\n\n		<p>\n			Vestibulum blandit, erat id feugiat vulputate, arcu lorem molestie dui, sollicitudin iaculis eros ipsum sit amet ante. Proin adipiscing odio vel leo mattis consectetur. Phasellus molestie, augue vitae consequat semper, lacus erat ultrices massa, tristique malesuada erat orci ut magna. Vestibulum sagittis ante vel nulla tempor tristique. Integer pharetra, metus vel elementum interdum, lorem risus pharetra dui, at euismod lectus risus quis arcu. Donec metus purus, auctor vitae laoreet eu, interdum non nunc. In ac turpis in purus bibendum rhoncus. Etiam euismod, elit eu faucibus gravida, odio lorem condimentum lacus, facilisis scelerisque nibh lorem in ante. Nunc egestas odio sit amet mi mollis congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras tincidunt nunc vitae urna hendrerit sed pulvinar elit tempus. Nullam pulvinar tellus nec metus aliquet non ullamcorper leo sagittis. Proin sit amet tortor odio, eu pretium odio. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n		</p>\n\n		<p>\n			Vivamus laoreet, libero in scelerisque pulvinar, lacus augue aliquet nulla, ut ultricies enim enim nec purus. Ut vitae nibh velit, ut porttitor ipsum. Mauris auctor lacinia mattis. Duis imperdiet nisl et magna porttitor eu viverra mi accumsan. Proin id sem lacus. Vivamus ornare fermentum placerat. Sed mollis tortor vel nibh adipiscing mollis. Phasellus diam turpis, vestibulum vitae blandit sit amet, consequat a dui. Maecenas tristique, diam a consectetur lacinia, ligula nisl luctus eros, non elementum ipsum odio eu augue. Cras metus lacus, mollis eget sollicitudin ac, suscipit at sapien. Nullam quis sem eget lectus viverra tempus. Sed tincidunt vulputate est a aliquet. Cras eget lorem quis mi ornare molestie.\n		</p>\n	</article>\n	<article class=\"solid bordered span2\">\n		<p>\n			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed augue neque, eget vestibulum nulla. Nullam sit amet sapien sit amet enim volutpat consectetur nec quis ipsum. In vel nibh quis nisl suscipit faucibus. Maecenas in adipiscing mauris. Nulla venenatis ipsum non mi consectetur consequat. Integer dictum imperdiet congue. Aenean eu metus ante. Aliquam viverra sapien eu arcu varius eu sagittis nibh ultricies. Vestibulum euismod dui quis nisi imperdiet in fermentum magna hendrerit. Sed condimentum sapien varius mi rutrum pellentesque. Cras convallis pretium lorem nec sagittis. Ut ac erat augue. Phasellus id eleifend risus. Quisque massa lorem, cursus at pellentesque sit amet, ullamcorper tristique quam. Fusce vel nulla non neque lobortis rhoncus.\n		</p>\n\n		<p>\n			In suscipit sapien vel justo consequat in commodo metus blandit. Vestibulum faucibus dictum ante, at posuere purus posuere ut. Vestibulum ac porttitor nisi. Vestibulum mollis placerat turpis, vel viverra tortor pellentesque quis. Duis erat odio, placerat vel commodo non, sollicitudin ut sapien. Suspendisse faucibus lobortis aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc laoreet fringilla quam eu pretium. Nulla et sapien porttitor nulla iaculis dignissim.\n		</p>\n\n		<p>\n			Nunc at enim mi. Proin a massa a nibh laoreet ullamcorper. Morbi vehicula rutrum erat, quis rhoncus metus tincidunt eu. Integer posuere pulvinar pharetra. Sed vestibulum turpis ut arcu aliquet molestie malesuada metus volutpat. Quisque urna mauris, laoreet ac ullamcorper id, accumsan sed turpis. Nam condimentum ipsum ut diam imperdiet ultrices. Vivamus suscipit ipsum sed eros condimentum sed aliquet ipsum feugiat. Phasellus vel velit non turpis adipiscing consequat. Maecenas luctus ante sed lacus lobortis nec molestie purus laoreet. In suscipit mauris enim. Mauris nec quam quis velit sagittis suscipit sit amet nec eros.\n		</p>\n\n		<p>\n			Vestibulum blandit, erat id feugiat vulputate, arcu lorem molestie dui, sollicitudin iaculis eros ipsum sit amet ante. Proin adipiscing odio vel leo mattis consectetur. Phasellus molestie, augue vitae consequat semper, lacus erat ultrices massa, tristique malesuada erat orci ut magna. Vestibulum sagittis ante vel nulla tempor tristique. Integer pharetra, metus vel elementum interdum, lorem risus pharetra dui, at euismod lectus risus quis arcu. Donec metus purus, auctor vitae laoreet eu, interdum non nunc. In ac turpis in purus bibendum rhoncus. Etiam euismod, elit eu faucibus gravida, odio lorem condimentum lacus, facilisis scelerisque nibh lorem in ante. Nunc egestas odio sit amet mi mollis congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras tincidunt nunc vitae urna hendrerit sed pulvinar elit tempus. Nullam pulvinar tellus nec metus aliquet non ullamcorper leo sagittis. Proin sit amet tortor odio, eu pretium odio. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n		</p>\n\n		<p>\n			Vivamus laoreet, libero in scelerisque pulvinar, lacus augue aliquet nulla, ut ultricies enim enim nec purus. Ut vitae nibh velit, ut porttitor ipsum. Mauris auctor lacinia mattis. Duis imperdiet nisl et magna porttitor eu viverra mi accumsan. Proin id sem lacus. Vivamus ornare fermentum placerat. Sed mollis tortor vel nibh adipiscing mollis. Phasellus diam turpis, vestibulum vitae blandit sit amet, consequat a dui. Maecenas tristique, diam a consectetur lacinia, ligula nisl luctus eros, non elementum ipsum odio eu augue. Cras metus lacus, mollis eget sollicitudin ac, suscipit at sapien. Nullam quis sem eget lectus viverra tempus. Sed tincidunt vulputate est a aliquet. Cras eget lorem quis mi ornare molestie.\n		</p>\n	</article>\n</div>\n"}, "docs/scaffolding": function(exports, require, module) {module.exports = "<aside class=\"sidebar\">\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n	<li><a href=\"\">Link to Bag 1</a></li>\n</aside>\n<section class=\"with-sidebar\">\n\n	<article class=\"impact\">\n		<h1>Sidebars</h1>\n		<p>Let's see how it looks like</p>\n	</article>\n\n	<article class=\"bordered solid spaced\">\n	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu lacinia ipsum. Pellentesque vitae leo sit amet sem sodales tincidunt fringilla vitae risus. Nam eu nisl et odio sodales hendrerit. Aliquam porta fringilla lacinia. Donec metus odio, aliquam non elementum dignissim, vulputate vulputate velit. In hendrerit urna vulputate massa placerat id faucibus felis elementum. Nam et suscipit lectus.\n		</article>\n\n	<article class=\"bordered solid spaced\">\n	Vestibulum quis enim at mi tincidunt hendrerit. Fusce massa velit, iaculis vel commodo sit amet, malesuada eget augue. Fusce aliquam dui sed nisl imperdiet fringilla. Sed porta eros vitae nulla fringilla imperdiet. Proin sit amet nisi metus, et venenatis odio. Phasellus volutpat semper nibh vel hendrerit. Etiam ac volutpat nisl. Nam sed nunc nunc, sed imperdiet felis. Quisque et lorem sit amet nisl pulvinar ullamcorper ac eu massa. Nulla iaculis sapien fermentum lectus pharetra id egestas arcu luctus. Etiam adipiscing, elit lobortis dignissim tristique, est sapien sollicitudin orci, tempus volutpat dolor quam eu nunc.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Sed ac felis ac augue pretium elementum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas condimentum ultricies lectus id bibendum. Integer luctus velit a quam consequat eget sollicitudin dui gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam placerat elementum sem quis feugiat. Fusce tincidunt metus quis nisi facilisis porta. Vivamus varius lacinia molestie. Fusce eget risus nisi, in tincidunt enim. Ut imperdiet, est ut condimentum egestas, massa ante adipiscing metus, ut vestibulum ligula dolor a magna. Nam magna odio, laoreet vestibulum condimentum et, vestibulum vulputate nibh. Fusce aliquet leo sit amet sem laoreet convallis. Nunc nec consectetur orci.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Ut a erat lorem. Integer et lectus felis, sit amet cursus eros. Donec fringilla pellentesque orci, sed venenatis metus pharetra id. Proin hendrerit lobortis erat. Quisque eleifend gravida velit, vel feugiat leo laoreet ac. Donec sed enim eget nunc porttitor venenatis at in nulla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent et eros a lorem euismod accumsan vel eget libero. Duis ac ante quis nibh dapibus molestie et a tortor. Pellentesque eros tellus, eleifend nec pulvinar at, sodales porta lectus. Mauris enim felis, tempus a tincidunt quis, fermentum eget massa. Etiam ut nulla urna. Nulla ligula dui, pretium nec commodo non, ornare in libero. Sed id lacus nec dui placerat tristique at eu nisl. Sed neque eros, suscipit ac cursus eget, eleifend a ligula.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Vivamus posuere, eros non faucibus eleifend, nisi leo tristique enim, sed sollicitudin magna lectus a justo. Vivamus vehicula, eros sit amet elementum rhoncus, lacus ante suscipit lectus, eu consectetur velit erat a nisl. Fusce nulla justo, porta id ornare non, aliquam sed velit. Sed sit amet diam id mauris semper pellentesque eget at massa. Vivamus dapibus sollicitudin auctor. Suspendisse in nisl lectus, vitae pellentesque nulla. Phasellus viverra vulputate diam, venenatis volutpat risus pharetra vitae. Donec venenatis rhoncus interdum. Donec commodo, erat tempus consectetur laoreet, nisl mi aliquet massa, eu faucibus urna lorem ac ligula. Fusce sapien quam, imperdiet sit amet aliquet non, egestas vitae est. In hac habitasse platea dictumst. Suspendisse ultrices metus vel sapien luctus quis tincidunt mauris tincidunt. Mauris mi nibh, ultricies at dapibus vitae, gravida nec metus. Integer convallis congue aliquet. Phasellus placerat aliquet dui eu aliquam. Pellentesque id lorem tincidunt ligula posuere tincidunt.\n	</article>\n	<article class=\"bordered solid spaced\">\n		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu lacinia ipsum. Pellentesque vitae leo sit amet sem sodales tincidunt fringilla vitae risus. Nam eu nisl et odio sodales hendrerit. Aliquam porta fringilla lacinia. Donec metus odio, aliquam non elementum dignissim, vulputate vulputate velit. In hendrerit urna vulputate massa placerat id faucibus felis elementum. Nam et suscipit lectus.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Vestibulum quis enim at mi tincidunt hendrerit. Fusce massa velit, iaculis vel commodo sit amet, malesuada eget augue. Fusce aliquam dui sed nisl imperdiet fringilla. Sed porta eros vitae nulla fringilla imperdiet. Proin sit amet nisi metus, et venenatis odio. Phasellus volutpat semper nibh vel hendrerit. Etiam ac volutpat nisl. Nam sed nunc nunc, sed imperdiet felis. Quisque et lorem sit amet nisl pulvinar ullamcorper ac eu massa. Nulla iaculis sapien fermentum lectus pharetra id egestas arcu luctus. Etiam adipiscing, elit lobortis dignissim tristique, est sapien sollicitudin orci, tempus volutpat dolor quam eu nunc.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Sed ac felis ac augue pretium elementum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas condimentum ultricies lectus id bibendum. Integer luctus velit a quam consequat eget sollicitudin dui gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam placerat elementum sem quis feugiat. Fusce tincidunt metus quis nisi facilisis porta. Vivamus varius lacinia molestie. Fusce eget risus nisi, in tincidunt enim. Ut imperdiet, est ut condimentum egestas, massa ante adipiscing metus, ut vestibulum ligula dolor a magna. Nam magna odio, laoreet vestibulum condimentum et, vestibulum vulputate nibh. Fusce aliquet leo sit amet sem laoreet convallis. Nunc nec consectetur orci.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Ut a erat lorem. Integer et lectus felis, sit amet cursus eros. Donec fringilla pellentesque orci, sed venenatis metus pharetra id. Proin hendrerit lobortis erat. Quisque eleifend gravida velit, vel feugiat leo laoreet ac. Donec sed enim eget nunc porttitor venenatis at in nulla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent et eros a lorem euismod accumsan vel eget libero. Duis ac ante quis nibh dapibus molestie et a tortor. Pellentesque eros tellus, eleifend nec pulvinar at, sodales porta lectus. Mauris enim felis, tempus a tincidunt quis, fermentum eget massa. Etiam ut nulla urna. Nulla ligula dui, pretium nec commodo non, ornare in libero. Sed id lacus nec dui placerat tristique at eu nisl. Sed neque eros, suscipit ac cursus eget, eleifend a ligula.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Vivamus posuere, eros non faucibus eleifend, nisi leo tristique enim, sed sollicitudin magna lectus a justo. Vivamus vehicula, eros sit amet elementum rhoncus, lacus ante suscipit lectus, eu consectetur velit erat a nisl. Fusce nulla justo, porta id ornare non, aliquam sed velit. Sed sit amet diam id mauris semper pellentesque eget at massa. Vivamus dapibus sollicitudin auctor. Suspendisse in nisl lectus, vitae pellentesque nulla. Phasellus viverra vulputate diam, venenatis volutpat risus pharetra vitae. Donec venenatis rhoncus interdum. Donec commodo, erat tempus consectetur laoreet, nisl mi aliquet massa, eu faucibus urna lorem ac ligula. Fusce sapien quam, imperdiet sit amet aliquet non, egestas vitae est. In hac habitasse platea dictumst. Suspendisse ultrices metus vel sapien luctus quis tincidunt mauris tincidunt. Mauris mi nibh, ultricies at dapibus vitae, gravida nec metus. Integer convallis congue aliquet. Phasellus placerat aliquet dui eu aliquam. Pellentesque id lorem tincidunt ligula posuere tincidunt.\n	</article>\n	<article class=\"bordered solid spaced\">\n		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu lacinia ipsum. Pellentesque vitae leo sit amet sem sodales tincidunt fringilla vitae risus. Nam eu nisl et odio sodales hendrerit. Aliquam porta fringilla lacinia. Donec metus odio, aliquam non elementum dignissim, vulputate vulputate velit. In hendrerit urna vulputate massa placerat id faucibus felis elementum. Nam et suscipit lectus.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Vestibulum quis enim at mi tincidunt hendrerit. Fusce massa velit, iaculis vel commodo sit amet, malesuada eget augue. Fusce aliquam dui sed nisl imperdiet fringilla. Sed porta eros vitae nulla fringilla imperdiet. Proin sit amet nisi metus, et venenatis odio. Phasellus volutpat semper nibh vel hendrerit. Etiam ac volutpat nisl. Nam sed nunc nunc, sed imperdiet felis. Quisque et lorem sit amet nisl pulvinar ullamcorper ac eu massa. Nulla iaculis sapien fermentum lectus pharetra id egestas arcu luctus. Etiam adipiscing, elit lobortis dignissim tristique, est sapien sollicitudin orci, tempus volutpat dolor quam eu nunc.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Sed ac felis ac augue pretium elementum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas condimentum ultricies lectus id bibendum. Integer luctus velit a quam consequat eget sollicitudin dui gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam placerat elementum sem quis feugiat. Fusce tincidunt metus quis nisi facilisis porta. Vivamus varius lacinia molestie. Fusce eget risus nisi, in tincidunt enim. Ut imperdiet, est ut condimentum egestas, massa ante adipiscing metus, ut vestibulum ligula dolor a magna. Nam magna odio, laoreet vestibulum condimentum et, vestibulum vulputate nibh. Fusce aliquet leo sit amet sem laoreet convallis. Nunc nec consectetur orci.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Ut a erat lorem. Integer et lectus felis, sit amet cursus eros. Donec fringilla pellentesque orci, sed venenatis metus pharetra id. Proin hendrerit lobortis erat. Quisque eleifend gravida velit, vel feugiat leo laoreet ac. Donec sed enim eget nunc porttitor venenatis at in nulla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent et eros a lorem euismod accumsan vel eget libero. Duis ac ante quis nibh dapibus molestie et a tortor. Pellentesque eros tellus, eleifend nec pulvinar at, sodales porta lectus. Mauris enim felis, tempus a tincidunt quis, fermentum eget massa. Etiam ut nulla urna. Nulla ligula dui, pretium nec commodo non, ornare in libero. Sed id lacus nec dui placerat tristique at eu nisl. Sed neque eros, suscipit ac cursus eget, eleifend a ligula.\n	</article>\n\n	<article class=\"bordered solid spaced\">\n		Vivamus posuere, eros non faucibus eleifend, nisi leo tristique enim, sed sollicitudin magna lectus a justo. Vivamus vehicula, eros sit amet elementum rhoncus, lacus ante suscipit lectus, eu consectetur velit erat a nisl. Fusce nulla justo, porta id ornare non, aliquam sed velit. Sed sit amet diam id mauris semper pellentesque eget at massa. Vivamus dapibus sollicitudin auctor. Suspendisse in nisl lectus, vitae pellentesque nulla. Phasellus viverra vulputate diam, venenatis volutpat risus pharetra vitae. Donec venenatis rhoncus interdum. Donec commodo, erat tempus consectetur laoreet, nisl mi aliquet massa, eu faucibus urna lorem ac ligula. Fusce sapien quam, imperdiet sit amet aliquet non, egestas vitae est. In hac habitasse platea dictumst. Suspendisse ultrices metus vel sapien luctus quis tincidunt mauris tincidunt. Mauris mi nibh, ultricies at dapibus vitae, gravida nec metus. Integer convallis congue aliquet. Phasellus placerat aliquet dui eu aliquam. Pellentesque id lorem tincidunt ligula posuere tincidunt.\n	</article>\n</section>\n"}, "docs/typography": function(exports, require, module) {module.exports = "<article class=\"impact\">\n	<h1>Typography</h1>\n	<p>Let's take a look how it looks like</p>\n</article>\n<article class=\"container\">\n	<h1>Header 1</h1>\n	<h2>Header 2</h2>\n	<h3>Header 3</h3>\n	<h4>Header 4</h4>\n	<h5>Header 5</h5>\n	<h6>Header 6</h6>\n</article>\n<pre>\n	Just some random ramblings (tip : It's a monospace font)\n	So ... this would look\n\n			Like it had a lot of spaces,\n	Right?\n</pre>\n<code>\nLet's handle some code :)\n	No tabs here;\n</code>\n<br />\n<br />\n\n<hr class=\"huge\" />\n<hr class=\"big\" />\n<hr />\n\n\n\n\n<article class=\"container\">\n	<h1 class=\"huge nogap blue\">HUGE Header 1</h1>\n	<h1 class=\"big nogap\">Big Header 1</h1>\n	<h2 class=\"huge nogap red\">HUGE Header 2</h2>\n	<h2 class=\"big nogap\">Big Header 2</h2>\n	<h3 class=\"huge nogap purple\">HUGE Header 3</h3>\n	<h3 class=\"big nogap\">Big Header 3</h3>\n	<h4 class=\"huge nogap pink\">HUGE Header 4</h4>\n	<h4 class=\"big nogap\">Big Header 4</h4>\n	<h5 class=\"huge nogap green\">HUGE Header 5</h5>\n	<h5 class=\"big nogap\">Big Header 5</h5>\n	<h6 class=\"huge nogap orange\">HUGE Header 6</h6>\n	<h6 class=\"big nogap\">Big Header 6</h6>\n</article>\n\n<hr class=\"big\" />\n<hr class=\"big\" />\n<hr class=\"big\" />\n\n<article class=\"container\">\n	<p>\n		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices, nisl sed sagittis varius, ipsum dui vestibulum neque, eu gravida dolor massa a nulla. Cras diam nulla, suscipit quis semper non, tempor viverra ligula. Sed dapibus dapibus dui, feugiat dictum odio pulvinar eget. Vivamus iaculis arcu in sem pellentesque tincidunt. Integer interdum imperdiet est, sed interdum ligula porta et. Etiam quis augue tortor. Maecenas venenatis orci ullamcorper ipsum sollicitudin mollis. Sed dapibus sodales facilisis.\n	</p>\n	\n	<p>\n		Nunc arcu dui, feugiat at ultricies id, tempus a sem. Phasellus laoreet sodales orci non mattis. In eros massa, volutpat sit amet elementum vel, mollis vitae nisl. Duis diam urna, mattis non placerat vel, bibendum laoreet leo. Vivamus a enim nec nisi placerat condimentum. Donec hendrerit ultrices mauris, non vehicula lectus molestie at. Aenean lobortis, metus non facilisis dapibus, mauris purus tincidunt purus, sit amet bibendum purus massa tempus magna. Cras vitae rhoncus ante. Suspendisse luctus nisi ut massa convallis gravida. Maecenas et dictum enim. Sed non urna nunc.\n	</p>\n	\n	<p>\n		Nunc dictum, ipsum tempus faucibus mattis, lorem ligula condimentum tellus, ut suscipit metus lorem eu velit. Sed vel orci quam. Duis eu massa a nibh fringilla placerat non in sapien. Proin suscipit hendrerit sem, non pretium diam viverra eget. Suspendisse vel tortor dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sollicitudin felis tincidunt enim ornare vel congue magna molestie. In placerat euismod nisl et faucibus. Vivamus sit amet diam ligula, eu porttitor lorem.\n	</p>\n	\n	<p>\n		Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam magna odio, porta quis mattis in, congue quis urna. Nulla eu elit nibh. Vestibulum velit arcu, lacinia at semper ut, convallis a dolor. In vulputate neque ut felis pellentesque et pulvinar purus pretium. Donec ut urna consectetur augue fermentum iaculis. Praesent ut dapibus est. In nec justo lacus. Cras venenatis dui ac lectus tempus non viverra libero molestie. Mauris enim elit, porta gravida ornare nec, facilisis sed dui. Donec sed ligula velit. Maecenas id ipsum tempor sem laoreet sollicitudin. Donec sit amet eros eu dui cursus consequat. Sed eu quam id nulla consectetur iaculis. Vivamus tristique dolor sed turpis tristique pharetra.\n	</p>\n	\n	<p>\n		Cras porta enim quis arcu fringilla sit amet gravida odio adipiscing. Phasellus id magna lorem, id posuere velit. Curabitur non neque faucibus mi vestibulum auctor pharetra quis enim. Curabitur turpis enim, aliquet eget porta non, euismod eu ligula. Morbi fermentum ullamcorper neque, a commodo nulla pretium eu. Duis ac gravida odio. Mauris nisl massa, congue vel auctor in, porttitor eget odio. Nulla et libero ac justo sollicitudin elementum. Aliquam quis nisl non elit pharetra suscipit. Fusce vel risus nulla. Aliquam congue, nisi eu dictum aliquet, mi neque rhoncus lacus, vel elementum arcu augue nec lacus. Nulla malesuada felis eget neque egestas sit amet suscipit quam venenatis. Curabitur malesuada urna sit amet neque bibendum placerat. Vivamus eros leo, tempus et aliquet id, tempor ut mauris. Cras arcu libero, bibendum varius mattis nec, pellentesque sed leo. Quisque sit amet dui vitae ante aliquam vehicula mattis vel turpis.\n	</p>\n</article>\n"}, "helpers/DependenciesManager": function(exports, require, module) {(function() {
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

    DepMan.prototype.googleFont = function(font, sizes) {
      var names, _s;
      names = font.split(" ");
      _s = this.deps["" + font] = document.createElement("link");
      _s.setAttribute("href", "http://fonts.googleapis.com/css?family=" + (names.join("+")) + ":" + (sizes.join(",")));
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
}, "stylesheets/font-awesome": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "/*  Font Awesome 3.0\n    the iconic font designed for use with Twitter Bootstrap\n    -------------------------------------------------------\n    The full suite of pictographic icons, examples, and documentation\n    can be found at: http://fortawesome.github.com/Font-Awesome/\n\n    License\n    -------------------------------------------------------\n    • The Font Awesome font is licensed under the SIL Open Font License - http://scripts.sil.org/OFL\n    • Font Awesome CSS, LESS, and SASS files are licensed under the MIT License -\n      http://opensource.org/licenses/mit-license.html\n    • The Font Awesome pictograms are licensed under the CC BY 3.0 License - http://creativecommons.org/licenses/by/3.0/\n    • Attribution is no longer required in Font Awesome 3.0, but much appreciated:\n      \"Font Awesome by Dave Gandy - http://fortawesome.github.com/Font-Awesome\"\n\n    Contact\n    -------------------------------------------------------\n    Email: dave@davegandy.com\n    Twitter: http://twitter.com/fortaweso_me\n    Work: Lead Product Designer @ http://kyruus.com\n\n    */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url('/font/fontawesome-webfont.eot');\n  src: url('/font/fontawesome-webfont.eot?#iefix') format('embedded-opentype'), url('/font/fontawesome-webfont.woff') format('woff'), url('/font/fontawesome-webfont.ttf') format('truetype');\n  font-weight: normal;\n  font-style: normal;\n}\n/*  Font Awesome styles\n    ------------------------------------------------------- */\n/* includes sprites.less reset */\n[class^=\"icon-\"],\n[class*=\" icon-\"] {\n  font-family: FontAwesome;\n  font-weight: normal;\n  font-style: normal;\n  text-decoration: inherit;\n  display: inline;\n  width: auto;\n  height: auto;\n  line-height: normal;\n  vertical-align: baseline;\n  background-image: none !important;\n  background-position: 0% 0%;\n  background-repeat: repeat;\n}\n[class^=\"icon-\"]:before,\n[class*=\" icon-\"]:before {\n  text-decoration: inherit;\n  display: inline-block;\n  speak: none;\n}\n/* makes sure icons active on rollover in links */\na [class^=\"icon-\"],\na [class*=\" icon-\"] {\n  display: inline-block;\n}\n/* makes the font 33% larger relative to the icon container */\n.icon-large:before {\n  vertical-align: -10%;\n  font-size: 1.3333333333333333em;\n}\n.btn [class^=\"icon-\"],\n.nav [class^=\"icon-\"],\n.btn [class*=\" icon-\"],\n.nav [class*=\" icon-\"] {\n  display: inline;\n  /* keeps button heights with and without icons the same */\n\n  line-height: .6em;\n}\n.btn [class^=\"icon-\"].icon-spin,\n.nav [class^=\"icon-\"].icon-spin,\n.btn [class*=\" icon-\"].icon-spin,\n.nav [class*=\" icon-\"].icon-spin {\n  display: inline-block;\n}\nli [class^=\"icon-\"],\nli [class*=\" icon-\"] {\n  display: inline-block;\n  width: 1.25em;\n  text-align: center;\n}\nli [class^=\"icon-\"].icon-large,\nli [class*=\" icon-\"].icon-large {\n  /* increased font size for icon-large */\n\n  width: 1.5625em;\n}\nul.icons {\n  list-style-type: none;\n  text-indent: -0.75em;\n}\nul.icons li [class^=\"icon-\"],\nul.icons li [class*=\" icon-\"] {\n  width: .75em;\n}\n.icon-muted {\n  color: #eeeeee;\n}\n.icon-border {\n  border: solid 1px #eeeeee;\n  padding: .2em .25em .15em;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\n.icon-2x {\n  font-size: 2em;\n}\n.icon-2x.icon-border {\n  border-width: 2px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n}\n.icon-3x {\n  font-size: 3em;\n}\n.icon-3x.icon-border {\n  border-width: 3px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\n.icon-4x {\n  font-size: 4em;\n}\n.icon-4x.icon-border {\n  border-width: 4px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n}\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n[class^=\"icon-\"].pull-left,\n[class*=\" icon-\"].pull-left {\n  margin-right: .35em;\n}\n[class^=\"icon-\"].pull-right,\n[class*=\" icon-\"].pull-right {\n  margin-left: .35em;\n}\n.btn [class^=\"icon-\"].pull-left.icon-2x,\n.btn [class*=\" icon-\"].pull-left.icon-2x,\n.btn [class^=\"icon-\"].pull-right.icon-2x,\n.btn [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .35em;\n}\n.btn [class^=\"icon-\"].icon-spin.icon-large,\n.btn [class*=\" icon-\"].icon-spin.icon-large {\n  height: .75em;\n}\n.btn.btn-small [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-small [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .45em;\n}\n.btn.btn-large [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-large [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .2em;\n}\n.icon-spin {\n  display: inline-block;\n  -moz-animation: spin 2s infinite linear;\n  -o-animation: spin 2s infinite linear;\n  -webkit-animation: spin 2s infinite linear;\n  animation: spin 2s infinite linear;\n}\n@-moz-keyframes spin {\n  0% {\n    -moz-transform: rotate(0deg);\n  }\n  100% {\n    -moz-transform: rotate(359deg);\n  }\n}\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n  }\n}\n@-o-keyframes spin {\n  0% {\n    -o-transform: rotate(0deg);\n  }\n  100% {\n    -o-transform: rotate(359deg);\n  }\n}\n@-ms-keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg);\n  }\n  100% {\n    -ms-transform: rotate(359deg);\n  }\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(359deg);\n  }\n}\n/*  Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n    readers do not read off random characters that represent icons */\n.icon-glass:before {\n  content: \"\\f000\";\n}\n.icon-music:before {\n  content: \"\\f001\";\n}\n.icon-search:before {\n  content: \"\\f002\";\n}\n.icon-envelope:before {\n  content: \"\\f003\";\n}\n.icon-heart:before {\n  content: \"\\f004\";\n}\n.icon-star:before {\n  content: \"\\f005\";\n}\n.icon-star-empty:before {\n  content: \"\\f006\";\n}\n.icon-user:before {\n  content: \"\\f007\";\n}\n.icon-film:before {\n  content: \"\\f008\";\n}\n.icon-th-large:before {\n  content: \"\\f009\";\n}\n.icon-th:before {\n  content: \"\\f00a\";\n}\n.icon-th-list:before {\n  content: \"\\f00b\";\n}\n.icon-ok:before {\n  content: \"\\f00c\";\n}\n.icon-remove:before {\n  content: \"\\f00d\";\n}\n.icon-zoom-in:before {\n  content: \"\\f00e\";\n}\n.icon-zoom-out:before {\n  content: \"\\f010\";\n}\n.icon-off:before {\n  content: \"\\f011\";\n}\n.icon-signal:before {\n  content: \"\\f012\";\n}\n.icon-cog:before {\n  content: \"\\f013\";\n}\n.icon-trash:before {\n  content: \"\\f014\";\n}\n.icon-home:before {\n  content: \"\\f015\";\n}\n.icon-file:before {\n  content: \"\\f016\";\n}\n.icon-time:before {\n  content: \"\\f017\";\n}\n.icon-road:before {\n  content: \"\\f018\";\n}\n.icon-download-alt:before {\n  content: \"\\f019\";\n}\n.icon-download:before {\n  content: \"\\f01a\";\n}\n.icon-upload:before {\n  content: \"\\f01b\";\n}\n.icon-inbox:before {\n  content: \"\\f01c\";\n}\n.icon-play-circle:before {\n  content: \"\\f01d\";\n}\n.icon-repeat:before {\n  content: \"\\f01e\";\n}\n/* \\f020 doesn't work in Safari. all shifted one down */\n.icon-refresh:before {\n  content: \"\\f021\";\n}\n.icon-list-alt:before {\n  content: \"\\f022\";\n}\n.icon-lock:before {\n  content: \"\\f023\";\n}\n.icon-flag:before {\n  content: \"\\f024\";\n}\n.icon-headphones:before {\n  content: \"\\f025\";\n}\n.icon-volume-off:before {\n  content: \"\\f026\";\n}\n.icon-volume-down:before {\n  content: \"\\f027\";\n}\n.icon-volume-up:before {\n  content: \"\\f028\";\n}\n.icon-qrcode:before {\n  content: \"\\f029\";\n}\n.icon-barcode:before {\n  content: \"\\f02a\";\n}\n.icon-tag:before {\n  content: \"\\f02b\";\n}\n.icon-tags:before {\n  content: \"\\f02c\";\n}\n.icon-book:before {\n  content: \"\\f02d\";\n}\n.icon-bookmark:before {\n  content: \"\\f02e\";\n}\n.icon-print:before {\n  content: \"\\f02f\";\n}\n.icon-camera:before {\n  content: \"\\f030\";\n}\n.icon-font:before {\n  content: \"\\f031\";\n}\n.icon-bold:before {\n  content: \"\\f032\";\n}\n.icon-italic:before {\n  content: \"\\f033\";\n}\n.icon-text-height:before {\n  content: \"\\f034\";\n}\n.icon-text-width:before {\n  content: \"\\f035\";\n}\n.icon-align-left:before {\n  content: \"\\f036\";\n}\n.icon-align-center:before {\n  content: \"\\f037\";\n}\n.icon-align-right:before {\n  content: \"\\f038\";\n}\n.icon-align-justify:before {\n  content: \"\\f039\";\n}\n.icon-list:before {\n  content: \"\\f03a\";\n}\n.icon-indent-left:before {\n  content: \"\\f03b\";\n}\n.icon-indent-right:before {\n  content: \"\\f03c\";\n}\n.icon-facetime-video:before {\n  content: \"\\f03d\";\n}\n.icon-picture:before {\n  content: \"\\f03e\";\n}\n.icon-pencil:before {\n  content: \"\\f040\";\n}\n.icon-map-marker:before {\n  content: \"\\f041\";\n}\n.icon-adjust:before {\n  content: \"\\f042\";\n}\n.icon-tint:before {\n  content: \"\\f043\";\n}\n.icon-edit:before {\n  content: \"\\f044\";\n}\n.icon-share:before {\n  content: \"\\f045\";\n}\n.icon-check:before {\n  content: \"\\f046\";\n}\n.icon-move:before {\n  content: \"\\f047\";\n}\n.icon-step-backward:before {\n  content: \"\\f048\";\n}\n.icon-fast-backward:before {\n  content: \"\\f049\";\n}\n.icon-backward:before {\n  content: \"\\f04a\";\n}\n.icon-play:before {\n  content: \"\\f04b\";\n}\n.icon-pause:before {\n  content: \"\\f04c\";\n}\n.icon-stop:before {\n  content: \"\\f04d\";\n}\n.icon-forward:before {\n  content: \"\\f04e\";\n}\n.icon-fast-forward:before {\n  content: \"\\f050\";\n}\n.icon-step-forward:before {\n  content: \"\\f051\";\n}\n.icon-eject:before {\n  content: \"\\f052\";\n}\n.icon-chevron-left:before {\n  content: \"\\f053\";\n}\n.icon-chevron-right:before {\n  content: \"\\f054\";\n}\n.icon-plus-sign:before {\n  content: \"\\f055\";\n}\n.icon-minus-sign:before {\n  content: \"\\f056\";\n}\n.icon-remove-sign:before {\n  content: \"\\f057\";\n}\n.icon-ok-sign:before {\n  content: \"\\f058\";\n}\n.icon-question-sign:before {\n  content: \"\\f059\";\n}\n.icon-info-sign:before {\n  content: \"\\f05a\";\n}\n.icon-screenshot:before {\n  content: \"\\f05b\";\n}\n.icon-remove-circle:before {\n  content: \"\\f05c\";\n}\n.icon-ok-circle:before {\n  content: \"\\f05d\";\n}\n.icon-ban-circle:before {\n  content: \"\\f05e\";\n}\n.icon-arrow-left:before {\n  content: \"\\f060\";\n}\n.icon-arrow-right:before {\n  content: \"\\f061\";\n}\n.icon-arrow-up:before {\n  content: \"\\f062\";\n}\n.icon-arrow-down:before {\n  content: \"\\f063\";\n}\n.icon-share-alt:before {\n  content: \"\\f064\";\n}\n.icon-resize-full:before {\n  content: \"\\f065\";\n}\n.icon-resize-small:before {\n  content: \"\\f066\";\n}\n.icon-plus:before {\n  content: \"\\f067\";\n}\n.icon-minus:before {\n  content: \"\\f068\";\n}\n.icon-asterisk:before {\n  content: \"\\f069\";\n}\n.icon-exclamation-sign:before {\n  content: \"\\f06a\";\n}\n.icon-gift:before {\n  content: \"\\f06b\";\n}\n.icon-leaf:before {\n  content: \"\\f06c\";\n}\n.icon-fire:before {\n  content: \"\\f06d\";\n}\n.icon-eye-open:before {\n  content: \"\\f06e\";\n}\n.icon-eye-close:before {\n  content: \"\\f070\";\n}\n.icon-warning-sign:before {\n  content: \"\\f071\";\n}\n.icon-plane:before {\n  content: \"\\f072\";\n}\n.icon-calendar:before {\n  content: \"\\f073\";\n}\n.icon-random:before {\n  content: \"\\f074\";\n}\n.icon-comment:before {\n  content: \"\\f075\";\n}\n.icon-magnet:before {\n  content: \"\\f076\";\n}\n.icon-chevron-up:before {\n  content: \"\\f077\";\n}\n.icon-chevron-down:before {\n  content: \"\\f078\";\n}\n.icon-retweet:before {\n  content: \"\\f079\";\n}\n.icon-shopping-cart:before {\n  content: \"\\f07a\";\n}\n.icon-folder-close:before {\n  content: \"\\f07b\";\n}\n.icon-folder-open:before {\n  content: \"\\f07c\";\n}\n.icon-resize-vertical:before {\n  content: \"\\f07d\";\n}\n.icon-resize-horizontal:before {\n  content: \"\\f07e\";\n}\n.icon-bar-chart:before {\n  content: \"\\f080\";\n}\n.icon-twitter-sign:before {\n  content: \"\\f081\";\n}\n.icon-facebook-sign:before {\n  content: \"\\f082\";\n}\n.icon-camera-retro:before {\n  content: \"\\f083\";\n}\n.icon-key:before {\n  content: \"\\f084\";\n}\n.icon-cogs:before {\n  content: \"\\f085\";\n}\n.icon-comments:before {\n  content: \"\\f086\";\n}\n.icon-thumbs-up:before {\n  content: \"\\f087\";\n}\n.icon-thumbs-down:before {\n  content: \"\\f088\";\n}\n.icon-star-half:before {\n  content: \"\\f089\";\n}\n.icon-heart-empty:before {\n  content: \"\\f08a\";\n}\n.icon-signout:before {\n  content: \"\\f08b\";\n}\n.icon-linkedin-sign:before {\n  content: \"\\f08c\";\n}\n.icon-pushpin:before {\n  content: \"\\f08d\";\n}\n.icon-external-link:before {\n  content: \"\\f08e\";\n}\n.icon-signin:before {\n  content: \"\\f090\";\n}\n.icon-trophy:before {\n  content: \"\\f091\";\n}\n.icon-github-sign:before {\n  content: \"\\f092\";\n}\n.icon-upload-alt:before {\n  content: \"\\f093\";\n}\n.icon-lemon:before {\n  content: \"\\f094\";\n}\n.icon-phone:before {\n  content: \"\\f095\";\n}\n.icon-check-empty:before {\n  content: \"\\f096\";\n}\n.icon-bookmark-empty:before {\n  content: \"\\f097\";\n}\n.icon-phone-sign:before {\n  content: \"\\f098\";\n}\n.icon-twitter:before {\n  content: \"\\f099\";\n}\n.icon-facebook:before {\n  content: \"\\f09a\";\n}\n.icon-github:before {\n  content: \"\\f09b\";\n}\n.icon-unlock:before {\n  content: \"\\f09c\";\n}\n.icon-credit-card:before {\n  content: \"\\f09d\";\n}\n.icon-rss:before {\n  content: \"\\f09e\";\n}\n.icon-hdd:before {\n  content: \"\\f0a0\";\n}\n.icon-bullhorn:before {\n  content: \"\\f0a1\";\n}\n.icon-bell:before {\n  content: \"\\f0a2\";\n}\n.icon-certificate:before {\n  content: \"\\f0a3\";\n}\n.icon-hand-right:before {\n  content: \"\\f0a4\";\n}\n.icon-hand-left:before {\n  content: \"\\f0a5\";\n}\n.icon-hand-up:before {\n  content: \"\\f0a6\";\n}\n.icon-hand-down:before {\n  content: \"\\f0a7\";\n}\n.icon-circle-arrow-left:before {\n  content: \"\\f0a8\";\n}\n.icon-circle-arrow-right:before {\n  content: \"\\f0a9\";\n}\n.icon-circle-arrow-up:before {\n  content: \"\\f0aa\";\n}\n.icon-circle-arrow-down:before {\n  content: \"\\f0ab\";\n}\n.icon-globe:before {\n  content: \"\\f0ac\";\n}\n.icon-wrench:before {\n  content: \"\\f0ad\";\n}\n.icon-tasks:before {\n  content: \"\\f0ae\";\n}\n.icon-filter:before {\n  content: \"\\f0b0\";\n}\n.icon-briefcase:before {\n  content: \"\\f0b1\";\n}\n.icon-fullscreen:before {\n  content: \"\\f0b2\";\n}\n.icon-group:before {\n  content: \"\\f0c0\";\n}\n.icon-link:before {\n  content: \"\\f0c1\";\n}\n.icon-cloud:before {\n  content: \"\\f0c2\";\n}\n.icon-beaker:before {\n  content: \"\\f0c3\";\n}\n.icon-cut:before {\n  content: \"\\f0c4\";\n}\n.icon-copy:before {\n  content: \"\\f0c5\";\n}\n.icon-paper-clip:before {\n  content: \"\\f0c6\";\n}\n.icon-save:before {\n  content: \"\\f0c7\";\n}\n.icon-sign-blank:before {\n  content: \"\\f0c8\";\n}\n.icon-reorder:before {\n  content: \"\\f0c9\";\n}\n.icon-list-ul:before {\n  content: \"\\f0ca\";\n}\n.icon-list-ol:before {\n  content: \"\\f0cb\";\n}\n.icon-strikethrough:before {\n  content: \"\\f0cc\";\n}\n.icon-underline:before {\n  content: \"\\f0cd\";\n}\n.icon-table:before {\n  content: \"\\f0ce\";\n}\n.icon-magic:before {\n  content: \"\\f0d0\";\n}\n.icon-truck:before {\n  content: \"\\f0d1\";\n}\n.icon-pinterest:before {\n  content: \"\\f0d2\";\n}\n.icon-pinterest-sign:before {\n  content: \"\\f0d3\";\n}\n.icon-google-plus-sign:before {\n  content: \"\\f0d4\";\n}\n.icon-google-plus:before {\n  content: \"\\f0d5\";\n}\n.icon-money:before {\n  content: \"\\f0d6\";\n}\n.icon-caret-down:before {\n  content: \"\\f0d7\";\n}\n.icon-caret-up:before {\n  content: \"\\f0d8\";\n}\n.icon-caret-left:before {\n  content: \"\\f0d9\";\n}\n.icon-caret-right:before {\n  content: \"\\f0da\";\n}\n.icon-columns:before {\n  content: \"\\f0db\";\n}\n.icon-sort:before {\n  content: \"\\f0dc\";\n}\n.icon-sort-down:before {\n  content: \"\\f0dd\";\n}\n.icon-sort-up:before {\n  content: \"\\f0de\";\n}\n.icon-envelope-alt:before {\n  content: \"\\f0e0\";\n}\n.icon-linkedin:before {\n  content: \"\\f0e1\";\n}\n.icon-undo:before {\n  content: \"\\f0e2\";\n}\n.icon-legal:before {\n  content: \"\\f0e3\";\n}\n.icon-dashboard:before {\n  content: \"\\f0e4\";\n}\n.icon-comment-alt:before {\n  content: \"\\f0e5\";\n}\n.icon-comments-alt:before {\n  content: \"\\f0e6\";\n}\n.icon-bolt:before {\n  content: \"\\f0e7\";\n}\n.icon-sitemap:before {\n  content: \"\\f0e8\";\n}\n.icon-umbrella:before {\n  content: \"\\f0e9\";\n}\n.icon-paste:before {\n  content: \"\\f0ea\";\n}\n.icon-lightbulb:before {\n  content: \"\\f0eb\";\n}\n.icon-exchange:before {\n  content: \"\\f0ec\";\n}\n.icon-cloud-download:before {\n  content: \"\\f0ed\";\n}\n.icon-cloud-upload:before {\n  content: \"\\f0ee\";\n}\n.icon-user-md:before {\n  content: \"\\f0f0\";\n}\n.icon-stethoscope:before {\n  content: \"\\f0f1\";\n}\n.icon-suitcase:before {\n  content: \"\\f0f2\";\n}\n.icon-bell-alt:before {\n  content: \"\\f0f3\";\n}\n.icon-coffee:before {\n  content: \"\\f0f4\";\n}\n.icon-food:before {\n  content: \"\\f0f5\";\n}\n.icon-file-alt:before {\n  content: \"\\f0f6\";\n}\n.icon-building:before {\n  content: \"\\f0f7\";\n}\n.icon-hospital:before {\n  content: \"\\f0f8\";\n}\n.icon-ambulance:before {\n  content: \"\\f0f9\";\n}\n.icon-medkit:before {\n  content: \"\\f0fa\";\n}\n.icon-fighter-jet:before {\n  content: \"\\f0fb\";\n}\n.icon-beer:before {\n  content: \"\\f0fc\";\n}\n.icon-h-sign:before {\n  content: \"\\f0fd\";\n}\n.icon-plus-sign-alt:before {\n  content: \"\\f0fe\";\n}\n.icon-double-angle-left:before {\n  content: \"\\f100\";\n}\n.icon-double-angle-right:before {\n  content: \"\\f101\";\n}\n.icon-double-angle-up:before {\n  content: \"\\f102\";\n}\n.icon-double-angle-down:before {\n  content: \"\\f103\";\n}\n.icon-angle-left:before {\n  content: \"\\f104\";\n}\n.icon-angle-right:before {\n  content: \"\\f105\";\n}\n.icon-angle-up:before {\n  content: \"\\f106\";\n}\n.icon-angle-down:before {\n  content: \"\\f107\";\n}\n.icon-desktop:before {\n  content: \"\\f108\";\n}\n.icon-laptop:before {\n  content: \"\\f109\";\n}\n.icon-tablet:before {\n  content: \"\\f10a\";\n}\n.icon-mobile-phone:before {\n  content: \"\\f10b\";\n}\n.icon-circle-blank:before {\n  content: \"\\f10c\";\n}\n.icon-quote-left:before {\n  content: \"\\f10d\";\n}\n.icon-quote-right:before {\n  content: \"\\f10e\";\n}\n.icon-spinner:before {\n  content: \"\\f110\";\n}\n.icon-circle:before {\n  content: \"\\f111\";\n}\n.icon-reply:before {\n  content: \"\\f112\";\n}\n.icon-github-alt:before {\n  content: \"\\f113\";\n}\n.icon-folder-close-alt:before {\n  content: \"\\f114\";\n}\n.icon-folder-open-alt:before {\n  content: \"\\f115\";\n}\n"; s.id = "css-font-awesome"; document.head.appendChild(s);}, "views/404": function(exports, require, module) {module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
      __out.push('<div id="fourohfour">\n\t<section>\n\t\t<h1><a href="/">');
    
      __out.push(__sanitize(this.text));
    
      __out.push('</a></h1>\n\t</section>\n\t<header>\n\t\t<h1>');
    
      __out.push(__sanitize(this.title));
    
      __out.push('</h1>\n\t\t<h2>');
    
      __out.push(__sanitize(this.reason));
    
      __out.push('</h2>\n\t\t<article>');
    
      __out.push(__sanitize(this.message));
    
      __out.push('</article>\n\t</header>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/indexPage": function(exports, require, module) {module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
      __out.push('<div id="indexPageLayout">\n\t<header>\n\t\t<div class="container"><h1><a href="/">');
    
      __out.push(__sanitize(this.title));
    
      __out.push('</a><small><a href="/checkin"><span></span></a></small></h1></div>\t\n\t</header>\n\t<section>\n\t\t<article class="big">\n\t\t\t<a href="/ticket/somebod">Click Me</a>\t\n\t\t\t<a href="/ticket/somebod/save">Save Me</a>\t\n\t\t</article>\n\t</section>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/layout": function(exports, require, module) {module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var item, _i, _len, _ref;
    
      __out.push('<header class="fixed-top">\n\t<div class="container">\n\t\t<h1><a href="/">');
    
      __out.push(__sanitize(this.title));
    
      __out.push('</a></h1>\n\t\t<nav>\n\t\t\t');
    
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        __out.push('\n\t\t\t<li><a href="');
        __out.push(__sanitize(item.link));
        __out.push('" title="');
        __out.push(__sanitize(item.help || ''));
        __out.push('">');
        __out.push(__sanitize(item.title));
        __out.push('</a></li>\n\t\t\t');
      }
    
      __out.push('\n\t\t</nav>\n\t</div>\n</header>\n<section class=\'container\'>\n\n</section>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}});
