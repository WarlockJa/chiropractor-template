import AddImageForm from "./_components/AddImageForm";
import ImagesList from "./_components/ImagesList";

export const runtime = "edge";

export default async function AdminAddServicePage() {
  return (
    <>
      <AddImageForm />
      <ImagesList />
    </>
  );
}
