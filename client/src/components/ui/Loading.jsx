import React from 'react'

// Loading spinner component
const Loading = () => {
  return (
    <div className="w-100 d-flex justify-content-center my-5">
        <div className='spinner-border' role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Loading