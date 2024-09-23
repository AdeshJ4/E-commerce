import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import AdminSideBar from './SideBar';
import AdminHeader from './Header';

const AdminLayout = () => {

  const [openSidebar, setOpenSidebar] = useState(false);
  
  return (
    <div className='flex min-h-screen w-full'>
      {/* Admin Sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className='flex flex-1 flex-col'>
        {/* Admin Header */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6'>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout