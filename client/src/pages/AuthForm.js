import { useState } from 'react'
import { Form } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { useAuthError } from '../routes/authRoute'

export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'

const FormElements = {
  [LOGIN]: (
    <>
      <label htmlFor='usernameOrEmail'>Username/Email:</label>
      <input className='form-input' type='text' name='usernameOrEmail' />
      <label htmlFor='password'>Password:</label>
      <input className='form-input' type='password' name='password' />
      <button type='submit'>Submit</button>
      <input className='hidden' name='type' defaultValue={LOGIN} />
    </>
  ),
  [SIGNUP]: (
    <>
      <label htmlFor='username'>Username:</label>
      <input className='form-input' type='text' name='username' />
      <label htmlFor='email'>Email:</label>
      <input className='form-input' type='email' name='email' />
      <label htmlFor='password'>Password:</label>
      <input className='form-input' type='password' name='password' />
      <button type='submit'>Submit</button>
      <input className='hidden' name='type' defaultValue={SIGNUP} />
    </>
  ),
}

const TWForm = tw(Form)`
  text-white
  w-96 flex flex-col 
  [label]:(mt-1)
  [input]:(px-2 py-1 rounded-2xl mb-5 text-slate-900)
  [button]:(bg-white w-32 rounded-2xl mx-auto text-slate-900)
`

const text = {
  [LOGIN]: {
    title: 'Login',
    text: 'Create an Account',
  },
  [SIGNUP]: {
    title: 'Sign Up',
    text: 'Already have an Account',
  },
}
export default function AuthForm() {
  const error = useAuthError()
  const [formType, setFormType] = useState(LOGIN)

  const [shrink, setShrink] = useState(false)

  const toggleFormType = () => {
    setFormType(prev => (prev === LOGIN ? SIGNUP : LOGIN))
    document
      .querySelectorAll('.form-input')
      .forEach(input => (input.value = ''))
  }

  const toggle = () => {
    setShrink(true)
    setTimeout(toggleFormType, 350)
    setTimeout(() => setShrink(false), 350)
  }

  return (
    <Body shrink={shrink}>
      <Title>{text[formType].title}</Title>
      {error && <Error>{error}</Error>}
      <TWForm method='POST'>{FormElements[formType]}</TWForm>
      <ToggleButton text={text[formType].text} toggle={toggle} />
    </Body>
  )
}

const ToggleButton = ({ text, toggle }) => (
  <button onClick={toggle} className='text-white'>
    {text}
  </button>
)

const Body = styled.div(({ shrink }) => [
  tw`bg-zinc-800 rounded-2xl px-12 py-8 
  flex flex-col gap-4 justify-center items-center 
  w-[40rem]
  transition-all duration-300 ease-in-out`,
  shrink ? tw`scale-y-0` : tw`scale-y-100`,
])
const Title = tw.h1` text-white text-5xl`
const Error = tw.div`text-red-500 text-lg`
