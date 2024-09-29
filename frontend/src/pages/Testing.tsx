import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import GoogleChartTest from "../components/GoogleChartTest";
import './Testing.css';

const Testing: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Testing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Testing</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GoogleChartTest name={""} />
        {/* <ExploreContainer name="Testing page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Testing;
