import { Chart } from 'primereact/chart';
import React from 'react';
import HTTP from '../service/HTTP';

class StatsChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.horizontalOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 1,
            scales: {
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white'
                    },
                    display: false
                },
                y: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white'
                    },
                    
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true
        }
    }


    render() {
        return (
            <>
                <Chart type="bar" data={this.props.basicData} options={this.horizontalOptions} />
            </>
        );
    }
}

export default StatsChart;