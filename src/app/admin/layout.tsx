import AdminNav from '@/components/admin/admin-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32'>
      <AdminNav />
      {children}
    </section>
  );
}
