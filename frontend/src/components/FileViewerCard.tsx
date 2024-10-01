import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import styles from './FileViewerCard.module.css';

interface FileViewerCardProps {
    dbName: string;
    tests: string[];
    /* setSelectedTest: (x: string) => void; */
}

const FileViewerCard: React.FC<FileViewerCardProps> = (props) => (
    <IonCard className={styles.fileViewerCard}>
        <IonCardContent className={styles.fileViewerCardContent}>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonSelect className={styles.selectFile} label={props.dbName} placeholder="Select Testdata">
                            {props.tests.map(test =>
                                <IonSelectOption key={test} value={test}>{test}</IonSelectOption>
                            )}
                        </IonSelect>
                    </IonCol>
                    <IonCol>
                        <IonButton className={styles.viewBtn}
                        /* onClick={() => props.setSelectedTest("")} */
                        >View</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>


        </IonCardContent>
    </IonCard >
);

export default FileViewerCard;
