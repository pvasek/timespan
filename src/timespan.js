(function () {

    var root = this;

    var TimeSpan = function (totalMs) {

        this.format = function(format) {

        };

        this.totalMiliseconds = function() {
            return totalMs;
        }

        return this;
    }

    function parse(value, format) {
        if (value.length != format.length)
            return null;

        var tmp = {};
        for (var i = 0; i < value.length; i++) {
            var tmpl = format.charAt(i);
            var ch = value.charAt(i);
            if (tmpl === 'h' || tmpl === 'm' || tmpl === 's' || tmpl === 'f') {
                tmp[tmpl] = (tmp[tmpl] || '') + ch;
            } else {
                if (tmpl != ch) {
                    throw new Error("Timespan format doesn't match");
                }
            }
        }
        ['h', 'm', 's', 'f'].forEach(function(i){
            tmp[i] = tmp[i] ? parseInt(tmp[i], 10) : 0;
        })
        var ms = tmp.f;
        ms = ms + tmp.s * 1000;
        ms = ms + tmp.m * 60 * 1000;
        ms = ms + tmp.h * 60 * 60 * 1000;
        return new TimeSpan(ms);
    }

    var timespan = function(arg1, arg2) {
        if (arg1 && !arg2 && typeof(arg1) === 'number') {
            return new TimeSpan(arg1);
        }

        if (arg1 && arg2 && typeof (arg1) === 'string' && typeof (arg2) === 'string')
            return parse(arg1, arg2);

        return new TimeSpan(0);
    };

    console.log('test1');
     if(typeof exports !== 'undefined') {
        if(typeof module !== 'undefined' && module.exports){
          exports = module.exports = timespan;
        }
        exports.timespan = timespan;
      } 
      else {
        root.timespan = timespan;
      }


}).call(this);