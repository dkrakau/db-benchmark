import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import styles from './InformationCard.module.css';

interface InformationCardProps {
    title: string;
    subtitle: string;
    content: string;
}

const InformationCard: React.FC<InformationCardProps> = (props) => {
    return (
        <IonCard className={styles.contentinformationCard}>
            <IonCardHeader>
                <IonCardTitle className={styles.title}>
                    {props.title}
                </IonCardTitle>
                <IonCardSubtitle className={styles.subtitle}>
                    {props.subtitle}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className={styles.content}>
                {props.content}
            </IonCardContent>
        </IonCard >
    );
};

export default InformationCard;
