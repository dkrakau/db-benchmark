import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LoadingCard from "../components/LoadingCard";
import './HistoryPage.css';

const HistoryPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="content-history-page">
          <div className="items">
            <LoadingCard state={"Loading"} query={5} queries={100} />
          </div>
        </IonContent>
      </IonContent>
    </IonPage >
  );
};

export default HistoryPage;
