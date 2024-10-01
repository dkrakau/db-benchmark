import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { informationCircleOutline, layersOutline, readerOutline, settingsOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import HistoryPage from "./pages/HistoryPage";
import InformationPage from "./pages/InformationPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingsPage";
import TestingPage from "./pages/TestingPage";
import milvusLogo from './pics/milvus-logo.png';
import postgresLogo from './pics/postgres-logo.png';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import '@ionic/react/css/palettes/dark.class.css';
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import { useState } from "react";
import { LoadingState } from "./components/LoadingCard";
import './theme/variables.css';

setupIonicReact();

document.documentElement.classList.toggle('ion-palette-dark', false);

export interface DatabaseData {
  logo: string,
  description: string,
  selected: boolean,
  state: LoadingState
}

const App: React.FC = () => {

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [selectedDbs, setSelectedDbs] = useState<string[]>([]);
  const [dbs, setDbs] = useState<Map<string, DatabaseData>>(new Map([
    [
      "Milvus",
      {
        logo: milvusLogo,
        description: "Versoin 2.4.4",
        selected: false,
        state: LoadingState.loading,
      }
    ],
    [
      "Postgres",
      {
        logo: postgresLogo,
        description: "Version 16.4",
        selected: false,
        state: LoadingState.loading,
      }
    ],
  ]));

  const updateDbs = (key: string, value: DatabaseData) => {
    setDbs(new Map(dbs.set(key, value)));
  }

  const resetPage = () => {
    setIsConfirmed(false);
    for (let [dbName, databaseData] of dbs) {
      if (databaseData?.selected) {
        databaseData.selected = false;
        databaseData.state = LoadingState.pending;
      }
    }
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/testing">
              <TestingPage
                isConfirmed={isConfirmed}
                setIsConfirmed={setIsConfirmed}
                selectedDbs={selectedDbs}
                setSelectedDbs={setSelectedDbs}
                dbs={dbs}
                setDbs={setDbs}
                updateDbs={updateDbs}
              />
            </Route>
            <Route exact path="/history">
              <HistoryPage
                isConfirmed={isConfirmed}
                setIsConfirmed={setIsConfirmed}
                selectedDbs={selectedDbs}
                setSelectedDbs={setSelectedDbs}
                dbs={dbs}
                setDbs={setDbs}
                updateDbs={updateDbs}
              />
            </Route>
            <Route exact path="/information">
              <InformationPage />
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/testing" />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="testing" href="/testing" onClick={() => resetPage()}>
              <IonIcon aria-hidden="true" icon={layersOutline} />
              <IonLabel>Testing</IonLabel>
            </IonTabButton>
            <IonTabButton tab="history" href="/history" onClick={() => resetPage()}>
              <IonIcon aria-hidden="true" icon={readerOutline} />
              <IonLabel>History</IonLabel>
            </IonTabButton>
            <IonTabButton tab="information" href="/information" onClick={() => resetPage()}>
              <IonIcon aria-hidden="true" icon={informationCircleOutline} />
              <IonLabel>Information</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings" onClick={() => resetPage()}>
              <IonIcon aria-hidden="true" icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
