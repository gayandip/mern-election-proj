import React from 'react'

function Error({message}) {
  return (
    <>
    <div className="h-screen text-center">
      <h1 className="text-6xl m-4">404</h1>
      <h1 className="text-2xl m-4">Not Found !!!</h1>
      <h1 className="text-3xl m-20">{message}</h1>
      </div>
    </>
  )
}

export default Error
