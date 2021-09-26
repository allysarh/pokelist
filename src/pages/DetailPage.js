import { Card } from 'primereact/card';
import React from 'react';
import NavbarComp from '../components/NavbarComp';
import HTTP from '../service/HTTP';
import { Galleria } from 'primereact/galleria';
import { TabView, TabPanel } from 'primereact/tabview';
import { Chart } from 'primereact/chart';
import StatsChart from '../components/StatsChart';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokeName: '',
            pokeData: [],
            pokeImage: [],
            basicData: {},
            pokeType: []
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

    printType = () => {
        return this.state.pokeType.map((item, index) => {
            return (
                <div className="my-1 p-1 d-flex justify-content-center mx-1" style={{ backgroundColor: 'grey', height: '30px', width: 'auto', borderRadius: '30px', opacity: '0.4' }}>
                    <p className="mx-3" style={{ textTransform: 'capitalize', color: 'white' }}>{item.type.name}</p>
                </div>
            )
        })
    }
    getDetail = async () => {
        try {
            // let pokeName = this.props.location.search.split('=')[1]
            let res = await HTTP.get(`${this.props.location.search.split('=')[1]}`)
            let pokeImage = Object.values(res.data.sprites).splice(0, 6).filter(item => item != null).reverse()
            let pokeData = [...this.state.pokeData]
            pokeData.push(res.data)
            let pokeType = res.data.types
            let basicData = {
                labels: res.data.stats.map(item => item.stat.name),
                datasets: [{
                    backgroundColor: ["#ffd9e1", "#ffecd9", "#fff5dd", "#dbf2f2", "#d7ecfb", "#ebe0ff"],
                    data: res.data.stats.map(item => item.base_stat)
                }]
            }

            this.setState({ pokeData, pokeImage, basicData, pokeType }, () => console.log("STATE", this.state.pokeData))
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
                        <table cellPadding={10}>
                            <td style={{ fontWeight: '500', color: '#78909c' }}>
                                <tr>Species</tr>
                                <tr>Base Experience</tr>
                                <tr>Weight</tr>
                                <tr>Height</tr>
                                <tr>Abilities</tr>
                            </td>
                            <td style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                                <tr >{item.species.name}</tr>
                                <tr>{item.base_experience}</tr>
                                <tr>{item.height / 10} cm</tr>
                                <tr>{item.weight / 10} kg</tr>
                                <tr>{item.abilities.map(item => item.ability).map(item => item.name).join(" , ")}</tr>
                            </td>
                        </table>
                    </TabPanel>
                    <TabPanel header="Base Stats">
                        {
                            this.state.basicData ?
                                <StatsChart basicData={this.state.basicData} />
                                :
                                <ProgressSpinner />
                        }
                    </TabPanel>
                    <TabPanel header="Evolution">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </TabPanel>
                    <TabPanel header="Moves">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </TabPanel>
                </TabView>
            )
        })
    }
    render() {
        let { pokeImage } = this.state
        return (
            <div className="container">
                <NavbarComp />
                <div className="p-5">
                    <div className="d-flex row border" style={{
                        borderRadius: '30px', backgroundColor: this.state.pokeType[0] && (this.state.pokeType[0].type.name == 'grass' ? '#4eccae' : this.state.pokeType[0].type.name == 'fire' ? '#fc6c6b' : this.state.pokeType[0].type.name == 'water' ? '#75beff' :
                            this.state.pokeType[0].type.name == 'normal' ? '#f5db84' : '#a98ba0'),
                        boxShadow: '8px 8px #888888'
                    }}>
                        <div className="col-12 col-md-6 p-3" style={{
                            borderRadius: '30px', backgroundColor: this.state.pokeType[0] && (this.state.pokeType[0].type.name == 'grass' ? '#4eccae' : this.state.pokeType[0].type.name == 'fire' ? '#fc6c6b' : this.state.pokeType[0].type.name == 'water' ? '#75beff' :
                                this.state.pokeType[0].type.name == 'normal' ? '#f5db84' : '#a98ba0')
                        }}>
                            <h1 style={{ textTransform: 'capitalize', color: 'white' }}>{this.props.location.search.split('=')[1]}</h1>
                            <div className="d-flex">
                                {this.printType()}
                            </div>
                            <Galleria value={pokeImage} showIndicators
                                item={this.itemTemplate} autoplay showThumbnails={false} numVisible={3} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="col-12 col-md-6 p-3" style={{ borderRadius: '30px', position: 'relative', backgroundColor: 'white' }}>
                            {this.printAbility()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailPage;