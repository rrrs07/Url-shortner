import Header from '@/components/header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
        <main className='container mx-auto px-4 lg:px-16 max-w-7xl'>
            {/* Header */}
            <Header />
            <Outlet />
            {/* Body */}
        </main>

        {/* Footer */}
        <div className='p-10 text-center bg-gray-800 mt-10'>
            Made with ❤️‍🔥 by RRRS
        </div>
    </div>
  );
};

export default AppLayout;