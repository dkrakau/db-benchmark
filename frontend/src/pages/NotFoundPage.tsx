import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { thunderstorm } from "ionicons/icons";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page not found</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">NotFoundPage</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className={styles.contentNotFoundPage}>
                    <div className={styles.error}>
                        <IonIcon className={styles.errorIcon} src={thunderstorm} />
                        <div>
                            <p className={styles.errorCode}>404</p>
                            <p className={styles.errorMessage}>Ups! Something went wrong.</p>
                        </div>
                    </div>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default NotFoundPage;
