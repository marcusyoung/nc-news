import { useLocation } from "react-router-dom";

function ErrorPage({ data }) {

    const location = useLocation()

    return (
        <section id="error-notification">
            <h1>Oops...</h1>
            <h2>We can't seem to find what you're looking for.</h2>
            <p>Error message: {data ? data.message : location.state.message}</p>
        </section>
    )
}

export default ErrorPage