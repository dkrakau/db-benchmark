import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInfiniteScroll, IonItem, IonList } from "@ionic/react";
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
            <IonCardContent>
                <IonInfiniteScroll>
                    <IonList>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                        <IonItem>test</IonItem>
                    </IonList>
                </IonInfiniteScroll>
            </IonCardContent>
        </IonCard >
    );
};

export default FileViewerCard;
