import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Crypedit from "./crypedit";
import Card, { CardHeader } from "material-ui/Card";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

const web3 = global.web3 && new Web3(global.web3.currentProvider);

class App extends Component {
  constructor() {
    super();
    this.state = {
      putNameValue: "",
      nameByAddressValue: "",
      addressByNameValue: "",
      endorsementsByNameValue: "",
      endorsementsByAddressValue: ""
    };
  }

  async componentDidMount() {
    if (!web3) {
      return;
    }
    this.crypedit = new Crypedit(web3);
  }

  render() {
    return (
      <div className="container">
        <div className="Row">
          <Card className="PutName">
            <CardHeader title="Put Name:" />
            <TextField
              className="input"
              placeholder="宮水三葉 or 立花瀧"
              fullWidth
              onChange={e => this.setState({ putNameValue: e.target.value })}
              value={this.putNameValue}
            />
            <Button
              onClick={async () => {
                try {
                  let { putNameValue } = this.state;
                  await this.crypedit.putName(putNameValue);
                  alert(
                    "You have successfully register your name " + putNameValue
                  );
                } catch (err) {
                  alert(err);
                }
              }}
            >
              put
            </Button>
          </Card>
        </div>
        <div className="Row">
          <Card className="AddressOf">
            <CardHeader title="Find Address by Name" />
            <TextField
              className="input"
              placeholder="宮水三葉 or 立花瀧"
              fullWidth
              onChange={e =>
                this.setState({ addressByNameValue: e.target.value })
              }
              value={this.state.addressByNameValue}
            />
            <Button
              onClick={async () => {
                try {
                  let { addressByNameValue } = this.state;
                  let addr = await this.crypedit.addressOf(addressByNameValue);
                  alert("Address of " + addressByNameValue + " is " + addr);
                } catch (err) {
                  alert(err);
                }
              }}
            >
              find
            </Button>
          </Card>
        </div>
        <div className="Row">
          <Card className="NameOf">
            <CardHeader title="Find Name by Address" />
            <TextField
              className="input"
              placeholder="0x5c47e30dc7F82167De8865aac3914Ce927C15918"
              fullWidth
              onChange={e =>
                this.setState({ nameByAddressValue: e.target.value })
              }
              value={this.state.nameByAddressValue}
            />
            <Button
              onClick={async () => {
                try {
                  let { nameByAddressValue } = this.state;
                  let name = await this.crypedit.nameOf(nameByAddressValue);
                  alert("Name of " + nameByAddressValue + " is " + name);
                } catch (err) {
                  alert(err);
                }
            }}>find</Button>
        </Card>
        </div>
      </div>
    );
  }
}

export default App;
