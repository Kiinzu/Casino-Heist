In the *Entry Point Contract*, the main problem is that we can get many tokens with such a small deposit; the rest of the token is behind the decimal point, which makes them actually nothing (zero). The best mitigation for the lab that you just solved is actually to add a *scaling vector* or we can use *higher internal precision*. Here is the explanation along with other possible mitigations for this vulnerability. &nbsp;  
&nbsp;  

1. **Higher Precision Internal Representation**  &nbsp;  
    We can use a higher internal precision to represent the decimals in the contract, so if we got *1367.5823*, we can represent this number in the internal of the contract by scaling it with *1e5*, for example, making the number that will be saved inside the contract to be *13675230*. But always remember to apply the division when calculating with the balance to prevent calculation error. &nbsp;  
    &nbsp;  
2. **Using *SafeMath* Libraries**  &nbsp;  
    Like always, when it comes to mathematic calculation, one of the best practices is to use *safeMath* libraries like *OpenZeppelin's SafeMath* to ensure not only no rounding issues but also overflow and underflow.