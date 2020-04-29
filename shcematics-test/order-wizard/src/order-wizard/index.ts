import { Rule, SchematicContext, Tree, apply, url, mergeWith, MergeStrategy, move, template } from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function orderWizard(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const folderPath = normalize(
      strings.dasherize(_options.path + '/' + _options.name)
    );
    const files = url('./files');
    const newTree = apply(files, [
      move(folderPath),
      template({
        ...strings,
        ..._options
      })
    ])
    const templateRule = mergeWith(newTree, MergeStrategy.Default);

    return templateRule(tree, _context);

  };
}
