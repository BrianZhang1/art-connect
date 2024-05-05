'use server'
import { sql } from "@vercel/postgres"

export async function addEvent(formData: FormData) {
    sql`INSERT INTO events VALUES (${String(formData.get('name'))}, ${String(formData.get('type'))}, ${Number(formData.get('latitude'))}, ${Number(formData.get('longitude'))})`
}