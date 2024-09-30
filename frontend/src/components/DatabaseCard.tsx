import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import './DatabaseCard.css';

interface DatabaseCardProps {
    dbName: string;
    dbDescription: string;
    dbLogo: string;
    onClick?: (dbName: string) => void;
}

const DatabaseCard: React.FC<DatabaseCardProps> = ({ dbName, dbDescription, dbLogo, onClick }) => {
    return (
        <IonCard className="databaseCard" id={dbName} onClick={onClick !== undefined ? () => onClick(dbName) : undefined}>
            <IonCardHeader>
                <IonCardTitle className="database-title-card">
                    <img src={dbLogo} alt="Database logo" className="database-logo" />
                    <p className="title">{dbName}</p>
                </IonCardTitle>
                <IonCardSubtitle>{dbDescription}</IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    );
};

export default DatabaseCard;
