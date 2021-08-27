# Solana Building Out Loud Hack 2021

## Important Resources

- [Hack home page](https://buildingoutloud.solana.com/)
- [Apply on Devfolio](https://devfolio.co/building-out-loud/dashboard)
- [Solana blockchain ecosystem resources](https://devfolio.notion.site/Resources-Building-Out-Loud-1cd9000a4c494733b73cd2691d7c90dc)
- [Build using Cred](https://devfolio.notion.site/Resources-Building-Out-Loud-1cd9000a4c494733b73cd2691d7c90dc)


## Important Dates

- August 12, 2021: Registration
- August 13, 2021: Hackathon Starting Date
- August 16, 2021: Developer Happy Hours
- September 3, 2021: Submission Last Date
- September 10, 2021: Result

## Abstract

In recent few years, there have been a surge [1] in DApps in DeFi (decentralized finance) space and it may continue to grow rapidly in upcoming years. 
On one hand, this opens up huge opportunities for traders, investors and even software developers, on the other hand, it raises concerns about money laundering, terrorism financing etc to government and regulatory. European Commission proposed [2] to oblige companies (exchange, wallets etc) that facilitate transfers of cryptos to collect various personal data of senders and recipients. In short, the proposal talks about prohibiting *anonymous* crypto wallets. We should not be surprised other govt agencies of various countries following the same path. Whether this is a welcoming move by decentralised communities or not, that is a separate discussion, since it violates one of the principles of blockchain which is *anonymity*, but we are clearly getting the hint that the future of Defi can not be fully anonymous - it has to have real-world *identities* of users associated with their wallets. However, the challenge is, *how can a smart contract verify an identity of a user which is present in systems outside of the blockchain*. 

In this document, we propose a solution to this problem using Hypersign [3] protocol. Hypersign is a cross-chain decentralised identity and access management infrastructure for the enterprise. Built on Self Sovereign Identity (SSI) [4] standards, the verifiable credential [5] issued on Hypersign ecosystem can be verified by any smart contract code. Any centralised issuer can connect with Hypersign ecosystem to issue verifiable credential to their users. The user can then use that credential to avail services from a smart contract deployed on any blockchain. We will try to solve this problem for one particular use case and understand how it works. Finally, we will evaluate the solution on few important metrices like feasibility, privacy, data-protection and security. 


## Introduction 

### Problem Statement


## Current Work

## Proposed Solution

## Demo

![image](https://user-images.githubusercontent.com/15328561/131084517-c31cd2af-8d1c-4b76-bcb0-69b2d4b592d8.png)

* Step 1: A user comes to the `HyperFyre` platform. 
* Step 2 & 3:  User authorizes `HyperFyre` to fetch `Cred Profile` via `Cred APIs`.
* Step 4: User connects `Solano Wallet` to fetch Solano public key  (or blockchian address).
* Step 5: Once dones, the `HyperFyre` platform verifies all details and issues a cryptographically signed document (i.e. verifiable credential) to the user. 
  * The user keeps the verifiable credentials in the device he/she holds.
  * The verifiable credenital is the proof that the user has submitted his detials and has been verified. 
  * The credential contains the `Cred profile` data as well as public key. 
  * This way a user associates his `Cred profile` with the public key he owns for Solano blockchain.
* Step 6: Now that user has a verifiable credential, he can use this credential to avail  services from DApps (for variaous use cases like insurance, DEX etc ) built on Solano blockchain ecosystem.
      
## Evaluation Metrics

## References

- [1] https://www.circle.com/blog/the-growth-of-defi 
- [2] https://ec.europa.eu/finance/docs/law/210720-proposal-funds-transfers_en.pdf
- [3] https://hypersign.id
- [4] https://sovrin.org/faq/what-is-self-sovereign-identity/
- [5] https://www.w3.org/TR/vc-data-model/

