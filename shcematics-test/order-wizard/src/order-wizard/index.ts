import { Rule, SchematicContext, Tree, apply, url, mergeWith, MergeStrategy, move, template, filter, SchematicsException, chain, TaskId } from '@angular-devkit/schematics';
import { normalize, strings, experimental } from '@angular-devkit/core';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { NodePackageTaskOptions } from '@angular-devkit/schematics/tasks/node-package/options';
import * as ts from 'typescript'
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
let materialTaskId: TaskId;
export function orderWizard(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(_options, tree);
    const project = getProject(_options, workspace);
    const appRoot = `${project.root}/${project.sourceRoot}/${project.prefix}`;
    const folderPath = normalize(
      strings.dasherize(appRoot + _options.path + '/' + _options.name)
    );
    const files = url('./files');

    const newTree = apply(files, [
      move(folderPath),
      template({
        ...strings,
        ..._options
      }),
      specFilter(_options)
    ])
    const templateRule = mergeWith(newTree, MergeStrategy.Default);
    const updateModuleRule = updateRootModule(_options, workspace);
    const installMaterialRule = installMaterial();
    const addMaterialRule = addMaterial();
    const chainRule = chain([templateRule, updateModuleRule, installMaterialRule, addMaterialRule]);
    return chainRule(tree, _context);

  };
}

function specFilter(_options: any): Rule {
  if (_options.spec === 'false') {
    return filter(path => !path.match(/\.spec\.ts$/) && !path.match(/test\.ts$/)
    )
  }
  return filter(path => !path.match(/test\.ts$/))
}

function getWorkspace(_options: any, tree: Tree): experimental.workspace.WorkspaceSchema {
  const workspace = tree.read('/angular.json');
  if (!workspace) {
    throw new SchematicsException('angular.json file not found!');
  }
  return JSON.parse(workspace.toString())
}

function getProject(_options: any, workspace: any) {
  _options.project = _options.project === 'defaultProject' ? workspace.defaultProject : _options.project;

  return workspace.projects[_options.projects]
}
function updateRootModule(_options: any, workspace: any): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    const project = getProject(_options, workspace);
    const moduleName = strings.dasherize(_options.name);
    const exportModuleName = strings.classify(_options.name);
    const modulePath = strings.dasherize(_options.path);
    const rootModulePath = `${project.root}/` +
      `${project.sourceRoot}/` +
      `${project.prefix}/` +
      `${project.prefix}.module.ts`;

    const importContent = `import {${exportModuleName}Module}` +
      `from './${modulePath}/${moduleName}/${moduleName}.module';`;

    const moduleFile = getAsSourceFile(tree, rootModulePath)
    const insertPos = findLastImportEndPos(
      moduleFile
    )
    const importsArrayEndPos = findImportArray(moduleFile)
    const rec = tree.beginUpdate(rootModulePath);
    rec.insertLeft(insertPos + 1, importContent);
    rec.insertLeft(importsArrayEndPos - 1, `,${exportModuleName}Module`)
    tree.commitUpdate(rec);
    return tree;
  }
}

function getAsSourceFile(tree: Tree, path: string): ts.SourceFile {
  const file = tree.read(path);
  if (!file) {
    throw new SchematicsException(`${path} not found`);
  }
  return ts.createSourceFile(
    path,
    file.toString(),
    ts.ScriptTarget.Latest,
    true
  )
}

function findLastImportEndPos(file: ts.SourceFile): number {
  let pos: number = 0;
  file.forEachChild((child: ts.Node) => {
    if (child.kind === ts.SyntaxKind.ImportDeclaration) {
      pos = child.end;
    }
  })
  return pos;
}

function findImportArray(file: ts.SourceFile): number {
  let pos: number = 0;
  file.forEachChild((node: ts.Node) => {
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      node.forEachChild((classChild: ts.Node) => {
        if (classChild.kind === ts.SyntaxKind.Decorator) {
          classChild.forEachChild((moduleDec: ts.Node) => {
            moduleDec.forEachChild((objectLiteral: ts.Node) => {
              objectLiteral.forEachChild((property: ts.Node) => {
                if (property.getFullText().includes('imports')) {
                  pos = property.end;
                }
              })
            })
          })
        }
      })
    }
  })
  return pos;
}

function installMaterial(): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    const packageJsonPath = '/package.json';
    const materialDepName = '@angular/material';
    const packageJson = getAsSourceFile(tree, packageJsonPath);
    let materialInstalled = false;
    packageJson.forEachChild((node: ts.Node) => {
      if (node.kind === ts.SyntaxKind.ExpressionStatement) {
        node.forEachChild(objectLiteral => {
          objectLiteral.forEachChild(property => {
            if (property.getFullText().includes('dependencies')) {
              property.forEachChild(dep => {
                if (dep.getFullText().includes(materialDepName)) {
                  _context.logger.info('Angular Material already installed');
                  materialInstalled = true;
                }
              })
            }
          })
        })
      }
    })
    if (!materialInstalled) {
      const options = <NodePackageTaskOptions>{
        packageName: materialDepName
      };
      materialTaskId = _context.addTask(new NodePackageInstallTask(options));
      _context.logger.info('Installing Angular Material');
    }
    return tree
  }
}

function addMaterial(): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    const options = {
      theme: 'indigo-pink',
      gestures: true,
      animations: true
    }
    _context.addTask(new RunSchematicTask('@angular/material', 'ng-add', options), [materialTaskId]);
    _context.logger.info('Configuring Angular Material');
    return tree;
  }
}
