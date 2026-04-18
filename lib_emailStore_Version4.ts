import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "emails.json");

export async function getEmails(): Promise<string[]> {
  try {
    const raw = await fs.readFile(dataPath, "utf-8");
    const data = JSON.parse(raw);
    if (Array.isArray(data)) return data;
    return [];
  } catch {
    return [];
  }
}

export async function addEmail(email: string): Promise<void> {
  const emails = await getEmails();
  if (!emails.includes(email)) {
    emails.push(email);
    await fs.writeFile(dataPath, JSON.stringify(emails, null, 2), "utf-8");
  }
}