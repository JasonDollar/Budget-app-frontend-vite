import React from 'react'

interface Props {
  error: {
    message?: string
    errorData?: {
      message?: string
    }
  }
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  if (Object.values(error).length <= 0) return null
  if (error.errorData) {
    return (
      <div>
        <p>{error.errorData.message}</p>
      </div>
    )
  }
  if (error.message) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <p>An error occured</p>
    </div>
  )
}

export default ErrorMessage
