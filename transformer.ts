import * as ts from 'typescript';

function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    return file => visitSourceFile(file, context) as ts.SourceFile;
  }
}

function visitSourceFile(file: ts.SourceFile, context: ts.TransformationContext) {
  return visitNodeAndChildren(file)

  function visitNodeAndChildren(node: ts.Node): ts.Node {
    if (node === null) {
      return node;
    }

    node = visitNode(node);

    return ts.visitEachChild(node, visitNodeAndChildren, context);
  }

  function visitNode(node: ts.Node): ts.Node {
    // check if the node is a function call to `charToByte`
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'charToByte') {
      const charArg = node.arguments[0];
      if (!ts.isStringLiteral(charArg) || charArg.text.length !== 1) {
        // warn that fallback implementation will be used
        console.warn(`charToByte passed a non-string literal or a string literal with length !== 1. Fallback implementation will be used.`);
        return node;
      }

      const byteValue = charArg.text.charCodeAt(0);
      return context.factory.createNumericLiteral(byteValue);
    }

    return node;
  }
}

export default transformer;