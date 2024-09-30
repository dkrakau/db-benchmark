import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ChartCard from "../components/ChartCard";
import LoadingCard from "../components/LoadingCard";
import styles from "./HistoryPage.module.css";

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
        <IonContent className={styles.contentHistoryPage}>
          <div className={styles.items}>
            <LoadingCard state={"Loading"} query={5} queries={100} />
            <ChartCard />
          </div>
        </IonContent>
      </IonContent>
    </IonPage >
  );
};

export default HistoryPage;
