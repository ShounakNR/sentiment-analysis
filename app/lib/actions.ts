'use server';
// import { sql } from '@vercel/postgres'
import { revalidatePath, unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import {z} from 'zod';
import { sql } from '@vercel/postgres'
// import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error : any) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  id: z.string(),
  userId: z.number(),
  search_text: z.string().min(1, {message:'Text cannot be blank'} ),
  score: z.string({
    required_error: 'Run analysis before saving in DB'
  }).min(1, {message:'Run analysis before saving in DB'} ),
  date: z.string(),
  sentiment: z.string({
    required_error: 'Run analysis before saving in DB'
  }).min(1, {message:'Run analysis before saving in DB'})
})

export async function createEntry(prevState: {
  message: string;
}, formData: FormData) {

  const CreateEntry = FormSchema.omit({id: true, date: true})
  const validatedFormData = CreateEntry.safeParse({
    userId: formData.get('userId') || 1,
    search_text: formData.get('search_text'),
    score: formData.get('score'),
    sentiment: formData.get('sentiment')
  });


  if (!validatedFormData.success) {
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: 'Failed to create the db record.',
    };
  }
  const date = new Date().toISOString().split('T')[0]
  const { userId, search_text,score, sentiment } = validatedFormData.data

  try {
    await sql`
      INSERT INTO searches (user_id, search_text, sentiment, score, date)
      VALUES (${userId}, ${search_text}, ${sentiment}, ${score}, ${date})
    `;
  } catch (error) {
    console.log('ERROR', error)
    return {
      message: 'Database Error: Failed to create record.'
    }
  }
  revalidatePath('/home')
  return { message: 'The record was successully added to the DB.'}
}

export async function fetchRecords() {
  unstable_noStore()
  try {
    const data = await sql`
      SELECT *
      FROM searches;`

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}