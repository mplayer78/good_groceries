export default function formatMoney(pence: number) {
  const penceStr = pence.toString();
  if (pence < 0) {
    return "Invalid";
  } else if (pence < 100) {
    return `${pence}p`;
  } else {
    return `£${penceStr.slice(0, penceStr.length - 2)}.${penceStr.slice(
      penceStr.length - 2
    )}`;
  }
}
