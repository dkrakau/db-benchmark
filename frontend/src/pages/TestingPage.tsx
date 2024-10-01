import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect } from "react";
import { DatabaseData } from "../App";
import DatabaseCard from "../components/DatabaseCard";
import { LoadingState } from "../components/LoadingCard";
import TestCard from "../components/TestCard";
import styles from "./TestingPage.module.css";

interface TestingPageProps {
  isConfirmed: boolean,
  setIsConfirmed: (x: boolean) => void,
  selectedDbs: string[],
  setSelectedDbs: (array: string[]) => void,
  dbs: Map<string, DatabaseData>,
  setDbs: (map: Map<string, DatabaseData>) => void,
  updateDbs: (key: string, value: DatabaseData) => void
}

const TestingPage: React.FC<TestingPageProps> = (props) => {

  const onDatabaseClicked = (dbName: string) => {
    const databaseData: DatabaseData | undefined = props.dbs.get(dbName);
    if (databaseData !== undefined) {
      if (databaseData.selected) {
        databaseData.selected = false;
      } else {
        databaseData.selected = true;
      }
      props.updateDbs(dbName, databaseData);
    }
  };

  const getSelectionCount = () => {
    let selectionCount = 0;
    for (let [dbName, databaseData] of props.dbs) {
      if (databaseData?.selected) {
        selectionCount++;
      }
    }
    return selectionCount;
  };

  const confirm = () => {
    props.setIsConfirmed(true);
    const selectedDbs: string[] = [];
    for (let [dbName, databaseData] of props.dbs) {
      if (databaseData?.selected) {
        selectedDbs.push(dbName);
      }
    }
    props.setSelectedDbs(selectedDbs);
    const firstSelectedDatabaseData: DatabaseData | undefined = props.dbs.get(selectedDbs[0]);
    if (firstSelectedDatabaseData !== undefined) {
      firstSelectedDatabaseData.state = LoadingState.loading;
    }
  }

  const renderSelectedDbs = () => {
    for (let [dbName, databaseData] of props.dbs) {
      if (databaseData?.selected) {
        document.getElementById(dbName)?.setAttribute("style", "border: 2px solid #0054E9;");
      } else {
        document.getElementById(dbName)?.setAttribute("style", "border: 2px solid white;");
      }
    }
  };

  useEffect(() => {
    renderSelectedDbs();
  }, [props.dbs]);

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
        <IonContent className={styles.contentTestingPage}>
          <div className={styles.items}>
            {props.isConfirmed
              ? Array.from(props.dbs).map(([dbName, databaseData]) => (
                databaseData.selected ?
                  <TestCard
                    key={dbName + "-test-card"}
                    dbName={dbName}
                    selectedDbs={props.selectedDbs}
                    setSelectedDbs={props.setSelectedDbs}
                    dbs={props.dbs}
                    setDbs={props.setDbs}
                    updateDbs={props.updateDbs} />
                  : <></>
              ))
              : Array.from(props.dbs).map(([dbName, databaseData]) => (
                <DatabaseCard
                  key={dbName + "-database-card"}
                  dbName={dbName}
                  dbDescription={databaseData.description}
                  dbLogo={databaseData.logo}
                  onClick={onDatabaseClicked} />
              ))
            }
          </div>
          {props.isConfirmed
            ? <></>
            : <div className={styles.bottom}>
              <p className={styles.selectionInfo}>{getSelectionCount()} / {props.dbs.size} selected</p>
              <IonButton onClick={confirm} disabled={getSelectionCount() === 0 ? true : false}>Confirm</IonButton>
            </div>}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default TestingPage;
