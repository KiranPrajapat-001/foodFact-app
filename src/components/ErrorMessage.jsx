function ErrorMessage({ message }) {
  return (
    <div className="error" role="alert">
      ⚠️ {message}
    </div>
  )
}

export default ErrorMessage
