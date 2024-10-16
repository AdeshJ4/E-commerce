import ProductImageUpload from '@/components/admin/image-upload';
import AdminProductTile from '@/components/admin/product-tile';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductsFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/slices/admin-slice/index';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


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
  const [uploadedImageURL, setUploadedImageURL] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList, isLoading } = useSelector(state => state.adminProducts);

  const { toast } = useToast();

  const dispatch = useDispatch();


  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ?
      dispatch(editProduct({
        id: currentEditedId, formData
      })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
          toast({
            title: "Product Edited Successfully",
          });
        }
      })
      :
      dispatch(
        addNewProduct({
          ...formData,
            image: uploadedImageURL,
          })
      ).then((data) => {
        if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product Added Successfully",
            });
          }
        });
  }

  function isFormValid() {  // return true or false
    return Object.keys(formData).map(key => formData[key] !== '').every(item => item)
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  

  return (
    <>
      <div className="w-full mb-3 flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      {/* Display Products */}
      <div className="grid gap-4 md:grid-cols-3 lg: grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
            <AdminProductTile
              key={product?.title}
              product={product}
              setFormData={setFormData}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              handleDelete={handleDelete}
            />
          ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageURL={uploadedImageURL}
            setUploadedImageURL={setUploadedImageURL}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductsFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts