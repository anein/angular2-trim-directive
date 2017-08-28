# angular2-trim-directive
This directive trims whitespaces from the end of an input text value. Edit


## Usage 

1. Add the directive to the module 'delarations' section.

  ```typescript
  @NgModule( {
    ...
    declarations: [ ..., InputTrimDirective ],
    ...
  } )
  ```

2. Add the "trim" attribute to a text input element.
  ```html
     <input type="text" trim />
  ```

  or with an option: trim value only on the blur event.

  ```html
     <input type="text" trim="blur" />
  ```


---
Good luck. 
