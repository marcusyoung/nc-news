import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { getTopicsList } from "../../utils/api"

function Topics() {

    const [topicsList, setTopicsList] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getTopicsList()
            .then((topics) => {
                setLoading(false)
                setTopicsList(topics)
            })
    }, [])

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
        <section id="topics-list">
            <h1>Topics</h1>
            <dl>
                {
                    topicsList.map((topic) => {
                        return (
                            <div key={topic.slug}>
                                <dt ><Link to={`/articles/?topic=${topic.slug}`}>{topic.slug}</Link></dt>
                                <dd key={topic.slug}>{topic.description}</dd>
                            </div>
                        )
                    })
                }
            </dl>
        </section>
    )
}

export default Topics