import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import { action as manipulateEventAction } from "./components/EventForm";
import { action as newsletterAction } from "./pages/Newsletter";
import { action as authAction } from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { LoaderToken, checkAuthLoader } from "./utils/auth";
import { Suspense, lazy } from "react";

const EditEventPage = lazy(() => import("./pages/EditEvent"));
const ErrorPage = lazy(() => import("./pages/Error"));
const EventDetailPage = lazy(() => import("./pages/EventDetail"));
const EventsPage = lazy(() => import("./pages/Events"));
const EventsRootLayout = lazy(() => import("./pages/EventsRoot"));
const HomePage = lazy(() => import("./pages/Home"));
const NewEventPage = lazy(() => import("./pages/NewEvent"));
const RootLayout = lazy(() => import("./pages/Root"));
const NewsletterPage = lazy(() => import("./pages/Newsletter"));
const Authentication = lazy(() => import("./pages/Authentication"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense falling={<p>loading....</p>}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense falling={<p>loading....</p>}>
        <ErrorPage />
      </Suspense>
    ),
    id: "root",
    loader: LoaderToken,
    children: [
      {
        index: true,
        element: (
          <Suspense falling={<p>loading....</p>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "events",
        element: (
          <Suspense falling={<p>loading....</p>}>
            <EventsRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense falling={<p>loading....</p>}>
                <EventsPage />
              </Suspense>
            ),
            loader: (meta) => import('./pages/Events').then((module) => module.loader(meta)),
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: (
                  <Suspense falling={<p>loading....</p>}>
                    <EventDetailPage />
                  </Suspense>
                ),
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: (
                  <Suspense falling={<p>loading....</p>}>
                    <EditEventPage />
                  </Suspense>
                ),
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: (
              <Suspense falling={<p>loading....</p>}>
                <NewEventPage />
              </Suspense>
            ),
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "auth",
        element: (
          <Suspense falling={<p>loading....</p>}>
            <Authentication />
          </Suspense>
        ),
        action: authAction,
      },
      {
        path: "newsletter",
        element: (
          <Suspense falling={<p>loading....</p>}>
            <NewsletterPage />
          </Suspense>
        ),
        action: newsletterAction,
      },

      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
