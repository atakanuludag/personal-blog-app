// ** next
import { useRouter } from 'next/router'

// ** models
import NextPageType from '@/models/NextPageType'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** components
import NewEditArticle from '@/components/admin/articles/NewEditArticle'

const AdminArticleEdit: NextPageType = () => {
  const router = useRouter()
  const id = router.query?.id as string
  return <NewEditArticle id={id} />
}

AdminArticleEdit.layout = LayoutAdminPage
AdminArticleEdit.title = 'Makale Düzenle'
export default AdminArticleEdit

export { getServerSideProps }
