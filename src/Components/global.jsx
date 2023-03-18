import { Navigate, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "../auth/auth"

export const RequiredAuth = ({ children }) => {
    const [authed, _dispatch] = useAuthContext()
    const location = useLocation()
    return authed.auth === true ?
        children
        :
        <Navigate to={'/login'} replace state={{ path: location.pathname }} />
}

export const Nav = () => {
    return (
        <div>
            <ul>
                <NavLink style={({ isActive }) => {
                    return { color: isActive ? 'yellow' : 'white' }
                }} to={'/'}><li>Home</li></NavLink>
                <NavLink style={({ isActive }) => {
                    return { color: isActive ? 'yellow' : 'white' }
                }} to={'/login'}><li>Login</li></NavLink>
                <NavLink style={({ isActive }) => {
                    return { color: isActive ? 'yellow' : 'white' }
                }} to={'/dashboard'}><li>Dashboard</li></NavLink>
                <NavLink style={({ isActive }) => {
                    return { color: isActive ? 'yellow' : 'white' }
                }} to={'/settings'}><li>Settings</li></NavLink>
            </ul>
        </div>
    )
}

export const HomePage = () => {

    const [authed, dispatch] = useAuthContext()
    return (
        <main>
            <div>
                <h1 style={{ backgroundColor: 'yellow', color: 'black', textAlign: 'center' }}>Authentication</h1>
            </div>
            <Nav />
            <div>
                <Outlet />
            </div>
        </main>
    )
}

export const HomeContent = () => {
    return (
        <div>
            <h1>Home Content Component</h1>
        </div>
    )
}


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

export const DashboardPage = () => {
    return (
        <div>
            <h1>Dashboard Page</h1>
        </div>
    )
}

export const Settings = () => {

    const [authed, dispatch] = useAuthContext()
    let navigate = useNavigate()

    return (
        <div>
            <h1>Settings Page</h1>
            <button onClick={() => {
                dispatch({ type: 'logout' })
                navigate('/login')
            }}>Logout</button>
        </div>
    )
}