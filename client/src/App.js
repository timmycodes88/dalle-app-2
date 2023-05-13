import tw, { styled } from 'twin.macro'
import { NavLink, Outlet, useLoaderData, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ReactComponent as Hamburger } from './assets/svg/hamburger.svg'
import { ReactComponent as X } from './assets/svg/x.svg'
import { ToastContainer } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'

injectStyle()

/**@type {boolean} Authenticated or not */
const useAppData = () => useLoaderData()

export default function App() {
  const auth = useAppData()
  const [navOpen, setNavOpen] = useState(false)

  const { pathname } = useLocation()
  useEffect(() => {
    setNavOpen(false)
  }, [pathname])

  return (
    <Body>
      <Header>
        <HelloWorld>TimageAI</HelloWorld>
        <Nav>
          <OpenNavButton
            open={navOpen}
            onClick={() => setNavOpen(curr => !curr)}
          >
            {
              {
                true: <X />,
                false: <Hamburger />,
              }[navOpen]
            }
          </OpenNavButton>
          <MobileNav
            auth={auth}
            isOpen={navOpen}
            close={() => setNavOpen(false)}
          />
          <DesktopNav auth={auth} />
        </Nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </Body>
  )
}

const MobileNav = ({ auth, isOpen, close }) => {
  return (
    <>
      {isOpen && <Overlay onClick={close} />}
      <Mobile open={isOpen}>
        {auth ? (
          <>
            <NavItem to='/'>Home</NavItem>
            <NavItem to='/create'>Create</NavItem>
            <NavItem to='/logout'>Logout</NavItem>
          </>
        ) : (
          <>
            <NavItem to='/'>Home</NavItem>
            <NavItem to='/get-in'>Get In</NavItem>
          </>
        )}
      </Mobile>
    </>
  )
}
const DesktopNav = ({ auth }) => {
  return (
    <Desktop>
      {auth ? (
        <>
          <NavItem to='/'>Home</NavItem>
          <NavItem to='/create'>Create</NavItem>
          <NavItem to='/logout'>Logout</NavItem>
        </>
      ) : (
        <>
          <NavItem to='/'>Home</NavItem>
          <NavItem to='/get-in'>Get In</NavItem>
        </>
      )}
    </Desktop>
  )
}
const Mobile = styled.div(({ open }) => [
  tw`md:hidden flex flex-col space-y-4 h-screen w-[calc(100vw - 20%)] fixed top-0 right-0 z-40 bg-zinc-900 items-center justify-center text-white transition-all duration-300`,
  open ? tw`translate-x-0` : tw`translate-x-[100vw]`,
])
const Overlay = tw.button`fixed top-0 left-0 w-screen h-screen bg-black/50 z-30`
const Desktop = tw.div`hidden md:flex gap-4 text-white`

const Body = tw.div`bg-zinc-900 h-screen overflow-y-auto overflow-x-hidden
[--header-height: 8rem;] [--space: 6rem;]
`
const Header = tw.header`bg-zinc-700/20 sticky top-0 backdrop-blur h-[var(--header-height)] z-30 flex items-center px-2 md:px-32`
const OpenNavButton = styled.button(({ open }) => [
  tw`md:hidden fixed z-50 top-[calc(var(---header-height) / 2)] -translate-y-1/2 right-2 p-4 rounded-md
  [svg]:(text-white w-8 h-8)`,
])
const HelloWorld = tw.h1`text-center md:text-left text-white text-5xl mx-auto`
const Main = tw.main`flex items-center justify-center min-h-screen pt-10 py-4`
const Nav = tw.nav`md:ml-auto`
const NavItem = tw(NavLink)`text-white text-2xl ml-8 [&.active]:underline`
