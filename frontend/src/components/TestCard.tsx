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
    results: Result[];
}

interface TestCardProps {
    dbName: string,
    selectedDbs: string[],
    setSelectedDbs: (array: string[]) => void,
    dbs: Map<string, DatabaseData>,
    setDbs: (map: Map<string, DatabaseData>) => void,
    updateDbs: (key: string, value: DatabaseData) => void
}

const TestCard: React.FC<TestCardProps> = (props) => {

    const queriesTotal = 2;
    const [state, setState] = useState<LoadingState>(props.dbs.get(props.dbName)!.state);
    const [queryCount, setQueryCount] = useState<number>(1);
    const [testdata, setTestdata] = useState<Testdata[]>([]);

    const testDatabase = async () => {
        const testdata: Testdata[] = [];
        for (let i = 1; i <= queriesTotal; i++) {
            testdata.push(await fetch("http://localhost:8080/nns/" + props.dbName.toLowerCase() + "/test?unit=1001011110100111011111111100011011000000100110000101011000010001&mode=image").then(response => response.json()) as Testdata);
            setQueryCount(i);
        }
        return testdata;
    }

    const saveTestdata = async (tests: Testdata[]) => {
        const data = {
            db: props.dbName,
            testdata: tests
        }
        await fetch("http://localhost:8080/data/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    useEffect(() => {
        if (state === LoadingState.loading) {
            testDatabase().then(testdata => {
                saveTestdata(testdata);
                setTestdata(testdata);
                setState(LoadingState.received);
            });
        }
    }, []);

    return (
        <>
            {state === LoadingState.received
                ? <ChartCard testdata={testdata} />
                : <LoadingCard dbName={props.dbName} state={state} queryCount={queryCount} queriesTotal={queriesTotal} />}
        </>
    );
};

export default TestCard;
