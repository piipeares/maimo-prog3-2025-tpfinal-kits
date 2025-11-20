import TeamDetailContainer from "../../../components/TeamDetailContainer";

export default async function Page({ params }) {
  const { id } = await params;
  return <TeamDetailContainer id={id} />;
}