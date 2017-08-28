# ng2-trim-directive
[![Build Status](https://travis-ci.org/anein/angular2-trim-directive.svg?branch=master)](https://travis-ci.org/anein/angular2-trim-directive)

>The directive trims whitespaces from the end of an input text value.

## Usage 

1. Install the directive.

  ```bash
    npm i ng2-trim-directive
  ```

2. Add the directive to your module 'declarations' section.

  ```typescript
    @NgModule( {
      ...
      declarations: [ ..., InputTrimDirective ],
      ...
    } )
  ```

3. Add the "trim" attribute to a text input element.
  ```html
     <input type="text" trim />
  ```

  or with an option: trim value only on the blur event.

  ```html
     <input type="text" trim="blur" />
  ```


---
Good luck. 
