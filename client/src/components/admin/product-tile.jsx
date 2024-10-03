import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AdminProductTile = ({ product, setFormData, setCurrentEditedId, setOpenCreateProductsDialog, handleDelete }) => {

    const handleEditProduct = () => {
        setCurrentEditedId(product?._id)
        setFormData(product);
        setOpenCreateProductsDialog(true)
    }


    const handleDeleteProduct = () => {
        handleDelete(product?._id)
    }


    return (
        <Card className="w-full max-w-sm mx-auto">
            <div>
                <div className='relative'>
                    <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg' />
                </div>

                <CardContent>
                    <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg text-muted-foreground"> {product?.category}</span>
                        <span className="text-lg text-muted-foreground">{product?.brand}</span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
                        { product?.salePrice > 0 ? <span className='text-lg font-bold'>${product?.salePrice}</span> : null}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button onClick={handleEditProduct}>Edit</Button>
                    <Button onClick={handleDeleteProduct}>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default AdminProductTile