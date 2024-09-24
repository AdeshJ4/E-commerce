import { House } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ShoppingHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to='/shop/home' className='flex items-center gap-2'>
          <House className="h-6 w-6 " />
          <span className='font-bold'>E-Commerce</span>
        </Link>
      </div>
    </header>
  );
}

export default ShoppingHeader