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
    return await this.contract.deployed();
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
      endorsers.map(async endorser => {
        const comment = await exist.EndorserCommentsOf(address, endorser);
        return { endorser, comment };
      })
    );
  };

  endorsementsForName = async name => {
    const exist = await this.crypeditContract();
    const address = await exist.AddressOf(name);
    return this.endorsementsForAddress(address);
  };
}

export default Crypedit;
