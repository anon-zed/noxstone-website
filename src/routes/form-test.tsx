import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/form-test")({
  component: FormTestPage,
});

export function FormTestPage() {
  return (
    <main>
      <form>
        <h1>Plain form test</h1>
        <p>Temporary baseline with plain uncontrolled HTML fields only.</p>

        <p>Name</p>
        <input name="name" type="text" />

        <p>Phone</p>
        <input name="phone" type="text" />

        <p>Email</p>
        <input name="email" type="text" />

        <p>Property address</p>
        <input name="property_address" type="text" />

        <p>Project details</p>
        <textarea name="project_details" rows={5} />

        <button type="button">No-op button</button>
      </form>
    </main>
  );
}
