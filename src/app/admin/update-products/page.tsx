import UpdateProductsList from '@/components/admin/update-products-list';
import { getProducts } from '@/lib/server-utils';

export default async function UpdateProducts() {
  const products = await getProducts();

  return <UpdateProductsList products={products} />;
}
