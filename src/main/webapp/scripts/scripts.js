(function (window, undefined) {
  var rootjQuery, readyList, document = window.document, location = window.location, navigator = window.navigator, _jQuery = window.jQuery, _$ = window.$, core_push = Array.prototype.push, core_slice = Array.prototype.slice, core_indexOf = Array.prototype.indexOf, core_toString = Object.prototype.toString, core_hasOwn = Object.prototype.hasOwnProperty, core_trim = String.prototype.trim, jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery);
    }, core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, core_rnotwhite = /\S/, core_rspace = /\s+/, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
      return (letter + '').toUpperCase();
    }, DOMContentLoaded = function () {
      if (document.addEventListener) {
        document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
        jQuery.ready();
      } else if (document.readyState === 'complete') {
        document.detachEvent('onreadystatechange', DOMContentLoaded);
        jQuery.ready();
      }
    }, class2type = {};
  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function (selector, context, rootjQuery) {
      var match, elem, ret, doc;
      if (!selector) {
        return this;
      }
      if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;
      }
      if (typeof selector === 'string') {
        if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
          match = [
            null,
            selector,
            null
          ];
        } else {
          match = rquickExpr.exec(selector);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            doc = context && context.nodeType ? context.ownerDocument || context : document;
            selector = jQuery.parseHTML(match[1], doc, true);
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              this.attr.call(selector, context, true);
            }
            return jQuery.merge(this, selector);
          } else {
            elem = document.getElementById(match[2]);
            if (elem && elem.parentNode) {
              if (elem.id !== match[2]) {
                return rootjQuery.find(selector);
              }
              this.length = 1;
              this[0] = elem;
            }
            this.context = document;
            this.selector = selector;
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
      }
      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }
      return jQuery.makeArray(selector, this);
    },
    selector: '',
    jquery: '1.8.3',
    length: 0,
    size: function () {
      return this.length;
    },
    toArray: function () {
      return core_slice.call(this);
    },
    get: function (num) {
      return num == null ? this.toArray() : num < 0 ? this[this.length + num] : this[num];
    },
    pushStack: function (elems, name, selector) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      if (name === 'find') {
        ret.selector = this.selector + (this.selector ? ' ' : '') + selector;
      } else if (name) {
        ret.selector = this.selector + '.' + name + '(' + selector + ')';
      }
      return ret;
    },
    each: function (callback, args) {
      return jQuery.each(this, callback, args);
    },
    ready: function (fn) {
      jQuery.ready.promise().done(fn);
      return this;
    },
    eq: function (i) {
      i = +i;
      return i === -1 ? this.slice(i) : this.slice(i, i + 1);
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    slice: function () {
      return this.pushStack(core_slice.apply(this, arguments), 'slice', core_slice.call(arguments).join(','));
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: core_push,
    sort: [].sort,
    splice: [].splice
  };
  jQuery.fn.init.prototype = jQuery.fn;
  jQuery.extend = jQuery.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {};
    }
    if (length === i) {
      target = this;
      --i;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    noConflict: function (deep) {
      if (window.$ === jQuery) {
        window.$ = _$;
      }
      if (deep && window.jQuery === jQuery) {
        window.jQuery = _jQuery;
      }
      return jQuery;
    },
    isReady: false,
    readyWait: 1,
    holdReady: function (hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function (wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      if (!document.body) {
        return setTimeout(jQuery.ready, 1);
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.trigger) {
        jQuery(document).trigger('ready').off('ready');
      }
    },
    isFunction: function (obj) {
      return jQuery.type(obj) === 'function';
    },
    isArray: Array.isArray || function (obj) {
      return jQuery.type(obj) === 'array';
    },
    isWindow: function (obj) {
      return obj != null && obj == obj.window;
    },
    isNumeric: function (obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    type: function (obj) {
      return obj == null ? String(obj) : class2type[core_toString.call(obj)] || 'object';
    },
    isPlainObject: function (obj) {
      if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      try {
        if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
          return false;
        }
      } catch (e) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return key === undefined || core_hasOwn.call(obj, key);
    },
    isEmptyObject: function (obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    error: function (msg) {
      throw new Error(msg);
    },
    parseHTML: function (data, context, scripts) {
      var parsed;
      if (!data || typeof data !== 'string') {
        return null;
      }
      if (typeof context === 'boolean') {
        scripts = context;
        context = 0;
      }
      context = context || document;
      if (parsed = rsingleTag.exec(data)) {
        return [context.createElement(parsed[1])];
      }
      parsed = jQuery.buildFragment([data], context, scripts ? null : []);
      return jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes);
    },
    parseJSON: function (data) {
      if (!data || typeof data !== 'string') {
        return null;
      }
      data = jQuery.trim(data);
      if (window.JSON && window.JSON.parse) {
        return window.JSON.parse(data);
      }
      if (rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
        return new Function('return ' + data)();
      }
      jQuery.error('Invalid JSON: ' + data);
    },
    parseXML: function (data) {
      var xml, tmp;
      if (!data || typeof data !== 'string') {
        return null;
      }
      try {
        if (window.DOMParser) {
          tmp = new DOMParser();
          xml = tmp.parseFromString(data, 'text/xml');
        } else {
          xml = new ActiveXObject('Microsoft.XMLDOM');
          xml.async = 'false';
          xml.loadXML(data);
        }
      } catch (e) {
        xml = undefined;
      }
      if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
        jQuery.error('Invalid XML: ' + data);
      }
      return xml;
    },
    noop: function () {
    },
    globalEval: function (data) {
      if (data && core_rnotwhite.test(data)) {
        (window.execScript || function (data) {
          window['eval'].call(window, data);
        })(data);
      }
    },
    camelCase: function (string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
    },
    nodeName: function (elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function (obj, callback, args) {
      var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);
      if (args) {
        if (isObj) {
          for (name in obj) {
            if (callback.apply(obj[name], args) === false) {
              break;
            }
          }
        } else {
          for (; i < length;) {
            if (callback.apply(obj[i++], args) === false) {
              break;
            }
          }
        }
      } else {
        if (isObj) {
          for (name in obj) {
            if (callback.call(obj[name], name, obj[name]) === false) {
              break;
            }
          }
        } else {
          for (; i < length;) {
            if (callback.call(obj[i], i, obj[i++]) === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim: core_trim && !core_trim.call('\ufeff\xa0') ? function (text) {
      return text == null ? '' : core_trim.call(text);
    } : function (text) {
      return text == null ? '' : (text + '').replace(rtrim, '');
    },
    makeArray: function (arr, results) {
      var type, ret = results || [];
      if (arr != null) {
        type = jQuery.type(arr);
        if (arr.length == null || type === 'string' || type === 'function' || type === 'regexp' || jQuery.isWindow(arr)) {
          core_push.call(ret, arr);
        } else {
          jQuery.merge(ret, arr);
        }
      }
      return ret;
    },
    inArray: function (elem, arr, i) {
      var len;
      if (arr) {
        if (core_indexOf) {
          return core_indexOf.call(arr, elem, i);
        }
        len = arr.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
        for (; i < len; i++) {
          if (i in arr && arr[i] === elem) {
            return i;
          }
        }
      }
      return -1;
    },
    merge: function (first, second) {
      var l = second.length, i = first.length, j = 0;
      if (typeof l === 'number') {
        for (; j < l; j++) {
          first[i++] = second[j];
        }
      } else {
        while (second[j] !== undefined) {
          first[i++] = second[j++];
        }
      }
      first.length = i;
      return first;
    },
    grep: function (elems, callback, inv) {
      var retVal, ret = [], i = 0, length = elems.length;
      inv = !!inv;
      for (; i < length; i++) {
        retVal = !!callback(elems[i], i);
        if (inv !== retVal) {
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    map: function (elems, callback, arg) {
      var value, key, ret = [], i = 0, length = elems.length, isArray = elems instanceof jQuery || length !== undefined && typeof length === 'number' && (length > 0 && elems[0] && elems[length - 1] || length === 0 || jQuery.isArray(elems));
      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      } else {
        for (key in elems) {
          value = callback(elems[key], key, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      }
      return ret.concat.apply([], ret);
    },
    guid: 1,
    proxy: function (fn, context) {
      var tmp, args, proxy;
      if (typeof context === 'string') {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = core_slice.call(arguments, 2);
      proxy = function () {
        return fn.apply(context, args.concat(core_slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    access: function (elems, fn, key, value, chainable, emptyGet, pass) {
      var exec, bulk = key == null, i = 0, length = elems.length;
      if (key && typeof key === 'object') {
        for (i in key) {
          jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
        }
        chainable = 1;
      } else if (value !== undefined) {
        exec = pass === undefined && jQuery.isFunction(value);
        if (bulk) {
          if (exec) {
            exec = fn;
            fn = function (elem, key, value) {
              return exec.call(jQuery(elem), value);
            };
          } else {
            fn.call(elems, value);
            fn = null;
          }
        }
        if (fn) {
          for (; i < length; i++) {
            fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
          }
        }
        chainable = 1;
      }
      return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    },
    now: function () {
      return new Date().getTime();
    }
  });
  jQuery.ready.promise = function (obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === 'complete') {
        setTimeout(jQuery.ready, 1);
      } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
        window.addEventListener('load', jQuery.ready, false);
      } else {
        document.attachEvent('onreadystatechange', DOMContentLoaded);
        window.attachEvent('onload', jQuery.ready);
        var top = false;
        try {
          top = window.frameElement == null && document.documentElement;
        } catch (e) {
        }
        if (top && top.doScroll) {
          (function doScrollCheck() {
            if (!jQuery.isReady) {
              try {
                top.doScroll('left');
              } catch (e) {
                return setTimeout(doScrollCheck, 50);
              }
              jQuery.ready();
            }
          }());
        }
      }
    }
    return readyList.promise(obj);
  };
  jQuery.each('Boolean Number String Function Array Date RegExp Object'.split(' '), function (i, name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  });
  rootjQuery = jQuery(document);
  var optionsCache = {};
  function createOptions(options) {
    var object = optionsCache[options] = {};
    jQuery.each(options.split(core_rspace), function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function (options) {
    options = typeof options === 'string' ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function (data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
          if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
            memory = false;
            break;
          }
        }
        firing = false;
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift());
            }
          } else if (memory) {
            list = [];
          } else {
            self.disable();
          }
        }
      }, self = {
        add: function () {
          if (list) {
            var start = list.length;
            (function add(args) {
              jQuery.each(args, function (_, arg) {
                var type = jQuery.type(arg);
                if (type === 'function') {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && type !== 'string') {
                  add(arg);
                }
              });
            }(arguments));
            if (firing) {
              firingLength = list.length;
            } else if (memory) {
              firingStart = start;
              fire(memory);
            }
          }
          return this;
        },
        remove: function () {
          if (list) {
            jQuery.each(arguments, function (_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (firing) {
                  if (index <= firingLength) {
                    firingLength--;
                  }
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              }
            });
          }
          return this;
        },
        has: function (fn) {
          return jQuery.inArray(fn, list) > -1;
        },
        empty: function () {
          list = [];
          return this;
        },
        disable: function () {
          list = stack = memory = undefined;
          return this;
        },
        disabled: function () {
          return !list;
        },
        lock: function () {
          stack = undefined;
          if (!memory) {
            self.disable();
          }
          return this;
        },
        locked: function () {
          return !stack;
        },
        fireWith: function (context, args) {
          args = args || [];
          args = [
            context,
            args.slice ? args.slice() : args
          ];
          if (list && (!fired || stack)) {
            if (firing) {
              stack.push(args);
            } else {
              fire(args);
            }
          }
          return this;
        },
        fire: function () {
          self.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!fired;
        }
      };
    return self;
  };
  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
          [
            'resolve',
            'done',
            jQuery.Callbacks('once memory'),
            'resolved'
          ],
          [
            'reject',
            'fail',
            jQuery.Callbacks('once memory'),
            'rejected'
          ],
          [
            'notify',
            'progress',
            jQuery.Callbacks('memory')
          ]
        ], state = 'pending', promise = {
          state: function () {
            return state;
          },
          always: function () {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          then: function () {
            var fns = arguments;
            return jQuery.Deferred(function (newDefer) {
              jQuery.each(tuples, function (i, tuple) {
                var action = tuple[0], fn = fns[i];
                deferred[tuple[1]](jQuery.isFunction(fn) ? function () {
                  var returned = fn.apply(this, arguments);
                  if (returned && jQuery.isFunction(returned.promise)) {
                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                  } else {
                    newDefer[action + 'With'](this === deferred ? newDefer : this, [returned]);
                  }
                } : newDefer[action]);
              });
              fns = null;
            }).promise();
          },
          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        }, deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2], stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function () {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = list.fire;
        deferred[tuple[0] + 'With'] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function (subordinate) {
      var i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values);
            } else if (!--remaining) {
              deferred.resolveWith(contexts, values);
            }
          };
        }, progressValues, progressContexts, resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  jQuery.support = function () {
    var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn, div = document.createElement('div');
    div.setAttribute('className', 't');
    div.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>';
    all = div.getElementsByTagName('*');
    a = div.getElementsByTagName('a')[0];
    if (!all || !a || !all.length) {
      return {};
    }
    select = document.createElement('select');
    opt = select.appendChild(document.createElement('option'));
    input = div.getElementsByTagName('input')[0];
    a.style.cssText = 'top:1px;float:left;opacity:.5';
    support = {
      leadingWhitespace: div.firstChild.nodeType === 3,
      tbody: !div.getElementsByTagName('tbody').length,
      htmlSerialize: !!div.getElementsByTagName('link').length,
      style: /top/.test(a.getAttribute('style')),
      hrefNormalized: a.getAttribute('href') === '/a',
      opacity: /^0.5/.test(a.style.opacity),
      cssFloat: !!a.style.cssFloat,
      checkOn: input.value === 'on',
      optSelected: opt.selected,
      getSetAttribute: div.className !== 't',
      enctype: !!document.createElement('form').enctype,
      html5Clone: document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>',
      boxModel: document.compatMode === 'CSS1Compat',
      submitBubbles: true,
      changeBubbles: true,
      focusinBubbles: false,
      deleteExpando: true,
      noCloneEvent: true,
      inlineBlockNeedsLayout: false,
      shrinkWrapBlocks: false,
      reliableMarginRight: true,
      boxSizingReliable: true,
      pixelPosition: false
    };
    input.checked = true;
    support.noCloneChecked = input.cloneNode(true).checked;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    try {
      delete div.test;
    } catch (e) {
      support.deleteExpando = false;
    }
    if (!div.addEventListener && div.attachEvent && div.fireEvent) {
      div.attachEvent('onclick', clickFn = function () {
        support.noCloneEvent = false;
      });
      div.cloneNode(true).fireEvent('onclick');
      div.detachEvent('onclick', clickFn);
    }
    input = document.createElement('input');
    input.value = 't';
    input.setAttribute('type', 'radio');
    support.radioValue = input.value === 't';
    input.setAttribute('checked', 'checked');
    input.setAttribute('name', 't');
    div.appendChild(input);
    fragment = document.createDocumentFragment();
    fragment.appendChild(div.lastChild);
    support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
    support.appendChecked = input.checked;
    fragment.removeChild(input);
    fragment.appendChild(div);
    if (div.attachEvent) {
      for (i in {
          submit: true,
          change: true,
          focusin: true
        }) {
        eventName = 'on' + i;
        isSupported = eventName in div;
        if (!isSupported) {
          div.setAttribute(eventName, 'return;');
          isSupported = typeof div[eventName] === 'function';
        }
        support[i + 'Bubbles'] = isSupported;
      }
    }
    jQuery(function () {
      var container, div, tds, marginDiv, divReset = 'padding:0;margin:0;border:0;display:block;overflow:hidden;', body = document.getElementsByTagName('body')[0];
      if (!body) {
        return;
      }
      container = document.createElement('div');
      container.style.cssText = 'visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px';
      body.insertBefore(container, body.firstChild);
      div = document.createElement('div');
      container.appendChild(div);
      div.innerHTML = '<table><tr><td></td><td>t</td></tr></table>';
      tds = div.getElementsByTagName('td');
      tds[0].style.cssText = 'padding:0;margin:0;border:0;display:none';
      isSupported = tds[0].offsetHeight === 0;
      tds[0].style.display = '';
      tds[1].style.display = 'none';
      support.reliableHiddenOffsets = isSupported && tds[0].offsetHeight === 0;
      div.innerHTML = '';
      div.style.cssText = 'box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;';
      support.boxSizing = div.offsetWidth === 4;
      support.doesNotIncludeMarginInBodyOffset = body.offsetTop !== 1;
      if (window.getComputedStyle) {
        support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== '1%';
        support.boxSizingReliable = (window.getComputedStyle(div, null) || { width: '4px' }).width === '4px';
        marginDiv = document.createElement('div');
        marginDiv.style.cssText = div.style.cssText = divReset;
        marginDiv.style.marginRight = marginDiv.style.width = '0';
        div.style.width = '1px';
        div.appendChild(marginDiv);
        support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
      }
      if (typeof div.style.zoom !== 'undefined') {
        div.innerHTML = '';
        div.style.cssText = divReset + 'width:1px;padding:1px;display:inline;zoom:1';
        support.inlineBlockNeedsLayout = div.offsetWidth === 3;
        div.style.display = 'block';
        div.style.overflow = 'visible';
        div.innerHTML = '<div></div>';
        div.firstChild.style.width = '5px';
        support.shrinkWrapBlocks = div.offsetWidth !== 3;
        container.style.zoom = 1;
      }
      body.removeChild(container);
      container = div = tds = marginDiv = null;
    });
    fragment.removeChild(div);
    all = a = select = opt = input = fragment = div = null;
    return support;
  }();
  var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
  jQuery.extend({
    cache: {},
    deletedIds: [],
    uuid: 0,
    expando: 'jQuery' + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ''),
    noData: {
      'embed': true,
      'object': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
      'applet': true
    },
    hasData: function (elem) {
      elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
      return !!elem && !isEmptyDataObject(elem);
    },
    data: function (elem, name, data, pvt) {
      if (!jQuery.acceptData(elem)) {
        return;
      }
      var thisCache, ret, internalKey = jQuery.expando, getByName = typeof name === 'string', isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
      if ((!id || !cache[id] || !pvt && !cache[id].data) && getByName && data === undefined) {
        return;
      }
      if (!id) {
        if (isNode) {
          elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++;
        } else {
          id = internalKey;
        }
      }
      if (!cache[id]) {
        cache[id] = {};
        if (!isNode) {
          cache[id].toJSON = jQuery.noop;
        }
      }
      if (typeof name === 'object' || typeof name === 'function') {
        if (pvt) {
          cache[id] = jQuery.extend(cache[id], name);
        } else {
          cache[id].data = jQuery.extend(cache[id].data, name);
        }
      }
      thisCache = cache[id];
      if (!pvt) {
        if (!thisCache.data) {
          thisCache.data = {};
        }
        thisCache = thisCache.data;
      }
      if (data !== undefined) {
        thisCache[jQuery.camelCase(name)] = data;
      }
      if (getByName) {
        ret = thisCache[name];
        if (ret == null) {
          ret = thisCache[jQuery.camelCase(name)];
        }
      } else {
        ret = thisCache;
      }
      return ret;
    },
    removeData: function (elem, name, pvt) {
      if (!jQuery.acceptData(elem)) {
        return;
      }
      var thisCache, i, l, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
      if (!cache[id]) {
        return;
      }
      if (name) {
        thisCache = pvt ? cache[id] : cache[id].data;
        if (thisCache) {
          if (!jQuery.isArray(name)) {
            if (name in thisCache) {
              name = [name];
            } else {
              name = jQuery.camelCase(name);
              if (name in thisCache) {
                name = [name];
              } else {
                name = name.split(' ');
              }
            }
          }
          for (i = 0, l = name.length; i < l; i++) {
            delete thisCache[name[i]];
          }
          if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
            return;
          }
        }
      }
      if (!pvt) {
        delete cache[id].data;
        if (!isEmptyDataObject(cache[id])) {
          return;
        }
      }
      if (isNode) {
        jQuery.cleanData([elem], true);
      } else if (jQuery.support.deleteExpando || cache != cache.window) {
        delete cache[id];
      } else {
        cache[id] = null;
      }
    },
    _data: function (elem, name, data) {
      return jQuery.data(elem, name, data, true);
    },
    acceptData: function (elem) {
      var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
      return !noData || noData !== true && elem.getAttribute('classid') === noData;
    }
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
      if (key === undefined) {
        if (this.length) {
          data = jQuery.data(elem);
          if (elem.nodeType === 1 && !jQuery._data(elem, 'parsedAttrs')) {
            attr = elem.attributes;
            for (l = attr.length; i < l; i++) {
              name = attr[i].name;
              if (!name.indexOf('data-')) {
                name = jQuery.camelCase(name.substring(5));
                dataAttr(elem, name, data[name]);
              }
            }
            jQuery._data(elem, 'parsedAttrs', true);
          }
        }
        return data;
      }
      if (typeof key === 'object') {
        return this.each(function () {
          jQuery.data(this, key);
        });
      }
      parts = key.split('.', 2);
      parts[1] = parts[1] ? '.' + parts[1] : '';
      part = parts[1] + '!';
      return jQuery.access(this, function (value) {
        if (value === undefined) {
          data = this.triggerHandler('getData' + part, [parts[0]]);
          if (data === undefined && elem) {
            data = jQuery.data(elem, key);
            data = dataAttr(elem, key, data);
          }
          return data === undefined && parts[1] ? this.data(parts[0]) : data;
        }
        parts[1] = value;
        this.each(function () {
          var self = jQuery(this);
          self.triggerHandler('setData' + part, parts);
          jQuery.data(this, key, value);
          self.triggerHandler('changeData' + part, parts);
        });
      }, null, value, arguments.length > 1, null, false);
    },
    removeData: function (key) {
      return this.each(function () {
        jQuery.removeData(this, key);
      });
    }
  });
  function dataAttr(elem, key, data) {
    if (data === undefined && elem.nodeType === 1) {
      var name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === 'string') {
        try {
          data = data === 'true' ? true : data === 'false' ? false : data === 'null' ? null : +data + '' === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {
        }
        jQuery.data(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  function isEmptyDataObject(obj) {
    var name;
    for (name in obj) {
      if (name === 'data' && jQuery.isEmptyObject(obj[name])) {
        continue;
      }
      if (name !== 'toJSON') {
        return false;
      }
    }
    return true;
  }
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;
      if (elem) {
        type = (type || 'fx') + 'queue';
        queue = jQuery._data(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = jQuery._data(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function (elem, type) {
      type = type || 'fx';
      var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
          jQuery.dequeue(elem, type);
        };
      if (fn === 'inprogress') {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === 'fx') {
          queue.unshift('inprogress');
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function (elem, type) {
      var key = type + 'queueHooks';
      return jQuery._data(elem, key) || jQuery._data(elem, key, {
        empty: jQuery.Callbacks('once memory').add(function () {
          jQuery.removeData(elem, type + 'queue', true);
          jQuery.removeData(elem, key, true);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;
      if (typeof type !== 'string') {
        data = type;
        type = 'fx';
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === 'fx' && queue[0] !== 'inprogress') {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    delay: function (time, type) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type = type || 'fx';
      return this.queue(type, function (next, hooks) {
        var timeout = setTimeout(next, time);
        hooks.stop = function () {
          clearTimeout(timeout);
        };
      });
    },
    clearQueue: function (type) {
      return this.queue(type || 'fx', []);
    },
    promise: function (type, obj) {
      var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
      if (typeof type !== 'string') {
        obj = type;
        type = undefined;
      }
      type = type || 'fx';
      while (i--) {
        tmp = jQuery._data(elements[i], type + 'queueHooks');
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var nodeHook, boolHook, fixSpecified, rclass = /[\t\r\n]/g, rreturn = /\r/g, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea|)$/i, rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute;
  jQuery.fn.extend({
    attr: function (name, value) {
      return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    },
    prop: function (name, value) {
      return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function (name) {
      name = jQuery.propFix[name] || name;
      return this.each(function () {
        try {
          this[name] = undefined;
          delete this[name];
        } catch (e) {
        }
      });
    },
    addClass: function (value) {
      var classNames, i, l, elem, setClass, c, cl;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      }
      if (value && typeof value === 'string') {
        classNames = value.split(core_rspace);
        for (i = 0, l = this.length; i < l; i++) {
          elem = this[i];
          if (elem.nodeType === 1) {
            if (!elem.className && classNames.length === 1) {
              elem.className = value;
            } else {
              setClass = ' ' + elem.className + ' ';
              for (c = 0, cl = classNames.length; c < cl; c++) {
                if (setClass.indexOf(' ' + classNames[c] + ' ') < 0) {
                  setClass += classNames[c] + ' ';
                }
              }
              elem.className = jQuery.trim(setClass);
            }
          }
        }
      }
      return this;
    },
    removeClass: function (value) {
      var removes, className, elem, c, cl, i, l;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      }
      if (value && typeof value === 'string' || value === undefined) {
        removes = (value || '').split(core_rspace);
        for (i = 0, l = this.length; i < l; i++) {
          elem = this[i];
          if (elem.nodeType === 1 && elem.className) {
            className = (' ' + elem.className + ' ').replace(rclass, ' ');
            for (c = 0, cl = removes.length; c < cl; c++) {
              while (className.indexOf(' ' + removes[c] + ' ') >= 0) {
                className = className.replace(' ' + removes[c] + ' ', ' ');
              }
            }
            elem.className = value ? jQuery.trim(className) : '';
          }
        }
      }
      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value, isBool = typeof stateVal === 'boolean';
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
        });
      }
      return this.each(function () {
        if (type === 'string') {
          var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(core_rspace);
          while (className = classNames[i++]) {
            state = isBool ? state : !self.hasClass(className);
            self[state ? 'addClass' : 'removeClass'](className);
          }
        } else if (type === 'undefined' || type === 'boolean') {
          if (this.className) {
            jQuery._data(this, '__className__', this.className);
          }
          this.className = this.className || value === false ? '' : jQuery._data(this, '__className__') || '';
        }
      });
    },
    hasClass: function (selector) {
      var className = ' ' + selector + ' ', i = 0, l = this.length;
      for (; i < l; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(rclass, ' ').indexOf(className) >= 0) {
          return true;
        }
      }
      return false;
    },
    val: function (value) {
      var hooks, ret, isFunction, elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === 'string' ? ret.replace(rreturn, '') : ret == null ? '' : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function (i) {
        var val, self = jQuery(this);
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, self.val());
        } else {
          val = value;
        }
        if (val == null) {
          val = '';
        } else if (typeof val === 'number') {
          val += '';
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? '' : value + '';
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = elem.attributes.value;
          return !val || val.specified ? elem.value : elem.text;
        }
      },
      select: {
        get: function (elem) {
          var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === 'select-one' || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute('disabled') === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, 'optgroup'))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function (elem, value) {
          var values = jQuery.makeArray(value);
          jQuery(elem).find('option').each(function () {
            this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
          });
          if (!values.length) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    },
    attrFn: {},
    attr: function (elem, name, value, pass) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (pass && jQuery.isFunction(jQuery.fn[name])) {
        return jQuery(elem)[name](value);
      }
      if (typeof elem.getAttribute === 'undefined') {
        return jQuery.prop(elem, name, value);
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        } else if (hooks && 'set' in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        } else {
          elem.setAttribute(name, value + '');
          return value;
        }
      } else if (hooks && 'get' in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      } else {
        ret = elem.getAttribute(name);
        return ret === null ? undefined : ret;
      }
    },
    removeAttr: function (elem, value) {
      var propName, attrNames, name, isBool, i = 0;
      if (value && elem.nodeType === 1) {
        attrNames = value.split(core_rspace);
        for (; i < attrNames.length; i++) {
          name = attrNames[i];
          if (name) {
            propName = jQuery.propFix[name] || name;
            isBool = rboolean.test(name);
            if (!isBool) {
              jQuery.attr(elem, name, '');
            }
            elem.removeAttribute(getSetAttribute ? name : propName);
            if (isBool && propName in elem) {
              elem[propName] = false;
            }
          }
        }
      }
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (rtype.test(elem.nodeName) && elem.parentNode) {
            jQuery.error('type property can\'t be changed');
          } else if (!jQuery.support.radioValue && value === 'radio' && jQuery.nodeName(elem, 'input')) {
            var val = elem.value;
            elem.setAttribute('type', value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      },
      value: {
        get: function (elem, name) {
          if (nodeHook && jQuery.nodeName(elem, 'button')) {
            return nodeHook.get(elem, name);
          }
          return name in elem ? elem.value : null;
        },
        set: function (elem, value, name) {
          if (nodeHook && jQuery.nodeName(elem, 'button')) {
            return nodeHook.set(elem, value, name);
          }
          elem.value = value;
        }
      }
    },
    propFix: {
      tabindex: 'tabIndex',
      readonly: 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      maxlength: 'maxLength',
      cellspacing: 'cellSpacing',
      cellpadding: 'cellPadding',
      rowspan: 'rowSpan',
      colspan: 'colSpan',
      usemap: 'useMap',
      frameborder: 'frameBorder',
      contenteditable: 'contentEditable'
    },
    prop: function (elem, name, value) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        } else {
          return elem[name] = value;
        }
      } else {
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        } else {
          return elem[name];
        }
      }
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          var attributeNode = elem.getAttributeNode('tabindex');
          return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
        }
      }
    }
  });
  boolHook = {
    get: function (elem, name) {
      var attrNode, property = jQuery.prop(elem, name);
      return property === true || typeof property !== 'boolean' && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined;
    },
    set: function (elem, value, name) {
      var propName;
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        propName = jQuery.propFix[name] || name;
        if (propName in elem) {
          elem[propName] = true;
        }
        elem.setAttribute(name, name.toLowerCase());
      }
      return name;
    }
  };
  if (!getSetAttribute) {
    fixSpecified = {
      name: true,
      id: true,
      coords: true
    };
    nodeHook = jQuery.valHooks.button = {
      get: function (elem, name) {
        var ret;
        ret = elem.getAttributeNode(name);
        return ret && (fixSpecified[name] ? ret.value !== '' : ret.specified) ? ret.value : undefined;
      },
      set: function (elem, value, name) {
        var ret = elem.getAttributeNode(name);
        if (!ret) {
          ret = document.createAttribute(name);
          elem.setAttributeNode(ret);
        }
        return ret.value = value + '';
      }
    };
    jQuery.each([
      'width',
      'height'
    ], function (i, name) {
      jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
        set: function (elem, value) {
          if (value === '') {
            elem.setAttribute(name, 'auto');
            return value;
          }
        }
      });
    });
    jQuery.attrHooks.contenteditable = {
      get: nodeHook.get,
      set: function (elem, value, name) {
        if (value === '') {
          value = 'false';
        }
        nodeHook.set(elem, value, name);
      }
    };
  }
  if (!jQuery.support.hrefNormalized) {
    jQuery.each([
      'href',
      'src',
      'width',
      'height'
    ], function (i, name) {
      jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
        get: function (elem) {
          var ret = elem.getAttribute(name, 2);
          return ret === null ? undefined : ret;
        }
      });
    });
  }
  if (!jQuery.support.style) {
    jQuery.attrHooks.style = {
      get: function (elem) {
        return elem.style.cssText.toLowerCase() || undefined;
      },
      set: function (elem, value) {
        return elem.style.cssText = value + '';
      }
    };
  }
  if (!jQuery.support.optSelected) {
    jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
      get: function (elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
        return null;
      }
    });
  }
  if (!jQuery.support.enctype) {
    jQuery.propFix.enctype = 'encoding';
  }
  if (!jQuery.support.checkOn) {
    jQuery.each([
      'radio',
      'checkbox'
    ], function () {
      jQuery.valHooks[this] = {
        get: function (elem) {
          return elem.getAttribute('value') === null ? 'on' : elem.value;
        }
      };
    });
  }
  jQuery.each([
    'radio',
    'checkbox'
  ], function () {
    jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
      set: function (elem, value) {
        if (jQuery.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
        }
      }
    });
  });
  var rformElems = /^(?:textarea|input|select)$/i, rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/, rhoverHack = /(?:^|\s)hover(\.\S+|)\b/, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, hoverHack = function (events) {
      return jQuery.event.special.hover ? events : events.replace(rhoverHack, 'mouseenter$1 mouseleave$1');
    };
  jQuery.event = {
    add: function (elem, types, handler, data, selector) {
      var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
      if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      events = elemData.events;
      if (!events) {
        elemData.events = events = {};
      }
      eventHandle = elemData.handle;
      if (!eventHandle) {
        elemData.handle = eventHandle = function (e) {
          return typeof jQuery !== 'undefined' && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
        };
        eventHandle.elem = elem;
      }
      types = jQuery.trim(hoverHack(types)).split(' ');
      for (t = 0; t < types.length; t++) {
        tns = rtypenamespace.exec(types[t]) || [];
        type = tns[1];
        namespaces = (tns[2] || '').split('.').sort();
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: tns[1],
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join('.')
        }, handleObjIn);
        handlers = events[type];
        if (!handlers) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            } else if (elem.attachEvent) {
              elem.attachEvent('on' + type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
      elem = null;
    },
    global: {},
    remove: function (elem, types, handler, selector, mappedTypes) {
      var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj, elemData = jQuery.hasData(elem) && jQuery._data(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = jQuery.trim(hoverHack(types || '')).split(' ');
      for (t = 0; t < types.length; t++) {
        tns = rtypenamespace.exec(types[t]) || [];
        type = origType = tns[1];
        namespaces = tns[2];
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        eventType = events[type] || [];
        origCount = eventType.length;
        namespaces = namespaces ? new RegExp('(^|\\.)' + namespaces.split('.').sort().join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
        for (j = 0; j < eventType.length; j++) {
          handleObj = eventType[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
            eventType.splice(j--, 1);
            if (handleObj.selector) {
              eventType.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (eventType.length === 0 && origCount !== eventType.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;
        jQuery.removeData(elem, 'events', true);
      }
    },
    customEvent: {
      'getData': true,
      'setData': true,
      'changeData': true
    },
    trigger: function (event, data, elem, onlyHandlers) {
      if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
        return;
      }
      var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType, type = event.type || event, namespaces = [];
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf('!') >= 0) {
        type = type.slice(0, -1);
        exclusive = true;
      }
      if (type.indexOf('.') >= 0) {
        namespaces = type.split('.');
        type = namespaces.shift();
        namespaces.sort();
      }
      if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
        return;
      }
      event = typeof event === 'object' ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type);
      event.type = type;
      event.isTrigger = true;
      event.exclusive = exclusive;
      event.namespace = namespaces.join('.');
      event.namespace_re = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
      ontype = type.indexOf(':') < 0 ? 'on' + type : '';
      if (!elem) {
        cache = jQuery.cache;
        for (i in cache) {
          if (cache[i].events && cache[i].events[type]) {
            jQuery.event.trigger(event, data, cache[i].handle.elem, true);
          }
        }
        return;
      }
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data != null ? jQuery.makeArray(data) : [];
      data.unshift(event);
      special = jQuery.event.special[type] || {};
      if (special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      eventPath = [[
          elem,
          special.bindType || type
        ]];
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
        for (old = elem; cur; cur = cur.parentNode) {
          eventPath.push([
            cur,
            bubbleType
          ]);
          old = cur;
        }
        if (old === (elem.ownerDocument || document)) {
          eventPath.push([
            old.defaultView || old.parentWindow || window,
            bubbleType
          ]);
        }
      }
      for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
        cur = eventPath[i][0];
        event.type = eventPath[i][1];
        handle = (jQuery._data(cur, 'events') || {})[event.type] && jQuery._data(cur, 'handle');
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
          event.preventDefault();
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === 'click' && jQuery.nodeName(elem, 'a')) && jQuery.acceptData(elem)) {
          if (ontype && elem[type] && (type !== 'focus' && type !== 'blur' || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {
            old = elem[ontype];
            if (old) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (old) {
              elem[ontype] = old;
            }
          }
        }
      }
      return event.result;
    },
    dispatch: function (event) {
      event = jQuery.event.fix(event || window.event);
      var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related, handlers = (jQuery._data(this, 'events') || {})[event.type] || [], delegateCount = handlers.delegateCount, args = core_slice.call(arguments), run_all = !event.exclusive && !event.namespace, special = jQuery.event.special[event.type] || {}, handlerQueue = [];
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      if (delegateCount && !(event.button && event.type === 'click')) {
        for (cur = event.target; cur != this; cur = cur.parentNode || this) {
          if (cur.disabled !== true || event.type !== 'click') {
            selMatch = {};
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector;
              if (selMatch[sel] === undefined) {
                selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (selMatch[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                matches: matches
              });
            }
          }
        }
      }
      if (handlers.length > delegateCount) {
        handlerQueue.push({
          elem: this,
          matches: handlers.slice(delegateCount)
        });
      }
      for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
        matched = handlerQueue[i];
        event.currentTarget = matched.elem;
        for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
          handleObj = matched.matches[j];
          if (run_all || !event.namespace && !handleObj.namespace || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
            event.data = handleObj.data;
            event.handleObj = handleObj;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              event.result = ret;
              if (ret === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    props: 'attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (event, original) {
        var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.relatedTarget && fromElement) {
          event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
        }
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
        }
        return event;
      }
    },
    fix: function (event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type] || {}, copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = jQuery.Event(originalEvent);
      for (i = copy.length; i;) {
        prop = copy[--i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = originalEvent.srcElement || document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      event.metaKey = !!event.metaKey;
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: { noBubble: true },
      focus: { delegateType: 'focusin' },
      blur: { delegateType: 'focusout' },
      beforeunload: {
        setup: function (data, namespaces, eventHandle) {
          if (jQuery.isWindow(this)) {
            this.onbeforeunload = eventHandle;
          }
        },
        teardown: function (namespaces, eventHandle) {
          if (this.onbeforeunload === eventHandle) {
            this.onbeforeunload = null;
          }
        }
      }
    },
    simulate: function (type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
          type: type,
          isSimulated: true,
          originalEvent: {}
        });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  jQuery.event.handle = jQuery.event.dispatch;
  jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false);
    }
  } : function (elem, type, handle) {
    var name = 'on' + type;
    if (elem.detachEvent) {
      if (typeof elem[name] === 'undefined') {
        elem[name] = null;
      }
      elem.detachEvent(name, handle);
    }
  };
  jQuery.Event = function (src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  function returnFalse() {
    return false;
  }
  function returnTrue() {
    return true;
  }
  jQuery.Event.prototype = {
    preventDefault: function () {
      this.isDefaultPrevented = returnTrue;
      var e = this.originalEvent;
      if (!e) {
        return;
      }
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },
    stopPropagation: function () {
      this.isPropagationStopped = returnTrue;
      var e = this.originalEvent;
      if (!e) {
        return;
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      e.cancelBubble = true;
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    },
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse
  };
  jQuery.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj, selector = handleObj.selector;
        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  if (!jQuery.support.submitBubbles) {
    jQuery.event.special.submit = {
      setup: function () {
        if (jQuery.nodeName(this, 'form')) {
          return false;
        }
        jQuery.event.add(this, 'click._submit keypress._submit', function (e) {
          var elem = e.target, form = jQuery.nodeName(elem, 'input') || jQuery.nodeName(elem, 'button') ? elem.form : undefined;
          if (form && !jQuery._data(form, '_submit_attached')) {
            jQuery.event.add(form, 'submit._submit', function (event) {
              event._submit_bubble = true;
            });
            jQuery._data(form, '_submit_attached', true);
          }
        });
      },
      postDispatch: function (event) {
        if (event._submit_bubble) {
          delete event._submit_bubble;
          if (this.parentNode && !event.isTrigger) {
            jQuery.event.simulate('submit', this.parentNode, event, true);
          }
        }
      },
      teardown: function () {
        if (jQuery.nodeName(this, 'form')) {
          return false;
        }
        jQuery.event.remove(this, '._submit');
      }
    };
  }
  if (!jQuery.support.changeBubbles) {
    jQuery.event.special.change = {
      setup: function () {
        if (rformElems.test(this.nodeName)) {
          if (this.type === 'checkbox' || this.type === 'radio') {
            jQuery.event.add(this, 'propertychange._change', function (event) {
              if (event.originalEvent.propertyName === 'checked') {
                this._just_changed = true;
              }
            });
            jQuery.event.add(this, 'click._change', function (event) {
              if (this._just_changed && !event.isTrigger) {
                this._just_changed = false;
              }
              jQuery.event.simulate('change', this, event, true);
            });
          }
          return false;
        }
        jQuery.event.add(this, 'beforeactivate._change', function (e) {
          var elem = e.target;
          if (rformElems.test(elem.nodeName) && !jQuery._data(elem, '_change_attached')) {
            jQuery.event.add(elem, 'change._change', function (event) {
              if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                jQuery.event.simulate('change', this.parentNode, event, true);
              }
            });
            jQuery._data(elem, '_change_attached', true);
          }
        });
      },
      handle: function (event) {
        var elem = event.target;
        if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== 'radio' && elem.type !== 'checkbox') {
          return event.handleObj.handler.apply(this, arguments);
        }
      },
      teardown: function () {
        jQuery.event.remove(this, '._change');
        return !rformElems.test(this.nodeName);
      }
    };
  }
  if (!jQuery.support.focusinBubbles) {
    jQuery.each({
      focus: 'focusin',
      blur: 'focusout'
    }, function (orig, fix) {
      var attaches = 0, handler = function (event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
        };
      jQuery.event.special[fix] = {
        setup: function () {
          if (attaches++ === 0) {
            document.addEventListener(orig, handler, true);
          }
        },
        teardown: function () {
          if (--attaches === 0) {
            document.removeEventListener(orig, handler, true);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on: function (types, selector, data, fn, one) {
      var origFn, type;
      if (typeof types === 'object') {
        if (typeof selector !== 'string') {
          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one);
        }
        return this;
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === 'string') {
          fn = data;
          data = undefined;
        } else {
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return this;
      }
      if (one === 1) {
        origFn = fn;
        fn = function (event) {
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return this.each(function () {
        jQuery.event.add(this, types, fn, data, selector);
      });
    },
    one: function (types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === 'object') {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === 'function') {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn);
    },
    live: function (types, data, fn) {
      jQuery(this.context).on(types, this.selector, data, fn);
      return this;
    },
    die: function (types, fn) {
      jQuery(this.context).off(types, this.selector || '**', fn);
      return this;
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn);
    },
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      if (this[0]) {
        return jQuery.event.trigger(type, data, this[0], true);
      }
    },
    toggle: function (fn) {
      var args = arguments, guid = fn.guid || jQuery.guid++, i = 0, toggler = function (event) {
          var lastToggle = (jQuery._data(this, 'lastToggle' + fn.guid) || 0) % i;
          jQuery._data(this, 'lastToggle' + fn.guid, lastToggle + 1);
          event.preventDefault();
          return args[lastToggle].apply(this, arguments) || false;
        };
      toggler.guid = guid;
      while (i < args.length) {
        args[i++].guid = guid;
      }
      return this.click(toggler);
    },
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  });
  jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup error contextmenu').split(' '), function (i, name) {
    jQuery.fn[name] = function (data, fn) {
      if (fn == null) {
        fn = data;
        data = null;
      }
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
    if (rkeyEvent.test(name)) {
      jQuery.event.fixHooks[name] = jQuery.event.keyHooks;
    }
    if (rmouseEvent.test(name)) {
      jQuery.event.fixHooks[name] = jQuery.event.mouseHooks;
    }
  });
  (function (window, undefined) {
    var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, outermostContext, baseHasDuplicate = true, strundefined = 'undefined', expando = ('sizcache' + Math.random()).replace('.', ''), Token = String, document = window.document, docElem = document.documentElement, dirruns = 0, done = 0, pop = [].pop, push = [].push, slice = [].slice, indexOf = [].indexOf || function (elem) {
        var i = 0, len = this.length;
        for (; i < len; i++) {
          if (this[i] === elem) {
            return i;
          }
        }
        return -1;
      }, markFunction = function (fn, value) {
        fn[expando] = value == null || value;
        return fn;
      }, createCache = function () {
        var cache = {}, keys = [];
        return markFunction(function (key, value) {
          if (keys.push(key) > Expr.cacheLength) {
            delete cache[keys.shift()];
          }
          return cache[key + ' '] = value;
        }, cache);
      }, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), whitespace = '[\\x20\\t\\r\\n\\f]', characterEncoding = '(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+', identifier = characterEncoding.replace('w', 'w#'), operators = '([*^$|!~]?=)', attributes = '\\[' + whitespace + '*(' + characterEncoding + ')' + whitespace + '*(?:' + operators + whitespace + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + identifier + ')|)|)' + whitespace + '*\\]', pseudos = ':(' + characterEncoding + ')(?:\\((?:([\'"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:' + attributes + ')|[^:]|\\\\.)*|.*))\\)|)', pos = ':(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([\\x20\\t\\r\\n\\f>+~])' + whitespace + '*'), rpseudo = new RegExp(pseudos), rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, rnot = /^:not/, rsibling = /[\x20\t\r\n\f]*[+~]/, rendsWithNot = /:not\($/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i, rbackslash = /\\(?!\\)/g, matchExpr = {
        'ID': new RegExp('^#(' + characterEncoding + ')'),
        'CLASS': new RegExp('^\\.(' + characterEncoding + ')'),
        'NAME': new RegExp('^\\[name=[\'"]?(' + characterEncoding + ')[\'"]?\\]'),
        'TAG': new RegExp('^(' + characterEncoding.replace('w', 'w*') + ')'),
        'ATTR': new RegExp('^' + attributes),
        'PSEUDO': new RegExp('^' + pseudos),
        'POS': new RegExp(pos, 'i'),
        'CHILD': new RegExp('^:(only|nth|first|last)-child(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
        'needsContext': new RegExp('^' + whitespace + '*[>+~]|' + pos, 'i')
      }, assert = function (fn) {
        var div = document.createElement('div');
        try {
          return fn(div);
        } catch (e) {
          return false;
        } finally {
          div = null;
        }
      }, assertTagNameNoComments = assert(function (div) {
        div.appendChild(document.createComment(''));
        return !div.getElementsByTagName('*').length;
      }), assertHrefNotNormalized = assert(function (div) {
        div.innerHTML = '<a href=\'#\'></a>';
        return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute('href') === '#';
      }), assertAttributes = assert(function (div) {
        div.innerHTML = '<select></select>';
        var type = typeof div.lastChild.getAttribute('multiple');
        return type !== 'boolean' && type !== 'string';
      }), assertUsableClassName = assert(function (div) {
        div.innerHTML = '<div class=\'hidden e\'></div><div class=\'hidden\'></div>';
        if (!div.getElementsByClassName || !div.getElementsByClassName('e').length) {
          return false;
        }
        div.lastChild.className = 'e';
        return div.getElementsByClassName('e').length === 2;
      }), assertUsableName = assert(function (div) {
        div.id = expando + 0;
        div.innerHTML = '<a name=\'' + expando + '\'></a><div name=\'' + expando + '\'></div>';
        docElem.insertBefore(div, docElem.firstChild);
        var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
        assertGetIdNotName = !document.getElementById(expando);
        docElem.removeChild(div);
        return pass;
      });
    try {
      slice.call(docElem.childNodes, 0)[0].nodeType;
    } catch (e) {
      slice = function (i) {
        var elem, results = [];
        for (; elem = this[i]; i++) {
          results.push(elem);
        }
        return results;
      };
    }
    function Sizzle(selector, context, results, seed) {
      results = results || [];
      context = context || document;
      var match, elem, xml, m, nodeType = context.nodeType;
      if (!selector || typeof selector !== 'string') {
        return results;
      }
      if (nodeType !== 1 && nodeType !== 9) {
        return [];
      }
      xml = isXML(context);
      if (!xml && !seed) {
        if (match = rquickExpr.exec(selector)) {
          if (m = match[1]) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              if (elem && elem.parentNode) {
                if (elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } else {
                return results;
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                results.push(elem);
                return results;
              }
            }
          } else if (match[2]) {
            push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
            return results;
          } else if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
            push.apply(results, slice.call(context.getElementsByClassName(m), 0));
            return results;
          }
        }
      }
      return select(selector.replace(rtrim, '$1'), context, results, seed, xml);
    }
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function (elem, expr) {
      return Sizzle(expr, null, null, [elem]).length > 0;
    };
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === 'input' && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === 'input' || name === 'button') && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    getText = Sizzle.getText = function (elem) {
      var node, ret = '', i = 0, nodeType = elem.nodeType;
      if (nodeType) {
        if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
          if (typeof elem.textContent === 'string') {
            return elem.textContent;
          } else {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              ret += getText(elem);
            }
          }
        } else if (nodeType === 3 || nodeType === 4) {
          return elem.nodeValue;
        }
      } else {
        for (; node = elem[i]; i++) {
          ret += getText(node);
        }
      }
      return ret;
    };
    isXML = Sizzle.isXML = function (elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== 'HTML' : false;
    };
    contains = Sizzle.contains = docElem.contains ? function (a, b) {
      var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
      return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup));
    } : docElem.compareDocumentPosition ? function (a, b) {
      return b && !!(a.compareDocumentPosition(b) & 16);
    } : function (a, b) {
      while (b = b.parentNode) {
        if (b === a) {
          return true;
        }
      }
      return false;
    };
    Sizzle.attr = function (elem, name) {
      var val, xml = isXML(elem);
      if (!xml) {
        name = name.toLowerCase();
      }
      if (val = Expr.attrHandle[name]) {
        return val(elem);
      }
      if (xml || assertAttributes) {
        return elem.getAttribute(name);
      }
      val = elem.getAttributeNode(name);
      return val ? typeof elem[name] === 'boolean' ? elem[name] ? name : null : val.specified ? val.value : null : null;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: assertHrefNotNormalized ? {} : {
        'href': function (elem) {
          return elem.getAttribute('href', 2);
        },
        'type': function (elem) {
          return elem.getAttribute('type');
        }
      },
      find: {
        'ID': assertGetIdNotName ? function (id, context, xml) {
          if (typeof context.getElementById !== strundefined && !xml) {
            var m = context.getElementById(id);
            return m && m.parentNode ? [m] : [];
          }
        } : function (id, context, xml) {
          if (typeof context.getElementById !== strundefined && !xml) {
            var m = context.getElementById(id);
            return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode('id').value === id ? [m] : undefined : [];
          }
        },
        'TAG': assertTagNameNoComments ? function (tag, context) {
          if (typeof context.getElementsByTagName !== strundefined) {
            return context.getElementsByTagName(tag);
          }
        } : function (tag, context) {
          var results = context.getElementsByTagName(tag);
          if (tag === '*') {
            var elem, tmp = [], i = 0;
            for (; elem = results[i]; i++) {
              if (elem.nodeType === 1) {
                tmp.push(elem);
              }
            }
            return tmp;
          }
          return results;
        },
        'NAME': assertUsableName && function (tag, context) {
          if (typeof context.getElementsByName !== strundefined) {
            return context.getElementsByName(name);
          }
        },
        'CLASS': assertUsableClassName && function (className, context, xml) {
          if (typeof context.getElementsByClassName !== strundefined && !xml) {
            return context.getElementsByClassName(className);
          }
        }
      },
      relative: {
        '>': {
          dir: 'parentNode',
          first: true
        },
        ' ': { dir: 'parentNode' },
        '+': {
          dir: 'previousSibling',
          first: true
        },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        'ATTR': function (match) {
          match[1] = match[1].replace(rbackslash, '');
          match[3] = (match[4] || match[5] || '').replace(rbackslash, '');
          if (match[2] === '~=') {
            match[3] = ' ' + match[3] + ' ';
          }
          return match.slice(0, 4);
        },
        'CHILD': function (match) {
          match[1] = match[1].toLowerCase();
          if (match[1] === 'nth') {
            if (!match[2]) {
              Sizzle.error(match[0]);
            }
            match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === 'even' || match[2] === 'odd'));
            match[4] = +(match[6] + match[7] || match[2] === 'odd');
          } else if (match[2]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        'PSEUDO': function (match) {
          var unquoted, excess;
          if (matchExpr['CHILD'].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[3];
          } else if (unquoted = match[4]) {
            if (rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
              unquoted = unquoted.slice(0, excess);
              match[0] = match[0].slice(0, excess);
            }
            match[2] = unquoted;
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        'ID': assertGetIdNotName ? function (id) {
          id = id.replace(rbackslash, '');
          return function (elem) {
            return elem.getAttribute('id') === id;
          };
        } : function (id) {
          id = id.replace(rbackslash, '');
          return function (elem) {
            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode('id');
            return node && node.value === id;
          };
        },
        'TAG': function (nodeName) {
          if (nodeName === '*') {
            return function () {
              return true;
            };
          }
          nodeName = nodeName.replace(rbackslash, '').toLowerCase();
          return function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        'CLASS': function (className) {
          var pattern = classCache[expando][className + ' '];
          return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
            return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute('class') || '');
          });
        },
        'ATTR': function (name, operator, check) {
          return function (elem, context) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === '!=';
            }
            if (!operator) {
              return true;
            }
            result += '';
            return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.substr(result.length - check.length) === check : operator === '~=' ? (' ' + result + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.substr(0, check.length + 1) === check + '-' : false;
          };
        },
        'CHILD': function (type, argument, first, last) {
          if (type === 'nth') {
            return function (elem) {
              var node, diff, parent = elem.parentNode;
              if (first === 1 && last === 0) {
                return true;
              }
              if (parent) {
                diff = 0;
                for (node = parent.firstChild; node; node = node.nextSibling) {
                  if (node.nodeType === 1) {
                    diff++;
                    if (elem === node) {
                      break;
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            };
          }
          return function (elem) {
            var node = elem;
            switch (type) {
            case 'only':
            case 'first':
              while (node = node.previousSibling) {
                if (node.nodeType === 1) {
                  return false;
                }
              }
              if (type === 'first') {
                return true;
              }
              node = elem;
            case 'last':
              while (node = node.nextSibling) {
                if (node.nodeType === 1) {
                  return false;
                }
              }
              return true;
            }
          };
        },
        'PSEUDO': function (pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [
              pseudo,
              pseudo,
              '',
              argument
            ];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx, matched = fn(seed, argument), i = matched.length;
              while (i--) {
                idx = indexOf.call(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        'not': markFunction(function (selector) {
          var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            return !results.pop();
          };
        }),
        'has': markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        'contains': markFunction(function (text) {
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        'enabled': function (elem) {
          return elem.disabled === false;
        },
        'disabled': function (elem) {
          return elem.disabled === true;
        },
        'checked': function (elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
        },
        'selected': function (elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        'parent': function (elem) {
          return !Expr.pseudos['empty'](elem);
        },
        'empty': function (elem) {
          var nodeType;
          elem = elem.firstChild;
          while (elem) {
            if (elem.nodeName > '@' || (nodeType = elem.nodeType) === 3 || nodeType === 4) {
              return false;
            }
            elem = elem.nextSibling;
          }
          return true;
        },
        'header': function (elem) {
          return rheader.test(elem.nodeName);
        },
        'text': function (elem) {
          var type, attr;
          return elem.nodeName.toLowerCase() === 'input' && (type = elem.type) === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === type);
        },
        'radio': createInputPseudo('radio'),
        'checkbox': createInputPseudo('checkbox'),
        'file': createInputPseudo('file'),
        'password': createInputPseudo('password'),
        'image': createInputPseudo('image'),
        'submit': createButtonPseudo('submit'),
        'reset': createButtonPseudo('reset'),
        'button': function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === 'input' && elem.type === 'button' || name === 'button';
        },
        'input': function (elem) {
          return rinputs.test(elem.nodeName);
        },
        'focus': function (elem) {
          var doc = elem.ownerDocument;
          return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        'active': function (elem) {
          return elem === elem.ownerDocument.activeElement;
        },
        'first': createPositionalPseudo(function () {
          return [0];
        }),
        'last': createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        'even': createPositionalPseudo(function (matchIndexes, length) {
          for (var i = 0; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'odd': createPositionalPseudo(function (matchIndexes, length) {
          for (var i = 1; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
          for (var i = argument < 0 ? argument + length : argument; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
          for (var i = argument < 0 ? argument + length : argument; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    function siblingCheck(a, b, ret) {
      if (a === b) {
        return ret;
      }
      var cur = a.nextSibling;
      while (cur) {
        if (cur === b) {
          return -1;
        }
        cur = cur.nextSibling;
      }
      return 1;
    }
    sortOrder = docElem.compareDocumentPosition ? function (a, b) {
      if (a === b) {
        hasDuplicate = true;
        return 0;
      }
      return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1;
    } : function (a, b) {
      if (a === b) {
        hasDuplicate = true;
        return 0;
      } else if (a.sourceIndex && b.sourceIndex) {
        return a.sourceIndex - b.sourceIndex;
      }
      var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
      if (aup === bup) {
        return siblingCheck(a, b);
      } else if (!aup) {
        return -1;
      } else if (!bup) {
        return 1;
      }
      while (cur) {
        ap.unshift(cur);
        cur = cur.parentNode;
      }
      cur = bup;
      while (cur) {
        bp.unshift(cur);
        cur = cur.parentNode;
      }
      al = ap.length;
      bl = bp.length;
      for (var i = 0; i < al && i < bl; i++) {
        if (ap[i] !== bp[i]) {
          return siblingCheck(ap[i], bp[i]);
        }
      }
      return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
    };
    [
      0,
      0
    ].sort(sortOrder);
    baseHasDuplicate = !hasDuplicate;
    Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [], i = 1, j = 0;
      hasDuplicate = baseHasDuplicate;
      results.sort(sortOrder);
      if (hasDuplicate) {
        for (; elem = results[i]; i++) {
          if (elem === results[i - 1]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      return results;
    };
    Sizzle.error = function (msg) {
      throw new Error('Syntax error, unrecognized expression: ' + msg);
    };
    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector + ' '];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        if (match = rcombinators.exec(soFar)) {
          tokens.push(matched = new Token(match.shift()));
          soFar = soFar.slice(matched.length);
          matched.type = match[0].replace(rtrim, ' ');
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            tokens.push(matched = new Token(match.shift()));
            soFar = soFar.slice(matched.length);
            matched.type = type;
            matched.matches = match;
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, checkNonElements = base && combinator.dir === 'parentNode', doneName = done++;
      return combinator.first ? function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (checkNonElements || elem.nodeType === 1) {
            return matcher(elem, context, xml);
          }
        }
      } : function (elem, context, xml) {
        if (!xml) {
          var cache, dirkey = dirruns + ' ' + doneName + ' ', cachedkey = dirkey + cachedruns;
          while (elem = elem[dir]) {
            if (checkNonElements || elem.nodeType === 1) {
              if ((cache = elem[expando]) === cachedkey) {
                return elem.sizset;
              } else if (typeof cache === 'string' && cache.indexOf(dirkey) === 0) {
                if (elem.sizset) {
                  return elem;
                }
              } else {
                elem[expando] = cachedkey;
                if (matcher(elem, context, xml)) {
                  elem.sizset = true;
                  return elem;
                }
                elem.sizset = false;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (checkNonElements || elem.nodeType === 1) {
              if (matcher(elem, context, xml)) {
                return elem;
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
          return indexOf.call(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function (elem, context, xml) {
            return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
          }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join('').replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && tokens.join(''));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, expandContext) {
          var elem, j, matcher, setMatched = [], matchedCount = 0, i = '0', unmatched = seed && [], outermost = expandContext != null, contextBackup = outermostContext, elems = seed || byElement && Expr.find['TAG']('*', expandContext && context.parentNode || context), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.E;
          if (outermost) {
            outermostContext = context !== document && context;
            cachedruns = superMatcher.el;
          }
          for (; (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              for (j = 0; matcher = elementMatchers[j]; j++) {
                if (matcher(elem, context, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                cachedruns = ++superMatcher.el;
              }
            }
            if (bySet) {
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          matchedCount += i;
          if (bySet && i !== matchedCount) {
            for (j = 0; matcher = setMatchers[j]; j++) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
              setMatched = condense(setMatched);
            }
            push.apply(results, setMatched);
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results);
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      superMatcher.el = 0;
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function (selector, group) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[expando][selector + ' '];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        while (i--) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
      }
      return cached;
    };
    function multipleContexts(selector, contexts, results) {
      var i = 0, len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function select(selector, context, results, seed, xml) {
      var i, tokens, token, type, find, match = tokenize(selector), j = match.length;
      if (!seed) {
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0);
          if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && context.nodeType === 9 && !xml && Expr.relative[tokens[1].type]) {
            context = Expr.find['ID'](token.matches[0].replace(rbackslash, ''), context, xml)[0];
            if (!context) {
              return results;
            }
            selector = selector.slice(tokens.shift().length);
          }
          for (i = matchExpr['POS'].test(selector) ? -1 : tokens.length - 1; i >= 0; i--) {
            token = tokens[i];
            if (Expr.relative[type = token.type]) {
              break;
            }
            if (find = Expr.find[type]) {
              if (seed = find(token.matches[0].replace(rbackslash, ''), rsibling.test(tokens[0].type) && context.parentNode || context, xml)) {
                tokens.splice(i, 1);
                selector = seed.length && tokens.join('');
                if (!selector) {
                  push.apply(results, slice.call(seed, 0));
                  return results;
                }
                break;
              }
            }
          }
        }
      }
      compile(selector, match)(seed, context, xml, results, rsibling.test(selector));
      return results;
    }
    if (document.querySelectorAll) {
      (function () {
        var disconnectedMatch, oldSelect = select, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, rbuggyQSA = [':focus'], rbuggyMatches = [':active'], matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
        assert(function (div) {
          div.innerHTML = '<select><option selected=\'\'></option></select>';
          if (!div.querySelectorAll('[selected]').length) {
            rbuggyQSA.push('\\[' + whitespace + '*(?:checked|disabled|ismap|multiple|readonly|selected|value)');
          }
          if (!div.querySelectorAll(':checked').length) {
            rbuggyQSA.push(':checked');
          }
        });
        assert(function (div) {
          div.innerHTML = '<p test=\'\'></p>';
          if (div.querySelectorAll('[test^=\'\']').length) {
            rbuggyQSA.push('[*^$]=' + whitespace + '*(?:""|\'\')');
          }
          div.innerHTML = '<input type=\'hidden\'/>';
          if (!div.querySelectorAll(':enabled').length) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
        });
        rbuggyQSA = new RegExp(rbuggyQSA.join('|'));
        select = function (selector, context, results, seed, xml) {
          if (!seed && !xml && !rbuggyQSA.test(selector)) {
            var groups, i, old = true, nid = expando, newContext = context, newSelector = context.nodeType === 9 && selector;
            if (context.nodeType === 1 && context.nodeName.toLowerCase() !== 'object') {
              groups = tokenize(selector);
              if (old = context.getAttribute('id')) {
                nid = old.replace(rescape, '\\$&');
              } else {
                context.setAttribute('id', nid);
              }
              nid = '[id=\'' + nid + '\'] ';
              i = groups.length;
              while (i--) {
                groups[i] = nid + groups[i].join('');
              }
              newContext = rsibling.test(selector) && context.parentNode || context;
              newSelector = groups.join(',');
            }
            if (newSelector) {
              try {
                push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
                return results;
              } catch (qsaError) {
              } finally {
                if (!old) {
                  context.removeAttribute('id');
                }
              }
            }
          }
          return oldSelect(selector, context, results, seed, xml);
        };
        if (matches) {
          assert(function (div) {
            disconnectedMatch = matches.call(div, 'div');
            try {
              matches.call(div, '[test!=\'\']:sizzle');
              rbuggyMatches.push('!=', pseudos);
            } catch (e) {
            }
          });
          rbuggyMatches = new RegExp(rbuggyMatches.join('|'));
          Sizzle.matchesSelector = function (elem, expr) {
            expr = expr.replace(rattributeQuotes, '=\'$1\']');
            if (!isXML(elem) && !rbuggyMatches.test(expr) && !rbuggyQSA.test(expr)) {
              try {
                var ret = matches.call(elem, expr);
                if (ret || disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                  return ret;
                }
              } catch (e) {
              }
            }
            return Sizzle(expr, null, null, [elem]).length > 0;
          };
        }
      }());
    }
    Expr.pseudos['nth'] = Expr.pseudos['eq'];
    function setFilters() {
    }
    Expr.filters = setFilters.prototype = Expr.pseudos;
    Expr.setFilters = new setFilters();
    Sizzle.attr = jQuery.attr;
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[':'] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
  }(window));
  var runtil = /Until$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, isSimple = /^.[^:#\[\.,]*$/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.fn.extend({
    find: function (selector) {
      var i, l, length, n, r, ret, self = this;
      if (typeof selector !== 'string') {
        return jQuery(selector).filter(function () {
          for (i = 0, l = self.length; i < l; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        });
      }
      ret = this.pushStack('', 'find', selector);
      for (i = 0, l = this.length; i < l; i++) {
        length = ret.length;
        jQuery.find(selector, this[i], ret);
        if (i > 0) {
          for (n = length; n < ret.length; n++) {
            for (r = 0; r < length; r++) {
              if (ret[r] === ret[n]) {
                ret.splice(n--, 1);
                break;
              }
            }
          }
        }
      }
      return ret;
    },
    has: function (target) {
      var i, targets = jQuery(target, this), len = targets.length;
      return this.filter(function () {
        for (i = 0; i < len; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector, false), 'not', selector);
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector, true), 'filter', selector);
    },
    is: function (selector) {
      return !!selector && (typeof selector === 'string' ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
    },
    closest: function (selectors, context) {
      var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || typeof selectors !== 'string' ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        cur = this[i];
        while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
          if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
            ret.push(cur);
            break;
          }
          cur = cur.parentNode;
        }
      }
      ret = ret.length > 1 ? jQuery.unique(ret) : ret;
      return this.pushStack(ret, 'closest', selectors);
    },
    index: function (elem) {
      if (!elem) {
        return this[0] && this[0].parentNode ? this.prevAll().length : -1;
      }
      if (typeof elem === 'string') {
        return jQuery.inArray(this[0], jQuery(elem));
      }
      return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
    },
    add: function (selector, context) {
      var set = typeof selector === 'string' ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector), all = jQuery.merge(this.get(), set);
      return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
    },
    addBack: function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  function isDisconnected(node) {
    return !node || !node.parentNode || node.parentNode.nodeType === 11;
  }
  function sibling(cur, dir) {
    do {
      cur = cur[dir];
    } while (cur && cur.nodeType !== 1);
    return cur;
  }
  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function (elem) {
      return jQuery.dir(elem, 'parentNode');
    },
    parentsUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'parentNode', until);
    },
    next: function (elem) {
      return sibling(elem, 'nextSibling');
    },
    prev: function (elem) {
      return sibling(elem, 'previousSibling');
    },
    nextAll: function (elem) {
      return jQuery.dir(elem, 'nextSibling');
    },
    prevAll: function (elem) {
      return jQuery.dir(elem, 'previousSibling');
    },
    nextUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'nextSibling', until);
    },
    prevUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'previousSibling', until);
    },
    siblings: function (elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children: function (elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents: function (elem) {
      return jQuery.nodeName(elem, 'iframe') ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var ret = jQuery.map(this, fn, until);
      if (!runtil.test(name)) {
        selector = until;
      }
      if (selector && typeof selector === 'string') {
        ret = jQuery.filter(selector, ret);
      }
      ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
      if (this.length > 1 && rparentsprev.test(name)) {
        ret = ret.reverse();
      }
      return this.pushStack(ret, name, core_slice.call(arguments).join(','));
    };
  });
  jQuery.extend({
    filter: function (expr, elems, not) {
      if (not) {
        expr = ':not(' + expr + ')';
      }
      return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
    },
    dir: function (elem, dir, until) {
      var matched = [], cur = elem[dir];
      while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
        if (cur.nodeType === 1) {
          matched.push(cur);
        }
        cur = cur[dir];
      }
      return matched;
    },
    sibling: function (n, elem) {
      var r = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          r.push(n);
        }
      }
      return r;
    }
  });
  function winnow(elements, qualifier, keep) {
    qualifier = qualifier || 0;
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        var retVal = !!qualifier.call(elem, i, elem);
        return retVal === keep;
      });
    } else if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem, i) {
        return elem === qualifier === keep;
      });
    } else if (typeof qualifier === 'string') {
      var filtered = jQuery.grep(elements, function (elem) {
          return elem.nodeType === 1;
        });
      if (isSimple.test(qualifier)) {
        return jQuery.filter(qualifier, filtered, !keep);
      } else {
        qualifier = jQuery.filter(qualifier, filtered);
      }
    }
    return jQuery.grep(elements, function (elem, i) {
      return jQuery.inArray(elem, qualifier) >= 0 === keep;
    });
  }
  function createSafeFragment(document) {
    var list = nodeNames.split('|'), safeFrag = document.createDocumentFragment();
    if (safeFrag.createElement) {
      while (list.length) {
        safeFrag.createElement(list.pop());
      }
    }
    return safeFrag;
  }
  var nodeNames = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|' + 'header|hgroup|mark|meter|nav|output|progress|section|summary|time|video', rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rnocache = /<(?:script|object|embed|option|style)/i, rnoshimcache = new RegExp('<(?:' + nodeNames + ')[\\s/>]', 'i'), rcheckableType = /^(?:checkbox|radio)$/, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /\/(java|ecma)script/i, rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, wrapMap = {
      option: [
        1,
        '<select multiple=\'multiple\'>',
        '</select>'
      ],
      legend: [
        1,
        '<fieldset>',
        '</fieldset>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      col: [
        2,
        '<table><tbody></tbody><colgroup>',
        '</colgroup></table>'
      ],
      area: [
        1,
        '<map>',
        '</map>'
      ],
      _default: [
        0,
        '',
        ''
      ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement('div'));
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  if (!jQuery.support.htmlSerialize) {
    wrapMap._default = [
      1,
      'X<div>',
      '</div>'
    ];
  }
  jQuery.fn.extend({
    text: function (value) {
      return jQuery.access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
      }, null, value, arguments.length);
    },
    wrapAll: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function () {
          var elem = this;
          while (elem.firstChild && elem.firstChild.nodeType === 1) {
            elem = elem.firstChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function () {
        var self = jQuery(this), contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function (html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function () {
      return this.parent().each(function () {
        if (!jQuery.nodeName(this, 'body')) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    },
    append: function () {
      return this.domManip(arguments, true, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11) {
          this.appendChild(elem);
        }
      });
    },
    prepend: function () {
      return this.domManip(arguments, true, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11) {
          this.insertBefore(elem, this.firstChild);
        }
      });
    },
    before: function () {
      if (!isDisconnected(this[0])) {
        return this.domManip(arguments, false, function (elem) {
          this.parentNode.insertBefore(elem, this);
        });
      }
      if (arguments.length) {
        var set = jQuery.clean(arguments);
        return this.pushStack(jQuery.merge(set, this), 'before', this.selector);
      }
    },
    after: function () {
      if (!isDisconnected(this[0])) {
        return this.domManip(arguments, false, function (elem) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        });
      }
      if (arguments.length) {
        var set = jQuery.clean(arguments);
        return this.pushStack(jQuery.merge(this, set), 'after', this.selector);
      }
    },
    remove: function (selector, keepData) {
      var elem, i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (!selector || jQuery.filter(selector, [elem]).length) {
          if (!keepData && elem.nodeType === 1) {
            jQuery.cleanData(elem.getElementsByTagName('*'));
            jQuery.cleanData([elem]);
          }
          if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
      return this;
    },
    empty: function () {
      var elem, i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(elem.getElementsByTagName('*'));
        }
        while (elem.firstChild) {
          elem.removeChild(elem.firstChild);
        }
      }
      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return jQuery.access(this, function (value) {
        var elem = this[0] || {}, i = 0, l = this.length;
        if (value === undefined) {
          return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, '') : undefined;
        }
        if (typeof value === 'string' && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [
            '',
            ''
          ])[1].toLowerCase()]) {
          value = value.replace(rxhtmlTag, '<$1></$2>');
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(elem.getElementsByTagName('*'));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {
          }
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function (value) {
      if (!isDisconnected(this[0])) {
        if (jQuery.isFunction(value)) {
          return this.each(function (i) {
            var self = jQuery(this), old = self.html();
            self.replaceWith(value.call(this, i, old));
          });
        }
        if (typeof value !== 'string') {
          value = jQuery(value).detach();
        }
        return this.each(function () {
          var next = this.nextSibling, parent = this.parentNode;
          jQuery(this).remove();
          if (next) {
            jQuery(next).before(value);
          } else {
            jQuery(parent).append(value);
          }
        });
      }
      return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), 'replaceWith', value) : this;
    },
    detach: function (selector) {
      return this.remove(selector, true);
    },
    domManip: function (args, table, callback) {
      args = [].concat.apply([], args);
      var results, first, fragment, iNoClone, i = 0, value = args[0], scripts = [], l = this.length;
      if (!jQuery.support.checkClone && l > 1 && typeof value === 'string' && rchecked.test(value)) {
        return this.each(function () {
          jQuery(this).domManip(args, table, callback);
        });
      }
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          var self = jQuery(this);
          args[0] = value.call(this, i, table ? self.html() : undefined);
          self.domManip(args, table, callback);
        });
      }
      if (this[0]) {
        results = jQuery.buildFragment(args, this, scripts);
        fragment = results.fragment;
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first) {
          table = table && jQuery.nodeName(first, 'tr');
          for (iNoClone = results.cacheable || l - 1; i < l; i++) {
            callback.call(table && jQuery.nodeName(this[i], 'table') ? findOrAppend(this[i], 'tbody') : this[i], i === iNoClone ? fragment : jQuery.clone(fragment, true, true));
          }
        }
        fragment = first = null;
        if (scripts.length) {
          jQuery.each(scripts, function (i, elem) {
            if (elem.src) {
              if (jQuery.ajax) {
                jQuery.ajax({
                  url: elem.src,
                  type: 'GET',
                  dataType: 'script',
                  async: false,
                  global: false,
                  'throws': true
                });
              } else {
                jQuery.error('no ajax');
              }
            } else {
              jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || '').replace(rcleanScript, ''));
            }
            if (elem.parentNode) {
              elem.parentNode.removeChild(elem);
            }
          });
        }
      }
      return this;
    }
  });
  function findOrAppend(elem, tag) {
    return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
  }
  function cloneCopyEvent(src, dest) {
    if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
      return;
    }
    var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
    if (events) {
      delete curData.handle;
      curData.events = {};
      for (type in events) {
        for (i = 0, l = events[type].length; i < l; i++) {
          jQuery.event.add(dest, type, events[type][i]);
        }
      }
    }
    if (curData.data) {
      curData.data = jQuery.extend({}, curData.data);
    }
  }
  function cloneFixAttributes(src, dest) {
    var nodeName;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dest.clearAttributes) {
      dest.clearAttributes();
    }
    if (dest.mergeAttributes) {
      dest.mergeAttributes(src);
    }
    nodeName = dest.nodeName.toLowerCase();
    if (nodeName === 'object') {
      if (dest.parentNode) {
        dest.outerHTML = src.outerHTML;
      }
      if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
        dest.innerHTML = src.innerHTML;
      }
    } else if (nodeName === 'input' && rcheckableType.test(src.type)) {
      dest.defaultChecked = dest.checked = src.checked;
      if (dest.value !== src.value) {
        dest.value = src.value;
      }
    } else if (nodeName === 'option') {
      dest.selected = src.defaultSelected;
    } else if (nodeName === 'input' || nodeName === 'textarea') {
      dest.defaultValue = src.defaultValue;
    } else if (nodeName === 'script' && dest.text !== src.text) {
      dest.text = src.text;
    }
    dest.removeAttribute(jQuery.expando);
  }
  jQuery.buildFragment = function (args, context, scripts) {
    var fragment, cacheable, cachehit, first = args[0];
    context = context || document;
    context = !context.nodeType && context[0] || context;
    context = context.ownerDocument || context;
    if (args.length === 1 && typeof first === 'string' && first.length < 512 && context === document && first.charAt(0) === '<' && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
      cacheable = true;
      fragment = jQuery.fragments[first];
      cachehit = fragment !== undefined;
    }
    if (!fragment) {
      fragment = context.createDocumentFragment();
      jQuery.clean(args, context, fragment, scripts);
      if (cacheable) {
        jQuery.fragments[first] = cachehit && fragment;
      }
    }
    return {
      fragment: fragment,
      cacheable: cacheable
    };
  };
  jQuery.fragments = {};
  jQuery.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems, i = 0, ret = [], insert = jQuery(selector), l = insert.length, parent = this.length === 1 && this[0].parentNode;
      if ((parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1) {
        insert[original](this[0]);
        return this;
      } else {
        for (; i < l; i++) {
          elems = (i > 0 ? this.clone(true) : this).get();
          jQuery(insert[i])[original](elems);
          ret = ret.concat(elems);
        }
        return this.pushStack(ret, name, insert.selector);
      }
    };
  });
  function getAll(elem) {
    if (typeof elem.getElementsByTagName !== 'undefined') {
      return elem.getElementsByTagName('*');
    } else if (typeof elem.querySelectorAll !== 'undefined') {
      return elem.querySelectorAll('*');
    } else {
      return [];
    }
  }
  function fixDefaultChecked(elem) {
    if (rcheckableType.test(elem.type)) {
      elem.defaultChecked = elem.checked;
    }
  }
  jQuery.extend({
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var srcElements, destElements, i, clone;
      if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test('<' + elem.nodeName + '>')) {
        clone = elem.cloneNode(true);
      } else {
        fragmentDiv.innerHTML = elem.outerHTML;
        fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
      }
      if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        cloneFixAttributes(elem, clone);
        srcElements = getAll(elem);
        destElements = getAll(clone);
        for (i = 0; srcElements[i]; ++i) {
          if (destElements[i]) {
            cloneFixAttributes(srcElements[i], destElements[i]);
          }
        }
      }
      if (dataAndEvents) {
        cloneCopyEvent(elem, clone);
        if (deepDataAndEvents) {
          srcElements = getAll(elem);
          destElements = getAll(clone);
          for (i = 0; srcElements[i]; ++i) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        }
      }
      srcElements = destElements = null;
      return clone;
    },
    clean: function (elems, context, fragment, scripts) {
      var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags, safe = context === document && safeFragment, ret = [];
      if (!context || typeof context.createDocumentFragment === 'undefined') {
        context = document;
      }
      for (i = 0; (elem = elems[i]) != null; i++) {
        if (typeof elem === 'number') {
          elem += '';
        }
        if (!elem) {
          continue;
        }
        if (typeof elem === 'string') {
          if (!rhtml.test(elem)) {
            elem = context.createTextNode(elem);
          } else {
            safe = safe || createSafeFragment(context);
            div = context.createElement('div');
            safe.appendChild(div);
            elem = elem.replace(rxhtmlTag, '<$1></$2>');
            tag = (rtagName.exec(elem) || [
              '',
              ''
            ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            depth = wrap[0];
            div.innerHTML = wrap[1] + elem + wrap[2];
            while (depth--) {
              div = div.lastChild;
            }
            if (!jQuery.support.tbody) {
              hasBody = rtbody.test(elem);
              tbody = tag === 'table' && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === '<table>' && !hasBody ? div.childNodes : [];
              for (j = tbody.length - 1; j >= 0; --j) {
                if (jQuery.nodeName(tbody[j], 'tbody') && !tbody[j].childNodes.length) {
                  tbody[j].parentNode.removeChild(tbody[j]);
                }
              }
            }
            if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
              div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
            }
            elem = div.childNodes;
            div.parentNode.removeChild(div);
          }
        }
        if (elem.nodeType) {
          ret.push(elem);
        } else {
          jQuery.merge(ret, elem);
        }
      }
      if (div) {
        elem = div = safe = null;
      }
      if (!jQuery.support.appendChecked) {
        for (i = 0; (elem = ret[i]) != null; i++) {
          if (jQuery.nodeName(elem, 'input')) {
            fixDefaultChecked(elem);
          } else if (typeof elem.getElementsByTagName !== 'undefined') {
            jQuery.grep(elem.getElementsByTagName('input'), fixDefaultChecked);
          }
        }
      }
      if (fragment) {
        handleScript = function (elem) {
          if (!elem.type || rscriptType.test(elem.type)) {
            return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem);
          }
        };
        for (i = 0; (elem = ret[i]) != null; i++) {
          if (!(jQuery.nodeName(elem, 'script') && handleScript(elem))) {
            fragment.appendChild(elem);
            if (typeof elem.getElementsByTagName !== 'undefined') {
              jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName('script')), handleScript);
              ret.splice.apply(ret, [
                i + 1,
                0
              ].concat(jsTags));
              i += jsTags.length;
            }
          }
        }
      }
      return ret;
    },
    cleanData: function (elems, acceptData) {
      var data, id, elem, type, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special;
      for (; (elem = elems[i]) != null; i++) {
        if (acceptData || jQuery.acceptData(elem)) {
          id = elem[internalKey];
          data = id && cache[id];
          if (data) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            if (cache[id]) {
              delete cache[id];
              if (deleteExpando) {
                delete elem[internalKey];
              } else if (elem.removeAttribute) {
                elem.removeAttribute(internalKey);
              } else {
                elem[internalKey] = null;
              }
              jQuery.deletedIds.push(id);
            }
          }
        }
      }
    }
  });
  (function () {
    var matched, browser;
    jQuery.uaMatch = function (ua) {
      ua = ua.toLowerCase();
      var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
      return {
        browser: match[1] || '',
        version: match[2] || '0'
      };
    };
    matched = jQuery.uaMatch(navigator.userAgent);
    browser = {};
    if (matched.browser) {
      browser[matched.browser] = true;
      browser.version = matched.version;
    }
    if (browser.chrome) {
      browser.webkit = true;
    } else if (browser.webkit) {
      browser.safari = true;
    }
    jQuery.browser = browser;
    jQuery.sub = function () {
      function jQuerySub(selector, context) {
        return new jQuerySub.fn.init(selector, context);
      }
      jQuery.extend(true, jQuerySub, this);
      jQuerySub.superclass = this;
      jQuerySub.fn = jQuerySub.prototype = this();
      jQuerySub.fn.constructor = jQuerySub;
      jQuerySub.sub = this.sub;
      jQuerySub.fn.init = function init(selector, context) {
        if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
          context = jQuerySub(context);
        }
        return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
      };
      jQuerySub.fn.init.prototype = jQuerySub.fn;
      var rootjQuerySub = jQuerySub(document);
      return jQuerySub;
    };
  }());
  var curCSS, iframe, iframeDoc, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rposition = /^(top|right|bottom|left)$/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp('^(' + core_pnum + ')(.*)$', 'i'), rnumnonpx = new RegExp('^(' + core_pnum + ')(?!px)[a-z%]+$', 'i'), rrelNum = new RegExp('^([-+])=(' + core_pnum + ')', 'i'), elemdisplay = { BODY: 'block' }, cssShow = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    }, cssNormalTransform = {
      letterSpacing: 0,
      fontWeight: 400
    }, cssExpand = [
      'Top',
      'Right',
      'Bottom',
      'Left'
    ], cssPrefixes = [
      'Webkit',
      'O',
      'Moz',
      'ms'
    ], eventsToggle = jQuery.fn.toggle;
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in style) {
        return name;
      }
    }
    return origName;
  }
  function isHidden(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, 'display') === 'none' || !jQuery.contains(elem.ownerDocument, elem);
  }
  function showHide(elements, show) {
    var elem, display, values = [], index = 0, length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = jQuery._data(elem, 'olddisplay');
      if (show) {
        if (!values[index] && elem.style.display === 'none') {
          elem.style.display = '';
        }
        if (elem.style.display === '' && isHidden(elem)) {
          values[index] = jQuery._data(elem, 'olddisplay', css_defaultDisplay(elem.nodeName));
        }
      } else {
        display = curCSS(elem, 'display');
        if (!values[index] && display !== 'none') {
          jQuery._data(elem, 'olddisplay', display);
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === 'none' || elem.style.display === '') {
        elem.style.display = show ? values[index] || '' : 'none';
      }
    }
    return elements;
  }
  jQuery.fn.extend({
    css: function (name, value) {
      return jQuery.access(this, function (elem, name, value) {
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function () {
      return showHide(this, true);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state, fn2) {
      var bool = typeof state === 'boolean';
      if (jQuery.isFunction(state) && jQuery.isFunction(fn2)) {
        return eventsToggle.apply(this, arguments);
      }
      return this.each(function () {
        if (bool ? state : isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            var ret = curCSS(elem, 'opacity');
            return ret === '' ? '1' : ret;
          }
        }
      }
    },
    cssNumber: {
      'fillOpacity': true,
      'fontWeight': true,
      'lineHeight': true,
      'opacity': true,
      'orphans': true,
      'widows': true,
      'zIndex': true,
      'zoom': true
    },
    cssProps: { 'float': jQuery.support.cssFloat ? 'cssFloat' : 'styleFloat' },
    style: function (elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === 'string' && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
          type = 'number';
        }
        if (value == null || type === 'number' && isNaN(value)) {
          return;
        }
        if (type === 'number' && !jQuery.cssNumber[origName]) {
          value += 'px';
        }
        if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          try {
            style[name] = value;
          } catch (e) {
          }
        }
      } else {
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function (elem, name, numeric, extra) {
      var val, num, hooks, origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && 'get' in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name);
      }
      if (val === 'normal' && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (numeric || extra !== undefined) {
        num = parseFloat(val);
        return numeric || jQuery.isNumeric(num) ? num || 0 : val;
      }
      return val;
    },
    swap: function (elem, options, callback) {
      var ret, name, old = {};
      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }
      ret = callback.call(elem);
      for (name in options) {
        elem.style[name] = old[name];
      }
      return ret;
    }
  });
  if (window.getComputedStyle) {
    curCSS = function (elem, name) {
      var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null), style = elem.style;
      if (computed) {
        ret = computed.getPropertyValue(name) || computed[name];
        if (ret === '' && !jQuery.contains(elem.ownerDocument, elem)) {
          ret = jQuery.style(elem, name);
        }
        if (rnumnonpx.test(ret) && rmargin.test(name)) {
          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;
          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;
          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth;
        }
      }
      return ret;
    };
  } else if (document.documentElement.currentStyle) {
    curCSS = function (elem, name) {
      var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
      if (ret == null && style && style[name]) {
        ret = style[name];
      }
      if (rnumnonpx.test(ret) && !rposition.test(name)) {
        left = style.left;
        rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
        if (rsLeft) {
          elem.runtimeStyle.left = elem.currentStyle.left;
        }
        style.left = name === 'fontSize' ? '1em' : ret;
        ret = style.pixelLeft + 'px';
        style.left = left;
        if (rsLeft) {
          elem.runtimeStyle.left = rsLeft;
        }
      }
      return ret === '' ? 'auto' : ret;
    };
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px') : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
    var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : name === 'width' ? 1 : 0, val = 0;
    for (; i < 4; i += 2) {
      if (extra === 'margin') {
        val += jQuery.css(elem, extra + cssExpand[i], true);
      }
      if (isBorderBox) {
        if (extra === 'content') {
          val -= parseFloat(curCSS(elem, 'padding' + cssExpand[i])) || 0;
        }
        if (extra !== 'margin') {
          val -= parseFloat(curCSS(elem, 'border' + cssExpand[i] + 'Width')) || 0;
        }
      } else {
        val += parseFloat(curCSS(elem, 'padding' + cssExpand[i])) || 0;
        if (extra !== 'padding') {
          val += parseFloat(curCSS(elem, 'border' + cssExpand[i] + 'Width')) || 0;
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var val = name === 'width' ? elem.offsetWidth : elem.offsetHeight, valueIsBorderBox = true, isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing') === 'border-box';
    if (val <= 0 || val == null) {
      val = curCSS(elem, name);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox) + 'px';
  }
  function css_defaultDisplay(nodeName) {
    if (elemdisplay[nodeName]) {
      return elemdisplay[nodeName];
    }
    var elem = jQuery('<' + nodeName + '>').appendTo(document.body), display = elem.css('display');
    elem.remove();
    if (display === 'none' || display === '') {
      iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement('iframe'), {
        frameBorder: 0,
        width: 0,
        height: 0
      }));
      if (!iframeDoc || !iframe.createElement) {
        iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
        iframeDoc.write('<!doctype html><html><body>');
        iframeDoc.close();
      }
      elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));
      display = curCSS(elem, 'display');
      document.body.removeChild(iframe);
    }
    elemdisplay[nodeName] = display;
    return display;
  }
  jQuery.each([
    'height',
    'width'
  ], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        if (computed) {
          if (elem.offsetWidth === 0 && rdisplayswap.test(curCSS(elem, 'display'))) {
            return jQuery.swap(elem, cssShow, function () {
              return getWidthOrHeight(elem, name, extra);
            });
          } else {
            return getWidthOrHeight(elem, name, extra);
          }
        }
      },
      set: function (elem, value, extra) {
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing') === 'border-box') : 0);
      }
    };
  });
  if (!jQuery.support.opacity) {
    jQuery.cssHooks.opacity = {
      get: function (elem, computed) {
        return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : computed ? '1' : '';
      },
      set: function (elem, value) {
        var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? 'alpha(opacity=' + value * 100 + ')' : '', filter = currentStyle && currentStyle.filter || style.filter || '';
        style.zoom = 1;
        if (value >= 1 && jQuery.trim(filter.replace(ralpha, '')) === '' && style.removeAttribute) {
          style.removeAttribute('filter');
          if (currentStyle && !currentStyle.filter) {
            return;
          }
        }
        style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + ' ' + opacity;
      }
    };
  }
  jQuery(function () {
    if (!jQuery.support.reliableMarginRight) {
      jQuery.cssHooks.marginRight = {
        get: function (elem, computed) {
          return jQuery.swap(elem, { 'display': 'inline-block' }, function () {
            if (computed) {
              return curCSS(elem, 'marginRight');
            }
          });
        }
      };
    }
    if (!jQuery.support.pixelPosition && jQuery.fn.position) {
      jQuery.each([
        'top',
        'left'
      ], function (i, prop) {
        jQuery.cssHooks[prop] = {
          get: function (elem, computed) {
            if (computed) {
              var ret = curCSS(elem, prop);
              return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + 'px' : ret;
            }
          }
        };
      });
    }
  });
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.hidden = function (elem) {
      return elem.offsetWidth === 0 && elem.offsetHeight === 0 || !jQuery.support.reliableHiddenOffsets && (elem.style && elem.style.display || curCSS(elem, 'display')) === 'none';
    };
    jQuery.expr.filters.visible = function (elem) {
      return !jQuery.expr.filters.hidden(elem);
    };
  }
  jQuery.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i, parts = typeof value === 'string' ? value.split(' ') : [value], expanded = {};
        for (i = 0; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rselectTextarea = /^(?:select|textarea)/i;
  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        return this.elements ? jQuery.makeArray(this.elements) : this;
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
      }).map(function (i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, '\r\n')
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, '\r\n')
        };
      }).get();
    }
  });
  jQuery.param = function (a, traditional) {
    var prefix, s = [], add = function (key, value) {
        value = jQuery.isFunction(value) ? value() : value == null ? '' : value;
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join('&').replace(r20, '+');
  };
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === 'object') {
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = ['*/'] + ['*'];
  try {
    ajaxLocation = location.href;
  } catch (e) {
    ajaxLocation = document.createElement('a');
    ajaxLocation.href = '';
    ajaxLocation = ajaxLocation.href;
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
  function addToPrefiltersOrTransports(structure) {
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== 'string') {
        func = dataTypeExpression;
        dataTypeExpression = '*';
      }
      var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace), i = 0, length = dataTypes.length;
      if (jQuery.isFunction(func)) {
        for (; i < length; i++) {
          dataType = dataTypes[i];
          placeBefore = /^\+/.test(dataType);
          if (placeBefore) {
            dataType = dataType.substr(1) || '*';
          }
          list = structure[dataType] = structure[dataType] || [];
          list[placeBefore ? 'unshift' : 'push'](func);
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
    dataType = dataType || options.dataTypes[0];
    inspected = inspected || {};
    inspected[dataType] = true;
    var selection, list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = structure === prefilters;
    for (; i < length && (executeOnly || !selection); i++) {
      selection = list[i](options, originalOptions, jqXHR);
      if (typeof selection === 'string') {
        if (!executeOnly || inspected[selection]) {
          selection = undefined;
        } else {
          options.dataTypes.unshift(selection);
          selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected);
        }
      }
    }
    if ((executeOnly || !selection) && !inspected['*']) {
      selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, '*', inspected);
    }
    return selection;
  }
  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
  }
  jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== 'string' && _load) {
      return _load.apply(this, arguments);
    }
    if (!this.length) {
      return this;
    }
    var selector, type, response, self = this, off = url.indexOf(' ');
    if (off >= 0) {
      selector = url.slice(off, url.length);
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === 'object') {
      type = 'POST';
    }
    jQuery.ajax({
      url: url,
      type: type,
      dataType: 'html',
      data: params,
      complete: function (jqXHR, status) {
        if (callback) {
          self.each(callback, response || [
            jqXHR.responseText,
            status,
            jqXHR
          ]);
        }
      }
    }).done(function (responseText) {
      response = arguments;
      self.html(selector ? jQuery('<div>').append(responseText.replace(rscript, '')).find(selector) : responseText);
    });
    return this;
  };
  jQuery.each('ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend'.split(' '), function (i, o) {
    jQuery.fn[o] = function (f) {
      return this.on(o, f);
    };
  });
  jQuery.each([
    'get',
    'post'
  ], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax({
        type: method,
        url: url,
        data: data,
        success: callback,
        dataType: type
      });
    };
  });
  jQuery.extend({
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, 'script');
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, 'json');
    },
    ajaxSetup: function (target, settings) {
      if (settings) {
        ajaxExtend(target, jQuery.ajaxSettings);
      } else {
        settings = target;
        target = jQuery.ajaxSettings;
      }
      ajaxExtend(target, settings);
      return target;
    },
    ajaxSettings: {
      url: ajaxLocation,
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      type: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      processData: true,
      async: true,
      accepts: {
        xml: 'application/xml, text/xml',
        html: 'text/html',
        text: 'text/plain',
        json: 'application/json, text/javascript',
        '*': allTypes
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText'
      },
      converters: {
        '* text': window.String,
        'text html': true,
        'text json': jQuery.parseJSON,
        'text xml': jQuery.parseXML
      },
      flatOptions: {
        context: true,
        url: true
      }
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function (url, options) {
      if (typeof url === 'object') {
        options = url;
        url = undefined;
      }
      options = options || {};
      var ifModifiedKey, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = 'canceled', jqXHR = {
          readyState: 0,
          setRequestHeader: function (name, value) {
            if (!state) {
              var lname = name.toLowerCase();
              name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          getAllResponseHeaders: function () {
            return state === 2 ? responseHeadersString : null;
          },
          getResponseHeader: function (key) {
            var match;
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase()] = match[2];
                }
              }
              match = responseHeaders[key.toLowerCase()];
            }
            return match === undefined ? null : match;
          },
          overrideMimeType: function (type) {
            if (!state) {
              s.mimeType = type;
            }
            return this;
          },
          abort: function (statusText) {
            statusText = statusText || strAbort;
            if (transport) {
              transport.abort(statusText);
            }
            done(0, statusText);
            return this;
          }
        };
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || '';
        jqXHR.readyState = status > 0 ? 4 : 0;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        if (status >= 200 && status < 300 || status === 304) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader('Last-Modified');
            if (modified) {
              jQuery.lastModified[ifModifiedKey] = modified;
            }
            modified = jqXHR.getResponseHeader('Etag');
            if (modified) {
              jQuery.etag[ifModifiedKey] = modified;
            }
          }
          if (status === 304) {
            statusText = 'notmodified';
            isSuccess = true;
          } else {
            isSuccess = ajaxConvert(s, response);
            statusText = isSuccess.state;
            success = isSuccess.data;
            error = isSuccess.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (!statusText || status) {
            statusText = 'error';
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + '';
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [
            success,
            statusText,
            jqXHR
          ]);
        } else {
          deferred.rejectWith(callbackContext, [
            jqXHR,
            statusText,
            error
          ]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger('ajax' + (isSuccess ? 'Success' : 'Error'), [
            jqXHR,
            s,
            isSuccess ? success : error
          ]);
        }
        completeDeferred.fireWith(callbackContext, [
          jqXHR,
          statusText
        ]);
        if (fireGlobals) {
          globalEventContext.trigger('ajaxComplete', [
            jqXHR,
            s
          ]);
          if (!--jQuery.active) {
            jQuery.event.trigger('ajaxStop');
          }
        }
      }
      deferred.promise(jqXHR);
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      jqXHR.complete = completeDeferred.add;
      jqXHR.statusCode = function (map) {
        if (map) {
          var tmp;
          if (state < 2) {
            for (tmp in map) {
              statusCode[tmp] = [
                statusCode[tmp],
                map[tmp]
              ];
            }
          } else {
            tmp = map[jqXHR.status];
            jqXHR.always(tmp);
          }
        }
        return this;
      };
      s.url = ((url || s.url) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
      s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase().split(core_rspace);
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === 'http:' ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? 80 : 443))));
      }
      if (s.data && s.processData && typeof s.data !== 'string') {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = s.global;
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger('ajaxStart');
      }
      if (!s.hasContent) {
        if (s.data) {
          s.url += (rquery.test(s.url) ? '&' : '?') + s.data;
          delete s.data;
        }
        ifModifiedKey = s.url;
        if (s.cache === false) {
          var ts = jQuery.now(), ret = s.url.replace(rts, '$1_=' + ts);
          s.url = ret + (ret === s.url ? (rquery.test(s.url) ? '&' : '?') + '_=' + ts : '');
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader('Content-Type', s.contentType);
      }
      if (s.ifModified) {
        ifModifiedKey = ifModifiedKey || s.url;
        if (jQuery.lastModified[ifModifiedKey]) {
          jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[ifModifiedKey]);
        }
        if (jQuery.etag[ifModifiedKey]) {
          jqXHR.setRequestHeader('If-None-Match', jQuery.etag[ifModifiedKey]);
        }
      }
      jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = 'abort';
      for (i in {
          success: 1,
          error: 1,
          complete: 1
        }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, 'No Transport');
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger('ajaxSend', [
            jqXHR,
            s
          ]);
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function () {
            jqXHR.abort('timeout');
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      return jqXHR;
    },
    active: 0,
    lastModified: {},
    etag: {}
  });
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
    for (type in responseFields) {
      if (type in responses) {
        jqXHR[responseFields[type]] = responses[type];
      }
    }
    while (dataTypes[0] === '*') {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader('content-type');
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response) {
    var conv, conv2, current, tmp, dataTypes = s.dataTypes.slice(), prev = dataTypes[0], converters = {}, i = 0;
    if (s.dataFilter) {
      response = s.dataFilter(response, s.dataType);
    }
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    for (; current = dataTypes[++i];) {
      if (current !== '*') {
        if (prev !== '*' && prev !== current) {
          conv = converters[prev + ' ' + current] || converters['* ' + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(' ');
              if (tmp[1] === current) {
                conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.splice(i--, 0, current);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s['throws']) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: 'parsererror',
                  error: conv ? e : 'No conversion from ' + prev + ' to ' + current
                };
              }
            }
          }
        }
        prev = current;
      }
    }
    return {
      state: 'success',
      data: response
    };
  }
  var oldCallbacks = [], rquestion = /\?/, rjsonp = /(=)\?(?=&|$)|\?\?/, nonce = jQuery.now();
  jQuery.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + '_' + nonce++;
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, data = s.data, url = s.url, hasCallback = s.jsonp !== false, replaceInUrl = hasCallback && rjsonp.test(url), replaceInData = hasCallback && !replaceInUrl && typeof data === 'string' && !(s.contentType || '').indexOf('application/x-www-form-urlencoded') && rjsonp.test(data);
    if (s.dataTypes[0] === 'jsonp' || replaceInUrl || replaceInData) {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      overwritten = window[callbackName];
      if (replaceInUrl) {
        s.url = url.replace(rjsonp, '$1' + callbackName);
      } else if (replaceInData) {
        s.data = data.replace(rjsonp, '$1' + callbackName);
      } else if (hasCallback) {
        s.url += (rquestion.test(url) ? '&' : '?') + s.jsonp + '=' + callbackName;
      }
      s.converters['script json'] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + ' was not called');
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = 'json';
      window[callbackName] = function () {
        responseContainer = arguments;
      };
      jqXHR.always(function () {
        window[callbackName] = overwritten;
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return 'script';
    }
  });
  jQuery.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /javascript|ecmascript/ },
    converters: {
      'text script': function (text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });
  jQuery.ajaxPrefilter('script', function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = 'GET';
      s.global = false;
    }
  });
  jQuery.ajaxTransport('script', function (s) {
    if (s.crossDomain) {
      var script, head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
      return {
        send: function (_, callback) {
          script = document.createElement('script');
          script.async = 'async';
          if (s.scriptCharset) {
            script.charset = s.scriptCharset;
          }
          script.src = s.url;
          script.onload = script.onreadystatechange = function (_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
              script.onload = script.onreadystatechange = null;
              if (head && script.parentNode) {
                head.removeChild(script);
              }
              script = undefined;
              if (!isAbort) {
                callback(200, 'success');
              }
            }
          };
          head.insertBefore(script, head.firstChild);
        },
        abort: function () {
          if (script) {
            script.onload(0, 1);
          }
        }
      };
    }
  });
  var xhrCallbacks, xhrOnUnloadAbort = window.ActiveXObject ? function () {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key](0, 1);
      }
    } : false, xhrId = 0;
  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {
    }
  }
  function createActiveXHR() {
    try {
      return new window.ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {
    }
  }
  jQuery.ajaxSettings.xhr = window.ActiveXObject ? function () {
    return !this.isLocal && createStandardXHR() || createActiveXHR();
  } : createStandardXHR;
  (function (xhr) {
    jQuery.extend(jQuery.support, {
      ajax: !!xhr,
      cors: !!xhr && 'withCredentials' in xhr
    });
  }(jQuery.ajaxSettings.xhr()));
  if (jQuery.support.ajax) {
    jQuery.ajaxTransport(function (s) {
      if (!s.crossDomain || jQuery.support.cors) {
        var callback;
        return {
          send: function (headers, complete) {
            var handle, i, xhr = s.xhr();
            if (s.username) {
              xhr.open(s.type, s.url, s.async, s.username, s.password);
            } else {
              xhr.open(s.type, s.url, s.async);
            }
            if (s.xhrFields) {
              for (i in s.xhrFields) {
                xhr[i] = s.xhrFields[i];
              }
            }
            if (s.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(s.mimeType);
            }
            if (!s.crossDomain && !headers['X-Requested-With']) {
              headers['X-Requested-With'] = 'XMLHttpRequest';
            }
            try {
              for (i in headers) {
                xhr.setRequestHeader(i, headers[i]);
              }
            } catch (_) {
            }
            xhr.send(s.hasContent && s.data || null);
            callback = function (_, isAbort) {
              var status, statusText, responseHeaders, responses, xml;
              try {
                if (callback && (isAbort || xhr.readyState === 4)) {
                  callback = undefined;
                  if (handle) {
                    xhr.onreadystatechange = jQuery.noop;
                    if (xhrOnUnloadAbort) {
                      delete xhrCallbacks[handle];
                    }
                  }
                  if (isAbort) {
                    if (xhr.readyState !== 4) {
                      xhr.abort();
                    }
                  } else {
                    status = xhr.status;
                    responseHeaders = xhr.getAllResponseHeaders();
                    responses = {};
                    xml = xhr.responseXML;
                    if (xml && xml.documentElement) {
                      responses.xml = xml;
                    }
                    try {
                      responses.text = xhr.responseText;
                    } catch (e) {
                    }
                    try {
                      statusText = xhr.statusText;
                    } catch (e) {
                      statusText = '';
                    }
                    if (!status && s.isLocal && !s.crossDomain) {
                      status = responses.text ? 200 : 404;
                    } else if (status === 1223) {
                      status = 204;
                    }
                  }
                }
              } catch (firefoxAccessException) {
                if (!isAbort) {
                  complete(-1, firefoxAccessException);
                }
              }
              if (responses) {
                complete(status, statusText, responses, responseHeaders);
              }
            };
            if (!s.async) {
              callback();
            } else if (xhr.readyState === 4) {
              setTimeout(callback, 0);
            } else {
              handle = ++xhrId;
              if (xhrOnUnloadAbort) {
                if (!xhrCallbacks) {
                  xhrCallbacks = {};
                  jQuery(window).unload(xhrOnUnloadAbort);
                }
                xhrCallbacks[handle] = callback;
              }
              xhr.onreadystatechange = callback;
            }
          },
          abort: function () {
            if (callback) {
              callback(0, 1);
            }
          }
        };
      }
    });
  }
  var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp('^(?:([-+])=|)(' + core_pnum + ')([a-z%]*)$', 'i'), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
      '*': [function (prop, value) {
          var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1, maxIterations = 20;
          if (parts) {
            end = +parts[2];
            unit = parts[3] || (jQuery.cssNumber[prop] ? '' : 'px');
            if (unit !== 'px' && start) {
              start = jQuery.css(tween.elem, prop, true) || end || 1;
              do {
                scale = scale || '.5';
                start = start / scale;
                jQuery.style(tween.elem, prop, start + unit);
              } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
            }
            tween.unit = unit;
            tween.start = start;
            tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
          }
          return tween;
        }]
    };
  function createFxNow() {
    setTimeout(function () {
      fxNow = undefined;
    }, 0);
    return fxNow = jQuery.now();
  }
  function createTweens(animation, props) {
    jQuery.each(props, function (prop, value) {
      var collection = (tweeners[prop] || []).concat(tweeners['*']), index = 0, length = collection.length;
      for (; index < length; index++) {
        if (collection[index].call(animation, prop, value)) {
          return;
        }
      }
    });
  }
  function Animation(elem, properties, options) {
    var result, index = 0, tweenerIndex = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function () {
        delete tick.elem;
      }), tick = function () {
        var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }
        deferred.notifyWith(elem, [
          animation,
          percent,
          remaining
        ]);
        if (percent < 1 && length) {
          return remaining;
        } else {
          deferred.resolveWith(elem, [animation]);
          return false;
        }
      }, animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, { specialEasing: {} }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end, easing) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween;
        },
        stop: function (gotoEnd) {
          var index = 0, length = gotoEnd ? animation.tweens.length : 0;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }
          if (gotoEnd) {
            deferred.resolveWith(elem, [
              animation,
              gotoEnd
            ]);
          } else {
            deferred.rejectWith(elem, [
              animation,
              gotoEnd
            ]);
          }
          return this;
        }
      }), props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        return result;
      }
    }
    createTweens(animation, props);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      anim: animation,
      queue: animation.opts.queue,
      elem: elem
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && 'expand' in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function (props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ['*'];
      } else {
        props = props.split(' ');
      }
      var prop, index = 0, length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter: function (callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  function defaultPrefilter(elem, props, opts) {
    var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, 'fx');
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function () {
        anim.always(function () {
          hooks.unqueued--;
          if (!jQuery.queue(elem, 'fx').length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ('height' in props || 'width' in props)) {
      opts.overflow = [
        style.overflow,
        style.overflowX,
        style.overflowY
      ];
      if (jQuery.css(elem, 'display') === 'inline' && jQuery.css(elem, 'float') === 'none') {
        if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === 'inline') {
          style.display = 'inline-block';
        } else {
          style.zoom = 1;
        }
      }
    }
    if (opts.overflow) {
      style.overflow = 'hidden';
      if (!jQuery.support.shrinkWrapBlocks) {
        anim.done(function () {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
    }
    for (index in props) {
      value = props[index];
      if (rfxtypes.exec(value)) {
        delete props[index];
        toggle = toggle || value === 'toggle';
        if (value === (hidden ? 'hide' : 'show')) {
          continue;
        }
        handled.push(index);
      }
    }
    length = handled.length;
    if (length) {
      dataShow = jQuery._data(elem, 'fxshow') || jQuery._data(elem, 'fxshow', {});
      if ('hidden' in dataShow) {
        hidden = dataShow.hidden;
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function () {
          jQuery(elem).hide();
        });
      }
      anim.done(function () {
        var prop;
        jQuery.removeData(elem, 'fxshow', true);
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (index = 0; index < length; index++) {
        prop = handled[index];
        tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
        orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === 'width' || prop === 'height' ? 1 : 0;
          }
        }
      }
    }
  }
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || 'swing';
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function (percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result;
        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, false, '');
        return !result || result === 'auto' ? 0 : result;
      },
      set: function (tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.each([
    'toggle',
    'show',
    'hide'
  ], function (i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === 'boolean' || !i && jQuery.isFunction(speed) && jQuery.isFunction(easing) ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      return this.filter(isHidden).css('opacity', 0).show().end().animate({ opacity: to }, speed, easing, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty) {
            anim.stop(true);
          }
        };
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== 'string') {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || 'fx', []);
      }
      return this.each(function () {
        var dequeue = true, index = type != null && type + 'queueHooks', timers = jQuery.timers, data = jQuery._data(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    }
  });
  function genFx(type, includeWidth) {
    var which, attrs = { height: type }, i = 0;
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs['margin' + which] = attrs['padding' + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  jQuery.each({
    slideDown: genFx('show'),
    slideUp: genFx('hide'),
    slideToggle: genFx('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
        complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
      };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === 'number' ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = 'fx';
    }
    opt.old = opt.complete;
    opt.complete = function () {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.easing = {
    linear: function (p) {
      return p;
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };
  jQuery.timers = [];
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.tick = function () {
    var timer, timers = jQuery.timers, i = 0;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function (timer) {
    if (timer() && jQuery.timers.push(timer) && !timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.stop = function () {
    clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fx.step = {};
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.animated = function (elem) {
      return jQuery.grep(jQuery.timers, function (fn) {
        return elem === fn.elem;
      }).length;
    };
  }
  var rroot = /^(?:body|html)$/i;
  jQuery.fn.offset = function (options) {
    if (arguments.length) {
      return options === undefined ? this : this.each(function (i) {
        jQuery.offset.setOffset(this, options, i);
      });
    }
    var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, box = {
        top: 0,
        left: 0
      }, elem = this[0], doc = elem && elem.ownerDocument;
    if (!doc) {
      return;
    }
    if ((body = doc.body) === elem) {
      return jQuery.offset.bodyOffset(elem);
    }
    docElem = doc.documentElement;
    if (!jQuery.contains(docElem, elem)) {
      return box;
    }
    if (typeof elem.getBoundingClientRect !== 'undefined') {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    clientTop = docElem.clientTop || body.clientTop || 0;
    clientLeft = docElem.clientLeft || body.clientLeft || 0;
    scrollTop = win.pageYOffset || docElem.scrollTop;
    scrollLeft = win.pageXOffset || docElem.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  };
  jQuery.offset = {
    bodyOffset: function (body) {
      var top = body.offsetTop, left = body.offsetLeft;
      if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
        top += parseFloat(jQuery.css(body, 'marginTop')) || 0;
        left += parseFloat(jQuery.css(body, 'marginLeft')) || 0;
      }
      return {
        top: top,
        left: left
      };
    },
    setOffset: function (elem, options, i) {
      var position = jQuery.css(elem, 'position');
      if (position === 'static') {
        elem.style.position = 'relative';
      }
      var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, 'top'), curCSSLeft = jQuery.css(elem, 'left'), calculatePosition = (position === 'absolute' || position === 'fixed') && jQuery.inArray('auto', [
          curCSSTop,
          curCSSLeft
        ]) > -1, props = {}, curPosition = {}, curTop, curLeft;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ('using' in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    position: function () {
      if (!this[0]) {
        return;
      }
      var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(), parentOffset = rroot.test(offsetParent[0].nodeName) ? {
          top: 0,
          left: 0
        } : offsetParent.offset();
      offset.top -= parseFloat(jQuery.css(elem, 'marginTop')) || 0;
      offset.left -= parseFloat(jQuery.css(elem, 'marginLeft')) || 0;
      parentOffset.top += parseFloat(jQuery.css(offsetParent[0], 'borderTopWidth')) || 0;
      parentOffset.left += parseFloat(jQuery.css(offsetParent[0], 'borderLeftWidth')) || 0;
      return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left
      };
    },
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent || document.body;
        while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, 'position') === 'static')) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || document.body;
      });
    }
  });
  jQuery.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (method, prop) {
    var top = /Y/.test(prop);
    jQuery.fn[method] = function (val) {
      return jQuery.access(this, function (elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length, null);
    };
  });
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
  }
  jQuery.each({
    Height: 'height',
    Width: 'width'
  }, function (name, type) {
    jQuery.each({
      padding: 'inner' + name,
      content: type,
      '': 'outer' + name
    }, function (defaultExtra, funcName) {
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'), extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');
        return jQuery.access(this, function (elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement['client' + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
          }
          return value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  window.jQuery = window.$ = jQuery;
  if (typeof define === 'function' && define.amd && define.amd.jQuery) {
    define('jquery', [], function () {
      return jQuery;
    });
  }
}(window));
(function (root, doc, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function ($) {
      factory($, root, doc);
      return $.mobile;
    });
  } else {
    factory(root.jQuery, root, doc);
  }
}(this, document, function (jQuery, window, document, undefined) {
  (function ($) {
    $.mobile = {};
  }(jQuery));
  (function ($, window, undefined) {
    var nsNormalizeDict = {};
    $.mobile = $.extend($.mobile, {
      version: '1.3.0',
      ns: '',
      subPageUrlKey: 'ui-page',
      activePageClass: 'ui-page-active',
      activeBtnClass: 'ui-btn-active',
      focusClass: 'ui-focus',
      ajaxEnabled: true,
      hashListeningEnabled: true,
      linkBindingEnabled: true,
      defaultPageTransition: 'fade',
      maxTransitionWidth: false,
      minScrollBack: 250,
      touchOverflowEnabled: false,
      defaultDialogTransition: 'pop',
      pageLoadErrorMessage: 'Error Loading Page',
      pageLoadErrorMessageTheme: 'e',
      phonegapNavigationEnabled: false,
      autoInitializePage: true,
      pushStateEnabled: true,
      ignoreContentEnabled: false,
      orientationChangeEnabled: true,
      buttonMarkup: { hoverDelay: 200 },
      window: $(window),
      document: $(document),
      keyCode: {
        ALT: 18,
        BACKSPACE: 8,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91
      },
      behaviors: {},
      silentScroll: function (ypos) {
        if ($.type(ypos) !== 'number') {
          ypos = $.mobile.defaultHomeScroll;
        }
        $.event.special.scrollstart.enabled = false;
        setTimeout(function () {
          window.scrollTo(0, ypos);
          $.mobile.document.trigger('silentscroll', {
            x: 0,
            y: ypos
          });
        }, 20);
        setTimeout(function () {
          $.event.special.scrollstart.enabled = true;
        }, 150);
      },
      nsNormalizeDict: nsNormalizeDict,
      nsNormalize: function (prop) {
        if (!prop) {
          return;
        }
        return nsNormalizeDict[prop] || (nsNormalizeDict[prop] = $.camelCase($.mobile.ns + prop));
      },
      getInheritedTheme: function (el, defaultTheme) {
        var e = el[0], ltr = '', re = /ui-(bar|body|overlay)-([a-z])\b/, c, m;
        while (e) {
          c = e.className || '';
          if (c && (m = re.exec(c)) && (ltr = m[2])) {
            break;
          }
          e = e.parentNode;
        }
        return ltr || defaultTheme || 'a';
      },
      closestPageData: function ($target) {
        return $target.closest(':jqmData(role="page"), :jqmData(role="dialog")').data('mobile-page');
      },
      enhanceable: function ($set) {
        return this.haveParents($set, 'enhance');
      },
      hijackable: function ($set) {
        return this.haveParents($set, 'ajax');
      },
      haveParents: function ($set, attr) {
        if (!$.mobile.ignoreContentEnabled) {
          return $set;
        }
        var count = $set.length, $newSet = $(), e, $element, excluded;
        for (var i = 0; i < count; i++) {
          $element = $set.eq(i);
          excluded = false;
          e = $set[i];
          while (e) {
            var c = e.getAttribute ? e.getAttribute('data-' + $.mobile.ns + attr) : '';
            if (c === 'false') {
              excluded = true;
              break;
            }
            e = e.parentNode;
          }
          if (!excluded) {
            $newSet = $newSet.add($element);
          }
        }
        return $newSet;
      },
      getScreenHeight: function () {
        return window.innerHeight || $.mobile.window.height();
      }
    }, $.mobile);
    $.fn.jqmData = function (prop, value) {
      var result;
      if (typeof prop !== 'undefined') {
        if (prop) {
          prop = $.mobile.nsNormalize(prop);
        }
        if (arguments.length < 2 || value === undefined) {
          result = this.data(prop);
        } else {
          result = this.data(prop, value);
        }
      }
      return result;
    };
    $.jqmData = function (elem, prop, value) {
      var result;
      if (typeof prop !== 'undefined') {
        result = $.data(elem, prop ? $.mobile.nsNormalize(prop) : prop, value);
      }
      return result;
    };
    $.fn.jqmRemoveData = function (prop) {
      return this.removeData($.mobile.nsNormalize(prop));
    };
    $.jqmRemoveData = function (elem, prop) {
      return $.removeData(elem, $.mobile.nsNormalize(prop));
    };
    $.fn.removeWithDependents = function () {
      $.removeWithDependents(this);
    };
    $.removeWithDependents = function (elem) {
      var $elem = $(elem);
      ($elem.jqmData('dependents') || $()).remove();
      $elem.remove();
    };
    $.fn.addDependents = function (newDependents) {
      $.addDependents($(this), newDependents);
    };
    $.addDependents = function (elem, newDependents) {
      var dependents = $(elem).jqmData('dependents') || $();
      $(elem).jqmData('dependents', $.merge(dependents, newDependents));
    };
    $.fn.getEncodedText = function () {
      return $('<div/>').text($(this).text()).html();
    };
    $.fn.jqmEnhanceable = function () {
      return $.mobile.enhanceable(this);
    };
    $.fn.jqmHijackable = function () {
      return $.mobile.hijackable(this);
    };
    var oldFind = $.find, jqmDataRE = /:jqmData\(([^)]*)\)/g;
    $.find = function (selector, context, ret, extra) {
      selector = selector.replace(jqmDataRE, '[data-' + ($.mobile.ns || '') + '$1]');
      return oldFind.call(this, selector, context, ret, extra);
    };
    $.extend($.find, oldFind);
    $.find.matches = function (expr, set) {
      return $.find(expr, null, null, set);
    };
    $.find.matchesSelector = function (node, expr) {
      return $.find(expr, null, null, [node]).length > 0;
    };
  }(jQuery, this));
  (function ($, undefined) {
    var uuid = 0, slice = Array.prototype.slice, _cleanData = $.cleanData;
    $.cleanData = function (elems) {
      for (var i = 0, elem; (elem = elems[i]) != null; i++) {
        try {
          $(elem).triggerHandler('remove');
        } catch (e) {
        }
      }
      _cleanData(elems);
    };
    $.widget = function (name, base, prototype) {
      var fullName, existingConstructor, constructor, basePrototype, namespace = name.split('.')[0];
      name = name.split('.')[1];
      fullName = namespace + '-' + name;
      if (!prototype) {
        prototype = base;
        base = $.Widget;
      }
      $.expr[':'][fullName.toLowerCase()] = function (elem) {
        return !!$.data(elem, fullName);
      };
      $[namespace] = $[namespace] || {};
      existingConstructor = $[namespace][name];
      constructor = $[namespace][name] = function (options, element) {
        if (!this._createWidget) {
          return new constructor(options, element);
        }
        if (arguments.length) {
          this._createWidget(options, element);
        }
      };
      $.extend(constructor, existingConstructor, {
        version: prototype.version,
        _proto: $.extend({}, prototype),
        _childConstructors: []
      });
      basePrototype = new base();
      basePrototype.options = $.widget.extend({}, basePrototype.options);
      $.each(prototype, function (prop, value) {
        if ($.isFunction(value)) {
          prototype[prop] = function () {
            var _super = function () {
                return base.prototype[prop].apply(this, arguments);
              }, _superApply = function (args) {
                return base.prototype[prop].apply(this, args);
              };
            return function () {
              var __super = this._super, __superApply = this._superApply, returnValue;
              this._super = _super;
              this._superApply = _superApply;
              returnValue = value.apply(this, arguments);
              this._super = __super;
              this._superApply = __superApply;
              return returnValue;
            };
          }();
        }
      });
      constructor.prototype = $.widget.extend(basePrototype, { widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name }, prototype, {
        constructor: constructor,
        namespace: namespace,
        widgetName: name,
        widgetFullName: fullName
      });
      if (existingConstructor) {
        $.each(existingConstructor._childConstructors, function (i, child) {
          var childPrototype = child.prototype;
          $.widget(childPrototype.namespace + '.' + childPrototype.widgetName, constructor, child._proto);
        });
        delete existingConstructor._childConstructors;
      } else {
        base._childConstructors.push(constructor);
      }
      $.widget.bridge(name, constructor);
    };
    $.widget.extend = function (target) {
      var input = slice.call(arguments, 1), inputIndex = 0, inputLength = input.length, key, value;
      for (; inputIndex < inputLength; inputIndex++) {
        for (key in input[inputIndex]) {
          value = input[inputIndex][key];
          if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
            if ($.isPlainObject(value)) {
              target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value);
            } else {
              target[key] = value;
            }
          }
        }
      }
      return target;
    };
    $.widget.bridge = function (name, object) {
      var fullName = object.prototype.widgetFullName || name;
      $.fn[name] = function (options) {
        var isMethodCall = typeof options === 'string', args = slice.call(arguments, 1), returnValue = this;
        options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
        if (isMethodCall) {
          this.each(function () {
            var methodValue, instance = $.data(this, fullName);
            if (!instance) {
              return $.error('cannot call methods on ' + name + ' prior to initialization; ' + 'attempted to call method \'' + options + '\'');
            }
            if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
              return $.error('no such method \'' + options + '\' for ' + name + ' widget instance');
            }
            methodValue = instance[options].apply(instance, args);
            if (methodValue !== instance && methodValue !== undefined) {
              returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
              return false;
            }
          });
        } else {
          this.each(function () {
            var instance = $.data(this, fullName);
            if (instance) {
              instance.option(options || {})._init();
            } else {
              $.data(this, fullName, new object(options, this));
            }
          });
        }
        return returnValue;
      };
    };
    $.Widget = function () {
    };
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
      widgetName: 'widget',
      widgetEventPrefix: '',
      defaultElement: '<div>',
      options: {
        disabled: false,
        create: null
      },
      _createWidget: function (options, element) {
        element = $(element || this.defaultElement || this)[0];
        this.element = $(element);
        this.uuid = uuid++;
        this.eventNamespace = '.' + this.widgetName + this.uuid;
        this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
        this.bindings = $();
        this.hoverable = $();
        this.focusable = $();
        if (element !== this) {
          $.data(element, this.widgetFullName, this);
          this._on(true, this.element, {
            remove: function (event) {
              if (event.target === element) {
                this.destroy();
              }
            }
          });
          this.document = $(element.style ? element.ownerDocument : element.document || element);
          this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
        }
        this._create();
        this._trigger('create', null, this._getCreateEventData());
        this._init();
      },
      _getCreateOptions: $.noop,
      _getCreateEventData: $.noop,
      _create: $.noop,
      _init: $.noop,
      destroy: function () {
        this._destroy();
        this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
        this.widget().unbind(this.eventNamespace).removeAttr('aria-disabled').removeClass(this.widgetFullName + '-disabled ' + 'ui-state-disabled');
        this.bindings.unbind(this.eventNamespace);
        this.hoverable.removeClass('ui-state-hover');
        this.focusable.removeClass('ui-state-focus');
      },
      _destroy: $.noop,
      widget: function () {
        return this.element;
      },
      option: function (key, value) {
        var options = key, parts, curOption, i;
        if (arguments.length === 0) {
          return $.widget.extend({}, this.options);
        }
        if (typeof key === 'string') {
          options = {};
          parts = key.split('.');
          key = parts.shift();
          if (parts.length) {
            curOption = options[key] = $.widget.extend({}, this.options[key]);
            for (i = 0; i < parts.length - 1; i++) {
              curOption[parts[i]] = curOption[parts[i]] || {};
              curOption = curOption[parts[i]];
            }
            key = parts.pop();
            if (value === undefined) {
              return curOption[key] === undefined ? null : curOption[key];
            }
            curOption[key] = value;
          } else {
            if (value === undefined) {
              return this.options[key] === undefined ? null : this.options[key];
            }
            options[key] = value;
          }
        }
        this._setOptions(options);
        return this;
      },
      _setOptions: function (options) {
        var key;
        for (key in options) {
          this._setOption(key, options[key]);
        }
        return this;
      },
      _setOption: function (key, value) {
        this.options[key] = value;
        if (key === 'disabled') {
          this.widget().toggleClass(this.widgetFullName + '-disabled ui-state-disabled', !!value).attr('aria-disabled', value);
          this.hoverable.removeClass('ui-state-hover');
          this.focusable.removeClass('ui-state-focus');
        }
        return this;
      },
      enable: function () {
        return this._setOption('disabled', false);
      },
      disable: function () {
        return this._setOption('disabled', true);
      },
      _on: function (suppressDisabledCheck, element, handlers) {
        var delegateElement, instance = this;
        if (typeof suppressDisabledCheck !== 'boolean') {
          handlers = element;
          element = suppressDisabledCheck;
          suppressDisabledCheck = false;
        }
        if (!handlers) {
          handlers = element;
          element = this.element;
          delegateElement = this.widget();
        } else {
          element = delegateElement = $(element);
          this.bindings = this.bindings.add(element);
        }
        $.each(handlers, function (event, handler) {
          function handlerProxy() {
            if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass('ui-state-disabled'))) {
              return;
            }
            return (typeof handler === 'string' ? instance[handler] : handler).apply(instance, arguments);
          }
          if (typeof handler !== 'string') {
            handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
          }
          var match = event.match(/^(\w+)\s*(.*)$/), eventName = match[1] + instance.eventNamespace, selector = match[2];
          if (selector) {
            delegateElement.delegate(selector, eventName, handlerProxy);
          } else {
            element.bind(eventName, handlerProxy);
          }
        });
      },
      _off: function (element, eventName) {
        eventName = (eventName || '').split(' ').join(this.eventNamespace + ' ') + this.eventNamespace;
        element.unbind(eventName).undelegate(eventName);
      },
      _delay: function (handler, delay) {
        function handlerProxy() {
          return (typeof handler === 'string' ? instance[handler] : handler).apply(instance, arguments);
        }
        var instance = this;
        return setTimeout(handlerProxy, delay || 0);
      },
      _hoverable: function (element) {
        this.hoverable = this.hoverable.add(element);
        this._on(element, {
          mouseenter: function (event) {
            $(event.currentTarget).addClass('ui-state-hover');
          },
          mouseleave: function (event) {
            $(event.currentTarget).removeClass('ui-state-hover');
          }
        });
      },
      _focusable: function (element) {
        this.focusable = this.focusable.add(element);
        this._on(element, {
          focusin: function (event) {
            $(event.currentTarget).addClass('ui-state-focus');
          },
          focusout: function (event) {
            $(event.currentTarget).removeClass('ui-state-focus');
          }
        });
      },
      _trigger: function (type, event, data) {
        var prop, orig, callback = this.options[type];
        data = data || {};
        event = $.Event(event);
        event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
        event.target = this.element[0];
        orig = event.originalEvent;
        if (orig) {
          for (prop in orig) {
            if (!(prop in event)) {
              event[prop] = orig[prop];
            }
          }
        }
        this.element.trigger(event, data);
        return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
      }
    };
    $.each({
      show: 'fadeIn',
      hide: 'fadeOut'
    }, function (method, defaultEffect) {
      $.Widget.prototype['_' + method] = function (element, options, callback) {
        if (typeof options === 'string') {
          options = { effect: options };
        }
        var hasOptions, effectName = !options ? method : options === true || typeof options === 'number' ? defaultEffect : options.effect || defaultEffect;
        options = options || {};
        if (typeof options === 'number') {
          options = { duration: options };
        }
        hasOptions = !$.isEmptyObject(options);
        options.complete = callback;
        if (options.delay) {
          element.delay(options.delay);
        }
        if (hasOptions && $.effects && $.effects.effect[effectName]) {
          element[method](options);
        } else if (effectName !== method && element[effectName]) {
          element[effectName](options.duration, options.easing, callback);
        } else {
          element.queue(function (next) {
            $(this)[method]();
            if (callback) {
              callback.call(element[0]);
            }
            next();
          });
        }
      };
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.widget', {
      _createWidget: function () {
        $.Widget.prototype._createWidget.apply(this, arguments);
        this._trigger('init');
      },
      _getCreateOptions: function () {
        var elem = this.element, options = {};
        $.each(this.options, function (option) {
          var value = elem.jqmData(option.replace(/[A-Z]/g, function (c) {
              return '-' + c.toLowerCase();
            }));
          if (value !== undefined) {
            options[option] = value;
          }
        });
        return options;
      },
      enhanceWithin: function (target, useKeepNative) {
        this.enhance($(this.options.initSelector, $(target)), useKeepNative);
      },
      enhance: function (targets, useKeepNative) {
        var page, keepNative, $widgetElements = $(targets), self = this;
        $widgetElements = $.mobile.enhanceable($widgetElements);
        if (useKeepNative && $widgetElements.length) {
          page = $.mobile.closestPageData($widgetElements);
          keepNative = page && page.keepNativeSelector() || '';
          $widgetElements = $widgetElements.not(keepNative);
        }
        $widgetElements[this.widgetName]();
      },
      raise: function (msg) {
        throw 'Widget [' + this.widgetName + ']: ' + msg;
      }
    });
  }(jQuery));
  (function ($, window) {
    $.extend($.mobile, {
      loadingMessageTextVisible: undefined,
      loadingMessageTheme: undefined,
      loadingMessage: undefined,
      showPageLoadingMsg: function (theme, msgText, textonly) {
        $.mobile.loading('show', theme, msgText, textonly);
      },
      hidePageLoadingMsg: function () {
        $.mobile.loading('hide');
      },
      loading: function () {
        this.loaderWidget.loader.apply(this.loaderWidget, arguments);
      }
    });
    var loaderClass = 'ui-loader', $html = $('html'), $window = $.mobile.window;
    $.widget('mobile.loader', {
      options: {
        theme: 'a',
        textVisible: false,
        html: '',
        text: 'loading'
      },
      defaultHtml: '<div class=\'' + loaderClass + '\'>' + '<span class=\'ui-icon ui-icon-loading\'></span>' + '<h1></h1>' + '</div>',
      fakeFixLoader: function () {
        var activeBtn = $('.' + $.mobile.activeBtnClass).first();
        this.element.css({ top: $.support.scrollTop && $window.scrollTop() + $window.height() / 2 || activeBtn.length && activeBtn.offset().top || 100 });
      },
      checkLoaderPosition: function () {
        var offset = this.element.offset(), scrollTop = $window.scrollTop(), screenHeight = $.mobile.getScreenHeight();
        if (offset.top < scrollTop || offset.top - scrollTop > screenHeight) {
          this.element.addClass('ui-loader-fakefix');
          this.fakeFixLoader();
          $window.unbind('scroll', this.checkLoaderPosition).bind('scroll', $.proxy(this.fakeFixLoader, this));
        }
      },
      resetHtml: function () {
        this.element.html($(this.defaultHtml).html());
      },
      show: function (theme, msgText, textonly) {
        var textVisible, message, $header, loadSettings;
        this.resetHtml();
        if ($.type(theme) === 'object') {
          loadSettings = $.extend({}, this.options, theme);
          theme = loadSettings.theme || $.mobile.loadingMessageTheme;
        } else {
          loadSettings = this.options;
          theme = theme || $.mobile.loadingMessageTheme || loadSettings.theme;
        }
        message = msgText || $.mobile.loadingMessage || loadSettings.text;
        $html.addClass('ui-loading');
        if ($.mobile.loadingMessage !== false || loadSettings.html) {
          if ($.mobile.loadingMessageTextVisible !== undefined) {
            textVisible = $.mobile.loadingMessageTextVisible;
          } else {
            textVisible = loadSettings.textVisible;
          }
          this.element.attr('class', loaderClass + ' ui-corner-all ui-body-' + theme + ' ui-loader-' + (textVisible || msgText || theme.text ? 'verbose' : 'default') + (loadSettings.textonly || textonly ? ' ui-loader-textonly' : ''));
          if (loadSettings.html) {
            this.element.html(loadSettings.html);
          } else {
            this.element.find('h1').text(message);
          }
          this.element.appendTo($.mobile.pageContainer);
          this.checkLoaderPosition();
          $window.bind('scroll', $.proxy(this.checkLoaderPosition, this));
        }
      },
      hide: function () {
        $html.removeClass('ui-loading');
        if ($.mobile.loadingMessage) {
          this.element.removeClass('ui-loader-fakefix');
        }
        $.mobile.window.unbind('scroll', this.fakeFixLoader);
        $.mobile.window.unbind('scroll', this.checkLoaderPosition);
      }
    });
    $window.bind('pagecontainercreate', function () {
      $.mobile.loaderWidget = $.mobile.loaderWidget || $($.mobile.loader.prototype.defaultHtml).loader();
    });
  }(jQuery, this));
  (function ($, window, undefined) {
    var str_hashchange = 'hashchange', doc = document, fake_onhashchange, special = $.event.special, doc_mode = doc.documentMode, supports_onhashchange = 'on' + str_hashchange in window && (doc_mode === undefined || doc_mode > 7);
    function get_fragment(url) {
      url = url || location.href;
      return '#' + url.replace(/^[^#]*#?(.*)$/, '$1');
    }
    ;
    $.fn[str_hashchange] = function (fn) {
      return fn ? this.bind(str_hashchange, fn) : this.trigger(str_hashchange);
    };
    $.fn[str_hashchange].delay = 50;
    special[str_hashchange] = $.extend(special[str_hashchange], {
      setup: function () {
        if (supports_onhashchange) {
          return false;
        }
        $(fake_onhashchange.start);
      },
      teardown: function () {
        if (supports_onhashchange) {
          return false;
        }
        $(fake_onhashchange.stop);
      }
    });
    fake_onhashchange = function () {
      var self = {}, timeout_id, last_hash = get_fragment(), fn_retval = function (val) {
          return val;
        }, history_set = fn_retval, history_get = fn_retval;
      self.start = function () {
        timeout_id || poll();
      };
      self.stop = function () {
        timeout_id && clearTimeout(timeout_id);
        timeout_id = undefined;
      };
      function poll() {
        var hash = get_fragment(), history_hash = history_get(last_hash);
        if (hash !== last_hash) {
          history_set(last_hash = hash, history_hash);
          $(window).trigger(str_hashchange);
        } else if (history_hash !== last_hash) {
          location.href = location.href.replace(/#.*/, '') + history_hash;
        }
        timeout_id = setTimeout(poll, $.fn[str_hashchange].delay);
      }
      ;
      window.attachEvent && !window.addEventListener && !supports_onhashchange && function () {
        var iframe, iframe_src;
        self.start = function () {
          if (!iframe) {
            iframe_src = $.fn[str_hashchange].src;
            iframe_src = iframe_src && iframe_src + get_fragment();
            iframe = $('<iframe tabindex="-1" title="empty"/>').hide().one('load', function () {
              iframe_src || history_set(get_fragment());
              poll();
            }).attr('src', iframe_src || 'javascript:0').insertAfter('body')[0].contentWindow;
            doc.onpropertychange = function () {
              try {
                if (event.propertyName === 'title') {
                  iframe.document.title = doc.title;
                }
              } catch (e) {
              }
            };
          }
        };
        self.stop = fn_retval;
        history_get = function () {
          return get_fragment(iframe.location.href);
        };
        history_set = function (hash, history_hash) {
          var iframe_doc = iframe.document, domain = $.fn[str_hashchange].domain;
          if (hash !== history_hash) {
            iframe_doc.title = doc.title;
            iframe_doc.open();
            domain && iframe_doc.write('<script>document.domain="' + domain + '"</script>');
            iframe_doc.close();
            iframe.location.hash = hash;
          }
        };
      }();
      return self;
    }();
  }(jQuery, this));
  (function ($, undefined) {
    window.matchMedia = window.matchMedia || function (doc, undefined) {
      var bool, docElem = doc.documentElement, refNode = docElem.firstElementChild || docElem.firstChild, fakeBody = doc.createElement('body'), div = doc.createElement('div');
      div.id = 'mq-test-1';
      div.style.cssText = 'position:absolute;top:-100em';
      fakeBody.style.background = 'none';
      fakeBody.appendChild(div);
      return function (q) {
        div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>';
        docElem.insertBefore(fakeBody, refNode);
        bool = div.offsetWidth === 42;
        docElem.removeChild(fakeBody);
        return {
          matches: bool,
          media: q
        };
      };
    }(document);
    $.mobile.media = function (q) {
      return window.matchMedia(q).matches;
    };
  }(jQuery));
  (function ($, undefined) {
    var support = { touch: 'ontouchend' in document };
    $.mobile.support = $.mobile.support || {};
    $.extend($.support, support);
    $.extend($.mobile.support, support);
  }(jQuery));
  (function ($, undefined) {
    $.extend($.support, { orientation: 'orientation' in window && 'onorientationchange' in window });
  }(jQuery));
  (function ($, undefined) {
    function propExists(prop) {
      var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1), props = (prop + ' ' + vendors.join(uc_prop + ' ') + uc_prop).split(' ');
      for (var v in props) {
        if (fbCSS[props[v]] !== undefined) {
          return true;
        }
      }
    }
    var fakeBody = $('<body>').prependTo('html'), fbCSS = fakeBody[0].style, vendors = [
        'Webkit',
        'Moz',
        'O'
      ], webos = 'palmGetResource' in window, opera = window.opera, operamini = window.operamini && {}.toString.call(window.operamini) === '[object OperaMini]', bb = window.blackberry && !propExists('-webkit-transform');
    function validStyle(prop, value, check_vend) {
      var div = document.createElement('div'), uc = function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1);
        }, vend_pref = function (vend) {
          if (vend === '') {
            return '';
          } else {
            return '-' + vend.charAt(0).toLowerCase() + vend.substr(1) + '-';
          }
        }, check_style = function (vend) {
          var vend_prop = vend_pref(vend) + prop + ': ' + value + ';', uc_vend = uc(vend), propStyle = uc_vend + (uc_vend === '' ? prop : uc(prop));
          div.setAttribute('style', vend_prop);
          if (!!div.style[propStyle]) {
            ret = true;
          }
        }, check_vends = check_vend ? check_vend : vendors, ret;
      for (var i = 0; i < check_vends.length; i++) {
        check_style(check_vends[i]);
      }
      return !!ret;
    }
    function transform3dTest() {
      var mqProp = 'transform-3d', ret = $.mobile.media('(-' + vendors.join('-' + mqProp + '),(-') + '-' + mqProp + '),(' + mqProp + ')');
      if (ret) {
        return !!ret;
      }
      var el = document.createElement('div'), transforms = {
          'MozTransform': '-moz-transform',
          'transform': 'transform'
        };
      fakeBody.append(el);
      for (var t in transforms) {
        if (el.style[t] !== undefined) {
          el.style[t] = 'translate3d( 100px, 1px, 1px )';
          ret = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
      }
      return !!ret && ret !== 'none';
    }
    function baseTagTest() {
      var fauxBase = location.protocol + '//' + location.host + location.pathname + 'ui-dir/', base = $('head base'), fauxEle = null, href = '', link, rebase;
      if (!base.length) {
        base = fauxEle = $('<base>', { 'href': fauxBase }).appendTo('head');
      } else {
        href = base.attr('href');
      }
      link = $('<a href=\'testurl\' />').prependTo(fakeBody);
      rebase = link[0].href;
      base[0].href = href || location.pathname;
      if (fauxEle) {
        fauxEle.remove();
      }
      return rebase.indexOf(fauxBase) === 0;
    }
    function cssPointerEventsTest() {
      var element = document.createElement('x'), documentElement = document.documentElement, getComputedStyle = window.getComputedStyle, supports;
      if (!('pointerEvents' in element.style)) {
        return false;
      }
      element.style.pointerEvents = 'auto';
      element.style.pointerEvents = 'x';
      documentElement.appendChild(element);
      supports = getComputedStyle && getComputedStyle(element, '').pointerEvents === 'auto';
      documentElement.removeChild(element);
      return !!supports;
    }
    function boundingRect() {
      var div = document.createElement('div');
      return typeof div.getBoundingClientRect !== 'undefined';
    }
    $.extend($.mobile, { browser: {} });
    $.mobile.browser.oldIE = function () {
      var v = 3, div = document.createElement('div'), a = div.all || [];
      do {
        div.innerHTML = '<!--[if gt IE ' + ++v + ']><br><![endif]-->';
      } while (a[0]);
      return v > 4 ? v : !v;
    }();
    function fixedPosition() {
      var w = window, ua = navigator.userAgent, platform = navigator.platform, wkmatch = ua.match(/AppleWebKit\/([0-9]+)/), wkversion = !!wkmatch && wkmatch[1], ffmatch = ua.match(/Fennec\/([0-9]+)/), ffversion = !!ffmatch && ffmatch[1], operammobilematch = ua.match(/Opera Mobi\/([0-9]+)/), omversion = !!operammobilematch && operammobilematch[1];
      if ((platform.indexOf('iPhone') > -1 || platform.indexOf('iPad') > -1 || platform.indexOf('iPod') > -1) && wkversion && wkversion < 534 || w.operamini && {}.toString.call(w.operamini) === '[object OperaMini]' || operammobilematch && omversion < 7458 || ua.indexOf('Android') > -1 && wkversion && wkversion < 533 || ffversion && ffversion < 6 || 'palmGetResource' in window && wkversion && wkversion < 534 || ua.indexOf('MeeGo') > -1 && ua.indexOf('NokiaBrowser/8.5.0') > -1) {
        return false;
      }
      return true;
    }
    $.extend($.support, {
      cssTransitions: 'WebKitTransitionEvent' in window || validStyle('transition', 'height 100ms linear', [
        'Webkit',
        'Moz',
        ''
      ]) && !$.mobile.browser.oldIE && !opera,
      pushState: 'pushState' in history && 'replaceState' in history && window.navigator.userAgent.search(/CriOS/) === -1,
      mediaquery: $.mobile.media('only all'),
      cssPseudoElement: !!propExists('content'),
      touchOverflow: !!propExists('overflowScrolling'),
      cssTransform3d: transform3dTest(),
      boxShadow: !!propExists('boxShadow') && !bb,
      fixedPosition: fixedPosition(),
      scrollTop: ('pageXOffset' in window || 'scrollTop' in document.documentElement || 'scrollTop' in fakeBody[0]) && !webos && !operamini,
      dynamicBaseTag: baseTagTest(),
      cssPointerEvents: cssPointerEventsTest(),
      boundingRect: boundingRect()
    });
    fakeBody.remove();
    var nokiaLTE7_3 = function () {
        var ua = window.navigator.userAgent;
        return ua.indexOf('Nokia') > -1 && (ua.indexOf('Symbian/3') > -1 || ua.indexOf('Series60/5') > -1) && ua.indexOf('AppleWebKit') > -1 && ua.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/);
      }();
    $.mobile.gradeA = function () {
      return ($.support.mediaquery || $.mobile.browser.oldIE && $.mobile.browser.oldIE >= 7) && ($.support.boundingRect || $.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null);
    };
    $.mobile.ajaxBlacklist = window.blackberry && !window.WebKitPoint || operamini || nokiaLTE7_3;
    if (nokiaLTE7_3) {
      $(function () {
        $('head link[rel=\'stylesheet\']').attr('rel', 'alternate stylesheet').attr('rel', 'stylesheet');
      });
    }
    if (!$.support.boxShadow) {
      $('html').addClass('ui-mobile-nosupport-boxshadow');
    }
  }(jQuery));
  (function ($, undefined) {
    var $win = $.mobile.window, self, history;
    $.event.special.navigate = self = {
      bound: false,
      pushStateEnabled: true,
      originalEventName: undefined,
      isPushStateEnabled: function () {
        return $.support.pushState && $.mobile.pushStateEnabled === true && this.isHashChangeEnabled();
      },
      isHashChangeEnabled: function () {
        return $.mobile.hashListeningEnabled === true;
      },
      popstate: function (event) {
        var newEvent = new $.Event('navigate'), beforeNavigate = new $.Event('beforenavigate'), state = event.originalEvent.state || {}, href = location.href;
        $win.trigger(beforeNavigate);
        if (beforeNavigate.isDefaultPrevented()) {
          return;
        }
        if (event.historyState) {
          $.extend(state, event.historyState);
        }
        newEvent.originalEvent = event;
        setTimeout(function () {
          $win.trigger(newEvent, { state: state });
        }, 0);
      },
      hashchange: function (event, data) {
        var newEvent = new $.Event('navigate'), beforeNavigate = new $.Event('beforenavigate');
        $win.trigger(beforeNavigate);
        if (beforeNavigate.isDefaultPrevented()) {
          return;
        }
        newEvent.originalEvent = event;
        $win.trigger(newEvent, { state: event.hashchangeState || {} });
      },
      setup: function (data, namespaces) {
        if (self.bound) {
          return;
        }
        self.bound = true;
        if (self.isPushStateEnabled()) {
          self.originalEventName = 'popstate';
          $win.bind('popstate.navigate', self.popstate);
        } else if (self.isHashChangeEnabled()) {
          self.originalEventName = 'hashchange';
          $win.bind('hashchange.navigate', self.hashchange);
        }
      }
    };
  }(jQuery));
  (function ($, undefined) {
    var path, documentBase, $base, dialogHashKey = '&ui-state=dialog';
    $.mobile.path = path = {
      uiStateKey: '&ui-state',
      urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
      getLocation: function (url) {
        var uri = url ? this.parseUrl(url) : location, hash = this.parseUrl(url || location.href).hash;
        hash = hash === '#' ? '' : hash;
        return uri.protocol + '//' + uri.host + uri.pathname + uri.search + hash;
      },
      parseLocation: function () {
        return this.parseUrl(this.getLocation());
      },
      parseUrl: function (url) {
        if ($.type(url) === 'object') {
          return url;
        }
        var matches = path.urlParseRE.exec(url || '') || [];
        return {
          href: matches[0] || '',
          hrefNoHash: matches[1] || '',
          hrefNoSearch: matches[2] || '',
          domain: matches[3] || '',
          protocol: matches[4] || '',
          doubleSlash: matches[5] || '',
          authority: matches[6] || '',
          username: matches[8] || '',
          password: matches[9] || '',
          host: matches[10] || '',
          hostname: matches[11] || '',
          port: matches[12] || '',
          pathname: matches[13] || '',
          directory: matches[14] || '',
          filename: matches[15] || '',
          search: matches[16] || '',
          hash: matches[17] || ''
        };
      },
      makePathAbsolute: function (relPath, absPath) {
        if (relPath && relPath.charAt(0) === '/') {
          return relPath;
        }
        relPath = relPath || '';
        absPath = absPath ? absPath.replace(/^\/|(\/[^\/]*|[^\/]+)$/g, '') : '';
        var absStack = absPath ? absPath.split('/') : [], relStack = relPath.split('/');
        for (var i = 0; i < relStack.length; i++) {
          var d = relStack[i];
          switch (d) {
          case '.':
            break;
          case '..':
            if (absStack.length) {
              absStack.pop();
            }
            break;
          default:
            absStack.push(d);
            break;
          }
        }
        return '/' + absStack.join('/');
      },
      isSameDomain: function (absUrl1, absUrl2) {
        return path.parseUrl(absUrl1).domain === path.parseUrl(absUrl2).domain;
      },
      isRelativeUrl: function (url) {
        return path.parseUrl(url).protocol === '';
      },
      isAbsoluteUrl: function (url) {
        return path.parseUrl(url).protocol !== '';
      },
      makeUrlAbsolute: function (relUrl, absUrl) {
        if (!path.isRelativeUrl(relUrl)) {
          return relUrl;
        }
        if (absUrl === undefined) {
          absUrl = this.documentBase;
        }
        var relObj = path.parseUrl(relUrl), absObj = path.parseUrl(absUrl), protocol = relObj.protocol || absObj.protocol, doubleSlash = relObj.protocol ? relObj.doubleSlash : relObj.doubleSlash || absObj.doubleSlash, authority = relObj.authority || absObj.authority, hasPath = relObj.pathname !== '', pathname = path.makePathAbsolute(relObj.pathname || absObj.filename, absObj.pathname), search = relObj.search || !hasPath && absObj.search || '', hash = relObj.hash;
        return protocol + doubleSlash + authority + pathname + search + hash;
      },
      addSearchParams: function (url, params) {
        var u = path.parseUrl(url), p = typeof params === 'object' ? $.param(params) : params, s = u.search || '?';
        return u.hrefNoSearch + s + (s.charAt(s.length - 1) !== '?' ? '&' : '') + p + (u.hash || '');
      },
      convertUrlToDataUrl: function (absUrl) {
        var u = path.parseUrl(absUrl);
        if (path.isEmbeddedPage(u)) {
          return u.hash.split(dialogHashKey)[0].replace(/^#/, '').replace(/\?.*$/, '');
        } else if (path.isSameDomain(u, this.documentBase)) {
          return u.hrefNoHash.replace(this.documentBase.domain, '').split(dialogHashKey)[0];
        }
        return window.decodeURIComponent(absUrl);
      },
      get: function (newPath) {
        if (newPath === undefined) {
          newPath = path.parseLocation().hash;
        }
        return path.stripHash(newPath).replace(/[^\/]*\.[^\/*]+$/, '');
      },
      set: function (path) {
        location.hash = path;
      },
      isPath: function (url) {
        return /\//.test(url);
      },
      clean: function (url) {
        return url.replace(this.documentBase.domain, '');
      },
      stripHash: function (url) {
        return url.replace(/^#/, '');
      },
      stripQueryParams: function (url) {
        return url.replace(/\?.*$/, '');
      },
      cleanHash: function (hash) {
        return path.stripHash(hash.replace(/\?.*$/, '').replace(dialogHashKey, ''));
      },
      isHashValid: function (hash) {
        return /^#[^#]+$/.test(hash);
      },
      isExternal: function (url) {
        var u = path.parseUrl(url);
        return u.protocol && u.domain !== this.documentUrl.domain ? true : false;
      },
      hasProtocol: function (url) {
        return /^(:?\w+:)/.test(url);
      },
      isEmbeddedPage: function (url) {
        var u = path.parseUrl(url);
        if (u.protocol !== '') {
          return !this.isPath(u.hash) && u.hash && (u.hrefNoHash === this.documentUrl.hrefNoHash || this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash);
        }
        return /^#/.test(u.href);
      },
      squash: function (url, resolutionUrl) {
        var state, href, cleanedUrl, search, stateIndex, isPath = this.isPath(url), uri = this.parseUrl(url), preservedHash = uri.hash, uiState = '';
        resolutionUrl = resolutionUrl || (path.isPath(url) ? path.getLocation() : path.getDocumentUrl());
        cleanedUrl = isPath ? path.stripHash(url) : url;
        cleanedUrl = path.isPath(uri.hash) ? path.stripHash(uri.hash) : cleanedUrl;
        stateIndex = cleanedUrl.indexOf(this.uiStateKey);
        if (stateIndex > -1) {
          uiState = cleanedUrl.slice(stateIndex);
          cleanedUrl = cleanedUrl.slice(0, stateIndex);
        }
        href = path.makeUrlAbsolute(cleanedUrl, resolutionUrl);
        search = this.parseUrl(href).search;
        if (isPath) {
          if (path.isPath(preservedHash) || preservedHash.replace('#', '').indexOf(this.uiStateKey) === 0) {
            preservedHash = '';
          }
          if (uiState && preservedHash.indexOf(this.uiStateKey) === -1) {
            preservedHash += uiState;
          }
          if (preservedHash.indexOf('#') === -1 && preservedHash !== '') {
            preservedHash = '#' + preservedHash;
          }
          href = path.parseUrl(href);
          href = href.protocol + '//' + href.host + href.pathname + search + preservedHash;
        } else {
          href += href.indexOf('#') > -1 ? uiState : '#' + uiState;
        }
        return href;
      },
      isPreservableHash: function (hash) {
        return hash.replace('#', '').indexOf(this.uiStateKey) === 0;
      }
    };
    path.documentUrl = path.parseLocation();
    $base = $('head').find('base');
    path.documentBase = $base.length ? path.parseUrl(path.makeUrlAbsolute($base.attr('href'), path.documentUrl.href)) : path.documentUrl;
    path.documentBaseDiffers = path.documentUrl.hrefNoHash !== path.documentBase.hrefNoHash;
    path.getDocumentUrl = function (asParsedObject) {
      return asParsedObject ? $.extend({}, path.documentUrl) : path.documentUrl.href;
    };
    path.getDocumentBase = function (asParsedObject) {
      return asParsedObject ? $.extend({}, path.documentBase) : path.documentBase.href;
    };
  }(jQuery));
  (function ($, undefined) {
    var path = $.mobile.path;
    $.mobile.History = function (stack, index) {
      this.stack = stack || [];
      this.activeIndex = index || 0;
    };
    $.extend($.mobile.History.prototype, {
      getActive: function () {
        return this.stack[this.activeIndex];
      },
      getLast: function () {
        return this.stack[this.previousIndex];
      },
      getNext: function () {
        return this.stack[this.activeIndex + 1];
      },
      getPrev: function () {
        return this.stack[this.activeIndex - 1];
      },
      add: function (url, data) {
        data = data || {};
        if (this.getNext()) {
          this.clearForward();
        }
        if (data.hash && data.hash.indexOf('#') === -1) {
          data.hash = '#' + data.hash;
        }
        data.url = url;
        this.stack.push(data);
        this.activeIndex = this.stack.length - 1;
      },
      clearForward: function () {
        this.stack = this.stack.slice(0, this.activeIndex + 1);
      },
      find: function (url, stack, earlyReturn) {
        stack = stack || this.stack;
        var entry, i, length = stack.length, index;
        for (i = 0; i < length; i++) {
          entry = stack[i];
          if (decodeURIComponent(url) === decodeURIComponent(entry.url) || decodeURIComponent(url) === decodeURIComponent(entry.hash)) {
            index = i;
            if (earlyReturn) {
              return index;
            }
          }
        }
        return index;
      },
      closest: function (url) {
        var closest, a = this.activeIndex;
        closest = this.find(url, this.stack.slice(0, a));
        if (closest === undefined) {
          closest = this.find(url, this.stack.slice(a), true);
          closest = closest === undefined ? closest : closest + a;
        }
        return closest;
      },
      direct: function (opts) {
        var newActiveIndex = this.closest(opts.url), a = this.activeIndex;
        if (newActiveIndex !== undefined) {
          this.activeIndex = newActiveIndex;
          this.previousIndex = a;
        }
        if (newActiveIndex < a) {
          (opts.present || opts.back || $.noop)(this.getActive(), 'back');
        } else if (newActiveIndex > a) {
          (opts.present || opts.forward || $.noop)(this.getActive(), 'forward');
        } else if (newActiveIndex === undefined && opts.missing) {
          opts.missing(this.getActive());
        }
      }
    });
  }(jQuery));
  (function ($, undefined) {
    var path = $.mobile.path;
    $.mobile.Navigator = function (history) {
      this.history = history;
      this.ignoreInitialHashChange = true;
      setTimeout($.proxy(function () {
        this.ignoreInitialHashChange = false;
      }, this), 200);
      $.mobile.window.bind({
        'popstate.history': $.proxy(this.popstate, this),
        'hashchange.history': $.proxy(this.hashchange, this)
      });
    };
    $.extend($.mobile.Navigator.prototype, {
      squash: function (url, data) {
        var state, href, hash = path.isPath(url) ? path.stripHash(url) : url;
        href = path.squash(url);
        state = $.extend({
          hash: hash,
          url: href
        }, data);
        window.history.replaceState(state, state.title || document.title, href);
        return state;
      },
      hash: function (url, href) {
        var parsed, loc, hash;
        parsed = path.parseUrl(url);
        loc = path.parseLocation();
        if (loc.pathname + loc.search === parsed.pathname + parsed.search) {
          hash = parsed.hash ? parsed.hash : parsed.pathname + parsed.search;
        } else if (path.isPath(url)) {
          var resolved = path.parseUrl(href);
          hash = resolved.pathname + resolved.search + (path.isPreservableHash(resolved.hash) ? resolved.hash.replace('#', '') : '');
        } else {
          hash = url;
        }
        return hash;
      },
      go: function (url, data, noEvents) {
        var state, href, hash, popstateEvent, isPopStateEvent = $.event.special.navigate.isPushStateEnabled();
        href = path.squash(url);
        hash = this.hash(url, href);
        if (noEvents && hash !== path.stripHash(path.parseLocation().hash)) {
          this.preventNextHashChange = noEvents;
        }
        this.preventHashAssignPopState = true;
        window.location.hash = hash;
        this.preventHashAssignPopState = false;
        state = $.extend({
          url: href,
          hash: hash,
          title: document.title
        }, data);
        if (isPopStateEvent) {
          popstateEvent = new $.Event('popstate');
          popstateEvent.originalEvent = {
            type: 'popstate',
            state: null
          };
          this.squash(url, state);
          if (!noEvents) {
            this.ignorePopState = true;
            $.mobile.window.trigger(popstateEvent);
          }
        }
        this.history.add(state.url, state);
      },
      popstate: function (event) {
        var active, hash, state, closestIndex;
        if (!$.event.special.navigate.isPushStateEnabled()) {
          return;
        }
        if (this.preventHashAssignPopState) {
          this.preventHashAssignPopState = false;
          event.stopImmediatePropagation();
          return;
        }
        if (this.ignorePopState) {
          this.ignorePopState = false;
          return;
        }
        if (!event.originalEvent.state && this.history.stack.length === 1 && this.ignoreInitialHashChange) {
          this.ignoreInitialHashChange = false;
          return;
        }
        hash = path.parseLocation().hash;
        if (!event.originalEvent.state && hash) {
          state = this.squash(hash);
          this.history.add(state.url, state);
          event.historyState = state;
          return;
        }
        this.history.direct({
          url: (event.originalEvent.state || {}).url || hash,
          present: function (historyEntry, direction) {
            event.historyState = $.extend({}, historyEntry);
            event.historyState.direction = direction;
          }
        });
      },
      hashchange: function (event) {
        var history, hash;
        if (!$.event.special.navigate.isHashChangeEnabled() || $.event.special.navigate.isPushStateEnabled()) {
          return;
        }
        if (this.preventNextHashChange) {
          this.preventNextHashChange = false;
          event.stopImmediatePropagation();
          return;
        }
        history = this.history;
        hash = path.parseLocation().hash;
        this.history.direct({
          url: hash,
          present: function (historyEntry, direction) {
            event.hashchangeState = $.extend({}, historyEntry);
            event.hashchangeState.direction = direction;
          },
          missing: function () {
            history.add(hash, {
              hash: hash,
              title: document.title
            });
          }
        });
      }
    });
  }(jQuery));
  (function ($, undefined) {
    $.mobile.navigate = function (url, data, noEvents) {
      $.mobile.navigate.navigator.go(url, data, noEvents);
    };
    $.mobile.navigate.history = new $.mobile.History();
    $.mobile.navigate.navigator = new $.mobile.Navigator($.mobile.navigate.history);
    var loc = $.mobile.path.parseLocation();
    $.mobile.navigate.history.add(loc.href, { hash: loc.hash });
  }(jQuery));
  (function ($, window, document, undefined) {
    var dataPropertyName = 'virtualMouseBindings', touchTargetPropertyName = 'virtualTouchID', virtualEventNames = 'vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel'.split(' '), touchEventProps = 'clientX clientY pageX pageY screenX screenY'.split(' '), mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [], mouseEventProps = $.event.props.concat(mouseHookProps), activeDocHandlers = {}, resetTimerID = 0, startX = 0, startY = 0, didScroll = false, clickBlockList = [], blockMouseTriggers = false, blockTouchTriggers = false, eventCaptureSupported = 'addEventListener' in document, $document = $(document), nextTouchID = 1, lastTouchID = 0, threshold;
    $.vmouse = {
      moveDistanceThreshold: 10,
      clickDistanceThreshold: 10,
      resetTimerDuration: 1500
    };
    function getNativeEvent(event) {
      while (event && typeof event.originalEvent !== 'undefined') {
        event = event.originalEvent;
      }
      return event;
    }
    function createVirtualEvent(event, eventType) {
      var t = event.type, oe, props, ne, prop, ct, touch, i, j, len;
      event = $.Event(event);
      event.type = eventType;
      oe = event.originalEvent;
      props = $.event.props;
      if (t.search(/^(mouse|click)/) > -1) {
        props = mouseEventProps;
      }
      if (oe) {
        for (i = props.length, prop; i;) {
          prop = props[--i];
          event[prop] = oe[prop];
        }
      }
      if (t.search(/mouse(down|up)|click/) > -1 && !event.which) {
        event.which = 1;
      }
      if (t.search(/^touch/) !== -1) {
        ne = getNativeEvent(oe);
        t = ne.touches;
        ct = ne.changedTouches;
        touch = t && t.length ? t[0] : ct && ct.length ? ct[0] : undefined;
        if (touch) {
          for (j = 0, len = touchEventProps.length; j < len; j++) {
            prop = touchEventProps[j];
            event[prop] = touch[prop];
          }
        }
      }
      return event;
    }
    function getVirtualBindingFlags(element) {
      var flags = {}, b, k;
      while (element) {
        b = $.data(element, dataPropertyName);
        for (k in b) {
          if (b[k]) {
            flags[k] = flags.hasVirtualBinding = true;
          }
        }
        element = element.parentNode;
      }
      return flags;
    }
    function getClosestElementWithVirtualBinding(element, eventType) {
      var b;
      while (element) {
        b = $.data(element, dataPropertyName);
        if (b && (!eventType || b[eventType])) {
          return element;
        }
        element = element.parentNode;
      }
      return null;
    }
    function enableTouchBindings() {
      blockTouchTriggers = false;
    }
    function disableTouchBindings() {
      blockTouchTriggers = true;
    }
    function enableMouseBindings() {
      lastTouchID = 0;
      clickBlockList.length = 0;
      blockMouseTriggers = false;
      disableTouchBindings();
    }
    function disableMouseBindings() {
      enableTouchBindings();
    }
    function startResetTimer() {
      clearResetTimer();
      resetTimerID = setTimeout(function () {
        resetTimerID = 0;
        enableMouseBindings();
      }, $.vmouse.resetTimerDuration);
    }
    function clearResetTimer() {
      if (resetTimerID) {
        clearTimeout(resetTimerID);
        resetTimerID = 0;
      }
    }
    function triggerVirtualEvent(eventType, event, flags) {
      var ve;
      if (flags && flags[eventType] || !flags && getClosestElementWithVirtualBinding(event.target, eventType)) {
        ve = createVirtualEvent(event, eventType);
        $(event.target).trigger(ve);
      }
      return ve;
    }
    function mouseEventCallback(event) {
      var touchID = $.data(event.target, touchTargetPropertyName);
      if (!blockMouseTriggers && (!lastTouchID || lastTouchID !== touchID)) {
        var ve = triggerVirtualEvent('v' + event.type, event);
        if (ve) {
          if (ve.isDefaultPrevented()) {
            event.preventDefault();
          }
          if (ve.isPropagationStopped()) {
            event.stopPropagation();
          }
          if (ve.isImmediatePropagationStopped()) {
            event.stopImmediatePropagation();
          }
        }
      }
    }
    function handleTouchStart(event) {
      var touches = getNativeEvent(event).touches, target, flags;
      if (touches && touches.length === 1) {
        target = event.target;
        flags = getVirtualBindingFlags(target);
        if (flags.hasVirtualBinding) {
          lastTouchID = nextTouchID++;
          $.data(target, touchTargetPropertyName, lastTouchID);
          clearResetTimer();
          disableMouseBindings();
          didScroll = false;
          var t = getNativeEvent(event).touches[0];
          startX = t.pageX;
          startY = t.pageY;
          triggerVirtualEvent('vmouseover', event, flags);
          triggerVirtualEvent('vmousedown', event, flags);
        }
      }
    }
    function handleScroll(event) {
      if (blockTouchTriggers) {
        return;
      }
      if (!didScroll) {
        triggerVirtualEvent('vmousecancel', event, getVirtualBindingFlags(event.target));
      }
      didScroll = true;
      startResetTimer();
    }
    function handleTouchMove(event) {
      if (blockTouchTriggers) {
        return;
      }
      var t = getNativeEvent(event).touches[0], didCancel = didScroll, moveThreshold = $.vmouse.moveDistanceThreshold, flags = getVirtualBindingFlags(event.target);
      didScroll = didScroll || (Math.abs(t.pageX - startX) > moveThreshold || Math.abs(t.pageY - startY) > moveThreshold);
      if (didScroll && !didCancel) {
        triggerVirtualEvent('vmousecancel', event, flags);
      }
      triggerVirtualEvent('vmousemove', event, flags);
      startResetTimer();
    }
    function handleTouchEnd(event) {
      if (blockTouchTriggers) {
        return;
      }
      disableTouchBindings();
      var flags = getVirtualBindingFlags(event.target), t;
      triggerVirtualEvent('vmouseup', event, flags);
      if (!didScroll) {
        var ve = triggerVirtualEvent('vclick', event, flags);
        if (ve && ve.isDefaultPrevented()) {
          t = getNativeEvent(event).changedTouches[0];
          clickBlockList.push({
            touchID: lastTouchID,
            x: t.clientX,
            y: t.clientY
          });
          blockMouseTriggers = true;
        }
      }
      triggerVirtualEvent('vmouseout', event, flags);
      didScroll = false;
      startResetTimer();
    }
    function hasVirtualBindings(ele) {
      var bindings = $.data(ele, dataPropertyName), k;
      if (bindings) {
        for (k in bindings) {
          if (bindings[k]) {
            return true;
          }
        }
      }
      return false;
    }
    function dummyMouseHandler() {
    }
    function getSpecialEventObject(eventType) {
      var realType = eventType.substr(1);
      return {
        setup: function (data, namespace) {
          if (!hasVirtualBindings(this)) {
            $.data(this, dataPropertyName, {});
          }
          var bindings = $.data(this, dataPropertyName);
          bindings[eventType] = true;
          activeDocHandlers[eventType] = (activeDocHandlers[eventType] || 0) + 1;
          if (activeDocHandlers[eventType] === 1) {
            $document.bind(realType, mouseEventCallback);
          }
          $(this).bind(realType, dummyMouseHandler);
          if (eventCaptureSupported) {
            activeDocHandlers['touchstart'] = (activeDocHandlers['touchstart'] || 0) + 1;
            if (activeDocHandlers['touchstart'] === 1) {
              $document.bind('touchstart', handleTouchStart).bind('touchend', handleTouchEnd).bind('touchmove', handleTouchMove).bind('scroll', handleScroll);
            }
          }
        },
        teardown: function (data, namespace) {
          --activeDocHandlers[eventType];
          if (!activeDocHandlers[eventType]) {
            $document.unbind(realType, mouseEventCallback);
          }
          if (eventCaptureSupported) {
            --activeDocHandlers['touchstart'];
            if (!activeDocHandlers['touchstart']) {
              $document.unbind('touchstart', handleTouchStart).unbind('touchmove', handleTouchMove).unbind('touchend', handleTouchEnd).unbind('scroll', handleScroll);
            }
          }
          var $this = $(this), bindings = $.data(this, dataPropertyName);
          if (bindings) {
            bindings[eventType] = false;
          }
          $this.unbind(realType, dummyMouseHandler);
          if (!hasVirtualBindings(this)) {
            $this.removeData(dataPropertyName);
          }
        }
      };
    }
    for (var i = 0; i < virtualEventNames.length; i++) {
      $.event.special[virtualEventNames[i]] = getSpecialEventObject(virtualEventNames[i]);
    }
    if (eventCaptureSupported) {
      document.addEventListener('click', function (e) {
        var cnt = clickBlockList.length, target = e.target, x, y, ele, i, o, touchID;
        if (cnt) {
          x = e.clientX;
          y = e.clientY;
          threshold = $.vmouse.clickDistanceThreshold;
          ele = target;
          while (ele) {
            for (i = 0; i < cnt; i++) {
              o = clickBlockList[i];
              touchID = 0;
              if (ele === target && Math.abs(o.x - x) < threshold && Math.abs(o.y - y) < threshold || $.data(ele, touchTargetPropertyName) === o.touchID) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
            }
            ele = ele.parentNode;
          }
        }
      }, true);
    }
  }(jQuery, window, document));
  (function ($, window, undefined) {
    var $document = $(document);
    $.each(('touchstart touchmove touchend ' + 'tap taphold ' + 'swipe swipeleft swiperight ' + 'scrollstart scrollstop').split(' '), function (i, name) {
      $.fn[name] = function (fn) {
        return fn ? this.bind(name, fn) : this.trigger(name);
      };
      if ($.attrFn) {
        $.attrFn[name] = true;
      }
    });
    var supportTouch = $.mobile.support.touch, scrollEvent = 'touchmove scroll', touchStartEvent = supportTouch ? 'touchstart' : 'mousedown', touchStopEvent = supportTouch ? 'touchend' : 'mouseup', touchMoveEvent = supportTouch ? 'touchmove' : 'mousemove';
    function triggerCustomEvent(obj, eventType, event) {
      var originalType = event.type;
      event.type = eventType;
      $.event.dispatch.call(obj, event);
      event.type = originalType;
    }
    $.event.special.scrollstart = {
      enabled: true,
      setup: function () {
        var thisObject = this, $this = $(thisObject), scrolling, timer;
        function trigger(event, state) {
          scrolling = state;
          triggerCustomEvent(thisObject, scrolling ? 'scrollstart' : 'scrollstop', event);
        }
        $this.bind(scrollEvent, function (event) {
          if (!$.event.special.scrollstart.enabled) {
            return;
          }
          if (!scrolling) {
            trigger(event, true);
          }
          clearTimeout(timer);
          timer = setTimeout(function () {
            trigger(event, false);
          }, 50);
        });
      }
    };
    $.event.special.tap = {
      tapholdThreshold: 750,
      setup: function () {
        var thisObject = this, $this = $(thisObject);
        $this.bind('vmousedown', function (event) {
          if (event.which && event.which !== 1) {
            return false;
          }
          var origTarget = event.target, origEvent = event.originalEvent, timer;
          function clearTapTimer() {
            clearTimeout(timer);
          }
          function clearTapHandlers() {
            clearTapTimer();
            $this.unbind('vclick', clickHandler).unbind('vmouseup', clearTapTimer);
            $document.unbind('vmousecancel', clearTapHandlers);
          }
          function clickHandler(event) {
            clearTapHandlers();
            if (origTarget === event.target) {
              triggerCustomEvent(thisObject, 'tap', event);
            }
          }
          $this.bind('vmouseup', clearTapTimer).bind('vclick', clickHandler);
          $document.bind('vmousecancel', clearTapHandlers);
          timer = setTimeout(function () {
            triggerCustomEvent(thisObject, 'taphold', $.Event('taphold', { target: origTarget }));
          }, $.event.special.tap.tapholdThreshold);
        });
      }
    };
    $.event.special.swipe = {
      scrollSupressionThreshold: 30,
      durationThreshold: 1000,
      horizontalDistanceThreshold: 30,
      verticalDistanceThreshold: 75,
      start: function (event) {
        var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
        return {
          time: new Date().getTime(),
          coords: [
            data.pageX,
            data.pageY
          ],
          origin: $(event.target)
        };
      },
      stop: function (event) {
        var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
        return {
          time: new Date().getTime(),
          coords: [
            data.pageX,
            data.pageY
          ]
        };
      },
      handleSwipe: function (start, stop) {
        if (stop.time - start.time < $.event.special.swipe.durationThreshold && Math.abs(start.coords[0] - stop.coords[0]) > $.event.special.swipe.horizontalDistanceThreshold && Math.abs(start.coords[1] - stop.coords[1]) < $.event.special.swipe.verticalDistanceThreshold) {
          start.origin.trigger('swipe').trigger(start.coords[0] > stop.coords[0] ? 'swipeleft' : 'swiperight');
        }
      },
      setup: function () {
        var thisObject = this, $this = $(thisObject);
        $this.bind(touchStartEvent, function (event) {
          var start = $.event.special.swipe.start(event), stop;
          function moveHandler(event) {
            if (!start) {
              return;
            }
            stop = $.event.special.swipe.stop(event);
            if (Math.abs(start.coords[0] - stop.coords[0]) > $.event.special.swipe.scrollSupressionThreshold) {
              event.preventDefault();
            }
          }
          $this.bind(touchMoveEvent, moveHandler).one(touchStopEvent, function () {
            $this.unbind(touchMoveEvent, moveHandler);
            if (start && stop) {
              $.event.special.swipe.handleSwipe(start, stop);
            }
            start = stop = undefined;
          });
        });
      }
    };
    $.each({
      scrollstop: 'scrollstart',
      taphold: 'tap',
      swipeleft: 'swipe',
      swiperight: 'swipe'
    }, function (event, sourceEvent) {
      $.event.special[event] = {
        setup: function () {
          $(this).bind(sourceEvent, $.noop);
        }
      };
    });
  }(jQuery, this));
  (function ($) {
    $.event.special.throttledresize = {
      setup: function () {
        $(this).bind('resize', handler);
      },
      teardown: function () {
        $(this).unbind('resize', handler);
      }
    };
    var throttle = 250, handler = function () {
        curr = new Date().getTime();
        diff = curr - lastCall;
        if (diff >= throttle) {
          lastCall = curr;
          $(this).trigger('throttledresize');
        } else {
          if (heldCall) {
            clearTimeout(heldCall);
          }
          heldCall = setTimeout(handler, throttle - diff);
        }
      }, lastCall = 0, heldCall, curr, diff;
  }(jQuery));
  (function ($, window) {
    var win = $(window), event_name = 'orientationchange', special_event, get_orientation, last_orientation, initial_orientation_is_landscape, initial_orientation_is_default, portrait_map = {
        '0': true,
        '180': true
      };
    if ($.support.orientation) {
      var ww = window.innerWidth || win.width(), wh = window.innerHeight || win.height(), landscape_threshold = 50;
      initial_orientation_is_landscape = ww > wh && ww - wh > landscape_threshold;
      initial_orientation_is_default = portrait_map[window.orientation];
      if (initial_orientation_is_landscape && initial_orientation_is_default || !initial_orientation_is_landscape && !initial_orientation_is_default) {
        portrait_map = {
          '-90': true,
          '90': true
        };
      }
    }
    $.event.special.orientationchange = $.extend({}, $.event.special.orientationchange, {
      setup: function () {
        if ($.support.orientation && !$.event.special.orientationchange.disabled) {
          return false;
        }
        last_orientation = get_orientation();
        win.bind('throttledresize', handler);
      },
      teardown: function () {
        if ($.support.orientation && !$.event.special.orientationchange.disabled) {
          return false;
        }
        win.unbind('throttledresize', handler);
      },
      add: function (handleObj) {
        var old_handler = handleObj.handler;
        handleObj.handler = function (event) {
          event.orientation = get_orientation();
          return old_handler.apply(this, arguments);
        };
      }
    });
    function handler() {
      var orientation = get_orientation();
      if (orientation !== last_orientation) {
        last_orientation = orientation;
        win.trigger(event_name);
      }
    }
    $.event.special.orientationchange.orientation = get_orientation = function () {
      var isPortrait = true, elem = document.documentElement;
      if ($.support.orientation) {
        isPortrait = portrait_map[window.orientation];
      } else {
        isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
      }
      return isPortrait ? 'portrait' : 'landscape';
    };
    $.fn[event_name] = function (fn) {
      return fn ? this.bind(event_name, fn) : this.trigger(event_name);
    };
    if ($.attrFn) {
      $.attrFn[event_name] = true;
    }
  }(jQuery, this));
  (function ($, undefined) {
    $.widget('mobile.page', $.mobile.widget, {
      options: {
        theme: 'c',
        domCache: false,
        keepNativeDefault: ':jqmData(role=\'none\'), :jqmData(role=\'nojs\')'
      },
      _create: function () {
        if (this._trigger('beforecreate') === false) {
          return false;
        }
        this.element.attr('tabindex', '0').addClass('ui-page ui-body-' + this.options.theme);
        this._on(this.element, {
          pagebeforehide: 'removeContainerBackground',
          pagebeforeshow: '_handlePageBeforeShow'
        });
      },
      _handlePageBeforeShow: function (e) {
        this.setContainerBackground();
      },
      removeContainerBackground: function () {
        $.mobile.pageContainer.removeClass('ui-overlay-' + $.mobile.getInheritedTheme(this.element.parent()));
      },
      setContainerBackground: function (theme) {
        if (this.options.theme) {
          $.mobile.pageContainer.addClass('ui-overlay-' + (theme || this.options.theme));
        }
      },
      keepNativeSelector: function () {
        var options = this.options, keepNativeDefined = options.keepNative && $.trim(options.keepNative);
        if (keepNativeDefined && options.keepNative !== options.keepNativeDefault) {
          return [
            options.keepNative,
            options.keepNativeDefault
          ].join(', ');
        }
        return options.keepNativeDefault;
      }
    });
  }(jQuery));
  (function ($, window, undefined) {
    var createHandler = function (sequential) {
      if (sequential === undefined) {
        sequential = true;
      }
      return function (name, reverse, $to, $from) {
        var deferred = new $.Deferred(), reverseClass = reverse ? ' reverse' : '', active = $.mobile.urlHistory.getActive(), toScroll = active.lastScroll || $.mobile.defaultHomeScroll, screenHeight = $.mobile.getScreenHeight(), maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $.mobile.window.width() > $.mobile.maxTransitionWidth, none = !$.support.cssTransitions || maxTransitionOverride || !name || name === 'none' || Math.max($.mobile.window.scrollTop(), toScroll) > $.mobile.getMaxScrollForTransition(), toPreClass = ' ui-page-pre-in', toggleViewportClass = function () {
            $.mobile.pageContainer.toggleClass('ui-mobile-viewport-transitioning viewport-' + name);
          }, scrollPage = function () {
            $.event.special.scrollstart.enabled = false;
            window.scrollTo(0, toScroll);
            setTimeout(function () {
              $.event.special.scrollstart.enabled = true;
            }, 150);
          }, cleanFrom = function () {
            $from.removeClass($.mobile.activePageClass + ' out in reverse ' + name).height('');
          }, startOut = function () {
            if (!sequential) {
              doneOut();
            } else {
              $from.animationComplete(doneOut);
            }
            $from.height(screenHeight + $.mobile.window.scrollTop()).addClass(name + ' out' + reverseClass);
          }, doneOut = function () {
            if ($from && sequential) {
              cleanFrom();
            }
            startIn();
          }, startIn = function () {
            $to.css('z-index', -10);
            $to.addClass($.mobile.activePageClass + toPreClass);
            $.mobile.focusPage($to);
            $to.height(screenHeight + toScroll);
            scrollPage();
            $to.css('z-index', '');
            if (!none) {
              $to.animationComplete(doneIn);
            }
            $to.removeClass(toPreClass).addClass(name + ' in' + reverseClass);
            if (none) {
              doneIn();
            }
          }, doneIn = function () {
            if (!sequential) {
              if ($from) {
                cleanFrom();
              }
            }
            $to.removeClass('out in reverse ' + name).height('');
            toggleViewportClass();
            if ($.mobile.window.scrollTop() !== toScroll) {
              scrollPage();
            }
            deferred.resolve(name, reverse, $to, $from, true);
          };
        toggleViewportClass();
        if ($from && !none) {
          startOut();
        } else {
          doneOut();
        }
        return deferred.promise();
      };
    };
    var sequentialHandler = createHandler(), simultaneousHandler = createHandler(false), defaultGetMaxScrollForTransition = function () {
        return $.mobile.getScreenHeight() * 3;
      };
    $.mobile.defaultTransitionHandler = sequentialHandler;
    $.mobile.transitionHandlers = {
      'default': $.mobile.defaultTransitionHandler,
      'sequential': sequentialHandler,
      'simultaneous': simultaneousHandler
    };
    $.mobile.transitionFallbacks = {};
    $.mobile._maybeDegradeTransition = function (transition) {
      if (transition && !$.support.cssTransform3d && $.mobile.transitionFallbacks[transition]) {
        transition = $.mobile.transitionFallbacks[transition];
      }
      return transition;
    };
    $.mobile.getMaxScrollForTransition = $.mobile.getMaxScrollForTransition || defaultGetMaxScrollForTransition;
  }(jQuery, this));
  (function ($, undefined) {
    var $window = $.mobile.window, $html = $('html'), $head = $('head'), path = $.extend($.mobile.path, {
        getFilePath: function (path) {
          var splitkey = '&' + $.mobile.subPageUrlKey;
          return path && path.split(splitkey)[0].split(dialogHashKey)[0];
        },
        isFirstPageUrl: function (url) {
          var u = path.parseUrl(path.makeUrlAbsolute(url, this.documentBase)), samePath = u.hrefNoHash === this.documentUrl.hrefNoHash || this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash, fp = $.mobile.firstPage, fpId = fp && fp[0] ? fp[0].id : undefined;
          return samePath && (!u.hash || u.hash === '#' || fpId && u.hash.replace(/^#/, '') === fpId);
        },
        isPermittedCrossDomainRequest: function (docUrl, reqUrl) {
          return $.mobile.allowCrossDomainPages && docUrl.protocol === 'file:' && reqUrl.search(/^https?:/) !== -1;
        }
      }), $lastVClicked = null, $activeClickedLink = null, domreadyDeferred = $.Deferred(), urlHistory = $.mobile.navigate.history, focusable = '[tabindex],a,button:visible,select:visible,input', pageTransitionQueue = [], isPageTransitioning = false, dialogHashKey = '&ui-state=dialog', $base = $head.children('base'), documentUrl = path.documentUrl, documentBase = path.documentBase, documentBaseDiffers = path.documentBaseDiffers, getScreenHeight = $.mobile.getScreenHeight;
    var base = $.support.dynamicBaseTag ? {
        element: $base.length ? $base : $('<base>', { href: documentBase.hrefNoHash }).prependTo($head),
        set: function (href) {
          href = path.parseUrl(href).hrefNoHash;
          base.element.attr('href', path.makeUrlAbsolute(href, documentBase));
        },
        reset: function () {
          base.element.attr('href', documentBase.hrefNoSearch);
        }
      } : undefined;
    $.mobile.getDocumentUrl = path.getDocumentUrl;
    $.mobile.getDocumentBase = path.getDocumentBase;
    $.mobile.back = function () {
      var nav = window.navigator;
      if (this.phonegapNavigationEnabled && nav && nav.app && nav.app.backHistory) {
        nav.app.backHistory();
      } else {
        window.history.back();
      }
    };
    $.mobile.focusPage = function (page) {
      var autofocus = page.find('[autofocus]'), pageTitle = page.find('.ui-title:eq(0)');
      if (autofocus.length) {
        autofocus.focus();
        return;
      }
      if (pageTitle.length) {
        pageTitle.focus();
      } else {
        page.focus();
      }
    };
    function removeActiveLinkClass(forceRemoval) {
      if (!!$activeClickedLink && (!$activeClickedLink.closest('.' + $.mobile.activePageClass).length || forceRemoval)) {
        $activeClickedLink.removeClass($.mobile.activeBtnClass);
      }
      $activeClickedLink = null;
    }
    function releasePageTransitionLock() {
      isPageTransitioning = false;
      if (pageTransitionQueue.length > 0) {
        $.mobile.changePage.apply(null, pageTransitionQueue.pop());
      }
    }
    var setLastScrollEnabled = true, setLastScroll, delayedSetLastScroll;
    setLastScroll = function () {
      if (!setLastScrollEnabled) {
        return;
      }
      var active = $.mobile.urlHistory.getActive();
      if (active) {
        var lastScroll = $window.scrollTop();
        active.lastScroll = lastScroll < $.mobile.minScrollBack ? $.mobile.defaultHomeScroll : lastScroll;
      }
    };
    delayedSetLastScroll = function () {
      setTimeout(setLastScroll, 100);
    };
    $window.bind($.support.pushState ? 'popstate' : 'hashchange', function () {
      setLastScrollEnabled = false;
    });
    $window.one($.support.pushState ? 'popstate' : 'hashchange', function () {
      setLastScrollEnabled = true;
    });
    $window.one('pagecontainercreate', function () {
      $.mobile.pageContainer.bind('pagechange', function () {
        setLastScrollEnabled = true;
        $window.unbind('scrollstop', delayedSetLastScroll);
        $window.bind('scrollstop', delayedSetLastScroll);
      });
    });
    $window.bind('scrollstop', delayedSetLastScroll);
    $.mobile._maybeDegradeTransition = $.mobile._maybeDegradeTransition || function (transition) {
      return transition;
    };
    function transitionPages(toPage, fromPage, transition, reverse) {
      if (fromPage) {
        fromPage.data('mobile-page')._trigger('beforehide', null, { nextPage: toPage });
      }
      toPage.data('mobile-page')._trigger('beforeshow', null, { prevPage: fromPage || $('') });
      $.mobile.hidePageLoadingMsg();
      transition = $.mobile._maybeDegradeTransition(transition);
      var th = $.mobile.transitionHandlers[transition || 'default'] || $.mobile.defaultTransitionHandler, promise = th(transition, reverse, toPage, fromPage);
      promise.done(function () {
        if (fromPage) {
          fromPage.data('mobile-page')._trigger('hide', null, { nextPage: toPage });
        }
        toPage.data('mobile-page')._trigger('show', null, { prevPage: fromPage || $('') });
      });
      return promise;
    }
    $.mobile.resetActivePageHeight = function resetActivePageHeight(height) {
      var aPage = $('.' + $.mobile.activePageClass), aPagePadT = parseFloat(aPage.css('padding-top')), aPagePadB = parseFloat(aPage.css('padding-bottom')), aPageBorderT = parseFloat(aPage.css('border-top-width')), aPageBorderB = parseFloat(aPage.css('border-bottom-width'));
      height = typeof height === 'number' ? height : getScreenHeight();
      aPage.css('min-height', height - aPagePadT - aPagePadB - aPageBorderT - aPageBorderB);
    };
    function enhancePage($page, role) {
      if (role) {
        $page.attr('data-' + $.mobile.ns + 'role', role);
      }
      $page.page();
    }
    function findBaseWithDefault() {
      var closestBase = $.mobile.activePage && getClosestBaseUrl($.mobile.activePage);
      return closestBase || documentBase.hrefNoHash;
    }
    $.fn.animationComplete = function (callback) {
      if ($.support.cssTransitions) {
        return $(this).one('webkitAnimationEnd animationend', callback);
      } else {
        setTimeout(callback, 0);
        return $(this);
      }
    };
    $.mobile.path = path;
    $.mobile.base = base;
    $.mobile.urlHistory = urlHistory;
    $.mobile.dialogHashKey = dialogHashKey;
    $.mobile.allowCrossDomainPages = false;
    $.mobile._bindPageRemove = function () {
      var page = $(this);
      if (!page.data('mobile-page').options.domCache && page.is(':jqmData(external-page=\'true\')')) {
        page.bind('pagehide.remove', function (e) {
          var $this = $(this), prEvent = new $.Event('pageremove');
          $this.trigger(prEvent);
          if (!prEvent.isDefaultPrevented()) {
            $this.removeWithDependents();
          }
        });
      }
    };
    $.mobile.loadPage = function (url, options) {
      var deferred = $.Deferred(), settings = $.extend({}, $.mobile.loadPage.defaults, options), page = null, dupCachedPage = null, absUrl = path.makeUrlAbsolute(url, findBaseWithDefault());
      if (settings.data && settings.type === 'get') {
        absUrl = path.addSearchParams(absUrl, settings.data);
        settings.data = undefined;
      }
      if (settings.data && settings.type === 'post') {
        settings.reloadPage = true;
      }
      var fileUrl = path.getFilePath(absUrl), dataUrl = path.convertUrlToDataUrl(absUrl);
      settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;
      page = settings.pageContainer.children('[data-' + $.mobile.ns + 'url=\'' + dataUrl + '\']');
      if (page.length === 0 && dataUrl && !path.isPath(dataUrl)) {
        page = settings.pageContainer.children('#' + dataUrl).attr('data-' + $.mobile.ns + 'url', dataUrl).jqmData('url', dataUrl);
      }
      if (page.length === 0) {
        if ($.mobile.firstPage && path.isFirstPageUrl(fileUrl)) {
          if ($.mobile.firstPage.parent().length) {
            page = $($.mobile.firstPage);
          }
        } else if (path.isEmbeddedPage(fileUrl)) {
          deferred.reject(absUrl, options);
          return deferred.promise();
        }
      }
      if (page.length) {
        if (!settings.reloadPage) {
          enhancePage(page, settings.role);
          deferred.resolve(absUrl, options, page);
          return deferred.promise();
        }
        dupCachedPage = page;
      }
      var mpc = settings.pageContainer, pblEvent = new $.Event('pagebeforeload'), triggerData = {
          url: url,
          absUrl: absUrl,
          dataUrl: dataUrl,
          deferred: deferred,
          options: settings
        };
      mpc.trigger(pblEvent, triggerData);
      if (pblEvent.isDefaultPrevented()) {
        return deferred.promise();
      }
      if (settings.showLoadMsg) {
        var loadMsgDelay = setTimeout(function () {
            $.mobile.showPageLoadingMsg();
          }, settings.loadMsgDelay), hideMsg = function () {
            clearTimeout(loadMsgDelay);
            $.mobile.hidePageLoadingMsg();
          };
      }
      if (base) {
        base.reset();
      }
      if (!($.mobile.allowCrossDomainPages || path.isSameDomain(documentUrl, absUrl))) {
        deferred.reject(absUrl, options);
      } else {
        $.ajax({
          url: fileUrl,
          type: settings.type,
          data: settings.data,
          dataType: 'html',
          success: function (html, textStatus, xhr) {
            var all = $('<div></div>'), newPageTitle = html.match(/<title[^>]*>([^<]*)/) && RegExp.$1, pageElemRegex = new RegExp('(<[^>]+\\bdata-' + $.mobile.ns + 'role=["\']?page["\']?[^>]*>)'), dataUrlRegex = new RegExp('\\bdata-' + $.mobile.ns + 'url=["\']?([^"\'>]*)["\']?');
            if (pageElemRegex.test(html) && RegExp.$1 && dataUrlRegex.test(RegExp.$1) && RegExp.$1) {
              url = fileUrl = path.getFilePath($('<div>' + RegExp.$1 + '</div>').text());
            }
            if (base) {
              base.set(fileUrl);
            }
            all.get(0).innerHTML = html;
            page = all.find(':jqmData(role=\'page\'), :jqmData(role=\'dialog\')').first();
            if (!page.length) {
              page = $('<div data-' + $.mobile.ns + 'role=\'page\'>' + (html.split(/<\/?body[^>]*>/gim)[1] || '') + '</div>');
            }
            if (newPageTitle && !page.jqmData('title')) {
              if (~newPageTitle.indexOf('&')) {
                newPageTitle = $('<div>' + newPageTitle + '</div>').text();
              }
              page.jqmData('title', newPageTitle);
            }
            if (!$.support.dynamicBaseTag) {
              var newPath = path.get(fileUrl);
              page.find('[src], link[href], a[rel=\'external\'], :jqmData(ajax=\'false\'), a[target]').each(function () {
                var thisAttr = $(this).is('[href]') ? 'href' : $(this).is('[src]') ? 'src' : 'action', thisUrl = $(this).attr(thisAttr);
                thisUrl = thisUrl.replace(location.protocol + '//' + location.host + location.pathname, '');
                if (!/^(\w+:|#|\/)/.test(thisUrl)) {
                  $(this).attr(thisAttr, newPath + thisUrl);
                }
              });
            }
            page.attr('data-' + $.mobile.ns + 'url', path.convertUrlToDataUrl(fileUrl)).attr('data-' + $.mobile.ns + 'external-page', true).appendTo(settings.pageContainer);
            page.one('pagecreate', $.mobile._bindPageRemove);
            enhancePage(page, settings.role);
            if (absUrl.indexOf('&' + $.mobile.subPageUrlKey) > -1) {
              page = settings.pageContainer.children('[data-' + $.mobile.ns + 'url=\'' + dataUrl + '\']');
            }
            if (settings.showLoadMsg) {
              hideMsg();
            }
            triggerData.xhr = xhr;
            triggerData.textStatus = textStatus;
            triggerData.page = page;
            settings.pageContainer.trigger('pageload', triggerData);
            deferred.resolve(absUrl, options, page, dupCachedPage);
          },
          error: function (xhr, textStatus, errorThrown) {
            if (base) {
              base.set(path.get());
            }
            triggerData.xhr = xhr;
            triggerData.textStatus = textStatus;
            triggerData.errorThrown = errorThrown;
            var plfEvent = new $.Event('pageloadfailed');
            settings.pageContainer.trigger(plfEvent, triggerData);
            if (plfEvent.isDefaultPrevented()) {
              return;
            }
            if (settings.showLoadMsg) {
              hideMsg();
              $.mobile.showPageLoadingMsg($.mobile.pageLoadErrorMessageTheme, $.mobile.pageLoadErrorMessage, true);
              setTimeout($.mobile.hidePageLoadingMsg, 1500);
            }
            deferred.reject(absUrl, options);
          }
        });
      }
      return deferred.promise();
    };
    $.mobile.loadPage.defaults = {
      type: 'get',
      data: undefined,
      reloadPage: false,
      role: undefined,
      showLoadMsg: false,
      pageContainer: undefined,
      loadMsgDelay: 50
    };
    $.mobile.changePage = function (toPage, options) {
      if (isPageTransitioning) {
        pageTransitionQueue.unshift(arguments);
        return;
      }
      var settings = $.extend({}, $.mobile.changePage.defaults, options), isToPageString;
      settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;
      settings.fromPage = settings.fromPage || $.mobile.activePage;
      isToPageString = typeof toPage === 'string';
      var mpc = settings.pageContainer, pbcEvent = new $.Event('pagebeforechange'), triggerData = {
          toPage: toPage,
          options: settings
        };
      if (isToPageString) {
        triggerData.absUrl = path.makeUrlAbsolute(toPage, findBaseWithDefault());
      } else {
        triggerData.absUrl = toPage.data('absUrl');
      }
      mpc.trigger(pbcEvent, triggerData);
      if (pbcEvent.isDefaultPrevented()) {
        return;
      }
      toPage = triggerData.toPage;
      isToPageString = typeof toPage === 'string';
      isPageTransitioning = true;
      if (isToPageString) {
        settings.target = toPage;
        $.mobile.loadPage(toPage, settings).done(function (url, options, newPage, dupCachedPage) {
          isPageTransitioning = false;
          options.duplicateCachedPage = dupCachedPage;
          newPage.data('absUrl', triggerData.absUrl);
          $.mobile.changePage(newPage, options);
        }).fail(function (url, options) {
          isPageTransitioning = false;
          removeActiveLinkClass(true);
          releasePageTransitionLock();
          settings.pageContainer.trigger('pagechangefailed', triggerData);
        });
        return;
      }
      if (toPage[0] === $.mobile.firstPage[0] && !settings.dataUrl) {
        settings.dataUrl = documentUrl.hrefNoHash;
      }
      var fromPage = settings.fromPage, url = settings.dataUrl && path.convertUrlToDataUrl(settings.dataUrl) || toPage.jqmData('url'), pageUrl = url, fileUrl = path.getFilePath(url), active = urlHistory.getActive(), activeIsInitialPage = urlHistory.activeIndex === 0, historyDir = 0, pageTitle = document.title, isDialog = settings.role === 'dialog' || toPage.jqmData('role') === 'dialog';
      if (fromPage && fromPage[0] === toPage[0] && !settings.allowSamePageTransition) {
        isPageTransitioning = false;
        mpc.trigger('pagechange', triggerData);
        if (settings.fromHashChange) {
          urlHistory.direct({ url: url });
        }
        return;
      }
      enhancePage(toPage, settings.role);
      if (settings.fromHashChange) {
        historyDir = options.direction === 'back' ? -1 : 1;
      }
      try {
        if (document.activeElement && document.activeElement.nodeName.toLowerCase() !== 'body') {
          $(document.activeElement).blur();
        } else {
          $('input:focus, textarea:focus, select:focus').blur();
        }
      } catch (e) {
      }
      var alreadyThere = false;
      if (isDialog && active) {
        if (active.url && active.url.indexOf(dialogHashKey) > -1 && $.mobile.activePage && !$.mobile.activePage.is('.ui-dialog') && urlHistory.activeIndex > 0) {
          settings.changeHash = false;
          alreadyThere = true;
        }
        url = active.url || '';
        if (!alreadyThere && url.indexOf('#') > -1) {
          url += dialogHashKey;
        } else {
          url += '#' + dialogHashKey;
        }
        if (urlHistory.activeIndex === 0 && url === urlHistory.initialDst) {
          url += dialogHashKey;
        }
      }
      var newPageTitle = !active ? pageTitle : toPage.jqmData('title') || toPage.children(':jqmData(role=\'header\')').find('.ui-title').getEncodedText();
      if (!!newPageTitle && pageTitle === document.title) {
        pageTitle = newPageTitle;
      }
      if (!toPage.jqmData('title')) {
        toPage.jqmData('title', pageTitle);
      }
      settings.transition = settings.transition || (historyDir && !activeIsInitialPage ? active.transition : undefined) || (isDialog ? $.mobile.defaultDialogTransition : $.mobile.defaultPageTransition);
      if (!historyDir && alreadyThere) {
        urlHistory.getActive().pageUrl = pageUrl;
      }
      if (url && !settings.fromHashChange) {
        var params;
        if (!path.isPath(url) && url.indexOf('#') < 0) {
          url = '#' + url;
        }
        params = {
          transition: settings.transition,
          title: pageTitle,
          pageUrl: pageUrl,
          role: settings.role
        };
        if (settings.changeHash !== false && $.mobile.hashListeningEnabled) {
          $.mobile.navigate(url, params, true);
        } else if (toPage[0] !== $.mobile.firstPage[0]) {
          $.mobile.navigate.history.add(url, params);
        }
      }
      document.title = pageTitle;
      $.mobile.activePage = toPage;
      settings.reverse = settings.reverse || historyDir < 0;
      transitionPages(toPage, fromPage, settings.transition, settings.reverse).done(function (name, reverse, $to, $from, alreadyFocused) {
        removeActiveLinkClass();
        if (settings.duplicateCachedPage) {
          settings.duplicateCachedPage.remove();
        }
        if (!alreadyFocused) {
          $.mobile.focusPage(toPage);
        }
        releasePageTransitionLock();
        mpc.trigger('pagechange', triggerData);
      });
    };
    $.mobile.changePage.defaults = {
      transition: undefined,
      reverse: false,
      changeHash: true,
      fromHashChange: false,
      role: undefined,
      duplicateCachedPage: undefined,
      pageContainer: undefined,
      showLoadMsg: true,
      dataUrl: undefined,
      fromPage: undefined,
      allowSamePageTransition: false
    };
    function findClosestLink(ele) {
      while (ele) {
        if (typeof ele.nodeName === 'string' && ele.nodeName.toLowerCase() === 'a') {
          break;
        }
        ele = ele.parentNode;
      }
      return ele;
    }
    function getClosestBaseUrl(ele) {
      var url = $(ele).closest('.ui-page').jqmData('url'), base = documentBase.hrefNoHash;
      if (!url || !path.isPath(url)) {
        url = base;
      }
      return path.makeUrlAbsolute(url, base);
    }
    $.mobile.navreadyDeferred = $.Deferred();
    $.mobile._registerInternalEvents = function () {
      var getAjaxFormData = function ($form, calculateOnly) {
        var type, target, url, ret = true, formData, vclickedName;
        if (!$.mobile.ajaxEnabled || $form.is(':jqmData(ajax=\'false\')') || !$form.jqmHijackable().length) {
          return false;
        }
        target = $form.attr('target');
        url = $form.attr('action');
        if (!url) {
          url = getClosestBaseUrl($form);
          if (url === documentBase.hrefNoHash) {
            url = documentUrl.hrefNoSearch;
          }
        }
        url = path.makeUrlAbsolute(url, getClosestBaseUrl($form));
        if (path.isExternal(url) && !path.isPermittedCrossDomainRequest(documentUrl, url) || target) {
          return false;
        }
        if (!calculateOnly) {
          type = $form.attr('method');
          formData = $form.serializeArray();
          if ($lastVClicked && $lastVClicked[0].form === $form[0]) {
            vclickedName = $lastVClicked.attr('name');
            if (vclickedName) {
              $.each(formData, function (key, value) {
                if (value.name === vclickedName) {
                  vclickedName = '';
                  return false;
                }
              });
              if (vclickedName) {
                formData.push({
                  name: vclickedName,
                  value: $lastVClicked.attr('value')
                });
              }
            }
          }
          ret = {
            url: url,
            options: {
              type: type && type.length && type.toLowerCase() || 'get',
              data: $.param(formData),
              transition: $form.jqmData('transition'),
              reverse: $form.jqmData('direction') === 'reverse',
              reloadPage: true
            }
          };
        }
        return ret;
      };
      $.mobile.document.delegate('form', 'submit', function (event) {
        var formData = getAjaxFormData($(this));
        if (formData) {
          $.mobile.changePage(formData.url, formData.options);
          event.preventDefault();
        }
      });
      $.mobile.document.bind('vclick', function (event) {
        var $btn, btnEls, target = event.target, needClosest = false;
        if (event.which > 1 || !$.mobile.linkBindingEnabled) {
          return;
        }
        $lastVClicked = $(target);
        if ($.data(target, 'mobile-button')) {
          if (!getAjaxFormData($(target).closest('form'), true)) {
            return;
          }
          if (target.parentNode) {
            target = target.parentNode;
          }
        } else {
          target = findClosestLink(target);
          if (!(target && path.parseUrl(target.getAttribute('href') || '#').hash !== '#')) {
            return;
          }
          if (!$(target).jqmHijackable().length) {
            return;
          }
        }
        if (!!~target.className.indexOf('ui-link-inherit')) {
          if (target.parentNode) {
            btnEls = $.data(target.parentNode, 'buttonElements');
          }
        } else {
          btnEls = $.data(target, 'buttonElements');
        }
        if (btnEls) {
          target = btnEls.outer;
        } else {
          needClosest = true;
        }
        $btn = $(target);
        if (needClosest) {
          $btn = $btn.closest('.ui-btn');
        }
        if ($btn.length > 0 && !$btn.hasClass('ui-disabled')) {
          removeActiveLinkClass(true);
          $activeClickedLink = $btn;
          $activeClickedLink.addClass($.mobile.activeBtnClass);
        }
      });
      $.mobile.document.bind('click', function (event) {
        if (!$.mobile.linkBindingEnabled || event.isDefaultPrevented()) {
          return;
        }
        var link = findClosestLink(event.target), $link = $(link), httpCleanup;
        if (!link || event.which > 1 || !$link.jqmHijackable().length) {
          return;
        }
        httpCleanup = function () {
          window.setTimeout(function () {
            removeActiveLinkClass(true);
          }, 200);
        };
        if ($link.is(':jqmData(rel=\'back\')')) {
          $.mobile.back();
          return false;
        }
        var baseUrl = getClosestBaseUrl($link), href = path.makeUrlAbsolute($link.attr('href') || '#', baseUrl);
        if (!$.mobile.ajaxEnabled && !path.isEmbeddedPage(href)) {
          httpCleanup();
          return;
        }
        if (href.search('#') !== -1) {
          href = href.replace(/[^#]*#/, '');
          if (!href) {
            event.preventDefault();
            return;
          } else if (path.isPath(href)) {
            href = path.makeUrlAbsolute(href, baseUrl);
          } else {
            href = path.makeUrlAbsolute('#' + href, documentUrl.hrefNoHash);
          }
        }
        var useDefaultUrlHandling = $link.is('[rel=\'external\']') || $link.is(':jqmData(ajax=\'false\')') || $link.is('[target]'), isExternal = useDefaultUrlHandling || path.isExternal(href) && !path.isPermittedCrossDomainRequest(documentUrl, href);
        if (isExternal) {
          httpCleanup();
          return;
        }
        var transition = $link.jqmData('transition'), reverse = $link.jqmData('direction') === 'reverse' || $link.jqmData('back'), role = $link.attr('data-' + $.mobile.ns + 'rel') || undefined;
        $.mobile.changePage(href, {
          transition: transition,
          reverse: reverse,
          role: role,
          link: $link
        });
        event.preventDefault();
      });
      $.mobile.document.delegate('.ui-page', 'pageshow.prefetch', function () {
        var urls = [];
        $(this).find('a:jqmData(prefetch)').each(function () {
          var $link = $(this), url = $link.attr('href');
          if (url && $.inArray(url, urls) === -1) {
            urls.push(url);
            $.mobile.loadPage(url, { role: $link.attr('data-' + $.mobile.ns + 'rel') });
          }
        });
      });
      $.mobile._handleHashChange = function (url, data) {
        var to = path.stripHash(url), transition = $.mobile.urlHistory.stack.length === 0 ? 'none' : undefined, changePageOptions = {
            changeHash: false,
            fromHashChange: true,
            reverse: data.direction === 'back'
          };
        $.extend(changePageOptions, data, { transition: (urlHistory.getLast() || {}).transition || transition });
        if (urlHistory.activeIndex > 0 && to.indexOf(dialogHashKey) > -1 && urlHistory.initialDst !== to) {
          if ($.mobile.activePage && !$.mobile.activePage.is('.ui-dialog')) {
            if (data.direction === 'back') {
              $.mobile.back();
            } else {
              window.history.forward();
            }
            return;
          } else {
            to = data.pageUrl;
            var active = $.mobile.urlHistory.getActive();
            $.extend(changePageOptions, {
              role: active.role,
              transition: active.transition,
              reverse: data.direction === 'back'
            });
          }
        }
        if (to) {
          to = !path.isPath(to) ? path.makeUrlAbsolute('#' + to, documentBase) : to;
          if (to === path.makeUrlAbsolute('#' + urlHistory.initialDst, documentBase) && urlHistory.stack.length && urlHistory.stack[0].url !== urlHistory.initialDst.replace(dialogHashKey, '')) {
            to = $.mobile.firstPage;
          }
          $.mobile.changePage(to, changePageOptions);
        } else {
          $.mobile.changePage($.mobile.firstPage, changePageOptions);
        }
      };
      $window.bind('navigate', function (e, data) {
        var url = $.event.special.navigate.originalEventName.indexOf('hashchange') > -1 ? data.state.hash : data.state.url;
        if (!url) {
          url = $.mobile.path.parseLocation().hash;
        }
        if (!url || url === '#' || url.indexOf('#' + $.mobile.path.uiStateKey) === 0) {
          url = location.href;
        }
        $.mobile._handleHashChange(url, data.state);
      });
      $.mobile.document.bind('pageshow', $.mobile.resetActivePageHeight);
      $.mobile.window.bind('throttledresize', $.mobile.resetActivePageHeight);
    };
    $(function () {
      domreadyDeferred.resolve();
    });
    $.when(domreadyDeferred, $.mobile.navreadyDeferred).done(function () {
      $.mobile._registerInternalEvents();
    });
  }(jQuery));
  (function ($, window, undefined) {
    $.mobile.transitionFallbacks.flip = 'fade';
  }(jQuery, this));
  (function ($, window, undefined) {
    $.mobile.transitionFallbacks.flow = 'fade';
  }(jQuery, this));
  (function ($, window, undefined) {
    $.mobile.transitionFallbacks.pop = 'fade';
  }(jQuery, this));
  (function ($, window, undefined) {
    $.mobile.transitionHandlers.slide = $.mobile.transitionHandlers.simultaneous;
    $.mobile.transitionFallbacks.slide = 'fade';
  }(jQuery, this));
  (function ($, window, undefined) {
    $.mobile.transitionFallbacks.slidedown = 'fade';
  }(jQuery, this));
  (function ($, window, undefined) {
    $.mobile.transitionFallbacks.slidefade = 'fade';
  }(jQuery, this));
  (function ($, window, undefined) {
    $.mobile.transitionFallbacks.slideup = 'fade';
  }(jQuery, this));
  (function ($, window, undefined) {
    $.mobile.transitionFallbacks.turn = 'fade';
  }(jQuery, this));
  (function ($, undefined) {
    $.mobile.page.prototype.options.degradeInputs = {
      color: false,
      date: false,
      datetime: false,
      'datetime-local': false,
      email: false,
      month: false,
      number: false,
      range: 'number',
      search: 'text',
      tel: false,
      time: false,
      url: false,
      week: false
    };
    $.mobile.document.bind('pagecreate create', function (e) {
      var page = $.mobile.closestPageData($(e.target)), options;
      if (!page) {
        return;
      }
      options = page.options;
      $(e.target).find('input').not(page.keepNativeSelector()).each(function () {
        var $this = $(this), type = this.getAttribute('type'), optType = options.degradeInputs[type] || 'text';
        if (options.degradeInputs[type]) {
          var html = $('<div>').html($this.clone()).html(), hasType = html.indexOf(' type=') > -1, findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/, repstr = ' type="' + optType + '" data-' + $.mobile.ns + 'type="' + type + '"' + (hasType ? '' : '>');
          $this.replaceWith(html.replace(findstr, repstr));
        }
      });
    });
  }(jQuery));
  (function ($, window, undefined) {
    $.widget('mobile.dialog', $.mobile.widget, {
      options: {
        closeBtn: 'left',
        closeBtnText: 'Close',
        overlayTheme: 'a',
        corners: true,
        initSelector: ':jqmData(role=\'dialog\')'
      },
      _handlePageBeforeShow: function () {
        this._isCloseable = true;
        if (this.options.overlayTheme) {
          this.element.page('removeContainerBackground').page('setContainerBackground', this.options.overlayTheme);
        }
      },
      _create: function () {
        var self = this, $el = this.element, cornerClass = !!this.options.corners ? ' ui-corner-all' : '', dialogWrap = $('<div/>', {
            'role': 'dialog',
            'class': 'ui-dialog-contain ui-overlay-shadow' + cornerClass
          });
        $el.addClass('ui-dialog ui-overlay-' + this.options.overlayTheme);
        $el.wrapInner(dialogWrap);
        $el.bind('vclick submit', function (event) {
          var $target = $(event.target).closest(event.type === 'vclick' ? 'a' : 'form'), active;
          if ($target.length && !$target.jqmData('transition')) {
            active = $.mobile.urlHistory.getActive() || {};
            $target.attr('data-' + $.mobile.ns + 'transition', active.transition || $.mobile.defaultDialogTransition).attr('data-' + $.mobile.ns + 'direction', 'reverse');
          }
        });
        this._on($el, { pagebeforeshow: '_handlePageBeforeShow' });
        $.extend(this, { _createComplete: false });
        this._setCloseBtn(this.options.closeBtn);
      },
      _setCloseBtn: function (value) {
        var self = this, btn, location;
        if (this._headerCloseButton) {
          this._headerCloseButton.remove();
          this._headerCloseButton = null;
        }
        if (value !== 'none') {
          location = value === 'left' ? 'left' : 'right';
          btn = $('<a href=\'#\' class=\'ui-btn-' + location + '\' data-' + $.mobile.ns + 'icon=\'delete\' data-' + $.mobile.ns + 'iconpos=\'notext\'>' + this.options.closeBtnText + '</a>');
          this.element.children().find(':jqmData(role=\'header\')').first().prepend(btn);
          if (this._createComplete && $.fn.buttonMarkup) {
            btn.buttonMarkup();
          }
          this._createComplete = true;
          btn.bind('click', function () {
            self.close();
          });
          this._headerCloseButton = btn;
        }
      },
      _setOption: function (key, value) {
        if (key === 'closeBtn') {
          this._setCloseBtn(value);
          this._super(key, value);
          this.element.attr('data-' + ($.mobile.ns || '') + 'close-btn', value);
        }
      },
      close: function () {
        var idx, dst, hist = $.mobile.navigate.history;
        if (this._isCloseable) {
          this._isCloseable = false;
          if ($.mobile.hashListeningEnabled && hist.activeIndex > 0) {
            $.mobile.back();
          } else {
            idx = Math.max(0, hist.activeIndex - 1);
            dst = hist.stack[idx].pageUrl || hist.stack[idx].url;
            hist.previousIndex = hist.activeIndex;
            hist.activeIndex = idx;
            if (!$.mobile.path.isPath(dst)) {
              dst = $.mobile.path.makeUrlAbsolute('#' + dst);
            }
            $.mobile.changePage(dst, {
              direction: 'back',
              changeHash: false,
              fromHashChange: true
            });
          }
        }
      }
    });
    $.mobile.document.delegate($.mobile.dialog.prototype.options.initSelector, 'pagecreate', function () {
      $.mobile.dialog.prototype.enhance(this);
    });
  }(jQuery, this));
  (function ($, undefined) {
    $.mobile.page.prototype.options.backBtnText = 'Back';
    $.mobile.page.prototype.options.addBackBtn = false;
    $.mobile.page.prototype.options.backBtnTheme = null;
    $.mobile.page.prototype.options.headerTheme = 'a';
    $.mobile.page.prototype.options.footerTheme = 'a';
    $.mobile.page.prototype.options.contentTheme = null;
    $.mobile.document.bind('pagecreate', function (e) {
      var $page = $(e.target), o = $page.data('mobile-page').options, pageRole = $page.jqmData('role'), pageTheme = o.theme;
      $(':jqmData(role=\'header\'), :jqmData(role=\'footer\'), :jqmData(role=\'content\')', $page).jqmEnhanceable().each(function () {
        var $this = $(this), role = $this.jqmData('role'), theme = $this.jqmData('theme'), contentTheme = theme || o.contentTheme || pageRole === 'dialog' && pageTheme, $headeranchors, leftbtn, rightbtn, backBtn;
        $this.addClass('ui-' + role);
        if (role === 'header' || role === 'footer') {
          var thisTheme = theme || (role === 'header' ? o.headerTheme : o.footerTheme) || pageTheme;
          $this.addClass('ui-bar-' + thisTheme).attr('role', role === 'header' ? 'banner' : 'contentinfo');
          if (role === 'header') {
            $headeranchors = $this.children('a, button');
            leftbtn = $headeranchors.hasClass('ui-btn-left');
            rightbtn = $headeranchors.hasClass('ui-btn-right');
            leftbtn = leftbtn || $headeranchors.eq(0).not('.ui-btn-right').addClass('ui-btn-left').length;
            rightbtn = rightbtn || $headeranchors.eq(1).addClass('ui-btn-right').length;
          }
          if (o.addBackBtn && role === 'header' && $('.ui-page').length > 1 && $page.jqmData('url') !== $.mobile.path.stripHash(location.hash) && !leftbtn) {
            backBtn = $('<a href=\'javascript:void(0);\' class=\'ui-btn-left\' data-' + $.mobile.ns + 'rel=\'back\' data-' + $.mobile.ns + 'icon=\'arrow-l\'>' + o.backBtnText + '</a>').attr('data-' + $.mobile.ns + 'theme', o.backBtnTheme || thisTheme).prependTo($this);
          }
          $this.children('h1, h2, h3, h4, h5, h6').addClass('ui-title').attr({
            'role': 'heading',
            'aria-level': '1'
          });
        } else if (role === 'content') {
          if (contentTheme) {
            $this.addClass('ui-body-' + contentTheme);
          }
          $this.attr('role', 'main');
        }
      });
    });
  }(jQuery));
  (function ($, undefined) {
    $.mobile.behaviors.addFirstLastClasses = {
      _getVisibles: function ($els, create) {
        var visibles;
        if (create) {
          visibles = $els.not('.ui-screen-hidden');
        } else {
          visibles = $els.filter(':visible');
          if (visibles.length === 0) {
            visibles = $els.not('.ui-screen-hidden');
          }
        }
        return visibles;
      },
      _addFirstLastClasses: function ($els, $visibles, create) {
        $els.removeClass('ui-first-child ui-last-child');
        $visibles.eq(0).addClass('ui-first-child').end().last().addClass('ui-last-child');
        if (!create) {
          this.element.trigger('updatelayout');
        }
      }
    };
  }(jQuery));
  (function ($, undefined) {
    $.fn.fieldcontain = function (options) {
      return this.addClass('ui-field-contain ui-body ui-br').contents().filter(function () {
        return this.nodeType === 3 && !/\S/.test(this.nodeValue);
      }).remove();
    };
    $(document).bind('pagecreate create', function (e) {
      $(':jqmData(role=\'fieldcontain\')', e.target).jqmEnhanceable().fieldcontain();
    });
  }(jQuery));
  (function ($, undefined) {
    $.fn.grid = function (options) {
      return this.each(function () {
        var $this = $(this), o = $.extend({ grid: null }, options), $kids = $this.children(), gridCols = {
            solo: 1,
            a: 2,
            b: 3,
            c: 4,
            d: 5
          }, grid = o.grid, iterator;
        if (!grid) {
          if ($kids.length <= 5) {
            for (var letter in gridCols) {
              if (gridCols[letter] === $kids.length) {
                grid = letter;
              }
            }
          } else {
            grid = 'a';
            $this.addClass('ui-grid-duo');
          }
        }
        iterator = gridCols[grid];
        $this.addClass('ui-grid-' + grid);
        $kids.filter(':nth-child(' + iterator + 'n+1)').addClass('ui-block-a');
        if (iterator > 1) {
          $kids.filter(':nth-child(' + iterator + 'n+2)').addClass('ui-block-b');
        }
        if (iterator > 2) {
          $kids.filter(':nth-child(' + iterator + 'n+3)').addClass('ui-block-c');
        }
        if (iterator > 3) {
          $kids.filter(':nth-child(' + iterator + 'n+4)').addClass('ui-block-d');
        }
        if (iterator > 4) {
          $kids.filter(':nth-child(' + iterator + 'n+5)').addClass('ui-block-e');
        }
      });
    };
  }(jQuery));
  (function ($, undefined) {
    $(document).bind('pagecreate create', function (e) {
      $(':jqmData(role=\'nojs\')', e.target).addClass('ui-nojs');
    });
  }(jQuery));
  (function ($, undefined) {
    $.mobile.behaviors.formReset = {
      _handleFormReset: function () {
        this._on(this.element.closest('form'), {
          reset: function () {
            this._delay('_reset');
          }
        });
      }
    };
  }(jQuery));
  (function ($, undefined) {
    var getAttrFixed = function (e, key) {
      var value = e.getAttribute(key);
      return value === 'true' ? true : value === 'false' ? false : value === null ? undefined : value;
    };
    $.fn.buttonMarkup = function (options) {
      var $workingSet = this, nsKey = 'data-' + $.mobile.ns, key;
      options = options && $.type(options) === 'object' ? options : {};
      for (var i = 0; i < $workingSet.length; i++) {
        var el = $workingSet.eq(i), e = el[0], o = $.extend({}, $.fn.buttonMarkup.defaults, {
            icon: options.icon !== undefined ? options.icon : getAttrFixed(e, nsKey + 'icon'),
            iconpos: options.iconpos !== undefined ? options.iconpos : getAttrFixed(e, nsKey + 'iconpos'),
            theme: options.theme !== undefined ? options.theme : getAttrFixed(e, nsKey + 'theme') || $.mobile.getInheritedTheme(el, 'c'),
            inline: options.inline !== undefined ? options.inline : getAttrFixed(e, nsKey + 'inline'),
            shadow: options.shadow !== undefined ? options.shadow : getAttrFixed(e, nsKey + 'shadow'),
            corners: options.corners !== undefined ? options.corners : getAttrFixed(e, nsKey + 'corners'),
            iconshadow: options.iconshadow !== undefined ? options.iconshadow : getAttrFixed(e, nsKey + 'iconshadow'),
            mini: options.mini !== undefined ? options.mini : getAttrFixed(e, nsKey + 'mini')
          }, options), innerClass = 'ui-btn-inner', textClass = 'ui-btn-text', buttonClass, iconClass, hover = false, state = 'up', buttonInner, buttonText, buttonIcon, buttonElements;
        for (key in o) {
          e.setAttribute(nsKey + key, o[key]);
        }
        if (getAttrFixed(e, nsKey + 'rel') === 'popup' && el.attr('href')) {
          e.setAttribute('aria-haspopup', true);
          e.setAttribute('aria-owns', el.attr('href'));
        }
        buttonElements = $.data(e.tagName === 'INPUT' || e.tagName === 'BUTTON' ? e.parentNode : e, 'buttonElements');
        if (buttonElements) {
          e = buttonElements.outer;
          el = $(e);
          buttonInner = buttonElements.inner;
          buttonText = buttonElements.text;
          $(buttonElements.icon).remove();
          buttonElements.icon = null;
          hover = buttonElements.hover;
          state = buttonElements.state;
        } else {
          buttonInner = document.createElement(o.wrapperEls);
          buttonText = document.createElement(o.wrapperEls);
        }
        buttonIcon = o.icon ? document.createElement('span') : null;
        if (attachEvents && !buttonElements) {
          attachEvents();
        }
        if (!o.theme) {
          o.theme = $.mobile.getInheritedTheme(el, 'c');
        }
        buttonClass = 'ui-btn ';
        buttonClass += hover ? 'ui-btn-hover-' + o.theme : '';
        buttonClass += state ? ' ui-btn-' + state + '-' + o.theme : '';
        buttonClass += o.shadow ? ' ui-shadow' : '';
        buttonClass += o.corners ? ' ui-btn-corner-all' : '';
        if (o.mini !== undefined) {
          buttonClass += o.mini === true ? ' ui-mini' : ' ui-fullsize';
        }
        if (o.inline !== undefined) {
          buttonClass += o.inline === true ? ' ui-btn-inline' : ' ui-btn-block';
        }
        if (o.icon) {
          o.icon = 'ui-icon-' + o.icon;
          o.iconpos = o.iconpos || 'left';
          iconClass = 'ui-icon ' + o.icon;
          if (o.iconshadow) {
            iconClass += ' ui-icon-shadow';
          }
        }
        if (o.iconpos) {
          buttonClass += ' ui-btn-icon-' + o.iconpos;
          if (o.iconpos === 'notext' && !el.attr('title')) {
            el.attr('title', el.getEncodedText());
          }
        }
        if (o.iconpos && o.iconpos === 'notext' && !el.attr('title')) {
          el.attr('title', el.getEncodedText());
        }
        if (buttonElements) {
          el.removeClass(buttonElements.bcls || '');
        }
        el.removeClass('ui-link').addClass(buttonClass);
        buttonInner.className = innerClass;
        buttonText.className = textClass;
        if (!buttonElements) {
          buttonInner.appendChild(buttonText);
        }
        if (buttonIcon) {
          buttonIcon.className = iconClass;
          if (!(buttonElements && buttonElements.icon)) {
            buttonIcon.innerHTML = '&#160;';
            buttonInner.appendChild(buttonIcon);
          }
        }
        while (e.firstChild && !buttonElements) {
          buttonText.appendChild(e.firstChild);
        }
        if (!buttonElements) {
          e.appendChild(buttonInner);
        }
        buttonElements = {
          hover: hover,
          state: state,
          bcls: buttonClass,
          outer: e,
          inner: buttonInner,
          text: buttonText,
          icon: buttonIcon
        };
        $.data(e, 'buttonElements', buttonElements);
        $.data(buttonInner, 'buttonElements', buttonElements);
        $.data(buttonText, 'buttonElements', buttonElements);
        if (buttonIcon) {
          $.data(buttonIcon, 'buttonElements', buttonElements);
        }
      }
      return this;
    };
    $.fn.buttonMarkup.defaults = {
      corners: true,
      shadow: true,
      iconshadow: true,
      wrapperEls: 'span'
    };
    function closestEnabledButton(element) {
      var cname;
      while (element) {
        cname = typeof element.className === 'string' && element.className + ' ';
        if (cname && cname.indexOf('ui-btn ') > -1 && cname.indexOf('ui-disabled ') < 0) {
          break;
        }
        element = element.parentNode;
      }
      return element;
    }
    function updateButtonClass($btn, classToRemove, classToAdd, hover, state) {
      var buttonElements = $.data($btn[0], 'buttonElements');
      $btn.removeClass(classToRemove).addClass(classToAdd);
      if (buttonElements) {
        buttonElements.bcls = $(document.createElement('div')).addClass(buttonElements.bcls + ' ' + classToAdd).removeClass(classToRemove).attr('class');
        if (hover !== undefined) {
          buttonElements.hover = hover;
        }
        buttonElements.state = state;
      }
    }
    var attachEvents = function () {
      var hoverDelay = $.mobile.buttonMarkup.hoverDelay, hov, foc;
      $.mobile.document.bind({
        'vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart': function (event) {
          var theme, $btn = $(closestEnabledButton(event.target)), isTouchEvent = event.originalEvent && /^touch/.test(event.originalEvent.type), evt = event.type;
          if ($btn.length) {
            theme = $btn.attr('data-' + $.mobile.ns + 'theme');
            if (evt === 'vmousedown') {
              if (isTouchEvent) {
                hov = setTimeout(function () {
                  updateButtonClass($btn, 'ui-btn-up-' + theme, 'ui-btn-down-' + theme, undefined, 'down');
                }, hoverDelay);
              } else {
                updateButtonClass($btn, 'ui-btn-up-' + theme, 'ui-btn-down-' + theme, undefined, 'down');
              }
            } else if (evt === 'vmousecancel' || evt === 'vmouseup') {
              updateButtonClass($btn, 'ui-btn-down-' + theme, 'ui-btn-up-' + theme, undefined, 'up');
            } else if (evt === 'vmouseover' || evt === 'focus') {
              if (isTouchEvent) {
                foc = setTimeout(function () {
                  updateButtonClass($btn, 'ui-btn-up-' + theme, 'ui-btn-hover-' + theme, true, '');
                }, hoverDelay);
              } else {
                updateButtonClass($btn, 'ui-btn-up-' + theme, 'ui-btn-hover-' + theme, true, '');
              }
            } else if (evt === 'vmouseout' || evt === 'blur' || evt === 'scrollstart') {
              updateButtonClass($btn, 'ui-btn-hover-' + theme + ' ui-btn-down-' + theme, 'ui-btn-up-' + theme, false, 'up');
              if (hov) {
                clearTimeout(hov);
              }
              if (foc) {
                clearTimeout(foc);
              }
            }
          }
        },
        'focusin focus': function (event) {
          $(closestEnabledButton(event.target)).addClass($.mobile.focusClass);
        },
        'focusout blur': function (event) {
          $(closestEnabledButton(event.target)).removeClass($.mobile.focusClass);
        }
      });
      attachEvents = null;
    };
    $.mobile.document.bind('pagecreate create', function (e) {
      $(':jqmData(role=\'button\'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role=\'controlgroup\') > a', e.target).jqmEnhanceable().not('button, input, .ui-btn, :jqmData(role=\'none\'), :jqmData(role=\'nojs\')').buttonMarkup();
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.collapsible', $.mobile.widget, {
      options: {
        expandCueText: ' click to expand contents',
        collapseCueText: ' click to collapse contents',
        collapsed: true,
        heading: 'h1,h2,h3,h4,h5,h6,legend',
        collapsedIcon: 'plus',
        expandedIcon: 'minus',
        iconpos: 'left',
        theme: null,
        contentTheme: null,
        inset: true,
        corners: true,
        mini: false,
        initSelector: ':jqmData(role=\'collapsible\')'
      },
      _create: function () {
        var $el = this.element, o = this.options, collapsible = $el.addClass('ui-collapsible'), collapsibleHeading = $el.children(o.heading).first(), collapsibleContent = collapsible.wrapInner('<div class=\'ui-collapsible-content\'></div>').children('.ui-collapsible-content'), collapsibleSet = $el.closest(':jqmData(role=\'collapsible-set\')').addClass('ui-collapsible-set'), collapsibleClasses = '';
        if (collapsibleHeading.is('legend')) {
          collapsibleHeading = $('<div role=\'heading\'>' + collapsibleHeading.html() + '</div>').insertBefore(collapsibleHeading);
          collapsibleHeading.next().remove();
        }
        if (collapsibleSet.length) {
          if (!o.theme) {
            o.theme = collapsibleSet.jqmData('theme') || $.mobile.getInheritedTheme(collapsibleSet, 'c');
          }
          if (!o.contentTheme) {
            o.contentTheme = collapsibleSet.jqmData('content-theme');
          }
          o.collapsedIcon = $el.jqmData('collapsed-icon') || collapsibleSet.jqmData('collapsed-icon') || o.collapsedIcon;
          o.expandedIcon = $el.jqmData('expanded-icon') || collapsibleSet.jqmData('expanded-icon') || o.expandedIcon;
          o.iconpos = $el.jqmData('iconpos') || collapsibleSet.jqmData('iconpos') || o.iconpos;
          if (collapsibleSet.jqmData('inset') !== undefined) {
            o.inset = collapsibleSet.jqmData('inset');
          } else {
            o.inset = true;
          }
          o.corners = false;
          if (!o.mini) {
            o.mini = collapsibleSet.jqmData('mini');
          }
        } else {
          if (!o.theme) {
            o.theme = $.mobile.getInheritedTheme($el, 'c');
          }
        }
        if (!!o.inset) {
          collapsibleClasses += ' ui-collapsible-inset';
          if (!!o.corners) {
            collapsibleClasses += ' ui-corner-all';
          }
        }
        if (o.contentTheme) {
          collapsibleClasses += ' ui-collapsible-themed-content';
          collapsibleContent.addClass('ui-body-' + o.contentTheme);
        }
        if (collapsibleClasses !== '') {
          collapsible.addClass(collapsibleClasses);
        }
        collapsibleHeading.insertBefore(collapsibleContent).addClass('ui-collapsible-heading').append('<span class=\'ui-collapsible-heading-status\'></span>').wrapInner('<a href=\'#\' class=\'ui-collapsible-heading-toggle\'></a>').find('a').first().buttonMarkup({
          shadow: false,
          corners: false,
          iconpos: o.iconpos,
          icon: o.collapsedIcon,
          mini: o.mini,
          theme: o.theme
        });
        collapsible.bind('expand collapse', function (event) {
          if (!event.isDefaultPrevented()) {
            var $this = $(this), isCollapse = event.type === 'collapse';
            event.preventDefault();
            collapsibleHeading.toggleClass('ui-collapsible-heading-collapsed', isCollapse).find('.ui-collapsible-heading-status').text(isCollapse ? o.expandCueText : o.collapseCueText).end().find('.ui-icon').toggleClass('ui-icon-' + o.expandedIcon, !isCollapse).toggleClass('ui-icon-' + o.collapsedIcon, isCollapse || o.expandedIcon === o.collapsedIcon).end().find('a').first().removeClass($.mobile.activeBtnClass);
            $this.toggleClass('ui-collapsible-collapsed', isCollapse);
            collapsibleContent.toggleClass('ui-collapsible-content-collapsed', isCollapse).attr('aria-hidden', isCollapse);
            collapsibleContent.trigger('updatelayout');
          }
        }).trigger(o.collapsed ? 'collapse' : 'expand');
        collapsibleHeading.bind('tap', function (event) {
          collapsibleHeading.find('a').first().addClass($.mobile.activeBtnClass);
        }).bind('click', function (event) {
          var type = collapsibleHeading.is('.ui-collapsible-heading-collapsed') ? 'expand' : 'collapse';
          collapsible.trigger(type);
          event.preventDefault();
          event.stopPropagation();
        });
      }
    });
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.collapsible.prototype.enhanceWithin(e.target);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.collapsibleset', $.mobile.widget, {
      options: { initSelector: ':jqmData(role=\'collapsible-set\')' },
      _create: function () {
        var $el = this.element.addClass('ui-collapsible-set'), o = this.options;
        if (!o.theme) {
          o.theme = $.mobile.getInheritedTheme($el, 'c');
        }
        if (!o.contentTheme) {
          o.contentTheme = $el.jqmData('content-theme');
        }
        if (!o.corners) {
          o.corners = $el.jqmData('corners');
        }
        if ($el.jqmData('inset') !== undefined) {
          o.inset = $el.jqmData('inset');
        }
        o.inset = o.inset !== undefined ? o.inset : true;
        o.corners = o.corners !== undefined ? o.corners : true;
        if (!!o.corners && !!o.inset) {
          $el.addClass('ui-corner-all');
        }
        if (!$el.jqmData('collapsiblebound')) {
          $el.jqmData('collapsiblebound', true).bind('expand', function (event) {
            var closestCollapsible = $(event.target).closest('.ui-collapsible');
            if (closestCollapsible.parent().is(':jqmData(role=\'collapsible-set\')')) {
              closestCollapsible.siblings('.ui-collapsible').trigger('collapse');
            }
          });
        }
      },
      _init: function () {
        var $el = this.element, collapsiblesInSet = $el.children(':jqmData(role=\'collapsible\')'), expanded = collapsiblesInSet.filter(':jqmData(collapsed=\'false\')');
        this._refresh('true');
        expanded.trigger('expand');
      },
      _refresh: function (create) {
        var collapsiblesInSet = this.element.children(':jqmData(role=\'collapsible\')');
        $.mobile.collapsible.prototype.enhance(collapsiblesInSet.not('.ui-collapsible'));
        this._addFirstLastClasses(collapsiblesInSet, this._getVisibles(collapsiblesInSet, create), create);
      },
      refresh: function () {
        this._refresh(false);
      }
    });
    $.widget('mobile.collapsibleset', $.mobile.collapsibleset, $.mobile.behaviors.addFirstLastClasses);
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.collapsibleset.prototype.enhanceWithin(e.target);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.navbar', $.mobile.widget, {
      options: {
        iconpos: 'top',
        grid: null,
        initSelector: ':jqmData(role=\'navbar\')'
      },
      _create: function () {
        var $navbar = this.element, $navbtns = $navbar.find('a'), iconpos = $navbtns.filter(':jqmData(icon)').length ? this.options.iconpos : undefined;
        $navbar.addClass('ui-navbar ui-mini').attr('role', 'navigation').find('ul').jqmEnhanceable().grid({ grid: this.options.grid });
        $navbtns.buttonMarkup({
          corners: false,
          shadow: false,
          inline: true,
          iconpos: iconpos
        });
        $navbar.delegate('a', 'vclick', function (event) {
          if (!$(event.target).hasClass('ui-disabled')) {
            $navbtns.removeClass($.mobile.activeBtnClass);
            $(this).addClass($.mobile.activeBtnClass);
            var activeNavbtn = $(this);
            $(document).one('pagechange', function (event) {
              activeNavbtn.removeClass($.mobile.activeBtnClass);
            });
          }
        });
        $navbar.closest('.ui-page').bind('pagebeforeshow', function () {
          $navbtns.filter('.ui-state-persist').addClass($.mobile.activeBtnClass);
        });
      }
    });
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.navbar.prototype.enhanceWithin(e.target);
    });
  }(jQuery));
  (function ($, undefined) {
    var listCountPerPage = {};
    $.widget('mobile.listview', $.mobile.widget, {
      options: {
        theme: null,
        countTheme: 'c',
        headerTheme: 'b',
        dividerTheme: 'b',
        icon: 'arrow-r',
        splitIcon: 'arrow-r',
        splitTheme: 'b',
        corners: true,
        shadow: true,
        inset: false,
        initSelector: ':jqmData(role=\'listview\')'
      },
      _create: function () {
        var t = this, listviewClasses = '';
        listviewClasses += t.options.inset ? ' ui-listview-inset' : '';
        if (!!t.options.inset) {
          listviewClasses += t.options.corners ? ' ui-corner-all' : '';
          listviewClasses += t.options.shadow ? ' ui-shadow' : '';
        }
        t.element.addClass(function (i, orig) {
          return orig + ' ui-listview' + listviewClasses;
        });
        t.refresh(true);
      },
      _findFirstElementByTagName: function (ele, nextProp, lcName, ucName) {
        var dict = {};
        dict[lcName] = dict[ucName] = true;
        while (ele) {
          if (dict[ele.nodeName]) {
            return ele;
          }
          ele = ele[nextProp];
        }
        return null;
      },
      _getChildrenByTagName: function (ele, lcName, ucName) {
        var results = [], dict = {};
        dict[lcName] = dict[ucName] = true;
        ele = ele.firstChild;
        while (ele) {
          if (dict[ele.nodeName]) {
            results.push(ele);
          }
          ele = ele.nextSibling;
        }
        return $(results);
      },
      _addThumbClasses: function (containers) {
        var i, img, len = containers.length;
        for (i = 0; i < len; i++) {
          img = $(this._findFirstElementByTagName(containers[i].firstChild, 'nextSibling', 'img', 'IMG'));
          if (img.length) {
            img.addClass('ui-li-thumb');
            $(this._findFirstElementByTagName(img[0].parentNode, 'parentNode', 'li', 'LI')).addClass(img.is('.ui-li-icon') ? 'ui-li-has-icon' : 'ui-li-has-thumb');
          }
        }
      },
      refresh: function (create) {
        this.parentPage = this.element.closest('.ui-page');
        this._createSubPages();
        var o = this.options, $list = this.element, self = this, dividertheme = $list.jqmData('dividertheme') || o.dividerTheme, listsplittheme = $list.jqmData('splittheme'), listspliticon = $list.jqmData('spliticon'), listicon = $list.jqmData('icon'), li = this._getChildrenByTagName($list[0], 'li', 'LI'), ol = !!$.nodeName($list[0], 'ol'), jsCount = !$.support.cssPseudoElement, start = $list.attr('start'), itemClassDict = {}, item, itemClass, itemTheme, a, last, splittheme, counter, startCount, newStartCount, countParent, icon, imgParents, img, linkIcon;
        if (ol && jsCount) {
          $list.find('.ui-li-dec').remove();
        }
        if (ol) {
          if (start || start === 0) {
            if (!jsCount) {
              startCount = parseInt(start, 10) - 1;
              $list.css('counter-reset', 'listnumbering ' + startCount);
            } else {
              counter = parseInt(start, 10);
            }
          } else if (jsCount) {
            counter = 1;
          }
        }
        if (!o.theme) {
          o.theme = $.mobile.getInheritedTheme(this.element, 'c');
        }
        for (var pos = 0, numli = li.length; pos < numli; pos++) {
          item = li.eq(pos);
          itemClass = 'ui-li';
          if (create || !item.hasClass('ui-li')) {
            itemTheme = item.jqmData('theme') || o.theme;
            a = this._getChildrenByTagName(item[0], 'a', 'A');
            var isDivider = item.jqmData('role') === 'list-divider';
            if (a.length && !isDivider) {
              icon = item.jqmData('icon');
              item.buttonMarkup({
                wrapperEls: 'div',
                shadow: false,
                corners: false,
                iconpos: 'right',
                icon: a.length > 1 || icon === false ? false : icon || listicon || o.icon,
                theme: itemTheme
              });
              if (icon !== false && a.length === 1) {
                item.addClass('ui-li-has-arrow');
              }
              a.first().removeClass('ui-link').addClass('ui-link-inherit');
              if (a.length > 1) {
                itemClass += ' ui-li-has-alt';
                last = a.last();
                splittheme = listsplittheme || last.jqmData('theme') || o.splitTheme;
                linkIcon = last.jqmData('icon');
                last.appendTo(item).attr('title', $.trim(last.getEncodedText())).addClass('ui-li-link-alt').empty().buttonMarkup({
                  shadow: false,
                  corners: false,
                  theme: itemTheme,
                  icon: false,
                  iconpos: 'notext'
                }).find('.ui-btn-inner').append($(document.createElement('span')).buttonMarkup({
                  shadow: true,
                  corners: true,
                  theme: splittheme,
                  iconpos: 'notext',
                  icon: linkIcon || icon || listspliticon || o.splitIcon
                }));
              }
            } else if (isDivider) {
              itemClass += ' ui-li-divider ui-bar-' + (item.jqmData('theme') || dividertheme);
              item.attr('role', 'heading');
              if (ol) {
                if (start || start === 0) {
                  if (!jsCount) {
                    newStartCount = parseInt(start, 10) - 1;
                    item.css('counter-reset', 'listnumbering ' + newStartCount);
                  } else {
                    counter = parseInt(start, 10);
                  }
                } else if (jsCount) {
                  counter = 1;
                }
              }
            } else {
              itemClass += ' ui-li-static ui-btn-up-' + itemTheme;
            }
          }
          if (ol && jsCount && itemClass.indexOf('ui-li-divider') < 0) {
            countParent = itemClass.indexOf('ui-li-static') > 0 ? item : item.find('.ui-link-inherit');
            countParent.addClass('ui-li-jsnumbering').prepend('<span class=\'ui-li-dec\'>' + counter++ + '. </span>');
          }
          if (!itemClassDict[itemClass]) {
            itemClassDict[itemClass] = [];
          }
          itemClassDict[itemClass].push(item[0]);
        }
        for (itemClass in itemClassDict) {
          $(itemClassDict[itemClass]).addClass(itemClass).children('.ui-btn-inner').addClass(itemClass);
        }
        $list.find('h1, h2, h3, h4, h5, h6').addClass('ui-li-heading').end().find('p, dl').addClass('ui-li-desc').end().find('.ui-li-aside').each(function () {
          var $this = $(this);
          $this.prependTo($this.parent());
        }).end().find('.ui-li-count').each(function () {
          $(this).closest('li').addClass('ui-li-has-count');
        }).addClass('ui-btn-up-' + ($list.jqmData('counttheme') || this.options.countTheme) + ' ui-btn-corner-all');
        this._addThumbClasses(li);
        this._addThumbClasses($list.find('.ui-link-inherit'));
        this._addFirstLastClasses(li, this._getVisibles(li, create), create);
        this._trigger('afterrefresh');
      },
      _idStringEscape: function (str) {
        return str.replace(/[^a-zA-Z0-9]/g, '-');
      },
      _createSubPages: function () {
        var parentList = this.element, parentPage = parentList.closest('.ui-page'), parentUrl = parentPage.jqmData('url'), parentId = parentUrl || parentPage[0][$.expando], parentListId = parentList.attr('id'), o = this.options, dns = 'data-' + $.mobile.ns, self = this, persistentFooterID = parentPage.find(':jqmData(role=\'footer\')').jqmData('id'), hasSubPages;
        if (typeof listCountPerPage[parentId] === 'undefined') {
          listCountPerPage[parentId] = -1;
        }
        parentListId = parentListId || ++listCountPerPage[parentId];
        $(parentList.find('li>ul, li>ol').toArray().reverse()).each(function (i) {
          var self = this, list = $(this), listId = list.attr('id') || parentListId + '-' + i, parent = list.parent(), nodeElsFull = $(list.prevAll().toArray().reverse()), nodeEls = nodeElsFull.length ? nodeElsFull : $('<span>' + $.trim(parent.contents()[0].nodeValue) + '</span>'), title = nodeEls.first().getEncodedText(), id = (parentUrl || '') + '&' + $.mobile.subPageUrlKey + '=' + listId, theme = list.jqmData('theme') || o.theme, countTheme = list.jqmData('counttheme') || parentList.jqmData('counttheme') || o.countTheme, newPage, anchor;
          hasSubPages = true;
          newPage = list.detach().wrap('<div ' + dns + 'role=\'page\' ' + dns + 'url=\'' + id + '\' ' + dns + 'theme=\'' + theme + '\' ' + dns + 'count-theme=\'' + countTheme + '\'><div ' + dns + 'role=\'content\'></div></div>').parent().before('<div ' + dns + 'role=\'header\' ' + dns + 'theme=\'' + o.headerTheme + '\'><div class=\'ui-title\'>' + title + '</div></div>').after(persistentFooterID ? $('<div ' + dns + 'role=\'footer\' ' + dns + 'id=\'' + persistentFooterID + '\'>') : '').parent().appendTo($.mobile.pageContainer);
          newPage.page();
          anchor = parent.find('a:first');
          if (!anchor.length) {
            anchor = $('<a/>').html(nodeEls || title).prependTo(parent.empty());
          }
          anchor.attr('href', '#' + id);
        }).listview();
        if (hasSubPages && parentPage.is(':jqmData(external-page=\'true\')') && parentPage.data('mobile-page').options.domCache === false) {
          var newRemove = function (e, ui) {
            var nextPage = ui.nextPage, npURL, prEvent = new $.Event('pageremove');
            if (ui.nextPage) {
              npURL = nextPage.jqmData('url');
              if (npURL.indexOf(parentUrl + '&' + $.mobile.subPageUrlKey) !== 0) {
                self.childPages().remove();
                parentPage.trigger(prEvent);
                if (!prEvent.isDefaultPrevented()) {
                  parentPage.removeWithDependents();
                }
              }
            }
          };
          parentPage.unbind('pagehide.remove').bind('pagehide.remove', newRemove);
        }
      },
      childPages: function () {
        var parentUrl = this.parentPage.jqmData('url');
        return $(':jqmData(url^=\'' + parentUrl + '&' + $.mobile.subPageUrlKey + '\')');
      }
    });
    $.widget('mobile.listview', $.mobile.listview, $.mobile.behaviors.addFirstLastClasses);
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.listview.prototype.enhanceWithin(e.target);
    });
  }(jQuery));
  (function ($, undefined) {
    $.mobile.listview.prototype.options.autodividers = false;
    $.mobile.listview.prototype.options.autodividersSelector = function (elt) {
      var text = $.trim(elt.text()) || null;
      if (!text) {
        return null;
      }
      text = text.slice(0, 1).toUpperCase();
      return text;
    };
    $.mobile.document.delegate('ul,ol', 'listviewcreate', function () {
      var list = $(this), listview = list.data('mobile-listview');
      if (!listview || !listview.options.autodividers) {
        return;
      }
      var replaceDividers = function () {
        list.find('li:jqmData(role=\'list-divider\')').remove();
        var lis = list.find('li'), lastDividerText = null, li, dividerText;
        for (var i = 0; i < lis.length; i++) {
          li = lis[i];
          dividerText = listview.options.autodividersSelector($(li));
          if (dividerText && lastDividerText !== dividerText) {
            var divider = document.createElement('li');
            divider.appendChild(document.createTextNode(dividerText));
            divider.setAttribute('data-' + $.mobile.ns + 'role', 'list-divider');
            li.parentNode.insertBefore(divider, li);
          }
          lastDividerText = dividerText;
        }
      };
      var afterListviewRefresh = function () {
        list.unbind('listviewafterrefresh', afterListviewRefresh);
        replaceDividers();
        listview.refresh();
        list.bind('listviewafterrefresh', afterListviewRefresh);
      };
      afterListviewRefresh();
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.checkboxradio', $.mobile.widget, {
      options: {
        theme: null,
        mini: false,
        initSelector: 'input[type=\'checkbox\'],input[type=\'radio\']'
      },
      _create: function () {
        var self = this, input = this.element, o = this.options, inheritAttr = function (input, dataAttr) {
            return input.jqmData(dataAttr) || input.closest('form, fieldset').jqmData(dataAttr);
          }, parentLabel = $(input).closest('label'), label = parentLabel.length ? parentLabel : $(input).closest('form, fieldset, :jqmData(role=\'page\'), :jqmData(role=\'dialog\')').find('label').filter('[for=\'' + input[0].id + '\']').first(), inputtype = input[0].type, mini = inheritAttr(input, 'mini') || o.mini, checkedState = inputtype + '-on', uncheckedState = inputtype + '-off', iconpos = inheritAttr(input, 'iconpos'), checkedClass = 'ui-' + checkedState, uncheckedClass = 'ui-' + uncheckedState;
        if (inputtype !== 'checkbox' && inputtype !== 'radio') {
          return;
        }
        $.extend(this, {
          label: label,
          inputtype: inputtype,
          checkedClass: checkedClass,
          uncheckedClass: uncheckedClass,
          checkedicon: checkedState,
          uncheckedicon: uncheckedState
        });
        if (!o.theme) {
          o.theme = $.mobile.getInheritedTheme(this.element, 'c');
        }
        label.buttonMarkup({
          theme: o.theme,
          icon: uncheckedState,
          shadow: false,
          mini: mini,
          iconpos: iconpos
        });
        var wrapper = document.createElement('div');
        wrapper.className = 'ui-' + inputtype;
        input.add(label).wrapAll(wrapper);
        label.bind({
          vmouseover: function (event) {
            if ($(this).parent().is('.ui-disabled')) {
              event.stopPropagation();
            }
          },
          vclick: function (event) {
            if (input.is(':disabled')) {
              event.preventDefault();
              return;
            }
            self._cacheVals();
            input.prop('checked', inputtype === 'radio' && true || !input.prop('checked'));
            input.triggerHandler('click');
            self._getInputSet().not(input).prop('checked', false);
            self._updateAll();
            return false;
          }
        });
        input.bind({
          vmousedown: function () {
            self._cacheVals();
          },
          vclick: function () {
            var $this = $(this);
            if ($this.is(':checked')) {
              $this.prop('checked', true);
              self._getInputSet().not($this).prop('checked', false);
            } else {
              $this.prop('checked', false);
            }
            self._updateAll();
          },
          focus: function () {
            label.addClass($.mobile.focusClass);
          },
          blur: function () {
            label.removeClass($.mobile.focusClass);
          }
        });
        if (this._handleFormReset) {
          this._handleFormReset();
        }
        this.refresh();
      },
      _cacheVals: function () {
        this._getInputSet().each(function () {
          $(this).jqmData('cacheVal', this.checked);
        });
      },
      _getInputSet: function () {
        if (this.inputtype === 'checkbox') {
          return this.element;
        }
        return this.element.closest('form, :jqmData(role=\'page\'), :jqmData(role=\'dialog\')').find('input[name=\'' + this.element[0].name + '\'][type=\'' + this.inputtype + '\']');
      },
      _updateAll: function () {
        var self = this;
        this._getInputSet().each(function () {
          var $this = $(this);
          if (this.checked || self.inputtype === 'checkbox') {
            $this.trigger('change');
          }
        }).checkboxradio('refresh');
      },
      _reset: function () {
        this.refresh();
      },
      refresh: function () {
        var input = this.element[0], active = ' ' + $.mobile.activeBtnClass, checkedClass = this.checkedClass + (this.element.parents('.ui-controlgroup-horizontal').length ? active : ''), label = this.label;
        if (input.checked) {
          label.removeClass(this.uncheckedClass + active).addClass(checkedClass).buttonMarkup({ icon: this.checkedicon });
        } else {
          label.removeClass(checkedClass).addClass(this.uncheckedClass).buttonMarkup({ icon: this.uncheckedicon });
        }
        if (input.disabled) {
          this.disable();
        } else {
          this.enable();
        }
      },
      disable: function () {
        this.element.prop('disabled', true).parent().addClass('ui-disabled');
      },
      enable: function () {
        this.element.prop('disabled', false).parent().removeClass('ui-disabled');
      }
    });
    $.widget('mobile.checkboxradio', $.mobile.checkboxradio, $.mobile.behaviors.formReset);
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.checkboxradio.prototype.enhanceWithin(e.target, true);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.button', $.mobile.widget, {
      options: {
        theme: null,
        icon: null,
        iconpos: null,
        corners: true,
        shadow: true,
        iconshadow: true,
        inline: null,
        mini: null,
        initSelector: 'button, [type=\'button\'], [type=\'submit\'], [type=\'reset\']'
      },
      _create: function () {
        var $el = this.element, $button, o = function (tdo) {
            var key, ret = {};
            for (key in tdo) {
              if (tdo[key] !== null && key !== 'initSelector') {
                ret[key] = tdo[key];
              }
            }
            return ret;
          }(this.options), classes = '', $buttonPlaceholder;
        if ($el[0].tagName === 'A') {
          if (!$el.hasClass('ui-btn')) {
            $el.buttonMarkup();
          }
          return;
        }
        if (!this.options.theme) {
          this.options.theme = $.mobile.getInheritedTheme(this.element, 'c');
        }
        if (!!~$el[0].className.indexOf('ui-btn-left')) {
          classes = 'ui-btn-left';
        }
        if (!!~$el[0].className.indexOf('ui-btn-right')) {
          classes = 'ui-btn-right';
        }
        if ($el.attr('type') === 'submit' || $el.attr('type') === 'reset') {
          classes ? classes += ' ui-submit' : classes = 'ui-submit';
        }
        $('label[for=\'' + $el.attr('id') + '\']').addClass('ui-submit');
        this.button = $('<div></div>')[$el.html() ? 'html' : 'text']($el.html() || $el.val()).insertBefore($el).buttonMarkup(o).addClass(classes).append($el.addClass('ui-btn-hidden'));
        $button = this.button;
        $el.bind({
          focus: function () {
            $button.addClass($.mobile.focusClass);
          },
          blur: function () {
            $button.removeClass($.mobile.focusClass);
          }
        });
        this.refresh();
      },
      _setOption: function (key, value) {
        var op = {};
        op[key] = value;
        if (key !== 'initSelector') {
          this.button.buttonMarkup(op);
          this.element.attr('data-' + ($.mobile.ns || '') + key.replace(/([A-Z])/, '-$1').toLowerCase(), value);
        }
        this._super('_setOption', key, value);
      },
      enable: function () {
        this.element.attr('disabled', false);
        this.button.removeClass('ui-disabled').attr('aria-disabled', false);
        return this._setOption('disabled', false);
      },
      disable: function () {
        this.element.attr('disabled', true);
        this.button.addClass('ui-disabled').attr('aria-disabled', true);
        return this._setOption('disabled', true);
      },
      refresh: function () {
        var $el = this.element;
        if ($el.prop('disabled')) {
          this.disable();
        } else {
          this.enable();
        }
        $(this.button.data('buttonElements').text)[$el.html() ? 'html' : 'text']($el.html() || $el.val());
      }
    });
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.button.prototype.enhanceWithin(e.target, true);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.controlgroup', $.mobile.widget, {
      options: {
        shadow: false,
        corners: true,
        excludeInvisible: true,
        type: 'vertical',
        mini: false,
        initSelector: ':jqmData(role=\'controlgroup\')'
      },
      _create: function () {
        var $el = this.element, ui = {
            inner: $('<div class=\'ui-controlgroup-controls\'></div>'),
            legend: $('<div role=\'heading\' class=\'ui-controlgroup-label\'></div>')
          }, grouplegend = $el.children('legend'), self = this;
        $el.wrapInner(ui.inner);
        if (grouplegend.length) {
          ui.legend.append(grouplegend).insertBefore($el.children(0));
        }
        $el.addClass('ui-corner-all ui-controlgroup');
        $.extend(this, { _initialRefresh: true });
        $.each(this.options, function (key, value) {
          self.options[key] = undefined;
          self._setOption(key, value, true);
        });
      },
      _init: function () {
        this.refresh();
      },
      _setOption: function (key, value) {
        var setter = '_set' + key.charAt(0).toUpperCase() + key.slice(1);
        if (this[setter] !== undefined) {
          this[setter](value);
        }
        this._super(key, value);
        this.element.attr('data-' + ($.mobile.ns || '') + key.replace(/([A-Z])/, '-$1').toLowerCase(), value);
      },
      _setType: function (value) {
        this.element.removeClass('ui-controlgroup-horizontal ui-controlgroup-vertical').addClass('ui-controlgroup-' + value);
        this.refresh();
      },
      _setCorners: function (value) {
        this.element.toggleClass('ui-corner-all', value);
      },
      _setShadow: function (value) {
        this.element.toggleClass('ui-shadow', value);
      },
      _setMini: function (value) {
        this.element.toggleClass('ui-mini', value);
      },
      container: function () {
        return this.element.children('.ui-controlgroup-controls');
      },
      refresh: function () {
        var els = this.element.find('.ui-btn').not('.ui-slider-handle'), create = this._initialRefresh;
        if ($.mobile.checkboxradio) {
          this.element.find(':mobile-checkboxradio').checkboxradio('refresh');
        }
        this._addFirstLastClasses(els, this.options.excludeInvisible ? this._getVisibles(els, create) : els, create);
        this._initialRefresh = false;
      }
    });
    $.widget('mobile.controlgroup', $.mobile.controlgroup, $.mobile.behaviors.addFirstLastClasses);
    $(function () {
      $.mobile.document.bind('pagecreate create', function (e) {
        $.mobile.controlgroup.prototype.enhanceWithin(e.target, true);
      });
    });
  }(jQuery));
  (function ($, undefined) {
    $(document).bind('pagecreate create', function (e) {
      $(e.target).find('a').jqmEnhanceable().not('.ui-btn, .ui-link-inherit, :jqmData(role=\'none\'), :jqmData(role=\'nojs\')').addClass('ui-link');
    });
  }(jQuery));
  (function ($, undefined) {
    function fitSegmentInsideSegment(winSize, segSize, offset, desired) {
      var ret = desired;
      if (winSize < segSize) {
        ret = offset + (winSize - segSize) / 2;
      } else {
        ret = Math.min(Math.max(offset, desired - segSize / 2), offset + winSize - segSize);
      }
      return ret;
    }
    function windowCoords() {
      var $win = $.mobile.window;
      return {
        x: $win.scrollLeft(),
        y: $win.scrollTop(),
        cx: window.innerWidth || $win.width(),
        cy: window.innerHeight || $win.height()
      };
    }
    $.widget('mobile.popup', $.mobile.widget, {
      options: {
        theme: null,
        overlayTheme: null,
        shadow: true,
        corners: true,
        transition: 'none',
        positionTo: 'origin',
        tolerance: null,
        initSelector: ':jqmData(role=\'popup\')',
        closeLinkSelector: 'a:jqmData(rel=\'back\')',
        closeLinkEvents: 'click.popup',
        navigateEvents: 'navigate.popup',
        closeEvents: 'navigate.popup pagebeforechange.popup',
        dismissible: true,
        history: !$.mobile.browser.oldIE
      },
      _eatEventAndClose: function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.options.dismissible) {
          this.close();
        }
        return false;
      },
      _resizeScreen: function () {
        var popupHeight = this._ui.container.outerHeight(true);
        this._ui.screen.removeAttr('style');
        if (popupHeight > this._ui.screen.height()) {
          this._ui.screen.height(popupHeight);
        }
      },
      _handleWindowKeyUp: function (e) {
        if (this._isOpen && e.keyCode === $.mobile.keyCode.ESCAPE) {
          return this._eatEventAndClose(e);
        }
      },
      _expectResizeEvent: function () {
        var winCoords = windowCoords();
        if (this._resizeData) {
          if (winCoords.x === this._resizeData.winCoords.x && winCoords.y === this._resizeData.winCoords.y && winCoords.cx === this._resizeData.winCoords.cx && winCoords.cy === this._resizeData.winCoords.cy) {
            return false;
          } else {
            clearTimeout(this._resizeData.timeoutId);
          }
        }
        this._resizeData = {
          timeoutId: setTimeout($.proxy(this, '_resizeTimeout'), 200),
          winCoords: winCoords
        };
        return true;
      },
      _resizeTimeout: function () {
        if (this._isOpen) {
          if (!this._expectResizeEvent()) {
            if (this._ui.container.hasClass('ui-popup-hidden')) {
              this._ui.container.removeClass('ui-popup-hidden');
              this.reposition({ positionTo: 'window' });
              this._ignoreResizeEvents();
            }
            this._resizeScreen();
            this._resizeData = null;
            this._orientationchangeInProgress = false;
          }
        } else {
          this._resizeData = null;
          this._orientationchangeInProgress = false;
        }
      },
      _ignoreResizeEvents: function () {
        var self = this;
        if (this._ignoreResizeTo) {
          clearTimeout(this._ignoreResizeTo);
        }
        this._ignoreResizeTo = setTimeout(function () {
          self._ignoreResizeTo = 0;
        }, 1000);
      },
      _handleWindowResize: function (e) {
        if (this._isOpen && this._ignoreResizeTo === 0) {
          if ((this._expectResizeEvent() || this._orientationchangeInProgress) && !this._ui.container.hasClass('ui-popup-hidden')) {
            this._ui.container.addClass('ui-popup-hidden').removeAttr('style');
          }
        }
      },
      _handleWindowOrientationchange: function (e) {
        if (!this._orientationchangeInProgress && this._isOpen && this._ignoreResizeTo === 0) {
          this._expectResizeEvent();
          this._orientationchangeInProgress = true;
        }
      },
      _handleDocumentFocusIn: function (e) {
        var tgt = e.target, $tgt, ui = this._ui;
        if (!this._isOpen) {
          return;
        }
        if (tgt !== ui.container[0]) {
          $tgt = $(e.target);
          if (0 === $tgt.parents().filter(ui.container[0]).length) {
            $(document.activeElement).one('focus', function (e) {
              $tgt.blur();
            });
            ui.focusElement.focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
          } else if (ui.focusElement[0] === ui.container[0]) {
            ui.focusElement = $tgt;
          }
        } else if (ui.focusElement && ui.focusElement[0] !== ui.container[0]) {
          ui.container.blur();
          ui.focusElement.focus();
        }
        this._ignoreResizeEvents();
      },
      _create: function () {
        var ui = {
            screen: $('<div class=\'ui-screen-hidden ui-popup-screen\'></div>'),
            placeholder: $('<div style=\'display: none;\'><!-- placeholder --></div>'),
            container: $('<div class=\'ui-popup-container ui-popup-hidden\'></div>')
          }, thisPage = this.element.closest('.ui-page'), myId = this.element.attr('id'), self = this;
        this.options.history = this.options.history && $.mobile.ajaxEnabled && $.mobile.hashListeningEnabled;
        if (thisPage.length === 0) {
          thisPage = $('body');
        }
        this.options.container = this.options.container || $.mobile.pageContainer;
        thisPage.append(ui.screen);
        ui.container.insertAfter(ui.screen);
        ui.placeholder.insertAfter(this.element);
        if (myId) {
          ui.screen.attr('id', myId + '-screen');
          ui.container.attr('id', myId + '-popup');
          ui.placeholder.html('<!-- placeholder for ' + myId + ' -->');
        }
        ui.container.append(this.element);
        ui.focusElement = ui.container;
        this.element.addClass('ui-popup');
        $.extend(this, {
          _scrollTop: 0,
          _page: thisPage,
          _ui: ui,
          _fallbackTransition: '',
          _currentTransition: false,
          _prereqs: null,
          _isOpen: false,
          _tolerance: null,
          _resizeData: null,
          _ignoreResizeTo: 0,
          _orientationchangeInProgress: false
        });
        $.each(this.options, function (key, value) {
          self.options[key] = undefined;
          self._setOption(key, value, true);
        });
        ui.screen.bind('vclick', $.proxy(this, '_eatEventAndClose'));
        this._on($.mobile.window, {
          orientationchange: $.proxy(this, '_handleWindowOrientationchange'),
          resize: $.proxy(this, '_handleWindowResize'),
          keyup: $.proxy(this, '_handleWindowKeyUp')
        });
        this._on($.mobile.document, { focusin: $.proxy(this, '_handleDocumentFocusIn') });
      },
      _applyTheme: function (dst, theme, prefix) {
        var classes = (dst.attr('class') || '').split(' '), alreadyAdded = true, currentTheme = null, matches, themeStr = String(theme);
        while (classes.length > 0) {
          currentTheme = classes.pop();
          matches = new RegExp('^ui-' + prefix + '-([a-z])$').exec(currentTheme);
          if (matches && matches.length > 1) {
            currentTheme = matches[1];
            break;
          } else {
            currentTheme = null;
          }
        }
        if (theme !== currentTheme) {
          dst.removeClass('ui-' + prefix + '-' + currentTheme);
          if (!(theme === null || theme === 'none')) {
            dst.addClass('ui-' + prefix + '-' + themeStr);
          }
        }
      },
      _setTheme: function (value) {
        this._applyTheme(this.element, value, 'body');
      },
      _setOverlayTheme: function (value) {
        this._applyTheme(this._ui.screen, value, 'overlay');
        if (this._isOpen) {
          this._ui.screen.addClass('in');
        }
      },
      _setShadow: function (value) {
        this.element.toggleClass('ui-overlay-shadow', value);
      },
      _setCorners: function (value) {
        this.element.toggleClass('ui-corner-all', value);
      },
      _applyTransition: function (value) {
        this._ui.container.removeClass(this._fallbackTransition);
        if (value && value !== 'none') {
          this._fallbackTransition = $.mobile._maybeDegradeTransition(value);
          if (this._fallbackTransition === 'none') {
            this._fallbackTransition = '';
          }
          this._ui.container.addClass(this._fallbackTransition);
        }
      },
      _setTransition: function (value) {
        if (!this._currentTransition) {
          this._applyTransition(value);
        }
      },
      _setTolerance: function (value) {
        var tol = {
            t: 30,
            r: 15,
            b: 30,
            l: 15
          };
        if (value !== undefined) {
          var ar = String(value).split(',');
          $.each(ar, function (idx, val) {
            ar[idx] = parseInt(val, 10);
          });
          switch (ar.length) {
          case 1:
            if (!isNaN(ar[0])) {
              tol.t = tol.r = tol.b = tol.l = ar[0];
            }
            break;
          case 2:
            if (!isNaN(ar[0])) {
              tol.t = tol.b = ar[0];
            }
            if (!isNaN(ar[1])) {
              tol.l = tol.r = ar[1];
            }
            break;
          case 4:
            if (!isNaN(ar[0])) {
              tol.t = ar[0];
            }
            if (!isNaN(ar[1])) {
              tol.r = ar[1];
            }
            if (!isNaN(ar[2])) {
              tol.b = ar[2];
            }
            if (!isNaN(ar[3])) {
              tol.l = ar[3];
            }
            break;
          default:
            break;
          }
        }
        this._tolerance = tol;
      },
      _setOption: function (key, value) {
        var exclusions, setter = '_set' + key.charAt(0).toUpperCase() + key.slice(1);
        if (this[setter] !== undefined) {
          this[setter](value);
        }
        exclusions = [
          'initSelector',
          'closeLinkSelector',
          'closeLinkEvents',
          'navigateEvents',
          'closeEvents',
          'history',
          'container'
        ];
        $.mobile.widget.prototype._setOption.apply(this, arguments);
        if ($.inArray(key, exclusions) === -1) {
          this.element.attr('data-' + ($.mobile.ns || '') + key.replace(/([A-Z])/, '-$1').toLowerCase(), value);
        }
      },
      _placementCoords: function (desired) {
        var winCoords = windowCoords(), rc = {
            x: this._tolerance.l,
            y: winCoords.y + this._tolerance.t,
            cx: winCoords.cx - this._tolerance.l - this._tolerance.r,
            cy: winCoords.cy - this._tolerance.t - this._tolerance.b
          }, menuSize, ret;
        this._ui.container.css('max-width', rc.cx);
        menuSize = {
          cx: this._ui.container.outerWidth(true),
          cy: this._ui.container.outerHeight(true)
        };
        ret = {
          x: fitSegmentInsideSegment(rc.cx, menuSize.cx, rc.x, desired.x),
          y: fitSegmentInsideSegment(rc.cy, menuSize.cy, rc.y, desired.y)
        };
        ret.y = Math.max(0, ret.y);
        var docEl = document.documentElement, docBody = document.body, docHeight = Math.max(docEl.clientHeight, docBody.scrollHeight, docBody.offsetHeight, docEl.scrollHeight, docEl.offsetHeight);
        ret.y -= Math.min(ret.y, Math.max(0, ret.y + menuSize.cy - docHeight));
        return {
          left: ret.x,
          top: ret.y
        };
      },
      _createPrereqs: function (screenPrereq, containerPrereq, whenDone) {
        var self = this, prereqs;
        prereqs = {
          screen: $.Deferred(),
          container: $.Deferred()
        };
        prereqs.screen.then(function () {
          if (prereqs === self._prereqs) {
            screenPrereq();
          }
        });
        prereqs.container.then(function () {
          if (prereqs === self._prereqs) {
            containerPrereq();
          }
        });
        $.when(prereqs.screen, prereqs.container).done(function () {
          if (prereqs === self._prereqs) {
            self._prereqs = null;
            whenDone();
          }
        });
        self._prereqs = prereqs;
      },
      _animate: function (args) {
        this._ui.screen.removeClass(args.classToRemove).addClass(args.screenClassToAdd);
        args.prereqs.screen.resolve();
        if (args.transition && args.transition !== 'none') {
          if (args.applyTransition) {
            this._applyTransition(args.transition);
          }
          if (this._fallbackTransition) {
            this._ui.container.animationComplete($.proxy(args.prereqs.container, 'resolve')).addClass(args.containerClassToAdd).removeClass(args.classToRemove);
            return;
          }
        }
        this._ui.container.removeClass(args.classToRemove);
        args.prereqs.container.resolve();
      },
      _desiredCoords: function (o) {
        var dst = null, offset, winCoords = windowCoords(), x = o.x, y = o.y, pTo = o.positionTo;
        if (pTo && pTo !== 'origin') {
          if (pTo === 'window') {
            x = winCoords.cx / 2 + winCoords.x;
            y = winCoords.cy / 2 + winCoords.y;
          } else {
            try {
              dst = $(pTo);
            } catch (e) {
              dst = null;
            }
            if (dst) {
              dst.filter(':visible');
              if (dst.length === 0) {
                dst = null;
              }
            }
          }
        }
        if (dst) {
          offset = dst.offset();
          x = offset.left + dst.outerWidth() / 2;
          y = offset.top + dst.outerHeight() / 2;
        }
        if ($.type(x) !== 'number' || isNaN(x)) {
          x = winCoords.cx / 2 + winCoords.x;
        }
        if ($.type(y) !== 'number' || isNaN(y)) {
          y = winCoords.cy / 2 + winCoords.y;
        }
        return {
          x: x,
          y: y
        };
      },
      _reposition: function (o) {
        o = {
          x: o.x,
          y: o.y,
          positionTo: o.positionTo
        };
        this._trigger('beforeposition', o);
        this._ui.container.offset(this._placementCoords(this._desiredCoords(o)));
      },
      reposition: function (o) {
        if (this._isOpen) {
          this._reposition(o);
        }
      },
      _openPrereqsComplete: function () {
        this._ui.container.addClass('ui-popup-active');
        this._isOpen = true;
        this._resizeScreen();
        this._ui.container.attr('tabindex', '0').focus();
        this._ignoreResizeEvents();
        this._trigger('afteropen');
      },
      _open: function (options) {
        var o = $.extend({}, this.options, options), androidBlacklist = function () {
            var w = window, ua = navigator.userAgent, wkmatch = ua.match(/AppleWebKit\/([0-9\.]+)/), wkversion = !!wkmatch && wkmatch[1], androidmatch = ua.match(/Android (\d+(?:\.\d+))/), andversion = !!androidmatch && androidmatch[1], chromematch = ua.indexOf('Chrome') > -1;
            if (androidmatch !== null && andversion === '4.0' && wkversion && wkversion > 534.13 && !chromematch) {
              return true;
            }
            return false;
          }();
        this._createPrereqs($.noop, $.noop, $.proxy(this, '_openPrereqsComplete'));
        this._currentTransition = o.transition;
        this._applyTransition(o.transition);
        if (!this.options.theme) {
          this._setTheme(this._page.jqmData('theme') || $.mobile.getInheritedTheme(this._page, 'c'));
        }
        this._ui.screen.removeClass('ui-screen-hidden');
        this._ui.container.removeClass('ui-popup-hidden');
        this._reposition(o);
        if (this.options.overlayTheme && androidBlacklist) {
          this.element.closest('.ui-page').addClass('ui-popup-open');
        }
        this._animate({
          additionalCondition: true,
          transition: o.transition,
          classToRemove: '',
          screenClassToAdd: 'in',
          containerClassToAdd: 'in',
          applyTransition: false,
          prereqs: this._prereqs
        });
      },
      _closePrereqScreen: function () {
        this._ui.screen.removeClass('out').addClass('ui-screen-hidden');
      },
      _closePrereqContainer: function () {
        this._ui.container.removeClass('reverse out').addClass('ui-popup-hidden').removeAttr('style');
      },
      _closePrereqsDone: function () {
        var opts = this.options;
        this._ui.container.removeAttr('tabindex');
        $.mobile.popup.active = undefined;
        this._trigger('afterclose');
      },
      _close: function (immediate) {
        this._ui.container.removeClass('ui-popup-active');
        this._page.removeClass('ui-popup-open');
        this._isOpen = false;
        this._createPrereqs($.proxy(this, '_closePrereqScreen'), $.proxy(this, '_closePrereqContainer'), $.proxy(this, '_closePrereqsDone'));
        this._animate({
          additionalCondition: this._ui.screen.hasClass('in'),
          transition: immediate ? 'none' : this._currentTransition,
          classToRemove: 'in',
          screenClassToAdd: 'out',
          containerClassToAdd: 'reverse out',
          applyTransition: true,
          prereqs: this._prereqs
        });
      },
      _unenhance: function () {
        this._setTheme('none');
        this.element.detach().insertAfter(this._ui.placeholder).removeClass('ui-popup ui-overlay-shadow ui-corner-all');
        this._ui.screen.remove();
        this._ui.container.remove();
        this._ui.placeholder.remove();
      },
      _destroy: function () {
        if ($.mobile.popup.active === this) {
          this.element.one('popupafterclose', $.proxy(this, '_unenhance'));
          this.close();
        } else {
          this._unenhance();
        }
      },
      _closePopup: function (e, data) {
        var parsedDst, toUrl, o = this.options, immediate = false;
        window.scrollTo(0, this._scrollTop);
        if (e && e.type === 'pagebeforechange' && data) {
          if (typeof data.toPage === 'string') {
            parsedDst = data.toPage;
          } else {
            parsedDst = data.toPage.jqmData('url');
          }
          parsedDst = $.mobile.path.parseUrl(parsedDst);
          toUrl = parsedDst.pathname + parsedDst.search + parsedDst.hash;
          if (this._myUrl !== $.mobile.path.makeUrlAbsolute(toUrl)) {
            immediate = true;
          } else {
            e.preventDefault();
          }
        }
        o.container.unbind(o.closeEvents);
        this.element.undelegate(o.closeLinkSelector, o.closeLinkEvents);
        this._close(immediate);
      },
      _bindContainerClose: function () {
        this.options.container.one(this.options.closeEvents, $.proxy(this, '_closePopup'));
      },
      open: function (options) {
        var self = this, opts = this.options, url, hashkey, activePage, currentIsDialog, hasHash, urlHistory;
        if ($.mobile.popup.active) {
          return;
        }
        $.mobile.popup.active = this;
        this._scrollTop = $.mobile.window.scrollTop();
        if (!opts.history) {
          self._open(options);
          self._bindContainerClose();
          self.element.delegate(opts.closeLinkSelector, opts.closeLinkEvents, function (e) {
            self.close();
            e.preventDefault();
          });
          return;
        }
        urlHistory = $.mobile.urlHistory;
        hashkey = $.mobile.dialogHashKey;
        activePage = $.mobile.activePage;
        currentIsDialog = activePage.is('.ui-dialog');
        this._myUrl = url = urlHistory.getActive().url;
        hasHash = url.indexOf(hashkey) > -1 && !currentIsDialog && urlHistory.activeIndex > 0;
        if (hasHash) {
          self._open(options);
          self._bindContainerClose();
          return;
        }
        if (url.indexOf(hashkey) === -1 && !currentIsDialog) {
          url = url + (url.indexOf('#') > -1 ? hashkey : '#' + hashkey);
        } else {
          url = $.mobile.path.parseLocation().hash + hashkey;
        }
        if (urlHistory.activeIndex === 0 && url === urlHistory.initialDst) {
          url += hashkey;
        }
        $(window).one('beforenavigate', function (e) {
          e.preventDefault();
          self._open(options);
          self._bindContainerClose();
        });
        this.urlAltered = true;
        $.mobile.navigate(url, { role: 'dialog' });
      },
      close: function () {
        if ($.mobile.popup.active !== this) {
          return;
        }
        this._scrollTop = $.mobile.window.scrollTop();
        if (this.options.history && this.urlAltered) {
          $.mobile.back();
          this.urlAltered = false;
        } else {
          this._closePopup();
        }
      }
    });
    $.mobile.popup.handleLink = function ($link) {
      var closestPage = $link.closest(':jqmData(role=\'page\')'), scope = closestPage.length === 0 ? $('body') : closestPage, popup = $($.mobile.path.parseUrl($link.attr('href')).hash, scope[0]), offset;
      if (popup.data('mobile-popup')) {
        offset = $link.offset();
        popup.popup('open', {
          x: offset.left + $link.outerWidth() / 2,
          y: offset.top + $link.outerHeight() / 2,
          transition: $link.jqmData('transition'),
          positionTo: $link.jqmData('position-to')
        });
      }
      setTimeout(function () {
        var $parent = $link.parent().parent();
        if ($parent.hasClass('ui-li')) {
          $link = $parent.parent();
        }
        $link.removeClass($.mobile.activeBtnClass);
      }, 300);
    };
    $.mobile.document.bind('pagebeforechange', function (e, data) {
      if (data.options.role === 'popup') {
        $.mobile.popup.handleLink(data.options.link);
        e.preventDefault();
      }
    });
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.popup.prototype.enhanceWithin(e.target, true);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.panel', $.mobile.widget, {
      options: {
        classes: {
          panel: 'ui-panel',
          panelOpen: 'ui-panel-open',
          panelClosed: 'ui-panel-closed',
          panelFixed: 'ui-panel-fixed',
          panelInner: 'ui-panel-inner',
          modal: 'ui-panel-dismiss',
          modalOpen: 'ui-panel-dismiss-open',
          pagePanel: 'ui-page-panel',
          pagePanelOpen: 'ui-page-panel-open',
          contentWrap: 'ui-panel-content-wrap',
          contentWrapOpen: 'ui-panel-content-wrap-open',
          contentWrapClosed: 'ui-panel-content-wrap-closed',
          contentFixedToolbar: 'ui-panel-content-fixed-toolbar',
          contentFixedToolbarOpen: 'ui-panel-content-fixed-toolbar-open',
          contentFixedToolbarClosed: 'ui-panel-content-fixed-toolbar-closed',
          animate: 'ui-panel-animate'
        },
        animate: true,
        theme: 'c',
        position: 'left',
        dismissible: true,
        display: 'reveal',
        initSelector: ':jqmData(role=\'panel\')',
        swipeClose: true,
        positionFixed: false
      },
      _panelID: null,
      _closeLink: null,
      _page: null,
      _modal: null,
      _pannelInner: null,
      _wrapper: null,
      _fixedToolbar: null,
      _create: function () {
        var self = this, $el = self.element, page = $el.closest(':jqmData(role=\'page\')'), _getPageTheme = function () {
            var $theme = $.data(page[0], 'mobilePage').options.theme, $pageThemeClass = 'ui-body-' + $theme;
            return $pageThemeClass;
          }, _getPanelInner = function () {
            var $pannelInner = $el.find('.' + self.options.classes.panelInner);
            if ($pannelInner.length === 0) {
              $pannelInner = $el.children().wrapAll('<div class="' + self.options.classes.panelInner + '" />').parent();
            }
            return $pannelInner;
          }, _getWrapper = function () {
            var $wrapper = page.find('.' + self.options.classes.contentWrap);
            if ($wrapper.length === 0) {
              $wrapper = page.children('.ui-header:not(:jqmData(position=\'fixed\')), .ui-content:not(:jqmData(role=\'popup\')), .ui-footer:not(:jqmData(position=\'fixed\'))').wrapAll('<div class="' + self.options.classes.contentWrap + ' ' + _getPageTheme() + '" />').parent();
              if ($.support.cssTransform3d && !!self.options.animate) {
                $wrapper.addClass(self.options.classes.animate);
              }
            }
            return $wrapper;
          }, _getFixedToolbar = function () {
            var $fixedToolbar = page.find('.' + self.options.classes.contentFixedToolbar);
            if ($fixedToolbar.length === 0) {
              $fixedToolbar = page.find('.ui-header:jqmData(position=\'fixed\'), .ui-footer:jqmData(position=\'fixed\')').addClass(self.options.classes.contentFixedToolbar);
              if ($.support.cssTransform3d && !!self.options.animate) {
                $fixedToolbar.addClass(self.options.classes.animate);
              }
            }
            return $fixedToolbar;
          };
        $.extend(this, {
          _panelID: $el.attr('id'),
          _closeLink: $el.find(':jqmData(rel=\'close\')'),
          _page: $el.closest(':jqmData(role=\'page\')'),
          _pageTheme: _getPageTheme(),
          _pannelInner: _getPanelInner(),
          _wrapper: _getWrapper(),
          _fixedToolbar: _getFixedToolbar()
        });
        self._addPanelClasses();
        self._wrapper.addClass(this.options.classes.contentWrapClosed);
        self._fixedToolbar.addClass(this.options.classes.contentFixedToolbarClosed);
        self._page.addClass(self.options.classes.pagePanel);
        if ($.support.cssTransform3d && !!self.options.animate) {
          this.element.addClass(self.options.classes.animate);
        }
        self._bindUpdateLayout();
        self._bindCloseEvents();
        self._bindLinkListeners();
        self._bindPageEvents();
        if (!!self.options.dismissible) {
          self._createModal();
        }
        self._bindSwipeEvents();
      },
      _createModal: function (options) {
        var self = this;
        self._modal = $('<div class=\'' + self.options.classes.modal + '\' data-panelid=\'' + self._panelID + '\'></div>').on('mousedown', function () {
          self.close();
        }).appendTo(this._page);
      },
      _getPosDisplayClasses: function (prefix) {
        return prefix + '-position-' + this.options.position + ' ' + prefix + '-display-' + this.options.display;
      },
      _getPanelClasses: function () {
        var panelClasses = this.options.classes.panel + ' ' + this._getPosDisplayClasses(this.options.classes.panel) + ' ' + this.options.classes.panelClosed;
        if (this.options.theme) {
          panelClasses += ' ui-body-' + this.options.theme;
        }
        if (!!this.options.positionFixed) {
          panelClasses += ' ' + this.options.classes.panelFixed;
        }
        return panelClasses;
      },
      _addPanelClasses: function () {
        this.element.addClass(this._getPanelClasses());
      },
      _bindCloseEvents: function () {
        var self = this;
        self._closeLink.on('click.panel', function (e) {
          e.preventDefault();
          self.close();
          return false;
        });
        self.element.on('click.panel', 'a:jqmData(ajax=\'false\')', function (e) {
          self.close();
        });
      },
      _positionPanel: function () {
        var self = this, pannelInnerHeight = self._pannelInner.outerHeight(), expand = pannelInnerHeight > $.mobile.getScreenHeight();
        if (expand || !self.options.positionFixed) {
          if (expand) {
            self._unfixPanel();
            $.mobile.resetActivePageHeight(pannelInnerHeight);
          }
          self._scrollIntoView(pannelInnerHeight);
        } else {
          self._fixPanel();
        }
      },
      _scrollIntoView: function (pannelInnerHeight) {
        if (pannelInnerHeight < $(window).scrollTop()) {
          window.scrollTo(0, 0);
        }
      },
      _bindFixListener: function () {
        this._on($(window), { 'throttledresize': '_positionPanel' });
      },
      _unbindFixListener: function () {
        this._off($(window), 'throttledresize');
      },
      _unfixPanel: function () {
        if (!!this.options.positionFixed && $.support.fixedPosition) {
          this.element.removeClass(this.options.classes.panelFixed);
        }
      },
      _fixPanel: function () {
        if (!!this.options.positionFixed && $.support.fixedPosition) {
          this.element.addClass(this.options.classes.panelFixed);
        }
      },
      _bindUpdateLayout: function () {
        var self = this;
        self.element.on('updatelayout', function (e) {
          if (self._open) {
            self._positionPanel();
          }
        });
      },
      _bindLinkListeners: function () {
        var self = this;
        self._page.on('click.panel', 'a', function (e) {
          if (this.href.split('#')[1] === self._panelID && self._panelID !== undefined) {
            e.preventDefault();
            var $link = $(this);
            if (!$link.hasClass('ui-link')) {
              $link.addClass($.mobile.activeBtnClass);
              self.element.one('panelopen panelclose', function () {
                $link.removeClass($.mobile.activeBtnClass);
              });
            }
            self.toggle();
            return false;
          }
        });
      },
      _bindSwipeEvents: function () {
        var self = this, area = self._modal ? self.element.add(self._modal) : self.element;
        if (!!self.options.swipeClose) {
          if (self.options.position === 'left') {
            area.on('swipeleft.panel', function (e) {
              self.close();
            });
          } else {
            area.on('swiperight.panel', function (e) {
              self.close();
            });
          }
        }
      },
      _bindPageEvents: function () {
        var self = this;
        self._page.on('panelbeforeopen', function (e) {
          if (self._open && e.target !== self.element[0]) {
            self.close();
          }
        }).on('pagehide', function (e) {
          if (self._open) {
            self.close(true);
          }
        }).on('keyup.panel', function (e) {
          if (e.keyCode === 27 && self._open) {
            self.close();
          }
        });
      },
      _open: false,
      _contentWrapOpenClasses: null,
      _fixedToolbarOpenClasses: null,
      _modalOpenClasses: null,
      open: function (immediate) {
        if (!this._open) {
          var self = this, o = self.options, _openPanel = function () {
              self._page.off('panelclose');
              self._page.jqmData('panel', 'open');
              if (!immediate && $.support.cssTransform3d && !!o.animate) {
                self.element.add(self._wrapper).on(self._transitionEndEvents, complete);
              } else {
                setTimeout(complete, 0);
              }
              if (self.options.theme && self.options.display !== 'overlay') {
                self._page.removeClass(self._pageTheme).addClass('ui-body-' + self.options.theme);
              }
              self.element.removeClass(o.classes.panelClosed).addClass(o.classes.panelOpen);
              self._contentWrapOpenClasses = self._getPosDisplayClasses(o.classes.contentWrap);
              self._wrapper.removeClass(o.classes.contentWrapClosed).addClass(self._contentWrapOpenClasses + ' ' + o.classes.contentWrapOpen);
              self._fixedToolbarOpenClasses = self._getPosDisplayClasses(o.classes.contentFixedToolbar);
              self._fixedToolbar.removeClass(o.classes.contentFixedToolbarClosed).addClass(self._fixedToolbarOpenClasses + ' ' + o.classes.contentFixedToolbarOpen);
              self._modalOpenClasses = self._getPosDisplayClasses(o.classes.modal) + ' ' + o.classes.modalOpen;
              if (self._modal) {
                self._modal.addClass(self._modalOpenClasses);
              }
            }, complete = function () {
              self.element.add(self._wrapper).off(self._transitionEndEvents, complete);
              self._page.addClass(o.classes.pagePanelOpen);
              self._positionPanel();
              self._bindFixListener();
              self._trigger('open');
            };
          if (this.element.closest('.ui-page-active').length < 0) {
            immediate = true;
          }
          self._trigger('beforeopen');
          if (self._page.jqmData('panel') === 'open') {
            self._page.on('panelclose', function () {
              _openPanel();
            });
          } else {
            _openPanel();
          }
          self._open = true;
        }
      },
      close: function (immediate) {
        if (this._open) {
          var o = this.options, self = this, _closePanel = function () {
              if (!immediate && $.support.cssTransform3d && !!o.animate) {
                self.element.add(self._wrapper).on(self._transitionEndEvents, complete);
              } else {
                setTimeout(complete, 0);
              }
              self._page.removeClass(o.classes.pagePanelOpen);
              self.element.removeClass(o.classes.panelOpen);
              self._wrapper.removeClass(o.classes.contentWrapOpen);
              self._fixedToolbar.removeClass(o.classes.contentFixedToolbarOpen);
              if (self._modal) {
                self._modal.removeClass(self._modalOpenClasses);
              }
            }, complete = function () {
              if (self.options.theme && self.options.display !== 'overlay') {
                self._page.removeClass('ui-body-' + self.options.theme).addClass(self._pageTheme);
              }
              self.element.add(self._wrapper).off(self._transitionEndEvents, complete);
              self.element.addClass(o.classes.panelClosed);
              self._wrapper.removeClass(self._contentWrapOpenClasses).addClass(o.classes.contentWrapClosed);
              self._fixedToolbar.removeClass(self._fixedToolbarOpenClasses).addClass(o.classes.contentFixedToolbarClosed);
              self._fixPanel();
              self._unbindFixListener();
              $.mobile.resetActivePageHeight();
              self._page.jqmRemoveData('panel');
              self._trigger('close');
            };
          if (this.element.closest('.ui-page-active').length < 0) {
            immediate = true;
          }
          self._trigger('beforeclose');
          _closePanel();
          self._open = false;
        }
      },
      toggle: function (options) {
        this[this._open ? 'close' : 'open']();
      },
      _transitionEndEvents: 'webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd',
      _destroy: function () {
        var classes = this.options.classes, theme = this.options.theme, hasOtherSiblingPanels = this.element.siblings('.' + classes.panel).length;
        if (!hasOtherSiblingPanels) {
          this._wrapper.children().unwrap();
          this._page.find('a').unbind('panelopen panelclose');
          this._page.removeClass(classes.pagePanel);
          if (this._open) {
            this._page.jqmRemoveData('panel');
            this._page.removeClass(classes.pagePanelOpen);
            if (theme) {
              this._page.removeClass('ui-body-' + theme).addClass(this._pageTheme);
            }
            $.mobile.resetActivePageHeight();
          }
        } else if (this._open) {
          this._wrapper.removeClass(classes.contentWrapOpen);
          this._fixedToolbar.removeClass(classes.contentFixedToolbarOpen);
          this._page.jqmRemoveData('panel');
          this._page.removeClass(classes.pagePanelOpen);
          if (theme) {
            this._page.removeClass('ui-body-' + theme).addClass(this._pageTheme);
          }
        }
        this._pannelInner.children().unwrap();
        this.element.removeClass([
          this._getPanelClasses(),
          classes.panelAnimate
        ].join(' ')).off('swipeleft.panel swiperight.panel').off('panelbeforeopen').off('panelhide').off('keyup.panel').off('updatelayout');
        this._closeLink.off('click.panel');
        if (this._modal) {
          this._modal.remove();
        }
        this.element.off(this._transitionEndEvents).removeClass([
          classes.panelUnfixed,
          classes.panelClosed,
          classes.panelOpen
        ].join(' '));
      }
    });
    $(document).bind('pagecreate create', function (e) {
      $.mobile.panel.prototype.enhanceWithin(e.target);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.table', $.mobile.widget, {
      options: {
        classes: { table: 'ui-table' },
        initSelector: ':jqmData(role=\'table\')'
      },
      _create: function () {
        var self = this, trs = this.element.find('thead tr');
        this.element.addClass(this.options.classes.table);
        self.headers = this.element.find('tr:eq(0)').children();
        self.allHeaders = self.headers.add(trs.children());
        trs.each(function () {
          var coltally = 0;
          $(this).children().each(function (i) {
            var span = parseInt($(this).attr('colspan'), 10), sel = ':nth-child(' + (coltally + 1) + ')';
            $(this).jqmData('colstart', coltally + 1);
            if (span) {
              for (var j = 0; j < span - 1; j++) {
                coltally++;
                sel += ', :nth-child(' + (coltally + 1) + ')';
              }
            }
            $(this).jqmData('cells', self.element.find('tr').not(trs.eq(0)).not(this).children(sel));
            coltally++;
          });
        });
      }
    });
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.table.prototype.enhanceWithin(e.target);
    });
  }(jQuery));
  (function ($, undefined) {
    $.mobile.table.prototype.options.mode = 'columntoggle';
    $.mobile.table.prototype.options.columnBtnTheme = null;
    $.mobile.table.prototype.options.columnPopupTheme = null;
    $.mobile.table.prototype.options.columnBtnText = 'Columns...';
    $.mobile.table.prototype.options.classes = $.extend($.mobile.table.prototype.options.classes, {
      popup: 'ui-table-columntoggle-popup',
      columnBtn: 'ui-table-columntoggle-btn',
      priorityPrefix: 'ui-table-priority-',
      columnToggleTable: 'ui-table-columntoggle'
    });
    $.mobile.document.delegate(':jqmData(role=\'table\')', 'tablecreate', function () {
      var $table = $(this), self = $table.data('mobile-table'), o = self.options, ns = $.mobile.ns;
      if (o.mode !== 'columntoggle') {
        return;
      }
      self.element.addClass(o.classes.columnToggleTable);
      var id = ($table.attr('id') || o.classes.popup) + '-popup', $menuButton = $('<a href=\'#' + id + '\' class=\'' + o.classes.columnBtn + '\' data-' + ns + 'rel=\'popup\' data-' + ns + 'mini=\'true\'>' + o.columnBtnText + '</a>'), $popup = $('<div data-' + ns + 'role=\'popup\' data-' + ns + 'role=\'fieldcontain\' class=\'' + o.classes.popup + '\' id=\'' + id + '\'></div>'), $menu = $('<fieldset data-' + ns + 'role=\'controlgroup\'></fieldset>');
      self.headers.not('td').each(function () {
        var priority = $(this).jqmData('priority'), $cells = $(this).add($(this).jqmData('cells'));
        if (priority) {
          $cells.addClass(o.classes.priorityPrefix + priority);
          $('<label><input type=\'checkbox\' checked />' + $(this).text() + '</label>').appendTo($menu).children(0).jqmData('cells', $cells).checkboxradio({ theme: o.columnPopupTheme });
        }
      });
      $menu.appendTo($popup);
      $menu.on('change', 'input', function (e) {
        if (this.checked) {
          $(this).jqmData('cells').removeClass('ui-table-cell-hidden').addClass('ui-table-cell-visible');
        } else {
          $(this).jqmData('cells').removeClass('ui-table-cell-visible').addClass('ui-table-cell-hidden');
        }
      });
      $menuButton.insertBefore($table).buttonMarkup({ theme: o.columnBtnTheme });
      $popup.insertBefore($table).popup();
      self.refresh = function () {
        $menu.find('input').each(function () {
          this.checked = $(this).jqmData('cells').eq(0).css('display') === 'table-cell';
          $(this).checkboxradio('refresh');
        });
      };
      $.mobile.window.on('throttledresize', self.refresh);
      self.refresh();
    });
  }(jQuery));
  (function ($, undefined) {
    $.mobile.table.prototype.options.mode = 'reflow';
    $.mobile.table.prototype.options.classes = $.extend($.mobile.table.prototype.options.classes, {
      reflowTable: 'ui-table-reflow',
      cellLabels: 'ui-table-cell-label'
    });
    $.mobile.document.delegate(':jqmData(role=\'table\')', 'tablecreate', function () {
      var $table = $(this), self = $table.data('mobile-table'), o = self.options;
      if (o.mode !== 'reflow') {
        return;
      }
      self.element.addClass(o.classes.reflowTable);
      var reverseHeaders = $(self.allHeaders.get().reverse());
      reverseHeaders.each(function (i) {
        var $cells = $(this).jqmData('cells'), colstart = $(this).jqmData('colstart'), hierarchyClass = $cells.not(this).filter('thead th').length && ' ui-table-cell-label-top', text = $(this).text();
        if (text !== '') {
          if (hierarchyClass) {
            var iteration = parseInt($(this).attr('colspan'), 10), filter = '';
            if (iteration) {
              filter = 'td:nth-child(' + iteration + 'n + ' + colstart + ')';
            }
            $cells.filter(filter).prepend('<b class=\'' + o.classes.cellLabels + hierarchyClass + '\'>' + text + '</b>');
          } else {
            $cells.prepend('<b class=\'' + o.classes.cellLabels + '\'>' + text + '</b>');
          }
        }
      });
    });
  }(jQuery));
  (function ($) {
    var meta = $('meta[name=viewport]'), initialContent = meta.attr('content'), disabledZoom = initialContent + ',maximum-scale=1, user-scalable=no', enabledZoom = initialContent + ',maximum-scale=10, user-scalable=yes', disabledInitially = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(initialContent);
    $.mobile.zoom = $.extend({}, {
      enabled: !disabledInitially,
      locked: false,
      disable: function (lock) {
        if (!disabledInitially && !$.mobile.zoom.locked) {
          meta.attr('content', disabledZoom);
          $.mobile.zoom.enabled = false;
          $.mobile.zoom.locked = lock || false;
        }
      },
      enable: function (unlock) {
        if (!disabledInitially && (!$.mobile.zoom.locked || unlock === true)) {
          meta.attr('content', enabledZoom);
          $.mobile.zoom.enabled = true;
          $.mobile.zoom.locked = false;
        }
      },
      restore: function () {
        if (!disabledInitially) {
          meta.attr('content', initialContent);
          $.mobile.zoom.enabled = true;
        }
      }
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.textinput', $.mobile.widget, {
      options: {
        theme: null,
        mini: false,
        preventFocusZoom: /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf('AppleWebKit') > -1,
        initSelector: 'input[type=\'text\'], input[type=\'search\'], :jqmData(type=\'search\'), input[type=\'number\'], :jqmData(type=\'number\'), input[type=\'password\'], input[type=\'email\'], input[type=\'url\'], input[type=\'tel\'], textarea, input[type=\'time\'], input[type=\'date\'], input[type=\'month\'], input[type=\'week\'], input[type=\'datetime\'], input[type=\'datetime-local\'], input[type=\'color\'], input:not([type]), input[type=\'file\']',
        clearBtn: false,
        clearSearchButtonText: null,
        clearBtnText: 'clear text',
        disabled: false
      },
      _create: function () {
        var self = this, input = this.element, o = this.options, theme = o.theme || $.mobile.getInheritedTheme(this.element, 'c'), themeclass = ' ui-body-' + theme, miniclass = o.mini ? ' ui-mini' : '', isSearch = input.is('[type=\'search\'], :jqmData(type=\'search\')'), focusedEl, clearbtn, clearBtnText = o.clearSearchButtonText || o.clearBtnText, clearBtnBlacklist = input.is('textarea, :jqmData(type=\'range\')'), inputNeedsClearBtn = !!o.clearBtn && !clearBtnBlacklist, inputNeedsWrap = input.is('input') && !input.is(':jqmData(type=\'range\')');
        function toggleClear() {
          setTimeout(function () {
            clearbtn.toggleClass('ui-input-clear-hidden', !input.val());
          }, 0);
        }
        $('label[for=\'' + input.attr('id') + '\']').addClass('ui-input-text');
        focusedEl = input.addClass('ui-input-text ui-body-' + theme);
        if (typeof input[0].autocorrect !== 'undefined' && !$.support.touchOverflow) {
          input[0].setAttribute('autocorrect', 'off');
          input[0].setAttribute('autocomplete', 'off');
        }
        if (isSearch) {
          focusedEl = input.wrap('<div class=\'ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield' + themeclass + miniclass + '\'></div>').parent();
        } else if (inputNeedsWrap) {
          focusedEl = input.wrap('<div class=\'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow' + themeclass + miniclass + '\'></div>').parent();
        }
        if (inputNeedsClearBtn || isSearch) {
          clearbtn = $('<a href=\'#\' class=\'ui-input-clear\' title=\'' + clearBtnText + '\'>' + clearBtnText + '</a>').bind('click', function (event) {
            input.val('').focus().trigger('change');
            clearbtn.addClass('ui-input-clear-hidden');
            event.preventDefault();
          }).appendTo(focusedEl).buttonMarkup({
            icon: 'delete',
            iconpos: 'notext',
            corners: true,
            shadow: true,
            mini: o.mini
          });
          if (!isSearch) {
            focusedEl.addClass('ui-input-has-clear');
          }
          toggleClear();
          input.bind('paste cut keyup input focus change blur', toggleClear);
        } else if (!inputNeedsWrap && !isSearch) {
          input.addClass('ui-corner-all ui-shadow-inset' + themeclass + miniclass);
        }
        input.focus(function () {
          if (o.preventFocusZoom) {
            $.mobile.zoom.disable(true);
          }
          focusedEl.addClass($.mobile.focusClass);
        }).blur(function () {
          focusedEl.removeClass($.mobile.focusClass);
          if (o.preventFocusZoom) {
            $.mobile.zoom.enable(true);
          }
        });
        if (input.is('textarea')) {
          var extraLineHeight = 15, keyupTimeoutBuffer = 100, keyupTimeout;
          this._keyup = function () {
            var scrollHeight = input[0].scrollHeight, clientHeight = input[0].clientHeight;
            if (clientHeight < scrollHeight) {
              input.height(scrollHeight + extraLineHeight);
            }
          };
          input.on('keyup change input paste', function () {
            clearTimeout(keyupTimeout);
            keyupTimeout = setTimeout(self._keyup, keyupTimeoutBuffer);
          });
          this._on($.mobile.document, { 'pagechange': '_keyup' });
          if ($.trim(input.val())) {
            this._on($.mobile.window, { 'load': '_keyup' });
          }
        }
        if (input.attr('disabled')) {
          this.disable();
        }
      },
      disable: function () {
        var $el, isSearch = this.element.is('[type=\'search\'], :jqmData(type=\'search\')'), inputNeedsWrap = this.element.is('input') && !this.element.is(':jqmData(type=\'range\')'), parentNeedsDisabled = this.element.attr('disabled', true) && (inputNeedsWrap || isSearch);
        if (parentNeedsDisabled) {
          $el = this.element.parent();
        } else {
          $el = this.element;
        }
        $el.addClass('ui-disabled');
        return this._setOption('disabled', true);
      },
      enable: function () {
        var $el, isSearch = this.element.is('[type=\'search\'], :jqmData(type=\'search\')'), inputNeedsWrap = this.element.is('input') && !this.element.is(':jqmData(type=\'range\')'), parentNeedsEnabled = this.element.attr('disabled', false) && (inputNeedsWrap || isSearch);
        if (parentNeedsEnabled) {
          $el = this.element.parent();
        } else {
          $el = this.element;
        }
        $el.removeClass('ui-disabled');
        return this._setOption('disabled', false);
      }
    });
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.textinput.prototype.enhanceWithin(e.target, true);
    });
  }(jQuery));
  (function ($, undefined) {
    $.mobile.listview.prototype.options.filter = false;
    $.mobile.listview.prototype.options.filterPlaceholder = 'Filter items...';
    $.mobile.listview.prototype.options.filterTheme = 'c';
    $.mobile.listview.prototype.options.filterReveal = false;
    var defaultFilterCallback = function (text, searchValue, item) {
      return text.toString().toLowerCase().indexOf(searchValue) === -1;
    };
    $.mobile.listview.prototype.options.filterCallback = defaultFilterCallback;
    $.mobile.document.delegate('ul, ol', 'listviewcreate', function () {
      var list = $(this), listview = list.data('mobile-listview');
      if (!listview.options.filter) {
        return;
      }
      if (listview.options.filterReveal) {
        list.children().addClass('ui-screen-hidden');
      }
      var wrapper = $('<form>', {
          'class': 'ui-listview-filter ui-bar-' + listview.options.filterTheme,
          'role': 'search'
        }).submit(function (e) {
          e.preventDefault();
          search.blur();
        }), onKeyUp = function (e) {
          var $this = $(this), val = this.value.toLowerCase(), listItems = null, li = list.children(), lastval = $this.jqmData('lastval') + '', childItems = false, itemtext = '', item, isCustomFilterCallback = listview.options.filterCallback !== defaultFilterCallback;
          if (lastval && lastval === val) {
            return;
          }
          listview._trigger('beforefilter', 'beforefilter', { input: this });
          $this.jqmData('lastval', val);
          if (isCustomFilterCallback || val.length < lastval.length || val.indexOf(lastval) !== 0) {
            listItems = list.children();
          } else {
            listItems = list.children(':not(.ui-screen-hidden)');
            if (!listItems.length && listview.options.filterReveal) {
              listItems = list.children('.ui-screen-hidden');
            }
          }
          if (val) {
            for (var i = listItems.length - 1; i >= 0; i--) {
              item = $(listItems[i]);
              itemtext = item.jqmData('filtertext') || item.text();
              if (item.is('li:jqmData(role=list-divider)')) {
                item.toggleClass('ui-filter-hidequeue', !childItems);
                childItems = false;
              } else if (listview.options.filterCallback(itemtext, val, item)) {
                item.toggleClass('ui-filter-hidequeue', true);
              } else {
                childItems = true;
              }
            }
            listItems.filter(':not(.ui-filter-hidequeue)').toggleClass('ui-screen-hidden', false);
            listItems.filter('.ui-filter-hidequeue').toggleClass('ui-screen-hidden', true).toggleClass('ui-filter-hidequeue', false);
          } else {
            listItems.toggleClass('ui-screen-hidden', !!listview.options.filterReveal);
          }
          listview._addFirstLastClasses(li, listview._getVisibles(li, false), false);
        }, search = $('<input>', { placeholder: listview.options.filterPlaceholder }).attr('data-' + $.mobile.ns + 'type', 'search').jqmData('lastval', '').bind('keyup change input', onKeyUp).appendTo(wrapper).textinput();
      if (listview.options.inset) {
        wrapper.addClass('ui-listview-filter-inset');
      }
      wrapper.bind('submit', function () {
        return false;
      }).insertBefore(list);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.slider', $.mobile.widget, {
      widgetEventPrefix: 'slide',
      options: {
        theme: null,
        trackTheme: null,
        disabled: false,
        initSelector: 'input[type=\'range\'], :jqmData(type=\'range\'), :jqmData(role=\'slider\')',
        mini: false,
        highlight: false
      },
      _create: function () {
        var self = this, control = this.element, parentTheme = $.mobile.getInheritedTheme(control, 'c'), theme = this.options.theme || parentTheme, trackTheme = this.options.trackTheme || parentTheme, cType = control[0].nodeName.toLowerCase(), isSelect = this.isToggleSwitch = cType === 'select', isRangeslider = control.parent().is(':jqmData(role=\'rangeslider\')'), selectClass = this.isToggleSwitch ? 'ui-slider-switch' : '', controlID = control.attr('id'), $label = $('[for=\'' + controlID + '\']'), labelID = $label.attr('id') || controlID + '-label', label = $label.attr('id', labelID), min = !this.isToggleSwitch ? parseFloat(control.attr('min')) : 0, max = !this.isToggleSwitch ? parseFloat(control.attr('max')) : control.find('option').length - 1, step = window.parseFloat(control.attr('step') || 1), miniClass = this.options.mini || control.jqmData('mini') ? ' ui-mini' : '', domHandle = document.createElement('a'), handle = $(domHandle), domSlider = document.createElement('div'), slider = $(domSlider), valuebg = this.options.highlight && !this.isToggleSwitch ? function () {
            var bg = document.createElement('div');
            bg.className = 'ui-slider-bg ' + $.mobile.activeBtnClass + ' ui-btn-corner-all';
            return $(bg).prependTo(slider);
          }() : false, options;
        domHandle.setAttribute('href', '#');
        domSlider.setAttribute('role', 'application');
        domSlider.className = [
          this.isToggleSwitch ? 'ui-slider ' : 'ui-slider-track ',
          selectClass,
          ' ui-btn-down-',
          trackTheme,
          ' ui-btn-corner-all',
          miniClass
        ].join('');
        domHandle.className = 'ui-slider-handle';
        domSlider.appendChild(domHandle);
        handle.buttonMarkup({
          corners: true,
          theme: theme,
          shadow: true
        }).attr({
          'role': 'slider',
          'aria-valuemin': min,
          'aria-valuemax': max,
          'aria-valuenow': this._value(),
          'aria-valuetext': this._value(),
          'title': this._value(),
          'aria-labelledby': labelID
        });
        $.extend(this, {
          slider: slider,
          handle: handle,
          type: cType,
          step: step,
          max: max,
          min: min,
          valuebg: valuebg,
          isRangeslider: isRangeslider,
          dragging: false,
          beforeStart: null,
          userModified: false,
          mouseMoved: false
        });
        if (this.isToggleSwitch) {
          var wrapper = document.createElement('div');
          wrapper.className = 'ui-slider-inneroffset';
          for (var j = 0, length = domSlider.childNodes.length; j < length; j++) {
            wrapper.appendChild(domSlider.childNodes[j]);
          }
          domSlider.appendChild(wrapper);
          handle.addClass('ui-slider-handle-snapping');
          options = control.find('option');
          for (var i = 0, optionsCount = options.length; i < optionsCount; i++) {
            var side = !i ? 'b' : 'a', sliderTheme = !i ? ' ui-btn-down-' + trackTheme : ' ' + $.mobile.activeBtnClass, sliderLabel = document.createElement('div'), sliderImg = document.createElement('span');
            sliderImg.className = [
              'ui-slider-label ui-slider-label-',
              side,
              sliderTheme,
              ' ui-btn-corner-all'
            ].join('');
            sliderImg.setAttribute('role', 'img');
            sliderImg.appendChild(document.createTextNode(options[i].innerHTML));
            $(sliderImg).prependTo(slider);
          }
          self._labels = $('.ui-slider-label', slider);
        }
        label.addClass('ui-slider');
        control.addClass(this.isToggleSwitch ? 'ui-slider-switch' : 'ui-slider-input');
        this._on(control, {
          'change': '_controlChange',
          'keyup': '_controlKeyup',
          'blur': '_controlBlur',
          'vmouseup': '_controlVMouseUp'
        });
        slider.bind('vmousedown', $.proxy(this._sliderVMouseDown, this)).bind('vclick', false);
        this._on(document, { 'vmousemove': '_preventDocumentDrag' });
        this._on(slider.add(document), { 'vmouseup': '_sliderVMouseUp' });
        slider.insertAfter(control);
        if (!this.isToggleSwitch && !isRangeslider) {
          var wrapper = this.options.mini ? '<div class=\'ui-slider ui-mini\'>' : '<div class=\'ui-slider\'>';
          control.add(slider).wrapAll(wrapper);
        }
        if (this.isToggleSwitch) {
          this.handle.bind({
            focus: function () {
              slider.addClass($.mobile.focusClass);
            },
            blur: function () {
              slider.removeClass($.mobile.focusClass);
            }
          });
        }
        this._on(this.handle, {
          'vmousedown': '_handleVMouseDown',
          'keydown': '_handleKeydown',
          'keyup': '_handleKeyup'
        });
        this.handle.bind('vclick', false);
        if (this._handleFormReset) {
          this._handleFormReset();
        }
        this.refresh(undefined, undefined, true);
      },
      _controlChange: function (event) {
        if (this._trigger('controlchange', event) === false) {
          return false;
        }
        if (!this.mouseMoved) {
          this.refresh(this._value(), true);
        }
      },
      _controlKeyup: function (event) {
        this.refresh(this._value(), true, true);
      },
      _controlBlur: function (event) {
        this.refresh(this._value(), true);
      },
      _controlVMouseUp: function (event) {
        this._checkedRefresh();
      },
      _handleVMouseDown: function (event) {
        this.handle.focus();
      },
      _handleKeydown: function (event) {
        var index = this._value();
        if (this.options.disabled) {
          return;
        }
        switch (event.keyCode) {
        case $.mobile.keyCode.HOME:
        case $.mobile.keyCode.END:
        case $.mobile.keyCode.PAGE_UP:
        case $.mobile.keyCode.PAGE_DOWN:
        case $.mobile.keyCode.UP:
        case $.mobile.keyCode.RIGHT:
        case $.mobile.keyCode.DOWN:
        case $.mobile.keyCode.LEFT:
          event.preventDefault();
          if (!this._keySliding) {
            this._keySliding = true;
            this.handle.addClass('ui-state-active');
          }
          break;
        }
        switch (event.keyCode) {
        case $.mobile.keyCode.HOME:
          this.refresh(this.min);
          break;
        case $.mobile.keyCode.END:
          this.refresh(this.max);
          break;
        case $.mobile.keyCode.PAGE_UP:
        case $.mobile.keyCode.UP:
        case $.mobile.keyCode.RIGHT:
          this.refresh(index + this.step);
          break;
        case $.mobile.keyCode.PAGE_DOWN:
        case $.mobile.keyCode.DOWN:
        case $.mobile.keyCode.LEFT:
          this.refresh(index - this.step);
          break;
        }
      },
      _handleKeyup: function (event) {
        if (this._keySliding) {
          this._keySliding = false;
          this.handle.removeClass('ui-state-active');
        }
      },
      _sliderVMouseDown: function (event) {
        if (this.options.disabled) {
          return false;
        }
        if (this._trigger('beforestart', event) === false) {
          return false;
        }
        this.dragging = true;
        this.userModified = false;
        this.mouseMoved = false;
        if (this.isToggleSwitch) {
          this.beforeStart = this.element[0].selectedIndex;
        }
        this.refresh(event);
        this._trigger('start');
        return false;
      },
      _sliderVMouseUp: function () {
        if (this.dragging) {
          this.dragging = false;
          if (this.isToggleSwitch) {
            this.handle.addClass('ui-slider-handle-snapping');
            if (this.mouseMoved) {
              if (this.userModified) {
                this.refresh(this.beforeStart === 0 ? 1 : 0);
              } else {
                this.refresh(this.beforeStart);
              }
            } else {
              this.refresh(this.beforeStart === 0 ? 1 : 0);
            }
          }
          this.mouseMoved = false;
          this._trigger('stop');
          return false;
        }
      },
      _preventDocumentDrag: function (event) {
        if (this._trigger('drag', event) === false) {
          return false;
        }
        if (this.dragging && !this.options.disabled) {
          this.mouseMoved = true;
          if (this.isToggleSwitch) {
            this.handle.removeClass('ui-slider-handle-snapping');
          }
          this.refresh(event);
          this.userModified = this.beforeStart !== this.element[0].selectedIndex;
          return false;
        }
      },
      _checkedRefresh: function () {
        if (this.value != this._value()) {
          this.refresh(this._value());
        }
      },
      _value: function () {
        return this.isToggleSwitch ? this.element[0].selectedIndex : parseFloat(this.element.val());
      },
      _reset: function () {
        this.refresh(undefined, false, true);
      },
      refresh: function (val, isfromControl, preventInputUpdate) {
        var self = this, parentTheme = $.mobile.getInheritedTheme(this.element, 'c'), theme = this.options.theme || parentTheme, trackTheme = this.options.trackTheme || parentTheme;
        self.slider[0].className = [
          this.isToggleSwitch ? 'ui-slider ui-slider-switch' : 'ui-slider-track',
          ' ui-btn-down-' + trackTheme,
          ' ui-btn-corner-all',
          this.options.mini ? ' ui-mini' : ''
        ].join('');
        if (this.options.disabled || this.element.attr('disabled')) {
          this.disable();
        }
        this.value = this._value();
        if (this.options.highlight && !this.isToggleSwitch && this.slider.find('.ui-slider-bg').length === 0) {
          this.valuebg = function () {
            var bg = document.createElement('div');
            bg.className = 'ui-slider-bg ' + $.mobile.activeBtnClass + ' ui-btn-corner-all';
            return $(bg).prependTo(self.slider);
          }();
        }
        this.handle.buttonMarkup({
          corners: true,
          theme: theme,
          shadow: true
        });
        var pxStep, percent, control = this.element, isInput = !this.isToggleSwitch, optionElements = isInput ? [] : control.find('option'), min = isInput ? parseFloat(control.attr('min')) : 0, max = isInput ? parseFloat(control.attr('max')) : optionElements.length - 1, step = isInput && parseFloat(control.attr('step')) > 0 ? parseFloat(control.attr('step')) : 1;
        if (typeof val === 'object') {
          var left, width, data = val, tol = 8;
          left = this.slider.offset().left;
          width = this.slider.width();
          pxStep = width / ((max - min) / step);
          if (!this.dragging || data.pageX < left - tol || data.pageX > left + width + tol) {
            return;
          }
          if (pxStep > 1) {
            percent = (data.pageX - left) / width * 100;
          } else {
            percent = Math.round((data.pageX - left) / width * 100);
          }
        } else {
          if (val == null) {
            val = isInput ? parseFloat(control.val() || 0) : control[0].selectedIndex;
          }
          percent = (parseFloat(val) - min) / (max - min) * 100;
        }
        if (isNaN(percent)) {
          return;
        }
        var newval = percent / 100 * (max - min) + min;
        var valModStep = (newval - min) % step;
        var alignValue = newval - valModStep;
        if (Math.abs(valModStep) * 2 >= step) {
          alignValue += valModStep > 0 ? step : -step;
        }
        var percentPerStep = 100 / ((max - min) / step);
        newval = parseFloat(alignValue.toFixed(5));
        if (typeof pxStep === 'undefined') {
          pxStep = width / ((max - min) / step);
        }
        if (pxStep > 1 && isInput) {
          percent = (newval - min) * percentPerStep * (1 / step);
        }
        if (percent < 0) {
          percent = 0;
        }
        if (percent > 100) {
          percent = 100;
        }
        if (newval < min) {
          newval = min;
        }
        if (newval > max) {
          newval = max;
        }
        this.handle.css('left', percent + '%');
        this.handle[0].setAttribute('aria-valuenow', isInput ? newval : optionElements.eq(newval).attr('value'));
        this.handle[0].setAttribute('aria-valuetext', isInput ? newval : optionElements.eq(newval).getEncodedText());
        this.handle[0].setAttribute('title', isInput ? newval : optionElements.eq(newval).getEncodedText());
        if (this.valuebg) {
          this.valuebg.css('width', percent + '%');
        }
        if (this._labels) {
          var handlePercent = this.handle.width() / this.slider.width() * 100, aPercent = percent && handlePercent + (100 - handlePercent) * percent / 100, bPercent = percent === 100 ? 0 : Math.min(handlePercent + 100 - aPercent, 100);
          this._labels.each(function () {
            var ab = $(this).is('.ui-slider-label-a');
            $(this).width((ab ? aPercent : bPercent) + '%');
          });
        }
        if (!preventInputUpdate) {
          var valueChanged = false;
          if (isInput) {
            valueChanged = control.val() !== newval;
            control.val(newval);
          } else {
            valueChanged = control[0].selectedIndex !== newval;
            control[0].selectedIndex = newval;
          }
          if (this._trigger('beforechange', val) === false) {
            return false;
          }
          if (!isfromControl && valueChanged) {
            control.trigger('change');
          }
        }
      },
      enable: function () {
        this.element.attr('disabled', false);
        this.slider.removeClass('ui-disabled').attr('aria-disabled', false);
        return this._setOption('disabled', false);
      },
      disable: function () {
        this.element.attr('disabled', true);
        this.slider.addClass('ui-disabled').attr('aria-disabled', true);
        return this._setOption('disabled', true);
      }
    });
    $.widget('mobile.slider', $.mobile.slider, $.mobile.behaviors.formReset);
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.slider.prototype.enhanceWithin(e.target, true);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.rangeslider', $.mobile.widget, {
      options: {
        theme: null,
        trackTheme: null,
        disabled: false,
        initSelector: ':jqmData(role=\'rangeslider\')',
        mini: false,
        highlight: true
      },
      _create: function () {
        var secondLabel, $el = this.element, elClass = this.options.mini ? 'ui-rangeslider ui-mini' : 'ui-rangeslider', _inputFirst = $el.find('input').first(), _inputLast = $el.find('input').last(), label = $el.find('label').first(), _sliderFirst = $.data(_inputFirst.get(0), 'mobileSlider').slider, _sliderLast = $.data(_inputLast.get(0), 'mobileSlider').slider, firstHandle = $.data(_inputFirst.get(0), 'mobileSlider').handle, _sliders = $('<div class="ui-rangeslider-sliders" />').appendTo($el);
        if ($el.find('label').length > 1) {
          secondLabel = $el.find('label').last().hide();
        }
        _inputFirst.addClass('ui-rangeslider-first');
        _inputLast.addClass('ui-rangeslider-last');
        $el.addClass(elClass);
        _sliderFirst.appendTo(_sliders);
        _sliderLast.appendTo(_sliders);
        label.prependTo($el);
        firstHandle.prependTo(_sliderLast);
        $.extend(this, {
          _inputFirst: _inputFirst,
          _inputLast: _inputLast,
          _sliderFirst: _sliderFirst,
          _sliderLast: _sliderLast,
          _targetVal: null,
          _sliderTarget: false,
          _sliders: _sliders,
          _proxy: false
        });
        this.refresh();
        this._on(this.element.find('input.ui-slider-input'), {
          'slidebeforestart': '_slidebeforestart',
          'slidestop': '_slidestop',
          'slidedrag': '_slidedrag',
          'slidebeforechange': '_change',
          'blur': '_change',
          'keyup': '_change'
        });
        this._on(firstHandle, { 'vmousedown': '_dragFirstHandle' });
      },
      _dragFirstHandle: function (event) {
        $.data(this._inputFirst.get(0), 'mobileSlider').dragging = true;
        $.data(this._inputFirst.get(0), 'mobileSlider').refresh(event);
        return false;
      },
      _slidedrag: function (event) {
        var first = $(event.target).is(this._inputFirst), otherSlider = first ? this._inputLast : this._inputFirst;
        this._sliderTarget = false;
        if (this._proxy === 'first' && first || this._proxy === 'last' && !first) {
          $.data(otherSlider.get(0), 'mobileSlider').dragging = true;
          $.data(otherSlider.get(0), 'mobileSlider').refresh(event);
          return false;
        }
      },
      _slidestop: function (event) {
        var first = $(event.target).is(this._inputFirst);
        this._proxy = false;
        this.element.find('input').trigger('vmouseup');
        this._sliderFirst.css('z-index', first ? 1 : '');
      },
      _slidebeforestart: function (event) {
        this._sliderTarget = false;
        if ($(event.originalEvent.target).hasClass('ui-slider-track')) {
          this._sliderTarget = true;
          this._targetVal = $(event.target).val();
        }
      },
      _setOption: function (options) {
        this._superApply(options);
        this.refresh();
      },
      refresh: function () {
        var $el = this.element, o = this.options;
        $el.find('input').slider({
          theme: o.theme,
          trackTheme: o.trackTheme,
          disabled: o.disabled,
          mini: o.mini,
          highlight: o.highlight
        }).slider('refresh');
        this._updateHighlight();
      },
      _change: function (event) {
        if (event.type == 'keyup') {
          this._updateHighlight();
          return false;
        }
        var min = parseFloat(this._inputFirst.val(), 10), max = parseFloat(this._inputLast.val(), 10), first = $(event.target).hasClass('ui-rangeslider-first'), thisSlider = first ? this._inputFirst : this._inputLast, otherSlider = first ? this._inputLast : this._inputFirst;
        if (min > max && !this._sliderTarget) {
          thisSlider.val(first ? max : min).slider('refresh');
          this._trigger('normalize');
        } else if (min > max) {
          thisSlider.val(this._targetVal).slider('refresh');
          var self = this;
          setTimeout(function () {
            otherSlider.val(first ? min : max).slider('refresh');
            $.data(otherSlider.get(0), 'mobileSlider').handle.focus();
            self._sliderFirst.css('z-index', first ? '' : 1);
            self._trigger('normalize');
          }, 0);
          this._proxy = first ? 'first' : 'last';
        }
        if (min === max) {
          $.data(thisSlider.get(0), 'mobileSlider').handle.css('z-index', 1);
          $.data(otherSlider.get(0), 'mobileSlider').handle.css('z-index', 0);
        } else {
          $.data(otherSlider.get(0), 'mobileSlider').handle.css('z-index', '');
          $.data(thisSlider.get(0), 'mobileSlider').handle.css('z-index', '');
        }
        this._updateHighlight();
        if (min >= max) {
          return false;
        }
      },
      _updateHighlight: function () {
        var min = parseInt($.data(this._inputFirst.get(0), 'mobileSlider').handle.get(0).style.left, 10), max = parseInt($.data(this._inputLast.get(0), 'mobileSlider').handle.get(0).style.left, 10), width = max - min;
        this.element.find('.ui-slider-bg').css({
          'margin-left': min + '%',
          'width': width + '%'
        });
      },
      _destroy: function () {
        this.element.removeClass('ui-rangeslider ui-mini').find('label').show();
        this._inputFirst.after(this._sliderFirst);
        this._inputLast.after(this._sliderLast);
        this._sliders.remove();
        this.element.find('input').removeClass('ui-rangeslider-first ui-rangeslider-last').slider('destroy');
      }
    });
    $.widget('mobile.rangeslider', $.mobile.rangeslider, $.mobile.behaviors.formReset);
    $(document).bind('pagecreate create', function (e) {
      $.mobile.rangeslider.prototype.enhanceWithin(e.target, true);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.selectmenu', $.mobile.widget, {
      options: {
        theme: null,
        disabled: false,
        icon: 'arrow-d',
        iconpos: 'right',
        inline: false,
        corners: true,
        shadow: true,
        iconshadow: true,
        overlayTheme: 'a',
        dividerTheme: 'b',
        hidePlaceholderMenuItems: true,
        closeText: 'Close',
        nativeMenu: true,
        preventFocusZoom: /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf('AppleWebKit') > -1,
        initSelector: 'select:not( :jqmData(role=\'slider\') )',
        mini: false
      },
      _button: function () {
        return $('<div/>');
      },
      _setDisabled: function (value) {
        this.element.attr('disabled', value);
        this.button.attr('aria-disabled', value);
        return this._setOption('disabled', value);
      },
      _focusButton: function () {
        var self = this;
        setTimeout(function () {
          self.button.focus();
        }, 40);
      },
      _selectOptions: function () {
        return this.select.find('option');
      },
      _preExtension: function () {
        var classes = '';
        if (!!~this.element[0].className.indexOf('ui-btn-left')) {
          classes = ' ui-btn-left';
        }
        if (!!~this.element[0].className.indexOf('ui-btn-right')) {
          classes = ' ui-btn-right';
        }
        this.select = this.element.removeClass('ui-btn-left ui-btn-right').wrap('<div class=\'ui-select' + classes + '\'>');
        this.selectID = this.select.attr('id');
        this.label = $('label[for=\'' + this.selectID + '\']').addClass('ui-select');
        this.isMultiple = this.select[0].multiple;
        if (!this.options.theme) {
          this.options.theme = $.mobile.getInheritedTheme(this.select, 'c');
        }
      },
      _destroy: function () {
        var wrapper = this.element.parents('.ui-select');
        if (wrapper.length > 0) {
          if (wrapper.is('.ui-btn-left, .ui-btn-right')) {
            this.element.addClass(wrapper.is('.ui-btn-left') ? 'ui-btn-left' : 'ui-btn-right');
          }
          this.element.insertAfter(wrapper);
          wrapper.remove();
        }
      },
      _create: function () {
        this._preExtension();
        this._trigger('beforeCreate');
        this.button = this._button();
        var self = this, options = this.options, inline = options.inline || this.select.jqmData('inline'), mini = options.mini || this.select.jqmData('mini'), iconpos = options.icon ? options.iconpos || this.select.jqmData('iconpos') : false, selectedIndex = this.select[0].selectedIndex === -1 ? 0 : this.select[0].selectedIndex, button = this.button.insertBefore(this.select).buttonMarkup({
            theme: options.theme,
            icon: options.icon,
            iconpos: iconpos,
            inline: inline,
            corners: options.corners,
            shadow: options.shadow,
            iconshadow: options.iconshadow,
            mini: mini
          });
        this.setButtonText();
        if (options.nativeMenu && window.opera && window.opera.version) {
          button.addClass('ui-select-nativeonly');
        }
        if (this.isMultiple) {
          this.buttonCount = $('<span>').addClass('ui-li-count ui-btn-up-c ui-btn-corner-all').hide().appendTo(button.addClass('ui-li-has-count'));
        }
        if (options.disabled || this.element.attr('disabled')) {
          this.disable();
        }
        this.select.change(function () {
          self.refresh();
        });
        if (this._handleFormReset) {
          this._handleFormReset();
        }
        this.build();
      },
      build: function () {
        var self = this;
        this.select.appendTo(self.button).bind('vmousedown', function () {
          self.button.addClass($.mobile.activeBtnClass);
        }).bind('focus', function () {
          self.button.addClass($.mobile.focusClass);
        }).bind('blur', function () {
          self.button.removeClass($.mobile.focusClass);
        }).bind('focus vmouseover', function () {
          self.button.trigger('vmouseover');
        }).bind('vmousemove', function () {
          self.button.removeClass($.mobile.activeBtnClass);
        }).bind('change blur vmouseout', function () {
          self.button.trigger('vmouseout').removeClass($.mobile.activeBtnClass);
        }).bind('change blur', function () {
          self.button.removeClass('ui-btn-down-' + self.options.theme);
        });
        self.button.bind('vmousedown', function () {
          if (self.options.preventFocusZoom) {
            $.mobile.zoom.disable(true);
          }
        });
        self.label.bind('click focus', function () {
          if (self.options.preventFocusZoom) {
            $.mobile.zoom.disable(true);
          }
        });
        self.select.bind('focus', function () {
          if (self.options.preventFocusZoom) {
            $.mobile.zoom.disable(true);
          }
        });
        self.button.bind('mouseup', function () {
          if (self.options.preventFocusZoom) {
            setTimeout(function () {
              $.mobile.zoom.enable(true);
            }, 0);
          }
        });
        self.select.bind('blur', function () {
          if (self.options.preventFocusZoom) {
            $.mobile.zoom.enable(true);
          }
        });
      },
      selected: function () {
        return this._selectOptions().filter(':selected');
      },
      selectedIndices: function () {
        var self = this;
        return this.selected().map(function () {
          return self._selectOptions().index(this);
        }).get();
      },
      setButtonText: function () {
        var self = this, selected = this.selected(), text = this.placeholder, span = $(document.createElement('span'));
        this.button.find('.ui-btn-text').html(function () {
          if (selected.length) {
            text = selected.map(function () {
              return $(this).text();
            }).get().join(', ');
          } else {
            text = self.placeholder;
          }
          return span.text(text).addClass(self.select.attr('class')).addClass(selected.attr('class'));
        });
      },
      setButtonCount: function () {
        var selected = this.selected();
        if (this.isMultiple) {
          this.buttonCount[selected.length > 1 ? 'show' : 'hide']().text(selected.length);
        }
      },
      _reset: function () {
        this.refresh();
      },
      refresh: function () {
        this.setButtonText();
        this.setButtonCount();
      },
      open: $.noop,
      close: $.noop,
      disable: function () {
        this._setDisabled(true);
        this.button.addClass('ui-disabled');
      },
      enable: function () {
        this._setDisabled(false);
        this.button.removeClass('ui-disabled');
      }
    });
    $.widget('mobile.selectmenu', $.mobile.selectmenu, $.mobile.behaviors.formReset);
    $.mobile.document.bind('pagecreate create', function (e) {
      $.mobile.selectmenu.prototype.enhanceWithin(e.target, true);
    });
  }(jQuery));
  (function ($, undefined) {
    var extendSelect = function (widget) {
      var select = widget.select, origDestroy = widget._destroy, selectID = widget.selectID, prefix = selectID ? selectID : ($.mobile.ns || '') + 'uuid-' + widget.uuid, popupID = prefix + '-listbox', dialogID = prefix + '-dialog', label = widget.label, thisPage = widget.select.closest('.ui-page'), selectOptions = widget._selectOptions(), isMultiple = widget.isMultiple = widget.select[0].multiple, buttonId = selectID + '-button', menuId = selectID + '-menu', menuPage = $('<div data-' + $.mobile.ns + 'role=\'dialog\' id=\'' + dialogID + '\' data-' + $.mobile.ns + 'theme=\'' + widget.options.theme + '\' data-' + $.mobile.ns + 'overlay-theme=\'' + widget.options.overlayTheme + '\'>' + '<div data-' + $.mobile.ns + 'role=\'header\'>' + '<div class=\'ui-title\'>' + label.getEncodedText() + '</div>' + '</div>' + '<div data-' + $.mobile.ns + 'role=\'content\'></div>' + '</div>'), listbox = $('<div id=\'' + popupID + '\' class=\'ui-selectmenu\'>').insertAfter(widget.select).popup({ theme: widget.options.overlayTheme }), list = $('<ul>', {
          'class': 'ui-selectmenu-list',
          'id': menuId,
          'role': 'listbox',
          'aria-labelledby': buttonId
        }).attr('data-' + $.mobile.ns + 'theme', widget.options.theme).attr('data-' + $.mobile.ns + 'divider-theme', widget.options.dividerTheme).appendTo(listbox), header = $('<div>', { 'class': 'ui-header ui-bar-' + widget.options.theme }).prependTo(listbox), headerTitle = $('<h1>', { 'class': 'ui-title' }).appendTo(header), menuPageContent, menuPageClose, headerClose;
      if (widget.isMultiple) {
        headerClose = $('<a>', {
          'text': widget.options.closeText,
          'href': '#',
          'class': 'ui-btn-left'
        }).attr('data-' + $.mobile.ns + 'iconpos', 'notext').attr('data-' + $.mobile.ns + 'icon', 'delete').appendTo(header).buttonMarkup();
      }
      $.extend(widget, {
        select: widget.select,
        selectID: selectID,
        buttonId: buttonId,
        menuId: menuId,
        popupID: popupID,
        dialogID: dialogID,
        thisPage: thisPage,
        menuPage: menuPage,
        label: label,
        selectOptions: selectOptions,
        isMultiple: isMultiple,
        theme: widget.options.theme,
        listbox: listbox,
        list: list,
        header: header,
        headerTitle: headerTitle,
        headerClose: headerClose,
        menuPageContent: menuPageContent,
        menuPageClose: menuPageClose,
        placeholder: '',
        build: function () {
          var self = this;
          self.refresh();
          if (self._origTabIndex === undefined) {
            self._origTabIndex = self.select[0].getAttribute('tabindex') === null ? false : self.select.attr('tabindex');
          }
          self.select.attr('tabindex', '-1').focus(function () {
            $(this).blur();
            self.button.focus();
          });
          self.button.bind('vclick keydown', function (event) {
            if (self.options.disabled || self.isOpen) {
              return;
            }
            if (event.type === 'vclick' || event.keyCode && (event.keyCode === $.mobile.keyCode.ENTER || event.keyCode === $.mobile.keyCode.SPACE)) {
              self._decideFormat();
              if (self.menuType === 'overlay') {
                self.button.attr('href', '#' + self.popupID).attr('data-' + ($.mobile.ns || '') + 'rel', 'popup');
              } else {
                self.button.attr('href', '#' + self.dialogID).attr('data-' + ($.mobile.ns || '') + 'rel', 'dialog');
              }
              self.isOpen = true;
            }
          });
          self.list.attr('role', 'listbox').bind('focusin', function (e) {
            $(e.target).attr('tabindex', '0').trigger('vmouseover');
          }).bind('focusout', function (e) {
            $(e.target).attr('tabindex', '-1').trigger('vmouseout');
          }).delegate('li:not(.ui-disabled, .ui-li-divider)', 'click', function (event) {
            var oldIndex = self.select[0].selectedIndex, newIndex = self.list.find('li:not(.ui-li-divider)').index(this), option = self._selectOptions().eq(newIndex)[0];
            option.selected = self.isMultiple ? !option.selected : true;
            if (self.isMultiple) {
              $(this).find('.ui-icon').toggleClass('ui-icon-checkbox-on', option.selected).toggleClass('ui-icon-checkbox-off', !option.selected);
            }
            if (self.isMultiple || oldIndex !== newIndex) {
              self.select.trigger('change');
            }
            if (self.isMultiple) {
              self.list.find('li:not(.ui-li-divider)').eq(newIndex).addClass('ui-btn-down-' + widget.options.theme).find('a').first().focus();
            } else {
              self.close();
            }
            event.preventDefault();
          }).keydown(function (event) {
            var target = $(event.target), li = target.closest('li'), prev, next;
            switch (event.keyCode) {
            case 38:
              prev = li.prev().not('.ui-selectmenu-placeholder');
              if (prev.is('.ui-li-divider')) {
                prev = prev.prev();
              }
              if (prev.length) {
                target.blur().attr('tabindex', '-1');
                prev.addClass('ui-btn-down-' + widget.options.theme).find('a').first().focus();
              }
              return false;
            case 40:
              next = li.next();
              if (next.is('.ui-li-divider')) {
                next = next.next();
              }
              if (next.length) {
                target.blur().attr('tabindex', '-1');
                next.addClass('ui-btn-down-' + widget.options.theme).find('a').first().focus();
              }
              return false;
            case 13:
            case 32:
              target.trigger('click');
              return false;
            }
          });
          self.menuPage.bind('pagehide', function () {
            $.mobile._bindPageRemove.call(self.thisPage);
          });
          self.listbox.bind('popupafterclose', function (event) {
            self.close();
          });
          if (self.isMultiple) {
            self.headerClose.click(function () {
              if (self.menuType === 'overlay') {
                self.close();
                return false;
              }
            });
          }
          self.thisPage.addDependents(this.menuPage);
        },
        _isRebuildRequired: function () {
          var list = this.list.find('li'), options = this._selectOptions();
          return options.text() !== list.text();
        },
        selected: function () {
          return this._selectOptions().filter(':selected:not( :jqmData(placeholder=\'true\') )');
        },
        refresh: function (forceRebuild, foo) {
          var self = this, select = this.element, isMultiple = this.isMultiple, indicies;
          if (forceRebuild || this._isRebuildRequired()) {
            self._buildList();
          }
          indicies = this.selectedIndices();
          self.setButtonText();
          self.setButtonCount();
          self.list.find('li:not(.ui-li-divider)').removeClass($.mobile.activeBtnClass).attr('aria-selected', false).each(function (i) {
            if ($.inArray(i, indicies) > -1) {
              var item = $(this);
              item.attr('aria-selected', true);
              if (self.isMultiple) {
                item.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
              } else {
                if (item.is('.ui-selectmenu-placeholder')) {
                  item.next().addClass($.mobile.activeBtnClass);
                } else {
                  item.addClass($.mobile.activeBtnClass);
                }
              }
            }
          });
        },
        close: function () {
          if (this.options.disabled || !this.isOpen) {
            return;
          }
          var self = this;
          if (self.menuType === 'page') {
            self.menuPage.dialog('close');
            self.list.appendTo(self.listbox);
          } else {
            self.listbox.popup('close');
          }
          self._focusButton();
          self.isOpen = false;
        },
        open: function () {
          this.button.click();
        },
        _decideFormat: function () {
          var self = this, $window = $.mobile.window, selfListParent = self.list.parent(), menuHeight = selfListParent.outerHeight(), menuWidth = selfListParent.outerWidth(), activePage = $('.' + $.mobile.activePageClass), scrollTop = $window.scrollTop(), btnOffset = self.button.offset().top, screenHeight = $window.height(), screenWidth = $window.width();
          function focusMenuItem() {
            var selector = self.list.find('.' + $.mobile.activeBtnClass + ' a');
            if (selector.length === 0) {
              selector = self.list.find('li.ui-btn:not( :jqmData(placeholder=\'true\') ) a');
            }
            selector.first().focus().closest('li').addClass('ui-btn-down-' + widget.options.theme);
          }
          if (menuHeight > screenHeight - 80 || !$.support.scrollTop) {
            self.menuPage.appendTo($.mobile.pageContainer).page();
            self.menuPageContent = menuPage.find('.ui-content');
            self.menuPageClose = menuPage.find('.ui-header a');
            self.thisPage.unbind('pagehide.remove');
            if (scrollTop === 0 && btnOffset > screenHeight) {
              self.thisPage.one('pagehide', function () {
                $(this).jqmData('lastScroll', btnOffset);
              });
            }
            self.menuPage.one('pageshow', function () {
              focusMenuItem();
            }).one('pagehide', function () {
              self.close();
            });
            self.menuType = 'page';
            self.menuPageContent.append(self.list);
            self.menuPage.find('div .ui-title').text(self.label.text());
          } else {
            self.menuType = 'overlay';
            self.listbox.one('popupafteropen', focusMenuItem);
          }
        },
        _buildList: function () {
          var self = this, o = this.options, placeholder = this.placeholder, needPlaceholder = true, optgroups = [], lis = [], dataIcon = self.isMultiple ? 'checkbox-off' : 'false';
          self.list.empty().filter('.ui-listview').listview('destroy');
          var $options = self.select.find('option'), numOptions = $options.length, select = this.select[0], dataPrefix = 'data-' + $.mobile.ns, dataIndexAttr = dataPrefix + 'option-index', dataIconAttr = dataPrefix + 'icon', dataRoleAttr = dataPrefix + 'role', dataPlaceholderAttr = dataPrefix + 'placeholder', fragment = document.createDocumentFragment(), isPlaceholderItem = false, optGroup;
          for (var i = 0; i < numOptions; i++, isPlaceholderItem = false) {
            var option = $options[i], $option = $(option), parent = option.parentNode, text = $option.text(), anchor = document.createElement('a'), classes = [];
            anchor.setAttribute('href', '#');
            anchor.appendChild(document.createTextNode(text));
            if (parent !== select && parent.nodeName.toLowerCase() === 'optgroup') {
              var optLabel = parent.getAttribute('label');
              if (optLabel !== optGroup) {
                var divider = document.createElement('li');
                divider.setAttribute(dataRoleAttr, 'list-divider');
                divider.setAttribute('role', 'option');
                divider.setAttribute('tabindex', '-1');
                divider.appendChild(document.createTextNode(optLabel));
                fragment.appendChild(divider);
                optGroup = optLabel;
              }
            }
            if (needPlaceholder && (!option.getAttribute('value') || text.length === 0 || $option.jqmData('placeholder'))) {
              needPlaceholder = false;
              isPlaceholderItem = true;
              if (null === option.getAttribute(dataPlaceholderAttr)) {
                this._removePlaceholderAttr = true;
              }
              option.setAttribute(dataPlaceholderAttr, true);
              if (o.hidePlaceholderMenuItems) {
                classes.push('ui-selectmenu-placeholder');
              }
              if (placeholder !== text) {
                placeholder = self.placeholder = text;
              }
            }
            var item = document.createElement('li');
            if (option.disabled) {
              classes.push('ui-disabled');
              item.setAttribute('aria-disabled', true);
            }
            item.setAttribute(dataIndexAttr, i);
            item.setAttribute(dataIconAttr, dataIcon);
            if (isPlaceholderItem) {
              item.setAttribute(dataPlaceholderAttr, true);
            }
            item.className = classes.join(' ');
            item.setAttribute('role', 'option');
            anchor.setAttribute('tabindex', '-1');
            item.appendChild(anchor);
            fragment.appendChild(item);
          }
          self.list[0].appendChild(fragment);
          if (!this.isMultiple && !placeholder.length) {
            this.header.hide();
          } else {
            this.headerTitle.text(this.placeholder);
          }
          self.list.listview();
        },
        _button: function () {
          return $('<a>', {
            'href': '#',
            'role': 'button',
            'id': this.buttonId,
            'aria-haspopup': 'true',
            'aria-owns': this.menuId
          });
        },
        _destroy: function () {
          this.close();
          if (this._origTabIndex !== undefined) {
            if (this._origTabIndex !== false) {
              this.select.attr('tabindex', this._origTabIndex);
            } else {
              this.select.removeAttr('tabindex');
            }
          }
          if (this._removePlaceholderAttr) {
            this._selectOptions().removeAttr('data-' + $.mobile.ns + 'placeholder');
          }
          this.listbox.remove();
          origDestroy.apply(this, arguments);
        }
      });
    };
    $.mobile.document.bind('selectmenubeforecreate', function (event) {
      var selectmenuWidget = $(event.target).data('mobile-selectmenu');
      if (!selectmenuWidget.options.nativeMenu && selectmenuWidget.element.parents(':jqmData(role=\'popup\')').length === 0) {
        extendSelect(selectmenuWidget);
      }
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.fixedtoolbar', $.mobile.widget, {
      options: {
        visibleOnPageShow: true,
        disablePageZoom: true,
        transition: 'slide',
        fullscreen: false,
        tapToggle: true,
        tapToggleBlacklist: 'a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-popup, .ui-panel, .ui-panel-dismiss-open',
        hideDuringFocus: 'input, textarea, select',
        updatePagePadding: true,
        trackPersistentToolbars: true,
        supportBlacklist: function () {
          return !$.support.fixedPosition;
        },
        initSelector: ':jqmData(position=\'fixed\')'
      },
      _create: function () {
        var self = this, o = self.options, $el = self.element, tbtype = $el.is(':jqmData(role=\'header\')') ? 'header' : 'footer', $page = $el.closest('.ui-page');
        if (o.supportBlacklist()) {
          self.destroy();
          return;
        }
        $el.addClass('ui-' + tbtype + '-fixed');
        if (o.fullscreen) {
          $el.addClass('ui-' + tbtype + '-fullscreen');
          $page.addClass('ui-page-' + tbtype + '-fullscreen');
        } else {
          $page.addClass('ui-page-' + tbtype + '-fixed');
        }
        $.extend(this, { _thisPage: null });
        self._addTransitionClass();
        self._bindPageEvents();
        self._bindToggleHandlers();
      },
      _addTransitionClass: function () {
        var tclass = this.options.transition;
        if (tclass && tclass !== 'none') {
          if (tclass === 'slide') {
            tclass = this.element.is('.ui-header') ? 'slidedown' : 'slideup';
          }
          this.element.addClass(tclass);
        }
      },
      _bindPageEvents: function () {
        this._thisPage = this.element.closest('.ui-page');
        this._on(this._thisPage, {
          'pagebeforeshow': '_handlePageBeforeShow',
          'webkitAnimationStart': '_handleAnimationStart',
          'animationstart': '_handleAnimationStart',
          'updatelayout': '_handleAnimationStart',
          'pageshow': '_handlePageShow',
          'pagebeforehide': '_handlePageBeforeHide'
        });
      },
      _handlePageBeforeShow: function () {
        var o = this.options;
        if (o.disablePageZoom) {
          $.mobile.zoom.disable(true);
        }
        if (!o.visibleOnPageShow) {
          this.hide(true);
        }
      },
      _handleAnimationStart: function () {
        if (this.options.updatePagePadding) {
          this.updatePagePadding(this._thisPage);
        }
      },
      _handlePageShow: function () {
        this.updatePagePadding(this._thisPage);
        if (this.options.updatePagePadding) {
          this._on($.mobile.window, { 'throttledresize': 'updatePagePadding' });
        }
      },
      _handlePageBeforeHide: function (e, ui) {
        var o = this.options;
        if (o.disablePageZoom) {
          $.mobile.zoom.enable(true);
        }
        if (o.updatePagePadding) {
          this._off($.mobile.window, 'throttledresize');
        }
        if (o.trackPersistentToolbars) {
          var thisFooter = $('.ui-footer-fixed:jqmData(id)', this._thisPage), thisHeader = $('.ui-header-fixed:jqmData(id)', this._thisPage), nextFooter = thisFooter.length && ui.nextPage && $('.ui-footer-fixed:jqmData(id=\'' + thisFooter.jqmData('id') + '\')', ui.nextPage) || $(), nextHeader = thisHeader.length && ui.nextPage && $('.ui-header-fixed:jqmData(id=\'' + thisHeader.jqmData('id') + '\')', ui.nextPage) || $();
          if (nextFooter.length || nextHeader.length) {
            nextFooter.add(nextHeader).appendTo($.mobile.pageContainer);
            ui.nextPage.one('pageshow', function () {
              nextHeader.prependTo(this);
              nextFooter.appendTo(this);
            });
          }
        }
      },
      _visible: true,
      updatePagePadding: function (tbPage) {
        var $el = this.element, header = $el.is('.ui-header'), pos = parseFloat($el.css(header ? 'top' : 'bottom'));
        if (this.options.fullscreen) {
          return;
        }
        tbPage = tbPage || this._thisPage || $el.closest('.ui-page');
        $(tbPage).css('padding-' + (header ? 'top' : 'bottom'), $el.outerHeight() + pos);
      },
      _useTransition: function (notransition) {
        var $win = $.mobile.window, $el = this.element, scroll = $win.scrollTop(), elHeight = $el.height(), pHeight = $el.closest('.ui-page').height(), viewportHeight = $.mobile.getScreenHeight(), tbtype = $el.is(':jqmData(role=\'header\')') ? 'header' : 'footer';
        return !notransition && (this.options.transition && this.options.transition !== 'none' && (tbtype === 'header' && !this.options.fullscreen && scroll > elHeight || tbtype === 'footer' && !this.options.fullscreen && scroll + viewportHeight < pHeight - elHeight) || this.options.fullscreen);
      },
      show: function (notransition) {
        var hideClass = 'ui-fixed-hidden', $el = this.element;
        if (this._useTransition(notransition)) {
          $el.removeClass('out ' + hideClass).addClass('in').animationComplete(function () {
            $el.removeClass('in');
          });
        } else {
          $el.removeClass(hideClass);
        }
        this._visible = true;
      },
      hide: function (notransition) {
        var hideClass = 'ui-fixed-hidden', $el = this.element, outclass = 'out' + (this.options.transition === 'slide' ? ' reverse' : '');
        if (this._useTransition(notransition)) {
          $el.addClass(outclass).removeClass('in').animationComplete(function () {
            $el.addClass(hideClass).removeClass(outclass);
          });
        } else {
          $el.addClass(hideClass).removeClass(outclass);
        }
        this._visible = false;
      },
      toggle: function () {
        this[this._visible ? 'hide' : 'show']();
      },
      _bindToggleHandlers: function () {
        var self = this, delay, o = self.options, $el = self.element;
        $el.closest('.ui-page').bind('vclick', function (e) {
          if (o.tapToggle && !$(e.target).closest(o.tapToggleBlacklist).length) {
            self.toggle();
          }
        }).bind('focusin focusout', function (e) {
          if (screen.width < 1025 && $(e.target).is(o.hideDuringFocus) && !$(e.target).closest('.ui-header-fixed, .ui-footer-fixed').length) {
            if (e.type === 'focusout' && !self._visible) {
              delay = setTimeout(function () {
                self.show();
              }, 0);
            } else if (e.type === 'focusin' && self._visible) {
              clearTimeout(delay);
              self.hide();
            }
          }
        });
      },
      _destroy: function () {
        var $el = this.element, header = $el.is('.ui-header');
        $el.closest('.ui-page').css('padding-' + (header ? 'top' : 'bottom'), '');
        $el.removeClass('ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden');
        $el.closest('.ui-page').removeClass('ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen');
      }
    });
    $.mobile.document.bind('pagecreate create', function (e) {
      if ($(e.target).jqmData('fullscreen')) {
        $($.mobile.fixedtoolbar.prototype.options.initSelector, e.target).not(':jqmData(fullscreen)').jqmData('fullscreen', true);
      }
      $.mobile.fixedtoolbar.prototype.enhanceWithin(e.target);
    });
  }(jQuery));
  (function ($, undefined) {
    $.widget('mobile.fixedtoolbar', $.mobile.fixedtoolbar, {
      _create: function () {
        this._super();
        this._workarounds();
      },
      _workarounds: function () {
        var ua = navigator.userAgent, platform = navigator.platform, wkmatch = ua.match(/AppleWebKit\/([0-9]+)/), wkversion = !!wkmatch && wkmatch[1], os = null, self = this;
        if (platform.indexOf('iPhone') > -1 || platform.indexOf('iPad') > -1 || platform.indexOf('iPod') > -1) {
          os = 'ios';
        } else if (ua.indexOf('Android') > -1) {
          os = 'android';
        } else {
          return;
        }
        if (os === 'ios') {
          self._bindScrollWorkaround();
        } else if (os === 'android' && wkversion && wkversion < 534) {
          self._bindScrollWorkaround();
          self._bindListThumbWorkaround();
        } else {
          return;
        }
      },
      _viewportOffset: function () {
        var $el = this.element, header = $el.is('.ui-header'), offset = Math.abs($el.offset().top - $.mobile.window.scrollTop());
        if (!header) {
          offset = Math.round(offset - $.mobile.window.height() + $el.outerHeight()) - 60;
        }
        return offset;
      },
      _bindScrollWorkaround: function () {
        var self = this;
        this._on($.mobile.window, {
          scrollstop: function () {
            var viewportOffset = self._viewportOffset();
            if (viewportOffset > 2 && self._visible) {
              self._triggerRedraw();
            }
          }
        });
      },
      _bindListThumbWorkaround: function () {
        this.element.closest('.ui-page').addClass('ui-android-2x-fixed');
      },
      _triggerRedraw: function () {
        var paddingBottom = parseFloat($('.ui-page-active').css('padding-bottom'));
        $('.ui-page-active').css('padding-bottom', paddingBottom + 1 + 'px');
        setTimeout(function () {
          $('.ui-page-active').css('padding-bottom', paddingBottom + 'px');
        }, 0);
      },
      destroy: function () {
        this._super();
        this.element.closest('.ui-page-active').removeClass('ui-android-2x-fix');
      }
    });
  }(jQuery));
  (function ($, window) {
    $.mobile.iosorientationfixEnabled = true;
    var ua = navigator.userAgent;
    if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf('AppleWebKit') > -1)) {
      $.mobile.iosorientationfixEnabled = false;
      return;
    }
    var zoom = $.mobile.zoom, evt, x, y, z, aig;
    function checkTilt(e) {
      evt = e.originalEvent;
      aig = evt.accelerationIncludingGravity;
      x = Math.abs(aig.x);
      y = Math.abs(aig.y);
      z = Math.abs(aig.z);
      if (!window.orientation && (x > 7 || (z > 6 && y < 8 || z < 8 && y > 6) && x > 5)) {
        if (zoom.enabled) {
          zoom.disable();
        }
      } else if (!zoom.enabled) {
        zoom.enable();
      }
    }
    $.mobile.document.on('mobileinit', function () {
      if ($.mobile.iosorientationfixEnabled) {
        $.mobile.window.bind('orientationchange.iosorientationfix', zoom.enable).bind('devicemotion.iosorientationfix', checkTilt);
      }
    });
  }(jQuery, this));
  (function ($, window, undefined) {
    var $html = $('html'), $head = $('head'), $window = $.mobile.window;
    function hideRenderingClass() {
      $html.removeClass('ui-mobile-rendering');
    }
    $(window.document).trigger('mobileinit');
    if (!$.mobile.gradeA()) {
      return;
    }
    if ($.mobile.ajaxBlacklist) {
      $.mobile.ajaxEnabled = false;
    }
    $html.addClass('ui-mobile ui-mobile-rendering');
    setTimeout(hideRenderingClass, 5000);
    $.extend($.mobile, {
      initializePage: function () {
        var path = $.mobile.path, $pages = $(':jqmData(role=\'page\'), :jqmData(role=\'dialog\')'), hash = path.stripHash(path.stripQueryParams(path.parseLocation().hash)), hashPage = document.getElementById(hash);
        if (!$pages.length) {
          $pages = $('body').wrapInner('<div data-' + $.mobile.ns + 'role=\'page\'></div>').children(0);
        }
        $pages.each(function () {
          var $this = $(this);
          if (!$this.jqmData('url')) {
            $this.attr('data-' + $.mobile.ns + 'url', $this.attr('id') || location.pathname + location.search);
          }
        });
        $.mobile.firstPage = $pages.first();
        $.mobile.pageContainer = $.mobile.firstPage.parent().addClass('ui-mobile-viewport');
        $window.trigger('pagecontainercreate');
        $.mobile.showPageLoadingMsg();
        hideRenderingClass();
        if (!($.mobile.hashListeningEnabled && $.mobile.path.isHashValid(location.hash) && ($(hashPage).is(':jqmData(role="page")') || $.mobile.path.isPath(hash) || hash === $.mobile.dialogHashKey))) {
          if ($.mobile.path.isHashValid(location.hash)) {
            $.mobile.urlHistory.initialDst = hash.replace('#', '');
          }
          if ($.event.special.navigate.isPushStateEnabled()) {
            $.mobile.navigate.navigator.squash(path.parseLocation().href);
          }
          $.mobile.changePage($.mobile.firstPage, {
            transition: 'none',
            reverse: true,
            changeHash: false,
            fromHashChange: true
          });
        } else {
          if (!$.event.special.navigate.isPushStateEnabled()) {
            $window.trigger('hashchange', [true]);
          } else {
            $.mobile.navigate.history.stack = [];
            $.mobile.navigate($.mobile.path.isPath(location.hash) ? location.hash : location.href);
          }
        }
      }
    });
    $.mobile.navreadyDeferred.resolve();
    $(function () {
      window.scrollTo(0, 1);
      $.mobile.defaultHomeScroll = !$.support.scrollTop || $.mobile.window.scrollTop() === 1 ? 0 : 1;
      if ($.mobile.autoInitializePage) {
        $.mobile.initializePage();
      }
      $window.load($.mobile.silentScroll);
      if (!$.support.cssPointerEvents) {
        $.mobile.document.delegate('.ui-disabled', 'vclick', function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
        });
      }
    });
  }(jQuery, this));
}));
var JSON;
JSON || (JSON = {}), function () {
  function str(a, b) {
    var c, d, e, f, g = gap, h, i = b[a];
    i && typeof i == 'object' && typeof i.toJSON == 'function' && (i = i.toJSON(a)), typeof rep == 'function' && (i = rep.call(b, a, i));
    switch (typeof i) {
    case 'string':
      return quote(i);
    case 'number':
      return isFinite(i) ? String(i) : 'null';
    case 'boolean':
    case 'null':
      return String(i);
    case 'object':
      if (!i)
        return 'null';
      gap += indent, h = [];
      if (Object.prototype.toString.apply(i) === '[object Array]') {
        f = i.length;
        for (c = 0; c < f; c += 1)
          h[c] = str(c, i) || 'null';
        e = h.length === 0 ? '[]' : gap ? '[\n' + gap + h.join(',\n' + gap) + '\n' + g + ']' : '[' + h.join(',') + ']', gap = g;
        return e;
      }
      if (rep && typeof rep == 'object') {
        f = rep.length;
        for (c = 0; c < f; c += 1)
          typeof rep[c] == 'string' && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ': ' : ':') + e));
      } else
        for (d in i)
          Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ': ' : ':') + e));
      e = h.length === 0 ? '{}' : gap ? '{\n' + gap + h.join(',\n' + gap) + '\n' + g + '}' : '{' + h.join(',') + '}', gap = g;
      return e;
    }
  }
  function quote(a) {
    escapable.lastIndex = 0;
    return escapable.test(a) ? '"' + a.replace(escapable, function (a) {
      var b = meta[a];
      return typeof b == 'string' ? b : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + a + '"';
  }
  function f(a) {
    return a < 10 ? '0' + a : a;
  }
  'use strict', typeof Date.prototype.toJSON != 'function' && (Date.prototype.toJSON = function (a) {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) {
    return this.valueOf();
  });
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\\': '\\\\'
    }, rep;
  typeof JSON.stringify != 'function' && (JSON.stringify = function (a, b, c) {
    var d;
    gap = '', indent = '';
    if (typeof c == 'number')
      for (d = 0; d < c; d += 1)
        indent += ' ';
    else
      typeof c == 'string' && (indent = c);
    rep = b;
    if (!b || typeof b == 'function' || typeof b == 'object' && typeof b.length == 'number')
      return str('', { '': a });
    throw new Error('JSON.stringify');
  }), typeof JSON.parse != 'function' && (JSON.parse = function (text, reviver) {
    function walk(a, b) {
      var c, d, e = a[b];
      if (e && typeof e == 'object')
        for (c in e)
          Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
      return reviver.call(a, b, e);
    }
    var j;
    text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
      return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }));
    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      j = eval('(' + text + ')');
      return typeof reviver == 'function' ? walk({ '': j }, '') : j;
    }
    throw new SyntaxError('JSON.parse');
  });
}();
SockJS = function () {
  var a = document, b = window, c = {}, d = function () {
    };
  d.prototype.addEventListener = function (a, b) {
    this._listeners || (this._listeners = {}), a in this._listeners || (this._listeners[a] = []);
    var d = this._listeners[a];
    c.arrIndexOf(d, b) === -1 && d.push(b);
    return;
  }, d.prototype.removeEventListener = function (a, b) {
    if (!(this._listeners && a in this._listeners))
      return;
    var d = this._listeners[a], e = c.arrIndexOf(d, b);
    if (e !== -1) {
      d.length > 1 ? this._listeners[a] = d.slice(0, e).concat(d.slice(e + 1)) : delete this._listeners[a];
      return;
    }
    return;
  }, d.prototype.dispatchEvent = function (a) {
    var b = a.type, c = Array.prototype.slice.call(arguments, 0);
    this['on' + b] && this['on' + b].apply(this, c);
    if (this._listeners && b in this._listeners)
      for (var d = 0; d < this._listeners[b].length; d++)
        this._listeners[b][d].apply(this, c);
  };
  var e = function (a, b) {
    this.type = a;
    if (typeof b != 'undefined')
      for (var c in b) {
        if (!b.hasOwnProperty(c))
          continue;
        this[c] = b[c];
      }
  };
  e.prototype.toString = function () {
    var a = [];
    for (var b in this) {
      if (!this.hasOwnProperty(b))
        continue;
      var c = this[b];
      typeof c == 'function' && (c = '[function]'), a.push(b + '=' + c);
    }
    return 'SimpleEvent(' + a.join(', ') + ')';
  };
  var f = function (a) {
    var b = this;
    b._events = a || [], b._listeners = {};
  };
  f.prototype.emit = function (a) {
    var b = this;
    b._verifyType(a);
    if (b._nuked)
      return;
    var c = Array.prototype.slice.call(arguments, 1);
    b['on' + a] && b['on' + a].apply(b, c);
    if (a in b._listeners)
      for (var d = 0; d < b._listeners[a].length; d++)
        b._listeners[a][d].apply(b, c);
  }, f.prototype.on = function (a, b) {
    var c = this;
    c._verifyType(a);
    if (c._nuked)
      return;
    a in c._listeners || (c._listeners[a] = []), c._listeners[a].push(b);
  }, f.prototype._verifyType = function (a) {
    var b = this;
    c.arrIndexOf(b._events, a) === -1 && c.log('Event ' + JSON.stringify(a) + ' not listed ' + JSON.stringify(b._events) + ' in ' + b);
  }, f.prototype.nuke = function () {
    var a = this;
    a._nuked = !0;
    for (var b = 0; b < a._events.length; b++)
      delete a[a._events[b]];
    a._listeners = {};
  };
  var g = 'abcdefghijklmnopqrstuvwxyz0123456789_';
  c.random_string = function (a, b) {
    b = b || g.length;
    var c, d = [];
    for (c = 0; c < a; c++)
      d.push(g.substr(Math.floor(Math.random() * b), 1));
    return d.join('');
  }, c.random_number = function (a) {
    return Math.floor(Math.random() * a);
  }, c.random_number_string = function (a) {
    var b = ('' + (a - 1)).length, d = Array(b + 1).join('0');
    return (d + c.random_number(a)).slice(-b);
  }, c.getOrigin = function (a) {
    a += '/';
    var b = a.split('/').slice(0, 3);
    return b.join('/');
  }, c.isSameOriginUrl = function (a, c) {
    return c || (c = b.location.href), a.split('/').slice(0, 3).join('/') === c.split('/').slice(0, 3).join('/');
  }, c.getParentDomain = function (a) {
    if (/^[0-9.]*$/.test(a))
      return a;
    if (/^\[/.test(a))
      return a;
    if (!/[.]/.test(a))
      return a;
    var b = a.split('.').slice(1);
    return b.join('.');
  }, c.objectExtend = function (a, b) {
    for (var c in b)
      b.hasOwnProperty(c) && (a[c] = b[c]);
    return a;
  };
  var h = '_jp';
  c.polluteGlobalNamespace = function () {
    h in b || (b[h] = {});
  }, c.closeFrame = function (a, b) {
    return 'c' + JSON.stringify([
      a,
      b
    ]);
  }, c.userSetCode = function (a) {
    return a === 1000 || a >= 3000 && a <= 4999;
  }, c.countRTO = function (a) {
    var b;
    return a > 100 ? b = 3 * a : b = a + 200, b;
  }, c.log = function () {
    b.console && console.log && console.log.apply && console.log.apply(console, arguments);
  }, c.bind = function (a, b) {
    return a.bind ? a.bind(b) : function () {
      return a.apply(b, arguments);
    };
  }, c.flatUrl = function (a) {
    return a.indexOf('?') === -1 && a.indexOf('#') === -1;
  }, c.amendUrl = function (b) {
    var d = a.location;
    if (!b)
      throw new Error('Wrong url for SockJS');
    if (!c.flatUrl(b))
      throw new Error('Only basic urls are supported in SockJS');
    return b.indexOf('//') === 0 && (b = d.protocol + b), b.indexOf('/') === 0 && (b = d.protocol + '//' + d.host + b), b = b.replace(/[/]+$/, ''), b;
  }, c.arrIndexOf = function (a, b) {
    for (var c = 0; c < a.length; c++)
      if (a[c] === b)
        return c;
    return -1;
  }, c.arrSkip = function (a, b) {
    var d = c.arrIndexOf(a, b);
    if (d === -1)
      return a.slice();
    var e = a.slice(0, d);
    return e.concat(a.slice(d + 1));
  }, c.isArray = Array.isArray || function (a) {
    return {}.toString.call(a).indexOf('Array') >= 0;
  }, c.delay = function (a, b) {
    return typeof a == 'function' && (b = a, a = 0), setTimeout(b, a);
  };
  var i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, j = {
      '\0': '\\u0000',
      '\x01': '\\u0001',
      '\x02': '\\u0002',
      '\x03': '\\u0003',
      '\x04': '\\u0004',
      '\x05': '\\u0005',
      '\x06': '\\u0006',
      '\x07': '\\u0007',
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\v': '\\u000b',
      '\f': '\\f',
      '\r': '\\r',
      '\x0e': '\\u000e',
      '\x0f': '\\u000f',
      '\x10': '\\u0010',
      '\x11': '\\u0011',
      '\x12': '\\u0012',
      '\x13': '\\u0013',
      '\x14': '\\u0014',
      '\x15': '\\u0015',
      '\x16': '\\u0016',
      '\x17': '\\u0017',
      '\x18': '\\u0018',
      '\x19': '\\u0019',
      '\x1a': '\\u001a',
      '\x1b': '\\u001b',
      '\x1c': '\\u001c',
      '\x1d': '\\u001d',
      '\x1e': '\\u001e',
      '\x1f': '\\u001f',
      '"': '\\"',
      '\\': '\\\\',
      '\x7f': '\\u007f',
      '\x80': '\\u0080',
      '\x81': '\\u0081',
      '\x82': '\\u0082',
      '\x83': '\\u0083',
      '\x84': '\\u0084',
      '\x85': '\\u0085',
      '\x86': '\\u0086',
      '\x87': '\\u0087',
      '\x88': '\\u0088',
      '\x89': '\\u0089',
      '\x8a': '\\u008a',
      '\x8b': '\\u008b',
      '\x8c': '\\u008c',
      '\x8d': '\\u008d',
      '\x8e': '\\u008e',
      '\x8f': '\\u008f',
      '\x90': '\\u0090',
      '\x91': '\\u0091',
      '\x92': '\\u0092',
      '\x93': '\\u0093',
      '\x94': '\\u0094',
      '\x95': '\\u0095',
      '\x96': '\\u0096',
      '\x97': '\\u0097',
      '\x98': '\\u0098',
      '\x99': '\\u0099',
      '\x9a': '\\u009a',
      '\x9b': '\\u009b',
      '\x9c': '\\u009c',
      '\x9d': '\\u009d',
      '\x9e': '\\u009e',
      '\x9f': '\\u009f',
      '\xad': '\\u00ad',
      '\u0600': '\\u0600',
      '\u0601': '\\u0601',
      '\u0602': '\\u0602',
      '\u0603': '\\u0603',
      '\u0604': '\\u0604',
      '\u070f': '\\u070f',
      '\u17b4': '\\u17b4',
      '\u17b5': '\\u17b5',
      '\u200c': '\\u200c',
      '\u200d': '\\u200d',
      '\u200e': '\\u200e',
      '\u200f': '\\u200f',
      '\u2028': '\\u2028',
      '\u2029': '\\u2029',
      '\u202a': '\\u202a',
      '\u202b': '\\u202b',
      '\u202c': '\\u202c',
      '\u202d': '\\u202d',
      '\u202e': '\\u202e',
      '\u202f': '\\u202f',
      '\u2060': '\\u2060',
      '\u2061': '\\u2061',
      '\u2062': '\\u2062',
      '\u2063': '\\u2063',
      '\u2064': '\\u2064',
      '\u2065': '\\u2065',
      '\u2066': '\\u2066',
      '\u2067': '\\u2067',
      '\u2068': '\\u2068',
      '\u2069': '\\u2069',
      '\u206a': '\\u206a',
      '\u206b': '\\u206b',
      '\u206c': '\\u206c',
      '\u206d': '\\u206d',
      '\u206e': '\\u206e',
      '\u206f': '\\u206f',
      '\ufeff': '\\ufeff',
      '\ufff0': '\\ufff0',
      '\ufff1': '\\ufff1',
      '\ufff2': '\\ufff2',
      '\ufff3': '\\ufff3',
      '\ufff4': '\\ufff4',
      '\ufff5': '\\ufff5',
      '\ufff6': '\\ufff6',
      '\ufff7': '\\ufff7',
      '\ufff8': '\\ufff8',
      '\ufff9': '\\ufff9',
      '\ufffa': '\\ufffa',
      '\ufffb': '\\ufffb',
      '\ufffc': '\\ufffc',
      '\ufffd': '\\ufffd',
      '\ufffe': '\\ufffe',
      '\uffff': '\\uffff'
    }, k = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g, l, m = JSON && JSON.stringify || function (a) {
      return i.lastIndex = 0, i.test(a) && (a = a.replace(i, function (a) {
        return j[a];
      })), '"' + a + '"';
    }, n = function (a) {
      var b, c = {}, d = [];
      for (b = 0; b < 65536; b++)
        d.push(String.fromCharCode(b));
      return a.lastIndex = 0, d.join('').replace(a, function (a) {
        return c[a] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4), '';
      }), a.lastIndex = 0, c;
    };
  c.quote = function (a) {
    var b = m(a);
    return k.lastIndex = 0, k.test(b) ? (l || (l = n(k)), b.replace(k, function (a) {
      return l[a];
    })) : b;
  };
  var o = [
      'websocket',
      'xdr-streaming',
      'xhr-streaming',
      'iframe-eventsource',
      'iframe-htmlfile',
      'xdr-polling',
      'xhr-polling',
      'iframe-xhr-polling',
      'jsonp-polling'
    ];
  c.probeProtocols = function () {
    var a = {};
    for (var b = 0; b < o.length; b++) {
      var c = o[b];
      a[c] = y[c] && y[c].enabled();
    }
    return a;
  }, c.detectProtocols = function (a, b, c) {
    var d = {}, e = [];
    b || (b = o);
    for (var f = 0; f < b.length; f++) {
      var g = b[f];
      d[g] = a[g];
    }
    var h = function (a) {
      var b = a.shift();
      d[b] ? e.push(b) : a.length > 0 && h(a);
    };
    return c.websocket !== !1 && h(['websocket']), d['xhr-streaming'] && !c.null_origin ? e.push('xhr-streaming') : d['xdr-streaming'] && !c.cookie_needed && !c.null_origin ? e.push('xdr-streaming') : h([
      'iframe-eventsource',
      'iframe-htmlfile'
    ]), d['xhr-polling'] && !c.null_origin ? e.push('xhr-polling') : d['xdr-polling'] && !c.cookie_needed && !c.null_origin ? e.push('xdr-polling') : h([
      'iframe-xhr-polling',
      'jsonp-polling'
    ]), e;
  };
  var p = '_sockjs_global';
  c.createHook = function () {
    var a = 'a' + c.random_string(8);
    if (!(p in b)) {
      var d = {};
      b[p] = function (a) {
        return a in d || (d[a] = {
          id: a,
          del: function () {
            delete d[a];
          }
        }), d[a];
      };
    }
    return b[p](a);
  }, c.attachMessage = function (a) {
    c.attachEvent('message', a);
  }, c.attachEvent = function (c, d) {
    typeof b.addEventListener != 'undefined' ? b.addEventListener(c, d, !1) : (a.attachEvent('on' + c, d), b.attachEvent('on' + c, d));
  }, c.detachMessage = function (a) {
    c.detachEvent('message', a);
  }, c.detachEvent = function (c, d) {
    typeof b.addEventListener != 'undefined' ? b.removeEventListener(c, d, !1) : (a.detachEvent('on' + c, d), b.detachEvent('on' + c, d));
  };
  var q = {}, r = !1, s = function () {
      for (var a in q)
        q[a](), delete q[a];
    }, t = function () {
      if (r)
        return;
      r = !0, s();
    };
  c.attachEvent('unload', t), c.unload_add = function (a) {
    var b = c.random_string(8);
    return q[b] = a, r && c.delay(s), b;
  }, c.unload_del = function (a) {
    a in q && delete q[a];
  }, c.createIframe = function (b, d) {
    var e = a.createElement('iframe'), f, g, h = function () {
        clearTimeout(f);
        try {
          e.onload = null;
        } catch (a) {
        }
        e.onerror = null;
      }, i = function () {
        e && (h(), setTimeout(function () {
          e && e.parentNode.removeChild(e), e = null;
        }, 0), c.unload_del(g));
      }, j = function (a) {
        e && (i(), d(a));
      }, k = function (a, b) {
        try {
          e && e.contentWindow && e.contentWindow.postMessage(a, b);
        } catch (c) {
        }
      };
    return e.src = b, e.style.display = 'none', e.style.position = 'absolute', e.onerror = function () {
      j('onerror');
    }, e.onload = function () {
      clearTimeout(f), f = setTimeout(function () {
        j('onload timeout');
      }, 2000);
    }, a.body.appendChild(e), f = setTimeout(function () {
      j('timeout');
    }, 15000), g = c.unload_add(i), {
      post: k,
      cleanup: i,
      loaded: h
    };
  }, c.createHtmlfile = function (a, d) {
    var e = new ActiveXObject('htmlfile'), f, g, i, j = function () {
        clearTimeout(f);
      }, k = function () {
        e && (j(), c.unload_del(g), i.parentNode.removeChild(i), i = e = null, CollectGarbage());
      }, l = function (a) {
        e && (k(), d(a));
      }, m = function (a, b) {
        try {
          i && i.contentWindow && i.contentWindow.postMessage(a, b);
        } catch (c) {
        }
      };
    e.open(), e.write('<html><script>document.domain="' + document.domain + '";' + '</s' + 'cript></html>'), e.close(), e.parentWindow[h] = b[h];
    var n = e.createElement('div');
    return e.body.appendChild(n), i = e.createElement('iframe'), n.appendChild(i), i.src = a, f = setTimeout(function () {
      l('timeout');
    }, 15000), g = c.unload_add(k), {
      post: m,
      cleanup: k,
      loaded: j
    };
  };
  var u = function () {
  };
  u.prototype = new f([
    'chunk',
    'finish'
  ]), u.prototype._start = function (a, d, e, f) {
    var g = this;
    try {
      g.xhr = new XMLHttpRequest();
    } catch (h) {
    }
    if (!g.xhr)
      try {
        g.xhr = new b.ActiveXObject('Microsoft.XMLHTTP');
      } catch (h) {
      }
    if (b.ActiveXObject || b.XDomainRequest)
      d += (d.indexOf('?') === -1 ? '?' : '&') + 't=' + +new Date();
    g.unload_ref = c.unload_add(function () {
      g._cleanup(!0);
    });
    try {
      g.xhr.open(a, d, !0);
    } catch (i) {
      g.emit('finish', 0, ''), g._cleanup();
      return;
    }
    if (!f || !f.no_credentials)
      g.xhr.withCredentials = 'true';
    if (f && f.headers)
      for (var j in f.headers)
        g.xhr.setRequestHeader(j, f.headers[j]);
    g.xhr.onreadystatechange = function () {
      if (g.xhr) {
        var a = g.xhr;
        switch (a.readyState) {
        case 3:
          try {
            var b = a.status, c = a.responseText;
          } catch (a) {
          }
          b === 1223 && (b = 204), c && c.length > 0 && g.emit('chunk', b, c);
          break;
        case 4:
          var b = a.status;
          b === 1223 && (b = 204), g.emit('finish', b, a.responseText), g._cleanup(!1);
        }
      }
    }, g.xhr.send(e);
  }, u.prototype._cleanup = function (a) {
    var b = this;
    if (!b.xhr)
      return;
    c.unload_del(b.unload_ref), b.xhr.onreadystatechange = function () {
    };
    if (a)
      try {
        b.xhr.abort();
      } catch (d) {
      }
    b.unload_ref = b.xhr = null;
  }, u.prototype.close = function () {
    var a = this;
    a.nuke(), a._cleanup(!0);
  };
  var v = c.XHRCorsObject = function () {
      var a = this, b = arguments;
      c.delay(function () {
        a._start.apply(a, b);
      });
    };
  v.prototype = new u();
  var w = c.XHRLocalObject = function (a, b, d) {
      var e = this;
      c.delay(function () {
        e._start(a, b, d, { no_credentials: !0 });
      });
    };
  w.prototype = new u();
  var x = c.XDRObject = function (a, b, d) {
      var e = this;
      c.delay(function () {
        e._start(a, b, d);
      });
    };
  x.prototype = new f([
    'chunk',
    'finish'
  ]), x.prototype._start = function (a, b, d) {
    var e = this, f = new XDomainRequest();
    b += (b.indexOf('?') === -1 ? '?' : '&') + 't=' + +new Date();
    var g = f.ontimeout = f.onerror = function () {
        e.emit('finish', 0, ''), e._cleanup(!1);
      };
    f.onprogress = function () {
      e.emit('chunk', 200, f.responseText);
    }, f.onload = function () {
      e.emit('finish', 200, f.responseText), e._cleanup(!1);
    }, e.xdr = f, e.unload_ref = c.unload_add(function () {
      e._cleanup(!0);
    });
    try {
      e.xdr.open(a, b), e.xdr.send(d);
    } catch (h) {
      g();
    }
  }, x.prototype._cleanup = function (a) {
    var b = this;
    if (!b.xdr)
      return;
    c.unload_del(b.unload_ref), b.xdr.ontimeout = b.xdr.onerror = b.xdr.onprogress = b.xdr.onload = null;
    if (a)
      try {
        b.xdr.abort();
      } catch (d) {
      }
    b.unload_ref = b.xdr = null;
  }, x.prototype.close = function () {
    var a = this;
    a.nuke(), a._cleanup(!0);
  }, c.isXHRCorsCapable = function () {
    return b.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest() ? 1 : b.XDomainRequest && a.domain ? 2 : L.enabled() ? 3 : 4;
  };
  var y = function (a, d, e) {
    if (this === b)
      return new y(a, d, e);
    var f = this, g;
    f._options = {
      devel: !1,
      debug: !1,
      protocols_whitelist: [],
      info: undefined,
      rtt: undefined
    }, e && c.objectExtend(f._options, e), f._base_url = c.amendUrl(a), f._server = f._options.server || c.random_number_string(1000), f._options.protocols_whitelist && f._options.protocols_whitelist.length ? g = f._options.protocols_whitelist : (typeof d == 'string' && d.length > 0 ? g = [d] : c.isArray(d) ? g = d : g = null, g && f._debug('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.')), f._protocols = [], f.protocol = null, f.readyState = y.CONNECTING, f._ir = S(f._base_url), f._ir.onfinish = function (a, b) {
      f._ir = null, a ? (f._options.info && (a = c.objectExtend(a, f._options.info)), f._options.rtt && (b = f._options.rtt), f._applyInfo(a, b, g), f._didClose()) : f._didClose(1002, 'Can\'t connect to server', !0);
    };
  };
  y.prototype = new d(), y.version = '0.3.4', y.CONNECTING = 0, y.OPEN = 1, y.CLOSING = 2, y.CLOSED = 3, y.prototype._debug = function () {
    this._options.debug && c.log.apply(c, arguments);
  }, y.prototype._dispatchOpen = function () {
    var a = this;
    a.readyState === y.CONNECTING ? (a._transport_tref && (clearTimeout(a._transport_tref), a._transport_tref = null), a.readyState = y.OPEN, a.dispatchEvent(new e('open'))) : a._didClose(1006, 'Server lost session');
  }, y.prototype._dispatchMessage = function (a) {
    var b = this;
    if (b.readyState !== y.OPEN)
      return;
    b.dispatchEvent(new e('message', { data: a }));
  }, y.prototype._dispatchHeartbeat = function (a) {
    var b = this;
    if (b.readyState !== y.OPEN)
      return;
    b.dispatchEvent(new e('heartbeat', {}));
  }, y.prototype._didClose = function (a, b, d) {
    var f = this;
    if (f.readyState !== y.CONNECTING && f.readyState !== y.OPEN && f.readyState !== y.CLOSING)
      throw new Error('INVALID_STATE_ERR');
    f._ir && (f._ir.nuke(), f._ir = null), f._transport && (f._transport.doCleanup(), f._transport = null);
    var g = new e('close', {
        code: a,
        reason: b,
        wasClean: c.userSetCode(a)
      });
    if (!c.userSetCode(a) && f.readyState === y.CONNECTING && !d) {
      if (f._try_next_protocol(g))
        return;
      g = new e('close', {
        code: 2000,
        reason: 'All transports failed',
        wasClean: !1,
        last_event: g
      });
    }
    f.readyState = y.CLOSED, c.delay(function () {
      f.dispatchEvent(g);
    });
  }, y.prototype._didMessage = function (a) {
    var b = this, c = a.slice(0, 1);
    switch (c) {
    case 'o':
      b._dispatchOpen();
      break;
    case 'a':
      var d = JSON.parse(a.slice(1) || '[]');
      for (var e = 0; e < d.length; e++)
        b._dispatchMessage(d[e]);
      break;
    case 'm':
      var d = JSON.parse(a.slice(1) || 'null');
      b._dispatchMessage(d);
      break;
    case 'c':
      var d = JSON.parse(a.slice(1) || '[]');
      b._didClose(d[0], d[1]);
      break;
    case 'h':
      b._dispatchHeartbeat();
    }
  }, y.prototype._try_next_protocol = function (b) {
    var d = this;
    d.protocol && (d._debug('Closed transport:', d.protocol, '' + b), d.protocol = null), d._transport_tref && (clearTimeout(d._transport_tref), d._transport_tref = null);
    for (;;) {
      var e = d.protocol = d._protocols.shift();
      if (!e)
        return !1;
      if (y[e] && y[e].need_body === !0 && (!a.body || typeof a.readyState != 'undefined' && a.readyState !== 'complete'))
        return d._protocols.unshift(e), d.protocol = 'waiting-for-load', c.attachEvent('load', function () {
          d._try_next_protocol();
        }), !0;
      if (!!y[e] && !!y[e].enabled(d._options)) {
        var f = y[e].roundTrips || 1, g = (d._options.rto || 0) * f || 5000;
        d._transport_tref = c.delay(g, function () {
          d.readyState === y.CONNECTING && d._didClose(2007, 'Transport timeouted');
        });
        var h = c.random_string(8), i = d._base_url + '/' + d._server + '/' + h;
        return d._debug('Opening transport:', e, ' url:' + i, ' RTO:' + d._options.rto), d._transport = new y[e](d, i, d._base_url), !0;
      }
      d._debug('Skipping transport:', e);
    }
  }, y.prototype.close = function (a, b) {
    var d = this;
    if (a && !c.userSetCode(a))
      throw new Error('INVALID_ACCESS_ERR');
    return d.readyState !== y.CONNECTING && d.readyState !== y.OPEN ? !1 : (d.readyState = y.CLOSING, d._didClose(a || 1000, b || 'Normal closure'), !0);
  }, y.prototype.send = function (a) {
    var b = this;
    if (b.readyState === y.CONNECTING)
      throw new Error('INVALID_STATE_ERR');
    return b.readyState === y.OPEN && b._transport.doSend(c.quote('' + a)), !0;
  }, y.prototype._applyInfo = function (b, d, e) {
    var f = this;
    f._options.info = b, f._options.rtt = d, f._options.rto = c.countRTO(d), f._options.info.null_origin = !a.domain;
    var g = c.probeProtocols();
    f._protocols = c.detectProtocols(g, e, b);
  };
  var z = y.websocket = function (a, d) {
      var e = this, f = d + '/websocket';
      f.slice(0, 5) === 'https' ? f = 'wss' + f.slice(5) : f = 'ws' + f.slice(4), e.ri = a, e.url = f;
      var g = b.WebSocket || b.MozWebSocket;
      e.ws = new g(e.url), e.ws.onmessage = function (a) {
        e.ri._didMessage(a.data);
      }, e.unload_ref = c.unload_add(function () {
        e.ws.close();
      }), e.ws.onclose = function () {
        e.ri._didMessage(c.closeFrame(1006, 'WebSocket connection broken'));
      };
    };
  z.prototype.doSend = function (a) {
    this.ws.send('[' + a + ']');
  }, z.prototype.doCleanup = function () {
    var a = this, b = a.ws;
    b && (b.onmessage = b.onclose = null, b.close(), c.unload_del(a.unload_ref), a.unload_ref = a.ri = a.ws = null);
  }, z.enabled = function () {
    return !!b.WebSocket || !!b.MozWebSocket;
  }, z.roundTrips = 2;
  var A = function () {
  };
  A.prototype.send_constructor = function (a) {
    var b = this;
    b.send_buffer = [], b.sender = a;
  }, A.prototype.doSend = function (a) {
    var b = this;
    b.send_buffer.push(a), b.send_stop || b.send_schedule();
  }, A.prototype.send_schedule_wait = function () {
    var a = this, b;
    a.send_stop = function () {
      a.send_stop = null, clearTimeout(b);
    }, b = c.delay(25, function () {
      a.send_stop = null, a.send_schedule();
    });
  }, A.prototype.send_schedule = function () {
    var a = this;
    if (a.send_buffer.length > 0) {
      var b = '[' + a.send_buffer.join(',') + ']';
      a.send_stop = a.sender(a.trans_url, b, function (b, c) {
        a.send_stop = null, b === !1 ? a.ri._didClose(1006, 'Sending error ' + c) : a.send_schedule_wait();
      }), a.send_buffer = [];
    }
  }, A.prototype.send_destructor = function () {
    var a = this;
    a._send_stop && a._send_stop(), a._send_stop = null;
  };
  var B = function (b, d, e) {
      var f = this;
      if (!('_send_form' in f)) {
        var g = f._send_form = a.createElement('form'), h = f._send_area = a.createElement('textarea');
        h.name = 'd', g.style.display = 'none', g.style.position = 'absolute', g.method = 'POST', g.enctype = 'application/x-www-form-urlencoded', g.acceptCharset = 'UTF-8', g.appendChild(h), a.body.appendChild(g);
      }
      var g = f._send_form, h = f._send_area, i = 'a' + c.random_string(8);
      g.target = i, g.action = b + '/jsonp_send?i=' + i;
      var j;
      try {
        j = a.createElement('<iframe name="' + i + '">');
      } catch (k) {
        j = a.createElement('iframe'), j.name = i;
      }
      j.id = i, g.appendChild(j), j.style.display = 'none';
      try {
        h.value = d;
      } catch (l) {
        c.log('Your browser is seriously broken. Go home! ' + l.message);
      }
      g.submit();
      var m = function (a) {
        if (!j.onerror)
          return;
        j.onreadystatechange = j.onerror = j.onload = null, c.delay(500, function () {
          j.parentNode.removeChild(j), j = null;
        }), h.value = '', e(!0);
      };
      return j.onerror = j.onload = m, j.onreadystatechange = function (a) {
        j.readyState == 'complete' && m();
      }, m;
    }, C = function (a) {
      return function (b, c, d) {
        var e = new a('POST', b + '/xhr_send', c);
        return e.onfinish = function (a, b) {
          d(a === 200 || a === 204, 'http status ' + a);
        }, function (a) {
          d(!1, a);
        };
      };
    }, D = function (b, d) {
      var e, f = a.createElement('script'), g, h = function (a) {
          g && (g.parentNode.removeChild(g), g = null), f && (clearTimeout(e), f.parentNode.removeChild(f), f.onreadystatechange = f.onerror = f.onload = f.onclick = null, f = null, d(a), d = null);
        }, i = !1, j = null;
      f.id = 'a' + c.random_string(8), f.src = b, f.type = 'text/javascript', f.charset = 'UTF-8', f.onerror = function (a) {
        j || (j = setTimeout(function () {
          i || h(c.closeFrame(1006, 'JSONP script loaded abnormally (onerror)'));
        }, 1000));
      }, f.onload = function (a) {
        h(c.closeFrame(1006, 'JSONP script loaded abnormally (onload)'));
      }, f.onreadystatechange = function (a) {
        if (/loaded|closed/.test(f.readyState)) {
          if (f && f.htmlFor && f.onclick) {
            i = !0;
            try {
              f.onclick();
            } catch (b) {
            }
          }
          f && h(c.closeFrame(1006, 'JSONP script loaded abnormally (onreadystatechange)'));
        }
      };
      if (typeof f.async == 'undefined' && a.attachEvent)
        if (!/opera/i.test(navigator.userAgent)) {
          try {
            f.htmlFor = f.id, f.event = 'onclick';
          } catch (k) {
          }
          f.async = !0;
        } else
          g = a.createElement('script'), g.text = 'try{var a = document.getElementById(\'' + f.id + '\'); if(a)a.onerror();}catch(x){};', f.async = g.async = !1;
      typeof f.async != 'undefined' && (f.async = !0), e = setTimeout(function () {
        h(c.closeFrame(1006, 'JSONP script loaded abnormally (timeout)'));
      }, 35000);
      var l = a.getElementsByTagName('head')[0];
      return l.insertBefore(f, l.firstChild), g && l.insertBefore(g, l.firstChild), h;
    }, E = y['jsonp-polling'] = function (a, b) {
      c.polluteGlobalNamespace();
      var d = this;
      d.ri = a, d.trans_url = b, d.send_constructor(B), d._schedule_recv();
    };
  E.prototype = new A(), E.prototype._schedule_recv = function () {
    var a = this, b = function (b) {
        a._recv_stop = null, b && (a._is_closing || a.ri._didMessage(b)), a._is_closing || a._schedule_recv();
      };
    a._recv_stop = F(a.trans_url + '/jsonp', D, b);
  }, E.enabled = function () {
    return !0;
  }, E.need_body = !0, E.prototype.doCleanup = function () {
    var a = this;
    a._is_closing = !0, a._recv_stop && a._recv_stop(), a.ri = a._recv_stop = null, a.send_destructor();
  };
  var F = function (a, d, e) {
      var f = 'a' + c.random_string(6), g = a + '?c=' + escape(h + '.' + f), i = 0, j = function (a) {
          switch (i) {
          case 0:
            delete b[h][f], e(a);
            break;
          case 1:
            e(a), i = 2;
            break;
          case 2:
            delete b[h][f];
          }
        }, k = d(g, j);
      b[h][f] = k;
      var l = function () {
        b[h][f] && (i = 1, b[h][f](c.closeFrame(1000, 'JSONP user aborted read')));
      };
      return l;
    }, G = function () {
    };
  G.prototype = new A(), G.prototype.run = function (a, b, c, d, e) {
    var f = this;
    f.ri = a, f.trans_url = b, f.send_constructor(C(e)), f.poll = new $(a, d, b + c, e);
  }, G.prototype.doCleanup = function () {
    var a = this;
    a.poll && (a.poll.abort(), a.poll = null);
  };
  var H = y['xhr-streaming'] = function (a, b) {
      this.run(a, b, '/xhr_streaming', bd, c.XHRCorsObject);
    };
  H.prototype = new G(), H.enabled = function () {
    return b.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest() && !/opera/i.test(navigator.userAgent);
  }, H.roundTrips = 2, H.need_body = !0;
  var I = y['xdr-streaming'] = function (a, b) {
      this.run(a, b, '/xhr_streaming', bd, c.XDRObject);
    };
  I.prototype = new G(), I.enabled = function () {
    return !!b.XDomainRequest;
  }, I.roundTrips = 2;
  var J = y['xhr-polling'] = function (a, b) {
      this.run(a, b, '/xhr', bd, c.XHRCorsObject);
    };
  J.prototype = new G(), J.enabled = H.enabled, J.roundTrips = 2;
  var K = y['xdr-polling'] = function (a, b) {
      this.run(a, b, '/xhr', bd, c.XDRObject);
    };
  K.prototype = new G(), K.enabled = I.enabled, K.roundTrips = 2;
  var L = function () {
  };
  L.prototype.i_constructor = function (a, b, d) {
    var e = this;
    e.ri = a, e.origin = c.getOrigin(d), e.base_url = d, e.trans_url = b;
    var f = d + '/iframe.html';
    e.ri._options.devel && (f += '?t=' + +new Date()), e.window_id = c.random_string(8), f += '#' + e.window_id, e.iframeObj = c.createIframe(f, function (a) {
      e.ri._didClose(1006, 'Unable to load an iframe (' + a + ')');
    }), e.onmessage_cb = c.bind(e.onmessage, e), c.attachMessage(e.onmessage_cb);
  }, L.prototype.doCleanup = function () {
    var a = this;
    if (a.iframeObj) {
      c.detachMessage(a.onmessage_cb);
      try {
        a.iframeObj.iframe.contentWindow && a.postMessage('c');
      } catch (b) {
      }
      a.iframeObj.cleanup(), a.iframeObj = null, a.onmessage_cb = a.iframeObj = null;
    }
  }, L.prototype.onmessage = function (a) {
    var b = this;
    if (a.origin !== b.origin)
      return;
    var c = a.data.slice(0, 8), d = a.data.slice(8, 9), e = a.data.slice(9);
    if (c !== b.window_id)
      return;
    switch (d) {
    case 's':
      b.iframeObj.loaded(), b.postMessage('s', JSON.stringify([
        y.version,
        b.protocol,
        b.trans_url,
        b.base_url
      ]));
      break;
    case 't':
      b.ri._didMessage(e);
    }
  }, L.prototype.postMessage = function (a, b) {
    var c = this;
    c.iframeObj.post(c.window_id + a + (b || ''), c.origin);
  }, L.prototype.doSend = function (a) {
    this.postMessage('m', a);
  }, L.enabled = function () {
    var a = navigator && navigator.userAgent && navigator.userAgent.indexOf('Konqueror') !== -1;
    return (typeof b.postMessage == 'function' || typeof b.postMessage == 'object') && !a;
  };
  var M, N = function (a, d) {
      parent !== b ? parent.postMessage(M + a + (d || ''), '*') : c.log('Can\'t postMessage, no parent window.', a, d);
    }, O = function () {
    };
  O.prototype._didClose = function (a, b) {
    N('t', c.closeFrame(a, b));
  }, O.prototype._didMessage = function (a) {
    N('t', a);
  }, O.prototype._doSend = function (a) {
    this._transport.doSend(a);
  }, O.prototype._doCleanup = function () {
    this._transport.doCleanup();
  }, c.parent_origin = undefined, y.bootstrap_iframe = function () {
    var d;
    M = a.location.hash.slice(1);
    var e = function (a) {
      if (a.source !== parent)
        return;
      typeof c.parent_origin == 'undefined' && (c.parent_origin = a.origin);
      if (a.origin !== c.parent_origin)
        return;
      var e = a.data.slice(0, 8), f = a.data.slice(8, 9), g = a.data.slice(9);
      if (e !== M)
        return;
      switch (f) {
      case 's':
        var h = JSON.parse(g), i = h[0], j = h[1], k = h[2], l = h[3];
        i !== y.version && c.log('Incompatibile SockJS! Main site uses: "' + i + '", the iframe:' + ' "' + y.version + '".');
        if (!c.flatUrl(k) || !c.flatUrl(l)) {
          c.log('Only basic urls are supported in SockJS');
          return;
        }
        if (!c.isSameOriginUrl(k) || !c.isSameOriginUrl(l)) {
          c.log('Can\'t connect to different domain from within an iframe. (' + JSON.stringify([
            b.location.href,
            k,
            l
          ]) + ')');
          return;
        }
        d = new O(), d._transport = new O[j](d, k, l);
        break;
      case 'm':
        d._doSend(g);
        break;
      case 'c':
        d && d._doCleanup(), d = null;
      }
    };
    c.attachMessage(e), N('s');
  };
  var P = function (a, b) {
    var d = this;
    c.delay(function () {
      d.doXhr(a, b);
    });
  };
  P.prototype = new f(['finish']), P.prototype.doXhr = function (a, b) {
    var d = this, e = new Date().getTime(), f = new b('GET', a + '/info'), g = c.delay(8000, function () {
        f.ontimeout();
      });
    f.onfinish = function (a, b) {
      clearTimeout(g), g = null;
      if (a === 200) {
        var c = new Date().getTime() - e, f = JSON.parse(b);
        typeof f != 'object' && (f = {}), d.emit('finish', f, c);
      } else
        d.emit('finish');
    }, f.ontimeout = function () {
      f.close(), d.emit('finish');
    };
  };
  var Q = function (b) {
    var d = this, e = function () {
        var a = new L();
        a.protocol = 'w-iframe-info-receiver';
        var c = function (b) {
            if (typeof b == 'string' && b.substr(0, 1) === 'm') {
              var c = JSON.parse(b.substr(1)), e = c[0], f = c[1];
              d.emit('finish', e, f);
            } else
              d.emit('finish');
            a.doCleanup(), a = null;
          }, e = {
            _options: {},
            _didClose: c,
            _didMessage: c
          };
        a.i_constructor(e, b, b);
      };
    a.body ? e() : c.attachEvent('load', e);
  };
  Q.prototype = new f(['finish']);
  var R = function () {
    var a = this;
    c.delay(function () {
      a.emit('finish', {}, 2000);
    });
  };
  R.prototype = new f(['finish']);
  var S = function (a) {
      if (c.isSameOriginUrl(a))
        return new P(a, c.XHRLocalObject);
      switch (c.isXHRCorsCapable()) {
      case 1:
        return new P(a, c.XHRLocalObject);
      case 2:
        return new P(a, c.XDRObject);
      case 3:
        return new Q(a);
      default:
        return new R();
      }
    }, T = O['w-iframe-info-receiver'] = function (a, b, d) {
      var e = new P(d, c.XHRLocalObject);
      e.onfinish = function (b, c) {
        a._didMessage('m' + JSON.stringify([
          b,
          c
        ])), a._didClose();
      };
    };
  T.prototype.doCleanup = function () {
  };
  var U = y['iframe-eventsource'] = function () {
      var a = this;
      a.protocol = 'w-iframe-eventsource', a.i_constructor.apply(a, arguments);
    };
  U.prototype = new L(), U.enabled = function () {
    return 'EventSource' in b && L.enabled();
  }, U.need_body = !0, U.roundTrips = 3;
  var V = O['w-iframe-eventsource'] = function (a, b) {
      this.run(a, b, '/eventsource', _, c.XHRLocalObject);
    };
  V.prototype = new G();
  var W = y['iframe-xhr-polling'] = function () {
      var a = this;
      a.protocol = 'w-iframe-xhr-polling', a.i_constructor.apply(a, arguments);
    };
  W.prototype = new L(), W.enabled = function () {
    return b.XMLHttpRequest && L.enabled();
  }, W.need_body = !0, W.roundTrips = 3;
  var X = O['w-iframe-xhr-polling'] = function (a, b) {
      this.run(a, b, '/xhr', bd, c.XHRLocalObject);
    };
  X.prototype = new G();
  var Y = y['iframe-htmlfile'] = function () {
      var a = this;
      a.protocol = 'w-iframe-htmlfile', a.i_constructor.apply(a, arguments);
    };
  Y.prototype = new L(), Y.enabled = function () {
    return L.enabled();
  }, Y.need_body = !0, Y.roundTrips = 3;
  var Z = O['w-iframe-htmlfile'] = function (a, b) {
      this.run(a, b, '/htmlfile', bc, c.XHRLocalObject);
    };
  Z.prototype = new G();
  var $ = function (a, b, c, d) {
    var e = this;
    e.ri = a, e.Receiver = b, e.recv_url = c, e.AjaxObject = d, e._scheduleRecv();
  };
  $.prototype._scheduleRecv = function () {
    var a = this, b = a.poll = new a.Receiver(a.recv_url, a.AjaxObject), c = 0;
    b.onmessage = function (b) {
      c += 1, a.ri._didMessage(b.data);
    }, b.onclose = function (c) {
      a.poll = b = b.onmessage = b.onclose = null, a.poll_is_closing || (c.reason === 'permanent' ? a.ri._didClose(1006, 'Polling error (' + c.reason + ')') : a._scheduleRecv());
    };
  }, $.prototype.abort = function () {
    var a = this;
    a.poll_is_closing = !0, a.poll && a.poll.abort();
  };
  var _ = function (a) {
    var b = this, d = new EventSource(a);
    d.onmessage = function (a) {
      b.dispatchEvent(new e('message', { data: unescape(a.data) }));
    }, b.es_close = d.onerror = function (a, f) {
      var g = f ? 'user' : d.readyState !== 2 ? 'network' : 'permanent';
      b.es_close = d.onmessage = d.onerror = null, d.close(), d = null, c.delay(200, function () {
        b.dispatchEvent(new e('close', { reason: g }));
      });
    };
  };
  _.prototype = new d(), _.prototype.abort = function () {
    var a = this;
    a.es_close && a.es_close({}, !0);
  };
  var ba, bb = function () {
      if (ba === undefined)
        if ('ActiveXObject' in b)
          try {
            ba = !!new ActiveXObject('htmlfile');
          } catch (a) {
          }
        else
          ba = !1;
      return ba;
    }, bc = function (a) {
      var d = this;
      c.polluteGlobalNamespace(), d.id = 'a' + c.random_string(6, 26), a += (a.indexOf('?') === -1 ? '?' : '&') + 'c=' + escape(h + '.' + d.id);
      var f = bb() ? c.createHtmlfile : c.createIframe, g;
      b[h][d.id] = {
        start: function () {
          g.loaded();
        },
        message: function (a) {
          d.dispatchEvent(new e('message', { data: a }));
        },
        stop: function () {
          d.iframe_close({}, 'network');
        }
      }, d.iframe_close = function (a, c) {
        g.cleanup(), d.iframe_close = g = null, delete b[h][d.id], d.dispatchEvent(new e('close', { reason: c }));
      }, g = f(a, function (a) {
        d.iframe_close({}, 'permanent');
      });
    };
  bc.prototype = new d(), bc.prototype.abort = function () {
    var a = this;
    a.iframe_close && a.iframe_close({}, 'user');
  };
  var bd = function (a, b) {
    var c = this, d = 0;
    c.xo = new b('POST', a, null), c.xo.onchunk = function (a, b) {
      if (a !== 200)
        return;
      for (;;) {
        var f = b.slice(d), g = f.indexOf('\n');
        if (g === -1)
          break;
        d += g + 1;
        var h = f.slice(0, g);
        c.dispatchEvent(new e('message', { data: h }));
      }
    }, c.xo.onfinish = function (a, b) {
      c.xo.onchunk(a, b), c.xo = null;
      var d = a === 200 ? 'network' : 'permanent';
      c.dispatchEvent(new e('close', { reason: d }));
    };
  };
  return bd.prototype = new d(), bd.prototype.abort = function () {
    var a = this;
    a.xo && (a.xo.close(), a.dispatchEvent(new e('close', { reason: 'user' })), a.xo = null);
  }, y.getUtils = function () {
    return c;
  }, y.getIframeTransport = function () {
    return L;
  }, y;
}(), '_sockjs_onload' in window && setTimeout(_sockjs_onload, 1), typeof define == 'function' && define.amd && define('sockjs', [], function () {
  return SockJS;
});
var vertx = vertx || {};
!function (factory) {
  if (typeof define === 'function' && define.amd) {
    define('vertxbus', ['sockjs'], factory);
  } else {
    factory(SockJS);
  }
}(function (SockJS) {
  vertx.EventBus = function (url, options) {
    var that = this;
    var sockJSConn = new SockJS(url, undefined, options);
    var handlerMap = {};
    var replyHandlers = {};
    var state = vertx.EventBus.CONNECTING;
    that.onopen = null;
    that.onclose = null;
    that.send = function (address, message, replyHandler) {
      sendOrPub('send', address, message, replyHandler);
    };
    that.publish = function (address, message, replyHandler) {
      sendOrPub('publish', address, message, replyHandler);
    };
    that.registerHandler = function (address, handler) {
      checkSpecified('address', 'string', address);
      checkSpecified('handler', 'function', handler);
      checkOpen();
      var handlers = handlerMap[address];
      if (!handlers) {
        handlers = [handler];
        handlerMap[address] = handlers;
        var msg = {
            type: 'register',
            address: address
          };
        sockJSConn.send(JSON.stringify(msg));
      } else {
        handlers[handlers.length] = handler;
      }
    };
    that.unregisterHandler = function (address, handler) {
      checkSpecified('address', 'string', address);
      checkSpecified('handler', 'function', handler);
      checkOpen();
      var handlers = handlerMap[address];
      if (handlers) {
        var idx = handlers.indexOf(handler);
        if (idx != -1)
          handlers.splice(idx, 1);
        if (handlers.length == 0) {
          var msg = {
              type: 'unregister',
              address: address
            };
          sockJSConn.send(JSON.stringify(msg));
          delete handlerMap[address];
        }
      }
    };
    that.close = function () {
      checkOpen();
      state = vertx.EventBus.CLOSING;
      sockJSConn.close();
    };
    that.readyState = function () {
      return state;
    };
    sockJSConn.onopen = function () {
      state = vertx.EventBus.OPEN;
      if (that.onopen) {
        that.onopen();
      }
    };
    sockJSConn.onclose = function () {
      state = vertx.EventBus.CLOSED;
      if (that.onclose) {
        that.onclose();
      }
    };
    sockJSConn.onmessage = function (e) {
      var msg = e.data;
      var json = JSON.parse(msg);
      var body = json.body;
      var replyAddress = json.replyAddress;
      var address = json.address;
      var replyHandler;
      if (replyAddress) {
        replyHandler = function (reply, replyHandler) {
          that.send(replyAddress, reply, replyHandler);
        };
      }
      var handlers = handlerMap[address];
      if (handlers) {
        var copy = handlers.slice(0);
        for (var i = 0; i < copy.length; i++) {
          copy[i](body, replyHandler);
        }
      } else {
        var handler = replyHandlers[address];
        if (handler) {
          delete replyHandlers[replyAddress];
          handler(body, replyHandler);
        }
      }
    };
    function sendOrPub(sendOrPub, address, message, replyHandler) {
      checkSpecified('address', 'string', address);
      checkSpecified('message', 'object', message);
      checkSpecified('replyHandler', 'function', replyHandler, true);
      checkOpen();
      var envelope = {
          type: sendOrPub,
          address: address,
          body: message
        };
      if (replyHandler) {
        var replyAddress = makeUUID();
        envelope.replyAddress = replyAddress;
        replyHandlers[replyAddress] = replyHandler;
      }
      var str = JSON.stringify(envelope);
      sockJSConn.send(str);
    }
    function checkOpen() {
      if (state != vertx.EventBus.OPEN) {
        throw new Error('INVALID_STATE_ERR');
      }
    }
    function checkSpecified(paramName, paramType, param, optional) {
      if (!optional && !param) {
        throw new Error('Parameter ' + paramName + ' must be specified');
      }
      if (param && typeof param != paramType) {
        throw new Error('Parameter ' + paramName + ' must be of type ' + paramType);
      }
    }
    function isFunction(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    }
    function makeUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a, b) {
        return b = Math.random() * 16, (a == 'y' ? b & 3 | 8 : b | 0).toString(16);
      });
    }
  };
  vertx.EventBus.CONNECTING = 0;
  vertx.EventBus.OPEN = 1;
  vertx.EventBus.CLOSING = 2;
  vertx.EventBus.CLOSED = 3;
  return vertx.EventBus;
});
var AeroGear = {};
AeroGear.Core = function () {
  if (this instanceof AeroGear.Core) {
    throw 'Invalid instantiation of base class AeroGear.Core';
  }
  this.add = function (config) {
    var i, current, collection = this[this.collectionName] || {};
    if (!config) {
      return this;
    } else if (typeof config === 'string') {
      collection[config] = AeroGear[this.lib].adapters[this.type](config);
    } else if (AeroGear.isArray(config)) {
      for (i = 0; i < config.length; i++) {
        current = config[i];
        if (typeof current === 'string') {
          collection[current] = AeroGear[this.lib].adapters[this.type](current);
        } else {
          collection[current.name] = AeroGear[this.lib].adapters[current.type || this.type](current.name, current.settings || {});
        }
      }
    } else {
      collection[config.name] = AeroGear[this.lib].adapters[config.type || this.type](config.name, config.settings || {});
    }
    this[this.collectionName] = collection;
    return this;
  };
  this.remove = function (config) {
    var i, current, collection = this[this.collectionName] || {};
    if (typeof config === 'string') {
      delete collection[config];
    } else if (AeroGear.isArray(config)) {
      for (i = 0; i < config.length; i++) {
        current = config[i];
        if (typeof current === 'string') {
          delete collection[current];
        } else {
          delete collection[current.name];
        }
      }
    } else if (config) {
      delete collection[config.name];
    }
    this[this.collectionName] = collection;
    return this;
  };
};
AeroGear.isArray = function (obj) {
  return {}.toString.call(obj) === '[object Array]';
};
(function () {
  var _global = this;
  var mathRNG, nodeRNG, whatwgRNG;
  var _rndBytes = new Array(16);
  mathRNG = function () {
    var r, b = _rndBytes, i = 0;
    for (var i = 0, r; i < 16; i++) {
      if ((i & 3) == 0)
        r = Math.random() * 4294967296;
      b[i] = r >>> ((i & 3) << 3) & 255;
    }
    return b;
  };
  if (_global.crypto && crypto.getRandomValues) {
    var _rnds = new Uint32Array(4);
    whatwgRNG = function () {
      crypto.getRandomValues(_rnds);
      for (var c = 0; c < 16; c++) {
        _rndBytes[c] = _rnds[c >> 2] >>> (c & 3) * 8 & 255;
      }
      return _rndBytes;
    };
  }
  try {
    var _rb = require('crypto').randomBytes;
    nodeRNG = _rb && function () {
      return _rb(16);
    };
  } catch (e) {
  }
  var _rng = nodeRNG || whatwgRNG || mathRNG;
  var BufferClass = typeof Buffer == 'function' ? Buffer : Array;
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 256).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }
  function parse(s, buf, offset) {
    var i = buf && offset || 0, ii = 0;
    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function (byte) {
      if (ii < 16) {
        buf[i + ii++] = _hexToByte[byte];
      }
    });
    while (ii < 16) {
      buf[i + ii++] = 0;
    }
    return buf;
  }
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
  }
  var _seedBytes = _rng();
  var _nodeId = [
      _seedBytes[0] | 1,
      _seedBytes[1],
      _seedBytes[2],
      _seedBytes[3],
      _seedBytes[4],
      _seedBytes[5]
    ];
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 16383;
  var _lastMSecs = 0, _lastNSecs = 0;
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];
    options = options || {};
    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 16383;
    }
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    msecs += 12219292800000;
    var tl = ((msecs & 268435455) * 10000 + nsecs) % 4294967296;
    b[i++] = tl >>> 24 & 255;
    b[i++] = tl >>> 16 & 255;
    b[i++] = tl >>> 8 & 255;
    b[i++] = tl & 255;
    var tmh = msecs / 4294967296 * 10000 & 268435455;
    b[i++] = tmh >>> 8 & 255;
    b[i++] = tmh & 255;
    b[i++] = tmh >>> 24 & 15 | 16;
    b[i++] = tmh >>> 16 & 255;
    b[i++] = clockseq >>> 8 | 128;
    b[i++] = clockseq & 255;
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }
    return buf ? buf : unparse(b);
  }
  function v4(options, buf, offset) {
    var i = buf && offset || 0;
    if (typeof options == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};
    var rnds = options.random || (options.rng || _rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }
    return buf || unparse(rnds);
  }
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;
  uuid.mathRNG = mathRNG;
  uuid.nodeRNG = nodeRNG;
  uuid.whatwgRNG = whatwgRNG;
  if (typeof module != 'undefined') {
    module.exports = uuid;
  } else {
    var _previousRoot = _global.uuid;
    uuid.noConflict = function () {
      _global.uuid = _previousRoot;
      return uuid;
    };
    _global.uuid = uuid;
  }
}());
(function (AeroGear, $, undefined) {
  AeroGear.Pipeline = function (config) {
    if (!(this instanceof AeroGear.Pipeline)) {
      return new AeroGear.Pipeline(config);
    }
    AeroGear.Core.call(this);
    this.lib = 'Pipeline';
    this.type = config ? config.type || 'Rest' : 'Rest';
    this.collectionName = 'pipes';
    this.add(config);
  };
  AeroGear.Pipeline.prototype = AeroGear.Core;
  AeroGear.Pipeline.constructor = AeroGear.Pipeline;
  AeroGear.Pipeline.adapters = {};
}(AeroGear, jQuery));
(function (AeroGear, $, uuid, undefined) {
  AeroGear.Pipeline.adapters.Rest = function (pipeName, settings) {
    if (!(this instanceof AeroGear.Pipeline.adapters.Rest)) {
      return new AeroGear.Pipeline.adapters.Rest(pipeName, settings);
    }
    settings = settings || {};
    var endpoint = settings.endpoint || pipeName, ajaxSettings = {
        url: settings.baseURL ? settings.baseURL + endpoint : endpoint,
        contentType: 'application/json',
        dataType: 'json'
      }, recordId = settings.recordId || 'id', authenticator = settings.authenticator || null, type = 'Rest', pageConfig = settings.pageConfig, timeout = settings.timeout ? settings.timeout * 1000 : 60000;
    this.addAuthIdentifier = function (settings) {
      return authenticator ? authenticator.addAuthIdentifier(settings) : settings;
    };
    this.deauthorize = function () {
      if (authenticator) {
        authenticator.deauthorize();
      }
    };
    this.getAjaxSettings = function () {
      return ajaxSettings;
    };
    this.getRecordId = function () {
      return recordId;
    };
    this.getTimeout = function () {
      return timeout;
    };
    this.getPageConfig = function () {
      return pageConfig;
    };
    this.updatePageConfig = function (newConfig, reset) {
      if (reset) {
        pageConfig = {};
        pageConfig.metadataLocation = newConfig.metadataLocation ? newConfig.metadataLocation : 'webLinking';
        pageConfig.previousIdentifier = newConfig.previousIdentifier ? newConfig.previousIdentifier : 'previous';
        pageConfig.nextIdentifier = newConfig.nextIdentifier ? newConfig.nextIdentifier : 'next';
        pageConfig.parameterProvider = newConfig.parameterProvider ? newConfig.parameterProvider : null;
      } else {
        $.extend(pageConfig, newConfig);
      }
    };
    if (pageConfig) {
      this.updatePageConfig(pageConfig, true);
    }
    this.webLinkingPageParser = function (jqXHR) {
      var linkAr, linksAr, currentLink, params, paramAr, identifier, query = {};
      linksAr = jqXHR.getResponseHeader('Link').split(',');
      for (var link in linksAr) {
        linkAr = linksAr[link].trim().split(';');
        for (var item in linkAr) {
          currentLink = linkAr[item].trim();
          if (currentLink.indexOf('<') === 0 && currentLink.lastIndexOf('>') === linkAr[item].length - 1) {
            params = currentLink.substr(1, currentLink.length - 2).split('?')[1];
          } else if (currentLink.indexOf('rel=') === 0) {
            if (currentLink.indexOf(pageConfig.previousIdentifier) >= 0) {
              identifier = pageConfig.previousIdentifier;
            } else if (currentLink.indexOf(pageConfig.nextIdentifier) >= 0) {
              identifier = pageConfig.nextIdentifier;
            }
          }
        }
        if (identifier) {
          query[identifier] = params;
          identifier = undefined;
        }
      }
      return query;
    };
    this.headerPageParser = function (jqXHR) {
      var previousQueryString = jqXHR.getResponseHeader(pageConfig.previousIdentifier), nextQueryString = jqXHR.getResponseHeader(pageConfig.nextIdentifier), pagingMetadata = {}, query = {};
      if (pageConfig.parameterProvider) {
        pagingMetadata = pageConfig.parameterProvider(jqXHR);
        query[pageConfig.previousIdentifier] = pagingMetadata[pageConfig.previousIdentifier];
        query[pageConfig.nextIdentifier] = pagingMetadata[pageConfig.nextIdentifier];
      } else {
        query[pageConfig.previousIdentifier] = previousQueryString ? previousQueryString.split('?')[1] : null;
        query[pageConfig.nextIdentifier] = nextQueryString ? nextQueryString.split('?')[1] : null;
      }
      return query;
    };
    this.bodyPageParser = function (body) {
      var query = {}, pagingMetadata = {};
      if (pageConfig.parameterProvider) {
        pagingMetadata = pageConfig.parameterProvider(body);
        query[pageConfig.previousIdentifier] = pagingMetadata[pageConfig.previousIdentifier];
        query[pageConfig.nextIdentifier] = pagingMetadata[pageConfig.nextIdentifier];
      } else {
        query[pageConfig.previousIdentifier] = body[pageConfig.previousIdentifier];
        query[pageConfig.nextIdentifier] = body[pageConfig.nextIdentifier];
      }
      return query;
    };
    this.formatJSONError = function (xhr) {
      if (this.getAjaxSettings().dataType === 'json') {
        try {
          xhr.responseJSON = JSON.parse(xhr.responseText);
        } catch (error) {
        }
      }
      return xhr;
    };
  };
  AeroGear.Pipeline.adapters.Rest.prototype.read = function (options) {
    var url, success, error, extraOptions, that = this, recordId = this.getRecordId(), ajaxSettings = this.getAjaxSettings(), pageConfig = this.getPageConfig();
    options = options ? options : {};
    options.query = options.query ? options.query : {};
    if (options[recordId]) {
      url = ajaxSettings.url + '/' + options[recordId];
    } else {
      url = ajaxSettings.url;
    }
    if (pageConfig && options.paging !== false) {
      if (!options.paging) {
        options.paging = {
          offset: options.offsetValue || 0,
          limit: options.limitValue || 10
        };
      }
      options.query = options.query || {};
      for (var item in options.paging) {
        options.query[item] = options.paging[item];
      }
    }
    success = function (data, textStatus, jqXHR) {
      var paramMap;
      if (pageConfig && options.paging !== false) {
        paramMap = that[pageConfig.metadataLocation + 'PageParser'](pageConfig.metadataLocation === 'body' ? data : jqXHR);
        [
          'previous',
          'next'
        ].forEach(function (element) {
          data[element] = function (pipe, parameters, options) {
            return function (callbacks) {
              options.paging = true;
              options.offsetValue = options.limitValue = undefined;
              options.query = parameters;
              options.success = callbacks && callbacks.success ? callbacks.success : options.success;
              options.error = callbacks && callbacks.error ? callbacks.error : options.error;
              return pipe.read(options);
            };
          }(that, paramMap[pageConfig[element + 'Identifier']], options);
        });
      }
      if (options.success) {
        options.success.apply(this, arguments);
      }
    };
    error = function (jqXHR, textStatus, errorThrown) {
      jqXHR = that.formatJSONError(jqXHR);
      if (options.error) {
        options.error.apply(this, arguments);
      }
    };
    extraOptions = {
      type: 'GET',
      data: options.query,
      success: success,
      error: error,
      url: url,
      statusCode: options.statusCode,
      complete: options.complete,
      headers: options.headers,
      timeout: this.getTimeout()
    };
    if (options.jsonp) {
      extraOptions.dataType = 'jsonp';
      extraOptions.jsonp = options.jsonp.callback ? options.jsonp.callback : 'callback';
      if (options.jsonp.customCallback) {
        extraOptions.jsonpCallback = options.jsonp.customCallback;
      }
    }
    return $.ajax(this.addAuthIdentifier($.extend({}, this.getAjaxSettings(), extraOptions)));
  };
  AeroGear.Pipeline.adapters.Rest.prototype.save = function (data, options) {
    var that = this, recordId = this.getRecordId(), ajaxSettings = this.getAjaxSettings(), type, url, success, error, extraOptions;
    data = data || {};
    options = options || {};
    type = data[recordId] ? 'PUT' : 'POST';
    if (data[recordId]) {
      url = ajaxSettings.url + '/' + data[recordId];
    } else {
      url = ajaxSettings.url;
    }
    success = function (data, textStatus, jqXHR) {
      if (options.success) {
        options.success.apply(this, arguments);
      }
    };
    error = function (jqXHR, textStatus, errorThrown) {
      jqXHR = that.formatJSONError(jqXHR);
      if (options.error) {
        options.error.apply(this, arguments);
      }
    };
    extraOptions = $.extend({}, ajaxSettings, {
      data: data,
      type: type,
      url: url,
      success: success,
      error: error,
      statusCode: options.statusCode,
      complete: options.complete,
      headers: options.headers,
      timeout: this.getTimeout()
    });
    if (extraOptions.contentType === 'application/json' && extraOptions.data && typeof extraOptions.data !== 'string') {
      extraOptions.data = JSON.stringify(extraOptions.data);
    }
    return $.ajax(this.addAuthIdentifier($.extend({}, this.getAjaxSettings(), extraOptions)));
  };
  AeroGear.Pipeline.adapters.Rest.prototype.remove = function (toRemove, options) {
    var that = this, recordId = this.getRecordId(), ajaxSettings = this.getAjaxSettings(), delPath = '', delId, url, success, error, extraOptions;
    if (typeof toRemove === 'string' || typeof toRemove === 'number') {
      delId = toRemove;
    } else if (toRemove && toRemove[recordId]) {
      delId = toRemove[recordId];
    } else if (toRemove && !options) {
      options = toRemove;
    }
    options = options || {};
    delPath = delId ? '/' + delId : '';
    url = ajaxSettings.url + delPath;
    success = function (data, textStatus, jqXHR) {
      if (options.success) {
        options.success.apply(this, arguments);
      }
    };
    error = function (jqXHR, textStatus, errorThrown) {
      jqXHR = that.formatJSONError(jqXHR);
      if (options.error) {
        options.error.apply(this, arguments);
      }
    };
    extraOptions = {
      type: 'DELETE',
      url: url,
      success: success,
      error: error,
      statusCode: options.statusCode,
      complete: options.complete,
      headers: options.headers,
      timeout: this.getTimeout()
    };
    return $.ajax(this.addAuthIdentifier($.extend({}, ajaxSettings, extraOptions)));
  };
}(AeroGear, jQuery, uuid));
(function (AeroGear, $, undefined) {
  AeroGear.DataManager = function (config) {
    if (!(this instanceof AeroGear.DataManager)) {
      return new AeroGear.DataManager(config);
    }
    AeroGear.Core.call(this);
    this.lib = 'DataManager';
    this.type = config ? config.type || 'Memory' : 'Memory';
    this.collectionName = 'stores';
    this.add(config);
  };
  AeroGear.DataManager.prototype = AeroGear.Core;
  AeroGear.DataManager.constructor = AeroGear.DataManager;
  AeroGear.DataManager.adapters = {};
  AeroGear.DataManager.STATUS_NEW = 1;
  AeroGear.DataManager.STATUS_MODIFIED = 2;
  AeroGear.DataManager.STATUS_REMOVED = 0;
}(AeroGear, jQuery));
(function (AeroGear, $, uuid, undefined) {
  AeroGear.DataManager.adapters.Memory = function (storeName, settings) {
    if (!(this instanceof AeroGear.DataManager.adapters.Memory)) {
      return new AeroGear.DataManager.adapters.Memory(storeName, settings);
    }
    settings = settings || {};
    var recordId = settings.recordId ? settings.recordId : 'id', type = 'Memory', data = null;
    this.getRecordId = function () {
      return recordId;
    };
    this.getData = function () {
      return data;
    };
    this.setData = function (newData) {
      data = newData;
    };
    this.emptyData = function () {
      data = null;
    };
    this.addDataRecord = function (record) {
      data = data || [];
      data.push(record);
    };
    this.updateDataRecord = function (index, record) {
      data[index] = record;
    };
    this.removeDataRecord = function (index) {
      data.splice(index, 1);
    };
    this.traverseObjects = function (nestedKey, nestedFilter, nestedValue) {
      while (typeof nestedFilter === 'object') {
        if (nestedValue) {
          nestedKey = Object.keys(nestedFilter)[0];
          nestedFilter = nestedFilter[nestedKey];
          nestedValue = nestedValue[nestedKey];
        } else {
          break;
        }
      }
      if (nestedFilter === nestedValue) {
        return true;
      } else {
        return false;
      }
    };
  };
  AeroGear.DataManager.adapters.Memory.prototype.read = function (id) {
    var filter = {};
    filter[this.getRecordId()] = id;
    return id ? this.filter(filter) : this.getData();
  };
  AeroGear.DataManager.adapters.Memory.prototype.save = function (data, reset) {
    var itemFound = false;
    data = AeroGear.isArray(data) ? data : [data];
    if (reset) {
      this.setData(data);
    } else {
      if (this.getData()) {
        for (var i = 0; i < data.length; i++) {
          for (var item in this.getData()) {
            if (this.getData()[item][this.getRecordId()] === data[i][this.getRecordId()]) {
              this.updateDataRecord(item, data[i]);
              itemFound = true;
              break;
            }
          }
          if (!itemFound) {
            this.addDataRecord(data[i]);
          }
          itemFound = false;
        }
      } else {
        this.setData(data);
      }
    }
    return this.getData();
  };
  AeroGear.DataManager.adapters.Memory.prototype.remove = function (toRemove) {
    if (!toRemove) {
      this.emptyData();
      return this.getData();
    } else {
      toRemove = AeroGear.isArray(toRemove) ? toRemove : [toRemove];
    }
    var delId, data, item;
    for (var i = 0; i < toRemove.length; i++) {
      if (typeof toRemove[i] === 'string' || typeof toRemove[i] === 'number') {
        delId = toRemove[i];
      } else if (toRemove) {
        delId = toRemove[i][this.getRecordId()];
      } else {
        continue;
      }
      data = this.getData(true);
      for (item in data) {
        if (data[item][this.getRecordId()] === delId) {
          this.removeDataRecord(item);
        }
      }
    }
    return this.getData();
  };
  AeroGear.DataManager.adapters.Memory.prototype.filter = function (filterParameters, matchAny) {
    var filtered, key, j, k, l, nestedKey, nestedFilter, nestedValue, that = this;
    if (!filterParameters) {
      filtered = this.getData() || [];
      return filtered;
    }
    filtered = this.getData().filter(function (value, index, array) {
      var match = matchAny ? false : true, keys = Object.keys(filterParameters), filterObj, paramMatch, paramResult;
      for (key = 0; key < keys.length; key++) {
        if (filterParameters[keys[key]].data) {
          filterObj = filterParameters[keys[key]];
          paramResult = filterObj.matchAny ? false : true;
          for (j = 0; j < filterObj.data.length; j++) {
            if (AeroGear.isArray(value[keys[key]])) {
              if (value[keys[key]].length) {
                if ($(value[keys]).not(filterObj.data).length === 0 && $(filterObj.data).not(value[keys]).length === 0) {
                  paramResult = true;
                  break;
                } else {
                  for (k = 0; k < value[keys[key]].length; k++) {
                    if (filterObj.matchAny && filterObj.data[j] === value[keys[key]][k]) {
                      paramResult = true;
                      if (matchAny) {
                        break;
                      } else {
                        for (l = 0; l < value[keys[key]].length; l++) {
                          if (!matchAny && filterObj.data[j] !== value[keys[key]][l]) {
                            paramResult = false;
                            break;
                          }
                        }
                      }
                    }
                    if (!filterObj.matchAny && filterObj.data[j] !== value[keys[key]][k]) {
                      paramResult = false;
                      break;
                    }
                  }
                }
              } else {
                paramResult = false;
              }
            } else {
              if (typeof filterObj.data[j] === 'object') {
                if (filterObj.matchAny && that.traverseObjects(keys[key], filterObj.data[j], value[keys[key]])) {
                  paramResult = true;
                  break;
                }
                if (!filterObj.matchAny && !that.traverseObjects(keys[key], filterObj.data[j], value[keys[key]])) {
                  paramResult = false;
                  break;
                }
              } else {
                if (filterObj.matchAny && filterObj.data[j] === value[keys[key]]) {
                  paramResult = true;
                  break;
                }
                if (!filterObj.matchAny && filterObj.data[j] !== value[keys[key]]) {
                  paramResult = false;
                  break;
                }
              }
            }
          }
        } else {
          if (AeroGear.isArray(value[keys[key]])) {
            paramResult = matchAny ? false : true;
            if (value[keys[key]].length) {
              for (j = 0; j < value[keys[key]].length; j++) {
                if (matchAny && filterParameters[keys[key]] === value[keys[key]][j]) {
                  paramResult = true;
                  break;
                }
                if (!matchAny && filterParameters[keys[key]] !== value[keys[key]][j]) {
                  paramResult = false;
                  break;
                }
              }
            } else {
              paramResult = false;
            }
          } else {
            if (typeof filterParameters[keys[key]] === 'object') {
              paramResult = that.traverseObjects(keys[key], filterParameters[keys[key]], value[keys[key]]);
            } else {
              paramResult = filterParameters[keys[key]] === value[keys[key]] ? true : false;
            }
          }
        }
        if (matchAny && paramResult) {
          match = true;
          break;
        }
        if (!matchAny && !paramResult) {
          match = false;
          break;
        }
      }
      return match;
    });
    return filtered;
  };
}(AeroGear, jQuery, uuid));
(function (AeroGear, $, uuid, undefined) {
  AeroGear.DataManager.adapters.SessionLocal = function (storeName, settings) {
    if (!(this instanceof AeroGear.DataManager.adapters.SessionLocal)) {
      return new AeroGear.DataManager.adapters.SessionLocal(storeName, settings);
    }
    AeroGear.DataManager.adapters.Memory.apply(this, arguments);
    var data = null, type = 'SessionLocal', storeType = settings.storageType || 'sessionStorage', name = storeName, appContext = document.location.pathname.replace(/[\/\.]/g, '-'), storeKey = name + appContext, currentData = JSON.parse(window[storeType].getItem(storeKey));
    if (currentData) {
      AeroGear.DataManager.adapters.Memory.prototype.save.call(this, currentData, true);
    }
    this.getStoreType = function () {
      return storeType;
    };
    this.getStoreKey = function () {
      return storeKey;
    };
  };
  AeroGear.DataManager.adapters.SessionLocal.prototype = Object.create(new AeroGear.DataManager.adapters.Memory(), {
    save: {
      value: function (data, options) {
        var reset = options && options.reset ? options.reset : false, oldData = window[this.getStoreType()].getItem(this.getStoreKey()), newData = AeroGear.DataManager.adapters.Memory.prototype.save.apply(this, [
            arguments[0],
            reset
          ]);
        try {
          window[this.getStoreType()].setItem(this.getStoreKey(), JSON.stringify(newData));
          if (options && options.storageSuccess) {
            options.storageSuccess(newData);
          }
        } catch (error) {
          oldData = oldData ? JSON.parse(oldData) : [];
          newData = AeroGear.DataManager.adapters.Memory.prototype.save.apply(this, [
            oldData,
            true
          ]);
          if (options && options.storageError) {
            options.storageError(error, data);
          } else {
            throw error;
          }
        }
        return newData;
      },
      enumerable: true,
      configurable: true,
      writable: true
    },
    remove: {
      value: function (toRemove) {
        var newData = AeroGear.DataManager.adapters.Memory.prototype.remove.apply(this, arguments);
        window[this.getStoreType()].setItem(this.getStoreKey(), JSON.stringify(newData));
        return newData;
      },
      enumerable: true,
      configurable: true,
      writable: true
    }
  });
}(AeroGear, jQuery, uuid));
(function (AeroGear, $, undefined) {
  AeroGear.Auth = function (config) {
    if (!(this instanceof AeroGear.Auth)) {
      return new AeroGear.Auth(config);
    }
    AeroGear.Core.call(this);
    this.lib = 'Auth';
    this.type = config ? config.type || 'Rest' : 'Rest';
    this.collectionName = 'modules';
    this.add(config);
  };
  AeroGear.Auth.prototype = AeroGear.Core;
  AeroGear.Auth.constructor = AeroGear.Auth;
  AeroGear.Auth.adapters = {};
}(AeroGear, jQuery));
(function (AeroGear, $, undefined) {
  AeroGear.Auth.adapters.Rest = function (moduleName, settings) {
    if (!(this instanceof AeroGear.Auth.adapters.Rest)) {
      return new AeroGear.Auth.adapters.Rest(moduleName, settings);
    }
    settings = settings || {};
    var endpoints = settings.endpoints || {}, type = 'Rest', name = moduleName, agAuth = !!settings.agAuth, baseURL = settings.baseURL || '', tokenName = settings.tokenName || 'Auth-Token';
    this.isAuthenticated = function () {
      if (agAuth) {
        return !!sessionStorage.getItem('ag-auth-' + name);
      } else {
        return true;
      }
    };
    this.addAuthIdentifier = function (settings) {
      settings.headers = settings.headers ? settings.headers : {};
      settings.headers[tokenName] = sessionStorage.getItem('ag-auth-' + name);
      return $.extend({}, settings);
    };
    this.deauthorize = function () {
      sessionStorage.removeItem('ag-auth-' + name);
    };
    this.getSettings = function () {
      return settings;
    };
    this.getEndpoints = function () {
      return endpoints;
    };
    this.getName = function () {
      return name;
    };
    this.getAGAuth = function () {
      return agAuth;
    };
    this.getBaseURL = function () {
      return baseURL;
    };
    this.getTokenName = function () {
      return tokenName;
    };
    this.processOptions = function (options) {
      var processedOptions = {};
      if (options.contentType) {
        processedOptions.contentType = options.contentType;
      } else if (agAuth) {
        processedOptions.contentType = 'application/json';
      }
      if (options.dataType) {
        processedOptions.dataType = options.dataType;
      } else if (agAuth) {
        processedOptions.dataType = 'json';
      }
      if (options.baseURL) {
        processedOptions.url = options.baseURL;
      } else {
        processedOptions.url = baseURL;
      }
      return processedOptions;
    };
  };
  AeroGear.Auth.adapters.Rest.prototype.enroll = function (data, options) {
    options = options || {};
    var that = this, name = this.getName(), tokenName = this.getTokenName(), endpoints = this.getEndpoints(), success = function (data, textStatus, jqXHR) {
        sessionStorage.setItem('ag-auth-' + name, that.getAGAuth() ? jqXHR.getResponseHeader(tokenName) : 'true');
        if (options.success) {
          options.success.apply(this, arguments);
        }
      }, error = function (jqXHR, textStatus, errorThrown) {
        var args;
        try {
          jqXHR.responseJSON = JSON.parse(jqXHR.responseText);
          args = [
            jqXHR,
            textStatus,
            errorThrown
          ];
        } catch (error) {
          args = arguments;
        }
        if (options.error) {
          options.error.apply(this, args);
        }
      }, extraOptions = $.extend({}, this.processOptions(options), {
        success: success,
        error: error,
        data: data
      });
    if (endpoints.enroll) {
      extraOptions.url += endpoints.enroll;
    } else {
      extraOptions.url += 'auth/enroll';
    }
    if (extraOptions.contentType === 'application/json' && extraOptions.data && typeof extraOptions.data !== 'string') {
      extraOptions.data = JSON.stringify(extraOptions.data);
    }
    return $.ajax($.extend({}, this.getSettings(), { type: 'POST' }, extraOptions));
  };
  AeroGear.Auth.adapters.Rest.prototype.login = function (data, options) {
    options = options || {};
    var that = this, name = this.getName(), tokenName = this.getTokenName(), endpoints = this.getEndpoints(), success = function (data, textStatus, jqXHR) {
        sessionStorage.setItem('ag-auth-' + name, that.getAGAuth() ? jqXHR.getResponseHeader(tokenName) : 'true');
        if (options.success) {
          options.success.apply(this, arguments);
        }
      }, error = function (jqXHR, textStatus, errorThrown) {
        var args;
        try {
          jqXHR.responseJSON = JSON.parse(jqXHR.responseText);
          args = [
            jqXHR,
            textStatus,
            errorThrown
          ];
        } catch (error) {
          args = arguments;
        }
        if (options.error) {
          options.error.apply(this, args);
        }
      }, extraOptions = $.extend({}, this.processOptions(options), {
        success: success,
        error: error,
        data: data
      });
    if (endpoints.login) {
      extraOptions.url += endpoints.login;
    } else {
      extraOptions.url += 'auth/login';
    }
    if (extraOptions.contentType === 'application/json' && extraOptions.data && typeof extraOptions.data !== 'string') {
      extraOptions.data = JSON.stringify(extraOptions.data);
    }
    return $.ajax($.extend({}, this.getSettings(), { type: 'POST' }, extraOptions));
  };
  AeroGear.Auth.adapters.Rest.prototype.logout = function (options) {
    options = options || {};
    var that = this, name = this.getName(), tokenName = this.getTokenName(), endpoints = this.getEndpoints(), success = function (data, textStatus, jqXHR) {
        that.deauthorize();
        if (options.success) {
          options.success.apply(this, arguments);
        }
      }, error = function (jqXHR, textStatus, errorThrown) {
        var args;
        try {
          jqXHR.responseJSON = JSON.parse(jqXHR.responseText);
          args = [
            jqXHR,
            textStatus,
            errorThrown
          ];
        } catch (error) {
          args = arguments;
        }
        if (options.error) {
          options.error.apply(this, args);
        }
      }, extraOptions = $.extend({}, this.processOptions(options), {
        success: success,
        error: error
      });
    if (endpoints.logout) {
      extraOptions.url += endpoints.logout;
    } else {
      extraOptions.url += 'auth/logout';
    }
    extraOptions.headers = {};
    extraOptions.headers[tokenName] = sessionStorage.getItem('ag-auth-' + name);
    return $.ajax($.extend({}, this.getSettings(), { type: 'POST' }, extraOptions));
  };
}(AeroGear, jQuery));
(function (AeroGear, undefined) {
  AeroGear.Notifier = function (config) {
    if (!(this instanceof AeroGear.Notifier)) {
      return new AeroGear.Notifier(config);
    }
    AeroGear.Core.call(this);
    this.lib = 'Notifier';
    this.type = config ? config.type || 'vertx' : 'vertx';
    this.collectionName = 'clients';
    this.add(config);
  };
  AeroGear.Notifier.prototype = AeroGear.Core;
  AeroGear.Notifier.constructor = AeroGear.Notifier;
  AeroGear.Notifier.adapters = {};
  AeroGear.Notifier.CONNECTING = 0;
  AeroGear.Notifier.CONNECTED = 1;
  AeroGear.Notifier.DISCONNECTING = 2;
  AeroGear.Notifier.DISCONNECTED = 3;
}(AeroGear));
(function (AeroGear, VX, undefined) {
  AeroGear.Notifier.adapters.vertx = function (clientName, settings) {
    if (!(this instanceof AeroGear.Notifier.adapters.vertx)) {
      return new AeroGear.Notifier.adapters.vertx(clientName, settings);
    }
    settings = settings || {};
    var type = 'vertx', name = clientName, channels = settings.channels || [], autoConnect = !!settings.autoConnect || channels.length, connectURL = settings.connectURL || '', state = AeroGear.Notifier.CONNECTING, bus = null;
    this.getSettings = function () {
      return settings;
    };
    this.getName = function () {
      return name;
    };
    this.getAutoConnect = function () {
      return autoConnect;
    };
    this.getOnConnect = function () {
      return settings.onConnect;
    };
    this.getOnDisconnect = function () {
      return settings.onDisconnect;
    };
    this.getOnConnectError = function () {
      return settings.onConnectError;
    };
    this.getConnectURL = function () {
      return connectURL;
    };
    this.setConnectURL = function (url) {
      connectURL = url;
    };
    this.getChannels = function () {
      return channels;
    };
    this.addChannel = function (channel) {
      channels.push(channel);
    };
    this.getChannelIndex = function (address) {
      for (var i = 0; i < channels.length; i++) {
        if (channels[i].address === address) {
          return i;
        }
      }
      return -1;
    };
    this.removeChannel = function (channel) {
      var index = this.getChannelIndex(channel.address);
      if (index >= 0) {
        channels.splice(index, 1);
      }
    };
    this.removeAllChannels = function () {
      channels = [];
    };
    this.getState = function () {
      return state;
    };
    this.setState = function (newState) {
      state = newState;
    };
    this.getBus = function () {
      return bus;
    };
    this.setBus = function (newBus) {
      bus = newBus;
    };
    if (this.getAutoConnect() || this.getChannels().length) {
      this.connect({
        url: this.getConnectURL(),
        onConnect: this.getOnConnect(),
        onDisconnect: this.getOnDisconnect(),
        onConnectError: this.getOnConnectError()
      });
    }
  };
  AeroGear.Notifier.adapters.vertx.prototype.connect = function (options) {
    options = options || {};
    var that = this, bus = new VX.EventBus(options.url || this.getConnectURL());
    bus.onopen = function () {
      var channels = that.getChannels();
      that.setState(AeroGear.Notifier.CONNECTED);
      that.subscribe(channels, true);
      if (options.onConnect) {
        options.onConnect.apply(this, arguments);
      }
    };
    bus.onclose = function () {
      if (that.getState() === AeroGear.Notifier.DISCONNECTING) {
        that.setState(AeroGear.Notifier.DISCONNECTED);
        if (options.onDisconnect) {
          options.onDisconnect.apply(this, arguments);
        }
      } else {
        if (options.onConnectError) {
          options.onConnectError.apply(this, arguments);
        }
      }
    };
    this.setBus(bus);
  };
  AeroGear.Notifier.adapters.vertx.prototype.disconnect = function () {
    var bus = this.getBus();
    if (this.getState() === AeroGear.Notifier.CONNECTED) {
      this.setState(AeroGear.Notifier.DISCONNECTING);
      bus.close();
    }
  };
  AeroGear.Notifier.adapters.vertx.prototype.subscribe = function (channels, reset) {
    var bus = this.getBus();
    if (reset) {
      this.removeAllChannels();
    }
    channels = AeroGear.isArray(channels) ? channels : [channels];
    for (var i = 0; i < channels.length; i++) {
      this.addChannel(channels[i]);
      bus.registerHandler(channels[i].address, channels[i].callback);
    }
  };
  AeroGear.Notifier.adapters.vertx.prototype.unsubscribe = function (channels) {
    var bus = this.getBus();
    channels = AeroGear.isArray(channels) ? channels : [channels];
    for (var i = 0; i < channels.length; i++) {
      this.removeChannel(channels[i]);
      bus.unregisterHandler(channels[i].address, channels[i].callback);
    }
  };
}(AeroGear, vertx));
(function (window, document, undefined) {
  'use strict';
  var lowercase = function (string) {
    return isString(string) ? string.toLowerCase() : string;
  };
  var uppercase = function (string) {
    return isString(string) ? string.toUpperCase() : string;
  };
  var manualLowercase = function (s) {
    return isString(s) ? s.replace(/[A-Z]/g, function (ch) {
      return fromCharCode(ch.charCodeAt(0) | 32);
    }) : s;
  };
  var manualUppercase = function (s) {
    return isString(s) ? s.replace(/[a-z]/g, function (ch) {
      return fromCharCode(ch.charCodeAt(0) & ~32);
    }) : s;
  };
  if ('i' !== 'I'.toLowerCase()) {
    lowercase = manualLowercase;
    uppercase = manualUppercase;
  }
  function fromCharCode(code) {
    return String.fromCharCode(code);
  }
  var msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]), jqLite, jQuery, slice = [].slice, push = [].push, toString = Object.prototype.toString, angular = window.angular || (window.angular = {}), angularModule, nodeName_, uid = [
      '0',
      '0',
      '0'
    ];
  function isArrayLike(obj) {
    if (!obj || typeof obj.length !== 'number')
      return false;
    if (typeof obj.hasOwnProperty != 'function' && typeof obj.constructor != 'function') {
      return true;
    } else {
      return obj instanceof JQLite || jQuery && obj instanceof jQuery || toString.call(obj) !== '[object Object]' || typeof obj.callee === 'function';
    }
  }
  function forEach(obj, iterator, context) {
    var key;
    if (obj) {
      if (isFunction(obj)) {
        for (key in obj) {
          if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context);
      } else if (isArrayLike(obj)) {
        for (key = 0; key < obj.length; key++)
          iterator.call(context, obj[key], key);
      } else {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      }
    }
    return obj;
  }
  function sortedKeys(obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys.sort();
  }
  function forEachSorted(obj, iterator, context) {
    var keys = sortedKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      iterator.call(context, obj[keys[i]], keys[i]);
    }
    return keys;
  }
  function reverseParams(iteratorFn) {
    return function (value, key) {
      iteratorFn(key, value);
    };
  }
  function nextUid() {
    var index = uid.length;
    var digit;
    while (index) {
      index--;
      digit = uid[index].charCodeAt(0);
      if (digit == 57) {
        uid[index] = 'A';
        return uid.join('');
      }
      if (digit == 90) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return uid.join('');
      }
    }
    uid.unshift('0');
    return uid.join('');
  }
  function extend(dst) {
    forEach(arguments, function (obj) {
      if (obj !== dst) {
        forEach(obj, function (value, key) {
          dst[key] = value;
        });
      }
    });
    return dst;
  }
  function int(str) {
    return parseInt(str, 10);
  }
  function inherit(parent, extra) {
    return extend(new (extend(function () {
    }, { prototype: parent }))(), extra);
  }
  function noop() {
  }
  noop.$inject = [];
  function identity($) {
    return $;
  }
  identity.$inject = [];
  function valueFn(value) {
    return function () {
      return value;
    };
  }
  function isUndefined(value) {
    return typeof value == 'undefined';
  }
  function isDefined(value) {
    return typeof value != 'undefined';
  }
  function isObject(value) {
    return value != null && typeof value == 'object';
  }
  function isString(value) {
    return typeof value == 'string';
  }
  function isNumber(value) {
    return typeof value == 'number';
  }
  function isDate(value) {
    return toString.apply(value) == '[object Date]';
  }
  function isArray(value) {
    return toString.apply(value) == '[object Array]';
  }
  function isFunction(value) {
    return typeof value == 'function';
  }
  function isWindow(obj) {
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
  }
  function isScope(obj) {
    return obj && obj.$evalAsync && obj.$watch;
  }
  function isFile(obj) {
    return toString.apply(obj) === '[object File]';
  }
  function isBoolean(value) {
    return typeof value == 'boolean';
  }
  function trim(value) {
    return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
  }
  function isElement(node) {
    return node && (node.nodeName || node.bind && node.find);
  }
  function makeMap(str) {
    var obj = {}, items = str.split(','), i;
    for (i = 0; i < items.length; i++)
      obj[items[i]] = true;
    return obj;
  }
  if (msie < 9) {
    nodeName_ = function (element) {
      element = element.nodeName ? element : element[0];
      return element.scopeName && element.scopeName != 'HTML' ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
    };
  } else {
    nodeName_ = function (element) {
      return element.nodeName ? element.nodeName : element[0].nodeName;
    };
  }
  function map(obj, iterator, context) {
    var results = [];
    forEach(obj, function (value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  }
  function size(obj, ownPropsOnly) {
    var size = 0, key;
    if (isArray(obj) || isString(obj)) {
      return obj.length;
    } else if (isObject(obj)) {
      for (key in obj)
        if (!ownPropsOnly || obj.hasOwnProperty(key))
          size++;
    }
    return size;
  }
  function includes(array, obj) {
    return indexOf(array, obj) != -1;
  }
  function indexOf(array, obj) {
    if (array.indexOf)
      return array.indexOf(obj);
    for (var i = 0; i < array.length; i++) {
      if (obj === array[i])
        return i;
    }
    return -1;
  }
  function arrayRemove(array, value) {
    var index = indexOf(array, value);
    if (index >= 0)
      array.splice(index, 1);
    return value;
  }
  function isLeafNode(node) {
    if (node) {
      switch (node.nodeName) {
      case 'OPTION':
      case 'PRE':
      case 'TITLE':
        return true;
      }
    }
    return false;
  }
  function copy(source, destination) {
    if (isWindow(source) || isScope(source))
      throw Error('Can\'t copy Window or Scope');
    if (!destination) {
      destination = source;
      if (source) {
        if (isArray(source)) {
          destination = copy(source, []);
        } else if (isDate(source)) {
          destination = new Date(source.getTime());
        } else if (isObject(source)) {
          destination = copy(source, {});
        }
      }
    } else {
      if (source === destination)
        throw Error('Can\'t copy equivalent objects or arrays');
      if (isArray(source)) {
        destination.length = 0;
        for (var i = 0; i < source.length; i++) {
          destination.push(copy(source[i]));
        }
      } else {
        forEach(destination, function (value, key) {
          delete destination[key];
        });
        for (var key in source) {
          destination[key] = copy(source[key]);
        }
      }
    }
    return destination;
  }
  function shallowCopy(src, dst) {
    dst = dst || {};
    for (var key in src) {
      if (src.hasOwnProperty(key) && key.substr(0, 2) !== '$$') {
        dst[key] = src[key];
      }
    }
    return dst;
  }
  function equals(o1, o2) {
    if (o1 === o2)
      return true;
    if (o1 === null || o2 === null)
      return false;
    if (o1 !== o1 && o2 !== o2)
      return true;
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 == t2) {
      if (t1 == 'object') {
        if (isArray(o1)) {
          if ((length = o1.length) == o2.length) {
            for (key = 0; key < length; key++) {
              if (!equals(o1[key], o2[key]))
                return false;
            }
            return true;
          }
        } else if (isDate(o1)) {
          return isDate(o2) && o1.getTime() == o2.getTime();
        } else {
          if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2))
            return false;
          keySet = {};
          for (key in o1) {
            if (key.charAt(0) === '$' || isFunction(o1[key]))
              continue;
            if (!equals(o1[key], o2[key]))
              return false;
            keySet[key] = true;
          }
          for (key in o2) {
            if (!keySet[key] && key.charAt(0) !== '$' && o2[key] !== undefined && !isFunction(o2[key]))
              return false;
          }
          return true;
        }
      }
    }
    return false;
  }
  function concat(array1, array2, index) {
    return array1.concat(slice.call(array2, index));
  }
  function sliceArgs(args, startIndex) {
    return slice.call(args, startIndex || 0);
  }
  function bind(self, fn) {
    var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
    if (isFunction(fn) && !(fn instanceof RegExp)) {
      return curryArgs.length ? function () {
        return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs);
      } : function () {
        return arguments.length ? fn.apply(self, arguments) : fn.call(self);
      };
    } else {
      return fn;
    }
  }
  function toJsonReplacer(key, value) {
    var val = value;
    if (/^\$+/.test(key)) {
      val = undefined;
    } else if (isWindow(value)) {
      val = '$WINDOW';
    } else if (value && document === value) {
      val = '$DOCUMENT';
    } else if (isScope(value)) {
      val = '$SCOPE';
    }
    return val;
  }
  function toJson(obj, pretty) {
    return JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
  }
  function fromJson(json) {
    return isString(json) ? JSON.parse(json) : json;
  }
  function toBoolean(value) {
    if (value && value.length !== 0) {
      var v = lowercase('' + value);
      value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
    } else {
      value = false;
    }
    return value;
  }
  function startingTag(element) {
    element = jqLite(element).clone();
    try {
      element.html('');
    } catch (e) {
    }
    var TEXT_NODE = 3;
    var elemHtml = jqLite('<div>').append(element).html();
    try {
      return element[0].nodeType === TEXT_NODE ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (match, nodeName) {
        return '<' + lowercase(nodeName);
      });
    } catch (e) {
      return lowercase(elemHtml);
    }
  }
  function parseKeyValue(keyValue) {
    var obj = {}, key_value, key;
    forEach((keyValue || '').split('&'), function (keyValue) {
      if (keyValue) {
        key_value = keyValue.split('=');
        key = decodeURIComponent(key_value[0]);
        obj[key] = isDefined(key_value[1]) ? decodeURIComponent(key_value[1]) : true;
      }
    });
    return obj;
  }
  function toKeyValue(obj) {
    var parts = [];
    forEach(obj, function (value, key) {
      parts.push(encodeUriQuery(key, true) + (value === true ? '' : '=' + encodeUriQuery(value, true)));
    });
    return parts.length ? parts.join('&') : '';
  }
  function encodeUriSegment(val) {
    return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
  }
  function encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(pctEncodeSpaces ? null : /%20/g, '+');
  }
  function angularInit(element, bootstrap) {
    var elements = [element], appElement, module, names = [
        'ng:app',
        'ng-app',
        'x-ng-app',
        'data-ng-app'
      ], NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    function append(element) {
      element && elements.push(element);
    }
    forEach(names, function (name) {
      names[name] = true;
      append(document.getElementById(name));
      name = name.replace(':', '\\:');
      if (element.querySelectorAll) {
        forEach(element.querySelectorAll('.' + name), append);
        forEach(element.querySelectorAll('.' + name + '\\:'), append);
        forEach(element.querySelectorAll('[' + name + ']'), append);
      }
    });
    forEach(elements, function (element) {
      if (!appElement) {
        var className = ' ' + element.className + ' ';
        var match = NG_APP_CLASS_REGEXP.exec(className);
        if (match) {
          appElement = element;
          module = (match[2] || '').replace(/\s+/g, ',');
        } else {
          forEach(element.attributes, function (attr) {
            if (!appElement && names[attr.name]) {
              appElement = element;
              module = attr.value;
            }
          });
        }
      }
    });
    if (appElement) {
      bootstrap(appElement, module ? [module] : []);
    }
  }
  function bootstrap(element, modules) {
    element = jqLite(element);
    modules = modules || [];
    modules.unshift([
      '$provide',
      function ($provide) {
        $provide.value('$rootElement', element);
      }
    ]);
    modules.unshift('ng');
    var injector = createInjector(modules);
    injector.invoke([
      '$rootScope',
      '$rootElement',
      '$compile',
      '$injector',
      function (scope, element, compile, injector) {
        scope.$apply(function () {
          element.data('$injector', injector);
          compile(element)(scope);
        });
      }
    ]);
    return injector;
  }
  var SNAKE_CASE_REGEXP = /[A-Z]/g;
  function snake_case(name, separator) {
    separator = separator || '_';
    return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }
  function bindJQuery() {
    jQuery = window.jQuery;
    if (jQuery) {
      jqLite = jQuery;
      extend(jQuery.fn, {
        scope: JQLitePrototype.scope,
        controller: JQLitePrototype.controller,
        injector: JQLitePrototype.injector,
        inheritedData: JQLitePrototype.inheritedData
      });
      JQLitePatchJQueryRemove('remove', true);
      JQLitePatchJQueryRemove('empty');
      JQLitePatchJQueryRemove('html');
    } else {
      jqLite = JQLite;
    }
    angular.element = jqLite;
  }
  function assertArg(arg, name, reason) {
    if (!arg) {
      throw new Error('Argument \'' + (name || '?') + '\' is ' + (reason || 'required'));
    }
    return arg;
  }
  function assertArgFn(arg, name, acceptArrayAnnotation) {
    if (acceptArrayAnnotation && isArray(arg)) {
      arg = arg[arg.length - 1];
    }
    assertArg(isFunction(arg), name, 'not a function, got ' + (arg && typeof arg == 'object' ? arg.constructor.name || 'Object' : typeof arg));
    return arg;
  }
  function setupModuleLoader(window) {
    function ensure(obj, name, factory) {
      return obj[name] || (obj[name] = factory());
    }
    return ensure(ensure(window, 'angular', Object), 'module', function () {
      var modules = {};
      return function module(name, requires, configFn) {
        if (requires && modules.hasOwnProperty(name)) {
          modules[name] = null;
        }
        return ensure(modules, name, function () {
          if (!requires) {
            throw Error('No module: ' + name);
          }
          var invokeQueue = [];
          var runBlocks = [];
          var config = invokeLater('$injector', 'invoke');
          var moduleInstance = {
              _invokeQueue: invokeQueue,
              _runBlocks: runBlocks,
              requires: requires,
              name: name,
              provider: invokeLater('$provide', 'provider'),
              factory: invokeLater('$provide', 'factory'),
              service: invokeLater('$provide', 'service'),
              value: invokeLater('$provide', 'value'),
              constant: invokeLater('$provide', 'constant', 'unshift'),
              filter: invokeLater('$filterProvider', 'register'),
              controller: invokeLater('$controllerProvider', 'register'),
              directive: invokeLater('$compileProvider', 'directive'),
              config: config,
              run: function (block) {
                runBlocks.push(block);
                return this;
              }
            };
          if (configFn) {
            config(configFn);
          }
          return moduleInstance;
          function invokeLater(provider, method, insertMethod) {
            return function () {
              invokeQueue[insertMethod || 'push']([
                provider,
                method,
                arguments
              ]);
              return moduleInstance;
            };
          }
        });
      };
    });
  }
  var version = {
      full: '1.0.5',
      major: 1,
      minor: 0,
      dot: 5,
      codeName: 'flatulent-propulsion'
    };
  function publishExternalAPI(angular) {
    extend(angular, {
      'bootstrap': bootstrap,
      'copy': copy,
      'extend': extend,
      'equals': equals,
      'element': jqLite,
      'forEach': forEach,
      'injector': createInjector,
      'noop': noop,
      'bind': bind,
      'toJson': toJson,
      'fromJson': fromJson,
      'identity': identity,
      'isUndefined': isUndefined,
      'isDefined': isDefined,
      'isString': isString,
      'isFunction': isFunction,
      'isObject': isObject,
      'isNumber': isNumber,
      'isElement': isElement,
      'isArray': isArray,
      'version': version,
      'isDate': isDate,
      'lowercase': lowercase,
      'uppercase': uppercase,
      'callbacks': { counter: 0 }
    });
    angularModule = setupModuleLoader(window);
    try {
      angularModule('ngLocale');
    } catch (e) {
      angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
    }
    angularModule('ng', ['ngLocale'], [
      '$provide',
      function ngModule($provide) {
        $provide.provider('$compile', $CompileProvider).directive({
          a: htmlAnchorDirective,
          input: inputDirective,
          textarea: inputDirective,
          form: formDirective,
          script: scriptDirective,
          select: selectDirective,
          style: styleDirective,
          option: optionDirective,
          ngBind: ngBindDirective,
          ngBindHtmlUnsafe: ngBindHtmlUnsafeDirective,
          ngBindTemplate: ngBindTemplateDirective,
          ngClass: ngClassDirective,
          ngClassEven: ngClassEvenDirective,
          ngClassOdd: ngClassOddDirective,
          ngCsp: ngCspDirective,
          ngCloak: ngCloakDirective,
          ngController: ngControllerDirective,
          ngForm: ngFormDirective,
          ngHide: ngHideDirective,
          ngInclude: ngIncludeDirective,
          ngInit: ngInitDirective,
          ngNonBindable: ngNonBindableDirective,
          ngPluralize: ngPluralizeDirective,
          ngRepeat: ngRepeatDirective,
          ngShow: ngShowDirective,
          ngSubmit: ngSubmitDirective,
          ngStyle: ngStyleDirective,
          ngSwitch: ngSwitchDirective,
          ngSwitchWhen: ngSwitchWhenDirective,
          ngSwitchDefault: ngSwitchDefaultDirective,
          ngOptions: ngOptionsDirective,
          ngView: ngViewDirective,
          ngTransclude: ngTranscludeDirective,
          ngModel: ngModelDirective,
          ngList: ngListDirective,
          ngChange: ngChangeDirective,
          required: requiredDirective,
          ngRequired: requiredDirective,
          ngValue: ngValueDirective
        }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives);
        $provide.provider({
          $anchorScroll: $AnchorScrollProvider,
          $browser: $BrowserProvider,
          $cacheFactory: $CacheFactoryProvider,
          $controller: $ControllerProvider,
          $document: $DocumentProvider,
          $exceptionHandler: $ExceptionHandlerProvider,
          $filter: $FilterProvider,
          $interpolate: $InterpolateProvider,
          $http: $HttpProvider,
          $httpBackend: $HttpBackendProvider,
          $location: $LocationProvider,
          $log: $LogProvider,
          $parse: $ParseProvider,
          $route: $RouteProvider,
          $routeParams: $RouteParamsProvider,
          $rootScope: $RootScopeProvider,
          $q: $QProvider,
          $sniffer: $SnifferProvider,
          $templateCache: $TemplateCacheProvider,
          $timeout: $TimeoutProvider,
          $window: $WindowProvider
        });
      }
    ]);
  }
  var jqCache = JQLite.cache = {}, jqName = JQLite.expando = 'ng-' + new Date().getTime(), jqId = 1, addEventListenerFn = window.document.addEventListener ? function (element, type, fn) {
      element.addEventListener(type, fn, false);
    } : function (element, type, fn) {
      element.attachEvent('on' + type, fn);
    }, removeEventListenerFn = window.document.removeEventListener ? function (element, type, fn) {
      element.removeEventListener(type, fn, false);
    } : function (element, type, fn) {
      element.detachEvent('on' + type, fn);
    };
  function jqNextId() {
    return ++jqId;
  }
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
  }
  function JQLitePatchJQueryRemove(name, dispatchThis) {
    var originalJqFn = jQuery.fn[name];
    originalJqFn = originalJqFn.$original || originalJqFn;
    removePatch.$original = originalJqFn;
    jQuery.fn[name] = removePatch;
    function removePatch() {
      var list = [this], fireEvent = dispatchThis, set, setIndex, setLength, element, childIndex, childLength, children, fns, events;
      while (list.length) {
        set = list.shift();
        for (setIndex = 0, setLength = set.length; setIndex < setLength; setIndex++) {
          element = jqLite(set[setIndex]);
          if (fireEvent) {
            element.triggerHandler('$destroy');
          } else {
            fireEvent = !fireEvent;
          }
          for (childIndex = 0, childLength = (children = element.children()).length; childIndex < childLength; childIndex++) {
            list.push(jQuery(children[childIndex]));
          }
        }
      }
      return originalJqFn.apply(this, arguments);
    }
  }
  function JQLite(element) {
    if (element instanceof JQLite) {
      return element;
    }
    if (!(this instanceof JQLite)) {
      if (isString(element) && element.charAt(0) != '<') {
        throw Error('selectors not implemented');
      }
      return new JQLite(element);
    }
    if (isString(element)) {
      var div = document.createElement('div');
      div.innerHTML = '<div>&#160;</div>' + element;
      div.removeChild(div.firstChild);
      JQLiteAddNodes(this, div.childNodes);
      this.remove();
    } else {
      JQLiteAddNodes(this, element);
    }
  }
  function JQLiteClone(element) {
    return element.cloneNode(true);
  }
  function JQLiteDealoc(element) {
    JQLiteRemoveData(element);
    for (var i = 0, children = element.childNodes || []; i < children.length; i++) {
      JQLiteDealoc(children[i]);
    }
  }
  function JQLiteUnbind(element, type, fn) {
    var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
    if (!handle)
      return;
    if (isUndefined(type)) {
      forEach(events, function (eventHandler, type) {
        removeEventListenerFn(element, type, eventHandler);
        delete events[type];
      });
    } else {
      if (isUndefined(fn)) {
        removeEventListenerFn(element, type, events[type]);
        delete events[type];
      } else {
        arrayRemove(events[type], fn);
      }
    }
  }
  function JQLiteRemoveData(element) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId];
    if (expandoStore) {
      if (expandoStore.handle) {
        expandoStore.events.$destroy && expandoStore.handle({}, '$destroy');
        JQLiteUnbind(element);
      }
      delete jqCache[expandoId];
      element[jqName] = undefined;
    }
  }
  function JQLiteExpandoStore(element, key, value) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId || -1];
    if (isDefined(value)) {
      if (!expandoStore) {
        element[jqName] = expandoId = jqNextId();
        expandoStore = jqCache[expandoId] = {};
      }
      expandoStore[key] = value;
    } else {
      return expandoStore && expandoStore[key];
    }
  }
  function JQLiteData(element, key, value) {
    var data = JQLiteExpandoStore(element, 'data'), isSetter = isDefined(value), keyDefined = !isSetter && isDefined(key), isSimpleGetter = keyDefined && !isObject(key);
    if (!data && !isSimpleGetter) {
      JQLiteExpandoStore(element, 'data', data = {});
    }
    if (isSetter) {
      data[key] = value;
    } else {
      if (keyDefined) {
        if (isSimpleGetter) {
          return data && data[key];
        } else {
          extend(data, key);
        }
      } else {
        return data;
      }
    }
  }
  function JQLiteHasClass(element, selector) {
    return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + selector + ' ') > -1;
  }
  function JQLiteRemoveClass(element, cssClasses) {
    if (cssClasses) {
      forEach(cssClasses.split(' '), function (cssClass) {
        element.className = trim((' ' + element.className + ' ').replace(/[\n\t]/g, ' ').replace(' ' + trim(cssClass) + ' ', ' '));
      });
    }
  }
  function JQLiteAddClass(element, cssClasses) {
    if (cssClasses) {
      forEach(cssClasses.split(' '), function (cssClass) {
        if (!JQLiteHasClass(element, cssClass)) {
          element.className = trim(element.className + ' ' + trim(cssClass));
        }
      });
    }
  }
  function JQLiteAddNodes(root, elements) {
    if (elements) {
      elements = !elements.nodeName && isDefined(elements.length) && !isWindow(elements) ? elements : [elements];
      for (var i = 0; i < elements.length; i++) {
        root.push(elements[i]);
      }
    }
  }
  function JQLiteController(element, name) {
    return JQLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
  }
  function JQLiteInheritedData(element, name, value) {
    element = jqLite(element);
    if (element[0].nodeType == 9) {
      element = element.find('html');
    }
    while (element.length) {
      if (value = element.data(name))
        return value;
      element = element.parent();
    }
  }
  var JQLitePrototype = JQLite.prototype = {
      ready: function (fn) {
        var fired = false;
        function trigger() {
          if (fired)
            return;
          fired = true;
          fn();
        }
        this.bind('DOMContentLoaded', trigger);
        JQLite(window).bind('load', trigger);
      },
      toString: function () {
        var value = [];
        forEach(this, function (e) {
          value.push('' + e);
        });
        return '[' + value.join(', ') + ']';
      },
      eq: function (index) {
        return index >= 0 ? jqLite(this[index]) : jqLite(this[this.length + index]);
      },
      length: 0,
      push: push,
      sort: [].sort,
      splice: [].splice
    };
  var BOOLEAN_ATTR = {};
  forEach('multiple,selected,checked,disabled,readOnly,required'.split(','), function (value) {
    BOOLEAN_ATTR[lowercase(value)] = value;
  });
  var BOOLEAN_ELEMENTS = {};
  forEach('input,select,option,textarea,button,form'.split(','), function (value) {
    BOOLEAN_ELEMENTS[uppercase(value)] = true;
  });
  function getBooleanAttrName(element, name) {
    var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
    return booleanAttr && BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
  }
  forEach({
    data: JQLiteData,
    inheritedData: JQLiteInheritedData,
    scope: function (element) {
      return JQLiteInheritedData(element, '$scope');
    },
    controller: JQLiteController,
    injector: function (element) {
      return JQLiteInheritedData(element, '$injector');
    },
    removeAttr: function (element, name) {
      element.removeAttribute(name);
    },
    hasClass: JQLiteHasClass,
    css: function (element, name, value) {
      name = camelCase(name);
      if (isDefined(value)) {
        element.style[name] = value;
      } else {
        var val;
        if (msie <= 8) {
          val = element.currentStyle && element.currentStyle[name];
          if (val === '')
            val = 'auto';
        }
        val = val || element.style[name];
        if (msie <= 8) {
          val = val === '' ? undefined : val;
        }
        return val;
      }
    },
    attr: function (element, name, value) {
      var lowercasedName = lowercase(name);
      if (BOOLEAN_ATTR[lowercasedName]) {
        if (isDefined(value)) {
          if (!!value) {
            element[name] = true;
            element.setAttribute(name, lowercasedName);
          } else {
            element[name] = false;
            element.removeAttribute(lowercasedName);
          }
        } else {
          return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
        }
      } else if (isDefined(value)) {
        element.setAttribute(name, value);
      } else if (element.getAttribute) {
        var ret = element.getAttribute(name, 2);
        return ret === null ? undefined : ret;
      }
    },
    prop: function (element, name, value) {
      if (isDefined(value)) {
        element[name] = value;
      } else {
        return element[name];
      }
    },
    text: extend(msie < 9 ? function (element, value) {
      if (element.nodeType == 1) {
        if (isUndefined(value))
          return element.innerText;
        element.innerText = value;
      } else {
        if (isUndefined(value))
          return element.nodeValue;
        element.nodeValue = value;
      }
    } : function (element, value) {
      if (isUndefined(value)) {
        return element.textContent;
      }
      element.textContent = value;
    }, { $dv: '' }),
    val: function (element, value) {
      if (isUndefined(value)) {
        return element.value;
      }
      element.value = value;
    },
    html: function (element, value) {
      if (isUndefined(value)) {
        return element.innerHTML;
      }
      for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
        JQLiteDealoc(childNodes[i]);
      }
      element.innerHTML = value;
    }
  }, function (fn, name) {
    JQLite.prototype[name] = function (arg1, arg2) {
      var i, key;
      if ((fn.length == 2 && (fn !== JQLiteHasClass && fn !== JQLiteController) ? arg1 : arg2) === undefined) {
        if (isObject(arg1)) {
          for (i = 0; i < this.length; i++) {
            if (fn === JQLiteData) {
              fn(this[i], arg1);
            } else {
              for (key in arg1) {
                fn(this[i], key, arg1[key]);
              }
            }
          }
          return this;
        } else {
          if (this.length)
            return fn(this[0], arg1, arg2);
        }
      } else {
        for (i = 0; i < this.length; i++) {
          fn(this[i], arg1, arg2);
        }
        return this;
      }
      return fn.$dv;
    };
  });
  function createEventHandler(element, events) {
    var eventHandler = function (event, type) {
      if (!event.preventDefault) {
        event.preventDefault = function () {
          event.returnValue = false;
        };
      }
      if (!event.stopPropagation) {
        event.stopPropagation = function () {
          event.cancelBubble = true;
        };
      }
      if (!event.target) {
        event.target = event.srcElement || document;
      }
      if (isUndefined(event.defaultPrevented)) {
        var prevent = event.preventDefault;
        event.preventDefault = function () {
          event.defaultPrevented = true;
          prevent.call(event);
        };
        event.defaultPrevented = false;
      }
      event.isDefaultPrevented = function () {
        return event.defaultPrevented;
      };
      forEach(events[type || event.type], function (fn) {
        fn.call(element, event);
      });
      if (msie <= 8) {
        event.preventDefault = null;
        event.stopPropagation = null;
        event.isDefaultPrevented = null;
      } else {
        delete event.preventDefault;
        delete event.stopPropagation;
        delete event.isDefaultPrevented;
      }
    };
    eventHandler.elem = element;
    return eventHandler;
  }
  forEach({
    removeData: JQLiteRemoveData,
    dealoc: JQLiteDealoc,
    bind: function bindFn(element, type, fn) {
      var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
      if (!events)
        JQLiteExpandoStore(element, 'events', events = {});
      if (!handle)
        JQLiteExpandoStore(element, 'handle', handle = createEventHandler(element, events));
      forEach(type.split(' '), function (type) {
        var eventFns = events[type];
        if (!eventFns) {
          if (type == 'mouseenter' || type == 'mouseleave') {
            var counter = 0;
            events.mouseenter = [];
            events.mouseleave = [];
            bindFn(element, 'mouseover', function (event) {
              counter++;
              if (counter == 1) {
                handle(event, 'mouseenter');
              }
            });
            bindFn(element, 'mouseout', function (event) {
              counter--;
              if (counter == 0) {
                handle(event, 'mouseleave');
              }
            });
          } else {
            addEventListenerFn(element, type, handle);
            events[type] = [];
          }
          eventFns = events[type];
        }
        eventFns.push(fn);
      });
    },
    unbind: JQLiteUnbind,
    replaceWith: function (element, replaceNode) {
      var index, parent = element.parentNode;
      JQLiteDealoc(element);
      forEach(new JQLite(replaceNode), function (node) {
        if (index) {
          parent.insertBefore(node, index.nextSibling);
        } else {
          parent.replaceChild(node, element);
        }
        index = node;
      });
    },
    children: function (element) {
      var children = [];
      forEach(element.childNodes, function (element) {
        if (element.nodeType === 1)
          children.push(element);
      });
      return children;
    },
    contents: function (element) {
      return element.childNodes || [];
    },
    append: function (element, node) {
      forEach(new JQLite(node), function (child) {
        if (element.nodeType === 1)
          element.appendChild(child);
      });
    },
    prepend: function (element, node) {
      if (element.nodeType === 1) {
        var index = element.firstChild;
        forEach(new JQLite(node), function (child) {
          if (index) {
            element.insertBefore(child, index);
          } else {
            element.appendChild(child);
            index = child;
          }
        });
      }
    },
    wrap: function (element, wrapNode) {
      wrapNode = jqLite(wrapNode)[0];
      var parent = element.parentNode;
      if (parent) {
        parent.replaceChild(wrapNode, element);
      }
      wrapNode.appendChild(element);
    },
    remove: function (element) {
      JQLiteDealoc(element);
      var parent = element.parentNode;
      if (parent)
        parent.removeChild(element);
    },
    after: function (element, newElement) {
      var index = element, parent = element.parentNode;
      forEach(new JQLite(newElement), function (node) {
        parent.insertBefore(node, index.nextSibling);
        index = node;
      });
    },
    addClass: JQLiteAddClass,
    removeClass: JQLiteRemoveClass,
    toggleClass: function (element, selector, condition) {
      if (isUndefined(condition)) {
        condition = !JQLiteHasClass(element, selector);
      }
      (condition ? JQLiteAddClass : JQLiteRemoveClass)(element, selector);
    },
    parent: function (element) {
      var parent = element.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    next: function (element) {
      if (element.nextElementSibling) {
        return element.nextElementSibling;
      }
      var elm = element.nextSibling;
      while (elm != null && elm.nodeType !== 1) {
        elm = elm.nextSibling;
      }
      return elm;
    },
    find: function (element, selector) {
      return element.getElementsByTagName(selector);
    },
    clone: JQLiteClone,
    triggerHandler: function (element, eventName) {
      var eventFns = (JQLiteExpandoStore(element, 'events') || {})[eventName];
      forEach(eventFns, function (fn) {
        fn.call(element, null);
      });
    }
  }, function (fn, name) {
    JQLite.prototype[name] = function (arg1, arg2) {
      var value;
      for (var i = 0; i < this.length; i++) {
        if (value == undefined) {
          value = fn(this[i], arg1, arg2);
          if (value !== undefined) {
            value = jqLite(value);
          }
        } else {
          JQLiteAddNodes(value, fn(this[i], arg1, arg2));
        }
      }
      return value == undefined ? this : value;
    };
  });
  function hashKey(obj) {
    var objType = typeof obj, key;
    if (objType == 'object' && obj !== null) {
      if (typeof (key = obj.$$hashKey) == 'function') {
        key = obj.$$hashKey();
      } else if (key === undefined) {
        key = obj.$$hashKey = nextUid();
      }
    } else {
      key = obj;
    }
    return objType + ':' + key;
  }
  function HashMap(array) {
    forEach(array, this.put, this);
  }
  HashMap.prototype = {
    put: function (key, value) {
      this[hashKey(key)] = value;
    },
    get: function (key) {
      return this[hashKey(key)];
    },
    remove: function (key) {
      var value = this[key = hashKey(key)];
      delete this[key];
      return value;
    }
  };
  function HashQueueMap() {
  }
  HashQueueMap.prototype = {
    push: function (key, value) {
      var array = this[key = hashKey(key)];
      if (!array) {
        this[key] = [value];
      } else {
        array.push(value);
      }
    },
    shift: function (key) {
      var array = this[key = hashKey(key)];
      if (array) {
        if (array.length == 1) {
          delete this[key];
          return array[0];
        } else {
          return array.shift();
        }
      }
    },
    peek: function (key) {
      var array = this[hashKey(key)];
      if (array) {
        return array[0];
      }
    }
  };
  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var FN_ARG_SPLIT = /,/;
  var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  function annotate(fn) {
    var $inject, fnText, argDecl, last;
    if (typeof fn == 'function') {
      if (!($inject = fn.$inject)) {
        $inject = [];
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        argDecl = fnText.match(FN_ARGS);
        forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
          arg.replace(FN_ARG, function (all, underscore, name) {
            $inject.push(name);
          });
        });
        fn.$inject = $inject;
      }
    } else if (isArray(fn)) {
      last = fn.length - 1;
      assertArgFn(fn[last], 'fn');
      $inject = fn.slice(0, last);
    } else {
      assertArgFn(fn, 'fn', true);
    }
    return $inject;
  }
  function createInjector(modulesToLoad) {
    var INSTANTIATING = {}, providerSuffix = 'Provider', path = [], loadedModules = new HashMap(), providerCache = {
        $provide: {
          provider: supportObject(provider),
          factory: supportObject(factory),
          service: supportObject(service),
          value: supportObject(value),
          constant: supportObject(constant),
          decorator: decorator
        }
      }, providerInjector = createInternalInjector(providerCache, function () {
        throw Error('Unknown provider: ' + path.join(' <- '));
      }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function (servicename) {
        var provider = providerInjector.get(servicename + providerSuffix);
        return instanceInjector.invoke(provider.$get, provider);
      });
    forEach(loadModules(modulesToLoad), function (fn) {
      instanceInjector.invoke(fn || noop);
    });
    return instanceInjector;
    function supportObject(delegate) {
      return function (key, value) {
        if (isObject(key)) {
          forEach(key, reverseParams(delegate));
        } else {
          return delegate(key, value);
        }
      };
    }
    function provider(name, provider_) {
      if (isFunction(provider_) || isArray(provider_)) {
        provider_ = providerInjector.instantiate(provider_);
      }
      if (!provider_.$get) {
        throw Error('Provider ' + name + ' must define $get factory method.');
      }
      return providerCache[name + providerSuffix] = provider_;
    }
    function factory(name, factoryFn) {
      return provider(name, { $get: factoryFn });
    }
    function service(name, constructor) {
      return factory(name, [
        '$injector',
        function ($injector) {
          return $injector.instantiate(constructor);
        }
      ]);
    }
    function value(name, value) {
      return factory(name, valueFn(value));
    }
    function constant(name, value) {
      providerCache[name] = value;
      instanceCache[name] = value;
    }
    function decorator(serviceName, decorFn) {
      var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
      origProvider.$get = function () {
        var origInstance = instanceInjector.invoke(orig$get, origProvider);
        return instanceInjector.invoke(decorFn, null, { $delegate: origInstance });
      };
    }
    function loadModules(modulesToLoad) {
      var runBlocks = [];
      forEach(modulesToLoad, function (module) {
        if (loadedModules.get(module))
          return;
        loadedModules.put(module, true);
        if (isString(module)) {
          var moduleFn = angularModule(module);
          runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
          try {
            for (var invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
              var invokeArgs = invokeQueue[i], provider = invokeArgs[0] == '$injector' ? providerInjector : providerInjector.get(invokeArgs[0]);
              provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
            }
          } catch (e) {
            if (e.message)
              e.message += ' from ' + module;
            throw e;
          }
        } else if (isFunction(module)) {
          try {
            runBlocks.push(providerInjector.invoke(module));
          } catch (e) {
            if (e.message)
              e.message += ' from ' + module;
            throw e;
          }
        } else if (isArray(module)) {
          try {
            runBlocks.push(providerInjector.invoke(module));
          } catch (e) {
            if (e.message)
              e.message += ' from ' + String(module[module.length - 1]);
            throw e;
          }
        } else {
          assertArgFn(module, 'module');
        }
      });
      return runBlocks;
    }
    function createInternalInjector(cache, factory) {
      function getService(serviceName) {
        if (typeof serviceName !== 'string') {
          throw Error('Service name expected');
        }
        if (cache.hasOwnProperty(serviceName)) {
          if (cache[serviceName] === INSTANTIATING) {
            throw Error('Circular dependency: ' + path.join(' <- '));
          }
          return cache[serviceName];
        } else {
          try {
            path.unshift(serviceName);
            cache[serviceName] = INSTANTIATING;
            return cache[serviceName] = factory(serviceName);
          } finally {
            path.shift();
          }
        }
      }
      function invoke(fn, self, locals) {
        var args = [], $inject = annotate(fn), length, i, key;
        for (i = 0, length = $inject.length; i < length; i++) {
          key = $inject[i];
          args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
        }
        if (!fn.$inject) {
          fn = fn[length];
        }
        switch (self ? -1 : args.length) {
        case 0:
          return fn();
        case 1:
          return fn(args[0]);
        case 2:
          return fn(args[0], args[1]);
        case 3:
          return fn(args[0], args[1], args[2]);
        case 4:
          return fn(args[0], args[1], args[2], args[3]);
        case 5:
          return fn(args[0], args[1], args[2], args[3], args[4]);
        case 6:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5]);
        case 7:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        case 8:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        case 9:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
        case 10:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        default:
          return fn.apply(self, args);
        }
      }
      function instantiate(Type, locals) {
        var Constructor = function () {
          }, instance, returnedValue;
        Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype;
        instance = new Constructor();
        returnedValue = invoke(Type, instance, locals);
        return isObject(returnedValue) ? returnedValue : instance;
      }
      return {
        invoke: invoke,
        instantiate: instantiate,
        get: getService,
        annotate: annotate
      };
    }
  }
  function $AnchorScrollProvider() {
    var autoScrollingEnabled = true;
    this.disableAutoScrolling = function () {
      autoScrollingEnabled = false;
    };
    this.$get = [
      '$window',
      '$location',
      '$rootScope',
      function ($window, $location, $rootScope) {
        var document = $window.document;
        function getFirstAnchor(list) {
          var result = null;
          forEach(list, function (element) {
            if (!result && lowercase(element.nodeName) === 'a')
              result = element;
          });
          return result;
        }
        function scroll() {
          var hash = $location.hash(), elm;
          if (!hash)
            $window.scrollTo(0, 0);
          else if (elm = document.getElementById(hash))
            elm.scrollIntoView();
          else if (elm = getFirstAnchor(document.getElementsByName(hash)))
            elm.scrollIntoView();
          else if (hash === 'top')
            $window.scrollTo(0, 0);
        }
        if (autoScrollingEnabled) {
          $rootScope.$watch(function autoScrollWatch() {
            return $location.hash();
          }, function autoScrollWatchAction() {
            $rootScope.$evalAsync(scroll);
          });
        }
        return scroll;
      }
    ];
  }
  function Browser(window, document, $log, $sniffer) {
    var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
    self.isMock = false;
    var outstandingRequestCount = 0;
    var outstandingRequestCallbacks = [];
    self.$$completeOutstandingRequest = completeOutstandingRequest;
    self.$$incOutstandingRequestCount = function () {
      outstandingRequestCount++;
    };
    function completeOutstandingRequest(fn) {
      try {
        fn.apply(null, sliceArgs(arguments, 1));
      } finally {
        outstandingRequestCount--;
        if (outstandingRequestCount === 0) {
          while (outstandingRequestCallbacks.length) {
            try {
              outstandingRequestCallbacks.pop()();
            } catch (e) {
              $log.error(e);
            }
          }
        }
      }
    }
    self.notifyWhenNoOutstandingRequests = function (callback) {
      forEach(pollFns, function (pollFn) {
        pollFn();
      });
      if (outstandingRequestCount === 0) {
        callback();
      } else {
        outstandingRequestCallbacks.push(callback);
      }
    };
    var pollFns = [], pollTimeout;
    self.addPollFn = function (fn) {
      if (isUndefined(pollTimeout))
        startPoller(100, setTimeout);
      pollFns.push(fn);
      return fn;
    };
    function startPoller(interval, setTimeout) {
      (function check() {
        forEach(pollFns, function (pollFn) {
          pollFn();
        });
        pollTimeout = setTimeout(check, interval);
      }());
    }
    var lastBrowserUrl = location.href, baseElement = document.find('base');
    self.url = function (url, replace) {
      if (url) {
        if (lastBrowserUrl == url)
          return;
        lastBrowserUrl = url;
        if ($sniffer.history) {
          if (replace)
            history.replaceState(null, '', url);
          else {
            history.pushState(null, '', url);
            baseElement.attr('href', baseElement.attr('href'));
          }
        } else {
          if (replace)
            location.replace(url);
          else
            location.href = url;
        }
        return self;
      } else {
        return location.href.replace(/%27/g, '\'');
      }
    };
    var urlChangeListeners = [], urlChangeInit = false;
    function fireUrlChange() {
      if (lastBrowserUrl == self.url())
        return;
      lastBrowserUrl = self.url();
      forEach(urlChangeListeners, function (listener) {
        listener(self.url());
      });
    }
    self.onUrlChange = function (callback) {
      if (!urlChangeInit) {
        if ($sniffer.history)
          jqLite(window).bind('popstate', fireUrlChange);
        if ($sniffer.hashchange)
          jqLite(window).bind('hashchange', fireUrlChange);
        else
          self.addPollFn(fireUrlChange);
        urlChangeInit = true;
      }
      urlChangeListeners.push(callback);
      return callback;
    };
    self.baseHref = function () {
      var href = baseElement.attr('href');
      return href ? href.replace(/^https?\:\/\/[^\/]*/, '') : '';
    };
    var lastCookies = {};
    var lastCookieString = '';
    var cookiePath = self.baseHref();
    self.cookies = function (name, value) {
      var cookieLength, cookieArray, cookie, i, index;
      if (name) {
        if (value === undefined) {
          rawDocument.cookie = escape(name) + '=;path=' + cookiePath + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
        } else {
          if (isString(value)) {
            cookieLength = (rawDocument.cookie = escape(name) + '=' + escape(value) + ';path=' + cookiePath).length + 1;
            if (cookieLength > 4096) {
              $log.warn('Cookie \'' + name + '\' possibly not set or overflowed because it was too large (' + cookieLength + ' > 4096 bytes)!');
            }
          }
        }
      } else {
        if (rawDocument.cookie !== lastCookieString) {
          lastCookieString = rawDocument.cookie;
          cookieArray = lastCookieString.split('; ');
          lastCookies = {};
          for (i = 0; i < cookieArray.length; i++) {
            cookie = cookieArray[i];
            index = cookie.indexOf('=');
            if (index > 0) {
              lastCookies[unescape(cookie.substring(0, index))] = unescape(cookie.substring(index + 1));
            }
          }
        }
        return lastCookies;
      }
    };
    self.defer = function (fn, delay) {
      var timeoutId;
      outstandingRequestCount++;
      timeoutId = setTimeout(function () {
        delete pendingDeferIds[timeoutId];
        completeOutstandingRequest(fn);
      }, delay || 0);
      pendingDeferIds[timeoutId] = true;
      return timeoutId;
    };
    self.defer.cancel = function (deferId) {
      if (pendingDeferIds[deferId]) {
        delete pendingDeferIds[deferId];
        clearTimeout(deferId);
        completeOutstandingRequest(noop);
        return true;
      }
      return false;
    };
  }
  function $BrowserProvider() {
    this.$get = [
      '$window',
      '$log',
      '$sniffer',
      '$document',
      function ($window, $log, $sniffer, $document) {
        return new Browser($window, $document, $log, $sniffer);
      }
    ];
  }
  function $CacheFactoryProvider() {
    this.$get = function () {
      var caches = {};
      function cacheFactory(cacheId, options) {
        if (cacheId in caches) {
          throw Error('cacheId ' + cacheId + ' taken');
        }
        var size = 0, stats = extend({}, options, { id: cacheId }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
        return caches[cacheId] = {
          put: function (key, value) {
            var lruEntry = lruHash[key] || (lruHash[key] = { key: key });
            refresh(lruEntry);
            if (isUndefined(value))
              return;
            if (!(key in data))
              size++;
            data[key] = value;
            if (size > capacity) {
              this.remove(staleEnd.key);
            }
          },
          get: function (key) {
            var lruEntry = lruHash[key];
            if (!lruEntry)
              return;
            refresh(lruEntry);
            return data[key];
          },
          remove: function (key) {
            var lruEntry = lruHash[key];
            if (!lruEntry)
              return;
            if (lruEntry == freshEnd)
              freshEnd = lruEntry.p;
            if (lruEntry == staleEnd)
              staleEnd = lruEntry.n;
            link(lruEntry.n, lruEntry.p);
            delete lruHash[key];
            delete data[key];
            size--;
          },
          removeAll: function () {
            data = {};
            size = 0;
            lruHash = {};
            freshEnd = staleEnd = null;
          },
          destroy: function () {
            data = null;
            stats = null;
            lruHash = null;
            delete caches[cacheId];
          },
          info: function () {
            return extend({}, stats, { size: size });
          }
        };
        function refresh(entry) {
          if (entry != freshEnd) {
            if (!staleEnd) {
              staleEnd = entry;
            } else if (staleEnd == entry) {
              staleEnd = entry.n;
            }
            link(entry.n, entry.p);
            link(entry, freshEnd);
            freshEnd = entry;
            freshEnd.n = null;
          }
        }
        function link(nextEntry, prevEntry) {
          if (nextEntry != prevEntry) {
            if (nextEntry)
              nextEntry.p = prevEntry;
            if (prevEntry)
              prevEntry.n = nextEntry;
          }
        }
      }
      cacheFactory.info = function () {
        var info = {};
        forEach(caches, function (cache, cacheId) {
          info[cacheId] = cache.info();
        });
        return info;
      };
      cacheFactory.get = function (cacheId) {
        return caches[cacheId];
      };
      return cacheFactory;
    };
  }
  function $TemplateCacheProvider() {
    this.$get = [
      '$cacheFactory',
      function ($cacheFactory) {
        return $cacheFactory('templates');
      }
    ];
  }
  var NON_ASSIGNABLE_MODEL_EXPRESSION = 'Non-assignable model expression: ';
  $CompileProvider.$inject = ['$provide'];
  function $CompileProvider($provide) {
    var hasDirectives = {}, Suffix = 'Directive', COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, MULTI_ROOT_TEMPLATE_ERROR = 'Template must have exactly one root element. was: ', urlSanitizationWhitelist = /^\s*(https?|ftp|mailto):/;
    this.directive = function registerDirective(name, directiveFactory) {
      if (isString(name)) {
        assertArg(directiveFactory, 'directive');
        if (!hasDirectives.hasOwnProperty(name)) {
          hasDirectives[name] = [];
          $provide.factory(name + Suffix, [
            '$injector',
            '$exceptionHandler',
            function ($injector, $exceptionHandler) {
              var directives = [];
              forEach(hasDirectives[name], function (directiveFactory) {
                try {
                  var directive = $injector.invoke(directiveFactory);
                  if (isFunction(directive)) {
                    directive = { compile: valueFn(directive) };
                  } else if (!directive.compile && directive.link) {
                    directive.compile = valueFn(directive.link);
                  }
                  directive.priority = directive.priority || 0;
                  directive.name = directive.name || name;
                  directive.require = directive.require || directive.controller && directive.name;
                  directive.restrict = directive.restrict || 'A';
                  directives.push(directive);
                } catch (e) {
                  $exceptionHandler(e);
                }
              });
              return directives;
            }
          ]);
        }
        hasDirectives[name].push(directiveFactory);
      } else {
        forEach(name, reverseParams(registerDirective));
      }
      return this;
    };
    this.urlSanitizationWhitelist = function (regexp) {
      if (isDefined(regexp)) {
        urlSanitizationWhitelist = regexp;
        return this;
      }
      return urlSanitizationWhitelist;
    };
    this.$get = [
      '$injector',
      '$interpolate',
      '$exceptionHandler',
      '$http',
      '$templateCache',
      '$parse',
      '$controller',
      '$rootScope',
      '$document',
      function ($injector, $interpolate, $exceptionHandler, $http, $templateCache, $parse, $controller, $rootScope, $document) {
        var Attributes = function (element, attr) {
          this.$$element = element;
          this.$attr = attr || {};
        };
        Attributes.prototype = {
          $normalize: directiveNormalize,
          $set: function (key, value, writeAttr, attrName) {
            var booleanKey = getBooleanAttrName(this.$$element[0], key), $$observers = this.$$observers, normalizedVal;
            if (booleanKey) {
              this.$$element.prop(key, value);
              attrName = booleanKey;
            }
            this[key] = value;
            if (attrName) {
              this.$attr[key] = attrName;
            } else {
              attrName = this.$attr[key];
              if (!attrName) {
                this.$attr[key] = attrName = snake_case(key, '-');
              }
            }
            if (nodeName_(this.$$element[0]) === 'A' && key === 'href') {
              urlSanitizationNode.setAttribute('href', value);
              normalizedVal = urlSanitizationNode.href;
              if (!normalizedVal.match(urlSanitizationWhitelist)) {
                this[key] = value = 'unsafe:' + normalizedVal;
              }
            }
            if (writeAttr !== false) {
              if (value === null || value === undefined) {
                this.$$element.removeAttr(attrName);
              } else {
                this.$$element.attr(attrName, value);
              }
            }
            $$observers && forEach($$observers[key], function (fn) {
              try {
                fn(value);
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          },
          $observe: function (key, fn) {
            var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = {}), listeners = $$observers[key] || ($$observers[key] = []);
            listeners.push(fn);
            $rootScope.$evalAsync(function () {
              if (!listeners.$$inter) {
                fn(attrs[key]);
              }
            });
            return fn;
          }
        };
        var urlSanitizationNode = $document[0].createElement('a'), startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = startSymbol == '{{' || endSymbol == '}}' ? identity : function denormalizeTemplate(template) {
            return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
          };
        return compile;
        function compile($compileNodes, transcludeFn, maxPriority) {
          if (!($compileNodes instanceof jqLite)) {
            $compileNodes = jqLite($compileNodes);
          }
          forEach($compileNodes, function (node, index) {
            if (node.nodeType == 3 && node.nodeValue.match(/\S+/)) {
              $compileNodes[index] = jqLite(node).wrap('<span></span>').parent()[0];
            }
          });
          var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority);
          return function publicLinkFn(scope, cloneConnectFn) {
            assertArg(scope, 'scope');
            var $linkNode = cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes;
            for (var i = 0, ii = $linkNode.length; i < ii; i++) {
              var node = $linkNode[i];
              if (node.nodeType == 1 || node.nodeType == 9) {
                $linkNode.eq(i).data('$scope', scope);
              }
            }
            safeAddClass($linkNode, 'ng-scope');
            if (cloneConnectFn)
              cloneConnectFn($linkNode, scope);
            if (compositeLinkFn)
              compositeLinkFn(scope, $linkNode, $linkNode);
            return $linkNode;
          };
        }
        function wrongMode(localName, mode) {
          throw Error('Unsupported \'' + mode + '\' for \'' + localName + '\'.');
        }
        function safeAddClass($element, className) {
          try {
            $element.addClass(className);
          } catch (e) {
          }
        }
        function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority) {
          var linkFns = [], nodeLinkFn, childLinkFn, directives, attrs, linkFnFound;
          for (var i = 0; i < nodeList.length; i++) {
            attrs = new Attributes();
            directives = collectDirectives(nodeList[i], [], attrs, maxPriority);
            nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement) : null;
            childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !nodeList[i].childNodes.length ? null : compileNodes(nodeList[i].childNodes, nodeLinkFn ? nodeLinkFn.transclude : transcludeFn);
            linkFns.push(nodeLinkFn);
            linkFns.push(childLinkFn);
            linkFnFound = linkFnFound || nodeLinkFn || childLinkFn;
          }
          return linkFnFound ? compositeLinkFn : null;
          function compositeLinkFn(scope, nodeList, $rootElement, boundTranscludeFn) {
            var nodeLinkFn, childLinkFn, node, childScope, childTranscludeFn, i, ii, n;
            var stableNodeList = [];
            for (i = 0, ii = nodeList.length; i < ii; i++) {
              stableNodeList.push(nodeList[i]);
            }
            for (i = 0, n = 0, ii = linkFns.length; i < ii; n++) {
              node = stableNodeList[n];
              nodeLinkFn = linkFns[i++];
              childLinkFn = linkFns[i++];
              if (nodeLinkFn) {
                if (nodeLinkFn.scope) {
                  childScope = scope.$new(isObject(nodeLinkFn.scope));
                  jqLite(node).data('$scope', childScope);
                } else {
                  childScope = scope;
                }
                childTranscludeFn = nodeLinkFn.transclude;
                if (childTranscludeFn || !boundTranscludeFn && transcludeFn) {
                  nodeLinkFn(childLinkFn, childScope, node, $rootElement, function (transcludeFn) {
                    return function (cloneFn) {
                      var transcludeScope = scope.$new();
                      transcludeScope.$$transcluded = true;
                      return transcludeFn(transcludeScope, cloneFn).bind('$destroy', bind(transcludeScope, transcludeScope.$destroy));
                    };
                  }(childTranscludeFn || transcludeFn));
                } else {
                  nodeLinkFn(childLinkFn, childScope, node, undefined, boundTranscludeFn);
                }
              } else if (childLinkFn) {
                childLinkFn(scope, node.childNodes, undefined, boundTranscludeFn);
              }
            }
          }
        }
        function collectDirectives(node, directives, attrs, maxPriority) {
          var nodeType = node.nodeType, attrsMap = attrs.$attr, match, className;
          switch (nodeType) {
          case 1:
            addDirective(directives, directiveNormalize(nodeName_(node).toLowerCase()), 'E', maxPriority);
            for (var attr, name, nName, value, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
              attr = nAttrs[j];
              if (attr.specified) {
                name = attr.name;
                nName = directiveNormalize(name.toLowerCase());
                attrsMap[nName] = name;
                attrs[nName] = value = trim(msie && name == 'href' ? decodeURIComponent(node.getAttribute(name, 2)) : attr.value);
                if (getBooleanAttrName(node, nName)) {
                  attrs[nName] = true;
                }
                addAttrInterpolateDirective(node, directives, value, nName);
                addDirective(directives, nName, 'A', maxPriority);
              }
            }
            className = node.className;
            if (isString(className) && className !== '') {
              while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                nName = directiveNormalize(match[2]);
                if (addDirective(directives, nName, 'C', maxPriority)) {
                  attrs[nName] = trim(match[3]);
                }
                className = className.substr(match.index + match[0].length);
              }
            }
            break;
          case 3:
            addTextInterpolateDirective(directives, node.nodeValue);
            break;
          case 8:
            try {
              match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
              if (match) {
                nName = directiveNormalize(match[1]);
                if (addDirective(directives, nName, 'M', maxPriority)) {
                  attrs[nName] = trim(match[2]);
                }
              }
            } catch (e) {
            }
            break;
          }
          directives.sort(byPriority);
          return directives;
        }
        function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, $rootElement) {
          var terminalPriority = -Number.MAX_VALUE, preLinkFns = [], postLinkFns = [], newScopeDirective = null, newIsolateScopeDirective = null, templateDirective = null, $compileNode = templateAttrs.$$element = jqLite(compileNode), directive, directiveName, $template, transcludeDirective, childTranscludeFn = transcludeFn, controllerDirectives, linkFn, directiveValue;
          for (var i = 0, ii = directives.length; i < ii; i++) {
            directive = directives[i];
            $template = undefined;
            if (terminalPriority > directive.priority) {
              break;
            }
            if (directiveValue = directive.scope) {
              assertNoDuplicate('isolated scope', newIsolateScopeDirective, directive, $compileNode);
              if (isObject(directiveValue)) {
                safeAddClass($compileNode, 'ng-isolate-scope');
                newIsolateScopeDirective = directive;
              }
              safeAddClass($compileNode, 'ng-scope');
              newScopeDirective = newScopeDirective || directive;
            }
            directiveName = directive.name;
            if (directiveValue = directive.controller) {
              controllerDirectives = controllerDirectives || {};
              assertNoDuplicate('\'' + directiveName + '\' controller', controllerDirectives[directiveName], directive, $compileNode);
              controllerDirectives[directiveName] = directive;
            }
            if (directiveValue = directive.transclude) {
              assertNoDuplicate('transclusion', transcludeDirective, directive, $compileNode);
              transcludeDirective = directive;
              terminalPriority = directive.priority;
              if (directiveValue == 'element') {
                $template = jqLite(compileNode);
                $compileNode = templateAttrs.$$element = jqLite(document.createComment(' ' + directiveName + ': ' + templateAttrs[directiveName] + ' '));
                compileNode = $compileNode[0];
                replaceWith($rootElement, jqLite($template[0]), compileNode);
                childTranscludeFn = compile($template, transcludeFn, terminalPriority);
              } else {
                $template = jqLite(JQLiteClone(compileNode)).contents();
                $compileNode.html('');
                childTranscludeFn = compile($template, transcludeFn);
              }
            }
            if (directiveValue = directive.template) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              directiveValue = denormalizeTemplate(directiveValue);
              if (directive.replace) {
                $template = jqLite('<div>' + trim(directiveValue) + '</div>').contents();
                compileNode = $template[0];
                if ($template.length != 1 || compileNode.nodeType !== 1) {
                  throw new Error(MULTI_ROOT_TEMPLATE_ERROR + directiveValue);
                }
                replaceWith($rootElement, $compileNode, compileNode);
                var newTemplateAttrs = { $attr: {} };
                directives = directives.concat(collectDirectives(compileNode, directives.splice(i + 1, directives.length - (i + 1)), newTemplateAttrs));
                mergeTemplateAttributes(templateAttrs, newTemplateAttrs);
                ii = directives.length;
              } else {
                $compileNode.html(directiveValue);
              }
            }
            if (directive.templateUrl) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), nodeLinkFn, $compileNode, templateAttrs, $rootElement, directive.replace, childTranscludeFn);
              ii = directives.length;
            } else if (directive.compile) {
              try {
                linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                if (isFunction(linkFn)) {
                  addLinkFns(null, linkFn);
                } else if (linkFn) {
                  addLinkFns(linkFn.pre, linkFn.post);
                }
              } catch (e) {
                $exceptionHandler(e, startingTag($compileNode));
              }
            }
            if (directive.terminal) {
              nodeLinkFn.terminal = true;
              terminalPriority = Math.max(terminalPriority, directive.priority);
            }
          }
          nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope;
          nodeLinkFn.transclude = transcludeDirective && childTranscludeFn;
          return nodeLinkFn;
          function addLinkFns(pre, post) {
            if (pre) {
              pre.require = directive.require;
              preLinkFns.push(pre);
            }
            if (post) {
              post.require = directive.require;
              postLinkFns.push(post);
            }
          }
          function getControllers(require, $element) {
            var value, retrievalMethod = 'data', optional = false;
            if (isString(require)) {
              while ((value = require.charAt(0)) == '^' || value == '?') {
                require = require.substr(1);
                if (value == '^') {
                  retrievalMethod = 'inheritedData';
                }
                optional = optional || value == '?';
              }
              value = $element[retrievalMethod]('$' + require + 'Controller');
              if (!value && !optional) {
                throw Error('No controller: ' + require);
              }
              return value;
            } else if (isArray(require)) {
              value = [];
              forEach(require, function (require) {
                value.push(getControllers(require, $element));
              });
            }
            return value;
          }
          function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
            var attrs, $element, i, ii, linkFn, controller;
            if (compileNode === linkNode) {
              attrs = templateAttrs;
            } else {
              attrs = shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr));
            }
            $element = attrs.$$element;
            if (newIsolateScopeDirective) {
              var LOCAL_REGEXP = /^\s*([@=&])\s*(\w*)\s*$/;
              var parentScope = scope.$parent || scope;
              forEach(newIsolateScopeDirective.scope, function (definiton, scopeName) {
                var match = definiton.match(LOCAL_REGEXP) || [], attrName = match[2] || scopeName, mode = match[1], lastValue, parentGet, parentSet;
                scope.$$isolateBindings[scopeName] = mode + attrName;
                switch (mode) {
                case '@': {
                    attrs.$observe(attrName, function (value) {
                      scope[scopeName] = value;
                    });
                    attrs.$$observers[attrName].$$scope = parentScope;
                    break;
                  }
                case '=': {
                    parentGet = $parse(attrs[attrName]);
                    parentSet = parentGet.assign || function () {
                      lastValue = scope[scopeName] = parentGet(parentScope);
                      throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + attrs[attrName] + ' (directive: ' + newIsolateScopeDirective.name + ')');
                    };
                    lastValue = scope[scopeName] = parentGet(parentScope);
                    scope.$watch(function parentValueWatch() {
                      var parentValue = parentGet(parentScope);
                      if (parentValue !== scope[scopeName]) {
                        if (parentValue !== lastValue) {
                          lastValue = scope[scopeName] = parentValue;
                        } else {
                          parentSet(parentScope, parentValue = lastValue = scope[scopeName]);
                        }
                      }
                      return parentValue;
                    });
                    break;
                  }
                case '&': {
                    parentGet = $parse(attrs[attrName]);
                    scope[scopeName] = function (locals) {
                      return parentGet(parentScope, locals);
                    };
                    break;
                  }
                default: {
                    throw Error('Invalid isolate scope definition for directive ' + newIsolateScopeDirective.name + ': ' + definiton);
                  }
                }
              });
            }
            if (controllerDirectives) {
              forEach(controllerDirectives, function (directive) {
                var locals = {
                    $scope: scope,
                    $element: $element,
                    $attrs: attrs,
                    $transclude: boundTranscludeFn
                  };
                controller = directive.controller;
                if (controller == '@') {
                  controller = attrs[directive.name];
                }
                $element.data('$' + directive.name + 'Controller', $controller(controller, locals));
              });
            }
            for (i = 0, ii = preLinkFns.length; i < ii; i++) {
              try {
                linkFn = preLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
            childLinkFn && childLinkFn(scope, linkNode.childNodes, undefined, boundTranscludeFn);
            for (i = 0, ii = postLinkFns.length; i < ii; i++) {
              try {
                linkFn = postLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
          }
        }
        function addDirective(tDirectives, name, location, maxPriority) {
          var match = false;
          if (hasDirectives.hasOwnProperty(name)) {
            for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
              try {
                directive = directives[i];
                if ((maxPriority === undefined || maxPriority > directive.priority) && directive.restrict.indexOf(location) != -1) {
                  tDirectives.push(directive);
                  match = true;
                }
              } catch (e) {
                $exceptionHandler(e);
              }
            }
          }
          return match;
        }
        function mergeTemplateAttributes(dst, src) {
          var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
          forEach(dst, function (value, key) {
            if (key.charAt(0) != '$') {
              if (src[key]) {
                value += (key === 'style' ? ';' : ' ') + src[key];
              }
              dst.$set(key, value, true, srcAttr[key]);
            }
          });
          forEach(src, function (value, key) {
            if (key == 'class') {
              safeAddClass($element, value);
              dst['class'] = (dst['class'] ? dst['class'] + ' ' : '') + value;
            } else if (key == 'style') {
              $element.attr('style', $element.attr('style') + ';' + value);
            } else if (key.charAt(0) != '$' && !dst.hasOwnProperty(key)) {
              dst[key] = value;
              dstAttr[key] = srcAttr[key];
            }
          });
        }
        function compileTemplateUrl(directives, beforeTemplateNodeLinkFn, $compileNode, tAttrs, $rootElement, replace, childTranscludeFn) {
          var linkQueue = [], afterTemplateNodeLinkFn, afterTemplateChildLinkFn, beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = extend({}, origAsyncDirective, {
              controller: null,
              templateUrl: null,
              transclude: null,
              scope: null
            });
          $compileNode.html('');
          $http.get(origAsyncDirective.templateUrl, { cache: $templateCache }).success(function (content) {
            var compileNode, tempTemplateAttrs, $template;
            content = denormalizeTemplate(content);
            if (replace) {
              $template = jqLite('<div>' + trim(content) + '</div>').contents();
              compileNode = $template[0];
              if ($template.length != 1 || compileNode.nodeType !== 1) {
                throw new Error(MULTI_ROOT_TEMPLATE_ERROR + content);
              }
              tempTemplateAttrs = { $attr: {} };
              replaceWith($rootElement, $compileNode, compileNode);
              collectDirectives(compileNode, directives, tempTemplateAttrs);
              mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
            } else {
              compileNode = beforeTemplateCompileNode;
              $compileNode.html(content);
            }
            directives.unshift(derivedSyncDirective);
            afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn);
            afterTemplateChildLinkFn = compileNodes($compileNode.contents(), childTranscludeFn);
            while (linkQueue.length) {
              var controller = linkQueue.pop(), linkRootElement = linkQueue.pop(), beforeTemplateLinkNode = linkQueue.pop(), scope = linkQueue.pop(), linkNode = compileNode;
              if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                linkNode = JQLiteClone(compileNode);
                replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);
              }
              afterTemplateNodeLinkFn(function () {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, controller);
              }, scope, linkNode, $rootElement, controller);
            }
            linkQueue = null;
          }).error(function (response, code, headers, config) {
            throw Error('Failed to load template: ' + config.url);
          });
          return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, controller) {
            if (linkQueue) {
              linkQueue.push(scope);
              linkQueue.push(node);
              linkQueue.push(rootElement);
              linkQueue.push(controller);
            } else {
              afterTemplateNodeLinkFn(function () {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, controller);
              }, scope, node, rootElement, controller);
            }
          };
        }
        function byPriority(a, b) {
          return b.priority - a.priority;
        }
        function assertNoDuplicate(what, previousDirective, directive, element) {
          if (previousDirective) {
            throw Error('Multiple directives [' + previousDirective.name + ', ' + directive.name + '] asking for ' + what + ' on: ' + startingTag(element));
          }
        }
        function addTextInterpolateDirective(directives, text) {
          var interpolateFn = $interpolate(text, true);
          if (interpolateFn) {
            directives.push({
              priority: 0,
              compile: valueFn(function textInterpolateLinkFn(scope, node) {
                var parent = node.parent(), bindings = parent.data('$binding') || [];
                bindings.push(interpolateFn);
                safeAddClass(parent.data('$binding', bindings), 'ng-binding');
                scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                  node[0].nodeValue = value;
                });
              })
            });
          }
        }
        function addAttrInterpolateDirective(node, directives, value, name) {
          var interpolateFn = $interpolate(value, true);
          if (!interpolateFn)
            return;
          directives.push({
            priority: 100,
            compile: valueFn(function attrInterpolateLinkFn(scope, element, attr) {
              var $$observers = attr.$$observers || (attr.$$observers = {});
              if (name === 'class') {
                interpolateFn = $interpolate(attr[name], true);
              }
              attr[name] = undefined;
              ($$observers[name] || ($$observers[name] = [])).$$inter = true;
              (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function interpolateFnWatchAction(value) {
                attr.$set(name, value);
              });
            })
          });
        }
        function replaceWith($rootElement, $element, newNode) {
          var oldNode = $element[0], parent = oldNode.parentNode, i, ii;
          if ($rootElement) {
            for (i = 0, ii = $rootElement.length; i < ii; i++) {
              if ($rootElement[i] == oldNode) {
                $rootElement[i] = newNode;
                break;
              }
            }
          }
          if (parent) {
            parent.replaceChild(newNode, oldNode);
          }
          newNode[jqLite.expando] = oldNode[jqLite.expando];
          $element[0] = newNode;
        }
      }
    ];
  }
  var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
  function directiveNormalize(name) {
    return camelCase(name.replace(PREFIX_REGEXP, ''));
  }
  function nodesetLinkingFn(scope, nodeList, rootElement, boundTranscludeFn) {
  }
  function directiveLinkingFn(nodesetLinkingFn, scope, node, rootElement, boundTranscludeFn) {
  }
  function $ControllerProvider() {
    var controllers = {};
    this.register = function (name, constructor) {
      if (isObject(name)) {
        extend(controllers, name);
      } else {
        controllers[name] = constructor;
      }
    };
    this.$get = [
      '$injector',
      '$window',
      function ($injector, $window) {
        return function (constructor, locals) {
          if (isString(constructor)) {
            var name = constructor;
            constructor = controllers.hasOwnProperty(name) ? controllers[name] : getter(locals.$scope, name, true) || getter($window, name, true);
            assertArgFn(constructor, name, true);
          }
          return $injector.instantiate(constructor, locals);
        };
      }
    ];
  }
  function $DocumentProvider() {
    this.$get = [
      '$window',
      function (window) {
        return jqLite(window.document);
      }
    ];
  }
  function $ExceptionHandlerProvider() {
    this.$get = [
      '$log',
      function ($log) {
        return function (exception, cause) {
          $log.error.apply($log, arguments);
        };
      }
    ];
  }
  function $InterpolateProvider() {
    var startSymbol = '{{';
    var endSymbol = '}}';
    this.startSymbol = function (value) {
      if (value) {
        startSymbol = value;
        return this;
      } else {
        return startSymbol;
      }
    };
    this.endSymbol = function (value) {
      if (value) {
        endSymbol = value;
        return this;
      } else {
        return endSymbol;
      }
    };
    this.$get = [
      '$parse',
      function ($parse) {
        var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length;
        function $interpolate(text, mustHaveExpression) {
          var startIndex, endIndex, index = 0, parts = [], length = text.length, hasInterpolation = false, fn, exp, concat = [];
          while (index < length) {
            if ((startIndex = text.indexOf(startSymbol, index)) != -1 && (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1) {
              index != startIndex && parts.push(text.substring(index, startIndex));
              parts.push(fn = $parse(exp = text.substring(startIndex + startSymbolLength, endIndex)));
              fn.exp = exp;
              index = endIndex + endSymbolLength;
              hasInterpolation = true;
            } else {
              index != length && parts.push(text.substring(index));
              index = length;
            }
          }
          if (!(length = parts.length)) {
            parts.push('');
            length = 1;
          }
          if (!mustHaveExpression || hasInterpolation) {
            concat.length = length;
            fn = function (context) {
              for (var i = 0, ii = length, part; i < ii; i++) {
                if (typeof (part = parts[i]) == 'function') {
                  part = part(context);
                  if (part == null || part == undefined) {
                    part = '';
                  } else if (typeof part != 'string') {
                    part = toJson(part);
                  }
                }
                concat[i] = part;
              }
              return concat.join('');
            };
            fn.exp = text;
            fn.parts = parts;
            return fn;
          }
        }
        $interpolate.startSymbol = function () {
          return startSymbol;
        };
        $interpolate.endSymbol = function () {
          return endSymbol;
        };
        return $interpolate;
      }
    ];
  }
  var URL_MATCH = /^([^:]+):\/\/(\w+:{0,1}\w*@)?([\w\.-]*)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/, PATH_MATCH = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/, HASH_MATCH = PATH_MATCH, DEFAULT_PORTS = {
      'http': 80,
      'https': 443,
      'ftp': 21
    };
  function encodePath(path) {
    var segments = path.split('/'), i = segments.length;
    while (i--) {
      segments[i] = encodeUriSegment(segments[i]);
    }
    return segments.join('/');
  }
  function stripHash(url) {
    return url.split('#')[0];
  }
  function matchUrl(url, obj) {
    var match = URL_MATCH.exec(url);
    match = {
      protocol: match[1],
      host: match[3],
      port: int(match[5]) || DEFAULT_PORTS[match[1]] || null,
      path: match[6] || '/',
      search: match[8],
      hash: match[10]
    };
    if (obj) {
      obj.$$protocol = match.protocol;
      obj.$$host = match.host;
      obj.$$port = match.port;
    }
    return match;
  }
  function composeProtocolHostPort(protocol, host, port) {
    return protocol + '://' + host + (port == DEFAULT_PORTS[protocol] ? '' : ':' + port);
  }
  function pathPrefixFromBase(basePath) {
    return basePath.substr(0, basePath.lastIndexOf('/'));
  }
  function convertToHtml5Url(url, basePath, hashPrefix) {
    var match = matchUrl(url);
    if (decodeURIComponent(match.path) != basePath || isUndefined(match.hash) || match.hash.indexOf(hashPrefix) !== 0) {
      return url;
    } else {
      return composeProtocolHostPort(match.protocol, match.host, match.port) + pathPrefixFromBase(basePath) + match.hash.substr(hashPrefix.length);
    }
  }
  function convertToHashbangUrl(url, basePath, hashPrefix) {
    var match = matchUrl(url);
    if (decodeURIComponent(match.path) == basePath) {
      return url;
    } else {
      var search = match.search && '?' + match.search || '', hash = match.hash && '#' + match.hash || '', pathPrefix = pathPrefixFromBase(basePath), path = match.path.substr(pathPrefix.length);
      if (match.path.indexOf(pathPrefix) !== 0) {
        throw Error('Invalid url "' + url + '", missing path prefix "' + pathPrefix + '" !');
      }
      return composeProtocolHostPort(match.protocol, match.host, match.port) + basePath + '#' + hashPrefix + path + search + hash;
    }
  }
  function LocationUrl(url, pathPrefix, appBaseUrl) {
    pathPrefix = pathPrefix || '';
    this.$$parse = function (newAbsoluteUrl) {
      var match = matchUrl(newAbsoluteUrl, this);
      if (match.path.indexOf(pathPrefix) !== 0) {
        throw Error('Invalid url "' + newAbsoluteUrl + '", missing path prefix "' + pathPrefix + '" !');
      }
      this.$$path = decodeURIComponent(match.path.substr(pathPrefix.length));
      this.$$search = parseKeyValue(match.search);
      this.$$hash = match.hash && decodeURIComponent(match.hash) || '';
      this.$$compose();
    };
    this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
      this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + pathPrefix + this.$$url;
    };
    this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
        return absoluteLinkUrl;
      }
    };
    this.$$parse(url);
  }
  function LocationHashbangUrl(url, hashPrefix, appBaseUrl) {
    var basePath;
    this.$$parse = function (url) {
      var match = matchUrl(url, this);
      if (match.hash && match.hash.indexOf(hashPrefix) !== 0) {
        throw Error('Invalid url "' + url + '", missing hash prefix "' + hashPrefix + '" !');
      }
      basePath = match.path + (match.search ? '?' + match.search : '');
      match = HASH_MATCH.exec((match.hash || '').substr(hashPrefix.length));
      if (match[1]) {
        this.$$path = (match[1].charAt(0) == '/' ? '' : '/') + decodeURIComponent(match[1]);
      } else {
        this.$$path = '';
      }
      this.$$search = parseKeyValue(match[3]);
      this.$$hash = match[5] && decodeURIComponent(match[5]) || '';
      this.$$compose();
    };
    this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
      this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + basePath + (this.$$url ? '#' + hashPrefix + this.$$url : '');
    };
    this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
        return absoluteLinkUrl;
      }
    };
    this.$$parse(url);
  }
  LocationUrl.prototype = {
    $$replace: false,
    absUrl: locationGetter('$$absUrl'),
    url: function (url, replace) {
      if (isUndefined(url))
        return this.$$url;
      var match = PATH_MATCH.exec(url);
      if (match[1])
        this.path(decodeURIComponent(match[1]));
      if (match[2] || match[1])
        this.search(match[3] || '');
      this.hash(match[5] || '', replace);
      return this;
    },
    protocol: locationGetter('$$protocol'),
    host: locationGetter('$$host'),
    port: locationGetter('$$port'),
    path: locationGetterSetter('$$path', function (path) {
      return path.charAt(0) == '/' ? path : '/' + path;
    }),
    search: function (search, paramValue) {
      if (isUndefined(search))
        return this.$$search;
      if (isDefined(paramValue)) {
        if (paramValue === null) {
          delete this.$$search[search];
        } else {
          this.$$search[search] = paramValue;
        }
      } else {
        this.$$search = isString(search) ? parseKeyValue(search) : search;
      }
      this.$$compose();
      return this;
    },
    hash: locationGetterSetter('$$hash', identity),
    replace: function () {
      this.$$replace = true;
      return this;
    }
  };
  LocationHashbangUrl.prototype = inherit(LocationUrl.prototype);
  function LocationHashbangInHtml5Url(url, hashPrefix, appBaseUrl, baseExtra) {
    LocationHashbangUrl.apply(this, arguments);
    this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
        return appBaseUrl + baseExtra + '#' + hashPrefix + absoluteLinkUrl.substr(appBaseUrl.length);
      }
    };
  }
  LocationHashbangInHtml5Url.prototype = inherit(LocationHashbangUrl.prototype);
  function locationGetter(property) {
    return function () {
      return this[property];
    };
  }
  function locationGetterSetter(property, preprocess) {
    return function (value) {
      if (isUndefined(value))
        return this[property];
      this[property] = preprocess(value);
      this.$$compose();
      return this;
    };
  }
  function $LocationProvider() {
    var hashPrefix = '', html5Mode = false;
    this.hashPrefix = function (prefix) {
      if (isDefined(prefix)) {
        hashPrefix = prefix;
        return this;
      } else {
        return hashPrefix;
      }
    };
    this.html5Mode = function (mode) {
      if (isDefined(mode)) {
        html5Mode = mode;
        return this;
      } else {
        return html5Mode;
      }
    };
    this.$get = [
      '$rootScope',
      '$browser',
      '$sniffer',
      '$rootElement',
      function ($rootScope, $browser, $sniffer, $rootElement) {
        var $location, basePath, pathPrefix, initUrl = $browser.url(), initUrlParts = matchUrl(initUrl), appBaseUrl;
        if (html5Mode) {
          basePath = $browser.baseHref() || '/';
          pathPrefix = pathPrefixFromBase(basePath);
          appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + pathPrefix + '/';
          if ($sniffer.history) {
            $location = new LocationUrl(convertToHtml5Url(initUrl, basePath, hashPrefix), pathPrefix, appBaseUrl);
          } else {
            $location = new LocationHashbangInHtml5Url(convertToHashbangUrl(initUrl, basePath, hashPrefix), hashPrefix, appBaseUrl, basePath.substr(pathPrefix.length + 1));
          }
        } else {
          appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + (initUrlParts.path || '') + (initUrlParts.search ? '?' + initUrlParts.search : '') + '#' + hashPrefix + '/';
          $location = new LocationHashbangUrl(initUrl, hashPrefix, appBaseUrl);
        }
        $rootElement.bind('click', function (event) {
          if (event.ctrlKey || event.metaKey || event.which == 2)
            return;
          var elm = jqLite(event.target);
          while (lowercase(elm[0].nodeName) !== 'a') {
            if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0])
              return;
          }
          var absHref = elm.prop('href'), rewrittenUrl = $location.$$rewriteAppUrl(absHref);
          if (absHref && !elm.attr('target') && rewrittenUrl) {
            $location.$$parse(rewrittenUrl);
            $rootScope.$apply();
            event.preventDefault();
            window.angular['ff-684208-preventDefault'] = true;
          }
        });
        if ($location.absUrl() != initUrl) {
          $browser.url($location.absUrl(), true);
        }
        $browser.onUrlChange(function (newUrl) {
          if ($location.absUrl() != newUrl) {
            $rootScope.$evalAsync(function () {
              var oldUrl = $location.absUrl();
              $location.$$parse(newUrl);
              afterLocationChange(oldUrl);
            });
            if (!$rootScope.$$phase)
              $rootScope.$digest();
          }
        });
        var changeCounter = 0;
        $rootScope.$watch(function $locationWatch() {
          var oldUrl = $browser.url();
          var currentReplace = $location.$$replace;
          if (!changeCounter || oldUrl != $location.absUrl()) {
            changeCounter++;
            $rootScope.$evalAsync(function () {
              if ($rootScope.$broadcast('$locationChangeStart', $location.absUrl(), oldUrl).defaultPrevented) {
                $location.$$parse(oldUrl);
              } else {
                $browser.url($location.absUrl(), currentReplace);
                afterLocationChange(oldUrl);
              }
            });
          }
          $location.$$replace = false;
          return changeCounter;
        });
        return $location;
        function afterLocationChange(oldUrl) {
          $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl);
        }
      }
    ];
  }
  function $LogProvider() {
    this.$get = [
      '$window',
      function ($window) {
        return {
          log: consoleLog('log'),
          warn: consoleLog('warn'),
          info: consoleLog('info'),
          error: consoleLog('error')
        };
        function formatError(arg) {
          if (arg instanceof Error) {
            if (arg.stack) {
              arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack;
            } else if (arg.sourceURL) {
              arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
            }
          }
          return arg;
        }
        function consoleLog(type) {
          var console = $window.console || {}, logFn = console[type] || console.log || noop;
          if (logFn.apply) {
            return function () {
              var args = [];
              forEach(arguments, function (arg) {
                args.push(formatError(arg));
              });
              return logFn.apply(console, args);
            };
          }
          return function (arg1, arg2) {
            logFn(arg1, arg2);
          };
        }
      }
    ];
  }
  var OPERATORS = {
      'null': function () {
        return null;
      },
      'true': function () {
        return true;
      },
      'false': function () {
        return false;
      },
      undefined: noop,
      '+': function (self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        if (isDefined(a)) {
          if (isDefined(b)) {
            return a + b;
          }
          return a;
        }
        return isDefined(b) ? b : undefined;
      },
      '-': function (self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
      },
      '*': function (self, locals, a, b) {
        return a(self, locals) * b(self, locals);
      },
      '/': function (self, locals, a, b) {
        return a(self, locals) / b(self, locals);
      },
      '%': function (self, locals, a, b) {
        return a(self, locals) % b(self, locals);
      },
      '^': function (self, locals, a, b) {
        return a(self, locals) ^ b(self, locals);
      },
      '=': noop,
      '==': function (self, locals, a, b) {
        return a(self, locals) == b(self, locals);
      },
      '!=': function (self, locals, a, b) {
        return a(self, locals) != b(self, locals);
      },
      '<': function (self, locals, a, b) {
        return a(self, locals) < b(self, locals);
      },
      '>': function (self, locals, a, b) {
        return a(self, locals) > b(self, locals);
      },
      '<=': function (self, locals, a, b) {
        return a(self, locals) <= b(self, locals);
      },
      '>=': function (self, locals, a, b) {
        return a(self, locals) >= b(self, locals);
      },
      '&&': function (self, locals, a, b) {
        return a(self, locals) && b(self, locals);
      },
      '||': function (self, locals, a, b) {
        return a(self, locals) || b(self, locals);
      },
      '&': function (self, locals, a, b) {
        return a(self, locals) & b(self, locals);
      },
      '|': function (self, locals, a, b) {
        return b(self, locals)(self, locals, a(self, locals));
      },
      '!': function (self, locals, a) {
        return !a(self, locals);
      }
    };
  var ESCAPE = {
      'n': '\n',
      'f': '\f',
      'r': '\r',
      't': '\t',
      'v': '\v',
      '\'': '\'',
      '"': '"'
    };
  function lex(text, csp) {
    var tokens = [], token, index = 0, json = [], ch, lastCh = ':';
    while (index < text.length) {
      ch = text.charAt(index);
      if (is('"\'')) {
        readString(ch);
      } else if (isNumber(ch) || is('.') && isNumber(peek())) {
        readNumber();
      } else if (isIdent(ch)) {
        readIdent();
        if (was('{,') && json[0] == '{' && (token = tokens[tokens.length - 1])) {
          token.json = token.text.indexOf('.') == -1;
        }
      } else if (is('(){}[].,;:')) {
        tokens.push({
          index: index,
          text: ch,
          json: was(':[,') && is('{[') || is('}]:,')
        });
        if (is('{['))
          json.unshift(ch);
        if (is('}]'))
          json.shift();
        index++;
      } else if (isWhitespace(ch)) {
        index++;
        continue;
      } else {
        var ch2 = ch + peek(), fn = OPERATORS[ch], fn2 = OPERATORS[ch2];
        if (fn2) {
          tokens.push({
            index: index,
            text: ch2,
            fn: fn2
          });
          index += 2;
        } else if (fn) {
          tokens.push({
            index: index,
            text: ch,
            fn: fn,
            json: was('[,:') && is('+-')
          });
          index += 1;
        } else {
          throwError('Unexpected next character ', index, index + 1);
        }
      }
      lastCh = ch;
    }
    return tokens;
    function is(chars) {
      return chars.indexOf(ch) != -1;
    }
    function was(chars) {
      return chars.indexOf(lastCh) != -1;
    }
    function peek() {
      return index + 1 < text.length ? text.charAt(index + 1) : false;
    }
    function isNumber(ch) {
      return '0' <= ch && ch <= '9';
    }
    function isWhitespace(ch) {
      return ch == ' ' || ch == '\r' || ch == '\t' || ch == '\n' || ch == '\v' || ch == '\xa0';
    }
    function isIdent(ch) {
      return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || '_' == ch || ch == '$';
    }
    function isExpOperator(ch) {
      return ch == '-' || ch == '+' || isNumber(ch);
    }
    function throwError(error, start, end) {
      end = end || index;
      throw Error('Lexer Error: ' + error + ' at column' + (isDefined(start) ? 's ' + start + '-' + index + ' [' + text.substring(start, end) + ']' : ' ' + end) + ' in expression [' + text + '].');
    }
    function readNumber() {
      var number = '';
      var start = index;
      while (index < text.length) {
        var ch = lowercase(text.charAt(index));
        if (ch == '.' || isNumber(ch)) {
          number += ch;
        } else {
          var peekCh = peek();
          if (ch == 'e' && isExpOperator(peekCh)) {
            number += ch;
          } else if (isExpOperator(ch) && peekCh && isNumber(peekCh) && number.charAt(number.length - 1) == 'e') {
            number += ch;
          } else if (isExpOperator(ch) && (!peekCh || !isNumber(peekCh)) && number.charAt(number.length - 1) == 'e') {
            throwError('Invalid exponent');
          } else {
            break;
          }
        }
        index++;
      }
      number = 1 * number;
      tokens.push({
        index: start,
        text: number,
        json: true,
        fn: function () {
          return number;
        }
      });
    }
    function readIdent() {
      var ident = '', start = index, lastDot, peekIndex, methodName;
      while (index < text.length) {
        var ch = text.charAt(index);
        if (ch == '.' || isIdent(ch) || isNumber(ch)) {
          if (ch == '.')
            lastDot = index;
          ident += ch;
        } else {
          break;
        }
        index++;
      }
      if (lastDot) {
        peekIndex = index;
        while (peekIndex < text.length) {
          var ch = text.charAt(peekIndex);
          if (ch == '(') {
            methodName = ident.substr(lastDot - start + 1);
            ident = ident.substr(0, lastDot - start);
            index = peekIndex;
            break;
          }
          if (isWhitespace(ch)) {
            peekIndex++;
          } else {
            break;
          }
        }
      }
      var token = {
          index: start,
          text: ident
        };
      if (OPERATORS.hasOwnProperty(ident)) {
        token.fn = token.json = OPERATORS[ident];
      } else {
        var getter = getterFn(ident, csp);
        token.fn = extend(function (self, locals) {
          return getter(self, locals);
        }, {
          assign: function (self, value) {
            return setter(self, ident, value);
          }
        });
      }
      tokens.push(token);
      if (methodName) {
        tokens.push({
          index: lastDot,
          text: '.',
          json: false
        });
        tokens.push({
          index: lastDot + 1,
          text: methodName,
          json: false
        });
      }
    }
    function readString(quote) {
      var start = index;
      index++;
      var string = '';
      var rawString = quote;
      var escape = false;
      while (index < text.length) {
        var ch = text.charAt(index);
        rawString += ch;
        if (escape) {
          if (ch == 'u') {
            var hex = text.substring(index + 1, index + 5);
            if (!hex.match(/[\da-f]{4}/i))
              throwError('Invalid unicode escape [\\u' + hex + ']');
            index += 4;
            string += String.fromCharCode(parseInt(hex, 16));
          } else {
            var rep = ESCAPE[ch];
            if (rep) {
              string += rep;
            } else {
              string += ch;
            }
          }
          escape = false;
        } else if (ch == '\\') {
          escape = true;
        } else if (ch == quote) {
          index++;
          tokens.push({
            index: start,
            text: rawString,
            string: string,
            json: true,
            fn: function () {
              return string;
            }
          });
          return;
        } else {
          string += ch;
        }
        index++;
      }
      throwError('Unterminated quote', start);
    }
  }
  function parser(text, json, $filter, csp) {
    var ZERO = valueFn(0), value, tokens = lex(text, csp), assignment = _assignment, functionCall = _functionCall, fieldAccess = _fieldAccess, objectIndex = _objectIndex, filterChain = _filterChain;
    if (json) {
      assignment = logicalOR;
      functionCall = fieldAccess = objectIndex = filterChain = function () {
        throwError('is not valid json', {
          text: text,
          index: 0
        });
      };
      value = primary();
    } else {
      value = statements();
    }
    if (tokens.length !== 0) {
      throwError('is an unexpected token', tokens[0]);
    }
    return value;
    function throwError(msg, token) {
      throw Error('Syntax Error: Token \'' + token.text + '\' ' + msg + ' at column ' + (token.index + 1) + ' of the expression [' + text + '] starting at [' + text.substring(token.index) + '].');
    }
    function peekToken() {
      if (tokens.length === 0)
        throw Error('Unexpected end of expression: ' + text);
      return tokens[0];
    }
    function peek(e1, e2, e3, e4) {
      if (tokens.length > 0) {
        var token = tokens[0];
        var t = token.text;
        if (t == e1 || t == e2 || t == e3 || t == e4 || !e1 && !e2 && !e3 && !e4) {
          return token;
        }
      }
      return false;
    }
    function expect(e1, e2, e3, e4) {
      var token = peek(e1, e2, e3, e4);
      if (token) {
        if (json && !token.json) {
          throwError('is not valid json', token);
        }
        tokens.shift();
        return token;
      }
      return false;
    }
    function consume(e1) {
      if (!expect(e1)) {
        throwError('is unexpected, expecting [' + e1 + ']', peek());
      }
    }
    function unaryFn(fn, right) {
      return function (self, locals) {
        return fn(self, locals, right);
      };
    }
    function binaryFn(left, fn, right) {
      return function (self, locals) {
        return fn(self, locals, left, right);
      };
    }
    function statements() {
      var statements = [];
      while (true) {
        if (tokens.length > 0 && !peek('}', ')', ';', ']'))
          statements.push(filterChain());
        if (!expect(';')) {
          return statements.length == 1 ? statements[0] : function (self, locals) {
            var value;
            for (var i = 0; i < statements.length; i++) {
              var statement = statements[i];
              if (statement)
                value = statement(self, locals);
            }
            return value;
          };
        }
      }
    }
    function _filterChain() {
      var left = expression();
      var token;
      while (true) {
        if (token = expect('|')) {
          left = binaryFn(left, token.fn, filter());
        } else {
          return left;
        }
      }
    }
    function filter() {
      var token = expect();
      var fn = $filter(token.text);
      var argsFn = [];
      while (true) {
        if (token = expect(':')) {
          argsFn.push(expression());
        } else {
          var fnInvoke = function (self, locals, input) {
            var args = [input];
            for (var i = 0; i < argsFn.length; i++) {
              args.push(argsFn[i](self, locals));
            }
            return fn.apply(self, args);
          };
          return function () {
            return fnInvoke;
          };
        }
      }
    }
    function expression() {
      return assignment();
    }
    function _assignment() {
      var left = logicalOR();
      var right;
      var token;
      if (token = expect('=')) {
        if (!left.assign) {
          throwError('implies assignment but [' + text.substring(0, token.index) + '] can not be assigned to', token);
        }
        right = logicalOR();
        return function (self, locals) {
          return left.assign(self, right(self, locals), locals);
        };
      } else {
        return left;
      }
    }
    function logicalOR() {
      var left = logicalAND();
      var token;
      while (true) {
        if (token = expect('||')) {
          left = binaryFn(left, token.fn, logicalAND());
        } else {
          return left;
        }
      }
    }
    function logicalAND() {
      var left = equality();
      var token;
      if (token = expect('&&')) {
        left = binaryFn(left, token.fn, logicalAND());
      }
      return left;
    }
    function equality() {
      var left = relational();
      var token;
      if (token = expect('==', '!=')) {
        left = binaryFn(left, token.fn, equality());
      }
      return left;
    }
    function relational() {
      var left = additive();
      var token;
      if (token = expect('<', '>', '<=', '>=')) {
        left = binaryFn(left, token.fn, relational());
      }
      return left;
    }
    function additive() {
      var left = multiplicative();
      var token;
      while (token = expect('+', '-')) {
        left = binaryFn(left, token.fn, multiplicative());
      }
      return left;
    }
    function multiplicative() {
      var left = unary();
      var token;
      while (token = expect('*', '/', '%')) {
        left = binaryFn(left, token.fn, unary());
      }
      return left;
    }
    function unary() {
      var token;
      if (expect('+')) {
        return primary();
      } else if (token = expect('-')) {
        return binaryFn(ZERO, token.fn, unary());
      } else if (token = expect('!')) {
        return unaryFn(token.fn, unary());
      } else {
        return primary();
      }
    }
    function primary() {
      var primary;
      if (expect('(')) {
        primary = filterChain();
        consume(')');
      } else if (expect('[')) {
        primary = arrayDeclaration();
      } else if (expect('{')) {
        primary = object();
      } else {
        var token = expect();
        primary = token.fn;
        if (!primary) {
          throwError('not a primary expression', token);
        }
      }
      var next, context;
      while (next = expect('(', '[', '.')) {
        if (next.text === '(') {
          primary = functionCall(primary, context);
          context = null;
        } else if (next.text === '[') {
          context = primary;
          primary = objectIndex(primary);
        } else if (next.text === '.') {
          context = primary;
          primary = fieldAccess(primary);
        } else {
          throwError('IMPOSSIBLE');
        }
      }
      return primary;
    }
    function _fieldAccess(object) {
      var field = expect().text;
      var getter = getterFn(field, csp);
      return extend(function (self, locals) {
        return getter(object(self, locals), locals);
      }, {
        assign: function (self, value, locals) {
          return setter(object(self, locals), field, value);
        }
      });
    }
    function _objectIndex(obj) {
      var indexFn = expression();
      consume(']');
      return extend(function (self, locals) {
        var o = obj(self, locals), i = indexFn(self, locals), v, p;
        if (!o)
          return undefined;
        v = o[i];
        if (v && v.then) {
          p = v;
          if (!('$$v' in v)) {
            p.$$v = undefined;
            p.then(function (val) {
              p.$$v = val;
            });
          }
          v = v.$$v;
        }
        return v;
      }, {
        assign: function (self, value, locals) {
          return obj(self, locals)[indexFn(self, locals)] = value;
        }
      });
    }
    function _functionCall(fn, contextGetter) {
      var argsFn = [];
      if (peekToken().text != ')') {
        do {
          argsFn.push(expression());
        } while (expect(','));
      }
      consume(')');
      return function (self, locals) {
        var args = [], context = contextGetter ? contextGetter(self, locals) : self;
        for (var i = 0; i < argsFn.length; i++) {
          args.push(argsFn[i](self, locals));
        }
        var fnPtr = fn(self, locals) || noop;
        return fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
      };
    }
    function arrayDeclaration() {
      var elementFns = [];
      if (peekToken().text != ']') {
        do {
          elementFns.push(expression());
        } while (expect(','));
      }
      consume(']');
      return function (self, locals) {
        var array = [];
        for (var i = 0; i < elementFns.length; i++) {
          array.push(elementFns[i](self, locals));
        }
        return array;
      };
    }
    function object() {
      var keyValues = [];
      if (peekToken().text != '}') {
        do {
          var token = expect(), key = token.string || token.text;
          consume(':');
          var value = expression();
          keyValues.push({
            key: key,
            value: value
          });
        } while (expect(','));
      }
      consume('}');
      return function (self, locals) {
        var object = {};
        for (var i = 0; i < keyValues.length; i++) {
          var keyValue = keyValues[i];
          var value = keyValue.value(self, locals);
          object[keyValue.key] = value;
        }
        return object;
      };
    }
  }
  function setter(obj, path, setValue) {
    var element = path.split('.');
    for (var i = 0; element.length > 1; i++) {
      var key = element.shift();
      var propertyObj = obj[key];
      if (!propertyObj) {
        propertyObj = {};
        obj[key] = propertyObj;
      }
      obj = propertyObj;
    }
    obj[element.shift()] = setValue;
    return setValue;
  }
  function getter(obj, path, bindFnToScope) {
    if (!path)
      return obj;
    var keys = path.split('.');
    var key;
    var lastInstance = obj;
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      key = keys[i];
      if (obj) {
        obj = (lastInstance = obj)[key];
      }
    }
    if (!bindFnToScope && isFunction(obj)) {
      return bind(lastInstance, obj);
    }
    return obj;
  }
  var getterFnCache = {};
  function cspSafeGetterFn(key0, key1, key2, key3, key4) {
    return function (scope, locals) {
      var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope, promise;
      if (pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key0];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key1 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key1];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key2 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key2];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key3 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key3];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key4 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key4];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      return pathVal;
    };
  }
  ;
  function getterFn(path, csp) {
    if (getterFnCache.hasOwnProperty(path)) {
      return getterFnCache[path];
    }
    var pathKeys = path.split('.'), pathKeysLength = pathKeys.length, fn;
    if (csp) {
      fn = pathKeysLength < 6 ? cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4]) : function (scope, locals) {
        var i = 0, val;
        do {
          val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++])(scope, locals);
          locals = undefined;
          scope = val;
        } while (i < pathKeysLength);
        return val;
      };
    } else {
      var code = 'var l, fn, p;\n';
      forEach(pathKeys, function (key, index) {
        code += 'if(s === null || s === undefined) return s;\n' + 'l=s;\n' + 's=' + (index ? 's' : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"]' + ';\n' + 'if (s && s.then) {\n' + ' if (!("$$v" in s)) {\n' + ' p=s;\n' + ' p.$$v = undefined;\n' + ' p.then(function(v) {p.$$v=v;});\n' + '}\n' + ' s=s.$$v\n' + '}\n';
      });
      code += 'return s;';
      fn = Function('s', 'k', code);
      fn.toString = function () {
        return code;
      };
    }
    return getterFnCache[path] = fn;
  }
  function $ParseProvider() {
    var cache = {};
    this.$get = [
      '$filter',
      '$sniffer',
      function ($filter, $sniffer) {
        return function (exp) {
          switch (typeof exp) {
          case 'string':
            return cache.hasOwnProperty(exp) ? cache[exp] : cache[exp] = parser(exp, false, $filter, $sniffer.csp);
          case 'function':
            return exp;
          default:
            return noop;
          }
        };
      }
    ];
  }
  function $QProvider() {
    this.$get = [
      '$rootScope',
      '$exceptionHandler',
      function ($rootScope, $exceptionHandler) {
        return qFactory(function (callback) {
          $rootScope.$evalAsync(callback);
        }, $exceptionHandler);
      }
    ];
  }
  function qFactory(nextTick, exceptionHandler) {
    var defer = function () {
      var pending = [], value, deferred;
      deferred = {
        resolve: function (val) {
          if (pending) {
            var callbacks = pending;
            pending = undefined;
            value = ref(val);
            if (callbacks.length) {
              nextTick(function () {
                var callback;
                for (var i = 0, ii = callbacks.length; i < ii; i++) {
                  callback = callbacks[i];
                  value.then(callback[0], callback[1]);
                }
              });
            }
          }
        },
        reject: function (reason) {
          deferred.resolve(reject(reason));
        },
        promise: {
          then: function (callback, errback) {
            var result = defer();
            var wrappedCallback = function (value) {
              try {
                result.resolve((callback || defaultCallback)(value));
              } catch (e) {
                exceptionHandler(e);
                result.reject(e);
              }
            };
            var wrappedErrback = function (reason) {
              try {
                result.resolve((errback || defaultErrback)(reason));
              } catch (e) {
                exceptionHandler(e);
                result.reject(e);
              }
            };
            if (pending) {
              pending.push([
                wrappedCallback,
                wrappedErrback
              ]);
            } else {
              value.then(wrappedCallback, wrappedErrback);
            }
            return result.promise;
          }
        }
      };
      return deferred;
    };
    var ref = function (value) {
      if (value && value.then)
        return value;
      return {
        then: function (callback) {
          var result = defer();
          nextTick(function () {
            result.resolve(callback(value));
          });
          return result.promise;
        }
      };
    };
    var reject = function (reason) {
      return {
        then: function (callback, errback) {
          var result = defer();
          nextTick(function () {
            result.resolve((errback || defaultErrback)(reason));
          });
          return result.promise;
        }
      };
    };
    var when = function (value, callback, errback) {
      var result = defer(), done;
      var wrappedCallback = function (value) {
        try {
          return (callback || defaultCallback)(value);
        } catch (e) {
          exceptionHandler(e);
          return reject(e);
        }
      };
      var wrappedErrback = function (reason) {
        try {
          return (errback || defaultErrback)(reason);
        } catch (e) {
          exceptionHandler(e);
          return reject(e);
        }
      };
      nextTick(function () {
        ref(value).then(function (value) {
          if (done)
            return;
          done = true;
          result.resolve(ref(value).then(wrappedCallback, wrappedErrback));
        }, function (reason) {
          if (done)
            return;
          done = true;
          result.resolve(wrappedErrback(reason));
        });
      });
      return result.promise;
    };
    function defaultCallback(value) {
      return value;
    }
    function defaultErrback(reason) {
      return reject(reason);
    }
    function all(promises) {
      var deferred = defer(), counter = promises.length, results = [];
      if (counter) {
        forEach(promises, function (promise, index) {
          ref(promise).then(function (value) {
            if (index in results)
              return;
            results[index] = value;
            if (!--counter)
              deferred.resolve(results);
          }, function (reason) {
            if (index in results)
              return;
            deferred.reject(reason);
          });
        });
      } else {
        deferred.resolve(results);
      }
      return deferred.promise;
    }
    return {
      defer: defer,
      reject: reject,
      when: when,
      all: all
    };
  }
  function $RouteProvider() {
    var routes = {};
    this.when = function (path, route) {
      routes[path] = extend({ reloadOnSearch: true }, route);
      if (path) {
        var redirectPath = path[path.length - 1] == '/' ? path.substr(0, path.length - 1) : path + '/';
        routes[redirectPath] = { redirectTo: path };
      }
      return this;
    };
    this.otherwise = function (params) {
      this.when(null, params);
      return this;
    };
    this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      function ($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache) {
        var forceReload = false, $route = {
            routes: routes,
            reload: function () {
              forceReload = true;
              $rootScope.$evalAsync(updateRoute);
            }
          };
        $rootScope.$on('$locationChangeSuccess', updateRoute);
        return $route;
        function switchRouteMatcher(on, when) {
          when = '^' + when.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$';
          var regex = '', params = [], dst = {};
          var re = /:(\w+)/g, paramMatch, lastMatchedIndex = 0;
          while ((paramMatch = re.exec(when)) !== null) {
            regex += when.slice(lastMatchedIndex, paramMatch.index);
            regex += '([^\\/]*)';
            params.push(paramMatch[1]);
            lastMatchedIndex = re.lastIndex;
          }
          regex += when.substr(lastMatchedIndex);
          var match = on.match(new RegExp(regex));
          if (match) {
            forEach(params, function (name, index) {
              dst[name] = match[index + 1];
            });
          }
          return match ? dst : null;
        }
        function updateRoute() {
          var next = parseRoute(), last = $route.current;
          if (next && last && next.$route === last.$route && equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
            last.params = next.params;
            copy(last.params, $routeParams);
            $rootScope.$broadcast('$routeUpdate', last);
          } else if (next || last) {
            forceReload = false;
            $rootScope.$broadcast('$routeChangeStart', next, last);
            $route.current = next;
            if (next) {
              if (next.redirectTo) {
                if (isString(next.redirectTo)) {
                  $location.path(interpolate(next.redirectTo, next.params)).search(next.params).replace();
                } else {
                  $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search())).replace();
                }
              }
            }
            $q.when(next).then(function () {
              if (next) {
                var keys = [], values = [], template;
                forEach(next.resolve || {}, function (value, key) {
                  keys.push(key);
                  values.push(isString(value) ? $injector.get(value) : $injector.invoke(value));
                });
                if (isDefined(template = next.template)) {
                } else if (isDefined(template = next.templateUrl)) {
                  template = $http.get(template, { cache: $templateCache }).then(function (response) {
                    return response.data;
                  });
                }
                if (isDefined(template)) {
                  keys.push('$template');
                  values.push(template);
                }
                return $q.all(values).then(function (values) {
                  var locals = {};
                  forEach(values, function (value, index) {
                    locals[keys[index]] = value;
                  });
                  return locals;
                });
              }
            }).then(function (locals) {
              if (next == $route.current) {
                if (next) {
                  next.locals = locals;
                  copy(next.params, $routeParams);
                }
                $rootScope.$broadcast('$routeChangeSuccess', next, last);
              }
            }, function (error) {
              if (next == $route.current) {
                $rootScope.$broadcast('$routeChangeError', next, last, error);
              }
            });
          }
        }
        function parseRoute() {
          var params, match;
          forEach(routes, function (route, path) {
            if (!match && (params = switchRouteMatcher($location.path(), path))) {
              match = inherit(route, {
                params: extend({}, $location.search(), params),
                pathParams: params
              });
              match.$route = route;
            }
          });
          return match || routes[null] && inherit(routes[null], {
            params: {},
            pathParams: {}
          });
        }
        function interpolate(string, params) {
          var result = [];
          forEach((string || '').split(':'), function (segment, i) {
            if (i == 0) {
              result.push(segment);
            } else {
              var segmentMatch = segment.match(/(\w+)(.*)/);
              var key = segmentMatch[1];
              result.push(params[key]);
              result.push(segmentMatch[2] || '');
              delete params[key];
            }
          });
          return result.join('');
        }
      }
    ];
  }
  function $RouteParamsProvider() {
    this.$get = valueFn({});
  }
  function $RootScopeProvider() {
    var TTL = 10;
    this.digestTtl = function (value) {
      if (arguments.length) {
        TTL = value;
      }
      return TTL;
    };
    this.$get = [
      '$injector',
      '$exceptionHandler',
      '$parse',
      function ($injector, $exceptionHandler, $parse) {
        function Scope() {
          this.$id = nextUid();
          this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          this['this'] = this.$root = this;
          this.$$destroyed = false;
          this.$$asyncQueue = [];
          this.$$listeners = {};
          this.$$isolateBindings = {};
        }
        Scope.prototype = {
          $new: function (isolate) {
            var Child, child;
            if (isFunction(isolate)) {
              throw Error('API-CHANGE: Use $controller to instantiate controllers.');
            }
            if (isolate) {
              child = new Scope();
              child.$root = this.$root;
            } else {
              Child = function () {
              };
              Child.prototype = this;
              child = new Child();
              child.$id = nextUid();
            }
            child['this'] = child;
            child.$$listeners = {};
            child.$parent = this;
            child.$$asyncQueue = [];
            child.$$watchers = child.$$nextSibling = child.$$childHead = child.$$childTail = null;
            child.$$prevSibling = this.$$childTail;
            if (this.$$childHead) {
              this.$$childTail.$$nextSibling = child;
              this.$$childTail = child;
            } else {
              this.$$childHead = this.$$childTail = child;
            }
            return child;
          },
          $watch: function (watchExp, listener, objectEquality) {
            var scope = this, get = compileToFn(watchExp, 'watch'), array = scope.$$watchers, watcher = {
                fn: listener,
                last: initWatchVal,
                get: get,
                exp: watchExp,
                eq: !!objectEquality
              };
            if (!isFunction(listener)) {
              var listenFn = compileToFn(listener || noop, 'listener');
              watcher.fn = function (newVal, oldVal, scope) {
                listenFn(scope);
              };
            }
            if (!array) {
              array = scope.$$watchers = [];
            }
            array.unshift(watcher);
            return function () {
              arrayRemove(array, watcher);
            };
          },
          $digest: function () {
            var watch, value, last, watchers, asyncQueue, length, dirty, ttl = TTL, next, current, target = this, watchLog = [], logIdx, logMsg;
            beginPhase('$digest');
            do {
              dirty = false;
              current = target;
              do {
                asyncQueue = current.$$asyncQueue;
                while (asyncQueue.length) {
                  try {
                    current.$eval(asyncQueue.shift());
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                }
                if (watchers = current.$$watchers) {
                  length = watchers.length;
                  while (length--) {
                    try {
                      watch = watchers[length];
                      if ((value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : typeof value == 'number' && typeof last == 'number' && isNaN(value) && isNaN(last))) {
                        dirty = true;
                        watch.last = watch.eq ? copy(value) : value;
                        watch.fn(value, last === initWatchVal ? value : last, current);
                        if (ttl < 5) {
                          logIdx = 4 - ttl;
                          if (!watchLog[logIdx])
                            watchLog[logIdx] = [];
                          logMsg = isFunction(watch.exp) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp;
                          logMsg += '; newVal: ' + toJson(value) + '; oldVal: ' + toJson(last);
                          watchLog[logIdx].push(logMsg);
                        }
                      }
                    } catch (e) {
                      $exceptionHandler(e);
                    }
                  }
                }
                if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                  while (current !== target && !(next = current.$$nextSibling)) {
                    current = current.$parent;
                  }
                }
              } while (current = next);
              if (dirty && !ttl--) {
                clearPhase();
                throw Error(TTL + ' $digest() iterations reached. Aborting!\n' + 'Watchers fired in the last 5 iterations: ' + toJson(watchLog));
              }
            } while (dirty || asyncQueue.length);
            clearPhase();
          },
          $destroy: function () {
            if ($rootScope == this || this.$$destroyed)
              return;
            var parent = this.$parent;
            this.$broadcast('$destroy');
            this.$$destroyed = true;
            if (parent.$$childHead == this)
              parent.$$childHead = this.$$nextSibling;
            if (parent.$$childTail == this)
              parent.$$childTail = this.$$prevSibling;
            if (this.$$prevSibling)
              this.$$prevSibling.$$nextSibling = this.$$nextSibling;
            if (this.$$nextSibling)
              this.$$nextSibling.$$prevSibling = this.$$prevSibling;
            this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          },
          $eval: function (expr, locals) {
            return $parse(expr)(this, locals);
          },
          $evalAsync: function (expr) {
            this.$$asyncQueue.push(expr);
          },
          $apply: function (expr) {
            try {
              beginPhase('$apply');
              return this.$eval(expr);
            } catch (e) {
              $exceptionHandler(e);
            } finally {
              clearPhase();
              try {
                $rootScope.$digest();
                $rootScope.$broadcast('$optimisticRenderComplete');
              } catch (e) {
                $exceptionHandler(e);
                throw e;
              }
            }
          },
          $on: function (name, listener) {
            var namedListeners = this.$$listeners[name];
            if (!namedListeners) {
              this.$$listeners[name] = namedListeners = [];
            }
            namedListeners.push(listener);
            return function () {
              namedListeners[indexOf(namedListeners, listener)] = null;
            };
          },
          $emit: function (name, args) {
            var empty = [], namedListeners, scope = this, stopPropagation = false, event = {
                name: name,
                targetScope: scope,
                stopPropagation: function () {
                  stopPropagation = true;
                },
                preventDefault: function () {
                  event.defaultPrevented = true;
                },
                defaultPrevented: false
              }, listenerArgs = concat([event], arguments, 1), i, length;
            do {
              namedListeners = scope.$$listeners[name] || empty;
              event.currentScope = scope;
              for (i = 0, length = namedListeners.length; i < length; i++) {
                if (!namedListeners[i]) {
                  namedListeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  namedListeners[i].apply(null, listenerArgs);
                  if (stopPropagation)
                    return event;
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              scope = scope.$parent;
            } while (scope);
            return event;
          },
          $broadcast: function (name, args) {
            var target = this, current = target, next = target, event = {
                name: name,
                targetScope: target,
                preventDefault: function () {
                  event.defaultPrevented = true;
                },
                defaultPrevented: false
              }, listenerArgs = concat([event], arguments, 1), listeners, i, length;
            do {
              current = next;
              event.currentScope = current;
              listeners = current.$$listeners[name] || [];
              for (i = 0, length = listeners.length; i < length; i++) {
                if (!listeners[i]) {
                  listeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  listeners[i].apply(null, listenerArgs);
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                while (current !== target && !(next = current.$$nextSibling)) {
                  current = current.$parent;
                }
              }
            } while (current = next);
            return event;
          }
        };
        var $rootScope = new Scope();
        return $rootScope;
        function beginPhase(phase) {
          if ($rootScope.$$phase) {
            throw Error($rootScope.$$phase + ' already in progress');
          }
          $rootScope.$$phase = phase;
        }
        function clearPhase() {
          $rootScope.$$phase = null;
        }
        function compileToFn(exp, name) {
          var fn = $parse(exp);
          assertArgFn(fn, name);
          return fn;
        }
        function initWatchVal() {
        }
      }
    ];
  }
  function $SnifferProvider() {
    this.$get = [
      '$window',
      function ($window) {
        var eventSupport = {}, android = int((/android (\d+)/.exec(lowercase($window.navigator.userAgent)) || [])[1]);
        return {
          history: !!($window.history && $window.history.pushState && !(android < 4)),
          hashchange: 'onhashchange' in $window && (!$window.document.documentMode || $window.document.documentMode > 7),
          hasEvent: function (event) {
            if (event == 'input' && msie == 9)
              return false;
            if (isUndefined(eventSupport[event])) {
              var divElm = $window.document.createElement('div');
              eventSupport[event] = 'on' + event in divElm;
            }
            return eventSupport[event];
          },
          csp: false
        };
      }
    ];
  }
  function $WindowProvider() {
    this.$get = valueFn(window);
  }
  function parseHeaders(headers) {
    var parsed = {}, key, val, i;
    if (!headers)
      return parsed;
    forEach(headers.split('\n'), function (line) {
      i = line.indexOf(':');
      key = lowercase(trim(line.substr(0, i)));
      val = trim(line.substr(i + 1));
      if (key) {
        if (parsed[key]) {
          parsed[key] += ', ' + val;
        } else {
          parsed[key] = val;
        }
      }
    });
    return parsed;
  }
  function headersGetter(headers) {
    var headersObj = isObject(headers) ? headers : undefined;
    return function (name) {
      if (!headersObj)
        headersObj = parseHeaders(headers);
      if (name) {
        return headersObj[lowercase(name)] || null;
      }
      return headersObj;
    };
  }
  function transformData(data, headers, fns) {
    if (isFunction(fns))
      return fns(data, headers);
    forEach(fns, function (fn) {
      data = fn(data, headers);
    });
    return data;
  }
  function isSuccess(status) {
    return 200 <= status && status < 300;
  }
  function $HttpProvider() {
    var JSON_START = /^\s*(\[|\{[^\{])/, JSON_END = /[\}\]]\s*$/, PROTECTION_PREFIX = /^\)\]\}',?\n/;
    var $config = this.defaults = {
        transformResponse: [function (data) {
            if (isString(data)) {
              data = data.replace(PROTECTION_PREFIX, '');
              if (JSON_START.test(data) && JSON_END.test(data))
                data = fromJson(data, true);
            }
            return data;
          }],
        transformRequest: [function (d) {
            return isObject(d) && !isFile(d) ? toJson(d) : d;
          }],
        headers: {
          common: {
            'Accept': 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest'
          },
          post: { 'Content-Type': 'application/json;charset=utf-8' },
          put: { 'Content-Type': 'application/json;charset=utf-8' }
        }
      };
    var providerResponseInterceptors = this.responseInterceptors = [];
    this.$get = [
      '$httpBackend',
      '$browser',
      '$cacheFactory',
      '$rootScope',
      '$q',
      '$injector',
      function ($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
        var defaultCache = $cacheFactory('$http'), responseInterceptors = [];
        forEach(providerResponseInterceptors, function (interceptor) {
          responseInterceptors.push(isString(interceptor) ? $injector.get(interceptor) : $injector.invoke(interceptor));
        });
        function $http(config) {
          config.method = uppercase(config.method);
          var reqTransformFn = config.transformRequest || $config.transformRequest, respTransformFn = config.transformResponse || $config.transformResponse, defHeaders = $config.headers, reqHeaders = extend({ 'X-XSRF-TOKEN': $browser.cookies()['XSRF-TOKEN'] }, defHeaders.common, defHeaders[lowercase(config.method)], config.headers), reqData = transformData(config.data, headersGetter(reqHeaders), reqTransformFn), promise;
          if (isUndefined(config.data)) {
            delete reqHeaders['Content-Type'];
          }
          promise = sendReq(config, reqData, reqHeaders);
          promise = promise.then(transformResponse, transformResponse);
          forEach(responseInterceptors, function (interceptor) {
            promise = interceptor(promise);
          });
          promise.success = function (fn) {
            promise.then(function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          promise.error = function (fn) {
            promise.then(null, function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          return promise;
          function transformResponse(response) {
            var resp = extend({}, response, { data: transformData(response.data, response.headers, respTransformFn) });
            return isSuccess(response.status) ? resp : $q.reject(resp);
          }
        }
        $http.pendingRequests = [];
        createShortMethods('get', 'delete', 'head', 'jsonp');
        createShortMethodsWithData('post', 'put');
        $http.defaults = $config;
        return $http;
        function createShortMethods(names) {
          forEach(arguments, function (name) {
            $http[name] = function (url, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url
              }));
            };
          });
        }
        function createShortMethodsWithData(name) {
          forEach(arguments, function (name) {
            $http[name] = function (url, data, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url,
                data: data
              }));
            };
          });
        }
        function sendReq(config, reqData, reqHeaders) {
          var deferred = $q.defer(), promise = deferred.promise, cache, cachedResp, url = buildUrl(config.url, config.params);
          $http.pendingRequests.push(config);
          promise.then(removePendingReq, removePendingReq);
          if (config.cache && config.method == 'GET') {
            cache = isObject(config.cache) ? config.cache : defaultCache;
          }
          if (cache) {
            cachedResp = cache.get(url);
            if (cachedResp) {
              if (cachedResp.then) {
                cachedResp.then(removePendingReq, removePendingReq);
                return cachedResp;
              } else {
                if (isArray(cachedResp)) {
                  resolvePromise(cachedResp[1], cachedResp[0], copy(cachedResp[2]));
                } else {
                  resolvePromise(cachedResp, 200, {});
                }
              }
            } else {
              cache.put(url, promise);
            }
          }
          if (!cachedResp) {
            $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials);
          }
          return promise;
          function done(status, response, headersString) {
            if (cache) {
              if (isSuccess(status)) {
                cache.put(url, [
                  status,
                  response,
                  parseHeaders(headersString)
                ]);
              } else {
                cache.remove(url);
              }
            }
            resolvePromise(response, status, headersString);
            $rootScope.$apply();
          }
          function resolvePromise(response, status, headers) {
            status = Math.max(status, 0);
            (isSuccess(status) ? deferred.resolve : deferred.reject)({
              data: response,
              status: status,
              headers: headersGetter(headers),
              config: config
            });
          }
          function removePendingReq() {
            var idx = indexOf($http.pendingRequests, config);
            if (idx !== -1)
              $http.pendingRequests.splice(idx, 1);
          }
        }
        function buildUrl(url, params) {
          if (!params)
            return url;
          var parts = [];
          forEachSorted(params, function (value, key) {
            if (value == null || value == undefined)
              return;
            if (isObject(value)) {
              value = toJson(value);
            }
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
          });
          return url + (url.indexOf('?') == -1 ? '?' : '&') + parts.join('&');
        }
      }
    ];
  }
  var XHR = window.XMLHttpRequest || function () {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (e1) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (e2) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e3) {
      }
      throw new Error('This browser does not support XMLHttpRequest.');
    };
  function $HttpBackendProvider() {
    this.$get = [
      '$browser',
      '$window',
      '$document',
      function ($browser, $window, $document) {
        return createHttpBackend($browser, XHR, $browser.defer, $window.angular.callbacks, $document[0], $window.location.protocol.replace(':', ''));
      }
    ];
  }
  function createHttpBackend($browser, XHR, $browserDefer, callbacks, rawDocument, locationProtocol) {
    return function (method, url, post, callback, headers, timeout, withCredentials) {
      $browser.$$incOutstandingRequestCount();
      url = url || $browser.url();
      if (lowercase(method) == 'jsonp') {
        var callbackId = '_' + (callbacks.counter++).toString(36);
        callbacks[callbackId] = function (data) {
          callbacks[callbackId].data = data;
        };
        jsonpReq(url.replace('JSON_CALLBACK', 'angular.callbacks.' + callbackId), function () {
          if (callbacks[callbackId].data) {
            completeRequest(callback, 200, callbacks[callbackId].data);
          } else {
            completeRequest(callback, -2);
          }
          delete callbacks[callbackId];
        });
      } else {
        var xhr = new XHR();
        xhr.open(method, url, true);
        forEach(headers, function (value, key) {
          if (value)
            xhr.setRequestHeader(key, value);
        });
        var status;
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            var responseHeaders = xhr.getAllResponseHeaders();
            var value, simpleHeaders = [
                'Cache-Control',
                'Content-Language',
                'Content-Type',
                'Expires',
                'Last-Modified',
                'Pragma'
              ];
            if (!responseHeaders) {
              responseHeaders = '';
              forEach(simpleHeaders, function (header) {
                var value = xhr.getResponseHeader(header);
                if (value) {
                  responseHeaders += header + ': ' + value + '\n';
                }
              });
            }
            completeRequest(callback, status || xhr.status, xhr.responseText, responseHeaders);
          }
        };
        if (withCredentials) {
          xhr.withCredentials = true;
        }
        xhr.send(post || '');
        if (timeout > 0) {
          $browserDefer(function () {
            status = -1;
            xhr.abort();
          }, timeout);
        }
      }
      function completeRequest(callback, status, response, headersString) {
        var protocol = (url.match(URL_MATCH) || [
            '',
            locationProtocol
          ])[1];
        status = protocol == 'file' ? response ? 200 : 404 : status;
        status = status == 1223 ? 204 : status;
        callback(status, response, headersString);
        $browser.$$completeOutstandingRequest(noop);
      }
    };
    function jsonpReq(url, done) {
      var script = rawDocument.createElement('script'), doneWrapper = function () {
          rawDocument.body.removeChild(script);
          if (done)
            done();
        };
      script.type = 'text/javascript';
      script.src = url;
      if (msie) {
        script.onreadystatechange = function () {
          if (/loaded|complete/.test(script.readyState))
            doneWrapper();
        };
      } else {
        script.onload = script.onerror = doneWrapper;
      }
      rawDocument.body.appendChild(script);
    }
  }
  function $LocaleProvider() {
    this.$get = function () {
      return {
        id: 'en-us',
        NUMBER_FORMATS: {
          DECIMAL_SEP: '.',
          GROUP_SEP: ',',
          PATTERNS: [
            {
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: '',
              posSuf: '',
              negPre: '-',
              negSuf: '',
              gSize: 3,
              lgSize: 3
            },
            {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: '\xa4',
              posSuf: '',
              negPre: '(\xa4',
              negSuf: ')',
              gSize: 3,
              lgSize: 3
            }
          ],
          CURRENCY_SYM: '$'
        },
        DATETIME_FORMATS: {
          MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
          SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
          DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
          SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
          AMPMS: [
            'AM',
            'PM'
          ],
          medium: 'MMM d, y h:mm:ss a',
          short: 'M/d/yy h:mm a',
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          mediumDate: 'MMM d, y',
          shortDate: 'M/d/yy',
          mediumTime: 'h:mm:ss a',
          shortTime: 'h:mm a'
        },
        pluralCat: function (num) {
          if (num === 1) {
            return 'one';
          }
          return 'other';
        }
      };
    };
  }
  function $TimeoutProvider() {
    this.$get = [
      '$rootScope',
      '$browser',
      '$q',
      '$exceptionHandler',
      function ($rootScope, $browser, $q, $exceptionHandler) {
        var deferreds = {};
        function timeout(fn, delay, invokeApply) {
          var deferred = $q.defer(), promise = deferred.promise, skipApply = isDefined(invokeApply) && !invokeApply, timeoutId, cleanup;
          timeoutId = $browser.defer(function () {
            try {
              deferred.resolve(fn());
            } catch (e) {
              deferred.reject(e);
              $exceptionHandler(e);
            }
            if (!skipApply)
              $rootScope.$apply();
          }, delay);
          cleanup = function () {
            delete deferreds[promise.$$timeoutId];
          };
          promise.$$timeoutId = timeoutId;
          deferreds[timeoutId] = deferred;
          promise.then(cleanup, cleanup);
          return promise;
        }
        timeout.cancel = function (promise) {
          if (promise && promise.$$timeoutId in deferreds) {
            deferreds[promise.$$timeoutId].reject('canceled');
            return $browser.defer.cancel(promise.$$timeoutId);
          }
          return false;
        };
        return timeout;
      }
    ];
  }
  $FilterProvider.$inject = ['$provide'];
  function $FilterProvider($provide) {
    var suffix = 'Filter';
    function register(name, factory) {
      return $provide.factory(name + suffix, factory);
    }
    this.register = register;
    this.$get = [
      '$injector',
      function ($injector) {
        return function (name) {
          return $injector.get(name + suffix);
        };
      }
    ];
    register('currency', currencyFilter);
    register('date', dateFilter);
    register('filter', filterFilter);
    register('json', jsonFilter);
    register('limitTo', limitToFilter);
    register('lowercase', lowercaseFilter);
    register('number', numberFilter);
    register('orderBy', orderByFilter);
    register('uppercase', uppercaseFilter);
  }
  function filterFilter() {
    return function (array, expression) {
      if (!isArray(array))
        return array;
      var predicates = [];
      predicates.check = function (value) {
        for (var j = 0; j < predicates.length; j++) {
          if (!predicates[j](value)) {
            return false;
          }
        }
        return true;
      };
      var search = function (obj, text) {
        if (text.charAt(0) === '!') {
          return !search(obj, text.substr(1));
        }
        switch (typeof obj) {
        case 'boolean':
        case 'number':
        case 'string':
          return ('' + obj).toLowerCase().indexOf(text) > -1;
        case 'object':
          for (var objKey in obj) {
            if (objKey.charAt(0) !== '$' && search(obj[objKey], text)) {
              return true;
            }
          }
          return false;
        case 'array':
          for (var i = 0; i < obj.length; i++) {
            if (search(obj[i], text)) {
              return true;
            }
          }
          return false;
        default:
          return false;
        }
      };
      switch (typeof expression) {
      case 'boolean':
      case 'number':
      case 'string':
        expression = { $: expression };
      case 'object':
        for (var key in expression) {
          if (key == '$') {
            (function () {
              var text = ('' + expression[key]).toLowerCase();
              if (!text)
                return;
              predicates.push(function (value) {
                return search(value, text);
              });
            }());
          } else {
            (function () {
              var path = key;
              var text = ('' + expression[key]).toLowerCase();
              if (!text)
                return;
              predicates.push(function (value) {
                return search(getter(value, path), text);
              });
            }());
          }
        }
        break;
      case 'function':
        predicates.push(expression);
        break;
      default:
        return array;
      }
      var filtered = [];
      for (var j = 0; j < array.length; j++) {
        var value = array[j];
        if (predicates.check(value)) {
          filtered.push(value);
        }
      }
      return filtered;
    };
  }
  currencyFilter.$inject = ['$locale'];
  function currencyFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (amount, currencySymbol) {
      if (isUndefined(currencySymbol))
        currencySymbol = formats.CURRENCY_SYM;
      return formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol);
    };
  }
  numberFilter.$inject = ['$locale'];
  function numberFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (number, fractionSize) {
      return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
    };
  }
  var DECIMAL_SEP = '.';
  function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
    if (isNaN(number) || !isFinite(number))
      return '';
    var isNegative = number < 0;
    number = Math.abs(number);
    var numStr = number + '', formatedText = '', parts = [];
    var hasExponent = false;
    if (numStr.indexOf('e') !== -1) {
      var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
      if (match && match[2] == '-' && match[3] > fractionSize + 1) {
        numStr = '0';
      } else {
        formatedText = numStr;
        hasExponent = true;
      }
    }
    if (!hasExponent) {
      var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;
      if (isUndefined(fractionSize)) {
        fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
      }
      var pow = Math.pow(10, fractionSize);
      number = Math.round(number * pow) / pow;
      var fraction = ('' + number).split(DECIMAL_SEP);
      var whole = fraction[0];
      fraction = fraction[1] || '';
      var pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
      if (whole.length >= lgroup + group) {
        pos = whole.length - lgroup;
        for (var i = 0; i < pos; i++) {
          if ((pos - i) % group === 0 && i !== 0) {
            formatedText += groupSep;
          }
          formatedText += whole.charAt(i);
        }
      }
      for (i = pos; i < whole.length; i++) {
        if ((whole.length - i) % lgroup === 0 && i !== 0) {
          formatedText += groupSep;
        }
        formatedText += whole.charAt(i);
      }
      while (fraction.length < fractionSize) {
        fraction += '0';
      }
      if (fractionSize && fractionSize !== '0')
        formatedText += decimalSep + fraction.substr(0, fractionSize);
    }
    parts.push(isNegative ? pattern.negPre : pattern.posPre);
    parts.push(formatedText);
    parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
    return parts.join('');
  }
  function padNumber(num, digits, trim) {
    var neg = '';
    if (num < 0) {
      neg = '-';
      num = -num;
    }
    num = '' + num;
    while (num.length < digits)
      num = '0' + num;
    if (trim)
      num = num.substr(num.length - digits);
    return neg + num;
  }
  function dateGetter(name, size, offset, trim) {
    return function (date) {
      var value = date['get' + name]();
      if (offset > 0 || value > -offset)
        value += offset;
      if (value === 0 && offset == -12)
        value = 12;
      return padNumber(value, size, trim);
    };
  }
  function dateStrGetter(name, shortForm) {
    return function (date, formats) {
      var value = date['get' + name]();
      var get = uppercase(shortForm ? 'SHORT' + name : name);
      return formats[get][value];
    };
  }
  function timeZoneGetter(date) {
    var zone = -1 * date.getTimezoneOffset();
    var paddedZone = zone >= 0 ? '+' : '';
    paddedZone += padNumber(zone / 60, 2) + padNumber(Math.abs(zone % 60), 2);
    return paddedZone;
  }
  function ampmGetter(date, formats) {
    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
  }
  var DATE_FORMATS = {
      yyyy: dateGetter('FullYear', 4),
      yy: dateGetter('FullYear', 2, 0, true),
      y: dateGetter('FullYear', 1),
      MMMM: dateStrGetter('Month'),
      MMM: dateStrGetter('Month', true),
      MM: dateGetter('Month', 2, 1),
      M: dateGetter('Month', 1, 1),
      dd: dateGetter('Date', 2),
      d: dateGetter('Date', 1),
      HH: dateGetter('Hours', 2),
      H: dateGetter('Hours', 1),
      hh: dateGetter('Hours', 2, -12),
      h: dateGetter('Hours', 1, -12),
      mm: dateGetter('Minutes', 2),
      m: dateGetter('Minutes', 1),
      ss: dateGetter('Seconds', 2),
      s: dateGetter('Seconds', 1),
      EEEE: dateStrGetter('Day'),
      EEE: dateStrGetter('Day', true),
      a: ampmGetter,
      Z: timeZoneGetter
    };
  var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, NUMBER_STRING = /^\d+$/;
  dateFilter.$inject = ['$locale'];
  function dateFilter($locale) {
    var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    function jsonStringToDate(string) {
      var match;
      if (match = string.match(R_ISO8601_STR)) {
        var date = new Date(0), tzHour = 0, tzMin = 0;
        if (match[9]) {
          tzHour = int(match[9] + match[10]);
          tzMin = int(match[9] + match[11]);
        }
        date.setUTCFullYear(int(match[1]), int(match[2]) - 1, int(match[3]));
        date.setUTCHours(int(match[4] || 0) - tzHour, int(match[5] || 0) - tzMin, int(match[6] || 0), int(match[7] || 0));
        return date;
      }
      return string;
    }
    return function (date, format) {
      var text = '', parts = [], fn, match;
      format = format || 'mediumDate';
      format = $locale.DATETIME_FORMATS[format] || format;
      if (isString(date)) {
        if (NUMBER_STRING.test(date)) {
          date = int(date);
        } else {
          date = jsonStringToDate(date);
        }
      }
      if (isNumber(date)) {
        date = new Date(date);
      }
      if (!isDate(date)) {
        return date;
      }
      while (format) {
        match = DATE_FORMATS_SPLIT.exec(format);
        if (match) {
          parts = concat(parts, match, 1);
          format = parts.pop();
        } else {
          parts.push(format);
          format = null;
        }
      }
      forEach(parts, function (value) {
        fn = DATE_FORMATS[value];
        text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
      });
      return text;
    };
  }
  function jsonFilter() {
    return function (object) {
      return toJson(object, true);
    };
  }
  var lowercaseFilter = valueFn(lowercase);
  var uppercaseFilter = valueFn(uppercase);
  function limitToFilter() {
    return function (array, limit) {
      if (!(array instanceof Array))
        return array;
      limit = int(limit);
      var out = [], i, n;
      if (!array || !(array instanceof Array))
        return out;
      if (limit > array.length)
        limit = array.length;
      else if (limit < -array.length)
        limit = -array.length;
      if (limit > 0) {
        i = 0;
        n = limit;
      } else {
        i = array.length + limit;
        n = array.length;
      }
      for (; i < n; i++) {
        out.push(array[i]);
      }
      return out;
    };
  }
  orderByFilter.$inject = ['$parse'];
  function orderByFilter($parse) {
    return function (array, sortPredicate, reverseOrder) {
      if (!isArray(array))
        return array;
      if (!sortPredicate)
        return array;
      sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate];
      sortPredicate = map(sortPredicate, function (predicate) {
        var descending = false, get = predicate || identity;
        if (isString(predicate)) {
          if (predicate.charAt(0) == '+' || predicate.charAt(0) == '-') {
            descending = predicate.charAt(0) == '-';
            predicate = predicate.substring(1);
          }
          get = $parse(predicate);
        }
        return reverseComparator(function (a, b) {
          return compare(get(a), get(b));
        }, descending);
      });
      var arrayCopy = [];
      for (var i = 0; i < array.length; i++) {
        arrayCopy.push(array[i]);
      }
      return arrayCopy.sort(reverseComparator(comparator, reverseOrder));
      function comparator(o1, o2) {
        for (var i = 0; i < sortPredicate.length; i++) {
          var comp = sortPredicate[i](o1, o2);
          if (comp !== 0)
            return comp;
        }
        return 0;
      }
      function reverseComparator(comp, descending) {
        return toBoolean(descending) ? function (a, b) {
          return comp(b, a);
        } : comp;
      }
      function compare(v1, v2) {
        var t1 = typeof v1;
        var t2 = typeof v2;
        if (t1 == t2) {
          if (t1 == 'string')
            v1 = v1.toLowerCase();
          if (t1 == 'string')
            v2 = v2.toLowerCase();
          if (v1 === v2)
            return 0;
          return v1 < v2 ? -1 : 1;
        } else {
          return t1 < t2 ? -1 : 1;
        }
      }
    };
  }
  function ngDirective(directive) {
    if (isFunction(directive)) {
      directive = { link: directive };
    }
    directive.restrict = directive.restrict || 'AC';
    return valueFn(directive);
  }
  var htmlAnchorDirective = valueFn({
      restrict: 'E',
      compile: function (element, attr) {
        if (msie <= 8) {
          if (!attr.href && !attr.name) {
            attr.$set('href', '');
          }
          element.append(document.createComment('IE fix'));
        }
        return function (scope, element) {
          element.bind('click', function (event) {
            if (!element.attr('href')) {
              event.preventDefault();
            }
          });
        };
      }
    });
  var ngAttributeAliasDirectives = {};
  forEach(BOOLEAN_ATTR, function (propName, attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 100,
        compile: function () {
          return function (scope, element, attr) {
            scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
              attr.$set(attrName, !!value);
            });
          };
        }
      };
    };
  });
  forEach([
    'src',
    'href'
  ], function (attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 99,
        link: function (scope, element, attr) {
          attr.$observe(normalized, function (value) {
            if (!value)
              return;
            attr.$set(attrName, value);
            if (msie)
              element.prop(attrName, attr[attrName]);
          });
        }
      };
    };
  });
  var nullFormCtrl = {
      $addControl: noop,
      $removeControl: noop,
      $setValidity: noop,
      $setDirty: noop
    };
  FormController.$inject = [
    '$element',
    '$attrs',
    '$scope'
  ];
  function FormController(element, attrs) {
    var form = this, parentForm = element.parent().controller('form') || nullFormCtrl, invalidCount = 0, errors = form.$error = {};
    form.$name = attrs.name;
    form.$dirty = false;
    form.$pristine = true;
    form.$valid = true;
    form.$invalid = false;
    parentForm.$addControl(form);
    element.addClass(PRISTINE_CLASS);
    toggleValidCss(true);
    function toggleValidCss(isValid, validationErrorKey) {
      validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
      element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
    }
    form.$addControl = function (control) {
      if (control.$name && !form.hasOwnProperty(control.$name)) {
        form[control.$name] = control;
      }
    };
    form.$removeControl = function (control) {
      if (control.$name && form[control.$name] === control) {
        delete form[control.$name];
      }
      forEach(errors, function (queue, validationToken) {
        form.$setValidity(validationToken, true, control);
      });
    };
    form.$setValidity = function (validationToken, isValid, control) {
      var queue = errors[validationToken];
      if (isValid) {
        if (queue) {
          arrayRemove(queue, control);
          if (!queue.length) {
            invalidCount--;
            if (!invalidCount) {
              toggleValidCss(isValid);
              form.$valid = true;
              form.$invalid = false;
            }
            errors[validationToken] = false;
            toggleValidCss(true, validationToken);
            parentForm.$setValidity(validationToken, true, form);
          }
        }
      } else {
        if (!invalidCount) {
          toggleValidCss(isValid);
        }
        if (queue) {
          if (includes(queue, control))
            return;
        } else {
          errors[validationToken] = queue = [];
          invalidCount++;
          toggleValidCss(false, validationToken);
          parentForm.$setValidity(validationToken, false, form);
        }
        queue.push(control);
        form.$valid = false;
        form.$invalid = true;
      }
    };
    form.$setDirty = function () {
      element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
      form.$dirty = true;
      form.$pristine = false;
      parentForm.$setDirty();
    };
  }
  var formDirectiveFactory = function (isNgForm) {
    return [
      '$timeout',
      function ($timeout) {
        var formDirective = {
            name: 'form',
            restrict: 'E',
            controller: FormController,
            compile: function () {
              return {
                pre: function (scope, formElement, attr, controller) {
                  if (!attr.action) {
                    var preventDefaultListener = function (event) {
                      event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    };
                    addEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                    formElement.bind('$destroy', function () {
                      $timeout(function () {
                        removeEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                      }, 0, false);
                    });
                  }
                  var parentFormCtrl = formElement.parent().controller('form'), alias = attr.name || attr.ngForm;
                  if (alias) {
                    scope[alias] = controller;
                  }
                  if (parentFormCtrl) {
                    formElement.bind('$destroy', function () {
                      parentFormCtrl.$removeControl(controller);
                      if (alias) {
                        scope[alias] = undefined;
                      }
                      extend(controller, nullFormCtrl);
                    });
                  }
                }
              };
            }
          };
        return isNgForm ? extend(copy(formDirective), { restrict: 'EAC' }) : formDirective;
      }
    ];
  };
  var formDirective = formDirectiveFactory();
  var ngFormDirective = formDirectiveFactory(true);
  var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
  var inputType = {
      'text': textInputType,
      'number': numberInputType,
      'url': urlInputType,
      'email': emailInputType,
      'radio': radioInputType,
      'checkbox': checkboxInputType,
      'hidden': noop,
      'button': noop,
      'submit': noop,
      'reset': noop
    };
  function isEmpty(value) {
    return isUndefined(value) || value === '' || value === null || value !== value;
  }
  function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    var listener = function () {
      var value = trim(element.val());
      if (ctrl.$viewValue !== value) {
        scope.$apply(function () {
          ctrl.$setViewValue(value);
        });
      }
    };
    if ($sniffer.hasEvent('input')) {
      element.bind('input', listener);
    } else {
      var timeout;
      element.bind('keydown', function (event) {
        var key = event.keyCode;
        if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40)
          return;
        if (!timeout) {
          timeout = $browser.defer(function () {
            listener();
            timeout = null;
          });
        }
      });
      element.bind('change', listener);
    }
    ctrl.$render = function () {
      element.val(isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
    };
    var pattern = attr.ngPattern, patternValidator;
    var validate = function (regexp, value) {
      if (isEmpty(value) || regexp.test(value)) {
        ctrl.$setValidity('pattern', true);
        return value;
      } else {
        ctrl.$setValidity('pattern', false);
        return undefined;
      }
    };
    if (pattern) {
      if (pattern.match(/^\/(.*)\/$/)) {
        pattern = new RegExp(pattern.substr(1, pattern.length - 2));
        patternValidator = function (value) {
          return validate(pattern, value);
        };
      } else {
        patternValidator = function (value) {
          var patternObj = scope.$eval(pattern);
          if (!patternObj || !patternObj.test) {
            throw new Error('Expected ' + pattern + ' to be a RegExp but was ' + patternObj);
          }
          return validate(patternObj, value);
        };
      }
      ctrl.$formatters.push(patternValidator);
      ctrl.$parsers.push(patternValidator);
    }
    if (attr.ngMinlength) {
      var minlength = int(attr.ngMinlength);
      var minLengthValidator = function (value) {
        if (!isEmpty(value) && value.length < minlength) {
          ctrl.$setValidity('minlength', false);
          return undefined;
        } else {
          ctrl.$setValidity('minlength', true);
          return value;
        }
      };
      ctrl.$parsers.push(minLengthValidator);
      ctrl.$formatters.push(minLengthValidator);
    }
    if (attr.ngMaxlength) {
      var maxlength = int(attr.ngMaxlength);
      var maxLengthValidator = function (value) {
        if (!isEmpty(value) && value.length > maxlength) {
          ctrl.$setValidity('maxlength', false);
          return undefined;
        } else {
          ctrl.$setValidity('maxlength', true);
          return value;
        }
      };
      ctrl.$parsers.push(maxLengthValidator);
      ctrl.$formatters.push(maxLengthValidator);
    }
  }
  function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    ctrl.$parsers.push(function (value) {
      var empty = isEmpty(value);
      if (empty || NUMBER_REGEXP.test(value)) {
        ctrl.$setValidity('number', true);
        return value === '' ? null : empty ? value : parseFloat(value);
      } else {
        ctrl.$setValidity('number', false);
        return undefined;
      }
    });
    ctrl.$formatters.push(function (value) {
      return isEmpty(value) ? '' : '' + value;
    });
    if (attr.min) {
      var min = parseFloat(attr.min);
      var minValidator = function (value) {
        if (!isEmpty(value) && value < min) {
          ctrl.$setValidity('min', false);
          return undefined;
        } else {
          ctrl.$setValidity('min', true);
          return value;
        }
      };
      ctrl.$parsers.push(minValidator);
      ctrl.$formatters.push(minValidator);
    }
    if (attr.max) {
      var max = parseFloat(attr.max);
      var maxValidator = function (value) {
        if (!isEmpty(value) && value > max) {
          ctrl.$setValidity('max', false);
          return undefined;
        } else {
          ctrl.$setValidity('max', true);
          return value;
        }
      };
      ctrl.$parsers.push(maxValidator);
      ctrl.$formatters.push(maxValidator);
    }
    ctrl.$formatters.push(function (value) {
      if (isEmpty(value) || isNumber(value)) {
        ctrl.$setValidity('number', true);
        return value;
      } else {
        ctrl.$setValidity('number', false);
        return undefined;
      }
    });
  }
  function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var urlValidator = function (value) {
      if (isEmpty(value) || URL_REGEXP.test(value)) {
        ctrl.$setValidity('url', true);
        return value;
      } else {
        ctrl.$setValidity('url', false);
        return undefined;
      }
    };
    ctrl.$formatters.push(urlValidator);
    ctrl.$parsers.push(urlValidator);
  }
  function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var emailValidator = function (value) {
      if (isEmpty(value) || EMAIL_REGEXP.test(value)) {
        ctrl.$setValidity('email', true);
        return value;
      } else {
        ctrl.$setValidity('email', false);
        return undefined;
      }
    };
    ctrl.$formatters.push(emailValidator);
    ctrl.$parsers.push(emailValidator);
  }
  function radioInputType(scope, element, attr, ctrl) {
    if (isUndefined(attr.name)) {
      element.attr('name', nextUid());
    }
    element.bind('click', function () {
      if (element[0].checked) {
        scope.$apply(function () {
          ctrl.$setViewValue(attr.value);
        });
      }
    });
    ctrl.$render = function () {
      var value = attr.value;
      element[0].checked = value == ctrl.$viewValue;
    };
    attr.$observe('value', ctrl.$render);
  }
  function checkboxInputType(scope, element, attr, ctrl) {
    var trueValue = attr.ngTrueValue, falseValue = attr.ngFalseValue;
    if (!isString(trueValue))
      trueValue = true;
    if (!isString(falseValue))
      falseValue = false;
    element.bind('click', function () {
      scope.$apply(function () {
        ctrl.$setViewValue(element[0].checked);
      });
    });
    ctrl.$render = function () {
      element[0].checked = ctrl.$viewValue;
    };
    ctrl.$formatters.push(function (value) {
      return value === trueValue;
    });
    ctrl.$parsers.push(function (value) {
      return value ? trueValue : falseValue;
    });
  }
  var inputDirective = [
      '$browser',
      '$sniffer',
      function ($browser, $sniffer) {
        return {
          restrict: 'E',
          require: '?ngModel',
          link: function (scope, element, attr, ctrl) {
            if (ctrl) {
              (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser);
            }
          }
        };
      }
    ];
  var VALID_CLASS = 'ng-valid', INVALID_CLASS = 'ng-invalid', PRISTINE_CLASS = 'ng-pristine', DIRTY_CLASS = 'ng-dirty';
  var NgModelController = [
      '$scope',
      '$exceptionHandler',
      '$attrs',
      '$element',
      '$parse',
      function ($scope, $exceptionHandler, $attr, $element, $parse) {
        this.$viewValue = Number.NaN;
        this.$modelValue = Number.NaN;
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$pristine = true;
        this.$dirty = false;
        this.$valid = true;
        this.$invalid = false;
        this.$name = $attr.name;
        var ngModelGet = $parse($attr.ngModel), ngModelSet = ngModelGet.assign;
        if (!ngModelSet) {
          throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + $attr.ngModel + ' (' + startingTag($element) + ')');
        }
        this.$render = noop;
        var parentForm = $element.inheritedData('$formController') || nullFormCtrl, invalidCount = 0, $error = this.$error = {};
        $element.addClass(PRISTINE_CLASS);
        toggleValidCss(true);
        function toggleValidCss(isValid, validationErrorKey) {
          validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
          $element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
        }
        this.$setValidity = function (validationErrorKey, isValid) {
          if ($error[validationErrorKey] === !isValid)
            return;
          if (isValid) {
            if ($error[validationErrorKey])
              invalidCount--;
            if (!invalidCount) {
              toggleValidCss(true);
              this.$valid = true;
              this.$invalid = false;
            }
          } else {
            toggleValidCss(false);
            this.$invalid = true;
            this.$valid = false;
            invalidCount++;
          }
          $error[validationErrorKey] = !isValid;
          toggleValidCss(isValid, validationErrorKey);
          parentForm.$setValidity(validationErrorKey, isValid, this);
        };
        this.$setViewValue = function (value) {
          this.$viewValue = value;
          if (this.$pristine) {
            this.$dirty = true;
            this.$pristine = false;
            $element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
            parentForm.$setDirty();
          }
          forEach(this.$parsers, function (fn) {
            value = fn(value);
          });
          if (this.$modelValue !== value) {
            this.$modelValue = value;
            ngModelSet($scope, value);
            forEach(this.$viewChangeListeners, function (listener) {
              try {
                listener();
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          }
        };
        var ctrl = this;
        $scope.$watch(function ngModelWatch() {
          var value = ngModelGet($scope);
          if (ctrl.$modelValue !== value) {
            var formatters = ctrl.$formatters, idx = formatters.length;
            ctrl.$modelValue = value;
            while (idx--) {
              value = formatters[idx](value);
            }
            if (ctrl.$viewValue !== value) {
              ctrl.$viewValue = value;
              ctrl.$render();
            }
          }
        });
      }
    ];
  var ngModelDirective = function () {
    return {
      require: [
        'ngModel',
        '^?form'
      ],
      controller: NgModelController,
      link: function (scope, element, attr, ctrls) {
        var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
        formCtrl.$addControl(modelCtrl);
        element.bind('$destroy', function () {
          formCtrl.$removeControl(modelCtrl);
        });
      }
    };
  };
  var ngChangeDirective = valueFn({
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        ctrl.$viewChangeListeners.push(function () {
          scope.$eval(attr.ngChange);
        });
      }
    });
  var requiredDirective = function () {
    return {
      require: '?ngModel',
      link: function (scope, elm, attr, ctrl) {
        if (!ctrl)
          return;
        attr.required = true;
        var validator = function (value) {
          if (attr.required && (isEmpty(value) || value === false)) {
            ctrl.$setValidity('required', false);
            return;
          } else {
            ctrl.$setValidity('required', true);
            return value;
          }
        };
        ctrl.$formatters.push(validator);
        ctrl.$parsers.unshift(validator);
        attr.$observe('required', function () {
          validator(ctrl.$viewValue);
        });
      }
    };
  };
  var ngListDirective = function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        var match = /\/(.*)\//.exec(attr.ngList), separator = match && new RegExp(match[1]) || attr.ngList || ',';
        var parse = function (viewValue) {
          var list = [];
          if (viewValue) {
            forEach(viewValue.split(separator), function (value) {
              if (value)
                list.push(trim(value));
            });
          }
          return list;
        };
        ctrl.$parsers.push(parse);
        ctrl.$formatters.push(function (value) {
          if (isArray(value)) {
            return value.join(', ');
          }
          return undefined;
        });
      }
    };
  };
  var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/;
  var ngValueDirective = function () {
    return {
      priority: 100,
      compile: function (tpl, tplAttr) {
        if (CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)) {
          return function (scope, elm, attr) {
            attr.$set('value', scope.$eval(attr.ngValue));
          };
        } else {
          return function (scope, elm, attr) {
            scope.$watch(attr.ngValue, function valueWatchAction(value) {
              attr.$set('value', value, false);
            });
          };
        }
      }
    };
  };
  var ngBindDirective = ngDirective(function (scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.ngBind);
      scope.$watch(attr.ngBind, function ngBindWatchAction(value) {
        element.text(value == undefined ? '' : value);
      });
    });
  var ngBindTemplateDirective = [
      '$interpolate',
      function ($interpolate) {
        return function (scope, element, attr) {
          var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
          element.addClass('ng-binding').data('$binding', interpolateFn);
          attr.$observe('ngBindTemplate', function (value) {
            element.text(value);
          });
        };
      }
    ];
  var ngBindHtmlUnsafeDirective = [function () {
        return function (scope, element, attr) {
          element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
          scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
            element.html(value || '');
          });
        };
      }];
  function classDirective(name, selector) {
    name = 'ngClass' + name;
    return ngDirective(function (scope, element, attr) {
      var oldVal = undefined;
      scope.$watch(attr[name], ngClassWatchAction, true);
      attr.$observe('class', function (value) {
        var ngClass = scope.$eval(attr[name]);
        ngClassWatchAction(ngClass, ngClass);
      });
      if (name !== 'ngClass') {
        scope.$watch('$index', function ($index, old$index) {
          var mod = $index % 2;
          if (mod !== old$index % 2) {
            if (mod == selector) {
              addClass(scope.$eval(attr[name]));
            } else {
              removeClass(scope.$eval(attr[name]));
            }
          }
        });
      }
      function ngClassWatchAction(newVal) {
        if (selector === true || scope.$index % 2 === selector) {
          if (oldVal && newVal !== oldVal) {
            removeClass(oldVal);
          }
          addClass(newVal);
        }
        oldVal = newVal;
      }
      function removeClass(classVal) {
        if (isObject(classVal) && !isArray(classVal)) {
          classVal = map(classVal, function (v, k) {
            if (v)
              return k;
          });
        }
        element.removeClass(isArray(classVal) ? classVal.join(' ') : classVal);
      }
      function addClass(classVal) {
        if (isObject(classVal) && !isArray(classVal)) {
          classVal = map(classVal, function (v, k) {
            if (v)
              return k;
          });
        }
        if (classVal) {
          element.addClass(isArray(classVal) ? classVal.join(' ') : classVal);
        }
      }
    });
  }
  var ngClassDirective = classDirective('', true);
  var ngClassOddDirective = classDirective('Odd', 0);
  var ngClassEvenDirective = classDirective('Even', 1);
  var ngCloakDirective = ngDirective({
      compile: function (element, attr) {
        attr.$set('ngCloak', undefined);
        element.removeClass('ng-cloak');
      }
    });
  var ngControllerDirective = [function () {
        return {
          scope: true,
          controller: '@'
        };
      }];
  var ngCspDirective = [
      '$sniffer',
      function ($sniffer) {
        return {
          priority: 1000,
          compile: function () {
            $sniffer.csp = true;
          }
        };
      }
    ];
  var ngEventDirectives = {};
  forEach('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave'.split(' '), function (name) {
    var directiveName = directiveNormalize('ng-' + name);
    ngEventDirectives[directiveName] = [
      '$parse',
      function ($parse) {
        return function (scope, element, attr) {
          var fn = $parse(attr[directiveName]);
          element.bind(lowercase(name), function (event) {
            scope.$apply(function () {
              fn(scope, { $event: event });
            });
          });
        };
      }
    ];
  });
  var ngSubmitDirective = ngDirective(function (scope, element, attrs) {
      element.bind('submit', function () {
        scope.$apply(attrs.ngSubmit);
      });
    });
  var ngIncludeDirective = [
      '$http',
      '$templateCache',
      '$anchorScroll',
      '$compile',
      function ($http, $templateCache, $anchorScroll, $compile) {
        return {
          restrict: 'ECA',
          terminal: true,
          compile: function (element, attr) {
            var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || '', autoScrollExp = attr.autoscroll;
            return function (scope, element) {
              var changeCounter = 0, childScope;
              var clearContent = function () {
                if (childScope) {
                  childScope.$destroy();
                  childScope = null;
                }
                element.html('');
              };
              scope.$watch(srcExp, function ngIncludeWatchAction(src) {
                var thisChangeId = ++changeCounter;
                if (src) {
                  $http.get(src, { cache: $templateCache }).success(function (response) {
                    if (thisChangeId !== changeCounter)
                      return;
                    if (childScope)
                      childScope.$destroy();
                    childScope = scope.$new();
                    element.html(response);
                    $compile(element.contents())(childScope);
                    if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                      $anchorScroll();
                    }
                    childScope.$emit('$includeContentLoaded');
                    scope.$eval(onloadExp);
                  }).error(function () {
                    if (thisChangeId === changeCounter)
                      clearContent();
                  });
                } else
                  clearContent();
              });
            };
          }
        };
      }
    ];
  var ngInitDirective = ngDirective({
      compile: function () {
        return {
          pre: function (scope, element, attrs) {
            scope.$eval(attrs.ngInit);
          }
        };
      }
    });
  var ngNonBindableDirective = ngDirective({
      terminal: true,
      priority: 1000
    });
  var ngPluralizeDirective = [
      '$locale',
      '$interpolate',
      function ($locale, $interpolate) {
        var BRACE = /{}/g;
        return {
          restrict: 'EA',
          link: function (scope, element, attr) {
            var numberExp = attr.count, whenExp = element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp), whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol();
            forEach(whens, function (expression, key) {
              whensExpFns[key] = $interpolate(expression.replace(BRACE, startSymbol + numberExp + '-' + offset + endSymbol));
            });
            scope.$watch(function ngPluralizeWatch() {
              var value = parseFloat(scope.$eval(numberExp));
              if (!isNaN(value)) {
                if (!whens[value])
                  value = $locale.pluralCat(value - offset);
                return whensExpFns[value](scope, element, true);
              } else {
                return '';
              }
            }, function ngPluralizeWatchAction(newVal) {
              element.text(newVal);
            });
          }
        };
      }
    ];
  var ngRepeatDirective = ngDirective({
      transclude: 'element',
      priority: 1000,
      terminal: true,
      compile: function (element, attr, linker) {
        return function (scope, iterStartElement, attr) {
          var expression = attr.ngRepeat;
          var match = expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/), lhs, rhs, valueIdent, keyIdent;
          if (!match) {
            throw Error('Expected ngRepeat in form of \'_item_ in _collection_\' but got \'' + expression + '\'.');
          }
          lhs = match[1];
          rhs = match[2];
          match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
          if (!match) {
            throw Error('\'item\' in \'item in collection\' should be identifier or (key, value) but got \'' + lhs + '\'.');
          }
          valueIdent = match[3] || match[1];
          keyIdent = match[2];
          var lastOrder = new HashQueueMap();
          scope.$watch(function ngRepeatWatch(scope) {
            var index, length, collection = scope.$eval(rhs), cursor = iterStartElement, nextOrder = new HashQueueMap(), arrayLength, childScope, key, value, array, last;
            if (!isArray(collection)) {
              array = [];
              for (key in collection) {
                if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                  array.push(key);
                }
              }
              array.sort();
            } else {
              array = collection || [];
            }
            arrayLength = array.length;
            for (index = 0, length = array.length; index < length; index++) {
              key = collection === array ? index : array[index];
              value = collection[key];
              last = lastOrder.shift(value);
              if (last) {
                childScope = last.scope;
                nextOrder.push(value, last);
                if (index === last.index) {
                  cursor = last.element;
                } else {
                  last.index = index;
                  cursor.after(last.element);
                  cursor = last.element;
                }
              } else {
                childScope = scope.$new();
              }
              childScope[valueIdent] = value;
              if (keyIdent)
                childScope[keyIdent] = key;
              childScope.$index = index;
              childScope.$first = index === 0;
              childScope.$last = index === arrayLength - 1;
              childScope.$middle = !(childScope.$first || childScope.$last);
              if (!last) {
                linker(childScope, function (clone) {
                  cursor.after(clone);
                  last = {
                    scope: childScope,
                    element: cursor = clone,
                    index: index
                  };
                  nextOrder.push(value, last);
                });
              }
            }
            for (key in lastOrder) {
              if (lastOrder.hasOwnProperty(key)) {
                array = lastOrder[key];
                while (array.length) {
                  value = array.pop();
                  value.element.remove();
                  value.scope.$destroy();
                }
              }
            }
            lastOrder = nextOrder;
          });
        };
      }
    });
  var ngShowDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
        element.css('display', toBoolean(value) ? '' : 'none');
      });
    });
  var ngHideDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
        element.css('display', toBoolean(value) ? 'none' : '');
      });
    });
  var ngStyleDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles) {
        if (oldStyles && newStyles !== oldStyles) {
          forEach(oldStyles, function (val, style) {
            element.css(style, '');
          });
        }
        if (newStyles)
          element.css(newStyles);
      }, true);
    });
  var NG_SWITCH = 'ng-switch';
  var ngSwitchDirective = valueFn({
      restrict: 'EA',
      require: 'ngSwitch',
      controller: [
        '$scope',
        function ngSwitchController() {
          this.cases = {};
        }
      ],
      link: function (scope, element, attr, ctrl) {
        var watchExpr = attr.ngSwitch || attr.on, selectedTransclude, selectedElement, selectedScope;
        scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
          if (selectedElement) {
            selectedScope.$destroy();
            selectedElement.remove();
            selectedElement = selectedScope = null;
          }
          if (selectedTransclude = ctrl.cases['!' + value] || ctrl.cases['?']) {
            scope.$eval(attr.change);
            selectedScope = scope.$new();
            selectedTransclude(selectedScope, function (caseElement) {
              selectedElement = caseElement;
              element.append(caseElement);
            });
          }
        });
      }
    });
  var ngSwitchWhenDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['!' + attrs.ngSwitchWhen] = transclude;
        };
      }
    });
  var ngSwitchDefaultDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['?'] = transclude;
        };
      }
    });
  var ngTranscludeDirective = ngDirective({
      controller: [
        '$transclude',
        '$element',
        function ($transclude, $element) {
          $transclude(function (clone) {
            $element.append(clone);
          });
        }
      ]
    });
  var ngViewDirective = [
      '$http',
      '$templateCache',
      '$route',
      '$anchorScroll',
      '$compile',
      '$controller',
      function ($http, $templateCache, $route, $anchorScroll, $compile, $controller) {
        return {
          restrict: 'ECA',
          terminal: true,
          link: function (scope, element, attr) {
            var lastScope, onloadExp = attr.onload || '';
            scope.$on('$routeChangeSuccess', update);
            update();
            function destroyLastScope() {
              if (lastScope) {
                lastScope.$destroy();
                lastScope = null;
              }
            }
            function clearContent() {
              element.html('');
              destroyLastScope();
            }
            function update() {
              var locals = $route.current && $route.current.locals, template = locals && locals.$template;
              if (template) {
                element.html(template);
                destroyLastScope();
                var link = $compile(element.contents()), current = $route.current, controller;
                lastScope = current.scope = scope.$new();
                if (current.controller) {
                  locals.$scope = lastScope;
                  controller = $controller(current.controller, locals);
                  element.children().data('$ngControllerController', controller);
                }
                link(lastScope);
                lastScope.$emit('$viewContentLoaded');
                lastScope.$eval(onloadExp);
                $anchorScroll();
              } else {
                clearContent();
              }
            }
          }
        };
      }
    ];
  var scriptDirective = [
      '$templateCache',
      function ($templateCache) {
        return {
          restrict: 'E',
          terminal: true,
          compile: function (element, attr) {
            if (attr.type == 'text/ng-template') {
              var templateUrl = attr.id, text = element[0].text;
              $templateCache.put(templateUrl, text);
            }
          }
        };
      }
    ];
  var ngOptionsDirective = valueFn({ terminal: true });
  var selectDirective = [
      '$compile',
      '$parse',
      function ($compile, $parse) {
        var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/, nullModelCtrl = { $setViewValue: noop };
        return {
          restrict: 'E',
          require: [
            'select',
            '?ngModel'
          ],
          controller: [
            '$element',
            '$scope',
            '$attrs',
            function ($element, $scope, $attrs) {
              var self = this, optionsMap = {}, ngModelCtrl = nullModelCtrl, nullOption, unknownOption;
              self.databound = $attrs.ngModel;
              self.init = function (ngModelCtrl_, nullOption_, unknownOption_) {
                ngModelCtrl = ngModelCtrl_;
                nullOption = nullOption_;
                unknownOption = unknownOption_;
              };
              self.addOption = function (value) {
                optionsMap[value] = true;
                if (ngModelCtrl.$viewValue == value) {
                  $element.val(value);
                  if (unknownOption.parent())
                    unknownOption.remove();
                }
              };
              self.removeOption = function (value) {
                if (this.hasOption(value)) {
                  delete optionsMap[value];
                  if (ngModelCtrl.$viewValue == value) {
                    this.renderUnknownOption(value);
                  }
                }
              };
              self.renderUnknownOption = function (val) {
                var unknownVal = '? ' + hashKey(val) + ' ?';
                unknownOption.val(unknownVal);
                $element.prepend(unknownOption);
                $element.val(unknownVal);
                unknownOption.prop('selected', true);
              };
              self.hasOption = function (value) {
                return optionsMap.hasOwnProperty(value);
              };
              $scope.$on('$destroy', function () {
                self.renderUnknownOption = noop;
              });
            }
          ],
          link: function (scope, element, attr, ctrls) {
            if (!ctrls[1])
              return;
            var selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = false, emptyOption, optionTemplate = jqLite(document.createElement('option')), optGroupTemplate = jqLite(document.createElement('optgroup')), unknownOption = optionTemplate.clone();
            for (var i = 0, children = element.children(), ii = children.length; i < ii; i++) {
              if (children[i].value == '') {
                emptyOption = nullOption = children.eq(i);
                break;
              }
            }
            selectCtrl.init(ngModelCtrl, nullOption, unknownOption);
            if (multiple && (attr.required || attr.ngRequired)) {
              var requiredValidator = function (value) {
                ngModelCtrl.$setValidity('required', !attr.required || value && value.length);
                return value;
              };
              ngModelCtrl.$parsers.push(requiredValidator);
              ngModelCtrl.$formatters.unshift(requiredValidator);
              attr.$observe('required', function () {
                requiredValidator(ngModelCtrl.$viewValue);
              });
            }
            if (optionsExp)
              Options(scope, element, ngModelCtrl);
            else if (multiple)
              Multiple(scope, element, ngModelCtrl);
            else
              Single(scope, element, ngModelCtrl, selectCtrl);
            function Single(scope, selectElement, ngModelCtrl, selectCtrl) {
              ngModelCtrl.$render = function () {
                var viewValue = ngModelCtrl.$viewValue;
                if (selectCtrl.hasOption(viewValue)) {
                  if (unknownOption.parent())
                    unknownOption.remove();
                  selectElement.val(viewValue);
                  if (viewValue === '')
                    emptyOption.prop('selected', true);
                } else {
                  if (isUndefined(viewValue) && emptyOption) {
                    selectElement.val('');
                  } else {
                    selectCtrl.renderUnknownOption(viewValue);
                  }
                }
              };
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  if (unknownOption.parent())
                    unknownOption.remove();
                  ngModelCtrl.$setViewValue(selectElement.val());
                });
              });
            }
            function Multiple(scope, selectElement, ctrl) {
              var lastView;
              ctrl.$render = function () {
                var items = new HashMap(ctrl.$viewValue);
                forEach(selectElement.find('option'), function (option) {
                  option.selected = isDefined(items.get(option.value));
                });
              };
              scope.$watch(function selectMultipleWatch() {
                if (!equals(lastView, ctrl.$viewValue)) {
                  lastView = copy(ctrl.$viewValue);
                  ctrl.$render();
                }
              });
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  var array = [];
                  forEach(selectElement.find('option'), function (option) {
                    if (option.selected) {
                      array.push(option.value);
                    }
                  });
                  ctrl.$setViewValue(array);
                });
              });
            }
            function Options(scope, selectElement, ctrl) {
              var match;
              if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
                throw Error('Expected ngOptions in form of \'_select_ (as _label_)? for (_key_,)?_value_ in _collection_\'' + ' but got \'' + optionsExp + '\'.');
              }
              var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]), optionGroupsCache = [[{
                      element: selectElement,
                      label: ''
                    }]];
              if (nullOption) {
                $compile(nullOption)(scope);
                nullOption.removeClass('ng-scope');
                nullOption.remove();
              }
              selectElement.html('');
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  var optionGroup, collection = valuesFn(scope) || [], locals = {}, key, value, optionElement, index, groupIndex, length, groupLength;
                  if (multiple) {
                    value = [];
                    for (groupIndex = 0, groupLength = optionGroupsCache.length; groupIndex < groupLength; groupIndex++) {
                      optionGroup = optionGroupsCache[groupIndex];
                      for (index = 1, length = optionGroup.length; index < length; index++) {
                        if ((optionElement = optionGroup[index].element)[0].selected) {
                          key = optionElement.val();
                          if (keyName)
                            locals[keyName] = key;
                          locals[valueName] = collection[key];
                          value.push(valueFn(scope, locals));
                        }
                      }
                    }
                  } else {
                    key = selectElement.val();
                    if (key == '?') {
                      value = undefined;
                    } else if (key == '') {
                      value = null;
                    } else {
                      locals[valueName] = collection[key];
                      if (keyName)
                        locals[keyName] = key;
                      value = valueFn(scope, locals);
                    }
                  }
                  ctrl.$setViewValue(value);
                });
              });
              ctrl.$render = render;
              scope.$watch(render);
              function render() {
                var optionGroups = { '': [] }, optionGroupNames = [''], optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, modelValue = ctrl.$modelValue, values = valuesFn(scope) || [], keys = keyName ? sortedKeys(values) : values, groupLength, length, groupIndex, index, locals = {}, selected, selectedSet = false, lastElement, element, label;
                if (multiple) {
                  selectedSet = new HashMap(modelValue);
                } else if (modelValue === null || nullOption) {
                  optionGroups[''].push({
                    selected: modelValue === null,
                    id: '',
                    label: ''
                  });
                  selectedSet = true;
                }
                for (index = 0; length = keys.length, index < length; index++) {
                  locals[valueName] = values[keyName ? locals[keyName] = keys[index] : index];
                  optionGroupName = groupByFn(scope, locals) || '';
                  if (!(optionGroup = optionGroups[optionGroupName])) {
                    optionGroup = optionGroups[optionGroupName] = [];
                    optionGroupNames.push(optionGroupName);
                  }
                  if (multiple) {
                    selected = selectedSet.remove(valueFn(scope, locals)) != undefined;
                  } else {
                    selected = modelValue === valueFn(scope, locals);
                    selectedSet = selectedSet || selected;
                  }
                  label = displayFn(scope, locals);
                  label = label === undefined ? '' : label;
                  optionGroup.push({
                    id: keyName ? keys[index] : index,
                    label: label,
                    selected: selected
                  });
                }
                if (!multiple && !selectedSet) {
                  optionGroups[''].unshift({
                    id: '?',
                    label: '',
                    selected: true
                  });
                }
                for (groupIndex = 0, groupLength = optionGroupNames.length; groupIndex < groupLength; groupIndex++) {
                  optionGroupName = optionGroupNames[groupIndex];
                  optionGroup = optionGroups[optionGroupName];
                  if (optionGroupsCache.length <= groupIndex) {
                    existingParent = {
                      element: optGroupTemplate.clone().attr('label', optionGroupName),
                      label: optionGroup.label
                    };
                    existingOptions = [existingParent];
                    optionGroupsCache.push(existingOptions);
                    selectElement.append(existingParent.element);
                  } else {
                    existingOptions = optionGroupsCache[groupIndex];
                    existingParent = existingOptions[0];
                    if (existingParent.label != optionGroupName) {
                      existingParent.element.attr('label', existingParent.label = optionGroupName);
                    }
                  }
                  lastElement = null;
                  for (index = 0, length = optionGroup.length; index < length; index++) {
                    option = optionGroup[index];
                    if (existingOption = existingOptions[index + 1]) {
                      lastElement = existingOption.element;
                      if (existingOption.label !== option.label) {
                        lastElement.text(existingOption.label = option.label);
                      }
                      if (existingOption.id !== option.id) {
                        lastElement.val(existingOption.id = option.id);
                      }
                      if (existingOption.element.selected !== option.selected) {
                        lastElement.prop('selected', existingOption.selected = option.selected);
                      }
                    } else {
                      if (option.id === '' && nullOption) {
                        element = nullOption;
                      } else {
                        (element = optionTemplate.clone()).val(option.id).attr('selected', option.selected).text(option.label);
                      }
                      existingOptions.push(existingOption = {
                        element: element,
                        label: option.label,
                        id: option.id,
                        selected: option.selected
                      });
                      if (lastElement) {
                        lastElement.after(element);
                      } else {
                        existingParent.element.append(element);
                      }
                      lastElement = element;
                    }
                  }
                  index++;
                  while (existingOptions.length > index) {
                    existingOptions.pop().element.remove();
                  }
                }
                while (optionGroupsCache.length > groupIndex) {
                  optionGroupsCache.pop()[0].element.remove();
                }
              }
            }
          }
        };
      }
    ];
  var optionDirective = [
      '$interpolate',
      function ($interpolate) {
        var nullSelectCtrl = {
            addOption: noop,
            removeOption: noop
          };
        return {
          restrict: 'E',
          priority: 100,
          compile: function (element, attr) {
            if (isUndefined(attr.value)) {
              var interpolateFn = $interpolate(element.text(), true);
              if (!interpolateFn) {
                attr.$set('value', element.text());
              }
            }
            return function (scope, element, attr) {
              var selectCtrlName = '$selectController', parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
              if (selectCtrl && selectCtrl.databound) {
                element.prop('selected', false);
              } else {
                selectCtrl = nullSelectCtrl;
              }
              if (interpolateFn) {
                scope.$watch(interpolateFn, function interpolateWatchAction(newVal, oldVal) {
                  attr.$set('value', newVal);
                  if (newVal !== oldVal)
                    selectCtrl.removeOption(oldVal);
                  selectCtrl.addOption(newVal);
                });
              } else {
                selectCtrl.addOption(attr.value);
              }
              element.bind('$destroy', function () {
                selectCtrl.removeOption(attr.value);
              });
            };
          }
        };
      }
    ];
  var styleDirective = valueFn({
      restrict: 'E',
      terminal: true
    });
  bindJQuery();
  publishExternalAPI(angular);
  jqLite(document).ready(function () {
    angularInit(document, bootstrap);
  });
}(window, document));
angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none;}ng\\:form{display:block;}</style>');
(function (window, angular, undefined) {
  'use strict';
  var $sanitize = function (html) {
    var buf = [];
    htmlParser(html, htmlSanitizeWriter(buf));
    return buf.join('');
  };
  var START_TAG_REGEXP = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, END_TAG_REGEXP = /^<\s*\/\s*([\w:-]+)[^>]*>/, ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, BEGIN_TAG_REGEXP = /^</, BEGING_END_TAGE_REGEXP = /^<\s*\//, COMMENT_REGEXP = /<!--(.*?)-->/g, CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g, URI_REGEXP = /^((ftp|https?):\/\/|mailto:|#)/, NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;
  var voidElements = makeMap('area,br,col,hr,img,wbr');
  var optionalEndTagBlockElements = makeMap('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'), optionalEndTagInlineElements = makeMap('rp,rt'), optionalEndTagElements = angular.extend({}, optionalEndTagInlineElements, optionalEndTagBlockElements);
  var blockElements = angular.extend({}, optionalEndTagBlockElements, makeMap('address,article,aside,' + 'blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,' + 'header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul'));
  var inlineElements = angular.extend({}, optionalEndTagInlineElements, makeMap('a,abbr,acronym,b,bdi,bdo,' + 'big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,' + 'span,strike,strong,sub,sup,time,tt,u,var'));
  var specialElements = makeMap('script,style');
  var validElements = angular.extend({}, voidElements, blockElements, inlineElements, optionalEndTagElements);
  var uriAttrs = makeMap('background,cite,href,longdesc,src,usemap');
  var validAttrs = angular.extend({}, uriAttrs, makeMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' + 'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' + 'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' + 'scope,scrolling,shape,span,start,summary,target,title,type,' + 'valign,value,vspace,width'));
  function makeMap(str) {
    var obj = {}, items = str.split(','), i;
    for (i = 0; i < items.length; i++)
      obj[items[i]] = true;
    return obj;
  }
  function htmlParser(html, handler) {
    var index, chars, match, stack = [], last = html;
    stack.last = function () {
      return stack[stack.length - 1];
    };
    while (html) {
      chars = true;
      if (!stack.last() || !specialElements[stack.last()]) {
        if (html.indexOf('<!--') === 0) {
          index = html.indexOf('-->');
          if (index >= 0) {
            if (handler.comment)
              handler.comment(html.substring(4, index));
            html = html.substring(index + 3);
            chars = false;
          }
        } else if (BEGING_END_TAGE_REGEXP.test(html)) {
          match = html.match(END_TAG_REGEXP);
          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(END_TAG_REGEXP, parseEndTag);
            chars = false;
          }
        } else if (BEGIN_TAG_REGEXP.test(html)) {
          match = html.match(START_TAG_REGEXP);
          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(START_TAG_REGEXP, parseStartTag);
            chars = false;
          }
        }
        if (chars) {
          index = html.indexOf('<');
          var text = index < 0 ? html : html.substring(0, index);
          html = index < 0 ? '' : html.substring(index);
          if (handler.chars)
            handler.chars(decodeEntities(text));
        }
      } else {
        html = html.replace(new RegExp('(.*)<\\s*\\/\\s*' + stack.last() + '[^>]*>', 'i'), function (all, text) {
          text = text.replace(COMMENT_REGEXP, '$1').replace(CDATA_REGEXP, '$1');
          if (handler.chars)
            handler.chars(decodeEntities(text));
          return '';
        });
        parseEndTag('', stack.last());
      }
      if (html == last) {
        throw 'Parse Error: ' + html;
      }
      last = html;
    }
    parseEndTag();
    function parseStartTag(tag, tagName, rest, unary) {
      tagName = angular.lowercase(tagName);
      if (blockElements[tagName]) {
        while (stack.last() && inlineElements[stack.last()]) {
          parseEndTag('', stack.last());
        }
      }
      if (optionalEndTagElements[tagName] && stack.last() == tagName) {
        parseEndTag('', tagName);
      }
      unary = voidElements[tagName] || !!unary;
      if (!unary)
        stack.push(tagName);
      var attrs = {};
      rest.replace(ATTR_REGEXP, function (match, name, doubleQuotedValue, singleQoutedValue, unqoutedValue) {
        var value = doubleQuotedValue || singleQoutedValue || unqoutedValue || '';
        attrs[name] = decodeEntities(value);
      });
      if (handler.start)
        handler.start(tagName, attrs, unary);
    }
    function parseEndTag(tag, tagName) {
      var pos = 0, i;
      tagName = angular.lowercase(tagName);
      if (tagName)
        for (pos = stack.length - 1; pos >= 0; pos--)
          if (stack[pos] == tagName)
            break;
      if (pos >= 0) {
        for (i = stack.length - 1; i >= pos; i--)
          if (handler.end)
            handler.end(stack[i]);
        stack.length = pos;
      }
    }
  }
  var hiddenPre = document.createElement('pre');
  function decodeEntities(value) {
    hiddenPre.innerHTML = value.replace(/</g, '&lt;');
    return hiddenPre.innerText || hiddenPre.textContent || '';
  }
  function encodeEntities(value) {
    return value.replace(/&/g, '&amp;').replace(NON_ALPHANUMERIC_REGEXP, function (value) {
      return '&#' + value.charCodeAt(0) + ';';
    }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function htmlSanitizeWriter(buf) {
    var ignore = false;
    var out = angular.bind(buf, buf.push);
    return {
      start: function (tag, attrs, unary) {
        tag = angular.lowercase(tag);
        if (!ignore && specialElements[tag]) {
          ignore = tag;
        }
        if (!ignore && validElements[tag] == true) {
          out('<');
          out(tag);
          angular.forEach(attrs, function (value, key) {
            var lkey = angular.lowercase(key);
            if (validAttrs[lkey] == true && (uriAttrs[lkey] !== true || value.match(URI_REGEXP))) {
              out(' ');
              out(key);
              out('="');
              out(encodeEntities(value));
              out('"');
            }
          });
          out(unary ? '/>' : '>');
        }
      },
      end: function (tag) {
        tag = angular.lowercase(tag);
        if (!ignore && validElements[tag] == true) {
          out('</');
          out(tag);
          out('>');
        }
        if (tag == ignore) {
          ignore = false;
        }
      },
      chars: function (chars) {
        if (!ignore) {
          out(encodeEntities(chars));
        }
      }
    };
  }
  angular.module('ngSanitize', []).value('$sanitize', $sanitize);
  angular.module('ngSanitize').directive('ngBindHtml', [
    '$sanitize',
    function ($sanitize) {
      return function (scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.ngBindHtml);
        scope.$watch(attr.ngBindHtml, function ngBindHtmlWatchAction(value) {
          value = $sanitize(value);
          element.html(value || '');
        });
      };
    }
  ]);
  angular.module('ngSanitize').filter('linky', function () {
    var LINKY_URL_REGEXP = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]/, MAILTO_REGEXP = /^mailto:/;
    return function (text) {
      if (!text)
        return text;
      var match;
      var raw = text;
      var html = [];
      var writer = htmlSanitizeWriter(html);
      var url;
      var i;
      while (match = raw.match(LINKY_URL_REGEXP)) {
        url = match[0];
        if (match[2] == match[3])
          url = 'mailto:' + url;
        i = match.index;
        writer.chars(raw.substr(0, i));
        writer.start('a', { href: url });
        writer.chars(match[0].replace(MAILTO_REGEXP, ''));
        writer.end('a');
        raw = raw.substring(i + match[0].length);
      }
      writer.chars(raw);
      return html.join('');
    };
  });
}(window, window.angular));
'use strict';
$.mobile.ajaxEnabled = false;
$.mobile.linkBindingEnabled = false;
$.mobile.hashListeningEnabled = false;
$.mobile.pushStateEnabled = false;
$('#menu-panel a').on('click', function () {
  $('#menu-panel').panel('close');
});
angular.module('aerogearJournalApp', ['ngSanitize']).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/notes', {
      templateUrl: 'views/notes.html',
      controller: 'NotesCtrl'
    }).when('/notes/:pageNum', {
      templateUrl: 'views/notes.html',
      controller: 'NotesCtrl'
    }).when('/note', {
      templateUrl: 'views/addNote.html',
      controller: 'AddNoteCtrl'
    }).when('/note/:noteId', {
      templateUrl: 'views/addNote.html',
      controller: 'AddNoteCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
angular.module('aerogearJournalApp').controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.$on('$routeChangeStart', function () {
      $('#mainContent').hide();
    });
  }
]);
'use strict';
angular.module('aerogearJournalApp').directive('jqueryMobile', function () {
  return function ($scope, el) {
    $scope.$on('$optimisticRenderComplete', function () {
      el.trigger('create');
      $('#mainContent').fadeIn();
    });
  };
});
'use strict';
angular.module('aerogearJournalApp').factory('dataService', [
  '$rootScope',
  function ($rootScope) {
    return {
      notePipe: AeroGear.Pipeline({
        name: 'notes',
        settings: {
          baseURL: 'http://localhost:8080/aerogear-journal/',
          pageConfig: true
        }
      }).pipes.notes,
      noteStore: AeroGear.DataManager({
        name: 'notes',
        type: 'SessionLocal',
        settings: { storageType: 'localStorage' }
      }).stores.notes,
      notifier: AeroGear.Notifier({
        name: 'noteNotifier',
        settings: {
          autoConnect: true,
          channels: [{
              address: 'org.aerogear.messaging',
              callback: function (message) {
                var msg, popup = $('#newNoteMessage').popup();
                if (message.text === 'add') {
                  msg = 'New note added';
                }
                if (message.text === 'delete') {
                  msg = 'Note removed';
                }
                if (message.text === 'update') {
                  msg = 'Note updated';
                }
                popup.html('<p>' + msg + ' - <a href=\'#/notes\'>View Notes</a></p>');
                popup.popup('open');
                setTimeout(function () {
                  popup.popup('close');
                }, 3000);
                $rootScope.$broadcast('updateNotes');
              }
            }],
          connectURL: 'http://localhost:7777/eventbus',
          onConnect: function () {
            console.log('Connected');
          },
          onDisconnect: function () {
            console.log('Disconnected');
          },
          onConnectError: function () {
            console.log('Connect Error');
          }
        }
      }).clients.noteNotifier
    };
  }
]);
'use strict';
angular.module('aerogearJournalApp').controller('NotesCtrl', [
  '$scope',
  '$filter',
  '$location',
  '$routeParams',
  'dataService',
  function ($scope, $filter, $location, $routeParams, dataService) {
    $scope.filter = $filter;
    $scope.search = {};
    $scope.currentPage = parseInt($routeParams.pageNum, 10) || 0;
    $scope.pageSize = 6;
    $scope.gridClass = '';
    $scope.pageRange = [];
    $scope.numberOfPages = 0;
    $scope.getNumberOfPages = function (dataLength) {
      var result = Math.ceil(dataLength / $scope.pageSize);
      return result === 0 ? 1 : result;
    };
    var notePipe = dataService.notePipe;
    var noteStore = dataService.noteStore;
    $scope.performSearch = function () {
      $scope.showLoader = true;
      notePipe.read({
        offsetValue: $scope.currentPage * $scope.pageSize,
        limitValue: $scope.pageSize,
        success: function (data) {
          noteStore.save(data, true);
          $scope.searchResults = data;
          processLayout();
          $scope.$apply(function () {
            $scope.$emit('$viewContentLoaded');
          });
          notePipe.read({
            paging: false,
            success: function (data) {
              $scope.numberOfPages = $scope.getNumberOfPages(data.length);
              $scope.pageRange = [];
              for (var i = 0; i < $scope.numberOfPages; i++) {
                $scope.pageRange.push(i);
              }
              $scope.showLoader = false;
              $scope.$apply();
            }
          });
        }
      });
    };
    $scope.previous = function () {
      if ($scope.currentPage > 0) {
        $location.path('notes/' + ($scope.currentPage - 1));
      }
    };
    $scope.next = function () {
      if ($scope.currentPage < $scope.numberOfPages - 1) {
        $location.path('notes/' + ($scope.currentPage + 1));
      }
    };
    $scope.filterSearchResults = function (result) {
      var flag = true;
      for (var key in $scope.search) {
        if ($scope.search.hasOwnProperty(key)) {
          var expected = $scope.search[key];
          if (expected === null || expected === '') {
            continue;
          }
          var actual = result[key];
          if (angular.isObject(expected)) {
            flag = flag && angular.equals(expected, actual);
          } else {
            flag = flag && actual.toString().indexOf(expected.toString()) !== -1;
          }
          if (flag === false) {
            return false;
          }
        }
      }
      return true;
    };
    $scope.remove = function (noteId) {
      notePipe.remove(noteId, {
        success: function () {
          $scope.performSearch();
        }
      });
    };
    $scope.edit = function (noteId) {
      $location.path('note/' + noteId);
    };
    $scope.showHideNoteMenu = function (note) {
      var current = $scope['note-menu-' + note.id];
      $scope['note-menu-' + note.id] = !current;
    };
    $scope.$on('updateNotes', function () {
      $('#mainContent').hide();
      $scope.performSearch();
    });
    $scope.$on('$routeChangeStart', function () {
      $('#mainContent').hide();
    });
    $scope.performSearch();
    function processLayout() {
      if ($scope.pageSize % 2 === 0 && $scope.searchResults.length > 1) {
        $scope.gridClass = 'ui-grid-a';
      } else if ($scope.pageSize % 3 === 0 && $scope.searchResults.length > 2) {
        $scope.gridClass = 'ui-grid-b';
      }
    }
  }
]);
'use strict';
angular.module('aerogearJournalApp').controller('AddNoteCtrl', [
  '$scope',
  '$location',
  '$routeParams',
  'dataService',
  function ($scope, $location, $routeParams, dataService) {
    if ($routeParams.noteId) {
      $scope.note = dataService.noteStore.read($routeParams.noteId * 1)[0];
    }
    $scope.save = function () {
      dataService.notePipe.save($scope.note);
    };
    $scope.cancel = function () {
      $location.path('notes');
    };
    $scope.$on('$routeChangeStart', function () {
      $('#mainContent').hide();
    });
  }
]);
'use strict';
angular.module('aerogearJournalApp').directive('notePageSwipe', function () {
  return function ($scope, el) {
    el.on('swipeleft', function () {
      $scope.$apply(function () {
        $scope.next();
      });
    });
    el.on('swiperight', function () {
      $scope.$apply(function () {
        $scope.previous();
      });
    });
  };
});
'use strict';
angular.module('aerogearJournalApp').filter('newline', function () {
  return function (input) {
    return input.replace(/\n/g, '<br/>');
  };
});