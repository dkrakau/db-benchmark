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
import { layersOutline, readerOutline, settingsOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Tab2 from './pages/History';
import Tab3 from './pages/Settings';
import Tab1 from './pages/Testing';

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
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/testing">
            <Tab1 />
          </Route>
          <Route exact path="/history">
            <Tab2 />
          </Route>
          <Route path="/settings">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/testing" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="testing" href="/testing">
            <IonIcon aria-hidden="true" icon={layersOutline} />
            <IonLabel>Testing</IonLabel>
          </IonTabButton>
          <IonTabButton tab="history" href="/history">
            <IonIcon aria-hidden="true" icon={readerOutline} />
            <IonLabel>History</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon aria-hidden="true" icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
