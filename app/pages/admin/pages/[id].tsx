// ** next
import { useRouter } from 'next/router'

// ** models
import NextPageType from '@/models/NextPageType'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** components
import NewEditPage from '@/components/admin/pages/NewEditPage'

const AdminPageEdit: NextPageType = () => {
  const router = useRouter()
  const id = router.query?.id as string
  return <NewEditPage id={id} />
}

AdminPageEdit.layout = LayoutAdminPage
AdminPageEdit.title = 'Sayfa Düzenle'
export default AdminPageEdit

export { getServerSideProps }
