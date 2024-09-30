import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './InformationPage.css';

const InformationPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Information</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Information</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="content-information-page">
                    <p>Information</p>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default InformationPage;
