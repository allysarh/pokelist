import React from 'react';
import HTTP from '../service/HTTP';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from 'react-router-dom';

class PokeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokeImage: '',
            pokeType: []
        }
    }

    componentDidMount() {
        this.getPokeInfo()
    }
    getPokeInfo = async () => {
        try {
            let res = await HTTP.get(`${this.props.pokeName}`)
            let { sprites, types } = res.data
            this.setState({ pokeImage: await sprites.front_default, pokeType: await types })
        } catch (error) {
            console.log("error get poke info")
        }
    }

    printType = () => {
        return this.state.pokeType.map((item, index) => {
            return (
                <div className="my-1 p-1 d-flex justify-content-center" style={{ backgroundColor: 'grey', height: '30px', width: 'auto', borderRadius: '30px', opacity: '0.4' }}>
                    <p style={{ textTransform: 'capitalize', color: 'white' }}>{item.type.name}</p>
                </div>
            )
        })
    }
    render() {

        return (
            <Link to={`/detail?name=${this.props.pokeName}`} style={{textDecoration: 'none'}}>
                <Card className="m-2 border" style={{
                    borderRadius: '30px', overflow: 'hidden', width: '250px', height: '150px',
                    backgroundColor: this.state.pokeType[0] && (this.state.pokeType[0].type.name == 'grass' ? '#4eccae' : this.state.pokeType[0].type.name == 'fire' ? '#fc6c6b' : this.state.pokeType[0].type.name == 'water' ? '#75beff' :
                        this.state.pokeType[0].type.name == 'normal' ? '#f5db84' : '#a98ba0')
                }} onChange={this.getPokeInfo()}>
                    <div className="d-flex" >
                        <div className="d-flex flex-column">
                            <h5 style={{ textTransform: 'capitalize', color: 'white' }}>{this.props.pokeName}</h5>
                            {this.printType()}
                        </div>
                        <div style={{ height: '90px', width: '100px', position: 'relative' }}>
                            <div style={{ height: '100px', width: '100px', position: 'absolute', backgroundColor: 'white', borderRadius: '100px', left: 60, top: 20, opacity: 0.4 }}></div>
                            {
                                this.state.pokeImage ?
                                    <img src={this.state.pokeImage} style={{ height: '150%', position: 'absolute', left: 40, top: 10 }} />
                                    :
                                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" />
                            }
                        </div>
                    </div>
                </Card>
            </Link>
        );
    }
}

export default PokeCard;