import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import * as angularJsonStub from './stubs/angular.json';
import * as appModuleStub from './stubs/app.module.json';
import * as packageJsonStub from './stubs/package.json';

const collectionPath = path.join(__dirname, '.../../../../collection.json');

let testTree: Tree;
beforeEach(() => {
  testTree = Tree.empty();
  testTree.create('./angular.json', JSON.stringify(angularJsonStub));
  testTree.create('./src/app/app.module.ts', JSON.stringify(appModuleStub.content));
  testTree.create('./package.json', JSON.stringify(packageJsonStub));
})

describe('order-wizard', () => {
  describe('when creating files', () => {
    it('created the right number of files', () => {
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const tree = runner.runSchematic('order-wizard', {name: 'test'}, testTree);

      expect(tree.files.length).toEqual(10);
    });
    it('gives files the correct name', () => {
      const nameOption = 'test';
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const tree = runner.runSchematic('order-wizard', {name: nameOption}, testTree);

      tree.files.slice(3).forEach((filePath: string) => {
        expect(filePath.includes(`/${nameOption}/${nameOption}`)).toEqual(true)
      })
    });
    it('can create files under a deeper path', () => {
      const nameOption = 'test';
      const pathOption = 'fake-path';
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const tree = runner.runSchematic('order-wizard', {name: nameOption, path: pathOption}, testTree);

      tree.files.slice(3).forEach((filePath: string) => {
        expect(filePath.startsWith(`/${pathOption}/`)).toEqual(true);
      })
    });
    it('does not create test files when spec is false', () => {
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const tree = runner.runSchematic('order-wizard', {name: 'nameOption', spec: "false"}, testTree);

      expect(tree.files.length).toEqual(8);
    });
  })

  fdescribe('when inserting content', () => {
    it('updated template files correctly', () => {
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const tree = runner.runSchematic('order-wizard', {name: 'test'}, testTree);
      const servicePath = tree.files.pop() || '';
      const service = tree.read(servicePath);

      expect(service).toContain('export class TestService');
    });

    it('adds a new import to the root module', () => {
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const tree = runner.runSchematic('order-wizard', {name: 'test'}, testTree);
      const module = tree.read('./src/app/app.module.ts')
      expect(module).toContain("import { TestModule } from './/test/test.module';")
    });
  })
});
