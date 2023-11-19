import { ICommand } from "@uiw/react-md-editor/commands";

const underlineCommand: ICommand = {
  name: "underline",
  keyCommand: "underline",
  execute: (state, api) => {
    let modifyText = `<ins>${state.selectedText}</ins>\n`;
    if (!state.selectedText) {
      modifyText = `<ins></ins>`;
    }
    api.replaceSelection(modifyText);
  },
};
export default underlineCommand;
