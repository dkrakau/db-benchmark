import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import styles from './LoadingCard.module.css';

interface LoadingCardProps {
    state: string;
    query: number;
    queries: number;
}

const LoadingCard: React.FC<LoadingCardProps> = (props) => {
    return (
        <IonCard className={styles.loadingCard}>
            <IonCardHeader>
                <IonCardTitle className={styles.loadingTitleCard}>
                    <div className={styles.rotate}>
                        <IonIcon className={styles.rotatingImg} src={ellipsisHorizontal} /> {/* sync */}
                    </div>
                    <p className={styles.loadingTitle}>{props.state}</p>
                </IonCardTitle>
                <IonCardSubtitle className={styles.loadingSubtitle}>{props.query} / {props.queries}</IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    );
};

export default LoadingCard;
