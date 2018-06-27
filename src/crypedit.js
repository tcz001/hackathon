import contract from "truffle-contract";
import CrypeditJSON from "./contracts/Crypedit.json";

class Crypedit {
  constructor(web3) {
    this.web3 = web3;
    this.contract = contract(CrypeditJSON);
    this.contract.setProvider(web3.currentProvider);
  }

  async myAddress() {
    return (await this.web3.eth.getAccounts())[0];
  }

  async crypeditContract() {
    let exist
    try {
      let currentNetwork = this.web3.currentProvider.publicConfigStore._state.networkVersion
      if(currentNetwork === "1") { // mainnet
        exist = await this.contract.at('0x0')
      } else if (currentNetwork === "3") {  // ropsten
        exist = await this.contract.at('0xb70a0e914635873ac5e9ee5bf12bf95afb56d92c')
      // } else if (currentNetwork === "4") { // rinkeby
      //   exist = await this.contract.at('0x0')
      } else {
        exist = await this.contract.deployed()
      }
    } catch(e) { // ropsten by default
        exist = await this.contract.at('0xb70a0e914635873ac5e9ee5bf12bf95afb56d92c')
    }
    return exist
  }

  putName = async value => {
    const exist = await this.crypeditContract();
    const owner = await this.myAddress();

    return await exist.PutName(value, { from: owner });
  };

  addressOf = async value => {
    const exist = await this.crypeditContract();
    const owner = await this.myAddress();
    return await exist.AddressOf(value, { from: owner });
  };

  nameOf = async value => {
    const exist = await this.crypeditContract();
    const owner = await this.myAddress();
    return await exist.NameOf(value, { from: owner });
  };

  endorsementsForAddress = async address => {
    const exist = await this.crypeditContract();
    const endorsers = await exist.EndorsersOf(address);
    return await Promise.all(
      endorsers.map(async (endorser,i) => {
        const comment = await exist.EndorserCommentOf(address, i);
        return { endorser, comment };
      })
    );
  };

  endorsementsForName = async name => {
    const exist = await this.crypeditContract();
    const address = await exist.AddressOf(name);
    return this.endorsementsForAddress(address);
  };

  endorse = async (address, comment) => {
    const exist = await this.crypeditContract();
    const owner = await this.myAddress();
    return await exist.Endorse(address, comment, { from: owner });
  };
}

export default Crypedit;
