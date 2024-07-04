import Link from 'next/link';

export default function ProductsSection() {
  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8'>
      <h2 className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
        Świeżo, tanio i ekologicznie 😊
      </h2>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center mb-8 gap-4'>
        <p className='text-gray-700 text-base'>Liczba produktów: 16</p>
        <div>
          <label
            className='text-gray-950 font-medium text-sm mr-4'
            htmlFor='sort'
          >
            Sortuj wg
          </label>
          <select
            className='text-gray-700 text-base border border-gray-200 p-1 rounded-lg shadow-lg shadow-gray-200/50'
            name='sort'
            id='sort'
          >
            <option value='default'>Domyślnie</option>
            <option value='priceDesc'>Cena: od najwyższej</option>
            <option value='priceAsc'>Cena: od najniższej</option>
          </select>
        </div>
      </div>
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
        <Link
          className='rounded-lg overflow-hidden border border-gray-200 shadow-lg shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300'
          href=''
        >
          <figure></figure>
        </Link>
      </div>
    </section>
  );
}
