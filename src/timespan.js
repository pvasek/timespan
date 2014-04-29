(function () {

    var root = this;

    var padLeft = function (number, len){
        if (!len) len = 2;
        var str = number.toString();
        return ('000000000' + str).slice(-len);
    }

    var TimeSpan = function (totalMs) {

        this.format = function(format) {
            var time = this.time();
            if (!format) format = 'hh:mm:ss.fff';
            return format
                .replace('hh', padLeft(time.hours))
                .replace('mm', padLeft(time.minutes))
                .replace('ss', padLeft(time.seconds))
                .replace('fff', padLeft(time.miliseconds, 3))
                .replace('ff', padLeft(Math.round(time.miliseconds / 10), 2))
                .replace('f', padLeft(Math.round(time.miliseconds / 100), 1));
        };

        this.totalMiliseconds = function() {
            return totalMs;
        };

        this.time = function() {
            var ms = totalMs;
            var hours = Math.floor(ms/3600000);
            ms = ms - hours * 3600000;
            var minutes = Math.floor(ms / 60000);
            ms = ms - minutes * 60000;
            var seconds = Math.floor(ms / 1000);
            ms = ms - seconds * 1000;
            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                miliseconds: ms
            };
        };

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
        if (ms < 10) ms = ms * 10;
        if (ms < 100) ms = ms * 10;
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