import { ICommand } from "@uiw/react-md-editor/commands";

type EditorBaseCommandProps = {
  index: number;
  command: ICommand<string>;
  disabled: boolean;
  executeCommand: (
    command: ICommand<string>,
    name?: string | undefined
  ) => void;
};

export default EditorBaseCommandProps;
