# Solana Building Out Loud Hack 2021

## Abstract

In recent few years, there have been a surge [1] in DApps in DeFi (decentralized finance) space and it may continue to grow rapidly in upcoming years. 
On one hand, this opens up huge opportunities for traders, investors and even software developers, on the other hand, it raises concerns about money laundering, terrorism financing etc to government and regulatory. The European Commission proposed [2] to oblige companies (exchange, wallets etc) that facilitate transfers of cryptos to collect various personal data of senders and recipients. In short, the proposal talks about prohibiting *anonymous* crypto wallets. We should not be surprised other govt agencies of various countries following the same path. Whether this is a welcoming move by decentralised communities or not, that is a separate discussion, since it violates one of the principles of blockchain which is *anonymity*, but we are clearly getting the hint that the future of Defi can not be fully anonymous - it has to have real-world *identities* of users associated with their wallets. However, the problems has two folds, 

* A - *how can a smart contract verify an identity (or claims) of a user which is present in systems outside of the blockchain?* 
* B - *how can a these claims be verifed across the different blockchains?*.

In this document, we propose a solution to this problem using Hypersign [3] protocol. Hypersign is a cross-chain decentralised identity and access management infrastructure for the enterprise. Built on Self Sovereign Identity (SSI) [4] standards, the verifiable credential [5] issued on Hypersign ecosystem can be verified by any smart contract **cross chain**. Any trusted issuer can verify one or more claims by a user and issue a verifiable credential using the protocol off the chain. The user can then use that credential to avail services from a smart contract deployed on any blockchain. We will try to solve this problem for one particular use case and understand how it works. 


## Introduction 

### Problem Statement

The blockchain based applications seems to be struggling for adoption in real world for various reasons. Applications built using smart contracts (also called DApps), which provides any services, has no way to verifiy real world identities and the reason being, those identities (or claims) do not exist on-chain.  They are issued by trusted issuers like goverments, banks etc and can not be verfied on chain since these contract can not interact with outside world. Integrating smart contracts with the real world organizations might be an important step in the adoption of blockchain technology. Moreover, regulatory authories wants to track and trace these trasactions in order to stop activities like money laundering, terrorism financing etc. The European Commission proposed [2] to oblige companies (exchange, wallets etc) that facilitate transfers of cryptos to collect various personal data of senders and recipients. This means that they will not allow *anonymous* crypto wallets. These wallets must be associated with real world identities but the problem is, how can a smart contract verify those claims and provide services to users. It would both dangerous and in some cases illegal (according to EU GDPR rules for example) to record Identity Claims containing Personal Identifying Information (PII) on an immutable public ledger. 

All present solutions (read the next section) to this problems are solved for a specific blockchain, leaving a user to **re-do** the KYC by sharing their identification documents with different vendors everytime they switch the blockchain. This may leads to not just security issues like data leakage but also its very annoying for a user to share his personal documentions to many different vendors.

## Current Work

Ethereum Improvement Proposal (EIP) - 1812 [6] talks about this problem. A verifiable claim built on EIP-712 [7] can now be verified on chain by Ethereum blockchain smart contract. 

Civic Team [9] has previously proposed concept of *Identity Swap* [10] which talks about Automatic Money Market (AMM) dApp that demonstrates the concept of Decentralised Identity on the Solana SPL Token-Swap program where a  user can interact with a liquidity pool only if they are in possession of a valid identity account, certified by a trusted identity validator.

> But both of the above solutions expects user to only avail services from the same blockchain network. 

## Proposed Solution

We propose a solution to this problem using Hypersign Protocol [3] which is a cross chain identity verification protocol. A user sends claims to a trusted issuer, the issuer verifes these claims and issues him/her a verfiable credential. The user can then use this credential to avail service from any blockchain smart contract he wants.

![image](https://user-images.githubusercontent.com/15328561/132031023-b0de370e-9a2e-4347-afe0-4ad6e00eac1a.png)


## Use Case

For this hackathon, we took a simple use case;

Meet Jhon!

Jhon is a `CRED` user and have been paying credit card bills ontime and due to that he has earned decent amount of `CRED` score on this profile. Jhon got into some financial issue and is in need for taking loan. Instead of going to traditionaly loan institutions like centralise banks, he is looking for opporunities in *crypto* or *DeFi* space. He is not only exploring options for *non collatoral loan* but also looking for different products in different blockchian networks like Solana, Ethereum, Bitcoin etc.

Jhon has two problems here, 

1. First, dApps does not understand `CRED` score and hence they asks Jhon to put some tokens as a collatoral which does not makes sense to Jhon since he does not have crypto to put as collatoral. 
2. Second, Jhon is not comforatble in sharing his KYC to different dApps from different blockchians.

## Demo

We build a tool called `HyperFyre` using `Hypersign protocol` where a user can athenticate his/her `CRED` profile as well as blockchain address (Solana in this case) in oder to generate a verifiable credential which can verified by on chain services on Solana blockchain network. 

If we break the solutions we have to the following

1. Jhon need to authorise his CRED profile and Solana wallet address to HyperFyre. The HyperFyre will verify those detials and issues him the verifiable credential. This verifiable credential can be stored in the device of his choice.
2. Once the credential is issued, Jhon can then use that credential to avail any DeFi service (like loan, exhange etc) from dApps.


![image](https://user-images.githubusercontent.com/15328561/131084517-c31cd2af-8d1c-4b76-bcb0-69b2d4b592d8.png)

### Part 1: Generating CRED credential

* **Step 1**: A user comes to the `HyperFyre` platform. 
* **Step 2 & 3**:  User authorizes `HyperFyre` to fetch `Cred Profile` via `Cred APIs`.
* **Step 4**: User connects `Solano Wallet` to fetch Solano public key  (or blockchian address).
* **Step 5**: Once done, the `HyperFyre` platform verifies all details and issues a cryptographically signed document (i.e. verifiable credential) to the user. 
  * The user keeps the verifiable credentials in the device he/she holds (which only user has access to, hence maintaining privacy & protecting user data).
  * The verifiable credenital is the proof that the user has submitted his details and has been verified by the platform (the platform can not deny this fact, hence building the trust on the system). 
  * The credential contains the `Cred profile` data as well as public key. 
  * This way a user associates his `Cred profile` with the public key he owns for Solano blockchain.

### Part 2: Using that credential

* **Step 6**: Now that user has a verifiable credential, he can use this credential to avail  services from DApps (for variaous use cases like insurance, DEX etc ) built on Solano blockchain ecosystem.


> For the purpose of this hackathon we could only finsh the first part of the solution.

## Live Demo

- [Live demo url](https://hyperfyre.netlify.app/app/login/solana-hack-test001)
- [Video: Part 1](https://www.loom.com/share/064043dfc0264fcaaa074e196e313a84)
- [Video: Part 2](https://www.loom.com/share/104aad75864d4f09a01b2cd2b65760ad)


## References

- [1] https://www.circle.com/blog/the-growth-of-defi 
- [2] https://ec.europa.eu/finance/docs/law/210720-proposal-funds-transfers_en.pdf
- [3] https://hypersign.id
- [4] https://sovrin.org/faq/what-is-self-sovereign-identity/
- [5] https://www.w3.org/TR/vc-data-model/
- [6] https://eips.ethereum.org/EIPS/eip-1812
- [8] https://www.researchgate.net/publication/331701045_Verifiable_Anonymous_Identities_and_Access_Control_in_Permissioned_Blockchains
- [9] https://www.civic.com/
- [10] https://github.com/civicteam/identity-swap 


