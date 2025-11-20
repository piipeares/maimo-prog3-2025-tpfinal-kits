import KitDetailContainer from "../../../components/KitDetailContainer";

export default async function Page({ params }) {
  const { id } = await params;
  return <KitDetailContainer id={id} />;
}