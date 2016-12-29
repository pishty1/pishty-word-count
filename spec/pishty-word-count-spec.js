'use babel';

import PishtyWordCount from '../lib/pishty-word-count';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('PishtyWordCount', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('pishty-word-count');
  });

  describe('when the pishty-word-count:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.pishty-word-count')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'pishty-word-count:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.pishty-word-count')).toExist();

        let pishtyWordCountElement = workspaceElement.querySelector('.pishty-word-count');
        expect(pishtyWordCountElement).toExist();

        let pishtyWordCountPanel = atom.workspace.panelForItem(pishtyWordCountElement);
        expect(pishtyWordCountPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'pishty-word-count:toggle');
        expect(pishtyWordCountPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.pishty-word-count')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'pishty-word-count:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let pishtyWordCountElement = workspaceElement.querySelector('.pishty-word-count');
        expect(pishtyWordCountElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'pishty-word-count:toggle');
        expect(pishtyWordCountElement).not.toBeVisible();
      });
    });
  });
});
