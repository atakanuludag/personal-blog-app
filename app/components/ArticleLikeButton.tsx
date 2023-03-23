// ** react
import { useEffect, useState } from 'react'

// ** mui
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { DefaultComponentProps } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'

// ** icon
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

// ** services
import ArticleService from '@/services/ArticleService'

type ArticleLikeButtonProps = {
  itemId: string
  likedCount: number
  currentIpAdressIsLiked: boolean
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

export default function ArticleLikeButton({
  itemId,
  likedCount,
  currentIpAdressIsLiked,
}: ArticleLikeButtonProps) {
  const [count, setCount] = useState(likedCount)
  const [isLiked, setIsLiked] = useState(currentIpAdressIsLiked)

  const [loading, setLoading] = useState(false)

  useEffect(() => setCount(likedCount), [likedCount])
  useEffect(() => setIsLiked(currentIpAdressIsLiked), [currentIpAdressIsLiked])

  const Icon = (props: DefaultComponentProps<SvgIconTypeMap<{}, 'svg'>>) =>
    isLiked ? <FavoriteIcon {...props} /> : <FavoriteBorderIcon {...props} />

  const handleLikeButtonClick = async () => {
    if (isLiked) return
    setLoading(true)
    const _count = await ArticleService.likePost(itemId)
    setCount(_count)
    setIsLiked(true)
    setLoading(false)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <IconButton
        aria-label="Beğen"
        size="medium"
        onClick={handleLikeButtonClick}
        disabled={loading}
      >
        <StyledBadge badgeContent={count} color="secondary">
          <Icon fontSize="inherit" />
        </StyledBadge>
      </IconButton>
    </Box>
  )
}
