import React, {useEffect, useState} from "react"
import * as cheerio from "cheerio";
import axios from 'axios'
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";


export const BrawlChart = () => {
    const completeWeaponData = {
        "Sword": ["49.33", "49.04", "49.09", "49.01", "49.7", "49.7", "49.26", "49.52", "49.4", "49.47", "49.39", "49.23", "49.18", "49", "48.88", "49.57", "49.18", "49.42", "49.55", "49.59", "49.69", "49.44", "49.25", "49.46", "49.32", "49.36", "49.01", "49", "49.3", "49.46", "49.59", "49.48", "49.29", "49.64", "49.82", "49.64", "49.71", "49.46", "48.42", "49.03", "49.13", "49.21", "48.68", "49.15", "49", "48.64", "48.78", "48.95", "49.03", "48.91", "49.04", "49.23", "49", "48.96", "49.06", "48.92", "48.97", "49.21", "49.29", "49.66", "49.32", "49.47", "48.64", "48.87", "48.95", "49.02", "48.9", "49.42", "49.11", "48.76", "48.82", "48.77", "48.67", "49.06", "48.76", "48.83", "48.89", "48.72", "48.67", "48.73", "48.38", "49.17", "48.41", "48.74", "48.6", "48.29", "48.5", "48.73", "48.97", "48.57", "48.51", "48.65", "48.65", "48.52", "48.41", "48.65", "48.67", "48.58", "48.95", "49.03", "48.94", "49", "48.91", "48.92"],
        "Spear": ["50.34", "50.34", "50.36", "50.02", "49.43", "49.82", "49.7", "49.61", "49.78", "49.83", "49.79", "50.13", "49.98", "50.35", "50.22", "50.4", "50.46", "50.16", "50.02", "50.17", "50.42", "50.31", "50.17", "50.23", "50.31", "50.71", "50.96", "50.81", "50.95", "50.69", "50.49", "50.84", "50.45", "50.49", "50.22", "50.19", "50.3", "50.28", "50.25", "50.26", "50.49", "50.48", "50.51", "50.61", "50.57", "50.43", "50.65", "50.87", "50.63", "50.86", "50.79", "50.76", "50.69", "50.35", "50.58", "50.89", "50.5", "50.32", "50.64", "50.38", "50.82", "50.1", "50.88", "50.59", "50.49", "50.52", "50.69", "50.47", "50.54", "50.63", "50.65", "50.82", "50.78", "50.87", "50.74", "50.48", "49.91", "50.11", "50.18", "50.07", "50.3", "50.23", "50.15", "50.04", "50.31", "50.28", "50.5", "50.34", "50.23", "50.44", "50.35", "50.24", "50.31", "50.27", "50.07", "50.36", "50.28", "50.18", "50.43", "50.27", "50.41", "50.3", "50.27", "50.29"],
        "Katars": ["49.34", "49.18", "49.14", "49.27", "49.7", "49.41", "49.83", "49.67", "49.64", "48.91", "49.2", "48.5", "49.5", "47.96", "47.78", "48.34", "48.26", "48.61", "48.74", "48.43", "48.91", "49.22", "49.07", "49.08", "50.06", "49.44", "49.7", "49.68", "49.64", "49.78", "49.51", "49.34", "49.77", "49.43", "49.52", "49.41", "49.98", "49.65", "50.44", "50.11", "49.81", "50.08", "50.02", "49.94", "50.1", "50.19", "49.99", "50.39", "49.83", "50.89", "50.13", "49.95", "50.19", "49.76", "50.01", "50.52", "49.64", "50.31", "50.42", "50.38", "50.59", "50.72", "51.11", "50.96", "50.59", "50.26", "50.53", "50.66", "50.54", "48.68", "48.76", "48.85", "49", "48.79", "48.96", "49.65", "49.19", "49.68", "49.92", "49.45", "49.48", "49.51", "49.45", "49.75", "49.66", "49.7", "49.9", "50.31", "50.21", "50.3", "49.84", "49.87", "49.86", "49.46", "49.58", "49.41", "49.52", "49.47", "49.18", "49.39", "49.47", "49.52", "49.68", "49.98"],
        "Hammer": ["50.83", "51.28", "51.09", "51.08", "51.67", "51.27", "51.31", "51.35", "51.29", "51.16", "51.4", "51.19", "51.03", "50.82", "50.87", "51.04", "50.96", "50.82", "51.18", "51.09", "49.85", "50.5", "50.53", "50.5", "50.92", "50.76", "51.35", "50.8", "50.86", "50.71", "50.77", "51.28", "50.97", "50.81", "50.88", "50.95", "50.65", "51.14", "50.67", "50.4", "50.46", "50.24", "50.96", "50.77", "50.85", "50.91", "50.56", "50.76", "51.3", "51.21", "50.82", "50.76", "50.69", "51.17", "50.98", "51.13", "51.19", "50.97", "51.04", "51.17", "51.06", "51.01", "51.13", "51.37", "51.3", "51.33", "50.96", "50.9", "51.16", "51.02", "51.09", "50.93", "51.21", "51.04", "51.1", "50.39", "51.33", "51.46", "51.2", "51.7", "51.73", "51.27", "51.63", "51.74", "51.53", "51.63", "51.19", "51.61", "52.01", "51.71", "51.97", "52.04", "51.82", "52.11", "52.08", "52.01", "51.86", "51.94", "51.77", "51.85", "51.8", "51.53", "50.96", "51.11"],
        "Rocket Lance": ["51.68", "51.89", "51.67", "51.66", "52.28", "51.28", "51.3", "51.62", "51.57", "51.8", "51.56", "51.66", "51.95", "51.55", "51.53", "51.65", "51.39", "51.43", "51.75", "51.71", "52.36", "52.32", "52.1", "52.17", "51.83", "51.89", "50.87", "51.71", "51.06", "51.33", "51.59", "51.4", "51.3", "50.9", "50.9", "50.98", "50.76", "50.51", "51.67", "51.56", "51.18", "50.59", "50.34", "50.34", "50.24", "50.57", "50.11", "50.59", "50.72", "50.77", "50.57", "50.7", "50.2", "51.05", "50.63", "50.38", "50.99", "50.55", "51.22", "50.76", "50.64", "50.89", "51.42", "51.35", "50.92", "51.23", "51.3", "51.3", "50.66", "52.42", "52.19", "52.04", "52.3", "52.69", "52.26", "52.31", "52.64", "52.14", "52.22", "52.26", "52.7", "52.32", "51.95", "52.21", "52.55", "52.94", "52.47", "52.44", "52.45", "52.56", "52.54", "52.61", "52.07", "52.16", "52.22", "52.18", "52.31", "52.3", "52.45", "52.28", "52.55", "52.2", "51.89", "51.88"],
        "Blasters": ["49.47", "49.43", "49.72", "49.56", "49.84", "49.65", "49.59", "49.6", "49.52", "49.6", "49.68", "49.99", "49.51", "49.86", "50.33", "50.41", "49.98", "49.84", "49.4", "49.84", "49.74", "49.62", "49.28", "49.37", "49.4", "49.18", "49.29", "49.51", "49.55", "49.37", "49.47", "49.51", "49.65", "49.68", "49.92", "49.92", "49.98", "49.91", "50.03", "49.88", "49.76", "50.1", "49.85", "50.11", "49.89", "50.06", "50", "50.15", "49.5", "50.27", "49.63", "49.51", "49.78", "49.54", "49.34", "49.56", "49.32", "49.56", "49.03", "49.64", "49.16", "49.22", "49.6", "49.19", "49.3", "49.47", "49.69", "49.2", "49.69", "49.63", "49.69", "49.6", "49.71", "49.41", "49.81", "49.92", "50.22", "49.67", "49.69", "49.81", "49.44", "49.61", "49.56", "49.44", "49.43", "49.51", "49.38", "49.66", "49.43", "49.49", "49.37", "49.3", "49.27", "49.31", "49.29", "49.15", "49.18", "49.25", "48.96", "49.04", "48.94", "48.96", "49.38", "49.43"],
        "Axe": ["50.89", "51.46", "51.17", "51.58", "52.24", "51.14", "51.28", "51.28", "51.16", "51.44", "51.1", "51.08", "51.56", "51.47", "50.96", "51.1", "50.93", "51.31", "51.88", "51.53", "52.29", "51.95", "52.25", "51.75", "51.54", "51.69", "51.65", "50.72", "50.75", "50.99", "51.41", "51.53", "51.63", "51.69", "50.98", "51.4", "51.58", "51.43", "53.02", "51.8", "51.51", "51.86", "51.64", "51.28", "51.28", "51.39", "51.47", "50.03", "50.92", "49.73", "50.95", "50.58", "50.92", "51.69", "51.35", "50.88", "51.43", "51.73", "51.46", "50.71", "51.41", "51.81", "52.25", "52.15", "51.97", "52.34", "52.33", "52.03", "52.11", "51.76", "52.06", "52.17", "52.21", "51.99", "51.98", "51.52", "51.88", "51.76", "51.87", "52", "52.22", "52.09", "51.99", "52.03", "51.71", "52.16", "51.66", "51.51", "52.02", "52.1", "52.21", "52.26", "52.21", "52.06", "52.09", "52.09", "52.04", "51.63", "51.77", "51.77", "51.75", "51.7", "51.79", "51.55"],
        "Bow": ["48.04", "47.02", "47", "47.44", "47.2", "47.26", "47.55", "47.73", "47.69", "47.49", "47.48", "47.33", "47.32", "48.25", "48.57", "48.21", "48.47", "48.79", "48.39", "48.14", "48.32", "47.99", "48.23", "48.34", "47.97", "47.85", "47.85", "47.77", "48.19", "48.17", "47.92", "48.35", "48.24", "48.47", "48.67", "48.66", "48.44", "48.99", "48.3", "48.92", "49.36", "48.7", "48.94", "49.26", "49.26", "49.22", "49.54", "49.18", "49.19", "48.69", "49.24", "50.02", "49.61", "49.26", "49.31", "48.95", "49.15", "49.1", "48.51", "48.94", "48.73", "49.02", "49.35", "48.88", "49", "48.79", "48.71", "48.96", "48.84", "49.58", "49.47", "49.2", "49.14", "48.95", "49.12", "48.78", "49.13", "49.78", "49.74", "49.74", "49.33", "49.54", "49.78", "49.55", "49.82", "49.77", "49.76", "49.79", "49.71", "49.78", "49.89", "49.66", "49.96", "50.08", "49.88", "49.95", "49.83", "49.93", "49.84", "49.73", "49.73", "49.79", "49.77", "49.6"],
        "Gauntlets": ["50.02", "49.98", "49.87", "49.71", "50.82", "50.55", "50.44", "50.15", "50.13", "50.44", "50.2", "50.19", "50.29", "50.98", "50.71", "49.71", "50.3", "50", "50.1", "50.38", "50.64", "50.09", "50.15", "50.25", "49.81", "50.07", "50.1", "51.05", "50.14", "49.94", "49.87", "49.38", "49.47", "49.52", "49.54", "49.68", "49.53", "49.74", "50.16", "49.64", "49.62", "49.83", "50.13", "50.47", "50.36", "50.54", "50.19", "50.3", "50.29", "50.57", "50.36", "49.92", "50.24", "50.31", "50.12", "50.31", "50.47", "50.12", "50.57", "50.57", "50.11", "49.8", "50.37", "50.06", "50.01", "50.26", "50.32", "49.99", "49.82", "50.21", "49.88", "49.77", "49.81", "49.51", "49.86", "49.8", "50.03", "49.5", "49.63", "49.52", "49.43", "49.3", "49.38", "49.21", "49.61", "49.47", "49.6", "49.28", "49.07", "49.07", "49.19", "49.1", "49.1", "49.23", "48.99", "49.01", "49.07", "49.09", "49.11", "48.99", "49.08", "49.45", "49.66", "49.6"],
        "Scythe": ["48.09", "48.59", "48.54", "47.97", "48.47", "49.56", "49.63", "49.87", "49.31", "49.62", "49.64", "49.29", "49.68", "49.39", "48.64", "48.63", "49.47", "48.63", "48.66", "48.65", "48.48", "48.49", "48.4", "48.58", "48.76", "48.84", "48.83", "49.04", "49.18", "49.18", "49.36", "49.1", "49.04", "48.79", "48.99", "48.88", "48.92", "48.83", "49.12", "49.18", "48.92", "49.14", "49.18", "49.58", "49.35", "48.96", "48.84", "48.8", "48.69", "48.97", "49.07", "48.77", "48.91", "48.78", "49.27", "49.04", "48.82", "49.04", "47.98", "47.78", "48.23", "48.34", "48.25", "48.29", "48.25", "48.38", "48.37", "48.36", "48.39", "48.34", "48.43", "48.77", "48.64", "48.61", "48.45", "48.72", "48.58", "48.48", "48.26", "48.51", "48.53", "48.15", "48.5", "47.95", "48.04", "47.96", "47.76", "47.79", "47.84", "47.81", "47.66", "47.73", "47.81", "47.93", "48.08", "48.09", "48.06", "48.18", "48.2", "48.21"],
        "Cannon": ["49.04", "48.26", "47.5", "48.02", "47.95", "47.74", "45.42", "47.54", "46.9", "48.03", "47.68", "48.42", "47.01", "47.97", "48.27", "47.45", "46.03", "47.03", "48.48", "48.93", "48.86", "49.37", "47.74", "47.55", "48.38", "48.54", "48.21", "48.17", "49.52", "47.9", "48.86", "48.8", "49.11", "49.1", "49.26", "49.49", "49.39", "49.58", "49.42", "49.59", "49.97", "49.04", "49.54", "49.24", "49.74", "50.23", "49.97", "49.52", "49.52", "49.55", "49.17", "49.5", "49.39", "49.52", "49.61", "49.53", "49.34", "48.96", "49.17", "49.58", "50"],
        "Orb": ["48.27", "48.07", "48.49", "48.85", "48.98", "48.94", "50.68", "50.05", "49.65", "48.96", "49.6", "49.31", "49.07", "49.3", "49.41", "49.17", "49.33", "49.35", "49.53", "49.61", "49.56", "49.53", "49.02", "48.85", "48.71", "49.02", "49.53", "49.68"]
    };
    const completePatchList = ["2.38", "2.39", "2.40", "2.41", "2.42", "2.43", "2.44", "2.45", "2.46", "2.47", "2.48", "2.49", "2.50", "2.51", "2.52", "2.53", "2.54", "2.55", "2.56", "2.57", "2.58", "2.59.1", "2.60", "2.61", "2.62", "2.63", "2.64", "2.65", "2.66", "2.67", "2.68", "2.69", "2.70", "2.71", "2.72", "2.73", "2.74", "2.75", "2.76", "2.77", "2.78", "2.79", "2.80", "2.81", "3.0", "3.01", "3.02", "3.03", "3.04", "3.05", "3.06", "3.07", "3.08", "3.09", "3.10", "3.11", "3.12", "3.13", "3.14", "3.15", "3.16", "3.17", "3.18", "3.19", "3.20", "3.21", "3.22", "3.23", "3.24", "3.25", "3.26", "3.27", "3.28", "3.29", "3.30", "3.31", "3.32", "3.33", "3.34", "3.35", "3.36", "3.37", "3.38", "3.39", "3.40", "3.41", "3.42", "3.43", "3.44", "3.45", "3.46", "3.47", "3.48", "3.49", "3.50", "3.51", "3.52", "3.53", "3.54", "3.55", "3.56", "3.57", "3.58", "4.00", "4.02"]

    const [weaponData, setWeaponData] = useState(completeWeaponData);
    const [patchList, setPatchList] = useState(completePatchList.slice(-23));

    const getData = async () => {
        // for cors request add https://cors-anywhere.herokuapp.com/ in front of links
        await axios.get(`https://brawlmance.com/weapons`,
            {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(res => {
                const $ = cheerio.load(res.data);
                const patchesRaw = $(`#patchform > label:nth-child(1) > select:nth-child(1)`);
                const p = (patchesRaw[0].children.map(el => el.children[0].data).reverse());
                setPatchList(p);
                return p
            }).then(async (patchArr) => {
                let obj = {};
                for (let patch of patchArr) {
                    await axios.get(`https://brawlmance.com/weapons?patch=${patch}`,
                        {headers: {'Access-Control-Allow-Origin': '*'}})
                        .then(res => {
                            const $ = cheerio.load(res.data);
                            const winrateRaw = $(`.card > .statistical > div:nth-child(2)`);
                            const winrateArr = Object.values(winrateRaw.map((_, w) => w.children[3].data)).slice(0, -4);

                            const weaponRaw = $(`.card > p:nth-child(2) > a:nth-child(1) > b:nth-child(1)`);
                            const weaponArr = Object.values(weaponRaw.map((_, w) => w.children[0].data)).slice(0, -4);

                            for (let j = 0; j < weaponArr.length; j++) {
                                if (!Object.keys(obj).includes(weaponArr[j])) obj = {...obj, [weaponArr[j]]: []};
                                obj[weaponArr[j]].push(winrateArr[j]);
                            }
                        })
                }
                for (let weapon in obj) {
                    obj[weapon] = obj[weapon].slice(1)
                }
                setWeaponData(obj);
            });
    };

    useEffect(() => {
        // uncomment to make request
        // getData()
    }, []);

    const data = [];
    for (let i = 1; i < patchList.length; i++) {
        const obj = {name: patchList[i]};
        for (let weapon in weaponData) {
            obj[weapon] = weaponData[weapon][i + weaponData[weapon].length - patchList.length]
        }
        data.push(obj)
    }
    const colorsArr = ['#c2efda', '#eaff00', '#982fbc', '#4b28d3', '#2196f3', '#496b3c', '#00d1c2', '#4caf50',
        '#684300', '#ff001c', '#ff4200', '#f767b0', '#990066', '#339933'];
    return (
        <div>
            <LineChart width={1900} height={900} data={data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis tickCount={9} dataKey="winrate" type="number" domain={[47.4, 53.1]}/>
                <CartesianGrid stroke="#445" strokeDasharray="6 10"/>
                <Tooltip contentStyle={{"background-color": "#11141d", "border-color": "#2d3040"}}/>
                <Legend/>

                {Object.keys(weaponData).map((weapon, i) =>
                    (<Line strokeWidth={2} type="monotone" dataKey={weapon}
                            stroke={colorsArr[i]}/>))}

            </LineChart>
        </div>

    )
};

//`#${((1 << 24) * Math.random() | 0).toString(16)}`
