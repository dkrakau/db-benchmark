import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonProgressBar } from "@ionic/react";
import styles from './LoadingCard.module.css';

export enum LoadingState {
    pending = "Pending",
    loading = "Loading",
    received = "Received",
}

interface LoadingCardProps {
    dbName: string;
    state: string;
    queryCount: number;
    queriesTotal: number;
}

const LoadingCard: React.FC<LoadingCardProps> = (props) => {
    return (
        <IonCard className={styles.loadingCard}>
            <IonCardHeader>
                <IonCardTitle className={styles.loadingTitleCard}>
                    {/* <div className={styles.rotate}>
                        <IonIcon className={styles.rotatingImg} src={ellipsisHorizontal} />
                    </div> */}
                    <p className={styles.loadingTitle}>{props.dbName}</p>
                    <IonCardSubtitle className={styles.loadingSubtitle}>{props.state}</IonCardSubtitle>
                    <IonProgressBar type="indeterminate"></IonProgressBar>
                </IonCardTitle>
                {props.state === LoadingState.pending
                    ? <></>
                    : <IonCardSubtitle className={styles.loadingSubtitle}>{props.queryCount} / {props.queriesTotal}</IonCardSubtitle>
                }
            </IonCardHeader>
        </IonCard>
    );
};

export default LoadingCard;
