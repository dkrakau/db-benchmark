import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRange, IonRow, IonTitle, IonToast, IonToggle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from "react";
import { useStorage } from "../hooks/useStorage";
import styles from "./SettingsPage.module.css";

interface SettingsPageProps {
  queriesTotal: number;
  setQueriesTotal: (x: number) => void;
  cutOff: number;
  setCutOff: (cutOff: number) => void;
  isDarkModeEnabled: boolean;
  setIsDarkModeEnabled: (isDarkModeEnabled: boolean) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = (props) => {

  const { settings } = useStorage();
  const { updateSettings } = useStorage();

  const [queriesTotal, setQueriesTotal] = useState<number>(props.queriesTotal);
  const [cutOff, setCutOff] = useState<number>(props.cutOff);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(props.isDarkModeEnabled);

  const handleNumberOfQueriesChange = (e: any) => {
    let value = e.detail.value;
    setQueriesTotal(value);
  }

  const handleCutOfChange = (e: any) => {
    let value = e.detail.value;
    setCutOff(value);
  }

  const handleIsDarkModeChange = (e: any) => {
    let value = e.detail.checked;
    console.log(value);
    document.documentElement.classList.toggle('ion-palette-dark', value);
    setIsDarkModeEnabled(() => value);
  }

  const saveSettings = () => {
    updateSettings(queriesTotal, cutOff, isDarkModeEnabled);
  }

  useEffect(() => {
    if (settings !== undefined) {
      setQueriesTotal(settings?.queriesTotal);
      setCutOff(settings?.cutOff);
      document.documentElement.classList.toggle('ion-palette-dark', settings?.isDarkModeEnabled);
      setIsDarkModeEnabled(settings?.isDarkModeEnabled);
    }
  }, [settings]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className={styles.contentSettingsPage}>
          <IonGrid className={styles.grid}>
            <IonRow>
              <IonCol>
                <p>Number of queries</p>
              </IonCol>
              <IonCol class={styles.asRow}>
                <IonRange className={styles.range} value={queriesTotal} min={1} max={1000} onIonChange={e => handleNumberOfQueriesChange(e)} />
                <p className={styles.rangeValue}>{queriesTotal}</p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <p>Cut off in %</p>
              </IonCol>
              <IonCol class={styles.asRow}>
                <IonRange className={styles.range} min={1} max={100} onIonChange={e => handleCutOfChange(e)} />
                <p className={styles.rangeValue}>{cutOff}</p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <p>Dark mode</p>
              </IonCol>
              <IonCol className={styles.asRow}>
                <IonToggle checked={isDarkModeEnabled} disabled={false} onIonChange={e => handleIsDarkModeChange(e)} />
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className={styles.saveBtn}>
            <IonButton id="saveBtn" onClick={() => saveSettings()}>Save</IonButton>
            <IonToast trigger="saveBtn" message="Settings saved" duration={2000} position="top" />
          </div>
        </IonContent>

      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
