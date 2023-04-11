import SidebarHeader from '../components/SidebarHeader'
import MainContent from './MainContent'

const Dashboard = () => {
  return (
    <div className='text-white flex min-h-screen '>
      <SidebarHeader />
      <MainContent />
    </div>
  )
}
export default Dashboard
