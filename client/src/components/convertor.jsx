import React from 'react';
import axios from 'axios';
import { Button, FormGroup, FormControl, FormLabel, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Convertions from './convertions';

import '../styles/exchange-convertor.styles.css';

class Convertor extends React.Component {

  constructor() {
    super();

    this.state = {
      isUserSignedIn: Cookies.get('authToken') !== undefined ? true : false,
      searchKey: '',
      base_currency: 'SEK',
      amount: 0,
      countries: [],
      currencies: [],
      convertion_rates: {}
    };
  }

  async fetchCountries() {
    let searchKey = this.state.searchKey;
    if (searchKey !== '') {
      axios.get('/v1/country/get/' + searchKey, {
          headers: {
            "x-auth-token": Cookies.get('authToken')
          }
        })
        .then(response => response.data)
        .then(countries => {
          this.setState({ countries: countries })
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  async fetchConversion() {
    let base_currency = this.state.base_currency;
    let currency_list = this.state.currencies;
    let amount = this.state.amount;

    let reqBody = {
      base_currency: base_currency,
      currency_list: currency_list,
      amount: amount
    }

    if (currency_list !== [] && amount !== '') {
      let response = await axios.post('/v1/convert/currency', reqBody, {
        headers: {
          "x-auth-token": Cookies.get('authToken')
        }
      });

      this.setState({
        convertion_rates: response.data
      })
    }
  }

  handleSubmitForSearch = async (event) => {
    event.preventDefault();

    try {
      await this.fetchCountries();
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmitForConvert = async (event) => {
    event.preventDefault();

    try {
      await this.fetchConversion();
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleChangeForSearch = event => {
    this.setState({
      [event.target.id]: event.target.value,
      status: ''
    });
  }

  handleClick = event => {
    this.setState({
      [event.target.id]: event.target.checked,
      status: ''
    });
  }

  handleClickForCountry = event => {
    let currency = event.target.value;

    this.setState({
      currencies: [...this.state.currencies, currency]
    });
  }

  render() {
    if (!this.state.isUserSignedIn) {
      return (
        <h2>
          Please login to continue
        </h2>
      )
    }

    return(
      <div className="register">

        <h3>
          <u>Currency Convertor</u>
        </h3> <br /> <br />

        <div className="registeralert">

          <form onSubmit={this.handleSubmitForSearch}>

            <FormGroup controlId="searchKey">
              <FormLabel color="blue"><b>Search Country</b></FormLabel>
              <FormControl
                autoFocus
                type="text"
                value= { this.state.searchKey }
                onChange={ this.handleChange }
              />
            </FormGroup> 

            <Button
              block
              type="submit"
            >
              Search
            </Button>
          </form> <br /> <br />

          <Table responsive="lg" bordered hover>
          {
            this.state.countries.map(country => {
              return (
                <tbody>
                  <tr key={country.name}>
                    <td>
                      <img 
                        src={ country.flag }
                        alt={ country.name }
                        width="25" height="25"
                      />
                    </td>
                    <td>{ country.name }</td>
                    <td>{ country.code }</td>
                    <td>
                      <Button
                        block
                        type="submit"
                        value={ country.code }
                        onClick = { this.handleClickForCountry }
                      >
                        Add
                      </Button></td>
                  </tr>
                </tbody>
              )
            })
          } </Table><br /> <br /> <br /> <br />

          <h5>Base Currency: SEK</h5> <br />

          <form onSubmit={this.handleSubmitForConvert}>

            <FormGroup controlId="amount">
              <FormLabel color="blue"><b>Amount</b></FormLabel>
              <FormControl
                autoFocus
                type="text"
                value= { this.state.amount }
                onChange={ this.handleChange }
              />
            </FormGroup> 

            <Button
              block
              type="submit"
            >
              Convert
            </Button>
          </form> <br /> <br />

          <Convertions currencies={ this.state.currencies } convertion_rates={ this.state.convertion_rates }/>

        </div>
      </div>
    );
  }
}

export default withRouter(Convertor);