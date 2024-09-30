import { IonCard, IonCardHeader } from "@ionic/react";
import Chart from "react-google-charts";
import './ChartCard.css';

interface ChartCardProps {
    height: number;
    width: number;
}

const ChartCard: React.FC<ChartCardProps> = (props) => {

    /* const data = [
      [
        "Month",
        "Milvus",
        "Average",
      ],
      ["1", 165, 146.4],
      ["2", 135, 146.4],
      ["3", 157, 146.4],
      ["4", 139, 146.4],
      ["5", 136, 146.4],
    ]; */

    const generateMS = (number: number, min: number, max: number): number[] => {
        let numbers: number[] = [];

        for (let i = 0; i < number; i++) {
            numbers.push(Math.random() * (max - min) + min);
        }

        return numbers;
    };

    const getAverage = (numbers: number[]): number => {
        let average = 0;

        numbers.forEach((number) => {
            average = average + number;
        });

        return average / numbers.length;
    };

    const generateData = () => {
        let data = [];
        data.push([
            "x",
            "Milvus",
            "Average",
        ]);

        let dataNumber = 50;

        let numbers = generateMS(dataNumber, 300, 350);
        let average = getAverage(numbers);

        for (let i = 0; i < dataNumber; i++) {
            data.push(["" + i, numbers[i], average]);
        }

        return data;

    };

    const data = generateData();

    const options = {
        title: "Milvus nearest neighbor search recall time - 50 queries",
        vAxis: { title: "Milliseconds" },
        hAxis: { title: "Query" },
        seriesType: "lines",
        series: { 2: { type: "line" } },
        //colors: ["#0054E9", "#4a5363"],
        curveType: "function",
        /* animation: {
            duration: 1000,
            easing: "out",
        }, */
        legend: { position: "bottom" },
    };

    return (
        <IonCard className="chart-card">
            <IonCardHeader class="chart-card-header">
                <Chart
                    width={"100%"}
                    height={"100%"}
                    chartType="ComboChart"
                    data={data}
                    options={options}
                />
            </IonCardHeader>
        </IonCard>
    );
};

export default ChartCard;
