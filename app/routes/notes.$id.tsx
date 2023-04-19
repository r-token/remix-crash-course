import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { getStoredNotes } from "~/data/notes"
import styles from '~/styles/note-details.css'

export default function NotesDetails() {
  const note = useLoaderData()

  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id='note-details-content'>{note.content}</p>
    </main>
  )
};

export async function loader({ params }) {
  const notes = await getStoredNotes()
  const noteId = params.id
  const selectedNote = notes.find(note => note.id === noteId)

  if (!selectedNote) {
    throw json({ message: 'Could not find note for ID ' + noteId})
  }

  return selectedNote
}

export function meta({ data }) {
  return [
    {
      title: data.title,
      description: `A note about ${data.description}`
    }
  ]
}

export function links() {
  return (
    [{ rel: 'stylesheet', href: styles }]
  )
}