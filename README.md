timespan
========

Simple library for parasing and formatting time values.

## Examples

Create a time span
```
var time1 = timespan('10:25:32.456', 'hh:mm:ss.fff');
```

Format a time span
```
var timeString = time1.format('hh:mm:ss')  // will return 10:25:32
```
