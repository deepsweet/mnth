# mnth

[![npm](https://img.shields.io/npm/v/mnth.svg?style=flat-square)](https://www.npmjs.com/package/mnth) [![linux](https://img.shields.io/travis/deepsweet/mnth/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/mnth) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/mnth.svg?style=flat-square)](https://codecov.io/github/deepsweet/mnth)

Convert date to an array of calendar month.

## Requirements

### Node

* Node.js >= 6
* [`esm` loader](https://github.com/standard-things/esm)

### Browser

* [`>0.5%, not op_mini all, not dead, Firefox ESR`](http://browserl.ist/?q=%3E0.5%25%2C+not+op_mini+all%2C+not+dead%2C+Firefox+ESR)
* Bundler with ESM support like [webpack](https://webpack.js.org/)

## Install

```sh
$ yarn add date-fns@^2.0.0-0 mnth
```

## Usage

### Signature

```ts
mnth(date: Date, options?: {}): Date[][]
```

#### `options`

* `firstDay` – first day of the week, [from 0 to 6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay), `1` by default

### Example

```js
import { format, parse } from 'date-fns/esm'
import mnth from 'mnth'

const date = parse('2018-04-01', 'yyyy-MM-dd', new Date())
const month = mnth(date).map((week) =>
  week.map((day) => format(day, 'yyyy-MM-dd'))
)

console.log(month)
/*
[
  [ '2018-03-26', '2018-03-27', '2018-03-28', '2018-03-29', '2018-03-30', '2018-03-31', '2018-04-01' ],
  [ '2018-04-02', '2018-04-03', '2018-04-04', '2018-04-05', '2018-04-06', '2018-04-07', '2018-04-08' ],
  [ '2018-04-09', '2018-04-10', '2018-04-11', '2018-04-12', '2018-04-13', '2018-04-14', '2018-04-15' ],
  [ '2018-04-16', '2018-04-17', '2018-04-18', '2018-04-19', '2018-04-20', '2018-04-21', '2018-04-22' ],
  [ '2018-04-23', '2018-04-24', '2018-04-25', '2018-04-26', '2018-04-27', '2018-04-28', '2018-04-29' ],
  [ '2018-04-30', '2018-05-01', '2018-05-02', '2018-05-03', '2018-05-04', '2018-05-05', '2018-05-06' ]
]
*/
```
