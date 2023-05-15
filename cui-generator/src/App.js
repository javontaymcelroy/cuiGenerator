import React from 'react';
import CUIForm from './CUIForm';
import CUIView from './CUIView';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cui: null
    }
  }

  handleGenerateCUI = (cui) => {
    this.setState({ cui });
  }

  render() {
    const { cui } = this.state;
    return (
      <div className="App">
        <h1 className='header'>DXC CUI Generator</h1>
        <CUIForm onGenerate={this.handleGenerateCUI} />
        {cui && <CUIView cui={cui} />}
      </div>
    );
  }
}

export default App;
