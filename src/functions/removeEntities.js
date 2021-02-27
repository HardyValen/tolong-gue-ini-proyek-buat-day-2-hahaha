let removeEntities = (entityArray) => {
  return entityArray.filter((entity) => {
    return !entity.getData("removeFlag")
  })
}

export default removeEntities;