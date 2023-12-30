# ts-char-to-bytea

A simple TypeScript transformer to convert function calls to `charToByte` to a literal.

## Motivation

Coming from C/C++ background, it pains me to have to make a function call to get the underlying byte value of a character. This is especially true when I'm calling this function at runtime over and over again. This transformer moves that runtime call to compile time.

This is really a proof-of-concept to help me learn how to write a TypeScript transformer.