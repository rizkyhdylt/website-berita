import Details from './Details';

export default async function Page({ params }) {
  // ✅ Tunggu params sebelum akses slug
  const { slug } = await params;

  return <Details slug={slug} />;
}
