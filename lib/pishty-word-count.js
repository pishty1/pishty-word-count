'use babel';

import PishtyWordCountView from './pishty-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  pishtyWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pishtyWordCountView = new PishtyWordCountView(state.pishtyWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pishtyWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pishty-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pishtyWordCountView.destroy();
  },

  serialize() {
    return {
      pishtyWordCountViewState: this.pishtyWordCountView.serialize()
    };
  },

  toggle() {
    console.log('PishtyWordCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
