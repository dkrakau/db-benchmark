import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import './LoadingCard.css';

interface InformationCardProps {
    name: string;
}

const InformationCard: React.FC<InformationCardProps> = (props) => {
    return (
        <IonCard className="information-card">
            <IonCardHeader>
                <IonCardTitle className="information-title-card">
                    Information
                </IonCardTitle>
                <IonCardSubtitle className="information-card-subtitle">subtitle</IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    );
};

export default InformationCard;
