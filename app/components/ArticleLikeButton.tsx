import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import useStoreSettings from '@/hooks/useStoreSettings'
import ArticleService from '@/services/ArticleService'

interface IArticleLikeButtonProps {
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

function ArticleLikeButton({
  itemId,
  likedCount,
  currentIpAdressIsLiked,
}: IArticleLikeButtonProps) {
  const [count, setCount] = useState(likedCount)
  const [isLiked, setIsLiked] = useState(currentIpAdressIsLiked)

  const [loading, setLoading] = useState(false)

  //const { settingsStore } = useStoreSettings()
  //const { userIpAddress } = settingsStore

  useEffect(() => setCount(likedCount), [likedCount])
  useEffect(() => setIsLiked(currentIpAdressIsLiked), [currentIpAdressIsLiked])

  const Icon = (props: any) =>
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

export default ArticleLikeButton
