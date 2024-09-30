import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import styles from "./SettingsPage.module.css";

const SettingsPage: React.FC = () => {
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
          <IonList className={styles.settingsList}>
            <IonItem>
              <IonInput label="Number of queries" value="100" />
            </IonItem>
          </IonList>
          <div className={styles.saveBtn}>
            <IonButton>Save</IonButton>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
