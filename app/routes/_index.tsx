import type { V2_MetaFunction } from "@remix-run/react";
import { Link } from '@remix-run/react'
import styles from '~/styles/home.css'

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <main id='content'>
      <h1>A better way of keeping track of your notes</h1>
      <p>Try our early beta and never lose track of your notes again!</p>
      <p id='cta'>
        <Link to='/notes'>Try now!</Link>
      </p>
    </main>
  );
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}