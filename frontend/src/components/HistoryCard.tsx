import { useEffect } from "react";
import { DatabaseData } from "../App";

interface HistoryCardProps {
    dbName: string,
    selectedDbs: string[],
    setSelectedDbs: (array: string[]) => void,
    dbs: Map<string, DatabaseData>,
    setDbs: (map: Map<string, DatabaseData>) => void,
    updateDbs: (key: string, value: DatabaseData) => void
}

const HistoryCard: React.FC<HistoryCardProps> = (props) => {

    useEffect(() => {

    }, []);

    return (
        <></>
    );
};

export default HistoryCard;