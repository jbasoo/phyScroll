# phyScroll
A more physically realistic smooth scroll plugin. Time taken to travel to the target depends upon how far away the target is, just like in real life.

## Usage

Sample HTML:
```
<a href="#top">Back to top</a>
```

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
```

- speed: How fast to scroll
- easing: Any easing animation supported by jQuery
- delay: Delay scroll
- offset: How far to offset from top of page, userful for sticky headers
- enquire: Off by default. If you're using [enquire](https://github.com/WickyNilliams/enquire.js) then you can choose to only animate when the screen matches a media query
- start/complete/fail: Do a function upon each of these events

## Todo
- Allow per element configuration using a data-attribute
