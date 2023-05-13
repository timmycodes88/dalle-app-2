import tw from 'twin.macro'
import { Link, Outlet, useLoaderData } from 'react-router-dom'

/**@type {boolean} Authenticated or not */
const useAppData = () => useLoaderData()

export default function App() {
  const auth = useAppData()
  return (
    <Body>
      <Header>
        <HelloWorld>MERN Template</HelloWorld>
        <Nav>
          {auth ? (
            <>
              <NavItem to='/'>Home</NavItem>
              <NavItem to='/logout'>Logout</NavItem>
            </>
          ) : (
            <>
              <NavItem to='/'>Home</NavItem>
              <NavItem to='/get-in'>Get In</NavItem>
            </>
          )}
        </Nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Body>
  )
}

const Body = tw.div`bg-zinc-900 h-screen overflow-auto
[--header-height: 8rem;] [--space: 2rem;]
`
const HelloWorld = tw.h1`text-white text-5xl`
const Header = tw.header`bg-zinc-700/20 rounded-b-[5rem] sticky top-0 backdrop-blur h-[var(--header-height)] flex items-center px-32`
const Main = tw.main`flex items-center justify-center min-h-[calc(100vh - var(--header-height))] pt-[var(--header-height) + var(--space)]`
const Nav = tw.nav`ml-auto`
const NavItem = tw(Link)`text-white text-2xl ml-8`
