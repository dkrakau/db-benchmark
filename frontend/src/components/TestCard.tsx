import { useEffect, useState } from "react";
import { DatabaseData } from "../App";
import ChartCard from "./ChartCard";
import LoadingCard, { LoadingState } from "./LoadingCard";

export interface Result {
    score: number;
    asset_id: string;
    unit?: string;
    source?: string;
}

export interface Testdata {
    milliseconds: number;
    //results: Result[];
}

interface TestCardProps {
    units: string[],
    queriesTotal: number,
    cutOff: number,
    isDarkModeEnabled: boolean,
    dbName: string,
    selectedDbs: string[],
    setSelectedDbs: (array: string[]) => void,
    dbs: Map<string, DatabaseData>,
    setDbs: (map: Map<string, DatabaseData>) => void,
    updateDbs: (key: string, value: DatabaseData) => void
}

const TestCard: React.FC<TestCardProps> = (props) => {

    const [state, setState] = useState<LoadingState>(props.dbs.get(props.dbName)!.state);
    const [queryCount, setQueryCount] = useState<number>(1);
    const [tests, setTests] = useState<Testdata[]>([]);

    const generateFoldername = (): string => {
        const date = new Date();
        return date.getFullYear() + "-"
            + date.getMonth() + "-"
            + date.getDay() + "_"
            + date.getHours() + "-"
            + date.getMinutes() + "-"
            + date.getSeconds() + "_"
            + props.dbName;
    }

    const testDatabase = async () => {
        const foldername = generateFoldername();
        let tests: Testdata[] = [];
        for (let i = 0; i < props.queriesTotal; i++) {
            setQueryCount(() => i + 1);
            const testdata: Testdata = await fetch("http://localhost:8080/nns/" + props.dbName.toLowerCase() + "/test?unit=" + props.units[i] + "&mode=image").then(response => response.json()) as Testdata;
            tests.push({ milliseconds: testdata.milliseconds });
            await saveTestdata((i + 1) + "-query.json", foldername, testdata);
        }
        setTests(tests);
    }

    const saveTestdata = async (filename: string, foldername: string, tests: Testdata) => {
        const dataSaveRequestBody = {
            db: props.dbName,
            foldername: foldername,
            filename: filename,
            testdata: tests
        }
        await fetch("http://localhost:8080/data/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataSaveRequestBody)
        });
    }

    useEffect(() => {
        if (state === LoadingState.loading) {
            testDatabase().then(() => {
                setState(LoadingState.received);
            });
        }
    }, []);

    return (
        <>
            {state === LoadingState.received
                ? <ChartCard
                    isDarkModeEnabled={props.isDarkModeEnabled}
                    dbName={props.dbName}
                    databaseData={props.dbs.get(props.dbName)!}
                    testdata={tests} excludeFirst={true} />
                : <LoadingCard
                    dbName={props.dbName}
                    state={state}
                    queryCount={queryCount}
                    queriesTotal={props.queriesTotal} />}
        </>
    );
};

export default TestCard;
