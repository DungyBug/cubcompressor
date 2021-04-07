const source = "Something very longSomething very longSomething very longSomething very longSomething very longSomething very longSomething very longSomething very longSomething very longSomething very longSomething very long";
let compressed = compressByCUB1(source);
let decompressed = decompressByCUB1(compressed);

console.log(compressed, source, decompressed);