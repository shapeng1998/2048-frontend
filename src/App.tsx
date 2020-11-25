import React from 'react';
import {Route, Switch} from "react-router-dom";

import Home from './pages/Home'
import SingleGame from './pages/SingleGame'
import MultiGame from './pages/MultiGame';
import {GameProvider} from './hooks/useGame'
import {PlayerProvider} from './hooks/usePlayer'
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Switch>
        <PlayerProvider>
          <GameProvider>
            <Layout>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/singleplayer" exact>
                <SingleGame />
              </Route>
              <Route path="/multiplayer" exact>
                <MultiGame />
              </Route>
            </Layout>
          </GameProvider>
        </PlayerProvider>
      </Switch>
    </>
  );
}

export default App;
