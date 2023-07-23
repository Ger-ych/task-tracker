const ErrorMessage = ({ error }) => {
    if (!error) return null

    return (
        <div className="alert alert-warning w-100 mb-0" role="alert">
            {error}
        </div>
    )
}

export default ErrorMessage