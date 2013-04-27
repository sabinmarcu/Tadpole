(function(module){(function(){var CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");Math.uuid=function(len,radix){var chars=CHARS,uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix]}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]="-";uuid[14]="4";for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[i==19?r&3|8:r]}}}return uuid.join("")};Math.uuidFast=function(){var chars=CHARS,uuid=new Array(36),rnd=0,r;for(var i=0;i<36;i++){if(i==8||i==13||i==18||i==23){uuid[i]="-"}else if(i==14){uuid[i]="4"}else{if(rnd<=2)rnd=33554432+Math.random()*16777216|0;r=rnd&15;rnd=rnd>>4;uuid[i]=chars[i==19?r&3|8:r]}}return uuid.join("")};Math.uuidCompact=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=="x"?r:r&3|8;return v.toString(16)})}})();(function(){if(!this.require){var modules={},cache={},require=function(name,root){var path=expand(root,name),module=cache[path],fn;if(module){return module.exports}else if(fn=modules[path]||modules[path=expand(path,"./index")]){module={id:path,exports:{}};try{cache[path]=module;fn(module.exports,function(name){return require(name,dirname(path))},module);return module.exports}catch(err){delete cache[path];throw err}}else{throw"module '"+name+"' not found"}},expand=function(root,name){var results=[],parts,part;if(/^\.\.?(\/|$)/.test(name)){parts=[root,name].join("/").split("/")}else{parts=name.split("/")}for(var i=0,length=parts.length;i<length;i++){part=parts[i];if(part==".."){results.pop()}else if(part!="."&&part!=""){results.push(part)}}return results.join("/")},dirname=function(path){return path.split("/").slice(0,-1).join("/")};this.require=function(name){return require(name,"")};this.require.define=function(bundle){for(var key in bundle)modules[key]=bundle[key]}}return this.require.define}).call(this)({Enum:function(exports,require,module){(function(){var Enum;Enum=function(){function Enum(items,offset){var item,key,_i,_len;if(offset==null){offset=0}for(key=_i=0,_len=items.length;_i<_len;key=++_i){item=items[key];this[item]=key+offset}}return Enum}();module.exports=Enum}).call(this)},ErrorReporter:function(exports,require,module){(function(){var ErrorReporter,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};ErrorReporter=function(){function ErrorReporter(){this.toString=__bind(this.toString,this)}ErrorReporter._errors={"Unknown Error":["An unknown error has occurred"]};ErrorReporter._indices=[ErrorReporter._errors["Unknown Error"][0]];ErrorReporter._groups=["Unknown Error"];ErrorReporter.wrapCustomError=function(error){return"["+error.name+"] "+error.message};ErrorReporter.generate=function(errorCode,extra){if(extra==null){extra=null}return(new this).generate(errorCode,extra)};ErrorReporter.extended=function(){var error,errors,group,key,_i,_len,_ref;_ref=this.errors;for(group in _ref){errors=_ref[group];this._errors[group]=errors;this._groups.push(group);for(key=_i=0,_len=errors.length;_i<_len;key=++_i){error=errors[key];this._indices.push(this._errors[group][key])}}this.prototype._=this;delete this.errors;return this.include(ErrorReporter.prototype)};ErrorReporter.prototype.generate=function(errCode,extra){var errors,group,_ref,_ref1;this.errCode=errCode;if(extra==null){extra=null}if(!this._._indices[this.errCode]){this.name=this._._groups[0];this.message=this._._errors[this._._groups[0]][0]}else{this.message=this._._indices[this.errCode];if(extra){this.message+=" - Extra Data : "+extra}_ref=this._._errors;for(group in _ref){errors=_ref[group];if(!(_ref1=this.message,__indexOf.call(errors,_ref1)>=0)){continue}this.name=group;break}}return this};ErrorReporter.prototype.toString=function(){return"["+this.name+"] "+this.message+" |"+this.errCode+"|"};return ErrorReporter}();module.exports=ErrorReporter}).call(this)},"Modules/Mediator":function(exports,require,module){(function(){var Modules;Modules={Observer:require("Modules/Observer")};Modules.Mediator=function(){var extended,included,installTo,key,value,_ref;function Mediator(){}_ref=Modules.Observer;for(key in _ref){value=_ref[key];Mediator.prototype[key]=value}installTo=function(object){this.delegate("publish",object);return this.delegate("subscribe",object)};included=function(){this.prototype.queue={};return this.prototype._delegates={publish:true,subscribe:true}};extended=function(){this.queue={};return this._delegates={publish:true,subscribe:true}};return Mediator}();module.exports=Modules.Mediator.prototype}).call(this)},"Modules/ORM":function(exports,require,module){(function(){var Modules,V,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};Modules={};V=require("Variable");Modules.ORM=function(){function ORM(){}ORM.prototype._identifier="BasicORM";ORM.prototype._reccords={};ORM.prototype._symlinks={};ORM.prototype._head=0;ORM.prototype._props=[];ORM.prototype.get=function(which){if(typeof which==="object"){return this.getAdv(which)}return this._symlinks[which]||this._reccords[which]||null};ORM.prototype.getAdv=function(what){var check,key,rec,results,_ref,_ref1;results=[];check=function(rec){var final,k,mod,modfinal,recs,v,val,value,_i,_len;for(k in what){v=what[k];final=false;if(rec[k]==null){break}if(typeof v==="object"){for(mod in v){val=v[mod];modfinal=true;switch(mod){case"$gt":if(rec[k].get()<=val){modfinal=false;break}break;case"$gte":if(rec[k].get()<val){modfinal=false;break}break;case"$lt":if(rec[k].get()>=val){modfinal=false;break}break;case"$lte":if(rec[k].get()>val){modfinal=false;break}break;case"$contains":recs=rec[k].get();if(recs.constructor!==Array){modfinal=false;break}modfinal=false;for(_i=0,_len=recs.length;_i<_len;_i++){value=recs[_i];if(value===val){modfinal=true;break}}}if(modfinal===false){break}}if(modfinal===true){final=true}}else if(rec[k].get()===v){final=true}else{break}}if(final){return results.push(rec)}};_ref=this._reccords;for(key in _ref){rec=_ref[key];check(rec)}_ref1=this._symlinks;for(key in _ref1){rec=_ref1[key];check(rec)}if(results.length===0){return null}if(results.length===1){return results[0]}return results};ORM.prototype["delete"]=function(which){var _base,_base1,_ref,_ref1;if((_ref=(_base=this._reccords)[which])==null){_base[which]=null}return(_ref1=(_base1=this._symlinks)[which])!=null?_ref1:_base1[which]=null};ORM.prototype.create=function(id,args){var prop,uuid,_i,_len,_ref,_ref1,_ref2;if((_ref=this._reccords)==null){this._reccords={}}if(args==null){args={}}uuid=id||args._id||this._head;if((_ref1=args._id)==null){args._id=uuid}uuid=Math.uuidFast(uuid);args._uuid=uuid;args._fn=this;if(typeof this.preCreate==="function"){this.preCreate(args)}this._reccords[uuid]=new this(args);this._reccords[uuid]._constructor(args);if(typeof this.postCreate==="function"){this.postCreate(this._reccords[uuid],args)}if(id!=null&&id!==this._head){this._symlinks[id]=this._reccords[uuid]}if(uuid===this._head){this._head++}_ref2=this._props;for(_i=0,_len=_ref2.length;_i<_len;_i++){prop=_ref2[_i];this._reccords[uuid][prop]=V.spawn()}return this._reccords[uuid]};ORM.prototype.reuse=function(which,args){var rez;if(args==null){args={}}rez=this.get(which);if(rez!=null){return rez}return this.create(which,args)};ORM.prototype.addProp=function(prop){var key,rec,_ref,_ref1,_results;this._props.push(prop);_ref=this._reccords;_results=[];for(key in _ref){rec=_ref[key];_results.push((_ref1=rec[prop])!=null?_ref1:rec[prop]=V.spawn())}return _results};ORM.prototype.removeProp=function(prop){var k,key,p,rec,_i,_len,_ref,_ref1,_ref2;_ref=this._reccords;for(key in _ref){rec=_ref[key];if((_ref1=rec[prop])==null){rec[prop]=null}}_ref2=this._props;for(k=_i=0,_len=_ref2.length;_i<_len;k=++_i){p=_ref2[k];if(p===prop){return this._props.splice(k,1)}}};ORM.prototype.extended=function(){this._excludes=["_fn","_uuid","_id"];return this.include({_constructor:function(args){var k,key,v,value,valueSet,_results;valueSet={};this._uuid=args._uuid||null;this._id=args._id||null;this.fn=args._fn;for(key in args){value=args[key];if(__indexOf.call(this.fn._excludes,key)<0&&this.constructFilter(key,value)!==false){valueSet[key]=value}}if(this.init!=null){return this.init.call(this,valueSet)}_results=[];for(k in valueSet){v=valueSet[k];_results.push(this[k]=v)}return _results},constructFilter:function(key,value){return true},remove:function(){return this.parent.remove(this.id)}})};return ORM}();module.exports=Modules.ORM.prototype}).call(this)},"Modules/Observer":function(exports,require,module){(function(){var Modules,__slice=[].slice;Modules={};Modules.Observer=function(){function Observer(){}Observer.prototype.delegateEvent=function(event,handler,object){var c,_base,_ref;if(object==null){object=window}if(event.substr(0,2)==="on"){event=event.substr(2)}if((_ref=(_base=this.queue)[event])==null){_base[event]=[]}c=this.queue[event].length;this.queue[event].unshift(function(){return handler.apply(object,arguments)});return c};Observer.prototype.subscribe=function(event,handler){return this.delegateEvent(event,handler,this)};Observer.prototype.publish=function(){var args,event,handler,key,_ref;args=1<=arguments.length?__slice.call(arguments,0):[];event=args[0];args=args.splice(1);if(!event||this.queue[event]==null){return this}_ref=this.queue[event];for(key in _ref){handler=_ref[key];if(key!=="__head"){handler.apply(this,args)}}return this};Observer.prototype.unsubscribe=function(event,id){if(!this.queue[event]){return null}if(!this.queue[event][id]){return null}return this.queue[event].splice(id,1)};Observer.prototype.included=function(){return this.prototype.queue={}};Observer.prototype.extended=function(){return this.queue={}};return Observer}();module.exports=Modules.Observer.prototype}).call(this)},"Modules/Overload":function(exports,require,module){(function(){var CRITERIA,Include,Modules,_count,__slice=[].slice,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}};Modules={};_count=function(object){var key,nr,value;nr=0;for(key in object){value=object[key];nr++}return nr};CRITERIA={args:function(crit,args){return args.length===crit}};Include=function(){function Include(){}Include.prototype.overload=function(sets){var helper;helper=new Modules.Overload(sets,this);return this.proxy(function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];return helper.verifyAll.apply(helper,args)},this)};return Include}();Modules.Overload=function(){function Overload(sets,parent){var aux,i,j,name,set,_i,_j,_ref,_ref1,_ref2;this.parent=parent;this.verify=__bind(this.verify,this);this.verifyAll=__bind(this.verifyAll,this);this.names=[];this.verifies=[];this.handles=[];for(name in sets){set=sets[name];this.names.push(name);this.verifies.push(set["if"]||null);this.handles.push(set.then||null)}for(i=_i=0,_ref=this.verifies.length-1;0<=_ref?_i<=_ref:_i>=_ref;i=0<=_ref?++_i:--_i){for(j=_j=_ref1=i+1,_ref2=this.verifies.length;_ref1<=_ref2?_j<=_ref2:_j>=_ref2;j=_ref1<=_ref2?++_j:--_j){if(_count(this.verifies[i])<_count(this.verifies[j])){aux=this.verifies[i];this.verifies[i]=this.verifies[j];this.verifies[j]=aux;aux=this.names[i];this.names[i]=this.names[j];this.names[j]=aux;aux=this.handles[i];this.handles[i]=this.handles[j];this.handles[j]=aux}}}}Overload.prototype.verifyAll=function(){var args,how,key,set,what,_i,_len,_ref;args=1<=arguments.length?__slice.call(arguments,0):[];this.args=args;_ref=this.verifies;for(key=_i=0,_len=_ref.length;_i<_len;key=++_i){set=_ref[key];if(set!=null){for(what in set){how=set[what];if(!this.verify(what,how)){break}return this.handles[key].apply(this.parent,this.args)}}}return(this.handles["default"]||this.handles[key-1]).apply(this.parent,this.args)};Overload.prototype.verify=function(what,how){if(CRITERIA[what]){return CRITERIA[what](how,this.args)}else{what=parseInt(what.replace("arg",""))-1;if(this.args[what]!=null){return how.apply(this.parent,this.args)}return false}};return Overload}();module.exports=Include.prototype}).call(this)},"Modules/StateMachine":function(exports,require,module){(function(){var Modules,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}};Modules={};Modules.StateMachine=function(){function StateMachine(){this.delegateContext=__bind(this.delegateContext,this)}StateMachine.prototype.extended=function(){this._contexts=[];return this._activeContext=null};StateMachine.prototype.included=function(){this.prototype._contexts=[];return this.prototype._activeContext=null};StateMachine.prototype.delegateContext=function(context){var l;if(this._find(context)){return null}l=this._contexts.length;this._contexts[l]=context;if(context.activate==null){context.activate=function(){}}if(context.deactivate==null){context.deactivate=function(){}}return this};StateMachine.prototype.getActiveContextID=function(){return this._activeContext};StateMachine.prototype.getActiveContext=function(){return this._activeContext};StateMachine.prototype.getContext=function(context){return this._contexts[context]||null};StateMachine.prototype._find=function(con){var key,value,_i,_len,_ref;_ref=this._contexts;for(value=_i=0,_len=_ref.length;_i<_len;value=++_i){key=_ref[value];if(con===key){return value}}return null};StateMachine.prototype.activateContext=function(context){var con;con=this._find(context);if(con==null){return null}if(this._activeContext===con){return true}this._activeContext=con;return context.activate()};StateMachine.prototype.deactivateContext=function(context){if(this._find(context)==null){return null}this._activeContext=null;return context.deactivate()};StateMachine.prototype.switchContext=function(context){var con;if(context==null){con=this._activeContext+1;if(con===this._contexts.length){con=0}}else{con=this._find(context);if(con==null){return null}}this.deactivateContext(this._contexts[this._activeContext]);this.activateContext(this._contexts[con]);return this._contexts[con]};return StateMachine}();module.exports=Modules.StateMachine.prototype}).call(this)},Object:function(exports,require,module){(function(){var $,Obiect,clone,_excludes,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1},__slice=[].slice;_excludes=["included","extended"];clone=function(obj){var k,o,v;o=obj instanceof Array?[]:{};for(k in obj){v=obj[k];if(v!=null&&typeof v==="object"){o[k]=clone(v)}else{o[k]=v}}return o};$=function(what){return $[what]||null};Obiect=function(){var extended,included;function Obiect(){}Obiect.clone=function(obj){if(obj==null){obj=this}debugger;return Obiect.proxy(Obiect.include,Obiect.proxy(Obiect.extend,function(){})(obj))(obj.prototype)};Obiect.extend=function(obj,into){var k,value,_ref,_ref1;if(into==null){into=this}obj=clone(obj);for(k in obj){value=obj[k];if(!(__indexOf.call(_excludes,k)>=0||obj._excludes!=null&&__indexOf.call(obj._excludes,k)>=0)){if(into[k]!=null){if((_ref=into["super"])==null){into["super"]={}}into["super"][k]=into[k]}into[k]=value}}if((_ref1=obj.extended)!=null){_ref1.call(into)}return this};Obiect.include=function(obj,into){var key,value,_ref;if(into==null){into=this}obj=clone(obj);for(key in obj){value=obj[key];into.prototype[key]=value}if((_ref=obj.included)!=null){_ref.call(into)}return this};Obiect.proxy=function(){var to,what,_this=this;what=arguments[0];to=arguments[1];if(typeof what==="function"){return function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];return what.apply(to,args)}}else{return this[what]}};Obiect.delegate=function(property,context){var _ref;if(((_ref=this._delegates)!=null?_ref[property]:void 0)!=null===false&&this._deleagates[property]!==false){trigger("Cannot delegate member "+property+" to "+context)}return context[property]=this.proxy(function(){return this[property](arguments)},this)};extended=function(){};included=function(){};Obiect.include({proxy:Obiect.proxy});return Obiect}();module.exports=Obiect}).call(this)},Promise:function(exports,require,module){(function(){var Promise,__slice=[].slice;Promise=function(){function Promise(promise){if(promise instanceof Promise){return promise}this.callbacks=[]}Promise.prototype.then=function(ok,err,progr){this.callbacks.push({ok:ok,error:err,progress:progr});return this};Promise.prototype.resolve=function(){var args,callback;args=1<=arguments.length?__slice.call(arguments,0):[];callback=this.callbacks.shift();if(callback&&callback.ok){callback.ok.apply(this,args)}return this};Promise.prototype.reject=function(){var args,callback;args=1<=arguments.length?__slice.call(arguments,0):[];callback=this.callbacks.shift();if(callback&&callback.error){callback.error.apply(this,args)}return this};Promise.prototype.progress=function(){var args,callback;args=1<=arguments.length?__slice.call(arguments,0):[];callback=this.callbacks[0];if(callback&&callback.progress){callback.progress.apply(this,args)}return this};return Promise}();module.exports=Promise}).call(this)},Variable:function(exports,require,module){(function(){var Variable,_ref,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};Variable=function(_super){__extends(Variable,_super);function Variable(){_ref=Variable.__super__.constructor.apply(this,arguments);return _ref}Variable.spawn=function(){var x;x=new this;x._value=null;return x};Variable.prototype.get=function(){return this._value};Variable.prototype.set=function(value){return this._value=value};Variable.prototype.add=function(reccord){if(this._value==null||this._value.constructor!==Array){this._value=[]}return this._value.push(reccord)};return Variable}(require("Object"));if(typeof module!=="undefined"&&module!==null){module.exports=Variable}}).call(this)},async:function(exports,require,module){(function(){var async={};var root,previous_async;root=this;if(root!=null){previous_async=root.async}async.noConflict=function(){root.async=previous_async;return async};function only_once(fn){var called=false;return function(){if(called)throw new Error("Callback was already called.");called=true;fn.apply(root,arguments)}}var _each=function(arr,iterator){if(arr.forEach){return arr.forEach(iterator)}for(var i=0;i<arr.length;i+=1){iterator(arr[i],i,arr)}};var _map=function(arr,iterator){if(arr.map){return arr.map(iterator)}var results=[];_each(arr,function(x,i,a){results.push(iterator(x,i,a))});return results};var _reduce=function(arr,iterator,memo){if(arr.reduce){return arr.reduce(iterator,memo)}_each(arr,function(x,i,a){memo=iterator(memo,x,i,a)});return memo};var _keys=function(obj){if(Object.keys){return Object.keys(obj)}var keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){keys.push(k)}}return keys};if(typeof process==="undefined"||!process.nextTick){if(typeof setImmediate==="function"){async.nextTick=function(fn){setImmediate(fn)}}else{async.nextTick=function(fn){setTimeout(fn,0)}}}else{async.nextTick=process.nextTick}async.each=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback()}var completed=0;_each(arr,function(x){iterator(x,only_once(function(err){if(err){callback(err);callback=function(){}}else{completed+=1;if(completed>=arr.length){callback(null)}}}))})};async.forEach=async.each;async.eachSeries=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback()}var completed=0;var iterate=function(){var sync=true;iterator(arr[completed],function(err){if(err){callback(err);callback=function(){}}else{completed+=1;if(completed>=arr.length){callback(null)}else{if(sync){async.nextTick(iterate)}else{iterate()}}}});sync=false};iterate()};async.forEachSeries=async.eachSeries;async.eachLimit=function(arr,limit,iterator,callback){var fn=_eachLimit(limit);fn.apply(null,[arr,iterator,callback])};async.forEachLimit=async.eachLimit;var _eachLimit=function(limit){return function(arr,iterator,callback){callback=callback||function(){};if(!arr.length||limit<=0){return callback()}var completed=0;var started=0;var running=0;(function replenish(){if(completed>=arr.length){return callback()}while(running<limit&&started<arr.length){started+=1;running+=1;iterator(arr[started-1],function(err){if(err){callback(err);callback=function(){}}else{completed+=1;running-=1;if(completed>=arr.length){callback()}else{replenish()}}})}})()}};var doParallel=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.each].concat(args))}};var doParallelLimit=function(limit,fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[_eachLimit(limit)].concat(args))}};var doSeries=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.eachSeries].concat(args))}};var _asyncMap=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(err,v){results[x.index]=v;callback(err)})},function(err){callback(err,results)})};async.map=doParallel(_asyncMap);async.mapSeries=doSeries(_asyncMap);async.mapLimit=function(arr,limit,iterator,callback){return _mapLimit(limit)(arr,iterator,callback)};var _mapLimit=function(limit){return doParallelLimit(limit,_asyncMap)};async.reduce=function(arr,memo,iterator,callback){async.eachSeries(arr,function(x,callback){iterator(memo,x,function(err,v){memo=v;callback(err)})},function(err){callback(err,memo)})};async.inject=async.reduce;async.foldl=async.reduce;async.reduceRight=function(arr,memo,iterator,callback){var reversed=_map(arr,function(x){return x}).reverse();async.reduce(reversed,memo,iterator,callback)};async.foldr=async.reduceRight;var _filter=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(v){results.push(x)}callback()})},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.filter=doParallel(_filter);async.filterSeries=doSeries(_filter);async.select=async.filter;async.selectSeries=async.filterSeries;var _reject=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(!v){results.push(x)}callback()})},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.reject=doParallel(_reject);async.rejectSeries=doSeries(_reject);var _detect=function(eachfn,arr,iterator,main_callback){eachfn(arr,function(x,callback){iterator(x,function(result){if(result){main_callback(x);main_callback=function(){}}else{callback()}})},function(err){main_callback()})};async.detect=doParallel(_detect);async.detectSeries=doSeries(_detect);async.some=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(v){main_callback(true);main_callback=function(){}}callback()})},function(err){main_callback(false)})};async.any=async.some;async.every=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(!v){main_callback(false);main_callback=function(){}}callback()})},function(err){main_callback(true)})};async.all=async.every;async.sortBy=function(arr,iterator,callback){async.map(arr,function(x,callback){iterator(x,function(err,criteria){if(err){callback(err)}else{callback(null,{value:x,criteria:criteria})}})},function(err,results){if(err){return callback(err)}else{var fn=function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0};callback(null,_map(results.sort(fn),function(x){return x.value}))}})};async.auto=function(tasks,callback){callback=callback||function(){};var keys=_keys(tasks);if(!keys.length){return callback(null)}var results={};var listeners=[];var addListener=function(fn){listeners.unshift(fn)};var removeListener=function(fn){for(var i=0;i<listeners.length;i+=1){if(listeners[i]===fn){listeners.splice(i,1);return}}};var taskComplete=function(){_each(listeners.slice(0),function(fn){fn()})};addListener(function(){if(_keys(results).length===keys.length){callback(null,results);callback=function(){}}});_each(keys,function(k){var task=tasks[k]instanceof Function?[tasks[k]]:tasks[k];var taskCallback=function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}if(err){var safeResults={};_each(_keys(results),function(rkey){safeResults[rkey]=results[rkey]});safeResults[k]=args;callback(err,safeResults);callback=function(){}}else{results[k]=args;async.nextTick(taskComplete)}};var requires=task.slice(0,Math.abs(task.length-1))||[];var ready=function(){return _reduce(requires,function(a,x){return a&&results.hasOwnProperty(x)},true)&&!results.hasOwnProperty(k)};if(ready()){task[task.length-1](taskCallback,results)}else{var listener=function(){if(ready()){removeListener(listener);task[task.length-1](taskCallback,results)}};addListener(listener)}})};async.waterfall=function(tasks,callback){callback=callback||function(){};if(!tasks.length){return callback()}var wrapIterator=function(iterator){return function(err){if(err){callback.apply(null,arguments);callback=function(){}}else{var args=Array.prototype.slice.call(arguments,1);var next=iterator.next();if(next){args.push(wrapIterator(next))}else{args.push(callback)}async.nextTick(function(){iterator.apply(null,args)})}}};wrapIterator(async.iterator(tasks))()};var _parallel=function(eachfn,tasks,callback){callback=callback||function(){};if(tasks.constructor===Array){eachfn.map(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}callback.call(null,err,args)})}},callback)}else{var results={};eachfn.each(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}results[k]=args;callback(err)})},function(err){callback(err,results)})}};async.parallel=function(tasks,callback){_parallel({map:async.map,each:async.each},tasks,callback)};async.parallelLimit=function(tasks,limit,callback){_parallel({map:_mapLimit(limit),each:_eachLimit(limit)},tasks,callback)};async.series=function(tasks,callback){callback=callback||function(){};if(tasks.constructor===Array){async.mapSeries(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}callback.call(null,err,args)})}},callback)}else{var results={};async.eachSeries(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}results[k]=args;callback(err)})},function(err){callback(err,results)})}};async.iterator=function(tasks){var makeCallback=function(index){var fn=function(){if(tasks.length){tasks[index].apply(null,arguments)}return fn.next()};fn.next=function(){return index<tasks.length-1?makeCallback(index+1):null};return fn};return makeCallback(0)};async.apply=function(fn){var args=Array.prototype.slice.call(arguments,1);return function(){return fn.apply(null,args.concat(Array.prototype.slice.call(arguments)))}};var _concat=function(eachfn,arr,fn,callback){var r=[];eachfn(arr,function(x,cb){fn(x,function(err,y){r=r.concat(y||[]);cb(err)})},function(err){callback(err,r)})};async.concat=doParallel(_concat);async.concatSeries=doSeries(_concat);async.whilst=function(test,iterator,callback){if(test()){var sync=true;iterator(function(err){if(err){return callback(err)}if(sync){async.nextTick(function(){async.whilst(test,iterator,callback)})}else{async.whilst(test,iterator,callback)}});sync=false}else{callback()}};async.doWhilst=function(iterator,test,callback){var sync=true;iterator(function(err){if(err){return callback(err)}if(test()){if(sync){async.nextTick(function(){async.doWhilst(iterator,test,callback)})}else{async.doWhilst(iterator,test,callback)}}else{callback()}});sync=false};async.until=function(test,iterator,callback){if(!test()){var sync=true;iterator(function(err){if(err){return callback(err)}if(sync){async.nextTick(function(){async.until(test,iterator,callback)})}else{async.until(test,iterator,callback)}});sync=false}else{callback()}};async.doUntil=function(iterator,test,callback){var sync=true;iterator(function(err){if(err){return callback(err)}if(!test()){if(sync){async.nextTick(function(){async.doUntil(iterator,test,callback)})}else{async.doUntil(iterator,test,callback)}}else{callback()}});sync=false};async.queue=function(worker,concurrency){if(concurrency===undefined){concurrency=1}function _insert(q,data,pos,callback){if(data.constructor!==Array){data=[data]}_each(data,function(task){var item={data:task,callback:typeof callback==="function"?callback:null};if(pos){q.tasks.unshift(item)}else{q.tasks.push(item)}if(q.saturated&&q.tasks.length===concurrency){q.saturated()}async.nextTick(q.process)})}var workers=0;var q={tasks:[],concurrency:concurrency,saturated:null,empty:null,drain:null,push:function(data,callback){_insert(q,data,false,callback)},unshift:function(data,callback){_insert(q,data,true,callback)},process:function(){if(workers<q.concurrency&&q.tasks.length){var task=q.tasks.shift();if(q.empty&&q.tasks.length===0){q.empty()}workers+=1;var sync=true;var next=function(){workers-=1;if(task.callback){task.callback.apply(task,arguments)}if(q.drain&&q.tasks.length+workers===0){q.drain()}q.process()};var cb=only_once(function(){var cbArgs=arguments;if(sync){async.nextTick(function(){next.apply(null,cbArgs)})}else{next.apply(null,arguments)}});worker(task.data,cb);sync=false}},length:function(){return q.tasks.length},running:function(){return workers}};return q};async.cargo=function(worker,payload){var working=false,tasks=[];var cargo={tasks:tasks,payload:payload,saturated:null,empty:null,drain:null,push:function(data,callback){if(data.constructor!==Array){data=[data]}_each(data,function(task){tasks.push({data:task,callback:typeof callback==="function"?callback:null});if(cargo.saturated&&tasks.length===payload){cargo.saturated()}});async.nextTick(cargo.process)},process:function process(){if(working)return;if(tasks.length===0){if(cargo.drain)cargo.drain();return}var ts=typeof payload==="number"?tasks.splice(0,payload):tasks.splice(0);var ds=_map(ts,function(task){return task.data});if(cargo.empty)cargo.empty();working=true;worker(ds,function(){working=false;var args=arguments;_each(ts,function(data){if(data.callback){data.callback.apply(null,args)}});process()})},length:function(){return tasks.length},running:function(){return working}};return cargo};var _console_fn=function(name){return function(fn){var args=Array.prototype.slice.call(arguments,1);fn.apply(null,args.concat([function(err){var args=Array.prototype.slice.call(arguments,1);if(typeof console!=="undefined"){if(err){if(console.error){console.error(err)}}else if(console[name]){_each(args,function(x){console[name](x)})}}}]))}};async.log=_console_fn("log");async.dir=_console_fn("dir");async.memoize=function(fn,hasher){var memo={};var queues={};hasher=hasher||function(x){return x};var memoized=function(){var args=Array.prototype.slice.call(arguments);var callback=args.pop();var key=hasher.apply(null,args);if(key in memo){callback.apply(null,memo[key])}else if(key in queues){queues[key].push(callback)}else{queues[key]=[callback];fn.apply(null,args.concat([function(){memo[key]=arguments;var q=queues[key];delete queues[key];for(var i=0,l=q.length;i<l;i++){q[i].apply(null,arguments)}}]))}};memoized.memo=memo;memoized.unmemoized=fn;return memoized};async.unmemoize=function(fn){return function(){return(fn.unmemoized||fn).apply(null,arguments)}};async.times=function(count,iterator,callback){var counter=[];
for(var i=0;i<count;i++){counter.push(i)}return async.map(counter,iterator,callback)};async.timesSeries=function(count,iterator,callback){var counter=[];for(var i=0;i<count;i++){counter.push(i)}return async.mapSeries(counter,iterator,callback)};async.compose=function(){var fns=Array.prototype.reverse.call(arguments);return function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();async.reduce(fns,args,function(newargs,fn,cb){fn.apply(that,newargs.concat([function(){var err=arguments[0];var nextargs=Array.prototype.slice.call(arguments,1);cb(err,nextargs)}]))},function(err,results){callback.apply(that,[err].concat(results))})}};async.applyEach=function(fns){var go=function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();return async.each(fns,function(fn,cb){fn.apply(that,args.concat([cb]))},callback)};if(arguments.length>1){var args=Array.prototype.slice.call(arguments,1);return go.apply(this,args)}else{return go}};if(typeof define!=="undefined"&&define.amd){define([],function(){return async})}else if(typeof module!=="undefined"&&module.exports){module.exports=async}else{root.async=async}})()}});var require=this.require;(function(){var IS;require("Object");require("async");IS={Variable:require("Variable"),Enum:require("Enum"),Promise:require("Promise"),ErrorReporter:require("ErrorReporter"),Object:require("Object"),Modules:{Overload:require("Modules/Overload"),Observer:require("Modules/Observer"),ORM:require("Modules/ORM"),Mediator:require("Modules/Mediator"),StateMachine:require("Modules/StateMachine")}};if(typeof window!=="undefined"&&window!==null){window.IS=IS}if(typeof module!=="undefined"&&module!==null){module.exports=IS}if(typeof root!=="undefined"&&root!==null){root.IS=IS}}).call(this)}).call({},typeof module=="undefined"?typeof window=="undefined"?root:window:module);
(function() {
  var Client, ClientErrorReporter, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Client = (function(_super) {
    __extends(Client, _super);

    function Client(server) {
      var script,
        _this = this;

      this.server = server != null ? server : window.location.origin;
      this.connect = __bind(this.connect, this);
      this.dataReceived = __bind(this.dataReceived, this);
      this.loadEvents = __bind(this.loadEvents, this);
      this.log = __bind(this.log, this);
      this.online = false;
      script = document.createElement("script");
      script.src = "socket.io/socket.io.js";
      window.Client = this;
      script.onload = function() {
        console.log("loaded socket.io");
        _this.socket = io.connect(_this.server);
        return _this.socket.on("auth", function(id) {
          var ev, handler, me, _ref;

          _this.id = id;
          _this.online = true;
          console.log("Connected! ID: " + _this.id);
          me = _this;
          _ref = _this._baseEvents;
          for (ev in _ref) {
            handler = _ref[ev];
            _this.socket.on(ev, function() {
              var args;

              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return handler.apply(me, args);
            });
          }
          _this.socket.on("data", _this.dataReceived);
          _this.loadEvents();
          if (_this.init != null) {
            return _this.init();
          }
        });
      };
      document.head.appendChild(script);
    }

    Client.prototype._baseEvents = {
      "error": function(e) {
        throw ClientErrorReporter.generate(e);
      },
      "connectedTo": function(id) {
        console.log("Connected to " + id);
        if (this.connected != null) {
          return this.connected(id);
        }
      }
    };

    Client.prototype.events = null;

    Client.prototype.log = function() {
      var args, _ref;

      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift("log");
      return (_ref = this.socket) != null ? _ref.emit.apply(this.socket, args) : void 0;
    };

    Client.prototype.loadEvents = function() {
      var event, handler, _fn, _ref,
        _this = this;

      _ref = this.events;
      _fn = function(event, handler) {
        return _this.subscribe(event, function() {
          var args, isntfromserver, test, _ref1;

          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          test = args.pop();
          isntfromserver = test !== "fromserver";
          if (isntfromserver) {
            args.push(test);
          }
          handler.apply(_this, args);
          if (isntfromserver) {
            args.unshift(event);
            args.unshift("data");
            return (_ref1 = _this.socket) != null ? _ref1.emit.apply(_this.socket, args) : void 0;
          }
        });
      };
      for (event in _ref) {
        handler = _ref[event];
        _fn(event, handler);
      }
      return this.events = null;
    };

    Client.prototype.dataReceived = function() {
      var data, event;

      event = arguments[0], data = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      data.unshift(event);
      return this.publish.apply(this, data);
    };

    Client.prototype.connect = function(id) {
      return this.socket.emit("connectTo", id);
    };

    Client.include(IS.Modules.Observer);

    return Client;

  })(IS.Object);

  ClientErrorReporter = (function(_super) {
    __extends(ClientErrorReporter, _super);

    function ClientErrorReporter() {
      _ref = ClientErrorReporter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ClientErrorReporter.errors = {
      "ConnectionError": ["The client requested does not exist"]
    };

    ClientErrorReporter.extend(IS.ErrorReporter);

    return ClientErrorReporter;

  })(IS.Object);

  window.BaseClient = Client;

}).call(this);

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
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  require("Object");

  Application = (function(_super) {
    __extends(Application, _super);

    function Application() {
      this.decideView = __bind(this.decideView, this);
      this.loadApplication = __bind(this.loadApplication, this);
      this.firstTimeInclude = __bind(this.firstTimeInclude, this);      this.baseSetup();
      this.firstTimeInclude();
      this.loadApplication();
    }

    Application.prototype.baseSetup = function() {
      window.echo = (require("Object")).echo;
      document.title = "Arrow Brainstorming";
      window.storage = {
        "setItem": function(key, value) {
          if ((typeof chrome !== "undefined" && chrome !== null) && (chrome.storage != null)) {
            return chrome.storage.sync.set({
              key: value
            });
          } else {
            return window.localStorage.setItem(key, value);
          }
        },
        "getItem": function(item, callback) {
          var res;

          if ((typeof chrome !== "undefined" && chrome !== null) && (chrome.storage != null)) {
            return chrome.storage.sync.get(item, callback);
          } else {
            res = {};
            res[item] = window.localStorage.getItem(item);
            return callback(res);
          }
        }
      };
      return (function() {
        var meta;

        meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1");
        document.head.appendChild(meta);
        meta = document.createElement("link");
        meta.setAttribute("rel", "apple-touch-icon");
        meta.setAttribute("href", "arrow_up_1.png");
        document.head.appendChild(meta);
        meta = document.createElement("meta");
        meta.setAttribute("name", "apple-mobile-web-app-capable");
        meta.setAttribute("content", "yes");
        return document.head.appendChild(meta);
      })();
    };

    Application.prototype.firstTimeInclude = function() {
      window.DepMan = new (require("helpers/DependenciesManager"));
      return window.Loading = new (DepMan.helper("Loading"))();
    };

    Application.prototype.loadApplication = function() {
      var LoadProgress;

      window.Toast = function() {
        var b, body, item, notif, title, _i, _j, _len, _len1;

        title = arguments[0], body = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (title == null) {
          title = "Message";
        }
        b = body.shift();
        if ((typeof webkitNotifications !== "undefined" && webkitNotifications !== null) && (chrome.storage != null)) {
          for (_i = 0, _len = body.length; _i < _len; _i++) {
            item = body[_i];
            b += "\n" + item;
          }
          notif = webkitNotifications.createNotification('/arrow_up_1.png', title, b);
          return notif.show();
        } else {
          b = "<p>" + b + "</p>";
          for (_j = 0, _len1 = body.length; _j < _len1; _j++) {
            item = body[_j];
            b += "<p>" + item + "</p>";
          }
          jQuery("#tip-message-head").html(title);
          jQuery("#tip-message-body").html(b);
          jQuery("#tip-message").modal("show");
          return setTimeout((function() {
            return jQuery("#tip-message").modal("hide");
          }), 1500);
        }
      };
      this.LoadProgress = LoadProgress = new IS.Promise();
      this.LoadProgress.then((function() {
        Loading.start();
        return LoadProgress.resolve(true);
      }), null, null).then(this.loadLibs, null, Loading.progress).then(this.bootStrapAngular, null, Loading.progress).then(this.loadLanguage, null, Loading.progress).then(this.resizeHook, null, Loading.progress).then(this.decideView, null, Loading.progress);
      return this.LoadProgress.resolve(true);
    };

    Application.prototype.decideView = function() {
      var _this = this;

      return storage.getItem("landing", function(set) {
        var landing;

        landing = set.landing;
        if ((typeof chrome !== "undefined" && chrome !== null) && (chrome.storage != null)) {
          landing = "false";
        }
        if (landing == null) {
          landing = true;
          storage.setItem("landing", false);
        }
        landing = landing.toString();
        _this.log(landing, set);
        _this.LoadProgress.progress(31);
        if (landing !== "false") {
          _this.LoadProgress.then(_this.renderLandingPage, null, Loading.progress).then(_this.hookLandingPageStuff, null, Loading.progress).then((function() {
            return Loading.end();
          }), null, null);
        } else {
          _this.LoadProgress.then(_this.dataTransferBootstrap, null, Loading.progress).then(_this.renderBaseline, null, Loading.progress).then(_this.dragAndDropHooks, null, Loading.progress).then(_this.mobileHooks, null, Loading.progress).then(_this.opmlBootstrap, null, Loading.progress).then(_this.extras, null, Loading.progress).then(_this.finish, null, null);
        }
        return _this.LoadProgress.resolve(true);
      });
    };

    Application.prototype.renderLandingPage = function() {
      var f,
        _this = this;

      f = jQuery("body > div")[0];
      this.progress(45);
      f.parentNode.removeChild(f);
      this.progress(50);
      jQuery("body").addClass("landing");
      document.body.innerHTML = DepMan.render("landing", {
        title: "Arrow",
        copyright: "&copy; Sabin Marcu 2013"
      });
      this.progress(60);
      return setTimeout(function() {
        _this.progress(65);
        return _this.resolve(true);
      }, 1000);
    };

    Application.prototype.hookLandingPageStuff = function() {
      return jQuery("#startapp").click(function() {
        return storage.setItem("landing", false);
      });
    };

    Application.prototype.loadLibs = function() {
      DepMan.lib("jquery");
      DepMan.lib("angular.min");
      DepMan.lib("bootstrap.min");
      DepMan.lib("QRCodeDraw");
      this.progress(3);
      DepMan.stylesheet("bootstrap");
      DepMan.stylesheet("bootstrap-responsive");
      DepMan.stylesheet("font-awesome");
      this.progress(5);
      DepMan.stylesheet("ElectrolizeFont");
      DepMan.stylesheet("OpenSansFont");
      this.progress(7);
      return this.resolve(true);
    };

    Application.prototype.bootStrapAngular = function() {
      window.Arrow = angular.module("Arrow", []);
      DepMan.angular("NGAsideController");
      document.childNodes[1].setAttribute("ng-csp", "");
      document.body.className += " {{theme.mime}}";
      document.body.setAttribute("ng-controller", "NGAsideController");
      this.progress(10);
      return this.resolve(true);
    };

    Application.prototype.loadLanguage = function() {
      DepMan.helper("LanguageHelper");
      this.progress(20);
      return this.resolve(true);
    };

    Application.prototype.resizeHook = function() {
      var _resize;

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
      this.progress(28);
      window.addEventListener("resize", _resize);
      this.progress(29);
      _resize();
      this.progress(30);
      return this.resolve(true);
    };

    Application.prototype.renderBaseline = function() {
      var f,
        _this = this;

      DepMan.angular("NGAsideController");
      f = jQuery("body > div")[0];
      this.progress(32);
      f.parentNode.removeChild(f);
      document.body.innerHTML = DepMan.render("index", {
        title: "Arrow",
        copyright: "&copy; Sabin Marcu 2013"
      });
      this.progress(35);
      document.body.appendChild(f);
      this.progress(38);
      return setTimeout(function() {
        _this.progress(40);
        return _this.resolve(true);
      }, 500);
    };

    Application.prototype.dragAndDropHooks = function() {
      this.progress(60);
      window.DnD = DepMan.controller("DragAndDrop");
      window.DnD.init();
      this.progress(62);
      window.Swype = new (DepMan.controller("Swype"))();
      return this.resolve(true);
    };

    Application.prototype.mobileHooks = function() {
      var el, els, _i, _len, _ref, _ref1;

      window.isMobile = true;
      if ((window.orientation != null) || (document.orientation != null)) {
        window.isMobile = true;
        if ((_ref = document.querySelector("html")) != null) {
          _ref.className += " mobile ";
        }
        if ((_ref1 = document.querySelector("aside")) != null) {
          _ref1.addEventListener("click", function(e) {
            return console.log("Aside Tagged");
          });
        }
        els = document.querySelectorAll("article > *");
        if (els != null) {
          for (_i = 0, _len = els.length; _i < _len; _i++) {
            el = els[_i];
            el.addEventListener("click", function(e) {
              return console.log("" + this.tagName + " Tagged");
            });
          }
        }
      }
      window.switchMode = function(mode) {
        var html;

        html = document.querySelector("html");
        if (html.className.indexOf(mode) >= 0) {
          return html.className = html.className.replace(new RegExp("\ ?" + mode), "");
        } else {
          return html.className += " " + mode;
        }
      };
      this.progress(65);
      return this.resolve(true);
    };

    Application.prototype.opmlBootstrap = function() {
      DepMan.helper("OPMLManager");
      this.progress(85);
      return this.resolve(true);
    };

    Application.prototype.dataTransferBootstrap = function() {
      DepMan.helper("DataTransfer");
      return this.resolve(true);
    };

    Application.prototype.extras = function() {
      var d;

      if ((typeof chrome !== "undefined" && chrome !== null) && (chrome.app != null) && (chrome.storage != null)) {
        console.log("Should install chromeframecontroller");
        DepMan.angular("ChromeFrameController");
        d = document.createElement("div");
        d.innerHTML = DepMan.render("chromehandler");
        document.body.appendChild(d);
        this.progress(90);
      }
      return this.resolve(true);
    };

    Application.prototype.finish = function() {
      this.progress(95);
      angular.bootstrap(document, ["Arrow"]);
      this.progress(100);
      return Loading.end();
    };

    return Application;

  })(BaseObject);

  module.exports = Application;

}).call(this);
}, "Object": function(exports, require, module) {(function() {
  var BObject, _baseObj, _ref,
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
      console.log(args);
      return this;
    },
    log: function() {
      var args;

      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift("");
      return this.echo.apply(this, args);
    }
  };

  BObject = (function(_super) {
    __extends(BObject, _super);

    function BObject() {
      _ref = BObject.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BObject.extend(_baseObj);

    BObject.include(_baseObj);

    return BObject;

  })(IS.Object);

  module.exports = window.BaseObject = BObject;

}).call(this);
}, "angular/ChromeFrameController": function(exports, require, module) {(function() {
  angular.module("Arrow").controller("ChromeFrameController", function($scope) {
    var movedata, panel, win;

    win = chrome.app.window.current();
    $scope.minimise = function() {
      if (win.isMinimized()) {
        return win.restore();
      } else {
        return win.minimize();
      }
    };
    $scope.maximise = function() {
      if (win.isMaximized()) {
        return win.restore();
      } else {
        return win.maximize();
      }
    };
    $scope.close = function() {
      return win.close();
    };
    panel = jQuery("#chromepanel")[0];
    movedata = null;
    panel.addEventListener("mousedown", function(e) {
      var bounds;

      bounds = win.getBounds();
      return movedata = {
        x: e.screenX - bounds.left,
        y: e.screenY - bounds.top
      };
    });
    window.addEventListener("mousemove", function(e) {
      if (movedata != null) {
        return win.moveTo(e.screenX - movedata.x, e.screenY - movedata.y);
      }
    });
    return window.addEventListener("mouseup", function(e) {
      return movedata = null;
    });
  });

}).call(this);
}, "angular/NGAsideController": function(exports, require, module) {(function() {
  angular.module("Arrow").controller("NGAsideController", function($scope, $rootScope) {
    var TABS,
      _this = this;

    TABS = new IS.Enum(["LIST", "SERVER", "GENERAL"]);
    $scope.safeApply = function(fn) {
      var phase;

      phase = $scope.$parent.$$phase;
      console.log(phase);
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof fn === 'function')) {
          return fn();
        }
      } else {
        return $scope.$apply(fn);
      }
    };
    storage.getItem("lang", function(sets) {
      var item, _i, _len, _ref, _results;

      $scope.language = sets.language || "en_US";
      $scope.languages = [
        {
          lang: "US English",
          mime: "en-US"
        }, {
          lang: "Romanian",
          mime: "ro-RO"
        }
      ];
      _ref = $scope.languages;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if ($scope.language === item.mime) {
          _results.push($scope.language = item);
        }
      }
      return _results;
    });
    storage.getItem("theme", function(sets) {
      var item, _i, _len, _ref, _results;

      $scope.theme = sets.theme || "bluetheme";
      $scope.themes = [
        {
          name: "Blu Theme",
          mime: "bluetheme"
        }, {
          name: "Red Theme",
          mime: "redtheme"
        }
      ];
      _ref = $scope.themes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if ($scope.theme === item.mime) {
          _results.push($scope.theme = item);
        }
      }
      return _results;
    });
    $scope.changedLanguage = function() {
      var _this = this;

      Loading.start();
      Loading.progress("Switching language");
      return setTimeout(function() {
        LanguageHelper.switchLanguage($scope.language.mime);
        Loading.progress("Done");
        return Loading.end();
      }, 1000);
    };
    $scope.changedTheme = function() {
      return storage.setItem("theme", $scope.theme.mime);
    };
    storage.getItem("sidebarstatus", function(sets) {
      return $scope.sidebarstatus = sets.sidebarstatus || "closed";
    });
    $scope.togglesidebar = function() {
      if ($scope.sidebarstatus === "closed") {
        $scope.sidebarstatus = 'open';
      } else {
        $scope.sidebarstatus = 'closed';
      }
      return storage.setItem("sidebarstatus", $scope.sidebarstatus);
    };
    storage.getItem("lastpanel", function(sets) {
      var animationVariants;

      $scope.asidetab = function(whom, step) {
        if (whom == null) {
          whom = null;
        }
        if (step == null) {
          step = 1;
        }
        if (whom == null) {
          whom = $scope.activeTab + step;
          if (whom > 2) {
            whom = 2;
          }
          if (whom < 0) {
            whom = 0;
          }
        } else {
          whom = TABS[whom];
        }
        $scope.activeTab = whom;
        return storage.setItem("lastpanel", whom);
      };
      animationVariants = ["topVariant", "bottomVariant"];
      $scope.getAnim = function() {
        return animationVariants[Math.floor(Math.random() * animationVariants.length)];
      };
      $scope.tabIsActive = function(whom) {
        return TABS[whom].toString() === $scope.activeTab.toString();
      };
      $scope.activeTab = sets.lastpanel || TABS.LIST;
      console.log($scope.tabIsActive("LIST"));
      console.log($scope.tabIsActive("SERVER"));
      return console.log($scope.tabIsActive("GENERAL"));
    });
    return storage.getItem("landing", function(sets) {
      $scope.landingpageactive = sets.landing;
      return $scope.activateLanding = function() {
        !$scope.landingpageactive;
        return storage.setItem("landing", $scope.landingpageactive);
      };
    });
  });

}).call(this);
}, "angular/OPMLController": function(exports, require, module) {(function() {
  angular.module("Arrow").controller("OPMLController", function($scope, $rootScope, OPML) {
    $scope.safeApply = function(fn) {
      var phase;

      phase = $scope.$parent.$$phase;
      console.log(phase);
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof fn === 'function')) {
          return fn();
        }
      } else {
        return $scope.$apply(fn);
      }
    };
    return OPML.activateControllerFunctions.push(function(obj) {
      var hooked, views;

      obj.refreshView = $scope.safeApply;
      $scope.object = obj;
      $scope.view = "outline";
      $scope.view = "mindmap";
      $scope.object.controller.frameBuffer.start();
      $scope.isMobile = window.isMobile;
      $scope.type = function(item) {
        if (item.children !== null) {
          return "noborder";
        } else {
          return "";
        }
      };
      $scope.hidden = function(item) {
        if (item.children !== null) {
          return "";
        } else {
          return "hidden";
        }
      };
      $scope.folded = function(item) {
        if (item.children == null) {
          return "icon-hidden";
        } else {
          return "icon-custom";
        }
      };
      $scope.hasKids = function(item) {
        return item.children !== null;
      };
      $scope.toggleFold = function(item) {
        return item.fold = !item.fold;
      };
      $scope.toggleCheck = function(item) {
        var _ref;

        if ((_ref = item.status) === "checked" || _ref === "unchecked") {
          if (item.status === "checked") {
            item.status = "unchecked";
          } else {
            item.status = "checked";
          }
          return obj.modify(JSON.stringify(item.getPath()), {
            status: item.status
          });
        }
      };
      $scope.addChild = function(item) {
        return obj.addChild(JSON.stringify(item.getPath()));
      };
      $scope.status = function(item) {
        return item.getStatus();
      };
      $scope.remove = function(item) {
        return obj.removeChild(JSON.stringify(item.getPath()));
      };
      $scope.updateNetwork = function(item, path) {
        return obj.modify(JSON.stringify(item.getPath()), {
          text: item._text
        });
      };
      hooked = false;
      $scope.edit = function(item) {
        var modal, sts;

        if ((typeof modal === "undefined" || modal === null) || (modal[0] != null)) {
          modal = jQuery(".editnode#" + ($scope.getTitle()));
        }
        modal.find("#text").val(item.text);
        modal.find(".status").show();
        sts = modal.find("#status");
        if (item.status === "checked") {
          sts.prop("checked", true);
        } else if (item.status === "unchecked") {
          sts.prop("checked", false);
        } else {
          modal.find(".status").hide();
        }
        modal.find("#notes").val(item.note || "");
        console.log(modal);
        modal.modal("show");
        $scope.path = item.getPath();
        $(document.body).append(modal);
        if (!hooked) {
          hooked = true;
          sts.on("change", function() {
            return $(this).prop("checked", this.checked);
          });
          return modal.on("hide", function() {
            var status;

            status = modal.find("#status").prop("checked");
            console.log(status);
            if (status) {
              status = "checked";
            } else {
              status = "unchecked";
            }
            obj.modify(JSON.stringify($scope.path), {
              "text": modal.find("#text").val(),
              "status": status,
              "note": modal.find("#notes").val()
            });
            jQuery(".modal-container#" + ($scope.getTitle())).append(modal);
            return $scope.safeApply();
          });
        }
      };
      obj.editNodeModal = $scope.edit;
      views = ["mindmap", "outline"];
      $scope.changeView = function(to) {
        if (to == null) {
          to = null;
        }
        if (to == null) {
          if ($scope.view === views[0]) {
            to = views[1];
          } else {
            to = views[0];
          }
        }
        $scope.view = to;
        if (to === "mindmap") {
          $scope.object.controller.frameBuffer.start();
        }
        return $scope.safeApply();
      };
      $scope.getTitle = function() {
        return obj.title.replace(/\ /g, "_");
      };
      jQuery(window).keydown(function(e) {
        if (e.ctrlKey || e.metaKey) {
          switch (String.fromCharCode(e.which).toLowerCase()) {
            case 's':
              OPML.activeOPML.save();
              return e.preventDefault();
          }
        }
      });
      return $scope.safeApply();
    });
  });

}).call(this);
}, "angular/OPMLManager": function(exports, require, module) {(function() {
  angular.module("Arrow").controller("OPMLManager", function($scope, $rootScope, OPML) {
    $scope.safeApply = function(fn) {
      var phase;

      phase = $scope.$parent.$$phase;
      console.log(phase);
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof fn === 'function')) {
          return fn();
        }
      } else {
        return $scope.$apply(fn);
      }
    };
    OPML.refreshView = function() {
      return $scope.safeApply();
    };
    $scope.opmls = OPML.OPMLs;
    $scope.isactive = function(el) {
      if (el === OPML.activeOPML) {
        return "circle";
      } else {
        return "circle-blank";
      }
    };
    $scope.activate = function(el, override) {
      if (override == null) {
        override = false;
      }
      OPML.openOPML(el, override);
      storage.setItem("lastOPML", OPML.OPMLs.indexOf(OPML.activeOPML));
      return jQuery("article header h1").html((el != null ? el.title : void 0) || "Arrow");
    };
    $scope["new"] = function() {
      return OPML["new"]();
    };
    $scope.edit = function(item) {
      item.pastTitle = item.title;
      return $("#opml-" + item.index).blur((function(item) {
        return function(e) {
          return item.save();
        };
      })(item));
    };
    $scope.save = function() {
      return OPML.activeOPML.save();
    };
    $scope.download = function() {
      return OPML.activeOPML.download();
    };
    $scope["delete"] = function() {
      OPML["delete"](OPML.activeOPML);
      return $scope.activate(OPML.OPMLs[0]);
    };
    jQuery("#saveButton").click($scope.save);
    jQuery("#downloadButton").click($scope.download);
    return storage.getItem("lastOPML", function(sets) {
      if (OPML.OPMLs.length > 0) {
        return $scope.activate(OPML.OPMLs[sets.lastOPML || 0], true);
      }
    });
  });

  console.log("OPMLManager should be available now");

}).call(this);
}, "classes/AuxFrameBuffer": function(exports, require, module) {(function() {
  var AuxFrameBuffer, COLORS, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  COLORS = new IS.Enum(["R", "G", "B"]);

  AuxFrameBuffer = (function(_super) {
    __extends(AuxFrameBuffer, _super);

    function AuxFrameBuffer() {
      this.getLink = __bind(this.getLink, this);
      this.scan = __bind(this.scan, this);
      this.upColor = __bind(this.upColor, this);
      this.drawButtons = __bind(this.drawButtons, this);
      this.sequence = __bind(this.sequence, this);      _ref = AuxFrameBuffer.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AuxFrameBuffer.prototype.sequence = function() {
      this.linkBack = {};
      this.lastColor = [0, 0, 1];
      this.context.clearRect(0, 0, this.buffer.width, this.buffer.height);
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.buffer.width, this.buffer.height);
      return this.drawGugus(this.model.structure);
    };

    AuxFrameBuffer.prototype.drawGugu = function(item) {
      var code, delta, path, _ref1;

      delta = 0;
      if ((_ref1 = this.parent.triggers) != null ? _ref1.level : void 0) {
        delta = this.parent.level - this.currentItem.length + 1;
      }
      path = item.getPath();
      code = "" + this.lastColor[COLORS.R] + ", " + this.lastColor[COLORS.G] + ", " + this.lastColor[COLORS.B];
      this.linkBack[code] = path;
      this.context.fillStyle = "rgb(" + code + ")";
      this.upColor();
      this.context.fillRectR(this.getX(item), this.getY(item), this.getWidth(delta), this.getHeight(delta));
      if (this.verify()) {
        return this.drawButtons(item);
      }
    };

    AuxFrameBuffer.prototype.drawButtons = function(item) {
      var code1, code2;

      this.context.fillStyle = "white";
      code1 = "" + this.lastColor[COLORS.R] + ", " + this.lastColor[COLORS.G] + ", " + this.lastColor[COLORS.B];
      this.context.fillStyle = "rgba(" + code1 + ")";
      this.context.fillRectR((this.getX(item)) + 270, (this.getY(item)) + 3, 20, 20);
      this.upColor();
      code2 = "" + this.lastColor[COLORS.R] + ", " + this.lastColor[COLORS.G] + ", " + this.lastColor[COLORS.B];
      this.context.fillStyle = "rgba(" + code2 + ")";
      this.context.fillRectR((this.getX(item)) + 270, (this.getY(item)) + 28, 20, 20);
      this.upColor();
      this.linkBack[code1] = "{{PLUS}}";
      return this.linkBack[code2] = "{{MINUS}}";
    };

    AuxFrameBuffer.prototype.upColor = function() {
      this.lastColor[COLORS.B] += 1;
      if (this.lastColor[COLORS.B] > 255) {
        this.lastColor[COLORS.B] = 0;
        this.lastColor[COLORS.G] += 1;
      }
      if (this.lastColor[COLORS.G] > 255) {
        this.lastColor[COLORS.G] = 0;
        return this.lastColor[COLORS.R] += 1;
      }
    };

    AuxFrameBuffer.prototype.scan = function(pos) {
      var img;

      img = (this.context.getImageData(pos.x, pos.y, 1, 1)).data;
      return this.getLink("" + img[0] + ", " + img[1] + ", " + img[2], this.linkBack);
    };

    AuxFrameBuffer.prototype.getLink = function(which) {
      return this.linkBack[which] || null;
    };

    return AuxFrameBuffer;

  })(DepMan.classes("GuguFrameBuffer"));

  module.exports = AuxFrameBuffer;

}).call(this);
}, "classes/FrameBuffer": function(exports, require, module) {(function() {
  var FrameBuffer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  Object.getPrototypeOf(document.createElement("canvas").getContext("2d")).fillRectR = function(x, y, w, h, r) {
    if (typeof r === "undefined") {
      r = 5;
    }
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    return this.fill();
  };

  Object.getPrototypeOf(document.createElement("canvas").getContext("2d")).strokeRectR = function(x, y, w, h, r) {
    if (typeof r === "undefined") {
      r = 5;
    }
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    return this.stroke();
  };

  FrameBuffer = (function(_super) {
    __extends(FrameBuffer, _super);

    function FrameBuffer(buffer) {
      var _ref;

      this.buffer = buffer;
      this.alphaDelta = __bind(this.alphaDelta, this);
      this.getTextDelta = __bind(this.getTextDelta, this);
      this.getHeight = __bind(this.getHeight, this);
      this.getWidth = __bind(this.getWidth, this);
      this.makeValue = __bind(this.makeValue, this);
      this.getY = __bind(this.getY, this);
      this.getX = __bind(this.getX, this);
      this.sequence = __bind(this.sequence, this);
      this.tick = __bind(this.tick, this);
      this.end = __bind(this.end, this);
      this.start = __bind(this.start, this);
      this._sizeModif = __bind(this._sizeModif, this);
      this._hookSizeModif = __bind(this._hookSizeModif, this);
      if ((_ref = this.buffer) == null) {
        this.buffer = document.createElement("canvas");
      }
      this.context = this.buffer.getContext("2d");
      this.context.translate(0.5, 0.5);
      this._hookSizeModif();
      this.echo("FrameBuffer Ready");
    }

    FrameBuffer.prototype._hookSizeModif = function() {
      window.addEventListener("resize", this._sizeModif);
      return this._sizeModif();
    };

    FrameBuffer.prototype._sizeModif = function() {
      this.buffer.width = window.innerWidth;
      this.buffer.height = window.innerHeight;
      return this.sequence();
    };

    FrameBuffer.prototype.start = function() {
      if (typeof this._start === "function") {
        this._start();
      }
      this.running = true;
      return this.tick();
    };

    FrameBuffer.prototype.end = function() {
      return this.running = false;
    };

    FrameBuffer.prototype.tick = function() {
      this.sequence();
      if (this.running) {
        return requestAnimFrame(this.tick);
      } else {
        return typeof this._end === "function" ? this._end() : void 0;
      }
    };

    FrameBuffer.prototype.sequence = function() {
      return console.log("Tick width: " + this.buffer.width + ", height: " + this.buffer.height);
    };

    FrameBuffer.prototype.getX = function(from) {
      var _ref;

      return (from.x || 0) + (((_ref = this.parent.offsets) != null ? _ref.x : void 0) || 0);
    };

    FrameBuffer.prototype.getY = function(from) {
      var _ref;

      return (from.y || 0) + (((_ref = this.parent.offsets) != null ? _ref.y : void 0) || 0);
    };

    FrameBuffer.prototype.makeValue = function(value, delta) {
      return value + delta * value / 4;
    };

    FrameBuffer.prototype.getWidth = function(delta) {
      var _ref;

      return this.makeValue(((_ref = this.parent.sizes) != null ? _ref.x : void 0) || 300, delta);
    };

    FrameBuffer.prototype.getHeight = function(delta) {
      var _ref;

      return this.makeValue(((_ref = this.parent.sizes) != null ? _ref.y : void 0) || 300, delta);
    };

    FrameBuffer.prototype.getTextDelta = function(delta) {
      return this.makeValue(30, delta);
    };

    FrameBuffer.prototype.alphaDelta = function(delta) {
      return (1 + delta / 4) || 0.2;
    };

    return FrameBuffer;

  })(BaseObject);

  module.exports = FrameBuffer;

}).call(this);
}, "classes/GuguFrameBuffer": function(exports, require, module) {(function() {
  var GuguFrameBuffer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  GuguFrameBuffer = (function(_super) {
    __extends(GuguFrameBuffer, _super);

    function GuguFrameBuffer(model, parent) {
      this.model = model;
      this.parent = parent;
      this.verify = __bind(this.verify, this);
      this.drawButtons = __bind(this.drawButtons, this);
      this.drawGugu = __bind(this.drawGugu, this);
      this.drawGugus = __bind(this.drawGugus, this);
      this.sequence = __bind(this.sequence, this);
      this.currentItem = [];
      GuguFrameBuffer.__super__.constructor.call(this);
      this.context.textBaseline = "middle";
    }

    GuguFrameBuffer.prototype.sequence = function() {
      this.buffer.width = this.buffer.width;
      return this.drawGugus(this.model.structure);
    };

    GuguFrameBuffer.prototype.drawGugus = function(set) {
      var item, _i, _len, _ref, _results;

      _ref = set.topics;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.currentItem.push(item.text);
        if (item.children) {
          this.drawGugus(item.children);
        }
        this.drawGugu(item);
        _results.push(this.currentItem.pop());
      }
      return _results;
    };

    GuguFrameBuffer.prototype.drawGugu = function(item) {
      var absDelta, delta, texStrokeColor, texcolor, text, _ref;

      delta = 0;
      if ((_ref = this.parent.triggers) != null ? _ref.level : void 0) {
        delta = this.parent.level - this.currentItem.length + 1;
      }
      absDelta = -(Math.sqrt(delta * delta));
      switch (item.status) {
        case "checked":
          this.context.fillStyle = "rgba(0, 135, 255, " + (this.alphaDelta(absDelta)) + ")";
          texcolor = "rgba(256, 256, 256, " + (this.alphaDelta(absDelta)) + ")";
          texStrokeColor = "rgba(0, 0, 0, 0)";
          break;
        case "unchecked":
          this.context.fillStyle = "rgba(255, 67, 16, " + (this.alphaDelta(absDelta)) + ")";
          texcolor = "rgba(0, 0, 0, " + (this.alphaDelta(absDelta)) + ")";
          texStrokeColor = "rgba(0, 0 , 0, 0)";
          break;
        case "determinate":
          this.context.fillStyle = "rgba(256, 256, 256, " + (this.alphaDelta(absDelta)) + ")";
          texcolor = "rgba(0, 0, 0, " + (this.alphaDelta(absDelta)) + ")";
          texStrokeColor = "rgba(256, 256, 256, " + (this.alphaDelta(absDelta)) + ")";
          break;
        default:
          this.context.fillStyle = "rgba(0, 0, 0, " + (this.alphaDelta(absDelta)) + ")";
          texcolor = "rgba(256, 256, 256, " + (this.alphaDelta(absDelta)) + ")";
          texStrokeColor = "rgba(0, 0, 0, " + (this.alphaDelta(absDelta)) + ")";
      }
      this.context.lineWidth = 1;
      this.context.strokeStyle = "rgba(0, 0, 0, " + (this.alphaDelta(absDelta)) + ")";
      this.context.fillRectR(this.getX(item), this.getY(item), this.getWidth(delta), this.getHeight(delta));
      this.context.strokeRectR(this.getX(item), this.getY(item), this.getWidth(delta), this.getHeight(delta));
      text = item.text;
      if (text.length > 40) {
        text = text.substr(0, 37) + "...";
      }
      this.context.strokeStyle = texStrokeColor;
      this.context.font = "normal " + (12 + 12 * delta / 4) + "pt Verdana";
      this.context.fillStyle = texcolor;
      this.context.strokeText(text, (this.getX(item)) + 25, (this.getY(item)) + this.getTextDelta(delta));
      return this.context.fillText(text, (this.getX(item)) + 25, (this.getY(item)) + this.getTextDelta(delta));
    };

    GuguFrameBuffer.prototype.drawButtons = function(item, delta) {
      this.context.fillStyle = "white";
      this.context.strokeStyle = "#444";
      this.context.fillRectR((this.getX(item)) + (this.getWidth(delta)) - 30, (this.getY(item)) + 3, 20, 20);
      this.context.fillRectR((this.getX(item)) + (this.getWidth(delta)) - 30, (this.getY(item)) + 28, 20, 20);
      this.context.beginPath();
      this.context.strokeRectR((this.getX(item)) + (this.getWidth(delta)) - 30, (this.getY(item)) + 3, 20, 20);
      this.context.strokeRectR((this.getX(item)) + (this.getWidth(delta)) - 30, (this.getY(item)) + 28, 20, 20);
      this.context.moveTo((this.getX(item)) + (this.getWidth(delta)) - 25, (this.getY(item)) + 13);
      this.context.lineTo((this.getX(item)) + (this.getWidth(delta)) - 15, (this.getY(item)) + 13);
      this.context.moveTo((this.getX(item)) + (this.getWidth(delta)) - 20, (this.getY(item)) + 8);
      this.context.lineTo((this.getX(item)) + (this.getWidth(delta)) - 20, (this.getY(item)) + 18);
      this.context.moveTo((this.getX(item)) + (this.getWidth(delta)) - 25, (this.getY(item)) + 38);
      this.context.lineTo((this.getX(item)) + (this.getWidth(delta)) - 15, (this.getY(item)) + 38);
      return this.context.stroke();
    };

    GuguFrameBuffer.prototype.verify = function() {
      var item, key, _i, _len, _ref;

      if ((this.parent == null) || (this.parent.buttons == null)) {
        return false;
      }
      if (this.parent.buttons.length !== this.currentItem.length) {
        return false;
      }
      _ref = this.currentItem;
      for (key = _i = 0, _len = _ref.length; _i < _len; key = ++_i) {
        item = _ref[key];
        if (this.parent.buttons[key] !== item) {
          return false;
        }
      }
      return true;
    };

    return GuguFrameBuffer;

  })(DepMan.classes("FrameBuffer"));

  module.exports = GuguFrameBuffer;

}).call(this);
}, "classes/LinesFrameBuffer": function(exports, require, module) {(function() {
  var LinesFrameBuffer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  LinesFrameBuffer = (function(_super) {
    __extends(LinesFrameBuffer, _super);

    function LinesFrameBuffer(model, parent) {
      this.model = model;
      this.parent = parent;
      this.lineAlphaDelta = __bind(this.lineAlphaDelta, this);
      this.drawLine = __bind(this.drawLine, this);
      this.drawLines = __bind(this.drawLines, this);
      this.sequence = __bind(this.sequence, this);
      this.currentItem = [];
      LinesFrameBuffer.__super__.constructor.call(this);
    }

    LinesFrameBuffer.prototype.sequence = function() {
      this.context.clearRect(0, 0, this.buffer.width, this.buffer.height);
      return this.drawLines(this.model.structure);
    };

    LinesFrameBuffer.prototype.drawLines = function(set) {
      var absDelta, delta, item, kid, _i, _j, _len, _len1, _ref, _ref1, _ref2, _results;

      _ref = set.topics;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.currentItem.push(item.text);
        delta = 0;
        if ((_ref1 = this.parent.triggers) != null ? _ref1.level : void 0) {
          delta = this.parent.level - this.currentItem.length + 1;
        }
        absDelta = -(Math.sqrt(delta * delta));
        if (item.children) {
          this.drawLines(item.children);
          _ref2 = item.children.topics;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            kid = _ref2[_j];
            this.drawLine(item, kid, delta);
          }
        }
        _results.push(this.currentItem.pop());
      }
      return _results;
    };

    LinesFrameBuffer.prototype.drawLine = function(from, to, delta) {
      this.context.beginPath();
      this.context.strokeStyle = "rgba(0, 0, 0, " + (this.lineAlphaDelta(delta)) + ")";
      this.context.moveTo((this.getX(from)) + (this.makeValue(150, delta)), (this.getY(from)) + (this.makeValue(25, delta)));
      this.context.lineTo((this.getX(to)) + (this.makeValue(150, delta - 1)), (this.getY(to)) + (this.makeValue(25, delta - 1)));
      return this.context.stroke();
    };

    LinesFrameBuffer.prototype.lineAlphaDelta = function(delta) {
      return 0.2 + 0.2 * (-Math.sqrt(delta * delta)) / 4;
    };

    return LinesFrameBuffer;

  })(DepMan.classes("FrameBuffer"));

  module.exports = LinesFrameBuffer;

}).call(this);
}, "classes/MainFrameBuffer": function(exports, require, module) {(function() {
  var MainFrameBuffer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MainFrameBuffer = (function(_super) {
    __extends(MainFrameBuffer, _super);

    function MainFrameBuffer(buffer, model) {
      this.model = model;
      this._end = __bind(this._end, this);
      this._start = __bind(this._start, this);
      this.drawShortcuts = __bind(this.drawShortcuts, this);
      this.drawLegend = __bind(this.drawLegend, this);
      this.drawLevel = __bind(this.drawLevel, this);
      this.offsets = {
        x: 0,
        y: 0
      };
      this.triggers = {
        legend: true,
        level: true,
        levelno: true,
        shortcuts: true
      };
      this.sizes = {
        x: 300,
        y: 50
      };
      this.level = 0;
      this.buttons = null;
      this.renderers = [new (DepMan.classes("GuguFrameBuffer"))(this.model, this), new (DepMan.classes("AuxFrameBuffer"))(this.model, this), new (DepMan.classes("LinesFrameBuffer"))(this.model, this)];
      this.Gugu = this.renderers[0];
      this.Line = this.renderers[2];
      this.Aux = this.renderers[1];
      MainFrameBuffer.__super__.constructor.call(this, buffer);
      this.context.textBaseline = "middle";
      this.context.font = "normal 12pt 'Open Sans'";
      this.Controller = new (DepMan.controller("Canvas"))(this);
    }

    MainFrameBuffer.prototype.sequence = function() {
      this.buffer.width = this.buffer.width;
      if (this.triggers.legend) {
        this.drawLegend();
      }
      if (this.triggers.shortcuts) {
        this.drawShortcuts();
      }
      if (this.triggers.level && this.triggers.levelno) {
        this.drawLevel();
      }
      this.context.drawImage(this.Line.context.canvas, 0, 0);
      return this.context.drawImage(this.Gugu.context.canvas, 0, 0);
    };

    MainFrameBuffer.prototype.drawLevel = function() {
      this.context.fillStyle = "rgba(0, 0, 0, 0.4)";
      this.context.textAlign = "center";
      this.context.font = "normal 24pt Verdana";
      this.context.textBaseline = "top";
      this.context.fillText(this.level, this.buffer.width / 2, 15);
      this.context.font = "normal 12pt 'Open Sans'";
      this.context.textBaseline = "middle";
      return this.context.textAlign = "left";
    };

    MainFrameBuffer.prototype.drawLegend = function() {
      this.context.strokeStyle = "rgba(0, 0, 0, 0.1)";
      this.context.fillStyle = "rgba(0, 135, 255, 0.4)";
      this.context.fillRectR(10, this.buffer.height - 25, 15, 15);
      this.context.strokeRectR(10, this.buffer.height - 25, 15, 15);
      this.context.fillStyle = "rgba(255, 67, 16, 0.4)";
      this.context.fillRectR(10, this.buffer.height - 45, 15, 15);
      this.context.strokeRectR(10, this.buffer.height - 45, 15, 15);
      this.context.fillStyle = "rgba(256, 256, 256, 0.4)";
      this.context.fillRectR(10, this.buffer.height - 85, 15, 15);
      this.context.strokeRectR(10, this.buffer.height - 85, 15, 15);
      this.context.fillStyle = "rgba(0, 0, 0, 0.4)";
      this.context.fillRectR(10, this.buffer.height - 65, 15, 15);
      this.context.strokeRectR(10, this.buffer.height - 65, 15, 15);
      this.context.fillText("Checked", 30, this.buffer.height - 15);
      this.context.fillText("Unchecked", 30, this.buffer.height - 35);
      this.context.fillText("Undeterminate", 30, this.buffer.height - 55);
      return this.context.fillText("Determinate", 30, this.buffer.height - 75);
    };

    MainFrameBuffer.prototype.drawShortcuts = function() {
      this.context.fillStyle = "rgba(0, 0, 0, 0.4)";
      this.context.fillText("Toggle Legend", 15, 25);
      this.context.fillText("Toggle Pseudo 3D Display", 15, 45);
      this.context.fillText("Toggle Pseudo 3D Level Display", 15, 65);
      this.context.fillText("Toggle Shortcuts", 15, 85);
      this.context.fillStyle = "rgba(255, 67, 16, 0.4)";
      this.context.fillText("L", 5, 25);
      this.context.fillText("D", 5, 45);
      this.context.fillText("G", 5, 65);
      return this.context.fillText("S", 5, 85);
    };

    MainFrameBuffer.prototype._start = function() {
      var renderer, _i, _len, _ref, _results,
        _this = this;

      storage.getItem("canvasTriggers", function(sets) {
        if (sets.canvasTriggers == null) {
          return storage.setItem("canvasTriggers", JSON.stringify(_this.triggers));
        } else {
          return _this.triggers = JSON.parse(sets.canvasTriggers);
        }
      });
      this.Controller.start();
      _ref = this.renderers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        renderer = _ref[_i];
        _results.push(renderer.start());
      }
      return _results;
    };

    MainFrameBuffer.prototype._end = function() {
      var renderer, _i, _len, _ref, _results;

      this.Controller.end();
      _ref = this.renderers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        renderer = _ref[_i];
        _results.push(renderer.end());
      }
      return _results;
    };

    return MainFrameBuffer;

  })(DepMan.classes("FrameBuffer"));

  module.exports = MainFrameBuffer;

}).call(this);
}, "controllers/Canvas": function(exports, require, module) {(function() {
  var CanvasController,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CanvasController = (function(_super) {
    __extends(CanvasController, _super);

    function CanvasController(parent) {
      this.parent = parent;
      this.end = __bind(this.end, this);
      this.start = __bind(this.start, this);
      this.mouseWheelHandler = __bind(this.mouseWheelHandler, this);
      this.keyHandler = __bind(this.keyHandler, this);
      this.getPos = __bind(this.getPos, this);
      this.up = __bind(this.up, this);
      this.move = __bind(this.move, this);
      this.down = __bind(this.down, this);
      this.events = {
        "mousedown": this.down,
        "mouseup": this.up,
        "mousemove": this.move,
        "touchstart": this.down,
        "touchend": this.up,
        "touchmove": this.move
      };
      this.echo("Controller for " + this.parent.model.title + " enabled!");
    }

    CanvasController.prototype.down = function(e) {
      var item, node, _i, _len, _ref,
        _this = this;

      this.init = this.getPos(e);
      this.parent.Aux.sequence();
      this.node = this.parent.Aux.scan(this.init);
      if (!this.node) {
        this.initOffset = {
          x: this.parent.offsets.x,
          y: this.parent.offsets.y
        };
      } else {
        node = [];
        _ref = this.node;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          node.push(item);
        }
        node = this.parent.model.findNode(node);
        this.initOffset = {
          x: node.x,
          y: node.y
        };
        this.isMovement = false;
        this.timer = setTimeout(function() {
          if (!_this.isMovement) {
            _this.parent.model.editNodeModal(node);
          }
          return clearTimeout(_this.timer);
        }, 200);
      }
      return e.preventDefault();
    };

    CanvasController.prototype.move = function(e) {
      var node, pos;

      pos = this.getPos(e);
      if (this.init == null) {
        node = this.parent.Aux.scan(pos);
        if (node) {
          if (node === "{{PLUS}}" || node === "{{MINUS}}") {
            return console.log("BUTTON");
          } else {
            return this.parent.buttons = node;
          }
        } else {
          return this.parent.buttons = null;
        }
      } else {
        this.isMovement = true;
        if (this.node) {
          this.parent.model.move(this.node, {
            x: this.initOffset.x + pos.x - this.init.x,
            y: this.initOffset.y + pos.y - this.init.y
          });
        } else {
          this.parent.offsets = {
            x: pos.x - this.init.x + this.initOffset.x,
            y: pos.y - this.init.y + this.initOffset.y
          };
        }
        return e.preventDefault();
      }
    };

    CanvasController.prototype.up = function(e) {
      this.init = null;
      this.node = null;
      this.isMovement = false;
      return e.preventDefault();
    };

    CanvasController.prototype.getPos = function(e) {
      if (e.touches) {
        e = e.touches[0];
      }
      return {
        x: e.pageX,
        y: e.pageY
      };
    };

    CanvasController.prototype.keyHandler = function(e) {
      switch (String.fromCharCode(e.keyCode).toLowerCase()) {
        case 'l':
          return this.toggle("legend");
        case 'g':
          return this.toggle("levelno");
        case 'd':
          return this.toggle("level");
        case 's':
          return this.toggle("shortcuts");
        case "!":
          return this.parent.level++;
        case "\"":
          if (this.parent.level > 0) {
            return this.parent.level--;
          }
      }
    };

    CanvasController.prototype.toggle = function(what) {
      this.parent.triggers[what] = !this.parent.triggers[what];
      return storage.setItem("canvasTriggers", JSON.stringify(this.parent.triggers));
    };

    CanvasController.prototype.mouseWheelHandler = function(e) {
      var _ref, _ref1;

      if ((_ref = this.mwTick) == null) {
        this.mwTick = -1;
      }
      if ((_ref1 = this.mwTolerance) == null) {
        this.mwTolerance = 6;
      }
      this.mwTick++;
      if (this.mwTick === this.mwTolerance) {
        this.parent.level += e.wheelDelta / 120;
        if (this.parent.level < 0) {
          this.parent.level = 0;
        }
        return this.mwTick = 0;
      }
    };

    CanvasController.prototype.start = function() {
      var ev, handler, _ref, _results;

      window.addEventListener("keydown", this.keyHandler);
      window.addEventListener("mousewheel", this.mouseWheelHandler);
      _ref = this.events;
      _results = [];
      for (ev in _ref) {
        handler = _ref[ev];
        _results.push(this.parent.buffer.addEventListener(ev, handler));
      }
      return _results;
    };

    CanvasController.prototype.end = function() {
      var ev, handler, _ref, _results;

      window.removeEventListener("keydown", this.keyHandler);
      window.removeEventListener("mousewheel", this.mouseWheelHandler);
      _ref = this.events;
      _results = [];
      for (ev in _ref) {
        handler = _ref[ev];
        _results.push(this.parent.buffer.removeEventListener(ev, handler));
      }
      return _results;
    };

    return CanvasController;

  })(BaseObject);

  module.exports = CanvasController;

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
  var DnD, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DnD = (function(_super) {
    __extends(DnD, _super);

    function DnD() {
      this.readHandler = __bind(this.readHandler, this);
      this.dragHandler = __bind(this.dragHandler, this);
      this.dragOver = __bind(this.dragOver, this);
      this.dragExit = __bind(this.dragExit, this);
      this.dragEnter = __bind(this.dragEnter, this);
      this.init = __bind(this.init, this);      _ref = DnD.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DnD.prototype.init = function() {
      document.addEventListener("dragenter", this.proxy(this.dragEnter, this), true);
      document.addEventListener("dragexit", this.proxy(this.dragExit, this), true);
      return document.addEventListener("dragleave", this.proxy(this.dragExit, this), true);
    };

    DnD.prototype.dragEnter = function(e) {
      var span;

      this.ph = document.createElement("div");
      this.ph.className = "dragdropplaceholder";
      span = document.createElement("span");
      span.innerHTML = "Drop file over here";
      this.ph.appendChild(span);
      document.querySelector("body > article section").appendChild(this.ph);
      this.ph.className += " active";
      this.ph.addEventListener("dragover", this.proxy(this.dragOver, this), true);
      this.ph.addEventListener("drop", this.proxy(this.dragHandler, this), true);
      e.stopPropagation();
      return e.preventDefault();
    };

    DnD.prototype.dragExit = function(e) {
      $(".dragdropplaceholder").remove();
      e.stopPropagation();
      return e.preventDefault();
    };

    DnD.prototype.dragOver = function(e) {
      this.ph.className = this.ph.className.replace(/\ ?hover/, "");
      this.ph.className += " hover";
      e.dataTransfer.dropEffect = "copy";
      e.stopPropagation();
      return e.preventDefault();
    };

    DnD.prototype.dragHandler = function(e) {
      var file, files, _fn, _i, _len,
        _this = this;

      e.stopPropagation();
      e.preventDefault();
      this.ph.className = this.ph.className.replace(/\ ?(hover|active)/, "");
      console.log(e);
      files = e.dataTransfer.files || e.target.files;
      console.log(files, this.ph);
      _fn = function() {
        var reader;

        reader = new FileReader;
        reader.onload = _this.readHandler;
        return reader.readAsText(file);
      };
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        if (!file.name.match(/.*opml/)) {
          continue;
        }
        _fn();
      }
      return $(".dragdropplaceholder").remove();
    };

    DnD.prototype.readHandler = function(file) {
      console.log("READING");
      return DepMan.helper("OPMLManager").open(file.target.result);
    };

    return DnD;

  })(BaseObject);

  module.exports = new DnD();

}).call(this);
}, "controllers/OPML": function(exports, require, module) {(function() {
  var ER, OPMLController, OPMLControllerErrorReporter, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  OPMLController = (function(_super) {
    __extends(OPMLController, _super);

    function OPMLController(model) {
      var e, section;

      this.model = model;
      this.deactivate = __bind(this.deactivate, this);
      this.activate = __bind(this.activate, this);
      this.e = document.createElement("article");
      this.e.innerHTML = DepMan.render("_outline", this.model);
      this.e.setAttribute("ng-csp", "");
      this.e.setAttribute("ng-controller", "OPMLController");
      section = $("body > article section");
      e = document.createElement("script");
      e.innerHTML = DepMan.render("_outline_render");
      e.setAttribute("type", "text/ng-template");
      e.setAttribute("id", "tree_row.html");
      this.e.appendChild(e);
      angular.bootstrap(this.e, ["Arrow"]);
      this.je = $(this.e);
      this.canvas = this.je.find("canvas")[0];
      this.frameBuffer = new (DepMan.classes("MainFrameBuffer"))(this.canvas, this.model);
      this.log(this);
    }

    OPMLController.prototype.activate = function() {
      var _this = this;

      console.log("activating");
      this.je.addClass('activating');
      this.je.removeClass("deactivated");
      jQuery("body > article section").append(this.e);
      return setTimeout(function() {
        _this.je.removeClass("activating");
        return _this.je.addClass("activated");
      }, 50);
    };

    OPMLController.prototype.deactivate = function() {
      var _this = this;

      console.log("deactivating");
      this.je.removeClass("activated");
      this.je.addClass("deactivated");
      return setTimeout(function() {
        return _this.e.parentNode.removeChild(_this.e);
      }, 1000);
    };

    return OPMLController;

  })(BaseObject);

  OPMLControllerErrorReporter = (function(_super) {
    __extends(OPMLControllerErrorReporter, _super);

    function OPMLControllerErrorReporter() {
      _ref = OPMLControllerErrorReporter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    OPMLControllerErrorReporter.extend(IS.ErrorReporter);

    return OPMLControllerErrorReporter;

  })(BaseObject);

  ER = OPMLControllerErrorReporter;

  module.exports = OPMLController;

}).call(this);
}, "controllers/Outline": function(exports, require, module) {(function() {
  var ER, FakeOutline, OutlineController, OutlineControllerErrorReporter, _ref,
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
      this.del = __bind(this.del, this);
      this.add = __bind(this.add, this);
      this.blur = __bind(this.blur, this);
      this.doubleClick = __bind(this.doubleClick, this);
      if ((this.e == null) || (this.e.tagName == null)) {
        throw ER.generate(1);
      }
      if (this.model == null) {
        throw ER.generate(2);
      }
      this.e.controller = this;
      if (!isMobile) {
        this.e.addEventListener("contextmenu", function(e) {
          new (DepMan.controller("ContextMenu"))({
            "Delete": _this.del,
            "Add": _this.add
          }, e);
          e.preventDefault();
          return e.stopPropagation();
        });
      } else {
        if (this.model.controls != null) {
          this.model.controls.add.addEventListener("click", this.add);
          this.model.controls.remove.addEventListener("click", this.del);
        }
      }
      kids = this.e.children;
      _fn = function(kid) {
        switch (kid.tagName) {
          case "P":
            _this.p = kid;
            kid.addEventListener("dblclick", _this.doubleClick);
            return kid.addEventListener("blur", _this.blur);
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
                    _this.model.update("status", "unchecked");
                    break;
                  case "icon-check-empty":
                    kid.className = "icon-check";
                    _this.model.update("status", "checked");
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

    OutlineController.prototype.doubleClick = function() {
      var _this = this;

      this.p.setAttribute("contenteditable", true);
      return $("*").each(function(k, e) {
        return e.addEventListener("click", _this.blur);
      });
    };

    OutlineController.prototype.blur = function() {
      var _this = this;

      this.p.setAttribute("contenteditable", false);
      this.model.update("text", this.p.innerHTML);
      return $("*").each(function(k, e) {
        return e.removeEventListener("click", _this.blur);
      });
    };

    OutlineController.prototype.add = function() {
      var addition, e, kids;

      kids = this.model.children.get();
      if (kids == null) {
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
      this.model.update("status", "indeterminate");
      this.c.setAttribute("class", "icon-circle-blank");
      this.f.className = this.f.className.replace(/\ ?hidden/g, "");
      return this.e.className += " noborder";
    };

    OutlineController.prototype.del = function() {
      this.e.parentNode.removeChild(this.e);
      return this.model["delete"]();
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
        el.model.update("status", "determinate");
      } else {
        el.c.className = "icon-circle-blank";
        el.model.update("status", "indeterminate");
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
      _ref = OutlineControllerErrorReporter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    OutlineControllerErrorReporter.errors = {
      "Crud": ["Must provide a valid HTML node", "Must provide a valid Outline Model"]
    };

    OutlineControllerErrorReporter.extend(IS.ErrorReporter);

    return OutlineControllerErrorReporter;

  })(BaseObject);

  ER = OutlineControllerErrorReporter;

  module.exports = OutlineController;

}).call(this);
}, "controllers/Swype": function(exports, require, module) {(function() {
  var GESTURES, Swype, gest, _gestures, _i, _len,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Swype = (function(_super) {
    __extends(Swype, _super);

    function Swype() {
      this.getParams = __bind(this.getParams, this);
      this.start = __bind(this.start, this);      window.addEventListener("touchstart", this.start);
    }

    Swype.prototype.start = function(e) {
      var pos, scope, _i, _ref, _results;

      pos = this.getParams(e);
      scope = angular.element("[ng-controller='NGAsideController']").scope();
      if (pos.x <= 50) {
        return this.gesture = new GESTURES.SWYPELEFT(pos);
      } else if ((_ref = pos.x, __indexOf.call((function() {
        _results = [];
        for (_i = 50; _i <= 250; _i++){ _results.push(_i); }
        return _results;
      }).apply(this), _ref) >= 0) && scope.sidebarstatus === "open") {
        return this.gesture = new GESTURES.SWYPERIGHT(pos);
      } else if (pos.x >= window.innerWidth - 50) {
        return this.gesture = new GESTURES.SWYPERIGHT(pos);
      }
    };

    Swype.prototype.getParams = function(e) {
      if (e.touches) {
        return {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        };
      } else {
        return {
          x: e.pageX,
          y: e.pageY
        };
      }
    };

    return Swype;

  })(BaseObject);

  _gestures = ["SWYPELEFT", "SWYPERIGHT"];

  GESTURES = {};

  for (_i = 0, _len = _gestures.length; _i < _len; _i++) {
    gest = _gestures[_i];
    GESTURES[gest] = DepMan.gesture(gest.toLowerCase());
  }

  module.exports = Swype;

}).call(this);
}, "gestures/swypeleft": function(exports, require, module) {(function() {
  var SwypeleftGesture, _tolerance,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SwypeleftGesture = (function(_super) {
    __extends(SwypeleftGesture, _super);

    function SwypeleftGesture(init) {
      this.init = init;
      this.end = __bind(this.end, this);
      this.move = __bind(this.move, this);
      window.addEventListener("touchmove", this.move);
      window.addEventListener("touchend", this.end);
    }

    SwypeleftGesture.prototype.move = function(e) {
      var pos, scope;

      if (this.breakup != null) {
        return;
      }
      scope = angular.element("[ng-controller='NGAsideController']").scope();
      pos = Swype.getParams(e);
      if (pos.x - this.init.x > _tolerance) {
        if (scope.sidebarstatus === "open") {
          scope.asidetab(null, -1);
        } else {
          scope.togglesidebar();
        }
        scope.$apply();
        return this.end();
      }
    };

    SwypeleftGesture.prototype.end = function(e) {
      this.breakup = true;
      window.removeEventListener("touchmove", this.move);
      return window.removeEventListener("touchend", this.end);
    };

    return SwypeleftGesture;

  })(BaseObject);

  _tolerance = 100;

  module.exports = SwypeleftGesture;

}).call(this);
}, "gestures/swyperight": function(exports, require, module) {(function() {
  var SwyperightGesture, _tolerance,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SwyperightGesture = (function(_super) {
    __extends(SwyperightGesture, _super);

    function SwyperightGesture(init) {
      this.init = init;
      this.end = __bind(this.end, this);
      this.move = __bind(this.move, this);
      window.addEventListener("touchmove", this.move);
      window.addEventListener("touchend", this.end);
    }

    SwyperightGesture.prototype.move = function(e) {
      var pos, scope;

      if (this.breakup != null) {
        return;
      }
      scope = angular.element("[ng-controller='NGAsideController']").scope();
      pos = Swype.getParams(e);
      if (this.init.x - pos.x > _tolerance) {
        if (scope.sidebarstatus === "closed") {
          angular.element("[ng-controller='OPMLController']").scope().changeView();
        } else {
          if (this.init.x <= 300) {
            scope.asidetab(null, 1);
          } else {
            scope.togglesidebar();
          }
        }
        scope.$apply();
        return this.end();
      }
    };

    SwyperightGesture.prototype.end = function(e) {
      this.breakup = true;
      window.removeEventListener("touchmove", this.move);
      return window.removeEventListener("touchend", this.end);
    };

    return SwyperightGesture;

  })(BaseObject);

  _tolerance = 100;

  module.exports = SwyperightGesture;

}).call(this);
}, "helpers/DataTransfer": function(exports, require, module) {(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    var Client;

    Client = (function(_super) {
      __extends(Client, _super);

      function Client() {
        this.init = __bind(this.init, this);        this.queue = {};
        Client.__super__.constructor.call(this, "http://188.240.47.130:8080");
      }

      Client.prototype.connected = function(id) {
        return Toast("Connected to the new ID", "You are now connected to " + id, "Anything that you do will now be visible and mirrored in the other one's screen, and so will his every move in your screen.");
      };

      Client.prototype.events = {
        "log": function() {
          return console.log(arguments);
        },
        "switchMode": function(mode) {
          return switchMode(mode);
        }
      };

      Client.prototype.init = function() {
        var _ref, _ref1,
          _this = this;

        jQuery("#connectionidself").val(this.id);
        jQuery("#connectid").keypress(function(e) {
          _this.connect(jQuery("#connectid").val());
          if (e.which === 13) {
            return jQuery("#connectid").val("");
          }
        });
        if ((_ref = this.draw) == null) {
          this.draw = new QRCodeDraw();
        }
        if ((_ref1 = this.image) == null) {
          this.image = document.getElementById("qrimage");
        }
        return this.draw.draw(this.image, this.id, function() {});
      };

      return Client;

    })(BaseClient);
    return window.Client = new Client();
  })();

}).call(this);
}, "helpers/DependenciesManager": function(exports, require, module) {(function() {
  var DepErr, DepMan, _ref,
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
      this.gesture = __bind(this.gesture, this);
      this.classes = __bind(this.classes, this);
      this.angular = __bind(this.angular, this);
      this.lib = __bind(this.lib, this);
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
      this.deps["" + prefix + module] = require("" + this.basePrefix + prefix + module);
      return this.deps["" + prefix + module];
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

    DepMan.prototype.lib = function(module) {
      return this._require(module, "libs/");
    };

    DepMan.prototype.angular = function(module) {
      return this._require(module, "angular/");
    };

    DepMan.prototype.classes = function(module) {
      return this._require(module, "classes/");
    };

    DepMan.prototype.gesture = function(module) {
      return this._require(module, "gestures/");
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
      _ref = DepErr.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DepErr.errors = {
      "RequireError": ["Could not require module!"]
    };

    DepErr.extend(IS.ErrorReporter);

    return DepErr;

  })(IS.Object);

  module.exports = DepMan;

}).call(this);
}, "helpers/LanguageHelper": function(exports, require, module) {(function() {
  var LanguageHelper,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  LanguageHelper = (function(_super) {
    __extends(LanguageHelper, _super);

    function LanguageHelper(language) {
      this._translateAll = __bind(this._translateAll, this);
      this._hook = __bind(this._hook, this);
      this._translate = __bind(this._translate, this);
      this.switchLanguage = __bind(this.switchLanguage, this);
      var _this = this;

      storage.getItem("lang", function(sets) {
        var lang;

        lang = sets.lang;
        language = lang || "en-US";
        _this.timer = setTimeout((function() {
          return _this.log("Initialized");
        }), 0);
        return _this.switchLanguage(language);
      });
    }

    LanguageHelper.prototype.switchLanguage = function(language) {
      var e;

      this.language = language;
      try {
        require("languages/" + this.language);
        this._language = JSONImport["" + this.language];
        storage.setItem("lang", this.language);
        return this._translateAll();
      } catch (_error) {
        e = _error;
        return this.log("Error Encountered", e);
      }
    };

    LanguageHelper.prototype._translate = function(text) {
      return this._language[text] || text;
    };

    LanguageHelper.prototype._hook = function(text, area) {
      var string;

      if (area == null) {
        area = null;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(this._translateAll, 0);
      string = "data-translate = '" + text + "'";
      if (area != null) {
        string += " data-target='" + area + "'";
      }
      return string;
    };

    LanguageHelper.prototype._translateAll = function() {
      var me;

      me = this;
      return jQuery("*[data-translate]").each(function(element) {
        var target;

        if (this.tagName === "INPUT") {
          target = this.dataset["target"] || "value";
          return this[target] = me._translate(this.dataset["translate"]);
        } else {
          return this.innerHTML = me._translate(this.dataset["translate"]);
        }
      });
    };

    return LanguageHelper;

  })(BaseObject);

  window.LanguageHelper = new LanguageHelper;

  window.T = window.LanguageHelper._translate;

  window._T = window.LanguageHelper._hook;

  window.__T = window.LanguageHelper._translateAll;

}).call(this);
}, "helpers/LinkManager": function(exports, require, module) {(function() {
  var LinkErrorReporter, LinkManager, _first, _ref,
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
      if (e == null) {
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
      _ref = LinkErrorReporter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    LinkErrorReporter.errorGroups = [];

    LinkErrorReporter.errorGroupMap = [];

    LinkErrorReporter.errorMessages = [];

    LinkErrorReporter.extend(IS.ErrorReporter);

    return LinkErrorReporter;

  })(IS.Object);

  module.exports = LinkManager;

}).call(this);
}, "helpers/Loading": function(exports, require, module) {(function() {
  var LoadingHelper,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  LoadingHelper = (function(_super) {
    __extends(LoadingHelper, _super);

    LoadingHelper.extend(IS.Modules.Overload);

    LoadingHelper.include(IS.Modules.Overload);

    function LoadingHelper() {
      this.progress = __bind(this.progress, this);
      this.end = __bind(this.end, this);
      this.start = __bind(this.start, this);
      var f;

      f = document.createElement("div");
      f.innerHTML = DepMan.render("loadingscreen");
      document.body.appendChild(f);
      this.loadingScreen = document.getElementById("loadingscreen");
      this.message = document.getElementById("loadingmessage");
      this.log("Loading screen ready");
    }

    LoadingHelper.prototype.start = function() {
      return this.loadingScreen.className = "active";
    };

    LoadingHelper.prototype.end = function() {
      return this.loadingScreen.className = "";
    };

    LoadingHelper.prototype.progress = function(arg) {
      return this.message.innerHTML = (typeof arg === "number" ? "Loading: " + arg + "%" : arg);
    };

    module.exports = LoadingHelper;

    return LoadingHelper;

  })(BaseObject);

}).call(this);
}, "helpers/Locations": function(exports, require, module) {(function() {
  var LocationsService,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  LocationsService = (function(_super) {
    var levels;

    __extends(LocationsService, _super);

    levels = [];

    function LocationsService(model) {
      this.model = model;
      this.getNextChild = __bind(this.getNextChild, this);
      this.generate = __bind(this.generate, this);
      this.generateLocations = __bind(this.generateLocations, this);
      this.generateLocations();
    }

    LocationsService.prototype.generateLocations = function() {
      this.levels = [];
      this.generate(this.model.structure, 0);
      return console.log(this.model.structure);
    };

    LocationsService.prototype.generate = function(list, depth) {
      var item, levelX, _base, _i, _len, _ref, _ref1, _results;

      if ((_ref = (_base = this.levels)[depth]) == null) {
        _base[depth] = 30;
      }
      levelX = depth * 350 + 50;
      _ref1 = list.topics;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        item = _ref1[_i];
        if (item.children) {
          this.generate(item.children, depth + 1);
        }
        if (item.x === "" || item.y === "" || item.x === NaN || item.y === NaN) {
          item.y = this.levels[depth];
          item.x = levelX;
          _results.push(this.levels[depth] += 75);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    LocationsService.prototype.getNextChild = function(level) {
      var _base, _ref;

      if ((_ref = (_base = this.levels)[level]) == null) {
        _base[level] = 0;
      }
      this.levels[level] += 75;
      return {
        x: level * 350 + 50,
        y: this.levels[level] - 75
      };
    };

    return LocationsService;

  })(BaseObject);

  module.exports = LocationsService;

}).call(this);
}, "helpers/OPMLManager": function(exports, require, module) {(function() {
  var OPMLManager, _inst,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  OPMLManager = (function(_super) {
    __extends(OPMLManager, _super);

    function OPMLManager() {
      this["delete"] = __bind(this["delete"], this);
      this["new"] = __bind(this["new"], this);
      this._openOPML = __bind(this._openOPML, this);
      this._open = __bind(this._open, this);
      this.openOPML = __bind(this.openOPML, this);
      this.open = __bind(this.open, this);
      this.bootstrap = __bind(this.bootstrap, this);      this.OPMLs = [];
      this.activeOPML = null;
      this.activateControllerFunctions = [];
    }

    OPMLManager.prototype.bootstrap = function() {
      var _this = this;

      DepMan.angular("OPMLController");
      $("article#list").html(DepMan.render("_list")).attr("ng-csp", true).attr("ng-controller", "OPMLManager");
      DepMan.angular("OPMLManager");
      return window.storage.getItem("opmls", function(sets) {
        var func, index, item, key, _i, _j, _len, _len1, _ref, _results;

        if (sets.opmls != null) {
          index = JSON.parse(sets.opmls);
        }
        if (index) {
          for (key = _i = 0, _len = index.length; _i < _len; key = ++_i) {
            item = index[key];
            console.log(item, key, key === index.length - 1);
            window.storage.getItem("opmls." + item, function(sets) {
              return _this.open(sets["opmls." + item], true);
            });
          }
        }
        _ref = _this.activateControllerFunctions;
        _results = [];
        for (index = _j = 0, _len1 = _ref.length; _j < _len1; index = ++_j) {
          func = _ref[index];
          _results.push(func(_this.OPMLs[index]));
        }
        return _results;
      });
    };

    OPMLManager.prototype.open = function(file, silent) {
      Client.publish("opml.open", file, silent);
      return typeof this.refreshView === "function" ? this.refreshView() : void 0;
    };

    OPMLManager.prototype.openOPML = function(opml, override) {
      if (override == null) {
        override = false;
      }
      if (opml != null) {
        Client.publish("opml.openOPML", this.OPMLs.indexOf(opml), override, opml.text, Client.id);
        return typeof this.refreshView === "function" ? this.refreshView() : void 0;
      }
    };

    OPMLManager.prototype._open = function(file, silent) {
      var func, x;

      if (silent == null) {
        silent = false;
      }
      if ((this.activeOPML != null) && !silent) {
        this.activeOPML.controller.deactivate();
      }
      x = new (DepMan.model("OPML"))(file, this);
      this.activeOPML = x;
      this.OPMLs.push(this.activeOPML);
      this.activeOPML.index = this.OPMLs.indexOf(this.activeOPML);
      if (!silent) {
        this.activeOPML.controller.activate();
      }
      if (silent) {
        this.activeOPML = null;
      }
      func = this.activateControllerFunctions.shift();
      return func(x);
    };

    OPMLManager.prototype._openOPML = function(opml, override, text, id) {
      var le, les, _i, _len;

      if (override == null) {
        override = false;
      }
      if (text == null) {
        text = null;
      }
      if (id == null) {
        id = null;
      }
      if ((id != null) && id !== Client.id) {
        return this._open(text);
      } else {
        if (opml == null) {
          return;
        }
        opml = this.OPMLs[opml];
        les = document.querySelectorAll(".dragdropplaceholder");
        if (les != null) {
          for (_i = 0, _len = les.length; _i < _len; _i++) {
            le = les[_i];
            le.parentNode.removeChild(le);
          }
        }
        if ((this.activeOPML == null) || (opml !== this.activeOPML) || override) {
          if (this.activeOPML != null) {
            this.activeOPML.controller.deactivate();
          }
          if (__indexOf.call(this.OPMLs, opml) >= 0) {
            this.activeOPML = opml;
          }
          return this.activeOPML.controller.activate();
        }
      }
    };

    OPMLManager.prototype["new"] = function() {
      return this.open("<opml version='1.0'>\n	<head>\n		<title>New OPML</title>\n	</head>\n	<body>\n		<outline text=\"Parent Node\">\n			<outline text=\"First Child\" _status=\"checked\" _note=\"Some Notes\" />\n			<outline text=\"Second Child\" />\n		</outline>\n	</body>\n</opml>");
    };

    OPMLManager.prototype["delete"] = function(opml) {
      this.OPMLs.splice(this.OPMLs.indexOf(opml), 1);
      return opml["delete"]();
    };

    return OPMLManager;

  })(IS.Object);

  _inst = new OPMLManager();

  if (typeof Client !== "undefined" && Client !== null) {
    Client.events = {
      "opml.open": _inst._open,
      "opml.openOPML": _inst._openOPML
    };
  }

  if (typeof Client !== "undefined" && Client !== null) {
    Client.loadEvents();
  }

  Arrow.factory("OPML", function() {
    return _inst;
  });

  _inst.bootstrap.apply(_inst, []);

  module.exports = _inst;

}).call(this);
}, "languages/en-US": function(exports, require, module) {if (!window.JSONImport) window.JSONImport = {}; window.JSONImport['en-US'] = JSON.parse("{\n}", function(key, value) { var v; try { v = eval(value) } catch(e) { v = value } return v;}); }, "languages/ro-RO": function(exports, require, module) {if (!window.JSONImport) window.JSONImport = {}; window.JSONImport['ro-RO'] = JSON.parse("{\n	\"To connect to another client, give him the code in the first input box or input his code in the second input box and press enter\": \"Pentru a te conecta la alt client, trimite-i lui codul din prima casetă de text, sau introdu codul lui în prima casetă de text și apasă enter\",\n	\"Files\": \"Fișiere\",\n	\"Select your language from the dropdown menu: It will be saved\": \"Alege limba din lista de selcție de mai jos : Alegerea va fi salvată\",\n	\"US English\": \"Engleză SUA\",\n	\"ID to connect to\": \"ID-ul la care să se conecteze\",\n	\"Romanian\": \"Română\",\n	\"Message\": \"Mesaj\",\n	\"Download\": \"Descarcă\",\n	\"Upload\": \"Încarcă\",\n	\"General Settings\": \"Setări Generale\",\n	\"Server Settings\": \"Setări Server\",\n	\"Settings\": \"Setări\",\n	\"Save\": \"Salvează\"\n}	", function(key, value) { var v; try { v = eval(value) } catch(e) { v = value } return v;}); }, "libs/QRCodeDraw": function(exports, require, module) {/*
 * copyright 2010-2012 Ryan Day
 * http://github.com/soldair/node-qrcode
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * canvas example and fallback support example provided by Joshua Koo
 *	http://jabtunes.com/labs/qrcode.html
 *	"Instant QRCode Mashup by Joshua Koo!"
 *	as far as i can tell the page and the code on the page are public domain
 *
 * original table example and library provided by Kazuhiko Arase
 *	http://d-project.googlecode.com/svn/trunk/misc/qrcode/js/
 *
 */

var QRCodeLib = require('qrcode');
var QRVersionCapacityTable = require('qrcapacitytable').QRCapacityTable;
var QRCode = QRCodeLib.QRCode;

function QRCodeDraw(){}

QRCodeDraw.prototype = {
    scale:4,//4 px module size
    defaultMargin:20,
    marginScaleFactor:5,
    Array:(typeof Uint32Array == 'undefined'?Uint32Array:Array),
    // you may configure the error behavior for input string too long
    errorBehavior:{
        length:'trim'
    },
    color:{
        dark:'black',
        light:'white'
    },
    defaultErrorCorrectLevel:QRCodeLib.QRErrorCorrectLevel.H,
    QRErrorCorrectLevel:QRCodeLib.QRErrorCorrectLevel,
    draw:function(canvas,text,options,cb){

        var level,
            error,
            errorCorrectLevel;

        var args = Array.prototype.slice.call(arguments);
        cb = args.pop();
        canvas = args.shift();
        text = args.shift();
        options = args.shift()||{};


        if(typeof cb != 'function') {
            //enforce callback api just in case the processing can be made async in the future
            // or support proc open to libqrencode
            throw new Error('callback required');
        }

        if(typeof options !== "object"){
            options.errorCorrectLevel = options;
        }


        this.QRVersion(text,options.errorCorrectLevel||this.QRErrorCorrectLevel.H,options.version,function(e,t,l,ec){
            text = t,level = l,error = e,errorCorrectLevel = ec;
        });

        this.scale = options.scale||this.scale;
        this.margin = options.margin||this.scale*2;

        if(!level) {
            //if we are unable to find an appropriate qr level error out
            cb(error,canvas);
            return;
        }

        //create qrcode!
        try{

            var qr = new QRCodeLib.QRCode(level, errorCorrectLevel)
                , scale = this.scale||4
                , ctx = canvas.getContext('2d')
                , width = 0;

            qr.addData(text);
            qr.make();

            var margin = this.marginWidth();
            var currenty = margin;

            width = this.dataWidth(qr)+ margin*2;

            this.resetCanvas(canvas,ctx,width);

            for (var r = 0,rl=qr.getModuleCount(); r < rl; r++) {
                var currentx = margin;
                for (var c = 0,cl=qr.getModuleCount(); c < cl; c++) {
                    if (qr.isDark(r, c) ) {
                        ctx.fillStyle = this.color.dark;
                        ctx.fillRect (currentx, currenty, scale, scale);
                    } else if(this.color.light){
                        //if falsy configured color
                        ctx.fillStyle = this.color.light;
                        ctx.fillRect (currentx, currenty, scale, scale);
                    }
                    currentx += scale;
                }
                currenty += scale;
            }
        } catch (e) {
            error = e;
        }

        cb(error,canvas,width);
    },
    drawBitArray:function(text/*,errorCorrectLevel,options,cb*/) {

        var args = Array.prototype.slice.call(arguments),
            cb = args.pop(),
            text = args.shift(),
            errorCorrectLevel = args.shift(),
            options = args.shift() || {};

        //argument processing
        if(typeof cb != 'function') {
            //enforce callback api just in case the processing can be made async in the future
            // or support proc open to libqrencode
            throw new Error('callback required as last argument');
        }

        cb = arguments[arguments.length-1];

        if(arguments.length > 2){
            errorCorrectLevel = arguments[2];
        }


        //this interface kinda sucks - there is very small likelyhood of this ever being async
        this.QRVersion(text,errorCorrectLevel,(options||{}).version,function(e,t,l,ec){
            text = t,level = l,error = e,errorCorrectLevel = ec;
        });

        //console.log(text,level,error,errorCorrectLevel);

        if(!level) {
            //if we are unable to find an appropriate qr level error out
            cb(error,[],0);
            return;
        }

        //create qrcode!
        try{

            var qr = new QRCodeLib.QRCode(level, errorCorrectLevel)
                , scale = this.scale||4
                , width = 0,bits,bitc=0,currenty=0;

            qr.addData(text);
            qr.make();

            width = this.dataWidth(qr,1);
            bits = new this.Array(width*width);


            for (var r = 0,rl=qr.getModuleCount(); r < rl; r++) {
                for (var c = 0,cl=qr.getModuleCount(); c < cl; c++) {
                    if (qr.isDark(r, c) ) {
                        bits[bitc] = 1;
                    } else {
                        bits[bitc] = 0;
                    }
                    bitc++;
                }
            }
        } catch (e) {
            error = e;
            console.log(e.stack);
        }

        cb(error,bits,width);
    },
    QRVersion:function(text,errorCorrectLevel,version,cb){
        var c = text.length,
            error,
            errorCorrectLevel = this.QRErrorCorrectLevel[errorCorrectLevel]||this.defaultErrorCorrectLevel,
            errorCorrectIndex = [1,0,3,2],//fix odd mapping to order in table
            keys = ['L','M','Q','H'],
            capacity = 0,
            versionSpecified = false;


        if(typeof version !== "undefined" && version !== null) {
            versionSpecified = true;
        }
        //TODO ADD THROW FOR INVALID errorCorrectLevel...?

        if(versionSpecified){
            console.log('SPECIFIED VERSION! ',version);
            //i have specified a version. this will give me a fixed size qr code. version must be valid. 1-40
            capacity = QRVersionCapacityTable[version][errorCorrectIndex[errorCorrectLevel]];

        } else {
            //figure out what version can hold the amount of text
            for(var i=0,j=QRVersionCapacityTable.length;i<j;i++) {
                capacity = QRVersionCapacityTable[i][errorCorrectIndex[errorCorrectLevel]];
                if(c < QRVersionCapacityTable[i][errorCorrectIndex[errorCorrectLevel]]){
                    version = i+1;
                    break;
                }
            }
            //if not version set to max
            if(!version) {
                version = QRVersionCapacityTable.length-1;
            }
        }

        if(capacity < c){
            if(this.errorBehavior.length == 'trim'){
                text = text.substr(0,capacity);
                level = QRVersionCapacityTable.length;
            } else {
                error = new Error('input string too long for error correction '
                    +keys[errorCorrectIndex[errorCorrectLevel]]
                    +' max length '
                    + capacity
                    +' for qrcode version '+version
                );
            }
        }

        if(cb) {
            cb(error,text,version,errorCorrectLevel);
        }
        return version;
    },
    marginWidth:function(){
        var margin = this.defaultMargin;
        this.scale = this.scale||4;
        //elegant white space next to code is required by spec
        if (this.scale * this.marginScaleFactor > margin) {
            margin = this.scale * this.marginScaleFactor;
        }
        return margin;
    },
    dataWidth:function(qr,scale){
        return qr.getModuleCount()*(scale||this.scale||4);
    },
    resetCanvas:function(canvas,ctx,width){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(!canvas.style) canvas.style = {};
        canvas.style.height = canvas.height = width;//square!
        canvas.style.width = canvas.width = width;

        if(this.color.light){
            ctx.fillStyle = this.color.light;
            ctx.fillRect(0,0,canvas.width,canvas.height);
        } else {
            //support transparent backgrounds?
            //not exactly to spec but i really would like someone to be able to add a background with heavily reduced luminosity for simple branding
            //i could just ditch this because you could also just set #******00 as the color =P
            ctx.clearRect(0,0,canvas.width,canvas.height);
        }
    }
};


exports.QRCodeDraw = QRCodeDraw;
exports.QRVersionCapacityTable = QRVersionCapacityTable;
exports.QRErrorCorrectLevel = QRCodeLib.QRErrorCorrectLevel;
exports.QRCode = QRCodeLib.QRCode;

window.QRCodeDraw = QRCodeDraw;
window.QRVersionCapacityTable = QRVersionCapacityTable;
window.QRErrorCorrectLevel = QRCodeLib.QRErrorCorrectLevel;
window.QRCode = QRCodeLib.QRCode;
}, "libs/angular.min": function(exports, require, module) {/*
 AngularJS v1.0.4
 (c) 2010-2012 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(T,Y,p){'use strict';function m(b,a,c){var d;if(b)if(L(b))for(d in b)d!="prototype"&&d!="length"&&d!="name"&&b.hasOwnProperty(d)&&a.call(c,b[d],d);else if(b.forEach&&b.forEach!==m)b.forEach(a,c);else if(M(b)&&va(b.length))for(d=0;d<b.length;d++)a.call(c,b[d],d);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function mb(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function fc(b,a,c){for(var d=mb(b),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}
function nb(b){return function(a,c){b(c,a)}}function wa(){for(var b=Z.length,a;b;){b--;a=Z[b].charCodeAt(0);if(a==57)return Z[b]="A",Z.join("");if(a==90)Z[b]="0";else return Z[b]=String.fromCharCode(a+1),Z.join("")}Z.unshift("0");return Z.join("")}function y(b){m(arguments,function(a){a!==b&&m(a,function(a,d){b[d]=a})});return b}function F(b){return parseInt(b,10)}function xa(b,a){return y(new (y(function(){},{prototype:b})),a)}function C(){}function ma(b){return b}function H(b){return function(){return b}}
function t(b){return typeof b=="undefined"}function v(b){return typeof b!="undefined"}function M(b){return b!=null&&typeof b=="object"}function E(b){return typeof b=="string"}function va(b){return typeof b=="number"}function na(b){return Sa.apply(b)=="[object Date]"}function I(b){return Sa.apply(b)=="[object Array]"}function L(b){return typeof b=="function"}function oa(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function Q(b){return E(b)?b.replace(/^\s*/,"").replace(/\s*$/,""):b}function gc(b){return b&&
(b.nodeName||b.bind&&b.find)}function Ta(b,a,c){var d=[];m(b,function(b,g,i){d.push(a.call(c,b,g,i))});return d}function ya(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Ua(b,a){var c=ya(b,a);c>=0&&b.splice(c,1);return a}function U(b,a){if(oa(b)||b&&b.$evalAsync&&b.$watch)throw u("Can't copy Window or Scope");if(a){if(b===a)throw u("Can't copy equivalent objects or arrays");if(I(b)){for(;a.length;)a.pop();for(var c=0;c<b.length;c++)a.push(U(b[c]))}else for(c in m(a,
function(b,c){delete a[c]}),b)a[c]=U(b[c])}else(a=b)&&(I(b)?a=U(b,[]):na(b)?a=new Date(b.getTime()):M(b)&&(a=U(b,{})));return a}function hc(b,a){var a=a||{},c;for(c in b)b.hasOwnProperty(c)&&c.substr(0,2)!=="$$"&&(a[c]=b[c]);return a}function ha(b,a){if(b===a)return!0;if(b===null||a===null)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&c=="object")if(I(b)){if((c=b.length)==a.length){for(d=0;d<c;d++)if(!ha(b[d],a[d]))return!1;return!0}}else if(na(b))return na(a)&&b.getTime()==a.getTime();
else{if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||oa(b)||oa(a))return!1;c={};for(d in b)if(!(d.charAt(0)==="$"||L(b[d]))){if(!ha(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c[d]&&d.charAt(0)!=="$"&&a[d]!==p&&!L(a[d]))return!1;return!0}return!1}function Va(b,a){var c=arguments.length>2?ia.call(arguments,2):[];return L(a)&&!(a instanceof RegExp)?c.length?function(){return arguments.length?a.apply(b,c.concat(ia.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,
arguments):a.call(b)}:a}function ic(b,a){var c=a;/^\$+/.test(b)?c=p:oa(a)?c="$WINDOW":a&&Y===a?c="$DOCUMENT":a&&a.$evalAsync&&a.$watch&&(c="$SCOPE");return c}function da(b,a){return JSON.stringify(b,ic,a?"  ":null)}function ob(b){return E(b)?JSON.parse(b):b}function Wa(b){b&&b.length!==0?(b=D(""+b),b=!(b=="f"||b=="0"||b=="false"||b=="no"||b=="n"||b=="[]")):b=!1;return b}function pa(b){b=z(b).clone();try{b.html("")}catch(a){}return z("<div>").append(b).html().match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,
function(a,b){return"<"+D(b)})}function Xa(b){var a={},c,d;m((b||"").split("&"),function(b){b&&(c=b.split("="),d=decodeURIComponent(c[0]),a[d]=v(c[1])?decodeURIComponent(c[1]):!0)});return a}function pb(b){var a=[];m(b,function(b,d){a.push(Ya(d,!0)+(b===!0?"":"="+Ya(b,!0)))});return a.length?a.join("&"):""}function Za(b){return Ya(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Ya(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,
"$").replace(/%2C/gi,",").replace(a?null:/%20/g,"+")}function jc(b,a){function c(a){a&&d.push(a)}var d=[b],e,g,i=["ng:app","ng-app","x-ng-app","data-ng-app"],f=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;m(i,function(a){i[a]=!0;c(Y.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(m(b.querySelectorAll("."+a),c),m(b.querySelectorAll("."+a+"\\:"),c),m(b.querySelectorAll("["+a+"]"),c))});m(d,function(a){if(!e){var b=f.exec(" "+a.className+" ");b?(e=a,g=(b[2]||"").replace(/\s+/g,",")):m(a.attributes,
function(b){if(!e&&i[b.name])e=a,g=b.value})}});e&&a(e,g?[g]:[])}function qb(b,a){b=z(b);a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");var c=rb(a);c.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,i){a.$apply(function(){b.data("$injector",i);c(b)(a)})}]);return c}function $a(b,a){a=a||"_";return b.replace(kc,function(b,d){return(d?a:"")+b.toLowerCase()})}function ab(b,a,c){if(!b)throw new u("Argument '"+(a||"?")+"' is "+(c||"required"));
return b}function qa(b,a,c){c&&I(b)&&(b=b[b.length-1]);ab(L(b),a,"not a function, got "+(b&&typeof b=="object"?b.constructor.name||"Object":typeof b));return b}function lc(b){function a(a,b,e){return a[b]||(a[b]=e())}return a(a(b,"angular",Object),"module",function(){var b={};return function(d,e,g){e&&b.hasOwnProperty(d)&&(b[d]=null);return a(b,d,function(){function a(c,d,e){return function(){b[e||"push"]([c,d,arguments]);return k}}if(!e)throw u("No module: "+d);var b=[],c=[],j=a("$injector","invoke"),
k={_invokeQueue:b,_runBlocks:c,requires:e,name:d,provider:a("$provide","provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:j,run:function(a){c.push(a);return this}};g&&j(g);return k})}})}function sb(b){return b.replace(mc,function(a,b,d,e){return e?d.toUpperCase():d}).replace(nc,
"Moz$1")}function bb(b,a){function c(){var e;for(var b=[this],c=a,i,f,h,j,k,l;b.length;){i=b.shift();f=0;for(h=i.length;f<h;f++){j=z(i[f]);c?j.triggerHandler("$destroy"):c=!c;k=0;for(e=(l=j.children()).length,j=e;k<j;k++)b.push(ja(l[k]))}}return d.apply(this,arguments)}var d=ja.fn[b],d=d.$original||d;c.$original=d;ja.fn[b]=c}function O(b){if(b instanceof O)return b;if(!(this instanceof O)){if(E(b)&&b.charAt(0)!="<")throw u("selectors not implemented");return new O(b)}if(E(b)){var a=Y.createElement("div");
a.innerHTML="<div>&#160;</div>"+b;a.removeChild(a.firstChild);cb(this,a.childNodes);this.remove()}else cb(this,b)}function db(b){return b.cloneNode(!0)}function ra(b){tb(b);for(var a=0,b=b.childNodes||[];a<b.length;a++)ra(b[a])}function ub(b,a,c){var d=$(b,"events");$(b,"handle")&&(t(a)?m(d,function(a,c){eb(b,c,a);delete d[c]}):t(c)?(eb(b,a,d[a]),delete d[a]):Ua(d[a],c))}function tb(b){var a=b[za],c=Aa[a];c&&(c.handle&&(c.events.$destroy&&c.handle({},"$destroy"),ub(b)),delete Aa[a],b[za]=p)}function $(b,
a,c){var d=b[za],d=Aa[d||-1];if(v(c))d||(b[za]=d=++oc,d=Aa[d]={}),d[a]=c;else return d&&d[a]}function vb(b,a,c){var d=$(b,"data"),e=v(c),g=!e&&v(a),i=g&&!M(a);!d&&!i&&$(b,"data",d={});if(e)d[a]=c;else if(g)if(i)return d&&d[a];else y(d,a);else return d}function Ba(b,a){return(" "+b.className+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" ")>-1}function wb(b,a){a&&m(a.split(" "),function(a){b.className=Q((" "+b.className+" ").replace(/[\n\t]/g," ").replace(" "+Q(a)+" "," "))})}function xb(b,a){a&&m(a.split(" "),
function(a){if(!Ba(b,a))b.className=Q(b.className+" "+Q(a))})}function cb(b,a){if(a)for(var a=!a.nodeName&&v(a.length)&&!oa(a)?a:[a],c=0;c<a.length;c++)b.push(a[c])}function yb(b,a){return Ca(b,"$"+(a||"ngController")+"Controller")}function Ca(b,a,c){b=z(b);for(b[0].nodeType==9&&(b=b.find("html"));b.length;){if(c=b.data(a))return c;b=b.parent()}}function zb(b,a){var c=Da[a.toLowerCase()];return c&&Ab[b.nodeName]&&c}function pc(b,a){var c=function(c,e){if(!c.preventDefault)c.preventDefault=function(){c.returnValue=
!1};if(!c.stopPropagation)c.stopPropagation=function(){c.cancelBubble=!0};if(!c.target)c.target=c.srcElement||Y;if(t(c.defaultPrevented)){var g=c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;g.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented};m(a[e||c.type],function(a){a.call(b,c)});aa<=8?(c.preventDefault=null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};
c.elem=b;return c}function ga(b){var a=typeof b,c;if(a=="object"&&b!==null)if(typeof(c=b.$$hashKey)=="function")c=b.$$hashKey();else{if(c===p)c=b.$$hashKey=wa()}else c=b;return a+":"+c}function Ea(b){m(b,this.put,this)}function fb(){}function Bb(b){var a,c;if(typeof b=="function"){if(!(a=b.$inject))a=[],c=b.toString().replace(qc,""),c=c.match(rc),m(c[1].split(sc),function(b){b.replace(tc,function(b,c,d){a.push(d)})}),b.$inject=a}else I(b)?(c=b.length-1,qa(b[c],"fn"),a=b.slice(0,c)):qa(b,"fn",!0);
return a}function rb(b){function a(a){return function(b,c){if(M(b))m(b,nb(a));else return a(b,c)}}function c(a,b){if(L(b)||I(b))b=l.instantiate(b);if(!b.$get)throw u("Provider "+a+" must define $get factory method.");return k[a+f]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[];m(a,function(a){if(!j.get(a))if(j.put(a,!0),E(a)){var c=sa(a);b=b.concat(e(c.requires)).concat(c._runBlocks);try{for(var d=c._invokeQueue,c=0,f=d.length;c<f;c++){var h=d[c],g=h[0]=="$injector"?l:l.get(h[0]);g[h[1]].apply(g,
h[2])}}catch(n){throw n.message&&(n.message+=" from "+a),n;}}else if(L(a))try{b.push(l.invoke(a))}catch(i){throw i.message&&(i.message+=" from "+a),i;}else if(I(a))try{b.push(l.invoke(a))}catch(k){throw k.message&&(k.message+=" from "+String(a[a.length-1])),k;}else qa(a,"module")});return b}function g(a,b){function c(d){if(typeof d!=="string")throw u("Service name expected");if(a.hasOwnProperty(d)){if(a[d]===i)throw u("Circular dependency: "+h.join(" <- "));return a[d]}else try{return h.unshift(d),
a[d]=i,a[d]=b(d)}finally{h.shift()}}function d(a,b,e){var f=[],h=Bb(a),j,g,n;g=0;for(j=h.length;g<j;g++)n=h[g],f.push(e&&e.hasOwnProperty(n)?e[n]:c(n));a.$inject||(a=a[j]);switch(b?-1:f.length){case 0:return a();case 1:return a(f[0]);case 2:return a(f[0],f[1]);case 3:return a(f[0],f[1],f[2]);case 4:return a(f[0],f[1],f[2],f[3]);case 5:return a(f[0],f[1],f[2],f[3],f[4]);case 6:return a(f[0],f[1],f[2],f[3],f[4],f[5]);case 7:return a(f[0],f[1],f[2],f[3],f[4],f[5],f[6]);case 8:return a(f[0],f[1],f[2],
f[3],f[4],f[5],f[6],f[7]);case 9:return a(f[0],f[1],f[2],f[3],f[4],f[5],f[6],f[7],f[8]);case 10:return a(f[0],f[1],f[2],f[3],f[4],f[5],f[6],f[7],f[8],f[9]);default:return a.apply(b,f)}}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(I(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return M(e)?e:c},get:c,annotate:Bb}}var i={},f="Provider",h=[],j=new Ea,k={$provide:{provider:a(c),factory:a(d),service:a(function(a,b){return d(a,["$injector",function(a){return a.instantiate(b)}])}),
value:a(function(a,b){return d(a,H(b))}),constant:a(function(a,b){k[a]=b;o[a]=b}),decorator:function(a,b){var c=l.get(a+f),d=c.$get;c.$get=function(){var a=r.invoke(d,c);return r.invoke(b,null,{$delegate:a})}}}},l=g(k,function(){throw u("Unknown provider: "+h.join(" <- "));}),o={},r=o.$injector=g(o,function(a){a=l.get(a+f);return r.invoke(a.$get,a)});m(e(b),function(a){r.invoke(a||C)});return r}function uc(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",
function(a,c,d){function e(a){var b=null;m(a,function(a){!b&&D(a.nodeName)==="a"&&(b=a)});return b}function g(){var b=c.hash(),d;b?(d=i.getElementById(b))?d.scrollIntoView():(d=e(i.getElementsByName(b)))?d.scrollIntoView():b==="top"&&a.scrollTo(0,0):a.scrollTo(0,0)}var i=a.document;b&&d.$watch(function(){return c.hash()},function(){d.$evalAsync(g)});return g}]}function vc(b,a,c,d){function e(a){try{a.apply(null,ia.call(arguments,1))}finally{if(n--,n===0)for(;w.length;)try{w.pop()()}catch(b){c.error(b)}}}
function g(a,b){(function ea(){m(q,function(a){a()});x=b(ea,a)})()}function i(){X!=f.url()&&(X=f.url(),m(s,function(a){a(f.url())}))}var f=this,h=a[0],j=b.location,k=b.history,l=b.setTimeout,o=b.clearTimeout,r={};f.isMock=!1;var n=0,w=[];f.$$completeOutstandingRequest=e;f.$$incOutstandingRequestCount=function(){n++};f.notifyWhenNoOutstandingRequests=function(a){m(q,function(a){a()});n===0?a():w.push(a)};var q=[],x;f.addPollFn=function(a){t(x)&&g(100,l);q.push(a);return a};var X=j.href,A=a.find("base");
f.url=function(a,b){if(a){if(X!=a)return X=a,d.history?b?k.replaceState(null,"",a):(k.pushState(null,"",a),A.attr("href",A.attr("href"))):b?j.replace(a):j.href=a,f}else return j.href.replace(/%27/g,"'")};var s=[],J=!1;f.onUrlChange=function(a){J||(d.history&&z(b).bind("popstate",i),d.hashchange?z(b).bind("hashchange",i):f.addPollFn(i),J=!0);s.push(a);return a};f.baseHref=function(){var a=A.attr("href");return a?a.replace(/^https?\:\/\/[^\/]*/,""):a};var ba={},P="",K=f.baseHref();f.cookies=function(a,
b){var d,e,f,j;if(a)if(b===p)h.cookie=escape(a)+"=;path="+K+";expires=Thu, 01 Jan 1970 00:00:00 GMT";else{if(E(b))d=(h.cookie=escape(a)+"="+escape(b)+";path="+K).length+1,d>4096&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!")}else{if(h.cookie!==P){P=h.cookie;d=P.split("; ");ba={};for(f=0;f<d.length;f++)e=d[f],j=e.indexOf("="),j>0&&(ba[unescape(e.substring(0,j))]=unescape(e.substring(j+1)))}return ba}};f.defer=function(a,b){var c;n++;c=l(function(){delete r[c];
e(a)},b||0);r[c]=!0;return c};f.defer.cancel=function(a){return r[a]?(delete r[a],o(a),e(C),!0):!1}}function wc(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new vc(b,d,a,c)}]}function xc(){this.$get=function(){function b(b,d){function e(a){if(a!=l){if(o){if(o==a)o=a.n}else o=a;g(a.n,a.p);g(a,l);l=a;l.n=null}}function g(a,b){if(a!=b){if(a)a.p=b;if(b)b.n=a}}if(b in a)throw u("cacheId "+b+" taken");var i=0,f=y({},d,{id:b}),h={},j=d&&d.capacity||Number.MAX_VALUE,k={},
l=null,o=null;return a[b]={put:function(a,b){var c=k[a]||(k[a]={key:a});e(c);t(b)||(a in h||i++,h[a]=b,i>j&&this.remove(o.key))},get:function(a){var b=k[a];if(b)return e(b),h[a]},remove:function(a){var b=k[a];if(b){if(b==l)l=b.p;if(b==o)o=b.n;g(b.n,b.p);delete k[a];delete h[a];i--}},removeAll:function(){h={};i=0;k={};l=o=null},destroy:function(){k=f=h=null;delete a[b]},info:function(){return y({},f,{size:i})}}}var a={};b.info=function(){var b={};m(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};
return b}}function yc(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function Cb(b){var a={},c="Directive",d=/^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,e=/(([\d\w\-_]+)(?:\:([^;]+))?;?)/,g="Template must have exactly one root element. was: ";this.directive=function f(d,e){E(d)?(ab(e,"directive"),a.hasOwnProperty(d)||(a[d]=[],b.factory(d+c,["$injector","$exceptionHandler",function(b,c){var e=[];m(a[d],function(a){try{var f=b.invoke(a);if(L(f))f={compile:H(f)};else if(!f.compile&&f.link)f.compile=
H(f.link);f.priority=f.priority||0;f.name=f.name||d;f.require=f.require||f.controller&&f.name;f.restrict=f.restrict||"A";e.push(f)}catch(j){c(j)}});return e}])),a[d].push(e)):m(d,nb(f));return this};this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope",function(b,h,j,k,l,o,r,n){function w(a,b,c){a instanceof z||(a=z(a));m(a,function(b,c){b.nodeType==3&&b.nodeValue.match(/\S+/)&&(a[c]=z(b).wrap("<span></span>").parent()[0])});var d=x(a,
b,a,c);return function(b,c){ab(b,"scope");var e=c?ta.clone.call(a):a;e.data("$scope",b);q(e,"ng-scope");c&&c(e,b);d&&d(b,e,e);return e}}function q(a,b){try{a.addClass(b)}catch(c){}}function x(a,b,c,d){function e(a,c,d,j){var g,h,k,n,o,l,r,q=[];o=0;for(l=c.length;o<l;o++)q.push(c[o]);r=o=0;for(l=f.length;o<l;r++)h=q[r],c=f[o++],g=f[o++],c?(c.scope?(k=a.$new(M(c.scope)),z(h).data("$scope",k)):k=a,(n=c.transclude)||!j&&b?c(g,k,h,d,function(b){return function(c){var d=a.$new();return b(d,c).bind("$destroy",
Va(d,d.$destroy))}}(n||b)):c(g,k,h,p,j)):g&&g(a,h.childNodes,p,j)}for(var f=[],j,g,h,k=0;k<a.length;k++)g=new ea,j=X(a[k],[],g,d),g=(j=j.length?A(j,a[k],g,b,c):null)&&j.terminal||!a[k].childNodes.length?null:x(a[k].childNodes,j?j.transclude:b),f.push(j),f.push(g),h=h||j||g;return h?e:null}function X(a,b,c,f){var j=c.$attr,g;switch(a.nodeType){case 1:s(b,fa(Db(a).toLowerCase()),"E",f);var h,k,n;g=a.attributes;for(var o=0,l=g&&g.length;o<l;o++)if(h=g[o],h.specified)k=h.name,n=fa(k.toLowerCase()),j[n]=
k,c[n]=h=Q(aa&&k=="href"?decodeURIComponent(a.getAttribute(k,2)):h.value),zb(a,n)&&(c[n]=!0),V(a,b,h,n),s(b,n,"A",f);a=a.className;if(E(a)&&a!=="")for(;g=e.exec(a);)n=fa(g[2]),s(b,n,"C",f)&&(c[n]=Q(g[3])),a=a.substr(g.index+g[0].length);break;case 3:G(b,a.nodeValue);break;case 8:try{if(g=d.exec(a.nodeValue))n=fa(g[1]),s(b,n,"M",f)&&(c[n]=Q(g[2]))}catch(r){}}b.sort(P);return b}function A(a,b,c,d,e){function f(a,b){if(a)a.require=B.require,l.push(a);if(b)b.require=B.require,ca.push(b)}function h(a,
b){var c,d="data",e=!1;if(E(a)){for(;(c=a.charAt(0))=="^"||c=="?";)a=a.substr(1),c=="^"&&(d="inheritedData"),e=e||c=="?";c=b[d]("$"+a+"Controller");if(!c&&!e)throw u("No controller: "+a);}else I(a)&&(c=[],m(a,function(a){c.push(h(a,b))}));return c}function k(a,d,e,f,g){var n,q,w,J,Ga;n=b===e?c:hc(c,new ea(z(e),c.$attr));q=n.$$element;if(A){var x=/^\s*([@=&])\s*(\w*)\s*$/,s=d.$parent||d;m(A.scope,function(a,b){var c=a.match(x)||[],e=c[2]||b,f,g,j;switch(c[1]){case "@":n.$observe(e,function(a){d[b]=
a});n.$$observers[e].$$scope=s;break;case "=":g=o(n[e]);j=g.assign||function(){f=d[b]=g(s);throw u(Eb+n[e]+" (directive: "+A.name+")");};f=d[b]=g(s);d.$watch(function(){var a=g(s);a!==d[b]&&(a!==f?f=d[b]=a:j(s,a=f=d[b]));return a});break;case "&":g=o(n[e]);d[b]=function(a){return g(s,a)};break;default:throw u("Invalid isolate scope definition for directive "+A.name+": "+a);}})}t&&m(t,function(a){var b={$scope:d,$element:q,$attrs:n,$transclude:g};Ga=a.controller;Ga=="@"&&(Ga=n[a.name]);q.data("$"+
a.name+"Controller",r(Ga,b))});f=0;for(w=l.length;f<w;f++)try{J=l[f],J(d,q,n,J.require&&h(J.require,q))}catch(X){j(X,pa(q))}a&&a(d,e.childNodes,p,g);f=0;for(w=ca.length;f<w;f++)try{J=ca[f],J(d,q,n,J.require&&h(J.require,q))}catch(Ha){j(Ha,pa(q))}}for(var n=-Number.MAX_VALUE,l=[],ca=[],x=null,A=null,P=null,s=c.$$element=z(b),B,G,V,C,v=d,t,y,W,D=0,F=a.length;D<F;D++){B=a[D];V=p;if(n>B.priority)break;if(W=B.scope)K("isolated scope",A,B,s),M(W)&&(q(s,"ng-isolate-scope"),A=B),q(s,"ng-scope"),x=x||B;G=
B.name;if(W=B.controller)t=t||{},K("'"+G+"' controller",t[G],B,s),t[G]=B;if(W=B.transclude)K("transclusion",C,B,s),C=B,n=B.priority,W=="element"?(V=z(b),s=c.$$element=z(Y.createComment(" "+G+": "+c[G]+" ")),b=s[0],Fa(e,z(V[0]),b),v=w(V,d,n)):(V=z(db(b)).contents(),s.html(""),v=w(V,d));if(W=B.template)if(K("template",P,B,s),P=B,W=Ha(W),B.replace){V=z("<div>"+Q(W)+"</div>").contents();b=V[0];if(V.length!=1||b.nodeType!==1)throw new u(g+W);Fa(e,s,b);G={$attr:{}};a=a.concat(X(b,a.splice(D+1,a.length-
(D+1)),G));J(c,G);F=a.length}else s.html(W);if(B.templateUrl)K("template",P,B,s),P=B,k=ba(a.splice(D,a.length-D),k,s,c,e,B.replace,v),F=a.length;else if(B.compile)try{y=B.compile(s,c,v),L(y)?f(null,y):y&&f(y.pre,y.post)}catch(H){j(H,pa(s))}if(B.terminal)k.terminal=!0,n=Math.max(n,B.priority)}k.scope=x&&x.scope;k.transclude=C&&v;return k}function s(d,e,g,h){var k=!1;if(a.hasOwnProperty(e))for(var n,e=b.get(e+c),o=0,l=e.length;o<l;o++)try{if(n=e[o],(h===p||h>n.priority)&&n.restrict.indexOf(g)!=-1)d.push(n),
k=!0}catch(r){j(r)}return k}function J(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;m(a,function(d,e){e.charAt(0)!="$"&&(b[e]&&(d+=(e==="style"?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});m(b,function(b,f){f=="class"?(q(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):f=="style"?e.attr("style",e.attr("style")+";"+b):f.charAt(0)!="$"&&!a.hasOwnProperty(f)&&(a[f]=b,d[f]=c[f])})}function ba(a,b,c,d,e,f,j){var h=[],n,o,r=c[0],q=a.shift(),w=y({},q,{controller:null,templateUrl:null,transclude:null,scope:null});
c.html("");k.get(q.templateUrl,{cache:l}).success(function(k){var l,q,k=Ha(k);if(f){q=z("<div>"+Q(k)+"</div>").contents();l=q[0];if(q.length!=1||l.nodeType!==1)throw new u(g+k);k={$attr:{}};Fa(e,c,l);X(l,a,k);J(d,k)}else l=r,c.html(k);a.unshift(w);n=A(a,c,d,j);for(o=x(c.contents(),j);h.length;){var ca=h.pop(),k=h.pop();q=h.pop();var s=h.pop(),m=l;q!==r&&(m=db(l),Fa(k,z(q),m));n(function(){b(o,s,m,e,ca)},s,m,e,ca)}h=null}).error(function(a,b,c,d){throw u("Failed to load template: "+d.url);});return function(a,
c,d,e,f){h?(h.push(c),h.push(d),h.push(e),h.push(f)):n(function(){b(o,c,d,e,f)},c,d,e,f)}}function P(a,b){return b.priority-a.priority}function K(a,b,c,d){if(b)throw u("Multiple directives ["+b.name+", "+c.name+"] asking for "+a+" on: "+pa(d));}function G(a,b){var c=h(b,!0);c&&a.push({priority:0,compile:H(function(a,b){var d=b.parent(),e=d.data("$binding")||[];e.push(c);q(d.data("$binding",e),"ng-binding");a.$watch(c,function(a){b[0].nodeValue=a})})})}function V(a,b,c,d){var e=h(c,!0);e&&b.push({priority:100,
compile:H(function(a,b,c){b=c.$$observers||(c.$$observers={});d==="class"&&(e=h(c[d],!0));c[d]=p;(b[d]||(b[d]=[])).$$inter=!0;(c.$$observers&&c.$$observers[d].$$scope||a).$watch(e,function(a){c.$set(d,a)})})})}function Fa(a,b,c){var d=b[0],e=d.parentNode,f,g;if(a){f=0;for(g=a.length;f<g;f++)if(a[f]==d){a[f]=c;break}}e&&e.replaceChild(c,d);c[z.expando]=d[z.expando];b[0]=c}var ea=function(a,b){this.$$element=a;this.$attr=b||{}};ea.prototype={$normalize:fa,$set:function(a,b,c,d){var e=zb(this.$$element[0],
a),f=this.$$observers;e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=d:(d=this.$attr[a])||(this.$attr[a]=d=$a(a,"-"));c!==!1&&(b===null||b===p?this.$$element.removeAttr(d):this.$$element.attr(d,b));f&&m(f[a],function(a){try{a(b)}catch(c){j(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);n.$evalAsync(function(){e.$$inter||b(c[a])});return b}};var C=h.startSymbol(),ca=h.endSymbol(),Ha=C=="{{"||ca=="}}"?ma:function(a){return a.replace(/\{\{/g,
C).replace(/}}/g,ca)};return w}]}function fa(b){return sb(b.replace(zc,""))}function Ac(){var b={};this.register=function(a,c){M(a)?y(b,a):b[a]=c};this.$get=["$injector","$window",function(a,c){return function(d,e){if(E(d)){var g=d,d=b.hasOwnProperty(g)?b[g]:gb(e.$scope,g,!0)||gb(c,g,!0);qa(d,g,!0)}return a.instantiate(d,e)}}]}function Bc(){this.$get=["$window",function(b){return z(b.document)}]}function Cc(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Dc(){var b=
"{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse",function(c){function d(d,f){for(var h,j,k=0,l=[],o=d.length,r=!1,n=[];k<o;)(h=d.indexOf(b,k))!=-1&&(j=d.indexOf(a,h+e))!=-1?(k!=h&&l.push(d.substring(k,h)),l.push(k=c(r=d.substring(h+e,j))),k.exp=r,k=j+g,r=!0):(k!=o&&l.push(d.substring(k)),k=o);if(!(o=l.length))l.push(""),o=1;if(!f||r)return n.length=o,k=function(a){for(var b=0,c=o,d;b<c;b++){if(typeof(d=l[b])=="function")d=
d(a),d==null||d==p?d="":typeof d!="string"&&(d=da(d));n[b]=d}return n.join("")},k.exp=d,k.parts=l,k}var e=b.length,g=a.length;d.startSymbol=function(){return b};d.endSymbol=function(){return a};return d}]}function Fb(b){for(var b=b.split("/"),a=b.length;a--;)b[a]=Za(b[a]);return b.join("/")}function ua(b,a){var c=Gb.exec(b),c={protocol:c[1],host:c[3],port:F(c[5])||Hb[c[1]]||null,path:c[6]||"/",search:c[8],hash:c[10]};if(a)a.$$protocol=c.protocol,a.$$host=c.host,a.$$port=c.port;return c}function ka(b,
a,c){return b+"://"+a+(c==Hb[b]?"":":"+c)}function Ec(b,a,c){var d=ua(b);return decodeURIComponent(d.path)!=a||t(d.hash)||d.hash.indexOf(c)!==0?b:ka(d.protocol,d.host,d.port)+a.substr(0,a.lastIndexOf("/"))+d.hash.substr(c.length)}function Fc(b,a,c){var d=ua(b);if(decodeURIComponent(d.path)==a)return b;else{var e=d.search&&"?"+d.search||"",g=d.hash&&"#"+d.hash||"",i=a.substr(0,a.lastIndexOf("/")),f=d.path.substr(i.length);if(d.path.indexOf(i)!==0)throw u('Invalid url "'+b+'", missing path prefix "'+
i+'" !');return ka(d.protocol,d.host,d.port)+a+"#"+c+f+e+g}}function hb(b,a,c){a=a||"";this.$$parse=function(b){var c=ua(b,this);if(c.path.indexOf(a)!==0)throw u('Invalid url "'+b+'", missing path prefix "'+a+'" !');this.$$path=decodeURIComponent(c.path.substr(a.length));this.$$search=Xa(c.search);this.$$hash=c.hash&&decodeURIComponent(c.hash)||"";this.$$compose()};this.$$compose=function(){var b=pb(this.$$search),c=this.$$hash?"#"+Za(this.$$hash):"";this.$$url=Fb(this.$$path)+(b?"?"+b:"")+c;this.$$absUrl=
ka(this.$$protocol,this.$$host,this.$$port)+a+this.$$url};this.$$rewriteAppUrl=function(a){if(a.indexOf(c)==0)return a};this.$$parse(b)}function Ia(b,a,c){var d;this.$$parse=function(b){var c=ua(b,this);if(c.hash&&c.hash.indexOf(a)!==0)throw u('Invalid url "'+b+'", missing hash prefix "'+a+'" !');d=c.path+(c.search?"?"+c.search:"");c=Gc.exec((c.hash||"").substr(a.length));this.$$path=c[1]?(c[1].charAt(0)=="/"?"":"/")+decodeURIComponent(c[1]):"";this.$$search=Xa(c[3]);this.$$hash=c[5]&&decodeURIComponent(c[5])||
"";this.$$compose()};this.$$compose=function(){var b=pb(this.$$search),c=this.$$hash?"#"+Za(this.$$hash):"";this.$$url=Fb(this.$$path)+(b?"?"+b:"")+c;this.$$absUrl=ka(this.$$protocol,this.$$host,this.$$port)+d+(this.$$url?"#"+a+this.$$url:"")};this.$$rewriteAppUrl=function(a){if(a.indexOf(c)==0)return a};this.$$parse(b)}function Ib(b,a,c,d){Ia.apply(this,arguments);this.$$rewriteAppUrl=function(b){if(b.indexOf(c)==0)return c+d+"#"+a+b.substr(c.length)}}function Ja(b){return function(){return this[b]}}
function Jb(b,a){return function(c){if(t(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Hc(){var b="",a=!1;this.hashPrefix=function(a){return v(a)?(b=a,this):b};this.html5Mode=function(b){return v(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,g){function i(a){c.$broadcast("$locationChangeSuccess",f.absUrl(),a)}var f,h,j,k=d.url(),l=ua(k);a?(h=d.baseHref()||"/",j=h.substr(0,h.lastIndexOf("/")),l=ka(l.protocol,l.host,l.port)+j+"/",
f=e.history?new hb(Ec(k,h,b),j,l):new Ib(Fc(k,h,b),b,l,h.substr(j.length+1))):(l=ka(l.protocol,l.host,l.port)+(l.path||"")+(l.search?"?"+l.search:"")+"#"+b+"/",f=new Ia(k,b,l));g.bind("click",function(a){if(!a.ctrlKey&&!(a.metaKey||a.which==2)){for(var b=z(a.target);D(b[0].nodeName)!=="a";)if(b[0]===g[0]||!(b=b.parent())[0])return;var d=b.prop("href"),e=f.$$rewriteAppUrl(d);d&&!b.attr("target")&&e&&(f.$$parse(e),c.$apply(),a.preventDefault(),T.angular["ff-684208-preventDefault"]=!0)}});f.absUrl()!=
k&&d.url(f.absUrl(),!0);d.onUrlChange(function(a){f.absUrl()!=a&&(c.$evalAsync(function(){var b=f.absUrl();f.$$parse(a);i(b)}),c.$$phase||c.$digest())});var o=0;c.$watch(function(){var a=d.url(),b=f.$$replace;if(!o||a!=f.absUrl())o++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",f.absUrl(),a).defaultPrevented?f.$$parse(a):(d.url(f.absUrl(),b),i(a))});f.$$replace=!1;return o});return f}]}function Ic(){this.$get=["$window",function(b){function a(a){a instanceof u&&(a.stack?a=a.message&&
a.stack.indexOf(a.message)===-1?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function c(c){var e=b.console||{},g=e[c]||e.log||C;return g.apply?function(){var b=[];m(arguments,function(c){b.push(a(c))});return g.apply(e,b)}:function(a,b){g(a,b)}}return{log:c("log"),warn:c("warn"),info:c("info"),error:c("error")}}]}function Jc(b,a){function c(a){return a.indexOf(q)!=-1}function d(){return n+1<b.length?b.charAt(n+1):!1}function e(a){return"0"<=
a&&a<="9"}function g(a){return a==" "||a=="\r"||a=="\t"||a=="\n"||a=="\u000b"||a=="\u00a0"}function i(a){return"a"<=a&&a<="z"||"A"<=a&&a<="Z"||"_"==a||a=="$"}function f(a){return a=="-"||a=="+"||e(a)}function h(a,c,d){d=d||n;throw u("Lexer Error: "+a+" at column"+(v(c)?"s "+c+"-"+n+" ["+b.substring(c,d)+"]":" "+d)+" in expression ["+b+"].");}function j(){for(var a="",c=n;n<b.length;){var j=D(b.charAt(n));if(j=="."||e(j))a+=j;else{var g=d();if(j=="e"&&f(g))a+=j;else if(f(j)&&g&&e(g)&&a.charAt(a.length-
1)=="e")a+=j;else if(f(j)&&(!g||!e(g))&&a.charAt(a.length-1)=="e")h("Invalid exponent");else break}n++}a*=1;o.push({index:c,text:a,json:!0,fn:function(){return a}})}function k(){for(var c="",d=n,f,j,h;n<b.length;){var k=b.charAt(n);if(k=="."||i(k)||e(k))k=="."&&(f=n),c+=k;else break;n++}if(f)for(j=n;j<b.length;){k=b.charAt(j);if(k=="("){h=c.substr(f-d+1);c=c.substr(0,f-d);n=j;break}if(g(k))j++;else break}d={index:d,text:c};if(Ka.hasOwnProperty(c))d.fn=d.json=Ka[c];else{var l=Kb(c,a);d.fn=y(function(a,
b){return l(a,b)},{assign:function(a,b){return Lb(a,c,b)}})}o.push(d);h&&(o.push({index:f,text:".",json:!1}),o.push({index:f+1,text:h,json:!1}))}function l(a){var c=n;n++;for(var d="",e=a,f=!1;n<b.length;){var j=b.charAt(n);e+=j;if(f)j=="u"?(j=b.substring(n+1,n+5),j.match(/[\da-f]{4}/i)||h("Invalid unicode escape [\\u"+j+"]"),n+=4,d+=String.fromCharCode(parseInt(j,16))):(f=Kc[j],d+=f?f:j),f=!1;else if(j=="\\")f=!0;else if(j==a){n++;o.push({index:c,text:e,string:d,json:!0,fn:function(){return d}});
return}else d+=j;n++}h("Unterminated quote",c)}for(var o=[],r,n=0,w=[],q,x=":";n<b.length;){q=b.charAt(n);if(c("\"'"))l(q);else if(e(q)||c(".")&&e(d()))j();else if(i(q)){if(k(),"{,".indexOf(x)!=-1&&w[0]=="{"&&(r=o[o.length-1]))r.json=r.text.indexOf(".")==-1}else if(c("(){}[].,;:"))o.push({index:n,text:q,json:":[,".indexOf(x)!=-1&&c("{[")||c("}]:,")}),c("{[")&&w.unshift(q),c("}]")&&w.shift(),n++;else if(g(q)){n++;continue}else{var m=q+d(),A=Ka[q],s=Ka[m];s?(o.push({index:n,text:m,fn:s}),n+=2):A?(o.push({index:n,
text:q,fn:A,json:"[,:".indexOf(x)!=-1&&c("+-")}),n+=1):h("Unexpected next character ",n,n+1)}x=q}return o}function Lc(b,a,c,d){function e(a,c){throw u("Syntax Error: Token '"+c.text+"' "+a+" at column "+(c.index+1)+" of the expression ["+b+"] starting at ["+b.substring(c.index)+"].");}function g(){if(K.length===0)throw u("Unexpected end of expression: "+b);return K[0]}function i(a,b,c,d){if(K.length>0){var e=K[0],f=e.text;if(f==a||f==b||f==c||f==d||!a&&!b&&!c&&!d)return e}return!1}function f(b,c,
d,f){return(b=i(b,c,d,f))?(a&&!b.json&&e("is not valid json",b),K.shift(),b):!1}function h(a){f(a)||e("is unexpected, expecting ["+a+"]",i())}function j(a,b){return function(c,d){return a(c,d,b)}}function k(a,b,c){return function(d,e){return b(d,e,a,c)}}function l(){for(var a=[];;)if(K.length>0&&!i("}",")",";","]")&&a.push(v()),!f(";"))return a.length==1?a[0]:function(b,c){for(var d,e=0;e<a.length;e++){var f=a[e];f&&(d=f(b,c))}return d}}function o(){for(var a=f(),b=c(a.text),d=[];;)if(a=f(":"))d.push(G());
else{var e=function(a,c,e){for(var e=[e],f=0;f<d.length;f++)e.push(d[f](a,c));return b.apply(a,e)};return function(){return e}}}function r(){for(var a=n(),b;;)if(b=f("||"))a=k(a,b.fn,n());else return a}function n(){var a=w(),b;if(b=f("&&"))a=k(a,b.fn,n());return a}function w(){var a=q(),b;if(b=f("==","!="))a=k(a,b.fn,w());return a}function q(){var a;a=x();for(var b;b=f("+","-");)a=k(a,b.fn,x());if(b=f("<",">","<=",">="))a=k(a,b.fn,q());return a}function x(){for(var a=m(),b;b=f("*","/","%");)a=k(a,
b.fn,m());return a}function m(){var a;return f("+")?A():(a=f("-"))?k(ba,a.fn,m()):(a=f("!"))?j(a.fn,m()):A()}function A(){var a;if(f("("))a=v(),h(")");else if(f("["))a=s();else if(f("{"))a=J();else{var b=f();(a=b.fn)||e("not a primary expression",b)}for(var c;b=f("(","[",".");)b.text==="("?(a=z(a,c),c=null):b.text==="["?(c=a,a=ea(a)):b.text==="."?(c=a,a=t(a)):e("IMPOSSIBLE");return a}function s(){var a=[];if(g().text!="]"){do a.push(G());while(f(","))}h("]");return function(b,c){for(var d=[],e=0;e<
a.length;e++)d.push(a[e](b,c));return d}}function J(){var a=[];if(g().text!="}"){do{var b=f(),b=b.string||b.text;h(":");var c=G();a.push({key:b,value:c})}while(f(","))}h("}");return function(b,c){for(var d={},e=0;e<a.length;e++){var f=a[e],j=f.value(b,c);d[f.key]=j}return d}}var ba=H(0),P,K=Jc(b,d),G=function(){var a=r(),c,d;return(d=f("="))?(a.assign||e("implies assignment but ["+b.substring(0,d.index)+"] can not be assigned to",d),c=r(),function(b,d){return a.assign(b,c(b,d),d)}):a},z=function(a,
b){var c=[];if(g().text!=")"){do c.push(G());while(f(","))}h(")");return function(d,e){for(var f=[],j=b?b(d,e):d,h=0;h<c.length;h++)f.push(c[h](d,e));h=a(d,e)||C;return h.apply?h.apply(j,f):h(f[0],f[1],f[2],f[3],f[4])}},t=function(a){var b=f().text,c=Kb(b,d);return y(function(b,d){return c(a(b,d),d)},{assign:function(c,d,e){return Lb(a(c,e),b,d)}})},ea=function(a){var b=G();h("]");return y(function(c,d){var e=a(c,d),f=b(c,d),j;if(!e)return p;if((e=e[f])&&e.then){j=e;if(!("$$v"in e))j.$$v=p,j.then(function(a){j.$$v=
a});e=e.$$v}return e},{assign:function(c,d,e){return a(c,e)[b(c,e)]=d}})},v=function(){for(var a=G(),b;;)if(b=f("|"))a=k(a,b.fn,o());else return a};a?(G=r,z=t=ea=v=function(){e("is not valid json",{text:b,index:0})},P=A()):P=l();K.length!==0&&e("is an unexpected token",K[0]);return P}function Lb(b,a,c){for(var a=a.split("."),d=0;a.length>1;d++){var e=a.shift(),g=b[e];g||(g={},b[e]=g);b=g}return b[a.shift()]=c}function gb(b,a,c){if(!a)return b;for(var a=a.split("."),d,e=b,g=a.length,i=0;i<g;i++)d=
a[i],b&&(b=(e=b)[d]);return!c&&L(b)?Va(e,b):b}function Mb(b,a,c,d,e){return function(g,i){var f=i&&i.hasOwnProperty(b)?i:g,h;if(f===null||f===p)return f;if((f=f[b])&&f.then){if(!("$$v"in f))h=f,h.$$v=p,h.then(function(a){h.$$v=a});f=f.$$v}if(!a||f===null||f===p)return f;if((f=f[a])&&f.then){if(!("$$v"in f))h=f,h.$$v=p,h.then(function(a){h.$$v=a});f=f.$$v}if(!c||f===null||f===p)return f;if((f=f[c])&&f.then){if(!("$$v"in f))h=f,h.$$v=p,h.then(function(a){h.$$v=a});f=f.$$v}if(!d||f===null||f===p)return f;
if((f=f[d])&&f.then){if(!("$$v"in f))h=f,h.$$v=p,h.then(function(a){h.$$v=a});f=f.$$v}if(!e||f===null||f===p)return f;if((f=f[e])&&f.then){if(!("$$v"in f))h=f,h.$$v=p,h.then(function(a){h.$$v=a});f=f.$$v}return f}}function Kb(b,a){if(ib.hasOwnProperty(b))return ib[b];var c=b.split("."),d=c.length,e;if(a)e=d<6?Mb(c[0],c[1],c[2],c[3],c[4]):function(a,b){var e=0,j;do j=Mb(c[e++],c[e++],c[e++],c[e++],c[e++])(a,b),b=p,a=j;while(e<d);return j};else{var g="var l, fn, p;\n";m(c,function(a,b){g+="if(s === null || s === undefined) return s;\nl=s;\ns="+
(b?"s":'((k&&k.hasOwnProperty("'+a+'"))?k:s)')+'["'+a+'"];\nif (s && s.then) {\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n'});g+="return s;";e=Function("s","k",g);e.toString=function(){return g}}return ib[b]=e}function Mc(){var b={};this.$get=["$filter","$sniffer",function(a,c){return function(d){switch(typeof d){case "string":return b.hasOwnProperty(d)?b[d]:b[d]=Lc(d,!1,a,c.csp);case "function":return d;default:return C}}}]}function Nc(){this.$get=
["$rootScope","$exceptionHandler",function(b,a){return Oc(function(a){b.$evalAsync(a)},a)}]}function Oc(b,a){function c(a){return a}function d(a){return i(a)}var e=function(){var f=[],h,j;return j={resolve:function(a){if(f){var c=f;f=p;h=g(a);c.length&&b(function(){for(var a,b=0,d=c.length;b<d;b++)a=c[b],h.then(a[0],a[1])})}},reject:function(a){j.resolve(i(a))},promise:{then:function(b,j){var g=e(),i=function(d){try{g.resolve((b||c)(d))}catch(e){a(e),g.reject(e)}},n=function(b){try{g.resolve((j||
d)(b))}catch(c){a(c),g.reject(c)}};f?f.push([i,n]):h.then(i,n);return g.promise}}}},g=function(a){return a&&a.then?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},i=function(a){return{then:function(c,j){var g=e();b(function(){g.resolve((j||d)(a))});return g.promise}}};return{defer:e,reject:i,when:function(f,h,j){var k=e(),l,o=function(b){try{return(h||c)(b)}catch(d){return a(d),i(d)}},r=function(b){try{return(j||d)(b)}catch(c){return a(c),i(c)}};b(function(){g(f).then(function(a){l||
(l=!0,k.resolve(g(a).then(o,r)))},function(a){l||(l=!0,k.resolve(r(a)))})});return k.promise},all:function(a){var b=e(),c=a.length,d=[];c?m(a,function(a,e){g(a).then(function(a){e in d||(d[e]=a,--c||b.resolve(d))},function(a){e in d||b.reject(a)})}):b.resolve(d);return b.promise}}}function Pc(){var b={};this.when=function(a,c){b[a]=y({reloadOnSearch:!0},c);if(a){var d=a[a.length-1]=="/"?a.substr(0,a.length-1):a+"/";b[d]={redirectTo:a}}return this};this.otherwise=function(a){this.when(null,a);return this};
this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache",function(a,c,d,e,g,i,f){function h(a,b){for(var b="^"+b.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")+"$",c="",d=[],e={},f=/:(\w+)/g,j,g=0;(j=f.exec(b))!==null;)c+=b.slice(g,j.index),c+="([^\\/]*)",d.push(j[1]),g=f.lastIndex;c+=b.substr(g);var h=a.match(RegExp(c));h&&m(d,function(a,b){e[a]=h[b+1]});return h?e:null}function j(){var b=k(),j=r.current;if(b&&j&&b.$route===j.$route&&ha(b.pathParams,j.pathParams)&&!b.reloadOnSearch&&
!o)j.params=b.params,U(j.params,d),a.$broadcast("$routeUpdate",j);else if(b||j)o=!1,a.$broadcast("$routeChangeStart",b,j),(r.current=b)&&b.redirectTo&&(E(b.redirectTo)?c.path(l(b.redirectTo,b.params)).search(b.params).replace():c.url(b.redirectTo(b.pathParams,c.path(),c.search())).replace()),e.when(b).then(function(){if(b){var a=[],c=[],d;m(b.resolve||{},function(b,d){a.push(d);c.push(E(b)?g.get(b):g.invoke(b))});if(!v(d=b.template))if(v(d=b.templateUrl))d=i.get(d,{cache:f}).then(function(a){return a.data});
v(d)&&(a.push("$template"),c.push(d));return e.all(c).then(function(b){var c={};m(b,function(b,d){c[a[d]]=b});return c})}}).then(function(c){if(b==r.current){if(b)b.locals=c,U(b.params,d);a.$broadcast("$routeChangeSuccess",b,j)}},function(c){b==r.current&&a.$broadcast("$routeChangeError",b,j,c)})}function k(){var a,d;m(b,function(b,e){if(!d&&(a=h(c.path(),e)))d=xa(b,{params:y({},c.search(),a),pathParams:a}),d.$route=b});return d||b[null]&&xa(b[null],{params:{},pathParams:{}})}function l(a,b){var c=
[];m((a||"").split(":"),function(a,d){if(d==0)c.push(a);else{var e=a.match(/(\w+)(.*)/),f=e[1];c.push(b[f]);c.push(e[2]||"");delete b[f]}});return c.join("")}var o=!1,r={routes:b,reload:function(){o=!0;a.$evalAsync(j)}};a.$on("$locationChangeSuccess",j);return r}]}function Qc(){this.$get=H({})}function Rc(){var b=10;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse",function(a,c,d){function e(){this.$id=wa();this.$$phase=this.$parent=this.$$watchers=
this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;this.$$destroyed=!1;this.$$asyncQueue=[];this.$$listeners={}}function g(a){if(h.$$phase)throw u(h.$$phase+" already in progress");h.$$phase=a}function i(a,b){var c=d(a);qa(c,b);return c}function f(){}e.prototype={$new:function(a){if(L(a))throw u("API-CHANGE: Use $controller to instantiate controllers.");a?(a=new e,a.$root=this.$root):(a=function(){},a.prototype=this,a=new a,a.$id=wa());a["this"]=
a;a.$$listeners={};a.$parent=this;a.$$asyncQueue=[];a.$$watchers=a.$$nextSibling=a.$$childHead=a.$$childTail=null;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,c){var d=i(a,"watch"),e=this.$$watchers,g={fn:b,last:f,get:d,exp:a,eq:!!c};if(!L(b)){var h=i(b||C,"listener");g.fn=function(a,b,c){h(c)}}if(!e)e=this.$$watchers=[];e.unshift(g);return function(){Ua(e,g)}},$digest:function(){var a,
d,e,i,r,n,m,q=b,x,p=[],A,s;g("$digest");do{m=!1;x=this;do{for(r=x.$$asyncQueue;r.length;)try{x.$eval(r.shift())}catch(J){c(J)}if(i=x.$$watchers)for(n=i.length;n--;)try{if(a=i[n],(d=a.get(x))!==(e=a.last)&&!(a.eq?ha(d,e):typeof d=="number"&&typeof e=="number"&&isNaN(d)&&isNaN(e)))m=!0,a.last=a.eq?U(d):d,a.fn(d,e===f?d:e,x),q<5&&(A=4-q,p[A]||(p[A]=[]),s=L(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,s+="; newVal: "+da(d)+"; oldVal: "+da(e),p[A].push(s))}catch(ba){c(ba)}if(!(i=x.$$childHead||x!==
this&&x.$$nextSibling))for(;x!==this&&!(i=x.$$nextSibling);)x=x.$parent}while(x=i);if(m&&!q--)throw h.$$phase=null,u(b+" $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: "+da(p));}while(m||r.length);h.$$phase=null},$destroy:function(){if(!(h==this||this.$$destroyed)){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(a.$$childHead==this)a.$$childHead=this.$$nextSibling;if(a.$$childTail==this)a.$$childTail=this.$$prevSibling;if(this.$$prevSibling)this.$$prevSibling.$$nextSibling=
this.$$nextSibling;if(this.$$nextSibling)this.$$nextSibling.$$prevSibling=this.$$prevSibling;this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null}},$eval:function(a,b){return d(a)(this,b)},$evalAsync:function(a){this.$$asyncQueue.push(a)},$apply:function(a){try{return g("$apply"),this.$eval(a)}catch(b){c(b)}finally{h.$$phase=null;try{h.$digest()}catch(d){throw c(d),d;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);return function(){c[ya(c,
b)]=null}},$emit:function(a,b){var d=[],e,f=this,g=!1,h={name:a,targetScope:f,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},i=[h].concat(ia.call(arguments,1)),m,p;do{e=f.$$listeners[a]||d;h.currentScope=f;m=0;for(p=e.length;m<p;m++)if(e[m])try{if(e[m].apply(null,i),g)return h}catch(A){c(A)}else e.splice(m,1),m--,p--;f=f.$parent}while(f);return h},$broadcast:function(a,b){var d=this,e=this,f={name:a,targetScope:this,preventDefault:function(){f.defaultPrevented=
!0},defaultPrevented:!1},g=[f].concat(ia.call(arguments,1)),h,i;do{d=e;f.currentScope=d;e=d.$$listeners[a]||[];h=0;for(i=e.length;h<i;h++)if(e[h])try{e[h].apply(null,g)}catch(m){c(m)}else e.splice(h,1),h--,i--;if(!(e=d.$$childHead||d!==this&&d.$$nextSibling))for(;d!==this&&!(e=d.$$nextSibling);)d=d.$parent}while(d=e);return f}};var h=new e;return h}]}function Sc(){this.$get=["$window",function(b){var a={},c=F((/android (\d+)/.exec(D(b.navigator.userAgent))||[])[1]);return{history:!(!b.history||!b.history.pushState||
c<4),hashchange:"onhashchange"in b&&(!b.document.documentMode||b.document.documentMode>7),hasEvent:function(c){if(c=="input"&&aa==9)return!1;if(t(a[c])){var e=b.document.createElement("div");a[c]="on"+c in e}return a[c]},csp:!1}}]}function Tc(){this.$get=H(T)}function Nb(b){var a={},c,d,e;if(!b)return a;m(b.split("\n"),function(b){e=b.indexOf(":");c=D(Q(b.substr(0,e)));d=Q(b.substr(e+1));c&&(a[c]?a[c]+=", "+d:a[c]=d)});return a}function Ob(b){var a=M(b)?b:p;return function(c){a||(a=Nb(b));return c?
a[D(c)]||null:a}}function Pb(b,a,c){if(L(c))return c(b,a);m(c,function(c){b=c(b,a)});return b}function Uc(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d=this.defaults={transformResponse:[function(d){E(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=ob(d,!0)));return d}],transformRequest:[function(a){return M(a)&&Sa.apply(a)!=="[object File]"?da(a):a}],headers:{common:{Accept:"application/json, text/plain, */*","X-Requested-With":"XMLHttpRequest"},post:{"Content-Type":"application/json;charset=utf-8"},
put:{"Content-Type":"application/json;charset=utf-8"}}},e=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,h,j,k){function l(a){function c(a){var b=y({},a,{data:Pb(a.data,a.headers,f)});return 200<=a.status&&a.status<300?b:j.reject(b)}a.method=la(a.method);var e=a.transformRequest||d.transformRequest,f=a.transformResponse||d.transformResponse,h=d.headers,h=y({"X-XSRF-TOKEN":b.cookies()["XSRF-TOKEN"]},h.common,h[D(a.method)],
a.headers),e=Pb(a.data,Ob(h),e),g;t(a.data)&&delete h["Content-Type"];g=o(a,e,h);g=g.then(c,c);m(w,function(a){g=a(g)});g.success=function(b){g.then(function(c){b(c.data,c.status,c.headers,a)});return g};g.error=function(b){g.then(null,function(c){b(c.data,c.status,c.headers,a)});return g};return g}function o(b,c,d){function e(a,b,c){m&&(200<=a&&a<300?m.put(w,[a,b,Nb(c)]):m.remove(w));f(b,a,c);h.$apply()}function f(a,c,d){c=Math.max(c,0);(200<=c&&c<300?k.resolve:k.reject)({data:a,status:c,headers:Ob(d),
config:b})}function i(){var a=ya(l.pendingRequests,b);a!==-1&&l.pendingRequests.splice(a,1)}var k=j.defer(),o=k.promise,m,p,w=r(b.url,b.params);l.pendingRequests.push(b);o.then(i,i);b.cache&&b.method=="GET"&&(m=M(b.cache)?b.cache:n);if(m)if(p=m.get(w))if(p.then)return p.then(i,i),p;else I(p)?f(p[1],p[0],U(p[2])):f(p,200,{});else m.put(w,o);p||a(b.method,w,c,e,d,b.timeout,b.withCredentials);return o}function r(a,b){if(!b)return a;var c=[];fc(b,function(a,b){a==null||a==p||(M(a)&&(a=da(a)),c.push(encodeURIComponent(b)+
"="+encodeURIComponent(a)))});return a+(a.indexOf("?")==-1?"?":"&")+c.join("&")}var n=c("$http"),w=[];m(e,function(a){w.push(E(a)?k.get(a):k.invoke(a))});l.pendingRequests=[];(function(a){m(arguments,function(a){l[a]=function(b,c){return l(y(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){m(arguments,function(a){l[a]=function(b,c,d){return l(y(d||{},{method:a,url:b,data:c}))}})})("post","put");l.defaults=d;return l}]}function Vc(){this.$get=["$browser","$window","$document",
function(b,a,c){return Wc(b,Xc,b.defer,a.angular.callbacks,c[0],a.location.protocol.replace(":",""))}]}function Wc(b,a,c,d,e,g){function i(a,b){var c=e.createElement("script"),d=function(){e.body.removeChild(c);b&&b()};c.type="text/javascript";c.src=a;aa?c.onreadystatechange=function(){/loaded|complete/.test(c.readyState)&&d()}:c.onload=c.onerror=d;e.body.appendChild(c)}return function(e,h,j,k,l,o,r){function n(a,c,d,e){c=(h.match(Gb)||["",g])[1]=="file"?d?200:404:c;a(c==1223?204:c,d,e);b.$$completeOutstandingRequest(C)}
b.$$incOutstandingRequestCount();h=h||b.url();if(D(e)=="jsonp"){var p="_"+(d.counter++).toString(36);d[p]=function(a){d[p].data=a};i(h.replace("JSON_CALLBACK","angular.callbacks."+p),function(){d[p].data?n(k,200,d[p].data):n(k,-2);delete d[p]})}else{var q=new a;q.open(e,h,!0);m(l,function(a,b){a&&q.setRequestHeader(b,a)});var x;q.onreadystatechange=function(){q.readyState==4&&n(k,x||q.status,q.responseText,q.getAllResponseHeaders())};if(r)q.withCredentials=!0;q.send(j||"");o>0&&c(function(){x=-1;
q.abort()},o)}}}function Yc(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),SHORTMONTH:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
DAY:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),SHORTDAY:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return b===1?"one":"other"}}}}function Zc(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,f,h){var j=c.defer(),
k=j.promise,l=v(h)&&!h,f=a.defer(function(){try{j.resolve(e())}catch(a){j.reject(a),d(a)}l||b.$apply()},f),h=function(){delete g[k.$$timeoutId]};k.$$timeoutId=f;g[f]=j;k.then(h,h);return k}var g={};e.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),a.defer.cancel(b.$$timeoutId)):!1};return e}]}function Qb(b){function a(a,e){return b.factory(a+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",
Rb);a("date",Sb);a("filter",$c);a("json",ad);a("limitTo",bd);a("lowercase",cd);a("number",Tb);a("orderBy",Ub);a("uppercase",dd)}function $c(){return function(b,a){if(!(b instanceof Array))return b;var c=[];c.check=function(a){for(var b=0;b<c.length;b++)if(!c[b](a))return!1;return!0};var d=function(a,b){if(b.charAt(0)==="!")return!d(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return(""+a).toLowerCase().indexOf(b)>-1;case "object":for(var c in a)if(c.charAt(0)!=="$"&&
d(a[c],b))return!0;return!1;case "array":for(c=0;c<a.length;c++)if(d(a[c],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var e in a)e=="$"?function(){var b=(""+a[e]).toLowerCase();b&&c.push(function(a){return d(a,b)})}():function(){var b=e,f=(""+a[e]).toLowerCase();f&&c.push(function(a){return d(gb(a,b),f)})}();break;case "function":c.push(a);break;default:return b}for(var g=[],i=0;i<b.length;i++){var f=b[i];c.check(f)&&
g.push(f)}return g}}function Rb(b){var a=b.NUMBER_FORMATS;return function(b,d){if(t(d))d=a.CURRENCY_SYM;return Vb(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Tb(b){var a=b.NUMBER_FORMATS;return function(b,d){return Vb(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Vb(b,a,c,d,e){if(isNaN(b)||!isFinite(b))return"";var g=b<0,b=Math.abs(b),i=b+"",f="",h=[],j=!1;if(i.indexOf("e")!==-1){var k=i.match(/([\d\.]+)e(-?)(\d+)/);k&&k[2]=="-"&&k[3]>e+1?i="0":(f=i,j=!0)}if(!j){i=
(i.split(Wb)[1]||"").length;t(e)&&(e=Math.min(Math.max(a.minFrac,i),a.maxFrac));var i=Math.pow(10,e),b=Math.round(b*i)/i,b=(""+b).split(Wb),i=b[0],b=b[1]||"",j=0,k=a.lgSize,l=a.gSize;if(i.length>=k+l)for(var j=i.length-k,o=0;o<j;o++)(j-o)%l===0&&o!==0&&(f+=c),f+=i.charAt(o);for(o=j;o<i.length;o++)(i.length-o)%k===0&&o!==0&&(f+=c),f+=i.charAt(o);for(;b.length<e;)b+="0";e&&(f+=d+b.substr(0,e))}h.push(g?a.negPre:a.posPre);h.push(f);h.push(g?a.negSuf:a.posSuf);return h.join("")}function jb(b,a,c){var d=
"";b<0&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function N(b,a,c,d){return function(e){e=e["get"+b]();if(c>0||e>-c)e+=c;e===0&&c==-12&&(e=12);return jb(e,a,d)}}function La(b,a){return function(c,d){var e=c["get"+b](),g=la(a?"SHORT"+b:b);return d[g][e]}}function Sb(b){function a(a){var b;if(b=a.match(c)){var a=new Date(0),g=0,i=0;b[9]&&(g=F(b[9]+b[10]),i=F(b[9]+b[11]));a.setUTCFullYear(F(b[1]),F(b[2])-1,F(b[3]));a.setUTCHours(F(b[4]||0)-g,F(b[5]||0)-i,F(b[6]||
0),F(b[7]||0))}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e){var g="",i=[],f,h,e=e||"mediumDate",e=b.DATETIME_FORMATS[e]||e;E(c)&&(c=ed.test(c)?F(c):a(c));va(c)&&(c=new Date(c));if(!na(c))return c;for(;e;)(h=fd.exec(e))?(i=i.concat(ia.call(h,1)),e=i.pop()):(i.push(e),e=null);m(i,function(a){f=gd[a];g+=f?f(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function ad(){return function(b){return da(b,
!0)}}function bd(){return function(b,a){if(!(b instanceof Array))return b;var a=F(a),c=[],d,e;if(!b||!(b instanceof Array))return c;a>b.length?a=b.length:a<-b.length&&(a=-b.length);a>0?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function Ub(b){return function(a,c,d){function e(a,b){return Wa(b)?function(b,c){return a(c,b)}:a}if(!(a instanceof Array))return a;if(!c)return a;for(var c=I(c)?c:[c],c=Ta(c,function(a){var c=!1,d=a||ma;if(E(a)){if(a.charAt(0)=="+"||a.charAt(0)==
"-")c=a.charAt(0)=="-",a=a.substring(1);d=b(a)}return e(function(a,b){var c;c=d(a);var e=d(b),f=typeof c,g=typeof e;f==g?(f=="string"&&(c=c.toLowerCase()),f=="string"&&(e=e.toLowerCase()),c=c===e?0:c<e?-1:1):c=f<g?-1:1;return c},c)}),g=[],i=0;i<a.length;i++)g.push(a[i]);return g.sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(e!==0)return e}return 0},d))}}function R(b){L(b)&&(b={link:b});b.restrict=b.restrict||"AC";return H(b)}function Xb(b,a){function c(a,c){c=c?"-"+$a(c,"-"):
"";b.removeClass((a?Ma:Na)+c).addClass((a?Na:Ma)+c)}var d=this,e=b.parent().controller("form")||Oa,g=0,i=d.$error={};d.$name=a.name;d.$dirty=!1;d.$pristine=!0;d.$valid=!0;d.$invalid=!1;e.$addControl(d);b.addClass(Pa);c(!0);d.$addControl=function(a){a.$name&&!d.hasOwnProperty(a.$name)&&(d[a.$name]=a)};d.$removeControl=function(a){a.$name&&d[a.$name]===a&&delete d[a.$name];m(i,function(b,c){d.$setValidity(c,!0,a)})};d.$setValidity=function(a,b,j){var k=i[a];if(b){if(k&&(Ua(k,j),!k.length)){g--;if(!g)c(b),
d.$valid=!0,d.$invalid=!1;i[a]=!1;c(!0,a);e.$setValidity(a,!0,d)}}else{g||c(b);if(k){if(ya(k,j)!=-1)return}else i[a]=k=[],g++,c(!1,a),e.$setValidity(a,!1,d);k.push(j);d.$valid=!1;d.$invalid=!0}};d.$setDirty=function(){b.removeClass(Pa).addClass(Yb);d.$dirty=!0;d.$pristine=!1;e.$setDirty()}}function S(b){return t(b)||b===""||b===null||b!==b}function Qa(b,a,c,d,e,g){var i=function(){var c=Q(a.val());d.$viewValue!==c&&b.$apply(function(){d.$setViewValue(c)})};if(e.hasEvent("input"))a.bind("input",i);
else{var f;a.bind("keydown",function(a){a=a.keyCode;a===91||15<a&&a<19||37<=a&&a<=40||f||(f=g.defer(function(){i();f=null}))});a.bind("change",i)}d.$render=function(){a.val(S(d.$viewValue)?"":d.$viewValue)};var h=c.ngPattern,j=function(a,b){return S(b)||a.test(b)?(d.$setValidity("pattern",!0),b):(d.$setValidity("pattern",!1),p)};h&&(h.match(/^\/(.*)\/$/)?(h=RegExp(h.substr(1,h.length-2)),e=function(a){return j(h,a)}):e=function(a){var c=b.$eval(h);if(!c||!c.test)throw new u("Expected "+h+" to be a RegExp but was "+
c);return j(c,a)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var k=F(c.ngMinlength),e=function(a){return!S(a)&&a.length<k?(d.$setValidity("minlength",!1),p):(d.$setValidity("minlength",!0),a)};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var l=F(c.ngMaxlength),c=function(a){return!S(a)&&a.length>l?(d.$setValidity("maxlength",!1),p):(d.$setValidity("maxlength",!0),a)};d.$parsers.push(c);d.$formatters.push(c)}}function kb(b,a){b="ngClass"+b;return R(function(c,d,e){function g(b,
d){if(a===!0||c.$index%2===a)d&&b!==d&&i(d),f(b)}function i(a){M(a)&&!I(a)&&(a=Ta(a,function(a,b){if(a)return b}));d.removeClass(I(a)?a.join(" "):a)}function f(a){M(a)&&!I(a)&&(a=Ta(a,function(a,b){if(a)return b}));a&&d.addClass(I(a)?a.join(" "):a)}c.$watch(e[b],g,!0);e.$observe("class",function(){var a=c.$eval(e[b]);g(a,a)});b!=="ngClass"&&c.$watch("$index",function(d,g){var k=d%2;k!==g%2&&(k==a?f(c.$eval(e[b])):i(c.$eval(e[b])))})})}var D=function(b){return E(b)?b.toLowerCase():b},la=function(b){return E(b)?
b.toUpperCase():b},u=T.Error,aa=F((/msie (\d+)/.exec(D(navigator.userAgent))||[])[1]),z,ja,ia=[].slice,Ra=[].push,Sa=Object.prototype.toString,Zb=T.angular||(T.angular={}),sa,Db,Z=["0","0","0"];C.$inject=[];ma.$inject=[];Db=aa<9?function(b){b=b.nodeName?b:b[0];return b.scopeName&&b.scopeName!="HTML"?la(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};var kc=/[A-Z]/g,hd={full:"1.0.4",major:1,minor:0,dot:4,codeName:"bewildering-hair"},Aa=O.cache={},za=
O.expando="ng-"+(new Date).getTime(),oc=1,$b=T.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},eb=T.document.removeEventListener?function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)},mc=/([\:\-\_]+(.))/g,nc=/^moz([A-Z])/,ta=O.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;this.bind("DOMContentLoaded",a);O(T).bind("load",a)},toString:function(){var b=[];m(this,function(a){b.push(""+a)});
return"["+b.join(", ")+"]"},eq:function(b){return b>=0?z(this[b]):z(this[this.length+b])},length:0,push:Ra,sort:[].sort,splice:[].splice},Da={};m("multiple,selected,checked,disabled,readOnly,required".split(","),function(b){Da[D(b)]=b});var Ab={};m("input,select,option,textarea,button,form".split(","),function(b){Ab[la(b)]=!0});m({data:vb,inheritedData:Ca,scope:function(b){return Ca(b,"$scope")},controller:yb,injector:function(b){return Ca(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},
hasClass:Ba,css:function(b,a,c){a=sb(a);if(v(c))b.style[a]=c;else{var d;aa<=8&&(d=b.currentStyle&&b.currentStyle[a],d===""&&(d="auto"));d=d||b.style[a];aa<=8&&(d=d===""?p:d);return d}},attr:function(b,a,c){var d=D(a);if(Da[d])if(v(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||C).specified?d:p;else if(v(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),b===null?p:b},prop:function(b,a,c){if(v(c))b[a]=c;else return b[a]},
text:y(aa<9?function(b,a){if(b.nodeType==1){if(t(a))return b.innerText;b.innerText=a}else{if(t(a))return b.nodeValue;b.nodeValue=a}}:function(b,a){if(t(a))return b.textContent;b.textContent=a},{$dv:""}),val:function(b,a){if(t(a))return b.value;b.value=a},html:function(b,a){if(t(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)ra(d[c]);b.innerHTML=a}},function(b,a){O.prototype[a]=function(a,d){var e,g;if((b.length==2&&b!==Ba&&b!==yb?a:d)===p)if(M(a)){for(e=0;e<this.length;e++)if(b===
vb)b(this[e],a);else for(g in a)b(this[e],g,a[g]);return this}else{if(this.length)return b(this[0],a,d)}else{for(e=0;e<this.length;e++)b(this[e],a,d);return this}return b.$dv}});m({removeData:tb,dealoc:ra,bind:function a(c,d,e){var g=$(c,"events"),i=$(c,"handle");g||$(c,"events",g={});i||$(c,"handle",i=pc(c,g));m(d.split(" "),function(d){var h=g[d];if(!h){if(d=="mouseenter"||d=="mouseleave"){var j=0;g.mouseenter=[];g.mouseleave=[];a(c,"mouseover",function(a){j++;j==1&&i(a,"mouseenter")});a(c,"mouseout",
function(a){j--;j==0&&i(a,"mouseleave")})}else $b(c,d,i),g[d]=[];h=g[d]}h.push(e)})},unbind:ub,replaceWith:function(a,c){var d,e=a.parentNode;ra(a);m(new O(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];m(a.childNodes,function(a){a.nodeType===1&&c.push(a)});return c},contents:function(a){return a.childNodes||[]},append:function(a,c){m(new O(c),function(c){a.nodeType===1&&a.appendChild(c)})},prepend:function(a,c){if(a.nodeType===1){var d=a.firstChild;
m(new O(c),function(c){d?a.insertBefore(c,d):(a.appendChild(c),d=c)})}},wrap:function(a,c){var c=z(c)[0],d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){ra(a);var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;m(new O(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:xb,removeClass:wb,toggleClass:function(a,c,d){t(d)&&(d=!Ba(a,c));(d?xb:wb)(a,c)},parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;
for(a=a.nextSibling;a!=null&&a.nodeType!==1;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName(c)},clone:db,triggerHandler:function(a,c){var d=($(a,"events")||{})[c];m(d,function(c){c.call(a,null)})}},function(a,c){O.prototype[c]=function(c,e){for(var g,i=0;i<this.length;i++)g==p?(g=a(this[i],c,e),g!==p&&(g=z(g))):cb(g,a(this[i],c,e));return g==p?this:g}});Ea.prototype={put:function(a,c){this[ga(a)]=c},get:function(a){return this[ga(a)]},remove:function(a){var c=this[a=ga(a)];
delete this[a];return c}};fb.prototype={push:function(a,c){var d=this[a=ga(a)];d?d.push(c):this[a]=[c]},shift:function(a){var c=this[a=ga(a)];if(c)return c.length==1?(delete this[a],c[0]):c.shift()},peek:function(a){if(a=this[ga(a)])return a[0]}};var rc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,sc=/,/,tc=/^\s*(_?)(\S+?)\1\s*$/,qc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Eb="Non-assignable model expression: ";Cb.$inject=["$provide"];var zc=/^(x[\:\-_]|data[\:\-_])/i,Gb=/^([^:]+):\/\/(\w+:{0,1}\w*@)?([\w\.-]*)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/,
ac=/^([^\?#]*)?(\?([^#]*))?(#(.*))?$/,Gc=ac,Hb={http:80,https:443,ftp:21};hb.prototype={$$replace:!1,absUrl:Ja("$$absUrl"),url:function(a,c){if(t(a))return this.$$url;var d=ac.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));if(d[2]||d[1])this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:Ja("$$protocol"),host:Ja("$$host"),port:Ja("$$port"),path:Jb("$$path",function(a){return a.charAt(0)=="/"?a:"/"+a}),search:function(a,c){if(t(a))return this.$$search;v(c)?c===null?delete this.$$search[a]:
this.$$search[a]=c:this.$$search=E(a)?Xa(a):a;this.$$compose();return this},hash:Jb("$$hash",ma),replace:function(){this.$$replace=!0;return this}};Ia.prototype=xa(hb.prototype);Ib.prototype=xa(Ia.prototype);var Ka={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:C,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return v(d)?v(e)?d+e:d:v(e)?e:p},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(v(d)?d:0)-(v(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},
"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":C,"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},
"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Kc={n:"\n",f:"\u000c",r:"\r",t:"\t",v:"\u000b","'":"'",'"':'"'},ib={},Xc=T.XMLHttpRequest||function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw new u("This browser does not support XMLHttpRequest.");};Qb.$inject=["$provide"];Rb.$inject=
["$locale"];Tb.$inject=["$locale"];var Wb=".",gd={yyyy:N("FullYear",4),yy:N("FullYear",2,0,!0),y:N("FullYear",1),MMMM:La("Month"),MMM:La("Month",!0),MM:N("Month",2,1),M:N("Month",1,1),dd:N("Date",2),d:N("Date",1),HH:N("Hours",2),H:N("Hours",1),hh:N("Hours",2,-12),h:N("Hours",1,-12),mm:N("Minutes",2),m:N("Minutes",1),ss:N("Seconds",2),s:N("Seconds",1),EEEE:La("Day"),EEE:La("Day",!0),a:function(a,c){return a.getHours()<12?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=a.getTimezoneOffset();return jb(a/60,2)+
jb(Math.abs(a%60),2)}},fd=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,ed=/^\d+$/;Sb.$inject=["$locale"];var cd=H(D),dd=H(la);Ub.$inject=["$parse"];var id=H({restrict:"E",compile:function(a,c){c.href||c.$set("href","");return function(a,c){c.bind("click",function(a){c.attr("href")||a.preventDefault()})}}}),lb={};m(Da,function(a,c){var d=fa("ng-"+c);lb[d]=function(){return{priority:100,compile:function(){return function(a,g,i){a.$watch(i[d],function(a){i.$set(c,!!a)})}}}}});
m(["src","href"],function(a){var c=fa("ng-"+a);lb[c]=function(){return{priority:99,link:function(d,e,g){g.$observe(c,function(c){c&&(g.$set(a,c),aa&&e.prop(a,c))})}}}});var Oa={$addControl:C,$removeControl:C,$setValidity:C,$setDirty:C};Xb.$inject=["$element","$attrs","$scope"];var Ra=function(a){return["$timeout",function(c){var d={name:"form",restrict:"E",controller:Xb,compile:function(){return{pre:function(a,d,i,f){if(!i.action){var h=function(a){a.preventDefault?a.preventDefault():a.returnValue=
!1};$b(d[0],"submit",h);d.bind("$destroy",function(){c(function(){eb(d[0],"submit",h)},0,!1)})}var j=d.parent().controller("form"),k=i.name||i.ngForm;k&&(a[k]=f);j&&d.bind("$destroy",function(){j.$removeControl(f);k&&(a[k]=p);y(f,Oa)})}}}};return a?y(U(d),{restrict:"EAC"}):d}]},jd=Ra(),kd=Ra(!0),ld=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,md=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,nd=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,bc={text:Qa,number:function(a,
c,d,e,g,i){Qa(a,c,d,e,g,i);e.$parsers.push(function(a){var c=S(a);return c||nd.test(a)?(e.$setValidity("number",!0),a===""?null:c?a:parseFloat(a)):(e.$setValidity("number",!1),p)});e.$formatters.push(function(a){return S(a)?"":""+a});if(d.min){var f=parseFloat(d.min),a=function(a){return!S(a)&&a<f?(e.$setValidity("min",!1),p):(e.$setValidity("min",!0),a)};e.$parsers.push(a);e.$formatters.push(a)}if(d.max){var h=parseFloat(d.max),d=function(a){return!S(a)&&a>h?(e.$setValidity("max",!1),p):(e.$setValidity("max",
!0),a)};e.$parsers.push(d);e.$formatters.push(d)}e.$formatters.push(function(a){return S(a)||va(a)?(e.$setValidity("number",!0),a):(e.$setValidity("number",!1),p)})},url:function(a,c,d,e,g,i){Qa(a,c,d,e,g,i);a=function(a){return S(a)||ld.test(a)?(e.$setValidity("url",!0),a):(e.$setValidity("url",!1),p)};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,g,i){Qa(a,c,d,e,g,i);a=function(a){return S(a)||md.test(a)?(e.$setValidity("email",!0),a):(e.$setValidity("email",!1),p)};e.$formatters.push(a);
e.$parsers.push(a)},radio:function(a,c,d,e){t(d.name)&&c.attr("name",wa());c.bind("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e){var g=d.ngTrueValue,i=d.ngFalseValue;E(g)||(g=!0);E(i)||(i=!1);c.bind("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});e.$render=function(){c[0].checked=e.$viewValue};e.$formatters.push(function(a){return a===
g});e.$parsers.push(function(a){return a?g:i})},hidden:C,button:C,submit:C,reset:C},cc=["$browser","$sniffer",function(a,c){return{restrict:"E",require:"?ngModel",link:function(d,e,g,i){i&&(bc[D(g.type)]||bc.text)(d,e,g,i,c,a)}}}],Na="ng-valid",Ma="ng-invalid",Pa="ng-pristine",Yb="ng-dirty",od=["$scope","$exceptionHandler","$attrs","$element","$parse",function(a,c,d,e,g){function i(a,c){c=c?"-"+$a(c,"-"):"";e.removeClass((a?Ma:Na)+c).addClass((a?Na:Ma)+c)}this.$modelValue=this.$viewValue=Number.NaN;
this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$name=d.name;var f=g(d.ngModel),h=f.assign;if(!h)throw u(Eb+d.ngModel+" ("+pa(e)+")");this.$render=C;var j=e.inheritedData("$formController")||Oa,k=0,l=this.$error={};e.addClass(Pa);i(!0);this.$setValidity=function(a,c){if(l[a]!==!c){if(c){if(l[a]&&k--,!k)i(!0),this.$valid=!0,this.$invalid=!1}else i(!1),this.$invalid=!0,this.$valid=!1,k++;l[a]=!c;i(c,a);j.$setValidity(a,
c,this)}};this.$setViewValue=function(d){this.$viewValue=d;if(this.$pristine)this.$dirty=!0,this.$pristine=!1,e.removeClass(Pa).addClass(Yb),j.$setDirty();m(this.$parsers,function(a){d=a(d)});if(this.$modelValue!==d)this.$modelValue=d,h(a,d),m(this.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};var o=this;a.$watch(function(){var c=f(a);if(o.$modelValue!==c){var d=o.$formatters,e=d.length;for(o.$modelValue=c;e--;)c=d[e](c);if(o.$viewValue!==c)o.$viewValue=c,o.$render()}})}],pd=function(){return{require:["ngModel",
"^?form"],controller:od,link:function(a,c,d,e){var g=e[0],i=e[1]||Oa;i.$addControl(g);c.bind("$destroy",function(){i.$removeControl(g)})}}},qd=H({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),dc=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var g=function(a){if(d.required&&(S(a)||a===!1))e.$setValidity("required",!1);else return e.$setValidity("required",!0),a};e.$formatters.push(g);e.$parsers.unshift(g);
d.$observe("required",function(){g(e.$viewValue)})}}}},rd=function(){return{require:"ngModel",link:function(a,c,d,e){var g=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){var c=[];a&&m(a.split(g),function(a){a&&c.push(Q(a))});return c});e.$formatters.push(function(a){return I(a)?a.join(", "):p})}}},sd=/^(true|false|\d+)$/,td=function(){return{priority:100,compile:function(a,c){return sd.test(c.ngValue)?function(a,c,g){g.$set("value",a.$eval(g.ngValue))}:function(a,
c,g){a.$watch(g.ngValue,function(a){g.$set("value",a,!1)})}}}},ud=R(function(a,c,d){c.addClass("ng-binding").data("$binding",d.ngBind);a.$watch(d.ngBind,function(a){c.text(a==p?"":a)})}),vd=["$interpolate",function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],wd=[function(){return function(a,c,d){c.addClass("ng-binding").data("$binding",d.ngBindHtmlUnsafe);a.$watch(d.ngBindHtmlUnsafe,
function(a){c.html(a||"")})}}],xd=kb("",!0),yd=kb("Odd",0),zd=kb("Even",1),Ad=R({compile:function(a,c){c.$set("ngCloak",p);a.removeClass("ng-cloak")}}),Bd=[function(){return{scope:!0,controller:"@"}}],Cd=["$sniffer",function(a){return{priority:1E3,compile:function(){a.csp=!0}}}],ec={};m("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave".split(" "),function(a){var c=fa("ng-"+a);ec[c]=["$parse",function(d){return function(e,g,i){var f=d(i[c]);g.bind(D(a),function(a){e.$apply(function(){f(e,
{$event:a})})})}}]});var Dd=R(function(a,c,d){c.bind("submit",function(){a.$apply(d.ngSubmit)})}),Ed=["$http","$templateCache","$anchorScroll","$compile",function(a,c,d,e){return{restrict:"ECA",terminal:!0,compile:function(g,i){var f=i.ngInclude||i.src,h=i.onload||"",j=i.autoscroll;return function(g,i){var o=0,m,n=function(){m&&(m.$destroy(),m=null);i.html("")};g.$watch(f,function(f){var q=++o;f?a.get(f,{cache:c}).success(function(a){q===o&&(m&&m.$destroy(),m=g.$new(),i.html(a),e(i.contents())(m),
v(j)&&(!j||g.$eval(j))&&d(),m.$emit("$includeContentLoaded"),g.$eval(h))}).error(function(){q===o&&n()}):n()})}}}}],Fd=R({compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),Gd=R({terminal:!0,priority:1E3}),Hd=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,g,i){var f=i.count,h=g.attr(i.$attr.when),j=i.offset||0,k=e.$eval(h),l={},o=c.startSymbol(),r=c.endSymbol();m(k,function(a,e){l[e]=c(a.replace(d,o+f+"-"+j+r))});e.$watch(function(){var c=
parseFloat(e.$eval(f));return isNaN(c)?"":(k[c]||(c=a.pluralCat(c-j)),l[c](e,g,!0))},function(a){g.text(a)})}}}],Id=R({transclude:"element",priority:1E3,terminal:!0,compile:function(a,c,d){return function(a,c,i){var f=i.ngRepeat,i=f.match(/^\s*(.+)\s+in\s+(.*)\s*$/),h,j,k;if(!i)throw u("Expected ngRepeat in form of '_item_ in _collection_' but got '"+f+"'.");f=i[1];h=i[2];i=f.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!i)throw u("'item' in 'item in collection' should be identifier or (key, value) but got '"+
f+"'.");j=i[3]||i[1];k=i[2];var l=new fb;a.$watch(function(a){var e,f,i=a.$eval(h),m=c,p=new fb,z,A,s,v,t,u;if(I(i))t=i||[];else{t=[];for(s in i)i.hasOwnProperty(s)&&s.charAt(0)!="$"&&t.push(s);t.sort()}z=t.length;e=0;for(f=t.length;e<f;e++){s=i===t?e:t[e];v=i[s];if(u=l.shift(v)){A=u.scope;p.push(v,u);if(e!==u.index)u.index=e,m.after(u.element);m=u.element}else A=a.$new();A[j]=v;k&&(A[k]=s);A.$index=e;A.$first=e===0;A.$last=e===z-1;A.$middle=!(A.$first||A.$last);u||d(A,function(a){m.after(a);u={scope:A,
element:m=a,index:e};p.push(v,u)})}for(s in l)if(l.hasOwnProperty(s))for(t=l[s];t.length;)v=t.pop(),v.element.remove(),v.scope.$destroy();l=p})}}}),Jd=R(function(a,c,d){a.$watch(d.ngShow,function(a){c.css("display",Wa(a)?"":"none")})}),Kd=R(function(a,c,d){a.$watch(d.ngHide,function(a){c.css("display",Wa(a)?"none":"")})}),Ld=R(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&m(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Md=H({restrict:"EA",require:"ngSwitch",controller:function(){this.cases=
{}},link:function(a,c,d,e){var g,i,f;a.$watch(d.ngSwitch||d.on,function(h){i&&(f.$destroy(),i.remove(),i=f=null);if(g=e.cases["!"+h]||e.cases["?"])a.$eval(d.change),f=a.$new(),g(f,function(a){i=a;c.append(a)})})}}),Nd=R({transclude:"element",priority:500,require:"^ngSwitch",compile:function(a,c,d){return function(a,g,i,f){f.cases["!"+c.ngSwitchWhen]=d}}}),Od=R({transclude:"element",priority:500,require:"^ngSwitch",compile:function(a,c,d){return function(a,c,i,f){f.cases["?"]=d}}}),Pd=R({controller:["$transclude",
"$element",function(a,c){a(function(a){c.append(a)})}]}),Qd=["$http","$templateCache","$route","$anchorScroll","$compile","$controller",function(a,c,d,e,g,i){return{restrict:"ECA",terminal:!0,link:function(a,c,j){function k(){var j=d.current&&d.current.locals,k=j&&j.$template;if(k){c.html(k);l&&(l.$destroy(),l=null);var k=g(c.contents()),m=d.current;l=m.scope=a.$new();if(m.controller)j.$scope=l,j=i(m.controller,j),c.contents().data("$ngControllerController",j);k(l);l.$emit("$viewContentLoaded");l.$eval(o);
e()}else c.html(""),l&&(l.$destroy(),l=null)}var l,o=j.onload||"";a.$on("$routeChangeSuccess",k);k()}}}],Rd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){d.type=="text/ng-template"&&a.put(d.id,c[0].text)}}}],Sd=H({terminal:!0}),Td=["$compile","$parse",function(a,c){var d=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/,e={$setViewValue:C};return{restrict:"E",
require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var h=this,j={},k=e,l;h.databound=d.ngModel;h.init=function(a,c,d){k=a;l=d};h.addOption=function(c){j[c]=!0;k.$viewValue==c&&(a.val(c),l.parent()&&l.remove())};h.removeOption=function(a){this.hasOption(a)&&(delete j[a],k.$viewValue==a&&this.renderUnknownOption(a))};h.renderUnknownOption=function(c){c="? "+ga(c)+" ?";l.val(c);a.prepend(l);a.val(c);l.prop("selected",!0)};h.hasOption=function(a){return j.hasOwnProperty(a)};
c.$on("$destroy",function(){h.renderUnknownOption=C})}],link:function(e,i,f,h){function j(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(s.parent()&&s.remove(),c.val(a),a===""&&x.prop("selected",!0)):t(a)&&x?c.val(""):e.renderUnknownOption(a)};c.bind("change",function(){a.$apply(function(){s.parent()&&s.remove();d.$setViewValue(c.val())})})}function k(a,c,d){var e;d.$render=function(){var a=new Ea(d.$viewValue);m(c.find("option"),function(c){c.selected=v(a.get(c.value))})};a.$watch(function(){ha(e,
d.$viewValue)||(e=U(d.$viewValue),d.$render())});c.bind("change",function(){a.$apply(function(){var a=[];m(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function l(e,f,g){function h(){var a={"":[]},c=[""],d,i,t,v,u;t=g.$modelValue;v=r(e)||[];var x=l?mb(v):v,z,w,y;w={};u=!1;var B,D;if(n)u=new Ea(t);else if(t===null||q)a[""].push({selected:t===null,id:"",label:""}),u=!0;for(y=0;z=x.length,y<z;y++){w[k]=v[l?w[l]=x[y]:y];d=m(e,w)||"";if(!(i=a[d]))i=a[d]=[],c.push(d);
n?d=u.remove(o(e,w))!=p:(d=t===o(e,w),u=u||d);B=j(e,w);B=B===p?"":B;i.push({id:l?x[y]:y,label:B,selected:d})}!n&&!u&&a[""].unshift({id:"?",label:"",selected:!0});w=0;for(x=c.length;w<x;w++){d=c[w];i=a[d];if(s.length<=w)t={element:A.clone().attr("label",d),label:i.label},v=[t],s.push(v),f.append(t.element);else if(v=s[w],t=v[0],t.label!=d)t.element.attr("label",t.label=d);B=null;y=0;for(z=i.length;y<z;y++)if(d=i[y],u=v[y+1]){B=u.element;if(u.label!==d.label)B.text(u.label=d.label);if(u.id!==d.id)B.val(u.id=
d.id);if(u.element.selected!==d.selected)B.prop("selected",u.selected=d.selected)}else d.id===""&&q?D=q:(D=C.clone()).val(d.id).attr("selected",d.selected).text(d.label),v.push({element:D,label:d.label,id:d.id,selected:d.selected}),B?B.after(D):t.element.append(D),B=D;for(y++;v.length>y;)v.pop().element.remove()}for(;s.length>w;)s.pop()[0].element.remove()}var i;if(!(i=w.match(d)))throw u("Expected ngOptions in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '"+w+"'.");
var j=c(i[2]||i[1]),k=i[4]||i[6],l=i[5],m=c(i[3]||""),o=c(i[2]?i[1]:k),r=c(i[7]),s=[[{element:f,label:""}]];q&&(a(q)(e),q.removeClass("ng-scope"),q.remove());f.html("");f.bind("change",function(){e.$apply(function(){var a,c=r(e)||[],d={},h,i,j,m,q,t;if(n){i=[];m=0;for(t=s.length;m<t;m++){a=s[m];j=1;for(q=a.length;j<q;j++)if((h=a[j].element)[0].selected)h=h.val(),l&&(d[l]=h),d[k]=c[h],i.push(o(e,d))}}else h=f.val(),h=="?"?i=p:h==""?i=null:(d[k]=c[h],l&&(d[l]=h),i=o(e,d));g.$setViewValue(i)})});g.$render=
h;e.$watch(h)}if(h[1]){for(var o=h[0],r=h[1],n=f.multiple,w=f.ngOptions,q=!1,x,C=z(Y.createElement("option")),A=z(Y.createElement("optgroup")),s=C.clone(),h=0,y=i.children(),D=y.length;h<D;h++)if(y[h].value==""){x=q=y.eq(h);break}o.init(r,q,s);if(n&&(f.required||f.ngRequired)){var E=function(a){r.$setValidity("required",!f.required||a&&a.length);return a};r.$parsers.push(E);r.$formatters.unshift(E);f.$observe("required",function(){E(r.$viewValue)})}w?l(e,i,r):n?k(e,i,r):j(e,i,r,o)}}}}],Ud=["$interpolate",
function(a){var c={addOption:C,removeOption:C};return{restrict:"E",priority:100,compile:function(d,e){if(t(e.value)){var g=a(d.text(),!0);g||e.$set("value",d.text())}return function(a,d,e){var j=d.parent(),k=j.data("$selectController")||j.parent().data("$selectController");k&&k.databound?d.prop("selected",!1):k=c;g?a.$watch(g,function(a,c){e.$set("value",a);a!==c&&k.removeOption(c);k.addOption(a)}):k.addOption(e.value);d.bind("$destroy",function(){k.removeOption(e.value)})}}}}],Vd=H({restrict:"E",
terminal:!0});(ja=T.jQuery)?(z=ja,y(ja.fn,{scope:ta.scope,controller:ta.controller,injector:ta.injector,inheritedData:ta.inheritedData}),bb("remove",!0),bb("empty"),bb("html")):z=O;Zb.element=z;(function(a){y(a,{bootstrap:qb,copy:U,extend:y,equals:ha,element:z,forEach:m,injector:rb,noop:C,bind:Va,toJson:da,fromJson:ob,identity:ma,isUndefined:t,isDefined:v,isString:E,isFunction:L,isObject:M,isNumber:va,isElement:gc,isArray:I,version:hd,isDate:na,lowercase:D,uppercase:la,callbacks:{counter:0}});sa=
lc(T);try{sa("ngLocale")}catch(c){sa("ngLocale",[]).provider("$locale",Yc)}sa("ng",["ngLocale"],["$provide",function(a){a.provider("$compile",Cb).directive({a:id,input:cc,textarea:cc,form:jd,script:Rd,select:Td,style:Vd,option:Ud,ngBind:ud,ngBindHtmlUnsafe:wd,ngBindTemplate:vd,ngClass:xd,ngClassEven:zd,ngClassOdd:yd,ngCsp:Cd,ngCloak:Ad,ngController:Bd,ngForm:kd,ngHide:Kd,ngInclude:Ed,ngInit:Fd,ngNonBindable:Gd,ngPluralize:Hd,ngRepeat:Id,ngShow:Jd,ngSubmit:Dd,ngStyle:Ld,ngSwitch:Md,ngSwitchWhen:Nd,
ngSwitchDefault:Od,ngOptions:Sd,ngView:Qd,ngTransclude:Pd,ngModel:pd,ngList:rd,ngChange:qd,required:dc,ngRequired:dc,ngValue:td}).directive(lb).directive(ec);a.provider({$anchorScroll:uc,$browser:wc,$cacheFactory:xc,$controller:Ac,$document:Bc,$exceptionHandler:Cc,$filter:Qb,$interpolate:Dc,$http:Uc,$httpBackend:Vc,$location:Hc,$log:Ic,$parse:Mc,$route:Pc,$routeParams:Qc,$rootScope:Rc,$q:Nc,$sniffer:Sc,$templateCache:yc,$timeout:Zc,$window:Tc})}])})(Zb);z(Y).ready(function(){jc(Y,qb)})})(window,document);
angular.element(document).find("head").append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none;}ng\\:form{display:block;}</style>');
}, "libs/bootstrap.min": function(exports, require, module) {/*!
* Bootstrap.js by @fat & @mdo
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(e){"use strict";e(function(){e.support.transition=function(){var e=function(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},n;for(n in t)if(e.style[n]!==undefined)return t[n]}();return e&&{end:e}}()})}(window.jQuery),!function(e){"use strict";var t='[data-dismiss="alert"]',n=function(n){e(n).on("click",t,this.close)};n.prototype.close=function(t){function s(){i.trigger("closed").remove()}var n=e(this),r=n.attr("data-target"),i;r||(r=n.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,"")),i=e(r),t&&t.preventDefault(),i.length||(i=n.hasClass("alert")?n:n.parent()),i.trigger(t=e.Event("close"));if(t.isDefaultPrevented())return;i.removeClass("in"),e.support.transition&&i.hasClass("fade")?i.on(e.support.transition.end,s):s()};var r=e.fn.alert;e.fn.alert=function(t){return this.each(function(){var r=e(this),i=r.data("alert");i||r.data("alert",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.alert.Constructor=n,e.fn.alert.noConflict=function(){return e.fn.alert=r,this},e(document).on("click.alert.data-api",t,n.prototype.close)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.button.defaults,n)};t.prototype.setState=function(e){var t="disabled",n=this.$element,r=n.data(),i=n.is("input")?"val":"html";e+="Text",r.resetText||n.data("resetText",n[i]()),n[i](r[e]||this.options[e]),setTimeout(function(){e=="loadingText"?n.addClass(t).attr(t,t):n.removeClass(t).removeAttr(t)},0)},t.prototype.toggle=function(){var e=this.$element.closest('[data-toggle="buttons-radio"]');e&&e.find(".active").removeClass("active"),this.$element.toggleClass("active")};var n=e.fn.button;e.fn.button=function(n){return this.each(function(){var r=e(this),i=r.data("button"),s=typeof n=="object"&&n;i||r.data("button",i=new t(this,s)),n=="toggle"?i.toggle():n&&i.setState(n)})},e.fn.button.defaults={loadingText:"loading..."},e.fn.button.Constructor=t,e.fn.button.noConflict=function(){return e.fn.button=n,this},e(document).on("click.button.data-api","[data-toggle^=button]",function(t){var n=e(t.target);n.hasClass("btn")||(n=n.closest(".btn")),n.button("toggle")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.options.pause=="hover"&&this.$element.on("mouseenter",e.proxy(this.pause,this)).on("mouseleave",e.proxy(this.cycle,this))};t.prototype={cycle:function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},to:function(t){var n=this.getActiveIndex(),r=this;if(t>this.$items.length-1||t<0)return;return this.sliding?this.$element.one("slid",function(){r.to(t)}):n==t?this.pause().cycle():this.slide(t>n?"next":"prev",e(this.$items[t]))},pause:function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&e.support.transition.end&&(this.$element.trigger(e.support.transition.end),this.cycle()),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(t,n){var r=this.$element.find(".item.active"),i=n||r[t](),s=this.interval,o=t=="next"?"left":"right",u=t=="next"?"first":"last",a=this,f;this.sliding=!0,s&&this.pause(),i=i.length?i:this.$element.find(".item")[u](),f=e.Event("slide",{relatedTarget:i[0],direction:o});if(i.hasClass("active"))return;this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var t=e(a.$indicators.children()[a.getActiveIndex()]);t&&t.addClass("active")}));if(e.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(f);if(f.isDefaultPrevented())return;i.addClass(t),i[0].offsetWidth,r.addClass(o),i.addClass(o),this.$element.one(e.support.transition.end,function(){i.removeClass([t,o].join(" ")).addClass("active"),r.removeClass(["active",o].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger("slid")},0)})}else{this.$element.trigger(f);if(f.isDefaultPrevented())return;r.removeClass("active"),i.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return s&&this.cycle(),this}};var n=e.fn.carousel;e.fn.carousel=function(n){return this.each(function(){var r=e(this),i=r.data("carousel"),s=e.extend({},e.fn.carousel.defaults,typeof n=="object"&&n),o=typeof n=="string"?n:s.slide;i||r.data("carousel",i=new t(this,s)),typeof n=="number"?i.to(n):o?i[o]():s.interval&&i.pause().cycle()})},e.fn.carousel.defaults={interval:5e3,pause:"hover"},e.fn.carousel.Constructor=t,e.fn.carousel.noConflict=function(){return e.fn.carousel=n,this},e(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(t){var n=e(this),r,i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")),s=e.extend({},i.data(),n.data()),o;i.carousel(s),(o=n.attr("data-slide-to"))&&i.data("carousel").pause().to(o).cycle(),t.preventDefault()})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.collapse.defaults,n),this.options.parent&&(this.$parent=e(this.options.parent)),this.options.toggle&&this.toggle()};t.prototype={constructor:t,dimension:function(){var e=this.$element.hasClass("width");return e?"width":"height"},show:function(){var t,n,r,i;if(this.transitioning||this.$element.hasClass("in"))return;t=this.dimension(),n=e.camelCase(["scroll",t].join("-")),r=this.$parent&&this.$parent.find("> .accordion-group > .in");if(r&&r.length){i=r.data("collapse");if(i&&i.transitioning)return;r.collapse("hide"),i||r.data("collapse",null)}this.$element[t](0),this.transition("addClass",e.Event("show"),"shown"),e.support.transition&&this.$element[t](this.$element[0][n])},hide:function(){var t;if(this.transitioning||!this.$element.hasClass("in"))return;t=this.dimension(),this.reset(this.$element[t]()),this.transition("removeClass",e.Event("hide"),"hidden"),this.$element[t](0)},reset:function(e){var t=this.dimension();return this.$element.removeClass("collapse")[t](e||"auto")[0].offsetWidth,this.$element[e!==null?"addClass":"removeClass"]("collapse"),this},transition:function(t,n,r){var i=this,s=function(){n.type=="show"&&i.reset(),i.transitioning=0,i.$element.trigger(r)};this.$element.trigger(n);if(n.isDefaultPrevented())return;this.transitioning=1,this.$element[t]("in"),e.support.transition&&this.$element.hasClass("collapse")?this.$element.one(e.support.transition.end,s):s()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};var n=e.fn.collapse;e.fn.collapse=function(n){return this.each(function(){var r=e(this),i=r.data("collapse"),s=e.extend({},e.fn.collapse.defaults,r.data(),typeof n=="object"&&n);i||r.data("collapse",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.collapse.defaults={toggle:!0},e.fn.collapse.Constructor=t,e.fn.collapse.noConflict=function(){return e.fn.collapse=n,this},e(document).on("click.collapse.data-api","[data-toggle=collapse]",function(t){var n=e(this),r,i=n.attr("data-target")||t.preventDefault()||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,""),s=e(i).data("collapse")?"toggle":n.data();n[e(i).hasClass("in")?"addClass":"removeClass"]("collapsed"),e(i).collapse(s)})}(window.jQuery),!function(e){"use strict";function r(){e(t).each(function(){i(e(this)).removeClass("open")})}function i(t){var n=t.attr("data-target"),r;n||(n=t.attr("href"),n=n&&/#/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")),r=n&&e(n);if(!r||!r.length)r=t.parent();return r}var t="[data-toggle=dropdown]",n=function(t){var n=e(t).on("click.dropdown.data-api",this.toggle);e("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};n.prototype={constructor:n,toggle:function(t){var n=e(this),s,o;if(n.is(".disabled, :disabled"))return;return s=i(n),o=s.hasClass("open"),r(),o||s.toggleClass("open"),n.focus(),!1},keydown:function(n){var r,s,o,u,a,f;if(!/(38|40|27)/.test(n.keyCode))return;r=e(this),n.preventDefault(),n.stopPropagation();if(r.is(".disabled, :disabled"))return;u=i(r),a=u.hasClass("open");if(!a||a&&n.keyCode==27)return n.which==27&&u.find(t).focus(),r.click();s=e("[role=menu] li:not(.divider):visible a",u);if(!s.length)return;f=s.index(s.filter(":focus")),n.keyCode==38&&f>0&&f--,n.keyCode==40&&f<s.length-1&&f++,~f||(f=0),s.eq(f).focus()}};var s=e.fn.dropdown;e.fn.dropdown=function(t){return this.each(function(){var r=e(this),i=r.data("dropdown");i||r.data("dropdown",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.dropdown.Constructor=n,e.fn.dropdown.noConflict=function(){return e.fn.dropdown=s,this},e(document).on("click.dropdown.data-api",r).on("click.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on(".dropdown-menu",function(e){e.stopPropagation()}).on("click.dropdown.data-api",t,n.prototype.toggle).on("keydown.dropdown.data-api",t+", [role=menu]",n.prototype.keydown)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=n,this.$element=e(t).delegate('[data-dismiss="modal"]',"click.dismiss.modal",e.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};t.prototype={constructor:t,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.backdrop(function(){var n=e.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body),t.$element.show(),n&&t.$element[0].offsetWidth,t.$element.addClass("in").attr("aria-hidden",!1),t.enforceFocus(),n?t.$element.one(e.support.transition.end,function(){t.$element.focus().trigger("shown")}):t.$element.focus().trigger("shown")})},hide:function(t){t&&t.preventDefault();var n=this;t=e.Event("hide"),this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=!1,this.escape(),e(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),e.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var t=this;e(document).on("focusin.modal",function(e){t.$element[0]!==e.target&&!t.$element.has(e.target).length&&t.$element.focus()})},escape:function(){var e=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(t){t.which==27&&e.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var t=this,n=setTimeout(function(){t.$element.off(e.support.transition.end),t.hideModal()},500);this.$element.one(e.support.transition.end,function(){clearTimeout(n),t.hideModal()})},hideModal:function(){var e=this;this.$element.hide(),this.backdrop(function(){e.removeBackdrop(),e.$element.trigger("hidden")})},removeBackdrop:function(){this.$backdrop.remove(),this.$backdrop=null},backdrop:function(t){var n=this,r=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var i=e.support.transition&&r;this.$backdrop=e('<div class="modal-backdrop '+r+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?e.proxy(this.$element[0].focus,this.$element[0]):e.proxy(this.hide,this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");if(!t)return;i?this.$backdrop.one(e.support.transition.end,t):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,t):t()):t&&t()}};var n=e.fn.modal;e.fn.modal=function(n){return this.each(function(){var r=e(this),i=r.data("modal"),s=e.extend({},e.fn.modal.defaults,r.data(),typeof n=="object"&&n);i||r.data("modal",i=new t(this,s)),typeof n=="string"?i[n]():s.show&&i.show()})},e.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},e.fn.modal.Constructor=t,e.fn.modal.noConflict=function(){return e.fn.modal=n,this},e(document).on("click.modal.data-api",'[data-toggle="modal"]',function(t){var n=e(this),r=n.attr("href"),i=e(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},i.data(),n.data());t.preventDefault(),i.modal(s).one("hide",function(){n.focus()})})}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("tooltip",e,t)};t.prototype={constructor:t,init:function(t,n,r){var i,s,o,u,a;this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.enabled=!0,o=this.options.trigger.split(" ");for(a=o.length;a--;)u=o[a],u=="click"?this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this)):u!="manual"&&(i=u=="hover"?"mouseenter":"focus",s=u=="hover"?"mouseleave":"blur",this.$element.on(i+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,e.proxy(this.leave,this)));this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(t){return t=e.extend({},e.fn[this.type].defaults,this.$element.data(),t),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},enter:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);if(!n.options.delay||!n.options.delay.show)return n.show();clearTimeout(this.timeout),n.hoverState="in",this.timeout=setTimeout(function(){n.hoverState=="in"&&n.show()},n.options.delay.show)},leave:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!n.options.delay||!n.options.delay.hide)return n.hide();n.hoverState="out",this.timeout=setTimeout(function(){n.hoverState=="out"&&n.hide()},n.options.delay.hide)},show:function(){var t,n,r,i,s,o,u=e.Event("show");if(this.hasContent()&&this.enabled){this.$element.trigger(u);if(u.isDefaultPrevented())return;t=this.tip(),this.setContent(),this.options.animation&&t.addClass("fade"),s=typeof this.options.placement=="function"?this.options.placement.call(this,t[0],this.$element[0]):this.options.placement,t.detach().css({top:0,left:0,display:"block"}),this.options.container?t.appendTo(this.options.container):t.insertAfter(this.$element),n=this.getPosition(),r=t[0].offsetWidth,i=t[0].offsetHeight;switch(s){case"bottom":o={top:n.top+n.height,left:n.left+n.width/2-r/2};break;case"top":o={top:n.top-i,left:n.left+n.width/2-r/2};break;case"left":o={top:n.top+n.height/2-i/2,left:n.left-r};break;case"right":o={top:n.top+n.height/2-i/2,left:n.left+n.width}}this.applyPlacement(o,s),this.$element.trigger("shown")}},applyPlacement:function(e,t){var n=this.tip(),r=n[0].offsetWidth,i=n[0].offsetHeight,s,o,u,a;n.offset(e).addClass(t).addClass("in"),s=n[0].offsetWidth,o=n[0].offsetHeight,t=="top"&&o!=i&&(e.top=e.top+i-o,a=!0),t=="bottom"||t=="top"?(u=0,e.left<0&&(u=e.left*-2,e.left=0,n.offset(e),s=n[0].offsetWidth,o=n[0].offsetHeight),this.replaceArrow(u-r+s,s,"left")):this.replaceArrow(o-i,o,"top"),a&&n.offset(e)},replaceArrow:function(e,t,n){this.arrow().css(n,e?50*(1-e/t)+"%":"")},setContent:function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},hide:function(){function i(){var t=setTimeout(function(){n.off(e.support.transition.end).detach()},500);n.one(e.support.transition.end,function(){clearTimeout(t),n.detach()})}var t=this,n=this.tip(),r=e.Event("hide");this.$element.trigger(r);if(r.isDefaultPrevented())return;return n.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?i():n.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var e=this.$element;(e.attr("title")||typeof e.attr("data-original-title")!="string")&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var t=this.$element[0];return e.extend({},typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:t.offsetWidth,height:t.offsetHeight},this.$element.offset())},getTitle:function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title),e},tip:function(){return this.$tip=this.$tip||e(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(t){var n=t?e(t.currentTarget)[this.type](this._options).data(this.type):this;n.tip().hasClass("in")?n.hide():n.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var n=e.fn.tooltip;e.fn.tooltip=function(n){return this.each(function(){var r=e(this),i=r.data("tooltip"),s=typeof n=="object"&&n;i||r.data("tooltip",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.tooltip.Constructor=t,e.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},e.fn.tooltip.noConflict=function(){return e.fn.tooltip=n,this}}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("popover",e,t)};t.prototype=e.extend({},e.fn.tooltip.Constructor.prototype,{constructor:t,setContent:function(){var e=this.tip(),t=this.getTitle(),n=this.getContent();e.find(".popover-title")[this.options.html?"html":"text"](t),e.find(".popover-content")[this.options.html?"html":"text"](n),e.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var e,t=this.$element,n=this.options;return e=(typeof n.content=="function"?n.content.call(t[0]):n.content)||t.attr("data-content"),e},tip:function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var n=e.fn.popover;e.fn.popover=function(n){return this.each(function(){var r=e(this),i=r.data("popover"),s=typeof n=="object"&&n;i||r.data("popover",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.popover.Constructor=t,e.fn.popover.defaults=e.extend({},e.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),e.fn.popover.noConflict=function(){return e.fn.popover=n,this}}(window.jQuery),!function(e){"use strict";function t(t,n){var r=e.proxy(this.process,this),i=e(t).is("body")?e(window):e(t),s;this.options=e.extend({},e.fn.scrollspy.defaults,n),this.$scrollElement=i.on("scroll.scroll-spy.data-api",r),this.selector=(this.options.target||(s=e(t).attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=e("body"),this.refresh(),this.process()}t.prototype={constructor:t,refresh:function(){var t=this,n;this.offsets=e([]),this.targets=e([]),n=this.$body.find(this.selector).map(function(){var n=e(this),r=n.data("target")||n.attr("href"),i=/^#\w/.test(r)&&e(r);return i&&i.length&&[[i.position().top+(!e.isWindow(t.$scrollElement.get(0))&&t.$scrollElement.scrollTop()),r]]||null}).sort(function(e,t){return e[0]-t[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},process:function(){var e=this.$scrollElement.scrollTop()+this.options.offset,t=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,n=t-this.$scrollElement.height(),r=this.offsets,i=this.targets,s=this.activeTarget,o;if(e>=n)return s!=(o=i.last()[0])&&this.activate(o);for(o=r.length;o--;)s!=i[o]&&e>=r[o]&&(!r[o+1]||e<=r[o+1])&&this.activate(i[o])},activate:function(t){var n,r;this.activeTarget=t,e(this.selector).parent(".active").removeClass("active"),r=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',n=e(r).parent("li").addClass("active"),n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate")}};var n=e.fn.scrollspy;e.fn.scrollspy=function(n){return this.each(function(){var r=e(this),i=r.data("scrollspy"),s=typeof n=="object"&&n;i||r.data("scrollspy",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.scrollspy.Constructor=t,e.fn.scrollspy.defaults={offset:10},e.fn.scrollspy.noConflict=function(){return e.fn.scrollspy=n,this},e(window).on("load",function(){e('[data-spy="scroll"]').each(function(){var t=e(this);t.scrollspy(t.data())})})}(window.jQuery),!function(e){"use strict";var t=function(t){this.element=e(t)};t.prototype={constructor:t,show:function(){var t=this.element,n=t.closest("ul:not(.dropdown-menu)"),r=t.attr("data-target"),i,s,o;r||(r=t.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,""));if(t.parent("li").hasClass("active"))return;i=n.find(".active:last a")[0],o=e.Event("show",{relatedTarget:i}),t.trigger(o);if(o.isDefaultPrevented())return;s=e(r),this.activate(t.parent("li"),n),this.activate(s,s.parent(),function(){t.trigger({type:"shown",relatedTarget:i})})},activate:function(t,n,r){function o(){i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),t.addClass("active"),s?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active"),r&&r()}var i=n.find("> .active"),s=r&&e.support.transition&&i.hasClass("fade");s?i.one(e.support.transition.end,o):o(),i.removeClass("in")}};var n=e.fn.tab;e.fn.tab=function(n){return this.each(function(){var r=e(this),i=r.data("tab");i||r.data("tab",i=new t(this)),typeof n=="string"&&i[n]()})},e.fn.tab.Constructor=t,e.fn.tab.noConflict=function(){return e.fn.tab=n,this},e(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(t){t.preventDefault(),e(this).tab("show")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.typeahead.defaults,n),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.source=this.options.source,this.$menu=e(this.options.menu),this.shown=!1,this.listen()};t.prototype={constructor:t,select:function(){var e=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(e)).change(),this.hide()},updater:function(e){return e},show:function(){var t=e.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return this.$menu.insertAfter(this.$element).css({top:t.top+t.height,left:t.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(t){var n;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(n=e.isFunction(this.source)?this.source(this.query,e.proxy(this.process,this)):this.source,n?this.process(n):this)},process:function(t){var n=this;return t=e.grep(t,function(e){return n.matcher(e)}),t=this.sorter(t),t.length?this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(e){return~e.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(e){var t=[],n=[],r=[],i;while(i=e.shift())i.toLowerCase().indexOf(this.query.toLowerCase())?~i.indexOf(this.query)?n.push(i):r.push(i):t.push(i);return t.concat(n,r)},highlighter:function(e){var t=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return e.replace(new RegExp("("+t+")","ig"),function(e,t){return"<strong>"+t+"</strong>"})},render:function(t){var n=this;return t=e(t).map(function(t,r){return t=e(n.options.item).attr("data-value",r),t.find("a").html(n.highlighter(r)),t[0]}),t.first().addClass("active"),this.$menu.html(t),this},next:function(t){var n=this.$menu.find(".active").removeClass("active"),r=n.next();r.length||(r=e(this.$menu.find("li")[0])),r.addClass("active")},prev:function(e){var t=this.$menu.find(".active").removeClass("active"),n=t.prev();n.length||(n=this.$menu.find("li").last()),n.addClass("active")},listen:function(){this.$element.on("focus",e.proxy(this.focus,this)).on("blur",e.proxy(this.blur,this)).on("keypress",e.proxy(this.keypress,this)).on("keyup",e.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",e.proxy(this.keydown,this)),this.$menu.on("click",e.proxy(this.click,this)).on("mouseenter","li",e.proxy(this.mouseenter,this)).on("mouseleave","li",e.proxy(this.mouseleave,this))},eventSupported:function(e){var t=e in this.$element;return t||(this.$element.setAttribute(e,"return;"),t=typeof this.$element[e]=="function"),t},move:function(e){if(!this.shown)return;switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:e.preventDefault(),this.prev();break;case 40:e.preventDefault(),this.next()}e.stopPropagation()},keydown:function(t){this.suppressKeyPressRepeat=~e.inArray(t.keyCode,[40,38,9,13,27]),this.move(t)},keypress:function(e){if(this.suppressKeyPressRepeat)return;this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}e.stopPropagation(),e.preventDefault()},focus:function(e){this.focused=!0},blur:function(e){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(e){e.stopPropagation(),e.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(t){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),e(t.currentTarget).addClass("active")},mouseleave:function(e){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var n=e.fn.typeahead;e.fn.typeahead=function(n){return this.each(function(){var r=e(this),i=r.data("typeahead"),s=typeof n=="object"&&n;i||r.data("typeahead",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},e.fn.typeahead.Constructor=t,e.fn.typeahead.noConflict=function(){return e.fn.typeahead=n,this},e(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(t){var n=e(this);if(n.data("typeahead"))return;n.typeahead(n.data())})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=e.extend({},e.fn.affix.defaults,n),this.$window=e(window).on("scroll.affix.data-api",e.proxy(this.checkPosition,this)).on("click.affix.data-api",e.proxy(function(){setTimeout(e.proxy(this.checkPosition,this),1)},this)),this.$element=e(t),this.checkPosition()};t.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var t=e(document).height(),n=this.$window.scrollTop(),r=this.$element.offset(),i=this.options.offset,s=i.bottom,o=i.top,u="affix affix-top affix-bottom",a;typeof i!="object"&&(s=o=i),typeof o=="function"&&(o=i.top()),typeof s=="function"&&(s=i.bottom()),a=this.unpin!=null&&n+this.unpin<=r.top?!1:s!=null&&r.top+this.$element.height()>=t-s?"bottom":o!=null&&n<=o?"top":!1;if(this.affixed===a)return;this.affixed=a,this.unpin=a=="bottom"?r.top-n:null,this.$element.removeClass(u).addClass("affix"+(a?"-"+a:""))};var n=e.fn.affix;e.fn.affix=function(n){return this.each(function(){var r=e(this),i=r.data("affix"),s=typeof n=="object"&&n;i||r.data("affix",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.affix.Constructor=t,e.fn.affix.defaults={offset:0},e.fn.affix.noConflict=function(){return e.fn.affix=n,this},e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var t=e(this),n=t.data();n.offset=n.offset||{},n.offsetBottom&&(n.offset.bottom=n.offsetBottom),n.offsetTop&&(n.offset.top=n.offsetTop),t.affix(n)})})}(window.jQuery);}, "libs/jquery": function(exports, require, module) {/*!
 * jQuery JavaScript Library v1.9.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-1-14
 */
(function( window, undefined ) {
"use strict";
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.0",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support, all, a, select, opt, input, fragment, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			body.style.zoom = 1;
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;
	
function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt /* For internal use only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i, l,

		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			for ( i = 0, l = name.length; i < l; i++ ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data, false );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name, false );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},
	
	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				// Try to fetch any internally stored data first
				return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
			}

			this.each(function() {
				jQuery.data( this, key, value );
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			// In IE9+, Flash objects don't have .getAttribute (#12945)
			// Support: IE9+
			if ( typeof elem.getAttribute !== "undefined" ) {
				ret =  elem.getAttribute( name );
			}

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( rboolean.test( name ) ) {
					// Set corresponding property to false for boolean attributes
					// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
					if ( !getSetAttribute && ruseDefault.test( name ) ) {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					} else {
						elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		var
			// Use .prop to determine if this attribute is understood as boolean
			prop = jQuery.prop( elem, name ),

			// Fetch it accordingly
			attr = typeof prop === "boolean" && elem.getAttribute( name ),
			detail = typeof prop === "boolean" ?

				getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test( name ) ?
						elem[ jQuery.camelCase( "default-" + name ) ] :
						!!attr :

				// fetch an attribute node for properties not recognized as boolean
				elem.getAttributeNode( name );

		return detail && detail.value !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return jQuery.nodeName( elem, "input" ) ?

				// Ignore the value *property* by using defaultValue
				elem.defaultValue :

				ret && ret.specified ? ret.value : undefined;
		},
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret == null ? undefined : ret;
			}
		});
	});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			elemData = elem.nodeType !== 3 && elem.nodeType !== 8 && jQuery._data( elem );

		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = event.type || event,
			namespaces = event.namespace ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== document.activeElement && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === document.activeElement && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /\{\s*\[native code\]\s*\}/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !documentIsXML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results, slice.call( newContext.querySelectorAll(
						newSelector
					), 0 ) );
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );

				return m ?
					m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
						[m] :
						undefined :
					[];
			}
		};
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.tagNameNoComments ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				for ( ; (elem = results[i]); i++ ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Name
	Expr.find["NAME"] = support.getByName && function( tag, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};

	// Class
	Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
			return context.getElementsByClassName( className );
		}
	};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		var compare;

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
			if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
				if ( a === doc || contains( preferredDoc, a ) ) {
					return -1;
				}
				if ( b === doc || contains( preferredDoc, b ) ) {
					return 1;
				}
				return 0;
			}
			return compare & 4 ? -1 : 1;
		}

		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return ( ~b.sourceIndex || MAX_NEGATIVE ) - ( contains( preferredDoc, a ) && ~a.sourceIndex || MAX_NEGATIVE );

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	hasDuplicate = false;
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// rbuggyQSA always contains :focus, so no need for an existence check
	if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	var val;

	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( !documentIsXML ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( documentIsXML || support.attributes ) {
		return elem.getAttribute( name );
	}
	return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
		name :
		val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

function siblingCheck( a, b ) {
	var cur = a && b && a.nextSibling;

	for ( ; cur; cur = cur.nextSibling ) {
		if ( cur === b ) {
			return -1;
		}
	}

	return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[4] ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}

			nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.substr( result.length - check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifider
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsXML ?
						elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
						elem.lang) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && combinator.dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Nested matchers should use non-integer dirruns
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			// `i` starts as a string, so matchedCount would equal "00" if there are no elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				for ( j = 0; (matcher = setMatchers[j]); j++ ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !documentIsXML &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			for ( i = matchExpr["needsContext"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		documentIsXML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, ret, self;

		if ( typeof selector !== "string" ) {
			self = this;
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < self.length; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		ret = [];
		for ( i = 0; i < this.length; i++ ) {
			jQuery.find( selector, this[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( jQuery.unique( ret ) );
		ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true) );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		var isFunc = jQuery.isFunction( value );

		// Make sure that the elements are removed from the DOM before they are inserted
		// this can help fix replacing a parent with child elements
		if ( !isFunc && typeof value !== "string" ) {
			value = jQuery( value ).not( this ).detach();
		}

		return this.domManip( [ value ], true, function( elem ) {
			var next = this.nextSibling,
				parent = this.parentNode;

			if ( parent && this.nodeType === 1 || this.nodeType === 11 ) {

				jQuery( this ).remove();

				if ( next ) {
					next.parentNode.insertBefore( elem, next );
				} else {
					parent.appendChild( elem );
				}
			}
		});
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, table ? self.html() : undefined );
				}
				self.domManip( args, table, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						node,
						i
					);
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery.ajax({
									url: node.src,
									type: "GET",
									dataType: "script",
									async: false,
									global: false,
									"throws": true
								});
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	var attr = elem.getAttributeNode("type");
	elem.type = ( attr && attr.specified ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, data, e;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, srcElements, node, i, clone,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var contains, elem, tag, tmp, wrap, tbody, j,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	}
});
var curCSS, getStyles, iframe,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else if ( !values[ index ] && !isHidden( elem ) ) {
			jQuery._data( elem, "olddisplay", jQuery.css( elem, "display" ) );
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		var bool = typeof state === "boolean";

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {
					isSuccess = true;
					statusText = "notmodified";

				// If we have data
				} else {
					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		converters = {},
		i = 0,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ];

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									xml = xhr.responseXML;
									responseHeaders = xhr.getAllResponseHeaders();

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/*jshint validthis:true */
	var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing a non empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "auto" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.cur && hooks.cur.finish ) {
				hooks.cur.finish.call( this );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== "undefined" ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.documentElement;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.documentElement;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
}, "models/OPML": function(exports, require, module) {(function() {
  var OPML,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  OPML = (function(_super) {
    __extends(OPML, _super);

    function OPML(text, manager) {
      this.text = text != null ? text : null;
      this.manager = manager;
      this["delete"] = __bind(this["delete"], this);
      this._endMoving = __bind(this._endMoving, this);
      this._startMoving = __bind(this._startMoving, this);
      this._move = __bind(this._move, this);
      this._removeChild = __bind(this._removeChild, this);
      this._rename = __bind(this._rename, this);
      this._addChild = __bind(this._addChild, this);
      this._refresh = __bind(this._refresh, this);
      this._modify = __bind(this._modify, this);
      this.move = __bind(this.move, this);
      this.endMoving = __bind(this.endMoving, this);
      this.startMoving = __bind(this.startMoving, this);
      this.removeChild = __bind(this.removeChild, this);
      this.rename = __bind(this.rename, this);
      this.addChild = __bind(this.addChild, this);
      this.modify = __bind(this.modify, this);
      this.findNode = __bind(this.findNode, this);
      this.save = __bind(this.save, this);
      this.exportBody = __bind(this.exportBody, this);
      this.Export = __bind(this.Export, this);
      this.download = __bind(this.download, this);
      this.find = __bind(this.find, this);
      this.JSONize = __bind(this.JSONize, this);
      this.parse = __bind(this.parse, this);
      if (this.text != null) {
        this.parse(this.text);
      }
      this.events = {};
      this.events["outline." + this.title + ".addChild"] = this._addChild;
      this.events["outline." + this.title + ".edit"] = this._modify;
      this.events["outline." + this.title + ".removeChild"] = this._removeChild;
      this.events["outline." + this.title + ".move"] = this._move;
      this.events["outline." + this.title + ".startMoving"] = this._startMoving;
      this.events["outline." + this.title + ".endMoving"] = this._endMoving;
      if (typeof Client !== "undefined" && Client !== null) {
        Client.events = this.events;
      }
      if (typeof Client !== "undefined" && Client !== null) {
        Client.loadEvents();
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
      this.locationService = new (DepMan.helper("Locations"))(this);
      console.log(this.structure);
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
        if (kid.text === next) {
          el = kid;
          break;
        }
      }
      if (search.length === 0) {
        return el;
      }
      if ((el == null) || (el.children == null)) {
        return null;
      }
      return this.find(search, el.children);
    };

    OPML.prototype.checkProp = function(into, from, prop) {
      var aux;

      aux = from.getAttribute(prop);
      if (aux != null) {
        return into[prop.substr(1)].set(aux);
      }
    };

    OPML.prototype.download = function() {
      return window.open("data:application/xml," + ((this.Export()).replace(/["']/g, "\"")));
    };

    OPML.prototype.Export = function() {
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
        string += "<outline text='" + (kid.text.replace("\"", "&#34;").replace("'", "&#39;")) + "' ";
        if (kid.note != null) {
          string += "_note='" + (kid.note.replace("\"", "&#34;").replace("'", "&#39;").replace("\n", " ")) + "' ";
        }
        string += "_x='" + kid.x + "' _y='" + kid.y + "' ";
        if (kid.status != null) {
          string += "_status='" + kid.status + "'";
        } else if (kid.children != null) {
          kids = kid.children.topics;
          valid = true;
          for (_j = 0, _len1 = kids.length; _j < _len1; _j++) {
            newkid = kids[_j];
            if (!((_ref1 = newkid.status) === "checked" || _ref1 === "determinate")) {
              valid = false;
              break;
            }
          }
          if (valid) {
            string += "_status='determinate'";
          } else {
            string += "_status='indeterminate'";
          }
        } else {
          string += "_status='unchecked'";
        }
        if (kid.children) {
          string += ">" + (this.exportBody(kid.children)) + "</outline>";
        } else {
          string += "/>";
        }
      }
      return string.replace("\n", "");
    };

    OPML.prototype.save = function() {
      var _ref,
        _this = this;

      if ((_ref = window.storage) != null) {
        _ref.setItem("opmls." + this.title, this.Export());
      }
      return window.storage.getItem("opmls", function(sets) {
        var storageIndex, _ref1, _ref2, _ref3;

        if ((_ref1 = sets.opmls) == null) {
          sets.opmls = "[]";
        }
        storageIndex = JSON.parse(sets.opmls);
        if (!storageIndex) {
          window.storage.setItem("opmls", JSON.stringify([_this.title]));
        } else if (!(_ref2 = _this.title, __indexOf.call(storageIndex, _ref2) >= 0)) {
          if (_this.pastTitle != null) {
            storageIndex.splice(storageIndex.indexOf(_this.pastTitle), 1);
            storage.removeItem("opmls." + _this.pastTitle);
            delete _this.pastTitle;
          }
          storageIndex.push(_this.title);
          if ((_ref3 = window.storage) != null) {
            _ref3.setItem("opmls", (JSON.stringify(storageIndex)).replace(/<br\/?>/g, ""));
          }
        }
        return Toast("Saved " + _this.title, "OPML Document saved. You can now return to ruining it, without the worry of loosing it.");
      });
    };

    OPML.prototype.findNode = function(path, from) {
      var el, kid, _i, _len, _ref;

      if (from == null) {
        from = this.structure;
      }
      el = path.shift();
      _ref = from.topics;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        kid = _ref[_i];
        if (kid.text === el) {
          if (path.length > 0) {
            return this.findNode(path, kid.children);
          } else {
            return kid;
          }
        }
      }
      return null;
    };

    OPML.prototype.modify = function(path, data) {
      return Client.publish("outline." + this.title + ".edit", path, data);
    };

    OPML.prototype.addChild = function(path) {
      return Client.publish("outline." + this.title + ".addChild", path);
    };

    OPML.prototype.rename = function(title) {
      return Client.publish("outline." + this.title + ".rename", title);
    };

    OPML.prototype.removeChild = function(path) {
      return Client.publish("outline." + this.title + ".removeChild", path);
    };

    OPML.prototype.startMoving = function() {
      return Client.publish("outline." + this.title + ".startMoving");
    };

    OPML.prototype.endMoving = function() {
      return Client.publish("outline." + this.title + ".endMoving");
    };

    OPML.prototype.move = function(path, to) {
      return Client.publish("outline." + this.title + ".move", JSON.stringify(path), JSON.stringify(to));
    };

    OPML.prototype._modify = function(path, data) {
      var item, _ref;

      item = this.findNode(JSON.parse(path));
      console.log(path, item, data);
      if (data.text != null) {
        item.text = data.text;
      }
      if (data.text != null) {
        item._text = data.text;
      }
      if (data.status != null) {
        if ((_ref = item.status) === "checked" || _ref === "unchecked") {
          item.status = data.status;
        }
      }
      if (data.note != null) {
        item.note = data.note;
      }
      return this._refresh();
    };

    OPML.prototype._refresh = function() {
      if (this.refreshView != null) {
        this.refreshView();
      }
      if (this.controller.frameBuffer != null) {
        return this.controller.frameBuffer.sequence();
      }
    };

    OPML.prototype._addChild = function(path) {
      var item;

      item = this.findNode(JSON.parse(path));
      item.addChild(this.locationService.getNextChild(path.length));
      return this._refresh();
    };

    OPML.prototype._rename = function(title) {
      this.events["outline." + title + ".addChild"] = this.events["outline." + this.title + ".addChild"];
      this.events["outline." + title + ".edit"] = this.events["outline." + this.title + ".edit"];
      this.events["outline." + title + ".removeChlid"] = this.events["outline." + this.title + ".removeChlid"];
      this.events["outline." + title + ".move"] = this.events["outline." + this.title + ".move"];
      this.events["outline." + title + ".startMoving"] = this.events["outline." + this.title + ".startMoving"];
      this.events["outline." + title + ".endMoving"] = this.events["outline." + this.title + ".endMoving"];
      Client.queue["outline." + this.title + ".addChild"] = null;
      Client.queue["outline." + this.title + ".edit"] = null;
      Client.queue["outline." + this.title + ".removeChild"] = null;
      Client.queue["outline." + this.title + ".move"] = null;
      this.events = {};
      if (typeof Client !== "undefined" && Client !== null) {
        Client.events = this.events;
      }
      if (typeof Client !== "undefined" && Client !== null) {
        Client.loadEvents();
      }
      this.title = title;
      return this._refresh();
    };

    OPML.prototype._removeChild = function(path) {
      var item, parent;

      item = this.findNode(JSON.parse(path));
      parent = item.parent;
      item.parent.remove(item);
      if (!parent.topics.length) {
        parent.parent.children = null;
      }
      return this._refresh();
    };

    OPML.prototype._move = function(path, to) {
      var item;

      item = this.findNode(JSON.parse(path));
      to = JSON.parse(to);
      item.x = to.x;
      return item.y = to.y;
    };

    OPML.prototype._startMoving = function() {
      return this.controller.frameBuffer.start();
    };

    OPML.prototype._endMoving = function() {
      return this.controller.frameBuffer.end();
    };

    OPML.prototype["delete"] = function() {
      var _this = this;

      return JSON.parse(storage.getItem("opmls", function(sets) {
        var index, _ref;

        index = sets.index;
        if (_ref = _this.title, __indexOf.call(index, _ref) >= 0) {
          _this.controller.deactivate();
          storage.removeItem("opmls." + _this.title);
          index.splice(index.indexOf(_this.title), 1);
          return storage.setItem("opmls", JSON.stringify(index));
        }
      }));
    };

    return OPML;

  })(BaseObject);

  module.exports = OPML;

}).call(this);
}, "models/Outline": function(exports, require, module) {(function() {
  var ER, FakeOutline, Outline, OutlineCollection, OutlineErrorReporter, _checkParam, _map, _params, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _map = {
    unchecked: "icon-check-empty",
    checked: "icon-check",
    determinate: "icon-circle",
    indeterminate: "icon-circle-blank"
  };

  _params = ["status", "note", "text", "children"];

  _checkParam = function(object, field, param, from) {
    return object[field] = from.getAttribute(param) || "";
  };

  OutlineCollection = (function(_super) {
    __extends(OutlineCollection, _super);

    function OutlineCollection(bodyElement, parent, depth) {
      var _this = this;

      if (bodyElement == null) {
        bodyElement = null;
      }
      this.parent = parent;
      this.depth = depth != null ? depth : 0;
      if (!bodyElement) {
        this.topics = [];
      } else {
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
    }

    OutlineCollection.prototype.remove = function(item) {
      return this.topics.splice(this.topics.indexOf(item), 1);
    };

    OutlineCollection.prototype.getPath = function() {
      if (this.parent == null) {
        return [];
      }
      return this.parent.getPath();
    };

    return OutlineCollection;

  })(BaseObject);

  FakeOutline = (function() {
    function FakeOutline(length) {
      this.text = "New Node";
      this._status = "unchecked";
      this.childNodes = [];
      this.x = length.x;
      this.y = length.y;
    }

    FakeOutline.prototype.getAttribute = function(attr) {
      return this[attr] || null;
    };

    return FakeOutline;

  })();

  Outline = (function() {
    function Outline(xmlDoc, parent, length) {
      if (xmlDoc == null) {
        xmlDoc = null;
      }
      this.parent = parent;
      this.addChild = __bind(this.addChild, this);
      this.getStatus = __bind(this.getStatus, this);
      this.getData = __bind(this.getData, this);
      this.getPath = __bind(this.getPath, this);
      if (xmlDoc == null) {
        xmlDoc = new FakeOutline(length);
      }
      this.getData(xmlDoc);
      this._map = _map;
      console.log(this);
    }

    Outline.prototype.getPath = function() {
      var prev;

      prev = this.parent.getPath();
      prev.push(this.text);
      return prev;
    };

    Outline.prototype.getData = function(xmlDoc) {
      var what, _children, _i, _len;

      this.fold = false;
      for (_i = 0, _len = _params.length; _i < _len; _i++) {
        what = _params[_i];
        this[what] = null;
      }
      _checkParam(this, "text", "text", xmlDoc);
      this._text = this.text;
      _checkParam(this, "status", "_status", xmlDoc);
      _checkParam(this, "note", "_note", xmlDoc);
      _checkParam(this, "x", "_x", xmlDoc);
      _checkParam(this, "y", "_y", xmlDoc);
      console.log(this.x, this.y);
      if (this.x !== "") {
        this.x = parseInt(this.x);
      }
      if (this.y !== "") {
        this.y = parseInt(this.y);
      }
      _children = new OutlineCollection(xmlDoc.childNodes, this, this.parent.depth + 1);
      this.children = (_children.topics.length ? _children : null);
      if (this.status === "") {
        if (!((this.children != null) && this.children.topics.length)) {
          return this.status = "unchecked";
        }
      }
    };

    Outline.prototype.getStatus = function() {
      var done, kid, _i, _len, _ref, _ref1, _ref2;

      if ((this.children != null) && this.children.topics.length) {
        done = 1;
        _ref = this.children.topics;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          kid = _ref[_i];
          if (!((_ref1 = kid.status) === "checked" || _ref1 === "determinate")) {
            this.status = "indeterminate";
            done = 0;
            break;
          }
        }
        if (done) {
          this.status = "determinate";
        }
      } else if ((_ref2 = this.status) === "determinate" || _ref2 === "indeterminate") {
        this.status = "unchecked";
      }
      return _map[this.status];
    };

    Outline.prototype.addChild = function(length) {
      if (this.children == null) {
        this.children = new OutlineCollection(false, this, this.parent.depth + 1);
      }
      return this.children.topics.push(new Outline(null, this.children, length));
    };

    return Outline;

  })();

  OutlineErrorReporter = (function(_super) {
    __extends(OutlineErrorReporter, _super);

    function OutlineErrorReporter() {
      _ref = OutlineErrorReporter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    OutlineErrorReporter.errors = {
      "UpdateError": ["Must give a proper property to update!"]
    };

    return OutlineErrorReporter;

  })(BaseObject);

  ER = OutlineErrorReporter;

  module.exports = {
    Collection: OutlineCollection,
    Element: Outline,
    generate: function(xml) {
      return new OutlineCollection(xml.getElementsByTagName("body")[0].childNodes);
    }
  };

}).call(this);
}, "qrcapacitytable": function(exports, require, module) {/**
 this contains the max string length for all qr code Versions in Binary Safe / Byte Mode
 each entry is in the order of error correct level
 [L,M,Q,H]

 the qrcode lib sets strange values for QRErrorCorrectLevel having to do with masking against patterns
 the maximum string length for error correct level H is 1273 characters long.
 */

exports.QRCapacityTable = [
    [17,14,11,7]
    ,[32,26,20,14]
    ,[53,42,32,24]
    ,[78,62,46,34]
    ,[106,84,60,44]
    ,[134,106,74,58]
    ,[154,122,86,64]
    ,[192,152,108,84]
    ,[230,180,130,98]
    ,[271,213,151,119]
    ,[321,251,177,137]//11
    ,[367,287,203,155]
    ,[425,331,241,177]
    ,[458,362,258,194]
    ,[520,412,292,220]
    ,[586,450,322,250]
    ,[644,504,364,280]
    ,[718,560,394,310]
    ,[792,624,442,338]
    ,[858,666,482,382]
    ,[929,711,509,403]
    ,[1003,779,565,439]
    ,[1091,857,611,461]
    ,[1171,911,661,511]//24
    ,[1273,997,715,535]
    ,[1367,1059,751,593]
    ,[1465,1125,805,625]
    ,[1528,1190,868,658]//28
    ,[1628,1264,908,698]
    ,[1732,1370,982,742]
    ,[1840,1452,1030,790]
    ,[1952,1538,1112,842]//32
    ,[2068,1628,1168,898]
    ,[2188,1722,1228,958]
    ,[2303,1809,1283,983]
    ,[2431,1911,1351,1051]//36
    ,[2563,1989,1423,1093]
    ,[2699,2099,1499,1139]
    ,[2809,2213,1579,1219]
    ,[2953,2331,1663,1273]//40
];}, "qrcode": function(exports, require, module) {/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * EXPORTS:
 *	{
 *	QRCode:QRCode
 *	QRErrorCorrectLevel:QRErrorCorrectLevel
 *	}
 //---------------------------------------------------------------------
 // QRCode for JavaScript
 //
 // Copyright (c) 2009 Kazuhiko Arase
 //
 // URL: http://www.d-project.com/
 //
 // Licensed under the MIT license:
 //   http://www.opensource.org/licenses/mit-license.php
 //
 // The word "QR Code" is registered trademark of
 // DENSO WAVE INCORPORATED
 //   http://www.denso-wave.com/qrcode/faqpatent-e.html
 //
 //---------------------------------------------------------------------
 */

//---------------------------------------------------------------------
// QRCode
//---------------------------------------------------------------------

exports.QRCode = QRCode;

var QRDataArray = (typeof Uint32Array == 'undefined'?Uint32Array:Array);

function QRCode(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = new QRDataArray();
}

QRCode.prototype = {

    addData : function(data) {
        var newData = new QR8bitByte(data);
        this.dataList.push(newData);
        this.dataCache = null;
    },

    isDark : function(row, col) {
        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
            throw new Error(row + "," + col);
        }
        return this.modules[row][col];
    },

    getModuleCount : function() {
        return this.moduleCount;
    },

    make : function() {
        this.makeImpl(false, this.getBestMaskPattern() );
    },

    makeImpl : function(test, maskPattern) {

        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = new QRDataArray(this.moduleCount);

        for (var row = 0; row < this.moduleCount; row++) {

            this.modules[row] = new QRDataArray(this.moduleCount);

            for (var col = 0; col < this.moduleCount; col++) {
                this.modules[row][col] = null;//(col + row) % 3;
            }
        }

        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);

        if (this.typeNumber >= 7) {
            this.setupTypeNumber(test);
        }

        if (this.dataCache == null) {
            this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
        }

        this.mapData(this.dataCache, maskPattern);
    },

    setupPositionProbePattern : function(row, col)  {

        for (var r = -1; r <= 7; r++) {

            if (row + r <= -1 || this.moduleCount <= row + r) continue;

            for (var c = -1; c <= 7; c++) {

                if (col + c <= -1 || this.moduleCount <= col + c) continue;

                if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
                    || (0 <= c && c <= 6 && (r == 0 || r == 6) )
                    || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
                    this.modules[row + r][col + c] = true;
                } else {
                    this.modules[row + r][col + c] = false;
                }
            }
        }
    },

    getBestMaskPattern : function() {

        var minLostPoint = 0;
        var pattern = 0;

        for (var i = 0; i < 8; i++) {

            this.makeImpl(true, i);

            var lostPoint = QRUtil.getLostPoint(this);

            if (i == 0 || minLostPoint >  lostPoint) {
                minLostPoint = lostPoint;
                pattern = i;
            }
        }

        return pattern;
    },

    setupTimingPattern : function() {

        for (var r = 8; r < this.moduleCount - 8; r++) {
            if (this.modules[r][6] != null) {
                continue;
            }
            this.modules[r][6] = (r % 2 == 0);
        }

        for (var c = 8; c < this.moduleCount - 8; c++) {
            if (this.modules[6][c] != null) {
                continue;
            }
            this.modules[6][c] = (c % 2 == 0);
        }
    },

    setupPositionAdjustPattern : function() {

        var pos = QRUtil.getPatternPosition(this.typeNumber);
        pos = pos || '';
        for (var i = 0; i < pos.length; i++) {

            for (var j = 0; j < pos.length; j++) {

                var row = pos[i];
                var col = pos[j];

                if (this.modules[row][col] != null) {
                    continue;
                }

                for (var r = -2; r <= 2; r++) {

                    for (var c = -2; c <= 2; c++) {

                        if (r == -2 || r == 2 || c == -2 || c == 2
                            || (r == 0 && c == 0) ) {
                            this.modules[row + r][col + c] = true;
                        } else {
                            this.modules[row + r][col + c] = false;
                        }
                    }
                }
            }
        }
    },

    setupTypeNumber : function(test) {

        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

        for (var i = 0; i < 18; i++) {
            var mod = (!test && ( (bits >> i) & 1) == 1);
            this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        }

        for (var i = 0; i < 18; i++) {
            var mod = (!test && ( (bits >> i) & 1) == 1);
            this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
        }
    },

    setupTypeInfo : function(test, maskPattern) {

        var data = (this.errorCorrectLevel << 3) | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);

        // vertical
        for (var i = 0; i < 15; i++) {

            var mod = (!test && ( (bits >> i) & 1) == 1);

            if (i < 6) {
                this.modules[i][8] = mod;
            } else if (i < 8) {
                this.modules[i + 1][8] = mod;
            } else {
                this.modules[this.moduleCount - 15 + i][8] = mod;
            }
        }

        // horizontal
        for (var i = 0; i < 15; i++) {

            var mod = (!test && ( (bits >> i) & 1) == 1);

            if (i < 8) {
                this.modules[8][this.moduleCount - i - 1] = mod;
            } else if (i < 9) {
                this.modules[8][15 - i - 1 + 1] = mod;
            } else {
                this.modules[8][15 - i - 1] = mod;
            }
        }

        // fixed module
        this.modules[this.moduleCount - 8][8] = (!test);

    },

    mapData : function(data, maskPattern) {

        var inc = -1;
        var row = this.moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;

        for (var col = this.moduleCount - 1; col > 0; col -= 2) {

            if (col == 6) col--;

            while (true) {

                for (var c = 0; c < 2; c++) {

                    if (this.modules[row][col - c] == null) {

                        var dark = false;

                        if (byteIndex < data.length) {
                            dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
                        }

                        var mask = QRUtil.getMask(maskPattern, row, col - c);

                        if (mask) {
                            dark = !dark;
                        }

                        this.modules[row][col - c] = dark;
                        bitIndex--;

                        if (bitIndex == -1) {
                            byteIndex++;
                            bitIndex = 7;
                        }
                    }
                }

                row += inc;

                if (row < 0 || this.moduleCount <= row) {
                    row -= inc;
                    inc = -inc;
                    break;
                }
            }
        }

    }

};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {

    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    var buffer = new QRBitBuffer();

    for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
        data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
        totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. ("
            + buffer.getLengthInBits()
            + ">"
            +  totalDataCount * 8
            + ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
    }

    // padding
    while (true) {

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
        }
        buffer.put(QRCode.PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
        }
        buffer.put(QRCode.PAD1, 8);
    }

    return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var dcdata = new QRDataArray(rsBlocks.length);
    var ecdata = new QRDataArray(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new QRDataArray(dcCount);

        for (var i = 0; i < dcdata[r].length; i++) {
            dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }
        offset += dcCount;

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new QRDataArray(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
            ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
        }

    }

    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
        totalCodeCount += rsBlocks[i].totalCount;
    }

    var data = new QRDataArray(totalCodeCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
            if (i < dcdata[r].length) {
                data[index++] = dcdata[r][i];
            }
        }
    }

    for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
            if (i < ecdata[r].length) {
                data[index++] = ecdata[r][i];
            }
        }
    }

    return data;

};

//---------------------------------------------------------------------
// QR8bitByte
//---------------------------------------------------------------------

function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
}

QR8bitByte.prototype = {

    getLength : function(buffer) {
        return this.data.length;
    },

    write : function(buffer) {
        for (var i = 0; i < this.data.length; i++) {
            // not JIS ...
            buffer.put(this.data.charCodeAt(i), 8);
        }
    }
};

//---------------------------------------------------------------------
// QRMode
//---------------------------------------------------------------------

var QRMode = {
    MODE_NUMBER :		1 << 0,
    MODE_ALPHA_NUM : 	1 << 1,
    MODE_8BIT_BYTE : 	1 << 2,
    MODE_KANJI :		1 << 3
};

//---------------------------------------------------------------------
// QRErrorCorrectLevel
//---------------------------------------------------------------------
//exported

var QRErrorCorrectLevel = exports.QRErrorCorrectLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
};

//---------------------------------------------------------------------
// QRMaskPattern
//---------------------------------------------------------------------

var QRMaskPattern =  {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
};

//---------------------------------------------------------------------
// QRUtil
//---------------------------------------------------------------------

var QRUtil = {

    PATTERN_POSITION_TABLE : [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)	| (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) );
        }
        return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) );
        }
        return (data << 12) | d;
    },

    getBCHDigit : function(data) {

        var digit = 0;

        while (data != 0) {
            digit++;
            data >>>= 1;
        }

        return digit;
    },

    getPatternPosition : function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {

        switch (maskPattern) {

            case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
            case QRMaskPattern.PATTERN001 : return i % 2 == 0;
            case QRMaskPattern.PATTERN010 : return j % 3 == 0;
            case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
            case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
            case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
            case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
            case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;

            default :
                throw new Error("bad maskPattern:" + maskPattern);
        }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

        var a = new QRPolynomial([1], 0);

        for (var i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
        }

        return a;
    },

    getLengthInBits : function(mode, type) {

        if (1 <= type && type < 10) {

            // 1 - 9

            switch(mode) {
                case QRMode.MODE_NUMBER 	: return 10;
                case QRMode.MODE_ALPHA_NUM 	: return 9;
                case QRMode.MODE_8BIT_BYTE	: return 8;
                case QRMode.MODE_KANJI  	: return 8;
                default :
                    throw new Error("mode:" + mode);
            }

        } else if (type < 27) {

            // 10 - 26

            switch(mode) {
                case QRMode.MODE_NUMBER 	: return 12;
                case QRMode.MODE_ALPHA_NUM 	: return 11;
                case QRMode.MODE_8BIT_BYTE	: return 16;
                case QRMode.MODE_KANJI  	: return 10;
                default :
                    throw new Error("mode:" + mode);
            }

        } else if (type < 41) {

            // 27 - 40

            switch(mode) {
                case QRMode.MODE_NUMBER 	: return 14;
                case QRMode.MODE_ALPHA_NUM	: return 13;
                case QRMode.MODE_8BIT_BYTE	: return 16;
                case QRMode.MODE_KANJI  	: return 12;
                default :
                    throw new Error("mode:" + mode);
            }

        } else {
            throw new Error("type:" + type);
        }
    },

    getLostPoint : function(qrCode) {

        var moduleCount = qrCode.getModuleCount();

        var lostPoint = 0;

        // LEVEL1

        for (var row = 0; row < moduleCount; row++) {

            for (var col = 0; col < moduleCount; col++) {

                var sameCount = 0;
                var dark = qrCode.isDark(row, col);

                for (var r = -1; r <= 1; r++) {

                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }

                    for (var c = -1; c <= 1; c++) {

                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }

                        if (r == 0 && c == 0) {
                            continue;
                        }

                        if (dark == qrCode.isDark(row + r, col + c) ) {
                            sameCount++;
                        }
                    }
                }

                if (sameCount > 5) {
                    lostPoint += (3 + sameCount - 5);
                }
            }
        }

        // LEVEL2

        for (var row = 0; row < moduleCount - 1; row++) {
            for (var col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                if (qrCode.isDark(row,     col    ) ) count++;
                if (qrCode.isDark(row + 1, col    ) ) count++;
                if (qrCode.isDark(row,     col + 1) ) count++;
                if (qrCode.isDark(row + 1, col + 1) ) count++;
                if (count == 0 || count == 4) {
                    lostPoint += 3;
                }
            }
        }

        // LEVEL3

        for (var row = 0; row < moduleCount; row++) {
            for (var col = 0; col < moduleCount - 6; col++) {
                if (qrCode.isDark(row, col)
                    && !qrCode.isDark(row, col + 1)
                    &&  qrCode.isDark(row, col + 2)
                    &&  qrCode.isDark(row, col + 3)
                    &&  qrCode.isDark(row, col + 4)
                    && !qrCode.isDark(row, col + 5)
                    &&  qrCode.isDark(row, col + 6) ) {
                    lostPoint += 40;
                }
            }
        }

        for (var col = 0; col < moduleCount; col++) {
            for (var row = 0; row < moduleCount - 6; row++) {
                if (qrCode.isDark(row, col)
                    && !qrCode.isDark(row + 1, col)
                    &&  qrCode.isDark(row + 2, col)
                    &&  qrCode.isDark(row + 3, col)
                    &&  qrCode.isDark(row + 4, col)
                    && !qrCode.isDark(row + 5, col)
                    &&  qrCode.isDark(row + 6, col) ) {
                    lostPoint += 40;
                }
            }
        }

        // LEVEL4

        var darkCount = 0;

        for (var col = 0; col < moduleCount; col++) {
            for (var row = 0; row < moduleCount; row++) {
                if (qrCode.isDark(row, col) ) {
                    darkCount++;
                }
            }
        }

        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;

        return lostPoint;
    }

};


//---------------------------------------------------------------------
// QRMath
//---------------------------------------------------------------------

var QRMath = {

    glog : function(n) {

        if (n < 1) {
            throw new Error("glog(" + n + ")");
        }

        return QRMath.LOG_TABLE[n];
    },

    gexp : function(n) {

        while (n < 0) {
            n += 255;
        }

        while (n >= 256) {
            n -= 255;
        }

        return QRMath.EXP_TABLE[n];
    },

    EXP_TABLE : new Array(256),

    LOG_TABLE : new Array(256)

};

for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
        ^ QRMath.EXP_TABLE[i - 5]
        ^ QRMath.EXP_TABLE[i - 6]
        ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

//---------------------------------------------------------------------
// QRPolynomial
//---------------------------------------------------------------------

function QRPolynomial(num, shift) {

    if (num.length == undefined) {
        throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
        offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
        this.num[i] = num[i + offset];
    }
}

QRPolynomial.prototype = {

    get : function(index) {
        return this.num[index];
    },

    getLength : function() {
        return this.num.length;
    },

    multiply : function(e) {

        var num = new Array(this.getLength() + e.getLength() - 1);

        for (var i = 0; i < this.getLength(); i++) {
            for (var j = 0; j < e.getLength(); j++) {
                num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
            }
        }

        return new QRPolynomial(num, 0);
    },

    mod : function(e) {

        if (this.getLength() - e.getLength() < 0) {
            return this;
        }

        var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );

        var num = new Array(this.getLength() );

        for (var i = 0; i < this.getLength(); i++) {
            num[i] = this.get(i);
        }

        for (var i = 0; i < e.getLength(); i++) {
            num[i] ^= QRMath.gexp(QRMath.glog(e.get(i) ) + ratio);
        }

        // recursive call
        return new QRPolynomial(num, 0).mod(e);
    }
};

//---------------------------------------------------------------------
// QRRSBlock
//---------------------------------------------------------------------

function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [
// L
// M
// Q
// H

// 1
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
// 2
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
// 3
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
// 4
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],
// 5
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],
// 6
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],
// 7
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],
// 8
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],
// 9
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],
// 10
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16]
//NOTE added by Ryan Day.to make greater than version 10 qrcodes
// this table starts on page 40 of the spec PDF. google ISO/IEC 18004
// 11
    ,[4,101,81]
    ,[1,80,50,4,81,51]
    ,[4,50,22,4,51,23]
    ,[3,36,12,8,37,13]
//12
    ,[2,116,92,2,117,93]
    ,[6,58,36,2,59,37]
    ,[4,46,20,6,47,21]
    ,[7,42,14,4,43,15]
//13
    ,[4,133,107]
    ,[8,59,37,1,60,38]
    ,[8,44,20,4,45,21]
    ,[12,33,11,4,34,12]
//14
    ,[3,145,115,1,146,116]
    ,[4,64,40,5,65,41]
    ,[11,36,16,5,37,17]
    ,[11,36,12,5,37,13]
//15
    ,[5,109,87,1,110,88]
    ,[5,65,41,5,66,42]
    ,[5,54,24,7,55,25]
    ,[11,36,12,7,37,13]
//16
    ,[5,122,98,1,123,99]
    ,[7,73,45,3,74,46]
    ,[15,43,19,2,44,20]
    ,[3,45,15,13,46,16]
//17
    ,[1,135,107,5,136,108]
    ,[10,74,46,1,75,47]
    ,[1,50,22,15,51,23]
    ,[2,42,14,17,43,15]
//18
    ,[5,150,120,1,151,121]
    ,[9,69,43,4,70,44]
    ,[17,50,22,1,51,23]
    ,[2,42,14,19,43,15]
//19
    ,[3,141,113,4,142,114]
    ,[3,70,44,11,71,45]
    ,[17,47,21,4,48,22]
    ,[9,39,13,16,40,14]
//20
    ,[3,135,107,5,136,108]
    ,[3,67,41,13,68,42]
    ,[15,54,24,5,55,25]
    ,[15,43,15,10,44,16]
//21
    ,[4,144,116,4,145,117]
    ,[17,68,42]
    ,[17,50,22,6,51,23]
    ,[19,46,16,6,47,17]
//22
    ,[2,139,111,7,140,112]
    ,[17,74,46]
    ,[7,54,24,16,55,25]
    ,[34,37,13]
//23
    ,[4,151,121,5,152,122]
    ,[4,75,47,14,76,48]
    ,[11,54,24,14,55,25]
    ,[16,45,15,14,46,16]
//24
    ,[6,147,117,4,148,118]
    ,[6,73,45,14,74,46]
    ,[11,54,24,16,55,25]
    ,[30,46,16,2,47,17]
//25
    ,[8,132,106,4,133,107]
    ,[8,75,47,13,76,48]
    ,[7,54,24,22,55,25]
    ,[22,45,15,13,46,16]
//26
    ,[10,142,114,2,143,115]
    ,[19,74,46,4,75,47]
    ,[28,50,22,6,51,23]
    ,[33,46,16,4,47,17]
//27
    ,[8,152,122,4,153,123]
    ,[22,73,45,3,74,46]
    ,[8,53,23,26,54,24]
    ,[12,45,15,28,46,16]
//28
    ,[3,147,117,10,148,118]
    ,[3,73,45,23,74,46]
    ,[4,54,24,31,55,25]
    ,[11,45,15,31,46,16]
//29
    ,[7,146,116,7,147,117]
    ,[21,73,45,7,74,46]
    ,[1,53,23,37,54,24]
    ,[19,45,15,26,46,16]
//30
    ,[5,145,115,10,146,116]
    ,[19,75,47,10,76,48]
    ,[15,54,24,25,55,25]
    ,[23,45,15,25,46,16]
//31
    ,[13,145,115,3,146,116]
    ,[2,74,46,29,75,47]
    ,[42,54,24,1,55,25]
    ,[23,45,15,28,46,16]
//32
    ,[17,145,115]
    ,[10,74,46,23,75,47]
    ,[10,54,24,35,55,25]
    ,[19,45,15,35,46,16]
//33
    ,[17,145,115,1,146,116]
    ,[14,74,46,21,75,47]
    ,[29,54,24,19,55,25]
    ,[11,45,15,46,46,16]
//34
    ,[13,145,115,6,146,116]
    ,[14,74,46,23,75,47]
    ,[44,54,24,7,55,25]
    ,[59,46,16,1,47,17]
//35
    ,[12,151,121,7,152,122]
    ,[12,75,47,26,76,48]
    ,[39,54,24,14,55,25]
    ,[22,45,15,41,46,16]
//36
    ,[6,151,121,14,152,122]
    ,[6,75,47,34,76,48]
    ,[46,54,24,10,55,25]
    ,[2,45,15,64,46,16]
//37
    ,[17,152,122,4,153,123]
    ,[29,74,46,14,75,47]
    ,[49,54,24,10,55,25]
    ,[24,45,15,46,46,16]
//38
    ,[4,152,122,18,153,123]
    ,[13,74,46,32,75,47]
    ,[48,54,24,14,55,25]
    ,[42,45,15,32,46,16]
//39
    ,[20,147,117,4,148,118]
    ,[40,75,47,7,76,48]
    ,[43,54,24,22,55,25]
    ,[10,45,15,67,46,16]
//40
    ,[19,148,118,6,149,119]
    ,[18,75,47,31,76,48]
    ,[34,54,24,34,55,25]
    ,[20,45,15,61,46,16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {

    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }

    var length = rsBlock.length / 3;

    var list = new Array();

    for (var i = 0; i < length; i++) {

        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount  = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j++) {
            list.push(new QRRSBlock(totalCount, dataCount) );
        }
    }

    return list;
}

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

    switch(errorCorrectLevel) {
        case QRErrorCorrectLevel.L :
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectLevel.M :
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectLevel.Q :
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectLevel.H :
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default :
            return undefined;
    }
}

//---------------------------------------------------------------------
// QRBitBuffer
//---------------------------------------------------------------------

function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
}

QRBitBuffer.prototype = {

    get : function(index) {
        var bufIndex = Math.floor(index / 8);
        return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    },

    put : function(num, length) {
        for (var i = 0; i < length; i++) {
            this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
        }
    },

    getLengthInBits : function() {
        return this.length;
    },

    putBit : function(bit) {

        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
        }

        if (bit) {
            this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
        }

        this.length++;
    }
};}, "stylesheets/ElectrolizeFont": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "@font-face {\n    font-family: 'Electrolize';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Electrolize'), local('Electrolize-Regular'), url(font/electrolize.woff) format('woff');\n}"; s.id = "css-ElectrolizeFont"; document.head.appendChild(s);}, "stylesheets/OpenSansFont": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 300;\n    src: local('Open Sans Light'), local('OpenSans-Light'), url(font/opensans1.woff) format('woff');\n}\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Open Sans'), local('OpenSans'), url(font/opensans2.woff) format('woff');\n}"; s.id = "css-OpenSansFont"; document.head.appendChild(s);}, "stylesheets/bootstrap-responsive": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "/*!\n * Bootstrap Responsive v2.3.1\n *\n * Copyright 2012 Twitter, Inc\n * Licensed under the Apache License v2.0\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Designed and built with all the love in the world @twitter by @mdo and @fat.\n */.clearfix{*zoom:1}.clearfix:before,.clearfix:after{display:table;line-height:0;content:\"\"}.clearfix:after{clear:both}.hide-text{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.input-block-level{display:block;width:100%;min-height:30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}@-ms-viewport{width:device-width}.hidden{display:none;visibility:hidden}.visible-phone{display:none!important}.visible-tablet{display:none!important}.hidden-desktop{display:none!important}.visible-desktop{display:inherit!important}@media(min-width:768px) and (max-width:979px){.hidden-desktop{display:inherit!important}.visible-desktop{display:none!important}.visible-tablet{display:inherit!important}.hidden-tablet{display:none!important}}@media(max-width:767px){.hidden-desktop{display:inherit!important}.visible-desktop{display:none!important}.visible-phone{display:inherit!important}.hidden-phone{display:none!important}}.visible-print{display:none!important}@media print{.visible-print{display:inherit!important}.hidden-print{display:none!important}}@media(min-width:1200px){.row{margin-left:-30px;*zoom:1}.row:before,.row:after{display:table;line-height:0;content:\"\"}.row:after{clear:both}[class*=\"span\"]{float:left;min-height:1px;margin-left:30px}.container,.navbar-static-top .container,.navbar-fixed-top .container,.navbar-fixed-bottom .container{width:1170px}.span12{width:1170px}.span11{width:1070px}.span10{width:970px}.span9{width:870px}.span8{width:770px}.span7{width:670px}.span6{width:570px}.span5{width:470px}.span4{width:370px}.span3{width:270px}.span2{width:170px}.span1{width:70px}.offset12{margin-left:1230px}.offset11{margin-left:1130px}.offset10{margin-left:1030px}.offset9{margin-left:930px}.offset8{margin-left:830px}.offset7{margin-left:730px}.offset6{margin-left:630px}.offset5{margin-left:530px}.offset4{margin-left:430px}.offset3{margin-left:330px}.offset2{margin-left:230px}.offset1{margin-left:130px}.row-fluid{width:100%;*zoom:1}.row-fluid:before,.row-fluid:after{display:table;line-height:0;content:\"\"}.row-fluid:after{clear:both}.row-fluid [class*=\"span\"]{display:block;float:left;width:100%;min-height:30px;margin-left:2.564102564102564%;*margin-left:2.5109110747408616%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.row-fluid [class*=\"span\"]:first-child{margin-left:0}.row-fluid .controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:2.564102564102564%}.row-fluid .span12{width:100%;*width:99.94680851063829%}.row-fluid .span11{width:91.45299145299145%;*width:91.39979996362975%}.row-fluid .span10{width:82.90598290598291%;*width:82.8527914166212%}.row-fluid .span9{width:74.35897435897436%;*width:74.30578286961266%}.row-fluid .span8{width:65.81196581196582%;*width:65.75877432260411%}.row-fluid .span7{width:57.26495726495726%;*width:57.21176577559556%}.row-fluid .span6{width:48.717948717948715%;*width:48.664757228587014%}.row-fluid .span5{width:40.17094017094017%;*width:40.11774868157847%}.row-fluid .span4{width:31.623931623931625%;*width:31.570740134569924%}.row-fluid .span3{width:23.076923076923077%;*width:23.023731587561375%}.row-fluid .span2{width:14.52991452991453%;*width:14.476723040552828%}.row-fluid .span1{width:5.982905982905983%;*width:5.929714493544281%}.row-fluid .offset12{margin-left:105.12820512820512%;*margin-left:105.02182214948171%}.row-fluid .offset12:first-child{margin-left:102.56410256410257%;*margin-left:102.45771958537915%}.row-fluid .offset11{margin-left:96.58119658119658%;*margin-left:96.47481360247316%}.row-fluid .offset11:first-child{margin-left:94.01709401709402%;*margin-left:93.91071103837061%}.row-fluid .offset10{margin-left:88.03418803418803%;*margin-left:87.92780505546462%}.row-fluid .offset10:first-child{margin-left:85.47008547008548%;*margin-left:85.36370249136206%}.row-fluid .offset9{margin-left:79.48717948717949%;*margin-left:79.38079650845607%}.row-fluid .offset9:first-child{margin-left:76.92307692307693%;*margin-left:76.81669394435352%}.row-fluid .offset8{margin-left:70.94017094017094%;*margin-left:70.83378796144753%}.row-fluid .offset8:first-child{margin-left:68.37606837606839%;*margin-left:68.26968539734497%}.row-fluid .offset7{margin-left:62.393162393162385%;*margin-left:62.28677941443899%}.row-fluid .offset7:first-child{margin-left:59.82905982905982%;*margin-left:59.72267685033642%}.row-fluid .offset6{margin-left:53.84615384615384%;*margin-left:53.739770867430444%}.row-fluid .offset6:first-child{margin-left:51.28205128205128%;*margin-left:51.175668303327875%}.row-fluid .offset5{margin-left:45.299145299145295%;*margin-left:45.1927623204219%}.row-fluid .offset5:first-child{margin-left:42.73504273504273%;*margin-left:42.62865975631933%}.row-fluid .offset4{margin-left:36.75213675213675%;*margin-left:36.645753773413354%}.row-fluid .offset4:first-child{margin-left:34.18803418803419%;*margin-left:34.081651209310785%}.row-fluid .offset3{margin-left:28.205128205128204%;*margin-left:28.0987452264048%}.row-fluid .offset3:first-child{margin-left:25.641025641025642%;*margin-left:25.53464266230224%}.row-fluid .offset2{margin-left:19.65811965811966%;*margin-left:19.551736679396257%}.row-fluid .offset2:first-child{margin-left:17.094017094017094%;*margin-left:16.98763411529369%}.row-fluid .offset1{margin-left:11.11111111111111%;*margin-left:11.004728132387708%}.row-fluid .offset1:first-child{margin-left:8.547008547008547%;*margin-left:8.440625568285142%}input,textarea,.uneditable-input{margin-left:0}.controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:30px}input.span12,textarea.span12,.uneditable-input.span12{width:1156px}input.span11,textarea.span11,.uneditable-input.span11{width:1056px}input.span10,textarea.span10,.uneditable-input.span10{width:956px}input.span9,textarea.span9,.uneditable-input.span9{width:856px}input.span8,textarea.span8,.uneditable-input.span8{width:756px}input.span7,textarea.span7,.uneditable-input.span7{width:656px}input.span6,textarea.span6,.uneditable-input.span6{width:556px}input.span5,textarea.span5,.uneditable-input.span5{width:456px}input.span4,textarea.span4,.uneditable-input.span4{width:356px}input.span3,textarea.span3,.uneditable-input.span3{width:256px}input.span2,textarea.span2,.uneditable-input.span2{width:156px}input.span1,textarea.span1,.uneditable-input.span1{width:56px}.thumbnails{margin-left:-30px}.thumbnails>li{margin-left:30px}.row-fluid .thumbnails{margin-left:0}}@media(min-width:768px) and (max-width:979px){.row{margin-left:-20px;*zoom:1}.row:before,.row:after{display:table;line-height:0;content:\"\"}.row:after{clear:both}[class*=\"span\"]{float:left;min-height:1px;margin-left:20px}.container,.navbar-static-top .container,.navbar-fixed-top .container,.navbar-fixed-bottom .container{width:724px}.span12{width:724px}.span11{width:662px}.span10{width:600px}.span9{width:538px}.span8{width:476px}.span7{width:414px}.span6{width:352px}.span5{width:290px}.span4{width:228px}.span3{width:166px}.span2{width:104px}.span1{width:42px}.offset12{margin-left:764px}.offset11{margin-left:702px}.offset10{margin-left:640px}.offset9{margin-left:578px}.offset8{margin-left:516px}.offset7{margin-left:454px}.offset6{margin-left:392px}.offset5{margin-left:330px}.offset4{margin-left:268px}.offset3{margin-left:206px}.offset2{margin-left:144px}.offset1{margin-left:82px}.row-fluid{width:100%;*zoom:1}.row-fluid:before,.row-fluid:after{display:table;line-height:0;content:\"\"}.row-fluid:after{clear:both}.row-fluid [class*=\"span\"]{display:block;float:left;width:100%;min-height:30px;margin-left:2.7624309392265194%;*margin-left:2.709239449864817%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.row-fluid [class*=\"span\"]:first-child{margin-left:0}.row-fluid .controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:2.7624309392265194%}.row-fluid .span12{width:100%;*width:99.94680851063829%}.row-fluid .span11{width:91.43646408839778%;*width:91.38327259903608%}.row-fluid .span10{width:82.87292817679558%;*width:82.81973668743387%}.row-fluid .span9{width:74.30939226519337%;*width:74.25620077583166%}.row-fluid .span8{width:65.74585635359117%;*width:65.69266486422946%}.row-fluid .span7{width:57.18232044198895%;*width:57.12912895262725%}.row-fluid .span6{width:48.61878453038674%;*width:48.56559304102504%}.row-fluid .span5{width:40.05524861878453%;*width:40.00205712942283%}.row-fluid .span4{width:31.491712707182323%;*width:31.43852121782062%}.row-fluid .span3{width:22.92817679558011%;*width:22.87498530621841%}.row-fluid .span2{width:14.3646408839779%;*width:14.311449394616199%}.row-fluid .span1{width:5.801104972375691%;*width:5.747913483013988%}.row-fluid .offset12{margin-left:105.52486187845304%;*margin-left:105.41847889972962%}.row-fluid .offset12:first-child{margin-left:102.76243093922652%;*margin-left:102.6560479605031%}.row-fluid .offset11{margin-left:96.96132596685082%;*margin-left:96.8549429881274%}.row-fluid .offset11:first-child{margin-left:94.1988950276243%;*margin-left:94.09251204890089%}.row-fluid .offset10{margin-left:88.39779005524862%;*margin-left:88.2914070765252%}.row-fluid .offset10:first-child{margin-left:85.6353591160221%;*margin-left:85.52897613729868%}.row-fluid .offset9{margin-left:79.8342541436464%;*margin-left:79.72787116492299%}.row-fluid .offset9:first-child{margin-left:77.07182320441989%;*margin-left:76.96544022569647%}.row-fluid .offset8{margin-left:71.2707182320442%;*margin-left:71.16433525332079%}.row-fluid .offset8:first-child{margin-left:68.50828729281768%;*margin-left:68.40190431409427%}.row-fluid .offset7{margin-left:62.70718232044199%;*margin-left:62.600799341718584%}.row-fluid .offset7:first-child{margin-left:59.94475138121547%;*margin-left:59.838368402492065%}.row-fluid .offset6{margin-left:54.14364640883978%;*margin-left:54.037263430116376%}.row-fluid .offset6:first-child{margin-left:51.38121546961326%;*margin-left:51.27483249088986%}.row-fluid .offset5{margin-left:45.58011049723757%;*margin-left:45.47372751851417%}.row-fluid .offset5:first-child{margin-left:42.81767955801105%;*margin-left:42.71129657928765%}.row-fluid .offset4{margin-left:37.01657458563536%;*margin-left:36.91019160691196%}.row-fluid .offset4:first-child{margin-left:34.25414364640884%;*margin-left:34.14776066768544%}.row-fluid .offset3{margin-left:28.45303867403315%;*margin-left:28.346655695309746%}.row-fluid .offset3:first-child{margin-left:25.69060773480663%;*margin-left:25.584224756083227%}.row-fluid .offset2{margin-left:19.88950276243094%;*margin-left:19.783119783707537%}.row-fluid .offset2:first-child{margin-left:17.12707182320442%;*margin-left:17.02068884448102%}.row-fluid .offset1{margin-left:11.32596685082873%;*margin-left:11.219583872105325%}.row-fluid .offset1:first-child{margin-left:8.56353591160221%;*margin-left:8.457152932878806%}input,textarea,.uneditable-input{margin-left:0}.controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:20px}input.span12,textarea.span12,.uneditable-input.span12{width:710px}input.span11,textarea.span11,.uneditable-input.span11{width:648px}input.span10,textarea.span10,.uneditable-input.span10{width:586px}input.span9,textarea.span9,.uneditable-input.span9{width:524px}input.span8,textarea.span8,.uneditable-input.span8{width:462px}input.span7,textarea.span7,.uneditable-input.span7{width:400px}input.span6,textarea.span6,.uneditable-input.span6{width:338px}input.span5,textarea.span5,.uneditable-input.span5{width:276px}input.span4,textarea.span4,.uneditable-input.span4{width:214px}input.span3,textarea.span3,.uneditable-input.span3{width:152px}input.span2,textarea.span2,.uneditable-input.span2{width:90px}input.span1,textarea.span1,.uneditable-input.span1{width:28px}}@media(max-width:767px){body{padding-right:20px;padding-left:20px}.navbar-fixed-top,.navbar-fixed-bottom,.navbar-static-top{margin-right:-20px;margin-left:-20px}.container-fluid{padding:0}.dl-horizontal dt{float:none;width:auto;clear:none;text-align:left}.dl-horizontal dd{margin-left:0}.container{width:auto}.row-fluid{width:100%}.row,.thumbnails{margin-left:0}.thumbnails>li{float:none;margin-left:0}[class*=\"span\"],.uneditable-input[class*=\"span\"],.row-fluid [class*=\"span\"]{display:block;float:none;width:100%;margin-left:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.span12,.row-fluid .span12{width:100%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.row-fluid [class*=\"offset\"]:first-child{margin-left:0}.input-large,.input-xlarge,.input-xxlarge,input[class*=\"span\"],select[class*=\"span\"],textarea[class*=\"span\"],.uneditable-input{display:block;width:100%;min-height:30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.input-prepend input,.input-append input,.input-prepend input[class*=\"span\"],.input-append input[class*=\"span\"]{display:inline-block;width:auto}.controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:0}.modal{position:fixed;top:20px;right:20px;left:20px;width:auto;margin:0}.modal.fade{top:-100px}.modal.fade.in{top:20px}}@media(max-width:480px){.nav-collapse{-webkit-transform:translate3d(0,0,0)}.page-header h1 small{display:block;line-height:20px}input[type=\"checkbox\"],input[type=\"radio\"]{border:1px solid #ccc}.form-horizontal .control-label{float:none;width:auto;padding-top:0;text-align:left}.form-horizontal .controls{margin-left:0}.form-horizontal .control-list{padding-top:0}.form-horizontal .form-actions{padding-right:10px;padding-left:10px}.media .pull-left,.media .pull-right{display:block;float:none;margin-bottom:10px}.media-object{margin-right:0;margin-left:0}.modal{top:10px;right:10px;left:10px}.modal-header .close{padding:10px;margin:-10px}.carousel-caption{position:static}}@media(max-width:979px){body{padding-top:0}.navbar-fixed-top,.navbar-fixed-bottom{position:static}.navbar-fixed-top{margin-bottom:20px}.navbar-fixed-bottom{margin-top:20px}.navbar-fixed-top .navbar-inner,.navbar-fixed-bottom .navbar-inner{padding:5px}.navbar .container{width:auto;padding:0}.navbar .brand{padding-right:10px;padding-left:10px;margin:0 0 0 -5px}.nav-collapse{clear:both}.nav-collapse .nav{float:none;margin:0 0 10px}.nav-collapse .nav>li{float:none}.nav-collapse .nav>li>a{margin-bottom:2px}.nav-collapse .nav>.divider-vertical{display:none}.nav-collapse .nav .nav-header{color:#777;text-shadow:none}.nav-collapse .nav>li>a,.nav-collapse .dropdown-menu a{padding:9px 15px;font-weight:bold;color:#777;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.nav-collapse .btn{padding:4px 10px 4px;font-weight:normal;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.nav-collapse .dropdown-menu li+li a{margin-bottom:2px}.nav-collapse .nav>li>a:hover,.nav-collapse .nav>li>a:focus,.nav-collapse .dropdown-menu a:hover,.nav-collapse .dropdown-menu a:focus{background-color:#f2f2f2}.navbar-inverse .nav-collapse .nav>li>a,.navbar-inverse .nav-collapse .dropdown-menu a{color:#999}.navbar-inverse .nav-collapse .nav>li>a:hover,.navbar-inverse .nav-collapse .nav>li>a:focus,.navbar-inverse .nav-collapse .dropdown-menu a:hover,.navbar-inverse .nav-collapse .dropdown-menu a:focus{background-color:#111}.nav-collapse.in .btn-group{padding:0;margin-top:5px}.nav-collapse .dropdown-menu{position:static;top:auto;left:auto;display:none;float:none;max-width:none;padding:0;margin:0 15px;background-color:transparent;border:0;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.nav-collapse .open>.dropdown-menu{display:block}.nav-collapse .dropdown-menu:before,.nav-collapse .dropdown-menu:after{display:none}.nav-collapse .dropdown-menu .divider{display:none}.nav-collapse .nav>li>.dropdown-menu:before,.nav-collapse .nav>li>.dropdown-menu:after{display:none}.nav-collapse .navbar-form,.nav-collapse .navbar-search{float:none;padding:10px 15px;margin:10px 0;border-top:1px solid #f2f2f2;border-bottom:1px solid #f2f2f2;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1)}.navbar-inverse .nav-collapse .navbar-form,.navbar-inverse .nav-collapse .navbar-search{border-top-color:#111;border-bottom-color:#111}.navbar .nav-collapse .nav.pull-right{float:none;margin-left:0}.nav-collapse,.nav-collapse.collapse{height:0;overflow:hidden}.navbar .btn-navbar{display:block}.navbar-static .navbar-inner{padding-right:10px;padding-left:10px}}@media(min-width:980px){.nav-collapse.collapse{height:auto!important;overflow:visible!important}}\n"; s.id = "css-bootstrap-responsive"; document.head.appendChild(s);}, "stylesheets/bootstrap": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "\n        .clearfix{*zoom:1}.clearfix:before,.clearfix:after{display:table;line-height:0;content:\"\"}.clearfix:after{clear:both}.hide-text{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.input-block-level{display:block;width:100%;min-height:30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}audio:not([controls]){display:none}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}a:focus{outline:thin dotted #333;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}a:hover,a:active{outline:0}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{width:auto\\9;height:auto;max-width:100%;vertical-align:middle;border:0;-ms-interpolation-mode:bicubic}#map_canvas img,.google-maps img{max-width:none}button,input,select,textarea{margin:0;font-size:100%;vertical-align:middle}button,input{*overflow:visible;line-height:normal}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}button,html input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"]{cursor:pointer;-webkit-appearance:button}label,select,button,input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"],input[type=\"radio\"],input[type=\"checkbox\"]{cursor:pointer}input[type=\"search\"]{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:textfield}input[type=\"search\"]::-webkit-search-decoration,input[type=\"search\"]::-webkit-search-cancel-button{-webkit-appearance:none}textarea{overflow:auto;vertical-align:top}@media print{*{color:#000!important;text-shadow:none!important;background:transparent!important;box-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}.ir a:after,a[href^=\"javascript:\"]:after,a[href^=\"#\"]:after{content:\"\"}pre,blockquote{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}tr,img{page-break-inside:avoid}img{max-width:100%!important}@page{margin:.5cm}p,h2,h3{orphans:3;widows:3}h2,h3{page-break-after:avoid}}body{margin:0;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;color:#333;background-color:#fff}a{color:#08c;text-decoration:none}a:hover,a:focus{color:#005580;text-decoration:underline}.img-rounded{-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.img-polaroid{padding:4px;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.2);-webkit-box-shadow:0 1px 3px rgba(0,0,0,0.1);-moz-box-shadow:0 1px 3px rgba(0,0,0,0.1);box-shadow:0 1px 3px rgba(0,0,0,0.1)}.img-circle{-webkit-border-radius:500px;-moz-border-radius:500px;border-radius:500px}.row{margin-left:-20px;*zoom:1}.row:before,.row:after{display:table;line-height:0;content:\"\"}.row:after{clear:both}[class*=\"span\"]{float:left;min-height:1px;margin-left:20px}.container,.navbar-static-top .container,.navbar-fixed-top .container,.navbar-fixed-bottom .container{width:940px}.span12{width:940px}.span11{width:860px}.span10{width:780px}.span9{width:700px}.span8{width:620px}.span7{width:540px}.span6{width:460px}.span5{width:380px}.span4{width:300px}.span3{width:220px}.span2{width:140px}.span1{width:60px}.offset12{margin-left:980px}.offset11{margin-left:900px}.offset10{margin-left:820px}.offset9{margin-left:740px}.offset8{margin-left:660px}.offset7{margin-left:580px}.offset6{margin-left:500px}.offset5{margin-left:420px}.offset4{margin-left:340px}.offset3{margin-left:260px}.offset2{margin-left:180px}.offset1{margin-left:100px}.row-fluid{width:100%;*zoom:1}.row-fluid:before,.row-fluid:after{display:table;line-height:0;content:\"\"}.row-fluid:after{clear:both}.row-fluid [class*=\"span\"]{display:block;float:left;width:100%;min-height:30px;margin-left:2.127659574468085%;*margin-left:2.074468085106383%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.row-fluid [class*=\"span\"]:first-child{margin-left:0}.row-fluid .controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:2.127659574468085%}.row-fluid .span12{width:100%;*width:99.94680851063829%}.row-fluid .span11{width:91.48936170212765%;*width:91.43617021276594%}.row-fluid .span10{width:82.97872340425532%;*width:82.92553191489361%}.row-fluid .span9{width:74.46808510638297%;*width:74.41489361702126%}.row-fluid .span8{width:65.95744680851064%;*width:65.90425531914893%}.row-fluid .span7{width:57.44680851063829%;*width:57.39361702127659%}.row-fluid .span6{width:48.93617021276595%;*width:48.88297872340425%}.row-fluid .span5{width:40.42553191489362%;*width:40.37234042553192%}.row-fluid .span4{width:31.914893617021278%;*width:31.861702127659576%}.row-fluid .span3{width:23.404255319148934%;*width:23.351063829787233%}.row-fluid .span2{width:14.893617021276595%;*width:14.840425531914894%}.row-fluid .span1{width:6.382978723404255%;*width:6.329787234042553%}.row-fluid .offset12{margin-left:104.25531914893617%;*margin-left:104.14893617021275%}.row-fluid .offset12:first-child{margin-left:102.12765957446808%;*margin-left:102.02127659574467%}.row-fluid .offset11{margin-left:95.74468085106382%;*margin-left:95.6382978723404%}.row-fluid .offset11:first-child{margin-left:93.61702127659574%;*margin-left:93.51063829787232%}.row-fluid .offset10{margin-left:87.23404255319149%;*margin-left:87.12765957446807%}.row-fluid .offset10:first-child{margin-left:85.1063829787234%;*margin-left:84.99999999999999%}.row-fluid .offset9{margin-left:78.72340425531914%;*margin-left:78.61702127659572%}.row-fluid .offset9:first-child{margin-left:76.59574468085106%;*margin-left:76.48936170212764%}.row-fluid .offset8{margin-left:70.2127659574468%;*margin-left:70.10638297872339%}.row-fluid .offset8:first-child{margin-left:68.08510638297872%;*margin-left:67.9787234042553%}.row-fluid .offset7{margin-left:61.70212765957446%;*margin-left:61.59574468085106%}.row-fluid .offset7:first-child{margin-left:59.574468085106375%;*margin-left:59.46808510638297%}.row-fluid .offset6{margin-left:53.191489361702125%;*margin-left:53.085106382978715%}.row-fluid .offset6:first-child{margin-left:51.063829787234035%;*margin-left:50.95744680851063%}.row-fluid .offset5{margin-left:44.68085106382979%;*margin-left:44.57446808510638%}.row-fluid .offset5:first-child{margin-left:42.5531914893617%;*margin-left:42.4468085106383%}.row-fluid .offset4{margin-left:36.170212765957444%;*margin-left:36.06382978723405%}.row-fluid .offset4:first-child{margin-left:34.04255319148936%;*margin-left:33.93617021276596%}.row-fluid .offset3{margin-left:27.659574468085104%;*margin-left:27.5531914893617%}.row-fluid .offset3:first-child{margin-left:25.53191489361702%;*margin-left:25.425531914893618%}.row-fluid .offset2{margin-left:19.148936170212764%;*margin-left:19.04255319148936%}.row-fluid .offset2:first-child{margin-left:17.02127659574468%;*margin-left:16.914893617021278%}.row-fluid .offset1{margin-left:10.638297872340425%;*margin-left:10.53191489361702%}.row-fluid .offset1:first-child{margin-left:8.51063829787234%;*margin-left:8.404255319148938%}[class*=\"span\"].hide,.row-fluid [class*=\"span\"].hide{display:none}[class*=\"span\"].pull-right,.row-fluid [class*=\"span\"].pull-right{float:right}.container{margin-right:auto;margin-left:auto;*zoom:1}.container:before,.container:after{display:table;line-height:0;content:\"\"}.container:after{clear:both}.container-fluid{padding-right:20px;padding-left:20px;*zoom:1}.container-fluid:before,.container-fluid:after{display:table;line-height:0;content:\"\"}.container-fluid:after{clear:both}p{margin:0 0 10px}.lead{margin-bottom:20px;font-size:21px;font-weight:200;line-height:30px}small{font-size:85%}strong{font-weight:bold}em{font-style:italic}cite{font-style:normal}.muted{color:#999}a.muted:hover,a.muted:focus{color:#808080}.text-warning{color:#c09853}a.text-warning:hover,a.text-warning:focus{color:#a47e3c}.text-error{color:#b94a48}a.text-error:hover,a.text-error:focus{color:#953b39}.text-info{color:#3a87ad}a.text-info:hover,a.text-info:focus{color:#2d6987}.text-success{color:#468847}a.text-success:hover,a.text-success:focus{color:#356635}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}h1,h2,h3,h4,h5,h6{margin:10px 0;font-family:inherit;font-weight:bold;line-height:20px;color:inherit;text-rendering:optimizelegibility}h1 small,h2 small,h3 small,h4 small,h5 small,h6 small{font-weight:normal;line-height:1;color:#999}h1,h2,h3{line-height:40px}h1{font-size:38.5px}h2{font-size:31.5px}h3{font-size:24.5px}h4{font-size:17.5px}h5{font-size:14px}h6{font-size:11.9px}h1 small{font-size:24.5px}h2 small{font-size:17.5px}h3 small{font-size:14px}h4 small{font-size:14px}.page-header{padding-bottom:9px;margin:20px 0 30px;border-bottom:1px solid #eee}ul,ol{padding:0;margin:0 0 10px 25px}ul ul,ul ol,ol ol,ol ul{margin-bottom:0}li{line-height:20px}ul.unstyled,ol.unstyled{margin-left:0;list-style:none}ul.inline,ol.inline{margin-left:0;list-style:none}ul.inline>li,ol.inline>li{display:inline-block;*display:inline;padding-right:5px;padding-left:5px;*zoom:1}dl{margin-bottom:20px}dt,dd{line-height:20px}dt{font-weight:bold}dd{margin-left:10px}.dl-horizontal{*zoom:1}.dl-horizontal:before,.dl-horizontal:after{display:table;line-height:0;content:\"\"}.dl-horizontal:after{clear:both}.dl-horizontal dt{float:left;width:160px;overflow:hidden;clear:left;text-align:right;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}hr{margin:20px 0;border:0;border-top:1px solid #eee;border-bottom:1px solid #fff}abbr[title],abbr[data-original-title]{cursor:help;border-bottom:1px dotted #999}abbr.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:0 0 0 15px;margin:0 0 20px;border-left:5px solid #eee}blockquote p{margin-bottom:0;font-size:17.5px;font-weight:300;line-height:1.25}blockquote small{display:block;line-height:20px;color:#999}blockquote small:before{content:'\\2014 \\00A0'}blockquote.pull-right{float:right;padding-right:15px;padding-left:0;border-right:5px solid #eee;border-left:0}blockquote.pull-right p,blockquote.pull-right small{text-align:right}blockquote.pull-right small:before{content:''}blockquote.pull-right small:after{content:'\\00A0 \\2014'}q:before,q:after,blockquote:before,blockquote:after{content:\"\"}address{display:block;margin-bottom:20px;font-style:normal;line-height:20px}code,pre{padding:0 3px 2px;font-family:Monaco,Menlo,Consolas,\"Courier New\",monospace;font-size:12px;color:#333;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}code{padding:2px 4px;color:#d14;white-space:nowrap;background-color:#f7f7f9;border:1px solid #e1e1e8}pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:20px;word-break:break-all;word-wrap:break-word;white-space:pre;white-space:pre-wrap;background-color:#f5f5f5;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.15);-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}pre.prettyprint{margin-bottom:20px}pre code{padding:0;color:inherit;white-space:pre;white-space:pre-wrap;background-color:transparent;border:0}.pre-scrollable{max-height:340px;overflow-y:scroll}form{margin:0 0 20px}fieldset{padding:0;margin:0;border:0}legend{display:block;width:100%;padding:0;margin-bottom:20px;font-size:21px;line-height:40px;color:#333;border:0;border-bottom:1px solid #e5e5e5}legend small{font-size:15px;color:#999}label,input,button,select,textarea{font-size:14px;font-weight:normal;line-height:20px}input,button,select,textarea{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}label{display:block;margin-bottom:5px}select,textarea,input[type=\"text\"],input[type=\"password\"],input[type=\"datetime\"],input[type=\"datetime-local\"],input[type=\"date\"],input[type=\"month\"],input[type=\"time\"],input[type=\"week\"],input[type=\"number\"],input[type=\"email\"],input[type=\"url\"],input[type=\"search\"],input[type=\"tel\"],input[type=\"color\"],.uneditable-input{display:inline-block;height:20px;padding:4px 6px;margin-bottom:10px;font-size:14px;line-height:20px;color:#555;vertical-align:middle;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}input,textarea,.uneditable-input{width:206px}textarea{height:auto}textarea,input[type=\"text\"],input[type=\"password\"],input[type=\"datetime\"],input[type=\"datetime-local\"],input[type=\"date\"],input[type=\"month\"],input[type=\"time\"],input[type=\"week\"],input[type=\"number\"],input[type=\"email\"],input[type=\"url\"],input[type=\"search\"],input[type=\"tel\"],input[type=\"color\"],.uneditable-input{background-color:#fff;border:1px solid #ccc;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-webkit-transition:border linear .2s,box-shadow linear .2s;-moz-transition:border linear .2s,box-shadow linear .2s;-o-transition:border linear .2s,box-shadow linear .2s;transition:border linear .2s,box-shadow linear .2s}textarea:focus,input[type=\"text\"]:focus,input[type=\"password\"]:focus,input[type=\"datetime\"]:focus,input[type=\"datetime-local\"]:focus,input[type=\"date\"]:focus,input[type=\"month\"]:focus,input[type=\"time\"]:focus,input[type=\"week\"]:focus,input[type=\"number\"]:focus,input[type=\"email\"]:focus,input[type=\"url\"]:focus,input[type=\"search\"]:focus,input[type=\"tel\"]:focus,input[type=\"color\"]:focus,.uneditable-input:focus{border-color:rgba(82,168,236,0.8);outline:0;outline:thin dotted \\9;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,0.6);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,0.6);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,0.6)}input[type=\"radio\"],input[type=\"checkbox\"]{margin:4px 0 0;margin-top:1px \\9;*margin-top:0;line-height:normal}input[type=\"file\"],input[type=\"image\"],input[type=\"submit\"],input[type=\"reset\"],input[type=\"button\"],input[type=\"radio\"],input[type=\"checkbox\"]{width:auto}select,input[type=\"file\"]{height:30px;*margin-top:4px;line-height:30px}select{width:220px;background-color:#fff;border:1px solid #ccc}select[multiple],select[size]{height:auto}select:focus,input[type=\"file\"]:focus,input[type=\"radio\"]:focus,input[type=\"checkbox\"]:focus{outline:thin dotted #333;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.uneditable-input,.uneditable-textarea{color:#999;cursor:not-allowed;background-color:#fcfcfc;border-color:#ccc;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.025);-moz-box-shadow:inset 0 1px 2px rgba(0,0,0,0.025);box-shadow:inset 0 1px 2px rgba(0,0,0,0.025)}.uneditable-input{overflow:hidden;white-space:nowrap}.uneditable-textarea{width:auto;height:auto}input:-moz-placeholder,textarea:-moz-placeholder{color:#999}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#999}input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{color:#999}.radio,.checkbox{min-height:20px;padding-left:20px}.radio input[type=\"radio\"],.checkbox input[type=\"checkbox\"]{float:left;margin-left:-20px}.controls>.radio:first-child,.controls>.checkbox:first-child{padding-top:5px}.radio.inline,.checkbox.inline{display:inline-block;padding-top:5px;margin-bottom:0;vertical-align:middle}.radio.inline+.radio.inline,.checkbox.inline+.checkbox.inline{margin-left:10px}.input-mini{width:60px}.input-small{width:90px}.input-medium{width:150px}.input-large{width:210px}.input-xlarge{width:270px}.input-xxlarge{width:530px}input[class*=\"span\"],select[class*=\"span\"],textarea[class*=\"span\"],.uneditable-input[class*=\"span\"],.row-fluid input[class*=\"span\"],.row-fluid select[class*=\"span\"],.row-fluid textarea[class*=\"span\"],.row-fluid .uneditable-input[class*=\"span\"]{float:none;margin-left:0}.input-append input[class*=\"span\"],.input-append .uneditable-input[class*=\"span\"],.input-prepend input[class*=\"span\"],.input-prepend .uneditable-input[class*=\"span\"],.row-fluid input[class*=\"span\"],.row-fluid select[class*=\"span\"],.row-fluid textarea[class*=\"span\"],.row-fluid .uneditable-input[class*=\"span\"],.row-fluid .input-prepend [class*=\"span\"],.row-fluid .input-append [class*=\"span\"]{display:inline-block}input,textarea,.uneditable-input{margin-left:0}.controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:20px}input.span12,textarea.span12,.uneditable-input.span12{width:926px}input.span11,textarea.span11,.uneditable-input.span11{width:846px}input.span10,textarea.span10,.uneditable-input.span10{width:766px}input.span9,textarea.span9,.uneditable-input.span9{width:686px}input.span8,textarea.span8,.uneditable-input.span8{width:606px}input.span7,textarea.span7,.uneditable-input.span7{width:526px}input.span6,textarea.span6,.uneditable-input.span6{width:446px}input.span5,textarea.span5,.uneditable-input.span5{width:366px}input.span4,textarea.span4,.uneditable-input.span4{width:286px}input.span3,textarea.span3,.uneditable-input.span3{width:206px}input.span2,textarea.span2,.uneditable-input.span2{width:126px}input.span1,textarea.span1,.uneditable-input.span1{width:46px}.controls-row{*zoom:1}.controls-row:before,.controls-row:after{display:table;line-height:0;content:\"\"}.controls-row:after{clear:both}.controls-row [class*=\"span\"],.row-fluid .controls-row [class*=\"span\"]{float:left}.controls-row .checkbox[class*=\"span\"],.controls-row .radio[class*=\"span\"]{padding-top:5px}input[disabled],select[disabled],textarea[disabled],input[readonly],select[readonly],textarea[readonly]{cursor:not-allowed;background-color:#eee}input[type=\"radio\"][disabled],input[type=\"checkbox\"][disabled],input[type=\"radio\"][readonly],input[type=\"checkbox\"][readonly]{background-color:transparent}.control-group.warning .control-label,.control-group.warning .help-block,.control-group.warning .help-inline{color:#c09853}.control-group.warning .checkbox,.control-group.warning .radio,.control-group.warning input,.control-group.warning select,.control-group.warning textarea{color:#c09853}.control-group.warning input,.control-group.warning select,.control-group.warning textarea{border-color:#c09853;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.control-group.warning input:focus,.control-group.warning select:focus,.control-group.warning textarea:focus{border-color:#a47e3c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #dbc59e;-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #dbc59e;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #dbc59e}.control-group.warning .input-prepend .add-on,.control-group.warning .input-append .add-on{color:#c09853;background-color:#fcf8e3;border-color:#c09853}.control-group.error .control-label,.control-group.error .help-block,.control-group.error .help-inline{color:#b94a48}.control-group.error .checkbox,.control-group.error .radio,.control-group.error input,.control-group.error select,.control-group.error textarea{color:#b94a48}.control-group.error input,.control-group.error select,.control-group.error textarea{border-color:#b94a48;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.control-group.error input:focus,.control-group.error select:focus,.control-group.error textarea:focus{border-color:#953b39;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #d59392;-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #d59392;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #d59392}.control-group.error .input-prepend .add-on,.control-group.error .input-append .add-on{color:#b94a48;background-color:#f2dede;border-color:#b94a48}.control-group.success .control-label,.control-group.success .help-block,.control-group.success .help-inline{color:#468847}.control-group.success .checkbox,.control-group.success .radio,.control-group.success input,.control-group.success select,.control-group.success textarea{color:#468847}.control-group.success input,.control-group.success select,.control-group.success textarea{border-color:#468847;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.control-group.success input:focus,.control-group.success select:focus,.control-group.success textarea:focus{border-color:#356635;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7aba7b;-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7aba7b;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7aba7b}.control-group.success .input-prepend .add-on,.control-group.success .input-append .add-on{color:#468847;background-color:#dff0d8;border-color:#468847}.control-group.info .control-label,.control-group.info .help-block,.control-group.info .help-inline{color:#3a87ad}.control-group.info .checkbox,.control-group.info .radio,.control-group.info input,.control-group.info select,.control-group.info textarea{color:#3a87ad}.control-group.info input,.control-group.info select,.control-group.info textarea{border-color:#3a87ad;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.control-group.info input:focus,.control-group.info select:focus,.control-group.info textarea:focus{border-color:#2d6987;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7ab5d3;-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7ab5d3;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7ab5d3}.control-group.info .input-prepend .add-on,.control-group.info .input-append .add-on{color:#3a87ad;background-color:#d9edf7;border-color:#3a87ad}input:focus:invalid,textarea:focus:invalid,select:focus:invalid{color:#b94a48;border-color:#ee5f5b}input:focus:invalid:focus,textarea:focus:invalid:focus,select:focus:invalid:focus{border-color:#e9322d;-webkit-box-shadow:0 0 6px #f8b9b7;-moz-box-shadow:0 0 6px #f8b9b7;box-shadow:0 0 6px #f8b9b7}.form-actions{padding:19px 20px 20px;margin-top:20px;margin-bottom:20px;background-color:#f5f5f5;border-top:1px solid #e5e5e5;*zoom:1}.form-actions:before,.form-actions:after{display:table;line-height:0;content:\"\"}.form-actions:after{clear:both}.help-block,.help-inline{color:#595959}.help-block{display:block;margin-bottom:10px}.help-inline{display:inline-block;*display:inline;padding-left:5px;vertical-align:middle;*zoom:1}.input-append,.input-prepend{display:inline-block;margin-bottom:10px;font-size:0;white-space:nowrap;vertical-align:middle}.input-append input,.input-prepend input,.input-append select,.input-prepend select,.input-append .uneditable-input,.input-prepend .uneditable-input,.input-append .dropdown-menu,.input-prepend .dropdown-menu,.input-append .popover,.input-prepend .popover{font-size:14px}.input-append input,.input-prepend input,.input-append select,.input-prepend select,.input-append .uneditable-input,.input-prepend .uneditable-input{position:relative;margin-bottom:0;*margin-left:0;vertical-align:top;-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-append input:focus,.input-prepend input:focus,.input-append select:focus,.input-prepend select:focus,.input-append .uneditable-input:focus,.input-prepend .uneditable-input:focus{z-index:2}.input-append .add-on,.input-prepend .add-on{display:inline-block;width:auto;height:20px;min-width:16px;padding:4px 5px;font-size:14px;font-weight:normal;line-height:20px;text-align:center;text-shadow:0 1px 0 #fff;background-color:#eee;border:1px solid #ccc}.input-append .add-on,.input-prepend .add-on,.input-append .btn,.input-prepend .btn,.input-append .btn-group>.dropdown-toggle,.input-prepend .btn-group>.dropdown-toggle{vertical-align:top;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.input-append .active,.input-prepend .active{background-color:#a9dba9;border-color:#46a546}.input-prepend .add-on,.input-prepend .btn{margin-right:-1px}.input-prepend .add-on:first-child,.input-prepend .btn:first-child{-webkit-border-radius:4px 0 0 4px;-moz-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.input-append input,.input-append select,.input-append .uneditable-input{-webkit-border-radius:4px 0 0 4px;-moz-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.input-append input+.btn-group .btn:last-child,.input-append select+.btn-group .btn:last-child,.input-append .uneditable-input+.btn-group .btn:last-child{-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-append .add-on,.input-append .btn,.input-append .btn-group{margin-left:-1px}.input-append .add-on:last-child,.input-append .btn:last-child,.input-append .btn-group:last-child>.dropdown-toggle{-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-prepend.input-append input,.input-prepend.input-append select,.input-prepend.input-append .uneditable-input{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.input-prepend.input-append input+.btn-group .btn,.input-prepend.input-append select+.btn-group .btn,.input-prepend.input-append .uneditable-input+.btn-group .btn{-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-prepend.input-append .add-on:first-child,.input-prepend.input-append .btn:first-child{margin-right:-1px;-webkit-border-radius:4px 0 0 4px;-moz-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.input-prepend.input-append .add-on:last-child,.input-prepend.input-append .btn:last-child{margin-left:-1px;-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-prepend.input-append .btn-group:first-child{margin-left:0}input.search-query{padding-right:14px;padding-right:4px \\9;padding-left:14px;padding-left:4px \\9;margin-bottom:0;-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px}.form-search .input-append .search-query,.form-search .input-prepend .search-query{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.form-search .input-append .search-query{-webkit-border-radius:14px 0 0 14px;-moz-border-radius:14px 0 0 14px;border-radius:14px 0 0 14px}.form-search .input-append .btn{-webkit-border-radius:0 14px 14px 0;-moz-border-radius:0 14px 14px 0;border-radius:0 14px 14px 0}.form-search .input-prepend .search-query{-webkit-border-radius:0 14px 14px 0;-moz-border-radius:0 14px 14px 0;border-radius:0 14px 14px 0}.form-search .input-prepend .btn{-webkit-border-radius:14px 0 0 14px;-moz-border-radius:14px 0 0 14px;border-radius:14px 0 0 14px}.form-search input,.form-inline input,.form-horizontal input,.form-search textarea,.form-inline textarea,.form-horizontal textarea,.form-search select,.form-inline select,.form-horizontal select,.form-search .help-inline,.form-inline .help-inline,.form-horizontal .help-inline,.form-search .uneditable-input,.form-inline .uneditable-input,.form-horizontal .uneditable-input,.form-search .input-prepend,.form-inline .input-prepend,.form-horizontal .input-prepend,.form-search .input-append,.form-inline .input-append,.form-horizontal .input-append{display:inline-block;*display:inline;margin-bottom:0;vertical-align:middle;*zoom:1}.form-search .hide,.form-inline .hide,.form-horizontal .hide{display:none}.form-search label,.form-inline label,.form-search .btn-group,.form-inline .btn-group{display:inline-block}.form-search .input-append,.form-inline .input-append,.form-search .input-prepend,.form-inline .input-prepend{margin-bottom:0}.form-search .radio,.form-search .checkbox,.form-inline .radio,.form-inline .checkbox{padding-left:0;margin-bottom:0;vertical-align:middle}.form-search .radio input[type=\"radio\"],.form-search .checkbox input[type=\"checkbox\"],.form-inline .radio input[type=\"radio\"],.form-inline .checkbox input[type=\"checkbox\"]{float:left;margin-right:3px;margin-left:0}.control-group{margin-bottom:10px}legend+.control-group{margin-top:20px;-webkit-margin-top-collapse:separate}.form-horizontal .control-group{margin-bottom:20px;*zoom:1}.form-horizontal .control-group:before,.form-horizontal .control-group:after{display:table;line-height:0;content:\"\"}.form-horizontal .control-group:after{clear:both}.form-horizontal .control-label{float:left;width:160px;padding-top:5px;text-align:right}.form-horizontal .controls{*display:inline-block;*padding-left:20px;margin-left:180px;*margin-left:0}.form-horizontal .controls:first-child{*padding-left:180px}.form-horizontal .help-block{margin-bottom:0}.form-horizontal input+.help-block,.form-horizontal select+.help-block,.form-horizontal textarea+.help-block,.form-horizontal .uneditable-input+.help-block,.form-horizontal .input-prepend+.help-block,.form-horizontal .input-append+.help-block{margin-top:10px}.form-horizontal .form-actions{padding-left:180px}table{max-width:100%;background-color:transparent;border-collapse:collapse;border-spacing:0}.table{width:100%;margin-bottom:20px}.table th,.table td{padding:8px;line-height:20px;text-align:left;vertical-align:top;border-top:1px solid #ddd}.table th{font-weight:bold}.table thead th{vertical-align:bottom}.table caption+thead tr:first-child th,.table caption+thead tr:first-child td,.table colgroup+thead tr:first-child th,.table colgroup+thead tr:first-child td,.table thead:first-child tr:first-child th,.table thead:first-child tr:first-child td{border-top:0}.table tbody+tbody{border-top:2px solid #ddd}.table .table{background-color:#fff}.table-condensed th,.table-condensed td{padding:4px 5px}.table-bordered{border:1px solid #ddd;border-collapse:separate;*border-collapse:collapse;border-left:0;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.table-bordered th,.table-bordered td{border-left:1px solid #ddd}.table-bordered caption+thead tr:first-child th,.table-bordered caption+tbody tr:first-child th,.table-bordered caption+tbody tr:first-child td,.table-bordered colgroup+thead tr:first-child th,.table-bordered colgroup+tbody tr:first-child th,.table-bordered colgroup+tbody tr:first-child td,.table-bordered thead:first-child tr:first-child th,.table-bordered tbody:first-child tr:first-child th,.table-bordered tbody:first-child tr:first-child td{border-top:0}.table-bordered thead:first-child tr:first-child>th:first-child,.table-bordered tbody:first-child tr:first-child>td:first-child,.table-bordered tbody:first-child tr:first-child>th:first-child{-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-topleft:4px}.table-bordered thead:first-child tr:first-child>th:last-child,.table-bordered tbody:first-child tr:first-child>td:last-child,.table-bordered tbody:first-child tr:first-child>th:last-child{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-moz-border-radius-topright:4px}.table-bordered thead:last-child tr:last-child>th:first-child,.table-bordered tbody:last-child tr:last-child>td:first-child,.table-bordered tbody:last-child tr:last-child>th:first-child,.table-bordered tfoot:last-child tr:last-child>td:first-child,.table-bordered tfoot:last-child tr:last-child>th:first-child{-webkit-border-bottom-left-radius:4px;border-bottom-left-radius:4px;-moz-border-radius-bottomleft:4px}.table-bordered thead:last-child tr:last-child>th:last-child,.table-bordered tbody:last-child tr:last-child>td:last-child,.table-bordered tbody:last-child tr:last-child>th:last-child,.table-bordered tfoot:last-child tr:last-child>td:last-child,.table-bordered tfoot:last-child tr:last-child>th:last-child{-webkit-border-bottom-right-radius:4px;border-bottom-right-radius:4px;-moz-border-radius-bottomright:4px}.table-bordered tfoot+tbody:last-child tr:last-child td:first-child{-webkit-border-bottom-left-radius:0;border-bottom-left-radius:0;-moz-border-radius-bottomleft:0}.table-bordered tfoot+tbody:last-child tr:last-child td:last-child{-webkit-border-bottom-right-radius:0;border-bottom-right-radius:0;-moz-border-radius-bottomright:0}.table-bordered caption+thead tr:first-child th:first-child,.table-bordered caption+tbody tr:first-child td:first-child,.table-bordered colgroup+thead tr:first-child th:first-child,.table-bordered colgroup+tbody tr:first-child td:first-child{-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-topleft:4px}.table-bordered caption+thead tr:first-child th:last-child,.table-bordered caption+tbody tr:first-child td:last-child,.table-bordered colgroup+thead tr:first-child th:last-child,.table-bordered colgroup+tbody tr:first-child td:last-child{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-moz-border-radius-topright:4px}.table-striped tbody>tr:nth-child(odd)>td,.table-striped tbody>tr:nth-child(odd)>th{background-color:#f9f9f9}.table-hover tbody tr:hover>td,.table-hover tbody tr:hover>th{background-color:#f5f5f5}table td[class*=\"span\"],table th[class*=\"span\"],.row-fluid table td[class*=\"span\"],.row-fluid table th[class*=\"span\"]{display:table-cell;float:none;margin-left:0}.table td.span1,.table th.span1{float:none;width:44px;margin-left:0}.table td.span2,.table th.span2{float:none;width:124px;margin-left:0}.table td.span3,.table th.span3{float:none;width:204px;margin-left:0}.table td.span4,.table th.span4{float:none;width:284px;margin-left:0}.table td.span5,.table th.span5{float:none;width:364px;margin-left:0}.table td.span6,.table th.span6{float:none;width:444px;margin-left:0}.table td.span7,.table th.span7{float:none;width:524px;margin-left:0}.table td.span8,.table th.span8{float:none;width:604px;margin-left:0}.table td.span9,.table th.span9{float:none;width:684px;margin-left:0}.table td.span10,.table th.span10{float:none;width:764px;margin-left:0}.table td.span11,.table th.span11{float:none;width:844px;margin-left:0}.table td.span12,.table th.span12{float:none;width:924px;margin-left:0}.table tbody tr.success>td{background-color:#dff0d8}.table tbody tr.error>td{background-color:#f2dede}.table tbody tr.warning>td{background-color:#fcf8e3}.table tbody tr.info>td{background-color:#d9edf7}.table-hover tbody tr.success:hover>td{background-color:#d0e9c6}.table-hover tbody tr.error:hover>td{background-color:#ebcccc}.table-hover tbody tr.warning:hover>td{background-color:#faf2cc}.table-hover tbody tr.info:hover>td{background-color:#c4e3f3}[class^=\"icon-\"],[class*=\" icon-\"]{display:inline-block;width:14px;height:14px;margin-top:1px;*margin-right:.3em;line-height:14px;vertical-align:text-top;background-image:url(\"../img/glyphicons-halflings.png\");background-position:14px 14px;background-repeat:no-repeat}.icon-white,.nav-pills>.active>a>[class^=\"icon-\"],.nav-pills>.active>a>[class*=\" icon-\"],.nav-list>.active>a>[class^=\"icon-\"],.nav-list>.active>a>[class*=\" icon-\"],.navbar-inverse .nav>.active>a>[class^=\"icon-\"],.navbar-inverse .nav>.active>a>[class*=\" icon-\"],.dropdown-menu>li>a:hover>[class^=\"icon-\"],.dropdown-menu>li>a:focus>[class^=\"icon-\"],.dropdown-menu>li>a:hover>[class*=\" icon-\"],.dropdown-menu>li>a:focus>[class*=\" icon-\"],.dropdown-menu>.active>a>[class^=\"icon-\"],.dropdown-menu>.active>a>[class*=\" icon-\"],.dropdown-submenu:hover>a>[class^=\"icon-\"],.dropdown-submenu:focus>a>[class^=\"icon-\"],.dropdown-submenu:hover>a>[class*=\" icon-\"],.dropdown-submenu:focus>a>[class*=\" icon-\"]{background-image:url(\"../img/glyphicons-halflings-white.png\")}.icon-glass{background-position:0 0}.icon-music{background-position:-24px 0}.icon-search{background-position:-48px 0}.icon-envelope{background-position:-72px 0}.icon-heart{background-position:-96px 0}.icon-star{background-position:-120px 0}.icon-star-empty{background-position:-144px 0}.icon-user{background-position:-168px 0}.icon-film{background-position:-192px 0}.icon-th-large{background-position:-216px 0}.icon-th{background-position:-240px 0}.icon-th-list{background-position:-264px 0}.icon-ok{background-position:-288px 0}.icon-remove{background-position:-312px 0}.icon-zoom-in{background-position:-336px 0}.icon-zoom-out{background-position:-360px 0}.icon-off{background-position:-384px 0}.icon-signal{background-position:-408px 0}.icon-cog{background-position:-432px 0}.icon-trash{background-position:-456px 0}.icon-home{background-position:0 -24px}.icon-file{background-position:-24px -24px}.icon-time{background-position:-48px -24px}.icon-road{background-position:-72px -24px}.icon-download-alt{background-position:-96px -24px}.icon-download{background-position:-120px -24px}.icon-upload{background-position:-144px -24px}.icon-inbox{background-position:-168px -24px}.icon-play-circle{background-position:-192px -24px}.icon-repeat{background-position:-216px -24px}.icon-refresh{background-position:-240px -24px}.icon-list-alt{background-position:-264px -24px}.icon-lock{background-position:-287px -24px}.icon-flag{background-position:-312px -24px}.icon-headphones{background-position:-336px -24px}.icon-volume-off{background-position:-360px -24px}.icon-volume-down{background-position:-384px -24px}.icon-volume-up{background-position:-408px -24px}.icon-qrcode{background-position:-432px -24px}.icon-barcode{background-position:-456px -24px}.icon-tag{background-position:0 -48px}.icon-tags{background-position:-25px -48px}.icon-book{background-position:-48px -48px}.icon-bookmark{background-position:-72px -48px}.icon-print{background-position:-96px -48px}.icon-camera{background-position:-120px -48px}.icon-font{background-position:-144px -48px}.icon-bold{background-position:-167px -48px}.icon-italic{background-position:-192px -48px}.icon-text-height{background-position:-216px -48px}.icon-text-width{background-position:-240px -48px}.icon-align-left{background-position:-264px -48px}.icon-align-center{background-position:-288px -48px}.icon-align-right{background-position:-312px -48px}.icon-align-justify{background-position:-336px -48px}.icon-list{background-position:-360px -48px}.icon-indent-left{background-position:-384px -48px}.icon-indent-right{background-position:-408px -48px}.icon-facetime-video{background-position:-432px -48px}.icon-picture{background-position:-456px -48px}.icon-pencil{background-position:0 -72px}.icon-map-marker{background-position:-24px -72px}.icon-adjust{background-position:-48px -72px}.icon-tint{background-position:-72px -72px}.icon-edit{background-position:-96px -72px}.icon-share{background-position:-120px -72px}.icon-check{background-position:-144px -72px}.icon-move{background-position:-168px -72px}.icon-step-backward{background-position:-192px -72px}.icon-fast-backward{background-position:-216px -72px}.icon-backward{background-position:-240px -72px}.icon-play{background-position:-264px -72px}.icon-pause{background-position:-288px -72px}.icon-stop{background-position:-312px -72px}.icon-forward{background-position:-336px -72px}.icon-fast-forward{background-position:-360px -72px}.icon-step-forward{background-position:-384px -72px}.icon-eject{background-position:-408px -72px}.icon-chevron-left{background-position:-432px -72px}.icon-chevron-right{background-position:-456px -72px}.icon-plus-sign{background-position:0 -96px}.icon-minus-sign{background-position:-24px -96px}.icon-remove-sign{background-position:-48px -96px}.icon-ok-sign{background-position:-72px -96px}.icon-question-sign{background-position:-96px -96px}.icon-info-sign{background-position:-120px -96px}.icon-screenshot{background-position:-144px -96px}.icon-remove-circle{background-position:-168px -96px}.icon-ok-circle{background-position:-192px -96px}.icon-ban-circle{background-position:-216px -96px}.icon-arrow-left{background-position:-240px -96px}.icon-arrow-right{background-position:-264px -96px}.icon-arrow-up{background-position:-289px -96px}.icon-arrow-down{background-position:-312px -96px}.icon-share-alt{background-position:-336px -96px}.icon-resize-full{background-position:-360px -96px}.icon-resize-small{background-position:-384px -96px}.icon-plus{background-position:-408px -96px}.icon-minus{background-position:-433px -96px}.icon-asterisk{background-position:-456px -96px}.icon-exclamation-sign{background-position:0 -120px}.icon-gift{background-position:-24px -120px}.icon-leaf{background-position:-48px -120px}.icon-fire{background-position:-72px -120px}.icon-eye-open{background-position:-96px -120px}.icon-eye-close{background-position:-120px -120px}.icon-warning-sign{background-position:-144px -120px}.icon-plane{background-position:-168px -120px}.icon-calendar{background-position:-192px -120px}.icon-random{width:16px;background-position:-216px -120px}.icon-comment{background-position:-240px -120px}.icon-magnet{background-position:-264px -120px}.icon-chevron-up{background-position:-288px -120px}.icon-chevron-down{background-position:-313px -119px}.icon-retweet{background-position:-336px -120px}.icon-shopping-cart{background-position:-360px -120px}.icon-folder-close{width:16px;background-position:-384px -120px}.icon-folder-open{width:16px;background-position:-408px -120px}.icon-resize-vertical{background-position:-432px -119px}.icon-resize-horizontal{background-position:-456px -118px}.icon-hdd{background-position:0 -144px}.icon-bullhorn{background-position:-24px -144px}.icon-bell{background-position:-48px -144px}.icon-certificate{background-position:-72px -144px}.icon-thumbs-up{background-position:-96px -144px}.icon-thumbs-down{background-position:-120px -144px}.icon-hand-right{background-position:-144px -144px}.icon-hand-left{background-position:-168px -144px}.icon-hand-up{background-position:-192px -144px}.icon-hand-down{background-position:-216px -144px}.icon-circle-arrow-right{background-position:-240px -144px}.icon-circle-arrow-left{background-position:-264px -144px}.icon-circle-arrow-up{background-position:-288px -144px}.icon-circle-arrow-down{background-position:-312px -144px}.icon-globe{background-position:-336px -144px}.icon-wrench{background-position:-360px -144px}.icon-tasks{background-position:-384px -144px}.icon-filter{background-position:-408px -144px}.icon-briefcase{background-position:-432px -144px}.icon-fullscreen{background-position:-456px -144px}.dropup,.dropdown{position:relative}.dropdown-toggle{*margin-bottom:-3px}.dropdown-toggle:active,.open .dropdown-toggle{outline:0}.caret{display:inline-block;width:0;height:0;vertical-align:top;border-top:4px solid #000;border-right:4px solid transparent;border-left:4px solid transparent;content:\"\"}.dropdown .caret{margin-top:8px;margin-left:2px}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.2);*border-right-width:2px;*border-bottom-width:2px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);-moz-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2);-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{*width:100%;height:1px;margin:9px 1px;*margin:-5px 0 5px;overflow:hidden;background-color:#e5e5e5;border-bottom:1px solid #fff}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:normal;line-height:20px;color:#333;white-space:nowrap}.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus,.dropdown-submenu:hover>a,.dropdown-submenu:focus>a{color:#fff;text-decoration:none;background-color:#0081c2;background-image:-moz-linear-gradient(top,#08c,#0077b3);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#0077b3));background-image:-webkit-linear-gradient(top,#08c,#0077b3);background-image:-o-linear-gradient(top,#08c,#0077b3);background-image:linear-gradient(to bottom,#08c,#0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0077b3',GradientType=0)}.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus{color:#fff;text-decoration:none;background-color:#0081c2;background-image:-moz-linear-gradient(top,#08c,#0077b3);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#0077b3));background-image:-webkit-linear-gradient(top,#08c,#0077b3);background-image:-o-linear-gradient(top,#08c,#0077b3);background-image:linear-gradient(to bottom,#08c,#0077b3);background-repeat:repeat-x;outline:0;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0077b3',GradientType=0)}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{color:#999}.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{text-decoration:none;cursor:default;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.open{*z-index:1000}.open>.dropdown-menu{display:block}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px solid #000;content:\"\"}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:1px}.dropdown-submenu{position:relative}.dropdown-submenu>.dropdown-menu{top:0;left:100%;margin-top:-6px;margin-left:-1px;-webkit-border-radius:0 6px 6px 6px;-moz-border-radius:0 6px 6px 6px;border-radius:0 6px 6px 6px}.dropdown-submenu:hover>.dropdown-menu{display:block}.dropup .dropdown-submenu>.dropdown-menu{top:auto;bottom:0;margin-top:0;margin-bottom:-2px;-webkit-border-radius:5px 5px 5px 0;-moz-border-radius:5px 5px 5px 0;border-radius:5px 5px 5px 0}.dropdown-submenu>a:after{display:block;float:right;width:0;height:0;margin-top:5px;margin-right:-10px;border-color:transparent;border-left-color:#ccc;border-style:solid;border-width:5px 0 5px 5px;content:\" \"}.dropdown-submenu:hover>a:after{border-left-color:#fff}.dropdown-submenu.pull-left{float:none}.dropdown-submenu.pull-left>.dropdown-menu{left:-100%;margin-left:10px;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px}.dropdown .dropdown-menu .nav-header{padding-right:20px;padding-left:20px}.typeahead{z-index:1051;margin-top:2px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.05);box-shadow:inset 0 1px 1px rgba(0,0,0,0.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,0.15)}.well-large{padding:24px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.well-small{padding:9px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.fade{opacity:0;-webkit-transition:opacity .15s linear;-moz-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{position:relative;height:0;overflow:hidden;-webkit-transition:height .35s ease;-moz-transition:height .35s ease;-o-transition:height .35s ease;transition:height .35s ease}.collapse.in{height:auto}.close{float:right;font-size:20px;font-weight:bold;line-height:20px;color:#000;text-shadow:0 1px 0 #fff;opacity:.2;filter:alpha(opacity=20)}.close:hover,.close:focus{color:#000;text-decoration:none;cursor:pointer;opacity:.4;filter:alpha(opacity=40)}button.close{padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none}.btn{display:inline-block;*display:inline;padding:4px 12px;margin-bottom:0;*margin-left:.3em;font-size:14px;line-height:20px;color:#333;text-align:center;text-shadow:0 1px 1px rgba(255,255,255,0.75);vertical-align:middle;cursor:pointer;background-color:#f5f5f5;*background-color:#e6e6e6;background-image:-moz-linear-gradient(top,#fff,#e6e6e6);background-image:-webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));background-image:-webkit-linear-gradient(top,#fff,#e6e6e6);background-image:-o-linear-gradient(top,#fff,#e6e6e6);background-image:linear-gradient(to bottom,#fff,#e6e6e6);background-repeat:repeat-x;border:1px solid #ccc;*border:0;border-color:#e6e6e6 #e6e6e6 #bfbfbf;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);border-bottom-color:#b3b3b3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#ffe6e6e6',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);*zoom:1;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05)}.btn:hover,.btn:focus,.btn:active,.btn.active,.btn.disabled,.btn[disabled]{color:#333;background-color:#e6e6e6;*background-color:#d9d9d9}.btn:active,.btn.active{background-color:#ccc \\9}.btn:first-child{*margin-left:0}.btn:hover,.btn:focus{color:#333;text-decoration:none;background-position:0 -15px;-webkit-transition:background-position .1s linear;-moz-transition:background-position .1s linear;-o-transition:background-position .1s linear;transition:background-position .1s linear}.btn:focus{outline:thin dotted #333;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.btn.active,.btn:active{background-image:none;outline:0;-webkit-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05)}.btn.disabled,.btn[disabled]{cursor:default;background-image:none;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.btn-large{padding:11px 19px;font-size:17.5px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.btn-large [class^=\"icon-\"],.btn-large [class*=\" icon-\"]{margin-top:4px}.btn-small{padding:2px 10px;font-size:11.9px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.btn-small [class^=\"icon-\"],.btn-small [class*=\" icon-\"]{margin-top:0}.btn-mini [class^=\"icon-\"],.btn-mini [class*=\" icon-\"]{margin-top:-1px}.btn-mini{padding:0 6px;font-size:10.5px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.btn-block{display:block;width:100%;padding-right:0;padding-left:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.btn-block+.btn-block{margin-top:5px}input[type=\"submit\"].btn-block,input[type=\"reset\"].btn-block,input[type=\"button\"].btn-block{width:100%}.btn-primary.active,.btn-warning.active,.btn-danger.active,.btn-success.active,.btn-info.active,.btn-inverse.active{color:rgba(255,255,255,0.75)}.btn-primary{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#006dcc;*background-color:#04c;background-image:-moz-linear-gradient(top,#08c,#04c);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#04c));background-image:-webkit-linear-gradient(top,#08c,#04c);background-image:-o-linear-gradient(top,#08c,#04c);background-image:linear-gradient(to bottom,#08c,#04c);background-repeat:repeat-x;border-color:#04c #04c #002a80;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0044cc',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary.active,.btn-primary.disabled,.btn-primary[disabled]{color:#fff;background-color:#04c;*background-color:#003bb3}.btn-primary:active,.btn-primary.active{background-color:#039 \\9}.btn-warning{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#faa732;*background-color:#f89406;background-image:-moz-linear-gradient(top,#fbb450,#f89406);background-image:-webkit-gradient(linear,0 0,0 100%,from(#fbb450),to(#f89406));background-image:-webkit-linear-gradient(top,#fbb450,#f89406);background-image:-o-linear-gradient(top,#fbb450,#f89406);background-image:linear-gradient(to bottom,#fbb450,#f89406);background-repeat:repeat-x;border-color:#f89406 #f89406 #ad6704;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffbb450',endColorstr='#fff89406',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-warning:hover,.btn-warning:focus,.btn-warning:active,.btn-warning.active,.btn-warning.disabled,.btn-warning[disabled]{color:#fff;background-color:#f89406;*background-color:#df8505}.btn-warning:active,.btn-warning.active{background-color:#c67605 \\9}.btn-danger{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#da4f49;*background-color:#bd362f;background-image:-moz-linear-gradient(top,#ee5f5b,#bd362f);background-image:-webkit-gradient(linear,0 0,0 100%,from(#ee5f5b),to(#bd362f));background-image:-webkit-linear-gradient(top,#ee5f5b,#bd362f);background-image:-o-linear-gradient(top,#ee5f5b,#bd362f);background-image:linear-gradient(to bottom,#ee5f5b,#bd362f);background-repeat:repeat-x;border-color:#bd362f #bd362f #802420;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffee5f5b',endColorstr='#ffbd362f',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-danger:hover,.btn-danger:focus,.btn-danger:active,.btn-danger.active,.btn-danger.disabled,.btn-danger[disabled]{color:#fff;background-color:#bd362f;*background-color:#a9302a}.btn-danger:active,.btn-danger.active{background-color:#942a25 \\9}.btn-success{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#5bb75b;*background-color:#51a351;background-image:-moz-linear-gradient(top,#62c462,#51a351);background-image:-webkit-gradient(linear,0 0,0 100%,from(#62c462),to(#51a351));background-image:-webkit-linear-gradient(top,#62c462,#51a351);background-image:-o-linear-gradient(top,#62c462,#51a351);background-image:linear-gradient(to bottom,#62c462,#51a351);background-repeat:repeat-x;border-color:#51a351 #51a351 #387038;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff51a351',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-success:hover,.btn-success:focus,.btn-success:active,.btn-success.active,.btn-success.disabled,.btn-success[disabled]{color:#fff;background-color:#51a351;*background-color:#499249}.btn-success:active,.btn-success.active{background-color:#408140 \\9}.btn-info{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#49afcd;*background-color:#2f96b4;background-image:-moz-linear-gradient(top,#5bc0de,#2f96b4);background-image:-webkit-gradient(linear,0 0,0 100%,from(#5bc0de),to(#2f96b4));background-image:-webkit-linear-gradient(top,#5bc0de,#2f96b4);background-image:-o-linear-gradient(top,#5bc0de,#2f96b4);background-image:linear-gradient(to bottom,#5bc0de,#2f96b4);background-repeat:repeat-x;border-color:#2f96b4 #2f96b4 #1f6377;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5bc0de',endColorstr='#ff2f96b4',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-info:hover,.btn-info:focus,.btn-info:active,.btn-info.active,.btn-info.disabled,.btn-info[disabled]{color:#fff;background-color:#2f96b4;*background-color:#2a85a0}.btn-info:active,.btn-info.active{background-color:#24748c \\9}.btn-inverse{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#363636;*background-color:#222;background-image:-moz-linear-gradient(top,#444,#222);background-image:-webkit-gradient(linear,0 0,0 100%,from(#444),to(#222));background-image:-webkit-linear-gradient(top,#444,#222);background-image:-o-linear-gradient(top,#444,#222);background-image:linear-gradient(to bottom,#444,#222);background-repeat:repeat-x;border-color:#222 #222 #000;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff444444',endColorstr='#ff222222',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-inverse:hover,.btn-inverse:focus,.btn-inverse:active,.btn-inverse.active,.btn-inverse.disabled,.btn-inverse[disabled]{color:#fff;background-color:#222;*background-color:#151515}.btn-inverse:active,.btn-inverse.active{background-color:#080808 \\9}button.btn,input[type=\"submit\"].btn{*padding-top:3px;*padding-bottom:3px}button.btn::-moz-focus-inner,input[type=\"submit\"].btn::-moz-focus-inner{padding:0;border:0}button.btn.btn-large,input[type=\"submit\"].btn.btn-large{*padding-top:7px;*padding-bottom:7px}button.btn.btn-small,input[type=\"submit\"].btn.btn-small{*padding-top:3px;*padding-bottom:3px}button.btn.btn-mini,input[type=\"submit\"].btn.btn-mini{*padding-top:1px;*padding-bottom:1px}.btn-link,.btn-link:active,.btn-link[disabled]{background-color:transparent;background-image:none;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.btn-link{color:#08c;cursor:pointer;border-color:transparent;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.btn-link:hover,.btn-link:focus{color:#005580;text-decoration:underline;background-color:transparent}.btn-link[disabled]:hover,.btn-link[disabled]:focus{color:#333;text-decoration:none}.btn-group{position:relative;display:inline-block;*display:inline;*margin-left:.3em;font-size:0;white-space:nowrap;vertical-align:middle;*zoom:1}.btn-group:first-child{*margin-left:0}.btn-group+.btn-group{margin-left:5px}.btn-toolbar{margin-top:10px;margin-bottom:10px;font-size:0}.btn-toolbar>.btn+.btn,.btn-toolbar>.btn-group+.btn,.btn-toolbar>.btn+.btn-group{margin-left:5px}.btn-group>.btn{position:relative;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.btn-group>.btn+.btn{margin-left:-1px}.btn-group>.btn,.btn-group>.dropdown-menu,.btn-group>.popover{font-size:14px}.btn-group>.btn-mini{font-size:10.5px}.btn-group>.btn-small{font-size:11.9px}.btn-group>.btn-large{font-size:17.5px}.btn-group>.btn:first-child{margin-left:0;-webkit-border-bottom-left-radius:4px;border-bottom-left-radius:4px;-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-bottomleft:4px;-moz-border-radius-topleft:4px}.btn-group>.btn:last-child,.btn-group>.dropdown-toggle{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-webkit-border-bottom-right-radius:4px;border-bottom-right-radius:4px;-moz-border-radius-topright:4px;-moz-border-radius-bottomright:4px}.btn-group>.btn.large:first-child{margin-left:0;-webkit-border-bottom-left-radius:6px;border-bottom-left-radius:6px;-webkit-border-top-left-radius:6px;border-top-left-radius:6px;-moz-border-radius-bottomleft:6px;-moz-border-radius-topleft:6px}.btn-group>.btn.large:last-child,.btn-group>.large.dropdown-toggle{-webkit-border-top-right-radius:6px;border-top-right-radius:6px;-webkit-border-bottom-right-radius:6px;border-bottom-right-radius:6px;-moz-border-radius-topright:6px;-moz-border-radius-bottomright:6px}.btn-group>.btn:hover,.btn-group>.btn:focus,.btn-group>.btn:active,.btn-group>.btn.active{z-index:2}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{*padding-top:5px;padding-right:8px;*padding-bottom:5px;padding-left:8px;-webkit-box-shadow:inset 1px 0 0 rgba(255,255,255,0.125),inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 1px 0 0 rgba(255,255,255,0.125),inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 1px 0 0 rgba(255,255,255,0.125),inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05)}.btn-group>.btn-mini+.dropdown-toggle{*padding-top:2px;padding-right:5px;*padding-bottom:2px;padding-left:5px}.btn-group>.btn-small+.dropdown-toggle{*padding-top:5px;*padding-bottom:4px}.btn-group>.btn-large+.dropdown-toggle{*padding-top:7px;padding-right:12px;*padding-bottom:7px;padding-left:12px}.btn-group.open .dropdown-toggle{background-image:none;-webkit-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05)}.btn-group.open .btn.dropdown-toggle{background-color:#e6e6e6}.btn-group.open .btn-primary.dropdown-toggle{background-color:#04c}.btn-group.open .btn-warning.dropdown-toggle{background-color:#f89406}.btn-group.open .btn-danger.dropdown-toggle{background-color:#bd362f}.btn-group.open .btn-success.dropdown-toggle{background-color:#51a351}.btn-group.open .btn-info.dropdown-toggle{background-color:#2f96b4}.btn-group.open .btn-inverse.dropdown-toggle{background-color:#222}.btn .caret{margin-top:8px;margin-left:0}.btn-large .caret{margin-top:6px}.btn-large .caret{border-top-width:5px;border-right-width:5px;border-left-width:5px}.btn-mini .caret,.btn-small .caret{margin-top:8px}.dropup .btn-large .caret{border-bottom-width:5px}.btn-primary .caret,.btn-warning .caret,.btn-danger .caret,.btn-info .caret,.btn-success .caret,.btn-inverse .caret{border-top-color:#fff;border-bottom-color:#fff}.btn-group-vertical{display:inline-block;*display:inline;*zoom:1}.btn-group-vertical>.btn{display:block;float:none;max-width:100%;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.btn-group-vertical>.btn+.btn{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:first-child{-webkit-border-radius:4px 4px 0 0;-moz-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0}.btn-group-vertical>.btn:last-child{-webkit-border-radius:0 0 4px 4px;-moz-border-radius:0 0 4px 4px;border-radius:0 0 4px 4px}.btn-group-vertical>.btn-large:first-child{-webkit-border-radius:6px 6px 0 0;-moz-border-radius:6px 6px 0 0;border-radius:6px 6px 0 0}.btn-group-vertical>.btn-large:last-child{-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px}.alert{padding:8px 35px 8px 14px;margin-bottom:20px;text-shadow:0 1px 0 rgba(255,255,255,0.5);background-color:#fcf8e3;border:1px solid #fbeed5;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.alert,.alert h4{color:#c09853}.alert h4{margin:0}.alert .close{position:relative;top:-2px;right:-21px;line-height:20px}.alert-success{color:#468847;background-color:#dff0d8;border-color:#d6e9c6}.alert-success h4{color:#468847}.alert-danger,.alert-error{color:#b94a48;background-color:#f2dede;border-color:#eed3d7}.alert-danger h4,.alert-error h4{color:#b94a48}.alert-info{color:#3a87ad;background-color:#d9edf7;border-color:#bce8f1}.alert-info h4{color:#3a87ad}.alert-block{padding-top:14px;padding-bottom:14px}.alert-block>p,.alert-block>ul{margin-bottom:0}.alert-block p+p{margin-top:5px}.nav{margin-bottom:20px;margin-left:0;list-style:none}.nav>li>a{display:block}.nav>li>a:hover,.nav>li>a:focus{text-decoration:none;background-color:#eee}.nav>li>a>img{max-width:none}.nav>.pull-right{float:right}.nav-header{display:block;padding:3px 15px;font-size:11px;font-weight:bold;line-height:20px;color:#999;text-shadow:0 1px 0 rgba(255,255,255,0.5);text-transform:uppercase}.nav li+.nav-header{margin-top:9px}.nav-list{padding-right:15px;padding-left:15px;margin-bottom:0}.nav-list>li>a,.nav-list .nav-header{margin-right:-15px;margin-left:-15px;text-shadow:0 1px 0 rgba(255,255,255,0.5)}.nav-list>li>a{padding:3px 15px}.nav-list>.active>a,.nav-list>.active>a:hover,.nav-list>.active>a:focus{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.2);background-color:#08c}.nav-list [class^=\"icon-\"],.nav-list [class*=\" icon-\"]{margin-right:2px}.nav-list .divider{*width:100%;height:1px;margin:9px 1px;*margin:-5px 0 5px;overflow:hidden;background-color:#e5e5e5;border-bottom:1px solid #fff}.nav-tabs,.nav-pills{*zoom:1}.nav-tabs:before,.nav-pills:before,.nav-tabs:after,.nav-pills:after{display:table;line-height:0;content:\"\"}.nav-tabs:after,.nav-pills:after{clear:both}.nav-tabs>li,.nav-pills>li{float:left}.nav-tabs>li>a,.nav-pills>li>a{padding-right:12px;padding-left:12px;margin-right:2px;line-height:14px}.nav-tabs{border-bottom:1px solid #ddd}.nav-tabs>li{margin-bottom:-1px}.nav-tabs>li>a{padding-top:8px;padding-bottom:8px;line-height:20px;border:1px solid transparent;-webkit-border-radius:4px 4px 0 0;-moz-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0}.nav-tabs>li>a:hover,.nav-tabs>li>a:focus{border-color:#eee #eee #ddd}.nav-tabs>.active>a,.nav-tabs>.active>a:hover,.nav-tabs>.active>a:focus{color:#555;cursor:default;background-color:#fff;border:1px solid #ddd;border-bottom-color:transparent}.nav-pills>li>a{padding-top:8px;padding-bottom:8px;margin-top:2px;margin-bottom:2px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px}.nav-pills>.active>a,.nav-pills>.active>a:hover,.nav-pills>.active>a:focus{color:#fff;background-color:#08c}.nav-stacked>li{float:none}.nav-stacked>li>a{margin-right:0}.nav-tabs.nav-stacked{border-bottom:0}.nav-tabs.nav-stacked>li>a{border:1px solid #ddd;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.nav-tabs.nav-stacked>li:first-child>a{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-topright:4px;-moz-border-radius-topleft:4px}.nav-tabs.nav-stacked>li:last-child>a{-webkit-border-bottom-right-radius:4px;border-bottom-right-radius:4px;-webkit-border-bottom-left-radius:4px;border-bottom-left-radius:4px;-moz-border-radius-bottomright:4px;-moz-border-radius-bottomleft:4px}.nav-tabs.nav-stacked>li>a:hover,.nav-tabs.nav-stacked>li>a:focus{z-index:2;border-color:#ddd}.nav-pills.nav-stacked>li>a{margin-bottom:3px}.nav-pills.nav-stacked>li:last-child>a{margin-bottom:1px}.nav-tabs .dropdown-menu{-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px}.nav-pills .dropdown-menu{-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.nav .dropdown-toggle .caret{margin-top:6px;border-top-color:#08c;border-bottom-color:#08c}.nav .dropdown-toggle:hover .caret,.nav .dropdown-toggle:focus .caret{border-top-color:#005580;border-bottom-color:#005580}.nav-tabs .dropdown-toggle .caret{margin-top:8px}.nav .active .dropdown-toggle .caret{border-top-color:#fff;border-bottom-color:#fff}.nav-tabs .active .dropdown-toggle .caret{border-top-color:#555;border-bottom-color:#555}.nav>.dropdown.active>a:hover,.nav>.dropdown.active>a:focus{cursor:pointer}.nav-tabs .open .dropdown-toggle,.nav-pills .open .dropdown-toggle,.nav>li.dropdown.open.active>a:hover,.nav>li.dropdown.open.active>a:focus{color:#fff;background-color:#999;border-color:#999}.nav li.dropdown.open .caret,.nav li.dropdown.open.active .caret,.nav li.dropdown.open a:hover .caret,.nav li.dropdown.open a:focus .caret{border-top-color:#fff;border-bottom-color:#fff;opacity:1;filter:alpha(opacity=100)}.tabs-stacked .open>a:hover,.tabs-stacked .open>a:focus{border-color:#999}.tabbable{*zoom:1}.tabbable:before,.tabbable:after{display:table;line-height:0;content:\"\"}.tabbable:after{clear:both}.tab-content{overflow:auto}.tabs-below>.nav-tabs,.tabs-right>.nav-tabs,.tabs-left>.nav-tabs{border-bottom:0}.tab-content>.tab-pane,.pill-content>.pill-pane{display:none}.tab-content>.active,.pill-content>.active{display:block}.tabs-below>.nav-tabs{border-top:1px solid #ddd}.tabs-below>.nav-tabs>li{margin-top:-1px;margin-bottom:0}.tabs-below>.nav-tabs>li>a{-webkit-border-radius:0 0 4px 4px;-moz-border-radius:0 0 4px 4px;border-radius:0 0 4px 4px}.tabs-below>.nav-tabs>li>a:hover,.tabs-below>.nav-tabs>li>a:focus{border-top-color:#ddd;border-bottom-color:transparent}.tabs-below>.nav-tabs>.active>a,.tabs-below>.nav-tabs>.active>a:hover,.tabs-below>.nav-tabs>.active>a:focus{border-color:transparent #ddd #ddd #ddd}.tabs-left>.nav-tabs>li,.tabs-right>.nav-tabs>li{float:none}.tabs-left>.nav-tabs>li>a,.tabs-right>.nav-tabs>li>a{min-width:74px;margin-right:0;margin-bottom:3px}.tabs-left>.nav-tabs{float:left;margin-right:19px;border-right:1px solid #ddd}.tabs-left>.nav-tabs>li>a{margin-right:-1px;-webkit-border-radius:4px 0 0 4px;-moz-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.tabs-left>.nav-tabs>li>a:hover,.tabs-left>.nav-tabs>li>a:focus{border-color:#eee #ddd #eee #eee}.tabs-left>.nav-tabs .active>a,.tabs-left>.nav-tabs .active>a:hover,.tabs-left>.nav-tabs .active>a:focus{border-color:#ddd transparent #ddd #ddd;*border-right-color:#fff}.tabs-right>.nav-tabs{float:right;margin-left:19px;border-left:1px solid #ddd}.tabs-right>.nav-tabs>li>a{margin-left:-1px;-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.tabs-right>.nav-tabs>li>a:hover,.tabs-right>.nav-tabs>li>a:focus{border-color:#eee #eee #eee #ddd}.tabs-right>.nav-tabs .active>a,.tabs-right>.nav-tabs .active>a:hover,.tabs-right>.nav-tabs .active>a:focus{border-color:#ddd #ddd #ddd transparent;*border-left-color:#fff}.nav>.disabled>a{color:#999}.nav>.disabled>a:hover,.nav>.disabled>a:focus{text-decoration:none;cursor:default;background-color:transparent}.navbar{*position:relative;*z-index:2;margin-bottom:20px;overflow:visible}.navbar-inner{min-height:40px;padding-right:20px;padding-left:20px;background-color:#fafafa;background-image:-moz-linear-gradient(top,#fff,#f2f2f2);background-image:-webkit-gradient(linear,0 0,0 100%,from(#fff),to(#f2f2f2));background-image:-webkit-linear-gradient(top,#fff,#f2f2f2);background-image:-o-linear-gradient(top,#fff,#f2f2f2);background-image:linear-gradient(to bottom,#fff,#f2f2f2);background-repeat:repeat-x;border:1px solid #d4d4d4;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#fff2f2f2',GradientType=0);*zoom:1;-webkit-box-shadow:0 1px 4px rgba(0,0,0,0.065);-moz-box-shadow:0 1px 4px rgba(0,0,0,0.065);box-shadow:0 1px 4px rgba(0,0,0,0.065)}.navbar-inner:before,.navbar-inner:after{display:table;line-height:0;content:\"\"}.navbar-inner:after{clear:both}.navbar .container{width:auto}.nav-collapse.collapse{height:auto;overflow:visible}.navbar .brand{display:block;float:left;padding:10px 20px 10px;margin-left:-20px;font-size:20px;font-weight:200;color:#777;text-shadow:0 1px 0 #fff}.navbar .brand:hover,.navbar .brand:focus{text-decoration:none}.navbar-text{margin-bottom:0;line-height:40px;color:#777}.navbar-link{color:#777}.navbar-link:hover,.navbar-link:focus{color:#333}.navbar .divider-vertical{height:40px;margin:0 9px;border-right:1px solid #fff;border-left:1px solid #f2f2f2}.navbar .btn,.navbar .btn-group{margin-top:5px}.navbar .btn-group .btn,.navbar .input-prepend .btn,.navbar .input-append .btn,.navbar .input-prepend .btn-group,.navbar .input-append .btn-group{margin-top:0}.navbar-form{margin-bottom:0;*zoom:1}.navbar-form:before,.navbar-form:after{display:table;line-height:0;content:\"\"}.navbar-form:after{clear:both}.navbar-form input,.navbar-form select,.navbar-form .radio,.navbar-form .checkbox{margin-top:5px}.navbar-form input,.navbar-form select,.navbar-form .btn{display:inline-block;margin-bottom:0}.navbar-form input[type=\"image\"],.navbar-form input[type=\"checkbox\"],.navbar-form input[type=\"radio\"]{margin-top:3px}.navbar-form .input-append,.navbar-form .input-prepend{margin-top:5px;white-space:nowrap}.navbar-form .input-append input,.navbar-form .input-prepend input{margin-top:0}.navbar-search{position:relative;float:left;margin-top:5px;margin-bottom:0}.navbar-search .search-query{padding:4px 14px;margin-bottom:0;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1;-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px}.navbar-static-top{position:static;margin-bottom:0}.navbar-static-top .navbar-inner{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.navbar-fixed-top,.navbar-fixed-bottom{position:fixed;right:0;left:0;z-index:1030;margin-bottom:0}.navbar-fixed-top .navbar-inner,.navbar-static-top .navbar-inner{border-width:0 0 1px}.navbar-fixed-bottom .navbar-inner{border-width:1px 0 0}.navbar-fixed-top .navbar-inner,.navbar-fixed-bottom .navbar-inner{padding-right:0;padding-left:0;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.navbar-static-top .container,.navbar-fixed-top .container,.navbar-fixed-bottom .container{width:940px}.navbar-fixed-top{top:0}.navbar-fixed-top .navbar-inner,.navbar-static-top .navbar-inner{-webkit-box-shadow:0 1px 10px rgba(0,0,0,0.1);-moz-box-shadow:0 1px 10px rgba(0,0,0,0.1);box-shadow:0 1px 10px rgba(0,0,0,0.1)}.navbar-fixed-bottom{bottom:0}.navbar-fixed-bottom .navbar-inner{-webkit-box-shadow:0 -1px 10px rgba(0,0,0,0.1);-moz-box-shadow:0 -1px 10px rgba(0,0,0,0.1);box-shadow:0 -1px 10px rgba(0,0,0,0.1)}.navbar .nav{position:relative;left:0;display:block;float:left;margin:0 10px 0 0}.navbar .nav.pull-right{float:right;margin-right:0}.navbar .nav>li{float:left}.navbar .nav>li>a{float:none;padding:10px 15px 10px;color:#777;text-decoration:none;text-shadow:0 1px 0 #fff}.navbar .nav .dropdown-toggle .caret{margin-top:8px}.navbar .nav>li>a:focus,.navbar .nav>li>a:hover{color:#333;text-decoration:none;background-color:transparent}.navbar .nav>.active>a,.navbar .nav>.active>a:hover,.navbar .nav>.active>a:focus{color:#555;text-decoration:none;background-color:#e5e5e5;-webkit-box-shadow:inset 0 3px 8px rgba(0,0,0,0.125);-moz-box-shadow:inset 0 3px 8px rgba(0,0,0,0.125);box-shadow:inset 0 3px 8px rgba(0,0,0,0.125)}.navbar .btn-navbar{display:none;float:right;padding:7px 10px;margin-right:5px;margin-left:5px;color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#ededed;*background-color:#e5e5e5;background-image:-moz-linear-gradient(top,#f2f2f2,#e5e5e5);background-image:-webkit-gradient(linear,0 0,0 100%,from(#f2f2f2),to(#e5e5e5));background-image:-webkit-linear-gradient(top,#f2f2f2,#e5e5e5);background-image:-o-linear-gradient(top,#f2f2f2,#e5e5e5);background-image:linear-gradient(to bottom,#f2f2f2,#e5e5e5);background-repeat:repeat-x;border-color:#e5e5e5 #e5e5e5 #bfbfbf;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff2f2f2',endColorstr='#ffe5e5e5',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.075);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.075);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.075)}.navbar .btn-navbar:hover,.navbar .btn-navbar:focus,.navbar .btn-navbar:active,.navbar .btn-navbar.active,.navbar .btn-navbar.disabled,.navbar .btn-navbar[disabled]{color:#fff;background-color:#e5e5e5;*background-color:#d9d9d9}.navbar .btn-navbar:active,.navbar .btn-navbar.active{background-color:#ccc \\9}.navbar .btn-navbar .icon-bar{display:block;width:18px;height:2px;background-color:#f5f5f5;-webkit-border-radius:1px;-moz-border-radius:1px;border-radius:1px;-webkit-box-shadow:0 1px 0 rgba(0,0,0,0.25);-moz-box-shadow:0 1px 0 rgba(0,0,0,0.25);box-shadow:0 1px 0 rgba(0,0,0,0.25)}.btn-navbar .icon-bar+.icon-bar{margin-top:3px}.navbar .nav>li>.dropdown-menu:before{position:absolute;top:-7px;left:9px;display:inline-block;border-right:7px solid transparent;border-bottom:7px solid #ccc;border-left:7px solid transparent;border-bottom-color:rgba(0,0,0,0.2);content:''}.navbar .nav>li>.dropdown-menu:after{position:absolute;top:-6px;left:10px;display:inline-block;border-right:6px solid transparent;border-bottom:6px solid #fff;border-left:6px solid transparent;content:''}.navbar-fixed-bottom .nav>li>.dropdown-menu:before{top:auto;bottom:-7px;border-top:7px solid #ccc;border-bottom:0;border-top-color:rgba(0,0,0,0.2)}.navbar-fixed-bottom .nav>li>.dropdown-menu:after{top:auto;bottom:-6px;border-top:6px solid #fff;border-bottom:0}.navbar .nav li.dropdown>a:hover .caret,.navbar .nav li.dropdown>a:focus .caret{border-top-color:#333;border-bottom-color:#333}.navbar .nav li.dropdown.open>.dropdown-toggle,.navbar .nav li.dropdown.active>.dropdown-toggle,.navbar .nav li.dropdown.open.active>.dropdown-toggle{color:#555;background-color:#e5e5e5}.navbar .nav li.dropdown>.dropdown-toggle .caret{border-top-color:#777;border-bottom-color:#777}.navbar .nav li.dropdown.open>.dropdown-toggle .caret,.navbar .nav li.dropdown.active>.dropdown-toggle .caret,.navbar .nav li.dropdown.open.active>.dropdown-toggle .caret{border-top-color:#555;border-bottom-color:#555}.navbar .pull-right>li>.dropdown-menu,.navbar .nav>li>.dropdown-menu.pull-right{right:0;left:auto}.navbar .pull-right>li>.dropdown-menu:before,.navbar .nav>li>.dropdown-menu.pull-right:before{right:12px;left:auto}.navbar .pull-right>li>.dropdown-menu:after,.navbar .nav>li>.dropdown-menu.pull-right:after{right:13px;left:auto}.navbar .pull-right>li>.dropdown-menu .dropdown-menu,.navbar .nav>li>.dropdown-menu.pull-right .dropdown-menu{right:100%;left:auto;margin-right:-1px;margin-left:0;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px}.navbar-inverse .navbar-inner{background-color:#1b1b1b;background-image:-moz-linear-gradient(top,#222,#111);background-image:-webkit-gradient(linear,0 0,0 100%,from(#222),to(#111));background-image:-webkit-linear-gradient(top,#222,#111);background-image:-o-linear-gradient(top,#222,#111);background-image:linear-gradient(to bottom,#222,#111);background-repeat:repeat-x;border-color:#252525;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff222222',endColorstr='#ff111111',GradientType=0)}.navbar-inverse .brand,.navbar-inverse .nav>li>a{color:#999;text-shadow:0 -1px 0 rgba(0,0,0,0.25)}.navbar-inverse .brand:hover,.navbar-inverse .nav>li>a:hover,.navbar-inverse .brand:focus,.navbar-inverse .nav>li>a:focus{color:#fff}.navbar-inverse .brand{color:#999}.navbar-inverse .navbar-text{color:#999}.navbar-inverse .nav>li>a:focus,.navbar-inverse .nav>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .nav .active>a,.navbar-inverse .nav .active>a:hover,.navbar-inverse .nav .active>a:focus{color:#fff;background-color:#111}.navbar-inverse .navbar-link{color:#999}.navbar-inverse .navbar-link:hover,.navbar-inverse .navbar-link:focus{color:#fff}.navbar-inverse .divider-vertical{border-right-color:#222;border-left-color:#111}.navbar-inverse .nav li.dropdown.open>.dropdown-toggle,.navbar-inverse .nav li.dropdown.active>.dropdown-toggle,.navbar-inverse .nav li.dropdown.open.active>.dropdown-toggle{color:#fff;background-color:#111}.navbar-inverse .nav li.dropdown>a:hover .caret,.navbar-inverse .nav li.dropdown>a:focus .caret{border-top-color:#fff;border-bottom-color:#fff}.navbar-inverse .nav li.dropdown>.dropdown-toggle .caret{border-top-color:#999;border-bottom-color:#999}.navbar-inverse .nav li.dropdown.open>.dropdown-toggle .caret,.navbar-inverse .nav li.dropdown.active>.dropdown-toggle .caret,.navbar-inverse .nav li.dropdown.open.active>.dropdown-toggle .caret{border-top-color:#fff;border-bottom-color:#fff}.navbar-inverse .navbar-search .search-query{color:#fff;background-color:#515151;border-color:#111;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),0 1px 0 rgba(255,255,255,0.15);-moz-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),0 1px 0 rgba(255,255,255,0.15);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),0 1px 0 rgba(255,255,255,0.15);-webkit-transition:none;-moz-transition:none;-o-transition:none;transition:none}.navbar-inverse .navbar-search .search-query:-moz-placeholder{color:#ccc}.navbar-inverse .navbar-search .search-query:-ms-input-placeholder{color:#ccc}.navbar-inverse .navbar-search .search-query::-webkit-input-placeholder{color:#ccc}.navbar-inverse .navbar-search .search-query:focus,.navbar-inverse .navbar-search .search-query.focused{padding:5px 15px;color:#333;text-shadow:0 1px 0 #fff;background-color:#fff;border:0;outline:0;-webkit-box-shadow:0 0 3px rgba(0,0,0,0.15);-moz-box-shadow:0 0 3px rgba(0,0,0,0.15);box-shadow:0 0 3px rgba(0,0,0,0.15)}.navbar-inverse .btn-navbar{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#0e0e0e;*background-color:#040404;background-image:-moz-linear-gradient(top,#151515,#040404);background-image:-webkit-gradient(linear,0 0,0 100%,from(#151515),to(#040404));background-image:-webkit-linear-gradient(top,#151515,#040404);background-image:-o-linear-gradient(top,#151515,#040404);background-image:linear-gradient(to bottom,#151515,#040404);background-repeat:repeat-x;border-color:#040404 #040404 #000;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff151515',endColorstr='#ff040404',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.navbar-inverse .btn-navbar:hover,.navbar-inverse .btn-navbar:focus,.navbar-inverse .btn-navbar:active,.navbar-inverse .btn-navbar.active,.navbar-inverse .btn-navbar.disabled,.navbar-inverse .btn-navbar[disabled]{color:#fff;background-color:#040404;*background-color:#000}.navbar-inverse .btn-navbar:active,.navbar-inverse .btn-navbar.active{background-color:#000 \\9}.breadcrumb{padding:8px 15px;margin:0 0 20px;list-style:none;background-color:#f5f5f5;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.breadcrumb>li{display:inline-block;*display:inline;text-shadow:0 1px 0 #fff;*zoom:1}.breadcrumb>li>.divider{padding:0 5px;color:#ccc}.breadcrumb>.active{color:#999}.pagination{margin:20px 0}.pagination ul{display:inline-block;*display:inline;margin-bottom:0;margin-left:0;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;*zoom:1;-webkit-box-shadow:0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:0 1px 2px rgba(0,0,0,0.05);box-shadow:0 1px 2px rgba(0,0,0,0.05)}.pagination ul>li{display:inline}.pagination ul>li>a,.pagination ul>li>span{float:left;padding:4px 12px;line-height:20px;text-decoration:none;background-color:#fff;border:1px solid #ddd;border-left-width:0}.pagination ul>li>a:hover,.pagination ul>li>a:focus,.pagination ul>.active>a,.pagination ul>.active>span{background-color:#f5f5f5}.pagination ul>.active>a,.pagination ul>.active>span{color:#999;cursor:default}.pagination ul>.disabled>span,.pagination ul>.disabled>a,.pagination ul>.disabled>a:hover,.pagination ul>.disabled>a:focus{color:#999;cursor:default;background-color:transparent}.pagination ul>li:first-child>a,.pagination ul>li:first-child>span{border-left-width:1px;-webkit-border-bottom-left-radius:4px;border-bottom-left-radius:4px;-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-bottomleft:4px;-moz-border-radius-topleft:4px}.pagination ul>li:last-child>a,.pagination ul>li:last-child>span{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-webkit-border-bottom-right-radius:4px;border-bottom-right-radius:4px;-moz-border-radius-topright:4px;-moz-border-radius-bottomright:4px}.pagination-centered{text-align:center}.pagination-right{text-align:right}.pagination-large ul>li>a,.pagination-large ul>li>span{padding:11px 19px;font-size:17.5px}.pagination-large ul>li:first-child>a,.pagination-large ul>li:first-child>span{-webkit-border-bottom-left-radius:6px;border-bottom-left-radius:6px;-webkit-border-top-left-radius:6px;border-top-left-radius:6px;-moz-border-radius-bottomleft:6px;-moz-border-radius-topleft:6px}.pagination-large ul>li:last-child>a,.pagination-large ul>li:last-child>span{-webkit-border-top-right-radius:6px;border-top-right-radius:6px;-webkit-border-bottom-right-radius:6px;border-bottom-right-radius:6px;-moz-border-radius-topright:6px;-moz-border-radius-bottomright:6px}.pagination-mini ul>li:first-child>a,.pagination-small ul>li:first-child>a,.pagination-mini ul>li:first-child>span,.pagination-small ul>li:first-child>span{-webkit-border-bottom-left-radius:3px;border-bottom-left-radius:3px;-webkit-border-top-left-radius:3px;border-top-left-radius:3px;-moz-border-radius-bottomleft:3px;-moz-border-radius-topleft:3px}.pagination-mini ul>li:last-child>a,.pagination-small ul>li:last-child>a,.pagination-mini ul>li:last-child>span,.pagination-small ul>li:last-child>span{-webkit-border-top-right-radius:3px;border-top-right-radius:3px;-webkit-border-bottom-right-radius:3px;border-bottom-right-radius:3px;-moz-border-radius-topright:3px;-moz-border-radius-bottomright:3px}.pagination-small ul>li>a,.pagination-small ul>li>span{padding:2px 10px;font-size:11.9px}.pagination-mini ul>li>a,.pagination-mini ul>li>span{padding:0 6px;font-size:10.5px}.pager{margin:20px 0;text-align:center;list-style:none;*zoom:1}.pager:before,.pager:after{display:table;line-height:0;content:\"\"}.pager:after{clear:both}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px}.pager li>a:hover,.pager li>a:focus{text-decoration:none;background-color:#f5f5f5}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:hover,.pager .disabled>a:focus,.pager .disabled>span{color:#999;cursor:default;background-color:#fff}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{opacity:0}.modal-backdrop,.modal-backdrop.fade.in{opacity:.8;filter:alpha(opacity=80)}.modal{position:fixed;top:10%;left:50%;z-index:1050;width:560px;margin-left:-280px;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,0.3);*border:1px solid #999;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;outline:0;-webkit-box-shadow:0 3px 7px rgba(0,0,0,0.3);-moz-box-shadow:0 3px 7px rgba(0,0,0,0.3);box-shadow:0 3px 7px rgba(0,0,0,0.3);-webkit-background-clip:padding-box;-moz-background-clip:padding-box;background-clip:padding-box}.modal.fade{top:-25%;-webkit-transition:opacity .3s linear,top .3s ease-out;-moz-transition:opacity .3s linear,top .3s ease-out;-o-transition:opacity .3s linear,top .3s ease-out;transition:opacity .3s linear,top .3s ease-out}.modal.fade.in{top:10%}.modal-header{padding:9px 15px;border-bottom:1px solid #eee}.modal-header .close{margin-top:2px}.modal-header h3{margin:0;line-height:30px}.modal-body{position:relative;max-height:400px;padding:15px;overflow-y:auto}.modal-form{margin-bottom:0}.modal-footer{padding:14px 15px 15px;margin-bottom:0;text-align:right;background-color:#f5f5f5;border-top:1px solid #ddd;-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px;*zoom:1;-webkit-box-shadow:inset 0 1px 0 #fff;-moz-box-shadow:inset 0 1px 0 #fff;box-shadow:inset 0 1px 0 #fff}.modal-footer:before,.modal-footer:after{display:table;line-height:0;content:\"\"}.modal-footer:after{clear:both}.modal-footer .btn+.btn{margin-bottom:0;margin-left:5px}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.tooltip{position:absolute;z-index:1030;display:block;font-size:11px;line-height:1.4;opacity:0;filter:alpha(opacity=0);visibility:visible}.tooltip.in{opacity:.8;filter:alpha(opacity=80)}.tooltip.top{padding:5px 0;margin-top:-3px}.tooltip.right{padding:0 5px;margin-left:3px}.tooltip.bottom{padding:5px 0;margin-top:3px}.tooltip.left{padding:0 5px;margin-left:-3px}.tooltip-inner{max-width:200px;padding:8px;color:#fff;text-align:center;text-decoration:none;background-color:#000;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-top-color:#000;border-width:5px 5px 0}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-right-color:#000;border-width:5px 5px 5px 0}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-left-color:#000;border-width:5px 0 5px 5px}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-bottom-color:#000;border-width:0 5px 5px}.popover{position:absolute;top:0;left:0;z-index:1010;display:none;max-width:276px;padding:1px;text-align:left;white-space:normal;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.2);-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);-moz-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2);-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{padding:8px 14px;margin:0;font-size:14px;font-weight:normal;line-height:18px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;-webkit-border-radius:5px 5px 0 0;-moz-border-radius:5px 5px 0 0;border-radius:5px 5px 0 0}.popover-title:empty{display:none}.popover-content{padding:9px 14px}.popover .arrow,.popover .arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover .arrow{border-width:11px}.popover .arrow:after{border-width:10px;content:\"\"}.popover.top .arrow{bottom:-11px;left:50%;margin-left:-11px;border-top-color:#999;border-top-color:rgba(0,0,0,0.25);border-bottom-width:0}.popover.top .arrow:after{bottom:1px;margin-left:-10px;border-top-color:#fff;border-bottom-width:0}.popover.right .arrow{top:50%;left:-11px;margin-top:-11px;border-right-color:#999;border-right-color:rgba(0,0,0,0.25);border-left-width:0}.popover.right .arrow:after{bottom:-10px;left:1px;border-right-color:#fff;border-left-width:0}.popover.bottom .arrow{top:-11px;left:50%;margin-left:-11px;border-bottom-color:#999;border-bottom-color:rgba(0,0,0,0.25);border-top-width:0}.popover.bottom .arrow:after{top:1px;margin-left:-10px;border-bottom-color:#fff;border-top-width:0}.popover.left .arrow{top:50%;right:-11px;margin-top:-11px;border-left-color:#999;border-left-color:rgba(0,0,0,0.25);border-right-width:0}.popover.left .arrow:after{right:1px;bottom:-10px;border-left-color:#fff;border-right-width:0}.thumbnails{margin-left:-20px;list-style:none;*zoom:1}.thumbnails:before,.thumbnails:after{display:table;line-height:0;content:\"\"}.thumbnails:after{clear:both}.row-fluid .thumbnails{margin-left:0}.thumbnails>li{float:left;margin-bottom:20px;margin-left:20px}.thumbnail{display:block;padding:4px;line-height:20px;border:1px solid #ddd;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,0.055);-moz-box-shadow:0 1px 3px rgba(0,0,0,0.055);box-shadow:0 1px 3px rgba(0,0,0,0.055);-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}a.thumbnail:hover,a.thumbnail:focus{border-color:#08c;-webkit-box-shadow:0 1px 4px rgba(0,105,214,0.25);-moz-box-shadow:0 1px 4px rgba(0,105,214,0.25);box-shadow:0 1px 4px rgba(0,105,214,0.25)}.thumbnail>img{display:block;max-width:100%;margin-right:auto;margin-left:auto}.thumbnail .caption{padding:9px;color:#555}.media,.media-body{overflow:hidden;*overflow:visible;zoom:1}.media,.media .media{margin-top:15px}.media:first-child{margin-top:0}.media-object{display:block}.media-heading{margin:0 0 5px}.media>.pull-left{margin-right:10px}.media>.pull-right{margin-left:10px}.media-list{margin-left:0;list-style:none}.label,.badge{display:inline-block;padding:2px 4px;font-size:11.844px;font-weight:bold;line-height:14px;color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);white-space:nowrap;vertical-align:baseline;background-color:#999}.label{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.badge{padding-right:9px;padding-left:9px;-webkit-border-radius:9px;-moz-border-radius:9px;border-radius:9px}.label:empty,.badge:empty{display:none}a.label:hover,a.label:focus,a.badge:hover,a.badge:focus{color:#fff;text-decoration:none;cursor:pointer}.label-important,.badge-important{background-color:#b94a48}.label-important[href],.badge-important[href]{background-color:#953b39}.label-warning,.badge-warning{background-color:#f89406}.label-warning[href],.badge-warning[href]{background-color:#c67605}.label-success,.badge-success{background-color:#468847}.label-success[href],.badge-success[href]{background-color:#356635}.label-info,.badge-info{background-color:#3a87ad}.label-info[href],.badge-info[href]{background-color:#2d6987}.label-inverse,.badge-inverse{background-color:#333}.label-inverse[href],.badge-inverse[href]{background-color:#1a1a1a}.btn .label,.btn .badge{position:relative;top:-1px}.btn-mini .label,.btn-mini .badge{top:0}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-moz-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-ms-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-o-keyframes progress-bar-stripes{from{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{height:20px;margin-bottom:20px;overflow:hidden;background-color:#f7f7f7;background-image:-moz-linear-gradient(top,#f5f5f5,#f9f9f9);background-image:-webkit-gradient(linear,0 0,0 100%,from(#f5f5f5),to(#f9f9f9));background-image:-webkit-linear-gradient(top,#f5f5f5,#f9f9f9);background-image:-o-linear-gradient(top,#f5f5f5,#f9f9f9);background-image:linear-gradient(to bottom,#f5f5f5,#f9f9f9);background-repeat:repeat-x;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff5f5f5',endColorstr='#fff9f9f9',GradientType=0);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);-moz-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1)}.progress .bar{float:left;width:0;height:100%;font-size:12px;color:#fff;text-align:center;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#0e90d2;background-image:-moz-linear-gradient(top,#149bdf,#0480be);background-image:-webkit-gradient(linear,0 0,0 100%,from(#149bdf),to(#0480be));background-image:-webkit-linear-gradient(top,#149bdf,#0480be);background-image:-o-linear-gradient(top,#149bdf,#0480be);background-image:linear-gradient(to bottom,#149bdf,#0480be);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff149bdf',endColorstr='#ff0480be',GradientType=0);-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);-moz-box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-transition:width .6s ease;-moz-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.progress .bar+.bar{-webkit-box-shadow:inset 1px 0 0 rgba(0,0,0,0.15),inset 0 -1px 0 rgba(0,0,0,0.15);-moz-box-shadow:inset 1px 0 0 rgba(0,0,0,0.15),inset 0 -1px 0 rgba(0,0,0,0.15);box-shadow:inset 1px 0 0 rgba(0,0,0,0.15),inset 0 -1px 0 rgba(0,0,0,0.15)}.progress-striped .bar{background-color:#149bdf;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);-webkit-background-size:40px 40px;-moz-background-size:40px 40px;-o-background-size:40px 40px;background-size:40px 40px}.progress.active .bar{-webkit-animation:progress-bar-stripes 2s linear infinite;-moz-animation:progress-bar-stripes 2s linear infinite;-ms-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-danger .bar,.progress .bar-danger{background-color:#dd514c;background-image:-moz-linear-gradient(top,#ee5f5b,#c43c35);background-image:-webkit-gradient(linear,0 0,0 100%,from(#ee5f5b),to(#c43c35));background-image:-webkit-linear-gradient(top,#ee5f5b,#c43c35);background-image:-o-linear-gradient(top,#ee5f5b,#c43c35);background-image:linear-gradient(to bottom,#ee5f5b,#c43c35);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffee5f5b',endColorstr='#ffc43c35',GradientType=0)}.progress-danger.progress-striped .bar,.progress-striped .bar-danger{background-color:#ee5f5b;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.progress-success .bar,.progress .bar-success{background-color:#5eb95e;background-image:-moz-linear-gradient(top,#62c462,#57a957);background-image:-webkit-gradient(linear,0 0,0 100%,from(#62c462),to(#57a957));background-image:-webkit-linear-gradient(top,#62c462,#57a957);background-image:-o-linear-gradient(top,#62c462,#57a957);background-image:linear-gradient(to bottom,#62c462,#57a957);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0)}.progress-success.progress-striped .bar,.progress-striped .bar-success{background-color:#62c462;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.progress-info .bar,.progress .bar-info{background-color:#4bb1cf;background-image:-moz-linear-gradient(top,#5bc0de,#339bb9);background-image:-webkit-gradient(linear,0 0,0 100%,from(#5bc0de),to(#339bb9));background-image:-webkit-linear-gradient(top,#5bc0de,#339bb9);background-image:-o-linear-gradient(top,#5bc0de,#339bb9);background-image:linear-gradient(to bottom,#5bc0de,#339bb9);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5bc0de',endColorstr='#ff339bb9',GradientType=0)}.progress-info.progress-striped .bar,.progress-striped .bar-info{background-color:#5bc0de;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.progress-warning .bar,.progress .bar-warning{background-color:#faa732;background-image:-moz-linear-gradient(top,#fbb450,#f89406);background-image:-webkit-gradient(linear,0 0,0 100%,from(#fbb450),to(#f89406));background-image:-webkit-linear-gradient(top,#fbb450,#f89406);background-image:-o-linear-gradient(top,#fbb450,#f89406);background-image:linear-gradient(to bottom,#fbb450,#f89406);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffbb450',endColorstr='#fff89406',GradientType=0)}.progress-warning.progress-striped .bar,.progress-striped .bar-warning{background-color:#fbb450;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.accordion{margin-bottom:20px}.accordion-group{margin-bottom:2px;border:1px solid #e5e5e5;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.accordion-heading{border-bottom:0}.accordion-heading .accordion-toggle{display:block;padding:8px 15px}.accordion-toggle{cursor:pointer}.accordion-inner{padding:9px 15px;border-top:1px solid #e5e5e5}.carousel{position:relative;margin-bottom:20px;line-height:1}.carousel-inner{position:relative;width:100%;overflow:hidden}.carousel-inner>.item{position:relative;display:none;-webkit-transition:.6s ease-in-out left;-moz-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>img,.carousel-inner>.item>a>img{display:block;line-height:1}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:40%;left:15px;width:40px;height:40px;margin-top:-20px;font-size:60px;font-weight:100;line-height:30px;color:#fff;text-align:center;background:#222;border:3px solid #fff;-webkit-border-radius:23px;-moz-border-radius:23px;border-radius:23px;opacity:.5;filter:alpha(opacity=50)}.carousel-control.right{right:15px;left:auto}.carousel-control:hover,.carousel-control:focus{color:#fff;text-decoration:none;opacity:.9;filter:alpha(opacity=90)}.carousel-indicators{position:absolute;top:15px;right:15px;z-index:5;margin:0;list-style:none}.carousel-indicators li{display:block;float:left;width:10px;height:10px;margin-left:5px;text-indent:-999px;background-color:#ccc;background-color:rgba(255,255,255,0.25);border-radius:5px}.carousel-indicators .active{background-color:#fff}.carousel-caption{position:absolute;right:0;bottom:0;left:0;padding:15px;background:#333;background:rgba(0,0,0,0.75)}.carousel-caption h4,.carousel-caption p{line-height:20px;color:#fff}.carousel-caption h4{margin:0 0 5px}.carousel-caption p{margin-bottom:0}.hero-unit{padding:60px;margin-bottom:30px;font-size:18px;font-weight:200;line-height:30px;color:inherit;background-color:#eee;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.hero-unit h1{margin-bottom:0;font-size:60px;line-height:1;letter-spacing:-1px;color:inherit}.hero-unit li{line-height:30px}.pull-right{float:right}.pull-left{float:left}.hide{display:none}.show{display:block}.invisible{visibility:hidden}.affix{position:fixed}\n\n"; s.id = "css-bootstrap"; document.head.appendChild(s);}, "stylesheets/font-awesome": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "/*  Font Awesome 3.0\n    the iconic font designed for use with Twitter Bootstrap\n    -------------------------------------------------------\n    The full suite of pictographic icons, examples, and documentation\n    can be found at: http://fortawesome.github.com/Font-Awesome/\n\n    License\n    -------------------------------------------------------\n    • The Font Awesome font is licensed under the SIL Open Font License - http://scripts.sil.org/OFL\n    • Font Awesome CSS, LESS, and SASS files are licensed under the MIT License -\n      http://opensource.org/licenses/mit-license.html\n    • The Font Awesome pictograms are licensed under the CC BY 3.0 License - http://creativecommons.org/licenses/by/3.0/\n    • Attribution is no longer required in Font Awesome 3.0, but much appreciated:\n      \"Font Awesome by Dave Gandy - http://fortawesome.github.com/Font-Awesome\"\n\n    Contact\n    -------------------------------------------------------\n    Email: dave@davegandy.com\n    Twitter: http://twitter.com/fortaweso_me\n    Work: Lead Product Designer @ http://kyruus.com\n\n    */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url('font/fontawesome-webfont.eot');\n  src: url('font/fontawesome-webfont.eot?#iefix') format('embedded-opentype'), url('font/fontawesome-webfont.woff') format('woff'), url('font/fontawesome-webfont.ttf') format('truetype');\n  font-weight: normal;\n  font-style: normal;\n}\n/*  Font Awesome styles\n    ------------------------------------------------------- */\n/* includes sprites.less reset */\n[class^=\"icon-\"],\n[class*=\" icon-\"] {\n  font-family: FontAwesome;\n  font-weight: normal;\n  font-style: normal;\n  text-decoration: inherit;\n  display: inline;\n  width: auto;\n  height: auto;\n  line-height: normal;\n  vertical-align: baseline;\n  background-image: none !important;\n  background-position: 0% 0%;\n  background-repeat: repeat;\n}\n[class^=\"icon-\"]:before,\n[class*=\" icon-\"]:before {\n  text-decoration: inherit;\n  display: inline-block;\n  speak: none;\n}\n/* makes sure icons active on rollover in links */\na [class^=\"icon-\"],\na [class*=\" icon-\"] {\n  display: inline-block;\n}\n/* makes the font 33% larger relative to the icon container */\n.icon-large:before {\n  vertical-align: -10%;\n  font-size: 1.3333333333333333em;\n}\n.btn [class^=\"icon-\"],\n.nav [class^=\"icon-\"],\n.btn [class*=\" icon-\"],\n.nav [class*=\" icon-\"] {\n  display: inline;\n  /* keeps button heights with and without icons the same */\n\n  line-height: .6em;\n}\n.btn [class^=\"icon-\"].icon-spin,\n.nav [class^=\"icon-\"].icon-spin,\n.btn [class*=\" icon-\"].icon-spin,\n.nav [class*=\" icon-\"].icon-spin {\n  display: inline-block;\n}\nli [class^=\"icon-\"],\nli [class*=\" icon-\"] {\n  display: inline-block;\n  width: 1.25em;\n  text-align: center;\n}\nli [class^=\"icon-\"].icon-large,\nli [class*=\" icon-\"].icon-large {\n  /* increased font size for icon-large */\n\n  width: 1.5625em;\n}\nul.icons {\n  list-style-type: none;\n  text-indent: -0.75em;\n}\nul.icons li [class^=\"icon-\"],\nul.icons li [class*=\" icon-\"] {\n  width: .75em;\n}\n.icon-muted {\n  color: #eeeeee;\n}\n.icon-border {\n  border: solid 1px #eeeeee;\n  padding: .2em .25em .15em;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\n.icon-2x {\n  font-size: 2em;\n}\n.icon-2x.icon-border {\n  border-width: 2px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n}\n.icon-3x {\n  font-size: 3em;\n}\n.icon-3x.icon-border {\n  border-width: 3px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\n.icon-4x {\n  font-size: 4em;\n}\n.icon-4x.icon-border {\n  border-width: 4px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n}\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n[class^=\"icon-\"].pull-left,\n[class*=\" icon-\"].pull-left {\n  margin-right: .35em;\n}\n[class^=\"icon-\"].pull-right,\n[class*=\" icon-\"].pull-right {\n  margin-left: .35em;\n}\n.btn [class^=\"icon-\"].pull-left.icon-2x,\n.btn [class*=\" icon-\"].pull-left.icon-2x,\n.btn [class^=\"icon-\"].pull-right.icon-2x,\n.btn [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .35em;\n}\n.btn [class^=\"icon-\"].icon-spin.icon-large,\n.btn [class*=\" icon-\"].icon-spin.icon-large {\n  height: .75em;\n}\n.btn.btn-small [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-small [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .45em;\n}\n.btn.btn-large [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-large [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .2em;\n}\n.icon-spin {\n  display: inline-block;\n  -moz-animation: spin 2s infinite linear;\n  -o-animation: spin 2s infinite linear;\n  -webkit-animation: spin 2s infinite linear;\n  animation: spin 2s infinite linear;\n}\n@-moz-keyframes spin {\n  0% {\n    -moz-transform: rotate(0deg);\n  }\n  100% {\n    -moz-transform: rotate(359deg);\n  }\n}\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n  }\n}\n@-o-keyframes spin {\n  0% {\n    -o-transform: rotate(0deg);\n  }\n  100% {\n    -o-transform: rotate(359deg);\n  }\n}\n@-ms-keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg);\n  }\n  100% {\n    -ms-transform: rotate(359deg);\n  }\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(359deg);\n  }\n}\n/*  Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n    readers do not read off random characters that represent icons */\n.icon-glass:before {\n  content: \"\\f000\";\n}\n.icon-music:before {\n  content: \"\\f001\";\n}\n.icon-search:before {\n  content: \"\\f002\";\n}\n.icon-envelope:before {\n  content: \"\\f003\";\n}\n.icon-heart:before {\n  content: \"\\f004\";\n}\n.icon-star:before {\n  content: \"\\f005\";\n}\n.icon-star-empty:before {\n  content: \"\\f006\";\n}\n.icon-user:before {\n  content: \"\\f007\";\n}\n.icon-film:before {\n  content: \"\\f008\";\n}\n.icon-th-large:before {\n  content: \"\\f009\";\n}\n.icon-th:before {\n  content: \"\\f00a\";\n}\n.icon-th-list:before {\n  content: \"\\f00b\";\n}\n.icon-ok:before {\n  content: \"\\f00c\";\n}\n.icon-remove:before {\n  content: \"\\f00d\";\n}\n.icon-zoom-in:before {\n  content: \"\\f00e\";\n}\n.icon-zoom-out:before {\n  content: \"\\f010\";\n}\n.icon-off:before {\n  content: \"\\f011\";\n}\n.icon-signal:before {\n  content: \"\\f012\";\n}\n.icon-cog:before {\n  content: \"\\f013\";\n}\n.icon-trash:before {\n  content: \"\\f014\";\n}\n.icon-home:before {\n  content: \"\\f015\";\n}\n.icon-file:before {\n  content: \"\\f016\";\n}\n.icon-time:before {\n  content: \"\\f017\";\n}\n.icon-road:before {\n  content: \"\\f018\";\n}\n.icon-download-alt:before {\n  content: \"\\f019\";\n}\n.icon-download:before {\n  content: \"\\f01a\";\n}\n.icon-upload:before {\n  content: \"\\f01b\";\n}\n.icon-inbox:before {\n  content: \"\\f01c\";\n}\n.icon-play-circle:before {\n  content: \"\\f01d\";\n}\n.icon-repeat:before {\n  content: \"\\f01e\";\n}\n/* \\f020 doesn't work in Safari. all shifted one down */\n.icon-refresh:before {\n  content: \"\\f021\";\n}\n.icon-list-alt:before {\n  content: \"\\f022\";\n}\n.icon-lock:before {\n  content: \"\\f023\";\n}\n.icon-flag:before {\n  content: \"\\f024\";\n}\n.icon-headphones:before {\n  content: \"\\f025\";\n}\n.icon-volume-off:before {\n  content: \"\\f026\";\n}\n.icon-volume-down:before {\n  content: \"\\f027\";\n}\n.icon-volume-up:before {\n  content: \"\\f028\";\n}\n.icon-qrcode:before {\n  content: \"\\f029\";\n}\n.icon-barcode:before {\n  content: \"\\f02a\";\n}\n.icon-tag:before {\n  content: \"\\f02b\";\n}\n.icon-tags:before {\n  content: \"\\f02c\";\n}\n.icon-book:before {\n  content: \"\\f02d\";\n}\n.icon-bookmark:before {\n  content: \"\\f02e\";\n}\n.icon-print:before {\n  content: \"\\f02f\";\n}\n.icon-camera:before {\n  content: \"\\f030\";\n}\n.icon-font:before {\n  content: \"\\f031\";\n}\n.icon-bold:before {\n  content: \"\\f032\";\n}\n.icon-italic:before {\n  content: \"\\f033\";\n}\n.icon-text-height:before {\n  content: \"\\f034\";\n}\n.icon-text-width:before {\n  content: \"\\f035\";\n}\n.icon-align-left:before {\n  content: \"\\f036\";\n}\n.icon-align-center:before {\n  content: \"\\f037\";\n}\n.icon-align-right:before {\n  content: \"\\f038\";\n}\n.icon-align-justify:before {\n  content: \"\\f039\";\n}\n.icon-list:before {\n  content: \"\\f03a\";\n}\n.icon-indent-left:before {\n  content: \"\\f03b\";\n}\n.icon-indent-right:before {\n  content: \"\\f03c\";\n}\n.icon-facetime-video:before {\n  content: \"\\f03d\";\n}\n.icon-picture:before {\n  content: \"\\f03e\";\n}\n.icon-pencil:before {\n  content: \"\\f040\";\n}\n.icon-map-marker:before {\n  content: \"\\f041\";\n}\n.icon-adjust:before {\n  content: \"\\f042\";\n}\n.icon-tint:before {\n  content: \"\\f043\";\n}\n.icon-edit:before {\n  content: \"\\f044\";\n}\n.icon-share:before {\n  content: \"\\f045\";\n}\n.icon-check:before {\n  content: \"\\f046\";\n}\n.icon-move:before {\n  content: \"\\f047\";\n}\n.icon-step-backward:before {\n  content: \"\\f048\";\n}\n.icon-fast-backward:before {\n  content: \"\\f049\";\n}\n.icon-backward:before {\n  content: \"\\f04a\";\n}\n.icon-play:before {\n  content: \"\\f04b\";\n}\n.icon-pause:before {\n  content: \"\\f04c\";\n}\n.icon-stop:before {\n  content: \"\\f04d\";\n}\n.icon-forward:before {\n  content: \"\\f04e\";\n}\n.icon-fast-forward:before {\n  content: \"\\f050\";\n}\n.icon-step-forward:before {\n  content: \"\\f051\";\n}\n.icon-eject:before {\n  content: \"\\f052\";\n}\n.icon-chevron-left:before {\n  content: \"\\f053\";\n}\n.icon-chevron-right:before {\n  content: \"\\f054\";\n}\n.icon-plus-sign:before {\n  content: \"\\f055\";\n}\n.icon-minus-sign:before {\n  content: \"\\f056\";\n}\n.icon-remove-sign:before {\n  content: \"\\f057\";\n}\n.icon-ok-sign:before {\n  content: \"\\f058\";\n}\n.icon-question-sign:before {\n  content: \"\\f059\";\n}\n.icon-info-sign:before {\n  content: \"\\f05a\";\n}\n.icon-screenshot:before {\n  content: \"\\f05b\";\n}\n.icon-remove-circle:before {\n  content: \"\\f05c\";\n}\n.icon-ok-circle:before {\n  content: \"\\f05d\";\n}\n.icon-ban-circle:before {\n  content: \"\\f05e\";\n}\n.icon-arrow-left:before {\n  content: \"\\f060\";\n}\n.icon-arrow-right:before {\n  content: \"\\f061\";\n}\n.icon-arrow-up:before {\n  content: \"\\f062\";\n}\n.icon-arrow-down:before {\n  content: \"\\f063\";\n}\n.icon-share-alt:before {\n  content: \"\\f064\";\n}\n.icon-resize-full:before {\n  content: \"\\f065\";\n}\n.icon-resize-small:before {\n  content: \"\\f066\";\n}\n.icon-plus:before {\n  content: \"\\f067\";\n}\n.icon-minus:before {\n  content: \"\\f068\";\n}\n.icon-asterisk:before {\n  content: \"\\f069\";\n}\n.icon-exclamation-sign:before {\n  content: \"\\f06a\";\n}\n.icon-gift:before {\n  content: \"\\f06b\";\n}\n.icon-leaf:before {\n  content: \"\\f06c\";\n}\n.icon-fire:before {\n  content: \"\\f06d\";\n}\n.icon-eye-open:before {\n  content: \"\\f06e\";\n}\n.icon-eye-close:before {\n  content: \"\\f070\";\n}\n.icon-warning-sign:before {\n  content: \"\\f071\";\n}\n.icon-plane:before {\n  content: \"\\f072\";\n}\n.icon-calendar:before {\n  content: \"\\f073\";\n}\n.icon-random:before {\n  content: \"\\f074\";\n}\n.icon-comment:before {\n  content: \"\\f075\";\n}\n.icon-magnet:before {\n  content: \"\\f076\";\n}\n.icon-chevron-up:before {\n  content: \"\\f077\";\n}\n.icon-chevron-down:before {\n  content: \"\\f078\";\n}\n.icon-retweet:before {\n  content: \"\\f079\";\n}\n.icon-shopping-cart:before {\n  content: \"\\f07a\";\n}\n.icon-folder-close:before {\n  content: \"\\f07b\";\n}\n.icon-folder-open:before {\n  content: \"\\f07c\";\n}\n.icon-resize-vertical:before {\n  content: \"\\f07d\";\n}\n.icon-resize-horizontal:before {\n  content: \"\\f07e\";\n}\n.icon-bar-chart:before {\n  content: \"\\f080\";\n}\n.icon-twitter-sign:before {\n  content: \"\\f081\";\n}\n.icon-facebook-sign:before {\n  content: \"\\f082\";\n}\n.icon-camera-retro:before {\n  content: \"\\f083\";\n}\n.icon-key:before {\n  content: \"\\f084\";\n}\n.icon-cogs:before {\n  content: \"\\f085\";\n}\n.icon-comments:before {\n  content: \"\\f086\";\n}\n.icon-thumbs-up:before {\n  content: \"\\f087\";\n}\n.icon-thumbs-down:before {\n  content: \"\\f088\";\n}\n.icon-star-half:before {\n  content: \"\\f089\";\n}\n.icon-heart-empty:before {\n  content: \"\\f08a\";\n}\n.icon-signout:before {\n  content: \"\\f08b\";\n}\n.icon-linkedin-sign:before {\n  content: \"\\f08c\";\n}\n.icon-pushpin:before {\n  content: \"\\f08d\";\n}\n.icon-external-link:before {\n  content: \"\\f08e\";\n}\n.icon-signin:before {\n  content: \"\\f090\";\n}\n.icon-trophy:before {\n  content: \"\\f091\";\n}\n.icon-github-sign:before {\n  content: \"\\f092\";\n}\n.icon-upload-alt:before {\n  content: \"\\f093\";\n}\n.icon-lemon:before {\n  content: \"\\f094\";\n}\n.icon-phone:before {\n  content: \"\\f095\";\n}\n.icon-check-empty:before {\n  content: \"\\f096\";\n}\n.icon-bookmark-empty:before {\n  content: \"\\f097\";\n}\n.icon-phone-sign:before {\n  content: \"\\f098\";\n}\n.icon-twitter:before {\n  content: \"\\f099\";\n}\n.icon-facebook:before {\n  content: \"\\f09a\";\n}\n.icon-github:before {\n  content: \"\\f09b\";\n}\n.icon-unlock:before {\n  content: \"\\f09c\";\n}\n.icon-credit-card:before {\n  content: \"\\f09d\";\n}\n.icon-rss:before {\n  content: \"\\f09e\";\n}\n.icon-hdd:before {\n  content: \"\\f0a0\";\n}\n.icon-bullhorn:before {\n  content: \"\\f0a1\";\n}\n.icon-bell:before {\n  content: \"\\f0a2\";\n}\n.icon-certificate:before {\n  content: \"\\f0a3\";\n}\n.icon-hand-right:before {\n  content: \"\\f0a4\";\n}\n.icon-hand-left:before {\n  content: \"\\f0a5\";\n}\n.icon-hand-up:before {\n  content: \"\\f0a6\";\n}\n.icon-hand-down:before {\n  content: \"\\f0a7\";\n}\n.icon-circle-arrow-left:before {\n  content: \"\\f0a8\";\n}\n.icon-circle-arrow-right:before {\n  content: \"\\f0a9\";\n}\n.icon-circle-arrow-up:before {\n  content: \"\\f0aa\";\n}\n.icon-circle-arrow-down:before {\n  content: \"\\f0ab\";\n}\n.icon-globe:before {\n  content: \"\\f0ac\";\n}\n.icon-wrench:before {\n  content: \"\\f0ad\";\n}\n.icon-tasks:before {\n  content: \"\\f0ae\";\n}\n.icon-filter:before {\n  content: \"\\f0b0\";\n}\n.icon-briefcase:before {\n  content: \"\\f0b1\";\n}\n.icon-fullscreen:before {\n  content: \"\\f0b2\";\n}\n.icon-group:before {\n  content: \"\\f0c0\";\n}\n.icon-link:before {\n  content: \"\\f0c1\";\n}\n.icon-cloud:before {\n  content: \"\\f0c2\";\n}\n.icon-beaker:before {\n  content: \"\\f0c3\";\n}\n.icon-cut:before {\n  content: \"\\f0c4\";\n}\n.icon-copy:before {\n  content: \"\\f0c5\";\n}\n.icon-paper-clip:before {\n  content: \"\\f0c6\";\n}\n.icon-save:before {\n  content: \"\\f0c7\";\n}\n.icon-sign-blank:before {\n  content: \"\\f0c8\";\n}\n.icon-reorder:before {\n  content: \"\\f0c9\";\n}\n.icon-list-ul:before {\n  content: \"\\f0ca\";\n}\n.icon-list-ol:before {\n  content: \"\\f0cb\";\n}\n.icon-strikethrough:before {\n  content: \"\\f0cc\";\n}\n.icon-underline:before {\n  content: \"\\f0cd\";\n}\n.icon-table:before {\n  content: \"\\f0ce\";\n}\n.icon-magic:before {\n  content: \"\\f0d0\";\n}\n.icon-truck:before {\n  content: \"\\f0d1\";\n}\n.icon-pinterest:before {\n  content: \"\\f0d2\";\n}\n.icon-pinterest-sign:before {\n  content: \"\\f0d3\";\n}\n.icon-google-plus-sign:before {\n  content: \"\\f0d4\";\n}\n.icon-google-plus:before {\n  content: \"\\f0d5\";\n}\n.icon-money:before {\n  content: \"\\f0d6\";\n}\n.icon-caret-down:before {\n  content: \"\\f0d7\";\n}\n.icon-caret-up:before {\n  content: \"\\f0d8\";\n}\n.icon-caret-left:before {\n  content: \"\\f0d9\";\n}\n.icon-caret-right:before {\n  content: \"\\f0da\";\n}\n.icon-columns:before {\n  content: \"\\f0db\";\n}\n.icon-sort:before {\n  content: \"\\f0dc\";\n}\n.icon-sort-down:before {\n  content: \"\\f0dd\";\n}\n.icon-sort-up:before {\n  content: \"\\f0de\";\n}\n.icon-envelope-alt:before {\n  content: \"\\f0e0\";\n}\n.icon-linkedin:before {\n  content: \"\\f0e1\";\n}\n.icon-undo:before {\n  content: \"\\f0e2\";\n}\n.icon-legal:before {\n  content: \"\\f0e3\";\n}\n.icon-dashboard:before {\n  content: \"\\f0e4\";\n}\n.icon-comment-alt:before {\n  content: \"\\f0e5\";\n}\n.icon-comments-alt:before {\n  content: \"\\f0e6\";\n}\n.icon-bolt:before {\n  content: \"\\f0e7\";\n}\n.icon-sitemap:before {\n  content: \"\\f0e8\";\n}\n.icon-umbrella:before {\n  content: \"\\f0e9\";\n}\n.icon-paste:before {\n  content: \"\\f0ea\";\n}\n.icon-lightbulb:before {\n  content: \"\\f0eb\";\n}\n.icon-exchange:before {\n  content: \"\\f0ec\";\n}\n.icon-cloud-download:before {\n  content: \"\\f0ed\";\n}\n.icon-cloud-upload:before {\n  content: \"\\f0ee\";\n}\n.icon-user-md:before {\n  content: \"\\f0f0\";\n}\n.icon-stethoscope:before {\n  content: \"\\f0f1\";\n}\n.icon-suitcase:before {\n  content: \"\\f0f2\";\n}\n.icon-bell-alt:before {\n  content: \"\\f0f3\";\n}\n.icon-coffee:before {\n  content: \"\\f0f4\";\n}\n.icon-food:before {\n  content: \"\\f0f5\";\n}\n.icon-file-alt:before {\n  content: \"\\f0f6\";\n}\n.icon-building:before {\n  content: \"\\f0f7\";\n}\n.icon-hospital:before {\n  content: \"\\f0f8\";\n}\n.icon-ambulance:before {\n  content: \"\\f0f9\";\n}\n.icon-medkit:before {\n  content: \"\\f0fa\";\n}\n.icon-fighter-jet:before {\n  content: \"\\f0fb\";\n}\n.icon-beer:before {\n  content: \"\\f0fc\";\n}\n.icon-h-sign:before {\n  content: \"\\f0fd\";\n}\n.icon-plus-sign-alt:before {\n  content: \"\\f0fe\";\n}\n.icon-double-angle-left:before {\n  content: \"\\f100\";\n}\n.icon-double-angle-right:before {\n  content: \"\\f101\";\n}\n.icon-double-angle-up:before {\n  content: \"\\f102\";\n}\n.icon-double-angle-down:before {\n  content: \"\\f103\";\n}\n.icon-angle-left:before {\n  content: \"\\f104\";\n}\n.icon-angle-right:before {\n  content: \"\\f105\";\n}\n.icon-angle-up:before {\n  content: \"\\f106\";\n}\n.icon-angle-down:before {\n  content: \"\\f107\";\n}\n.icon-desktop:before {\n  content: \"\\f108\";\n}\n.icon-laptop:before {\n  content: \"\\f109\";\n}\n.icon-tablet:before {\n  content: \"\\f10a\";\n}\n.icon-mobile-phone:before {\n  content: \"\\f10b\";\n}\n.icon-circle-blank:before {\n  content: \"\\f10c\";\n}\n.icon-quote-left:before {\n  content: \"\\f10d\";\n}\n.icon-quote-right:before {\n  content: \"\\f10e\";\n}\n.icon-spinner:before {\n  content: \"\\f110\";\n}\n.icon-circle:before {\n  content: \"\\f111\";\n}\n.icon-reply:before {\n  content: \"\\f112\";\n}\n.icon-github-alt:before {\n  content: \"\\f113\";\n}\n.icon-folder-close-alt:before {\n  content: \"\\f114\";\n}\n.icon-folder-open-alt:before {\n  content: \"\\f115\";\n}\n"; s.id = "css-font-awesome"; document.head.appendChild(s);}, "views/_list": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<header>\n\t<h1 ');
    
      __out.push(__sanitize(_T("Files")));
    
      __out.push('></h1>\n</header>\n<section>\n\t<li id="{{item.title}}" ng-repeat="item in opmls" ng-click="activate(item)">\n\t\t<i class="icon-{{isactive(item)}}"></i>\n\t\t<input \n\t\t\ttype="text" \n\t\t\tid="opml-{{item.index}}" \n\t\t\tvalue="{{item.title}}" \n\t\t\tng-model="item.title" \n\t\t\tng-dblclick="edit(item)" \n\t\t\tng-change="(item)"\n\t\t/>\n\t</li>\n</section>\n<footer>\n\t<nav class="btn-group">\n\t\t<li ng-click="new()" class="btn">\n\t\t\t<i class=\'icon-plus\'><p>Add</p></i>\n\t\t</li>\n\t\t<li ng-click="save()" class="btn">\n\t\t\t<i class=\'icon-save\'><p>Save</p></i>\n\t\t</li>\n\t\t<li ng-click="delete()" class="btn">\n\t\t\t<i class=\'icon-trash\'><p>Delete</p></i>\n\t\t</li>\n\t\t<li ng-click="download()" class="btn">\n\t\t\t<i class=\'icon-download\'><p>Download</p></i>\n\t\t</li>\n\t</nav>\n</footer>    \n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/_outline": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<div id="outline" ng-class="{outline: \'active\'}[view]" ng-model="object.structure.topics">\n\t<div class="approw {{type(item)}}" style="\n\tpadding-left: 20px;\n\tmargin-left: 0px;\n" ng-repeat="item in object.structure.topics" ng-include="\'tree_row.html\'"/></div>\n</div>\n<div id="canvas" ng-class="{mindmap: \'active\'}[view]">\n    <canvas></canvas>\n</div>\n<nav>\n\t<li></li>\n    <li ng-class="{\'outline\': \'selected\'}[view]" ng-click="changeView(\'outline\')"><i class="icon-list"></i></li>\n    <li ng-class="{\'mindmap\': \'selected\'}[view]" ng-click="changeView(\'mindmap\')"><i class="icon-sitemap"></i></li>\n</nav>\n<span class="modal-container" id="{{getTitle()}}">\n\t');
    
      __out.push(DepMan.render("partials/editnode"));
    
      __out.push('\n</span>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/_outline_render": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<i class="{{folded(item)}}" ng-click="toggleFold(item)"></i>\n<i class="{{status(item)}}" ng-click="toggleCheck(item)"></i>\n<p><input type=\'text\' ng-model="item._text" ng-change="updateNetwork(item, item.getPath())" /></p>\n<div class="approw bordertop" style="\n\tpadding-left: {{20 * (item.parent.depth + 1)}}px;\n\tmargin-left: -{{20 * (item.parent.depth + 1)}}px;\n">\n\n\t<div class="appcontainer" ng-model="item.children.topics" ng-hide="item.fold">\n\t\t<div ng-repeat="item in item.children.topics" ng-include="\'tree_row.html\'" class="approw {{type(item)}}" style="\n\t\t\tpadding-left: {{20 * (item.parent.depth + 1)}}px;\n\t\t\tmargin-left: -{{20 * item.parent.depth}}px;\n\t\t"></div>\n\t</div>\n</div>\n<nav class="btn-group" ng-show="isMobile">\n\t<li class="btn" ng-click="addChild(item)"><i class="icon-plus"></i></li>\n\t<li class="btn" ng-click="remove(item)"><i class="icon-remove"></i></li>\t\n\t<li class="btn" ng-click="edit(item)"><i class="icon-wrench"></i></li>\n</nav>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/chromehandler": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<nav id="chromepanel" ng-controller="ChromeFrameController">\n    <i class="icon-remove" ng-click="close()"></i>\n    <i class="icon-credit-card" ng-click="maximise()"></i>\n    <i class="icon-minus" ng-click="minimise()"></i>\n    <div class="dragger"></div>\n</nav>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/index": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<aside>\n\t');
    
      __out.push(DepMan.render("layout/tabview"));
    
      __out.push('\n</aside>\n<article ng-class="{open: \'sidebaropen\', closed: \'\'}[sidebarstatus]">\n\t');
    
      __out.push(DepMan.render("layout/asidebutton"));
    
      __out.push('\n\t<section></section>\n</article>\n');
    
      __out.push(DepMan.render("partials/message"));
    
      __out.push('\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/landing": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<header>\n\t<div class="container">\n\t\t<article><img src="images/NoteTaking.jpg" alt="" /></article>\n\t\t<article><img src="images/neuralNetwork.jpg" alt="" /></article>\n\t</div>\n\t<a href="');
    
      __out.push(__sanitize(window.location));
    
      __out.push('" id="startapp" class="btn">Start the App</a>\n</header>\n<div class="container rest">\n\t<aside>\n\t\t<a href="#" class="btn btn-large btn-warning firefox" onclick="navigator.mozApps.install(window.location + \'manifest.webapp\')">Add to Firefox / FirefoxOS</a>\n\t\t<a href="#" class="btn btn-large btn-success chrome">Add to Chrome / ChromeOS</a>\n\t\t<a href="#" class="btn btn-large btn-info iexplorer">Add to IE / Windows8</a>\n\t</aside>\n\t<section>\n\t\t<div class="page-header">\n\t\t\t<h1>Arrow Application</h1>\n\t\t</div>\n\t\t<p>\n\t\t\tEver needed to think fast, and document all the thinking, but you had no whiteboard, notebook, or anything but your smartphone, or your tablet, or your PC, or even your SmartTV? Well, to solve all those problems, there is now Arrow, the brainstorming application.\n\t\t</p>\n\t</section>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/layout/asidebutton": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<div id="showhideappmenu" ng-click="togglesidebar()"><i ng-class="{open: \'icon-chevron-left\', closed: \'icon-chevron-right\'}[sidebarstatus]"></i></div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/layout/tabview": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<nav data-role=\'tablist\'>\n\t<li data-tab=\'list\' ng-click="asidetab(\'LIST\')"><i class="icon-tasks"></i><span ');
    
      __out.push(__sanitize(_T("Documents")));
    
      __out.push('></span></li>\n\t<li data-tab=\'server\' ng-click="asidetab(\'SERVER\')"><i class="icon-comments-alt"></i><span ');
    
      __out.push(__sanitize(_T("Server")));
    
      __out.push('></span></li>\n\t<li data-tab=\'global\' ng-click="asidetab(\'GENERAL\')"><i class="icon-wrench"></i><span ');
    
      __out.push(__sanitize(_T("General")));
    
      __out.push('></span></li>\n</nav>\n<section data-role="tabcontainer">\n\t<article id=\'list\' ng-class="{true: \'active \' + getAnim(), false: \'\'}[tabIsActive(\'LIST\')]"></article>\n\t<article id=\'server\' ng-class="{true: \'active \' + getAnim(), false: \'\'}[tabIsActive(\'SERVER\')]">\n\t\t<h1 ');
    
      __out.push(__sanitize(_T("Server Settings")));
    
      __out.push('></h1>\n\t\t');
    
      __out.push(DepMan.render("partials/_server_settings"));
    
      __out.push('\n\t</article>\n\t<article id=\'global\' ng-class="{true: \'active \' + getAnim(), false: \'\'}[tabIsActive(\'GENERAL\')]">\n\t\t<h1 ');
    
      __out.push(__sanitize(_T("General Settings")));
    
      __out.push('></h1>\n\t\t');
    
      __out.push(DepMan.render("partials/_general_settings"));
    
      __out.push('\t\n\t</article>\n</section>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/loadingscreen": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<section id="loadingscreen">\n\t<article>\n\t\t<span id="loading"><i class="icon-spin icon-spinner"></i></span>\n\t\t<span id="loadingmessage"></span>\t\n\t</article>\n</section>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/partials/_general_settings": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<form>\n\t<p ');
    
      __out.push(__sanitize(_T("Select your language from the dropdown menu: It will be saved")));
    
      __out.push('></p>\n\t<select ng-model="language" ng-options="l.lang for l in languages" ng-change="changedLanguage()"></select>\n\t<p ');
    
      __out.push(__sanitize(_T("Change the theme of the application")));
    
      __out.push('></p>\n\t<select ng-model="theme" ng-options="t.name for t in themes" ng-change="changedTheme()"></select>\n\t<p ');
    
      __out.push(__sanitize(_T("Change whether the next time you open the app, the landing page will be active")));
    
      __out.push('></p>\n\t<label for="landingpageactive" class="checkbox"><input type="checkbox" ng-model="landingpageactive" ng-change="activateLanding()" /> Active Landing Page</label>\n</form>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/partials/_server_settings": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<p ');
    
      __out.push(__sanitize(_T("To connect to another client, give him the code in the first input box or input his code in the second input box and press enter")));
    
      __out.push('></p>\n<div><canvas width="200" height="200" class="image image-circle" id="qrimage"></canvas></div>\n<input type="text" readonly id="connectionidself" value="Not Connected Yet ..." />\n<input type="text" value="" id="connectid" ');
    
      __out.push(__sanitize(_T("ID to connect to", "placeholder")));
    
      __out.push(' />\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/partials/editnode": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<div class="modal hide fade editnode" id="{{getTitle()}}">\n    <div class="modal-header">\n    \t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n    \t<h3 id="tip-message-title" ');
    
      __out.push(__sanitize(_T("Edit Node")));
    
      __out.push(' ></h3>\n    </div>\n    <div class="modal-body">\n    \t<label for="text" ');
    
      __out.push(__sanitize(_T("Text of the node")));
    
      __out.push('></label>\n    \t<input type="text" name="text" ');
    
      __out.push(__sanitize(_T("Application Error")));
    
      __out.push(' id="text" />\n    \t<label for="status" class="status" ');
    
      __out.push(__sanitize(_T("Status of the node (if leaf)")));
    
      __out.push(' ></label>\n    \t<input type="checkbox" name="status" class="status" checked="false" id="status" />\n    \t<label for="notes" ');
    
      __out.push(__sanitize(_T("Notes attached to this node")));
    
      __out.push('></label>\n    \t<textarea id="notes" ');
    
      __out.push(__sanitize(_T("Application Error")));
    
      __out.push(' ></textarea>\n    </div>\n    \n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/partials/message": function(exports, require, module) {module.exports = function(__obj) {
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
      __out.push('<div class="modal hide fade" id="tip-message">\n    <div class="modal-header">\n    \t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n    \t<h3 id="tip-message-title" ');
    
      __out.push(__sanitize(_T("Message")));
    
      __out.push(' ></h3>\n    </div>\n    <div class="modal-body" id="tip-message-body">\n    </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/partials/settings": function(exports, require, module) {module.exports = function(__obj) {
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
      var lang;
    
      __out.push('<div class="modal hide fade" id="settings">\n    <div class="modal-header">\n    \t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n    \t<h3 ');
    
      __out.push(__sanitize(_T("Settings")));
    
      __out.push('></h3>\n    </div>\n    <div class="modal-body" style="text-align: center">\n\n\t\t<ul class="nav nav-pills">\n\t\t  <li class="active"><a data-toggle="pill" data-target="#server" ');
    
      __out.push(__sanitize(_T("Server Settings")));
    
      __out.push('></a></li>\n\t\t  <li><a data-toggle="pill" data-target="#general" ');
    
      __out.push(__sanitize(_T("General Settings")));
    
      __out.push('></a></li>\n\t\t</ul>\n\t \n\t\t<div class="tab-content">\n\t\t  <div class="tab-pane active" id="server">\n\t\t\t\t<p ');
    
      __out.push(__sanitize(_T("To connect to another client, give him the code in the first input box or input his code in the second input box and press enter")));
    
      __out.push('></p>\n\t\t\t\t<div><img src="inicaieri" alt="QR Code" id="qrimage" class="hidden" /></div>\n\t\t   \t \t<input type="text" readonly id="connectionidself" value="Not Connected Yet ..." />\n\t\t   \t \t<input type="text" value="" id="connectid" ');
    
      __out.push(__sanitize(_T("ID to connect to", "placeholder")));
    
      __out.push(' />\n\t\t\t</div>\n\t\t  \t<div class="tab-pane" id="general">\n\t\t\t\t<p ');
    
      __out.push(__sanitize(_T("Select your language from the dropdown menu: It will be saved")));
    
      __out.push('></p>\n\t\t\t\t<select id="languageSelector">\n\t\t\t\t\t');
    
      lang = (localStorage.getItem("lang")) || "en-US";
    
      __out.push('\n\t\t\t\t\t<option value="en-US" ');
    
      __out.push(__sanitize(_T("US English")));
    
      __out.push(' ');
    
      if (lang === "en-US") {
        __out.push(__sanitize("selected"));
      }
    
      __out.push(' ></option>\n\t\t\t\t\t<option value="ro-RO" ');
    
      __out.push(__sanitize(_T("Romanian")));
    
      __out.push(' ');
    
      if (lang === "ro-RO") {
        __out.push(__sanitize("selected"));
      }
    
      __out.push(' ></option>\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t</div>   \t \t\n    </div>\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}});
(function() {
  var Client, ClientErrorReporter, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Client = (function(_super) {
    __extends(Client, _super);

    function Client(server) {
      var script,
        _this = this;

      this.server = server != null ? server : window.location.origin;
      this.connect = __bind(this.connect, this);
      this.dataReceived = __bind(this.dataReceived, this);
      this.loadEvents = __bind(this.loadEvents, this);
      this.log = __bind(this.log, this);
      this.online = false;
      script = document.createElement("script");
      script.src = "socket.io/socket.io.js";
      window.Client = this;
      script.onload = function() {
        console.log("loaded socket.io");
        _this.socket = io.connect(_this.server);
        return _this.socket.on("auth", function(id) {
          var ev, handler, me, _ref;

          _this.id = id;
          _this.online = true;
          console.log("Connected! ID: " + _this.id);
          me = _this;
          _ref = _this._baseEvents;
          for (ev in _ref) {
            handler = _ref[ev];
            _this.socket.on(ev, function() {
              var args;

              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return handler.apply(me, args);
            });
          }
          _this.socket.on("data", _this.dataReceived);
          _this.loadEvents();
          if (_this.init != null) {
            return _this.init();
          }
        });
      };
      document.head.appendChild(script);
    }

    Client.prototype._baseEvents = {
      "error": function(e) {
        throw ClientErrorReporter.generate(e);
      },
      "connectedTo": function(id) {
        console.log("Connected to " + id);
        if (this.connected != null) {
          return this.connected(id);
        }
      }
    };

    Client.prototype.events = null;

    Client.prototype.log = function() {
      var args, _ref;

      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift("log");
      return (_ref = this.socket) != null ? _ref.emit.apply(this.socket, args) : void 0;
    };

    Client.prototype.loadEvents = function() {
      var event, handler, _fn, _ref,
        _this = this;

      _ref = this.events;
      _fn = function(event, handler) {
        return _this.subscribe(event, function() {
          var args, isntfromserver, test, _ref1;

          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          test = args.pop();
          isntfromserver = test !== "fromserver";
          if (isntfromserver) {
            args.push(test);
          }
          handler.apply(_this, args);
          if (isntfromserver) {
            args.unshift(event);
            args.unshift("data");
            return (_ref1 = _this.socket) != null ? _ref1.emit.apply(_this.socket, args) : void 0;
          }
        });
      };
      for (event in _ref) {
        handler = _ref[event];
        _fn(event, handler);
      }
      return this.events = null;
    };

    Client.prototype.dataReceived = function() {
      var data, event;

      event = arguments[0], data = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      data.unshift(event);
      return this.publish.apply(this, data);
    };

    Client.prototype.connect = function(id) {
      return this.socket.emit("connectTo", id);
    };

    Client.include(IS.Modules.Observer);

    return Client;

  })(IS.Object);

  ClientErrorReporter = (function(_super) {
    __extends(ClientErrorReporter, _super);

    function ClientErrorReporter() {
      _ref = ClientErrorReporter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ClientErrorReporter.errors = {
      "ConnectionError": ["The client requested does not exist"]
    };

    ClientErrorReporter.extend(IS.ErrorReporter);

    return ClientErrorReporter;

  })(IS.Object);

  window.BaseClient = Client;

}).call(this);


window.onload = function() {new (require("Application"))()}