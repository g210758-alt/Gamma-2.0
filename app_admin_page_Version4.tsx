import { getEmails } from "@/lib/emailStore";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const emails = await getEmails();

  return (
    <main className="container">
      <h1>Admin — Email List</h1>
      <p className="small">Only the admin can access this page.</p>
      <div className="card">
        {emails.length === 0 ? (
          <div>No emails yet.</div>
        ) : (
          <ul>
            {emails.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}