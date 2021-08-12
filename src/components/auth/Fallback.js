import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const Fallback = () => {
    return (
        <Segment style={{ height: '100vh' }}>
            <Dimmer active>
                <Loader>Loading</Loader>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Dimmer>
        </Segment>
    )
}

export default Fallback
