import tw from 'twin.macro'
import PlacholderImg from '../assets/images/placeholder-square.jpg'
import Loading from '../components/Loading'
import { useNavigation, useSubmit } from 'react-router-dom'
import { useCreateData } from '../routes/createRoute'
import { useRef } from 'react'

export const GENERATE = 'GENERATE'
export const POST = 'POST'

export default function Create() {
  const image = useCreateData()

  const promptRef = useRef(null)
  const commentRef = useRef(null)

  const { state } = useNavigation()
  const submit = useSubmit()

  const generateImage = () =>
    submit(
      { type: GENERATE, prompt: promptRef.current.value },
      { method: 'POST' }
    )
  const postImage = () =>
    submit(
      {
        type: POST,
        prompt: promptRef.current.value,
        comment: commentRef.current.value,
        image,
      },
      { method: 'POST' }
    )

  return (
    <Wrapper>
      <Title>Create an Image</Title>
      <label>Enter a Prompt</label>
      <Input
        ref={promptRef}
        onKeyDown={e => e.key === 'Enter' && generateImage()}
        type='text'
        name='prompt'
        maxLength={150}
      />
      <Button onClick={generateImage}>Generate</Button>

      <Result>Here are your results:</Result>

      <ImageWrap>
        {state === 'submitting' && <Loading />}
        <img src={image || PlacholderImg} alt='' />
      </ImageWrap>

      <label>Enter a Caption</label>
      <TextArea
        ref={commentRef}
        type='text'
        name='caption'
        maxLength={150}
        placeholder='Optional'
      />
      <Button onClick={postImage}>Post</Button>
    </Wrapper>
  )
}

const Wrapper = tw.div`flex flex-col space-y-4 text-white px-4`
const Title = tw.h1`text-3xl font-bold`
const Result = tw.h2`text-2xl font-bold`

const ImageWrap = tw.div`relative flex justify-center items-center h-80 w-80 rounded-md`

const Input = tw.input`border border-gray-300 rounded-md p-2 text-zinc-900`
const TextArea = tw.textarea`border border-gray-300 rounded-md p-2 text-zinc-900`
const Button = tw.button`bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded`
