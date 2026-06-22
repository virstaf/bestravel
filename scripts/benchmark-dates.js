
const iterations = 10000;
const dateString = "2024-05-16T12:00:00Z";
const date = new Date(dateString);

const optionsDate = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const optionsDateTime = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

console.log("Starting benchmark...");

// Benchmark toLocaleDateString
console.time("toLocaleDateString");
for (let i = 0; i < iterations; i++) {
  new Date(dateString).toLocaleDateString("en-US", optionsDate);
  new Date(dateString).toLocaleDateString("en-US", optionsDateTime);
}
console.timeEnd("toLocaleDateString");

// Benchmark Intl.DateTimeFormat (hoisted)
const formatterDate = new Intl.DateTimeFormat("en-US", optionsDate);
const formatterDateTime = new Intl.DateTimeFormat("en-US", optionsDateTime);

console.time("Intl.DateTimeFormat (hoisted)");
for (let i = 0; i < iterations; i++) {
  const d = new Date(dateString);
  formatterDate.format(d);
  formatterDateTime.format(d);
}
console.timeEnd("Intl.DateTimeFormat (hoisted)");
