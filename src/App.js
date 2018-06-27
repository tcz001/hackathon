import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Crypedit from "./crypedit";
import Card, { CardHeader } from "material-ui/Card";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import randomcolor from "randomcolor";

const web3 = global.web3 && new Web3(global.web3.currentProvider);

class App extends Component {
  constructor() {
    super();
    this.state = {
      putNameValue: "",
      nameByAddressValue: "",
      addressByNameValue: "",
      endorsementsByNameValue: "",
      endorsementsByAddressValue: "",
      endorseCommentValue: "",
      endorseAddressValue: ""
    };
  }

  _randomizeHeaderColor = () => {
    this.setState({
      headerColorInterval: setInterval(() => {
        this.setState({ headerColor: randomcolor() });
      }, 350)
    });
  };

  componentDidMount() {
    if (!web3) {
      return;
    }
    this.crypedit = new Crypedit(web3);
    this._randomizeHeaderColor();
  }
  componentWillUnmount() {
    clearInterval(this.state.headerColorInterval);
  }

  render() {
    return (
      <main>
        <h1
          style={
            this.state.headerColor ? { color: this.state.headerColor } : {}
          }
        >
          <marquee>🔑🗝🔥🦀🎤Cryptendorse!🔑🗝🔥🦀🎤</marquee>
        </h1>
        <h3>Tie a name to an address, and endorse the people you trust!</h3>
        <div className="container">
          <Card className="Card">
            <form
              onSubmit={async e => {
                e.preventDefault();
                try {
                  const { putNameValue } = this.state;
                  await this.crypedit.putName(putNameValue);
                  this.setState({
                    putNameResult: `You have successfully registered your name as ${putNameValue}`
                  });
                } catch (err) {
                  alert(err);
                }
              }}
            >
              <CardHeader title="Put Name:" />
              <TextField
                className="input"
                placeholder="宮水三葉 or 立花瀧"
                fullWidth
                onChange={e => this.setState({ putNameValue: e.target.value })}
                value={this.putNameValue}
              />
              <Button type="submit">put</Button>
              {this.state.putNameResult && (
                <p className="Result">{this.state.putNameResult}</p>
              )}
            </form>
          </Card>

          <Card className="Card">
            <form
              onSubmit={async e => {
                e.preventDefault();
                try {
                  const { addressByNameValue } = this.state;
                  const addr = await this.crypedit.addressOf(
                    addressByNameValue
                  );
                  this.setState({
                    addressByNameResult: `Address of account named ${addressByNameValue} is ${addr}`
                  });
                } catch (err) {
                  alert(err);
                }
              }}
            >
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
              <Button type="submit">find</Button>
              {this.state.addressByNameResult && (
                <p className="Result">{this.state.addressByNameResult}</p>
              )}
            </form>
          </Card>

          <Card className="Card">
            <form
              onSubmit={async e => {
                e.preventDefault();
                try {
                  const { nameByAddressValue } = this.state;
                  const name = await this.crypedit.nameOf(nameByAddressValue);
                  this.setState({
                    nameByAddressResult: `Name of account with address "${nameByAddressValue}" is "${name}"`
                  });
                } catch (err) {
                  alert(err);
                }
              }}
            >
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
              <Button type="submit">find</Button>
              {this.state.nameByAddressResult && (
                <p className="Result">{this.state.nameByAddressResult}</p>
              )}
            </form>
          </Card>

          <Card className="Card">
            <form
              onSubmit={async e => {
                e.preventDefault();
                try {
                  const { endorsementsByNameValue } = this.state;
                  const endorsements = await this.crypedit.endorsementsForName(
                    endorsementsByNameValue
                  );
                  this.setState({
                    endorsementsForNameResult: {
                      queried: endorsementsByNameValue,
                      endorsements
                    }
                  });
                } catch (err) {
                  alert(err);
                }
              }}
            >
              <CardHeader title="Find Endorsements for Name" />
              <TextField
                className="input"
                placeholder="君の名は"
                fullWidth
                onChange={e =>
                  this.setState({ endorsementsByNameValue: e.target.value })
                }
                value={this.state.endorsementsByNameValue}
              />
              <Button type="submit">find</Button>
              {this.state.endorsementsForNameResult &&
                (this.state.endorsementsForNameResult.endorsements.length ===
                0 ? (
                  <p className="Result">
                    Account with name "{
                      this.state.endorsementsForNameResult.queried
                    }" has no endorsements
                  </p>
                ) : (
                  <div className="Result">
                    <p>
                      Endorsements for name "{
                        this.state.endorsementsForNameResult.queried
                      }" are:
                    </p>
                    <ul>
                      {this.state.endorsementsForNameResult.endorsements.map(
                        (e, idx) => <li key={idx}>{e.endorser + ":" + e.comment}</li>
                      )}
                    </ul>
                  </div>
                ))}
            </form>
          </Card>

          <Card className="Card">
            <form
              onSubmit={async e => {
                e.preventDefault();
                try {
                  const { endorsementsByAddressValue } = this.state;
                  const endorsements = await this.crypedit.endorsementsForAddress(
                    endorsementsByAddressValue
                  );
                  this.setState({
                    endorsementsForAddressResult: {
                      queried: endorsementsByAddressValue,
                      endorsements
                    }
                  });
                } catch (err) {
                  alert(err);
                }
              }}
            >
              <CardHeader title="Find Endorsements for Address" />
              <TextField
                className="input"
                placeholder="您的地址"
                fullWidth
                onChange={e =>
                  this.setState({ endorsementsByAddressValue: e.target.value })
                }
                value={this.state.endorsementsByAddressValue}
              />
              <Button type="submit">find</Button>
              {this.state.endorsementsForAddressResult &&
                (this.state.endorsementsForAddressResult.endorsements.length ===
                0 ? (
                  <p className="Result">
                    Account with address "{
                      this.state.endorsementsForAddressResult.queried
                    }" has no endorsements
                  </p>
                ) : (
                  <div className="Result">
                    <p>
                      Endorsements for address "{
                        this.state.endorsementsForAddressResult.queried
                      }" are:
                    </p>
                    <ul>
                      {this.state.endorsementsForAddressResult.endorsements.map(
                        (e, idx) => <li key={idx}>{e.endorser + ":" + e.comment}</li>
                      )}
                    </ul>
                  </div>
                ))}
            </form>
          </Card>

          <Card className="Card">
            <form
              onSubmit={async e => {
                e.preventDefault();
                try {
                  const {
                    endorseAddressValue,
                    endorseCommentValue
                  } = this.state;
                  await this.crypedit.endorse(
                    endorseAddressValue,
                    endorseCommentValue
                  );
                  this.setState({
                    endorseResult: {
                      address: endorseAddressValue,
                      comment: endorseCommentValue
                    }
                  });
                } catch (err) {
                  alert(err);
                }
              }}
            >
              <CardHeader title="Endorse" />
              <TextField
                className="input"
                placeholder="您的地址"
                fullWidth
                onChange={e =>
                  this.setState({ endorseAddressValue: e.target.value })
                }
                value={this.state.endorseAddressValue}
              />
              <TextField
                className="input"
                placeholder="Comment"
                fullWidth
                onChange={e =>
                  this.setState({ endorseCommentValue: e.target.value })
                }
                value={this.state.endorseCommentValue}
              />
              <Button type="submit">endorse</Button>
              {this.state.endorseResult && (
                <p className="Result">
                  Successfully endorsed address "{
                    this.state.endorseResult.address
                  }" with comment "{this.state.endorseResult.comment}"
                </p>
              )}
            </form>
          </Card>
        </div>
      </main>
    );
  }
}

export default App;
