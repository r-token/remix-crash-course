import { json, redirect } from '@remix-run/node'
import { useLoaderData,useRouteError, isRouteErrorResponse, Link } from '@remix-run/react'
import NewNote, { links as newNoteLinks } from '~/components/NewNote'
import NoteList, { links as noteListLinks } from '~/components/NoteList'
import { getStoredNotes, storeNotes } from '~/data/notes'

export default function Notes() {
  const notes = useLoaderData()

  return (
    <main>
      <NewNote />
      <NoteList notes={notes}/>
    </main>
  )
};

// another Remix reserved name like action and links
// triggered by Remix whenever a GET request reaches the client-side route of this componenet
// executed whenever a user visits this page
export async function loader() {
  const notes = await getStoredNotes()
  if (!notes || notes.length === 0) {
    throw json({ message: 'Could not find any notes' }, {
      status: 404,
      statusText: 'Not Found'
    })
  }
  return notes // this makes notes available to this component; sent to the front-end
}

// Remix looks for a function called action - triggered upon form submission
// Code in here will execute on the back-end, not in the browser
// Code defined here will not be downloaded to the client
// Triggered whenever a non-GET request reaches this route
// A GET request is fired when we just visit the normal /notes page
export async function action({request}) {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)

  if (noteData.title.trim().length < 5) {
    return { message: 'Invalid title - must be at least 5 characters long' }
  }

  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(noteData)
  await storeNotes(updatedNotes)
  return redirect('/notes')
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()]
}

export function meta() {
  return [{
    title: 'All Notes',
    description: 'Manage your notes with ease.'
  }]
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.log('notes error:', error)

  if (isRouteErrorResponse(error)) {
    return (
      <main className='info-message'>
        <NewNote />
        <p>{error.data.message}</p>
        <p>{error.data.status}</p>
        <p>{error.data.statusText}</p>
        <p>Back to <Link to='/'>Safety</Link></p>
      </main>
    )
  }

  let errorMessage = 'Unknown error'
  return (
    <main className='error'>
      <h1>Unknown error occurred related to notes!</h1>
      <p>{errorMessage}</p>
      <p>Back to <Link to='/'>Safety</Link></p>
    </main>
  )
}