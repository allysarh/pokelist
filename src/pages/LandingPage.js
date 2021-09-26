// import axios from 'axios';
import React from 'react';
import PokeCard from '../components/PokeCard';
// import { URL_API } from '../Helper';
import HTTP from '../service/HTTP';
import pokeBall from '../assets/images/pokeball_icon.png'
import { Paginator } from 'primereact/paginator';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokeList: [],
            contentFirst: 20,
            rows: 1,
            offset: 0
        }
    }

    componentDidMount() {
        this.getPokeList()
    }
    getPokeList = async () => {
        try {
            let res = await HTTP.get(`?offset=${this.state.offset}&limit=${this.state.contentFirst}`)
            this.setState({ pokeList: res.data.results })
        } catch (error) {
            console.log("error get poke list", error)
        }
    }
    printPokeCard = () => {
        return this.state.pokeList.map((item, index) => {
            return <PokeCard pokeName={item.name} id={index} />
        })
    }

    paginatorClick = async (e) => {
        try {
            // console.log("EVENTS", e)
            let offset = 20 * (await e.page + 1)
            // console.log("OFF", offset)
            this.setState({ offset })
            await this.getPokeList()

        } catch (error) {
            console.log("error paginate page", error)
        }
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                    <div>
                        <h1>POKELIST</h1>
                        <p>Pokemon list project by Allysa</p>
                    </div>
                    <div>
                        <img src={pokeBall} style={{ height: '90%', position: 'relative', left: 320 }} />
                    </div>
                </div>
                <div style={{ height: '100%', width: '100%' }}>
                    <div className="d-flex justify-content-evenly align-items-center" style={{ flexWrap: 'wrap', height: '100%', width: '100%' }}>
                        {this.printPokeCard()}
                    </div>
                </div>
                {/* <div>
                    <Paginator onPageChange={(e) => this.paginatorClick(e)} totalRecords={10} rows={this.state.rows}></Paginator>
                </div> */}
            </div>
        );
    }
}

export default LandingPage;