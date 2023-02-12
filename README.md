## Installing

### Package manager

Using npm:

```bash
$ npm install currency-in-wordsinr@latest
```

Using bower:

```bash
$ bower install currency-in-wordsinr@latest
```

Using yarn:

```bash
$ yarn add currency-in-wordsinr@latest
```

Using pnpm:

```bash
$ pnpm add currency-in-wordsinr@latest
```


## Usage

Once the package is installed, you can import the library using `import` or `require` approach:

```js
import { price_in_rupees } from 'currency-in-wordsinr';
```

You can also use the default export, since the named export is just a re-export from the Axios factory:

```js
import { price_in_rupees } from 'currency-in-wordsinr';

console.log(price_in_rupees('25000'));
````

If you use `require` for importing:

```js
const { price_in_rupees } = require('currency-in-wordsinr');

console.log(price_in_rupees('25000'));
```

