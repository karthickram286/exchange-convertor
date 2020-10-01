import React from 'react';

import { Table } from 'react-bootstrap';
import '../styles/navbar.styles.css';

const Convertions = (props) => {
    return (
      <div className="conversions">
        <Table responsive="lg" bordered hover>

        {
          props.currencies.map(currency => {
            let rate = 0;
            if (props.convertion_rates[currency] !== undefined)
              rate = props.convertion_rates[currency];
              
            return (
              <tbody>
                <tr key={ currency }>
                  <td>{ currency }</td>
                  <td>{ rate }</td>
                </tr>
              </tbody>
            )
          })
        }

        </Table>
      </div>
    );
}

export default Convertions;