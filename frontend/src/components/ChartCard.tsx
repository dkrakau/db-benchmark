import { IonCard, IonCardHeader } from "@ionic/react";
import Chart from "react-google-charts";
import { DatabaseData } from "../App";
import styles from './ChartCard.module.css';
import { Testdata } from "./TestCard";

interface ChartAxis {
    title: string;
}

interface ChartSeries {
    [key: number]: { type: string };
}

interface ChartAnimaiton {
    duration: number;
    easing: string;
}

interface ChartLegend {
    position: string;
}

interface ChartOptions {
    title: string;
    vAxis?: ChartAxis;
    hAxis?: ChartAxis;
    seriesType?: string;
    series?: ChartSeries;
    colors?: string[];
    curveType?: string;
    animation?: ChartAnimaiton;
    legend?: ChartLegend;
}

type ChartData = (string | number)[][];

interface ChartCardProps {
    isDarkModeEnabled: boolean;
    dbName: string;
    databaseData: DatabaseData;
    testdata: Testdata[];
    excludeFirst: boolean;
}

const ChartCard: React.FC<ChartCardProps> = (props) => {

    const excludeNumber = 0;
    const fac = 0.01;

    const getAverage = (testdata: Testdata[]): number => {
        let average = 0;
        for (let i = (props.excludeFirst ? excludeNumber : 0); i < testdata.length; i++) {
            average = average + testdata[i].milliseconds;
        }
        return average / (testdata.length - excludeNumber);
    };

    const generateData = (): ChartData => {
        let data: ChartData = [];
        data.push([
            "x",
            "Milvus",
            "Average",
        ]);
        let average = getAverage(props.testdata);
        for (let i = (props.excludeFirst ? excludeNumber : 0); i < props.testdata.length; i++) {
            data.push([(i + 1), props.testdata[i].milliseconds, average]);
        }
        return data;
    };

    const getMilliseconds = (): number[] => {
        const milliseconds: number[] = [];
        for (let i = (props.excludeFirst ? excludeNumber : 0); i < props.testdata.length; i++) {
            milliseconds.push(props.testdata[i].milliseconds);
        }
        return milliseconds;
    }

    const data: ChartData = generateData();

    const options = {
        title: props.dbName + " v" + props.databaseData.version + " nearest neighbor search recall time on 100 million dataset",
        vAxis: { title: "Milliseconds", viewWindow: { min: Math.min(...getMilliseconds()) - (Math.min(...getMilliseconds()) * fac), max: Math.max(...getMilliseconds()) + (Math.max(...getMilliseconds()) * fac) }, viewWindowMode: "explicit" },
        hAxis: { title: "Query" },
        seriesType: "lines",
        series: { 2: { type: "line" } },
        /* colors: ["#0054E9", "#4a5363"], */
        curveType: "function",
        /* animation: {
            duration: 1000,
            easing: "out",
        }, */
        legend: { position: "bottom" },
    };

    const optionsDarkMode = {
        title: props.dbName + " v" + props.databaseData.version + " nearest neighbor search recall time on 100 million dataset",
        titleTextStyle: { color: "white" },
        vAxis: {
            title: "Milliseconds",
            textStyle: { color: "white" },
            titleTextStyle: { color: "white" },
            viewWindow: { min: Math.min(...getMilliseconds()) - (Math.min(...getMilliseconds()) * fac), max: Math.max(...getMilliseconds()) + (Math.max(...getMilliseconds()) * fac) }, viewWindowMode: "explicit"
        },
        hAxis: {
            title: "Query",
            titleTextStyle: { color: "white" },
            textStyle: { color: "white" }
        },
        seriesType: "lines",
        backgroundColor: "#1E1E1E",
        series: { 2: { type: "line" } },
        /* colors: ["#0054E9", "#4a5363"], */
        curveType: "function",
        /* animation: {
            duration: 1000,
            easing: "out",
        }, */
        legend: { position: "bottom", textStyle: { color: "white" } },
    };

    return (
        <IonCard className={styles.chartCard}>
            <IonCardHeader class={styles.chartCardHeader}>
                <Chart
                    width={"100%"}
                    height={"100%"}
                    chartType="ComboChart"
                    data={data}
                    options={props.isDarkModeEnabled ? optionsDarkMode : options}
                />
            </IonCardHeader>
        </IonCard>
    );
};

export default ChartCard;
