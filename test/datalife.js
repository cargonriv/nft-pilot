const SmartContractName = "datalife";

const SmartContract = artifacts.require(SmartContractName);
const ethers = require('ethers');

contract(SmartContractName, (accounts) => {
    let sc;
    let currentAccount = accounts[0];

    before(async () => {
        sc = await SmartContract.deployed();
    });

    describe("lets check the variables status and default values", async () => {
        it("saleIsActive disabled", async () => {
            const saleIsActive = await sc.saleIsActive();
            assert.equal(saleIsActive, false, "The sale must be disabled.");
        }); 

        it("is Max Supply 3272?", async () => {
            const MAX_SUPPLY = await sc.MAX_SUPPLY();
            assert.equal(MAX_SUPPLY, 3272, "The max supply must be 3272.");
        }); 

        it("is Max Public Mint 1", async () => {
            await sc.setMaxPublicMint(1);
            const MAX_PUBLIC_MINT = await sc.MAX_PUBLIC_MINT();
            assert.equal(MAX_PUBLIC_MINT, 1, "The max public mint must be 1");
        }); 
        
        it("is Mint Price 0.05 ETH?", async () => {
            const mintPrice = ethers.utils.parseEther('0.05');
            await sc.setPricePerToken(mintPrice);
            const PRICE_PER_TOKEN = await sc.PRICE_PER_TOKEN();
            assert.equal(PRICE_PER_TOKEN, 50000000000000000, "The mint price must be 0.05 ether");
        }); 
    });

    describe("lets test the mint", async () => {
        it("enable saleIsActive", async () => {
            await sc.setSaleState(true);
            const saleIsActive = await sc.saleIsActive();
            assert.equal(saleIsActive, true, "The sale must be active.");
        });

         it("test a normal NFT MINT", async () => {
            const mintNFT = await sc.mint(1, {value: 50000000000000000});
        });
    });

    describe("lets test the whitelist", async () => {
        let address_1 = '0xC627257eA77eD6B467D4376D237Bce8acB816C91';
        let address_2 = '0xe6b543E2BF7AFD7759Bae68F6E456d13d638e076';

        it("enable AllowList", async () => {
            await sc.setIsAllowListActive(true);
            const isAllowList = await sc.isAllowListActive();
            assert.equal(isAllowList, true, "The allow list must be active.");
        });

        it("lets add 3 address to the whitelist with 10 tokens to mint", async () => {
            await sc.setAllowList([address_1, address_2, currentAccount], 10);
        });

        it("lets verify if address number 1 can mint 10", async () => {
            const getValueAdd_1 = await sc.numAvailableToMint(address_1);
            assert.equal(getValueAdd_1 , 10, "The address #1 mint is limited to 10 NFTs");
        });

        it("lets verify if address number 2 can mint 10", async () => {
            const getValueAdd_2 = await sc.numAvailableToMint(address_2);
            assert.equal(getValueAdd_2 , 10, "The address #2 mint is limited to 10 NFTs");
        });

        it("test a whitelist NFT MINT", async () => {
            const mintNFT = await sc.mintAllowList(2, {value: 160000000000000000});
        });
    });

    describe("lets test the utils", async () => {
        it("lets reserve the NFTs", async () => {
            await sc.reserve(1);
        });

        it("lets test max reserve function of NFTs", async () => {
            await sc.reserve(1);
        });

        it("test withdraw amount", async () => {
            await sc.withdraw();
        });

        it("lets set the provenance and verify is the new one", async () => {
            await sc.setProvenance('PROVENANCE_ADDRESS_LOSKDHDJKSGJSH');
            const getProvenance = await sc.PROVENANCE();
            assert.equal(getProvenance, "PROVENANCE_ADDRESS_LOSKDHDJKSGJSH", "The provenance was not updated");
        });

        it("lets set the base url and verify if is the right one", async () => {
            await sc.setBaseURI('BASE_URL');
        });

        it("lets set the royalties data on the contract", async () => {
            await sc.setDefaultRoyalty(currentAccount, 1000);
        });

        it("lets verify the royalties address", async () => {
            const royaltyAddress = await sc.royaltyAddress();
            assert.equal(royaltyAddress, currentAccount, "The royalties addres is not set");
        });

        it("lets verify the royalties are 10%", async () => {
            const royalties = await sc.royaltyBps();
            assert.equal(royalties, 1000, "The royalties are not 10%");
        });
    });
});