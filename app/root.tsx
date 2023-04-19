import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import styles from '~/styles/main.css'
import MainNavigation from "./components/MainNavigation";

// the main skeleton which will be wrapped around all main components
// always rendered no matter which route we're on
// our components are injected into the Outlet part defined below
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Remix specific function
// The component Remix will display if an error happens ANYWHERE in the application
// This is because we're in the root
// For more specific error messages, add an ErrorBoundary to those components
export function ErrorBoundary() {
  const error = useRouteError()
  console.log('my error:', error)

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <title>An error occurred!</title>
        </head>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main className="error">
            <h1>An error occurred</h1>
            <p>{error.data.message}</p>
            <p>Back to <Link to='/'>Safety</Link></p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }

  let errorMessage = "Unknown error";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className='error'>
          <h1>An error occurred</h1>
          <p>{errorMessage}</p>
          <p>Back to <Link to='/'>Safety</Link></p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

// reserved Remix name
// Remix looks for this if we want to add extra links we want added in the Head section of our HTML
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}
