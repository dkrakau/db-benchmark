import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import styles from './DatabaseCard.module.css';

interface DatabaseCardProps {
    dbName: string;
    dbVersion: string;
    dbLogo: string;
    onClick?: (dbName: string) => void;
}

const DatabaseCard: React.FC<DatabaseCardProps> = ({ dbName, dbVersion, dbLogo, onClick }) => {
    return (
        <IonCard className={styles.databaseCard} id={dbName} onClick={onClick !== undefined ? () => onClick(dbName) : undefined}>
            <IonCardHeader>
                <IonCardTitle className={styles.databaseTitleCard}>
                    <img src={dbLogo} alt="Database logo" className={styles.databaseLogo} />
                    <p className={styles.title}>{dbName}</p>
                </IonCardTitle>
                <IonCardSubtitle>{"Version " + dbVersion}</IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    );
};

export default DatabaseCard;
