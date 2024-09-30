import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import styles from './FileViewerCard.module.css';

interface FileViewerCardProps {
    name: string;
}

const FileViewerCard: React.FC<FileViewerCardProps> = (props) => {
    return (
        <IonCard className={styles.fileViewerCard}>
            <IonCardHeader>
                <IonCardTitle className={styles.fileViewerTitleCard}>
                    FileViewerCard
                </IonCardTitle>
                <IonCardSubtitle className={styles.fileViewerSubtitleCard}>subtitle</IonCardSubtitle>
            </IonCardHeader>
        </IonCard >
    );
};

export default FileViewerCard;
