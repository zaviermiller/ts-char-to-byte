const assert = require('assert');
const path = require('path');
const ts = require('typescript');
const charToByteTransformer = require('../transformer').default;

describe('charToByteTransformer', () => {
  const COMPILE_OPTIONS = {
    strict: true,
    noEmitOnError: true,
    baseUrl: './',
    declaration: true,
  }
  it('should correctly transform valid function calls', () => {
    const FILE = path.resolve(__dirname, 'valid.ts');
    const program = ts.createProgram([FILE], COMPILE_OPTIONS);

    const callback = (filename, compiled) => {
      if (filename.endsWith('valid.js')) {
        assert.ok(
          compiled.includes('console.log(97)'),
          'Incorrectly transformed source'
        )
      }
    }
  
    const transformers = {
      before: [charToByteTransformer(program)]
    }
  
    const { emitSkipped, diagnostics } = program.emit(undefined, callback, undefined, false, transformers);
  
    assert.strictEqual(emitSkipped, false, diagnostics.map(diagnostic => diagnostic.messageText).join('\n'));

  });

  it('should not transform with variable', () => {
    const FILE = path.resolve(__dirname, 'invalid-variable.ts');
    const program = ts.createProgram([FILE], COMPILE_OPTIONS);

    const callback = (filename, compiled) => {
      if (filename.endsWith('invalid-variable.js')) {
        assert.ok(
          compiled.includes('charToByte(test)'),
          'Incorrectly transformed source'
        )
      }
    }
  
    const transformers = {
      before: [charToByteTransformer(program)]
    }
  
    const { emitSkipped, diagnostics } = program.emit(undefined, callback, undefined, false, transformers);
  
    assert.strictEqual(emitSkipped, false, diagnostics.map(diagnostic => diagnostic.messageText).join('\n'));
  })

  it('should not transform with multiple characters passed', () => {
    const FILE = path.resolve(__dirname, 'invalid-length.ts');
    const program = ts.createProgram([FILE], COMPILE_OPTIONS);

    const callback = (filename, compiled) => {
      if (filename.endsWith('invalid-length.js')) {
        assert.ok(
          compiled.includes('charToByte(\'aa\')'),
          compiled
        )
      }
    }
  
    const transformers = {
      before: [charToByteTransformer(program)]
    }
  
    const { emitSkipped, diagnostics } = program.emit(undefined, callback, undefined, false, transformers);
  
    assert.strictEqual(emitSkipped, false, diagnostics.map(diagnostic => diagnostic.messageText).join('\n'));
  })
});