// ** third party
import EmojiPicker, {
  EmojiClickData,
  Theme,
  Categories,
} from 'emoji-picker-react'

// ** mui
import { useTheme } from '@mui/material/styles'

type EmojiPickerComponentProps = {
  onClick: (data: EmojiClickData) => void
}

export default function EmojiPickerComponent({
  onClick,
}: EmojiPickerComponentProps) {
  const theme = useTheme()
  return (
    <EmojiPicker
      categories={[
        {
          category: Categories.SUGGESTED,
          name: 'Son Kullanılanlar',
        },
        {
          category: Categories.SMILEYS_PEOPLE,
          name: 'Yüz İfadeleri & İnsanlar',
        },
        {
          category: Categories.ANIMALS_NATURE,
          name: 'Hayvanlar & Doğa',
        },
        {
          category: Categories.FOOD_DRINK,
          name: 'Yiyecek & İçecek',
        },
        {
          category: Categories.TRAVEL_PLACES,
          name: 'Seyahat & Yerler',
        },
        {
          category: Categories.ACTIVITIES,
          name: 'Etkinlik',
        },
        {
          category: Categories.OBJECTS,
          name: 'Nesneler',
        },
        {
          category: Categories.SYMBOLS,
          name: 'Semboller',
        },
        {
          category: Categories.FLAGS,
          name: 'Bayraklar',
        },
      ]}
      theme={theme.palette.mode === 'dark' ? Theme.DARK : Theme.LIGHT}
      onEmojiClick={onClick}
      lazyLoadEmojis
      searchPlaceHolder="Emoji ara..."
      previewConfig={{
        defaultCaption: 'Modun nasıl ? :)',
      }}
    />
  )
}
