# Store all data

challenges = [
    {
        'challengeId': 30001,
        'challengeName': 'Briefing',
        'challengeDifficulty':'basic',
        'challengeCode': 'blockchain-briefing',
        'challengeTag':'smart contract basic',
        'challengeFlag': '4781b653dace2dfbdf3d97ea8081f5e9eeabfd14427b9cafbc6aafafefb94d41',
        'challengeHintOne': 'Follow the Story to finish this Challenge!',
        'challengeHintTwo': 'Follow the Story to finish this Challenge!',
        'challengeHintThree': 'Follow the Story to finish this Challenge!'
    },
    {
        'challengeId': 30002,
        'challengeName': 'Gearing Up',
        'challengeDifficulty':'basic',
        'challengeCode': 'blockchain-gearing-up',
        'challengeTag':'Exploit contract',
        'challengeFlag': '4ef87f55f4d274e8d47225bc060784908acd0c026f6fb7f896f55a5d7f5d77f0',
        'challengeHintOne': 'Follow the Story to finish this Challenge!',
        'challengeHintTwo': 'Follow the Story to finish this Challenge!',
        'challengeHintThree': 'Follow the Story to finish this Challenge!'
    },
    {
        'challengeId': 40001,
        'challengeName': 'Cheap Glitch',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-cheap-glitch',
        'challengeTag':'Underflow Overflow',
        'challengeFlag': '3a03eb4dd3e5646ea06fa0f6b8ac88cd94918629bfe41936877d2eaa30362788',
        'challengeHintOne': 'Check the Solidity Version, is that secure?',
        'challengeHintTwo': 'Do you see any unchecked{}?',
        'challengeHintThree': 'There is no check on withdrawCredit()!'
    },
    {
        'challengeId': 40002,
        'challengeName': 'Entry Point',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-entry-point',
        'challengeTag':'Rounding Error',
        'challengeFlag': 'aa45c4b0c2f15b91568d22f051169c243c91545e9debcd569d7ed105ff563651',
        'challengeHintOne': 'Is there really any number that makes exact 1367?',
        'challengeHintTwo': 'The purchase range seems odd',
        'challengeHintThree': 'We do not have to be exact 1367, just the first 4 digits!'
    },
    {
        'challengeId': 40003,
        'challengeName': 'Bar',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-bar',
        'challengeTag': 'Access Control',
        'challengeFlag': 'c46caad6a06564362217fa20a1a6ef1d6fe4466a0c0b0ab08fea622fa55c0a59',
        'challengeHintOne': 'What kind of check does the contract implement?',
        'challengeHintTwo': 'How do we actually become a member?',
        'challengeHintThree': 'It seems that there is an error in one of the modifier!'
    },
    {
        'challengeId': 40004,
        'challengeName': 'Roulette',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-roulette',
        'challengeTag': 'Insecure Randomness',
        'challengeFlag': 'c2b1b26ba4cb903566d29b47a71c0a3dc00d0cd2987409e89c309ff268c15751',
        'challengeHintOne': 'Can we predict the next outcome?',
        'challengeHintTwo': 'They are using block attributes!',
        'challengeHintThree': 'We only need to win 6 times!'
    },
    {
        'challengeId': 40005,
        'challengeName': 'Master of Blackjack',
        'challengeDifficulty':'common',
        'challengeTag': 'Timestamp Dependence',
        'challengeTag': 'Timestamp Dependence','challengeCode': 'blockchain-master-of-blackjack',
        'challengeFlag': 'ba2e03415a2db7ac6e7c565d1f1c9e54c1c6602259b5c390a4586eac80b5a34c',
        'challengeHintOne': 'We only got one shot!',
        'challengeHintTwo': 'Can we get 4 on the first try?',
        'challengeHintThree': 'We only need to play when we are going to win, they use block attributes!'
    },
    {
        'challengeId': 40006,
        'challengeName': 'Voting Frenzy',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-voting-frenzy',
        'challengeTag': 'Logic Error',
        'challengeFlag': '677c1d020fd2795f4d1579b45bb23db2f82ca4a36100cd74cb383626bc9f0016',
        'challengeHintOne': 'What is the weight of our vote?',
        'challengeHintTwo': 'What is required to cast a vote?',
        'challengeHintThree': 'There seems to be a logic error in vote()!'
    },
    {
        'challengeId': 40007,
        'challengeName': 'VVVIP Member',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-vvvip-member',
        'challengeTag': 'Denial of Service',
        'challengeFlag': '4cd11031e1524227083dd17567ec2372852fbb8c58de4d50bc8abcd5aa011c03',
        'challengeHintOne': 'Can we do this with only EOA?',
        'challengeHintTwo': 'Is there any way to make the refund failed?',
        'challengeHintThree': 'Smart Contract without the ability to receive Ether?'
    },
    {
        'challengeId': 40008,
        'challengeName': 'Inju Bank',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-inju-bank',
        'challengeTag': 'Reentrancy',
        'challengeFlag': 'adb9bb70d0d7cbaaa9495396866c2f6a451186417fd5612c669b1e9c0c67241e',
        'challengeHintOne': 'They handle Ether by withdraw() and deposit()',
        'challengeHintTwo': 'The CEI Pattern seems weird?',
        'challengeHintThree': 'Can we just control the flow after they send us Ether?'
    },
    {
        'challengeId': 40009,
        'challengeName': 'Silent Dealer',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-silent-dealer',
        'challengeTag': 'Low-level Call',
        'challengeFlag': '3936af6ef13125e1dcc1c601b2bce84f09e46bb3196de7cd46e2f409feb457dd',
        'challengeHintOne': 'Are we EVER going to win?',
        'challengeHintTwo': 'Is there anything we can control here?',
        'challengeHintThree': 'We might be able to call changeOwner() here!'
    },
    {
        'challengeId': 40010,
        'challengeName': 'Singular Entity',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-singular-entity',
        'challengeTag': 'Hash Collision',
        'challengeFlag': '3e04702280fd0960a7c758d8bb3bc1ce0344b17bd68c5233c036e6d2e115277c',
        'challengeHintOne': 'Does the check for register() that strict?',
        'challengeHintTwo': 'Is there anything unusual with getIdentity()?',
        'challengeHintThree': 'Can we just play around with the concatenation?'
    },
    {
        'challengeId': 40011,
        'challengeName': 'Unlimited Credit Line',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-unlimited-credit-line',
        'challengeTag': 'ERC-20 Misuse',
        'challengeFlag': 'e96fd8fb2beff32a57b725fe860870c886a810de18302933ef93ba77bda9aba0',
        'challengeHintOne': 'Is the Better ERC-20 implemented correctly?',
        'challengeHintTwo': 'Does the Newbank Implement the correct logic after override?',
        'challengeHintThree': 'Wait, only mint() add tokens right?'
    },
    {
        'challengeId': 40012,
        'challengeName': 'Symbol of Noble',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-symbol-of-noble',
        'challengeTag': 'ERC721 Reentrancy',
        'challengeFlag': '48c8329c149f96ab791c1042e8f432deafa5d729e2f70cf71b43213f76828aad',
        'challengeHintOne': 'Is safeMint() function well implemented?',
        'challengeHintTwo': 'Is CEI Pattern correctly implemented?',
        'challengeHintThree': 'Can we control the callback?'
    },
    {
        'challengeId': 40013,
        'challengeName': 'Casino Vault',
        'challengeDifficulty':'common',
        'challengeCode': 'blockchain-casino-vault',
        'challengeTag': 'Delegate Call',
        'challengeFlag': 'bbe4a3ba682ce2ab679410b644142f6c766303904d62c1d62cb76a63eb6baaf4',
        'challengeHintOne': 'Does verifyIdentity() has a whitelist?',
        'challengeHintTwo': 'Can we just write a function that modify the CasinoVault state?',
        'challengeHintThree': 'It seems that only Owner can withdraw'
    },
    {
        'challengeId': 50001,
        'challengeName': 'Inju\'s Gambit',
        'challengeDifficulty':'vip',
        'challengeCode': 'blockchain-injus-gambit',
        'challengeTag': 'UNK0WN',
        'challengeFlag': '2de9f0e2ec3defd027f2a10f3daae001777e6bcad043c0908b693be76aa66b31',
        'challengeHintOne': 'Can we predict the outcome of upgradeChallengerAttribute()?',
        'challengeHintTwo': 'The key is private, or is it?',
        'challengeHintThree': 'Only Owner can fire the Manager right?'
    },
    {
        'challengeId': 50002,
        'challengeName': 'Casino Bankbuster',
        'challengeDifficulty':'vip',
        'challengeCode': 'blockchain-casino-bankbuster',
        'challengeTag': 'UNK0WN',
        'challengeFlag': 'fd33984753e3688b2d48b4354ecfd2bff8b9b005c77ed7ba4cfd5749e3d23c96',
        'challengeHintOne': 'Is the CEI Pattern implemented correctly?',
        'challengeHintTwo': 'The getSpecialReward() seems tempting, but how do we call it?',
        'challengeHintThree': 'Can I just get my Money back and still call the getSpecialReward()?'
    },
    {
        'challengeId': 50003,
        'challengeName': 'Executive Problems',
        'challengeDifficulty':'vip',
        'challengeCode': 'blockchain-executive-problems',
        'challengeTag': 'UNK0WN',
        'challengeFlag': 'aebf10001cfee6875a93fa2db1cb70fa021576083062d69d7d6e4ffe4ee9e60d',
        'challengeHintOne': 'How can we get enough credit to climb up?',
        'challengeHintTwo': 'The transfer() function seems odd',
        'challengeHintThree': 'Is there anyway we can ascend to Owner?'
    }
    # {
    #     'challengeId': 50004,
    #     'challengeName': 'Double or Nothing',
    #     'challengeDifficulty':'vip',
    #     'challengeCode': 'blockchain-double-or-nothing',
    #     'challengeTag': 'Unknown',
    #     'challengeFlag': 'ENUMA',
    #     'challengeHintOne': 'PlaceHolder#1',
    #     'challengeHintTwo': 'PlaceHolder#2',
    #     'challengeHintThree': 'PlaceHolder#3'
    # }
]

Contributors = [
    {
        'challengeCode' : 'blockchain-cheap-glitch',
        'Name' : 'Kiinzu',
        'Link' : 'https://github.com/Kiinzu'
    },
    {
        'challengeCode' : 'blockchain-cheap-glitch',
        'Name' : 'Mewzael',
        'Link' : 'https://github.com/Mewzael'
    },
    {
        'challengeCode' : 'blockchain-cheap-glitch',
        'Name' : 'fefethecyberclown',
        'Link' : 'https://github.com/fefethecyberclown'
    }
]