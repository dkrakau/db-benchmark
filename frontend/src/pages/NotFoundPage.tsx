import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './NotFoundPage.css';

const NotFoundPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>NotFoundPage</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">NotFoundPage</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="content-not-found-page">
                    <p>NotFoundPage</p>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default NotFoundPage;
