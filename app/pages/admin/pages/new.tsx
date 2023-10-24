// ** models
import NextPageType from '@/models/NextPageType'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** components
import NewEditPage from '@/components/admin/pages/NewEditPage'

const AdminPageNew: NextPageType = () => {
  return <NewEditPage />
}

AdminPageNew.layout = LayoutAdminPage
AdminPageNew.title = 'Yeni Sayfa'
export default AdminPageNew

export { getServerSideProps }
