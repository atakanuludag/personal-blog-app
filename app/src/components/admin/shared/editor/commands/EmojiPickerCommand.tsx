"use client";

// ** react
import { Fragment, useState, MouseEvent } from "react";

// ** third party
import EmojiPicker, {
  EmojiClickData,
  Theme,
  Categories,
} from "emoji-picker-react";

// ** mui
import { useTheme } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";

// ** icons
import AddReactionIcon from "@mui/icons-material/AddReaction";

// ** third party
import { ICommand } from "@uiw/react-md-editor/commands";

// ** models
import EditorBaseCommandProps from "@/components/admin/shared/editor/commands/type";

export const emojiPickerCommand: ICommand = {
  name: "emojiPicker",
  keyCommand: "emojiPicker",
};

export default function EmojiPickerComponent({
  index,
  disabled,
  executeCommand,
}: EditorBaseCommandProps) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? `${emojiPickerCommand.name}-popover` : undefined;

  const handlePopoverOpenClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handlePopoverClose = () => setAnchorEl(null);

  const onClick = (data: EmojiClickData) => {
    executeCommand({
      name: "emoji",
      keyCommand: "emoji",
      execute: (state, api) => {
        api.replaceSelection(data.emoji);
      },
    });
    handlePopoverClose();
  };

  return (
    <Fragment>
      <IconButton
        disabled={disabled}
        size="small"
        onClick={handlePopoverOpenClick}
        key={index}
        tabIndex={index}
      >
        <AddReactionIcon fontSize="small" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <EmojiPicker
          categories={[
            {
              category: Categories.SUGGESTED,
              name: "Son Kullanılanlar",
            },
            {
              category: Categories.SMILEYS_PEOPLE,
              name: "Yüz İfadeleri & İnsanlar",
            },
            {
              category: Categories.ANIMALS_NATURE,
              name: "Hayvanlar & Doğa",
            },
            {
              category: Categories.FOOD_DRINK,
              name: "Yiyecek & İçecek",
            },
            {
              category: Categories.TRAVEL_PLACES,
              name: "Seyahat & Yerler",
            },
            {
              category: Categories.ACTIVITIES,
              name: "Etkinlik",
            },
            {
              category: Categories.OBJECTS,
              name: "Nesneler",
            },
            {
              category: Categories.SYMBOLS,
              name: "Semboller",
            },
            {
              category: Categories.FLAGS,
              name: "Bayraklar",
            },
          ]}
          theme={theme.palette.mode === "dark" ? Theme.DARK : Theme.LIGHT}
          onEmojiClick={onClick}
          lazyLoadEmojis
          searchPlaceHolder="Emoji ara..."
          previewConfig={{
            defaultCaption: "Modun nasıl ? :)",
          }}
        />
      </Popover>
    </Fragment>
  );
}
