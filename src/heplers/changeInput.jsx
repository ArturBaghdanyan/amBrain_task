export const onChangeNumTables = (e, { setNumTables }) => {
  const value = parseInt(e.target.value, 10)

  setNumTables(value > 0 ? value : '')
}

export const onChangeNumChairs = (e, { setNumChairs }) => {
  const value = parseInt(e.target.value, 10)

  setNumChairs(value >= 0 ? value : '')
}
