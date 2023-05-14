import React from 'react'
import { useHomeData } from '../routes/homeRoute'
import tw from 'twin.macro'

export default function Home() {
  const posts = useHomeData()
  return (
    <Wrapper>
      {posts?.map(({ _id, name, image, prompt, comment }) => (
        <Post key={_id}>
          <Image src={image} alt={prompt} />
          <div className='py-2'>
            <Name>{name}</Name>
            <Prompt>Prompt: {prompt}</Prompt>
            {comment && <Comment>{comment}</Comment>}
          </div>
        </Post>
      ))}
    </Wrapper>
  )
}

const Wrapper = tw.div`max-w-7xl flex flex-wrap justify-center mx-auto gap-6 px-8`
const Post = tw.div`max-w-sm bg-zinc-50 shadow-2xl rounded-lg flex flex-col justify-center items-center p-2`
const Image = tw.img`w-full h-full object-cover`
const Name = tw.h3`text-xl font-bold`
const Prompt = tw.p`text-lg font-semibold`
const Comment = tw.p`text-lg`
