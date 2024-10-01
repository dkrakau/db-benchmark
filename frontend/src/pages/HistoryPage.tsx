import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { DatabaseData } from "../App";
import ChartCard from "../components/ChartCard";
import FileViewerCard from "../components/FileViewerCard";
import LoadingCard from "../components/LoadingCard";
import styles from "./HistoryPage.module.css";

interface HistoryPageProps {
  isConfirmed: boolean,
  setIsConfirmed: (x: boolean) => void,
  selectedDbs: string[],
  setSelectedDbs: (array: string[]) => void,
  dbs: Map<string, DatabaseData>,
  setDbs: (map: Map<string, DatabaseData>) => void,
  updateDbs: (key: string, value: DatabaseData) => void
}

const HistoryPage: React.FC<HistoryPageProps> = (props) => {
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
            <LoadingCard dbName={"dbName"} state={"Loading"} queryCount={5} queriesTotal={100} />
            <ChartCard testdata={[]} />
            <FileViewerCard name="" />
          </div>
        </IonContent>
      </IonContent>
    </IonPage >
  );
};

export default HistoryPage;
