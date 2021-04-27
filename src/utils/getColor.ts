function getColor(group: number): string{
  switch(group) {
    case 0: return '#d1f8fe'
    case 1: return '#fed1f6'
    case 2: return '#fed1d1'
    case 3: return '#fee9d1'
    case 4: return '#fdfed1'
    case 5: return '#d1fed1'
  }
  return '#62FC5F'
}

export default getColor