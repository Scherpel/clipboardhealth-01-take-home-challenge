const crypto = require("crypto");
const { getDeterministicPartitionKey } = require("./getDeterministicPartitionKey");

describe("getDeterministicPartitionKey", () => {
  it("Should return the literal '0' when given no input", () => {
    const trivialDeterministicPartitionKey = getDeterministicPartitionKey();
    expect(trivialDeterministicPartitionKey).toBe("0");
  });

  it("Should return the correct partitionKey when a value exists", () => {
    const partitionKey = '23454545490';
    
    const event = {
      partitionKey
    }

    expect(getDeterministicPartitionKey(event)).toBe(partitionKey);
  });

  it("Should return an encrypted sha3-512 hash when event has no partitionKey", () => {
    const fakeEvent = '232323';

    const fakeDeterministicPartitionKey = getDeterministicPartitionKey(fakeEvent);
    expect(fakeDeterministicPartitionKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(fakeEvent)).digest("hex"));
  });
});
