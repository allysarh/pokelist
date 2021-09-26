import { Card } from 'primereact/card';
import React from 'react';
import NavbarComp from '../components/NavbarComp';
import HTTP from '../service/HTTP';
import { Galleria } from 'primereact/galleria';
import { TabView, TabPanel } from 'primereact/tabview';
import { Chart } from 'primereact/chart';
import StatsChart from '../components/StatsChart';


class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokeName: '',
            pokeData: [],
            pokeImage: [],
            basicData: {}
        }


        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '960px',
                numVisible: 4
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }


    componentDidMount() {
        this.getDetail()
        // this.itemTemplate()
    }
    getDetail = async () => {
        try {
            // let pokeName = this.props.location.search.split('=')[1]
            let res = await HTTP.get(`${this.props.location.search.split('=')[1]}`)
            let pokeImage = Object.values(res.data.sprites).splice(0, 6).filter(item => item != null)
            let pokeData = [...this.state.pokeData]
            pokeData.push(res.data)
            let basicData = {
                labels: res.data.stats.map(item => item.stat.name),
                datasets: [{
                    backgroundColor: ["#ffd9e1", "#ffecd9", "#fff5dd", "#dbf2f2", "#d7ecfb", "#ebe0ff"],
                    data: res.data.stats.map(item => item.base_stat)
                }]
            }

            // console.log("basic data", basicData)
            this.setState({ pokeData, pokeImage, basicData }, () => console.log("STATE",this.state.basicData))
        } catch (error) {
            console.log("error get name", error)
        }
    }

    itemTemplate(item) {
        return (
            <div style={{ height: '200px' }}>
                <img src={item} style={{ height: '100%' }} />
            </div>
        )
    }

    thumbnailTemplate(item) {
        return (
            <div className="mx-5">
                <img src={item} style={{ width: '100%', height: '100px' }} />
            </div>
        )
    }

    printAbility = () => {
        return this.state.pokeData && this.state.pokeData.map((item, index) => {
            return (
                <TabView>
                    <TabPanel header="About">
                        <table>
                            <td>
                                <tr>Species</tr>
                                <tr>Height</tr>
                                <tr>Weight</tr>
                                <tr>Height</tr>
                                <tr>Base Expreience</tr>
                            </td>
                            <td>
                                <tr>{item.species.name}</tr>
                                <tr>{item.base_experience}</tr>
                                <tr>{item.height}</tr>
                                <tr>{item.weight}</tr>
                                <tr>{item.abilities.map(item => item.ability).map(item => item.name).join(" , ")}</tr>
                            </td>
                        </table>
                    </TabPanel>
                    <TabPanel header="Base Stats">
                        <StatsChart basicData={this.state.basicData} />
                    </TabPanel>
                    <TabPanel header="Evolution">
                        Content III
                    </TabPanel>
                    <TabPanel header="Moves">
                        Content III
                    </TabPanel>
                </TabView>
            )
        })
    }
    render() {
        let { pokeImage } = this.state
        return (
            <>
                <NavbarComp />
                <div className="p-5">
                    <h1>{this.props.location.search.split('=')[1]}</h1>
                    <div className="d-flex row border" style={{ borderRadius: '30px' }}>
                        <div className="col-6">
                            <Galleria value={pokeImage} showIndicators
                                item={this.itemTemplate} thumbnail={this.thumbnailTemplate} numVisible={3} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="col-6">
                            {this.printAbility()}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DetailPage;