import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from "react";
import DatabaseCard from "../components/DatabaseCard";
import milvusLogo from '../pics/milvus-logo.png';
import postgresLogo from '../pics/postgres-logo.png';
import './Testing.css';

interface DatabaseData {
  logo: string,
  description: string,
  selected: boolean,
}

const TestingPage: React.FC = () => {

  const [selection, setSelection] = useState<Map<string, DatabaseData>>(new Map([
    [
      "Milvus",
      {
        logo: milvusLogo,
        description: "Versoin 2.4.4",
        selected: false
      }
    ],
    [
      "Postgres",
      {
        logo: postgresLogo,
        description: "Version 16.4",
        selected: false
      }
    ],
  ]));

  const updateSelection = (key: string, value: DatabaseData) => {
    setSelection(new Map(selection.set(key, value)));
  }

  const onDatabaseClicked = (dbName: string) => {
    const databaseData: DatabaseData | undefined = selection.get(dbName);
    if (databaseData !== undefined) {
      if (databaseData.selected) {
        databaseData.selected = false;
      } else {
        databaseData.selected = true;
      }
      updateSelection(dbName, databaseData);
    }
  };

  const getSelectionCount = () => {
    let selectionCount = 0;
    for (let [dbName, databaseData] of selection) {
      if (databaseData?.selected) {
        selectionCount++;
      }
    }
    return selectionCount;
  };

  const confirm = () => {
    console.log("confirm");
    console.log(selection);
  };

  const renderSelectedDatabases = () => {
    for (let [dbName, databaseData] of selection) {
      if (databaseData?.selected) {
        document.getElementById(dbName)?.setAttribute("style", "border: 2px solid #0054E9;");
      } else {
        document.getElementById(dbName)?.setAttribute("style", "border: 2px solid white;");
      }
    }
  };

  useEffect(() => {
    renderSelectedDatabases();
    console.log(selection);
  }, [selection]);

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
        <IonContent className="content-testing-page">
          <div className="items">
            {
              Array.from(selection).map(([dbName, databaseData]) => (
                <DatabaseCard
                  key={dbName + "-db"}
                  dbName={dbName}
                  dbDescription={databaseData.description}
                  dbLogo={databaseData.logo}
                  onClick={onDatabaseClicked} />
              ))
            }
          </div>
          <div className="bottom">
            <p className="selection-info">{getSelectionCount()} / {selection.size} selected</p>
            <IonButton onClick={confirm} disabled={getSelectionCount() === 0 ? true : false}>Confirm</IonButton>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default TestingPage;
