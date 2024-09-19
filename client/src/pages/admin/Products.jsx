import ProductImageUpload from '@/components/admin/image-upload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductsFormElements } from '@/config';
import React, { useState } from 'react'


const initialFormData = {
  image : null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
}


const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [lastUploadedImageURL, setLastUploadedImageURL] = useState('');

  function  onSubmit() {
    console.log('Product Added ');
  }

  return (
    <>
      <div className="w-full mb-3 flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg: grid-cols-4"></div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            lastUploadedImageURL={lastUploadedImageURL}
            setLastUploadedImageURL={setLastUploadedImageURL}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductsFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onsubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts