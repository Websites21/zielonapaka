'use client';

import { deleteProductAction } from '@/actions/admin-actions';
import { forwardRef } from 'react';

type TDeleteProductDialog = {
  handleClose: () => void;
  productID: string | null;
};

const DeleteProductDialog = forwardRef<HTMLDialogElement, TDeleteProductDialog>(
  function DeleteProductDialog({ handleClose, productID }, ref) {
    return (
      <dialog
        className='bg-white max-w-lg p-8 border border-gray-200 rounded-lg backdrop:backdrop-brightness-50 backdrop:backdrop-blur-sm'
        ref={ref}
      >
        <div className='flex justify-between items-center mb-4'>
          <p className='text-lg font-medium text-gray-950'>Usuń produkt</p>
          <button
            className='p-2 rounded-lg hover:bg-gray-100 transition-all duration-300'
            type='button'
            onClick={handleClose}
          >
            <svg
              className='size-6 stroke-gray-950'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18 6L6 18M6 6L18 18'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
        <p className='text-base text-gray-700 mb-8'>
          Czy jesteś pewien, że chcesz usunąć ten produkt? Tego działania nie
          będzie można cofnąć.
        </p>
        <div className='flex justify-between gap-4'>
          <button
            className='text-gray-950 font-medium text-base py-2 px-12 rounded-lg border border-gray-400 hover:bg-gray-100 transition-all duration-300'
            type='button'
            onClick={handleClose}
          >
            Anuluj
          </button>
          <button
            className='text-white font-medium text-base py-2 px-12 rounded-lg shadow-lg shadow-red-600/50 bg-red-600 hover:bg-red-700 transition-all duration-300'
            type='button'
            onClick={() => {
              if (!productID) return;
              deleteProductAction(productID);
              handleClose();
            }}
          >
            Usuń
          </button>
        </div>
      </dialog>
    );
  }
);

export default DeleteProductDialog;
