# phyScroll
A more physically realistic smooth scroll plugin. Time taken to travel to the target depends upon how far away the target is, just like in real life.

Initialise without options:
```
$('a[href*="#"]:not([href="#"])').phyScroll();
````

Initialise with options:
```
$('a[href*="#"]:not([href="#"])').phyScroll({
    speed: 5,
    easing: 'swing',
    maxDuration: 2000,
    delay: 0,
    offset: 0,
    enquire: '',
    start: $.noop,
    complete: $.noop,
    fail: $.noop,
});
