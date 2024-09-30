import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import './LoadingCard.css';

interface LoadingCardProps {
    state: string;
    query: number;
    queries: number;
}

const LoadingCard: React.FC<LoadingCardProps> = (props) => {
    return (
        <IonCard className="loading-card">
            <IonCardHeader>
                <IonCardTitle className="loading-title-card">
                    <div className="rotate">
                        <IonIcon className="rotating-img" src={ellipsisHorizontal} /> {/* sync */}
                    </div>
                    <p className="loading-title">{props.state}</p>
                </IonCardTitle>
                <IonCardSubtitle className="loading-subtitle">{props.query} / {props.queries}</IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    );
};

export default LoadingCard;
