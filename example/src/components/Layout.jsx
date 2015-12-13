import React from 'react';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Fluxiny example</h1>
        </header>
        <section>
         { this.props.children }
        </section>
      </div>
    )
  }
}