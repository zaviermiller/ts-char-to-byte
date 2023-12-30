# ts-char-to-byte [![npm version](https://badge.fury.io/js/ts-char-to-byte.svg)](https://www.npmjs.com/package/ts-char-to-byte)

A simple TypeScript transformer to convert function calls to `charToByte` to a literal.

## Motivation

Coming from C/C++ background, it pains me to have to make a function call to get the underlying byte value of a character. This is especially true when I'm calling this function at runtime over and over again. This transformer moves that runtime call to compile time.

This is really a proof-of-concept to help me learn how to write a TypeScript transformer.

## Usage

First, you'll need to install something like [ts-patch](https://github.com/nonara/ts-patch) to allow you to specify a custom transformer.

Then, you'll need to install this package:

```bash
npm install ts-char-to-byte
```

Finally, you'll need to specify the transformer in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "ts-char-to-byte"
      }
    ]
  }
}
```