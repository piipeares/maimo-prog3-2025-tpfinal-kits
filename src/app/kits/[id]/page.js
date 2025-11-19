import KitDetailContainer from "../../../components/KitDetailContainer";

export default function Page({ params }) {
  return <KitDetailContainer id={params.id} />;
}