import AddToVectorizeForm from "./_components/AddToVectorizeForm";
import DeleteFromVectorizeForm from "./_components/DeleteFromVectorizeForm";

export const runtime = "edge";

export default async function AdminAddServicePage() {
  return (
    <>
      <AddToVectorizeForm />
      <DeleteFromVectorizeForm />
    </>
  );
}
