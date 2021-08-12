import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { Grid } from "semantic-ui-react";
import SidePanel from "./components/SidePanel/SidePanel";
import ChatPanel from "./components/ChatPanel/ChatPanel";
import styles from './app.module.css'

function App() {
  const count = useSelector(state => state.counterReducer)
  const currentChannel = useSelector(state => state.channelReducer.currentChannel)

  useEffect(() => {
  }, [count])

  return (

    <Grid columns="2" style={{ background: '#eee' }}>
      <Grid.Column width="3" style={{ color: '#000' }}>
        <SidePanel />
      </Grid.Column>
      <Grid.Column className={styles.deneme} width="13" style={{ color: '#000' }}>
        {currentChannel && <ChatPanel currentChannel={currentChannel} />}
      </Grid.Column>
    </Grid>


  )
}

export default App;
