# ng2-trim-directive
[![Build Status](https://travis-ci.org/anein/angular2-trim-directive.svg?branch=master)](https://travis-ci.org/anein/angular2-trim-directive)
[![npm](https://img.shields.io/npm/v/ng2-trim-directive.svg)](https://www.npmjs.com/package/ng2-trim-directive)

>The directive trims whitespaces from the end of an input text value.

## Demo

Play with the directive here [https://anein.github.io/angular2-trim-directive/](https://anein.github.io/angular2-trim-directive/).

## Usage 

1. Install `ng2-trim-directive`.

  ```bash
    npm i ng2-trim-directive
  ```
  
  or using **Yarn**
  
  ```bash
    yarn add ng2-trim-directive
  ```
  
2. Import `InputTrimModule` to your Angular module.

```typescript
import { InputTrimModule } from 'ng2-trim-directive';
@NgModule({
  imports: [
    ...
    InputTrimModule,
    ...
  ],
  ...
```

3. Add the "trim" attribute to a text input or textarea element.
  ```html
     <input type="text" trim />
     <textarea ... trim ></textarea>
  ```

   or with an option: trim value only on the blur event.

  ```html
     <input type="text" trim="blur" />
     <textarea ... trim="blur" ></textarea>
  ```
  **note**: if you use the directive with <textarea> without setting the blur event, it will behave like the text input element.

---
Good luck. 
