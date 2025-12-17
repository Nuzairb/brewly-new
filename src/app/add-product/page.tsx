import dynamicImport from 'next/dynamic';

export const dynamic = 'force-dynamic';

const AddProductClient = dynamicImport(() => import('./AddProductClient'), { ssr: false });

export default function Page() {
  return <AddProductClient />;
}
