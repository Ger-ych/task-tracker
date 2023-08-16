import React from 'react'

const ErrorMessage = ({ error }) => {
    if (!error) return null

    return (
        <div className="p-1 text-danger w-100 mb-0 rounded">
            {error}
        </div>
    )
}

export default ErrorMessage