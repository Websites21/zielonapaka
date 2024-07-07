'use client';

import { TProduct } from '@/lib/types';
import { useRef, useState } from 'react';
import DeleteProductDialog from '../dialogs/delete-product-dialog';

export default function UpdateProductsList({
  products,
}: {
  products: TProduct[];
}) {
  const [deleteProductID, setDeleteProductID] = useState<string | null>(null);
  const deleteProductDialogRef = useRef<HTMLDialogElement>(null);

  function handleOpenDeleteProductDialog(productID: string) {
    setDeleteProductID(productID);
    deleteProductDialogRef.current?.showModal();
  }

  function handleCloseDeleteProductDialog() {
    setDeleteProductID(null);
    deleteProductDialogRef.current?.close();
  }

  return (
    <>
      <div className='space-y-4 overflow-x-scroll'>
        <div className='min-w-max grid grid-cols-[160px_128px_64px_minmax(192px,1fr)_minmax(192px,1fr)_84px] gap-8 border border-gray-200 mb-8 p-4 rounded-lg shadow-lg shadow-gray-200/50'>
          <p className='text-sm text-gray-700'>Zdjęcie</p>
          <p className='text-sm text-gray-700'>Nazwa</p>
          <p className='text-sm text-gray-700'>Cena</p>
          <p className='text-sm text-gray-700'>Opis</p>
          <p className='text-sm text-gray-700'>Link</p>
          <p className='text-sm text-gray-700'>Edycja</p>
        </div>
        {products.map((product) => (
          <figure
            className='grid grid-cols-[160px_128px_64px_minmax(192px,1fr)_minmax(192px,1fr)_84px] items-center gap-8 pb-4 px-4 border-b border-b-gray-200 last:border-none'
            key={product.id}
          >
            <img
              className='w-full h-24 object-cover rounded-lg'
              src={product.imageURL}
              alt={product.name}
            />
            <p className='text-base text-gray-950'>{product.name}</p>
            <p className='text-base text-gray-950'>{product.price} zł</p>
            <p className='text-base text-gray-950 line-clamp-2'>
              {product.description}
            </p>
            <p className='text-base text-gray-950 line-clamp-1'>
              {product.imageURL} zł
            </p>
            <div className='space-x-1'>
              <button
                className='group p-2 rounded-lg hover:bg-green-100 transition-all duration-300'
                type='button'
              >
                <svg
                  className='size-6 stroke-gray-950 group-hover:stroke-green-700 transition-all duration-300'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.87601 18.1156C2.92195 17.7021 2.94493 17.4954 3.00748 17.3022C3.06298 17.1307 3.1414 16.9676 3.24061 16.8171C3.35242 16.6475 3.49952 16.5005 3.7937 16.2063L17 3C18.1046 1.89543 19.8954 1.89543 21 3C22.1046 4.10457 22.1046 5.89543 21 7L7.7937 20.2063C7.49951 20.5005 7.35242 20.6475 7.18286 20.7594C7.03242 20.8586 6.86926 20.937 6.69782 20.9925C6.50457 21.055 6.29783 21.078 5.88434 21.124L2.49997 21.5L2.87601 18.1156Z'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <button
                className='group p-2 rounded-lg hover:bg-red-100 transition-all duration-300'
                type='button'
                onClick={() => handleOpenDeleteProductDialog(product.id)}
              >
                <svg
                  className='size-6 stroke-gray-950 group-hover:stroke-red-700 transition-all duration-300'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </figure>
        ))}
      </div>
      <DeleteProductDialog
        ref={deleteProductDialogRef}
        handleClose={handleCloseDeleteProductDialog}
        productID={deleteProductID}
      />
    </>
  );
}
