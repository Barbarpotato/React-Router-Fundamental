# Introduction
In traditional websites, the browser requests a document from a web server, downloads and evaluates CSS and JavaScript assets, and renders the HTML sent from the server. When the user clicks a link, it starts the process all over again for a new page.

Client side routing allows your app to update the URL from a link click without making another request for another document from the server. Instead, your app can immediately render some new UI and make data requests with fetch to update the page with new information.

This enables faster user experiences because the browser doesn't need to request an entirely new document or re-evaluate CSS and JavaScript assets for the next page. It also enables more dynamic user experiences with things like animation.

## Setup and installation
For this course, we will install react-router-dom version 6.3.0
```terminal
npm install react-router-dom@6.3.0
```
Then, connect the react-router-dom to the React Application.
```js
...
...
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

```

## Make Navigations Menu
To make navigations menu, we can use `Link` from react-ruouter-dom library:
```js
...
...
import { Link } from "react-router-dom"

function App() {

  return (
    <div className="App">
      <Link to={'/Expenses'}><h1>Expenses</h1></Link>
      <Link to={'/Invoices'}><h1>Invoices</h1></Link>
    </div>
  )
}
```
Now, we can redirect our page to the specified url that we define above. Right now, we dont have any routes that render when the url changes yet. `Link` is changing the url without causing a full page reload. Next step, we want to render a component as well with this specified url.

## Rendering Component In Specified URL
To render some component using the url we have created above, we need to define `Routes` and `Route` from `react-router-dom`. `Routes` & `Route` are the primary ways to render something in the React Application based on current location. 
```js
...
...
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/Invoices' element={<Invoices />}></Route>
      <Route path='/Expenses' element={<Expenses />}></Route>
    </Routes>
  </BrowserRouter>
)
```

## Nested Route
in Above case when we clicking some navigations, it will take us to the new component and the navigation menu is gone. We want to make the navigations still appear and keep the other new component render at the same time. The problem in above code, we make the App component is sibling to the other component like expenses and invoices. The solution is, we need to make the expenses and invoices component are children to the app component:
```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/Invoices' element={<Invoices />}></Route>
        <Route path='/Expenses' element={<Expenses />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
```
We still have a problem in this scenario, the invoices & expenses UI is not displayed. to make them appear,
we can use `Outlet` component from `react-router-dom`. The `Outlet` should be used in the parent route element to render their child route element:
```js
...
...
import { Link, Outlet } from "react-router-dom"

function App() {

  return (
    <div className="App">
      <Link to={'/Expenses'}><h1>Expenses</h1></Link>
      <Link to={'/Invoices'}><h1>Invoices</h1></Link>
      <Outlet />
    </div>
  )
}
```
We can still add a route in the child component, but noted that we need to follow the absolute path from the above component hierarchy:
```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/Invoices' element={<Invoices />}>
          <Route path='/Invoices/123' element={<div>123</div>}></Route>
        </Route>
        <Route path='/Expenses' element={<Expenses />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
```

## Create No matches Routes
```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/Invoices' element={<Invoices />}></Route>
        <Route path='/Expenses' element={<Expenses />}></Route>
        <Route path='*' element={<main><p>There is nothing here</p></main>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
```

## Dynamic Route
we can make dynamic route by define like this: `/Invoices/:invoiceId`: 
```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/Invoices' element={<Invoices />}>
          <Route path=':invoicesId' element={<InvoicesInformation />}></Route>
        </Route>
        <Route path='/Expenses' element={<Expenses />}></Route>
        <Route path='*' element={<main><p>There is nothing here</p></main>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
```
in InvoicesInformation Component, we can use `useParams()` from `react-router-dom` to get the dynamic route current location:
```js
...
...
import { useParams } from 'react-router-dom'

function InvoicesInformation() {
    const { invoicesId } = useParams()
    return (
        <div>This is params route: {invoicesId}</div>
    )
}

export default InvoicesInformation
```

## Using NavLink to style the navigation
Instead of using `Link` we can use `NavLink` from `react-router-dom` to make style for our Navigations page:
```js
import { NavLink, Outlet } from "react-router-dom"
import React from "react"

function App() {

  return (
    <div className="App">
      <NavLink style={({ isActive }) => {
        return { color: isActive ? 'red' : 'black' }
      }}
        to={'/Expenses'}>Expenses</NavLink>
      <NavLink to={'/Invoices'}>Invoices</NavLink>
      <Outlet />
    </div>
  )
}

export default App
```

## Build Component Route Using useRoutes Hook
The useRoutes hook is the functional equivalent of `<Routes>`, but it uses JavaScript objects instead of `<Route>` elements to define your routes. These objects have the same properties as normal `<Route>` elements, but they don't require JSX.
```js
...
...
import { useRoutes, Outlet } from 'react-router-dom';

function App() {

   const routes = useRoutes([
    {
      path: "/",
      element: <div>Home <Outlet></Outlet></div>,
      children: [
        {
          index: true,
          element: <div>Home Content</div>
        },
        {
          path: "/login",
          element: <div>Login</div>
        },
        {
          path: "/dashboard",
          element: <div>Dashboard</div>
        },
        {
          path: "/settings",
          element: <div>Settings</div>
        }
      ]
    }
  ])

  return routes
}
```

## Create a dummy Authentication Using Context Hook
we can create context to make a dummy context:
```js
import { createContext, useContext, useReducer } from "react"

const authContext = createContext(null)

const auth = { auth: false }

const reducer = (_state, action) => {
    switch (action.type) {
        case 'login':
            return { auth: true }
        case 'logout':
            return { auth: false }
        default:
            throw new Error
    }
}

export const AuthProvider = ({ children }) => {
    const [authed, dispatch] = useReducer(reducer, auth)
    return (
        <authContext.Provider value={[authed, dispatch]}>
            {children}
        </authContext.Provider>
    )
}

export const useAuthContext = () => useContext(authContext)
```
and then wrap the component who needs to access this auth value to the AuthProvider Component:
```js
...
import { AuthProvider } from './auth/auth';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
```

## Redirect Route Using useNavigate Hook
The useNavigate hook returns a function that lets you navigate programmatically. for this case we want to make the user redirect to other routes if user has click the login Button:
```js
...
...
import {useNavigate} from 'react-router-dom'

export const LoginPage = () => {

    const [authed, dispatch] = useAuthContext()
    let navigate = useNavigate()

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={() => {
                dispatch({ type: 'login' })
                navigate('/dashboard')
            }}>login account</button>
        </div>
    )
}
```

## Protect Route Component using the custom Component
### building the component that can protected other routes component
so far, we have created the authContext which can be accessed trough all the component by just calling the function. Now we can build the custom component that can protected the routes that need to be accessed only if user has authenticated:
```js
import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../auth/auth"

export const RequiredAuth = ({ children }) => {
    const [authed, _dispatch] = useAuthContext()
    const location = useLocation()
    return authed.auth === true ?
        { children }
        :
        <Navigate to={'/login'} replace state={{ path: location.pathname }} />
}
```
### Wrap all sensitive component using custom component
After building our custom component, then we can use the custom component to wrap all the component that need to be protect:
```js
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          index: true,
          element: <HomeContent />
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/dashboard",
          element: <RequiredAuth> <DashboardPage /></RequiredAuth>
        },
        {
          path: "/settings",
          element: <RequiredAuth><Settings /></RequiredAuth>
        }
      ]
    }
  ])
```
