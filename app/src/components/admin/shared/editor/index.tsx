"use client";

// ** next
import dynamic from "next/dynamic";

// ** mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { SvgIconProps } from "@mui/material/SvgIcon";

// ** icons
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import LinkIcon from "@mui/icons-material/Link";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";

// ** third party
import * as commands from "@uiw/react-md-editor/commands";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// ** editor commands
import TitlesCommandComponent, {
  titlesCommand,
} from "@/components/admin/shared/editor/commands/TitlesCommand";
import ImageCommandComponent, {
  imageCommand,
} from "@/components/admin/shared/editor/commands/ImageCommand";
import EmojiPickerComponent, {
  emojiPickerCommand,
} from "@/components/admin/shared/editor/commands/EmojiPickerCommand";
import underlineCommand from "@/components/admin/shared/editor/commands/UnderlineCommand";

const Icon = ({ name, ...props }: { name?: string } & SvgIconProps) => {
  switch (name) {
    case commands.bold.name:
      return <FormatBoldIcon {...props} />;
    case commands.italic.name:
      return <FormatItalicIcon {...props} />;
    case commands.strikethrough.name:
      return <FormatStrikethroughIcon {...props} />;
    case "underline":
      return <FormatUnderlinedIcon {...props} />;
    case commands.hr.name:
      return <HorizontalRuleIcon {...props} />;
    case commands.link.name:
      return <LinkIcon {...props} />;
    case commands.quote.name:
      return <FormatQuoteIcon {...props} />;
    case commands.code.name:
      return <CodeIcon {...props} />;
    case commands.codeBlock.name:
      return <DataObjectIcon {...props} />;
    case commands.codeBlock.name:
      return <DataObjectIcon {...props} />;
    case commands.orderedListCommand.name:
      return <FormatListNumberedIcon {...props} />;
    case commands.unorderedListCommand.name:
      return <FormatListBulletedIcon {...props} />;
    case commands.checkedListCommand.name:
      return <ChecklistIcon {...props} />;
    case commands.fullscreen.name:
      return <FullscreenIcon {...props} />;
    case commands.codeEdit.name:
      return <VerticalSplitIcon {...props} />;
    case commands.codePreview.name:
      return (
        <VerticalSplitIcon {...props} sx={{ transform: "rotate(-180deg)" }} />
      );
    case commands.codeLive.name:
      return <SplitscreenIcon {...props} sx={{ transform: "rotate(90deg)" }} />;

    // case 'image':
    //   return <ImageIcon {...props} />

    default:
      return <></>;
  }
};

const EditorWrapperBox = styled(Box)(({ theme }) => ({
  width: "100%",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.grey[theme.palette.mode === "dark" ? 800 : 400],
  borderRadius: theme.spacing(0.5),
  "& .w-md-editor-toolbar": {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor:
      theme.palette.grey[theme.palette.mode === "dark" ? 800 : 400],
  },
  "& .w-md-editor-show-live": {
    "& .w-md-editor-area": {
      borderRadius: 0,
      borderRightWidth: 1,
      borderRightStyle: "solid",
      borderRightColor:
        theme.palette.grey[theme.palette.mode === "dark" ? 800 : 400],
    },
  },
}));

type EditorProps = {
  value: string;
  setValue: (text: string) => void;
};

export default function Editor({ value, setValue }: EditorProps) {
  return (
    <EditorWrapperBox>
      <MDEditor
        value={value}
        onChange={(value) => setValue(value || "")}
        height={800}
        components={{
          toolbar: (command, disabled, executeCommand, index) => {
            const props = { command, disabled, index };
            switch (command.name) {
              case "titles":
                return (
                  <TitlesCommandComponent
                    {...props}
                    executeCommand={executeCommand}
                  />
                );
              case "image":
                return (
                  <ImageCommandComponent
                    {...props}
                    executeCommand={executeCommand}
                  />
                );
              case "emojiPicker":
                return (
                  <EmojiPickerComponent
                    {...props}
                    executeCommand={executeCommand}
                  />
                );
              default:
                return (
                  <IconButton
                    size="small"
                    onClick={() => executeCommand(command)}
                    tabIndex={index}
                    {...props}
                  >
                    <Icon fontSize="small" name={command.name} />
                  </IconButton>
                );
            }
          },
        }}
        commands={[
          titlesCommand,
          commands.bold,
          commands.italic,
          commands.strikethrough,
          underlineCommand,
          commands.hr,
          commands.divider,
          commands.link,
          commands.quote,
          commands.code,
          commands.codeBlock,
          imageCommand,
          commands.divider,
          commands.orderedListCommand,
          commands.unorderedListCommand,
          commands.checkedListCommand,
          emojiPickerCommand,
        ]}
      />
    </EditorWrapperBox>
  );
}
