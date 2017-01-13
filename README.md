# angular2-trim-directive
This small directive removes white spaces from an input field. 


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

-
Good luck.
